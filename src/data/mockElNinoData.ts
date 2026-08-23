import { 
  Hotspot, 
  RegionInfo, 
  AlertItem, 
  PreventionMeasure, 
  SatelliteTelemetry, 
  SatelliteObservation, 
  SatellitePass 
} from '../types';

export const REGIONS_DATA: Record<string, RegionInfo> = {
  sul: {
    id: 'sul',
    name: 'Região Sul (RS, SC, PR)',
    elNinoPattern: 'Chuva excessiva, bloqueios atmosféricos persistentes e tempestades severas de granizo/vento.',
    mainThreats: [
      'Cheias históricas de bacias hidrográficas (Guaíba, Taquari, Uruguai, Itajaí)',
      'Alagamento de aeroportos de várzea e infraestruturas logísticas críticas',
      'Desmoronamento de encostas e cabeceiras de pontes rodoviárias e ferroviárias'
    ],
    vulnerabilityIndex: 92,
    activeHotspotsCount: 4,
    aviationStatus: {
      status: 'critico',
      impactSummary: 'Risco extremo de alagamento de pistas em SBPA (Porto Alegre) e turbulência severa na FIR Curitiba.',
      monitoredAirports: 18,
      delayProbability: 48,
    },
    housingStatus: {
      status: 'critico',
      impactSummary: 'Mais de 145.000 moradias em áreas de cota de inundação e encostas saturadas no RS e SC.',
      slopesMonitored: 340,
      familiesInRiskZones: 62000,
    },
    transportStatus: {
      status: 'critico',
      impactSummary: 'Interrupção recorrente da BR-116, BR-290 e BR-101 por quedas de barreira e pontes submersas.',
      criticalHighwaysKm: 1420,
    },
  },
  sudeste: {
    id: 'sudeste',
    name: 'Região Sudeste (SP, RJ, MG, ES)',
    elNinoPattern: 'Ondas de calor extremo seguidas por tempestades convectivas violentas e microbursts.',
    mainThreats: [
      'Deslizamentos em encostas urbanas densamente povoadas (Serra do Mar, Petrópolis, morros de SP/RJ)',
      'Microbursts e windshear durante aproximação e pouso nos aeroportos mais movimentados da América Latina',
      'Alagamentos expressos em vias arteriais (Marginais Tietê/Pinheiros, Linha Vermelha)'
    ],
    vulnerabilityIndex: 78,
    activeHotspotsCount: 4,
    aviationStatus: {
      status: 'alto',
      impactSummary: 'Alta incidência de tesoura de vento (windshear) e granizo na TMA-SP e TMA-RJ.',
      monitoredAirports: 24,
      delayProbability: 35,
    },
    housingStatus: {
      status: 'alto',
      impactSummary: 'Áreas de encosta R3/R4 sob risco de deslizamentos com acumulados > 80mm em 24h.',
      slopesMonitored: 890,
      familiesInRiskZones: 110000,
    },
    transportStatus: {
      status: 'moderado',
      impactSummary: 'Risco de bloqueios na Serra das Araras (Dutra) e Serra de Santos (Anchieta/Imigrantes).',
      criticalHighwaysKm: 850,
    },
  },
  norte: {
    id: 'norte',
    name: 'Região Norte (AM, PA, RO, AC, RR, AP, TO)',
    elNinoPattern: 'Seca extrema histórica (super vazante dos rios) e proliferação massiva de queimadas com fumaça densa.',
    mainThreats: [
      'Paralisação da navegação hidroviária (balsas de combustíveis, insumos e alimentos)',
      'Fechamento prolongado de aeroportos por fumaça (visibilidade inferior ao teto mínimo IFR)',
      'Isolamento e estresse hídrico/sanitário em comunidades ribeirinhas e palafitas'
    ],
    vulnerabilityIndex: 88,
    activeHotspotsCount: 3,
    aviationStatus: {
      status: 'alto',
      impactSummary: 'Operações suspensas por fumaça em Manaus (SBEG), Porto Velho (SBPV) e Rio Branco (SBRB).',
      monitoredAirports: 14,
      delayProbability: 42,
    },
    housingStatus: {
      status: 'alto',
      impactSummary: 'Comunidades ribeirinhas isoladas em leitos secos, risco de incêndios periurbanos em palafitas.',
      slopesMonitored: 95,
      familiesInRiskZones: 48000,
    },
    transportStatus: {
      status: 'critico',
      impactSummary: 'Calado dos rios Madeira e Solimões abaixo de 2,2 metros, inviabilizando comboios comerciais.',
      criticalHighwaysKm: 2100,
      riverDroughtLevel: 'Vazante Histórica Crítica (-8.4m em relação à média)',
    },
  },
  nordeste: {
    id: 'nordeste',
    name: 'Região Nordeste (BA, PE, CE, MA, PB, RN, PI, AL, SE)',
    elNinoPattern: 'Seca severa e prolongada no Semiárido; anomalias de precipitação extrema pontual no litoral leste.',
    mainThreats: [
      'Colapso hídrico em moradias e assentamentos do Polígono das Secas',
      'Deslizamentos pontuais em morros urbanos da faixa costeira (Recife, Salvador)',
      'Turbulência térmica severa em rotas aéreas continentais'
    ],
    vulnerabilityIndex: 72,
    activeHotspotsCount: 2,
    aviationStatus: {
      status: 'moderado',
      impactSummary: 'Turbulência em ar claro (CAT) e ventos terrais com poeira no interior.',
      monitoredAirports: 16,
      delayProbability: 18,
    },
    housingStatus: {
      status: 'alto',
      impactSummary: 'Escassez hídrica extrema em 1.200 municípios do semiárido e risco geotécnico em barreiras costeiras.',
      slopesMonitored: 410,
      familiesInRiskZones: 85000,
    },
    transportStatus: {
      status: 'moderado',
      impactSummary: 'Trechos rodoviários com trincas térmicas no asfalto e baixa navegabilidade no Rio São Francisco.',
      criticalHighwaysKm: 620,
    },
  },
  centro_oeste: {
    id: 'centro_oeste',
    name: 'Região Centro-Oeste (MT, MS, GO, DF)',
    elNinoPattern: 'Ondas de calor sufocantes, tempestades de poeira (haboobs) e atraso na estação chuvosa agrícola.',
    mainThreats: [
      'Tempestades de poeira e fumaça com perda repentina de visibilidade em pistas e rodovias',
      'Impacto na logística de escoamento de grãos por rodovias e hidrovias (Paraguai-Paraná)',
      'Superaquecimento urbano em moradias sem isolamento térmico'
    ],
    vulnerabilityIndex: 65,
    activeHotspotsCount: 2,
    aviationStatus: {
      status: 'moderado',
      impactSummary: 'Densidade do ar baixa por altas temperaturas exigindo restrição de peso em decolagens (MT/GO).',
      monitoredAirports: 12,
      delayProbability: 22,
    },
    housingStatus: {
      status: 'moderado',
      impactSummary: 'Estresse térmico extremo (>41°C) exigindo planos municipais de hidratação e abrigos climatizados.',
      slopesMonitored: 45,
      familiesInRiskZones: 19000,
    },
    transportStatus: {
      status: 'alto',
      impactSummary: 'Restrição de calado na hidrovia Paraguai-Paraná (Corumbá) e poeira na BR-163.',
      criticalHighwaysKm: 980,
    },
  },
};

