// import { dirname } from 'node:path'
// const __dirname = dirname(__filename)

import { config } from 'dotenv'
config({
  path: 'config/env/.env',
  debug: true
})

import { z } from 'zod'

export const EnvConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  HTTP_PORT: z.coerce.number().default(3000),
  HTTP_HOST: z.string().default('0.0.0.0'),
  JWT_SECRET: z.string().min(32),
  POSTGRES_URL: z.string()
})

const EnvConfig = EnvConfigSchema.parse(process.env)

export { EnvConfig }
