# Hotel Plaza Garibaldi | Plataforma Web & PMS Hotelero

> **Hotel Plaza Garibaldi** — Hospedaje 4 Estrellas frente al Parque Principal de Caldas, Antioquia, Colombia.  
> Plataforma web de alta gama para huéspedes y Sistema de Gestión Hotelera (PMS) integral para la operación administrativa y de recepción.

---

## 🌟 Características Principales

### 🏨 1. Portal Público de Huéspedes
- **Estética de Lujo:** Diseño visual inmersivo Obsidian Dark & Royal Gold con tipografías serif clásicas (*Playfair Display*) y sans-serif modernas (*Outfit*), microinteracciones y efectos de cristal (*glassmorphism*).
- **Arquitectura Multivista:**
  - **Inicio:** Experiencia de bienvenida, salones destacados, propuesta gastronómica y reseñas verificadas.
  - **Habitaciones & Suites:** Catálogo detallado (Suite Presidencial Garibaldi, Junior Suite Parque, Habitación Deluxe Matrimonial, Familiar Colonial), amenidades, tarifas y reserva directa.
  - **Gastronomía:** Carta del Restaurante-Bar *La Cava de Garibaldi*, coctelería de autor y café de origen caldeño.
  - **Eventos & Salones:** Cotización de salones para conferencias, bodas y eventos sociales.
  - **Experiencias Antioquia:** Rutas ecológicas (Reserva Natural Alto de San Miguel, nacimineto del Río Medellín, cerámicas y café).
  - **Galería Fotográfica:** Visor interactivo de alta resolución.
  - **Contacto & Ubicación:** Mapa interactivo, canales de WhatsApp y formulario de contacto.
  - **Pre Check-In Digital:** Registro express para huéspedes antes de su llegada.

### 💳 2. Motor de Reservas Bi-Moneda (COP / USD)
- Conversor de divisa en tiempo real (Pesos Colombianos `COP` y Dólares Americanos `USD`).
- Flujo guiado en 5 pasos:
  1. Selección de fechas, huéspedes y habitación.
  2. Servicios adicionales (desayuno buffet, traslado aeropuerto JMC, paquete romántico).
  3. Datos de contacto y requerimientos especiales.
  4. Pasarela de pago digital simulada (Tarjetas de Crédito/Débito, PSE, Wompi, Bancolombia, Nequi).
  5. Emisión de voucher de confirmación con código de reserva único y código QR.

---

### 🛡️ 3. Sistema PMS (Property Management System)
Suite administrativa con autenticación, control de acceso basado en roles (**RBAC**) y tema oscuro unificado de alta fidelidad:

- **Dashboard Operativo:** KPIs en tiempo real (Ocupación %, RevPAR, ADR, Llegadas y Salidas del día, Ingresos acumulados).
- **Tape Chart (Gantt Interactivo):** Gráfico de ocupación por habitación y calendario interactivo con estados visuales (Confirmada, Checked-in, Mantenimiento, Limpieza).
- **Gestión de Habitaciones (CRUD):** Creación, edición, cambio de estado (Disponible, Ocupada, Sucia, Mantenimiento) y precio por noche.
- **Módulo de Reservaciones:** Filtros avanzados por fecha y estado, acciones de Check-in, Check-out y cancelación de reservas.
- **CRM Directorio de Huéspedes:** Historial de estancias, preferencias de almohadas/piso, notas de fidelidad y consumo promedio.
- **Housekeeping & Pase de Lista:** Asignación de camareras por piso, estados de limpieza y pase de lista de habitaciones en tiempo real.
- **Caja & Folios:** Registro de cargos a habitación (restaurante, minibar, lavandería), abonos, arqueo de turno y cierre de folios.
- **Usuarios & Roles (RBAC):** Administración de credenciales con matriz de permisos para 4 roles:
  - 👑 *Administrador General* (Acceso total)
  - 🛎️ *Recepción / Front Desk* (Reservas, Check-in, Caja, Clientes)
  - 🧹 *Ama de Llaves / Housekeeping* (Pase de lista y estado de habitaciones)
  - 📊 *Auditor Nocturno* (Consultas, arqueos y reportes financieros)
- **Registro de Auditoría:** Log inmutable de todas las transacciones, modificaciones de tarifas y accesos del personal con marca de tiempo.
- **Mobile Drawer:** Menú lateral totalmente colapsable en dispositivos móviles para facilitar la operación en tablets y smartphones del personal.

---

## 📸 Capturas de Pantalla

El proyecto incluye 22 capturas en alta resolución en la carpeta [`/capturas`](./capturas):

