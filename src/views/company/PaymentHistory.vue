<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 class="text-4xl font-bold text-gray-900">Historial de Pagos</h1>
          <p class="text-gray-600 mt-2">Seguimiento de tus ganancias y comisiones</p>
        </div>
        <button class="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-colors">
          Descargar Reporte
        </button>
      </div>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-gray-600 text-sm mb-1">Ganancias Totales</p>
          <p class="text-3xl font-bold text-gray-900">18.500€</p>
          <p class="text-xs text-green-600 mt-2">+5% este mes</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-gray-600 text-sm mb-1">Pendiente de Pago</p>
          <p class="text-3xl font-bold text-yellow-600">3.200€</p>
          <p class="text-xs text-gray-500 mt-2">Se paga el próximo viernes</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-gray-600 text-sm mb-1">Mudanzas Completadas</p>
          <p class="text-3xl font-bold text-gray-900">42</p>
          <p class="text-xs text-gray-500 mt-2">Este año</p>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <p class="text-gray-600 text-sm mb-1">Comisión Promedio</p>
          <p class="text-3xl font-bold text-gray-900">15%</p>
          <p class="text-xs text-gray-500 mt-2">Tarifa estándar</p>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-white rounded-lg shadow p-4 mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <input type="text" placeholder="Buscar por referencia..." class="flex-1 input-field" />
          <select class="input-field sm:w-32">
            <option>Todos los estados</option>
            <option>Pagado</option>
            <option>Pendiente</option>
            <option>En proceso</option>
          </select>
          <select class="input-field sm:w-32">
            <option>Este mes</option>
            <option>Último mes</option>
            <option>Últimos 3 meses</option>
            <option>Última año</option>
          </select>
        </div>
      </div>

      <!-- Payment List -->
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="text-left py-3 px-6 font-semibold text-gray-700">Referencia</th>
                <th class="text-left py-3 px-6 font-semibold text-gray-700">Cliente</th>
                <th class="text-left py-3 px-6 font-semibold text-gray-700">Fecha de Mudanza</th>
                <th class="text-right py-3 px-6 font-semibold text-gray-700">Monto</th>
                <th class="text-right py-3 px-6 font-semibold text-gray-700">Tu Comisión</th>
                <th class="text-center py-3 px-6 font-semibold text-gray-700">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="payment in payments" :key="payment.id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td class="py-4 px-6">
                  <span class="font-mono font-semibold text-primary">{{ payment.reference }}</span>
                </td>
                <td class="py-4 px-6 text-gray-900">{{ payment.client }}</td>
                <td class="py-4 px-6 text-gray-600">{{ formatDate(payment.moveDate) }}</td>
                <td class="py-4 px-6 text-right">
                  <span class="font-bold text-gray-900">{{ formatCurrency(payment.amount) }}</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <span class="font-bold text-green-600">{{ formatCurrency(payment.earnings) }}</span>
                </td>
                <td class="py-4 px-6 text-center">
                  <span
                    :class="['inline-block px-3 py-1 rounded-full text-xs font-bold', getStatusBadgeClass(payment.status)]"
                  >
                    {{ getStatusLabel(payment.status) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between p-6 border-t border-gray-200">
          <p class="text-sm text-gray-600">Mostrando 1-10 de 42 pagos</p>
          <div class="flex gap-2">
            <button class="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Anterior
            </button>
            <button class="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Payment {
  id: string
  reference: string
  client: string
  moveDate: string
  amount: number
  earnings: number
  status: 'paid' | 'pending' | 'processing'
}

const payments: Payment[] = [
  {
    id: '1',
    reference: 'MUV-2024-001',
    client: 'Juan García',
    moveDate: '2024-08-15',
    amount: 2450,
    earnings: 2082.50,
    status: 'paid',
  },
  {
    id: '2',
    reference: 'MUV-2024-002',
    client: 'María López',
    moveDate: '2024-08-18',
    amount: 1800,
    earnings: 1530,
    status: 'paid',
  },
  {
    id: '3',
    reference: 'MUV-2024-003',
    client: 'Carlos Rodríguez',
    moveDate: '2024-08-22',
    amount: 2800,
    earnings: 2380,
    status: 'pending',
  },
  {
    id: '4',
    reference: 'MUV-2024-004',
    client: 'Ana Fernández',
    moveDate: '2024-08-25',
    amount: 3200,
    earnings: 2720,
    status: 'processing',
  },
  {
    id: '5',
    reference: 'MUV-2024-005',
    client: 'Pedro González',
    moveDate: '2024-08-28',
    amount: 2100,
    earnings: 1785,
    status: 'paid',
  },
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    paid: 'Pagado',
    pending: 'Pendiente',
    processing: 'En proceso',
  }
  return labels[status] || status
}

const getStatusBadgeClass = (status: string) => {
  const classes: Record<string, string> = {
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}
</script>
