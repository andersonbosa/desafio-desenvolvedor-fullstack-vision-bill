'use client'

import { EnergyChart } from '@/components/charts/energy-chart'
import { FinanceChart } from '@/components/charts/finance-chart'
import { Overview } from '@/components/overview'
import { Skeleton } from '@/components/ui/skeleton'
import { getDashboardData } from '@/lib/data-fetching'
import type { DashboardData } from '@/lib/types'
import { useEffect, useState } from 'react'
import { ResponsiveContainer } from 'recharts'

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)

  useEffect(() => {
    getDashboardData()
      .then((data) => {
        setDashboardData(data)
      })
      .catch((error) => {
        console.error('Error when fetching data:', error)
      })
  }, [])

  return (
    <>
      <ResponsiveContainer width="100%" height="100vh">
        <div>
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>

            <Overview
              consumoEnergiaEletrica={dashboardData?.consumoEnergiaEletrica}
              valorTotalSemGd={dashboardData?.valorTotalSemGd}
              energiaCompensadaKwh={dashboardData?.energiaCompensadaKwh}
              economiaGd={dashboardData?.economiaGd}
            />

            <div className="flex  md:flex-col gap-4">
              <div className="flex-1">
                {dashboardData?.chartEnergia && dashboardData?.chartEnergia.length > 0 ? (
                  <>
                    <EnergyChart chartData={dashboardData?.chartEnergia} />
                  </>
                ) : (
                  <>
                    <div className="flex flex-col space-y-3 h-[400px]">
                      <Skeleton className="h-full w-full rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex-1">
                {dashboardData?.chartFinanceiro && dashboardData?.chartFinanceiro.length > 0 ? (
                  <>
                    <FinanceChart chartData={dashboardData?.chartFinanceiro} />
                  </>
                ) : (
                  <>
                    <div className="flex flex-col space-y-3 h-[400px]">
                      <Skeleton className="h-full w-full rounded-xl" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <br />
        </div>
      </ResponsiveContainer>
    </>
  )
}
