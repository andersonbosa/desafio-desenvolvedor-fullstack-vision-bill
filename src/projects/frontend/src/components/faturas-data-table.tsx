'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { formatNumberToRealMoney } from '@/lib/utils'
import { DownloadIcon } from '@radix-ui/react-icons'
import { getFaturaFileUrlById } from '@/lib/data-fetching'
import type { GetFaturasDataItem, GetFaturasDataPagination } from '@/lib/types'

interface DataTableProps {
  data: GetFaturasDataItem[]
  pagination: GetFaturasDataPagination
}

const MAXIMUM_NUMBER_TO_DISPLAY = 8

export const FaturasDataTable: React.FC<DataTableProps> = ({ data, pagination }) => {
  const openFaturaOnBrowser = async (id: string) => {
    const streamUrl = await getFaturaFileUrlById(id)
    window.open(streamUrl, '_blank')
  }

  const previousPage = (): void => {}

  const getCanPreviousPage = (): boolean => false

  const nextPage = (): void => {}

  const getCanNextPage = (): boolean => false

  return (
    <div className="rounded-md border bg-white shadow overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Índice</TableHead>
            <TableHead>Nª Cliente</TableHead>
            <TableHead>Nª Instalação</TableHead>
            <TableHead>Data de referência</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(pagination.pageSize)
          .map((fatura, index) => (
            <TableRow key={fatura.id} className={index % 2 === 0 ? 'bg-muted' : ''}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{fatura.numero_do_cliente}</TableCell>
              <TableCell>{fatura.numero_da_instalacao}</TableCell>
              <TableCell>{new Date(fatura.data_de_referencia).toLocaleDateString()}</TableCell>
              <TableCell>R$ {formatNumberToRealMoney(fatura.valor_boleto)}</TableCell>
              <TableCell className="flex items-center justify-center">
                <Button variant="outline" onClick={() => openFaturaOnBrowser(fatura.id)}>
                  <DownloadIcon className="mr-2" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4 ">
        <Button
          variant="outline"
          size="sm"
          onClick={() => previousPage()}
          disabled={!getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button variant="outline" size="sm" onClick={() => nextPage()} disabled={!getCanNextPage()}>
          Próxima
        </Button>
      </div>
    </div>
  )
}