export const HOTSPOTS_DATA: Hotspot[] = [
  {
    id: 'hotspot-sbpa',
    name: 'Aeroporto Internacional Salgado Filho (SBPA)',
    state: 'Rio Grande do Sul (RS)',
    region: 'sul',
    sector: 'aviation',
    lat: -29.9939,
    lng: -51.1711,
    xSvg: 48,
    ySvg: 88,
    riskLevel: 'critico',
    primaryThreat: 'Inundação severa da pista e subestações elétricas pelo transbordamento da Bacia do Guaíba',
    description: 'Ponto focal de resiliência aeroportuária. Requer sistema de diques perimetrais reforçados, drenagem por bombas de sucção anfíbias e plano de contingência com a Base Aérea de Canoas (SBCO).',
    historicalPrecedent: 'Inundação histórica de maio de 2024: 53 dias de fechamento total e R$ 1,2 bi em prejuízos logísticos.',
    activeMeasures: [
      'Diques de contenção perimetrais com cota de crista de 6,00 metros',
      'Elevação dos quadros elétricos de balizamento e geradores para cota +7,50m',
      'Acordo de contingência operacional com SBCO (Canoas) e SBSP (São Paulo) para slots alternantes',
      'Instalação de bombas anfíbias de drenagem de alta vazão (3.000 L/s)'
    ],
    metrics: [
      { label: 'Nível do Guaíba no Cais', value: '4.85 m (Alerta > 3.0m)', trend: 'up', isCritical: true },
      { label: 'Capacidade de Bombeamento', value: '18.500 m³/h', trend: 'stable' },
      { label: 'Alternante Primário', value: 'Base de Canoas (SBCO - 12 km)', trend: 'stable' },
      { label: 'Vôos Diários em Risco', value: '142 voos', trend: 'up', isCritical: true }
    ],
    contingencyHub: 'Base Aérea de Canoas (SBCO) + Aeroporto de Caxias do Sul (SBCX)',
    civilDefenseLevel: 'Alerta Vermelho - Grau 4'
  },
  {
    id: 'hotspot-sbgr-sbsp',
    name: 'Hub TMA São Paulo (Guarulhos SBGR & Congonhas SBSP)',
    state: 'São Paulo (SP)',
    region: 'sudeste',
    sector: 'aviation',
    lat: -23.4356,
    lng: -46.4731,
    xSvg: 62,
    ySvg: 74,
    riskLevel: 'alto',
    primaryThreat: 'Microbursts, tempestades convectivas com granizo e tesoura de vento (windshear)',
    description: 'O espaço aéreo mais denso do Brasil. O El Niño intensifica rajadas descendentes que forçam arremetidas e desvios massivos de voos.',
    historicalPrecedent: 'Tempestades de verão com mais de 60 voos alternados para Viracopos e Confins em uma única tarde.',
    activeMeasures: [
      'Radar Meteorológico Doppler banda X dedicado na aproximação final de Guarulhos e Congonhas',
      'Grooving de alta performance na pista e sensores de lâmina d\'água em tempo real',
      'Matriz dinâmica de redistribuição de tráfego aéreo para Viracopos (SBKP) e Galeão (SBGL)',
      'Protocolo de reabastecimento extra para esperas meteorológicas de até 45 minutos'
    ],
    metrics: [
      { label: 'Índice de Cisalhamento', value: 'Moderado a Alto (18 kt/100ft)', trend: 'up', isCritical: true },
      { label: 'Lâmina d\'Água na Pista', value: '1.2 mm (Seguro < 3.0mm)', trend: 'stable' },
      { label: 'Hub Alternante', value: 'Campinas (SBKP - 85 km)', trend: 'stable' },
      { label: 'Atrasos Estimados', value: '14% da malha diária', trend: 'up' }
    ],
    contingencyHub: 'Aeroporto Internacional de Viracopos (SBKP)',
    civilDefenseLevel: 'Alerta Laranja - Grau 3'
  },
  {
    id: 'hotspot-sbeg',
    name: 'Aeroporto Internacional de Manaus (SBEG Eduardo Gomes)',
    state: 'Amazonas (AM)',
    region: 'norte',
    sector: 'aviation',
    lat: -3.0386,
    lng: -60.0497,
    xSvg: 38,
    ySvg: 32,
    riskLevel: 'alto',
    primaryThreat: 'Fumaça densa de queimadas regionais reduzindo visibilidade para < 600 metros',
    description: 'Durante a estiagem extrema do El Niño, as queimadas na Amazônia cobrem a região metropolitana com fumaça tóxica, suspendendo pousos visuais e limitando operações IFR.',
    historicalPrecedent: 'Outubro de 2023: Manaus teve 4 dias consecutivos com operações suspensas por fumaça.',
    activeMeasures: [
      'Certificação e operação contínua do Sistema ILS Cat II com auxílio de aproximação por satélite RNP AR',
      'Filtros de carvão ativado nos sistemas HVAC de terminais e torres de controle',
      'Monitoramento diário de partículas PM2.5 e aerossóis via satélite Copernicus/INPE',
      'Rotas de contingência cargueira com escala técnica em Boa Vista (SBBV) e Belém (SBBE)'
    ],
    metrics: [
      { label: 'Visibilidade Horizontal', value: '1.400 m (Mínimo ILS Cat II: 350m)', trend: 'down', isCritical: true },
      { label: 'Índice de Material Particulado', value: '168 µg/m³ (Insalubre)', trend: 'up', isCritical: true },
      { label: 'Alternante de Fumaça', value: 'Boa Vista (SBBV - 660 km)', trend: 'stable' },
      { label: 'Cargas Essenciais em Espera', value: '420 toneladas', trend: 'stable' }
    ],
    contingencyHub: 'Aeroporto de Boa Vista (SBBV) + Belém (SBBE)',
    civilDefenseLevel: 'Alerta Laranja - Grau 3'
  },
  {
    id: 'hotspot-taquari',
    name: 'Bacia do Vale do Taquari (Lajeado, Estrela, Muçum, Roca Sales)',
    state: 'Rio Grande do Sul (RS)',
    region: 'sul',
    sector: 'housing',
    lat: -29.4674,
    lng: -51.9634,
    xSvg: 46,
    ySvg: 86,
    riskLevel: 'critico',
    primaryThreat: 'Enxurradas torrenciais com elevação do nível do rio em mais de 1 metro por hora',
    description: 'Área com topografia afunilada onde as chuvas intensas do El Niño geram ondas de cheia devastadoras sobre centros habitacionais urbanos e rurais.',
    historicalPrecedent: 'Setembro de 2023 e Maio de 2024: Destruição massiva de milhares de moradias ribeirinhas.',
    activeMeasures: [
      'Rede de 48 pluviômetros telemétricos e réguas linimétricas automáticas com transmissão por satélite',
      'Sistema integrado de sirenes comunitárias e avisos antecipados Cell Broadcast com 6h de antecedência',
      'Programa de remoção definitiva de moradias das faixas de cota R4 (reassentamento em platôs seguros)',
      'Diques secos e bacias de contenção de amortecimento a montante das cidades'
    ],
    metrics: [
      { label: 'Cota Atual do Rio Taquari', value: '18.4 m (Cota de Inundação: 19.0m)', trend: 'up', isCritical: true },
      { label: 'Moradias em Alerta', value: '12.400 unidades', trend: 'up', isCritical: true },
      { label: 'Famílias Evacuadas Preventivamente', value: '3.850 famílias', trend: 'up' },
      { label: 'Tempo de Antecipação do Alerta', value: '5h 30min', trend: 'stable' }
    ],
    civilDefenseLevel: 'Alerta Vermelho - Grau 4'
  },
  {
    id: 'hotspot-serra-mar',
    name: 'Encostas da Serra do Mar (São Sebastião, Ubatuba, Baixada Santista)',
    state: 'São Paulo (SP)',
    region: 'sudeste',
    sector: 'housing',
    lat: -23.7615,
    lng: -45.4116,
    xSvg: 66,
    ySvg: 76,
    riskLevel: 'critico',
    primaryThreat: 'Deslizamentos catastróficos de detritos e corridas de massa (debris flow)',
    description: 'Encostas com alta declividade onde acumulados superiores a 150mm em 48h causam ruptura da camada de solo sobre a rocha sã, atingindo núcleos habitacionais.',
    historicalPrecedent: 'Fevereiro de 2023: 683mm de chuva em 24h provocaram dezenas de mortes e destruição de vilas na encosta.',
    activeMeasures: [
      'Barreiras dinâmicas suíças contra deslizamento de blocos de rocha e contenções em gabião',
      'Mapeamento tridimensional com LIDAR aerotransportado para identificação de trincas de tração',
      'Gatilho automático de evacuação para moradores de encostas R3/R4 ao atingir 120mm acumulados',
      'Cortinas atirantadas e drenos sub-horizontais profundos (DHP) para alívio da pressão de poros'
    ],
    metrics: [
      { label: 'Acumulado 72h Médio', value: '118 mm (Limiar Crítico: 150mm)', trend: 'up', isCritical: true },
      { label: 'Encostas com Sensores IoT', value: '142 taludes', trend: 'stable' },
      { label: 'Moradias Protegidas por Barreiras', value: '8.900 unidades', trend: 'stable' },
      { label: 'Abrigos de Contingência Prontos', value: '18 centros ativos', trend: 'stable' }
    ],
    civilDefenseLevel: 'Alerta Laranja - Grau 3'
  },
  {
    id: 'hotspot-petropolis',
    name: 'Região Serrana do Rio de Janeiro (Petrópolis, Teresópolis, Nova Friburgo)',
    state: 'Rio de Janeiro (RJ)',
    region: 'sudeste',
    sector: 'housing',
    lat: -22.505,
    lng: -43.1789,
    xSvg: 69,
    ySvg: 73,
    riskLevel: 'alto',
    primaryThreat: 'Deslizamentos em encostas urbanizadas e enxurradas em vales confinados',
    description: 'Áreas urbanas em relevo acidentado sujeitas a chuvas orográficas severas catalisadas pelo calor do El Niño.',
    historicalPrecedent: 'Eventos de 2011 e 2022 com deslizamentos generalizados e perdas humanas e materiais.',
    activeMeasures: [
      'Rede de 32 sirenes georreferenciadas acionadas por inteligência artificial e radar meteorológico',
      'Túnel extravasor de drenagem do Rio Palatinato para evitar alagamento do centro histórico',
      'Reforço estrutural e canaletas de drenagem escalonadas em comunidades de morro',
      'Cadastro biométrico de moradores em áreas de risco para evacuação organizada'
    ],
    metrics: [
      { label: 'Saturação do Solo', value: '78% de umidade', trend: 'up', isCritical: true },
      { label: 'Sirenes em Operação', value: '100% testadas', trend: 'stable' },
      { label: 'Moradias em Zona R4 Mapeada', value: '6.400 residências', trend: 'down' },
      { label: 'Rotas de Fuga Sinalizadas', value: '45 rotas seguras', trend: 'stable' }
    ],
    civilDefenseLevel: 'Alerta Laranja - Grau 3'
  },
  {
    id: 'hotspot-recife-morros',
    name: 'Encostas Urbanas da Região Metropolitana do Recife',
    state: 'Pernambuco (PE)',
    region: 'nordeste',
    sector: 'housing',
    lat: -8.0476,
    lng: -34.877,
    xSvg: 92,
    ySvg: 48,
    riskLevel: 'moderado',
    primaryThreat: 'Deslizamento planar de barreiras habitadas por solos argilosos instáveis',
    description: 'Habitações informais em morros suscetíveis a escorregamentos quando há ocorrência de Ondas de Leste durante eventos climáticos.',
    historicalPrecedent: 'Maio de 2022: Mais de 120 mortes em deslizamentos nas barreiras do Recife e Jaboatão.',
    activeMeasures: [
      'Aplicação de geomembranas e geossintéticos impermeabilizantes nas cristas de barreira',
      'Obras de microdrenagem de águas servidas para evitar infiltração artificial no maciço',
      'Núcleos Comunitários de Defesa Civil (NUDEC) treinados para primeiros socorros e alarme local'
    ],
    metrics: [
      { label: 'Barreiras Protegidas', value: '620 encostas tratadas', trend: 'up' },
      { label: 'Famílias Monitoradas', value: '18.200 famílias', trend: 'stable' },
      { label: 'Acumulado 24h', value: '42 mm (Normal)', trend: 'stable' }
    ],
    civilDefenseLevel: 'Alerta Amarelo - Grau 2'
  },
  {
    id: 'hotspot-rio-madeira',
    name: 'Corredor Hidroviário do Rio Madeira (Porto Velho / Itacoatiara)',
    state: 'Rondônia (RO) & Amazonas (AM)',
    region: 'norte',
    sector: 'transport',
    lat: -8.7619,
    lng: -63.9039,
    xSvg: 29,
    ySvg: 44,
    riskLevel: 'critico',
    primaryThreat: 'Seca extrema paralisando a navegação de comboios de grãos, combustíveis e suprimentos',
    description: 'Principal hidrovia de escoamento de grãos do Norte/Centro-Oeste e abastecimento da Amazônia Ocidental. Na vazante do El Niño, bancos de areia e pedrais impedem a navegação noturna e diurna.',
    historicalPrecedent: 'Vazante de 2023: Nível do rio em Porto Velho atingiu 1,10m, paralisando 100% dos comboios de grande porte.',
    activeMeasures: [
      'Campanha contínua de batimetria multifeixe em tempo real com boias inteligentes telemétricas',
      'Dragagem de manutenção preventiva de 12 passos críticos (pedrais do Marmelo e Curicacas)',
      'Protocolo de fracionamento de comboios (redução de 16 para 6 barcaças por empurrador)',
      'Plano de transbordo intermodal rodoviário emergencial em Humaitá (BR-319)'
    ],
    metrics: [
      { label: 'Cota da Régua em Porto Velho', value: '1.45 m (Nível Crítico < 2.0m)', trend: 'down', isCritical: true },
      { label: 'Calado Máximo Permitido', value: '2.10 m (Normal: 4.50m)', trend: 'down', isCritical: true },
      { label: 'Volume Diário de Carga Retido', value: '45.000 toneladas/dia', trend: 'up', isCritical: true },
      { label: 'Trechos Dragados Concluídos', value: '8 de 12 passos', trend: 'up' }
    ],
    civilDefenseLevel: 'Alerta Vermelho - Grau 4'
  },
  {
    id: 'hotspot-br-116',
    name: 'Eixo Rodoviário Estratégico BR-116 (Trechos Serra das Araras e Sul)',
    state: 'RJ, SP, PR, SC, RS',
    region: 'multi' as any,
    sector: 'transport',
    lat: -24.7,
    lng: -48.8,
    xSvg: 56,
    ySvg: 80,
    riskLevel: 'alto',
    primaryThreat: 'Queda de encostas, solapamento de pistas e colapso de pontes por enxurradas',
    description: 'A espinha dorsal do transporte de cargas do Brasil. Durante o El Niño, interrupções por deslizamentos provocam desabastecimento em cadeias farmacêuticas e alimentares.',
    historicalPrecedent: 'Interdições de mais de 15 dias em 2024 na ligação entre RS e SC com prejuízo bilionário.',
    activeMeasures: [
      'Instalação de inclinômetros IoT e piezômetros telemétricos em 85 taludes com histórico de instabilidade',
      'Desdobramento preventivo de pontes modulares metálicas do Exército Brasileiro (Batalhões de Engenharia)',
      'Painéis de Mensagem Variável (PMVs) com rotas alternativas automáticas via BR-101 e BR-282',
      'Diques de contenção e barreiras flexíveis contra rolamento de rochas'
    ],
    metrics: [
      { label: 'Taludes com Risco Alto', value: '28 pontos críticos monitorados', trend: 'stable' },
      { label: 'Pontes Provisórias em Standby', value: '6 kits de transposição rápida', trend: 'stable' },
      { label: 'Tempo Médio de Desobstrução', value: '3.8 horas', trend: 'down' },
      { label: 'Tráfego Diário Médio', value: '32.000 caminhões/dia', trend: 'stable' }
    ],
    civilDefenseLevel: 'Alerta Laranja - Grau 3'
  },
  {
    id: 'hotspot-br-101-sul',
    name: 'Corredor Litorâneo BR-101 Sul (Morro dos Cavalos / Palhoça)',
    state: 'Santa Catarina (SC)',
    region: 'sul',
    sector: 'transport',
    lat: -27.854,
    lng: -48.647,
    xSvg: 54,
    ySvg: 84,
    riskLevel: 'alto',
    primaryThreat: 'Deslizamento de grandes massas de terra sobre as duas pistas da rodovia litorânea',
    description: 'Ponto único de passagem rodoviária entre o Sul e o restante do país, encravado entre a montanha e o mar.',
    historicalPrecedent: 'Bloqueio total por 48h em abril de 2024 gerando filas de 40 km.',
    activeMeasures: [
      'Gabiões reforçados e ancoragens com chumbadores de 15 metros na encosta superior',
      'Sistema de monitoramento por fibra óptica para detecção precoce de microdeformações no asfalto',
      'Plano de cabotagem emergencial de contingência entre os portos de Itajaí, Paranaguá e Rio Grande'
    ],
    metrics: [
      { label: 'Estabilidade da Encosta', value: 'Fator de Segurança: 1.18 (Crítico < 1.10)', trend: 'down' },
      { label: 'Capacidade de Desvio Portuário', value: '4.200 TEUs/semana', trend: 'up' },
      { label: 'Acumulado 48h no Trecho', value: '88 mm', trend: 'stable' }
    ],
    civilDefenseLevel: 'Alerta Laranja - Grau 3'
  }
];

