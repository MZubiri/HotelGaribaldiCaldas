import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const BROWSER_PATH = fs.existsSync('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe')
  ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const DIAPO_DIR = path.resolve(process.cwd(), 'Diapositiva');
const IMG_DIR = path.join(DIAPO_DIR, 'img');
const CAPTURAS_DIR = path.resolve(process.cwd(), 'capturas');

if (!fs.existsSync(IMG_DIR)) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
}

// Copiar capturas existentes clave si están disponibles
const copyIfAvailable = (srcName, destName) => {
  const src = path.join(CAPTURAS_DIR, srcName);
  const dest = path.join(IMG_DIR, destName);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${srcName} -> ${destName}`);
    return true;
  }
  return false;
};

async function main() {
  console.log('🖼️ Preparando imágenes para Diapositiva...');

  copyIfAvailable('10_motor_reserva_modal.png', 'slide_motor_reserva.png');
  copyIfAvailable('pms_login_screen.png', 'slide_pms_login.png');
  copyIfAvailable('12_pms_dashboard_luxury.png', 'slide_pms_dashboard.png');
  copyIfAvailable('pms_dashboard_ejecutivo.png', 'slide_pms_dashboard.png');
  copyIfAvailable('13_pms_tape_chart_gantt.png', 'slide_pms_tapechart.png');
  copyIfAvailable('14_pms_crud_habitaciones.png', 'slide_pms_rooms.png');
  copyIfAvailable('15_pms_reservaciones.png', 'slide_pms_reservas.png');
  copyIfAvailable('16_pms_clientes_crm.png', 'slide_pms_crm.png');
  copyIfAvailable('17_pms_housekeeping.png', 'slide_pms_housekeeping.png');
  copyIfAvailable('18_pms_caja_folios.png', 'slide_pms_cajas.png');
  copyIfAvailable('pms_cajas_arqueo_modal.png', 'slide_pms_arqueo.png');
  copyIfAvailable('19_pms_usuarios_roles.png', 'slide_pms_roles.png');
  copyIfAvailable('20_pms_auditoria.png', 'slide_pms_auditoria.png');
  copyIfAvailable('22_pms_mobile_menu_desplegado.png', 'slide_pms_mobile.png');

  // Capturar vistas públicas en alta resolución específica para diapositivas
  console.log('🚀 Iniciando Chromium para capturar pantallas públicas de diapositivas...');
  const browser = await puppeteer.launch({
    executablePath: BROWSER_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Home
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(IMG_DIR, 'slide_portal_home.png') });
  console.log('📸 slide_portal_home.png capturada');

  // Helper de navegación pública
  const navigateTo = async (text) => {
    await page.evaluate((t) => {
      const btns = Array.from(document.querySelectorAll('.nav-item-btn, .nav-desktop-menu button'));
      const found = btns.find(b => b.textContent.trim().toLowerCase().includes(t.toLowerCase()));
      if (found) found.click();
    }, text);
    await new Promise(r => setTimeout(r, 800));
    await page.evaluate(() => window.scrollTo(0, 0));
  };

  // 2. Habitaciones
  await navigateTo('Habitaciones');
  await page.screenshot({ path: path.join(IMG_DIR, 'slide_portal_habitaciones.png') });
  console.log('📸 slide_portal_habitaciones.png capturada');

  // 3. Café & Gastronomía
  await navigateTo('Café');
  await page.screenshot({ path: path.join(IMG_DIR, 'slide_portal_gastronomia.png') });
  console.log('📸 slide_portal_gastronomia.png capturada');

  // 4. Experiencias
  await navigateTo('Experiencias');
  await page.screenshot({ path: path.join(IMG_DIR, 'slide_portal_experiencias.png') });
  console.log('📸 slide_portal_experiencias.png capturada');

  // 5. Pre-Check-In
  await navigateTo('Pre-Check-In');
  await page.screenshot({ path: path.join(IMG_DIR, 'slide_portal_precheckin.png') });
  console.log('📸 slide_portal_precheckin.png capturada');

  await browser.close();
  console.log('✨ Todas las imágenes para Diapositiva están listas en Diapositiva/img/');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
