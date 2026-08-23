import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Lock, 
  UserCheck, 
  Scale, 
  Code2, 
  Sparkles, 
  X, 
  Globe, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink,
  Copy,
  Check,
  Building2,
  Calendar,
  Layers,
  Mail,
  MessageSquare,
  Handshake,
  HelpCircle,
  Send
} from 'lucide-react';

export type LegalTab = 'terms' | 'privacy' | 'age' | 'license' | 'developer' | 'contact';

interface LegalCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTab;
  isAgeVerified: boolean;
  onConfirmAge: () => void;
}

export const LegalCenterModal: React.FC<LegalCenterModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'terms',
  isAgeVerified,
  onConfirmAge,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);
  const [licenseLang, setLicenseLang] = useState<'en' | 'pt'>('pt');
  const [copied, setCopied] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const contactEmail = 'micaelnildo@mnanimat.xyz';

  if (!isOpen) return null;

  const handleCopyLicense = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const mitLicenseEn = `MIT License

Copyright (c) 2026 Micael Nildo Oliveira Souza

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;

  const mitLicensePt = `Licença MIT (Tradução Informativa para o Português do Brasil)

Direitos Autorais (c) 2026 Micael Nildo Oliveira Souza

É concedida permissão, gratuitamente, a qualquer pessoa que obtenha uma cópia
deste software e dos arquivos de documentação associados (o "Software"), para lidar
com o Software sem restrições, incluindo, sem limitação, os direitos de usar, copiar,
modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender cópias do Software,
e permitir que as pessoas a quem o Software é fornecido o façam, sujeitas às seguintes condições:

O aviso de direitos autorais acima e este aviso de permissão deverão ser incluídos em
todas as cópias ou partes substanciais do Software.