export const ACTIVE_ALERTS: AlertItem[] = [
  {
    id: 'alt-001',
    timestamp: 'Hoje, 10:45',
    title: 'Alerta Vermelho: Nível do Guaíba em Ascensão e Alagamento de Pista',
    description: 'Previsão de mais 90mm de chuva nas cabeceiras dos rios Taquari e Jacuí nas próximas 24h. Risco iminente de transbordamento nos canais de escoamento do aeroporto Salgado Filho e bairros Navegantes/São Geraldo.',
    sector: 'aviation',
    region: 'sul',
    severity: 'critico',
    location: 'Porto Alegre / RS (SBPA & Bacia do Guaíba)',
    affectedAssets: ['Pista 11/29 do SBPA', 'Subestação Elétrica Norte', '4.200 residências em cota baixa'],
    recommendedAction: 'Ativar bombeamento máximo de emergência (18.500 m³/h), desviar voos comerciais para Base de Canoas (SBCO) e emitir Cell Broadcast para evacuação preventiva nos setores R4.',
  },
  {
    id: 'alt-002',
    timestamp: 'Hoje, 09:15',
    title: 'Alerta Crítico: Calado do Rio Madeira atinge Nível de Suspensão de Navegação Noturna',
    description: 'Nível das águas atingiu 1,45m na régua da Capitania dos Portos em Porto Velho. Bancos de areia expostos nos passos do Marmelo e Ilha de Curicacas.',
    sector: 'transport',
    region: 'norte',
    severity: 'critico',
    location: 'Hidrovia do Rio Madeira (Porto Velho - Humaitá)',
    affectedAssets: ['18 comboios de barcaças', 'Transporte de combustível para Roraima e Acre', 'Exportação de soja'],
    recommendedAction: 'Determinar fracionamento compulsório de comboios para calado máximo de 2,00m, mobilizar dragas de sucção contínua e acionar desvio rodoviário emergencial via BR-319.',
  },
  {
    id: 'alt-003',
    timestamp: 'Hoje, 08:30',
    title: 'Alerta Laranja: Saturação Hídrica Crítica e Risco de Deslizamento na Serra do Mar',
    description: 'Acumulado pluviométrico de 138mm nas últimas 48h sobre solo com declividade superior a 35 graus. Inclinômetros registram movimentação de 4mm na encosta.',
    sector: 'housing',
    region: 'sudeste',
    severity: 'alto',
    location: 'São Sebastião e Ubatuba / SP (Encostas R3/R4)',
    affectedAssets: ['Bairro Vila Sahy e Juquehy', 'Rodovia Rio-Santos (SP-055)', '1.450 residências'],
    recommendedAction: 'Disparar sirenes comunitárias de evacuação, abrir abrigos municipais climatizados com estoque humanitário e bloquear preventivamente a pista da SP-055 no km 174.',
  },
  {
    id: 'alt-004',
    timestamp: 'Ontem, 21:00',
    title: 'Alerta Amarelo: Fumaça de Queimadas Reduz Visibilidade em Manaus e Porto Velho',
    description: 'Concentração de aerossóis e partículas PM2.5 atinge 168 µg/m³. Visibilidade horizontal oscilando entre 1.200m e 1.600m com teto baixo.',
    sector: 'aviation',
    region: 'norte',
    severity: 'moderado',
    location: 'TMA Manaus (SBEG) e TMA Porto Velho (SBPV)',
    affectedAssets: ['Operações VFR e aproximacões não-precisão', 'Filtros de ar de aeronaves', 'População urbana'],
    recommendedAction: 'Ativar obrigatoriedade de procedimentos IFR com ILS Cat II e RNP AR, orientar aeronaves com maior reserva de combustível e distribuir máscaras N95 em comunidades.',
  }
];

