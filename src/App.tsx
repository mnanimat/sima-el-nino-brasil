import React, { useState, useEffect } from 'react';
import { 
  Plane, 
  Home, 
  Truck, 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight,
  TrendingDown,
  Layers,
  FileText,
  Radio,
  BarChart3,
  Bot,
  Satellite,
  Orbit,
  Scale,
  Lock,
  UserCheck,
  Code2
} from 'lucide-react';
import { Header } from './components/Header';
import { BrazilMap } from './components/BrazilMap';
import { AviationModule } from './components/AviationModule';
import { HousingModule } from './components/HousingModule';
import { TransportModule } from './components/TransportModule';
import { ScenarioSimulator } from './components/ScenarioSimulator';
import { PlanconAiGenerator } from './components/PlanconAiGenerator';
import { PreventionMeasuresCatalog } from './components/PreventionMeasuresCatalog';
import { AlertsManager } from './components/AlertsManager';
import { TacticalAdvisorChat } from './components/TacticalAdvisorChat';
import { SatelliteMissionModule } from './components/SatelliteMissionModule';
import { ComprehensiveChartsModule } from './components/ComprehensiveChartsModule';
import { LegalCenterModal, LegalTab } from './components/LegalCenterModal';
import { AgeVerificationBanner } from './components/AgeVerificationBanner';
import { ACTIVE_ALERTS, MACRO_SUMMARY, SIMA_SAT_TELEMETRY, REGIONS_DATA } from './data/mockElNinoData';
import { SectorType, RegionId, Hotspot } from './types';
import { motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<RegionId | null>('sul');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Legal Center & Age Verification State
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTab>('terms');
  const [isAgeVerified, setIsAgeVerified] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sima_age_verified') === 'true';
    } catch {
      return false;
    }
  });

  const handleConfirmAge = () => {
    setIsAgeVerified(true);
    try {
      localStorage.setItem('sima_age_verified', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenLegalModal = (tab: LegalTab = 'terms') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  // Pre-fill state for PLANCON generator when triggered from other tabs
  const [planconConfig, setPlanconConfig] = useState({
    sector: 'Aviação',
    region: 'Região Sul',
    location: 'Aeroporto Internacional Salgado Filho (SBPA)',
  });

  const handleTriggerPlancon = (sector: string, region: string, location: string) => {
    setPlanconConfig({ sector, region, location });
    setActiveTab('plancon');
  };

  const handleHotspotSelect = (hotspot: Hotspot | null) => {
    setSelectedHotspot(hotspot);
  };

  // Dynamic status evaluation for Main Page Status Cards
  const currentRegionData = selectedRegion ? REGIONS_DATA[selectedRegion] : REGIONS_DATA['sul'];
  const aviationStatus = currentRegionData?.aviationStatus.status || 'critico';
  const housingStatus = currentRegionData?.housingStatus.status || 'critico';
  const transportStatus = currentRegionData?.transportStatus.status || 'critico';

  const isAviationCritical = aviationStatus === 'critico';
  const isHousingCritical = housingStatus === 'critico';
  const isTransportCritical = transportStatus === 'critico';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Persistent Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeAlertCount={ACTIVE_ALERTS.length}
        onOpenChat={() => setIsChatOpen(true)}
        onOpenLegalCenter={handleOpenLegalModal}
        isAgeVerified={isAgeVerified}
      />

      {/* Age Verification & Legal Notice Banner */}
      <AgeVerificationBanner
        isAgeVerified={isAgeVerified}
        onConfirmAge={handleConfirmAge}
        onOpenLegalCenter={handleOpenLegalModal}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* TAB: ALL (Macro Executive Overview) */}
        {activeTab === 'all' && (
          <div className="space-y-8">
            
            {/* Executive Status Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      BOLETIM OPERACIONAL EL NIÑO 2024–2026
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                      <Satellite className="w-3.5 h-3.5" />
                      SIMA-SAT 1 EM ÓRBITA HELIOSÍNCRONA (560 KM)
                    </span>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      PREVENÇÃO ATIVA
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Prevenção de Colapsos na Aviação, Moradias e Transporte
                  </h1>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Plataforma nacional de engenharia, contingência preditiva e vigilância radar orbital para mitigar secas na Amazônia, inundações no Sul e deslizamentos no Sudeste durante o El Niño.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => setActiveTab('satellite')}
                    className="px-4 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-cyan-950/50 active:scale-95"
                  >
                    <Satellite className="w-4 h-4" />
                    <span>Satélite SIMA-SAT 1</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('charts')}
                    className="px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-950/50 active:scale-95"
                  >
                    <BarChart3 className="w-4 h-4" />
                    <span>Gráficos & Telemetria</span>
                  </button>

                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-950/50 active:scale-95"
                  >
                    <Bot className="w-4 h-4" />
                    <span>SIMA Advisor IA</span>
                  </button>
                </div>
              </div>

              {/* Macro Key Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
                <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Plane className="w-3.5 h-3.5 text-sky-400" /> Pistas Sob Proteção
                  </div>
                  <div className="text-xl font-bold text-sky-400 mt-1">{MACRO_SUMMARY.protectedAirports} aeródromos</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Diques e hubs alternantes</div>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Home className="w-3.5 h-3.5 text-amber-400" /> Moradias Geomonitoradas
                  </div>
                  <div className="text-xl font-bold text-amber-400 mt-1">
                    {(MACRO_SUMMARY.monitoredSlopesFamilies / 1000).toFixed(0)} mil famílias
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Alertas via Cell Broadcast</div>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-emerald-400" /> Corredores Logísticos
                  </div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">
                    {(MACRO_SUMMARY.protectedCorridorKm / 1000).toFixed(1)} mil km
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Dragagem e sensores IoT</div>
                </div>

                <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> Prejuízos Evitados (Est.)
                  </div>
                  <div className="text-xl font-bold text-emerald-300 mt-1">
                    R$ {MACRO_SUMMARY.estimatedSavingsBillions} Bi
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Retorno econômico direto</div>
                </div>
              </div>
            </div>

            {/* Satellite Live Card Highlight on Main Page */}
            <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-900 border border-cyan-800/40 rounded-3xl p-5 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <Satellite className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-bold text-cyan-300 flex items-center gap-2">
                    <span>Satélite Dedicado SIMA-SAT 1 em Operação</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Órbita Polar a 560 km • Varredura SAR Banda-L em andamento na Bacia do Guaíba e Rio Madeira • Downlink contínuo com Estação Cuiabá (INPE).
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('satellite')}
                className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow whitespace-nowrap active:scale-95"
              >
                <span>Painel de Telemetria Orbital</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Interactive Brazil Map & Regional Telemetry */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-400" />
                    Monitoramento Geoespacial de Riscos El Niño
                  </h2>
                  <p className="text-xs text-slate-400">
                    Selecione uma região geográfica ou um ponto crítico no mapa para inspecionar diagnósticos e contingências.
                  </p>
                </div>
              </div>

              <BrazilMap
                activeSector="all"
                selectedRegion={selectedRegion}
                onSelectRegion={setSelectedRegion}
                selectedHotspot={selectedHotspot}
                onSelectHotspot={handleHotspotSelect}
                onGeneratePlan={(sec, reg, loc) => handleTriggerPlancon(sec, reg, loc)}
              />
            </div>

            {/* 3 Pillar Strategic Cards */}
            <div className="space-y-4">
              <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    Pilares de Resiliência Setorial
                  </h2>
                  <p className="text-xs text-slate-400">
                    Acesse as soluções de engenharia dedicadas a cada setor crítico nacional.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Contexto Regional Ativo:</span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">
                    {currentRegionData?.name || 'Brasil'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Pillar 1: Aviação */}
                <motion.div 
                  id="pillar-card-aviation"
                  onClick={() => setActiveTab('aviation')}
                  animate={
                    isAviationCritical
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
                          ],
                          scale: [1, 1.01, 1]
                        }
                      : {
                          borderColor: 'rgba(30, 41, 59, 1)',
                          backgroundColor: 'rgba(15, 23, 42, 1)',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
                          scale: 1
                        }
                  }
                  transition={
                    isAviationCritical
                      ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.3 }
                  }
                  className="border hover:border-sky-500/60 rounded-3xl p-6 shadow-xl transition-all group cursor-pointer flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:scale-110 transition-transform">
                        <Plane className="w-6 h-6" />
                      </div>
                      {isAviationCritical ? (
                        <motion.span
                          animate={{
                            scale: [1, 1.06, 1],
                            opacity: [0.85, 1, 0.85]
                          }}
                          transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/25 text-rose-200 border border-rose-500/60 flex items-center gap-1.5 shadow-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                          ALERTA CRÍTICO
                        </motion.span>
                      ) : (
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          aviationStatus === 'alto' 
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          Status: {aviationStatus.toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
                        Setor Aeronáutico
                      </span>
                      <h3 className="text-base font-bold text-white mt-1 group-hover:text-sky-300 transition-colors">
                        Aviação & Aeródromos Resilientes
                      </h3>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        Blindagem contra inundações de pistas (diques cota +6m), detecção Doppler de windshear e homologação de bases alternativas (Canoas/Viracopos/Boa Vista).
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 text-[11px] text-slate-400">
                      <div>• Drenagem e comportas no Salgado Filho (SBPA)</div>
                      <div>• Protocolos IFR para fumaça na Amazônia (SBEG)</div>
                      <div>• Radar de aproximação na TMA-SP (SBGR/SBSP)</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-sky-400 group-hover:text-sky-300">
                    <span>Acessar Módulo da Aviação</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>

                {/* Pillar 2: Moradias */}
                <motion.div 
                  id="pillar-card-housing"
                  onClick={() => setActiveTab('housing')}
                  animate={
                    isHousingCritical
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
                          ],
                          scale: [1, 1.01, 1]
                        }
                      : {
                          borderColor: 'rgba(30, 41, 59, 1)',
                          backgroundColor: 'rgba(15, 23, 42, 1)',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
                          scale: 1
                        }
                  }
                  transition={
                    isHousingCritical
                      ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.3 }
                  }
                  className="border hover:border-amber-500/60 rounded-3xl p-6 shadow-xl transition-all group cursor-pointer flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                        <Home className="w-6 h-6" />
                      </div>
                      {isHousingCritical ? (
                        <motion.span
                          animate={{
                            scale: [1, 1.06, 1],
                            opacity: [0.85, 1, 0.85]
                          }}
                          transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/25 text-rose-200 border border-rose-500/60 flex items-center gap-1.5 shadow-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                          ALERTA CRÍTICO
                        </motion.span>
                      ) : (
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          housingStatus === 'alto' 
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          Status: {housingStatus.toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                        Setor Habitacional
                      </span>
                      <h3 className="text-base font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">
                        Moradias & Proteção de Encostas
                      </h3>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        Evacuação antecipada compulsória via Cell Broadcast (sirene no celular), bioengenharia com capim-vetiver e bacias de amortecimento contra inundações.
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 text-[11px] text-slate-400">
                      <div>• Drenos DHP e redes de aço na Serra do Mar e Petrópolis</div>
                      <div>• Monitoramento de saturação do solo via CEMADEN</div>
                      <div>• Rede de abrigos em cotas seguras e reassentamento</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:text-amber-300">
                    <span>Acessar Módulo de Moradias</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>

                {/* Pillar 3: Transporte */}
                <motion.div 
                  id="pillar-card-transport"
                  onClick={() => setActiveTab('transport')}
                  animate={
                    isTransportCritical
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
                          ],
                          scale: [1, 1.01, 1]
                        }
                      : {
                          borderColor: 'rgba(30, 41, 59, 1)',
                          backgroundColor: 'rgba(15, 23, 42, 1)',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4)',
                          scale: 1
                        }
                  }
                  transition={
                    isTransportCritical
                      ? { duration: 2.4, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 0.3 }
                  }
                  className="border hover:border-emerald-500/60 rounded-3xl p-6 shadow-xl transition-all group cursor-pointer flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <Truck className="w-6 h-6" />
                      </div>
                      {isTransportCritical ? (
                        <motion.span
                          animate={{
                            scale: [1, 1.06, 1],
                            opacity: [0.85, 1, 0.85]
                          }}
                          transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/25 text-rose-200 border border-rose-500/60 flex items-center gap-1.5 shadow-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                          ALERTA CRÍTICO
                        </motion.span>
                      ) : (
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          transportStatus === 'alto' 
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                            : transportStatus === 'moderado'
                            ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          Status: {transportStatus.toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        Setor Logístico
                      </span>
                      <h3 className="text-base font-bold text-white mt-1 group-hover:text-emerald-300 transition-colors">
                        Transporte & Corredores Nacionais
                      </h3>
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                        Dragagem preditiva de passos rochosos em rios amazônicos (Madeira/Solimões), sensores IoT em pontes rodoviárias e kits de transposição do Exército.
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 text-[11px] text-slate-400">
                      <div>• Batimetria contínua e fracionamento de barcaças</div>
                      <div>• Inclinômetros na BR-116 e BR-101 Sul</div>
                      <div>• Ativação de cabotagem e rotas intermodais de desvio</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-400 group-hover:text-emerald-300">
                    <span>Acessar Módulo de Transporte</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        )}

        {/* TAB: SATELLITE (SIMA-SAT 1) */}
        {activeTab === 'satellite' && (
          <SatelliteMissionModule 
            onSelectRegion={setSelectedRegion}
            onGeneratePlan={handleTriggerPlancon}
          />
        )}

        {/* TAB: CHARTS & TELEMETRY */}
        {activeTab === 'charts' && (
          <ComprehensiveChartsModule />
        )}

        {/* TAB: AVIATION */}
        {activeTab === 'aviation' && (
          <AviationModule onGeneratePlan={handleTriggerPlancon} />
        )}

        {/* TAB: HOUSING */}
        {activeTab === 'housing' && (
          <HousingModule onGeneratePlan={handleTriggerPlancon} />
        )}

        {/* TAB: TRANSPORT */}
        {activeTab === 'transport' && (
          <TransportModule onGeneratePlan={handleTriggerPlancon} />
        )}

        {/* TAB: SIMULATOR */}
        {activeTab === 'simulator' && <ScenarioSimulator />}

        {/* TAB: PLANCON AI */}
        {activeTab === 'plancon' && (
          <PlanconAiGenerator
            initialSector={planconConfig.sector}
            initialRegion={planconConfig.region}
            initialLocation={planconConfig.location}
          />
        )}

        {/* TAB: CATALOG */}
        {activeTab === 'catalog' && <PreventionMeasuresCatalog />}

        {/* TAB: ALERTS */}
        {activeTab === 'alerts' && <AlertsManager />}

      </main>

      {/* Floating Tactical Advisor Chat Modal / Drawer */}
      {isChatOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <TacticalAdvisorChat onClose={() => setIsChatOpen(false)} />
          </div>
        </div>
      )}

      {/* Legal Center & Compliance Modal */}
      <LegalCenterModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
        isAgeVerified={isAgeVerified}
        onConfirmAge={handleConfirmAge}
      />

      {/* Footer with Comprehensive Legal, Compliance and Developer Credits */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* Main Footer Row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Satellite className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <strong className="text-white font-bold">SIMA El Niño Brasil</strong>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded border border-slate-700">
                    Open Source MIT
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  Sistema Integrado de Mitigação, Alerta Antecipado e Resiliência (Aviação, Moradias e Transporte)
                </p>
              </div>
            </div>

            {/* Developer Credits Highlight */}
            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs text-slate-300">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                  Engenharia & Autoria
                </div>
                <div className="font-semibold text-white">
                  Desenvolvedor: <span className="text-slate-100 font-bold">Micael Nildo Oliveira Souza</span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400 inline" />
                  <span>Com auxílio de inteligência artificial</span>
                </div>
              </div>
              <button
                onClick={() => handleOpenLegalModal('developer')}
                className="ml-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium border border-slate-700 transition-colors"
              >
                Detalhes
              </button>
            </div>
          </div>

          {/* Legal Navigation Links & Disclaimers */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
              <button
                onClick={() => handleOpenLegalModal('terms')}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Termos de Uso</span>
              </button>
              
              <button
                onClick={() => handleOpenLegalModal('privacy')}
                className="hover:text-sky-400 transition-colors flex items-center gap-1"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Política de Privacidade (LGPD)</span>
              </button>

              <button
                onClick={() => handleOpenLegalModal('age')}
                className="hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Verificação de Idade (18+)</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                  isAgeVerified 
                    ? 'bg-emerald-500/20 text-emerald-300' 
                    : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {isAgeVerified ? 'Verificado' : 'Pendente'}
                </span>
              </button>

              <button
                onClick={() => handleOpenLegalModal('license')}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <Scale className="w-3.5 h-3.5 text-slate-400" />
                <span>Licença MIT (EN / PT-BR)</span>
              </button>
            </div>

            <div className="text-slate-500 text-center sm:text-right">
              DECEA • ANAC • CEMADEN • DEFESA CIVIL • DNIT • INPE • CPRM
            </div>
          </div>

          <div className="text-[10px] text-slate-500 text-center pt-2 space-y-1">
            <div>
              <span className="text-amber-400/90 font-medium">Ambiente Demonstrativo:</span> Protótipo de engenharia com dados e cenários matematicamente simulados para testes, treinamento e planejamento tático.
            </div>
            <div className="text-slate-600">
              © 2026 Micael Nildo Oliveira Souza. Licenciado sob os termos da Licença de Código Aberto MIT.
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

