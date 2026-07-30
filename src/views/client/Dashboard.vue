<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Navbar -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold">M</span>
            </div>
            <span class="font-bold text-lg">Muvify Express - Cliente</span>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-gray-600">{{ authStore.user?.fullName }}</span>
            <button 
              @click="authStore.logout"
              class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Mi Panel de Control</h1>

      <!-- Statistics Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Solicitudes"
          :value="clientStore.requestsCount"
          color="blue"
        />
        <StatCard 
          title="Pendientes"
          :value="clientStore.pendingCount"
          color="yellow"
        />
        <StatCard 
          title="Con Presupuestos"
          :value="clientStore.quotedCount"
          color="green"
        />
        <StatCard 
          title="Mudanzas Confirmadas"
          :value="clientStore.bookedCount"
          color="purple"
        />
      </div>

      <!-- Recent Activity Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Recent Requests -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Solicitudes Recientes</h2>
          <div class="space-y-3">
            <div 
              v-for="request in recentRequests" 
              :key="request.id"
              class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
              @click="goToRequest(request.id)"
            >
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-semibold text-gray-900">{{ request.origin }} → {{ request.destination }}</p>
                  <p class="text-sm text-gray-500">Fecha: {{ formatDate(request.date) }}</p>
                </div>
                <span :class="['px-3 py-1 rounded-full text-sm font-medium', statusColor(request.status)]">
                  {{ statusLabel(request.status) }}
                </span>
              </div>
            </div>
          </div>
          <router-link 
            to="/client/requests"
            class="mt-4 block text-center py-2 text-primary hover:text-blue-700 transition"
          >
            Ver todas las solicitudes →
          </router-link>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div class="space-y-3">
            <router-link 
              to="/"
              class="block w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition text-center font-semibold"
            >
              Nueva Solicitud
            </router-link>
            <router-link 
              to="/client/bookings"
              class="block w-full px-4 py-3 border-2 border-primary text-primary rounded-lg hover:bg-blue-50 transition text-center font-semibold"
            >
              Mis Mudanzas
            </router-link>
            <router-link 
              to="/client/requests"
              class="block w-full px-4 py-3 border-2 border-gray-200 text-gray-900 rounded-lg hover:bg-gray-50 transition text-center font-semibold"
            >
              Historial
            </router-link>
          </div>

          <!-- Unread Messages -->
          <div v-if="clientStore.unreadMessagesCount > 0" class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p class="text-sm font-semibold text-blue-900">
              Tienes {{ clientStore.unreadMessagesCount }} mensaje(s) sin leer
            </p>
          </div>
        </div>
      </div>

      <!-- Active Quotes -->
      <div v-if="activeQuotes.length > 0" class="mt-8 bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Presupuestos Disponibles</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            v-for="quote in activeQuotes.slice(0, 3)" 
            :key="quote.id"
            class="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
          >
            <h3 class="font-semibold text-gray-900">{{ quote.companyName }}</h3>
            <div class="mt-2 flex items-center justify-between">
              <span class="text-2xl font-bold text-primary">{{ quote.price }}€</span>
              <span class="text-sm text-gray-500">{{ quote.estimatedHours }}h</span>
            </div>
            <div class="mt-2 flex items-center gap-1 text-sm text-gray-600">
              <span>⭐ {{ quote.rating }}</span>
              <span>({{ quote.reviews }} opiniones)</span>
            </div>
            <button 
              @click="clientStore.selectRequest(quote.requestId)"
              class="w-full mt-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
            >
              Ver Detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/authStore'
import { useClientStore } from '../../stores/clientStore'
import StatCard from '../../components/client/StatCard.vue'

const router = useRouter()
const authStore = useAuthStore()
const clientStore = useClientStore()

const recentRequests = computed(() => clientStore.requests.slice(0, 3))
const activeQuotes = computed(() => clientStore.quotes.filter(q => q.status === 'pending'))

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const statusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Pendiente',
    quoted: 'Con Presupuestos',
    booked: 'Confirmada',
    completed: 'Completada'
  }
  return labels[status] || status
}

const statusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    quoted: 'bg-blue-100 text-blue-800',
    booked: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800'
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

const goToRequest = (requestId: string) => {
  clientStore.selectRequest(requestId)
  router.push(`/client/requests/${requestId}`)
}
</script>

<style scoped>
</style>