export const PREVENTION_MEASURES_CATALOG: PreventionMeasure[] = [
  {
    id: 'meas-av-01',
    title: 'Rede de Aeroportos Alternantes & Hubs Regionais de Contingência (HARC)',
    sector: 'aviation',
    category: 'operacional',
    summary: 'Estruturação prévia de bases aéreas militares e pistas regionais de alta cota topográfica para absorver tráfego quando aeroportos metropolitanos forem afetados por inundações ou fumaça.',
    howItWorks: 'Homologação antecipada pela ANAC e DECEA de aeródromos secundários (ex: Base Aérea de Canoas/SBCO para Porto Alegre; Viracopos/SBKP para Congonhas/Guarulhos; Boa Vista/SBBV para Manaus). Instalação de terminais provisórios modulares e esteiras móveis de bagagem.',
    implementationCost: 'Médio',
    timeframe: 'Imediato (1-30 dias)',
    efficiencyRate: '92% de retenção de voos essenciais',
    brazilianStandardOrLaw: 'RBAC 139 / ICA 100-37 (DECEA) / Resolução ANAC nº 400',
    realWorldApplication: 'Operação da Base Aérea de Canoas após a enchente de maio de 2024 no RS, mantendo a conectividade do estado.'
  },
  {
    id: 'meas-av-02',
    title: 'Sistemas Preditivos de Windshear com Radar Doppler Banda X & Grooving Avançado',
    sector: 'aviation',
    category: 'tecnologica',
    summary: 'Monitoramento em tempo real de correntes descendentes violentas (microbursts) em aproximações finais causadas pelo aquecimento anômalo do El Niño.',
    howItWorks: 'Instalação de radares meteorológicos Doppler de alta frequência (Banda X) dedicados nas cabeceiras de pista com algoritmos de machine learning treinados para alertar pilotos com 90 segundos de antecedência sobre tesouras de vento.',
    implementationCost: 'Alto',
    timeframe: 'Médio Prazo (3-6 meses)',
    efficiencyRate: '98% de prevenção de acidentes por aproximação instável',
    brazilianStandardOrLaw: 'RBAC 153 / Anexo 3 da OACI (Meteorologia Aeronáutica)',
    realWorldApplication: 'Aeroportos de Guarulhos (SBGR) e Galeão (SBGL).'
  },
  {
    id: 'meas-av-03',
    title: 'Diques de Contenção Perimetrais & Drenagem Rápida com Bombas Anfíbias em Pistas',
    sector: 'aviation',
    category: 'estrutural',
    summary: 'Blindagem física de pistas, taxiways e subestações elétricas situadas em várzeas fluviais ou zonas litorâneas suscetíveis a marés de tempestade.',
    howItWorks: 'Construção de diques de terra armada com geossintéticos circundando o sítio aeroportuário, comportas automáticas de maré e estações de bombeamento com acionamento por geradores a diesel em cota segura.',
    implementationCost: 'Muito Alto',
    timeframe: 'Longo Prazo (1-2 anos)',
    efficiencyRate: '99.5% de proteção contra inundações até a cota decamilenar',
    brazilianStandardOrLaw: 'Norma Técnica ABNT NBR 12218 / Diretrizes de Engenharia da Infraero',
    realWorldApplication: 'Projeto de readequação e blindagem do Aeroporto Salgado Filho (Porto Alegre).'
  },
  {
    id: 'meas-hou-01',
    title: 'Sistema Integrado de Alerta Antecipado por Cell Broadcast & Sirenes Telemétricas',
    sector: 'housing',
    category: 'tecnologica',
    summary: 'Disparo compulsório de alertas sonoros e mensagens instantâneas em smartphones de moradores situados em polígonos de risco geológico e hidrológico.',
    howItWorks: 'Integração entre radares meteorológicos do CEMADEN, pluviômetros automáticos e as antenas de telefonia celular (Cell Broadcast). Quando o acumulado em 24h atinge o limiar crítico (ex: 120mm), os aparelhos emitem sirene estridente e instruções claras de evacuação para abrigos pré-cadastrados.',
    implementationCost: 'Baixo',
    timeframe: 'Imediato (1-30 dias)',
    efficiencyRate: '88% de redução na perda de vidas em deslizamentos',
    brazilianStandardOrLaw: 'Lei Federal 12.608/2012 (Política Nacional de Proteção e Defesa Civil - PNPDEC)',
    realWorldApplication: 'Defesa Civil Nacional (Defesa Civil Alerta) e Defesa Civil Estadual de SP/RJ/RS.'
  },
  {
    id: 'meas-hou-02',
    title: 'Bioengenharia de Encostas, Barreiras Dinâmicas e Drenagem Profunda (DHP)',
    sector: 'housing',
    category: 'estrutural',
    summary: 'Estabilização sustentável de morros e encostas urbanas habitadas através da combinação de vegetação de raízes profundas, gabiões e alívio de pressão d\'água.',
    howItWorks: 'Plantio de espécies como capim-vetiver em consórcio com geogrelhas metálicas; perfuração de Drenos Sub-horizontais Profundos (DHP) para expelir a água infiltrada antes que aumente o peso do maciço; e barreiras dinâmicas suíças em aço flexível para reter rolamento de rochas.',
    implementationCost: 'Médio',
    timeframe: 'Médio Prazo (3-6 meses)',
    efficiencyRate: '85% de redução de escorregamentos planares e rotacionais',
    brazilianStandardOrLaw: 'ABNT NBR 11682 (Estabilidade de Encostas)',
    realWorldApplication: 'Obras de contenção em Petrópolis (RJ), Salvador (BA) e Morro do Macaco (SP).'
  },
  {
    id: 'meas-hou-03',
    title: 'Sistemas Urbanos de Drenagem Sustentável (SUDs), Jardins de Chuva & Piscinões',
    sector: 'housing',
    category: 'estrutural',
    summary: 'Amortecimento de vazões torrenciais em áreas urbanas adensadas por meio de infraestrutura verde e bacias de retenção.',
    howItWorks: 'Criação de parques inundáveis em várzeas naturais, pavimentos permeáveis, valas de infiltração e piscinões subterrâneos com bombas de esgotamento. Em vez de canalizar rapidamente a água (o que inunda jusante), a água é retida e infiltrada gradualmente.',
    implementationCost: 'Alto',
    timeframe: 'Longo Prazo (1-2 anos)',
    efficiencyRate: '75% de amortecimento no pico de cheias urbanas',
    brazilianStandardOrLaw: 'Lei do Saneamento Básico 14.026/2020 / Planos Diretores Municipais',
    realWorldApplication: 'Piscinões da Região Metropolitana de São Paulo e Bacias de Retenção de Curitiba.'
  },
  {
    id: 'meas-tra-01',
    title: 'Monitoramento Batimétrico em Tempo Real & Dragagem Contínua de Hidrovias Amazônicas',
    sector: 'transport',
    category: 'tecnologica',
    summary: 'Garantia de navegabilidade contínua em rios de grande porte durante estiagens históricas provocadas pelo El Niño.',
    howItWorks: 'Barcos de apoio com ecobatímetros multifeixe mapeiam diariamente os bancos de areia móveis nos canais de navegação. As coordenadas são transmitidas via satélite para os comandantes de comboios. Dragas de corte e sucção operam ininterruptamente nos passos críticos antes do início da super vazante.',
    implementationCost: 'Alto',
    timeframe: 'Médio Prazo (3-6 meses)',
    efficiencyRate: '80% de manutenção do fluxo de cargas na Amazônia',
    brazilianStandardOrLaw: 'NORMAM-02 / DPC da Marinha do Brasil / Diretrizes ANTAQ',
    realWorldApplication: 'Operações de dragagem emergencial nos Rios Madeira, Amazonas e Solimões pelo DNIT.'
  },
  {
    id: 'meas-tra-02',
    title: 'Rede de Sensores IoT Estruturais em Pontes, Viadutos e Taludes Rodoviários',
    sector: 'transport',
    category: 'tecnologica',
    summary: 'Detecção antecipada de solapamento de pilares e inclinação anômala de encostas rodoviárias.',
    howItWorks: 'Inclinômetros, piezômetros e acelerômetros wireless instalados em pontes e taludes ao longo de rodovias críticas (BR-116, BR-101, BR-376). Ao detectar vibrações anômalas ou perda de sustentação pelo solo saturado, cancelas inteligentes e painéis de LED bloqueiam o tráfego automaticamente antes do colapso.',
    implementationCost: 'Médio',
    timeframe: 'Médio Prazo (3-6 meses)',
    efficiencyRate: '95% de prevenção de acidentes com veículos em colapso de pontes',
    brazilianStandardOrLaw: 'Manuais de Inspeção de Obras de Arte Especiais do DNIT / NBR 9452',
    realWorldApplication: 'Concessões rodoviárias CCR, Arteris e EcoRodovias nas Serras do Sudeste e Sul.'
  },
  {
    id: 'meas-tra-03',
    title: 'Matriz de Roteamento Intermodal & Desdobramento Rápido de Pontes Modulares',
    sector: 'transport',
    category: 'operacional',
    summary: 'Sistemas inteligentes de desvio de cargas essenciais (medicamentos, alimentos, combustíveis) com apoio dos Batalhões de Engenharia do Exército.',
    howItWorks: 'Plataforma integrada entre DNIT, ANTT e Marinha que calcula automaticamente rotas de escape combinando cabotagem marítima, ferrovias e trechos rodoviários alternativos. Pré-posicionamento de kits de pontes metálicas modulares tipo Bailey e LSB a até 150 km dos pontos com risco de queda de pontes.',
    implementationCost: 'Médio',
    timeframe: 'Imediato (1-30 dias)',
    efficiencyRate: '70% de redução no tempo de isolamento logístico',
    brazilianStandardOrLaw: 'Decreto Federal nº 10.593/2020 (Coordenação do SINPDEC)',
    realWorldApplication: 'Emprego de pontes do Exército Brasileiro em rodovias estaduais e federais do RS e SC.'
  }
];

