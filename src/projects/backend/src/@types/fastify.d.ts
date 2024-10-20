import type { EnvConfigSchema } from '@/config/env'

import 'fastify'

declare module 'fastify' {
  interface FastifyRequest {
    user: any // TODO define user structure decoded from JWT
  }

  interface FastifyInstance {
    env: z.infer<typeof EnvConfigSchema>
  }
}
