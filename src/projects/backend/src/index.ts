import { EnvConfig } from './config/env'
import { server } from './http/server'

server.listen(
  {
    port: EnvConfig.HTTP_PORT,
    host: EnvConfig.HTTP_HOST
  },
  (err: Error | null, _address: string) => {
    if (err) {
      server.log.error(err)
      process.exit(1)
    }
  }
)

if (EnvConfig.NODE_ENV === 'production') {
  const listeners = ['SIGINT', 'SIGTERM']
  // biome-ignore lint/complexity/noForEach: <explanation>
  listeners.forEach((signal) => {
    process.on(signal, async () => {
      console.log(`Receiveid ${signal} signal. Gracefully shutting down...`)
      await server.close()
      process.exit(0)
    })
  })
}
