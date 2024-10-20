import type { PrismaClient } from '@prisma/client'
import type { FindAllDTO, CreateFaturaDTO, UpdateFaturaDTO } from '../dto/fatura.dto'

export class FaturaRepository {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async findAll({ searchTerm, page = 1, pageSize = 100 }: FindAllDTO) {
    const skip = (page - 1) * pageSize

    if (!searchTerm) {
      return await this.prisma.fatura.findMany({
        skip,
        take: pageSize,
        orderBy: { data_de_referencia: 'desc' }
      })
    }

    return await this.prisma.fatura.findMany({
      skip,
      take: pageSize,
      orderBy: { data_de_referencia: 'desc' },
      where: {
        OR: [
          { numero_do_cliente: { contains: searchTerm } },
          { numero_da_instalacao: { contains: searchTerm } },
          { file_fingerprint: { contains: searchTerm } }
        ]
      }
    })
  }

  async count({ searchTerm }: { searchTerm?: string }) {
    if (!searchTerm) {
      return await this.prisma.fatura.count()
    }
    return await this.prisma.fatura.count({
      where: {
        OR: [
          { numero_do_cliente: { contains: searchTerm } },
          { numero_da_instalacao: { contains: searchTerm } },
          { file_fingerprint: { contains: searchTerm } }
        ]
      }
    })
  }

  async findById(id: string) {
    return await this.prisma.fatura.findUnique({
      where: { id }
    })
  }

  async findByFingerprint(fingerprint: string) {
    return await this.prisma.fatura.findUnique({
      where: { file_fingerprint: fingerprint }
    })
  }

  async delete(id: string) {
    return await this.prisma.fatura.delete({
      where: { id }
    })
  }

  async create(dtoInput: CreateFaturaDTO) {
    return this.prisma.fatura.create({ data: dtoInput })
  }

  async update(id: string, dtoInput: UpdateFaturaDTO) {
    return this.prisma.fatura.update({
      where: { id },
      data: dtoInput
    })
  }
}
