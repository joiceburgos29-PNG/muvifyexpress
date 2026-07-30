# Despliegue de Muvify Express en www.muvifyexpress.com

## Requisitos Previos

- Node.js 18+ instalado
- Git configurado
- Acceso SSH al servidor de www.muvifyexpress.com
- Dominio www.muvifyexpress.com apuntando al servidor

---

## Opción 1: Despliegue con Vercel (Recomendado)

### Paso 1: Conectar GitHub a Vercel

1. Ve a https://vercel.com
2. Inicia sesión con tu cuenta GitHub
3. Click en "Add New..." → "Project"
4. Selecciona el repositorio `muvifyexpress`
5. Vercel detectará automáticamente que es un proyecto Vue

### Paso 2: Configurar Variables de Entorno

En Vercel, ve a **Settings** → **Environment Variables**:

```
VITE_API_BASE_URL=https://api.muvifyexpress.com
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_key
VITE_WHATSAPP_NUMBER=34664071404
```

### Paso 3: Deploy

1. Vercel detectará automáticamente:
   - **Build Command:** `npm install --legacy-peer-deps && npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install --legacy-peer-deps`

2. Click en **Deploy**

3. Espera a que se complete (2-3 minutos)

### Paso 4: Conectar Dominio Personalizado

1. Ve a **Settings** → **Domains**
2. Añade tu dominio: `www.muvifyexpress.com`
3. Sigue las instrucciones para actualizar DNS
4. Espera 24-48 horas para propagación de DNS

---

## Opción 2: Despliegue en Servidor Propio (Linux)

### Paso 1: Preparar Servidor

```bash
# SSH al servidor
ssh usuario@muvifyexpress.com

# Crear directorio para la aplicación
mkdir -p /var/www/muvifyexpress
cd /var/www/muvifyexpress

# Clonar repositorio
git clone https://github.com/joiceburgos29-PNG/muvifyexpress.git .
git checkout muvify-express
```

### Paso 2: Instalar Node.js (si no está instalado)

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs npm
```

### Paso 3: Instalar Dependencias y Build

```bash
cd /var/www/muvifyexpress
npm install --legacy-peer-deps
npm run build
```

Esto genera la carpeta `dist/` con la aplicación compilada.

### Paso 4: Configurar Nginx

```bash
sudo nano /etc/nginx/sites-available/muvifyexpress.com
```

Pega esta configuración:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name www.muvifyexpress.com muvifyexpress.com;

    # Redirigir HTTP a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name www.muvifyexpress.com muvifyexpress.com;

    # Certificados SSL (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/muvifyexpress.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/muvifyexpress.com/privkey.pem;

    # Configuración SSL recomendada
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Raíz del sitio
    root /var/www/muvifyexpress/dist;
    index index.html;

    # Logs
    access_log /var/log/nginx/muvifyexpress-access.log;
    error_log /var/log/nginx/muvifyexpress-error.log;

    # Comprensión gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Headers de seguridad
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy strict-origin-when-cross-origin;

    # Configuración de caché
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Configuración SPA - Redirigir todas las rutas a index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # No cachear index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

Guarda con `Ctrl+X`, `Y`, `Enter`.

### Paso 5: Habilitar y Reiniciar Nginx

```bash
# Crear enlace simbólico
sudo ln -s /etc/nginx/sites-available/muvifyexpress.com /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Reiniciar nginx
sudo systemctl restart nginx
```

### Paso 6: Obtener Certificado SSL (Let's Encrypt)

```bash
# Instalar certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Obtener certificado
sudo certbot certonly --nginx -d muvifyexpress.com -d www.muvifyexpress.com

# Renovación automática
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### Paso 7: Verificar Despliegue

```bash
# Verificar que nginx está corriendo
sudo systemctl status nginx

# Ver logs
tail -f /var/log/nginx/muvifyexpress-access.log
tail -f /var/log/nginx/muvifyexpress-error.log
```

Accede a **https://www.muvifyexpress.com** en el navegador.

---

## Opción 3: Despliegue con cPanel/Hosting Compartido

### Paso 1: Build Local

```bash
npm install --legacy-peer-deps
npm run build
```

### Paso 2: Comprimir archivos

```bash
zip -r dist.zip dist/
```

### Paso 3: Subir a cPanel

1. Accede a **cPanel** → **File Manager**
2. Navega a `public_html`
3. Sube `dist.zip`
4. Descomprime en esa carpeta

