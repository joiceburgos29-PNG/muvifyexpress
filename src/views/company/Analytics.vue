<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <router-link to="/company/dashboard" class="text-primary hover:text-primary-dark">
          ← Volver al Panel
        </router-link>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Analytics y Estadísticas</h1>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p class="text-gray-600 text-sm">Total de Solicitudes</p>
          <p class="text-4xl font-bold text-primary">{{ analytics.totalRequests }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <p class="text-gray-600 text-sm">Total de Presupuestos</p>
          <p class="text-4xl font-bold text-yellow-600">{{ analytics.totalQuotes }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p class="text-gray-600 text-sm">Tasa de Conversión</p>
          <p class="text-4xl font-bold text-green-600">{{ (analytics.conversionRate * 100).toFixed(0) }}%</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <p class="text-gray-600 text-sm">Ingresos Totales</p>
          <p class="text-4xl font-bold text-purple-600">{{ analytics.totalRevenue }}€</p>
        </div>
      </div>

      <!-- Charts Placeholder -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Ingresos por Mes</h2>
          <div class="h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">
            Gráfico de ingresos (implementar con Chart.js)
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Top Ciudades</h2>
          <div class="space-y-3">
            <div v-for="city in analytics.topCities" :key="city.city" class="flex justify-between items-center">
              <span class="text-gray-900 font-semibold">{{ city.city }}</span>
              <div class="flex items-center gap-2">
                <div class="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    class="h-full bg-primary transition-all"
                    :style="{ width: (city.count / 20 * 100) + '%' }"
                  ></div>
                </div>
                <span class="text-gray-600 font-semibold">{{ city.count }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCompanyStore } from '../../stores/companyStore'

const companyStore = useCompanyStore()

const analytics = computed(() => companyStore.analytics)
</script>

<style scoped>
</style>
