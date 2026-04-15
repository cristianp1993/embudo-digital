'use client';

import React from 'react';
import { resetFirebaseMetrics } from '../context/FunnelContext';

interface HeroProps {
  onStart: () => void;
}

export default function Hero({ onStart }: HeroProps) {
  const handleReset = () => {
    if (confirm('¿Estás seguro de reiniciar todas las métricas? Esta acción no se puede deshacer.')) {
      resetFirebaseMetrics();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 animate-fade-in">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight animate-slide-up">
          No te vamos a explicar un embudo.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Lo vas a vivir.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Toma decisiones y descubre en qué etapa te quedas.
        </p>
        
        <button
          onClick={onStart}
          className="mt-8 px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-2xl font-bold rounded-full 
                     hover:from-cyan-400 hover:to-purple-400 transform hover:scale-105 transition-all duration-300 
                     shadow-2xl hover:shadow-cyan-500/50 animate-slide-up"
          style={{ animationDelay: '0.4s' }}
        >
          Entrar al experimento
        </button>
        
        <div className="mt-12 text-gray-400 text-lg font-semibold animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <p>
            Leonardo Maje Rios - Cristian David Piedrahita - Sergio Velazquez
          </p>
        </div>
      </div>
      
      {/* Hidden reset button - only for admin */}
      <button
        onClick={handleReset}
        className="fixed bottom-2 left-2 text-[10px] text-gray-600 hover:text-gray-400 opacity-30 hover:opacity-100 transition-opacity"
        title="Reiniciar métricas (solo admin)"
      >
        🔄
      </button>
    </div>
  );
}
