import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Satellite, 
  Orbit, 
  Activity, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  Globe, 
  Layers, 
  Compass, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Zap, 
  Maximize2,
  Cpu,
  Plane,
  Home,
  Truck,
  Eye,
  Send,
  BatteryCharging
} from 'lucide-react';
import { 
  SIMA_SAT_TELEMETRY, 
  SATELLITE_OBSERVATIONS, 
  SATELLITE_PASS_SCHEDULE 
} from '../data/mockElNinoData';
import { SatelliteObservation, RegionId } from '../types';

interface SatelliteMissionModuleProps {
  onSelectRegion?: (region: RegionId | null) => void;
  onGeneratePlan?: (sector: string, region: string, location: string) => void;
}

export const SatelliteMissionModule: React.FC<SatelliteMissionModuleProps> = ({
  onSelectRegion,
  onGeneratePlan
}) => {
  const [telemetry, setTelemetry] = useState(SIMA_SAT_TELEMETRY);
  const [selectedSensor, setSelectedSensor] = useState<
    'InSAR_Displacement' | 'SAR_L_Band_Flood' | 'Thermal_SWIR_Drought' | 'Optical_Multispectral_Smoke'
  >('InSAR_Displacement');
  const [activeObservation, setActiveObservation] = useState<SatelliteObservation | null>(
    SATELLITE_OBSERVATIONS[0]
  );
  const [isLiveSweeping, setIsLiveSweeping] = useState(true);
  const [orbitalAngle, setOrbitalAngle] = useState(42);

  // Satellite Tasking Modal / Form State
  const [showTaskingModal, setShowTaskingModal] = useState(false);
  const [taskRegion, setTaskRegion] = useState('Região Sul (RS/SC)');
  const [taskSensor, setTaskSensor] = useState('SAR Banda-L Polarimétrico (Penetração em Chuva)');
  const [taskPriority, setTaskPriority] = useState('Prioridade Máxima (Emergência Climática)');
  const [taskTarget, setTaskTarget] = useState('Bacia do Guaíba / Aeroporto Salgado Filho (SBPA)');
  const [isTaskingLoading, setIsTaskingLoading] = useState(false);
  const [taskingResult, setTaskingResult] = useState<any | null>(null);

  // Orbital simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setOrbitalAngle((prev) => (prev + 1) % 360);
      setTelemetry((prev) => ({
        ...prev,
        altitudeKm: Number((560.2 + Math.sin(Date.now() / 8000) * 0.4).toFixed(1)),
        downlinkRateMbps: 450 + Math.floor(Math.sin(Date.now() / 4000) * 18),
        batteryLevelPct: Number((94.5 + Math.cos(Date.now() / 15000) * 0.4).toFixed(1))
      }));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  const handleRunTasking = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsTaskingLoading(true);
      const res = await fetch('/api/gemini/satellite-tasking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRegion: taskRegion,
          sensorMode: taskSensor,
          missionPriority: taskPriority,
          specificObservationTarget: taskTarget
        })
      });
      const data = await res.json();
      if (data.observation) {
        setTaskingResult(data.observation);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsTaskingLoading(false);
    }
  };

  const getSensorBadge = (sensorKey: string) => {
    switch (sensorKey) {
      case 'InSAR_Displacement':
        return {
          title: 'DInSAR Interferométrico',
          desc: 'Detecção de deformação milimétrica de encostas e taludes',
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
        };
      case 'SAR_L_Band_Flood':
        return {
          title: 'SAR Banda-L Polarimétrico',
          desc: 'Penetração total em nuvens para espelho d\'água e inundações',
          color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
        };
      case 'Thermal_SWIR_Drought':
        return {
          title: 'Radiômetro SWIR Térmico',
          desc: 'Monitoramento de calado e estiagem profunda em rios amazônicos',
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
        };
      default:
        return {
          title: 'Óptico Multiespectral & AOD',
          desc: 'Profundidade óptica de aerossóis e fumaça de queimadas',
          color: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
        };
    }
  };

  return (
    <div className="space-y-6">
      {/* Satellite Command Banner */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-900 border border-cyan-800/40 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        {/* Animated scanning radar beam in background */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-950/50">
              <Satellite className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  Satélite Dedicado SIMA-SAT 1
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  ÓRBITA ATIVA • INPE / AEB / DCTA
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  DOWNLINK OPERACIONAL 450 Mbps
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Primeiro satélite geo-radar dedicado à resiliência climática contra o El Niño no Brasil. Varredura contínua de inundações em pistas, deformações em encostas e secas fluviais.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowTaskingModal(true)}
              className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-cyan-950/50 active:scale-95 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>Requisitar Varredura Orbital com IA</span>
            </button>
          </div>
        </div>

        {/* Real-time Telemetry Strip */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4 border-t border-slate-800/80 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
              <Orbit className="w-3 h-3 text-cyan-400" /> Altitude Orbital
            </div>
            <div className="text-xs font-bold text-white mt-1">{telemetry.altitudeKm} km (SSO)</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
              <Zap className="w-3 h-3 text-amber-400" /> Velocidade Orbital
            </div>
            <div className="text-xs font-bold text-amber-300 mt-1">{telemetry.speedKmS} km/s (27.288 km/h)</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
              <BatteryCharging className="w-3 h-3 text-emerald-400" /> Bateria & Painéis
            </div>
            <div className="text-xs font-bold text-emerald-300 mt-1">{telemetry.batteryLevelPct}% • Nominal</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
              <Radio className="w-3 h-3 text-sky-400" /> Estação Terrena
            </div>
            <div className="text-xs font-bold text-sky-300 mt-1 truncate" title="Cuiabá (INPE)">Cuiabá (INPE-MT)</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
              <Cpu className="w-3 h-3 text-purple-400" /> Taxa de Dados Banda X
            </div>
            <div className="text-xs font-bold text-purple-300 mt-1">{telemetry.downlinkRateMbps} Mbps</div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-teal-400" /> Período Orbital
            </div>
            <div className="text-xs font-bold text-teal-300 mt-1">{telemetry.orbitalPeriodMin} min / órbita</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Orbit Visualizer & Live Swath + Observations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Orbital Swath Track & Sensor Modes (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                Rastreamento Orbital & Varredura SAR sobre o Brasil
              </h3>
              <p className="text-xs text-slate-400">
                Faixa de varredura ativa: 120 km de largura • Resolução espacial até 1,2 metros
              </p>
            </div>

            <button
              onClick={() => setIsLiveSweeping(!isLiveSweeping)}
              className={`text-xs px-2.5 py-1 rounded-lg border font-semibold flex items-center gap-1.5 transition-colors ${
                isLiveSweeping
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLiveSweeping ? 'animate-spin' : ''}`} />
              <span>{isLiveSweeping ? 'Varredura Ativa' : 'Pausada'}</span>
            </button>
          </div>

          {/* Interactive Orbital Visualization Canvas (SVG Graphic) */}
          <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-xl border border-slate-800 p-3 overflow-hidden flex items-center justify-center">
            
            {/* Grid Coordinates & Reticle */}
            <div className="absolute inset-0 bg-[radial-gradient(#0891b220_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

            {/* Brazil Basemap Silhouette */}
            <svg viewBox="0 0 100 100" className="w-full h-full max-h-[380px] drop-shadow-2xl select-none">
              {/* Brazil Regions Silhouette */}
              <path
                d="M 12,24 L 28,14 L 46,12 L 56,20 L 76,22 L 95,34 L 96,48 L 84,54 L 78,74 L 62,78 L 58,94 L 42,92 L 38,76 L 28,48 L 18,38 Z"
                className="fill-slate-900/90 stroke-slate-700 stroke-[1.2]"
              />

              {/* Ground Stations Coordinates on Map */}
              {/* Cuiabá (INPE) */}
              <circle cx="48" cy="54" r="2.2" className="fill-cyan-400 animate-ping opacity-60" />
              <circle cx="48" cy="54" r="1.5" className="fill-cyan-300" />
              <text x="51" y="55" className="fill-cyan-300 text-[2.8px] font-bold">Estação Cuiabá (INPE)</text>

              {/* Alcântara (MA) */}
              <circle cx="70" cy="24" r="1.5" className="fill-emerald-300" />
              <text x="73" y="25" className="fill-emerald-300 text-[2.8px] font-bold">Alcântara (CEA)</text>

              {/* Santa Maria (RS) */}
              <circle cx="48" cy="85" r="1.5" className="fill-rose-400" />
              <text x="51" y="86" className="fill-rose-300 text-[2.8px] font-bold">Sul (Bacia Guaíba)</text>

              {/* Satellite Orbital Pass Line */}
              <line
                x1="20"
                y1="5"
                x2="75"
                y2="95"
                className="stroke-cyan-500/40 stroke-[0.8] stroke-dasharray-[3,2]"
              />

              {/* Satellite Swath Beam Cone */}
              <polygon
                points="42,42 56,36 68,62 38,68"
                className="fill-cyan-500/15 stroke-cyan-400/40 stroke-[0.6] animate-pulse"
              />

              {/* Current Satellite Sub-point */}
              <g transform="translate(48, 50)">
                <circle cx="0" cy="0" r="4.5" className="fill-cyan-500/20 stroke-cyan-400 stroke-[0.8] animate-ping" />
                <circle cx="0" cy="0" r="2.2" className="fill-cyan-400 stroke-white stroke-[0.5]" />
                {/* Solar Panel Wings */}
                <line x1="-5" y1="0" x2="-2" y2="0" className="stroke-amber-400 stroke-[1.2]" />
                <line x1="2" y1="0" x2="5" y2="0" className="stroke-amber-400 stroke-[1.2]" />
              </g>

              {/* Live Target Reticle */}
              <text x="32" y="10" className="fill-cyan-400 text-[3.2px] font-mono font-bold">
                SIMA-SAT 1 • SUB-ORBITAL VECTOR [LAT -14.2° | LON -51.9°]
              </text>
            </svg>

            {/* Live Observation HUD Overlays */}
            <div className="absolute top-3 left-3 bg-slate-900/90 border border-slate-800 rounded-lg p-2 text-[10px] text-slate-300 backdrop-blur-sm space-y-1">
              <div className="text-[9px] font-bold text-cyan-400 uppercase tracking-wider">Modo Sensor Ativo</div>
              <div className="font-bold text-white">{getSensorBadge(selectedSensor).title}</div>
              <div className="text-[9px] text-slate-400">Banda L (1.27 GHz) • Polarização HH/HV</div>
            </div>

            <div className="absolute bottom-3 right-3 bg-slate-900/90 border border-slate-800 rounded-lg p-2 text-[10px] text-slate-300 backdrop-blur-sm text-right space-y-0.5">
              <div className="text-[9px] font-bold text-emerald-400">PRÓXIMO REPASSE EM TERRA</div>
              <div className="font-bold text-white">12:45 UTC (Bacia do Guaíba)</div>
              <div className="text-[9px] text-slate-400">Tempo de visada útil: 6m 20s</div>
            </div>
          </div>

          {/* Sensor Selector Pills */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 block">
              Cargas Úteis & Sensores a Bordo do SIMA-SAT 1:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                {
                  id: 'InSAR_Displacement' as const,
                  icon: <Activity className="w-3.5 h-3.5 text-amber-400" />,
                  title: 'DInSAR Interferométrico (Encostas)',
                  desc: 'Detecta movimentação de maciços a partir de 1 mm/semana'
                },
                {
                  id: 'SAR_L_Band_Flood' as const,
                  icon: <Layers className="w-3.5 h-3.5 text-cyan-400" />,
                  title: 'SAR Banda-L (Pistas & Inundações)',
                  desc: 'Mapeia lâmina d\'água através de nuvens e chuva torrencial'
                },
                {
                  id: 'Thermal_SWIR_Drought' as const,
                  icon: <Truck className="w-3.5 h-3.5 text-emerald-400" />,
                  title: 'SWIR Térmico (Seca Hidroviária)',
                  desc: 'Monitora pedrais e calado crítico nos Rios Madeira e Solimões'
                },
                {
                  id: 'Optical_Multispectral_Smoke' as const,
                  icon: <Plane className="w-3.5 h-3.5 text-rose-400" />,
                  title: 'Multiespectral & AOD (Fumaça)',
                  desc: 'Calcula dispersão de aerossóis em rotas de aproximação aérea'
                }
              ].map((s) => {
                const isSelected = selectedSensor === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSensor(s.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md shadow-cyan-950/40'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <div className="mt-0.5">{s.icon}</div>
                    <div>
                      <div className="text-xs font-bold text-slate-100">{s.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{s.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Live Anomaly Sweeps & Mission Passes (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Anomaly Inspection Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Diagnóstico de Anomalias Detectadas por Radar
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                IA ORBITAL
              </span>
            </div>

            {/* List of recent sweeps */}
            <div className="space-y-2.5">
              {SATELLITE_OBSERVATIONS.map((obs) => {
                const isSelected = activeObservation?.id === obs.id;
                const isCrit = obs.severity === 'critico';
                const isHigh = obs.severity === 'alto';

                return (
                  <div
                    key={obs.id}
                    onClick={() => setActiveObservation(obs)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-950 border-cyan-500 shadow-lg ring-1 ring-cyan-500/40'
                        : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" /> {obs.timestamp}
                      </span>
                      <span
                        className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded border ${
                          isCrit
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : isHigh
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                        }`}
                      >
                        {obs.severity} • {obs.confidencePct}% Confiança
                      </span>
                    </div>

                    <div className="font-bold text-white text-xs mt-1.5">{obs.locationName}</div>
                    <div className="text-[11px] text-cyan-300 font-medium mt-0.5">{obs.primaryAnomaly}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{obs.displacementMmOrLevel}</div>

                    {isSelected && (
                      <div className="mt-3 pt-2.5 border-t border-slate-800 text-xs space-y-2">
                        <div className="p-2.5 bg-slate-900/90 rounded-lg border border-slate-800 text-slate-300 text-[11px] leading-relaxed">
                          <strong className="text-cyan-300 font-semibold flex items-center gap-1 mb-1">
                            <Sparkles className="w-3 h-3" /> Parecer de Radar SIMA-SAT:
                          </strong>
                          {obs.aiInterpretation}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onGeneratePlan) {
                                onGeneratePlan('Satélite / Integrado', obs.targetRegion, obs.locationName);
                              }
                            }}
                            className="flex-1 py-1.5 px-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors shadow"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Gerar PLANCON para este Alvo</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Satellite Orbit Schedule */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <h3 className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Próximos Revôos Programados (Pass Schedule)
            </h3>
            
            <div className="space-y-2 text-xs">
              {SATELLITE_PASS_SCHEDULE.map((p) => (
                <div key={p.passId} className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span className="text-cyan-400 font-mono text-[11px]">{p.passId}</span>
                      <span>• {p.targetRegion}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{p.sensorPayload}</div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      {p.scheduledTime}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Tasking Modal: Disparar Varredura com IA */}
      {showTaskingModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Requisitar Varredura Orbital de Radar com IA (SIMA-SAT 1)
              </h3>
              <button
                onClick={() => {
                  setShowTaskingModal(false);
                  setTaskingResult(null);
                }}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            {!taskingResult ? (
              <form onSubmit={handleRunTasking} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Região Alvo de Varredura:</label>
                  <select
                    value={taskRegion}
                    onChange={(e) => setTaskRegion(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Região Sul (RS/SC)">Região Sul (RS/SC - Inundações e Bacias)</option>
                    <option value="Região Sudeste (SP/RJ)">Região Sudeste (SP/RJ - Encostas e Serra do Mar)</option>
                    <option value="Região Norte (AM/RO)">Região Norte (AM/RO - Seca de Rios e Queimadas)</option>
                    <option value="Região Nordeste">Região Nordeste (Semiárido e Barreiras Urbanas)</option>
                    <option value="Região Centro-Oeste">Região Centro-Oeste (Pantanal e Escoamento)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Modo de Operação do Radar Orbital:</label>
                  <select
                    value={taskSensor}
                    onChange={(e) => setTaskSensor(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="SAR Banda-L Polarimétrico (Penetração em Chuva)">SAR Banda-L Polarimétrico (Penetração em Chuva e Nuvens)</option>
                    <option value="DInSAR Interferométrico (Deformação de Encostas)">DInSAR Interferométrico (Deformação Milimétrica de Encostas)</option>
                    <option value="Radiômetro SWIR Térmico (Seca e Vazante)">Radiômetro SWIR Térmico (Seca Extrema e Vazante)</option>
                    <option value="Imageador Multiespectral & AOD (Fumaça)">Imageador Multiespectral & AOD (Fumaça e Visibilidade Aérea)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Local / Infraestrutura Específica:</label>
                  <input
                    type="text"
                    required
                    value={taskTarget}
                    onChange={(e) => setTaskTarget(e.target.value)}
                    placeholder="Ex: Aeroporto Salgado Filho, Serra das Araras, Hidrovia Madeira..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Prioridade da Tarefa:</label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Prioridade Máxima (Emergência Climática)">Prioridade Máxima (Emergência Climática D-0)</option>
                    <option value="Prioridade Alta (Prevenção Antecipada)">Prioridade Alta (Prevenção Antecipada D-3)</option>
                    <option value="Monitoramento de Rotina">Monitoramento de Rotina</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowTaskingModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isTaskingLoading}
                    className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/50 disabled:opacity-50"
                  >
                    {isTaskingLoading ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>{isTaskingLoading ? 'Processando Varredura...' : 'Transmitir Ordem de Varredura'}</span>
                  </button>
                </div>
              </form>
            ) : (
              /* Tasking Result Display */
              <div className="space-y-3.5 text-xs">
                <div className="p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-xl space-y-1">
                  <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                    ID DA TAREFA: {taskingResult.taskingId} • {taskingResult.radarSweepStatus}
                  </div>
                  <div className="text-sm font-bold text-white">{taskingResult.targetArea}</div>
                  <div className="text-slate-300 text-[11px]">
                    Cobertura: {taskingResult.swathCoverageKm2} km² • Resolução: {taskingResult.resolutionMeters}
                  </div>
                </div>

                <div>
                  <div className="font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> Anomalias Detectadas pelo Radar:
                  </div>
                  <ul className="space-y-1 text-slate-300 text-[11px] bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    {taskingResult.detectedAnomalies?.map((anom: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0"></span>
                        <span>{anom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-300 text-[11px] leading-relaxed">
                  <div className="font-bold text-cyan-300 mb-1">Parecer Tático do SIMA-SAT:</div>
                  {taskingResult.aiTacticalAssessment}
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setTaskingResult(null)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                  >
                    Nova Requisição
                  </button>
                  <button
                    onClick={() => {
                      setShowTaskingModal(false);
                      setTaskingResult(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
                  >
                    Concluir & Voltar ao Radar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
