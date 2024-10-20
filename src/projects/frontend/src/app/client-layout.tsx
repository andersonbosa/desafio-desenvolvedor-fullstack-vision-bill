import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { ClientProviders } from './client-providers'

const AppBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <nav className="space-x-4 flex items-center">
          <Link href="/" className="text-lg font-bold">
            <Button variant="link">
              <img src="/favicon.ico" alt="Logo" className="h-8" />{' '}
            </Button>
          </Link>
          <Link href="/dashboard" className="text-sm font-medium">
            <Button variant="link"> Dashboard </Button>
          </Link>
          <Link href="/faturas" className="text-sm font-medium">
            <Button variant="link"> Faturas </Button>
          </Link>
        </nav>

        {/* TODO implement bill search */}
        {/* <div className="flex items-center space-x-2">
          <Input type="text" placeholder="Pesquisar..." className="w-48" />
          <Button variant="outline">Buscar</Button>
        </div> */}
      </div>
    </header>
  )
}

export const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientProviders>
      <div className="min-h-screen bg-gray-100">
        <AppBar />
        <main className="container mx-auto pt-24 px-4">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </ClientProviders>
  )
}
