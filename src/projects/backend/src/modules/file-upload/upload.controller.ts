import path from 'node:path'
import { ApiError } from '@/http/errors'
import multipart from '@fastify/multipart'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

import { CreateFaturaSchema } from '../@shared/dto/fatura.dto'
import { queryClient } from '../@shared/lib/database/client'
import { FaturaRepository } from '../@shared/repositories/fatura.repository'
import { StorageRepository } from '../@shared/repositories/storage.repository'
import { FileFingerprintGenerator } from '../@shared/services/file-fingerprint-generator/file-fingerprint-generator'
import { FileManagerService } from '../@shared/services/file-manager/file-manager'
import { parsePdfFile } from './pdf-parser.service'

export default async function healthRoute(server: FastifyInstance) {
  server.register(multipart)
  server.post(
    '/api/v1/file/upload',
    {},
    // DONE create basic structure to parse file
    async (request: FastifyRequest, reply: FastifyReply) => {
      /* NOTE future enhancement: allow upload of multiple files same time */
      const file = await request.file()
      if (!file) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'No file uploaded')
      }

      if (file.mimetype !== 'application/pdf') {
        throw new ApiError(StatusCodes.UNSUPPORTED_MEDIA_TYPE, ReasonPhrases.UNSUPPORTED_MEDIA_TYPE)
      }

      const buffer = await file.toBuffer()

      // DONE create fingerprint of the file: dont recreate if it already uploaded
      const fingerprint = new FileFingerprintGenerator({
        filename: file.filename,
        encoding: file.encoding,
        mimetype: file.mimetype,
        byteLength: buffer.byteLength
      }).generate()

      const faturaRepository = new FaturaRepository(queryClient)

      const sameFileAlreadyUpload = await faturaRepository.findByFingerprint(fingerprint)
      if (sameFileAlreadyUpload) {
        return reply.status(StatusCodes.OK).send({
          message: 'File already uploaded.',
          fileId: sameFileAlreadyUpload.id,
          fingerprint
        })
      }

      // DONE define Output object of parsedData (review test info)
      const parsedData = await parsePdfFile(buffer)

      // DONE persist parsed data on database
      const createDto = CreateFaturaSchema.parse({
        file_fingerprint: fingerprint,
        numero_do_cliente: parsedData.numero_do_cliente,
        numero_da_instalacao: parsedData.numero_da_instalacao,
        energia_eletrica_kwh: parsedData.energia_eletrica_kwh,
        energia_eletrica_valor: parsedData.energia_eletrica_valor,
        energia_sceee_sem_icms_kwh: parsedData.energia_sceee_sem_icms_kwh,
        energia_sceee_sem_icms_valor: parsedData.energia_sceee_sem_icms_valor,
        energia_compensada_gd_kwh: parsedData.energia_compensada_gd_kwh,
        energia_compensada_gd_valor: parsedData.energia_compensada_gd_valor,
        contrib_ilum_publica_municipal: parsedData.contrib_ilum_publica_municipal,
        url_chave_acesso: parsedData.url_chave_acesso,
        chave_de_acesso: parsedData.chave_de_acesso,
        historico_de_consumo: parsedData.historico_de_consumo,
        valor_boleto: parsedData.valor_boleto,
        data_de_referencia: parsedData.data_de_referencia,
        data_de_vencimento: parsedData.data_de_vencimento,
        data_de_emissao: parsedData.data_de_emissao
      })

      const createdResource = await faturaRepository.create(createDto)

      // DONE persist file on disk where fingerprint is the filename
      const fileAbsoluteDirPath = path.resolve(__dirname, '../../../data/uploads')
      new StorageRepository(new FileManagerService()).saveFile(
        `${fileAbsoluteDirPath}/${fingerprint}`,
        buffer
      )

      // DONE return fileId to user query the parsed Data throught API
      return reply.status(StatusCodes.CREATED).send({
        message: 'File uploaded successfully.',
        fileId: createdResource.id,
        fingerprint,
        parsedData
      })
    }
  )
}
