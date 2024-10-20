import fp from 'fastify-plugin'
import JWT from '@fastify/jwt'
// import { authenticationHook } from '../hooks/authentication.hook'

async function plugin(server: any) {
  server.register(JWT, {
    secret: server.env.JWT_SECRET
  })

  // server.addHook('onRequest', authenticationHook)
}

export default fp(plugin, {
  name: 'authenticate',
  dependencies: ['cors']
})
