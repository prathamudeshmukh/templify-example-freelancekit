# FreelanceKit — Templify Showcase App

A standalone freelance business tool that demonstrates Templify's multi-template PDF generation.

**4 document types. 4 Templify templates. Zero PDF infrastructure.**

| Document | When to use | Templify template |
|----------|-------------|-------------------|
| Proposal | Before the project starts | `TEMPLIFY_PROPOSAL_TEMPLATE_ID` |
| Contract | Lock in scope and terms | `TEMPLIFY_CONTRACT_TEMPLATE_ID` |
| Invoice | Request payment on delivery | `TEMPLIFY_INVOICE_TEMPLATE_ID` |
| Receipt | Confirm payment received | `TEMPLIFY_RECEIPT_TEMPLATE_ID` |

## Setup

### 1. Get Templify credentials

Sign up at [templify.cloud](https://templify.cloud) and copy your `client_id` and `client_secret` from the API Keys page.

### 2. Create the 4 templates in Templify

For each document type:
1. Create a new template in the Templify dashboard
2. Paste the contents of the corresponding `.hbs` file from `src/templates/`
3. Publish to production
4. Copy the template ID

| File | Template to create |
|------|--------------------|
| `src/templates/proposal.hbs` | Proposal template |
| `src/templates/contract.hbs` | Contract template |
| `src/templates/invoice.hbs` | Invoice template |
| `src/templates/receipt.hbs` | Receipt template |

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```
TEMPLIFY_CLIENT_ID=your_client_id_here
TEMPLIFY_CLIENT_SECRET=your_client_secret_here

TEMPLIFY_PROPOSAL_TEMPLATE_ID=your_proposal_template_id
TEMPLIFY_CONTRACT_TEMPLATE_ID=your_contract_template_id
TEMPLIFY_INVOICE_TEMPLATE_ID=your_invoice_template_id
TEMPLIFY_RECEIPT_TEMPLATE_ID=your_receipt_template_id
```

### 4. Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How it works

All 4 document tabs share the same project form data (freelancer, client, project). Each tab has its own contextual fields (e.g. the Invoice tab has invoice number and tax rate; the Receipt tab has payment date and method).

When you click **Generate PDF**:

1. The browser POSTs form data to `/api/generate` (a Next.js server route)
2. The server picks the correct `templateId` from env vars based on `docType`
3. It calls `POST https://api.templify.cloud/convert/{templateId}` with your credentials and the template data
4. Templify returns a PDF — the server proxies it back to the browser
5. Your browser auto-downloads the file

Credentials never leave the server.

## Why this matters

Without Templify, you'd need to maintain a PDF rendering stack for each document type — HTML→PDF conversion, Puppeteer/Chrome, scaling, retries, storage. With Templify, each document type is just a different `templateId` in a single API call.
