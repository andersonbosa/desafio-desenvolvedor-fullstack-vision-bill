import path from 'node:path'
import { createReadStream } from 'node:fs'
import { ApiError } from '@/http/errors'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { queryClient } from '../@shared/lib/database/client'
import { FaturaRepository } from '../@shared/repositories/fatura.repository'
import { StorageRepository } from '../@shared/repositories/storage.repository'
import { FileManagerService } from '../@shared/services/file-manager/file-manager'

export default async function fileDownloadController(server: FastifyInstance) {
  server.get(
    '/api/v1/file/download/:fileId',
    async (
      request: FastifyRequest<{ Params: { fileId: string } }>,
      reply: FastifyReply
    ) => {
      const { fileId } = request.params
      if (!fileId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'Missing fileId')
      }

      const faturaRepository = new FaturaRepository(queryClient)

      const fatura = await faturaRepository.findById(fileId)
      if (!fatura) {
        throw new ApiError(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND)
      }

      const fileAbsoluteDirPath = path.resolve(__dirname, '../../../data/uploads')
      const filePath = `${fileAbsoluteDirPath}/${fatura.file_fingerprint}`

      const storageRepository = new StorageRepository(new FileManagerService())

      const fileExists = await storageRepository.fileExists(filePath)
      if (!fileExists) {
        throw new ApiError(
          StatusCodes.NOT_FOUND,
          'File not found on disk. Contact customer support.'
        )
      }

      const dataStream = createReadStream(filePath)
      return reply.type('application/pdf').send(dataStream)
    }
  )
}
