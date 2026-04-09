'use client'

import { create } from 'zustand'
import type {
  SharedData,
  ProposalData,
  ContractData,
  InvoiceData,
  ReceiptData,
  ServiceItem,
} from '@/types/project'

const today = new Date().toISOString().split('T')[0] ?? ''
const thirtyDaysOut = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split('T')[0] ?? ''

const defaultService: ServiceItem = {
  id: crypto.randomUUID(),
  description: 'Web Development',
  quantity: 1,
  unitPrice: 2500,
}

type ProjectStore = {
  shared: SharedData
  proposal: ProposalData
  contract: ContractData
  invoice: InvoiceData
  receipt: ReceiptData
  setShared: (data: Partial<SharedData>) => void
  setFreelancer: (data: Partial<SharedData['freelancer']>) => void
  setClient: (data: Partial<SharedData['client']>) => void
  setProject: (data: Partial<SharedData['project']>) => void
  setProposal: (data: Partial<ProposalData>) => void
  setContract: (data: Partial<ContractData>) => void
  setInvoice: (data: Partial<InvoiceData>) => void
  setReceipt: (data: Partial<ReceiptData>) => void
  addService: () => void
  updateService: (id: string, data: Partial<ServiceItem>) => void
  removeService: (id: string) => void
  addDeliverable: () => void
  updateDeliverable: (index: number, value: string) => void
  removeDeliverable: (index: number) => void
}

export const useProjectStore = create<ProjectStore>(set => ({
  shared: {
    freelancer: {
      name: 'Alex Johnson',
      company: 'AJ Studio',
      email: 'alex@ajstudio.co',
      phone: '+1 (555) 123-4567',
      address: '123 Market St, San Francisco, CA 94105',
    },
    client: {
      name: 'Sarah Williams',
      company: 'Startup Co.',
      email: 'sarah@startupco.com',
      address: '456 Fifth Ave, New York, NY 10001',
    },
    project: {
      name: 'Brand Website Redesign',
      startDate: today,
    },
  },

  proposal: {
    scopeOfWork:
      'Design and develop a modern, responsive website including homepage, about page, services page, and contact form. The project will use Next.js for the frontend and a headless CMS for content management.',
    deliverables: ['Responsive website (5 pages)', 'CMS integration', 'SEO optimization', 'Analytics setup'],
    timeline: '6 weeks',
    validUntil: thirtyDaysOut,
    services: [defaultService],
  },

  contract: {
    paymentSchedule: '50% upfront, 50% on delivery',
    revisionRounds: '2',
    governingLaw: 'California, USA',
    endDate: thirtyDaysOut,
  },

  invoice: {
    invoiceNumber: 'INV-001',
    issueDate: today,
    dueDate: thirtyDaysOut,
    taxRate: 10,
    paymentInstructions: 'Bank transfer to: AJ Studio\nAccount: 0001234567\nRouting: 021000089',
  },

  receipt: {
    receiptNumber: 'RCP-001',
    paymentDate: today,
    paymentMethod: 'Bank Transfer',
  },

  setShared: data =>
    set(s => ({ shared: { ...s.shared, ...data } })),

  setFreelancer: data =>
    set(s => ({
      shared: { ...s.shared, freelancer: { ...s.shared.freelancer, ...data } },
    })),

  setClient: data =>
    set(s => ({
      shared: { ...s.shared, client: { ...s.shared.client, ...data } },
    })),

  setProject: data =>
    set(s => ({
      shared: { ...s.shared, project: { ...s.shared.project, ...data } },
    })),

  setProposal: data =>
    set(s => ({ proposal: { ...s.proposal, ...data } })),

  setContract: data =>
    set(s => ({ contract: { ...s.contract, ...data } })),

  setInvoice: data =>
    set(s => ({ invoice: { ...s.invoice, ...data } })),

  setReceipt: data =>
    set(s => ({ receipt: { ...s.receipt, ...data } })),

  addService: () =>
    set(s => ({
      proposal: {
        ...s.proposal,
        services: [
          ...s.proposal.services,
          { id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0 },
        ],
      },
    })),

  updateService: (id, data) =>
    set(s => ({
      proposal: {
        ...s.proposal,
        services: s.proposal.services.map(svc =>
          svc.id === id ? { ...svc, ...data } : svc,
        ),
      },
    })),

  removeService: id =>
    set(s => ({
      proposal: {
        ...s.proposal,
        services: s.proposal.services.filter(svc => svc.id !== id),
      },
    })),

  addDeliverable: () =>
    set(s => ({
      proposal: {
        ...s.proposal,
        deliverables: [...s.proposal.deliverables, ''],
      },
    })),

  updateDeliverable: (index, value) =>
    set(s => ({
      proposal: {
        ...s.proposal,
        deliverables: s.proposal.deliverables.map((d, i) => (i === index ? value : d)),
      },
    })),

  removeDeliverable: index =>
    set(s => ({
      proposal: {
        ...s.proposal,
        deliverables: s.proposal.deliverables.filter((_, i) => i !== index),
      },
    })),
}))
