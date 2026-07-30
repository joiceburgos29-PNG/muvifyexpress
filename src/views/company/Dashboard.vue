<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold">M</span>
            </div>
            <span class="font-bold text-lg">Muvify Express - Empresa</span>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-gray-600">{{ companyProfile?.companyName }}</span>
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

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Panel de Empresa</h1>

      <!-- Statistics Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Solicitudes Nuevas"
          :value="companyStore.newRequestsCount"
          color="blue"
        />
        <StatCard 
          title="Presupuestos Pendientes"
          :value="companyStore.pendingQuotesCount"
          color="yellow"
        />
        <StatCard 
          title="Mudanzas Próximas"
          :value="companyStore.upcomingMovesCount"
          color="green"
        />
        <StatCard 
          title="Conversión"
          :value="`${(companyStore.analytics.conversionRate * 100).toFixed(0)}%`"
          color="purple"
        />
      </div>

      <!-- Main Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Incoming Requests -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Solicitudes Entrantes</h2>
          <div class="space-y-3">
            <div 
              v-for="request in companyStore.incomingRequests.slice(0, 3)" 
              :key="request.id"
              class="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
              @click="companyStore.selectRequest(request.id)"
            >
              <div class="flex justify-between items-start">
                <div>
                  <p class="font-semibold text-gray-900">{{ request.clientName }}</p>
                  <p class="text-sm text-gray-500">{{ request.origin }} → {{ request.destination }}</p>
                  <p class="text-xs text-gray-400 mt-1">Fecha: {{ formatDate(request.date) }}</p>
                </div>
                <span :class="['px-3 py-1 rounded-full text-sm font-medium', getStatusColor(request.status)]">
                  {{ getStatusLabel(request.status) }}
                </span>
              </div>
            </div>
          </div>
          <router-link 
            to="/company/requests"
            class="mt-4 block text-center py-2 text-primary hover:text-primary-dark transition"
          >
            Ver todas las solicitudes →
          </router-link>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div class="space-y-3">
            <router-link 
              to="/company/requests"
              class="block w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition text-center font-semibold"
            >
              Ver Solicitudes
            </router-link>
            <router-link 
              to="/company/calendar"
              class="block w-full px-4 py-3 border-2 border-primary text-primary rounded-lg hover:bg-primary-50 transition text-center font-semibold"
            >
              Calendario
            </router-link>
            <router-link 
              to="/company/analytics"
              class="block w-full px-4 py-3 border-2 border-gray-200 text-gray-900 rounded-lg hover:bg-gray-50 transition text-center font-semibold"
            >
              Analytics
            </router-link>
          </div>

          <!-- Rating Widget -->
          <div class="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
            <p class="text-sm font-semibold text-blue-900">⭐ {{ companyStore.analytics.avgRating }}/5</p>
            <p class="text-xs text-blue-800">Basado en {{ companyStore.analytics.totalRequests }} reseñas</p>
          </div>
        </div>
      </div>

      <!-- Scheduled Moves -->
      <div class="mt-8 bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Próximas Mudanzas</h2>
        <div class="space-y-3">
          <div 
            v-for="move in companyStore.scheduledMoves.slice(0, 3)" 
            :key="move.id"
            class="p-4 border border-gray-200 rounded-lg flex justify-between items-center"
          >
            <div>
              <p class="font-semibold text-gray-900">{{ move.clientName }}</p>
              <p class="text-sm text-gray-500">{{ move.destination }}</p>
              <p class="text-xs text-gray-400">{{ formatDateTime(move.date, move.time) }}</p>
            </div>
            <span :class="['px-3 py-1 rounded-full text-sm font-medium', getMoveStatusColor(move.status)]">
              {{ getMoveStatusLabel(move.status) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '../../stores/authStore'
import { useCompanyStore } from '../../stores/companyStore'
import StatCard from '../../components/company/StatCard.vue'

const authStore = useAuthStore()
const companyStore = useCompanyStore()

const companyProfile = computed(() => authStore.companyProfile)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES')
}

const formatDateTime = (date: string, time: string) => {
  return `${new Date(date).toLocaleDateString('es-ES')} a las ${time}`
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    new: 'Nueva',
    viewed: 'Revisada',
    quoted: 'Presupuestada',
    rejected: 'Rechazada'
  }
  return labels[status]
}

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    new: 'bg-red-100 text-red-800',
    viewed: 'bg-blue-100 text-blue-800',
    quoted: 'bg-green-100 text-green-800',
    rejected: 'bg-gray-100 text-gray-800'
  }
  return colors[status]
}

const getMoveStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    scheduled: 'Programada',
    in_progress: 'En Curso',
    completed: 'Completada'
  }
  return labels[status]
}

const getMoveStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    scheduled: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  }
  return colors[status]
}
</script>

<style scoped>
</style>