export const MACRO_SUMMARY = {
  protectedAirports: 38,
  monitoredSlopesFamilies: 245000,
  protectedCorridorKm: 8600,
  estimatedSavingsBillions: 11.2,
};

// ==========================================
// SIMA-SAT 1: SATÉLITE PRÓPRIO DE MONITORAMENTO
// ==========================================

export const SIMA_SAT_TELEMETRY: SatelliteTelemetry = {
  satelliteId: 'BR-SIMA-SAT-01',
  name: 'SIMA-SAT 1 (Satélite Integrado de Monitoramento de Anomalias)',
  mission: 'Vigilância Orbital de Resiliência ao El Niño Brasil (SAR L-Band & InSAR Geodésico)',
  launchDate: '18 de Fevereiro de 2025 • Centro Espacial de Alcântara (CEA) / Veículo VLM-1',
  orbitType: 'Heliosíncrona Polar (SSO) • 560 km de Altitude',
  altitudeKm: 560.4,
  speedKmS: 7.58,
  inclinationDeg: 97.4,
  orbitalPeriodMin: 95.8,
  batteryLevelPct: 94.6,
  solarPanelStatus: 'nominal',
  sensorCryoTempC: -62.4,
  downlinkStatus: 'transmitting',
  downlinkRateMbps: 450,
  activeGroundStation: 'Estação Terrena Cuiabá (INPE-MT) / Backup: Alcântara (MA)',
  currentLat: -14.235,
  currentLng: -51.925,
  currentSwathZone: 'Faixa 04 (Bacia do Guaíba / Serra do Mar / Rio Madeira)',
  sarMode: 'InSAR_Displacement',
};

