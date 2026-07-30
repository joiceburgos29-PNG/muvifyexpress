<template>
  <div class="min-h-screen bg-yellow-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <div class="flex justify-center mb-8">
          <img src="/logo-muvify-express.svg" alt="Muvify Express" class="h-16 w-auto">
        </div>

        <h1 class="text-3xl font-bold text-primary-dark text-center mb-8">
          Muvify Express
        </h1>

        <div class="space-y-6">
          <div>
            <h2 class="text-xl font-bold text-gray-900 mb-4">
              ¿Qué eres?
            </h2>

            <div class="space-y-3">
              <router-link 
                to="/client-login"
                class="block p-4 border-2 border-primary rounded-lg hover:border-primary-dark hover:bg-yellow-100 transition text-center font-semibold text-primary-dark"
              >
                👤 Cliente
              </router-link>

              <router-link 
                to="/company-login"
                class="block p-4 border-2 border-primary rounded-lg hover:border-primary-dark hover:bg-yellow-100 transition text-center font-semibold text-primary-dark"
              >
                🏢 Empresa de mudanzas
              </router-link>
            </div>
          </div>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">O continúa como</span>
            </div>
          </div>

          <router-link 
            to="/"
            class="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 transition rounded-lg text-center font-semibold text-gray-900"
          >
            ← Volver a inicio
          </router-link>
        </div>

        <p class="text-center text-sm text-gray-600 mt-8">
          Al continuar, aceptas nuestros
          <a href="#" class="text-primary font-semibold hover:underline">Términos de servicio</a>
          y 
          <a href="#" class="text-primary font-semibold hover:underline">Política de privacidad</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
