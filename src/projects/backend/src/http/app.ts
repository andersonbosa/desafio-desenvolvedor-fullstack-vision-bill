import autoload from '@fastify/autoload'
import Fastify, { type FastifyInstance, type FastifyServerOptions } from 'fastify'
import type { BuildFastifyAppOptions } from '../@types'

import {
  type ZodTypeProvider,
  serializerCompiler,
  validatorCompiler
} from 'fastify-type-provider-zod'

import { EnvConfig } from '../config/env'

import { join } from 'node:path'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'

export function buildFastifyApp(options?: BuildFastifyAppOptions): FastifyInstance {
  const appConfig: FastifyServerOptions = {
    logger: options?.logger ?? false
  }

  const app = Fastify(appConfig).withTypeProvider<ZodTypeProvider>()
  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.decorate('env', EnvConfig)

  app.register(fastifyHelmet)

  app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute'
  })

  app.register(autoload, {
    dir: join(__dirname, 'plugins'),
    encapsulate: false,
    ignorePattern: /.*(test|spec).ts/
  })

  app.register(autoload, {
    dir: join(__dirname, '..', 'modules'),
    dirNameRoutePrefix: false,
    maxDepth: 3,
    indexPattern: /.*\.controller.ts$/
  })

  return app
}
