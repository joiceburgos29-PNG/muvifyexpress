<template>
  <main class="bg-background">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-b from-yellow-50 to-white pt-20 pb-24 md:pt-32 md:pb-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <!-- Left side - Content -->
          <div class="flex flex-col justify-center">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Encuentra la mejor empresa de mudanzas en minutos
            </h1>
            <p class="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Compara hasta 3 presupuestos gratuitos de empresas verificadas. Sin llamadas interminables. Sin compromiso. Solo elige la mejor opción.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <button @click="scrollToForm" class="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition transform hover:scale-105 active:scale-95">
                Solicitar presupuesto
              </button>
              <button @click="scrollToSection('howitworks')" class="px-8 py-4 border-2 border-primary text-primary-dark rounded-lg font-semibold hover:bg-yellow-100 transition">
                Cómo funciona
              </button>
            </div>
          </div>

          <!-- Right side - Form -->
          <div class="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
            <QuoteForm ref="formRef" />
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Bar -->
    <section class="bg-white border-b border-gray-200 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div class="text-3xl font-bold text-primary mb-2">⭐⭐⭐⭐⭐</div>
            <p class="text-gray-600">Más de 5,000 solicitudes gestionadas</p>
          </div>
          <div>
            <div class="text-3xl font-bold text-primary mb-2">✓</div>
            <p class="text-gray-600">Empresas verificadas y aseguradas</p>
          </div>
          <div>
            <div class="text-3xl font-bold text-primary mb-2">⚡</div>
            <p class="text-gray-600">Respuesta en menos de 24 horas</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section id="howitworks" class="py-20 md:py-32 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
          Cómo funciona
        </h2>

        <!-- Desktop View - Horizontal flow -->
        <div class="hidden md:flex items-stretch justify-between gap-2 overflow-x-auto pb-4">
          <!-- Step 1 -->
          <div class="flex flex-col items-center flex-shrink-0 relative" style="min-width: 180px;">
            <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 relative z-10">
              1
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2 text-center">Solicita presupuesto</h3>
            <p class="text-gray-600 text-sm text-center">Completa el formulario con los detalles de tu mudanza.</p>
          </div>

          <!-- Arrow 1 -->
          <div class="flex items-start justify-center flex-shrink-0 pt-6">
            <div class="text-4xl text-primary leading-none">→</div>
          </div>

          <!-- Step 2 -->
          <div class="flex flex-col items-center flex-shrink-0 relative" style="min-width: 180px;">
            <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 relative z-10">
              2
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2 text-center">Comparamos empresas</h3>
            <p class="text-gray-600 text-sm text-center">Nuestro sistema encuentra las mejores opciones.</p>
          </div>

          <!-- Arrow 2 -->
          <div class="flex items-start justify-center flex-shrink-0 pt-6">
            <div class="text-4xl text-primary leading-none">→</div>
          </div>

          <!-- Step 3 -->
          <div class="flex flex-col items-center flex-shrink-0 relative" style="min-width: 180px;">
            <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 relative z-10">
              3
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2 text-center">Recibe ofertas</h3>
            <p class="text-gray-600 text-sm text-center">Recibirás hasta 3 presupuestos gratuitos.</p>
          </div>

          <!-- Arrow 3 -->
          <div class="flex items-start justify-center flex-shrink-0 pt-6">
            <div class="text-4xl text-primary leading-none">→</div>
          </div>

          <!-- Step 4 -->
          <div class="flex flex-col items-center flex-shrink-0 relative" style="min-width: 180px;">
            <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 relative z-10">
              4
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2 text-center">Reserva online</h3>
            <p class="text-gray-600 text-sm text-center">Elige la mejor opción y confirma tu reserva.</p>
          </div>

          <!-- Arrow 4 -->
          <div class="flex items-start justify-center flex-shrink-0 pt-6">
            <div class="text-4xl text-primary leading-none">→</div>
          </div>

          <!-- Step 5 -->
          <div class="flex flex-col items-center flex-shrink-0 relative" style="min-width: 180px;">
            <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mb-4 relative z-10">
              5
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2 text-center">Realizas tu mudanza</h3>
            <p class="text-gray-600 text-sm text-center">Nuestro equipo profesional realiza tu traslado.</p>
          </div>
        </div>

        <!-- Mobile View - Vertical flow -->
        <div class="md:hidden space-y-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Solicita presupuesto</h3>
            <p class="text-gray-600">Completa el formulario con los detalles de tu mudanza.</p>
          </div>

          <div class="flex justify-center text-3xl text-primary">↓</div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Comparamos empresas</h3>
            <p class="text-gray-600">Nuestro sistema encuentra las mejores opciones.</p>
          </div>

          <div class="flex justify-center text-3xl text-primary">↓</div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Recibe ofertas</h3>
            <p class="text-gray-600">Recibirás hasta 3 presupuestos gratuitos.</p>
          </div>

          <div class="flex justify-center text-3xl text-primary">↓</div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              4
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Reserva online</h3>
            <p class="text-gray-600">Elige la mejor opción y confirma tu reserva.</p>
          </div>

          <div class="flex justify-center text-3xl text-primary">↓</div>

          <div class="text-center">
            <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              5
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Realizas tu mudanza</h3>
            <p class="text-gray-600">Nuestro equipo profesional realiza tu traslado sin preocupaciones.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits -->
    <section id="beneficios" class="py-20 md:py-32 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
          Por qué elegirnos
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-lg transition">
            <div class="text-4xl mb-4">⏱️</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Ahorra tiempo</h3>
            <p class="text-gray-600">Olvídate de llamadas. Recibe presupuestos en tu bandeja.</p>
          </div>

          <div class="p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-lg transition">
            <div class="text-4xl mb-4">✓</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Empresas verificadas</h3>
            <p class="text-gray-600">Todas nuestras empresas son profesionales y aseguradas.</p>
          </div>

          <div class="p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-lg transition">
            <div class="text-4xl mb-4">🔒</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Sin compromiso</h3>
            <p class="text-gray-600">Recibe presupuestos sin obligación de contratación.</p>
          </div>

          <div class="p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-lg transition">
            <div class="text-4xl mb-4">👥</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Atención personalizada</h3>
            <p class="text-gray-600">Nuestro equipo está disponible para ayudarte.</p>
          </div>

          <div class="p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-lg transition">
            <div class="text-4xl mb-4">💰</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Precios transparentes</h3>
            <p class="text-gray-600">Sin costes ocultos. Presupuestos claros y detallados.</p>
          </div>

          <div class="p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-lg transition">
            <div class="text-4xl mb-4">🌟</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-3">Mejor opción</h3>
            <p class="text-gray-600">Compara y elige la empresa que mejor se adapte a ti.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services -->
    <section id="servicios" class="py-20 md:py-32 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-16">
          Nuestros servicios
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition">
            <div class="text-5xl mb-4">🚚</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Mudanzas particulares</h3>
            <p class="text-gray-600">Traslada tu hogar de forma segura y profesional.</p>
          </div>

          <div class="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition">
            <div class="text-5xl mb-4">🏢</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Mudanzas de oficinas</h3>
            <p class="text-gray-600">Minimiza el tiempo de parada de tu negocio.</p>
          </div>

          <div class="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition">
            <div class="text-5xl mb-4">📦</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Guardamuebles</h3>
            <p class="text-gray-600">Almacena tus cosas de forma segura y accesible.</p>
          </div>

          <div class="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition">
            <div class="text-5xl mb-4">🎁</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Embalaje</h3>
            <p class="text-gray-600">Protege tus objetos frágiles y valiosos.</p>
          </div>

          <div class="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition">
            <div class="text-5xl mb-4">🛋️</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Montaje y desmontaje</h3>
            <p class="text-gray-600">Nuestros profesionales montan todo por ti.</p>
          </div>

          <div class="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition">
            <div class="text-5xl mb-4">✈️</div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Transporte urgente</h3>
            <p class="text-gray-600">Entregas rápidas cuando las necesitas.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 md:py-32 bg-gradient-to-r from-primary to-primary-dark text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          ¿Preparado para mudarte?
        </h2>
        <p class="text-xl md:text-2xl mb-8 text-blue-100">
          Solicita tu presupuesto gratuito en menos de 5 minutos
        </p>
        <button @click="scrollToForm" class="px-8 py-4 bg-white text-primary rounded-lg font-bold hover:bg-gray-100 transition transform hover:scale-105 active:scale-95 text-lg">
          Obtener presupuesto gratuito
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">M</span>
              </div>
              <span class="font-bold text-white">Muvify Express</span>
            </div>
            <p class="text-sm">La plataforma inteligente para comparar y reservar mudanzas.</p>
          </div>

          <div>
            <h4 class="text-white font-bold mb-4">Empresa</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition">Sobre nosotros</a></li>
              <li><a href="#" class="hover:text-white transition">Blog</a></li>
              <li><a href="#" class="hover:text-white transition">Prensa</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-bold mb-4">Legal</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="#" class="hover:text-white transition">Términos de servicio</a></li>
              <li><a href="#" class="hover:text-white transition">Política de privacidad</a></li>
              <li><a href="#" class="hover:text-white transition">Cookies</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-bold mb-4">Contacto</h4>
            <ul class="space-y-2 text-sm">
              <li>📧 <a href="mailto:info@muvify.es" class="hover:text-white transition">info@muvify.es</a></li>
              <li>📞 <a href="tel:+34664071404" class="hover:text-white transition">+34 664 071 404</a></li>
              <li>💬 <a href="https://wa.me/34664071404" target="_blank" rel="noopener noreferrer" class="hover:text-white transition">WhatsApp: +34 664 071 404</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 pt-8 text-sm text-center">
          <p>&copy; 2024 Muvify Express. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QuoteForm from '../components/QuoteForm.vue'

const formRef = ref()

const scrollToForm = () => {
  const element = document.querySelector('[data-form]')
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
</style>
