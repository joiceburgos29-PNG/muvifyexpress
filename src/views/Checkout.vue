<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <!-- Progress Indicator -->
      <div class="mb-12">
        <div class="flex items-center justify-between">
          <div v-for="(step, index) in steps" :key="step.id" class="flex items-center flex-1">
            <div
              :class="['flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm', currentStep >= index ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600']"
            >
              {{ index + 1 }}
            </div>
            <div v-if="index < steps.length - 1" :class="['flex-1 h-1 mx-2', currentStep > index ? 'bg-primary' : 'bg-gray-200']"></div>
          </div>
        </div>
        <div class="mt-4 flex justify-between text-sm">
          <div v-for="step in steps" :key="step.id" class="text-center flex-1">
            <p :class="['font-semibold', currentStep === steps.indexOf(step) ? 'text-primary' : 'text-gray-600']">
              {{ step.label }}
            </p>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-lg shadow-lg p-8">
        <!-- Step 1: Order Review -->
        <div v-if="currentStep === 0" class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-900">Revisa tu Orden</h2>

          <!-- Booking Details -->
          <div class="bg-yellow-50 rounded-lg p-6 space-y-4">
            <h3 class="font-bold text-gray-900">Detalles de la Mudanza</h3>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-600">Empresa</p>
                <p class="font-bold text-gray-900">TuMudanza Express</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Presupuesto</p>
                <p class="font-bold text-primary text-lg">2.450€</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Fecha de Mudanza</p>
                <p class="font-bold text-gray-900">25 Agosto, 2024</p>
              </div>
              <div>
                <p class="text-sm text-gray-600">Servicios</p>
                <p class="font-bold text-gray-900">Embalaje + Montaje</p>
              </div>
            </div>
          </div>

          <!-- Services Included -->
          <div class="space-y-3">
            <h3 class="font-bold text-gray-900">Servicios Incluidos</h3>
            <div class="space-y-2">
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-900">Embalaje completo de todos tus muebles</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-900">Montaje de muebles en el nuevo hogar</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-900">Seguro de daños incluido</span>
              </div>
            </div>
          </div>

          <!-- Next Button -->
          <button @click="nextStep" class="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-colors">
            Continuar al Pago
          </button>
        </div>

        <!-- Step 2: Checkout Form -->
        <div v-else-if="currentStep === 1">
          <CheckoutForm :booking="mockBooking" @submit="handleCheckoutSubmit" />
        </div>

        <!-- Step 3: Confirmation -->
        <div v-else-if="currentStep === 2" class="text-center py-12">
          <div class="mb-6">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <h2 class="text-3xl font-bold text-gray-900 mb-2">¡Pago Confirmado!</h2>
          <p class="text-gray-600 mb-8">Tu mudanza ha sido reservada exitosamente.</p>

          <!-- Confirmation Details -->
          <div class="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="text-gray-600">Número de Referencia</span>
                <span class="font-mono font-bold">MUV-2024-001234</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Empresa</span>
                <span class="font-bold">TuMudanza Express</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Monto Pagado</span>
                <span class="font-bold">2.450€</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Fecha de Mudanza</span>
                <span class="font-bold">25 Agosto, 2024</span>
              </div>
            </div>
          </div>

          <p class="text-gray-600 mb-8">
            Te hemos enviado un email de confirmación con todos los detalles y instrucciones de contacto.
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <router-link to="/client/bookings" class="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark text-center transition-colors">
              Ver mis Mudanzas
            </router-link>
            <router-link to="/" class="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-900 rounded-lg font-bold hover:border-gray-300 text-center transition-colors">
              Volver al Inicio
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CheckoutForm from '../components/CheckoutForm.vue'

const currentStep = ref(0)

const steps = [
  { id: 'review', label: 'Revisar Orden' },
  { id: 'payment', label: 'Pago' },
  { id: 'confirmation', label: 'Confirmación' },
]

const mockBooking = {
  id: 'booking-001',
  companyName: 'TuMudanza Express',
  moveDate: '2024-08-25',
  amount: 2450,
}

const nextStep = () => {
  if (currentStep.value < steps.length - 1) {
    currentStep.value++
  }
}

const handleCheckoutSubmit = (data: any) => {
  console.log('[v0] Checkout submitted:', data)
  nextStep()
}
</script>
