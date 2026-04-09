import type { SharedData, ProposalData, InvoiceData, InvoiceTemplateData } from '@/types/project'
import { calcLineTotal, calcSubtotal, calcTax, calcGrandTotal, formatCurrency } from './calculations'

export const buildInvoicePayload = (
  shared: SharedData,
  proposal: ProposalData,
  invoice: InvoiceData,
): InvoiceTemplateData => {
  const subtotal = calcSubtotal(proposal.services)
  const tax = calcTax(subtotal, invoice.taxRate)
  const grandTotal = calcGrandTotal(subtotal, tax)

  return {
    freelancer: shared.freelancer,
    client: shared.client,
    project: shared.project,
    invoiceNumber: invoice.invoiceNumber,
    issueDate: invoice.issueDate,
    dueDate: invoice.dueDate,
    items: proposal.services.map(svc => ({
      description: svc.description,
      quantity: svc.quantity,
      unitPrice: formatCurrency(svc.unitPrice),
      total: formatCurrency(calcLineTotal(svc)),
    })),
    subtotal: formatCurrency(subtotal),
    taxRate: `${invoice.taxRate}%`,
    tax: formatCurrency(tax),
    grandTotal: formatCurrency(grandTotal),
    paymentInstructions: invoice.paymentInstructions,
  }
}
