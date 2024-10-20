import type { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify'
import z from 'zod'

export default async function healthRoute(server: FastifyInstance) {
  server.get(
    '/api/v1/healthcheck',
    async (_request: FastifyRequest, reply: FastifyReply) => {
      const memory = process.memoryUsage()
      const uptime = process.uptime() * 1000
      const stats = [
        {
          uptime: uptime
        },
        {
          rss: memory.rss,
          external: memory.external,
          heapUsed: memory.heapUsed,
          heapTotal: memory.heapTotal
        }
      ]

      return reply.send({ stats, status: true, when: new Date() })
    }
  )
}
