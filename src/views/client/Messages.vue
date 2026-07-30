<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <router-link :to="`/client/requests/${route.params.requestId}`" class="text-primary hover:text-primary-dark">
          ← Volver
        </router-link>
      </div>
    </nav>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Mensajes</h1>

      <div class="bg-white rounded-lg shadow overflow-hidden flex flex-col h-96">
        <!-- Messages List -->
        <div class="flex-1 overflow-y-auto p-6 space-y-4">
          <div 
            v-for="message in messages" 
            :key="message.id"
            :class="['p-4 rounded-lg', message.senderRole === 'client' ? 'bg-yellow-50 ml-auto max-w-xs' : 'bg-gray-100 max-w-xs']"
          >
            <p class="text-sm font-semibold text-gray-700">{{ message.senderName }}</p>
            <p class="mt-2 text-gray-900">{{ message.message }}</p>
            <p class="text-xs text-gray-500 mt-1">{{ formatTime(message.timestamp) }}</p>
          </div>
        </div>

        <!-- Message Input -->
        <div class="border-t border-gray-200 p-4">
          <div class="flex gap-2">
            <input 
              v-model="newMessage"
              type="text"
              placeholder="Escribe tu mensaje..."
              @keyup.enter="sendMessage"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button 
              @click="sendMessage"
              class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-semibold"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClientStore } from '../../stores/clientStore'

const route = useRoute()
const clientStore = useClientStore()
const newMessage = ref('')

const requestId = route.params.requestId as string
const messages = computed(() => clientStore.getMessages(requestId))

const sendMessage = async () => {
  if (newMessage.value.trim()) {
    await clientStore.sendMessage(requestId, newMessage.value)
    newMessage.value = ''
  }
}

const formatTime = (timestamp: string) => {
  return new Date(timestamp).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
</style>
