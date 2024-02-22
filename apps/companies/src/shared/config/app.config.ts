import { z } from 'zod';

export const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'verbose', 'debug', 'silly']),

  SERVER_HOST: z.string().min(1),
  SERVER_PORT: z.string().min(1),

  APPLICATION_SERVICE_URL: z.string().min(1),

  PG_USER: z.string().min(1),
  PG_PASSWORD: z.string().min(1),
  PG_HOST: z.string().min(1),
  PG_PORT: z.string().min(1),
  PG_DATABASE: z.string().min(1),
});

export type Config = z.infer<typeof configSchema>;

export const config = (config: Record<string, unknown>): Config => {
  return configSchema.parse(config);
};
