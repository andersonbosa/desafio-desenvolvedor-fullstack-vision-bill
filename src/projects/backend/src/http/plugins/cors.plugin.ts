import fp from 'fastify-plugin'
import cors from '@fastify/cors'

async function plugin(server) {
  server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'HEAD', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin'
    ]
  })
}

export default fp(plugin, {
  name: 'cors'
})
