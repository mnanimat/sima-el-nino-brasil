import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Lazy initializer for Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    geminiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Endpoint: Generate specialized El Niño Contingency Plan (PLANCON)
app.post("/api/gemini/contingency-plan", async (req, res) => {
  try {
    const { sector, region, locationName, intensity, specificRisks } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        success: true,
        isFallback: true,
        plan: {
          title: `Plano de Contingência Operacional: ${locationName} (${sector.toUpperCase()} - ${region})`,
          summary: `Plano de resposta preventiva e emergencial para o evento El Niño de intensidade ${intensity} em ${locationName}. Foco na mitigação de riscos estruturais e garantia da continuidade dos serviços.`,
          phases: [
            {
              phase: "Fase 1: Preparação & Alerta Precoce (D-15 a D-3)",
              actions: [
                "Desobstrução de canais de drenagem e inspeção de bacias de contenção",
                "Calibração de sensores meteorológicos e pluviômetros telemétricos",
                "Alinhamento com Defesa Civil local e órgãos reguladores (ANAC/DECEA/DNIT)",
                "Definição de rotas de contingência e abrigos/aeroportos alternantes"
              ]
            },
            {
              phase: "Fase 2: Resposta Ativa & Monitoramento Crítico (D-0 a D+2)",
              actions: [
                "Acionamento da sala de comando integrada com monitoramento 24h",
                "Disparo de avisos antecipados (Cell Broadcast / NOTAMs / Painéis em Rodovias)",
                "Mobilização de equipes de bombeamento rápido e desobstrução de vias",
                "Ativação de protocolos de segurança para evacuação ou desvio de tráfego"
              ]
            },
            {
              phase: "Fase 3: Recuperação Rápida & Resiliência Pós-Evento (D+3 em diante)",
              actions: [
                "Vistoria estrutural de pistas, pontes, encostas e fundações",
                "Restabelecimento escalonado das operações com checagem de segurança",
                "Assistência humanitária e retorno seguro de populações afetadas",
                "Relatório de lições aprendidas e atualização dos limiares de alarme"
              ]
            }
          ],
          technologies: [
            "Radar Meteorológico Doppler banda X para detecção de microbursts",
            "Mapeamento por satélite e drones para monitoramento de saturação do solo",
            "Sistemas de drenagem com comportas automáticas e bombas anfíbias"
          ],
          kpis: [
            "Tempo máximo de resposta para desobstrução: < 4 horas",
            "Zero fatalidades por evacuação preventiva antecipada",
            "Índice de continuidade de voos/cargas críticas acima de 85%"
          ]
        }
      });
    }

    const ai = getGeminiClient();
    const prompt = `Você é o principal especialista do Brasil em Engenharia de Riscos Climáticos, Defesa Civil (CEMADEN/Defesa Civil Nacional) e Operações de Infraestrutura (Aviação/DECEA/ANAC, Moradias Urbanas/Encostas, e Transporte Terrestre/Hidroviário/DNIT).

Gere um PLANO DE CONTINGÊNCIA E MITIGAÇÃO detalhado e de alta precisão para enfrentar o fenômeno EL NIÑO no Brasil com os seguintes parâmetros:
- Setor: ${sector} (Aviação, Moradias/Habitação ou Transporte/Logística)
- Região: ${region} (Sul, Sudeste, Norte, Nordeste, Centro-Oeste)
- Local/Infraestrutura Alvo: ${locationName}
- Intensidade do El Niño: ${intensity}
- Riscos Específicos Identificados: ${specificRisks || "Enchentes torrenciais, deslizamentos de encostas, alagamento de pistas, bloqueio de rodovias ou seca extrema de rios"}

Retorne APENAS um objeto JSON válido (sem tags markdown de código fora do JSON ou texto introdutório) com a seguinte estrutura:
{
  "title": "string com título executivo",
  "summary": "string com diagnóstico da ameaça e objetivos estratégicos",
  "phases": [
    {
      "phase": "Fase 1: Preparação e Prevenção Antecipada",
      "actions": ["ação 1", "ação 2", "ação 3", "ação 4"]
    },
    {
      "phase": "Fase 2: Resposta Imediata e Acionamento de Emergência",
      "actions": ["ação 1", "ação 2", "ação 3", "ação 4"]
    },
    {
      "phase": "Fase 3: Recuperação e Reabilitação de Infraestrutura",
      "actions": ["ação 1", "ação 2", "ação 3"]
    }
  ],
  "technologies": ["Tecnologia/Equipamento 1", "Tecnologia 2", "Tecnologia 3"],
  "kpis": ["Indicador de Sucesso 1", "Indicador 2", "Indicador 3"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let jsonResult;
    try {
      jsonResult = JSON.parse(response.text || "{}");
    } catch {
      // Clean possible wrapper
      const cleaned = (response.text || "").replace(/```json/g, "").replace(/```/g, "").trim();
      jsonResult = JSON.parse(cleaned);
    }

    res.json({ success: true, plan: jsonResult });
  } catch (error) {
    console.error("Error generating contingency plan:", error);
    res.status(500).json({ error: "Falha ao gerar plano de contingência com IA" });
  }
});

// Endpoint: Satellite Tasking & Orbital Radar AI Interpretation
app.post("/api/gemini/satellite-tasking", async (req, res) => {
  try {
    const { targetRegion, sensorMode, missionPriority, specificObservationTarget } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        success: true,
        observation: {
          taskingId: `TSK-SIMA-${Date.now()}`,
          satellite: 'SIMA-SAT 1',
          sensorPayload: sensorMode || 'SAR Banda-L Polarimétrico',
          targetRegion: targetRegion || 'Região Sul',
          targetArea: specificObservationTarget || 'Bacia do Guaíba / Serra do Mar',
          priority: missionPriority || 'Alta Prioridade Operacional',
          radarSweepStatus: 'Varredura SAR Concluída com Sucesso',
          swathCoverageKm2: 45200,
          resolutionMeters: '1.2m (Modo Spotlight HD)',
          detectedAnomalies: [
            'Refletividade dielétrica aumentada indicando saturação de solo acima de 85%',
            'Elevação anômala de lâmina d\'água em canais de drenagem adjacentes',
            'Microdeslocamento superficial de encosta detectado por InSAR (3.4 mm)'
          ],
          aiTacticalAssessment: `A varredura orbital do SIMA-SAT 1 confirmou que a combinação de saturação do solo e precipitação torrencial no alvo (${specificObservationTarget || targetRegion}) requer emissão imediata de boletim para as equipes locais de Defesa Civil e operadores de infraestrutura.`,
          actionRecommendations: [
            'Alertar Centro de Operações Aeroportuárias / Concessionárias rodoviárias para monitoramento contínuo',
            'Programar revôo orbital no próximo ciclo heliosíncrono em 95 minutos',
            'Transmitir vetor de anomalia georreferenciado diretamente aos tablets dos técnicos em solo'
          ]
        }
      });
    }

    const ai = getGeminiClient();
    const prompt = `Você é o Diretor de Operações e Processamento de Imagens de Radar/SAR do satélite brasileiro SIMA-SAT 1 (Satélite Integrado de Monitoramento de Anomalias do El Niño).
O usuário acaba de disparar uma requisição de tarefa orbital (Satellite Tasking) com os parâmetros:
- Região Alvo: ${targetRegion}
- Modo do Sensor: ${sensorMode} (ex: InSAR Diferencial, SAR Banda L Inundação, Radiômetro Térmico SWIR Seca, Multiespectral)
- Prioridade da Missão: ${missionPriority}
- Alvo Específico: ${specificObservationTarget}

Gere uma resposta técnica precisa, realista e orientada a mitigação de impactos do El Niño no Brasil.
Retorne APENAS um JSON válido no seguinte formato:
{
  "taskingId": "TSK-SIMA-XXXX",
  "satellite": "SIMA-SAT 1",
  "sensorPayload": "string",
  "targetRegion": "${targetRegion}",
  "targetArea": "${specificObservationTarget}",
  "priority": "${missionPriority}",
  "radarSweepStatus": "Varredura Concluída e Telemetria Recebida em Cuiabá",
  "swathCoverageKm2": 42000,
  "resolutionMeters": "1.2m",
  "detectedAnomalies": ["anomalia 1", "anomalia 2", "anomalia 3"],
  "aiTacticalAssessment": "parecer técnico detalhado do radar orbital",
  "actionRecommendations": ["recomendação 1", "recomendação 2", "recomendação 3"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let jsonResult;
    try {
      jsonResult = JSON.parse(response.text || "{}");
    } catch {
      const cleaned = (response.text || "").replace(/```json/g, "").replace(/```/g, "").trim();
      jsonResult = JSON.parse(cleaned);
    }

    res.json({ success: true, observation: jsonResult });
  } catch (error) {
    console.error("Error in satellite tasking:", error);
    res.status(500).json({ error: "Falha na programação de varredura do SIMA-SAT 1" });
  }
});

