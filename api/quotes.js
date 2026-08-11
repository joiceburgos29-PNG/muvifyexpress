const MAX_FIELD_LENGTH = 1_000

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const text = (value) => escapeHtml(value).replace(/\n/g, '<br>')
const yesNo = (value) => (value ? 'Sí' : 'No')

const isValidQuote = (quote) =>
  quote &&
  ['origin', 'destination', 'date', 'email', 'phone'].every(
    (field) => typeof quote[field] === 'string' && quote[field].trim().length > 0 && quote[field].length <= MAX_FIELD_LENGTH,
  )

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Método no permitido.' })
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    console.error('Quote email is not configured: missing RESEND_API_KEY or RESEND_FROM_EMAIL.')
    return response.status(503).json({ error: 'El envío de solicitudes aún no está configurado. Inténtalo más tarde.' })
  }

  const quote = request.body
  if (!isValidQuote(quote)) {
    return response.status(400).json({ error: 'Revisa los datos obligatorios de la solicitud.' })
  }

  const recipient = process.env.QUOTE_RECIPIENT_EMAIL || 'info@muvify.es'
  const distance = Number.isFinite(quote.distanceKm) ? `${quote.distanceKm} km` : 'Pendiente de cálculo'
  const details = [
    ['Origen', quote.origin],
    ['Destino', quote.destination],
    ['Distancia por carretera', distance],
    ['Fecha de mudanza', quote.date],
    ['Tipo de vivienda', quote.propertyType],
    ['Ascensor', yesNo(quote.hasElevator)],
    ['Número de pisos', quote.floors],
    ['Metros cuadrados', `${quote.squareMeters} m²`],
    ['Necesita embalaje', yesNo(quote.needsPacking)],
    ['Necesita montaje', yesNo(quote.needsAssembly)],
    ['Información adicional', quote.additionalInfo || 'No indicada'],
    ['Email del cliente', quote.email],
    ['Teléfono del cliente', quote.phone],
  ]

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL,
        to: [recipient],
        reply_to: quote.email,
        subject: `Nueva solicitud: ${quote.origin} → ${quote.destination}`,
        html: `
          <h1>Nueva solicitud de presupuesto</h1>
          <table style="border-collapse:collapse">
            ${details.map(([label, value]) => `<tr><td style="padding:8px;border:1px solid #ddd"><strong>${escapeHtml(label)}</strong></td><td style="padding:8px;border:1px solid #ddd">${text(value)}</td></tr>`).join('')}
          </table>
        `,
      }),
    })

    if (!resendResponse.ok) {
      console.error('Resend rejected quote email:', await resendResponse.text())
      return response.status(502).json({ error: 'No se pudo enviar el email. Inténtalo de nuevo.' })
    }

    return response.status(200).json({ ok: true })
  } catch (error) {
    console.error('Quote email delivery failed:', error)
    return response.status(500).json({ error: 'No se pudo enviar el email. Inténtalo de nuevo.' })
  }
}