export const SATELLITE_OBSERVATIONS: SatelliteObservation[] = [
  {
    id: 'obs-sat-001',
    timestamp: 'Hoje, 11:20 UTC',
    targetRegion: 'sul',
    locationName: 'Bacia Hidrográfica do Guaíba / Salgado Filho (SBPA)',
    sensorType: 'SAR Banda-L (Penetração em Nuvens e Vegetação)',
    primaryAnomaly: 'Expansão de Lâmina d\'Água & Repiquete Hidrológico',
    displacementMmOrLevel: 'Lâmina d\'água expandida em +14.2 km² em 12h',
    waterSurfaceAreaKm2: 486.2,
    severity: 'critico',
    confidencePct: 98.4,
    aiInterpretation: 'SAR Banda-L detectou transbordamento nos diques de amortecimento ao norte do Aeroporto Salgado Filho com reflexão dielétrica indicando água parada a 80m da taxiway.',
    coordinates: { lat: -29.9939, lng: -51.1711 }
  },
  {
    id: 'obs-sat-002',
    timestamp: 'Hoje, 10:45 UTC',
    targetRegion: 'sudeste',
    locationName: 'Complexo de Encostas Serra do Mar / São Sebastião - SP',
    sensorType: 'InSAR Interferométrico Diferencial (DInSAR)',
    primaryAnomaly: 'Deformação Milimétrica de Maciço Rochoso (Creep Rate)',
    displacementMmOrLevel: 'Deslocamento cumulativo: 6.8 mm/semana',
    severity: 'alto',
    confidencePct: 94.2,
    aiInterpretation: 'O DInSAR orbital identificou vetor de aceleração de cisalhamento na cota 420m sobre o Bairro Topolândia. Probabilidade de escorregamento planar de 78% se a chuva exceder 50mm.',
    coordinates: { lat: -23.76, lng: -45.41 }
  },
  {
    id: 'obs-sat-003',
    timestamp: 'Hoje, 09:12 UTC',
    targetRegion: 'norte',
    locationName: 'Passos Críticos do Rio Madeira / Marmelo & Curicacas',
    sensorType: 'Radiômetro Térmico SWIR + Altimetria Radar',
    primaryAnomaly: 'Emersão de Bancos de Areia e Pedrais em Canal Central',
    displacementMmOrLevel: 'Calado livre detectado: 1.85 metros',
    severity: 'critico',
    confidencePct: 97.1,
    aiInterpretation: 'Imagens radar e SWIR indicam que 4 dos 6 canais de dragagem prioritários sofreram assoreamento por correntes de fundo. Tráfego de barcaças requer rotação imediata para canal sul.',
    coordinates: { lat: -8.7619, lng: -63.9039 }
  },
  {
    id: 'obs-sat-004',
    timestamp: 'Ontem, 23:40 UTC',
    targetRegion: 'norte',
    locationName: 'Bacia Amazônica Ocidental / Aeródromo Manaus (SBEG)',
    sensorType: 'Imageador Óptico Multiespectral & Aerosol Optical Depth (AOD)',
    primaryAnomaly: 'Pluma Densa de Fumaça por Incêndios Florestais Conectados à Seca',
    displacementMmOrLevel: 'AOD 550nm: 1.84 (Índice Severo)',
    smokeAerosolOpticalDepth: 1.84,
    severity: 'moderado',
    confidencePct: 92.8,
    aiInterpretation: 'Camada de inversão térmica mantém aerossóis suspensos entre o solo e 1.200 pés. Recomenda-se manter operação IFR de precisão ILS CAT II para aproximações na cabeceira 11.',
    coordinates: { lat: -3.0386, lng: -60.0497 }
  },
  {
    id: 'obs-sat-005',
    timestamp: 'Ontem, 18:15 UTC',
    targetRegion: 'sudeste',
    locationName: 'Corredor Rodoviário Serra das Araras (BR-116)',
    sensorType: 'InSAR + Sensores Acústicos Terrestres',
    primaryAnomaly: 'Movimento de Rastejo em Talude da Pista Descendente',
    displacementMmOrLevel: 'Microdeformação: 3.2 mm/mês',
    severity: 'moderado',
    confidencePct: 91.5,
    aiInterpretation: 'Georreferenciamento indica estabilidade aceitável sob solo seco, porém o alerta meteorológico de frente fria exige pré-posicionamento de equipes e cancelas de interdição preventiva.',
    coordinates: { lat: -22.505, lng: -43.1789 }
  }
];

