import type { SharedData, ProposalData, ContractData, ContractTemplateData } from '@/types/project'
import { calcSubtotal, formatCurrency } from './calculations'

export const buildContractPayload = (
  shared: SharedData,
  proposal: ProposalData,
  contract: ContractData,
): ContractTemplateData => {
  const totalPrice = calcSubtotal(proposal.services)

  return {
    freelancer: shared.freelancer,
    client: shared.client,
    project: {
      name: shared.project.name,
      startDate: shared.project.startDate,
      endDate: contract.endDate,
    },
    services: proposal.services.map(svc => ({
      description: svc.description,
      price: formatCurrency(svc.quantity * svc.unitPrice),
    })),
    totalPrice: formatCurrency(totalPrice),
    paymentSchedule: contract.paymentSchedule,
    revisionRounds: contract.revisionRounds,
    governingLaw: contract.governingLaw,
  }
}
