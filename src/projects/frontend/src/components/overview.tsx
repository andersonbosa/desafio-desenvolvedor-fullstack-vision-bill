'use client'

import { ResponsiveContainer } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { formatNumberToRealMoney } from '@/lib/utils'

interface OverviewProps {
  consumoEnergiaEletrica: number | undefined
  valorTotalSemGd: number | undefined
  energiaCompensadaKwh: number | undefined
  economiaGd: number | undefined
}

export const Overview: React.FC<OverviewProps> = (props) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(1, 1fr)',
          gap: '8px'
        }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consumo de energia</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-end items-end">
            {props?.consumoEnergiaEletrica ? (
              <div className="text-2xl font-bold"> {props.consumoEnergiaEletrica} kWh </div>
            ) : (
              <Skeleton className="h-4 w-full" />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Energia compensada</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-end items-end">
            {props?.energiaCompensadaKwh ? (
              <div className="text-2xl font-bold"> {props.energiaCompensadaKwh} kWh </div>
            ) : (
              <Skeleton className="h-4 w-full" />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total sem GD</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-end items-end">
            {props?.valorTotalSemGd ? (
              <div className="text-2xl font-bold">
                R$ {formatNumberToRealMoney(props.valorTotalSemGd)}{' '}
              </div>
            ) : (
              <Skeleton className="h-4 w-full" />
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Economia GD</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-end items-end">
            {props?.economiaGd ? (
              <div className="text-2xl font-bold">
                {' '}
                R$ {formatNumberToRealMoney(Math.abs(props.economiaGd))}{' '}
              </div>
            ) : (
              <Skeleton className="h-4 w-full" />
            )}
          </CardContent>
        </Card>
      </div>
    </ResponsiveContainer>
  )
}
