import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  RefreshCw, 
  Plane, 
  Home, 
  Truck, 
  Satellite, 
  ShieldCheck, 
  Search, 
  BookOpen, 
  MessageSquare,
  Copy,
  Check,
  Tag,
  ChevronRight,
  Filter
} from 'lucide-react';
import { ChatMessage } from '../types';
import { ADVISOR_KNOWLEDGE_BASE, AdvisorEntry, searchAdvisorKnowledge } from '../data/advisorKnowledgeBase';

interface TacticalAdvisorChatProps {
  onClose?: () => void;
  initialPrompt?: string;
}

export const TacticalAdvisorChat: React.FC<TacticalAdvisorChatProps> = ({ onClose, initialPrompt }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'knowledge'>('chat');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: 'Olá! Sou o **SIMA-Advisor**, assistente tático de resiliência e engenharia contra os impactos do **El Niño no Brasil**.\n\nTenho uma **Base de Conhecimento com mais de 100 pareceres técnicos detalhados** sobre:\n- ✈️ **Aviação**: Pistas alagadas (SBPA), radar de windshear (TMA-SP), fumaça na Amazônia (SBEG) e hubs alternantes.\n- 🏠 **Moradias**: Encostas R1-R4, bioengenharia, drenagem sustentável e evacuação antecipada (Cell Broadcast).\n- 🚛 **Transporte**: Dragagem de hidrovias amazônicas, monitoramento de pontes e desvios intermodais.\n- 🛰️ **Satélites**: Radar SAR Banda-L do SIMA-SAT 1 e índices oceânicos (ONI).\n- ⚖️ **Defesa Civil**: PLANCON (Lei 12.608), compras emergenciais e salas de crise.\n\nVocê pode digitar sua dúvida ou explorar a aba **"100+ Respostas Técnicas"** acima!',
      timestamp: 'Agora',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialPromptSent = useRef(false);

  useEffect(() => {
    if (initialPrompt && !initialPromptSent.current) {
      initialPromptSent.current = true;
      handleSend(initialPrompt);
    }
  }, [initialPrompt]);

  const quickPrompts = [
    'O que fazer se a pista do Salgado Filho (SBPA) ameaçar alagar?',
    'Como estabilizar morros habitados durante chuvas extremas?',
    'Quais rotas alternativas para a seca na hidrovia do Rio Madeira?',
    'Como funciona o radar SAR Banda-L do satélite SIMA-SAT 1?',
    'Quais os limiares pluviométricos críticos do CEMADEN?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === 'chat') {
      scrollToBottom();
    }
  }, [messages, isLoading, activeTab]);

  const handleSend = async (textToSend?: string) => {
    const q = textToSend || input;
    if (!q.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setActiveTab('chat');

    // First check local high-fidelity knowledge base match
    const localMatches = searchAdvisorKnowledge(q);
    const topMatch = localMatches.length > 0 ? localMatches[0] : null;

    try {
      const res = await fetch('/api/gemini/ask-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          history: messages.slice(-4),
        }),
      });
      const data = await res.json();

      let answerText = data.answer || '';
      
      // If server returned fallback or generic, enrich with top match if relevant
      if ((!answerText || answerText.includes('[Simulação')) && topMatch) {
        answerText = `**[Parecer Técnico Especializado - Base SIMA]**\n\n${topMatch.answer}\n\n*🏷️ Tópicos Relacionados:* ${topMatch.tags.join(', ')}`;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: answerText || (topMatch ? topMatch.answer : 'Orientação técnica registrada no sistema.'),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const fallbackText = topMatch 
        ? `**[Parecer Técnico Especializado - Base SIMA]**\n\n${topMatch.answer}\n\n*🏷️ Tópicos:* ${topMatch.tags.join(', ')}`
        : 'Desculpe, ocorreu uma instabilidade. Consulte os tópicos na aba "100+ Respostas Técnicas".';

      const errMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered knowledge base items
  const filteredKnowledge = ADVISOR_KNOWLEDGE_BASE.filter(item => {
    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    if (!matchCategory) return false;

    if (!searchQuery.trim()) return true;
    const qLower = searchQuery.toLowerCase();
    return (
      item.question.toLowerCase().includes(qLower) ||
      item.answer.toLowerCase().includes(qLower) ||
      item.tags.some(t => t.toLowerCase().includes(qLower))
    );
  });

  const categories = [
    { id: 'all', label: 'Todas (105)', icon: BookOpen },
    { id: 'aviation', label: '✈️ Aviação (25)', icon: Plane },
    { id: 'housing', label: '🏠 Moradias (25)', icon: Home },
    { id: 'transport', label: '🚛 Transporte (25)', icon: Truck },
    { id: 'meteorology', label: '🛰️ Satélites (15)', icon: Satellite },
    { id: 'civil_defense', label: '⚖️ Defesa Civil (15)', icon: ShieldCheck },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[650px] overflow-hidden">
      {/* Header */}
      <div className="p-3.5 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-4.5 h-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              SIMA Tactical Advisor
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-medium">
                105+ Pareceres Técnicos &amp; IA
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Consultoria técnica para tomada de decisão em tempo real</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tabs */}
          <div className="flex bg-slate-950/80 p-0.5 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium transition-colors ${
                activeTab === 'chat' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat IA</span>
            </button>
            <button
              onClick={() => setActiveTab('knowledge')}
              className={`px-2.5 py-1 rounded-md flex items-center gap-1.5 font-medium transition-colors ${
                activeTab === 'knowledge' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>100+ Respostas ({ADVISOR_KNOWLEDGE_BASE.length})</span>
            </button>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors ml-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {activeTab === 'chat' ? (
        <>
          {/* Message Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((m) => {
              const isBot = m.sender === 'assistant';
              return (
                <div
                  key={m.id}
                  className={`flex gap-3 ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs ${
                      isBot
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/30'
                        : 'bg-cyan-600 text-white'
                    }`}
                  >
                    {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      isBot
                        ? 'bg-slate-950/80 border border-slate-800 text-slate-200'
                        : 'bg-emerald-600 text-white font-medium rounded-tr-none'
                    }`}
                  >
                    {m.text}
                    <div
                      className={`mt-1.5 text-[9px] ${
                        isBot ? 'text-slate-500' : 'text-emerald-200'
                      }`}
                    >
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs bg-slate-950/50 p-3 rounded-xl border border-slate-800 w-fit">
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-400" />
                <span>SIMA Advisor consultando diretrizes de engenharia e defesa civil...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-4 py-2 bg-slate-950/40 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto">
            <span className="text-[10px] text-slate-500 uppercase font-bold whitespace-nowrap mr-1">
              Sugestões:
            </span>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 whitespace-nowrap transition-colors"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Field */}
          <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pergunte sobre contingência em aeroportos, deslizamentos, secas ou satélites..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white transition-all shadow-md shadow-emerald-950/40 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        /* Knowledge Base Mode (100+ items) */
        <div className="flex-1 flex flex-col overflow-hidden bg-slate-950/60">
          {/* Search & Filter Bar */}
          <div className="p-3 border-b border-slate-800 space-y-2.5 bg-slate-900/60">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquise por palavras-chave (ex: SBPA, grooving, Vetiver, Rio Madeira, radar SAR, PLANCON)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border whitespace-nowrap transition-colors flex items-center gap-1 font-medium ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* List of 100+ Responses */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>Exibindo <strong>{filteredKnowledge.length}</strong> de <strong>{ADVISOR_KNOWLEDGE_BASE.length}</strong> pareceres técnicos</span>
              <span className="text-emerald-400 font-medium">100% Homologado para Resiliência</span>
            </div>

            {filteredKnowledge.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">
                Nenhuma resposta encontrada para "{searchQuery}". Tente outros termos como "drenagem", "pista", "enchente" ou "satélite".
              </div>
            ) : (
              filteredKnowledge.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-xl p-3.5 transition-all shadow-sm space-y-2.5 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {item.categoryLabel}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">#{item.id}</span>
                    </div>

                    <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(item.answer, item.id)}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] flex items-center gap-1 transition-colors"
                        title="Copiar Parecer"
                      >
                        {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span className="hidden sm:inline">{copiedId === item.id ? 'Copiado' : 'Copiar'}</span>
                      </button>

                      <button
                        onClick={() => handleSend(item.question)}
                        className="p-1 px-2 rounded bg-emerald-600/80 hover:bg-emerald-500 text-white text-[10px] font-medium flex items-center gap-1 transition-colors"
                        title="Perguntar no Chat"
                      >
                        <span>Abrir no Chat</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold text-slate-100 leading-snug">
                    {item.question}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 whitespace-pre-wrap">
                    {item.answer}
                  </p>

                  <div className="flex flex-wrap items-center gap-1 pt-0.5">
                    <Tag className="w-3 h-3 text-slate-500 mr-0.5" />
                    {item.tags.map((tag, tIdx) => (
                      <button
                        key={tIdx}
                        onClick={() => setSearchQuery(tag)}
                        className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800/70 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/40 transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
