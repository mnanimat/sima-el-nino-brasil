import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Plane, 
  Home, 
  Truck, 
  Layers, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PREVENTION_MEASURES_CATALOG } from '../data/mockElNinoData';
import { PreventionMeasure } from '../types';

export const PreventionMeasuresCatalog: React.FC = () => {
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = PREVENTION_MEASURES_CATALOG.filter((m) => {
    if (sectorFilter !== 'all' && m.sector !== sectorFilter && m.sector !== 'transversal') return false;
    if (categoryFilter !== 'all' && m.category !== categoryFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = m.title.toLowerCase().includes(q);
      const matchSummary = m.summary.toLowerCase().includes(q);
      const matchLaw = m.brazilianStandardOrLaw.toLowerCase().includes(q);
      if (!matchTitle && !matchSummary && !matchLaw) return false;
    }
    return true;
  });

  const getSectorBadge = (sector: string) => {
    switch (sector) {
      case 'aviation':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center gap-1">
            <Plane className="w-3 h-3" /> Aviação
          </span>
        );
      case 'housing':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
            <Home className="w-3 h-3" /> Moradias
          </span>
        );
      case 'transport':
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <Truck className="w-3 h-3" /> Transporte
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
            <Layers className="w-3 h-3" /> Multissetorial
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-slate-900 border border-teal-800/40 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  Catálogo de Soluções de Engenharia & Políticas Públicas
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  NORMAS ABNT • RBAC • SINPDEC
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Guia técnico com métodos comprovados para mitigar desastres do El Niño na infraestrutura nacional.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por tecnologia, norma ou palavra-chave..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500"
            />
          </div>

          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="all">Todos os Setores</option>
            <option value="aviation">Aviação</option>
            <option value="housing">Moradias</option>
            <option value="transport">Transporte</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-medium focus:outline-none focus:border-teal-500"
          >
            <option value="all">Todas as Categorias</option>
            <option value="estrutural">Estrutural (Obras)</option>
            <option value="tecnologica">Tecnológica (Sensores/IA)</option>
            <option value="operacional">Operacional (Protocolos)</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Exibindo <strong className="text-teal-400">{filtered.length}</strong> medidas
        </div>
      </div>

      {/* Measures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((measure) => {
          const isExpanded = expandedId === measure.id;

          return (
            <div
              key={measure.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  {getSectorBadge(measure.sector)}
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {measure.category}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug">
                  {measure.title}
                </h3>

                <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                  {measure.summary}
                </p>

                {/* Key Tags */}
                <div className="mt-3.5 pt-3 border-t border-slate-800 space-y-1.5 text-[11px]">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" /> Prazo de Execução:
                    </span>
                    <strong className="text-slate-200">{measure.timeframe}</strong>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-amber-400" /> Custo Estimado:
                    </span>
                    <strong className="text-slate-200">{measure.implementationCost}</strong>
                  </div>

                  <div className="flex items-center justify-between text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Eficácia:
                    </span>
                    <strong className="text-emerald-300">{measure.efficiencyRate}</strong>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-800 space-y-2.5 text-xs text-slate-300">
                    <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                      <div className="font-bold text-teal-300 mb-1">Como Funciona na Prática:</div>
                      <p className="text-[11px] leading-relaxed text-slate-300">{measure.howItWorks}</p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                      <div className="font-bold text-sky-300 mb-1">Norma / Legislação Aplicável:</div>
                      <div className="text-[11px] text-slate-300">{measure.brazilianStandardOrLaw}</div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                      <div className="font-bold text-amber-300 mb-1">Exemplo Real no Brasil:</div>
                      <div className="text-[11px] text-slate-300">{measure.realWorldApplication}</div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => setExpandedId(isExpanded ? null : measure.id)}
                className="mt-4 pt-2 border-t border-slate-800/80 w-full text-center text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center justify-center gap-1 transition-colors"
              >
                <span>{isExpanded ? 'Ocultar Detalhes Técnicos' : 'Ver Detalhes Técnicos & Normas'}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
