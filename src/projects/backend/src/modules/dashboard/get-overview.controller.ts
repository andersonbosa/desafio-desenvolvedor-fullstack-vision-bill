import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { queryClient } from '../@shared/lib/database/client'
import type {
  GetEnergyDataForChartOutput,
  GetFinancesDataForChartOutput,
  GetOverviewControllerOutput
} from '@/@types'
import { toSixDecimals } from '@/utils'

interface GetAggregateSumsOutput {
  energia_eletrica_kwh: number
  energia_eletrica_valor: number
  energia_sceee_sem_icms_kwh: number
  energia_sceee_sem_icms_valor: number
  contrib_ilum_publica_municipal: number
  energia_compensada_gd_kwh: number
  energia_compensada_gd_valor: number
}

async function getAggregateSums(): Promise<GetAggregateSumsOutput> {
  const { _sum } = await queryClient.fatura.aggregate({
    _sum: {
      energia_eletrica_kwh: true,
      energia_eletrica_valor: true,
      energia_sceee_sem_icms_kwh: true,
      energia_sceee_sem_icms_valor: true,
      contrib_ilum_publica_municipal: true,
      energia_compensada_gd_kwh: true,
      energia_compensada_gd_valor: true
    }
  })

  const requiredSums =
    _sum.energia_eletrica_kwh &&
    _sum.energia_eletrica_valor &&
    _sum.energia_sceee_sem_icms_kwh &&
    _sum.energia_sceee_sem_icms_valor &&
    _sum.contrib_ilum_publica_municipal &&
    _sum.energia_compensada_gd_kwh &&
    _sum.energia_compensada_gd_valor

  if (!requiredSums) {
    throw new Error('Missing data in database')
  }

  return _sum as GetAggregateSumsOutput
}

async function getEnergyDataForChart(): Promise<GetEnergyDataForChartOutput[]> {
  const energyData = await queryClient.fatura.findMany({
    select: {
      energia_eletrica_kwh: true,
      energia_sceee_sem_icms_kwh: true,
      energia_compensada_gd_kwh: true,
      data_de_referencia: true
    },
    orderBy: {
      data_de_referencia: 'asc'
    },
    take: 100
  })

  return energyData.map((data) => ({
    dataDeReferencia: data.data_de_referencia,
    energiaCompensadaKwh: toSixDecimals(data.energia_compensada_gd_kwh),
    consumoEnergiaEletrica: toSixDecimals(
      data.energia_eletrica_kwh + data.energia_sceee_sem_icms_kwh
    )
  }))
}

async function getFinancesDataForChart(): Promise<GetFinancesDataForChartOutput[]> {
  const financesData = await queryClient.fatura.findMany({
    select: {
      energia_eletrica_valor: true,
      energia_sceee_sem_icms_valor: true,
      data_de_referencia: true
    },
    orderBy: {
      data_de_referencia: 'asc'
    },
    take: 100
  })

  return financesData.map((data) => ({
    dataDeReferencia: data.data_de_referencia,
    energiaEletricaValor: data.energia_eletrica_valor,
    energiaSceeeSemIcmsValor: data.energia_sceee_sem_icms_valor
  }))
}

export default async function getOverviewController(server: FastifyInstance) {
  server.get('/api/v1/overview', async (_request: FastifyRequest, reply: FastifyReply) => {
    const sums = await getAggregateSums()

    const consumoEnergiaEletrica = toSixDecimals(
      sums.energia_eletrica_kwh + sums.energia_sceee_sem_icms_kwh
    )

    const energiaCompensadaKwh = toSixDecimals(sums.energia_compensada_gd_kwh)
    const economiaGd = toSixDecimals(sums.energia_compensada_gd_valor)

    const valorTotalSemGd = toSixDecimals(
      sums.energia_eletrica_valor +
        sums.energia_sceee_sem_icms_valor +
        sums.contrib_ilum_publica_municipal
    )

    const chartEnergia = await getEnergyDataForChart()
    const chartFinanceiro = await getFinancesDataForChart()

    const data: GetOverviewControllerOutput = {
      consumoEnergiaEletrica,
      valorTotalSemGd,
      energiaCompensadaKwh,
      economiaGd,
      chartEnergia,
      chartFinanceiro
    }

    return reply.send({ data })
  })
}
