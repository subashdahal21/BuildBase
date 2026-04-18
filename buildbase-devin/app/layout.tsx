import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Buildbase — Build together. Fund what matters.',
  description:
    'The platform where builders find their team and investors find what\u2019s worth backing.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
