export interface BuildFastifyAppOptions {
  logger?: boolean | object
  http?: {
    jwtSecret?: string
    corsOrigin?: string
  }
}

export interface ConsumptionHistoric {
  [year: string]: {
    [month: string]: {
      consumption: number
      kwhPerDay: number
      days: number
    }
  }
}

export interface LumiPdfParserOutput {
  numero_do_cliente: string
  numero_da_instalacao: string
  energia_eletrica_kwh: number
  energia_eletrica_valor: number
  energia_sceee_sem_icms_kwh: number
  energia_sceee_sem_icms_valor: number
  energia_compensada_gd_kwh: number
  energia_compensada_gd_valor: number
  contrib_ilum_publica_municipal: number
  url_chave_acesso: string
  chave_de_acesso: string
  historico_de_consumo: string
  valor_boleto: number
  data_de_referencia: string
  data_de_vencimento: string
  data_de_emissao: string
}

export interface FileService {
  saveFile(filePath: string, fileData: Buffer | string): Promise<void>
  readFile(filePath: string): Promise<Buffer>
  deleteFile(filePath: string): Promise<void>
}

export interface GetEnergyDataForChartOutput {
  dataDeReferencia: Date
  consumoEnergiaEletrica: number
  energiaCompensadaKwh: number
}

export interface GetFinancesDataForChartOutput {
  dataDeReferencia: Date
  energiaEletricaValor: number
  energiaSceeeSemIcmsValor: number
}

export interface GetOverviewControllerOutput {
  consumoEnergiaEletrica: number
  valorTotalSemGd: number
  energiaCompensadaKwh: number
  economiaGd: number
  chartEnergia: GetEnergyDataForChartOutput[]
  chartFinanceiro: GetFinancesDataForChartOutput[]
}
