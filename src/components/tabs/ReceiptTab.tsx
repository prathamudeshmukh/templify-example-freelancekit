'use client'

import { useProjectStore } from '@/store/project'
import SectionCard from '../SectionCard'
import GenerateButton from '../GenerateButton'
import { calcSubtotal, calcTax, calcGrandTotal, formatCurrency } from '@/lib/calculations'

const PAYMENT_METHODS = ['Bank Transfer', 'Credit Card', 'PayPal', 'Stripe', 'Check', 'Crypto', 'Other']

export default function ReceiptTab() {
  const { receipt, setReceipt, proposal, invoice } = useProjectStore()

  const subtotal = calcSubtotal(proposal.services)
  const tax = calcTax(subtotal, invoice.taxRate)
  const amountPaid = calcGrandTotal(subtotal, tax)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
        <span className="text-2xl">✅</span>
        <div>
          <div className="text-sm font-bold text-green-800">Amount to confirm</div>
          <div className="text-xl font-bold text-green-700">{formatCurrency(amountPaid)}</div>
          <div className="text-xs text-green-600">Matches invoice {invoice.invoiceNumber}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Receipt Number">
          <input
            className="input-field"
            value={receipt.receiptNumber}
            onChange={e => setReceipt({ receiptNumber: e.target.value })}
          />
        </SectionCard>
        <SectionCard title="Payment Date">
          <input
            type="date"
            className="input-field"
            value={receipt.paymentDate}
            onChange={e => setReceipt({ paymentDate: e.target.value })}
          />
        </SectionCard>
      </div>

      <SectionCard title="Payment Method">
        <div className="flex flex-wrap gap-2">
          {PAYMENT_METHODS.map(method => (
            <button
              key={method}
              type="button"
              onClick={() => setReceipt({ paymentMethod: method })}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                receipt.paymentMethod === method
                  ? 'bg-brand-600 text-white border-brand-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-brand-400'
              }`}
            >
              {method}
            </button>
          ))}
        </div>
      </SectionCard>

      <GenerateButton docType="receipt" />
    </div>
  )
}
