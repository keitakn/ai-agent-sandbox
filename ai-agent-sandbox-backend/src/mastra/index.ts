import { Mastra } from "@mastra/core/mastra";
import { LibSQLStore } from "@mastra/libsql";
import { PinoLogger } from "@mastra/loggers";
import { weatherAgent } from "./agents/weather-agent";
import { weatherWorkflow } from "./workflows/weather-workflow";
import { chatRoute } from "@mastra/ai-sdk";

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  storage: new LibSQLStore({
    // stores telemetry, evals, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  server: {
    apiRoutes: [
      chatRoute({
        path: "/chat",               // ← Mastra が公開するAI SDK v5互換エンドポイント
        agent: "weatherAgent",       // ← あなたのエージェントID
      }),
    ],
  },
});
