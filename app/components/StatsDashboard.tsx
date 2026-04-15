'use client';

import React, { useState } from 'react';

interface StatsDashboardProps {
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
}

export default function StatsDashboard({ metrics }: StatsDashboardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const stats = [
    { label: 'Iniciaron', value: metrics.started, color: 'from-cyan-500 to-blue-500' },
    { label: 'En TOFU', value: metrics.inTofu, color: 'from-green-500 to-emerald-500' },
    { label: 'En MOFU', value: metrics.inMofu, color: 'from-yellow-500 to-orange-500' },
    { label: 'En BOFU', value: metrics.inBofu, color: 'from-purple-500 to-pink-500' },
    { label: 'Conversiones', value: metrics.conversions, color: 'from-emerald-500 to-green-400' },
    { label: 'Abandono TOFU', value: metrics.tofuAbandonments, color: 'from-red-500 to-rose-500' },
    { label: 'Abandono MOFU', value: metrics.mofuAbandonments, color: 'from-orange-500 to-red-500' },
    { label: 'Abandono BOFU', value: metrics.bofuAbandonments, color: 'from-pink-500 to-red-500' },
  ];

  return (
    <>
      {/* Toggle button - always visible on mobile/tablet */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 md:hidden bg-gradient-to-r from-cyan-500 to-purple-500 text-white p-3 rounded-full shadow-2xl hover:from-cyan-400 hover:to-purple-400 transition-all duration-300"
      >
        {isOpen ? '✕' : '📊'}
      </button>

      {/* Dashboard - collapsible on mobile/tablet, always visible on desktop */}
      <div className={`fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-lg rounded-2xl p-3 border border-gray-700 shadow-2xl max-w-[200px] md:max-w-none transition-all duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-[120%] md:translate-x-0'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white font-bold text-xs">📊 Métricas</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-400 hover:text-white text-xs"
          >
            ✕
          </button>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-gray-900/50 rounded-lg p-1.5 text-center border border-gray-700"
            >
              <div className={`text-sm md:text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs text-gray-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
