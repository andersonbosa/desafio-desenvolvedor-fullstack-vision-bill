import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import { ClientLayout } from './client-layout'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "LUMI | Desafio Fullstack",
  description: "Odio ipsum nulla ea. Aut et ratione consectetur aliquam qui fugiat repellendus aut. Ipsa est iure maxime error in. Animi et eveniet fuga culpa ut neque non eos. Ea hic est quia.",
}

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
