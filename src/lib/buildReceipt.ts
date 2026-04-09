import type { SharedData, ProposalData, InvoiceData, ReceiptData, ReceiptTemplateData } from '@/types/project'
import { calcSubtotal, calcTax, calcGrandTotal, formatCurrency } from './calculations'

export const buildReceiptPayload = (
  shared: SharedData,
  proposal: ProposalData,
  invoice: InvoiceData,
  receipt: ReceiptData,
): ReceiptTemplateData => {
  const subtotal = calcSubtotal(proposal.services)
  const tax = calcTax(subtotal, invoice.taxRate)
  const amountPaid = calcGrandTotal(subtotal, tax)

  return {
    freelancer: shared.freelancer,
    client: shared.client,
    project: shared.project,
    receiptNumber: receipt.receiptNumber,
    paymentDate: receipt.paymentDate,
    paymentMethod: receipt.paymentMethod,
    amountPaid: formatCurrency(amountPaid),
    invoiceReference: invoice.invoiceNumber,
  }
}
