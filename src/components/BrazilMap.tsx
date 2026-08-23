import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Hotspot, 
  RegionId, 
  SectorType, 
  RiskLevel 
} from '../types';
import { REGIONS_DATA, HOTSPOTS_DATA } from '../data/mockElNinoData';
import { 
  Plane, 
  Home, 
  Truck, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  Info,
  ChevronRight,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Layers
} from 'lucide-react';

interface BrazilMapProps {
  activeSector: SectorType;
  selectedRegion: RegionId | null;
  onSelectRegion: (region: RegionId | null) => void;
  selectedHotspot: Hotspot | null;
  onSelectHotspot: (hotspot: Hotspot | null) => void;
  onGeneratePlan: (sector: string, region: string, location: string) => void;
}

export const BrazilMap: React.FC<BrazilMapProps> = ({
  activeSector,
  selectedRegion,
  onSelectRegion,
  selectedHotspot,
  onSelectHotspot,
  onGeneratePlan,
}) => {
  const [hoveredRegion, setHoveredRegion] = useState<RegionId | null>(null);

  // Filter hotspots based on active sector
  const filteredHotspots = HOTSPOTS_DATA.filter((h) => {
    if (activeSector === 'all') return true;
    if (h.sector === 'multi') return true;
    return h.sector === activeSector;
  });

  const getRiskColor = (risk: RiskLevel) => {
    switch (risk) {
      case 'critico':
        return 'text-rose-400 bg-rose-500/20 border-rose-500/50';
      case 'alto':
        return 'text-amber-400 bg-amber-500/20 border-amber-500/50';
      case 'moderado':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      default:
        return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/50';
    }
  };

  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case 'aviation':
        return <Plane className="w-3.5 h-3.5" />;
      case 'housing':
        return <Home className="w-3.5 h-3.5" />;
      case 'transport':
        return <Truck className="w-3.5 h-3.5" />;
      default:
        return <Activity className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Map Interactive Canvas (7 cols on desktop) */}
      <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl relative overflow-hidden backdrop-blur-sm">
        
        {/* Header inside map */}
        <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Radar Georreferenciado de Riscos do El Niño
            </h2>
            <p className="text-xs text-slate-400">
              Selecione uma macro-região ou clique nos pontos de monitoramento para inspecionar
            </p>
          </div>

          <div className="flex items-center gap-2">
            {selectedRegion && (
              <button
                onClick={() => onSelectRegion(null)}
                className="text-[11px] font-medium px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              >
                Limpar Filtro
              </button>
            )}
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {filteredHotspots.length} Focos Mapeados
            </span>
          </div>
        </div>

        {/* Region Quick Select Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(['sul', 'sudeste', 'norte', 'nordeste', 'centro_oeste'] as RegionId[]).map((rId) => {
            const reg = REGIONS_DATA[rId];
            const isSelected = selectedRegion === rId;
            return (
              <button
                key={rId}
                id={`region-pill-${rId}`}
                onClick={() => onSelectRegion(isSelected ? null : rId)}
                className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/40'
                    : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600 hover:bg-slate-800'
                }`}
              >
                {reg.name.split(' (')[0]}
              </button>
            );
          })}
        </div>

        {/* SVG Brazil Map Container */}
        <div className="relative w-full aspect-[4/3.8] bg-slate-950/60 rounded-xl border border-slate-800/80 p-2 sm:p-4 flex items-center justify-center overflow-hidden">
          
          {/* Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

          {/* Brazil Macro-Regions SVG */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full max-h-[460px] drop-shadow-2xl select-none"
            style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }}
          >
            {/* Region: NORTE */}
            <path
              id="map-region-norte"
              d="M 12,24 L 28,14 L 46,12 L 56,20 L 52,38 L 44,48 L 26,48 L 18,38 Z"
              className={`transition-all duration-300 cursor-pointer ${
                selectedRegion === 'norte'
                  ? 'fill-cyan-900/80 stroke-cyan-400 stroke-[1.5]'
                  : hoveredRegion === 'norte'
                  ? 'fill-cyan-950/90 stroke-cyan-500 stroke-[1.2]'
                  : 'fill-slate-800/70 stroke-slate-700 hover:fill-slate-800 stroke-[0.8]'
              }`}
              onMouseEnter={() => setHoveredRegion('norte')}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => onSelectRegion(selectedRegion === 'norte' ? null : 'norte')}
            />

            {/* Region: NORDESTE */}
            <path
              id="map-region-nordeste"
              d="M 56,20 L 76,22 L 95,34 L 96,48 L 84,54 L 68,52 L 54,38 Z"
              className={`transition-all duration-300 cursor-pointer ${
                selectedRegion === 'nordeste'
                  ? 'fill-amber-900/80 stroke-amber-400 stroke-[1.5]'
                  : hoveredRegion === 'nordeste'
                  ? 'fill-amber-950/90 stroke-amber-500 stroke-[1.2]'
                  : 'fill-slate-800/70 stroke-slate-700 hover:fill-slate-800 stroke-[0.8]'
              }`}
              onMouseEnter={() => setHoveredRegion('nordeste')}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => onSelectRegion(selectedRegion === 'nordeste' ? null : 'nordeste')}
            />

            {/* Region: CENTRO-OESTE */}
            <path
              id="map-region-centro_oeste"
              d="M 28,48 L 44,48 L 52,38 L 68,52 L 64,68 L 48,70 L 38,62 Z"
              className={`transition-all duration-300 cursor-pointer ${
                selectedRegion === 'centro_oeste'
                  ? 'fill-emerald-900/80 stroke-emerald-400 stroke-[1.5]'
                  : hoveredRegion === 'centro_oeste'
                  ? 'fill-emerald-950/90 stroke-emerald-500 stroke-[1.2]'
                  : 'fill-slate-800/70 stroke-slate-700 hover:fill-slate-800 stroke-[0.8]'
              }`}
              onMouseEnter={() => setHoveredRegion('centro_oeste')}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => onSelectRegion(selectedRegion === 'centro_oeste' ? null : 'centro_oeste')}
            />

            {/* Region: SUDESTE */}
            <path
              id="map-region-sudeste"
              d="M 68,52 L 84,54 L 78,74 L 62,78 L 64,68 Z"
              className={`transition-all duration-300 cursor-pointer ${
                selectedRegion === 'sudeste'
                  ? 'fill-orange-900/80 stroke-orange-400 stroke-[1.5]'
                  : hoveredRegion === 'sudeste'
                  ? 'fill-orange-950/90 stroke-orange-500 stroke-[1.2]'
                  : 'fill-slate-800/70 stroke-slate-700 hover:fill-slate-800 stroke-[0.8]'
              }`}
              onMouseEnter={() => setHoveredRegion('sudeste')}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => onSelectRegion(selectedRegion === 'sudeste' ? null : 'sudeste')}
            />

            {/* Region: SUL */}
            <path
              id="map-region-sul"
              d="M 48,70 L 62,78 L 58,94 L 42,92 L 38,76 Z"
              className={`transition-all duration-300 cursor-pointer ${
                selectedRegion === 'sul'
                  ? 'fill-rose-900/80 stroke-rose-400 stroke-[1.5]'
                  : hoveredRegion === 'sul'
                  ? 'fill-rose-950/90 stroke-rose-500 stroke-[1.2]'
                  : 'fill-slate-800/70 stroke-slate-700 hover:fill-slate-800 stroke-[0.8]'
              }`}
              onMouseEnter={() => setHoveredRegion('sul')}
              onMouseLeave={() => setHoveredRegion(null)}
              onClick={() => onSelectRegion(selectedRegion === 'sul' ? null : 'sul')}
            />

            {/* Region Labels on Map */}
            <text x="34" y="30" className="fill-slate-400 text-[3.8px] font-bold tracking-wider uppercase pointer-events-none opacity-80">
              Norte (Seca Extrema)
            </text>
            <text x="70" y="38" className="fill-slate-400 text-[3.8px] font-bold tracking-wider uppercase pointer-events-none opacity-80">
              Nordeste
            </text>
            <text x="36" y="58" className="fill-slate-400 text-[3.8px] font-bold tracking-wider uppercase pointer-events-none opacity-80">
              Centro-Oeste
            </text>
            <text x="66" y="66" className="fill-slate-400 text-[3.8px] font-bold tracking-wider uppercase pointer-events-none opacity-80">
              Sudeste
            </text>
            <text x="44" y="82" className="fill-slate-400 text-[3.8px] font-bold tracking-wider uppercase pointer-events-none opacity-80">
              Sul (Inundações)
            </text>
          </svg>

          {/* Hotspot Interactive Nodes with absolute percentage coordinates */}
          {filteredHotspots.map((hotspot) => {
            const isSelected = selectedHotspot?.id === hotspot.id;
            const isCritical = hotspot.riskLevel === 'critico';
            const isHigh = hotspot.riskLevel === 'alto';

            return (
              <div
                key={hotspot.id}
                style={{
                  left: `${hotspot.xSvg}%`,
                  top: `${hotspot.ySvg}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
              >
                {/* Pulsing Radar Ring */}
                <span
                  className={`absolute -inset-2 rounded-full opacity-60 animate-ping pointer-events-none ${
                    isCritical
                      ? 'bg-rose-500'
                      : isHigh
                      ? 'bg-amber-500'
                      : 'bg-yellow-500'
                  }`}
                ></span>

                {/* Main Hotspot Pin */}
                <button
                  id={`hotspot-pin-${hotspot.id}`}
                  onClick={() => onSelectHotspot(isSelected ? null : hotspot)}
                  className={`relative p-1.5 rounded-full border-2 transition-transform transform active:scale-90 hover:scale-125 shadow-lg flex items-center justify-center ${
                    isSelected
                      ? 'bg-white text-slate-950 border-emerald-400 scale-125 ring-4 ring-emerald-500/40 z-30'
                      : isCritical
                      ? 'bg-rose-600 text-white border-rose-200 shadow-rose-950/60'
                      : isHigh
                      ? 'bg-amber-600 text-white border-amber-200 shadow-amber-950/60'
                      : 'bg-yellow-500 text-slate-950 border-yellow-200'
                  }`}
                  title={`${hotspot.name} - ${hotspot.primaryThreat}`}
                >
                  {getSectorIcon(hotspot.sector)}
                </button>

                {/* Hover Quick Card */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-40 w-52 p-2.5 bg-slate-900 text-slate-100 text-[11px] rounded-lg border border-slate-700 shadow-2xl pointer-events-none">
                  <div className="font-bold text-slate-200 truncate">{hotspot.name}</div>
                  <div className="text-[10px] text-slate-400">{hotspot.state}</div>
                  <div className="mt-1 text-rose-300 font-medium line-clamp-2">
                    {hotspot.primaryThreat}
                  </div>
                  <div className="mt-1 pt-1 border-t border-slate-800 text-[9px] text-slate-400 flex items-center justify-between">
                    <span>Clique para detalhes</span>
                    <span className="uppercase font-bold text-amber-400">{hotspot.riskLevel}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Map Controls & Status Overlay */}
          <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 rounded-lg p-2 text-[10px] text-slate-400 backdrop-blur-sm space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              <span>Risco Crítico (Ação D-0)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span>Risco Alto (Prevenção D-3)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block"></span>
              <span>Risco Moderado (Vigilância)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Inspector Panel (5 cols on desktop) */}
      <div className="lg:col-span-5 space-y-4">
        
        {/* Hotspot Selected Detail */}
        {selectedHotspot ? (
          <motion.div 
            id="hotspot-detail-panel"
            animate={
              selectedHotspot.riskLevel === 'critico'
                ? {
                    borderColor: [
                      'rgba(244, 63, 94, 0.45)',
                      'rgba(239, 68, 68, 0.95)',
                      'rgba(244, 63, 94, 0.45)'
                    ],
                    backgroundColor: [
                      'rgba(15, 23, 42, 0.95)',
                      'rgba(69, 10, 10, 0.4)',
                      'rgba(15, 23, 42, 0.95)'
                    ],
                    boxShadow: [
                      '0 0 0px rgba(244, 63, 94, 0.15)',
                      '0 0 28px rgba(239, 68, 68, 0.4)',
                      '0 0 0px rgba(244, 63, 94, 0.15)'
                    ]
                  }
                : {
                    borderColor: 'rgba(30, 41, 59, 1)',
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
                  }
            }
            transition={
              selectedHotspot.riskLevel === 'critico'
                ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
            className="border rounded-2xl p-5 shadow-xl backdrop-blur-sm relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                {selectedHotspot.riskLevel === 'critico' ? (
                  <motion.span 
                    animate={{
                      scale: [1, 1.06, 1],
                      opacity: [0.9, 1, 0.9]
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full border bg-rose-500/25 text-rose-200 border-rose-500/60 inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    {selectedHotspot.riskLevel} • {selectedHotspot.civilDefenseLevel}
                  </motion.span>
                ) : (
                  <span className={`text-[10px] uppercase font-extrabold px-2.5 py-0.5 rounded-full border ${getRiskColor(selectedHotspot.riskLevel)}`}>
                    {selectedHotspot.riskLevel} • {selectedHotspot.civilDefenseLevel}
                  </span>
                )}
                <h3 className="text-base font-bold text-white mt-2">
                  {selectedHotspot.name}
                </h3>
                <p className="text-xs text-slate-400">{selectedHotspot.state}</p>
              </div>

              <button
                onClick={() => onSelectHotspot(null)}
                className="text-xs text-slate-500 hover:text-slate-300 p-1"
              >
                ✕
              </button>
            </div>

            {/* Threat Description */}
            <div className="mt-3.5 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
              <div className="text-xs font-semibold text-rose-400 flex items-center gap-1.5 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                Ameaça Primária do El Niño:
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedHotspot.primaryThreat}
              </p>
              {selectedHotspot.historicalPrecedent && (
                <div className="mt-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 italic">
                  <strong>Precedente Histórico:</strong> {selectedHotspot.historicalPrecedent}
                </div>
              )}
            </div>

            {/* Live Metrics Grid */}
            <div className="mt-4">
              <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Telemetria em Tempo Real:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {selectedHotspot.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg border text-xs ${
                      m.isCritical
                        ? 'bg-rose-950/40 border-rose-800/50 text-rose-200'
                        : 'bg-slate-800/70 border-slate-700/60 text-slate-200'
                    }`}
                  >
                    <div className="text-[10px] text-slate-400 font-medium truncate">{m.label}</div>
                    <div className="text-xs font-bold mt-0.5">{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Satellite InSAR / SAR Radar Telemetry (if available) */}
            {selectedHotspot.satelliteData && (
              <div className="mt-3.5 p-3 rounded-xl bg-cyan-950/40 border border-cyan-800/50 text-xs text-cyan-200 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-cyan-300">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    Varredura Radar SIMA-SAT 1
                  </span>
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-200 px-2 py-0.5 rounded border border-cyan-500/30">
                    {selectedHotspot.satelliteData.insarInterferometry}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300">
                  <strong>Status Radar:</strong> {selectedHotspot.satelliteData.floodSwathDetection}
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1 border-t border-cyan-900/60">
                  <span>Revôo orbital: <strong>{selectedHotspot.satelliteData.orbitalPassFrequency}</strong></span>
                  <span>Última visada: {selectedHotspot.satelliteData.lastSwathDate}</span>
                </div>
              </div>
            )}

            {/* Active Mitigation Measures */}
            <div className="mt-4">
              <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                Medidas Preventivas & Contramedidas Ativas:
              </div>
              <ul className="space-y-1.5">
                {selectedHotspot.activeMeasures.map((measure, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2 bg-slate-950/40 p-2 rounded-lg border border-slate-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                    <span>{measure}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contingency Hub Info */}
            {selectedHotspot.contingencyHub && (
              <div className="mt-3 p-2.5 rounded-lg bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-200 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-cyan-300">Hub / Rota de Contingência:</span>{' '}
                  {selectedHotspot.contingencyHub}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
              <button
                id="btn-generate-hotspot-plan"
                onClick={() =>
                  onGeneratePlan(
                    selectedHotspot.sector,
                    selectedHotspot.region,
                    selectedHotspot.name
                  )
                }
                className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-md active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gerar Plano com IA</span>
              </button>
            </div>

          </motion.div>
        ) : selectedRegion ? (
          /* Regional Summary Card */
          (() => {
            const reg = REGIONS_DATA[selectedRegion];
            return (
              <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      Panorama Regional
                    </span>
                    <h3 className="text-base font-bold text-white mt-1.5">{reg.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-semibold">Vulnerabilidade</div>
                    <div className="text-lg font-black text-rose-400">{reg.vulnerabilityIndex}/100</div>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-xl">
                  <div className="text-xs font-semibold text-amber-300 mb-1">Padrão El Niño na Região:</div>
                  <p className="text-xs text-slate-300 leading-relaxed">{reg.elNinoPattern}</p>
                </div>

                {/* Sector Status Cards with Framer-Motion Pulsing when Critical */}
                <div className="space-y-2.5">
                  {/* Aviation Status Card */}
                  <motion.div 
                    id="map-status-aviation"
                    animate={
                      reg.aviationStatus.status === 'critico'
                        ? {
                            borderColor: [
                              'rgba(244, 63, 94, 0.4)',
                              'rgba(239, 68, 68, 0.95)',
                              'rgba(244, 63, 94, 0.4)'
                            ],
                            backgroundColor: [
                              'rgba(15, 23, 42, 0.7)',
                              'rgba(69, 10, 10, 0.35)',
                              'rgba(15, 23, 42, 0.7)'
                            ],
                            boxShadow: [
                              '0 0 0px rgba(244, 63, 94, 0.1)',
                              '0 0 16px rgba(239, 68, 68, 0.35)',
                              '0 0 0px rgba(244, 63, 94, 0.1)'
                            ],
                            scale: [1, 1.01, 1]
                          }
                        : {
                            borderColor: 'rgba(30, 41, 59, 1)',
                            backgroundColor: 'rgba(2, 6, 23, 0.5)',
                            boxShadow: 'none',
                            scale: 1
                          }
                    }
                    transition={
                      reg.aviationStatus.status === 'critico'
                        ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 0.3 }
                    }
                    className="p-3 rounded-xl border relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-sky-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5" /> Aviação Regional
                      </span>
                      {reg.aviationStatus.status === 'critico' ? (
                        <motion.span 
                          animate={{
                            scale: [1, 1.08, 1],
                            opacity: [0.85, 1, 0.85]
                          }}
                          transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          className="text-[10px] uppercase px-2 py-0.5 rounded border bg-rose-500/25 text-rose-200 border-rose-500/60 font-black flex items-center gap-1 shadow-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                          CRÍTICO
                        </motion.span>
                      ) : (
                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded border ${getRiskColor(reg.aviationStatus.status)}`}>
                          {reg.aviationStatus.status}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300">{reg.aviationStatus.impactSummary}</p>
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>{reg.aviationStatus.monitoredAirports} aeroportos monitorados</span>
                      <span>Probabilidade de atraso: <strong className="text-sky-300">{reg.aviationStatus.delayProbability}%</strong></span>
                    </div>
                  </motion.div>

                  {/* Housing Status Card */}
                  <motion.div 
                    id="map-status-housing"
                    animate={
                      reg.housingStatus.status === 'critico'
                        ? {
                            borderColor: [
                              'rgba(244, 63, 94, 0.4)',
                              'rgba(239, 68, 68, 0.95)',
                              'rgba(244, 63, 94, 0.4)'
                            ],
                            backgroundColor: [
                              'rgba(15, 23, 42, 0.7)',
                              'rgba(69, 10, 10, 0.35)',
                              'rgba(15, 23, 42, 0.7)'
                            ],
                            boxShadow: [
                              '0 0 0px rgba(244, 63, 94, 0.1)',
                              '0 0 16px rgba(239, 68, 68, 0.35)',
                              '0 0 0px rgba(244, 63, 94, 0.1)'
                            ],
                            scale: [1, 1.01, 1]
                          }
                        : {
                            borderColor: 'rgba(30, 41, 59, 1)',
                            backgroundColor: 'rgba(2, 6, 23, 0.5)',
                            boxShadow: 'none',
                            scale: 1
                          }
                    }
                    transition={
                      reg.housingStatus.status === 'critico'
                        ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 0.3 }
                    }
                    className="p-3 rounded-xl border relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-amber-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Home className="w-3.5 h-3.5" /> Moradias & Encostas
                      </span>
                      {reg.housingStatus.status === 'critico' ? (
                        <motion.span 
                          animate={{
                            scale: [1, 1.08, 1],
                            opacity: [0.85, 1, 0.85]
                          }}
                          transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          className="text-[10px] uppercase px-2 py-0.5 rounded border bg-rose-500/25 text-rose-200 border-rose-500/60 font-black flex items-center gap-1 shadow-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                          CRÍTICO
                        </motion.span>
                      ) : (
                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded border ${getRiskColor(reg.housingStatus.status)}`}>
                          {reg.housingStatus.status}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300">{reg.housingStatus.impactSummary}</p>
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
                      <span>{reg.housingStatus.slopesMonitored} encostas monitoradas</span>
                      <span>Famílias em risco: <strong className="text-amber-300">{reg.housingStatus.familiesInRiskZones.toLocaleString()}</strong></span>
                    </div>
                  </motion.div>

                  {/* Transport Status Card */}
                  <motion.div 
                    id="map-status-transport"
                    animate={
                      reg.transportStatus.status === 'critico'
                        ? {
                            borderColor: [
                              'rgba(244, 63, 94, 0.4)',
                              'rgba(239, 68, 68, 0.95)',
                              'rgba(244, 63, 94, 0.4)'
                            ],
                            backgroundColor: [
                              'rgba(15, 23, 42, 0.7)',
                              'rgba(69, 10, 10, 0.35)',
                              'rgba(15, 23, 42, 0.7)'
                            ],
                            boxShadow: [
                              '0 0 0px rgba(244, 63, 94, 0.1)',
                              '0 0 16px rgba(239, 68, 68, 0.35)',
                              '0 0 0px rgba(244, 63, 94, 0.1)'
                            ],
                            scale: [1, 1.01, 1]
                          }
                        : {
                            borderColor: 'rgba(30, 41, 59, 1)',
                            backgroundColor: 'rgba(2, 6, 23, 0.5)',
                            boxShadow: 'none',
                            scale: 1
                          }
                    }
                    transition={
                      reg.transportStatus.status === 'critico'
                        ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 0.3 }
                    }
                    className="p-3 rounded-xl border relative overflow-hidden"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5" /> Transporte & Vias
                      </span>
                      {reg.transportStatus.status === 'critico' ? (
                        <motion.span 
                          animate={{
                            scale: [1, 1.08, 1],
                            opacity: [0.85, 1, 0.85]
                          }}
                          transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          className="text-[10px] uppercase px-2 py-0.5 rounded border bg-rose-500/25 text-rose-200 border-rose-500/60 font-black flex items-center gap-1 shadow-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                          CRÍTICO
                        </motion.span>
                      ) : (
                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded border ${getRiskColor(reg.transportStatus.status)}`}>
                          {reg.transportStatus.status}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300">{reg.transportStatus.impactSummary}</p>
                    <div className="mt-2 text-[11px] text-slate-400">
                      <span>{reg.transportStatus.criticalHighwaysKm} km de rodovias críticas sob alerta</span>
                    </div>
                  </motion.div>
                </div>

                <button
                  id="btn-generate-regional-plan"
                  onClick={() => onGeneratePlan('Integrado', reg.name, `Região ${reg.name}`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-md active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Gerar PLANCON Regional com IA</span>
                </button>
              </div>
            );
          })()
        ) : (
          /* Default Prompt when no region or hotspot is selected */
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-sm space-y-4">
            <div className="text-center py-6 px-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <Info className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-100">
                Selecione uma Região ou Ponto Crítico no Mapa
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 max-w-sm mx-auto">
                Explore os 10 hotspots estratégicos para inspecionar parâmetros de telemetria, histórico de enchentes/secas e protocolos de engenharia.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300">Destaques Estratégicos:</div>
              {filteredHotspots.slice(0, 3).map((h) => (
                <button
                  key={h.id}
                  onClick={() => onSelectHotspot(h)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800 border border-slate-800 flex items-center justify-between text-xs transition-colors group"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-emerald-400">{getSectorIcon(h.sector)}</span>
                    <span className="font-medium text-slate-200 group-hover:text-white truncate">
                      {h.name}
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
