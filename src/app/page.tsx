import SharedProjectForm from '@/components/SharedProjectForm'
import DocTabs from '@/components/DocTabs'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">FreelanceKit</h1>
            <p className="text-xs text-gray-400">powered by Templify</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-500"></span>
            4 document types · 4 Templify templates · zero PDF infrastructure
          </div>
        </div>
      </header>

      {/* Main two-panel layout */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Left panel — shared project info */}
          <aside className="col-span-4 space-y-2">
            <div className="mb-4">
              <h2 className="text-sm font-bold text-gray-700">Project Info</h2>
              <p className="text-xs text-gray-400 mt-0.5">Shared across all document types</p>
            </div>
            <SharedProjectForm />
          </aside>

          {/* Right panel — document tabs */}
          <section className="col-span-8">
            <div className="mb-4">
              <h2 className="text-sm font-bold text-gray-700">Generate Documents</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Each tab calls a different Templify template ID — same API, different document
              </p>
            </div>
            <DocTabs />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16 py-6 text-center text-xs text-gray-400">
        Built with{' '}
        <a
          href="https://templify.cloud"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-600 hover:underline font-medium"
        >
          Templify
        </a>{' '}
        · PDF generation API for developers
      </footer>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'FreelanceKit',
            url: 'https://examples.templify.cloud',
            description:
              'Generate professional proposals, contracts, invoices, and receipts for free — powered by Templify.',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            author: {
              '@type': 'Organization',
              name: 'Templify',
              url: 'https://templify.cloud',
            },
            isPartOf: {
              '@type': 'SoftwareApplication',
              name: 'Templify',
              url: 'https://templify.cloud',
              description:
                'API-first PDF generation platform. No-code templates, Handlebars support, and enterprise-scale performance.',
            },
          }),
        }}
      />
    </div>
  )
}
