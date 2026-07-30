# Muvify Express 2.0 - Guía de Instalación y Despliegue

## Descripción General

Muvify Express 2.0 es una plataforma profesional especializada en mudanzas que compite con Habitissimo, ProntoPro y Cronoshare. La plataforma incluye landing page, formulario de presupuestos, dashboards de cliente y empresa, comparador inteligente, y sistema de pagos.

**Stack Tecnológico:**
- Vue 3.4 + Vite 5.4
- Vue Router 4.3 (rutas protegidas)
- Pinia 2.1 (state management)
- Tailwind CSS 3.4 (estilos)
- TypeScript 5.5
- Axios (HTTP client)

---

## Instalación Local

### 1. Clonar el Repositorio

```bash
git clone https://github.com/joiceburgos29-PNG/muvifyexpress.git
cd muvifyexpress
git checkout muvify-express
```

### 2. Instalar Dependencias

```bash
npm install --legacy-peer-deps
```

### 3. Iniciar Servidor de Desarrollo

```bash
npm run dev
```

El servidor estará disponible en: **http://localhost:5173**

### 4. Build para Producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para desplegar.

### 5. Preview de Build

```bash
npm run preview
```

---

## Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── QuoteForm.vue    # Formulario de 3 pasos
│   ├── QuoteComparator.vue
│   ├── CheckoutForm.vue
│   ├── MatchingVisualizer.vue
│   └── ...
├── views/               # Vistas y páginas
│   ├── Home.vue         # Landing page
│   ├── Login.vue
│   ├── Checkout.vue
│   ├── client/          # Dashboards cliente (6 vistas)
│   └── company/         # Dashboards empresa (5 vistas)
├── stores/              # Pinia stores
│   ├── authStore.ts
│   ├── clientStore.ts
│   ├── companyStore.ts
│   └── paymentStore.ts
├── services/            # Lógica de negocio
│   ├── matchingService.ts
│   ├── paymentService.ts
│   └── ...
├── composables/         # Vue composables
├── router/              # Vue Router
├── App.vue              # Componente raíz
├── main.ts              # Entry point
└── index.css            # Estilos globales

tailwind.config.js       # Configuración Tailwind
vite.config.ts           # Configuración Vite
tsconfig.app.json        # TypeScript config
index.html               # Template HTML
```

---

## Branding Muvify Express

### Paleta de Colores

- **Primario:** #FFA500 (Amarillo Muvify)
- **Primario Oscuro:** #001F3F (Azul Oscuro)
- **Secundario:** #FFF8DC (Crema)
- **Accent:** #FFD700 (Oro)

### Logo y Assets

- Logo oficial: `/public/logo-muvify-express.svg`
- Se muestra en navbar de todas las páginas
- Responsive y con hover effects

### Elementos Corporativos

- Botón WhatsApp directo: +34 664 071 404
- Menú de navegación en azul oscuro
- Botones de acción en amarillo
- Formularios con enfoque en amarillo

---

## Rutas de la Aplicación

### Públicas
- `/` - Landing page
- `/login` - Selector de tipo usuario
- `/checkout` - Flujo de pago

### Protegidas - Cliente
- `/client/dashboard` - Panel principal
- `/client/requests` - Historial de solicitudes
- `/client/requests/:id` - Detalle de solicitud
- `/client/quotes/:requestId` - Comparador de presupuestos
- `/client/messages/:requestId` - Sistema de mensajes
- `/client/bookings` - Mudanzas confirmadas

### Protegidas - Empresa
- `/company/dashboard` - Panel principal
- `/company/requests` - Solicitudes entrantes
- `/company/requests/:id` - Detalle de solicitud
- `/company/quotes` - Gestión de presupuestos
- `/company/calendar` - Calendario de mudanzas
- `/company/analytics` - Analytics y reportes

---

## Features Implementados

### Fase 1: Landing Page
- ✅ Hero section premium
- ✅ Formulario inteligente 3 pasos
- ✅ Barra de confianza
- ✅ Timeline de "Cómo funciona"
- ✅ 6 beneficios destacados
- ✅ Grid de servicios
- ✅ Footer completo

### Fase 2: Dashboards
- ✅ Autenticación con roles (cliente/empresa)
- ✅ Dashboard cliente con estadísticas
- ✅ Dashboard empresa con KPIs
- ✅ Protected routes
- ✅ Session persistence

### Fase 3: Comparador Inteligente
- ✅ Algoritmo de matching (Haversine)
- ✅ Scoring automático
- ✅ Visualización en tiempo real
- ✅ Interfaz de comparación (3+ presupuestos)
- ✅ Top 3 empresas recomendadas

### Fase 4: Sistema de Pagos
- ✅ Checkout 3 pasos
- ✅ Validación completa
- ✅ Cálculo de comisiones (15%)
- ✅ IVA incluido (21%)
- ✅ Confirmación de pago
- ✅ Historial de transacciones

---

## Despliegue en Vercel

### 1. Conectar Repositorio

```bash
vercel link
```

### 2. Configurar Build

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install --legacy-peer-deps`

### 3. Deploy

```bash
vercel deploy --prod
```

O automáticamente al hacer push a `main` si está configurado.

---

## Despliegue en www.muvifyexpress.com

### 1. Clonar rama muvify-express

```bash
git clone https://github.com/joiceburgos29-PNG/muvifyexpress.git
cd muvifyexpress
git checkout muvify-express
```

### 2. Instalar y Build

```bash
npm install --legacy-peer-deps
npm run build
```

### 3. Copiar carpeta `dist/` al servidor

```bash
scp -r dist/* usuario@muvifyexpress.com:/var/www/muvifyexpress/
```

O usar Vercel Deployments, GitHub Pages, Netlify, etc.

### 4. Configurar Servidor Web

**Nginx:**
```nginx
server {
    listen 80;
    server_name muvifyexpress.com;
    
    root /var/www/muvifyexpress;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Apache:**
```apache
<Directory /var/www/muvifyexpress>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</Directory>
```

---

## Variables de Entorno

Crear archivo `.env.local` en la raíz:

```env
VITE_API_BASE_URL=https://api.muvifyexpress.com
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_key
VITE_WHATSAPP_NUMBER=34664071404
```

---

## Scripts Disponibles

```bash
npm run dev          # Iniciar servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Linting
npm run typecheck    # Type checking TypeScript
```

---

## Próximas Integraciones

- [ ] Supabase Auth (autenticación real)
- [ ] PostgreSQL (base de datos real)
- [ ] Stripe (pagos en producción)
- [ ] SendGrid (emails)
- [ ] Twilio (SMS)
- [ ] Firebase Analytics
- [ ] Sentry (error tracking)
- [ ] App móvil iOS/Android

---

## Troubleshooting

### Puerto 5173 en uso
```bash
# Usar puerto alternativo
npm run dev -- --port 3000
```

### Errores de dependencias
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Build falla
```bash
npm run typecheck  # Verificar tipos
npm run lint       # Verificar sintaxis
```

---

## Soporte

- **Documentación:** Ver README.md
- **Plan Arquitectura:** Ver FASE2_PLAN.md
- **Resumen Ejecutivo:** Ver PROJECT_SUMMARY.md

---

**Versión:** 2.0.0  
**Última actualización:** 2024  
**Rama:** muvify-express  
**Estado:** MVP Completo - Listo para Producción
