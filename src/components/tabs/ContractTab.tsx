'use client'

import { useProjectStore } from '@/store/project'
import SectionCard from '../SectionCard'
import GenerateButton from '../GenerateButton'

export default function ContractTab() {
  const { contract, setContract } = useProjectStore()

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
        Services and pricing are pulled from your Proposal tab. Fill in the contract-specific terms below.
      </p>

      <SectionCard title="Payment Schedule">
        <input
          className="input-field"
          placeholder="e.g. 50% upfront, 50% on delivery"
          value={contract.paymentSchedule}
          onChange={e => setContract({ paymentSchedule: e.target.value })}
        />
      </SectionCard>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Revision Rounds">
          <input
            className="input-field"
            placeholder="e.g. 2"
            value={contract.revisionRounds}
            onChange={e => setContract({ revisionRounds: e.target.value })}
          />
        </SectionCard>
        <SectionCard title="Governing Law">
          <input
            className="input-field"
            placeholder="e.g. California, USA"
            value={contract.governingLaw}
            onChange={e => setContract({ governingLaw: e.target.value })}
          />
        </SectionCard>
      </div>

      <SectionCard title="Project End Date">
        <input
          type="date"
          className="input-field"
          value={contract.endDate}
          onChange={e => setContract({ endDate: e.target.value })}
        />
      </SectionCard>

      <GenerateButton docType="contract" />
    </div>
  )
}
