import { jsPDF } from 'jspdf';

export interface AviationReportData {
  code: string;
  name: string;
  threat: string;
  runwayStatus: string;
  windshearRisk: string;
  waterFilmRisk: string;
  contingencyHub: string;
  activeDikesCapacity: string;
  fuelReserveMargin: string;
}

export interface HousingReportData {
  id: string;
  name: string;
  threat: string;
  familiesAtRisk: number;
  currentRain72h: string;
  slopeStatus: string;
  sirensTested: string;
  shelterCapacity: string;
}

export interface TransportReportData {
  id: string;
  name: string;
  mode: string;
  threat: string;
  status: string;
  criticalKm: string;
  activeDredges: string;
  alternativeRoute: string;
  flowImpact: string;
}

export function generateAviationPDFReport(data: AviationReportData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let y = 14;

  // Header Banner Background
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 32, 'F');

  // Accent Line
  doc.setFillColor(2, 132, 199); // sky-600
  doc.rect(0, 32, pageWidth, 2, 'F');

  // Title in Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('SIMA EL NIÑO BRASIL — RELATÓRIO TÉCNICO SETORIAL', margin, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(186, 230, 253); // sky-200
  doc.text('MÓDULO: AVIAÇÃO CIVIL & AERÓDROMOS CRÍTICOS | ANAC • DECEA • REDEMET', margin, 20);

  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // slate-400
  const emissionDate = new Date().toLocaleString('pt-BR');
  doc.text(`Emissão: ${emissionDate} | Satélite: SIMA-SAT 1 (Órbita 1.420) | Doc ID: SIMA-AV-${data.code}-${Date.now().toString().slice(-6)}`, margin, 26);

  y = 42;

  // Notice Banner: Ambiente Demonstrativo
  doc.setFillColor(254, 243, 199); // amber-100
  doc.setDrawColor(217, 119, 6); // amber-600
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 10, 2, 2, 'FD');
  
  doc.setTextColor(146, 64, 14); // amber-900
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('AVISO DE AMBIENTE DEMONSTRATIVO:', margin + 4, y + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Dados técnicos, telemetrias e planos modelados para treinamento, engenharia e simulação tática.', margin + 4, y + 8);

  y += 15;

  // Sítio Aeroportuário Target
  doc.setFillColor(241, 245, 249); // slate-100
  doc.setDrawColor(203, 213, 225); // slate-300
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 22, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`AERÓDROMO SELECIONADO: ${data.name} (${data.code})`, margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const threatLines = doc.splitTextToSize(`Ameaça Principal do El Niño: ${data.threat}`, pageWidth - (margin * 2) - 8);
  doc.text(threatLines, margin + 4, y + 12);

  y += 28;

  // Grid de Parâmetros Técnicos
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('PARÂMETROS TÉCNICOS & TELEMETRIA DE PISTA', margin, y);
  y += 4;

  const colWidth = (pageWidth - (margin * 2) - 6) / 2;
  const cardHeight = 16;

  // Card 1: Status da Pista
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, colWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('STATUS OPERACIONAL DA PISTA', margin + 3, y + 5);
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(doc.splitTextToSize(data.runwayStatus, colWidth - 6), margin + 3, y + 10);

  // Card 2: Lâmina d'água / Aquaplanagem
  doc.roundedRect(margin + colWidth + 6, y, colWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('LÂMINA D\'ÁGUA & COND. DE GROOVING', margin + colWidth + 9, y + 5);
  doc.setFontSize(8.5);
  doc.setTextColor(2, 132, 199);
  doc.text(data.waterFilmRisk, margin + colWidth + 9, y + 11);

  y += cardHeight + 4;

  // Card 3: Windshear
  doc.roundedRect(margin, y, colWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('RISCO DE WINDSHEAR (TESOURA DE VENTO)', margin + 3, y + 5);
  doc.setFontSize(8.5);
  doc.setTextColor(217, 119, 6);
  doc.text(data.windshearRisk, margin + 3, y + 11);

  // Card 4: Margem de Combustível
  doc.roundedRect(margin + colWidth + 6, y, colWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('RESERVA DE COMBUSTÍVEL RECOMENDADA', margin + colWidth + 9, y + 5);
  doc.setFontSize(8.5);
  doc.setTextColor(16, 185, 129);
  doc.text(data.fuelReserveMargin, margin + colWidth + 9, y + 11);

  y += cardHeight + 4;

  // Card 5: Hubs Alternantes & Bombas
  doc.roundedRect(margin, y, pageWidth - (margin * 2), cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('HUBS ALTERNANTES HOMOLOGADOS & CAPACIDADE DE DRENAGEM/DIQUES', margin + 3, y + 5);
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`Hubs: ${data.contingencyHub} | Drenagem: ${data.activeDikesCapacity}`, margin + 3, y + 11);

  y += cardHeight + 8;

  // Matriz de Ações Recomendadas
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('PROTOCOLO TÁTICO DE MITIGAÇÃO & PLANO DE AÇÃO', margin, y);
  y += 4;

  const actions = [
    {
      phase: 'Fase 1: Prevenção & Alerta Precoce (D-15 a D-3)',
      desc: 'Inspeção de canais de drenagem por gravidade, checagem dos geradores de emergência das bombas e calibragem de sensores LLWAS/Radar Doppler.',
    },
    {
      phase: 'Fase 2: Resposta Ativa & Operação em Chuva Extrema (D-0 a D+2)',
      desc: 'Acionamento de diques móveis, emissão de NOTAMs de lâmina d\'água, exigência de reserva de combustível ampliada e pré-coordenação de slots com hubs alternantes.',
    },
    {
      phase: 'Fase 3: Desobstrução & Retomada Resiliente (D+3 em diante)',
      desc: 'Lavagem técnica da pista para remoção de resíduos e verificação de atrito/microtextura com grip tester segundo padrões RBAC 153.',
    },
  ];

  actions.forEach((act) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, pageWidth - (margin * 2), 16, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(2, 132, 199);
    doc.text(act.phase, margin + 3, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    const descLines = doc.splitTextToSize(act.desc, pageWidth - (margin * 2) - 6);
    doc.text(descLines, margin + 3, y + 9.5);

    y += 19;
  });

  // Footer
  const footerY = pageHeight - 16;
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('© 2026 Micael Nildo Oliveira Souza. Licenciado sob os termos da Licença de Código Aberto MIT.', margin, footerY + 5);
  doc.text('SIMA El Niño Brasil — Sistema Integrado de Mitigação, Alerta Antecipado e Resiliência Climática.', margin, footerY + 9);
  doc.text('Página 1 de 1', pageWidth - margin - 18, footerY + 7);

  doc.save(`SIMA_Relatorio_Aviacao_${data.code}_2026.pdf`);
}

export function generateHousingPDFReport(data: HousingReportData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let y = 14;

  // Header Banner Background
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 32, 'F');

  // Accent Line
  doc.setFillColor(217, 119, 6); // amber-600
  doc.rect(0, 32, pageWidth, 2, 'F');

  // Title in Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('SIMA EL NIÑO BRASIL — RELATÓRIO TÉCNICO SETORIAL', margin, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(254, 215, 170); // amber-200
  doc.text('MÓDULO: MORADIAS EM ENCOSTAS & DEFESA CIVIL | CEMADEN • CPRM • DEFESA CIVIL', margin, 20);

  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  const emissionDate = new Date().toLocaleString('pt-BR');
  doc.text(`Emissão: ${emissionDate} | Satélite: SIMA-SAT 1 (InSAR Deformação) | Doc ID: SIMA-HAB-${data.id.toUpperCase()}-${Date.now().toString().slice(-6)}`, margin, 26);

  y = 42;

  // Notice Banner: Ambiente Demonstrativo
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(217, 119, 6);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 10, 2, 2, 'FD');
  
  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('AVISO DE AMBIENTE DEMONSTRATIVO:', margin + 4, y + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Dados técnicos, telemetrias e planos modelados para treinamento, engenharia e simulação tática.', margin + 4, y + 8);

  y += 15;

  // Setor Geológico Target
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 22, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`SETOR VULNERÁVEL MONITORADO: ${data.name}`, margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const threatLines = doc.splitTextToSize(`Dinâmica de Risco Geotécnico / Hidrológico: ${data.threat}`, pageWidth - (margin * 2) - 8);
  doc.text(threatLines, margin + 4, y + 12);

  y += 28;

  // Grid de Parâmetros Técnicos
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('PARÂMETROS GEOTÉCNICOS & CAPACIDADE DE RESPOSTA', margin, y);
  y += 4;

  const colWidth = (pageWidth - (margin * 2) - 6) / 2;
  const cardHeight = 16;

  // Card 1: Grau de Risco
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, colWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('CLASSIFICAÇÃO DO RISCO DE ENCOSTA', margin + 3, y + 5);
  doc.setFontSize(8.5);
  doc.setTextColor(220, 38, 38);
  doc.text(data.slopeStatus, margin + 3, y + 11);

  // Card 2: Chuva Acumulada 72h
  doc.roundedRect(margin + colWidth + 6, y, colWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('PRECIPITAÇÃO ACUMULADA 72H (CEMADEN)', margin + colWidth + 9, y + 5);
  doc.setFontSize(8.5);
  doc.setTextColor(217, 119, 6);
  doc.text(data.currentRain72h, margin + colWidth + 9, y + 11);

  y += cardHeight + 4;

  // Card 3: População Afetada
  doc.roundedRect(margin, y, colWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('FAMÍLIAS EM ÁREA DE RISCO R3 / R4', margin + 3, y + 5);
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`${data.familiesAtRisk.toLocaleString('pt-BR')} famílias mapeadas`, margin + 3, y + 11);

  // Card 4: Sirenes e Disparos
  doc.roundedRect(margin + colWidth + 6, y, colWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('SISTEMA DE ALERTA & SIRENES', margin + colWidth + 9, y + 5);
  doc.setFontSize(8.5);
  doc.setTextColor(16, 185, 129);
  doc.text(data.sirensTested, margin + colWidth + 9, y + 11);

  y += cardHeight + 4;

  // Card 5: Abrigos
  doc.roundedRect(margin, y, pageWidth - (margin * 2), cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('REDE DE ABRIGOS TEMPORÁRIOS & PONTOS DE ENCONTRO', margin + 3, y + 5);
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(data.shelterCapacity, margin + 3, y + 11);

  y += cardHeight + 8;

  // Matriz de Ações de Bioengenharia & Defesa Civil
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('MEDIDAS DE BIOENGENHARIA & PROTOCOLOS DE EVACUAÇÃO PREVENTIVA', margin, y);
  y += 4;

  const actions = [
    {
      phase: 'Medida 1: Estabilização de Taludes com Bioengenharia e Drenagem Profunda',
      desc: 'Plantio de Capim Vetiver em curvas de nível, instalação de Drenos Sub-horizontais Profundos (DHPs) e aplicação de biomantas anti-erosivas.',
    },
    {
      phase: 'Medida 2: Acionamento de Evacuação Antecipada via Cell Broadcast',
      desc: 'Disparo de sinal sonoro e pop-up nos celulares da população local ao atingir limiar de saturação (>85%), orientando deslocamento seguro para os abrigos.',
    },
    {
      phase: 'Medida 3: Monitoramento Contínuo com Radar InSAR e NUDECs',
      desc: 'Detecção milimétrica de recalques por interferometria de satélite e rondas de campo dos Núcleos Comunitários de Defesa Civil para checar degraus de abatimento.',
    },
  ];

  actions.forEach((act) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, pageWidth - (margin * 2), 16, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(217, 119, 6);
    doc.text(act.phase, margin + 3, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    const descLines = doc.splitTextToSize(act.desc, pageWidth - (margin * 2) - 6);
    doc.text(descLines, margin + 3, y + 9.5);

    y += 19;
  });

  // Footer
  const footerY = pageHeight - 16;
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('© 2026 Micael Nildo Oliveira Souza. Licenciado sob os termos da Licença de Código Aberto MIT.', margin, footerY + 5);
  doc.text('SIMA El Niño Brasil — Sistema Integrado de Mitigação, Alerta Antecipado e Resiliência Climática.', margin, footerY + 9);
  doc.text('Página 1 de 1', pageWidth - margin - 18, footerY + 7);

  doc.save(`SIMA_Relatorio_Moradias_${data.id}_2026.pdf`);
}

export function generateTransportPDFReport(data: TransportReportData) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  let y = 14;

  // Header Banner Background
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 32, 'F');

  // Accent Line
  doc.setFillColor(16, 185, 129); // emerald-500
  doc.rect(0, 32, pageWidth, 2, 'F');

  // Title in Header
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text('SIMA EL NIÑO BRASIL — RELATÓRIO TÉCNICO SETORIAL', margin, 14);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(167, 243, 208); // emerald-200
  doc.text('MÓDULO: CORREDORES DE TRANSPORTE, RODOVIAS & HIDROVIAS | DNIT • ANTT • MARINHA', margin, 20);

  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  const emissionDate = new Date().toLocaleString('pt-BR');
  doc.text(`Emissão: ${emissionDate} | Satélite: SIMA-SAT 1 (Altimetria & Calado) | Doc ID: SIMA-LOG-${data.id.toUpperCase()}-${Date.now().toString().slice(-6)}`, margin, 26);

  y = 42;

  // Notice Banner: Ambiente Demonstrativo
  doc.setFillColor(254, 243, 199);
  doc.setDrawColor(217, 119, 6);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 10, 2, 2, 'FD');
  
  doc.setTextColor(146, 64, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('AVISO DE AMBIENTE DEMONSTRATIVO:', margin + 4, y + 4.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Dados técnicos, telemetrias e planos modelados para treinamento, engenharia e simulação tática.', margin + 4, y + 8);

  y += 15;

  // Corredor Logístico Target
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, y, pageWidth - (margin * 2), 22, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`EIXO LOGÍSTICO MONITORADO: ${data.name}`, margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  const threatLines = doc.splitTextToSize(`Modo: ${data.mode} | Ameaça Climática: ${data.threat}`, pageWidth - (margin * 2) - 8);
  doc.text(threatLines, margin + 4, y + 12);

  y += 28;

  // Grid de Parâmetros Técnicos
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('PARÂMETROS LOGÍSTICOS & FLUXO DE CARGAS', margin, y);
  y += 4;

  const colWidth = (pageWidth - (margin * 2) - 6) / 2;
  const cardHeight = 16;

  // Card 1: Status de Tráfego
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, colWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('STATUS DO CORREDOR LOGÍSTICO', margin + 3, y + 5);
  doc.setFontSize(8.5);
  doc.setTextColor(220, 38, 38);
  doc.text(data.status, margin + 3, y + 11);

  // Card 2: Extensão Crítica
  doc.roundedRect(margin + colWidth + 6, y, colWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('TRECHO / EXTENSÃO CRÍTICA MONITORADA', margin + colWidth + 9, y + 5);
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(data.criticalKm, margin + colWidth + 9, y + 11);

  y += cardHeight + 4;

  // Card 3: Medidas Ativas
  doc.roundedRect(margin, y, colWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('DRAGAGEM / ENGENHARIA DE CONTENÇÃO', margin + 3, y + 5);
  doc.setFontSize(8);
  doc.setTextColor(16, 185, 129);
  doc.text(doc.splitTextToSize(data.activeDredges, colWidth - 6), margin + 3, y + 9.5);

  // Card 4: Volume de Cargas em Risco
  doc.roundedRect(margin + colWidth + 6, y, colWidth, cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('VOLUME / IMPACTO NO ESCOAMENTO', margin + colWidth + 9, y + 5);
  doc.setFontSize(8);
  doc.setTextColor(217, 119, 6);
  doc.text(doc.splitTextToSize(data.flowImpact, colWidth - 6), margin + colWidth + 9, y + 9.5);

  y += cardHeight + 4;

  // Card 5: Rotas de Contingência
  doc.roundedRect(margin, y, pageWidth - (margin * 2), cardHeight, 1.5, 1.5, 'FD');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('ROTA ALTERNATIVA & DESVIOS INTERMODAIS HOMOLOGADOS', margin + 3, y + 5);
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(data.alternativeRoute, margin + 3, y + 11);

  y += cardHeight + 8;

  // Matriz de Ações de Mitigação Logística
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('PLANO DE AÇÃO LOGÍSTICA & RESILIÊNCIA INTERMODAL', margin, y);
  y += 4;

  const actions = [
    {
      phase: 'Medida 1: Dragagem Preventiva em Passos Críticos & Batimetria Multifeixe',
      desc: 'Mobilização de dragas de sucção antes do pico da vazante para desobstrução de bancos de areia e garantia de calado mínimo de navegação.',
    },
    {
      phase: 'Medida 2: Monitoramento Telemétrico de Taludes e Pilares de Pontes',
      desc: 'Instalação de inclinômetros IoT em taludes de corte/aterro e sensores de solapamento (scour sensors) nos pilares de pontes sob vazão extrema.',
    },
    {
      phase: 'Medida 3: Ativação Imediata de Transbordo Intermodal e Cabotagem',
      desc: 'Redirecionamento antecipado de cargas para rodovias alternativas, terminais de transbordo e cabotagem marítima para evitar colapso de cadeias produtivas.',
    },
  ];

  actions.forEach((act) => {
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(margin, y, pageWidth - (margin * 2), 16, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(16, 185, 129);
    doc.text(act.phase, margin + 3, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    const descLines = doc.splitTextToSize(act.desc, pageWidth - (margin * 2) - 6);
    doc.text(descLines, margin + 3, y + 9.5);

    y += 19;
  });

  // Footer
  const footerY = pageHeight - 16;
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, footerY, pageWidth - margin, footerY);

  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.setFont('helvetica', 'normal');
  doc.text('© 2026 Micael Nildo Oliveira Souza. Licenciado sob os termos da Licença de Código Aberto MIT.', margin, footerY + 5);
  doc.text('SIMA El Niño Brasil — Sistema Integrado de Mitigação, Alerta Antecipado e Resiliência Climática.', margin, footerY + 9);
  doc.text('Página 1 de 1', pageWidth - margin - 18, footerY + 7);

  doc.save(`SIMA_Relatorio_Transporte_${data.id}_2026.pdf`);
}
