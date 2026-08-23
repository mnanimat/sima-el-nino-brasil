import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  ComposedChart
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  Plane, 
  Home, 
  Truck, 
  Layers,
  Satellite,
  Waves
} from 'lucide-react';
import { TIME_SERIES_TELEMETRY } from '../data/mockElNinoData';

export const ComprehensiveChartsModule: React.FC = () => {
  const [activeChartGroup, setActiveChartGroup] = useState<'all' | 'climate' | 'rivers' | 'aviation' | 'slopes'>('all');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 border border-blue-800/40 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  Dashboard Analítico de Gráficos & Telemetria
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  TEMPO REAL & SÉRIES HISTÓRICAS
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Correlação multissetorial entre anomalias oceânicas (SST Niño 3.4), cotas de cheia e vazante, atrito de pistas e deformação milimétrica de encostas.
              </p>
            </div>
          </div>

          {/* Quick Filter */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveChartGroup('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeChartGroup === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Todos os Gráficos
            </button>
            <button
              onClick={() => setActiveChartGroup('climate')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeChartGroup === 'climate' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Oceano & Clima
            </button>
            <button
              onClick={() => setActiveChartGroup('rivers')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeChartGroup === 'rivers' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Bacias & Rios
            </button>
            <button
              onClick={() => setActiveChartGroup('slopes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeChartGroup === 'slopes' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Encostas InSAR
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Analytical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Ocean Thermal Anomaly (Niño 3.4) */}
        {(activeChartGroup === 'all' || activeChartGroup === 'climate') && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Waves className="w-4 h-4 text-cyan-400" />
                  Anomalia Térmica do Pacífico Equatorial (SST Niño 3.4 °C)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Limiar de Super El Niño ({'>'} +2.0°C) e impacto nas frentes frias brasileiras
                </p>
              </div>
              <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                Pico: +2.9°C
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TIME_SERIES_TELEMETRY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sstGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[0, 3.5]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                    formatter={(val: number) => [`+${val}°C`, 'Anomalia SST Niño 3.4']}
                  />
                  <Area type="monotone" dataKey="sstAnomaly" stroke="#f87171" strokeWidth={2.5} fillOpacity={1} fill="url(#sstGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
              <span>Classificação Atual: <strong>Super El Niño Forte</strong></span>
              <span className="text-rose-300">Intensificador de tempestades no Sul e secas no Norte</span>
            </div>
          </div>
        )}

        {/* Chart 2: River Basin Levels (Guaíba Flood vs. Madeira Drought) */}
        {(activeChartGroup === 'all' || activeChartGroup === 'rivers') && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  Comportamento Hídrico Oposto: Cheia do Guaíba vs. Seca do Madeira
                </h3>
                <p className="text-[11px] text-slate-400">
                  Cota Guaíba (Cota Alerta 3.0m / Inundação 3.6m) vs. Calado Madeira (Mínimo 2.0m)
                </p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={TIME_SERIES_TELEMETRY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[0, 6]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                  <Line type="monotone" name="Cota Guaíba (m) [Sul]" dataKey="seaLevelGuaiba" stroke="#38bdf8" strokeWidth={2.5} dot={{ r: 3 }} />
                  <Line type="monotone" name="Calado Rio Madeira (m) [Norte]" dataKey="madeiraDepth" stroke="#fbbf24" strokeWidth={2.5} dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
              <span className="text-sky-300">Guaíba: Pico de 5,35m (Super enchente)</span>
              <span className="text-amber-300">Madeira: Vazante histórica de 1,35m</span>
            </div>
          </div>
        )}

        {/* Chart 3: InSAR Millimetric Slope Displacement */}
        {(activeChartGroup === 'all' || activeChartGroup === 'slopes') && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Satellite className="w-4 h-4 text-purple-400" />
                  Deformação Milimétrica de Encostas Urbanas (InSAR SIMA-SAT)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Deslocamento cumulativo em taludes habitados (Limiar de Risco Iminente: {'>'} 6.0 mm)
                </p>
              </div>
              <span className="text-xs font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                Precisão: ±0.8 mm
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TIME_SERIES_TELEMETRY} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="insarGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={[0, 10]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                    formatter={(val: number) => [`${val} mm`, 'Deslocamento InSAR']}
                  />
                  <Area type="monotone" dataKey="insarDisplacementMm" stroke="#c084fc" strokeWidth={2.5} fillOpacity={1} fill="url(#insarGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
              <span>Monitoramento contínuo em <strong>Petrópolis, Serra do Mar e Recife</strong></span>
              <span className="text-purple-300 font-semibold">Alerta de evacuação emitido antes da ruptura</span>
            </div>
          </div>
        )}

        {/* Chart 4: Economic Losses Avoided by SIMA Mitigations (R$ Millions) */}
        {(activeChartGroup === 'all' || activeChartGroup === 'climate') && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Perdas Econômicas & Logísticas Evitadas (R$ Milhões)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Impacto acumulado das medidas preventivas nos três setores (Total: R$ 15,2 Bilhões)
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                ROI: 14.8x
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={TIME_SERIES_TELEMETRY} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px' }}
                    formatter={(val: number) => [`R$ ${val} Milhões`, 'Economia em Perdas Evitadas']}
                  />
                  <Bar dataKey="lossesAvoidedM" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
              <span>Principais economias: <strong>Voos não cancelados, cargas preservadas e vidas salvas</strong></span>
              <span className="text-emerald-300 font-bold">Proteção Eficaz</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
