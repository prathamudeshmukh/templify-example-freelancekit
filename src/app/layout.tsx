import type { Metadata } from 'next'
import './globals.css'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://examples.templify.cloud'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'FreelanceKit — Free Freelance Document Generator',
    template: '%s | FreelanceKit by Templify',
  },
  description:
    'Generate professional proposals, contracts, invoices, and receipts for free. Built with Templify — the API-first PDF generation platform.',
  keywords: [
    'free freelance invoice generator',
    'freelance contract PDF generator',
    'freelance proposal template',
    'receipt generator for freelancers',
    'PDF document generator freelance',
    'Templify PDF API example',
    'no-code PDF template freelance',
  ],
  authors: [{ name: 'Templify', url: 'https://templify.cloud' }],
  creator: 'Templify',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'FreelanceKit by Templify',
    title: 'FreelanceKit — Free Freelance Document Generator',
    description:
      'Proposals, contracts, invoices & receipts in one place. Powered by Templify — the API-first PDF platform.',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'FreelanceKit powered by Templify' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FreelanceKit — Free Freelance Document Generator',
    description: 'Generate proposals, contracts, invoices & receipts for free. Powered by Templify.',
    images: ['/opengraph-image'],
    creator: '@templify_cloud',
    site: '@templify_cloud',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: BASE_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 antialiased">{children}</body>
    </html>
  )
}