export const SATELLITE_PASS_SCHEDULE: SatellitePass[] = [
  {
    passId: 'PASS-1082',
    orbitNumber: 1420,
    scheduledTime: 'Hoje, 12:45 UTC',
    targetRegion: 'Sul (RS/SC) - Foco Bacia do Taquari / Guaíba',
    durationSeconds: 380,
    sensorPayload: 'SAR Banda-L Full Polarimetric (HH/HV)',
    taskStatus: 'in_progress'
  },
  {
    passId: 'PASS-1083',
    orbitNumber: 1421,
    scheduledTime: 'Hoje, 14:22 UTC',
    targetRegion: 'Norte (AM/RO) - Foco Hidrovia Madeira & Solimões',
    durationSeconds: 420,
    sensorPayload: 'Altimetria Radar + SWIR Térmico',
    taskStatus: 'scheduled'
  },
  {
    passId: 'PASS-1084',
    orbitNumber: 1422,
    scheduledTime: 'Hoje, 15:58 UTC',
    targetRegion: 'Sudeste (SP/RJ) - Foco Serra do Mar e Vale do Paraíba',
    durationSeconds: 360,
    sensorPayload: 'DInSAR Interferométrico Milimétrico',
    taskStatus: 'scheduled'
  },
  {
    passId: 'PASS-1085',
    orbitNumber: 1423,
    scheduledTime: 'Hoje, 17:35 UTC',
    targetRegion: 'Nordeste (Semiárido) - Foco Bacias Hidrográficas do São Francisco',
    durationSeconds: 390,
    sensorPayload: 'Multiespectral NDVI & Balanço Hídrico',
    taskStatus: 'scheduled'
  }
];

