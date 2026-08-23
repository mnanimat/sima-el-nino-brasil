import React, { useState } from 'react';
import { 
  AlertTriangle, 
  BellRing, 
  Radio, 
  ShieldAlert, 
  CheckCircle2, 
  Plus, 
  Filter, 
  Plane, 
  Home, 
  Truck,
  MapPin,
  Clock
} from 'lucide-react';
import { ACTIVE_ALERTS } from '../data/mockElNinoData';
import { AlertItem, RiskLevel, SectorType } from '../types';

export const AlertsManager: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>(ACTIVE_ALERTS);
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [showNewAlertModal, setShowNewAlertModal] = useState(false);

  // New alert form
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newSector, setNewSector] = useState<'aviation' | 'housing' | 'transport'>('housing');
  const [newSeverity, setNewSeverity] = useState<RiskLevel>('alto');
  const [newDescription, setNewDescription] = useState('');
  const [newAction, setNewAction] = useState('');

  const filtered = alerts.filter((a) => {
    if (sectorFilter !== 'all' && a.sector !== sectorFilter) return false;
    if (severityFilter !== 'all' && a.severity !== severityFilter) return false;
    return true;
  });

  const handleAcknowledge = (id: string) => {
    setAlerts(
      alerts.map((a) => (a.id === id ? { ...a, acknowledged: true } : a))
    );
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newLocation) return;

    const newAlert: AlertItem = {
      id: `custom-alt-${Date.now()}`,
      timestamp: 'Agora mesmo',
      title: newTitle,
      description: newDescription || 'Alerta emitido pelo operador de controle de crise.',
      sector: newSector,
      region: 'sul',
      severity: newSeverity,
      location: newLocation,
      affectedAssets: ['Instalações monitoradas', 'Comunidades vizinhas'],
      recommendedAction: newAction || 'Acionar plano de contingência e equipes de pronta resposta.',
      isSimulated: true,
    };

    setAlerts([newAlert, ...alerts]);
    setShowNewAlertModal(false);
    setNewTitle('');
    setNewLocation('');
    setNewDescription('');
    setNewAction('');
  };

  const getSeverityStyle = (sev: RiskLevel) => {
    switch (sev) {
      case 'critico':
        return 'bg-rose-950/70 border-rose-600/60 text-rose-300';
      case 'alto':
        return 'bg-amber-950/70 border-amber-600/60 text-amber-300';
      default:
        return 'bg-yellow-950/70 border-yellow-600/60 text-yellow-300';
    }
  };

  const getSectorIcon = (sec: string) => {
    switch (sec) {
      case 'aviation':
        return <Plane className="w-4 h-4 text-sky-400" />;
      case 'housing':
        return <Home className="w-4 h-4 text-amber-400" />;
      default:
        return <Truck className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 border border-rose-800/40 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  Centro de Alertas & Notificações de Emergência
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  DISPARO EM TEMPO REAL
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Boletins hidrometeorológicos, avisos aeroportuários (NOTAM), ordens de evacuação de encostas e interdições de rodovias.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowNewAlertModal(true)}
            className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-rose-950/40 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Emitir Alerta Operacional</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-medium focus:outline-none focus:border-rose-500"
          >
            <option value="all">Todos os Setores</option>
            <option value="aviation">Aviação</option>
            <option value="housing">Moradias</option>
            <option value="transport">Transporte</option>
          </select>

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-medium focus:outline-none focus:border-rose-500"
          >
            <option value="all">Todas as Gravidades</option>
            <option value="critico">Gravidade Crítica (Alerta Vermelho)</option>
            <option value="alto">Gravidade Alta (Alerta Laranja)</option>
            <option value="moderado">Gravidade Moderada (Alerta Amarelo)</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-medium">
          Total de <strong className="text-rose-400">{filtered.length}</strong> avisos ativos
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filtered.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-2xl p-5 shadow-xl transition-all ${
              alert.acknowledged
                ? 'bg-slate-900/60 border-slate-800 opacity-60'
                : getSeverityStyle(alert.severity)
            }`}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  {getSectorIcon(alert.sector)}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950/80">
                      {alert.severity} • {alert.sector.toUpperCase()}
                    </span>
                    {alert.isSimulated && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                        SIMULADO
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white mt-1">{alert.title}</h3>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {alert.timestamp}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {alert.location}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-200 mt-3 leading-relaxed">
              {alert.description}
            </p>

            <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="text-slate-300">
                <strong className="text-rose-300 font-semibold">Ação Imediata Mandatória:</strong>{' '}
                {alert.recommendedAction}
              </div>

              <button
                onClick={() => handleAcknowledge(alert.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                  alert.acknowledged
                    ? 'bg-slate-800 text-slate-400'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{alert.acknowledged ? 'Atendido' : 'Confirmar Ação'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Creating Simulated / Manual Emergency Alert */}
      {showNewAlertModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Radio className="w-4 h-4 text-rose-400 animate-pulse" />
                Emitir Alerta Operacional El Niño
              </h3>
              <button
                onClick={() => setShowNewAlertModal(false)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAlert} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-300 block mb-1">Título do Alerta:</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Ex: Risco de Inundação na Pista do Aeroporto Salgado Filho..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Setor:</label>
                  <select
                    value={newSector}
                    onChange={(e) => setNewSector(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                  >
                    <option value="aviation">Aviação</option>
                    <option value="housing">Moradias & Encostas</option>
                    <option value="transport">Transporte & Logística</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-300 block mb-1">Nível de Gravidade:</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                  >
                    <option value="critico">Crítico (Alerta Vermelho)</option>
                    <option value="alto">Alto (Alerta Laranja)</option>
                    <option value="moderado">Moderado (Alerta Amarelo)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Localização Alvo:</label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Ex: Porto Alegre / RS, Serra do Mar / SP, Rio Madeira / AM..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Descrição do Fenômeno:</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Detalhes meteorológicos ou operacionais..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500 resize-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-300 block mb-1">Ação Preventiva Recomendada:</label>
                <input
                  type="text"
                  value={newAction}
                  onChange={(e) => setNewAction(e.target.value)}
                  placeholder="Ex: Evacuação preventiva imediata, desvio de voos para Canoas..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewAlertModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-md shadow-rose-950/50"
                >
                  Publicar Alerta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
