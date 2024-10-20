import { BibliotecaDeFaturas } from '@/views/biblioteca.view'

interface PageProps {
  searchParams?: {
    query?: string
    page?: string
  }
}

export default async function Page(props: PageProps) {
  const { searchParams } = props
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  return <BibliotecaDeFaturas query={query} page={currentPage} />
}
