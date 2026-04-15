'use client';

import React from 'react';

interface ProgressBarProps {
  currentStage: string;
}

export default function ProgressBar({ currentStage }: ProgressBarProps) {
  const stages = ['TOFU', 'MOFU', 'BOFU'];
  const stageIndex = stages.indexOf(currentStage);
  
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex justify-between mb-2">
        {stages.map((stage, index) => (
          <div
            key={stage}
            className={`text-sm font-bold transition-colors duration-300 ${
              index <= stageIndex ? 'text-cyan-400' : 'text-gray-600'
            }`}
          >
            {stage}
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-500 ease-out"
          style={{ width: `${((stageIndex + 1) / stages.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
