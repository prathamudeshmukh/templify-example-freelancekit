'use client'

import { useProjectStore } from '@/store/project'
import SectionCard from '../SectionCard'
import ServiceItems from '../ServiceItems'
import GenerateButton from '../GenerateButton'
import { calcSubtotal, formatCurrency } from '@/lib/calculations'

export default function ProposalTab() {
  const { proposal, setProposal, addDeliverable, updateDeliverable, removeDeliverable } = useProjectStore()
  const total = calcSubtotal(proposal.services)

  return (
    <div className="space-y-4">
      <SectionCard title="Scope of Work">
        <textarea
          rows={4}
          className="input-field resize-none"
          placeholder="Describe what you'll deliver..."
          value={proposal.scopeOfWork}
          onChange={e => setProposal({ scopeOfWork: e.target.value })}
        />
      </SectionCard>

      <SectionCard title="Deliverables">
        <div className="space-y-2">
          {proposal.deliverables.map((d, i) => (
            <div key={i} className="flex gap-2 items-center">
              <span className="text-brand-600 font-bold text-sm">✓</span>
              <input
                className="input-field flex-1"
                placeholder="e.g. Responsive website"
                value={d}
                onChange={e => updateDeliverable(i, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeDeliverable(i)}
                disabled={proposal.deliverables.length === 1}
                className="text-gray-300 hover:text-red-400 disabled:opacity-30 text-lg leading-none transition-colors"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDeliverable}
            className="text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
          >
            + Add deliverable
          </button>
        </div>
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Timeline">
          <input
            className="input-field"
            placeholder="e.g. 6 weeks"
            value={proposal.timeline}
            onChange={e => setProposal({ timeline: e.target.value })}
          />
        </SectionCard>
        <SectionCard title="Valid Until">
          <input
            type="date"
            className="input-field"
            value={proposal.validUntil}
            onChange={e => setProposal({ validUntil: e.target.value })}
          />
        </SectionCard>
      </div>

      <SectionCard title="Services &amp; Pricing">
        <ServiceItems />
        <div className="flex justify-end mt-4 pt-3 border-t border-gray-100">
          <div className="text-right">
            <div className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Total</div>
            <div className="text-2xl font-bold text-brand-600">{formatCurrency(total)}</div>
          </div>
        </div>
      </SectionCard>

      <GenerateButton docType="proposal" />
    </div>
  )
}
