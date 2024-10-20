import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

interface SummaryCardProps {
  title: string
  value: string
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value }) => {
  return (
    <Card className="flex flex-col items-center justify-center">
      <CardHeader>
        <CardDescription className="text-md mb-2">{title}</CardDescription>
        <CardTitle className="text-md ">{value}</CardTitle>
      </CardHeader>
    </Card>
  )
}