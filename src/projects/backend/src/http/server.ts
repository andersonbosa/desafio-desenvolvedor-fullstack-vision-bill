import { EnvConfig } from '../config/env'
import { buildFastifyApp } from './app'

const server = buildFastifyApp({
  http: {
    jwtSecret: EnvConfig.JWT_SECRET,
    corsOrigin: '*'
  },
  logger:
    process.env.NODE_ENV !== 'production'
      ? {
          transport: {
            target: 'pino-pretty',
            level: 'debug',
            options: {
              colorize: true,
              translateTime: 'HH:MM:ss Z',
              ignore: 'pid,hostname'
            }
          }
        }
      : true
})

export { server }
