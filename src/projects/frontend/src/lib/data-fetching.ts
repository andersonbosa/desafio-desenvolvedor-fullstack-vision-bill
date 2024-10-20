import { apiClientV1 } from './server-api-client'
import type { DashboardData, GetFaturasData } from './types'

export const getDashboardData = async (): Promise<DashboardData | null> => {
  try {
    const { data } = await apiClientV1.get('/overview')
    return data?.data || null
  } catch (error) {
    console.error('Error getting dashboard data:', error)
    throw error
  }
}

export const getFaturasData = async (
  query: string,
  currentPage = 1
): Promise<GetFaturasData | null> => {
  try {
    const { data } = await apiClientV1.get(`/bills`, {
      params: {
        searchTerm: query,
        page: currentPage
      }
    })

    return data || null
  } catch (error) {
    console.error('Error getting bills data:', error)
    throw error
  }
}

export const getFaturaFileUrlById = async (id: string): Promise<string> => {
  return `${apiClientV1.getUri()}/file/download/${id}`
}
