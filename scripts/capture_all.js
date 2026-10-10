import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

// Usar Edge o Chrome
const BROWSER_PATH = fs.existsSync('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe')
  ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const CAPTURAS_DIR = path.resolve(process.cwd(), 'capturas');

if (!fs.existsSync(CAPTURAS_DIR)) {
  fs.mkdirSync(CAPTURAS_DIR, { recursive: true });
}

async function run() {
  console.log(`🚀 Iniciando navegador Chromium (${BROWSER_PATH})...`);
  const browser = await puppeteer.launch({
    executablePath: BROWSER_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('🌐 Navegando a http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await page.evaluate(() => new Promise(r => setTimeout(r, 800)));

  const takeShot = async (filename) => {
    const targetPath = path.join(CAPTURAS_DIR, filename);
    await page.screenshot({ path: targetPath, fullPage: false });
    console.log(`📸 Captura guardada: ${filename}`);
  };

  // 1. INICIO DESKTOP
  console.log('👉 Capturando Inicio Desktop...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await takeShot('01_portal_inicio_desktop.png');

  // 2. INICIO MOBILE
  console.log('👉 Capturando Inicio Mobile...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => new Promise(r => setTimeout(r, 600)));
  await page.evaluate(() => window.scrollTo(0, 0));
  await takeShot('02_portal_inicio_mobile.png');

  // Restaurar Desktop
  await page.setViewport({ width: 1440, height: 900 });
  await page.evaluate(() => new Promise(r => setTimeout(r, 500)));

  // Función de navegación pública
  const navigateTo = async (navText) => {
    const success = await page.evaluate((text) => {
      const btns = Array.from(document.querySelectorAll('.nav-item-btn, .nav-desktop-menu button'));
      const target = btns.find(b => b.textContent.trim().toLowerCase().includes(text.toLowerCase()));
      if (target) {
        target.click();
        return true;
      }
      return false;
    }, navText);
    if (!success) console.warn(`⚠️ No se encontró botón para ${navText}`);
    await page.evaluate(() => new Promise(r => setTimeout(r, 800)));
    await page.evaluate(() => window.scrollTo(0, 0));
  };

  // 3. HABITACIONES
  console.log('👉 Capturando Habitaciones...');
  await navigateTo('Habitaciones');
  await takeShot('03_habitaciones_suites.png');

  // 4. GASTRONOMÍA (Café & Terraza)
  console.log('👉 Capturando Gastronomía (Café & Terraza)...');
  await navigateTo('Café');
  await takeShot('04_gastronomia_restaurante.png');

  // 5. EVENTOS
  console.log('👉 Capturando Eventos...');
  await navigateTo('Eventos');
  await takeShot('05_eventos_salones.png');

  // 6. EXPERIENCIAS
  console.log('👉 Capturando Experiencias...');
  await navigateTo('Experiencias');
  await page.evaluate(() => new Promise(r => setTimeout(r, 1200)));
  await takeShot('06_experiencias_antioquia.png');

  // 7. GALERÍA
  console.log('👉 Capturando Galería...');
  await navigateTo('Galería');
  await page.evaluate(() => new Promise(r => setTimeout(r, 600)));
  await takeShot('07_galeria_fotografica.png');

  // 8. CONTACTO / UBICACIÓN
  console.log('👉 Capturando Ubicación / Contacto...');
  await navigateTo('Ubicación');
  await takeShot('08_contacto_ubicacion.png');

  // 9. PRE-CHECK-IN
  console.log('👉 Capturando Pre-Check-In...');
  await navigateTo('Pre-Check-In');
  await takeShot('09_precheckin_huespedes.png');

  // 10. MOTOR DE RESERVA MODAL
  console.log('👉 Abriendo modal de reserva...');
  await page.evaluate(() => {
    const bookBtns = Array.from(document.querySelectorAll('.btn-luxury-primary, .nav-reserve-cta'));
    const btn = bookBtns.find(b => b.textContent.includes('Reservar'));
    if (btn) btn.click();
  });
  await page.evaluate(() => new Promise(r => setTimeout(r, 700)));
  await takeShot('10_motor_reserva_modal.png');

  // Cerrar modal de reserva
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.booking-close-btn');
    if (closeBtn) closeBtn.click();
  });
  await page.evaluate(() => new Promise(r => setTimeout(r, 400)));

  // 11. ACCESO PMS & LOGIN
  console.log('👉 Accediendo a PMS Login...');
  await page.goto('http://localhost:5173/pms-login', { waitUntil: 'networkidle2' });
  await page.waitForSelector('.quick-role-card');
  await takeShot('11_pms_portal_login.png');
  await takeShot('pms_login_screen.png');

  // Iniciar sesión con Administradora General usando click real de Puppeteer
  console.log('👉 Iniciando sesión como Administradora General...');
  await page.click('.quick-role-card');
  await page.waitForSelector('.pms-app-layout');
  await page.evaluate(() => new Promise(r => setTimeout(r, 800)));

  // Helper para cambiar pestaña en PMS
  const switchPmsTab = async (tabName) => {
    const found = await page.evaluate((name) => {
      const items = Array.from(document.querySelectorAll('.pms-nav-btn'));
      const target = items.find(i => i.textContent.trim().toLowerCase().includes(name.toLowerCase()));
      if (target) {
        target.click();
        return true;
      }
      return false;
    }, tabName);
    if (!found) console.warn(`⚠️ No se encontró pestaña PMS para: ${tabName}`);
    await page.evaluate(() => new Promise(r => setTimeout(r, 800)));
    await page.evaluate(() => {
      const pmsBody = document.querySelector('.pms-body');
      if (pmsBody) pmsBody.scrollTop = 0;
    });
  };

  // 12. PMS DASHBOARD LUXURY
  console.log('👉 Capturando PMS Dashboard Ejecutivo...');
  await switchPmsTab('Dashboard');
  await takeShot('12_pms_dashboard_luxury.png');
  await takeShot('12_pms_dashboard_dark.png');
  await takeShot('pms_dashboard_ejecutivo.png');

  // 13. PMS TAPE CHART (Calendario de Ocupación)
  console.log('👉 Capturando PMS Calendario de Ocupación (Tape Chart)...');
  await switchPmsTab('Calendario');
  await takeShot('13_pms_tape_chart_gantt.png');

  // 14. PMS CRUD HABITACIONES
  console.log('👉 Capturando PMS CRUD Habitaciones...');
  await switchPmsTab('CRUD');
  await takeShot('14_pms_crud_habitaciones.png');

  // 15. PMS RESERVACIONES
  console.log('👉 Capturando PMS Reservas...');
  await switchPmsTab('Reservas');
  await takeShot('15_pms_reservaciones.png');

  // 16. PMS CLIENTES CRM
  console.log('👉 Capturando PMS Clientes CRM...');
  await switchPmsTab('Clientes');
  await takeShot('16_pms_clientes_crm.png');

  // 17. PMS GOBERNANTA (Housekeeping / Pasar Lista)
  console.log('👉 Capturando PMS Housekeeping / Pasar Lista...');
  await switchPmsTab('Housekeeping');
  await takeShot('17_pms_housekeeping.png');

  // 18. PMS CAJA & FOLIOS (ESTILOS Y SELECTS NUEVOS)
  console.log('👉 Capturando PMS Caja & Folios...');
  await switchPmsTab('Caja');
  await takeShot('18_pms_caja_folios.png');
  await takeShot('pms_cajas_y_turnos.png');

  // 19. MODAL ARQUEO DE CAJA
  console.log('👉 Abriendo Modal de Arqueo y Cierre de Turno...');
  await page.evaluate(() => {
    const arqueoBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Arqueo'));
    if (arqueoBtn) arqueoBtn.click();
  });
  await page.evaluate(() => new Promise(r => setTimeout(r, 600)));
  await takeShot('pms_cajas_arqueo_modal.png');
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.btn-dialog-close, button.btn-luxury-outline');
    if (closeBtn) closeBtn.click();
  });
  await page.evaluate(() => new Promise(r => setTimeout(r, 400)));

  // 20. MODAL ABONO / PAGO
  console.log('👉 Abriendo Modal de Registrar Abono...');
  await page.evaluate(() => {
    const payBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Abono') || b.textContent.includes('Pago'));
    if (payBtn) payBtn.click();
  });
  await page.evaluate(() => new Promise(r => setTimeout(r, 600)));
  await takeShot('pms_cajas_abono_modal.png');
  await page.evaluate(() => {
    const closeBtn = document.querySelector('.btn-dialog-close, button.btn-luxury-outline');
    if (closeBtn) closeBtn.click();
  });
  await page.evaluate(() => new Promise(r => setTimeout(r, 400)));

  // 21. PMS PERSONAL & PERMISOS
  console.log('👉 Capturando PMS Personal & Permisos...');
  await switchPmsTab('Personal');
  await takeShot('19_pms_usuarios_roles.png');

  // 22. PMS AUDITORÍA & LOGS
  console.log('👉 Capturando PMS Auditoría...');
  await switchPmsTab('Auditoría');
  await takeShot('20_pms_auditoria.png');

  // 23 & 24. PMS EN MÓVIL (MENÚ COLAPSADO Y DESPLEGADO)
  console.log('👉 Cambiando a Viewport Móvil para PMS (390x844)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.evaluate(() => new Promise(r => setTimeout(r, 600)));

  // Asegurar que la sesión PMS sigue abierta
  const isPmsMounted = await page.evaluate(() => !!document.querySelector('.pms-app-layout'));
  if (!isPmsMounted) {
    console.log('👉 Reactivando sesión PMS para móvil...');
    await page.waitForSelector('.quick-role-card');
    await page.click('.quick-role-card');
    await page.waitForSelector('.pms-app-layout');
    await page.evaluate(() => new Promise(r => setTimeout(r, 600)));
  }

  await switchPmsTab('Dashboard');
  await page.evaluate(() => new Promise(r => setTimeout(r, 600)));

  // 23. Menú colapsado en móvil
  console.log('👉 Capturando PMS Móvil Menú Colapsado...');
  await takeShot('21_pms_mobile_menu_colapsado.png');

  // 24. Menú desplegado en móvil
  console.log('👉 Abriendo Drawer en PMS Móvil...');
  await page.waitForSelector('.btn-pms-hamburger', { timeout: 10000 });
  await page.click('.btn-pms-hamburger');
  await page.evaluate(() => new Promise(r => setTimeout(r, 800)));
  await takeShot('22_pms_mobile_menu_desplegado.png');

  // Cerrar Drawer usando el botón de colapsar
  const hasMobileCollapseBtn = await page.evaluate(() => !!document.querySelector('.btn-collapse-sidebar-mobile'));
  if (hasMobileCollapseBtn) {
    await page.click('.btn-collapse-sidebar-mobile');
  } else {
    await page.click('.btn-close-drawer');
  }
  await page.evaluate(() => new Promise(r => setTimeout(r, 500)));

  console.log('🎉 ¡Todas las capturas fueron generadas y actualizadas con la nueva estética!');
  await browser.close();
}

run().catch(err => {
  console.error('❌ Error capturando vistas:', err);
  process.exit(1);
});