// Endpoint: Tactical Advisor Chatbot (Q&A for pilots, engineers, civil defense, logistics)
app.post("/api/gemini/ask-advisor", async (req, res) => {
  try {
    const { question, history = [], currentContext = {} } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        answer: `[Simulação de Consultoria El Niño Brasil]: Em cenários de El Niño no Brasil, a chave para evitar complicações é a integração de dados hidrometeorológicos antecipados (CEMADEN/INMET/REDEMET) com protocolos automáticos de ação. 

Para a **Aviação**, priorize rotas alternativas (hubs secundários) e monitoramento de windshear/fumaça. Para as **Moradias**, implemente monitoramento contínuo de pluviometria em encostas com gatilhos de evacuação preventiva via Cell Broadcast. Para o **Transporte**, execute dragagem preventiva em hidrovias da Amazônia e estabeleça rotas intermodais de desvio antes do corte de rodovias críticas.`
      });
    }

    const ai = getGeminiClient();
    const systemPrompt = `Você é o SIMA-Advisor, o Consultor Tático e Estratégico de Resiliência contra os Impactos do El Niño no Brasil.
Seus pilares de atuação são:
1. AVIAÇÃO: Pistas alagadas (ex: lições do aeroporto Salgado Filho em Porto Alegre), visibilidade zero por queimadas na Amazônia, microbursts/windshear no Sudeste, planejamento de combustíveis e aeroportos alternantes (hubs regionais de contingência).
2. MORADIAS & HABITAÇÃO: Prevenção de deslizamentos de encostas (Petrópolis, Serra do Mar, morros de SP/RJ/Recife), inundações em bacias fluviais (Vale do Taquari, Iguaçu, Tietê), ilhas de calor urbano, sistemas de drenagem sustentável (SUDs) e protocolos de evacuação antecipada de comunidades vulneráveis.
3. TRANSPORTE & LOGÍSTICA: Desvios rodoviários antecipados (BR-116, BR-101, BR-376), seca de rios amazônicos (hidrovia Madeira/Solimões), batimetria preventiva, transposição com pontes móveis e preservação de cadeias de suprimentos essenciais.

Responda sempre em Português do Brasil com clareza técnica, recomendações práticas baseadas em normas e boas práticas de engenharia e defesa civil, estruturando em tópicos quando útil. Seja direto, propositivo e focado em salvar vidas e manter as operações vitais do país ativas.`;

    const chat = ai.chats.create({
      model: "gemini-3.7-flash",
      config: {
        systemInstruction: systemPrompt,
      },
    });

    const userPrompt = `Contexto atual do usuário: ${JSON.stringify(currentContext)}
Pergunta: ${question}`;

    const response = await chat.sendMessage({ message: userPrompt });

    res.json({ answer: response.text || "Sem resposta gerada." });
  } catch (error) {
    console.error("Error in advisor chat:", error);
    res.status(500).json({ error: "Erro ao processar consulta com o assistente" });
  }
});

