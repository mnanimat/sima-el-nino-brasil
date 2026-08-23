import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  RefreshCw, 
  HelpCircle,
  Plane,
  Home,
  Truck,
  ShieldAlert
} from 'lucide-react';
import { ChatMessage } from '../types';

interface TacticalAdvisorChatProps {
  onClose?: () => void;
}

export const TacticalAdvisorChat: React.FC<TacticalAdvisorChatProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: 'Olá! Sou o **SIMA-Advisor**, assistente tático de resiliência e engenharia contra os impactos do **El Niño no Brasil**.\n\nPosso orientar sobre:\n- ✈️ **Aviação**: Pistas alagadas (SBPA), radar de windshear (TMA-SP), fumaça na Amazônia (SBEG) e hubs alternantes.\n- 🏠 **Moradias**: Encostas R1-R4, bioengenharia, drenagem sustentável e evacuação antecipada (Cell Broadcast).\n- 🚛 **Transporte**: Dragagem de hidrovias amazônicas, monitoramento de pontes e desvios intermodais.\n\nComo posso ajudar sua operação hoje?',
      timestamp: 'Agora',
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'O que fazer se a pista do Salgado Filho (SBPA) ameaçar alagar?',
    'Como estabilizar morros habitados durante chuvas extremas?',
    'Quais rotas alternativas para a seca na hidrovia do Rio Madeira?',
    'Quais as regras do DECEA para operações com fumaça de queimadas?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'Sem resposta disponível.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'Desculpe, ocorreu um erro de conexão com o servidor de IA. Tente novamente.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[650px] overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              SIMA Tactical Advisor
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-normal">
                Gemini 3.7 Flash
              </span>
            </h3>
            <p className="text-[11px] text-slate-400">Consultoria técnica para tomada de decisão em tempo real</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        )}
      </div>

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
          placeholder="Pergunte sobre contingência em aeroportos, deslizamentos ou secas..."
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
    </div>
  );
};
