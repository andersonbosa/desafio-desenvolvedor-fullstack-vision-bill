export interface EnergyChartDataItem {
  dataDeReferencia: string
  energiaEletricaValor: number
  energiaSceeeSemIcmsValor: number
}
export interface FinanceChartDataItem {
  dataDeReferencia: string
  energiaEletricaValor: number
  energiaSceeeSemIcmsValor: number
}

export interface DashboardData {
  consumoEnergiaEletrica: number
  valorTotalSemGd: number
  energiaCompensadaKwh: number
  economiaGd: number
  chartEnergia: EnergyChartDataItem[]
  chartFinanceiro: FinanceChartDataItem[]
}

export interface GetFaturasDataItem {
  id: string
  file_fingerprint: string
  numero_do_cliente: string
  numero_da_instalacao: string
  valor_boleto: number
  data_de_referencia: string
  url_chave_acesso: string
  chave_de_acesso: string
}

export interface GetFaturasDataPagination {
  total: number
  page: number
  pageSize: number
}

export interface GetFaturasData {
  pagination: GetFaturasDataPagination
  data: GetFaturasDataItem[]
}
