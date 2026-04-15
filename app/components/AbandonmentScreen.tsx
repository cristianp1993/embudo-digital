'use client';

import React from 'react';

interface AbandonmentScreenProps {
  abandonmentStage: string;
  userPath: string[];
  onRestart: () => void;
}

export default function AbandonmentScreen({ abandonmentStage, userPath, onRestart }: AbandonmentScreenProps) {
  const stageNames: { [key: string]: string } = {
    tofu: 'Atracción (TOFU)',
    mofu: 'Interés (MOFU)',
    bofu: 'Decisión (BOFU)',
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 animate-fade-in">
      <div className="max-w-4xl text-center space-y-8 animate-slide-up">
        <div className="text-8xl mb-4">🚪</div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white">
          Saliste del embudo
        </h1>
        
        <p className="text-2xl text-gray-300">
          No todos avanzan. Esa es la lógica real del funnel.
        </p>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-md mx-auto">
          <h3 className="text-xl font-bold text-white mb-2">Abandonaste en:</h3>
          <p className="text-2xl text-orange-400 font-bold mb-4">
            {stageNames[abandonmentStage] || abandonmentStage.toUpperCase()}
          </p>
          
          <h4 className="text-lg font-semibold text-white mb-3">Tu recorrido</h4>
          <div className="flex flex-wrap justify-center gap-2">
            {userPath.map((step, index) => (
              <React.Fragment key={index}>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  step === 'Abandono' 
                    ? 'bg-orange-500/30 text-orange-300' 
                    : 'bg-cyan-500/30 text-cyan-300'
                }`}>
                  {step}
                </span>
                {index < userPath.length - 1 && (
                  <span className="text-gray-400">→</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-xl p-4 max-w-md mx-auto border border-gray-700">
          <p className="text-gray-400 text-sm">
            💡 En marketing digital, perder usuarios en cada etapa es normal. 
            Un buen embudo optimiza cada paso para maximizar las conversiones.
          </p>
        </div>
        
        <button
          onClick={onRestart}
          className="mt-8 px-12 py-6 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-2xl font-bold rounded-full 
                     hover:from-cyan-400 hover:to-purple-400 transform hover:scale-105 transition-all duration-300 
                     shadow-2xl hover:shadow-cyan-500/50"
        >
          Volver a empezar
        </button>
      </div>
    </div>
  );
}
