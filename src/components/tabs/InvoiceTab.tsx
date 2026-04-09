'use client'

import { useProjectStore } from '@/store/project'
import SectionCard from '../SectionCard'
import GenerateButton from '../GenerateButton'
import { calcSubtotal, calcTax, calcGrandTotal, formatCurrency } from '@/lib/calculations'

export default function InvoiceTab() {
  const { invoice, proposal, setInvoice } = useProjectStore()

  const subtotal = calcSubtotal(proposal.services)
  const tax = calcTax(subtotal, invoice.taxRate)
  const grandTotal = calcGrandTotal(subtotal, tax)

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
        Line items are pulled from your Proposal services. Add invoice-specific details below.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <SectionCard title="Invoice Number">
          <input
            className="input-field"
            value={invoice.invoiceNumber}
            onChange={e => setInvoice({ invoiceNumber: e.target.value })}
          />
        </SectionCard>
        <SectionCard title="Tax Rate (%)">
          <input
            type="number"
            min={0}
            max={100}
            className="input-field"
            value={invoice.taxRate}
            onChange={e => setInvoice({ taxRate: Number(e.target.value) })}
          />
        </SectionCard>
        <SectionCard title="Issue Date">
          <input
            type="date"
            className="input-field"
            value={invoice.issueDate}
            onChange={e => setInvoice({ issueDate: e.target.value })}
          />
        </SectionCard>
        <SectionCard title="Due Date">
          <input
            type="date"
            className="input-field"
            value={invoice.dueDate}
            onChange={e => setInvoice({ dueDate: e.target.value })}
          />
        </SectionCard>
      </div>

      <SectionCard title="Payment Instructions">
        <textarea
          rows={3}
          className="input-field resize-none"
          placeholder="Bank details, PayPal, etc."
          value={invoice.paymentInstructions}
          onChange={e => setInvoice({ paymentInstructions: e.target.value })}
        />
      </SectionCard>

      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm">
        <div className="flex justify-between text-gray-600 py-1">
          <span>Subtotal</span><span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600 py-1">
          <span>Tax ({invoice.taxRate}%)</span><span className="font-medium">{formatCurrency(tax)}</span>
        </div>
        <div className="flex justify-between text-brand-700 font-bold text-base pt-2 border-t border-gray-200 mt-1">
          <span>Total Due</span><span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      <GenerateButton docType="invoice" />
    </div>
  )
}
