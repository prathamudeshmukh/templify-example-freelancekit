'use client'

import { useProjectStore } from '@/store/project'
import { calcLineTotal, formatCurrency } from '@/lib/calculations'

export default function ServiceItems() {
  const { proposal, addService, updateService, removeService } = useProjectStore()

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-12 gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 px-1 mb-1">
        <span className="col-span-5">Description</span>
        <span className="col-span-2 text-center">Qty</span>
        <span className="col-span-3">Unit Price</span>
        <span className="col-span-1 text-right">Total</span>
        <span className="col-span-1" />
      </div>

      {proposal.services.map(svc => (
        <div key={svc.id} className="grid grid-cols-12 gap-2 items-center">
          <input
            className="col-span-5 input-field"
            placeholder="Service description"
            value={svc.description}
            onChange={e => updateService(svc.id, { description: e.target.value })}
          />
          <input
            type="number"
            min={1}
            className="col-span-2 input-field text-center"
            value={svc.quantity}
            onChange={e => updateService(svc.id, { quantity: Number(e.target.value) })}
          />
          <input
            type="number"
            min={0}
            step={50}
            className="col-span-3 input-field"
            value={svc.unitPrice}
            onChange={e => updateService(svc.id, { unitPrice: Number(e.target.value) })}
          />
          <span className="col-span-1 text-right text-sm font-semibold text-gray-700">
            {formatCurrency(calcLineTotal(svc))}
          </span>
          <button
            type="button"
            onClick={() => removeService(svc.id)}
            disabled={proposal.services.length === 1}
            className="col-span-1 text-gray-300 hover:text-red-400 disabled:opacity-30 transition-colors text-lg leading-none text-center"
          >
            ×
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addService}
        className="mt-2 text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors"
      >
        + Add service
      </button>
    </div>
  )
}
