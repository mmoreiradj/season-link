import { z } from 'zod';

export const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'verbose', 'debug', 'silly']),

  SERVER_HOST: z.string().min(1),
  SERVER_PORT: z.string().min(1),

  APPLICATION_SERVICE_URL: z.string().min(1),

  DATABASE_URL: z.string().min(1),
});

export type Config = z.infer<typeof configSchema>;

export const config = (config: Record<string, unknown>): Config => {
  return configSchema.parse(config);
};

export enum ConfigEnum {
  NODE_ENV = 'NODE_ENV',
  LOG_LEVEL = 'LOG_LEVEL',

  SERVER_HOST = 'SERVER_HOST',
  SERVER_PORT = 'SERVER_PORT',

  APPLICATION_SERVICE_URL = 'APPLICATION_SERVICE_URL',

  DATABASE_URL = 'DATABASE_URL',
}
