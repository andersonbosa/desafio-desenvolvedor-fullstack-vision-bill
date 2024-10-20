'use client'

import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'

const chartConfig = {

} satisfies ChartConfig

import type { EnergyChartDataItem } from '@/lib/types'

interface EnergyChartProps {
  chartData: EnergyChartDataItem[]
}

export const EnergyChart: React.FC<EnergyChartProps> = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Card>
        <CardHeader>
          <CardTitle>Resultados de Energia</CardTitle>
          <CardDescription>
            Consumo de Energia Elétrica (KWh) vs Energía Compensada (kWh)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <CartesianGrid vertical={false} />
              <ChartTooltip cursor={true} content={<ChartTooltipContent hideLabel />} />
              <ChartLegend verticalAlign="top" height={36}/>
              <XAxis
                dataKey="dataDeReferencia"
                name="data de referencia"
                tickLine={true}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value: any) => value.slice(0, 10)}
              />

              <Line
                dataKey="energiaCompensadaKwh"
                type="linear"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="consumoEnergiaEletrica"
                type="linear"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </ResponsiveContainer>
  )
}
