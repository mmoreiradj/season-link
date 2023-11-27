import zod from 'zod';

const configSchema = zod.object({
  kc: zod.object({
    baseUrl: zod.string().url(),
    realm: zod.string(),
    clientId: zod.string(),
  }),
  api: zod.object({
    baseUrl: zod.string().url(),
  }),
});

type Config = zod.infer<typeof configSchema>;

const config: Config = configSchema.parse({
  kc: {
    baseUrl: process.env.EXPO_PUBLIC_KC_BASE_URL,
    realm: process.env.EXPO_PUBLIC_KC_REALM,
    clientId: process.env.EXPO_PUBLIC_KC_CLIENT_ID,
  },
  api: {
    baseUrl: process.env.EXPO_PUBLIC_API_BASE_URL,
  },
});

export default config;
