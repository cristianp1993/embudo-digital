'use client';

import React from 'react';
import OptionCard from './OptionCard';
import ProgressBar from './ProgressBar';

interface StageScreenProps {
  title: string;
  subtitle: string;
  options: string[];
  onSelectOption: (option: string, isNone: boolean) => void;
  stageName: string;
  message: string;
}

export default function StageScreen({
  title,
  subtitle,
  options,
  onSelectOption,
  stageName,
  message,
}: StageScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 animate-fade-in">
      <ProgressBar currentStage={stageName} />
      
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4 animate-slide-up">
          <p className="text-cyan-400 font-semibold text-lg">{message}</p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">{title}</h2>
          <p className="text-xl text-gray-300">{subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {options.map((option, index) => (
            <OptionCard
              key={option}
              option={option}
              onSelect={() => onSelectOption(option, option === 'Ninguna')}
              isNone={option === 'Ninguna'}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