| # | Archivo | Descripción |
|---|---|---|
| 01 | `01_portal_inicio_desktop.png` | Portal Público - Vista de Inicio (Desktop) |
| 02 | `02_portal_inicio_mobile.png` | Portal Público - Vista de Inicio (Móvil) |
| 03 | `03_habitaciones_suites.png` | Catálogo de Habitaciones & Suites |
| 04 | `04_gastronomia_restaurante.png` | Restaurante La Cava de Garibaldi |
| 05 | `05_eventos_salones.png` | Salones y Eventos Sociales |
| 06 | `06_experiencias_antioquia.png` | Experiencias y Rutas Ecológicas |
| 07 | `07_galeria_fotografica.png` | Galería Fotográfica |
| 08 | `08_contacto_ubicacion.png` | Contacto y Ubicación |
| 09 | `09_precheckin_huespedes.png` | Pre Check-In Express |
| 10 | `10_motor_reserva_modal.png` | Motor de Reservas Bi-Moneda |
| 11 | `11_pms_portal_login.png` | Pantalla de Acceso al PMS |
| 12 | `12_pms_dashboard_dark.png` | PMS - Dashboard de Métricas y KPIs |
| 13 | `13_pms_tape_chart_gantt.png` | PMS - Tape Chart / Gantt de Ocupación |
| 14 | `14_pms_crud_habitaciones.png` | PMS - Inventario y CRUD de Habitaciones |
| 15 | `15_pms_reservaciones.png` | PMS - Reservaciones y Check-In |
| 16 | `16_pms_clientes_crm.png` | PMS - CRM de Huéspedes |
| 17 | `17_pms_housekeeping.png` | PMS - Housekeeping y Pase de Lista |
| 18 | `18_pms_caja_folios.png` | PMS - Caja, Folios y Arqueo |
| 19 | `19_pms_usuarios_roles.png` | PMS - Usuarios y Permisos RBAC |
| 20 | `20_pms_auditoria.png` | PMS - Registro de Auditoría |
| 21 | `21_pms_mobile_menu_colapsado.png` | PMS Móvil - Menú lateral colapsado |
| 22 | `22_pms_mobile_menu_desplegado.png` | PMS Móvil - Drawer desplegado con botón de colapso |

---

## 🚀 Puesta en Marcha Local

### Prerrequisitos
- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [npm](https://www.npmjs.com/)

### Instalación
```bash
# 1. Clonar el repositorio
git clone https://github.com/MZubiri/HotelGaribaldiCaldas.git
cd HotelGaribaldiCaldas

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`.

### Acceso al Sistema PMS
El acceso al PMS se realiza de forma directa por URL:
- Ruta: `http://localhost:5173/?pms=true` o agregando `#pms` al final de la URL.
- En la pantalla de login puedes seleccionar cualquiera de los roles precargados para explorar las diferentes vistas y permisos.

### Compilación para Producción
```bash
npm run build
```

---

## 🐳 Despliegue en Producción (Docker Compose & Coolify en Oracle Cloud VPS)

La plataforma cuenta con configuración de Docker multi-etapa (`node:22-alpine` + `nginx:alpine`) altamente optimizada para **Coolify** sobre instancias VPS de **Oracle Cloud Infrastructure (OCI)** (compatible tanto con procesadores **AMD/Intel x86_64** como con **ARM64 Ampere A1**).

### 1. Despliegue con Docker Compose (Manual o CLI)
```bash
# Levantar el contenedor en segundo plano
docker compose up -d --build

# Verificar estado y logs
docker compose ps
docker compose logs -f
```

### 2. Despliegue Automatizado con Coolify
1. En tu panel de **Coolify**, dirígete a tu proyecto y selecciona **+ New Resource**.
2. Selecciona **Public Repository** (o Private con tu clave GitHub) e ingresa:
   ```text
   https://github.com/MZubiri/HotelGaribaldiCaldas
   ```
3. En **Build Pack**, Coolify detectará automáticamente `Docker Compose` (o selecciona **Docker Compose**).
4. En la configuración del servicio:
   - Asigna tu **Dominio FQDN** (ej. `https://hotelplazagaribaldi.com` o el subdominio de tu VPS). Coolify gestionará automáticamente los certificados SSL con Let's Encrypt mediante Traefik.
   - El puerto expuesto por el contenedor es el `80` (manejado vía variable `${PORT:-80}`).
5. Haz clic en **Deploy**. ¡Tu aplicación estará en línea en segundos!

> [!TIP]
> **Consejo para Oracle Cloud VPS (OCI):**  
> Asegúrate de que las reglas de ingreso (*Ingress Rules*) en la **Security List** de tu VCN en Oracle Cloud permitan el tráfico entrante en los puertos **TCP 80 (HTTP)** y **TCP 443 (HTTPS)** desde `0.0.0.0/0`.  
> Además, en el firewall del sistema operativo (Ubuntu/Debian de OCI), ejecuta si es necesario:
> ```bash
> sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
> sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
> sudo netfilter-persistent save
> ```

---


## 🛠️ Tecnologías Utilizadas
- **Frontend Core:** React 19, JavaScript (ES6+), HTML5 Semántico.
- **Empaquetador & Dev Server:** Vite 8.
- **Iconografía:** Lucide React.
- **Estilos:** Vanilla CSS con arquitectura de variables de diseño, glassmorphism y diseño responsivo móvil-primero.
- **Automatización de Pruebas y Capturas:** Puppeteer Core.

---

## 📍 Ubicación del Hotel
**Hotel Plaza Garibaldi**  
Parque Principal de Caldas, Antioquia, Colombia.  
*Frente a la Iglesia Nuestra Señora de las Mercedes.*
