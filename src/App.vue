<template>
  <div class="min-h-screen bg-background text-foreground">
    <nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-4">
          <router-link to="/" class="flex items-center gap-2 hover:opacity-80 transition">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/LOGO.MUVIFY.EXPRESS-tUJWSv6v0CIkHijScsOU1nBD6PpmQL.png" alt="Muvify Express Logo" class="h-48 w-auto">
          </router-link>
          <div class="hidden md:flex items-center gap-8">
            <button @click="scrollToSection('howitworks')" class="text-primary-dark hover:text-primary transition font-medium">
              Cómo funciona
            </button>
            <button @click="scrollToSection('beneficios')" class="text-primary-dark hover:text-primary transition font-medium">
              Beneficios
            </button>
            <button @click="scrollToSection('servicios')" class="text-primary-dark hover:text-primary transition font-medium">
              Servicios
            </button>
            <router-link to="/login" class="px-6 py-2 bg-primary text-primary-dark rounded-lg hover:bg-accent transition font-bold">
              Iniciar sesión
            </router-link>
            <a href="https://wa.me/34664071404" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-bold">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.734.745 5.401 2.158 7.693L3.129 21.98l8.227-2.158a9.882 9.882 0 004.594 1.168h.005c5.445 0 9.869-4.424 9.869-9.869 0-2.631-.997-5.09-2.809-6.949A9.825 9.825 0 0011.051 6.979z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </nav>

    <router-view />

    <!-- Botón flotante de WhatsApp para móvil -->
    <a href="https://wa.me/34664071404" target="_blank" rel="noopener noreferrer" class="fixed bottom-8 right-8 md:hidden bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-40">
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.734.745 5.401 2.158 7.693L3.129 21.98l8.227-2.158a9.882 9.882 0 004.594 1.168h.005c5.445 0 9.869-4.424 9.869-9.869 0-2.631-.997-5.09-2.809-6.949A9.825 9.825 0 0011.051 6.979z"/>
      </svg>
    </a>
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
