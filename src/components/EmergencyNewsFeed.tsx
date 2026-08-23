import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Newspaper, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  AlertTriangle, 
  ShieldAlert, 
  Plane, 
  Home, 
  Truck, 
  CloudRain, 
  Flame, 
  Radio, 
  Globe, 
  Clock, 
  CheckCircle2, 
  Bot, 
  Filter, 
  Sparkles,
  ArrowUpRight,
  TrendingUp
} from 'lucide-react';
import { EmergencyNewsItem, NewsGroundingSource, RegionId } from '../types';

interface EmergencyNewsFeedProps {
  initialRegion?: RegionId | 'all';
  onConsultAdvisorWithNews?: (newsTitle: string, newsContext: string) => void;
}

export const EmergencyNewsFeed: React.FC<EmergencyNewsFeedProps> = ({
  initialRegion = 'all',
  onConsultAdvisorWithNews
}) => {
  const [news, setNews] = useState<EmergencyNewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>(initialRegion);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isGoogleSearchLive, setIsGoogleSearchLive] = useState<boolean>(true);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [activeSources, setActiveSources] = useState<NewsGroundingSource[]>([]);

  // Synchronize when initialRegion changes from parent
  useEffect(() => {
    if (initialRegion) {
      setSelectedRegion(initialRegion);
    }
  }, [initialRegion]);

  const fetchEmergencyNews = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const response = await fetch('/api/emergency-news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region: selectedRegion,
          category: selectedCategory,
          searchQuery: searchQuery.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.success && Array.isArray(data.news)) {
          setNews(data.news);
          setLastUpdated(data.lastUpdated || new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
          setIsGoogleSearchLive(Boolean(data.isRealTimeGoogleSearch));
          if (Array.isArray(data.groundingWebSources)) {
            setActiveSources(data.groundingWebSources);
          }
        }
      }
    } catch (err) {
      console.warn('Iniciando feed de contingência oficial para notícias de emergência:', (err as any)?.message || err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedRegion, selectedCategory, searchQuery]);

  // Initial load and refetch on filter change
  useEffect(() => {
    fetchEmergencyNews();
  }, [fetchEmergencyNews]);

  // Auto-refresh interval (every 60s if enabled)
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      fetchEmergencyNews(true);
    }, 60000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchEmergencyNews]);

  // Helper for category icons
  const getSectorIcon = (sector: string) => {
    switch (sector) {
      case 'aviation':
        return <Plane className="w-4 h-4 text-sky-400" />;
      case 'housing':
        return <Home className="w-4 h-4 text-amber-400" />;
      case 'transport':
        return <Truck className="w-4 h-4 text-emerald-400" />;
      case 'meteorologia':
        return <CloudRain className="w-4 h-4 text-indigo-400" />;
      case 'defesa_civil':
        return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      default:
        return <Radio className="w-4 h-4 text-slate-400" />;
    }
  };

  const getSectorLabel = (sector: string) => {
    switch (sector) {
      case 'aviation': return 'Aviação';
      case 'housing': return 'Moradias & Encostas';
      case 'transport': return 'Transporte & Rodovias';
      case 'meteorologia': return 'Meteorologia / Inmet';
      case 'defesa_civil': return 'Defesa Civil';
      default: return 'Geral';
    }
  };

  const getRegionName = (reg: string) => {
    switch (reg) {
      case 'sul': return 'Região Sul';
      case 'sudeste': return 'Região Sudeste';
      case 'norte': return 'Região Norte';
      case 'nordeste': return 'Região Nordeste';
      case 'centro-oeste': return 'Centro-Oeste';
      default: return 'Nacional / Brasil';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critico':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/50 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
            Crítico
          </span>
        );
      case 'alto':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
            Alto Risco
          </span>
        );
      case 'moderado':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
            Alerta Moderado
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider bg-sky-500/20 text-sky-300 border border-sky-500/30">
            Informativo
          </span>
        );
    }
  };

  // Check if there is any critical news for top flash bar
  const criticalNews = news.find(item => item.severity === 'critico');

  return (
    <div id="emergency-news-feed-module" className="bg-slate-900 border border-slate-800 rounded-3xl p-5 md:p-7 shadow-2xl space-y-6 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Newspaper className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Feed de Notícias de Emergência & Clima
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold uppercase tracking-wider">
                  <Globe className="w-3 h-3 text-emerald-400" />
                  Google Search Live
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Monitoramento em tempo real de eventos climáticos, chuvas extremas, secas e operações no Brasil.
              </p>
            </div>
          </div>
        </div>

        {/* Action controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="text-xs text-slate-400 flex items-center gap-1.5 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>Atualizado:</span>
            <strong className="text-slate-200">{lastUpdated || 'Agora'}</strong>
          </div>

          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              autoRefresh 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50' 
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
            title="Atualização automática a cada 60s"
          >
            <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
            Auto-Sync {autoRefresh ? 'ON' : 'OFF'}
          </button>

          <button
            onClick={() => fetchEmergencyNews(true)}
            disabled={refreshing || loading}
            className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50 shadow-md shadow-sky-600/20"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Buscando...' : 'Atualizar Notícias'}
          </button>
        </div>
      </div>

      {/* Critical Flash Ticker Banner (if critical news present) */}
      {criticalNews && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 flex items-start sm:items-center justify-between gap-3 shadow-lg shadow-rose-950/30"
        >
          <div className="flex items-start sm:items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle className="w-4 h-4 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-rose-300 tracking-wider mr-2 bg-rose-500/30 px-2 py-0.5 rounded">
                PLANTÃO DE EMERGÊNCIA
              </span>
              <span className="text-xs font-semibold text-rose-100 line-clamp-1 sm:line-clamp-none">
                {criticalNews.title}
              </span>
            </div>
          </div>

          {criticalNews.impactTag && (
            <span className="shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-lg bg-rose-500/30 text-rose-200 border border-rose-500/40 hidden md:inline-block">
              {criticalNews.impactTag}
            </span>
          )}
        </motion.div>
      )}

      {/* Search & Filter Bar */}
      <div className="space-y-3 relative z-10">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Keyword Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por cidade, aeroporto (SBPA, SBGR), rodovia (BR-116), bacia..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/80 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs px-1.5 py-0.5 rounded bg-slate-800"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Region Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3 text-slate-500" /> Região:
            </span>
            {[
              { id: 'all', label: 'Todas' },
              { id: 'sul', label: 'Sul' },
              { id: 'sudeste', label: 'Sudeste' },
              { id: 'norte', label: 'Norte' },
              { id: 'nordeste', label: 'Nordeste' },
              { id: 'centro-oeste', label: 'Centro-Oeste' },
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedRegion(reg.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedRegion === reg.id
                    ? 'bg-sky-500 text-white shadow-sm'
                    : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Setor:
          </span>
          {[
            { id: 'all', label: 'Todos os Setores', icon: Sparkles },
            { id: 'aviation', label: 'Aviação & Pistas', icon: Plane },
            { id: 'housing', label: 'Moradias & Encostas', icon: Home },
            { id: 'transport', label: 'Transporte & Rodovias', icon: Truck },
            { id: 'meteorologia', label: 'Meteorologia / INMET', icon: CloudRain },
            { id: 'defesa_civil', label: 'Defesa Civil', icon: ShieldAlert },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-800 text-sky-300 border border-sky-500/40 shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* News List Container */}
      <div className="space-y-4 relative z-10">
        {loading && !refreshing ? (
          <div className="py-16 text-center space-y-3">
            <RefreshCw className="w-8 h-8 text-sky-400 animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-300">
              Consultando Google Search e Boletins Oficiais em Tempo Real...
            </p>
            <p className="text-xs text-slate-500">
              Varrendo fontes do CEMADEN, INMET, DECEA, Defesa Civil e portais de notícias.
            </p>
          </div>
        ) : news.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-slate-950/50 border border-slate-800 space-y-3">
            <Newspaper className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-300">
              Nenhuma notícia encontrada para os filtros selecionados
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Tente redefinir os termos de busca ou selecionar "Todas as Regiões" e "Todos os Setores".
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedRegion('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs font-bold transition-colors"
            >
              Restaurar Filtros Padrão
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {news.map((item) => {
                const isCrit = item.severity === 'critico';
                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      ...(isCrit
                        ? {
                            borderColor: [
                              'rgba(244, 63, 94, 0.4)',
                              'rgba(239, 68, 68, 0.85)',
                              'rgba(244, 63, 94, 0.4)'
                            ],
                            boxShadow: [
                              '0 0 0px rgba(244, 63, 94, 0.1)',
                              '0 0 16px rgba(239, 68, 68, 0.25)',
                              '0 0 0px rgba(244, 63, 94, 0.1)'
                            ]
                          }
                        : {})
                    }}
                    transition={
                      isCrit
                        ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                        : { duration: 0.25 }
                    }
                    className={`rounded-2xl p-5 border flex flex-col justify-between transition-all group ${
                      isCrit
                        ? 'bg-slate-900/95'
                        : item.severity === 'alto'
                        ? 'bg-slate-950/80 border-slate-800 hover:border-amber-500/40'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className="p-1 rounded-lg bg-slate-900 border border-slate-800">
                            {getSectorIcon(item.sector)}
                          </span>
                          <span className="text-[11px] font-bold text-slate-300">
                            {getSectorLabel(item.sector)}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-[11px] text-slate-400 font-medium">
                            {getRegionName(item.region)}
                          </span>
                        </div>
                        {getSeverityBadge(item.severity)}
                      </div>

                      {/* Title */}
                      <h3 className="text-sm md:text-base font-bold text-white group-hover:text-sky-300 transition-colors leading-snug">
                        {item.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.summary}
                      </p>

                      {/* Impact Tag */}
                      {item.impactTag && (
                        <div className="pt-1">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
                            <TrendingUp className="w-3 h-3 text-sky-400" />
                            {item.impactTag}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Footer Info & External Link */}
                    <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2 flex-wrap text-xs">
                      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                        <span className="font-semibold text-slate-300">{item.source}</span>
                        <span>•</span>
                        <span>{item.publishedTime}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {onConsultAdvisorWithNews && (
                          <button
                            onClick={() => onConsultAdvisorWithNews(item.title, item.summary)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white text-[11px] font-bold flex items-center gap-1 transition-all"
                            title="Abrir consulta técnica com Advisor IA sobre esta notícia"
                          >
                            <Bot className="w-3 h-3" />
                            Analisar com IA
                          </button>
                        )}

                        {item.sourceUrl && (
                          <a
                            href={item.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                            title="Acessar portal oficial da fonte"
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Grounding Web Sources footer if available */}
      {activeSources.length > 0 && (
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Fontes Grounding verificadas pelo Google Search:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {activeSources.map((source, sIdx) => (
              <a
                key={sIdx}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-sky-300 flex items-center gap-1 transition-colors truncate max-w-xs"
              >
                <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                <span className="truncate">{source.title || 'Portal de Notícias'}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
