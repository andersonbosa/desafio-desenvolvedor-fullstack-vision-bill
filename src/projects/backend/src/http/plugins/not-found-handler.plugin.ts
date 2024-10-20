import fp from 'fastify-plugin'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

async function plugin(server) {
  server.setNotFoundHandler((request, reply) => {
    request.log.error({
      message: `Route ${request.method}:${request.url} not found`,
      code: 'HTTP_404',
      name: ReasonPhrases.NOT_FOUND
    })

    return reply.code(StatusCodes.NOT_FOUND).send({
      statusCode: StatusCodes.NOT_FOUND,
      message: 'Not Found'
    })
  })
}

export default fp(plugin, {
  name: 'notFoundHandler'
})
