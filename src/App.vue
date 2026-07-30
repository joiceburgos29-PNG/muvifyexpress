<template>
  <div class="min-h-screen bg-background text-foreground">
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold">M</span>
            </div>
            <span class="font-bold text-xl text-gray-900">Muvify Express</span>
          </div>
          <div class="hidden md:flex items-center gap-8">
            <button @click="scrollToSection('howitworks')" class="text-gray-600 hover:text-gray-900 transition">
              Cómo funciona
            </button>
            <button @click="scrollToSection('beneficios')" class="text-gray-600 hover:text-gray-900 transition">
              Beneficios
            </button>
            <button @click="scrollToSection('servicios')" class="text-gray-600 hover:text-gray-900 transition">
              Servicios
            </button>
            <router-link to="/login" class="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
              Iniciar sesión
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script setup lang="ts">
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
</style>
