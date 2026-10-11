import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const BROWSER_PATH = fs.existsSync('C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe')
  ? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  : 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const DIAPO_DIR = path.resolve(process.cwd(), 'Diapositiva');
const HTML_FILE = path.join(DIAPO_DIR, 'index.html');
const PDF_OUTPUT = path.join(DIAPO_DIR, 'Hotel_Plaza_Garibaldi_Presentacion.pdf');

async function main() {
  console.log('📄 Exportando diapositivas a PDF de alta resolución...');

  const browser = await puppeteer.launch({
    executablePath: BROWSER_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1920,1080']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });

  await page.goto(`file://${HTML_FILE}`, { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 1200));

  await page.pdf({
    path: PDF_OUTPUT,
    width: '16in',
    height: '9in',
    printBackground: true,
    preferCSSPageSize: true,
    landscape: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });

  await browser.close();
  console.log(`✅ PDF generado exitosamente en: ${PDF_OUTPUT}`);
}

main().catch(err => {
  console.error('Error generando PDF:', err);
  process.exit(1);
});
