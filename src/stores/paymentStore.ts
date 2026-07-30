import { defineStore } from 'pinia'
import {
  createCheckoutSession,
  confirmPayment,
  getPaymentStatus,
  processRefund,
  generateInvoice,
  getCompanyPayments,
  getCompanyFinancialSummary,
  calculateCommission,
  calculateTax,
  type Booking,
  type Invoice,
  type Commission,
} from '../services/paymentService'

interface BookingState {
  currentBooking: Booking | null
  bookings: Booking[]
  invoices: Invoice[]
  loading: boolean
  error: string | null
}

export const usePaymentStore = defineStore('payment', {
  state: (): BookingState => ({
    currentBooking: null,
    bookings: [],
    invoices: [],
    loading: false,
    error: null,
  }),

  getters: {
    /**
     * Obtiene todos los pagos completados
     */
    completedPayments: (state) => {
      return state.bookings.filter((booking) => booking.status === 'completed')
    },

    /**
     * Obtiene todos los pagos pendientes
     */
    pendingPayments: (state) => {
      return state.bookings.filter((booking) => booking.status === 'pending')
    },

    /**
     * Obtiene todos los pagos fallidos
     */
    failedPayments: (state) => {
      return state.bookings.filter((booking) => booking.status === 'failed')
    },

    /**
     * Calcula el total pagado
     */
    totalPaid: (state) => {
      return state.bookings
        .filter((b) => b.status === 'completed')
        .reduce((sum, b) => sum + b.amount, 0)
    },

    /**
     * Calcula el total pendiente
     */
    totalPending: (state) => {
      return state.bookings
        .filter((b) => b.status === 'pending')
        .reduce((sum, b) => sum + b.amount, 0)
    },
  },

  actions: {
    /**
     * Crea una reserva e inicia el checkout
     */
    async startCheckout(
      booking: Booking,
      clientEmail: string,
      successUrl: string,
      cancelUrl: string
    ): Promise<void> {
      this.loading = true
      this.error = null

      try {
        const sessionId = await createCheckoutSession(
          booking,
          clientEmail,
          successUrl,
          cancelUrl
        )

        this.currentBooking = booking
        this.bookings.push(booking)

        // Redirigir a Stripe (en producción)
        // window.location.href = `https://checkout.stripe.com/pay/${sessionId}`

        console.log('[v0] Checkout session created:', sessionId)
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Error creating checkout'
        console.error('[v0] Checkout error:', err)
      } finally {
        this.loading = false
      }
    },

    /**
     * Confirma el pago
     */
    async confirmBookingPayment(
      bookingId: string,
      stripePaymentIntentId: string
    ): Promise<Booking> {
      this.loading = true
      this.error = null

      try {
        const updatedBooking = await confirmPayment(bookingId, stripePaymentIntentId)

        const index = this.bookings.findIndex((b) => b.id === bookingId)
        if (index !== -1) {
          this.bookings[index] = updatedBooking
        }

        if (this.currentBooking?.id === bookingId) {
          this.currentBooking = updatedBooking
        }

        console.log('[v0] Payment confirmed:', updatedBooking)
        return updatedBooking
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Error confirming payment'
        console.error('[v0] Payment confirmation error:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Obtiene el estado de un pago
     */
    async checkPaymentStatus(bookingId: string): Promise<Booking> {
      try {
        const booking = await getPaymentStatus(bookingId)

        const index = this.bookings.findIndex((b) => b.id === bookingId)
        if (index !== -1) {
          this.bookings[index] = booking
        } else {
          this.bookings.push(booking)
        }

        return booking
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Error checking payment status'
        console.error('[v0] Payment status error:', err)
        throw err
      }
    },

    /**
     * Procesa un reembolso
     */
    async refundBooking(bookingId: string, reason: string): Promise<void> {
      this.loading = true
      this.error = null

      try {
        await processRefund(bookingId, reason)

        const index = this.bookings.findIndex((b) => b.id === bookingId)
        if (index !== -1) {
          this.bookings[index].status = 'refunded'
        }

        console.log('[v0] Refund processed for booking:', bookingId)
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Error processing refund'
        console.error('[v0] Refund error:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Genera una factura
     */
    async createInvoice(bookingId: string): Promise<Invoice> {
      this.loading = true
      this.error = null

      try {
        const invoice = await generateInvoice(bookingId)
        this.invoices.push(invoice)
        console.log('[v0] Invoice generated:', invoice)
        return invoice
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Error generating invoice'
        console.error('[v0] Invoice error:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Obtiene historial de pagos de una empresa
     */
    async fetchCompanyPayments(
      companyId: string,
      limit?: number,
      offset?: number
    ): Promise<Commission[]> {
      this.loading = true
      this.error = null

      try {
        const data = await getCompanyPayments(companyId, limit, offset)
        console.log('[v0] Company payments fetched:', data)
        return data.payments
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Error fetching payments'
        console.error('[v0] Company payments error:', err)
        throw err
      } finally {
        this.loading = false
      }
    },

    /**
     * Limpia el estado
     */
    reset(): void {
      this.currentBooking = null
      this.bookings = []
      this.invoices = []
      this.loading = false
      this.error = null
    },
  },
})
