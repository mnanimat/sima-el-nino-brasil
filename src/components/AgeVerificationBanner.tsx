import React from 'react';
import { UserCheck, ShieldAlert, CheckCircle2, ChevronRight, Scale } from 'lucide-react';

interface AgeVerificationBannerProps {
  isAgeVerified: boolean;
  onConfirmAge: () => void;
  onOpenLegalCenter: (tab?: 'terms' | 'privacy' | 'age' | 'license' | 'developer') => void;
}

export const AgeVerificationBanner: React.FC<AgeVerificationBannerProps> = ({
  isAgeVerified,
  onConfirmAge,
  onOpenLegalCenter,
}) => {
  if (isAgeVerified) return null;

  return (
    <div className="bg-gradient-to-r from-amber-950/90 via-slate-900/95 to-slate-900/95 border-b border-amber-500/30 text-slate-200 px-4 py-2.5 shadow-lg backdrop-blur-md relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 flex-shrink-0">
            <UserCheck className="w-3.5 h-3.5" />
          </div>
          <div className="text-slate-300">
            <strong className="text-amber-300 font-semibold">Ambiente Demonstrativo (Dados Fictícios/Simulados):</strong> Para fins de simulação e treinamento tático contra eventos climáticos, confirme ter 18 anos ou mais e estar de acordo com os{' '}
            <button 
              onClick={() => onOpenLegalCenter('terms')}
              className="underline text-emerald-400 hover:text-emerald-300 font-medium"
            >
              Termos de Uso
            </button>{' '}
            e a{' '}
            <button 
              onClick={() => onOpenLegalCenter('privacy')}
              className="underline text-sky-400 hover:text-sky-300 font-medium"
            >
              Política de Privacidade
            </button>.
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onOpenLegalCenter('license')}
            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <Scale className="w-3 h-3 text-cyan-400" />
            <span>Licença MIT</span>
          </button>

          <button
            onClick={onConfirmAge}
            className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 shadow transition-all active:scale-95"
          >
            <CheckCircle2 className="w-3 h-3" />
            <span>Confirmar 18+ anos</span>
          </button>
        </div>

      </div>
    </div>
  );
};
