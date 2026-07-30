<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header -->
      <div class="mb-8">
        <router-link to="/client/requests" class="text-primary hover:text-primary-dark font-semibold mb-4 inline-flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Volver a solicitudes
        </router-link>

        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
          <div>
            <h1 class="text-4xl font-bold text-gray-900">Presupuestos Disponibles</h1>
            <p class="text-gray-600 mt-2">Para tu mudanza del {{ requestDate }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-600">Solicitud ID</p>
            <p class="text-lg font-mono font-semibold text-primary">#{{ route.params.requestId }}</p>
          </div>
        </div>
      </div>

      <!-- Quote Comparator -->
      <QuoteComparator :quotes="mockQuotes" @accept="handleAcceptQuote" />

      <!-- Booking Confirmation Modal -->
      <Teleport to="body" v-if="showConfirmation">
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div class="bg-white rounded-lg shadow-2xl max-w-md w-full p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Confirmar Reserva</h2>
            <p class="text-gray-600 mb-6">
              ¿Deseas proceder con la reserva de <strong>{{ selectedQuote?.company.name }}</strong> por <strong>{{ formatCurrency(selectedQuote?.totalPrice || 0) }}</strong>?
            </p>
            <div class="flex gap-3">
              <button
                @click="showConfirmation = false"
                class="flex-1 px-4 py-2 border-2 border-gray-200 text-gray-900 rounded-lg font-semibold hover:border-gray-300"
              >
                Cancelar
              </button>
              <button
                @click="confirmBooking"
                class="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </Teleport>

      <!-- Success Message -->
      <Teleport to="body" v-if="bookingSuccess">
        <div class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Reserva confirmada con éxito. Recibirás instrucciones por email.
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import QuoteComparator from '../../components/QuoteComparator.vue'

interface Quote {
  id: string
  company: {
    id: string
    name: string
    logo: string
    rating: number
    reviews: number
    yearsExperience: number
  }
  totalPrice: number
  services: string[]
  availableDate: string
  description: string
  createdAt: string
}

const route = useRoute()
const router = useRouter()

const requestDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
})

// Mock quotes with realistic data
const mockQuotes = ref<Quote[]>([
  {
    id: '1',
    company: {
      id: 'comp1',
      name: 'TuMudanza Express',
      logo: 'https://via.placeholder.com/48/2563EB/ffffff?text=TM',
      rating: 4.8,
      reviews: 156,
      yearsExperience: 8
    },
    totalPrice: 2450,
    services: ['Embalaje completo', 'Montaje de muebles', 'Seguro incluido'],
    availableDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Servicio completo con equipo profesional. Incluye seguro de daños y responsabilidad civil.',
    createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    company: {
      id: 'comp2',
      name: 'Mudanzas Elite',
      logo: 'https://via.placeholder.com/48/10B981/ffffff?text=ME',
      rating: 4.9,
      reviews: 342,
      yearsExperience: 12
    },
    totalPrice: 2800,
    services: ['Embalaje premium', 'Montaje y desmontaje', 'Almacenamiento temporal'],
    availableDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Empresa certificada con más de una década en el sector. Garantía de satisfacción.',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    company: {
      id: 'comp3',
      name: 'Transportes López',
      logo: 'https://via.placeholder.com/48/F59E0B/ffffff?text=TL',
      rating: 4.6,
      reviews: 89,
      yearsExperience: 5
    },
    totalPrice: 2100,
    services: ['Embalaje básico', 'Carga y descarga'],
    availableDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Opción económica con calidad garantizada. Equipo joven y dinámico.',
    createdAt: new Date(Date.now() - 120 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    company: {
      id: 'comp4',
      name: 'Premium Moving Co',
      logo: 'https://via.placeholder.com/48/8B5CF6/ffffff?text=PM',
      rating: 4.7,
      reviews: 210,
      yearsExperience: 15
    },
    totalPrice: 3200,
    services: ['Embalaje de lujo', 'Coordinador de proyecto', 'Almacenamiento 30 días gratis'],
    availableDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    description: 'Servicio de gama alta para mudanzas complejas y exigentes.',
    createdAt: new Date(Date.now() - 90 * 60 * 1000).toISOString()
  }
])

const selectedQuote = ref<Quote | null>(null)
const showConfirmation = ref(false)
const bookingSuccess = ref(false)

const handleAcceptQuote = (quote: Quote) => {
  selectedQuote.value = quote
  showConfirmation.value = true
}

const confirmBooking = () => {
  if (selectedQuote.value) {
    console.log('[v0] Booking confirmed:', selectedQuote.value)
    showConfirmation.value = false
    bookingSuccess.value = true
    
    setTimeout(() => {
      router.push('/client/bookings')
    }, 2000)
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount)
}
</script>
