import { config as loadEnv } from 'dotenv'
import { z } from 'zod'

import tryParseEnv from './tryParseEnv'

// Ensure .env is loaded before validation (Nuxt may evaluate config before loading .env during build)
loadEnv()

const EnvSchema = z.object({
  NUXT_PUBLIC_API_BASE_URL: z.httpUrl(),
  NUXT_PUBLIC_IMAGE_DOMAIN: z
    .string()
    .min(1)
    .regex(
      /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/,
      'Must be a valid hostname without protocol or path',
    ),
  NUXT_PUBLIC_APP_ENV: z.enum(['development', 'production']),
  NUXT_PUBLIC_SITE_URL: z.httpUrl(),
})

export type EnvSchema = z.infer<typeof EnvSchema>

tryParseEnv(EnvSchema)

export default EnvSchema.parse(process.env)
