# Muvify Express 2.0

**La plataforma inteligente para comparar y reservar mudanzas**

Competencia directa con Habitissimo, ProntoPro y Cronoshare, pero especializada 100% en mudanzas.

## 🎯 Filosofía

No vendemos una mudanza. Vendemos:
- **Tranquilidad** - Todo es fácil y transparente
- **Transparencia** - Presupuestos claros, sin sorpresas
- **Confianza** - Empresas verificadas y aseguradas

El usuario no busca una empresa. **Busca alguien que le resuelva el problema**.

---

## 📋 Fases del Proyecto

### ✅ Fase 1: Landing Page + Solicitud de Presupuestos (COMPLETA)

**Status:** MVP funcional

**Incluye:**
- Landing page premium con hero section
- Formulario inteligente de 3 pasos
- Barra de confianza con métricas
- Sección "Cómo funciona" con timeline animada
- Beneficios destacados (6 tarjetas)
- Grid de servicios
- CTA principal
- Footer completo

**Tecnologías:**
- Vue 3 + Vite
- Vue Router 4
- Pinia (state management)
- Tailwind CSS 3.4
- TypeScript
- Axios

---

### 📅 Fase 2: Área Cliente y Dashboard de Empresas (TODO)

**Objetivos:**
- Panel de control para clientes
- Panel de control para empresas
- Historial de solicitudes
- Gestión de presupuestos

---

### 🔄 Fase 3: Comparador en Tiempo Real (TODO)

**Objetivos:**
- Matching automático entre clientes y empresas
- Comparador visual de presupuestos
- Sistema de rankings y reviews

---

### 💳 Fase 4: Pagos y Reservas Online (TODO)

**Objetivos:**
- Integración con Stripe
- Sistema de comisiones
- Facturación automática

---

### 📱 Fase 5: Aplicación Móvil (TODO)

**Objetivos:**
- App iOS y Android
- Push notifications
- Sincronización

---

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   └── QuoteForm.vue        # Formulario inteligente
├── views/
│   ├── Home.vue             # Landing page
│   └── Login.vue            # Página de login
├── router/
│   └── index.ts             # Configuración de rutas
├── App.vue                  # Componente raíz
├── main.ts                  # Entry point
└── index.css                # Estilos globales
```

---

## 🎨 Diseño

### Paleta de Colores
- **Primario:** #2563EB (Azul)
- **Primario Oscuro:** #1E3A8A
- **Secundario:** #F8FAFC (Gris claro)
- **Accent:** #06B6D4 (Cyan)

### Tipografía
- **Headings:** Poppins (700)
- **Body:** Inter (400-700)

---

## 🚀 Instalación

```bash
# Instalar dependencias
npm install --legacy-peer-deps

# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Linting
npm run lint

# Type checking
npm run typecheck
```

Servidor disponible en `http://localhost:5173`

---

## 📦 Dependencias Principales

- Vue 3.4
- Vue Router 4.3
- Pinia 2.1
- Vite 5.4
- Tailwind CSS 3.4
- TypeScript 5.5
- Axios
- Supabase

---

## 🔑 Variables de Entorno

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

---

## 📝 Próximos Pasos

1. **Autenticación** (Supabase Auth)
2. **Backend API** (Node.js + Express)
3. **Database** (PostgreSQL)
4. **Dashboards** (Cliente y Empresa)
5. **Sistema de Matching**
6. **Pagos** (Stripe)

---

## 📞 Contacto

📧 info@muvify.es
📱 +34 900 000 000

---

**Versión:** 2.0.0 | **Última actualización:** 30/07/2024
