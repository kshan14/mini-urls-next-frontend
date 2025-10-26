import { z } from "zod";

const envSchema = z.object({
  API_BASE_URL: z.url().min(1, "API_BASE_URL is required"),
  JWT_SECRET_KEY: z.string().nonempty("JWT_SECRET_KEY is required"),
  WS_BASE_URL: z.url().min(1, "WS_BASE_URL is required"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .nonoptional("NODE_ENV is required"),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function getEnv(): EnvConfig {
  try {
    const env = {
      API_BASE_URL: process.env.API_BASE_URL,
      JWT_SECRET_KEY: atob(process.env.JWT_SECRET_KEY ?? ""),
      WS_BASE_URL: process.env.WS_BASE_URL,
      NODE_ENV: process.env.NODE_ENV,
    };
    return envSchema.parse(env);
  } catch (err) {
    throw err;
  }
}

// initiate singleton instance
const env = getEnv();

export default env;
