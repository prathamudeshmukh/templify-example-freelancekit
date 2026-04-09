import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'FreelanceKit powered by Templify'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#4f46e5',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 700,
            color: 'white',
            letterSpacing: '-2px',
            marginBottom: 24,
          }}
        >
          FreelanceKit
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.85)',
            marginBottom: 48,
            letterSpacing: '1px',
          }}
        >
          Proposals · Contracts · Invoices · Receipts
        </div>
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,255,255,0.6)',
            borderTop: '1px solid rgba(255,255,255,0.25)',
            paddingTop: 24,
            width: '100%',
            textAlign: 'center',
          }}
        >
          Powered by Templify — templify.cloud
        </div>
      </div>
    ),
    { ...size },
  )
}
