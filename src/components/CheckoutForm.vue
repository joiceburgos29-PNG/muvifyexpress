<template>
  <div class="w-full">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-gray-900">Completa tu Compra</h2>
      <p class="text-gray-600 mt-2">Información de pago segura y protegida</p>
    </div>

    <!-- Main Grid: Form + Summary -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Form (2/3) -->
      <form @submit.prevent="handleSubmit" class="lg:col-span-2 space-y-6">
        <!-- Service Summary -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 class="font-semibold text-gray-900 mb-4">Resumen del Servicio</h3>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Empresa</span>
              <span class="font-semibold text-gray-900">{{ booking.companyName }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Fecha de Mudanza</span>
              <span class="font-semibold text-gray-900">{{ formatDate(booking.moveDate) }}</span>
            </div>
            <div class="flex justify-between text-sm border-t border-blue-200 pt-3">
              <span class="text-gray-900 font-semibold">Monto Total</span>
              <span class="text-primary font-bold text-lg">{{ formatCurrency(booking.amount) }}</span>
            </div>
          </div>
        </div>

        <!-- Personal Information -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-4">Información Personal</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
              <input
                v-model="form.fullName"
                type="text"
                class="input-field"
                placeholder="Juan García López"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                v-model="form.email"
                type="email"
                class="input-field"
                placeholder="tu@email.com"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                v-model="form.phone"
                type="tel"
                class="input-field"
                placeholder="+34 600 000 000"
                required
              />
            </div>
          </div>
        </div>

        <!-- Billing Address -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-4">Dirección de Facturación</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Calle</label>
              <input
                v-model="form.address"
                type="text"
                class="input-field"
                placeholder="Calle Principal 123"
                required
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
                <input
                  v-model="form.city"
                  type="text"
                  class="input-field"
                  placeholder="Madrid"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                <input
                  v-model="form.postalCode"
                  type="text"
                  class="input-field"
                  placeholder="28001"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Payment Method -->
        <div>
          <h3 class="font-semibold text-gray-900 mb-4">Método de Pago</h3>
          <div class="space-y-4">
            <div class="border-2 border-primary rounded-lg p-4 bg-blue-50">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  v-model="form.paymentMethod"
                  type="radio"
                  value="card"
                  class="w-4 h-4"
                />
                <div>
                  <p class="font-semibold text-gray-900">Tarjeta de Crédito/Débito</p>
                  <p class="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                </div>
              </label>
            </div>

            <div class="border-2 border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  v-model="form.paymentMethod"
                  type="radio"
                  value="bank"
                  class="w-4 h-4"
                  disabled
                />
                <div>
                  <p class="font-semibold text-gray-900 opacity-50">Transferencia Bancaria</p>
                  <p class="text-sm text-gray-600 opacity-50">Próximamente</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Stripe Card Element (Mock) -->
        <div v-if="form.paymentMethod === 'card'">
          <h3 class="font-semibold text-gray-900 mb-4">Información de la Tarjeta</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Número de Tarjeta</label>
              <div class="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 font-mono text-sm text-gray-600">
                4242 4242 4242 4242
              </div>
              <p class="text-xs text-gray-500 mt-1">Tarjeta de prueba Stripe</p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Expiración</label>
                <div class="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 font-mono text-sm text-gray-600">
                  12/25
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                <div class="border-2 border-gray-200 rounded-lg p-4 bg-gray-50 font-mono text-sm text-gray-600">
                  123
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Conditions -->
        <div class="flex items-start gap-3">
          <input
            v-model="form.agreeTerms"
            type="checkbox"
            class="w-5 h-5 mt-0.5"
            required
          />
          <label class="text-sm text-gray-600">
            Acepto los <a href="#" class="text-primary hover:underline">términos y condiciones</a>
            y la <a href="#" class="text-primary hover:underline">política de privacidad</a>
          </label>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          :disabled="loading || !form.agreeTerms"
          class="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          <span v-if="!loading">Pagar {{ formatCurrency(booking.amount) }}</span>
          <span v-else class="flex items-center justify-center gap-2">
            <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Procesando...
          </span>
        </button>

        <!-- Error Message -->
        <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-sm text-red-800">{{ error }}</p>
        </div>
      </form>

      <!-- Summary (1/3) -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-lg p-6 sticky top-8">
          <h3 class="font-bold text-gray-900 mb-6">Resumen de Pago</h3>

          <div class="space-y-4 mb-6 pb-6 border-b border-gray-200">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Presupuesto Base</span>
              <span class="text-gray-900">{{ formatCurrency(baseAmount) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">IVA (21%)</span>
              <span class="text-gray-900">{{ formatCurrency(taxAmount) }}</span>
            </div>
          </div>

          <div class="flex justify-between mb-6">
            <span class="font-semibold text-gray-900">Total a Pagar</span>
            <span class="text-2xl font-bold text-primary">{{ formatCurrency(booking.amount) }}</span>
          </div>

          <!-- Security Badge -->
          <div class="bg-green-50 border border-green-200 rounded-lg p-4">
            <div class="flex items-center gap-2 mb-2">
              <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              <p class="text-sm font-semibold text-green-800">Pago 100% Seguro</p>
            </div>
            <p class="text-xs text-green-700">
              Protegido por Stripe. Tus datos de pago no se comparten con nadie.
            </p>
          </div>

          <!-- SSL Certificate -->
          <div class="mt-4 text-center text-xs text-gray-600">
            <p>🔒 Conexión Segura SSL/TLS</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Booking {
  id: string
  companyName: string
  moveDate: string
  amount: number
}

interface Props {
  booking: Booking
}

const props = defineProps<Props>()
const emit = defineEmits<{
  submit: [data: any]
}>()

const loading = ref(false)
const error = ref('')

const form = ref({
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  paymentMethod: 'card',
  agreeTerms: false,
})

const baseAmount = computed(() => Math.round(props.booking.amount / 1.21))
const taxAmount = computed(() => props.booking.amount - baseAmount.value)

const handleSubmit = async () => {
  if (!form.value.agreeTerms) {
    error.value = 'Debes aceptar los términos y condiciones'
    return
  }

  loading.value = true
  error.value = ''

  try {
    // Simular procesamiento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    emit('submit', {
      ...form.value,
      amount: props.booking.amount,
      bookingId: props.booking.id,
    })

    console.log('[v0] Payment submitted:', form.value)
  } catch (err) {
    error.value = 'Error al procesar el pago. Por favor intenta de nuevo.'
    console.error('[v0] Payment error:', err)
  } finally {
    loading.value = false
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>
