export interface AdvisorEntry {
  id: string;
  category: 'aviation' | 'housing' | 'transport' | 'meteorology' | 'civil_defense';
  categoryLabel: string;
  question: string;
  answer: string;
  tags: string[];
}

export const ADVISOR_KNOWLEDGE_BASE: AdvisorEntry[] = [
  // ================= AVIAÇÃO (25 ITENS) =================
  {
    id: 'av-01',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'O que fazer se a pista do Salgado Filho (SBPA) ameaçar alagar?',
    answer: 'Em SBPA, o protocolo prioritário exige: 1) Fechamento das comportas dos diques perimetrais e ativação das bombas de sucção contínua (mínimo 18.500 m³/h); 2) Elevação e blindagem preventiva de subestações de energia e geradores do balizamento luminoso; 3) Emissão de NOTAM de alerta de lâmina d\'água; 4) Transferência de voos de passageiros para os hubs de contingência Base Aérea de Canoas (SBCO), Caxias do Sul (SBCX) e Florianópolis (SBFL); 5) Deslocamento de aeronaves estacionadas para pátios em cotas altimétricas seguras.',
    tags: ['SBPA', 'Porto Alegre', 'Alagamento', 'Diques', 'NOTAM']
  },
  {
    id: 'av-02',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Como gerenciar o risco de microbursts e windshear na aproximação da TMA-SP (Guarulhos e Congonhas)?',
    answer: 'Para a TMA-SP durante tempestades severas do El Niño: 1) Utilizar o radar meteorológico Doppler Banda-X de superfície e o sistema LLWAS (Low Level Windshear Alert System); 2) Orientar os pilotos a adicionarem margem de velocidade na aproximação final (Vref + 10 a 15 nós); 3) Em caso de aviso de Windshear no painel (EGPWS/PWS), aplicar imediatamente empuxo máximo (TOGA) e manter atitude de subida sem recolher flaps/trem até cessar o alerta; 4) Coordenar com o APP-SP esperas em setores fora da esteira convectiva (ex: fixo EDROX ou BCO).',
    tags: ['SBGR', 'SBSP', 'Windshear', 'Microburst', 'DECEA']
  },
  {
    id: 'av-03',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Quais as regras do DECEA para operações aéreas sob fumaça densa de queimadas em Manaus (SBEG)?',
    answer: 'Com visibilidade horizontal reduzida por fumaça amazônica: 1) Ativar procedimentos IFR de precisão ILS CAT II quando o RVR (Runway Visual Range) estiver entre 300m e 550m; 2) Exigir tripulações e aeronaves certificadas para aproximações de baixa visibilidade (LVP); 3) Aplicar maior separação longitudinal entre aeronaves no TMA-Manaus; 4) Aumentar a reserva de combustível para alternar Boa Vista (SBBV), Belém (SBBE) ou Santarém (SBSN); 5) Inspeção diária nos filtros de ar condicionado e entradas dos motores por cinzas suspensas.',
    tags: ['SBEG', 'Manaus', 'Fumaça', 'ILS', 'Queimadas']
  },
  {
    id: 'av-04',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Como prevenir a aquaplanagem dinâmica e viscosa em pistas durante chuvas torrenciais?',
    answer: 'Conforme RBAC 153 da ANAC: 1) Garantir manutenção contínua das ranhuras de pista (grooving) com profundidade e largura mínimas de 6 mm; 2) Realizar medições periódicas de atrito e macrotextura com grip tester contínuo; 3) Informar nos boletins ATIS/METAR a condição de pista contaminada (Water on Runway > 3mm); 4) Pilotos devem utilizar reversor máximo e frenagem aerodinâmica, evitando frenagens bruscas iniciais.',
    tags: ['Aquaplanagem', 'Grooving', 'RBAC 153', 'Frenagem', 'Pista']
  },
  {
    id: 'av-05',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Como funciona o sistema EMAS (Engineered Materials Arresting System) em pistas curtas como Congonhas (SBSP)?',
    answer: 'O EMAS consiste em blocos de concreto celular de baixa densidade instalados na cabeceira da pista. Caso uma aeronave ultrapasse o limite utilizável (overrun) por pista molhada ou falha de frenagem, o material se deforma e absorve a energia cinética do trem de pouso, desacelerando o avião com segurança sem causar danos estruturais severos aos passageiros ou à fuselagem.',
    tags: ['SBSP', 'EMAS', 'Segurança', 'Pista Curta', 'Congonhas']
  },
  {
    id: 'av-06',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Qual o procedimento padrão de arremetida (Go-Around) sob tesoura de vento severa?',
    answer: '1) Avançar as manetes para potência máxima de decolagem (TOGA); 2) Pressionar os botões TOGA e seguir as barras de comando do Flight Director; 3) Desconectar o piloto automático se recomendado pelo fabricante e manter o pitch indicado; 4) NÃO alterar a configuração de flapes e trem de pouso até confirmação de razão positiva estável; 5) Notificar o controle de tráfego aéreo (ATC) declarando "Windshear Escape Maneuver".',
    tags: ['Go-Around', 'Arremetida', 'Segurança', 'Pilotos', 'Manobra']
  },
  {
    id: 'av-07',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Como planejar a margem de combustível de contingência em voos nacionais durante o El Niño?',
    answer: 'Em períodos de El Niño ativo: 1) Adicionar de 45 a 75 minutos de autonomia de espera além da reserva regulamentar (ICAO/RBAC 121); 2) Declarar no plano de voo dois aeródromos de alternativa situados em bacias meteorológicas distintas; 3) Considerar desvios de rota em rota de cruzeiro superiores a 150 MN para contornar linhas de instabilidade convectiva severa (CBs isolados e frentes frias ocluídas).',
    tags: ['Combustível', 'Planejamento', 'RBAC 121', 'Alternativa', 'Autonomia']
  },
  {
    id: 'av-08',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Como proteger as aeronaves estacionadas nos pátios durante alertas de vendavais e rajadas > 50 nós?',
    answer: '1) Realizar a amarração mecânica das aeronaves (tie-down) aos pontos de ancoragem do pátio; 2) Travar superfícies de controle de voo com gust locks; 3) Calçar rodas com calços duplos e engatar freios de estacionamento conforme manual do operador; 4) Recolher e travar escadas, pontes de embarque (fingers) e carretas de bagagem; 5) Se a previsão indicar rajadas superiores a 65 nós, hangarar ou posicionar o nariz das aeronaves alinhado ao vento predominante.',
    tags: ['Pátio', 'Vendaval', 'Ancoragem', 'Fingers', 'Segurança Terrestre']
  },
  {
    id: 'av-09',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Qual o protocolo de segurança para solo sob tempestades com raios (Ground Stop elétrico)?',
    answer: 'Quando o sistema de detecção de descargas atmosféricas registrar raios em um raio menor que 5 km do aeródromo: 1) Paralisar imediatamente operações de abastecimento de combustível; 2) Suspender operações de carregamento e descarregamento de bagagens na rampa; 3) Proibir o uso de fones com fio pelos mecânicos na rampa; 4) Recolher funcionários para abrigos estruturais; 5) Retomar apenas após 15 minutos sem registro de descargas no raio de segurança.',
    tags: ['Raios', 'Ground Stop', 'Segurança Ocupacional', 'Rampa', 'Abastecimento']
  },
  {
    id: 'av-10',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Como a alta temperatura e baixa densidade do ar em ondas de calor afetam a performance de decolagem?',
    answer: 'Temperaturas extremas (ondas de calor do El Niño no Centro-Oeste e Sudeste) reduzem a densidade do ar, o que: 1) Diminui a sustentação gerada pelas asas e a tração dos motores a jato; 2) Exige maior comprimento de pista para corrida de decolagem (Takeoff Distance); 3) Pode exigir redução de peso máximo de decolagem (MTOW), limitando passageiros ou carga útil; 4) Pilotos devem recalcular a V1, Vr e V2 com base no QNH e na temperatura real do momento.',
    tags: ['Densidade do Ar', 'Calor', 'Performance', 'MTOW', 'Decolagem']
  },
  {
    id: 'av-11',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'O que caracteriza a turbulência de ar claro (CAT) intensificada pelas correntes de jato no El Niño?',
    answer: 'O aquecimento anômalo do Pacífico intensifica a Corrente de Jato Subtropical sobre o Centro-Sul do Brasil. A variação brusca de velocidade e direção do vento em níveis de cruzeiro (FL300 a FL410) gera forte cisalhamento vertical e horizontal, produzindo turbulência severa sem nuvens visíveis. Recomenda-se manter o aviso de atar cintos ligado, monitorar cartas SIGWX e solicitar mudanças de nível de voo ao ACC.',
    tags: ['CAT', 'Turbulência', 'Corrente de Jato', 'Cruzeiro', 'SIGWX']
  },
  {
    id: 'av-12',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Como interpretar as mensagens SIGMET e SPECI emitidas pela REDEMET durante crises do El Niño?',
    answer: 'O SIGMET alerta para fenômenos perigosos em voo (como Linhas de Instabilidade - SQL TS, Turbulência Severa - SEV TURB ou Granizo - GR). O SPECI é um boletim meteorológico especial de aeródromo emitido imediatamente quando parâmetros críticos mudam repentinamente (ex: queda súbita de visibilidade, mudança de rumo do vento com rajadas ou teto abaixo dos mínimos operacionais).',
    tags: ['SIGMET', 'SPECI', 'REDEMET', 'METAR', 'Meteorologia Aeronáutica']
  },
  {
    id: 'av-13',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Qual a importância de desobstruir canais de drenagem ao redor do sítio aeroportuário?',
    answer: 'A água de escoamento superficial acumulada em gramados ao redor da pista satura o subleito, gerando recalque diferencial no pavimento asfáltico e refluxo de água sobre a pista. Canais de macrodrenagem e bacias de amortecimento limpas garantem que precipitações de 100 mm/h sejam escoadas sem transbordamento para as cabeceiras e pistas de táxi (taxiways).',
    tags: ['Drenagem', 'Subleito', 'Pavimento', 'Macrodrenagem', 'Infraestrutura']
  },
  {
    id: 'av-14',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Como atuar em caso de contaminação de combustível de aviação (QAV) por condensação e umidade extrema?',
    answer: '1) Realizar drenagem e teste de pasta detectora de água nos caminhões tanque e hidrantes antes do abastecimento; 2) Efetuar ensaio visual de transparência e teste com cápsula hidrossensível (Shell Water Detector); 3) Isolar imediatamente tanques com presença de água livre ou microrganismos; 4) Manter purgas ativas nos tanques dos parques de abastecimento dos aeroportos (PAA).',
    tags: ['QAV', 'Combustível', 'Abastecimento', 'Qualidade', 'Inspeção']
  },
  {
    id: 'av-15',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Qual o papel da Base Aérea de Canoas (SBCO) e de Caxias do Sul (SBCX) como aeródromos alternantes do RS?',
    answer: 'Durante a inoperância do Aeroporto Salgado Filho (SBPA), a Base Aérea Militar de Canoas (SBCO) foi adaptada emergencialmente para voos comerciais de passageiros com check-in em shopping local, enquanto Caxias do Sul (SBCX), Passo Fundo (SBPF) e Pelotas (SBPK) absorveram a malha regional, demonstrando a necessidade de planos de contingência interaeroportuários pré-homologados.',
    tags: ['SBCO', 'SBCX', 'Hubs Alternantes', 'Canoas', 'Contingência RS']
  },
  {
    id: 'av-16',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Como a formação de granizo (Hail) afeta a fuselagem e o radome da aeronave?',
    answer: 'Pedras de granizo em tempestades severas podem perfurar o radome (que protege a antena do radar meteorológico), trincar o para-brisa frontal e amassar os bordos de ataque das asas. Ao identificar ecos com formato de gancho (Hook Echo) ou refletividade > 55 dBZ no radar de bordo, desviar lateralmente a pelo menos 20 milhas náuticas a barlavento da célula.',
    tags: ['Granizo', 'Radome', 'Radar de Bordo', 'Tempestade', 'Desvio']
  },
  {
    id: 'av-17',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Como coordenar voos de resgate e ajuda humanitária (SAR) sem colapsar o tráfego civil?',
    answer: '1) O CGNA (Centro de Gerenciamento da Navegação Aérea) estabelece corredores aéreos exclusivos para missões humanitárias; 2) Aplicação de prioridade tática para código SAR e evacuação aeromédica; 3) Instalação de torres de controle móveis (TWR Móvel do DECEA) em campos de pouso desprovidos de controle; 4) Segregação altimétrica entre aeronaves de asa fixa e helicópteros de resgate.',
    tags: ['SAR', 'Resgate', 'CGNA', 'Ajuda Humanitária', 'Tráfego Aéreo']
  },
  {
    id: 'av-18',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Quais medidas adotar nos terminais de passageiros durante atrasos e cancelamentos massivos por clima?',
    answer: '1) Aplicação das diretrizes da Resolução 400 da ANAC (reacomodação, alimentação e hospedagem); 2) Instalação de geradores dedicados para manter climatização, iluminação e sistemas de TI do terminal; 3) Comunicação proativa em painéis e canais digitais com horários previstos atualizados; 4) Triagem especial para passageiros idosos, gestantes e com necessidades médicas.',
    tags: ['ANAC 400', 'Terminal', 'Passageiros', 'Crise', 'Atendimento']
  },
  {
    id: 'av-19',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Como funciona a limpeza de borracha desgastada (desemborrachamento) para evitar pistas escorregadias?',
    answer: 'O acúmulo de borracha dos pneus das aeronaves na zona de toque obstrui o grooving e reduz drasticamente o coeficiente de atrito. A concessionária aeroportuária deve executar o desemborrachamento periódico por hidrocarboneto ou hidrojateamento de ultra-alta pressão (2.500 bar) conforme os limites de segurança da ANAC.',
    tags: ['Desemborrachamento', 'Atrito', 'Zona de Toque', 'Segurança de Pista', 'ANAC']
  },
  {
    id: 'av-20',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Como calibrar altímetros sob variações barométricas extremas causadas por ciclones extratropicais?',
    answer: 'Quedas barométricas repentinas (QNH muito baixo) induzem a leituras de altitude superiores à altitude real da aeronave ("altímetro mente para cima"). As tripulações devem checar o QNH atualizado via ATIS/Torre em cada segmento da aproximação e aplicar as correções de temperatura e pressão em altitudes mínimas de setor (MSA) e de descida (MDA/DA).',
    tags: ['QNH', 'Altímetro', 'Barômetro', 'Ciclone', 'Aproximação']
  },
  {
    id: 'av-21',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'O que é o NOTAM de contaminação de pista e quem tem competência para emiti-lo?',
    answer: 'O NOTAM (Notice to Airmen) de contaminação descreve a porcentagem de cobertura e a profundidade de água, lama ou detritos na pista. É emitido pelo operador aeroportuário em coordenação com o órgão local do DECEA após inspeção física com viatura oficial de fiscalização de pátio e pista.',
    tags: ['NOTAM', 'Contaminação', 'DECEA', 'Fiscalização', 'Pista']
  },
  {
    id: 'av-22',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Como proteger hangares de manutenção contra destelhamento por rajadas de vento descendente (Downburst)?',
    answer: '1) Fechar e travar totalmente as grandes portas corrediças dos hangares para evitar efeito de sobrepressão interna; 2) Reforçar a fixação das telhas metálicas com parafusos autobrocantes de alta resistência e tirantes contra-vento; 3) Manter os sistemas de combate a incêndio por espuma e sprinklers em modo pressurizado automático.',
    tags: ['Hangares', 'Downburst', 'Estrutura', 'Manutenção', 'Vento Forte']
  },
  {
    id: 'av-23',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Como operadores de helicópteros devem atuar em cenários de teto baixo e visibilidade reduzida?',
    answer: 'Operações visuais de helicópteros (VFR) devem respeitar os mínimos meteorológicos locais (visibilidade > 3.000m e teto > 1.000 pés). Em condições marginais de resgate, operar apenas aeronaves homologadas para IFR com duplo piloto, piloto automático de 4 eixos, radar meteorológico e visão noturna (NVG).',
    tags: ['Helicópteros', 'VFR', 'IFR', 'Mínimos Meteorológicos', 'Resgate']
  },
  {
    id: 'av-24',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Qual o papel da matriz RACI no plano de contingência de um aeroporto durante o El Niño?',
    answer: 'A matriz RACI define claramente quem é o Responsável (Responsible), Autoridade/Aprovador (Accountable), Consultado (Consulted) e Informado (Informed) para cada ação: desvio de voos, fechamento de pista, acionamento de bombeiros, comunicação à imprensa e liberação de infraestrutura após o evento.',
    tags: ['Matriz RACI', 'Governança', 'Aeroporto', 'Gestão de Crise', 'Planejamento']
  },
  {
    id: 'av-25',
    category: 'aviation',
    categoryLabel: 'Aviação',
    question: 'Como a inteligência artificial preditiva do SIMA auxilia os Centros de Controle de Operações (CCO) das companhias?',
    answer: 'O SIMA cruza dados de radar orbital SAR, previsões meteorológicas de microescala e telemetria de pistas para antecipar em até 72 horas os gargalos de tráfego, sugerindo proativamente cancelamentos seletivos, desvios de malha e reabastecimento estratégico, reduzindo o custo operacional e preservando vidas.',
    tags: ['IA Preditiva', 'CCO', 'Companhias Aéreas', 'SIMA', 'Otimização']
  },

  // ================= MORADIAS & ENCOSTAS (25 ITENS) =================
  {
    id: 'mo-01',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Como estabilizar morros habitados e prevenir deslizamentos em chuvas extremas?',
    answer: 'A estabilização definitiva e emergencial combina: 1) Drenagem superficial com canaletas em degrau para guiar a água sem infiltrar no talude; 2) Instalação de Drenos Sub-horizontais Profundos (DHPs) para aliviar o lençol freático; 3) Obras de contenção como Solo Grampeado com concreto projetado ou cortina atirantada; 4) Bioengenharia com plantio de Capim Vetiver e biomantas; 5) Remoção imediata de bananeiras e lixo das encostas.',
    tags: ['Encostas', 'Deslizamentos', 'Solo Grampeado', 'Vetiver', 'DHP']
  },
  {
    id: 'mo-02',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Quais os limiares pluviométricos críticos monitorados pelo CEMADEN para disparo de alerta de deslizamento?',
    answer: 'O CEMADEN monitora o acumulado de chuvas em 24h, 48h e 72h. No Brasil, o índice acumulado em 72h superior a 100mm a 150mm em solos já saturados representa limiar de perigo muito alto (Alerta Vermelho), com iminência de deslizamentos planares e corridas de massa (debris flow). O cruzamento do radar com pluviômetros define o acionamento de sirenes.',
    tags: ['CEMADEN', 'Limiar', 'Pluviometria', 'Alerta Vermelho', '72 horas']
  },
  {
    id: 'mo-03',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Como funciona o sistema de alerta por Cell Broadcast da Defesa Civil Nacional?',
    answer: 'O Cell Broadcast transmite mensagens de emergência em texto com sinal sonoro estridente diretamente para todos os telefones celulares conectados às torres de telefonia (ERBs) da área de risco delimitada geograficamente, dispensando cadastro prévio do usuário e sobrepondo-se ao modo silencioso para exigir evacuação imediata.',
    tags: ['Cell Broadcast', 'Defesa Civil', 'Alerta Celular', 'Evacuação', 'Sirene']
  },
  {
    id: 'mo-04',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Qual a diferença entre áreas de risco geológico R1, R2, R3 e R4 segundo a metodologia CPRM/IPT?',
    answer: 'R1 (Risco Baixo): Encostas estáveis sem sinais de movimentação; R2 (Risco Médio): Pequenas trincas superficiais sem ameaça imediata à estrutura; R3 (Risco Alto): Trincas pronunciadas em moradias e terreno, árvores inclinadas e escoamento desordenado; R4 (Risco Muito Alto): Iminência de colapso, trincas largas, degraus de abatimento e estalos no maciço. Exige desocupação imediata.',
    tags: ['CPRM', 'IPT', 'Classificação R1-R4', 'Geologia', 'Vulnerabilidade']
  },
  {
    id: 'mo-05',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Por que o Capim Vetiver (Chrysopogon zizanioides) é tão eficiente na bioengenharia de taludes?',
    answer: 'O Capim Vetiver possui raízes verticais massivas que atingem de 3 a 5 metros de profundidade no solo com resistência à tração equivalente a 1/6 do aço doce (75 MPa). Elas ancoram as camadas superficiais de solo no maciço rochoso mais profundo, absorvem grande volume de umidade e não adicionam sobrepeso na crista do talude (diferente de árvores de grande porte).',
    tags: ['Vetiver', 'Bioengenharia', 'Raízes', 'Talude', 'Estabilização']
  },
  {
    id: 'mo-06',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Quais os sinais visuais de alerta precoce que indicam deslizamento iminente em uma encosta?',
    answer: '1) Aparecimento ou alargamento de trincas nas paredes, pisos e no terreno; 2) Inclinação de postes, cercas, muros ou árvores ("efeito bengala"); 3) Empoçamento anormal de água ou surgimento de novas minas d\'água barrenta na base do morro; 4) Portas e janelas que emperram de repente por deformação da estrutura; 5) Sons de estalos no solo ou vegetação rangendo.',
    tags: ['Sinais de Alerta', 'Trincas', 'Degrau de Abatimento', 'Defesa Civil', 'Inspeção']
  },
  {
    id: 'mo-07',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'O que são NUDECs e qual o papel comunitário dessas equipes na prevenção de desastres?',
    answer: 'Os NUDECs (Núcleos Comunitários de Proteção e Defesa Civil) são grupos voluntários formados por moradores locais treinados pela Defesa Civil para: monitorar pluviômetros comunitários, inspecionar sinais de risco nas encostas, orientar os vizinhos nas rotas de fuga e coordenar a chegada aos pontos de encontro e abrigos municipais antes do colapso do talude.',
    tags: ['NUDEC', 'Comunidade', 'Voluntariado', 'Defesa Civil', 'Rotas de Fuga']
  },
  {
    id: 'mo-08',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Como planejar a infraestrutura de abrigos temporários segundo os padrões humanitários internacionais (Manual Esfera)?',
    answer: 'Um abrigo humanitário adequado deve fornecer: 1) Mínimo de 3,5 m² de área coberta por pessoa; 2) Instalações sanitárias segregadas por gênero (1 sanitário para cada 20 pessoas); 3) Água potável tratada (mínimo de 15 litros/pessoa/dia); 4) Alimentação balanceada e suporte médico/psicológico; 5) Acessibilidade para pessoas com deficiência, idosos e espaço seguro para animais domésticos.',
    tags: ['Abrigos', 'Manual Esfera', 'Ajuda Humanitária', 'Sanitários', 'Acolhimento']
  },
  {
    id: 'mo-09',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Por que bananeiras e árvores de raízes superficiais são perigosas no topo de encostas habitadas?',
    answer: 'Bananeiras possuem raízes fasciculadas curtas que não ancoram o solo profundo, retêm enorme quantidade de água no caule (adicionando sobrepeso crítico ao morro) e soltam torrões volumosos quando caem. Devem ser substituídas por gramíneas de raiz profunda (como o Vetiver) e espécies de pequeno porte com canalização de águas.',
    tags: ['Bananeiras', 'Vegetação Inadequada', 'Sobrecarga', 'Encostas', 'Prevenção']
  },
  {
    id: 'mo-10',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Como funcionam os Drenos Sub-horizontais Profundos (DHPs) na engenharia geotécnica?',
    answer: 'Os DHPs são perfurações tubulares de 10 a 30 metros de extensão introduzidas no maciço com leve inclinação ascendente (2° a 5°). Dotados de tubos de PVC perfurados revestidos por manta geotêxtil, eles drenam a água do interior da encosta para a superfície, rebaixando a linha freática e anulando a pressão neutra (poropressão) que desestabiliza o morro.',
    tags: ['DHP', 'Drenagem Profunda', 'Poropressão', 'Lençol Freático', 'Geotecnia']
  },
  {
    id: 'mo-11',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'O que é uma "corrida de massa" (Debris Flow) e por que ela é tão devastadora?',
    answer: 'A corrida de massa é o movimento ultra-rápido de uma mistura fluida de solo saturado, água, troncos de árvores e matacões rochosos ao longo de canais de drenagem naturais (grotas). Com velocidades que podem passar de 40 km/h e densidade muito alta, ela possui força de impacto capaz de destruir edificações de concreto armado em segundos.',
    tags: ['Debris Flow', 'Corrida de Massa', 'Petrópolis', 'Serra do Mar', 'Desastre']
  },
  {
    id: 'mo-12',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Como proteger as moradias contra inundações bruscas no Vale do Taquari (RS)?',
    answer: 'No Vale do Taquari: 1) Zoneamento urbano rigoroso proibindo reconstrução residencial em cotas inferiores à cheia centenária; 2) Implantação de sistema telemétrico de réguas de nível montante com tempo de aviso > 6 horas; 3) Construção de moradias elevadas sobre pilotis de concreto nas áreas de transição; 4) Criação de parques inundáveis de contenção e diques de amortecimento.',
    tags: ['Taquari', 'Inundação Brusca', 'Zoneamento', 'Cota de Inundação', 'Pilotis']
  },
  {
    id: 'mo-13',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Como aplicar os Sistemas Urbanos de Drenagem Sustentável (SUDs) em bairros populosos?',
    answer: 'Os SUDs buscam reter a água na fonte antes que ela sobrecarregue os córregos. Incluem: 1) Pavimentos permeáveis e calçadas drenantes; 2) Jardins de chuva e biovaletas ao longo das vias públicas; 3) Microrreservatórios domiciliares de água de chuva; 4) Telhados verdes para amortecer o pico de escoamento superficial durante tempestades tropicais.',
    tags: ['SUDs', 'Drenagem Sustentável', 'Jardins de Chuva', 'Urbanismo', 'Permeabilidade']
  },
  {
    id: 'mo-14',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Quais cuidados com a instalação elétrica e sanitária devem ser tomados ao retornar para uma casa inundada?',
    answer: '1) NÃO religar o disjuntor principal antes de inspeção técnica dos conduítes e tomadas secos; 2) Descartar todos os alimentos e remédios que tiveram contato com a água da enchente; 3) Lavar e desinfetar pisos e paredes com solução de água sanitária (1 copo para 20L de água) usando luvas e botas para prevenir contaminação por leptospirose; 4) Inspecionar fundações para checar trincas estruturais.',
    tags: ['Retorno Seguro', 'Leptospirose', 'Desinfecção', 'Eletricidade', 'Pós-Inundação']
  },
  {
    id: 'mo-15',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Como funcionam os sensores inclinômetros IoT de baixo custo para monitoramento de morros?',
    answer: 'São pequenos dispositivos instalados em hastes cravadas no talude contendo acelerômetros e giroscópios digitais. Conectados via rede LoRaWAN ou celular 4G, eles medem variações angulares milimétricas do terreno a cada 5 minutos. Se o ângulo de inclinação ultrapassar o limiar de deformação segura, disparam alertas automáticos para a Defesa Civil.',
    tags: ['Inclinômetros', 'IoT', 'LoRaWAN', 'Monitoramento Geotécnico', 'Sensores']
  },
  {
    id: 'mo-16',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'O que é a metodologia do Plano Municipal de Redução de Riscos (PMRR)?',
    answer: 'O PMRR é o instrumento técnico de planejamento municipal que cartografa detalhadamente todas as áreas de risco de encostas e inundações da cidade, quantifica as moradias e habitantes expostos, define a prioridade de intervenção (R1 a R4) e orça as obras necessárias de infraestrutura e reassentamento para orientar investimentos públicos.',
    tags: ['PMRR', 'Planejamento Municipal', 'Mapeamento', 'Orçamento', 'Redução de Riscos']
  },
  {
    id: 'mo-17',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Como mitigar as ilhas de calor urbano em favelas e comunidades densamente habitadas?',
    answer: 'Durante ondas de calor induzidas pelo El Niño: 1) Aplicação de tintas térmicas reflexivas (cool roofs) nos telhados de fibrocimento e zinco; 2) Criação de pontos de hidratação e áreas sombreadas arborizadas com espécies nativas; 3) Ventilação cruzada em edificações; 4) Instalação de aspersores de névoa d\'água comunitários em praças centrais.',
    tags: ['Ilhas de Calor', 'Cool Roofs', 'Telhados', 'Temperatura', 'Comunidades']
  },
  {
    id: 'mo-18',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Qual a função das biomantas e hidrossemeadura no recobrimento de taludes expostos?',
    answer: 'As biomantas de fibra de coco ou palha biodegradável cobrem o solo exposto contra o impacto direto das gotas de chuva (efeito splash), impedindo a formação de sulcos erosivos e ravinas. A hidrossemeadura lança sementes de gramíneas e leguminosas com fertilizantes e fixadores para garantir a rápida regeneração da cobertura vegetal protetora.',
    tags: ['Biomantas', 'Hidrossemeadura', 'Erosão', 'Splash', 'Recobrimento']
  },
  {
    id: 'mo-19',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Como agir no resgate de vítimas de soterramento preservando a segurança da equipe de socorro?',
    answer: '1) Isolar a área e posicionar observadores de segurança (vigias de topo) monitorando nova movimentação do morro com apitos; 2) Desligar redes de energia e gás locais; 3) Utilizar cães de busca, câmeras de fibra óptica e sensores acústicos de escuta geofônica; 4) Realizar escavação manual cuidadosa em camadas, evitando maquinário pesado sobre o cone de soterramento.',
    tags: ['Resgate', 'Soterramento', 'Bombeiros', 'Segurança da Equipe', 'Busca e Salvamento']
  },
  {
    id: 'mo-20',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Qual a importância de cadastrar e identificar a população idosa e PCDs nas rotas de fuga de encostas?',
    answer: 'Pessoas com mobilidade reduzida requerem auxílio imediato no momento do disparo de sirenes. O cadastro prévio georreferenciado permite que equipes de vizinhos do NUDEC e socorristas designados dirijam-se diretamente às residências dessas famílias prioritárias, garantindo evacuação completa dentro da janela de tempo seguro.',
    tags: ['PCDs', 'Idosos', 'Acessibilidade', 'Rotas de Fuga', 'Prioridade']
  },
  {
    id: 'mo-21',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Como a contenção com Muros de Gabião se compara ao Concreto Armado em termos de drenagem?',
    answer: 'Os Muros de Gabião (gaiolas de arame preenchidas com pedras rachão) são estruturas de gravidade altamente flexíveis e 100% drenantes por natureza. A água passa livremente pelos interstícios das pedras sem gerar pressão hidrostática acumulada atrás do muro, sendo ideais para contenções de base de encosta e margens fluviais sujeitas a enxurradas.',
    tags: ['Gabião', 'Drenagem', 'Muro de Gravidade', 'Geotecnia', 'Obras']
  },
  {
    id: 'mo-22',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Como organizar simulados de desocupação preventiva eficazes em comunidades vulneráveis?',
    answer: '1) Realizar oficinas preparatórias explicando o som das sirenes e o ponto de encontro; 2) Simular o disparo surpresa em fins de semana; 3) Cronometrar o tempo total de chegada da última família ao abrigo; 4) Identificar gargalos em becos, escadarias e iluminação de emergência; 5) Promover debriefing com os moradores para aprimorar o plano comunitário.',
    tags: ['Simulados', 'Treinamento', 'Evacuação', 'Comunidade', 'Debriefing']
  },
  {
    id: 'mo-23',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Como a captação e desvio de águas servidas (esgoto domiciliar) protege a encosta contra o colapso?',
    answer: 'O descarte de água de pias, chuveiros e fossas rudimentares diretamente no solo do morro mantém o maciço permanentemente saturado e enfraquece a coesão entre as partículas de solo. A implantação de rede coletora de esgoto e drenagem de águas cinzas é uma das medidas mais baratas e eficazes para manter a encosta estável.',
    tags: ['Esgoto', 'Águas Servidas', 'Saturação', 'Coesão do Solo', 'Saneamento']
  },
  {
    id: 'mo-24',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Qual a responsabilidade legal do poder público municipal na remoção de moradias em áreas R4?',
    answer: 'Segundo a Lei Federal 12.608/2012 e a jurisprudência brasileira, o município tem o dever de interditar e remover habitações em áreas de risco muito alto (R4), oferecendo alternativas habitacionais dignas (reassentamento definitivo ou aluguel social). A omissão administrativa diante de laudos técnicos de risco iminente gera responsabilidade civil e improbidade.',
    tags: ['Lei 12.608', 'Legislação', 'R4', 'Aluguel Social', 'Responsabilidade Pública']
  },
  {
    id: 'mo-25',
    category: 'housing',
    categoryLabel: 'Moradias e Encostas',
    question: 'Como os satélites de radar InSAR do SIMA auxiliam no monitoramento de subsidência e recalque em encostas?',
    answer: 'A interferometria de radar de abertura sintética (InSAR) compara a fase de sinais de micro-ondas captados em passagens orbitais sucessivas, permitindo medir deformações e afundamentos milimétricos (1 a 3 mm) na superfície dos morros muito antes de aparecerem trincas visíveis a olho nu, disparando alertas geológicos antecipados.',
    tags: ['InSAR', 'Radar Orbital', 'Deformação Milimétrica', 'SIMA-SAT', 'Prevenção']
  },

  // ================= TRANSPORTE & LOGÍSTICA (25 ITENS) =================
  {
    id: 'tr-01',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Quais as rotas alternativas para escoamento de grãos e combustíveis na seca da Hidrovia do Rio Madeira?',
    answer: 'Durante a vazante severa do Rio Madeira: 1) Realizar transbordo rodoviário em Porto Velho pela BR-319 até Humaitá ou Manaus; 2) Redirecionar comboios de grãos do Mato Grosso para os portos do Sul/Sudeste (Santos e Paranaguá) pelas ferrovias Malha Norte/Rumo; 3) Escoar cargas pelo corredor da BR-163 até Miritituba/Tapajós e cabotagem por Barcarena/Belém; 4) Alívio de carga nas barcaças (operar com 60% da capacidade de calado).',
    tags: ['Rio Madeira', 'Hidrovia', 'Seca', 'Transbordo', 'BR-319', 'Arco Norte']
  },
  {
    id: 'tr-02',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como funciona o monitoramento geotécnico de taludes rodoviários na Serra das Araras e Serra do Cafezal (BR-116)?',
    answer: 'As concessionárias utilizam: 1) Sensores piezométricos automáticos e inclinômetros contínuos instalados nos taludes rochosos e de solo; 2) Câmeras térmicas e inteligência artificial para detecção de queda de blocos; 3) Barreiras dinâmicas suíças flexíveis capazes de reter energias de impacto de até 5.000 kJ; 4) Gatilhos de interdição preventiva da rodovia quando o índice pluviométrico acumulado ultrapassar 120 mm.',
    tags: ['BR-116', 'Serra das Araras', 'Inclinômetros', 'Barreiras Dinâmicas', 'Taludes']
  },
  {
    id: 'tr-03',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'O que fazer diante do risco de deslizamento no Morro dos Cavalos na BR-101 Sul em Santa Catarina?',
    answer: '1) Interdição preventiva da pista em ambos os sentidos coordenada pela PRF e concessionária ao atingir índice pluviométrico crítico; 2) Acionamento do desvio rodoviário pelas rodovias estaduais SC-281 e BR-282; 3) Ativação da cabotagem marítima de emergência conectando os Portos de Itajaí, Navegantes e Rio Grande; 4) Equipes com escavadeiras hidráulicas e caminhões basculantes pré-posicionados para desobstrução imediata.',
    tags: ['BR-101', 'Morro dos Cavalos', 'Santa Catarina', 'Cabotagem', 'PRF']
  },
  {
    id: 'tr-04',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como proteger pilares de pontes rodoviárias e ferroviárias contra solapamento (Scour) em grandes cheias?',
    answer: '1) Monitorar a profundidade de erosão ao redor das fundações com ecobatímetros subaquáticos fixos e sensores acústicos de solapamento (Scour Sensors); 2) Lançamento de enrocamento de pedras de grande porte (rip-rap) ou colchões de georredes preenchidos com concreto ao redor da base dos pilares; 3) Interdição imediata do tráfego pesado se a cava de erosão atingir o nível das estacas de fundação.',
    tags: ['Pontes', 'Solapamento', 'Scour', 'Enrocamento', 'Fundação']
  },
  {
    id: 'tr-05',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como a dragagem de emergência por sucção contínua garante a navegabilidade em passos críticos amazônicos?',
    answer: 'Dragagens de sucção e recalque escavam canais navegáveis temporários nos bancos de areia formados em curvas de rios (passos do Marmelo, Manicoré, Curicacas e Tabocal). A batimetria multifeixe de alta precisão guia a draga para abrir canais com profundidade mínima de 3,5 metros e largura de 80 metros, permitindo a passagem de comboios de empurradores.',
    tags: ['Dragagem', 'Batimetria', 'Amazônia', 'Navegabilidade', 'Calado']
  },
  {
    id: 'tr-06',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Quais os procedimentos de segurança para transporte de cargas perigosas (combustíveis/químicos) sob intempéries?',
    answer: 'Conforme regulamentação ANTT/CONTRAN: 1) Suspensão mandatória da circulação de veículos com produtos perigosos em rodovias sob tempestades severas ou neblina densa; 2) Recolhimento dos caminhões em pontos de parada e descanso (PPD) seguros e planos; 3) Vistoria em válvulas de alívio e tanques contra contaminação por umidade; 4) Rastreamento telemétrico 24h pela gerenciadora de risco.',
    tags: ['Cargas Perigosas', 'ANTT', 'Combustíveis', 'Segurança Rodoviária', 'Rastreamento']
  },
  {
    id: 'tr-07',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como manter a estabilidade do lastro e do subleito de ferrovias durante chuvas torrenciais?',
    answer: '1) Manter limpos os drenos laterais de plataforma e os bueiros ferroviários; 2) Utilizar mantas geotêxteis entre o subleito e a brita do lastro para impedir a ascensão de finos (bombeamento de finos); 3) Realizar desguarnecimento e socaria mecanizada contínua da brita; 4) Monitorar com vagão de inspeção ultrassônica e acelerômetros para checar geometria da via.',
    tags: ['Ferrovias', 'Lastro', 'Socaria', 'Subleito', 'Drenagem Ferroviária']
  },
  {
    id: 'tr-08',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como funciona a implantação de pontes móveis e passadeiras pelo Exército Brasileiro em desastres?',
    answer: 'A Engenharia do Exército utiliza pontes táticas modulares metálicas (como a Ponte Bailey ou pontes flutuantes M4T6) montadas em prazos de 24 a 72 horas para transpor vãos de até 60 metros sobre rios que destruíram pontes civis, restabelecendo o tráfego de ambulâncias, caminhões com mantimentos e equipes de socorro.',
    tags: ['Ponte Bailey', 'Exército Brasileiro', 'Engenharia Militar', 'Passadeiras', 'Reconexão']
  },
  {
    id: 'tr-09',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como a cabotagem marítima emergencial atua para suprir a Zona Franca de Manaus durante secas históricas?',
    answer: 'Grandes navios porta-contêineres realizam o transbordo das cargas em portos de águas profundas (como Itacoatiara ou Vila do Conde) para balsas de menor calado ou operam com alívio de peso, garantindo que insumos industriais e componentes eletrônicos cheguem às fábricas da ZFM sem interrupção fabril prolongada.',
    tags: ['Cabotagem', 'Manaus', 'ZFM', 'Porta-Contêineres', 'Transbordo']
  },
  {
    id: 'tr-10',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como os Painéis de Mensagem Variável (PMV) e a sinalização inteligente previnem engavetamentos em rodovias?',
    answer: 'Integrados a estações meteorológicas de pista, os PMVs alertam os motoristas a 10 km de distância sobre: trechos alagados, visibilidade nula por neblina ou fumaça, velocidade máxima reduzida obrigatória (ex: 60 km/h) e rotas de desvio antes do pedágio ou entroncamento bloqueado.',
    tags: ['PMV', 'Sinalização Inteligente', 'Engavetamento', 'Rodovias', 'Segurança Viária']
  },
  {
    id: 'tr-11',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Quais regras a Capitania dos Portos (Marinha do Brasil) estabelece para restrição de navegação em estiagens?',
    answer: 'A Marinha emite portarias determinando: 1) Calado máximo autorizado diário para cada trecho da hidrovia com base em réguas linimétricas; 2) Proibição de navegação noturna em passos sinuosos e sem balizamento; 3) Desmembramento obrigatório de comboios de barcaças (ex: de 16 para 4 barcaças por empurrador); 4) Velocidade máxima controlada para evitar encalhes.',
    tags: ['Marinha do Brasil', 'Capitania dos Portos', 'Calado Máximo', 'Portarias', 'Hidrovias']
  },
  {
    id: 'tr-12',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como proteger os túneis rodoviários contra alagamentos e acúmulo de gases em temporais?',
    answer: '1) Instalar bacias de retenção e bombas de drenagem de alto fluxo nos emboques dos túneis; 2) Equipar o túnel com comportas de retenção contra refluxo de rios vizinhos; 3) Manter sistemas de ventilação longitudinal com jatos axiais para extração contínua de monóxido de carbono e fumaça em caso de engarrafamento; 4) Sinalização de fechamento automático com cancelas.',
    tags: ['Túneis', 'Drenagem', 'Ventilação', 'Emboque', 'Segurança']
  },
  {
    id: 'tr-13',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como estruturar pátios de triagem e bolsões de estacionamento para caminhões durante bloqueios de estradas?',
    answer: '1) Desviar caminhões pesados para bolsões localizados antes do trecho serrano conflagrado; 2) Prover os motoristas com banheiros químicos, pontos de água potável, segurança patrimonial e alimentação; 3) Cadastrar os veículos para liberação em comboios escalonados ("operação comboio") assim que a rodovia for desobstruída.',
    tags: ['Pátios de Triagem', 'Bolsões', 'Caminhoneiros', 'Operação Comboio', 'Logística']
  },
  {
    id: 'tr-14',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como o calor extremo afeta o pavimento asfáltico em rodovias e o risco de deformação permanente (trilhas de roda)?',
    answer: 'Altas temperaturas amolecem o ligante asfáltico. Sob a passagem repetida de eixos pesados de caminhões, ocorrem deformações plásticas permanentes (afundamento de trilha de roda), que retêm poças d\'água quando chove e causam aquaplanagem. A solução é utilizar asfaltos modificados por polímero (asfalto borracha) de alto módulo de rigidez.',
    tags: ['Pavimento', 'Trilha de Roda', 'Asfalto Borracha', 'Calor Extremo', 'Deformação']
  },
  {
    id: 'tr-15',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como planejar a logística de transporte de combustível para geradores termelétricos em cidades isoladas pelo El Niño?',
    answer: 'Cidades amazônicas isoladas dependem de diesel para geração de energia. Com rios secos, deve-se: 1) Formar estoques estratégicos para 90 dias antes do início da vazante; 2) Utilizar chatas de fundo chato e pequeno calado (menos de 1,5m); 3) Estabelecer pontes aéreas de emergência com aviões cargueiros da FAB (KC-390 / C-130) para entrega de diesel em tambores homologados.',
    tags: ['Termelétricas', 'Diesel', 'Cidades Isoladas', 'Estoques Estratégicos', 'Amazônia']
  },
  {
    id: 'tr-16',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como operar balsas de travessia veicular em rios com correntezas extremas provocadas por enchentes?',
    answer: '1) Reduzir a lotação máxima de veículos em 30% a 50%; 2) Utilizar rebocadores auxiliares acoplados para contrabalançar o vetor de correnteza; 3) Suspender travessias noturnas ou com velocidade de correnteza superior a 6 nós; 4) Vistoriar cabos de aço e atracadouros flutuantes contra arrasto mecânico.',
    tags: ['Balsas', 'Travessia Fluvial', 'Correnteza', 'Navegação', 'Segurança']
  },
  {
    id: 'tr-17',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'O que é a tecnologia de monitoramento de encostas rodoviárias por Fibra Óptica Sensoriada (DTS/DAS)?',
    answer: 'Cabos de fibra óptica enterrados ao longo da rodovia funcionam como milhares de sensores contínuos. Variações na refração da luz laser enviada pelo cabo detectam microdeformações do solo, vibrações mecânicas anômalas e infiltrações térmicas de água, alertando a sala de controle da concessionária sobre deslocamentos antes que a encosta caia sobre a pista.',
    tags: ['Fibra Óptica', 'DTS/DAS', 'Sensoriamento Contínuo', 'Concessionárias', 'Inovação']
  },
  {
    id: 'tr-18',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como gerenciar o aumento dos custos de frete e seguros de carga sob cláusulas de Força Maior climática?',
    answer: '1) Contratar apólices de seguro com cobertura estendida para desvios de rota e lucros cessantes decorrentes de eventos climáticos; 2) Incluir cláusulas contratuais de repactuação tarifária para rotas alternativas; 3) Utilizar sistemas de roteamento dinâmico que calculam o menor custo logístico total ponderado pelo risco de retenção.',
    tags: ['Frete', 'Seguro de Cargas', 'Força Maior', 'Roteamento Dinâmico', 'Contratos']
  },
  {
    id: 'tr-19',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como atuar no desatrelamento de vagões e desobstrução de pátios ferroviários alagados?',
    answer: '1) Não tentar tracionar locomotivas diesel-elétricas com motores de tração submersos (risco de queima elétrica irreversível); 2) Isolar desvios e travessias atingidas por erosão do leito; 3) Posicionar guindastes rodoferroviários para remoção de material tombado; 4) Usar bombas de alta vazão para rebaixar o lençol d\'água no pátio de manobras.',
    tags: ['Pátio Ferroviário', 'Locomotivas', 'Alagamento', 'Manobras', 'Desobstrução']
  },
  {
    id: 'tr-20',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como a batimetria multifeixe 3D em tempo real previne acidentes com encalhe de comboios fluviais?',
    answer: 'Embarcações hidrográficas balizadoras equipadas com sonar multifeixe varrem o leito do rio e geram cartas náuticas digitais em 3D atualizadas diariamente. Essas cartas são transmitidas via satélite diretamente aos computadores de bordo dos empurradores, mostrando os canais mais profundos e evitando bancos de areia móveis.',
    tags: ['Batimetria Multifeixe', 'Cartas Náuticas', 'Sonar 3D', 'Encalhe', 'Navegação Segura']
  },
  {
    id: 'tr-21',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Qual o papel do DNIT na decretação de emergência em rodovias federais afetadas pelo El Niño?',
    answer: 'O DNIT emite Termos Circunstanciados de Emergência que autorizam a contratação direta imediata (sem licitação tradicional) de empresas de engenharia pesada para obras de reconstrução de pontes, contenção de encostas e recuperação de pavimentos danificados, reduzindo os prazos burocráticos de meses para dias.',
    tags: ['DNIT', 'Emergência', 'Obras Rápidas', 'Contratação Direta', 'Rodovias Federais']
  },
  {
    id: 'tr-22',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como evitar acidentes com animais silvestres em rodovias sob queimadas e desastres climáticos?',
    answer: 'Durante secas e queimadas, animais fogem em direção às rodovias. Medidas: 1) Instalação de cercas condutoras para passagens subterrâneas de fauna; 2) Sinalização luminosa reforçada e redução de velocidade nos trechos de mata contígua; 3) Resgate de animais feridos por brigadas veterinárias pré-mobilizadas.',
    tags: ['Fauna', 'Passagem Subterrânea', 'Queimadas', 'Sinalização', 'Meio Ambiente']
  },
  {
    id: 'tr-23',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como a manutenção de bueiros e passagens de água sob rodovias impede o rompimento da pista?',
    answer: 'Se um bueiro fica entupido por galhos e lixo durante uma tempestade, a água se acumula a montante formando uma represa artificial contra o aterro da rodovia. A pressão hidrostática liquefaz o aterro e causa o rompimento catastrófico da pista ("corte de estrada"). Inspeções e limpezas prévias evitam 90% dessas ocorrências.',
    tags: ['Bueiros', 'Aterro', 'Rompimento de Pista', 'Drenagem Transversal', 'Manutenção']
  },
  {
    id: 'tr-24',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Como integrar os sistemas de rastreamento de frotas com os alertas meteorológicos em tempo real?',
    answer: 'As centrais de gerenciamento de risco conectam suas APIs de telemetria à base do SIMA e Defesa Civil. Quando um caminhão cruza um polígono georreferenciado sob alerta vermelho de inundação ou deslizamento, o motorista recebe aviso sonoro no painel orientando a parada no posto mais próximo.',
    tags: ['Geofencing', 'Telemetria', 'Rastreamento', 'API', 'Alertas Automáticos']
  },
  {
    id: 'tr-25',
    category: 'transport',
    categoryLabel: 'Transporte e Logística',
    question: 'Qual a importância de manter um banco de dados de rotas de contingência intermodais homologadas?',
    answer: 'Quando uma via crítica é interditada, não há tempo para pesquisar rotas do zero. O banco de dados intermodal do SIMA já armazena rotas alternativas com limites de peso por eixo, gabarito de pontes e postos de combustível, permitindo ativar desvios logísticos em menos de 15 minutos.',
    tags: ['Intermodalidade', 'Rotas de Contingência', 'Gabarito', 'Banco de Dados', 'Agilidade']
  },

  // ================= METEOROLOGIA, SATÉLITES & SIMA-SAT 1 (15 ITENS) =================
  {
    id: 'met-01',
    category: 'meteorology',
    categoryLabel: 'Meteorologia e Satélites',
    question: 'Como o radar SAR Banda-L do satélite SIMA-SAT 1 enxerga através de nuvens e chuva torrencial?',
    answer: 'O radar de abertura sintética (SAR) em Banda-L opera na faixa de micro-ondas com comprimento de onda longo (cerca de 23 cm). Diferente de sensores ópticos e multiespectrais que são bloqueados por nuvens, a Banda-L penetra na atmosfera, atravessa a copa densa das árvores e reflete na lâmina d\'água ou no solo, permitindo imageamento perfeito de dia ou de noite, sob qualquer condição climática.',
    tags: ['SAR', 'Banda-L', 'SIMA-SAT 1', 'Micro-ondas', 'Penetração']
  },
  {
    id: 'met-02',
    category: 'meteorology',
    categoryLabel: 'Meteorologia e Satélites',
    question: 'O que é o índice Oceanic Niño Index (ONI) e como ele classifica a intensidade do El Niño?',
    answer: 'O ONI mede a anomalia na Média Trimestral Móvel da Temperatura da Superfície do Mar (SST) na região Niño 3.4 do Oceano Pacífico Equatorial. Classificação: Fraco (+0.5°C a +0.9°C), Moderado (+1.0°C a +1.4°C), Forte (+1.5°C a +1.9°C) e Muito Forte/Super El Niño (acima de +2.0°C), este último associado a desastres climáticos históricos no Brasil.',
    tags: ['ONI', 'Niño 3.4', 'SST', 'Temperatura Oceânica', 'Classificação']
  },
  {
    id: 'met-03',
    category: 'meteorology',
    categoryLabel: 'Meteorologia e Satélites',
    question: 'Por que o El Niño provoca chuvas extremas no Sul do Brasil e seca severa no Norte e Nordeste?',
    answer: 'O aquecimento anômalo do Pacífico Equatorial altera a Célula de Walker e a Célula de Hadley, deslocando a Corrente de Jato Subtropical sobre o Sul do Brasil (o que bloqueia frentes frias e provoca chuvas torrenciais contínuas), enquanto intensifica a subsidência atmosférica (ar seco descendente) sobre a Amazônia e o semiárido nordestino, inibindo a formação de nuvens de chuva.',
    tags: ['Célula de Walker', 'Hadley', 'Jato Subtropical', 'Sul vs Norte', 'Circulação Atmosférica']
  },
  {
    id: 'met-04',
    category: 'meteorology',
    categoryLabel: 'Meteorologia e Satélites',
    question: 'Como funciona o Satellite Tasking (programação de varredura orbital prioritária) no SIMA-SAT 1?',
    answer: 'O operador envia comandos para reorientar a antena do radar SAR do satélite durante o sobrevoo da região conflagrada (modo Spotlight HD com resolução de 1,2m ou modo Stripmap amplo). Os dados brutos são transmitidos via downlink para a estação de recepção do INPE em Cuiabá e processados em menos de 20 minutos por algoritmos de inteligência artificial.',
    tags: ['Satellite Tasking', 'Spotlight HD', 'INPE Cuiabá', 'Downlink', 'Telemetria']
  },
  {
    id: 'met-05',
    category: 'meteorology',
    categoryLabel: 'Meteorologia e Satélites',
    question: 'O que são os "Rios Atmosféricos" e qual sua relação com inundações históricas no Brasil?',
    answer: 'São faixas estreitas e concentradas de enorme umidade atmosférica transportada pelos ventos da bacia amazônica em direção ao Centro-Sul do Brasil (Jato de Baixos Níveis - JBN). Quando interceptados por relevos como a Serra do Mar ou frentes frias estacionárias, despejam centenas de milímetros de chuva em poucas horas.',
    tags: ['Rios Atmosféricos', 'JBN', 'Umidade', 'Serra do Mar', 'Chuva Torrencial']
  },
  {
    id: 'met-06',
    category: 'meteorology',
    categoryLabel: 'Meteorologia e Satélites',
    question: 'Como os sensores no infravermelho de ondas curtas (SWIR) monitoram queimadas e secas amazônicas?',
    answer: 'Sensores SWIR captam a radiação emitida em comprimentos de onda sensíveis à queima de biomassa e à perda de umidade nas folhas da floresta, permitindo detectar focos de calor mesmo sob densas camadas de fumaça e mapear o recuo da lâmina de água de rios e igarapés.',
    tags: ['SWIR', 'Queimadas', 'Focos de Calor', 'Seca Amazônica', 'Sensoriamento Remoto']
  },
  {
    id: 'met-07',
    category: 'meteorology',
    categoryLabel: 'Meteorologia e Satélites',
    question: 'O que é a Constelação Heliosíncrona e qual a sua vantagem no monitoramento de desastres?',
    answer: 'Satélites em órbita heliosíncrona passam sobre a mesma latitude no mesmo horário solar local todos os dias, garantindo iluminação solar consistente (para sensores ópticos) e ciclos regulares de revisita para comparação temporal precisa de áreas alagadas ou encostas movimentadas.',
    tags: ['Órbita Heliosíncrona', 'Revisita', 'Constelação', 'Monitoramento Temporal', 'Satélites']
  },
  {
    id: 'met-08',
    category: 'meteorology',
    categoryLabel: 'Meteorologia e Satélites',
    question: 'Como a modelagem numérica de previsão do tempo WRF/CPTEC é integrada ao SIMA?',
    answer: 'O modelo de mesoescala WRF gera grades de previsão de precipitação e vento a cada 3 km de resolução para as próximas 72 horas. Esses dados alimentam a matriz de alerta do SIMA, disparando pré-avisos de mobilização antes mesmo do início da chuva.',
    tags: ['WRF', 'CPTEC', 'Previsão Numérica', 'Mesoescala', 'Antecipação']
  },
  {
    id: 'met-09',
    category: 'meteorology',
    categoryLabel: 'Meteorologia e Satélites',
    question: 'O que é uma maré meteorológica (ressaca do mar) e como ela dificulta o escoamento de rios litorâneos?',
    answer: 'Ventos fortes associados a ciclones extratropicais empurram a massa de água oceânica contra a costa (empilhamento de água), elevando o nível do mar. Essa sobre-elevação bloqueia a foz de rios e canais de drenagem urbana (como no Guaíba ou Baixada Santista), impedindo que as águas pluviais escoem e agravando inundações.',
    tags: ['Maré Meteorológica', 'Ressaca', 'Ciclone Extratropical', 'Drenagem Costeira', 'Guaíba']
  },
  {
    id: 'met-10',
    category: 'meteorology',
    categoryLabel: 'Meteorologia e Satélites',
    question: 'Como o produto de satélite de Umidade do Solo por Micro-ondas (SMAP) alerta para risco de cheias?',
    answer: 'Satélites como o SMAP medem a constante dielétrica dos primeiros centímetros de solo. Quando a saturação atinge mais de 85% a 90%, o solo perde a capacidade de infiltração, fazendo com que 100% da chuva subsequente vire escoamento superficial instantâneo, gerando enxurradas.',
    tags: ['SMAP', 'Umidade do Solo', 'Infiltração', 'Escoamento Superficial', 'Enxurrada']
  },
  {
    id: 'met-11',
    category: 'meteorology',
    categoryLabel: 'Meteorologia e Satélites',
    question: 'Qual a função das Ondas de Kelvin oceânicas na iniciação do fenômeno El Niño?',
    answer: 'O enfraquecimento dos ventos alísios no Pacífico Ocidental gera ondas de Kelvin submarinas que viajam para o leste ao longo da termoclina, aprofundando a camada de água quente nas costas da América do Sul e bloqueando a ressurgência de águas frias, dando início ao ciclo do El Niño.',
    tags: ['Ondas de Kelvin', 'Termoclina', 'Ventos Alísios', 'Oceanografia', 'Início do El Niño']
  },
  {
    id: 'met-12',
    category: 'meteorology',
    categoryLabel: 'Meteorologia e Satélites',
    question: 'Como interpretar um ecocentro de tempestade (Hook Echo) no radar meteorológico?',
    answer: 'O Hook Echo (eco em forma de gancho) é a assinatura clássica de um mesociclone em rotação dentro de uma supercélula tempestuosa. Ele indica altíssima probabilidade de ventos destrutivos (downbursts), granizo gigante e potencial de formação de tornados na região sul e sudeste.',
    tags: ['Hook Echo', 'Supercélula', 'Mesociclone', 'Tornado', 'Radar Doppler']
  },
  {
    id: 'met-13',
    category: 'meteorology',
    categoryLabel: 'Meteorologia e Satélites',
    question: 'Como o índice de refletividade do radar (dBZ) é correlacionado com a intensidade da chuva?',
    answer: 'dBZ < 30: Chuva fraca a moderada; 30 a 45 dBZ: Chuva moderada a forte; 45 a 55 dBZ: Chuva torrencial com risco de alagamentos imediatos; > 55 dBZ: Tempestade severa com queda iminente de granizo e rajadas violentas de vento.',
    tags: ['dBZ', 'Refletividade', 'Intensidade da Chuva', 'Radar', 'Meteorologia']
  },
  {
    id: 'met-14',
    category: 'meteorology',
    categoryLabel: 'Meteorologia e Satélites',
    question: 'Como a inteligência artificial do SIMA detecta desvios térmicos oceânicos antes dos relatórios convencionais?',
    answer: 'A IA do SIMA processa continuamente séries temporais de radiômetros orbitais da NOAA/NASA com redes neurais que identificam padrões anômalos de acoplamento oceano-atmosfera semanas antes da consolidação dos boletins climáticos tradicionais.',
    tags: ['IA', 'Redes Neurais', 'NOAA', 'Detecção Precoce', 'SST']
  },
  {
    id: 'met-15',
    category: 'meteorology',
    categoryLabel: 'Meteorologia e Satélites',
    question: 'Qual a diferença entre o El Niño Canônico e o El Niño Modoki?',
    answer: 'O El Niño Canônico concentra o aquecimento máximo nas águas do Pacífico Leste (próximo ao Peru e Equador). O El Niño Modoki concentra o aquecimento no Pacífico Central, gerando padrões de teleconexão climática distintos no Brasil, por vezes deslocando o centro das secas e chuvas intensas.',
    tags: ['El Niño Modoki', 'Pacífico Central', 'Teleconexões', 'Climatologia', 'Padrões']
  },

  // ================= DEFESA CIVIL, LEGISLAÇÃO & PLANCON (15 ITENS) =================
  {
    id: 'dc-01',
    category: 'civil_defense',
    categoryLabel: 'Defesa Civil e Normas',
    question: 'Como é estruturado um Plano de Contingência (PLANCON) segundo a Lei Federal 12.608/2012?',
    answer: 'O PLANCON define formalmente: 1) Hipóteses de desastre e cenários de risco com mapas temáticos; 2) Sistema de monitoramento, alerta e alarme com limiares de acionamento; 3) Matriz de responsabilidade dos órgãos envolvidos (RACI); 4) Ações de socorro, assistência humanitária e restabelecimento de serviços essenciais; 5) Mapeamento de rotas de fuga e abrigos cadastrados.',
    tags: ['PLANCON', 'Lei 12.608', 'Estrutura', 'Defesa Civil', 'Normas']
  },
  {
    id: 'dc-02',
    category: 'civil_defense',
    categoryLabel: 'Defesa Civil e Normas',
    question: 'Qual a diferença entre Situação de Emergência (SE) e Estado de Calamidade Pública (ECP)?',
    answer: 'Situação de Emergência (SE): Ocorrência de danos e prejuízos que comprometem parcialmente a capacidade de resposta do poder público local, necessitando de apoio complementar estadual/federal. Estado de Calamidade Pública (ECP): Danos de grande porte que superam integralmente a capacidade financeira e operacional do município, exigindo intervenção e recursos federais massivos imediatos.',
    tags: ['Situação de Emergência', 'Calamidade Pública', 'Decreto', 'S2iD', 'Legislação']
  },
  {
    id: 'dc-03',
    category: 'civil_defense',
    categoryLabel: 'Defesa Civil e Normas',
    question: 'Como cadastrar e solicitar recursos federais através do Sistema Integrado de Informações sobre Desastres (S2iD)?',
    answer: '1) O município preenche o Formulário de Informações do Desastre (FIDE) relatando danos humanos, materiais e ambientais com fotos georreferenciadas; 2) Anexa o Decreto Municipal de Emergência ou Calamidade; 3) Solicita o reconhecimento federal à Secretaria Nacional de Proteção e Defesa Civil (SEDEC); 4) Submete os Planos de Trabalho para liberação de verbas de socorro e reconstrução.',
    tags: ['S2iD', 'FIDE', 'SEDEC', 'Verbas Federais', 'Reconstrução']
  },
  {
    id: 'dc-04',
    category: 'civil_defense',
    categoryLabel: 'Defesa Civil e Normas',
    question: 'Quais as regras da nova Lei de Licitações (Lei 14.133/2021) para contratações emergenciais sem licitação?',
    answer: 'O Art. 75, VIII, da Lei 14.133/2021 autoriza a dispensa de licitação para obras e serviços destinados ao atendimento de emergência ou calamidade. Regras: o contrato deve limitar-se aos bens e serviços estritamente necessários para afastar o perigo iminente e ter prazo máximo improrrogável de até 1 ano.',
    tags: ['Lei 14.133', 'Dispensa de Licitação', 'Contratação Emergencial', 'Jurídico', 'Compras']
  },
  {
    id: 'dc-05',
    category: 'civil_defense',
    categoryLabel: 'Defesa Civil e Normas',
    question: 'Como funciona a governança em uma Sala de Crise integrada (CICC / CIGERD)?',
    answer: 'Reúne sob o Sistema de Comando de Incidentes (ICS/SCI) os líderes da Defesa Civil, Bombeiros, Polícia Rodoviária, Concessionárias, Operadores de Aeroportos, Saúde e Assistência Social. O Comandante do Incidente estabelece Objetivos Operacionais para períodos de 12h a 24h, garantindo comunicação unificada e evitando duplicidade de ações.',
    tags: ['CICC', 'CIGERD', 'Comando de Incidentes', 'SCI', 'Governança']
  },
  {
    id: 'dc-06',
    category: 'civil_defense',
    categoryLabel: 'Defesa Civil e Normas',
    question: 'Como comunicar o risco à população sem gerar pânico desnecessário?',
    answer: '1) Usar linguagem simples, direta e empática, evitando jargões técnicos; 2) Fornecer instruções acionáveis e claras (ex: "Leve documentos e remédios para o Ginásio Municipal pela Rua X"); 3) Utilizar apenas canais oficiais certificados; 4) Desmentir fake news nas primeiras horas com porta-vozes únicos e credenciados.',
    tags: ['Comunicação de Risco', 'Transparência', 'Combate a Fake News', 'Empatia', 'Clareza']
  },
  {
    id: 'dc-07',
    category: 'civil_defense',
    categoryLabel: 'Defesa Civil e Normas',
    question: 'Como organizar a triagem e distribuição logística de doações em grandes enchentes?',
    answer: '1) Concentrar doações em Centros de Distribuição Logística (armazéns amplos fora da área alagada); 2) Priorizar itens de primeira necessidade: água mineral, cestas básicas lacradas, kits de higiene pessoal e colchões; 3) Separar roupas por tamanho e gênero antes do envio aos abrigos; 4) Implementar controle de estoque por código de barras.',
    tags: ['Doações', 'Logística Humanitária', 'Triagem', 'Voluntariado', 'Assistência Social']
  },
  {
    id: 'dc-08',
    category: 'civil_defense',
    categoryLabel: 'Defesa Civil e Normas',
    question: 'Qual o papel das Forças Armadas em operações de Garantia da Lei e da Ordem (GLO) ou apoio em desastres?',
    answer: 'As Forças Armadas fornecem: helicópteros de resgate com guincho (SAR), hospitais de campanha com leitos de UTI, estações móveis de purificação de água potável, pontes flutuantes, aeronaves cargueiras para pontes aéreas de suprimentos e policiamento de áreas evacuadas contra saques.',
    tags: ['Forças Armadas', 'Apoio Humanitário', 'Hospital de Campanha', 'Purificação de Água', 'GLO']
  },
  {
    id: 'dc-09',
    category: 'civil_defense',
    categoryLabel: 'Defesa Civil e Normas',
    question: 'Como cuidar da saúde mental e estresse pós-traumático de socorristas e vítimas de desastres?',
    answer: '1) Implantar equipes de psicólogos de emergência nos abrigos; 2) Realizar sessões de descompressão psicológica (Defusing e Debriefing) para bombeiros e voluntários ao fim de cada turno; 3) Criar espaços de recreação infantil nos abrigos para reduzir o estresse das crianças; 4) Manter rotinas de descanso obrigatórias para equipes de campo.',
    tags: ['Saúde Mental', 'Estresse Pós-Traumático', 'Psicologia de Desastres', 'Acolhimento', 'Socorristas']
  },
  {
    id: 'dc-10',
    category: 'civil_defense',
    categoryLabel: 'Defesa Civil e Normas',
    question: 'Como calcular o Retorno sobre Investimento (ROI) de obras preventivas contra o El Niño?',
    answer: 'Estudos do Banco Mundial e da ONU mostram que cada R$ 1,00 investido em prevenção, drenagem e alerta precoce economiza de R$ 7,00 a R$ 10,00 em custos futuros de reconstrução, perda de vidas, paralisação de fábricas e socorro emergencial, comprovando a alta viabilidade econômica da resiliência.',
    tags: ['ROI', 'Economia da Prevenção', 'Banco Mundial', 'Investimento', 'Resiliência']
  },
  {
    id: 'dc-11',
    category: 'civil_defense',
    categoryLabel: 'Defesa Civil e Normas',
    question: 'Qual a responsabilidade legal de prefeitos e governadores por negligência em áreas de risco mapeadas?',
    answer: 'Gestores públicos que, cientes de laudos técnicos de risco iminente (R4), não adotam providências de alerta ou evacuação respondem por crime de prevaricação, homicídio culposo e improbidade administrativa, além de responderem a ações civis públicas indenizatórias movidas pelo Ministério Público.',
    tags: ['Responsabilidade Legal', 'Improbidade', 'Ministério Público', 'Prefeitos', 'Omissão']
  },
  {
    id: 'dc-12',
    category: 'civil_defense',
    categoryLabel: 'Defesa Civil e Normas',
    question: 'Como garantir a conformidade com a LGPD no tratamento de dados de cidadãos cadastrados em alertas?',
    answer: 'Os números de telefone, endereços e cadastros de vulnerabilidade coletados para envio de alertas da Defesa Civil são tratados com base legal no Art. 7º, VII da LGPD (proteção da vida e da incolumidade física), com uso estritamente restrito à finalidade pública de emergência e armazenamento criptografado.',
    tags: ['LGPD', 'Proteção de Dados', 'Privacidade', 'Finalidade Pública', 'Segurança']
  },
  {
    id: 'dc-13',
    category: 'civil_defense',
    categoryLabel: 'Defesa Civil e Normas',
    question: 'O que é o Fundo Nacional para Calamidades Públicas (FUNCAP) e como ele é acessado?',
    answer: 'O FUNCAP é um fundo federal de natureza contábil destinado a financiar ações de prevenção de desastres e reconstrução de infraestruturas públicas danificadas, acessado por estados e municípios mediante apresentação de planos de trabalho aprovados pela Defesa Civil Nacional.',
    tags: ['FUNCAP', 'Fundo de Calamidade', 'Financiamento Público', 'Prevenção', 'SEDEC']
  },
  {
    id: 'dc-14',
    category: 'civil_defense',
    categoryLabel: 'Defesa Civil e Normas',
    question: 'Como realizar a gestão e acolhimento de animais de estimação e de grande porte em desastres?',
    answer: '1) Cadastrar animais com coleiras numeradas vinculadas ao responsável do abrigo; 2) Montar alojamentos veterinários temporários contíguos aos abrigos humanos; 3) Resgatar animais ilhados com barcos infláveis de piso rígido e gaiolas de contenção; 4) Fornecer vacinação anti-rábica e vermifugação imediata.',
    tags: ['Animais', 'Resgate Veterinário', 'Abrigo Pet', 'Bem-Estar Animal', 'Zoonoses']
  },
  {
    id: 'dc-15',
    category: 'civil_defense',
    categoryLabel: 'Defesa Civil e Normas',
    question: 'Qual a importância de um Relatório Pós-Ação (Lições Aprendidas) após a passagem do El Niño?',
    answer: 'O Relatório Pós-Ação documenta os acertos operacionais, os pontos de falha nos canais de comunicação, os custos reais incorridos e a precisão dos modelos de previsão, permitindo calibrar os limiares de alarme para os próximos ciclos climáticos e atualizar o PLANCON municipal.',
    tags: ['Lições Aprendidas', 'Pós-Ação', 'Melhoria Contínua', 'Calibração', 'Planejamento']
  }
];

export function searchAdvisorKnowledge(query: string): AdvisorEntry[] {
  const cleanQ = query.toLowerCase().trim();
  if (!cleanQ) return ADVISOR_KNOWLEDGE_BASE.slice(0, 8);

  const keywords = cleanQ.split(/\s+/).filter(k => k.length > 2);

  const scored = ADVISOR_KNOWLEDGE_BASE.map(entry => {
    let score = 0;
    const qLower = entry.question.toLowerCase();
    const aLower = entry.answer.toLowerCase();
    const tagsLower = entry.tags.join(' ').toLowerCase();

    if (qLower.includes(cleanQ)) score += 50;
    if (aLower.includes(cleanQ)) score += 20;

    keywords.forEach(kw => {
      if (qLower.includes(kw)) score += 10;
      if (tagsLower.includes(kw)) score += 8;
      if (aLower.includes(kw)) score += 3;
    });

    return { entry, score };
  });

  return scored
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.entry);
}
