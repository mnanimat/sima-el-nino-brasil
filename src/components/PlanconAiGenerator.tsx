import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
  Download, 
  Copy, 
  Check, 
  RefreshCw, 
  ShieldCheck, 
  Clock, 
  Activity, 
  Layers,
  ChevronRight,
  Plane,
  Home,
  Truck
} from 'lucide-react';
import { ContingencyPlan } from '../types';

interface PlanconAiGeneratorProps {
  initialSector?: string;
  initialRegion?: string;
  initialLocation?: string;
}

export const PlanconAiGenerator: React.FC<PlanconAiGeneratorProps> = ({
  initialSector = 'Aviação',
  initialRegion = 'Região Sul',
  initialLocation = 'Aeroporto Internacional Salgado Filho (SBPA) / Bacia do Guaíba',
}) => {
  const [sector, setSector] = useState(initialSector);
  const [region, setRegion] = useState(initialRegion);
  const [locationName, setLocationName] = useState(initialLocation);
  const [intensity, setIntensity] = useState('Forte / Super El Niño');
  const [specificRisks, setSpecificRisks] = useState(
    'Alagamento de pistas, deslizamentos de encostas, bloqueios rodoviários e seca extrema de hidrovias'
  );

  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState<ContingencyPlan | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/gemini/contingency-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sector,
          region,
          locationName,
          intensity,
          specificRisks,
        }),
      });
      const data = await res.json();
      if (data.plan) {
        setPlan(data.plan);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!plan) return;
    const text = `
=== ${plan.title} ===
${plan.summary}

--- FASES DE RESPOSTA ---
${plan.phases
  ?.map(
    (p) => `\n[${p.phase}]\n${p.actions.map((a) => `• ${a}`).join('\n')}`
  )
  .join('\n')}

--- TECNOLOGIAS E INFRAESTRUTURA ---
${plan.technologies?.map((t) => `• ${t}`).join('\n')}

--- INDICADORES DE EFICÁCIA (KPIS) ---
${plan.kpis?.map((k) => `• ${k}`).join('\n')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/40 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  Gerador de Planos de Contingência (PLANCON AI)
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ALINHADO AO SINPDEC & DECEA
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Geração automática de protocolos normativos e de engenharia para municípios, aeroportos e concessionárias de transporte sob ameaça do El Niño.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Configuration Form & Output Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Generator Form (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Parâmetros do Plano Operacional
          </h3>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Setor de Aplicação:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSector('Aviação')}
                className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-colors ${
                  sector === 'Aviação'
                    ? 'bg-sky-600 text-white border-sky-400'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <Plane className="w-3.5 h-3.5" /> Aviação
              </button>
              <button
                type="button"
                onClick={() => setSector('Moradias e Encostas')}
                className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-colors ${
                  sector === 'Moradias e Encostas'
                    ? 'bg-amber-600 text-white border-amber-400'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <Home className="w-3.5 h-3.5" /> Moradias
              </button>
              <button
                type="button"
                onClick={() => setSector('Transporte e Logística')}
                className={`py-2 px-2 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-colors ${
                  sector === 'Transporte e Logística'
                    ? 'bg-emerald-600 text-white border-emerald-400'
                    : 'bg-slate-950 text-slate-400 border-slate-800'
                }`}
              >
                <Truck className="w-3.5 h-3.5" /> Transporte
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Região do Brasil:
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200 focus:outline-none focus:border-emerald-500"
            >
              <option value="Região Sul">Região Sul (RS, SC, PR)</option>
              <option value="Região Sudeste">Região Sudeste (SP, RJ, MG, ES)</option>
              <option value="Região Norte">Região Norte (AM, PA, RO, AC)</option>
              <option value="Região Nordeste">Região Nordeste (Semiárido e Litoral)</option>
              <option value="Região Centro-Oeste">Região Centro-Oeste (MT, MS, GO, DF)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Local / Infraestrutura / Município:
            </label>
            <input
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Ex: Aeroporto SBPA, Vale do Taquari, Serra das Araras..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 mb-1.5 block">
              Riscos Específicos & Ameaças:
            </label>
            <textarea
              rows={2}
              value={specificRisks}
              onChange={(e) => setSpecificRisks(e.target.value)}
              placeholder="Descreva as ameaças específicas a mitigar..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950/40 active:scale-95 disabled:opacity-50"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{isLoading ? 'Elaborando PLANCON com Gemini...' : 'Gerar Plano de Contingência Agora'}</span>
          </button>
        </div>

        {/* Plan Display (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          
          {plan ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    Documento Operacional Homologado
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{plan.title}</h3>
                </div>

                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copiado!' : 'Copiar Plano'}</span>
                </button>
              </div>

              {/* Summary */}
              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                <strong className="text-emerald-300 font-semibold block mb-1">Diagnóstico Executivo:</strong>
                {plan.summary}
              </div>

              {/* Phases */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  Fases Cronológicas de Ação:
                </div>
                {plan.phases?.map((phaseObj, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-emerald-400">{phaseObj.phase}</div>
                    <ul className="space-y-1">
                      {phaseObj.actions.map((act, aIdx) => (
                        <li key={aIdx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0"></span>
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Techs & KPIs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-xs font-bold text-sky-300 mb-1.5 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" /> Tecnologias Recomendadas:
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {plan.technologies?.map((tech, tIdx) => (
                      <li key={tIdx}>• {tech}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-xs font-bold text-amber-300 mb-1.5 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> Metas de Eficácia (KPIs):
                  </div>
                  <ul className="space-y-1 text-[11px] text-slate-300">
                    {plan.kpis?.map((kpi, kIdx) => (
                      <li key={kIdx}>• {kpi}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 px-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-7 h-7" />
              </div>
              <h4 className="text-sm font-bold text-white">Nenhum Plano Gerado Ainda</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                Configure os parâmetros ao lado e clique em "Gerar Plano de Contingência Agora" para criar um plano operacional completo com IA.
              </p>
              <button
                onClick={handleGenerate}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Gerar Plano de Exemplo (SBPA)</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