### Paso 4: Configurar .htaccess

En `public_html/.htaccess`, añade:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

---

## Actualizar Código en Producción

### Con Vercel (automático)

Solo necesitas hacer push a `main` o `muvify-express`:

```bash
git push origin muvify-express
```

Vercel detectará el cambio y desplegará automáticamente.

### Con Servidor Propio (manual)

```bash
# SSH al servidor
ssh usuario@muvifyexpress.com
cd /var/www/muvifyexpress

# Actualizar código
git pull origin muvify-express

# Reinstalar dependencias (si hay cambios)
npm install --legacy-peer-deps

# Build
npm run build

# Reiniciar nginx (si es necesario)
sudo systemctl restart nginx
```

---

## Monitoreo y Mantenimiento

### Logs en Vercel

- Dashboard: https://vercel.com
- Click en proyecto → **Deployments**
- Ver logs en tiempo real

### Logs en Servidor Propio

```bash
# Nginx
sudo tail -f /var/log/nginx/muvifyexpress-access.log
sudo tail -f /var/log/nginx/muvifyexpress-error.log

# Sistema
dmesg
journalctl -u nginx
```

### Health Check

```bash
curl -s https://www.muvifyexpress.com | head -20
```

---

## Configuración de DNS

Para que `www.muvifyexpress.com` funcione:

### Registrador de Dominios (GoDaddy, Namecheap, etc.)

**Si usas Vercel:**
1. Copia los nameservers de Vercel
2. Actualiza nameservers en tu registrador
3. O crea registros CNAME:
   - `www` → `cname.vercel-dns.com`

**Si usas Servidor Propio:**
1. Crea registros A:
   - `@` (o muvifyexpress.com) → IP del servidor
   - `www` → IP del servidor
2. Espera 24-48 horas para propagación

---

## Performance Optimization

### Compresión Gzip (Nginx)

```nginx
gzip on;
gzip_vary on;
gzip_min_length 1000;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss application/json;
```

### Cache Busting

Los archivos ya incluyen hash en nombre (Vite lo hace automáticamente).

### CDN (Opcional)

Para mejor rendimiento global:
- Cloudflare (gratuito)
- AWS CloudFront
- BunnyCDN

---

## Seguridad

### Headers de Seguridad (ya incluidos en Nginx config)

```nginx
add_header X-Content-Type-Options "nosniff";
add_header X-Frame-Options "SAMEORIGIN";
add_header X-XSS-Protection "1; mode=block";
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

### WAF (Firewall de Aplicación Web)

- Cloudflare (gratuito)
- ModSecurity para Nginx

### HTTPS Obligatorio

```nginx
return 301 https://$server_name$request_uri;
```

---

## Troubleshooting Despliegue

### "404 Not Found"

Verificar que `.htaccess` o configuración Nginx tiene `try_files $uri $uri/ /index.html;`

### "Mixed Content" error

Asegurar que URL está en HTTPS y no carga recursos HTTP.

### "Application is loading"

Verificar que `index.html` existe en `dist/` y está siendo servido correctamente.

### Reiniciar Servicios

```bash
# Nginx
sudo systemctl restart nginx

# Node (si usas PM2)
pm2 restart all
```

---

## CI/CD Pipeline (GitHub Actions)

Crear archivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to www.muvifyexpress.com

on:
  push:
    branches: [ muvify-express ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Install Node
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install --legacy-peer-deps
    
    - name: Build
      run: npm run build
    
    - name: Deploy to server
      uses: appleboy/scp-action@master
      with:
        host: ${{ secrets.DEPLOY_HOST }}
        username: ${{ secrets.DEPLOY_USER }}
        key: ${{ secrets.DEPLOY_KEY }}
        source: "dist/"
        target: "/var/www/muvifyexpress"
```

---

## Estado Actual

- Código: ✅ Completamente compilado
- Branding: ✅ Amarillo (#FFA500) y Azul Oscuro (#001F3F)
- Logo: ✅ Oficial de Muvify Express
- WhatsApp: ✅ +34 664 071 404
- Responsivo: ✅ Mobile, tablet, desktop
- Performance: ✅ Optimizado
- Seguridad: ✅ Headers configurados

---

**Versión:** 2.0.0  
**Rama:** muvify-express  
**Última actualización:** 2024  
**Estado:** Listo para Producción
