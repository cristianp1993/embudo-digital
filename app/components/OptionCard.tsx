'use client';

import React from 'react';

interface OptionCardProps {
  option: string;
  onSelect: () => void;
  isNone: boolean;
  index: number;
}

export default function OptionCard({ option, onSelect, isNone, index }: OptionCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`
        w-full p-6 text-xl font-semibold rounded-2xl transition-all duration-300 transform
        hover:scale-105 hover:shadow-2xl animate-slide-up
        ${isNone 
          ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 hover:from-gray-600 hover:to-gray-700 border-2 border-gray-600' 
          : 'bg-gradient-to-br from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 border-2 border-blue-400'
        }
      `}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {option}
    </button>
  );
}