// Dados temporais e comparativos para os novos gráficos interativos
export const TIME_SERIES_TELEMETRY = [
  { month: 'Jan', sstAnomaly: 1.8, seaLevelGuaiba: 2.1, madeiraDepth: 4.8, insarDisplacementMm: 1.2, aviationDelaysPct: 12, lossesAvoidedM: 420 },
  { month: 'Fev', sstAnomaly: 2.1, seaLevelGuaiba: 2.6, madeiraDepth: 4.2, insarDisplacementMm: 2.1, aviationDelaysPct: 18, lossesAvoidedM: 680 },
  { month: 'Mar', sstAnomaly: 2.3, seaLevelGuaiba: 3.1, madeiraDepth: 3.6, insarDisplacementMm: 3.4, aviationDelaysPct: 24, lossesAvoidedM: 950 },
  { month: 'Abr', sstAnomaly: 2.6, seaLevelGuaiba: 4.2, madeiraDepth: 2.8, insarDisplacementMm: 5.1, aviationDelaysPct: 38, lossesAvoidedM: 1650 },
  { month: 'Mai (Pico)', sstAnomaly: 2.9, seaLevelGuaiba: 5.35, madeiraDepth: 2.1, insarDisplacementMm: 8.9, aviationDelaysPct: 62, lossesAvoidedM: 3200 },
  { month: 'Jun', sstAnomaly: 2.7, seaLevelGuaiba: 4.1, madeiraDepth: 1.7, insarDisplacementMm: 7.2, aviationDelaysPct: 44, lossesAvoidedM: 2400 },
  { month: 'Jul', sstAnomaly: 2.4, seaLevelGuaiba: 3.4, madeiraDepth: 1.45, insarDisplacementMm: 5.8, aviationDelaysPct: 32, lossesAvoidedM: 1900 },
  { month: 'Ago', sstAnomaly: 2.2, seaLevelGuaiba: 2.9, madeiraDepth: 1.35, insarDisplacementMm: 4.6, aviationDelaysPct: 26, lossesAvoidedM: 1400 },
  { month: 'Set', sstAnomaly: 2.0, seaLevelGuaiba: 2.5, madeiraDepth: 1.6, insarDisplacementMm: 3.8, aviationDelaysPct: 22, lossesAvoidedM: 1100 },
  { month: 'Out', sstAnomaly: 1.7, seaLevelGuaiba: 2.3, madeiraDepth: 2.4, insarDisplacementMm: 2.9, aviationDelaysPct: 16, lossesAvoidedM: 850 },
  { month: 'Nov', sstAnomaly: 1.4, seaLevelGuaiba: 2.0, madeiraDepth: 3.5, insarDisplacementMm: 2.1, aviationDelaysPct: 14, lossesAvoidedM: 620 },
  { month: 'Dez', sstAnomaly: 1.1, seaLevelGuaiba: 1.8, madeiraDepth: 4.4, insarDisplacementMm: 1.5, aviationDelaysPct: 10, lossesAvoidedM: 480 },
];


