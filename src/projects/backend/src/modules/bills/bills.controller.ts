import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { queryClient } from '../@shared/lib/database/client'
import { FaturaRepository } from '../@shared/repositories/fatura.repository'

interface BillsQuery {
  searchTerm?: string
  page?: number
  pageSize?: number
}

export default async function billsController(server: FastifyInstance) {
  server.get(
    '/api/v1/bills',
    async (request: FastifyRequest<{ Querystring: BillsQuery }>, reply: FastifyReply) => {
      const { searchTerm = '', page = 1, pageSize = 32 } = request.query

      const faturaRepository = new FaturaRepository(queryClient)

      const faturas = await faturaRepository.findAll({
        searchTerm,
        page: Number(page),
        pageSize: Number(pageSize)
      })

      const totalFaturas = await faturaRepository.count({ searchTerm })

      return reply.send({
        pagination: {
          total: totalFaturas,
          page: Number(page),
          pageSize: Number(pageSize)
        },
        data: faturas
      })
    }
  )
}
