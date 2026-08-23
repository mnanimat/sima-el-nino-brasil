import React, { useState } from 'react';
import { 
  Home, 
  Mountain, 
  Radio, 
  Droplets, 
  ShieldAlert, 
  Sparkles,
  AlertTriangle,
  BellRing,
  CheckCircle2,
  Users,
  MapPin,
  ArrowUpRight,
  FileDown
} from 'lucide-react';
import { generateHousingPDFReport } from '../utils/pdfReportGenerator';

interface HousingModuleProps {
  onGeneratePlan: (sector: string, region: string, location: string) => void;
}

export const HousingModule: React.FC<HousingModuleProps> = ({ onGeneratePlan }) => {
  const [selectedSlopeRisk, setSelectedSlopeRisk] = useState<'serra_mar' | 'petropolis' | 'taquari' | 'recife'>('serra_mar');
  const [broadcastSimulated, setBroadcastSimulated] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'slopes' | 'broadcast' | 'drainage' | 'shelters'>('slopes');

  const riskZones = {
    serra_mar: {
      name: 'Litoral Norte & Serra do Mar (São Paulo)',
      threat: 'Deslizamentos de grande porte (debris flow) com solos saturados',
      familiesAtRisk: 14200,
      currentRain72h: '138 mm (Crítico > 150mm)',
      slopeStatus: 'Grau 4 - Alerta Laranja',
      sirensTested: '100% Operacionais',
      shelterCapacity: '22 abrigos municipais mapeados',
    },
    petropolis: {
      name: 'Região Serrana do Rio (Petrópolis & Teresópolis)',
      threat: 'Corridas de massa em relevo fraturado com ocupação densa em morros',
      familiesAtRisk: 8900,
      currentRain72h: '112 mm (Crítico > 120mm)',
      slopeStatus: 'Grau 3 - Alerta de Vigilância',
      sirensTested: '32 sirenes conectadas ao radar',
      shelterCapacity: '15 centros comunitários ativos',
    },
    taquari: {
      name: 'Vale do Taquari (Lajeado, Estrela, Muçum / RS)',
      threat: 'Inundações bruscas e cheias de planície fluvial com submersão de residências',
      familiesAtRisk: 12400,
      currentRain72h: '190 mm (Alagamento Iminente)',
      slopeStatus: 'Grau 4 - Alerta Vermelho',
      sirensTested: 'Régua telemétrica em cota crítica',
      shelterCapacity: 'Ginásios municipais em cota segura (+25m)',
    },
    recife: {
      name: 'Barreiras e Morros da RMR (Recife / PE)',
      threat: 'Escorregamentos planares em solos argilosos sob ondas de leste',
      familiesAtRisk: 18500,
      currentRain72h: '65 mm (Monitorado)',
      slopeStatus: 'Grau 2 - Atenção Preventiva',
      sirensTested: 'NUDECs em patrulhamento diário',
      shelterCapacity: '12 escolas polos cadastradas',
    },
  };

  const currentZone = riskZones[selectedSlopeRisk];

  const handleSimulateBroadcast = () => {
    setBroadcastSimulated(true);
    setTimeout(() => {
      // Auto reset indicator after 8 seconds
      setBroadcastSimulated(false);
    }, 8000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border border-amber-800/40 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Home className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  Proteção de Moradias & Encostas Urbanas
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  CEMADEN • DEFESA CIVIL NACIONAL • CPRM
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Monitoramento de saturação do solo, barreiras geotécnicas, evacuação precoce via Cell Broadcast e infraestrutura de drenagem.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                generateHousingPDFReport({
                  id: selectedSlopeRisk,
                  name: currentZone.name,
                  threat: currentZone.threat,
                  familiesAtRisk: currentZone.familiesAtRisk,
                  currentRain72h: currentZone.currentRain72h,
                  slopeStatus: currentZone.slopeStatus,
                  sirensTested: currentZone.sirensTested,
                  shelterCapacity: currentZone.shelterCapacity,
                });
              }}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white border border-amber-500/30 text-xs font-bold flex items-center gap-2 transition-all active:scale-95 whitespace-nowrap shadow-sm"
              title="Baixar Relatório Técnico de Encostas em PDF"
            >
              <FileDown className="w-4 h-4 text-amber-400" />
              <span>Exportar Relatório PDF</span>
            </button>

            <button
              onClick={() => onGeneratePlan('Moradias e Encostas', 'Nacional', currentZone.name)}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-amber-950/40 active:scale-95 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>Gerar Protocolo Habitacional IA</span>
            </button>
          </div>
        </div>
      </div>

      {/* Zone Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-400 mr-2">Zonas Críticas de Habitação:</span>
        {(['serra_mar', 'petropolis', 'taquari', 'recife'] as const).map((key) => {
          const zone = riskZones[key];
          return (
            <button
              key={key}
              onClick={() => setSelectedSlopeRisk(key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                selectedSlopeRisk === key
                  ? 'bg-amber-600 text-white border-amber-400 shadow-md shadow-amber-950/40'
                  : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              <Mountain className="w-3.5 h-3.5" />
              <span>{zone.name.split(' (')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Grid: Diagnostics + Engineering Solutions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Risk & Telemetry (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Geomonitoramento de Encostas & Várzeas
              </span>
              <h3 className="text-base font-bold text-white mt-1">{currentZone.name}</h3>
            </div>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Mountain className="w-4 h-4" />
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
            <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Ameaça Geológica / Hidrológica:
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{currentZone.threat}</p>
          </div>

          <div className="space-y-2.5">
            <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" /> Famílias em Áreas R3/R4:
              </span>
              <span className="font-bold text-amber-300">{currentZone.familiesAtRisk.toLocaleString()} famílias</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-cyan-400" /> Pluviometria 72h (CEMADEN):
              </span>
              <span className="font-bold text-slate-200">{currentZone.currentRain72h}</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Status de Alerta:
              </span>
              <span className="font-bold text-rose-300">{currentZone.slopeStatus}</span>
            </div>

            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-800/40 text-xs space-y-1">
              <div className="text-amber-300 font-bold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> Abrigos & Sirenes de Resgate:
              </div>
              <div className="text-slate-300 text-[11px]">{currentZone.shelterCapacity}</div>
              <div className="text-slate-400 text-[11px]">{currentZone.sirensTested}</div>
            </div>
          </div>

          {/* Trigger Cell Broadcast Demo */}
          <div className="pt-2">
            <button
              id="btn-trigger-cell-broadcast"
              onClick={handleSimulateBroadcast}
              className="w-full py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Radio className="w-4 h-4 animate-pulse" />
              <span>Simular Disparo de Alerta Cell Broadcast</span>
            </button>
            {broadcastSimulated && (
              <div className="mt-2.5 p-3 rounded-xl bg-rose-950 border border-rose-600 text-rose-100 text-xs animate-bounce shadow-xl">
                <div className="font-bold flex items-center gap-1.5 text-rose-300">
                  <BellRing className="w-4 h-4" /> [ALERTA DEFESA CIVIL NACIONAL]:
                </div>
                <div className="mt-1 text-[11px] leading-relaxed">
                  Risco crítico de deslizamento em {currentZone.name}. Evacue imediatamente para o abrigo seguro mais próximo. Siga as rotas sinalizadas.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Key Mitigations for Housing (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Home className="w-4 h-4 text-amber-400" />
              Soluções Integradas para Resiliência de Moradias
            </h3>
          </div>

          {/* Subtabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-950/60 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveSubTab('slopes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeSubTab === 'slopes' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Mountain className="w-3.5 h-3.5" /> Bioengenharia & Encostas
            </button>
            <button
              onClick={() => setActiveSubTab('broadcast')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeSubTab === 'broadcast' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Radio className="w-3.5 h-3.5" /> Alerta Precoce (Cell Broadcast)
            </button>
            <button
              onClick={() => setActiveSubTab('drainage')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeSubTab === 'drainage' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" /> SUDs & Piscinões
            </button>
            <button
              onClick={() => setActiveSubTab('shelters')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeSubTab === 'shelters' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" /> Abrigos & Reassentamento
            </button>
          </div>

          {/* Subtab Contents */}
          {activeSubTab === 'slopes' && (
            <div className="space-y-3 pt-2 text-xs">
              <h4 className="font-bold text-amber-300">Bioengenharia e Estabilização Física de Morros</h4>
              <p className="text-slate-300 leading-relaxed">
                Durante o El Niño, as encostas sofrem sobrecarga hídrica que rompe o atrito do solo. A solução combina técnicas naturais de baixo custo com contenções estruturais avançadas.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Capim-Vetiver & Geossintéticos
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Raízes de 3 a 5 metros que ancoram a camada superficial do solo sem sobrecarregar a encosta.
                  </p>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Drenos Sub-horizontais Profundos (DHP)
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Tubos perfurados cravados até 20 metros no maciço para expulsar a água acumulada antes do escorregamento.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'broadcast' && (
            <div className="space-y-3 pt-2 text-xs">
              <h4 className="font-bold text-amber-300">Evacuação Antecipada com Tecnologia Cell Broadcast</h4>
              <p className="text-slate-300 leading-relaxed">
                Substitui SMS tradicionais (que podem atrasar horas) por sinalização via rádio em torre de celular que soa alarme no smartphone mesmo no modo silencioso.
              </p>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-2 text-[11px] text-slate-300">
                <div className="font-semibold text-slate-200">Gatilhos de Acionamento Automático:</div>
                <div>• <strong>Limiar Amarelo (80mm / 24h):</strong> Mensagem informativa e orientação para voluntários comunitários</div>
                <div>• <strong>Limiar Laranja (120mm / 24h):</strong> Recomendação de saída preventiva de idosos e crianças</div>
                <div>• <strong>Limiar Vermelho (150mm / 48h ou Movimentação em Sensores):</strong> Ordem compulsória de evacuação imediata com mapa da rota mais segura</div>
              </div>
            </div>
          )}

          {activeSubTab === 'drainage' && (
            <div className="space-y-3 pt-2 text-xs">
              <h4 className="font-bold text-amber-300">Drenagem Sustentável & Bacias de Amortecimento</h4>
              <p className="text-slate-300 leading-relaxed">
                As enxurradas em áreas residenciais decorrem da impermeabilização do solo. Os Sistemas Urbanos de Drenagem Sustentável (SUDs) retêm a água na origem.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="font-bold text-amber-300">Jardins de Chuva & Valas</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Canteiros rebaixados que absorvem 40% do escoamento pluvial direto das calçadas e telhados.
                  </p>
                </div>
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
                  <div className="font-bold text-amber-300">Piscinões & Parques Inundáveis</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Bacias que armazenam o pico da tempestade e liberam a vazão controladamente após o temporal.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'shelters' && (
            <div className="space-y-3 pt-2 text-xs">
              <h4 className="font-bold text-amber-300">Rede de Abrigos Resilientes & Reassentamento Definitivo</h4>
              <p className="text-slate-300 leading-relaxed">
                Para moradias situadas em áreas R4 não passíveis de consolidação por engenharia, o programa combina acolhimento humanitário digno com reassentamento seguro.
              </p>
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 space-y-1.5 text-[11px] text-slate-300">
                <div>• Mapeamento de ginásios e escolas em cotas altimétricas imunes a inundações decamilenares</div>
                <div>• Abastecimento garantido com geradores a diesel, caixas d'água purificadas e climatização</div>
                <div>• Programa 'Minha Casa Minha Vida - Resiliência Climática' para compra assistida e reassentamento fora do risco</div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
