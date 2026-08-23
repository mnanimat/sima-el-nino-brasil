import React, { useState } from 'react';
import { 
  Truck, 
  Ship, 
  Train, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  Sparkles,
  Layers,
  CheckCircle2,
  Navigation,
  Compass
} from 'lucide-react';

interface TransportModuleProps {
  onGeneratePlan: (sector: string, region: string, location: string) => void;
}

export const TransportModule: React.FC<TransportModuleProps> = ({ onGeneratePlan }) => {
  const [selectedCorridor, setSelectedCorridor] = useState<'madeira' | 'br116' | 'br101' | 'ferrovia'>('madeira');
  const [activeSubTab, setActiveSubTab] = useState<'dredging' | 'sensors' | 'intermodal' | 'bridges'>('dredging');

  const corridors = {
    madeira: {
      name: 'Hidrovia do Rio Madeira (Porto Velho - Itacoatiara)',
      mode: 'Hidroviário',
      threat: 'Seca extrema histórica (vazante) reduzindo o calado navegável para menos de 2,1m',
      status: 'Restrição Severa de Navegação',
      criticalKm: '1.056 km hidroviários',
      activeDredges: '4 dragas de sucção contínua nos passos do Marmelo e Curicacas',
      alternativeRoute: 'Transbordo rodoviário em Humaitá (BR-319) e cabotagem por Belém/Barcarena',
      flowImpact: '45.000 t/dia de soja e combustíveis sob risco de retenção',
    },
    br116: {
      name: 'Corredor Rodoviário BR-116 (Serra do Cafezal & Serra das Araras)',
      mode: 'Rodoviário',
      threat: 'Quedas de barreiras, rolamento de blocos e solapamento de pistas por enxurradas',
      status: 'Monitoramento por Inclinômetros IoT',
      criticalKm: '850 km serranos',
      activeDredges: 'Equipes de pronta resposta e barreiras dinâmicas suíças',
      alternativeRoute: 'Desvios operacionais pela BR-101 e corredores estaduais sinalizados',
      flowImpact: '32.000 caminhões/dia de cargas industriais e farmacêuticas',
    },
    br101: {
      name: 'Corredor Litorâneo BR-101 Sul (Morro dos Cavalos / Palhoça - SC)',
      mode: 'Rodoviário',
      threat: 'Deslizamento sobre ambas as pistas entre a encosta e o mar',
      status: 'Alerta Laranja Geotécnico',
      criticalKm: '320 km litorâneos',
      activeDredges: 'Gabiões reforçados e monitoramento por fibra óptica',
      alternativeRoute: 'Ativação de cabotagem emergencial entre Portos de Itajaí e Rio Grande',
      flowImpact: '28.000 veículos/dia com risco de corte total da ligação Sul-Sudeste',
    },
    ferrovia: {
      name: 'Malha Ferroviária Sul (Rumo Logística)',
      mode: 'Ferroviário',
      threat: 'Erosão de aterros ferroviários e alagamento de pátios de manobra',
      status: 'Sensores Acústicos em Operação',
      criticalKm: '1.200 km de trilhos',
      activeDredges: 'Enrocamento de pedra e drenos de lastro reforçados',
      alternativeRoute: 'Integração rodoferroviária emergencial nos terminais de transbordo',
      flowImpact: '38% dos grãos destinados ao Porto de Paranaguá e Rio Grande',
    },
  };

  const current = corridors[selectedCorridor];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border border-emerald-800/40 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  Plano de Resiliência Logística e Transporte Nacional
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  DNIT • ANTT • MARINHA • MINISTÉRIO DOS TRANSPORTES
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Garantia de navegabilidade em secas amazônicas, proteção de taludes rodoviários, roteamento intermodal e pontes de emergência.
              </p>
            </div>
          </div>

          <button
            onClick={() => onGeneratePlan('Transporte e Logística', 'Nacional', current.name)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-emerald-950/40 active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>Gerar Plano Logístico IA</span>
          </button>
        </div>
      </div>

      {/* Corridor Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 mr-2">Corredores Logísticos:</span>
        {(['madeira', 'br116', 'br101', 'ferrovia'] as const).map((key) => {
          const c = corridors[key];
          return (
            <button
              key={key}
              onClick={() => setSelectedCorridor(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                selectedCorridor === key
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950/40'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {key === 'madeira' ? (
                <Ship className="w-3.5 h-3.5" />
              ) : key === 'ferrovia' ? (
                <Train className="w-3.5 h-3.5" />
              ) : (
                <Truck className="w-3.5 h-3.5" />
              )}
              <span>{c.name.split(' (')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Corridor Details + Solutions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Col (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Corredor Estratégico Sob Monitoramento
              </span>
              <h3 className="text-base font-bold text-white mt-1">{current.name}</h3>
            </div>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Activity className="w-4 h-4" />
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Impacto Direto do Fenômeno El Niño:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{current.threat}</p>
          </div>

          <div className="space-y-2.5">
            <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-cyan-400" /> Modalidade & Extensão:
              </span>
              <span className="font-bold text-slate-200">{current.mode} • {current.criticalKm}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Status Operacional:
              </span>
              <span className="font-bold text-emerald-300">{current.status}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-400" /> Impacto no Fluxo de Cargas:
              </span>
              <span className="font-bold text-amber-300">{current.flowImpact}</span>
            </div>

            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/40 text-xs space-y-1">
              <div className="text-emerald-300 font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> Rota Alternativa de Contingência:
              </div>
              <div className="text-slate-200 text-[11px] leading-relaxed">{current.alternativeRoute}</div>
            </div>
          </div>
        </div>

        {/* Right Col: Solutions & Technologies (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Soluções Integradas de Mitigação no Transporte
            </h3>
          </div>

          {/* Subtabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/60 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveSubTab('dredging')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeSubTab === 'dredging' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Ship className="w-3.5 h-3.5" /> Batimetria & Dragagem
            </button>
            <button
              onClick={() => setActiveSubTab('sensors')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeSubTab === 'sensors' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" /> Sensores IoT em Pontes
            </button>
            <button
              onClick={() => setActiveSubTab('intermodal')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeSubTab === 'intermodal' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" /> Roteador Intermodal
            </button>
            <button
              onClick={() => setActiveSubTab('bridges')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeSubTab === 'bridges' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Truck className="w-3.5 h-3.5" /> Pontes Modulares do Exército
            </button>
          </div>

          {/* Subtab Content */}
          {activeSubTab === 'dredging' && (
            <div className="space-y-3 pt-2 text-xs">
              <h4 className="font-bold text-emerald-300">Batimetria Contínua e Dragagem Preditiva em Rios Amazônicos</h4>
              <p className="text-slate-300 leading-relaxed">
                Durante a seca extrema do El Niño, os rios Madeira, Solimões e Negro perdem até 8 metros de lâmina d'água. A dragagem cirúrgica e o mapeamento sonar mantêm os canais críticos abertos.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Batimetria Multifeixe em Tempo Real
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Barcos sonda mapeiam bancos de areia e transmitem rotas seguras diretamente aos navegadores via satélite.
                  </p>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Fracionamento Inteligente de Barcaças
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Redução do calado dos comboios de 4,5m para 2,1m com divisão das cargas para preservar a navegação contínua.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'sensors' && (
            <div className="space-y-3 pt-2 text-xs">
              <h4 className="font-bold text-emerald-300">Monitoramento IoT e Fibra Óptica em Pontes e Taludes</h4>
              <p className="text-slate-300 leading-relaxed">
                A saturação do solo por chuvas torrenciais no Sul e Sudeste causa erosão nas fundações de pontes e quedas de barreira sobre rodovias como BR-116 e BR-101.
              </p>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 text-[11px] text-slate-300">
                <div className="font-semibold text-slate-200">Camadas de Detecção Automática:</div>
                <div>• Inclinômetros de precisão instalados a cada 200m nas encostas críticas com transmissão LoRaWAN/satelital</div>
                <div>• Sensores acústicos em pilares de pontes para alertar sobre solapamento subaquático antes do colapso da viga</div>
                <div>• Bloqueio automatizado de pistas com cancelas e painéis de mensagem variável (PMVs) em caso de risco crítico</div>
              </div>
            </div>
          )}

          {activeSubTab === 'intermodal' && (
            <div className="space-y-3 pt-2 text-xs">
              <h4 className="font-bold text-emerald-300">Matriz de Roteamento Intermodal e Cabotagem Emergencial</h4>
              <p className="text-slate-300 leading-relaxed">
                Quando uma rodovia ou hidrovia é interrompida, o sistema aciona rotas alternativas combinando cabotagem marítima, ferrovias e transbordos rodoviários.
              </p>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 text-[11px] text-slate-300">
                <div>• <strong>Desvio Norte:</strong> Cargas da Zona Franca de Manaus transferidas de balsas para caminhões em Humaitá/Porto Velho</div>
                <div>• <strong>Desvio Sul:</strong> Contêineres desviados de rodovias interditadas para navios de cabotagem entre Itajaí, Paranaguá e Santos</div>
                <div>• Isenção temporária de taxas portuárias em períodos de decretação de calamidade pública climática</div>
              </div>
            </div>
          )}

          {activeSubTab === 'bridges' && (
            <div className="space-y-3 pt-2 text-xs">
              <h4 className="font-bold text-emerald-300">Kits de Transposição Rápida & Pontes Modulares do Exército</h4>
              <p className="text-slate-300 leading-relaxed">
                Pré-posicionamento estratégico de pontes metálicas modulares (tipo Bailey e LSB) dos Batalhões de Engenharia de Construção do Exército Brasileiro.
              </p>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 text-[11px] text-slate-300">
                <div>• Montagem de pontes com capacidade para até 60 toneladas em menos de 48 horas após a queda de uma ponte</div>
                <div>• Restabelecimento prioritário de corredores de ambulâncias, oxigênio hospitalar, alimentos e combustível</div>
                <div>• Acordo de cooperação técnica permanente entre Ministério dos Transportes, DNIT e Ministério da Defesa</div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
