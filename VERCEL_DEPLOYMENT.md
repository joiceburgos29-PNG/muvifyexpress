# Despliegue en Vercel - Muvify Express 2.0

## Lo MAS FÁCIL: 5 Clicks en Vercel

---

## PASO 1: Crea Cuenta en Vercel (1 minuto)

1. Ve a https://vercel.com
2. Click en "Sign Up"
3. Elige "Continue with GitHub"
4. Autoriza Vercel en GitHub
5. ✅ Cuenta creada

---

## PASO 2: Importa el Proyecto (2 minutos)

1. Ve a https://vercel.com/dashboard
2. Click en "Add New..." → "Project"
3. Click en "Import Git Repository"
4. En el buscador, escribe: `muvifyexpress`
5. Selecciona: `joiceburgos29-PNG/muvifyexpress`
6. ✅ Repositorio seleccionado

---

## PASO 3: Configura el Proyecto (1 minuto)

La configuración debería ser automática, pero verifica:

```
Project Name: muvify-express
Framework: Other (Vite)
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install --legacy-peer-deps
```

**NO necesitas cambiar nada.**

Click en "Deploy"

✅ **VERCEL ESTÁ DESPLEGANDO**

---

## PASO 4: Espera el Deploy (2 minutos)

Vercel compilará y desplegará automáticamente.

Verás una pantalla con:
- Progreso de compilación
- URL temporal: `muvify-express-xxxxx.vercel.app`

✅ **TU APLICACIÓN ESTÁ EN VIVO**

---

## PASO 5: Conecta tu Dominio www.muvifyexpress.com (2 minutos)

### En Vercel:

1. Va a tu proyecto → Settings
2. Click en "Domains"
3. En "Production Domains", click en "Add"
4. Escribe: `www.muvifyexpress.com`
5. Click en "Add"

Vercel te mostrará instrucciones DNS:

```
Tipo: CNAME
Nombre: www
Valor: cname.vercel.com
```

### En tu Proveedor de Dominios:

1. Ve a tu proveedor (Namecheap, GoDaddy, Google Domains, etc.)
2. Busca "DNS" o "Nameservers"
3. Crea un registro CNAME:
   - Nombre: `www`
   - Valor: `cname.vercel.com`
4. Guarda los cambios

### Espera:

El DNS tarda 5-30 minutos en propagarse.

Vercel te avisará cuando esté listo.

✅ **DOMINIO CONECTADO**

---

## PASO 6: Verifica que funciona (1 minuto)

Abre en tu navegador:
- https://www.muvifyexpress.com

Deberías ver:
- ✅ Logo de Muvify Express
- ✅ Navbar con botón WhatsApp
- ✅ Hero section amarillo
- ✅ Formulario de presupuestos
- ✅ HTTPS (certificado SSL automático)

---

## ¿Y si quiero desplegar cambios futuros?

**Super fácil:** Solo haz push a GitHub

```bash
git add .
git commit -m "Mi cambio"
git push origin muvify-express
```

Vercel despliega automáticamente en 30 segundos.

---

## Troubleshooting

### "El dominio no conecta"

- Espera 15-30 minutos (DNS propagación)
- Verifica que el CNAME esté correcto
- En Vercel → Domains, deberías ver ✅ Verde

### "Vercel falla al compilar"

Vuelve a intentar:
- Ve a Deployments
- Click en el último
- Click en "Redeploy"

### "Necesito variables de entorno"

Settings → Environment Variables → Add

Ejemplos:
```
VITE_API_BASE_URL=https://api.muvifyexpress.com
VITE_SUPABASE_URL=tu_url
VITE_SUPABASE_ANON_KEY=tu_key
```

---

## ¿Listo?

Solo sigue los 6 pasos arriba y tu plataforma estará en vivo en www.muvifyexpress.com

**Tiempo total: ~10 minutos**

¡Éxito! 🚀
