import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Sparkles, 
  Plane, 
  Home, 
  Truck, 
  DollarSign, 
  Calendar, 
  Flame, 
  Layers, 
  CheckCircle2,
  RefreshCw,
  TrendingDown
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { SimulationParams, RegionId } from '../types';

export const ScenarioSimulator: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    intensity: 'forte',
    season: 'primavera_verao',
    preventionLevel: 'avancado',
    targetRegion: 'nacional',
  });

  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Compute calculated impacts based on simulation parameters
  const simulationResults = useMemo(() => {
    let intensityMultiplier = 1.0;
    if (params.intensity === 'fraco') intensityMultiplier = 0.6;
    if (params.intensity === 'moderado') intensityMultiplier = 1.0;
    if (params.intensity === 'forte') intensityMultiplier = 1.6;
    if (params.intensity === 'super') intensityMultiplier = 2.4;

    let preventionFactor = 0.3; // percentage of loss avoided
    if (params.preventionLevel === 'baixo') preventionFactor = 0.2;
    if (params.preventionLevel === 'moderado') preventionFactor = 0.45;
    if (params.preventionLevel === 'alto') preventionFactor = 0.72;
    if (params.preventionLevel === 'avancado') preventionFactor = 0.88;

    // Base figures for Brazil
    const baseFlightsAtRisk = Math.round(1850 * intensityMultiplier);
    const flightsSaved = Math.round(baseFlightsAtRisk * preventionFactor);

    const baseHousingAtRisk = Math.round(85000 * intensityMultiplier);
    const housingProtected = Math.round(baseHousingAtRisk * preventionFactor);

    const baseRoadKmBlocked = Math.round(3200 * intensityMultiplier);
    const roadKmSaved = Math.round(baseRoadKmBlocked * preventionFactor);

    const baseLossSemPlano = Math.round(14.8 * intensityMultiplier * 10) / 10; // R$ Bilhões
    const lossWithPlan = Math.round((baseLossSemPlano * (1 - preventionFactor)) * 10) / 10;
    const netSavings = Math.round((baseLossSemPlano - lossWithPlan) * 10) / 10;

    // Monthly chart progression
    const months = params.season === 'primavera_verao' 
      ? ['Outubro', 'Novembro', 'Dezembro', 'Janeiro', 'Fevereiro', 'Março']
      : ['Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'];

    const chartData = months.map((month, i) => {
      const curve = Math.sin((i / (months.length - 1)) * Math.PI);
      const semPlano = Math.round((baseLossSemPlano / 4.5) * (0.5 + curve * 1.2) * 100) / 100;
      const comPlanoSIMA = Math.round(semPlano * (1 - preventionFactor) * 100) / 100;
      const precip = Math.round(140 * intensityMultiplier * (0.8 + curve * 0.9));

      return {
        month,
        semPlano,
        comPlanoSIMA,
        precipitacaoMm: precip,
      };
    });

    return {
      flightsAtRisk: baseFlightsAtRisk,
      flightsSaved,
      housingAtRisk: baseHousingAtRisk,
      housingProtected,
      roadKmBlocked: baseRoadKmBlocked,
      roadKmSaved,
      lossSemPlano: baseLossSemPlano,
      lossWithPlan,
      netSavings,
      preventionFactorPercent: Math.round(preventionFactor * 100),
      chartData,
    };
  }, [params]);

  const handleRunAiAnalysis = async () => {
    try {
      setIsAnalyzing(true);
      const res = await fetch('/api/gemini/simulate-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenarioParams: params }),
      });
      const data = await res.json();
      setAiAnalysis(data.analysis || 'Análise concluída.');
    } catch (e) {
      console.error(e);
      setAiAnalysis('Erro ao obter análise da IA. Verifique os parâmetros e tente novamente.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-900 border border-cyan-800/40 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  Simulador de Cenários & Teste de Estresse El Niño
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  MODELAGEM PREDITIVA
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Calcule o impacto cascata do El Niño na aviação, moradias e logística com e sem a implementação das soluções de mitigação do SIMA.
              </p>
            </div>
          </div>

          <button
            onClick={handleRunAiAnalysis}
            disabled={isAnalyzing}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-cyan-950/40 active:scale-95 disabled:opacity-50 whitespace-nowrap"
          >
            {isAnalyzing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{isAnalyzing ? 'Processando com Gemini...' : 'Parecer Executivo com IA'}</span>
          </button>
        </div>
      </div>

      {/* Control Knobs Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Param 1: Intensity */}
        <div>
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            Intensidade do El Niño:
          </label>
          <select
            value={params.intensity}
            onChange={(e) => setParams({ ...params, intensity: e.target.value as any })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="fraco">El Niño Fraco (+0.5°C a +0.9°C)</option>
            <option value="moderado">El Niño Moderado (+1.0°C a +1.4°C)</option>
            <option value="forte">El Niño Forte (+1.5°C a +1.9°C)</option>
            <option value="super">Super El Niño (+2.0°C - Padrão 2023/24)</option>
          </select>
        </div>

        {/* Param 2: Season */}
        <div>
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            Estação Sazonal:
          </label>
          <select
            value={params.season}
            onChange={(e) => setParams({ ...params, season: e.target.value as any })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="primavera_verao">Primavera / Verão (Chuvas no Sul/Sudeste)</option>
            <option value="outono_inverno">Outono / Inverno (Seca Amazônica e Queimadas)</option>
          </select>
        </div>

        {/* Param 3: Prevention Level */}
        <div>
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Nível de Mitigação SIMA:
          </label>
          <select
            value={params.preventionLevel}
            onChange={(e) => setParams({ ...params, preventionLevel: e.target.value as any })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="baixo">Básico (Sem integração prévia)</option>
            <option value="moderado">Moderado (Alertas SMS + Dragagem pontual)</option>
            <option value="alto">Alto (Cell Broadcast + Hubs Alternantes)</option>
            <option value="avancado">Avançado (Diques + Radar Doppler + Dragagem Total)</option>
          </select>
        </div>

        {/* Param 4: Target Region */}
        <div>
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            Escopo Territorial:
          </label>
          <select
            value={params.targetRegion}
            onChange={(e) => setParams({ ...params, targetRegion: e.target.value as any })}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-amber-500"
          >
            <option value="nacional">Nacional (Brasil Consolidado)</option>
            <option value="sul">Foco Região Sul (RS, SC, PR)</option>
            <option value="sudeste">Foco Região Sudeste (SP, RJ, MG)</option>
            <option value="norte">Foco Região Norte (Amazônia)</option>
          </select>
        </div>

      </div>

      {/* Real-time Simulated Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Aviação Result */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-xs font-bold text-sky-400 mb-2">
            <span className="flex items-center gap-1.5">
              <Plane className="w-4 h-4" /> Aviação & Voos
            </span>
            <span className="text-[10px] bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              +{simulationResults.flightsSaved} protegidos
            </span>
          </div>
          <div className="text-2xl font-black text-white">
            {simulationResults.flightsAtRisk.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-400">voos em risco</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>{(simulationResults.flightsSaved / simulationResults.flightsAtRisk * 100).toFixed(0)}% operando via hubs alternantes</span>
          </div>
        </div>

        {/* Moradias Result */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-2">
            <span className="flex items-center gap-1.5">
              <Home className="w-4 h-4" /> Moradias & Famílias
            </span>
            <span className="text-[10px] bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              +{simulationResults.housingProtected.toLocaleString()} salvas
            </span>
          </div>
          <div className="text-2xl font-black text-white">
            {simulationResults.housingAtRisk.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-400">em área crítica</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Evacuação precoce via Cell Broadcast ativa</span>
          </div>
        </div>

        {/* Transporte Result */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-2">
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4" /> Transporte & Logística
            </span>
            <span className="text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              +{simulationResults.roadKmSaved} km liberados
            </span>
          </div>
          <div className="text-2xl font-black text-white">
            {simulationResults.roadKmBlocked.toLocaleString()}{' '}
            <span className="text-xs font-normal text-slate-400">km ameaçados</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Corredores mantidos com dragagem e pontes</span>
          </div>
        </div>

        {/* ROI Financeiro */}
        <div className="bg-gradient-to-br from-emerald-950/80 to-slate-900 border border-emerald-700/50 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-xs font-bold text-emerald-300 mb-2">
            <span className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" /> Economia Líquida (ROI)
            </span>
            <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded text-emerald-200 border border-emerald-500/30">
              {simulationResults.preventionFactorPercent}% mitigado
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-300">
            R$ {simulationResults.netSavings} bi{' '}
            <span className="text-xs font-normal text-slate-300">economizados</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-300">
            Perdas caem de <strong>R$ {simulationResults.lossSemPlano} bi</strong> para <strong>R$ {simulationResults.lossWithPlan} bi</strong>
          </div>
        </div>

      </div>

      {/* Chart: Simulated Losses With vs Without Mitigation Plan */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Projeção Mensal de Prejuízos Estruturais (R$ Bilhões)
            </h3>
            <p className="text-xs text-slate-400">
              Comparativo de perdas econômicas e operacionais ao longo do ciclo do El Niño
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-rose-400 font-semibold">
              <span className="w-3 h-3 rounded bg-rose-500/80 inline-block"></span> Sem Plano SIMA
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-3 h-3 rounded bg-emerald-500/80 inline-block"></span> Com Mitigação SIMA
            </span>
          </div>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={simulationResults.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSemPlano" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="colorComPlano" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit=" bi" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#0f172a', 
                  borderColor: '#334155', 
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                  color: '#f8fafc'
                }}
                formatter={(value: any, name: any) => [
                  `R$ ${value} Bilhões`, 
                  name === 'semPlano' ? 'Sem Plano (Inércia)' : 'Com Soluções SIMA'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="semPlano" 
                stroke="#f43f5e" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#colorSemPlano)" 
              />
              <Area 
                type="monotone" 
                dataKey="comPlanoSIMA" 
                stroke="#10b981" 
                strokeWidth={2.5} 
                fillOpacity={1} 
                fill="url(#colorComPlano)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Executive Analysis Box (if generated) */}
      {aiAnalysis && (
        <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-5 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
            <Sparkles className="w-4 h-4" />
            Parecer Executivo de Risco & ROI (Gemini AI):
          </div>
          <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/70 p-4 rounded-xl border border-slate-800">
            {aiAnalysis}
          </div>
        </div>
      )}

    </div>
  );
};