O SOFTWARE É FORNECIDO "NO ESTADO EM QUE SE ENCONTRA", SEM QUALQUER TIPO DE GARANTIA,
EXPRESSA OU IMPLÍCITA, INCLUINDO, MAS NÃO SE LIMITANDO ÀS GARANTIAS DE COMERCIALIZAÇÃO,
ADEQUAÇÃO A UMA FINALIDADE ESPECÍFICA E NÃO VIOLAÇÃO. EM NENHUMA HIPÓTESE OS AUTORES
OU DETENTORES DE DIREITOS AUTORAIS SERÃO RESPONSÁVEIS POR QUALQUER RECLAMAÇÃO, DANOS OU
OUTRA RESPONSABILIDADE, SEJA EM UMA AÇÃO DE CONTRATO, ILÍCITO OU DE OUTRA FORMA, DECORRENTE DE,
FORA DE OU EM CONEXÃO COM O SOFTWARE OU O USO OU OUTRAS NEGOCIAÇÕES NO SOFTWARE.`;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">
                  Central Legal, Termos & Licença
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  SIMA BRASIL
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Termos de Uso, Política de Privacidade (LGPD), Verificação de Idade e Licença de Software
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 pt-3 pb-2 border-b border-slate-800 bg-slate-950/40 overflow-x-auto scrollbar-thin">
          {[
            { id: 'terms' as LegalTab, label: 'Termos de Uso', icon: <FileText className="w-3.5 h-3.5" /> },
            { id: 'privacy' as LegalTab, label: 'Privacidade & LGPD', icon: <Lock className="w-3.5 h-3.5" /> },
            { id: 'age' as LegalTab, label: 'Verificação de Idade', icon: <UserCheck className="w-3.5 h-3.5" />, badge: isAgeVerified ? 'Verificado' : 'Pendente' },
            { id: 'license' as LegalTab, label: 'Licença MIT (EN / PT-BR)', icon: <Scale className="w-3.5 h-3.5" /> },
            { id: 'developer' as LegalTab, label: 'Desenvolvedor & IA', icon: <Code2 className="w-3.5 h-3.5 text-cyan-400" /> },
            { id: 'contact' as LegalTab, label: 'Contato & Parcerias', icon: <Mail className="w-3.5 h-3.5 text-emerald-400" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-slate-800 text-white border-slate-600 shadow-sm'
                    : 'bg-transparent text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                    isAgeVerified 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
          
          {/* TAB 1: TERMOS DE USO */}
          {activeTab === 'terms' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Termos de Uso e Condições Gerais
                </div>
                <h3 className="text-base font-bold text-white">
                  Plataforma SIMA El Niño Brasil — Sistema Integrado de Resiliência
                </h3>
                <p className="text-xs text-slate-400">
                  Última atualização: Fevereiro de 2026 • Vigência Nacional
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <section className="space-y-1.5">
                  <h4 className="font-bold text-white text-sm">1. Natureza e Finalidade do Sistema (Ambiente Demonstrativo)</h4>
                  <p>
                    O <strong>SIMA (Sistema Integrado de Mitigação, Alerta Antecipado e Resiliência ao El Niño)</strong> é uma plataforma de engenharia de contingência, simulação preditiva, visualização geoespacial e apoio à tomada de decisões em infraestrutura crítica (Aviação, Moradias em Encostas e Corredores de Transporte).
                  </p>
                  <p className="text-amber-300/90 bg-amber-950/40 p-3 rounded-xl border border-amber-800/40 font-medium">
                    <strong>Aviso de Ambiente Demonstrativo e Dados Fictícios/Simulados:</strong> Esta aplicação constitui um protótipo tecnológico funcional e demonstrativo. Determinadas leituras de sensores, telemetrias de radar, nomes de voos, hidrômetros e cenários de alerta podem conter dados fictícios ou matematicamente simulados para fins de treinamento, modelagem, prova de conceito e demonstração técnica.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h4 className="font-bold text-white text-sm">2. Uso por Autoridades e Cidadãos</h4>
                  <p>
                    O acesso ao SIMA é livre e gratuito sob a Licença MIT. O sistema integra modelos computacionais, dados de telemetria simulada e recursos de Inteligência Artificial para gerar planos de contingência (PLANCON), diagnósticos de radares orbitais (SIMA-SAT 1) e recomendações táticas.
                  </p>
                  <p className="text-slate-400 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <strong className="text-amber-300">Aviso Institucional de Segurança:</strong> Os relatórios e sugestões gerados pela plataforma devem ser utilizados como instrumento auxiliar técnico. Em situações de emergência civil real, as orientações oficiais da Defesa Civil Nacional (Secretaria Nacional de Proteção e Defesa Civil - SEDEC), CEMADEN, DECEA/FAB e DNIT prevalecem como protocolos mandatórios.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h4 className="font-bold text-white text-sm">3. Responsabilidades do Usuário</h4>
                  <p>Ao utilizar o sistema, o usuário concorda em:</p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-400">
                    <li>Não utilizar a plataforma para disseminação de alarmismos falsos ou relatórios adulterados;</li>
                    <li>Utilizar a ferramenta de geração de PLANCON com base em parâmetros técnicos verossímeis;</li>
                    <li>Respeitar os direitos autorais e a atribuição do desenvolvedor conforme estipulado na Licença MIT.</li>
                  </ul>
                </section>

                <section className="space-y-1.5">
                  <h4 className="font-bold text-white text-sm">4. Isenção e Limitação de Responsabilidade</h4>
                  <p>
                    O software é disponibilizado "no estado em que se encontra", sem garantias implícitas ou expressas de infalibilidade preditiva frente a eventos climáticos catastróficos imprevisíveis.
                  </p>
                </section>
              </div>
            </div>
          )}

          {/* TAB 2: PRIVACIDADE & LGPD */}
          {activeTab === 'privacy' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Lock className="w-4 h-4" />
                  Política de Privacidade e Proteção de Dados
                </div>
                <h3 className="text-base font-bold text-white">
                  Conformidade Integral com a LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/2018)
                </h3>
                <p className="text-xs text-slate-400">
                  Transparência, Segurança da Informação e Privacidade por Design
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <section className="space-y-1.5">
                  <h4 className="font-bold text-white text-sm">1. Coleta e Tratamento Mínimo de Dados</h4>
                  <p>
                    O SIMA adota o princípio da <strong>minimização de dados</strong>. A plataforma não exige cadastro com CPF, cartão de crédito ou dados sensíveis para navegação pública e simulação operacional.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h4 className="font-bold text-white text-sm">2. Armazenamento Local (Cookies & LocalStorage)</h4>
                  <p>
                    Utilizamos armazenamento local exclusivamente no dispositivo do usuário (via LocalStorage do navegador) para salvar:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-400">
                    <li>Confirmação da verificação de idade e consentimento com os termos;</li>
                    <li>Preferências de filtros regionais, tema e histórico da sessão de simulação;</li>
                    <li>Nenhum cookie de rastreamento publicitário ou telemetria invasiva de terceiros é utilizado.</li>
                  </ul>
                </section>

                <section className="space-y-1.5">
                  <h4 className="font-bold text-white text-sm">3. Tratamento de Requisições com Inteligência Artificial</h4>
                  <p>
                    As requisições ao Consultor Tático (Advisor IA) e ao Gerador de PLANCON são processadas de forma segura em rotas de backend (server-side proxy), sem repasse de informações de identificação pessoal do usuário a modelos de linguagem.
                  </p>
                </section>

                <section className="space-y-1.5">
                  <h4 className="font-bold text-white text-sm">4. Direitos dos Titulares de Dados</h4>
                  <p>
                    O usuário pode, a qualquer momento, limpar o armazenamento local do navegador para revogar as preferências salvas e redefinir o estado do sistema.
                  </p>
                </section>
              </div>
            </div>
          )}

          {/* TAB 3: VERIFICAÇÃO DE IDADE */}
          {activeTab === 'age' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4" />
                  Declaração e Verificação de Maioridade / Autorização
                </div>
                <h3 className="text-base font-bold text-white">
                  Acesso Responsável a Sistemas de Contingência e Alertas Climáticos
                </h3>
                <p className="text-xs text-slate-400">
                  Em conformidade com as diretrizes de proteção digital e uso ético de IA
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Status da Sua Verificação:</span>
                  {isAgeVerified ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Idade Confirmada (18+ anos)
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      Pendente de Confirmação
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed">
                  Para acessar e operar simulações táticas de desastres naturais, alertas e geração de planos de contingência, o usuário declara ter 18 (dezoito) anos ou mais, ou estar devidamente acompanhado por responsável legal, educador ou supervisor institucional.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      onConfirmAge();
                    }}
                    className={`py-3 px-5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      isAgeVerified
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30 hover:bg-slate-750'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-950/50'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isAgeVerified ? 'Idade Verificada com Sucesso' : 'Confirmo que tenho 18 anos ou mais'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LICENÇA MIT BILINGUE */}
          {activeTab === 'license' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Scale className="w-4 h-4" />
                    Licença de Código Aberto
                  </div>
                  <h3 className="text-base font-bold text-white">
                    MIT License (Versão Original em Inglês e Tradução PT-BR)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Copyright (c) 2026 Micael Nildo Oliveira Souza
                  </p>
                </div>

                {/* Language Switcher */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setLicenseLang('pt')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      licenseLang === 'pt'
                        ? 'bg-cyan-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Português (Brasil)
                  </button>
                  <button
                    onClick={() => setLicenseLang('en')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      licenseLang === 'en'
                        ? 'bg-cyan-600 text-white shadow'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    English (Original)
                  </button>
                </div>
              </div>

              {/* License Code Box */}
              <div className="relative">
                <div className="absolute top-3 right-3 z-10">
                  <button
                    onClick={() => handleCopyLicense(licenseLang === 'en' ? mitLicenseEn : mitLicensePt)}
                    className="px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 border border-slate-700 shadow-md backdrop-blur-sm transition-all"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copiar Licença</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-300 font-mono text-[11px] sm:text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed shadow-inner">
                  {licenseLang === 'en' ? mitLicenseEn : mitLicensePt}
                </pre>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>
                  A Licença MIT confere total liberdade para uso, modificação, distribuição e integração comercial ou acadêmica, com manutenção dos avisos de direitos autorais.
                </span>
              </div>
            </div>
          )}

          {/* TAB 5: DESENVOLVEDOR & IA */}
          {activeTab === 'developer' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-slate-900 border border-cyan-800/50 space-y-2">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Code2 className="w-4 h-4" />
                  Autoria & Engenharia de Software
                </div>
                <h3 className="text-lg font-extrabold text-white">
                  Micael Nildo Oliveira Souza
                </h3>
                <p className="text-xs text-cyan-300 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Desenvolvido com auxílio de Inteligência Artificial
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white flex items-center gap-1.5 text-xs">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    Propósito do Projeto
                  </h4>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Projetado como solução pioneira nacional para mitigar os gargalos críticos desencadeados pelo fenômeno El Niño no Brasil: inundações em aeródromos do Sul, deslizamentos catastróficos em moradias na Serra do Mar e Nordeste, e secas severas que paralisam o transporte hidroviário na Amazônia.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="font-bold text-white flex items-center gap-1.5 text-xs">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    Integração de Inteligência Artificial
                  </h4>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    Modelos avançados de IA (Gemini 3.7 Flash) atuam no apoio à geração tática de planos de contingência, processamento analítico de radar InSAR do satélite SIMA-SAT 1 e consultor inteligente para engenheiros, pilotos e equipes de Defesa Civil.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-3">
                <div className="font-bold text-white flex items-center justify-between">
                  <span>Ficha Técnica & Contato:</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Canal Oficial
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] text-slate-400">
                  <div><strong>Autor:</strong> Micael Nildo O. Souza</div>
                  <div><strong>Licença:</strong> MIT License (2026)</div>
                  <div><strong>Satélite:</strong> SIMA-SAT 1 (SAR)</div>
                  <div><strong>Status:</strong> Protótipo Demonstrativo</div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">E-mail para Contato & Parcerias</div>
                      <a 
                        href={`mailto:${contactEmail}`} 
                        className="text-white font-bold hover:text-emerald-400 transition-colors"
                      >
                        {contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700 transition-colors w-full sm:w-auto"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copiar E-mail</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${contactEmail}?subject=Contato%20-%20SIMA%20El%20Niño%20Brasil`}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm w-full sm:w-auto"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Enviar Mensagem</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: CONTATO, DÚVIDAS & PARCERIAS */}
          {activeTab === 'contact' && (
            <div className="space-y-5">
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-800/50 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  Canal Direto de Comunicação
                </div>
                <h3 className="text-lg font-extrabold text-white">
                  Contato, Perguntas, Dúvidas & Parcerias
                </h3>
                <p className="text-xs text-slate-300">
                  Espaço oficial para contato direto com o desenvolvedor <strong>Micael Nildo Oliveira Souza</strong> para envio de dúvidas técnicas, propostas de parcerias e sugestões de evolução do sistema.
                </p>
              </div>

              {/* Main Email Box */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4 shadow-lg shadow-emerald-950/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                        E-mail Oficial de Contato
                      </div>
                      <a 
                        href={`mailto:${contactEmail}`} 
                        className="text-base sm:text-lg font-black text-white hover:text-emerald-300 transition-colors font-mono"
                      >
                        {contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyEmail}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-all active:scale-95"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-300">E-mail Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-400" />
                          <span>Copiar E-mail</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${contactEmail}`}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-950/50 active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      <span>Abrir no seu E-mail</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {/* Pillar 1: Questions */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-white text-xs">
                      Perguntas & Dúvidas Técnicas
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Envie questionamentos sobre os algoritmos de contingência, telemetrias simuladas do satélite SIMA-SAT 1, parâmetros hidráulicos ou regras de alerta.
                    </p>
                  </div>
                  <a
                    href={`mailto:${contactEmail}?subject=Dúvida%20Técnica%20-%20SIMA%20El%20Niño&body=Olá%20Micael,%0D%0A%0D%0AGostaria%20de%20tirar%20uma%20dúvida%20a%20respeito%20da%20plataforma%20SIMA:%0D%0A`}
                    className="mt-3 text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                  >
                    <span>Enviar Dúvida Técnica</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Pillar 2: Partnerships */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                      <Handshake className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-white text-xs">
                      Parcerias & Cooperação
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Propostas de cooperação institucional com órgãos governamentais (Defesa Civil, CEMADEN, DNIT, DECEA), concessionárias de transporte e universidades.
                    </p>
                  </div>
                  <a
                    href={`mailto:${contactEmail}?subject=Proposta%20de%20Parceria%20-%20SIMA%20El%20Niño&body=Olá%20Micael,%0D%0A%0D%0AGostaríamos%20de%20apresentar%20uma%20proposta%20de%20parceria/cooperação%20com%20o%20SIMA:%0D%0A`}
                    className="mt-3 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <span>Propor Parceria</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Pillar 3: Feedback & Suggestions */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-white text-xs">
                      Sugestões & Melhorias
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Contribuições de engenheiros, pilotos, meteorologistas e pesquisadores para aperfeiçoar os módulos de mitigação e visualização.
                    </p>
                  </div>
                  <a
                    href={`mailto:${contactEmail}?subject=Sugestão%20de%20Melhoria%20-%20SIMA%20El%20Niño&body=Olá%20Micael,%0D%0A%0D%0ATenho%20uma%20sugestão%20de%20melhoria%20para%20o%20sistema:%0D%0A`}
                    className="mt-3 text-[11px] font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
                  >
                    <span>Enviar Sugestão</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>
                  Todas as mensagens recebidas em <strong>{contactEmail}</strong> são respondidas com brevidade técnica pelo desenvolvedor do projeto.
                </span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="text-slate-400 flex flex-wrap items-center gap-2">
            <span>Desenvolvedor: <strong className="text-slate-200 font-semibold">Micael Nildo Oliveira Souza</strong></span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-cyan-400 hidden sm:inline font-medium">Com auxílio de IA</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <a 
              href={`mailto:${contactEmail}`} 
              className="text-emerald-400 hover:underline font-semibold flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{contactEmail}</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('contact')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-emerald-300 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contato</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-md shadow-emerald-950/40"
            >
              Entendido & Fechar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
