import { put } from '@vercel/blob'
import { Resend } from 'resend'

const MAX_VIDEO_SIZE = 25 * 1024 * 1024

export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const formData = await request.formData()
    const video = formData.get('video')
    const fields = Object.fromEntries(
      ['origin', 'destination', 'date', 'propertyType', 'hasElevator', 'floors', 'squareMeters', 'needsPacking', 'needsAssembly', 'additionalInfo', 'email', 'phone']
        .map((key) => [key, String(formData.get(key) ?? '')]),
    )

    if (!fields.email || !fields.phone || !fields.origin || !fields.destination) {
      return new Response(JSON.stringify({ error: 'Faltan datos obligatorios' }), { status: 400 })
    }

    let attachment: { filename: string; content: string } | undefined
    let videoReference = 'No se adjuntó vídeo'

    if (video instanceof File && video.size > 0) {
      if (!video.type.startsWith('video/')) {
        return new Response(JSON.stringify({ error: 'El archivo debe ser un vídeo' }), { status: 400 })
      }
      if (video.size > MAX_VIDEO_SIZE) {
        return new Response(JSON.stringify({ error: 'El vídeo no puede superar 25 MB' }), { status: 400 })
      }

      const safeName = video.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const blob = await put(`quote-videos/${Date.now()}-${safeName}`, video, { access: 'private' })
      videoReference = `Vídeo guardado de forma privada: ${blob.pathname}`
      attachment = {
        filename: safeName,
        content: Buffer.from(await video.arrayBuffer()).toString('base64'),
      }
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    const recipient = process.env.QUOTE_RECIPIENT_EMAIL
    const from = process.env.RESEND_FROM_EMAIL

    if (!recipient || !from) {
      return new Response(JSON.stringify({ error: 'El servicio de correo no está configurado' }), { status: 503 })
    }

    const { error } = await resend.emails.send(
      {
        from,
        to: [recipient],
        replyTo: fields.email,
        subject: `Nueva solicitud de mudanza: ${fields.origin} → ${fields.destination}`,
        html: `<h2>Nueva solicitud de presupuesto</h2><p><strong>Origen:</strong> ${fields.origin}</p><p><strong>Destino:</strong> ${fields.destination}</p><p><strong>Fecha:</strong> ${fields.date}</p><p><strong>Tipo de vivienda:</strong> ${fields.propertyType}</p><p><strong>Ascensor:</strong> ${fields.hasElevator}</p><p><strong>Pisos:</strong> ${fields.floors}</p><p><strong>Metros cuadrados:</strong> ${fields.squareMeters}</p><p><strong>Embalaje:</strong> ${fields.needsPacking}</p><p><strong>Montaje:</strong> ${fields.needsAssembly}</p><p><strong>Email:</strong> ${fields.email}</p><p><strong>Teléfono:</strong> ${fields.phone}</p><p><strong>Información adicional:</strong> ${fields.additionalInfo || '—'}</p><p>${videoReference}</p>`,
        attachments: attachment ? [attachment] : undefined,
      },
      { idempotencyKey: `quote/${fields.email}/${fields.date}/${fields.origin}/${fields.destination}` },
    )

    if (error) {
      console.error('[v0] Email error:', error)
      return new Response(JSON.stringify({ error: 'No se pudo enviar la solicitud' }), { status: 502 })
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('[v0] Quote submission error:', error)
    return new Response(JSON.stringify({ error: 'No se pudo procesar la solicitud' }), { status: 500 })
  }
}
