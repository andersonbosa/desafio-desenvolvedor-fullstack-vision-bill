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

const chartConfig = {} satisfies ChartConfig

import type { FinanceChartDataItem } from '@/lib/types'

interface FinanceChartProps {
  chartData: FinanceChartDataItem[]
}

export const FinanceChart: React.FC<FinanceChartProps> = ({ chartData }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <Card>
        <CardHeader>
          <CardTitle>Resultados Financeiros</CardTitle>
          <CardDescription>Valor Total sem GD (R$) vs Economia GD (R$).</CardDescription>
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
                name='Data de referência'
                tickLine={true}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value: any) => value.slice(0, 10)}
              />
              <Line
                dataKey="energiaEletricaValor"
                name='Energia Elétrica'
                type="linear"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="energiaSceeeSemIcmsValor"
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