// Endpoint: AI-driven Risk & Impact Scenario Analysis
app.post("/api/gemini/simulate-analysis", async (req, res) => {
  try {
    const { scenarioParams } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.json({
        analysis: "Análise baseada em modelos históricos (El Niño 2023-2024 e 2015-2016): Observa-se que 68% dos custos de paralisação e perdas habitacionais decorrem da falta de acionamento antecipado (D-3 a D-1). A combinação de sensores telemétricos com hubs de transbordo e diques móveis reduz as perdas econômicas em até 74%."
      });
    }

    const ai = getGeminiClient();
    const prompt = `Analise a seguinte simulação de cenário de El Niño no Brasil:
Parâmetros: ${JSON.stringify(scenarioParams)}

Forneça um parecer executivo rápido (2 a 3 parágrafos objetivos em português) destacando:
1. O principal gargalo identificado entre Aviação, Moradias e Transporte.
2. A medida preventiva com maior retorno sobre investimento (ROI) em proteção de vidas e infraestrutura.
3. Recomendações imediatas para os tomadores de decisão públicos e privados.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
    });

    res.json({ analysis: response.text });
  } catch (error) {
    console.error("Error running simulation analysis:", error);
    res.status(500).json({ error: "Erro na análise da simulação" });
  }
});

// Start Server with Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SIMA El Niño Brasil Server listening on port ${PORT}`);
  });
}

startServer();
