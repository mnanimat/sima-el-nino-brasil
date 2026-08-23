import React, { useState } from 'react';
import { 
  Plane, 
  Wind, 
  Droplets, 
  CloudFog, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Gauge,
  ThermometerSun
} from 'lucide-react';

interface AviationModuleProps {
  onGeneratePlan: (sector: string, region: string, location: string) => void;
}

export const AviationModule: React.FC<AviationModuleProps> = ({ onGeneratePlan }) => {
  const [selectedAirport, setSelectedAirport] = useState<'SBPA' | 'SBGR' | 'SBEG' | 'SBSP'>('SBPA');
  const [activeTab, setActiveTab] = useState<'runway' | 'windshear' | 'hubs' | 'smoke' | 'density'>('runway');

  const airportData = {
    SBPA: {
      code: 'SBPA',
      name: 'Porto Alegre / Salgado Filho',
      threat: 'Alagamento severo de pista e perda de subestações por cheia da Bacia do Guaíba',
      runwayStatus: 'Operando com Diques Reforçados (Cota +6.0m)',
      windshearRisk: 'Moderado (22 kt)',
      waterFilmRisk: '2.1 mm (Grooving OK)',
      contingencyHub: 'Base Aérea de Canoas (SBCO) + Caxias do Sul (SBCX)',
      activeDikesCapacity: '6 bombas ativas (18.500 m³/h)',
      fuelReserveMargin: '+45 min recomendados',
    },
    SBGR: {
      code: 'SBGR',
      name: 'São Paulo / Guarulhos',
      threat: 'Microbursts e tempestades convectivas violentas com granizo na TMA-SP',
      runwayStatus: 'Livre de Lâmina d\'água',
      windshearRisk: 'Alto (Alerta de Tesoura de Vento na Aproximação RWY 10R)',
      waterFilmRisk: '1.4 mm',
      contingencyHub: 'Campinas / Viracopos (SBKP) + Galeão (SBGL)',
      activeDikesCapacity: 'Drenagem por gravidade desobstruída',
      fuelReserveMargin: '+60 min recomendados',
    },
    SBEG: {
      code: 'SBEG',
      name: 'Manaus / Eduardo Gomes',
      threat: 'Fumaça densa de queimadas regionais com visibilidade < 1.000 metros',
      runwayStatus: 'Operação sob Procedimento IFR / ILS Cat II',
      windshearRisk: 'Baixo (8 kt)',
      waterFilmRisk: '0.2 mm (Seca)',
      contingencyHub: 'Boa Vista (SBBV) + Belém (SBBE)',
      activeDikesCapacity: 'N/A (Foco em filtragem de ar e ILS)',
      fuelReserveMargin: '+75 min recomendados (voos longos)',
    },
    SBSP: {
      code: 'SBSP',
      name: 'São Paulo / Congonhas',
      threat: 'Pista curta com risco de aquaplanagem em tempestades rápidas e calor extremo',
      runwayStatus: 'Grooving e EMAS (sistema de desaceleração) monitorados',
      windshearRisk: 'Moderado a Alto',
      waterFilmRisk: '2.8 mm (Atenção para frenagem)',
      contingencyHub: 'Viracopos (SBKP) + São José dos Campos (SBSJ)',
      activeDikesCapacity: 'Drenagem urbana municipal conectada',
      fuelReserveMargin: '+45 min recomendados',
    },
  };

  const current = airportData[selectedAirport];

  return (
    <div className="space-y-6">
      {/* Module Title Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-slate-900 border border-sky-800/40 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Plane className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  Plano de Resiliência da Aviação Brasileira
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  DECEA • ANAC • REDEMET
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Mitigação de inundações de pistas, tesouras de vento (windshear), visibilidade zero por fumaça e gestão de aeroportos alternantes.
              </p>
            </div>
          </div>

          <button
            onClick={() => onGeneratePlan('Aviação', 'Nacional', current.name)}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-sky-950/40 active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>Gerar Protocolo Aeronáutico IA</span>
          </button>
        </div>
      </div>

      {/* Airport Selector Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 mr-2">Aeródromos Críticos:</span>
        {(['SBPA', 'SBGR', 'SBEG', 'SBSP'] as const).map((code) => {
          const apt = airportData[code];
          return (
            <button
              key={code}
              onClick={() => setSelectedAirport(code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                selectedAirport === code
                  ? 'bg-sky-600 text-white border-sky-400 shadow-md shadow-sky-950/40'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>{code} - {apt.name.split(' / ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Feature Grid for Selected Airport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Telemetry & Threat Summary (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                Sítio Aeroportuário Monitorado
              </span>
              <h3 className="text-base font-bold text-white mt-1">{current.name} ({current.code})</h3>
            </div>
            <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
              <Activity className="w-4 h-4" />
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Impacto Direto do El Niño:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{current.threat}</p>
          </div>

          <div className="space-y-2.5">
            <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Lâmina d'água na Pista:
              </span>
              <span className="font-bold text-slate-200">{current.waterFilmRisk}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-amber-400" /> Alerta de Windshear:
              </span>
              <span className="font-bold text-amber-300">{current.windshearRisk}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-emerald-400" /> Margem de Combustível:
              </span>
              <span className="font-bold text-emerald-300">{current.fuelReserveMargin}</span>
            </div>

            <div className="p-3 rounded-lg bg-sky-950/40 border border-sky-800/40 text-xs">
              <div className="text-sky-300 font-bold mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Hub de Contingência Homologado:
              </div>
              <div className="text-slate-200 font-medium">{current.contingencyHub}</div>
            </div>
          </div>
        </div>

        {/* Actionable Engineering & Operational Pillars (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Soluções Integradas de Mitigação na Aviação
            </h3>
          </div>

          {/* Solution Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/60 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('runway')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'runway' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" /> Drenagem & Diques
            </button>
            <button
              onClick={() => setActiveTab('windshear')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'windshear' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Wind className="w-3.5 h-3.5" /> Radar Windshear
            </button>
            <button
              onClick={() => setActiveTab('hubs')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'hubs' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Plane className="w-3.5 h-3.5" /> Hubs Alternantes
            </button>
            <button
              onClick={() => setActiveTab('smoke')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeTab === 'smoke' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CloudFog className="w-3.5 h-3.5" /> Fumaça & IFR
            </button>
          </div>

          {/* Active Tab Content */}
          {activeTab === 'runway' && (
            <div className="space-y-3 pt-2 text-xs">
              <h4 className="font-bold text-sky-300">Proteção de Pistas e Blindagem Contra Alagamentos</h4>
              <p className="text-slate-300 leading-relaxed">
                As enchentes extremas do El Niño demonstram que sítios em várzeas fluviais (como Salgado Filho no RS) necessitam de diques de contenção independentes e elevação de instalações elétricas vitais.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Diques Perimetrais
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Cota de segurança de 6,00 metros com comportas de retenção unidirecional.
                  </p>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Bombas de Sucção Anfíbias
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Capacidade combinada de 18.500 m³/h alimentada por geradores em cota +7.5m.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'windshear' && (
            <div className="space-y-3 pt-2 text-xs">
              <h4 className="font-bold text-sky-300">Detecção Precoce de Microbursts e Rajadas Descendentes</h4>
              <p className="text-slate-300 leading-relaxed">
                O El Niño no Sudeste eleva as temperaturas do ar e do solo, criando tempestades convectivas repentinas com tesoura de vento nas aproximações de Guarulhos e Congonhas.
              </p>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <div className="font-semibold text-slate-200">Protocolo de Operação:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                  <li>Radar Doppler banda X operando em varredura contínua de 60 segundos na cabeceira</li>
                  <li>Alerta automatizado para o Controle de Aproximação (APP-SP) ao detectar variação &gt; 15 kt</li>
                  <li>Orientação obrigatória de arremetida (Go-Around) para aeronaves na rampa de planeio</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'hubs' && (
            <div className="space-y-3 pt-2 text-xs">
              <h4 className="font-bold text-sky-300">Rede Integrada de Aeroportos Alternantes de Emergência</h4>
              <p className="text-slate-300 leading-relaxed">
                Evita o colapso do transporte aéreo regional homologando previamente bases da Força Aérea (FAB) e aeródromos do interior como hubs de transbordo durante desastres.
              </p>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
                  <span>Hub Principal Afetado</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-emerald-400">Hubs de Contingência Pré-Ativados</span>
                </div>
                <div className="text-[11px] text-slate-400 space-y-1">
                  <div>• <strong>Porto Alegre (SBPA):</strong> Base Aérea de Canoas (SBCO) + Caxias do Sul (SBCX)</div>
                  <div>• <strong>São Paulo (SBGR/SBSP):</strong> Viracopos (SBKP) + São José dos Campos (SBSJ)</div>
                  <div>• <strong>Manaus (SBEG):</strong> Boa Vista (SBBV) + Santarém (SBSN)</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'smoke' && (
            <div className="space-y-3 pt-2 text-xs">
              <h4 className="font-bold text-sky-300">Procedimentos para Operação Sob Fumaça de Queimadas</h4>
              <p className="text-slate-300 leading-relaxed">
                Na Região Norte, a seca extrema do El Niño provoca grandes incêndios florestais. A fumaça densa exige transição rápida de aproximações visuais para IFR de alta precisão.
              </p>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 text-[11px] text-slate-300">
                <div className="font-semibold text-emerald-300">Ações Mandatórias:</div>
                <div>1. Ativação automática de procedimentos RNP AR com trajetória curva guiada por satélite</div>
                <div>2. Manutenção preventiva de ILS Cat II com geradores redundantes para evitar quedas de sinal</div>
                <div>3. Inspeção e substituição acelerada de filtros nos motores e cabines de aeronaves</div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
