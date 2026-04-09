'use client'

import { useState } from 'react'
import type { DocType } from '@/types/project'
import ProposalTab from './tabs/ProposalTab'
import ContractTab from './tabs/ContractTab'
import InvoiceTab from './tabs/InvoiceTab'
import ReceiptTab from './tabs/ReceiptTab'

type Tab = {
  id: DocType
  label: string
  emoji: string
  description: string
  templateEnvVar: string
}

const TABS: Tab[] = [
  {
    id: 'proposal',
    label: 'Proposal',
    emoji: '📄',
    description: 'Send before the project starts',
    templateEnvVar: 'TEMPLIFY_PROPOSAL_TEMPLATE_ID',
  },
  {
    id: 'contract',
    label: 'Contract',
    emoji: '📝',
    description: 'Lock in scope and terms',
    templateEnvVar: 'TEMPLIFY_CONTRACT_TEMPLATE_ID',
  },
  {
    id: 'invoice',
    label: 'Invoice',
    emoji: '🧾',
    description: 'Request payment on delivery',
    templateEnvVar: 'TEMPLIFY_INVOICE_TEMPLATE_ID',
  },
  {
    id: 'receipt',
    label: 'Receipt',
    emoji: '✅',
    description: 'Confirm payment received',
    templateEnvVar: 'TEMPLIFY_RECEIPT_TEMPLATE_ID',
  },
]

const TAB_CONTENT: Record<DocType, React.ReactNode> = {
  proposal: <ProposalTab />,
  contract: <ContractTab />,
  invoice: <InvoiceTab />,
  receipt: <ReceiptTab />,
}

export default function DocTabs() {
  const [activeTab, setActiveTab] = useState<DocType>('proposal')
  const active = TABS.find(t => t.id === activeTab)!

  return (
    <div>
      {/* Tab strip */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {TABS.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center text-center p-3 rounded-xl border-2 transition-all ${
              activeTab === tab.id
                ? 'border-brand-600 bg-brand-50 text-brand-700'
                : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
            }`}
          >
            <span className="text-xl mb-1">{tab.emoji}</span>
            <span className="text-xs font-bold">{tab.label}</span>
            <span className="text-xs opacity-70 leading-tight mt-0.5">{tab.description}</span>
          </button>
        ))}
      </div>

      {/* Template ID badge */}
      <div className="flex items-center gap-2 mb-4 px-1">
        <span className="text-xs text-gray-400">Templify template:</span>
        <code className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono">
          {active.templateEnvVar}
        </code>
      </div>

      {/* Active tab content */}
      {TAB_CONTENT[activeTab]}
    </div>
  )
}
