import fp from 'fastify-plugin'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

async function plugin(server) {
  server.setErrorHandler((error, request, reply) => {
    const statusCode = error.statusCode || 500

    request.log.error({
      message: error.message,
      type: error.type,
      code: error.code,
      name: error.name,
      severity: error.severity,
      stack: error.stack // TODO remove in development
    })

    const errorMessage =
      statusCode === StatusCodes.INTERNAL_SERVER_ERROR
        ? ReasonPhrases.INTERNAL_SERVER_ERROR
        : error.message

    return reply.code(statusCode).send({
      statusCode: statusCode,
      message: errorMessage
    })
  })
}

export default fp(plugin, {
  name: 'errorHandler'
})
