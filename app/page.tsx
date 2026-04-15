'use client';

import React from 'react';
import { FunnelProvider, useFunnel } from './context/FunnelContext';
import Hero from './components/Hero';
import StageScreen from './components/StageScreen';
import ConversionScreen from './components/ConversionScreen';
import AbandonmentScreen from './components/AbandonmentScreen';
import StatsDashboard from './components/StatsDashboard';

function FunnelApp() {
  const { state, dispatch } = useFunnel();

  const handleStart = () => {
    dispatch({ type: 'START_EXPERIMENT' });
  };

  const handleOptionSelect = (option: string, isNone: boolean) => {
    if (isNone) {
      if (state.currentStage === 'tofu') {
        dispatch({ type: 'ABANDON', stage: 'tofu' });
      } else if (state.currentStage === 'mofu') {
        dispatch({ type: 'ABANDON', stage: 'mofu' });
      } else if (state.currentStage === 'bofu') {
        dispatch({ type: 'ABANDON', stage: 'bofu' });
      }
    } else {
      if (state.currentStage === 'tofu') {
        dispatch({ type: 'ADVANCE_TO_MOFU' });
      } else if (state.currentStage === 'mofu') {
        dispatch({ type: 'ADVANCE_TO_BOFU' });
      } else if (state.currentStage === 'bofu') {
        dispatch({ type: 'CONVERT' });
      }
    }
  };

  const handleRestart = () => {
    dispatch({ type: 'RESTART' });
  };

  const tofuOptions = [
    'Aprender a vender más',
    'Usar IA para crear contenido',
    'Automatizar tareas',
    'Mejorar redes sociales',
    'Ninguna',
  ];

  const mofuOptions = [
    'Ver un caso real',
    'Recibir una plantilla útil',
    'Ver una demo rápida',
    'Comparar opciones',
    'Ninguna',
  ];

  const bofuOptions = [
    'Acceder al recurso final',
    'Probar una solución',
    'Ver el beneficio resumido',
    'Obtener una recomendación',
    'Ninguna',
  ];

  return (
    <>
      {state.currentStage !== 'hero' && <StatsDashboard metrics={state.metrics} />}
      
      {state.currentStage === 'hero' && <Hero onStart={handleStart} />}
      
      {state.currentStage === 'tofu' && (
        <StageScreen
          title="¿Qué te llama más la atención?"
          subtitle="Elige lo que más te interesa"
          options={tofuOptions}
          onSelectOption={handleOptionSelect}
          stageName="TOFU"
          message="Acabas de entrar al TOFU"
        />
      )}
      
      {state.currentStage === 'mofu' && (
        <StageScreen
          title="¿Qué te haría seguir explorando?"
          subtitle="Ahora estás en consideración"
          options={mofuOptions}
          onSelectOption={handleOptionSelect}
          stageName="MOFU"
          message="Ahora estás en consideración"
        />
      )}
      
      {state.currentStage === 'bofu' && (
        <StageScreen
          title="¿Qué te haría tomar una decisión ahora?"
          subtitle="Estás a un paso de convertir"
          options={bofuOptions}
          onSelectOption={handleOptionSelect}
          stageName="BOFU"
          message="Estás a un paso de convertir"
        />
      )}
      
      {state.currentStage === 'conversion' && (
        <ConversionScreen userPath={state.userPath} onRestart={handleRestart} />
      )}
      
      {state.currentStage === 'abandonment' && (
        <AbandonmentScreen
          abandonmentStage={state.abandonmentStage!}
          userPath={state.userPath}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default function Home() {
  return (
    <FunnelProvider>
      <FunnelApp />
    </FunnelProvider>
  );
}
