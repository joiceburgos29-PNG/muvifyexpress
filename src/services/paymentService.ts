/**
 * Servicio de Pagos con Stripe
 * 
 * Gestiona:
 * - Creación de sesiones de checkout
 * - Confirmación de pagos
 * - Webhooks de Stripe
 * - Facturación
 * - Comisiones y distribución
 */

export interface PaymentIntent {
  clientSecret: string
  publishableKey: string
  amount: number
  currency: string
}

export interface Booking {
  id: string
  requestId: string
  quoteId: string
  clientId: string
  companyId: string
  amount: number
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  paymentMethodId?: string
  stripePaymentIntentId?: string
  paidAt?: Date
  completedAt?: Date
  invoiceId?: string
}

export interface Commission {
  bookingId: string
  companyId: string
  amount: number
  rate: number
  status: 'pending' | 'paid'
  paidAt?: Date
}

export interface Invoice {
  id: string
  bookingId: string
  clientId: string
  companyId: string
  amount: number
  taxAmount: number
  totalAmount: number
  description: string
  issuedAt: Date
  dueDate: Date
  status: 'pending' | 'paid' | 'overdue' | 'cancelled'
  pdfUrl?: string
}

/**
 * Calcula la comisión de Muvify Express
 * - Tasa estándar: 15% del presupuesto
 * - Pago a la empresa: 85%
 */
export function calculateCommission(
  totalAmount: number,
  commissionRate: number = 0.15
): {
  muvifyCommission: number
  companyPayment: number
} {
  const muvifyCommission = Math.round(totalAmount * commissionRate)
  const companyPayment = totalAmount - muvifyCommission

  return {
    muvifyCommission,
    companyPayment,
  }
}

/**
 * Calcula impuestos (IVA 21% en España)
 */
export function calculateTax(amount: number, taxRate: number = 0.21): number {
  return Math.round(amount * taxRate)
}

/**
 * Crea una sesión de pago
 */
export async function createCheckoutSession(
  booking: Booking,
  clientEmail: string,
  successUrl: string,
  cancelUrl: string
): Promise<string> {
  try {
    // En producción, esto llamaría a tu backend
    // que comunicaría con la API de Stripe
    const response = await fetch('/api/payments/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookingId: booking.id,
        amount: booking.amount,
        email: clientEmail,
        successUrl,
        cancelUrl,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Error creating checkout session')
    }

    return data.sessionId
  } catch (error) {
    console.error('[v0] Error creating checkout session:', error)
    throw error
  }
}

/**
 * Confirma el pago de una reserva
 */
export async function confirmPayment(
  bookingId: string,
  stripePaymentIntentId: string
): Promise<Booking> {
  try {
    const response = await fetch('/api/payments/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bookingId,
        stripePaymentIntentId,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Error confirming payment')
    }

    return data.booking
  } catch (error) {
    console.error('[v0] Error confirming payment:', error)
    throw error
  }
}

/**
 * Obtiene el estado de un pago
 */
export async function getPaymentStatus(bookingId: string): Promise<Booking> {
  try {
    const response = await fetch(`/api/payments/${bookingId}`)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Error getting payment status')
    }

    return data.booking
  } catch (error) {
    console.error('[v0] Error getting payment status:', error)
    throw error
  }
}

/**
 * Procesa un reembolso
 */
export async function processRefund(
  bookingId: string,
  reason: string
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`/api/payments/${bookingId}/refund`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Error processing refund')
    }

    return data
  } catch (error) {
    console.error('[v0] Error processing refund:', error)
    throw error
  }
}

/**
 * Genera una factura
 */
export async function generateInvoice(bookingId: string): Promise<Invoice> {
  try {
    const response = await fetch(`/api/invoices/${bookingId}`, {
      method: 'POST',
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Error generating invoice')
    }

    return data.invoice
  } catch (error) {
    console.error('[v0] Error generating invoice:', error)
    throw error
  }
}

/**
 * Obtiene historial de pagos de una empresa
 */
export async function getCompanyPayments(
  companyId: string,
  limit: number = 50,
  offset: number = 0
): Promise<{
  payments: Commission[]
  total: number
  pending: number
}> {
  try {
    const response = await fetch(
      `/api/companies/${companyId}/payments?limit=${limit}&offset=${offset}`
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Error getting company payments')
    }

    return data
  } catch (error) {
    console.error('[v0] Error getting company payments:', error)
    throw error
  }
}

/**
 * Obtiene resumen financiero de una empresa
 */
export async function getCompanyFinancialSummary(companyId: string): Promise<{
  totalEarnings: number
  totalPending: number
  thisMonthEarnings: number
  completedBookings: number
}> {
  try {
    const response = await fetch(`/api/companies/${companyId}/financial-summary`)

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Error getting financial summary')
    }

    return data
  } catch (error) {
    console.error('[v0] Error getting financial summary:', error)
    throw error
  }
}

export default {
  calculateCommission,
  calculateTax,
  createCheckoutSession,
  confirmPayment,
  getPaymentStatus,
  processRefund,
  generateInvoice,
  getCompanyPayments,
  getCompanyFinancialSummary,
}
