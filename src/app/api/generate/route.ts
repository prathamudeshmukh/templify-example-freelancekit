import { NextRequest, NextResponse } from 'next/server'
import type { DocType, SharedData, ProposalData, ContractData, InvoiceData, ReceiptData } from '@/types/project'
import { buildProposalPayload } from '@/lib/buildProposal'
import { buildContractPayload } from '@/lib/buildContract'
import { buildInvoicePayload } from '@/lib/buildInvoice'
import { buildReceiptPayload } from '@/lib/buildReceipt'

const DOC_TYPE_TEMPLATE_IDS: Record<DocType, string | undefined> = {
  proposal: process.env['TEMPLIFY_PROPOSAL_TEMPLATE_ID'],
  contract: process.env['TEMPLIFY_CONTRACT_TEMPLATE_ID'],
  invoice: process.env['TEMPLIFY_INVOICE_TEMPLATE_ID'],
  receipt: process.env['TEMPLIFY_RECEIPT_TEMPLATE_ID'],
}

const VALID_DOC_TYPES: DocType[] = ['proposal', 'contract', 'invoice', 'receipt']

type GenerateRequest = {
  docType: DocType
  shared: SharedData
  proposal: ProposalData
  contract: ContractData
  invoice: InvoiceData
  receipt: ReceiptData
}

function buildTemplateData(body: GenerateRequest): unknown {
  switch (body.docType) {
    case 'proposal':
      return buildProposalPayload(body.shared, body.proposal)
    case 'contract':
      return buildContractPayload(body.shared, body.proposal, body.contract)
    case 'invoice':
      return buildInvoicePayload(body.shared, body.proposal, body.invoice)
    case 'receipt':
      return buildReceiptPayload(body.shared, body.proposal, body.invoice, body.receipt)
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const clientId = process.env['TEMPLIFY_CLIENT_ID']
  const clientSecret = process.env['TEMPLIFY_CLIENT_SECRET']

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: 'Templify credentials not configured. Set TEMPLIFY_CLIENT_ID and TEMPLIFY_CLIENT_SECRET.' },
      { status: 500 },
    )
  }

  let body: GenerateRequest
  try {
    body = (await req.json()) as GenerateRequest
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!VALID_DOC_TYPES.includes(body.docType)) {
    return NextResponse.json(
      { error: `Invalid docType. Must be one of: ${VALID_DOC_TYPES.join(', ')}.` },
      { status: 400 },
    )
  }

  const templateId = DOC_TYPE_TEMPLATE_IDS[body.docType]
  if (!templateId) {
    return NextResponse.json(
      { error: `Template ID for "${body.docType}" is not configured. Set TEMPLIFY_${body.docType.toUpperCase()}_TEMPLATE_ID.` },
      { status: 500 },
    )
  }

  const templateData = buildTemplateData(body)

  const templifyRes = await fetch(
    `https://api.templify.cloud/convert/${templateId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        client_id: clientId,
        client_secret: clientSecret,
      },
      body: JSON.stringify({ templateData }),
    },
  )

  if (!templifyRes.ok) {
    const errText = await templifyRes.text()
    return NextResponse.json(
      { error: `Templify API error: ${errText}` },
      { status: templifyRes.status },
    )
  }

  const pdfBuffer = await templifyRes.arrayBuffer()
  const filename = `${body.docType}-${body.shared.client.company.toLowerCase().replace(/\s+/g, '-')}.pdf`

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
