export type DocType = 'proposal' | 'contract' | 'invoice' | 'receipt'

export type ServiceItem = {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

export type SharedData = {
  freelancer: {
    name: string
    company: string
    email: string
    phone: string
    address: string
  }
  client: {
    name: string
    company: string
    email: string
    address: string
  }
  project: {
    name: string
    startDate: string
  }
}

export type ProposalData = {
  scopeOfWork: string
  deliverables: string[]
  timeline: string
  validUntil: string
  services: ServiceItem[]
}

export type ContractData = {
  paymentSchedule: string
  revisionRounds: string
  governingLaw: string
  endDate: string
}

export type InvoiceData = {
  invoiceNumber: string
  issueDate: string
  dueDate: string
  taxRate: number
  paymentInstructions: string
}

export type ReceiptData = {
  receiptNumber: string
  paymentDate: string
  paymentMethod: string
}

// Payload shapes sent to Templify as templateData (all currencies pre-formatted)
export type ProposalTemplateData = {
  freelancer: SharedData['freelancer']
  client: SharedData['client']
  project: SharedData['project']
  scopeOfWork: string
  deliverables: string[]
  timeline: string
  validUntil: string
  services: Array<{ description: string; price: string }>
  totalPrice: string
}

export type ContractTemplateData = {
  freelancer: SharedData['freelancer']
  client: SharedData['client']
  project: { name: string; startDate: string; endDate: string }
  services: Array<{ description: string; price: string }>
  totalPrice: string
  paymentSchedule: string
  revisionRounds: string
  governingLaw: string
}

export type InvoiceTemplateData = {
  freelancer: SharedData['freelancer']
  client: SharedData['client']
  project: SharedData['project']
  invoiceNumber: string
  issueDate: string
  dueDate: string
  items: Array<{ description: string; quantity: number; unitPrice: string; total: string }>
  subtotal: string
  taxRate: string
  tax: string
  grandTotal: string
  paymentInstructions: string
}

export type ReceiptTemplateData = {
  freelancer: SharedData['freelancer']
  client: SharedData['client']
  project: SharedData['project']
  receiptNumber: string
  paymentDate: string
  paymentMethod: string
  amountPaid: string
  invoiceReference: string
}
