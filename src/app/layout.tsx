import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FreelanceKit — powered by Templify',
  description: 'Generate proposals, contracts, invoices, and receipts — 4 document types, 4 Templify templates, zero PDF infrastructure.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">{children}</body>
    </html>
  )
}
