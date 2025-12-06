import { z } from "zod";

const envSchema = z.object({
  API_BASE_URL: z.url().min(1, "API_BASE_URL is required").optional(),
  JWT_SECRET_KEY: z.string().nonempty("JWT_SECRET_KEY is required"),
  WS_BASE_URL: z.url().min(1, "WS_BASE_URL is required"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .nonoptional("NODE_ENV is required"),
});

export type EnvConfig = z.infer<typeof envSchema>;

function getEnv(): EnvConfig {
  return envSchema.parse({
    API_BASE_URL: process.env.API_BASE_URL ?? "http://localhost:8080",
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    WS_BASE_URL:
      process.env.WS_BASE_URL ?? "ws://localhost:8080/api/miniurls/ws",
    NODE_ENV: process.env.NODE_ENV,
  });
}

let cachedEnv: EnvConfig | null = null;

export default function env() {
  if (!cachedEnv) {
    cachedEnv = getEnv();
  }
  return cachedEnv;
}
