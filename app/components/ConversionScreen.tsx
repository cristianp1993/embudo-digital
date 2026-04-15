'use client';

import React from 'react';

interface ConversionScreenProps {
  userPath: string[];
  onRestart: () => void;
}

export default function ConversionScreen({ userPath, onRestart }: ConversionScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-emerald-900 via-green-900 to-teal-900 animate-fade-in">
      <div className="max-w-4xl text-center space-y-8 animate-slide-up">
        <div className="text-8xl mb-4">🎉</div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white">
          ¡Convertiste!
        </h1>
        
        <p className="text-2xl text-gray-300">
          Llegaste al final del embudo digital.
        </p>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md mx-auto">
          <h3 className="text-xl font-bold text-white mb-4">Tu recorrido</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {userPath.map((step, index) => (
              <React.Fragment key={index}>
                <span className="px-3 py-1 bg-cyan-500/30 text-cyan-300 rounded-full text-sm font-semibold">
                  {step}
                </span>
                {index < userPath.length - 1 && (
                  <span className="text-gray-400">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <button
          onClick={onRestart}
          className="mt-8 px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-2xl font-bold rounded-full 
                     hover:from-cyan-400 hover:to-purple-400 transform hover:scale-105 transition-all duration-300 
                     shadow-2xl hover:shadow-cyan-500/50"
        >
          Reiniciar experimento
        </button>
      </div>
    </div>
  );
}
