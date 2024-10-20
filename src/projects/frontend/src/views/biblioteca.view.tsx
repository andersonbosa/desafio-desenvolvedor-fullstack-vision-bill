'use client'

import { FaturasDataTable } from '@/components/faturas-data-table'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { getFaturasData } from '@/lib/data-fetching'
import type { GetFaturasDataItem, GetFaturasDataPagination } from '@/lib/types'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface BibliotecaDeFaturasProps {
  page: number
  query?: string
}

export const BibliotecaDeFaturas: React.FC<BibliotecaDeFaturasProps> = ({
  query = '',
  page = 1
}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [loading, setLoading] = useState(true)
  const [faturas, setFaturas] = useState<GetFaturasDataItem[]>([])
  const [pagination, setPagination] = useState<GetFaturasDataPagination>({
    page,
    total: 0,
    pageSize: 10
  })
  const [searchQueryInput, setSearchQueryInput] = useState('')

  const fetchFaturasData = async () => {
    getFaturasData(query, page)
      .then((faturasData) => {
        if (faturasData && faturasData?.data.length > 0) {
          setFaturas(faturasData.data)
          setPagination(faturasData.pagination)
          console.log(faturasData)
        }
      })
      .catch((error) => {
        console.error('Error when fetching data:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }
  const handleSearch = () => {
    createPageURL()
  }

  useEffect(() => {
    fetchFaturasData()
  }, [])

  return (
    <div>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="w-full py-2 mb-8">
        <Input
          type="search"
          placeholder="Pesquise aqui..."
          className="bg-white w-full ] "
          value={searchQueryInput}
          onChange={(e) => {
            setSearchQueryInput((prevValue) => e.target.value)
          }}
          onSubmit={handleSearch}
        />
      </div>

      <div>
        {loading ? (
          <Skeleton className="h-48 w-full" />
        ) : (
          <>
            <FaturasDataTable data={faturas} pagination={pagination} />
          </>
        )}
      </div>
      <br />
    </div>
  )
}
