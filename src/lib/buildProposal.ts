import type { SharedData, ProposalData, ProposalTemplateData } from '@/types/project'
import { calcSubtotal, formatCurrency } from './calculations'

export const buildProposalPayload = (
  shared: SharedData,
  proposal: ProposalData,
): ProposalTemplateData => {
  const totalPrice = calcSubtotal(proposal.services)

  return {
    freelancer: shared.freelancer,
    client: shared.client,
    project: shared.project,
    scopeOfWork: proposal.scopeOfWork,
    deliverables: proposal.deliverables.filter(d => d.trim() !== ''),
    timeline: proposal.timeline,
    validUntil: proposal.validUntil,
    services: proposal.services.map(svc => ({
      description: svc.description,
      price: formatCurrency(svc.quantity * svc.unitPrice),
    })),
    totalPrice: formatCurrency(totalPrice),
  }
}
