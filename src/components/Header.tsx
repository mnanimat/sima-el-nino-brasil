import React from 'react';
import { 
  ShieldAlert, 
  Plane, 
  Home, 
  Truck, 
  Activity, 
  Radio, 
  Sparkles,
  MapPin, 
  AlertTriangle,
  Satellite,
  BarChart3,
  FileText,
  BookOpen,
  BellRing,
  Bot,
  Layers,
  Globe,
  Scale,
  UserCheck
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  activeAlertCount?: number;
  onOpenChat?: () => void;
  onOpenLegalCenter?: (tab?: 'terms' | 'privacy' | 'age' | 'license' | 'developer') => void;
  isAgeVerified?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  activeAlertCount = 4,
  onOpenChat,
  onOpenLegalCenter,
  isAgeVerified = false,
}) => {
  const navTabs = [
    { id: 'all', label: 'Painel Geral', icon: <Activity className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'satellite', label: 'Satélite SIMA-SAT 1', icon: <Satellite className="w-3.5 h-3.5 text-cyan-300" />, badge: 'NOVO' },
    { id: 'charts', label: 'Gráficos & Telemetria', icon: <BarChart3 className="w-3.5 h-3.5 text-blue-400" /> },
    { id: 'aviation', label: 'Aviação & Pistas', icon: <Plane className="w-3.5 h-3.5 text-sky-400" /> },
    { id: 'housing', label: 'Moradias & Encostas', icon: <Home className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'transport', label: 'Transporte & Rios', icon: <Truck className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'simulator', label: 'Simulador', icon: <Layers className="w-3.5 h-3.5 text-indigo-400" /> },
    { id: 'plancon', label: 'PLANCON IA', icon: <Sparkles className="w-3.5 h-3.5 text-teal-400" /> },
    { id: 'catalog', label: 'Medidas Técnicas', icon: <BookOpen className="w-3.5 h-3.5 text-slate-300" /> },
    { 
      id: 'alerts', 
      label: 'Alertas', 
      icon: <BellRing className="w-3.5 h-3.5 text-rose-400" />, 
      badge: activeAlertCount > 0 ? `${activeAlertCount}` : undefined,
      badgeColor: 'bg-rose-500 text-white'
    },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-xl">
      {/* Top Banner: Real-time Context */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-1.5 flex flex-wrap items-center justify-between gap-2 text-xs border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold tracking-wide text-amber-300">SISTEMA INTEGRADO DE RESILIÊNCIA AO EL NIÑO</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden lg:inline">Defesa Civil • ANAC/DECEA • DNIT • CEMADEN • INPE • CPRM</span>
        </div>

        <div className="flex items-center gap-2.5 text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800 text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span className="text-slate-400">Ambiente: <strong className="text-amber-300 font-medium">Demonstrativo (Dados Simulados)</strong></span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 px-2.5 py-0.5 rounded-full border border-slate-800 text-[11px]">
              <Satellite className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>SIMA-SAT 1: <strong className="text-cyan-300 font-medium">Órbita 1.420</strong></span>
            </div>

          {onOpenLegalCenter && (
            <button
              onClick={() => onOpenLegalCenter('terms')}
              className="flex items-center gap-1 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white px-2.5 py-0.5 rounded-full border border-slate-800 text-[11px] transition-colors"
            >
              <Scale className="w-3 h-3 text-emerald-400" />
              <span>Termos & Licença MIT</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          {/* Logo & Main Title */}
          <div 
            onClick={() => onTabChange('all')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 flex items-center justify-center shadow-lg shadow-emerald-950/50 border border-emerald-400/30 flex-shrink-0 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  SIMA <span className="text-emerald-400 font-extrabold">El Niño Brasil</span>
                </h1>
                <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  v3.0 SAT+AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Mitigação de Impactos na <span className="text-slate-200 font-medium">Aviação</span>, <span className="text-slate-200 font-medium">Moradias</span> e <span className="text-slate-200 font-medium">Transporte</span>
              </p>
            </div>
          </div>

          {/* Quick Trigger Buttons */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={() => onTabChange('satellite')}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'satellite'
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-md shadow-cyan-950/50'
                  : 'bg-cyan-950/40 text-cyan-300 border-cyan-800/60 hover:bg-cyan-900/50'
              }`}
            >
              <Satellite className="w-3.5 h-3.5" />
              <span>Satélite SIMA-SAT 1</span>
            </button>

            <button
              onClick={() => onTabChange('charts')}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'charts'
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-950/50'
                  : 'bg-blue-950/40 text-blue-300 border-blue-800/60 hover:bg-blue-900/50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Dashboard & Gráficos</span>
            </button>

            {onOpenChat && (
              <button
                onClick={onOpenChat}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-950/40 active:scale-95 border border-emerald-400/30"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>Advisor IA</span>
              </button>
            )}
          </div>

        </div>

        {/* Horizontal Navigation Scroll Bar */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-800">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-slate-800 text-white border-slate-600 shadow-sm'
                    : 'bg-slate-950/50 text-slate-400 border-slate-800/80 hover:text-slate-200 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                      tab.badgeColor || 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
