'use client';

import React from 'react';

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
    <div className="fixed top-4 right-4 z-50 bg-black/80 backdrop-blur-lg rounded-2xl p-4 border border-gray-700 shadow-2xl">
      <h3 className="text-white font-bold text-sm mb-3 text-center">📊 Métricas en Vivo</h3>
      <div className="grid grid-cols-2 gap-2">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-gray-900/50 rounded-xl p-2 text-center border border-gray-700"
          >
            <div className={`text-lg font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
              {stat.value}
            </div>
            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
