import pptxgen from 'pptxgenjs';
import path from 'path';
import fs from 'fs';

const DIAPO_DIR = path.resolve(process.cwd(), 'Diapositiva');
const IMG_DIR = path.join(DIAPO_DIR, 'img');
const PPTX_OUTPUT = path.join(DIAPO_DIR, 'Hotel_Plaza_Garibaldi_Presentacion.pptx');

async function createPresentation() {
  console.log('📊 Generando archivo PowerPoint (.pptx)...');
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  pres.title = 'Hotel Plaza Garibaldi - Presentación Comercial & PMS';
  pres.company = 'Hotel Plaza Garibaldi S.A.S.';

  // Paleta de colores
  const COLOR_BG_DARK = '0B1713';
  const COLOR_CARD_DARK = '11241E';
  const COLOR_FOREST = '0E201A';
  const COLOR_GOLD = 'C5A059';
  const COLOR_GOLD_LIGHT = 'ECDDB9';
  const COLOR_CREAM = 'FAF8F5';
  const COLOR_WHITE = 'FFFFFF';
  const COLOR_TEXT = '1C2B24';
  const COLOR_MUTED = '5A6B63';

  // Helper para añadir slide estándar dividido (Texto + Imagen)
  const addSplitSlide = (options) => {
    const slide = pres.addSlide();
    slide.background = { color: COLOR_CREAM };

    // Badge
    slide.addText(options.badge.toUpperCase(), {
      x: 0.8, y: 0.5, w: 5.5, h: 0.35,
      fontSize: 9, bold: true, color: COLOR_GOLD,
      fontFace: 'Arial', spacing: 1.5
    });

    // Título
    slide.addText(options.title, {
      x: 0.8, y: 0.85, w: 5.6, h: 0.8,
      fontSize: 22, bold: true, color: COLOR_FOREST,
      fontFace: 'Georgia'
    });

    // Subtítulo
    slide.addText(options.subtitle, {
      x: 0.8, y: 1.65, w: 5.6, h: 0.5,
      fontSize: 11, color: COLOR_MUTED, italic: true,
      fontFace: 'Arial'
    });

    // Puntos clave
    const bullets = options.points.map(p => ({
      text: p.bold ? `${p.bold} ` : '',
      options: { bold: true, color: COLOR_FOREST }
    }, {
      text: p.text,
      options: { bold: false, color: COLOR_TEXT }
    }));

    let yOffset = 2.25;
    options.points.forEach(p => {
      slide.addText([
        { text: `• ${p.bold}: `, options: { bold: true, color: COLOR_FOREST, fontSize: 10 } },
        { text: p.text, options: { bold: false, color: COLOR_TEXT, fontSize: 10 } }
      ], {
        x: 0.8, y: yOffset, w: 5.6, h: 0.5,
        fontFace: 'Arial', lineSpacing: 14
      });
      yOffset += 0.55;
    });

    // Tarjeta de Beneficio Destacado abajo a la izquierda
    slide.addShape(pres.ShapeType.rect, {
      x: 0.8, y: yOffset + 0.1, w: 5.6, h: 0.95,
      fill: { color: COLOR_WHITE },
      line: { color: COLOR_GOLD, width: 1.5 }
    });

    slide.addText(options.highlightLabel.toUpperCase(), {
      x: 1.0, y: yOffset + 0.15, w: 5.2, h: 0.25,
      fontSize: 8, bold: true, color: COLOR_GOLD, fontFace: 'Arial'
    });

    slide.addText(options.highlightText, {
      x: 1.0, y: yOffset + 0.4, w: 5.2, h: 0.55,
      fontSize: 9.5, bold: true, color: COLOR_FOREST, fontFace: 'Arial'
    });

    // Imagen / Mockup a la derecha
    const imgPath = path.join(IMG_DIR, options.image);
    if (fs.existsSync(imgPath)) {
      // Marco blanco de elevación
      slide.addShape(pres.ShapeType.rect, {
        x: 6.8, y: 0.8, w: 5.7, h: 5.5,
        fill: { color: COLOR_WHITE },
        line: { color: 'E2DACD', width: 1 }
      });

      slide.addImage({
        path: imgPath,
        x: 6.9, y: 0.9, w: 5.5, h: 5.3,
        sizing: { type: 'contain' }
      });
    }

    // Pie de diapositiva
    slide.addText('Hotel Plaza Garibaldi • Caldas, Antioquia • RNT: 54912', {
      x: 0.8, y: 6.8, w: 10, h: 0.3,
      fontSize: 8, color: '8A9A92', fontFace: 'Arial'
    });
  };

  // 1. SLIDE HERO / PORTADA
  const slide1 = pres.addSlide();
  slide1.background = { color: COLOR_BG_DARK };

  slide1.addText('PROPUESTA COMERCIAL ESTRATÉGICA • 2026', {
    x: 1.0, y: 1.8, w: 11.3, h: 0.4,
    align: 'center', fontSize: 11, bold: true, color: COLOR_GOLD,
    fontFace: 'Arial', spacing: 2
  });

  slide1.addText('Hotel Plaza Garibaldi', {
    x: 1.0, y: 2.3, w: 11.3, h: 1.2,
    align: 'center', fontSize: 44, bold: true, color: COLOR_WHITE,
    fontFace: 'Georgia'
  });

  slide1.addText('Transformación Digital Integral: Portal de Reservas Directas & Sistema PMS Propietario', {
    x: 1.5, y: 3.5, w: 10.3, h: 0.8,
    align: 'center', fontSize: 15, italic: true, color: COLOR_GOLD_LIGHT,
    fontFace: 'Georgia'
  });

  slide1.addText('★ 4 Estrellas Frente al Parque Santander  •  RNT: 54912  •  NIT: 900.842.195-3  •  PMS v2.5', {
    x: 1.0, y: 4.6, w: 11.3, h: 0.5,
    align: 'center', fontSize: 10, bold: true, color: '9BB5AB',
    fontFace: 'Arial'
  });

  slide1.addText('De la Tradición Colonial al Control Total  •  Desarrollado a la Medida', {
    x: 1.0, y: 6.2, w: 11.3, h: 0.4,
    align: 'center', fontSize: 9, color: '728A81', fontFace: 'Arial'
  });

  // 2. RETOS Y OPORTUNIDAD
  addSplitSlide({
    badge: 'Diagnóstico del Negocio',
    title: 'Retos del Sector y la Oportunidad',
    subtitle: 'Resolución directa de los cuellos de botella que reducen margen operativo.',
    points: [
      { bold: 'Fuga de Margen por OTAs', text: 'Comisiones del 18% al 25% pagadas a intermediarios en cada reserva.' },
      { bold: 'Filas y Fricción en Counter', text: 'Check-in manual demorado entre 5 y 8 minutos por cada huésped.' },
      { bold: 'Descuadres en Caja', text: 'Cierres de turno sin arqueo ciego ni trazabilidad de sobrantes/faltantes.' },
      { bold: 'Costos Recurrentes en Dólares', text: 'Cobros mensuales abusivos por habitación en software comercial.' }
    ],
    highlightLabel: '💡 La Solución Propietaria',
    highlightText: 'Software 100% propio: cero mensualidades por habitación, reservas directas a su banco y control total.',
    image: 'slide_portal_home.png'
  });

  // 3. OBJETIVOS SMART
  const slide3 = pres.addSlide();
  slide3.background = { color: COLOR_CREAM };
  slide3.addText('PLAN ESTRATÉGICO', { x: 0.8, y: 0.5, w: 5.5, h: 0.35, fontSize: 9, bold: true, color: COLOR_GOLD, fontFace: 'Arial', spacing: 1.5 });
  slide3.addText('Objetivos SMART de Implementación', { x: 0.8, y: 0.85, w: 5.6, h: 0.8, fontSize: 22, bold: true, color: COLOR_FOREST, fontFace: 'Georgia' });
  slide3.addText('Metas específicas y medibles para garantizar el retorno de inversión.', { x: 0.8, y: 1.65, w: 5.6, h: 0.4, fontSize: 11, color: COLOR_MUTED, italic: true, fontFace: 'Arial' });

  // Grid SMART
  const smartCards = [
    { letter: 'S', title: 'Desintermediación', desc: 'Aumentar las reservas directas del 15% al 45% del total sin pagar comisiones.' },
    { letter: 'M', title: 'Ahorro Medible', desc: 'Reducción del 15% al 22% en costos de intermediación por cada reserva directa.' },
    { letter: 'A', title: 'Check-In Ágil', desc: 'Reducir el tiempo en recepción de 7 min a 45 segundos con Pre-Check-in.' },
    { letter: 'R', title: 'Cero Descuadres', desc: 'Lograr 0.0% de discrepancias en arqueos de caja en cambios de turno.' }
  ];

  smartCards.forEach((c, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const x = 0.8 + (col * 2.85);
    const y = 2.2 + (row * 1.5);

    slide3.addShape(pres.ShapeType.rect, { x, y, w: 2.7, h: 1.35, fill: { color: COLOR_WHITE }, line: { color: 'E2DACD', width: 1 } });
    slide3.addText(c.letter, { x: x + 0.15, y: y + 0.12, w: 0.35, h: 0.35, fill: { color: COLOR_FOREST }, color: COLOR_GOLD, bold: true, fontSize: 9, align: 'center' });
    slide3.addText(c.title, { x: x + 0.6, y: y + 0.12, w: 1.9, h: 0.35, bold: true, color: COLOR_FOREST, fontSize: 10 });
    slide3.addText(c.desc, { x: x + 0.15, y: y + 0.55, w: 2.4, h: 0.7, color: COLOR_MUTED, fontSize: 8.5 });
  });

  // Highlight Box T
  slide3.addShape(pres.ShapeType.rect, { x: 0.8, y: 5.4, w: 5.55, h: 0.85, fill: { color: COLOR_WHITE }, line: { color: COLOR_GOLD, width: 1.5 } });
  slide3.addText('⏱️ PLAZO DE ENTREGA (T - TIME-BOUND)', { x: 1.0, y: 5.45, w: 5.2, h: 0.25, fontSize: 8, bold: true, color: COLOR_GOLD, fontFace: 'Arial' });
  slide3.addText('Plan de implementación por fases y capacitación completa del personal en 2 meses.', { x: 1.0, y: 5.7, w: 5.2, h: 0.45, fontSize: 9.5, bold: true, color: COLOR_FOREST, fontFace: 'Arial' });

  // Imagen Dashboard
  slide3.addImage({ path: path.join(IMG_DIR, 'slide_pms_dashboard.png'), x: 6.9, y: 0.9, w: 5.5, h: 5.3, sizing: { type: 'contain' } });
  slide3.addText('Hotel Plaza Garibaldi • Caldas, Antioquia • RNT: 54912', { x: 0.8, y: 6.8, w: 10, h: 0.3, fontSize: 8, color: '8A9A92', fontFace: 'Arial' });

  // 4. PORTAL WEB BOUTIQUE
  addSplitSlide({
    badge: 'Frente Comercial',
    title: 'Portal Boutique de Alta Conversión',
    subtitle: 'Estética 4 estrellas que resalta el patrimonio frente al Parque Santander.',
    points: [
      { bold: 'Diseño Editorial de Lujo', text: 'Verde bosque, marfil cálido y oro champán con tipografías de distinción.' },
      { bold: 'Catálogo de Habitaciones', text: 'Metrajes, tipos de cama, amenidades ejecutivas y selector COP / USD.' },
      { bold: 'Gastronomía y Café de Origen', text: 'Impulso de consumos en terraza y desayunos tradicionales gourmet.' },
      { bold: 'Conserje WhatsApp 24/7', text: 'Botón flotante omnicanal para atención inmediata en un solo toque.' }
    ],
    highlightLabel: '💎 Beneficio Huésped',
    highlightText: 'Confianza inmediata, información transparente y reserva directa sin intermediarios sospechosos.',
    image: 'slide_portal_habitaciones.png'
  });

  // 5. MOTOR DE RESERVA DIRECTA
  addSplitSlide({
    badge: 'Venta Directa 0% Comisiones',
    title: 'Motor de Reserva Directa en 4 Pasos',
    subtitle: 'Flujo intuitivo y guiado que maximiza la tasa de conversión en cualquier dispositivo.',
    points: [
      { bold: 'Paso 1 - Fechas & Huéspedes', text: 'Selección ágil de calendario y número de personas con disponibilidad en vivo.' },
      { bold: 'Paso 2 - Habitación & Tarifa', text: 'Confirmación de suite con cotización y desglose de valores en tiempo real.' },
      { bold: 'Paso 3 - Datos del Huésped', text: 'Registro rápido del titular con políticas claras y transparentes de cancelación.' },
      { bold: 'Paso 4 - Voucher Inmediato', text: 'Generación de código único de confirmación y comprobante formal.' }
    ],
    highlightLabel: '💰 Beneficio Financiero',
    highlightText: 'Ahorro frente al 18%-25% de comisiones OTA, asumiendo solo la tarifa habitual de pasarela de pago o 0% en transferencias.',
    image: 'slide_motor_reserva.png'
  });

  // 6. PRE-CHECK-IN DIGITAL
  addSplitSlide({
    badge: 'Agilidad & Legalidad',
    title: 'Pre-Check-In Digital & Cumplimiento TRA',
    subtitle: 'Cumplimiento de la normatividad colombiana mientras se eliminan las filas.',
    points: [
      { bold: 'TRA Virtual', text: 'Captura anticipada de documento, ciudad de procedencia y contacto de emergencia.' },
      { bold: 'Cumplimiento MinCIT', text: 'Datos requeridos por la Ley de Turismo 2068 listos para inspecciones.' },
      { bold: 'Pase Fast-Track', text: 'El huésped llega, valida su documento, recibe su llave y sube en segundos.' },
      { bold: 'Habeas Data Protegido', text: 'Consentimiento digital y base de datos privada propiedad de Garibaldi.' }
    ],
    highlightLabel: '⏱️ Eficiencia Comprobada',
    highlightText: 'Reduce el tiempo de recepción de 7 minutos a menos de 45 segundos por cada check-in.',
    image: 'slide_portal_precheckin.png'
  });

  // 7. PMS DASHBOARD EJECUTIVO
  addSplitSlide({
    badge: 'Control Gerencial',
    title: 'PMS: Dashboard Ejecutivo en Vivo',
    subtitle: 'Centro de comando para la gerencia con métricas hoteleras internacionales.',
    points: [
      { bold: 'Ocupación en Vivo (%)', text: 'Balance instantáneo de habitaciones ocupadas vs. libres para venta.' },
      { bold: 'ADR (Tarifa Promedio)', text: 'Cálculo automatizado del valor promedio generado por noche vendida.' },
      { bold: 'RevPAR en Tiempo Real', text: 'Ingreso por habitación disponible para medir el rendimiento global.' },
      { bold: 'Operación del Día', text: 'Conteo de llegadas previstas, salidas programadas y huéspedes in-house.' }
    ],
    highlightLabel: '🎯 Decisión Informada',
    highlightText: 'Tome decisiones de tarifas y disponibilidad en segundos con métricas claras y transparentes.',
    image: 'slide_pms_dashboard.png'
  });

  // 8. TAPE CHART GANTT & INVENTARIO
  addSplitSlide({
    badge: 'Planificación Visual',
    title: 'Tape Chart Gantt & CRUD de Habitaciones',
    subtitle: 'Calendario visual de ocupación que previene dobles reservas y organiza el rack.',
    points: [
      { bold: 'Calendario Tipo Gantt', text: 'Grilla interactiva de habitaciones por fecha con código de colores según estado.' },
      { bold: 'Cero Overbooking', text: 'Validación automática de cruce de fechas antes de confirmar reservaciones.' },
      { bold: 'CRUD de Habitaciones', text: 'Añada suites, ajuste tarifas por temporada o marque mantenimiento en 2 clics.' },
      { bold: 'Walk-In Express', text: 'Registro inmediato de huéspedes que llegan al mostrador sin reserva previa.' }
    ],
    highlightLabel: '⚡ Agilidad en Recepción',
    highlightText: 'El recepcionista visualiza en segundos qué habitación asignar sin consultar archivos en papel.',
    image: 'slide_pms_tapechart.png'
  });

  // 9. CAJAS, TURNOS Y ARQUEOS
  addSplitSlide({
    badge: 'Blindaje Financiero',
    title: 'Cajas, Turnos, Folios & Arqueo Ciego',
    subtitle: 'Trazabilidad monetaria rigurosa peso a peso para erradicar descuadres y fugas.',
    points: [
      { bold: 'Apertura de Turno Formal', text: 'Registro obligatorio de la base en efectivo antes de iniciar operaciones.' },
      { bold: 'Folios por Habitación', text: 'Cargos ordenados de hospedaje, consumos de cafetería, minibar y abonos.' },
      { bold: 'Arqueo de Turno Asistido', text: 'Conciliación automática entre saldo teórico vs. efectivo real con reporte.' },
      { bold: 'Estado de Cuenta Imprimible', text: 'Folio oficial con NIT y RNT listo para entregar al huésped corporativo.' }
    ],
    highlightLabel: '🛡️ Seguridad Financiera',
    highlightText: 'Cero pérdidas en caja y cuentas claras e indiscutibles entre colaboradores y gerencia.',
    image: 'slide_pms_arqueo.png'
  });

  // 10. HOUSEKEEPING & CRM
  addSplitSlide({
    badge: 'Operación y Fidelización',
    title: 'Housekeeping Dinámico & CRM de Huéspedes',
    subtitle: 'Sincronización en tiempo real entre pisos y recepción, con historial de clientes.',
    points: [
      { bold: 'Pase de Lista de Camareras', text: 'Estados: Sucia ➔ En Limpieza ➔ Limpia ➔ Inspeccionada & Lista.' },
      { bold: 'Comunicación Inmediata', text: 'La gobernanta actualiza el piso y recepción lo ve al instante sin llamadas.' },
      { bold: 'CRM de Huéspedes Fieles', text: 'Historial de noches, consumos acumulados y preferencias personales.' },
      { bold: 'Servicio Personalizado', text: 'Recordar preferencias de habitación genera reseñas de 5 estrellas en Google.' }
    ],
    highlightLabel: '🏨 Excelencia en Servicio',
    highlightText: 'Habitaciones entregadas a tiempo con máxima pulcritud y huéspedes que regresan felices.',
    image: 'slide_pms_housekeeping.png'
  });

  // 11. ROLES RBAC, AUDITORÍA & MÓVIL
  addSplitSlide({
    badge: 'Seguridad y Control',
    title: 'Roles RBAC, Auditoría & Control Móvil',
    subtitle: 'Seguridad corporativa donde cada colaborador tiene acceso a su responsabilidad.',
    points: [
      { bold: 'Matriz de Permisos por Rol', text: 'Perfiles configurados para Gerente, Recepción, Gobernanta y Auditor.' },
      { bold: 'Registro Inmutable de Auditoría', text: 'Huella de tiempo y autor de cada check-in, cobro o cambio de estado.' },
      { bold: 'Control Móvil para Gerencia', text: 'Menú deslizable adaptado para supervisar el hotel desde el celular.' },
      { bold: 'Infraestructura Segura en la Nube', text: 'Servidores de alta disponibilidad con copias de respaldo continuas.' }
    ],
    highlightLabel: '📱 Gerencia en Movimiento',
    highlightText: 'Supervise la ocupación y apruebe operaciones desde cualquier lugar desde su celular.',
    image: 'slide_pms_mobile.png'
  });

  // 12. RETORNO DE INVERSIÓN (ROI) & CIERRE
  const slide12 = pres.addSlide();
  slide12.background = { color: COLOR_BG_DARK };

  slide12.addText('RETORNO DE INVERSIÓN (ROI)', {
    x: 1.0, y: 1.0, w: 11.3, h: 0.4,
    align: 'center', fontSize: 11, bold: true, color: COLOR_GOLD,
    fontFace: 'Arial', spacing: 2
  });

  slide12.addText('El Activo Tecnológico Definitivo para Garibaldi', {
    x: 1.0, y: 1.45, w: 11.3, h: 0.9,
    align: 'center', fontSize: 32, bold: true, color: COLOR_WHITE,
    fontFace: 'Georgia'
  });

  slide12.addText('Una inversión única que transforma la rentabilidad del hotel y le devuelve la autonomía total de sus ventas y operaciones.', {
    x: 1.5, y: 2.35, w: 10.3, h: 0.6,
    align: 'center', fontSize: 13, italic: true, color: COLOR_GOLD_LIGHT,
    fontFace: 'Georgia'
  });

  // 3 Cajas de ROI
  const roiBoxes = [
    { value: '+15% a +22%', label: 'Margen por Reserva Directa', sub: 'Porcentaje retenido al sustituir intermediarios por el canal oficial.' },
    { value: '0 Mensualidades', label: 'Software Propietario', sub: 'Sin cobros mensuales por habitación a proveedores externos.' },
    { value: '100% Control', label: 'Caja & Trazabilidad', sub: 'Arqueos ciegos por turno y auditoría inmutable de cada transacción.' }
  ];

  roiBoxes.forEach((b, idx) => {
    const x = 1.2 + (idx * 3.75);
    const y = 3.2;

    slide12.addShape(pres.ShapeType.rect, {
      x, y, w: 3.5, h: 2.2,
      fill: { color: COLOR_CARD_DARK },
      line: { color: COLOR_GOLD, width: 1.5 }
    });

    slide12.addText(b.value, {
      x: x + 0.2, y: y + 0.25, w: 3.1, h: 0.6,
      align: 'center', fontSize: 24, bold: true, color: COLOR_GOLD, fontFace: 'Arial'
    });

    slide12.addText(b.label, {
      x: x + 0.2, y: y + 0.85, w: 3.1, h: 0.35,
      align: 'center', fontSize: 12, bold: true, color: COLOR_WHITE, fontFace: 'Arial'
    });

    slide12.addText(b.sub, {
      x: x + 0.2, y: y + 1.25, w: 3.1, h: 0.7,
      align: 'center', fontSize: 9.5, color: '9BB5AB', fontFace: 'Arial'
    });
  });

  slide12.addText('💻 Demo Funcional Lista para Pruebas y Validación con el Equipo', {
    x: 3.2, y: 5.8, w: 6.9, h: 0.5,
    align: 'center', fontSize: 11, bold: true, color: COLOR_GOLD_LIGHT,
    fill: { color: '18382D' }, line: { color: COLOR_GOLD, width: 1 },
    fontFace: 'Arial'
  });

  slide12.addText('Hotel Plaza Garibaldi • Caldas, Antioquia • Transformación Digital Hotelera', {
    x: 1.0, y: 6.7, w: 11.3, h: 0.3,
    align: 'center', fontSize: 8.5, color: '728A81', fontFace: 'Arial'
  });

  // ==========================================
  // SLIDE 13: CIERRE / MUCHAS GRACIAS
  // ==========================================
  const slide13 = pres.addSlide();
  slide13.background = { color: COLOR_BG_DARK };

  slide13.addText('HOTEL PLAZA GARIBALDI • TRANSFORMACIÓN DIGITAL', {
    x: 1.0, y: 1.5, w: 11.3, h: 0.4,
    align: 'center', fontSize: 10, bold: true, color: COLOR_GOLD,
    fontFace: 'Arial', spacing: 2
  });

  slide13.addText('¡Muchas Gracias!', {
    x: 1.0, y: 2.2, w: 11.3, h: 1.2,
    align: 'center', fontSize: 44, bold: true, color: COLOR_WHITE,
    fontFace: 'Georgia'
  });

  slide13.addText('El Futuro de la Operación y la Autonomía Financiera de su Hotel', {
    x: 1.5, y: 3.5, w: 10.3, h: 0.6,
    align: 'center', fontSize: 16, italic: true, color: COLOR_GOLD_LIGHT,
    fontFace: 'Georgia'
  });

  slide13.addText('📍 Caldas, Antioquia • Parque Santander    |    💬 Espacio Abierto para Preguntas & Demostración', {
    x: 2.0, y: 4.5, w: 9.3, h: 0.5,
    align: 'center', fontSize: 11, color: COLOR_WHITE,
    fill: { color: '18382D' }, line: { color: COLOR_GOLD, width: 1 },
    fontFace: 'Arial'
  });

  slide13.addText('💻 Demo Funcional Lista para Pruebas y Validación con el Equipo', {
    x: 3.2, y: 5.3, w: 6.9, h: 0.45,
    align: 'center', fontSize: 10.5, bold: true, color: COLOR_GOLD_LIGHT,
    fontFace: 'Arial'
  });

  slide13.addText('Hotel Plaza Garibaldi S.A.S. • RNT 54912 • NIT 900.842.195-3', {
    x: 1.0, y: 6.6, w: 11.3, h: 0.3,
    align: 'center', fontSize: 8.5, color: '728A81', fontFace: 'Arial'
  });

  await pres.writeFile({ fileName: PPTX_OUTPUT });
  console.log(`🎉 Archivo PowerPoint (.pptx) generado exitosamente en: ${PPTX_OUTPUT}`);
}

createPresentation().catch(err => {
  console.error('Error generando PPTX:', err);
  process.exit(1);
});
