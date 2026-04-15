'use client';

import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { ref, onValue, runTransaction, get, set } from 'firebase/database';
import { database } from '../lib/firebase';

type FunnelStage = 'hero' | 'tofu' | 'mofu' | 'bofu' | 'conversion' | 'abandonment';

interface FunnelState {
  currentStage: FunnelStage;
  abandonmentStage: FunnelStage | null;
  metrics: {
    started: number;
    inTofu: number;
    inMofu: number;
    inBofu: number;
    conversions: number;
    tofuAbandonments: number;
    mofuAbandonments: number;
    bofuAbandonments: number;
  };
  userPath: string[];
}

type FunnelAction =
  | { type: 'START_EXPERIMENT' }
  | { type: 'ADVANCE_TO_TOFU' }
  | { type: 'ADVANCE_TO_MOFU' }
  | { type: 'ADVANCE_TO_BOFU' }
  | { type: 'CONVERT' }
  | { type: 'ABANDON'; stage: FunnelStage }
  | { type: 'RESTART' }
  | { type: 'ADD_PATH_STEP'; step: string }
  | { type: 'SYNC_METRICS'; metrics: FunnelState['metrics'] }
  | { type: 'RESET_METRICS' };

const initialState: FunnelState = {
  currentStage: 'hero',
  abandonmentStage: null,
  metrics: {
    started: 0,
    inTofu: 0,
    inMofu: 0,
    inBofu: 0,
    conversions: 0,
    tofuAbandonments: 0,
    mofuAbandonments: 0,
    bofuAbandonments: 0,
  },
  userPath: [],
};

function funnelReducer(state: FunnelState, action: FunnelAction): FunnelState {
  switch (action.type) {
    case 'SYNC_METRICS':
      return {
        ...state,
        metrics: action.metrics,
      };
    case 'START_EXPERIMENT':
      return {
        ...state,
        currentStage: 'tofu',
        metrics: {
          ...state.metrics,
          started: state.metrics.started + 1,
          inTofu: state.metrics.inTofu + 1,
        },
        userPath: [...state.userPath, 'Inició'],
      };
    case 'ADVANCE_TO_MOFU':
      return {
        ...state,
        currentStage: 'mofu',
        metrics: {
          ...state.metrics,
          inMofu: state.metrics.inMofu + 1,
        },
        userPath: [...state.userPath, 'TOFU'],
      };
    case 'ADVANCE_TO_BOFU':
      return {
        ...state,
        currentStage: 'bofu',
        metrics: {
          ...state.metrics,
          inBofu: state.metrics.inBofu + 1,
        },
        userPath: [...state.userPath, 'MOFU'],
      };
    case 'CONVERT':
      return {
        ...state,
        currentStage: 'conversion',
        metrics: {
          ...state.metrics,
          conversions: state.metrics.conversions + 1,
        },
        userPath: [...state.userPath, 'BOFU', 'Conversión'],
      };
    case 'ABANDON':
      const updatedMetrics = { ...state.metrics };
      if (action.stage === 'tofu') {
        updatedMetrics.tofuAbandonments = state.metrics.tofuAbandonments + 1;
      } else if (action.stage === 'mofu') {
        updatedMetrics.mofuAbandonments = state.metrics.mofuAbandonments + 1;
      } else if (action.stage === 'bofu') {
        updatedMetrics.bofuAbandonments = state.metrics.bofuAbandonments + 1;
      }
      return {
        ...state,
        currentStage: 'abandonment',
        abandonmentStage: action.stage,
        metrics: updatedMetrics,
        userPath: [...state.userPath, action.stage.toUpperCase(), 'Abandono'],
      };
    case 'RESTART':
      return {
        ...initialState,
        metrics: state.metrics,
      };
    case 'ADD_PATH_STEP':
      return {
        ...state,
        userPath: [...state.userPath, action.step],
      };
    case 'RESET_METRICS':
      return {
        ...state,
        metrics: {
          started: 0,
          inTofu: 0,
          inMofu: 0,
          inBofu: 0,
          conversions: 0,
          tofuAbandonments: 0,
          mofuAbandonments: 0,
          bofuAbandonments: 0,
        },
      };
    default:
      return state;
  }
}

const FunnelContext = createContext<{
  state: FunnelState;
  dispatch: React.Dispatch<FunnelAction>;
} | null>(null);

export function FunnelProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(funnelReducer, initialState);
  const [isSyncing, setIsSyncing] = React.useState(false);

  // Load metrics from Firebase on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const metricsRef = ref(database, 'metrics');
    get(metricsRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setIsSyncing(true);
        dispatch({ 
          type: 'SYNC_METRICS', 
          metrics: data 
        } as FunnelAction);
        setTimeout(() => setIsSyncing(false), 100);
      }
    });
  }, []);

  // Sync metrics from Firebase in real-time
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const metricsRef = ref(database, 'metrics');
    const unsubscribe = onValue(metricsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setIsSyncing(true);
        dispatch({ 
          type: 'SYNC_METRICS', 
          metrics: data 
        } as FunnelAction);
        setTimeout(() => setIsSyncing(false), 100);
      }
    });

    return () => unsubscribe();
  }, []);

  // Update Firebase metrics when local state changes using transactions (only on user actions)
  useEffect(() => {
    if (typeof window === 'undefined' || isSyncing) return;
    
    const metricsRef = ref(database, 'metrics');
    runTransaction(metricsRef, (currentMetrics) => {
      if (!currentMetrics) {
        return state.metrics;
      }
      return state.metrics;
    });
  }, [state.metrics, isSyncing]);

  return (
    <FunnelContext.Provider value={{ state, dispatch }}>
      {children}
    </FunnelContext.Provider>
  );
}

export function useFunnel() {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error('useFunnel must be used within a FunnelProvider');
  }
  return context;
}

export function resetFirebaseMetrics() {
  const metricsRef = ref(database, 'metrics');
  const resetMetrics = {
    started: 0,
    inTofu: 0,
    inMofu: 0,
    inBofu: 0,
    conversions: 0,
    tofuAbandonments: 0,
    mofuAbandonments: 0,
    bofuAbandonments: 0,
  };
  set(metricsRef, resetMetrics);
}
