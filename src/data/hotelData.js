// ===================================================================
// BASE DE DATOS ESTRUCTURADA - HOTEL PLAZA GARIBALDI CALDAS
// Información de Operaciones, Inventario, CRM, Housekeeping y Finanzas
// ===================================================================

export const HOTEL_INFO = {
  name: "Hotel Plaza Garibaldi",
  legalName: "Hotel Plaza Garibaldi S.A.S.",
  nit: "900.842.195-3",
  rnt: "RNT: 54912 - Registro Nacional de Turismo",
  tagline: "Serenidad y distinción frente al Parque Principal de Caldas",
  description: "Ubicado en el epicentro histórico y social de Caldas, Antioquia, Hotel Plaza Garibaldi ofrece una estancia de confort 4 estrellas con vistas privilegiadas a la Parroquia Nuestra Señora de las Mercedes y el Parque Santander. Un refugio contemporáneo para estancias ejecutivas y viajeros que descubren la cuna del río Medellín y el Suroeste antioqueño.",
  stars: 4,
  rating: 4.8,
  reviewsCount: 342,
  address: "Carrera 49 # 129 Sur 18, Parque Principal",
  city: "Caldas",
  department: "Antioquia",
  country: "Colombia",
  phonePrimary: "+57 304 481 7071",
  phoneSecondary: "+57 312 803 2916",
  whatsapp: "573044817071",
  email: "contacto@hotelplazagaribaldi.com",
  checkInTime: "14:00",
  checkOutTime: "12:00",
  exchangeRate: 4000 // 1 USD = 4,000 COP
};

// Inventario de Habitaciones (Catálogo Público & Base de Datos PMS)
export const INITIAL_ROOMS = [
  {
    id: "std-101",
    number: "101",
    floor: 1,
    type: "Estándar Ejecutiva",
    category: "ejecutiva",
    status: "occupied", // 'available' | 'occupied' | 'cleaning' | 'maintenance'
    cleaningStatus: "clean", // 'clean' | 'dirty' | 'in_progress' | 'inspected'
    guest: "Juan Camilo Duque",
    guestDoc: "CC 1.020.345.890",
    checkIn: "2026-10-08",
    checkOut: "2026-10-11",
    priceCOP: 140000,
    priceUSD: 35,
    capacity: 2,
    beds: "1 Cama Doble Queen",
    size: "22 m²",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["WiFi Fibra Óptica 300 Mbps", "Smart TV 43''", "Escritorio ergonómico", "Baño privado agua caliente", "Minibar", "Caja fuerte digital"],
    description: "Diseñada para ejecutivos y profesionales de paso por el corredor industrial de Caldas y La Estrella. Silencio óptimo y conectividad estable."
  },
  {
    id: "std-102",
    number: "102",
    floor: 1,
    type: "Estándar Ejecutiva",
    category: "ejecutiva",
    status: "available",
    cleaningStatus: "inspected",
    guest: null,
    guestDoc: null,
    checkIn: null,
    checkOut: null,
    priceCOP: 140000,
    priceUSD: 35,
    capacity: 2,
    beds: "1 Cama Doble Queen",
    size: "22 m²",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["WiFi Fibra Óptica 300 Mbps", "Smart TV 43''", "Escritorio ergonómico", "Baño privado agua caliente", "Minibar"],
    description: "Ambiente sereno y funcional en el primer nivel, con acceso directo al lobby y patio colonial interior."
  },
  {
    id: "dob-103",
    number: "103",
    floor: 1,
    type: "Habitación Doble Superior",
    category: "superior",
    status: "cleaning",
    cleaningStatus: "in_progress",
    guest: null,
    guestDoc: null,
    checkIn: null,
    checkOut: null,
    priceCOP: 165000,
    priceUSD: 42,
    capacity: 2,
    beds: "1 Cama Queen Size",
    size: "26 m²",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Cama Queen ortopédica", "Smart TV 50''", "Baño privado moderno", "Nevera minibar", "Clóset amplio", "Room service"],
    description: "Confort amplio pensado para parejas que visitan Caldas en fines de semana o inician ruta hacia Fredonia y Jericó."
  },
  {
    id: "dlx-201",
    number: "201",
    floor: 2,
    type: "Deluxe con Balcón al Parque",
    category: "deluxe",
    status: "occupied",
    cleaningStatus: "clean",
    guest: "Carlos Mario Restrepo",
    guestDoc: "CC 71.394.210",
    checkIn: "2026-10-09",
    checkOut: "2026-10-12",
    priceCOP: 195000,
    priceUSD: 49,
    capacity: 2,
    beds: "1 Cama King Size",
    size: "30 m²",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Balcón colonial privado con vista a la catedral", "Cama King Size 400 hilos", "Cafetera con café de origen", "Smart TV 50'' 4K", "Aislamiento acústico", "Batas de baño"],
    description: "La suite insignia del hotel. Grandes ventanales coloniales abiertos al Parque Santander, vista a la iglesia y brisa fresca de la montaña."
  },
  {
    id: "dlx-202",
    number: "202",
    floor: 2,
    type: "Deluxe con Balcón al Parque",
    category: "deluxe",
    status: "available",
    cleaningStatus: "inspected",
    guest: null,
    guestDoc: null,
    checkIn: null,
    checkOut: null,
    priceCOP: 195000,
    priceUSD: 49,
    capacity: 2,
    beds: "1 Cama King Size",
    size: "30 m²",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Balcón colonial privado", "Cama King Size", "Cafetera de origen", "Smart TV 50''", "Baño en piedra natural"],
    description: "Espacio luminoso en el segundo nivel con vistas frontales y acabados en madera cálida antioqueña."
  },
  {
    id: "dob-203",
    number: "203",
    floor: 2,
    type: "Habitación Doble Superior",
    category: "superior",
    status: "available",
    cleaningStatus: "inspected",
    guest: null,
    guestDoc: null,
    checkIn: null,
    checkOut: null,
    priceCOP: 165000,
    priceUSD: 42,
    capacity: 2,
    beds: "1 Cama Queen Size",
    size: "26 m²",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Cama Queen ortopédica", "Baño privado", "Smart TV", "Minibar", "WiFi 300 Mbps"],
    description: "Excelente balance entre espacio y tranquilidad en el segundo nivel interior."
  },
  {
    id: "std-204",
    number: "204",
    floor: 2,
    type: "Estándar Ejecutiva",
    category: "ejecutiva",
    status: "maintenance",
    cleaningStatus: "dirty",
    guest: null,
    guestDoc: null,
    checkIn: null,
    checkOut: null,
    priceCOP: 140000,
    priceUSD: 35,
    capacity: 2,
    beds: "1 Cama Doble Queen",
    size: "22 m²",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    gallery: [],
    amenities: ["WiFi Fibra Óptica", "Smart TV", "Escritorio"],
    description: "En mantenimiento preventivo de pintura y ajuste de grifería."
  },
  {
    id: "ste-301",
    number: "301",
    floor: 3,
    type: "Gran Suite Familiar Garibaldi",
    category: "familiar",
    status: "occupied",
    cleaningStatus: "clean",
    guest: "Familia Gómez Pardo",
    guestDoc: "CC 52.889.102",
    checkIn: "2026-10-07",
    checkOut: "2026-10-13",
    priceCOP: 260000,
    priceUSD: 65,
    capacity: 5,
    beds: "1 Cama King + 2 Semidobles",
    size: "45 m²",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Sala de estar integrada", "2 Smart TV independientes", "Nevera minibar familiar", "Baño espacioso con tina", "Vistas a las montañas de Caldas"],
    description: "Nuestra suite más amplia. Diseñada para familias que asisten a celebraciones o desean un espacio generoso para compartir."
  },
  {
    id: "dlx-302",
    number: "302",
    floor: 3,
    type: "Deluxe con Balcón al Parque",
    category: "deluxe",
    status: "available",
    cleaningStatus: "inspected",
    guest: null,
    guestDoc: null,
    checkIn: null,
    checkOut: null,
    priceCOP: 195000,
    priceUSD: 49,
    capacity: 2,
    beds: "1 Cama King Size",
    size: "30 m²",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    gallery: [],
    amenities: ["Balcón en último piso", "Vista panorámica al parque", "Cama King Size", "Cafetera de origen"],
    description: "Vistas espectaculares desde el tercer piso, máxima tranquilidad y luminosidad natural."
  },
  {
    id: "dob-303",
    number: "303",
    floor: 3,
    type: "Habitación Doble Superior",
    category: "superior",
    status: "available",
    cleaningStatus: "inspected",
    guest: null,
    guestDoc: null,
    checkIn: null,
    checkOut: null,
    priceCOP: 165000,
    priceUSD: 42,
    capacity: 2,
    beds: "1 Cama Queen Size",
    size: "26 m²",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
    gallery: [],
    amenities: ["Cama Queen", "Smart TV 43''", "Minibar", "WiFi"],
    description: "Habitación confortable en el tercer nivel con vista a los patios internos."
  },
  {
    id: "ste-304",
    number: "304",
    floor: 3,
    type: "Gran Suite Familiar Garibaldi",
    category: "familiar",
    status: "cleaning",
    cleaningStatus: "dirty",
    guest: null,
    guestDoc: null,
    checkIn: null,
    checkOut: null,
    priceCOP: 260000,
    priceUSD: 65,
    capacity: 5,
    beds: "1 Cama King + 2 Semidobles",
    size: "45 m²",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
    gallery: [],
    amenities: ["Capacidad múltiple", "Sala de estar", "2 Smart TV", "Minibar familiar"],
    description: "Salida de huéspedes a las 11:30. En proceso de cambio de lencería blanca y desinfección."
  }
];

// Directorio de Clientes / Huéspedes (CRM Hotelero)
export const INITIAL_GUESTS_CRM = [
  {
    id: "gst-001",
    fullName: "Carlos Mario Restrepo",
    docType: "CC",
    docNumber: "71.394.210",
    nationality: "Colombiana",
    city: "Medellín",
    email: "carlos.restrepo@grupoindustrial.com",
    phone: "+57 310 987 6543",
    totalStays: 4,
    totalSpentCOP: 1420000,
    vipStatus: true,
    preferences: "Prefiere habitación 201 en piso 2 con vista al parque. Toma café negro sin azúcar a las 7:00 AM.",
    lastStay: "2026-10-09"
  },
  {
    id: "gst-002",
    fullName: "Ing. Andrea Vélez Rendón",
    docType: "CC",
    docNumber: "43.892.115",
    nationality: "Colombiana",
    city: "Manizales",
    email: "andrea.velez@ingenieria.co",
    phone: "+57 301 222 3344",
    totalStays: 6,
    totalSpentCOP: 2150000,
    vipStatus: true,
    preferences: "Viaja por negocios industriales en Caldas. Requiere factura electrónica a nombre de empresa y almohada firme.",
    lastStay: "2026-09-24"
  },
  {
    id: "gst-003",
    fullName: "Michael Bennett",
    docType: "PASAPORTE",
    docNumber: "CAN-8924192",
    nationality: "Canadiense",
    city: "Toronto",
    email: "m.bennett@toronto-travel.ca",
    phone: "+1 416 555 0192",
    totalStays: 1,
    totalSpentCOP: 780000,
    vipStatus: false,
    preferences: "Turismo ecológico. Interesado en guianza para avistamiento de aves en el Alto de San Miguel.",
    lastStay: "2026-08-15"
  },
  {
    id: "gst-004",
    fullName: "Familia Gómez Pardo",
    docType: "CC",
    docNumber: "52.889.102",
    nationality: "Colombiana",
    city: "Bogotá",
    email: "familia.gomez@gmail.com",
    phone: "+57 315 444 8899",
    totalStays: 2,
    totalSpentCOP: 1040000,
    vipStatus: false,
    preferences: "Asisten a bodas y eventos en Caldas. Solicitan cuna adicional para bebé.",
    lastStay: "2026-10-07"
  }
];

// Personal del Hotel y Roles (Usuarios del Sistema)
export const INITIAL_STAFF_USERS = [
  {
    id: "usr-01",
    name: "Gloria Patricia Henao",
    role: "Administradora General",
    roleKey: "admin",
    email: "gerencia@hotelplazagaribaldi.com",
    username: "admin",
    password: "garibaldi123",
    phone: "+57 304 481 7071",
    shift: "Tiempo Completo",
    status: "active"
  },
  {
    id: "usr-02",
    name: "Esteban Montoya R.",
    role: "Recepcionista Principal",
    roleKey: "receptionist",
    email: "recepcion.dia@hotelplazagaribaldi.com",
    username: "esteban",
    password: "recepcion123",
    phone: "+57 312 803 2916",
    shift: "Turno Mañana (06:00 - 14:00)",
    status: "active"
  },
  {
    id: "usr-03",
    name: "David Restrepo C.",
    role: "Recepcionista Noche",
    roleKey: "receptionist",
    email: "recepcion.noche@hotelplazagaribaldi.com",
    username: "david",
    password: "noche123",
    phone: "+57 314 555 7890",
    shift: "Turno Noche (22:00 - 06:00)",
    status: "active"
  },
  {
    id: "usr-04",
    name: "Luz Dary Zapata",
    role: "Gobernanta / Jefe de Aseo",
    roleKey: "housekeeping",
    email: "limpieza@hotelplazagaribaldi.com",
    username: "luzdary",
    password: "aseo123",
    phone: "+57 300 111 2233",
    shift: "Turno Diario (07:00 - 16:00)",
    status: "active"
  },
  {
    id: "usr-05",
    name: "Mauricio Jaramillo",
    role: "Auditor Nocturno",
    roleKey: "auditor",
    email: "auditoria@hotelplazagaribaldi.com",
    username: "auditor",
    password: "auditor123",
    phone: "+57 315 222 4455",
    shift: "Turno Noche & Cierres (23:00 - 07:00)",
    status: "active"
  }
];

// Matriz Central de Permisos por Rol en el PMS
export const INITIAL_ROLES_PERMISSIONS = {
  admin: {
    roleKey: "admin",
    name: "Administradora General",
    badgeLabel: "Gerencia & Admin",
    description: "Control absoluto y acceso total a todas las operaciones, finanzas, inventario y seguridad del sistema.",
    color: "#D4AF37",
    modules: ['dashboard', 'tapechart', 'rooms', 'reservations', 'guests', 'housekeeping', 'cashiering', 'users', 'audit'],
    capabilities: {
      canEditRooms: true,
      canDeleteRooms: true,
      canManageUsers: true,
      canEditPermissions: true,
      canManageCash: true,
      canProcessCheckInOut: true,
      canUpdateHousekeeping: true,
      canExportAudit: true
    }
  },
  receptionist: {
    roleKey: "receptionist",
    name: "Recepcionista / Front Desk",
    badgeLabel: "Recepción",
    description: "Gestión diaria de reservas, check-in, check-out, atención a huéspedes, cobros de folios y arqueo de turnos.",
    color: "#3B82F6",
    modules: ['dashboard', 'tapechart', 'rooms', 'reservations', 'guests', 'cashiering'],
    capabilities: {
      canEditRooms: false,
      canDeleteRooms: false,
      canManageUsers: false,
      canEditPermissions: false,
      canManageCash: true,
      canProcessCheckInOut: true,
      canUpdateHousekeeping: false,
      canExportAudit: false
    }
  },
  housekeeping: {
    roleKey: "housekeeping",
    name: "Gobernanta / Housekeeping",
    badgeLabel: "Housekeeping",
    description: "Supervisión de aseo de habitaciones, pase de lista de camareras y reporte de novedades técnicas de mantenimiento.",
    color: "#10B981",
    modules: ['dashboard', 'housekeeping', 'tapechart'],
    capabilities: {
      canEditRooms: false,
      canDeleteRooms: false,
      canManageUsers: false,
      canEditPermissions: false,
      canManageCash: false,
      canProcessCheckInOut: false,
      canUpdateHousekeeping: true,
      canExportAudit: false
    }
  },
  auditor: {
    roleKey: "auditor",
    name: "Auditor Nocturno",
    badgeLabel: "Auditoría Contable",
    description: "Cierre diario contable, conciliación de caja, control de reservas e inspección de la bitácora de auditoría.",
    color: "#8B5CF6",
    modules: ['dashboard', 'tapechart', 'reservations', 'cashiering', 'audit'],
    capabilities: {
      canEditRooms: false,
      canDeleteRooms: false,
      canManageUsers: false,
      canEditPermissions: false,
      canManageCash: true,
      canProcessCheckInOut: true,
      canUpdateHousekeeping: false,
      canExportAudit: true
    }
  }
};


// Equipo de Camareras / Housekeeping (Para pasar lista y asignación de habitaciones)
export const INITIAL_HOUSEKEEPING_STAFF = [
  {
    id: "cam-01",
    name: "Luz Dary Zapata",
    role: "Gobernanta",
    assignedFloors: [1, 2],
    attendance: "present", // 'present' | 'absent' | 'rest'
    roomsAssigned: ["101", "102", "103", "201", "202"],
    roomsCompletedToday: 3,
    phone: "+57 300 111 2233"
  },
  {
    id: "cam-02",
    name: "Marta Cecilia Osorio",
    role: "Camarera Piso 2 y 3",
    assignedFloors: [2, 3],
    attendance: "present",
    roomsAssigned: ["203", "204", "301", "302", "303", "304"],
    roomsCompletedToday: 4,
    phone: "+57 311 444 5566"
  },
  {
    id: "cam-03",
    name: "Claudia Marcela Ríos",
    role: "Camarera Refuerzo",
    assignedFloors: [1],
    attendance: "rest",
    roomsAssigned: [],
    roomsCompletedToday: 0,
    phone: "+57 318 777 8899"
  }
];

// Catálogo de Consumos y Minibar para Caja y Facturación
export const MINIBAR_CATALOG = [
  { id: "mb-01", name: "Agua Manantial con Gas 500ml", category: "Bebidas", priceCOP: 4500, priceUSD: 1.2 },
  { id: "mb-02", name: "Agua Cristal sin Gas 500ml", category: "Bebidas", priceCOP: 4000, priceUSD: 1.0 },
  { id: "mb-03", name: "Cerveza Club Colombia Dorada", category: "Licores", priceCOP: 8000, priceUSD: 2.0 },
  { id: "mb-04", name: "Café Especial de Caldas (Bolsa 250g)", category: "Souvenir", priceCOP: 22000, priceUSD: 5.5 },
  { id: "mb-05", name: "Snack Papas Gourmet / Platanitos", category: "Snacks", priceCOP: 6000, priceUSD: 1.5 },
  { id: "mb-06", name: "Desayuno Típico Paisa Completo", category: "Cocina", priceCOP: 18000, priceUSD: 4.5 },
  { id: "mb-07", name: "Servicio de Lavandería (Prenda)", category: "Servicios", priceCOP: 12000, priceUSD: 3.0 },
  { id: "mb-08", name: "Late Check-out Extra (hasta 16:00)", category: "Estancia", priceCOP: 45000, priceUSD: 11.0 }
];

// Folio y Cargos de Habitaciones Iniciales
export const INITIAL_ROOM_CHARGES = [
  {
    roomNumber: "201",
    guestName: "Carlos Mario Restrepo",
    items: [
      { id: "c-01", item: "Alojamiento Deluxe (3 Noches)", amountCOP: 585000, date: "2026-10-09" },
      { id: "c-02", item: "Desayuno Típico Paisa Gourmet", amountCOP: 18000, date: "2026-10-10" },
      { id: "c-03", item: "Cerveza Club Colombia (x2)", amountCOP: 16000, date: "2026-10-10" }
    ],
    payments: [
      { id: "p-01", method: "PSE Bancolombia", amountCOP: 585000, date: "2026-10-09" }
    ]
  },
  {
    roomNumber: "101",
    guestName: "Juan Camilo Duque",
    items: [
      { id: "c-04", item: "Alojamiento Estándar Ejecutiva (3 Noches)", amountCOP: 420000, date: "2026-10-08" },
      { id: "c-05", item: "Servicio de Lavandería (x2 camisas)", amountCOP: 24000, date: "2026-10-09" }
    ],
    payments: [
      { id: "p-02", method: "Tarjeta Crédito Visa", amountCOP: 420000, date: "2026-10-08" }
    ]
  }
];

// Reservas Iniciales
export const INITIAL_RESERVATIONS = [
  {
    code: "GAR-94102",
    guestName: "Carlos Mario Restrepo",
    room: "Deluxe con Balcón al Parque",
    roomNumber: "201",
    checkIn: "2026-10-09",
    checkOut: "2026-10-12",
    nights: 3,
    guests: 2,
    status: "in_house", // 'confirmed' | 'in_house' | 'completed' | 'cancelled'
    paymentMethod: "pse",
    totalCOP: 585000,
    totalUSD: 146,
    currency: "COP",
    phone: "+57 310 987 6543",
    email: "carlos.restrepo@grupoindustrial.com",
    dateBooked: "2026-10-05"
  },
  {
    code: "GAR-88419",
    guestName: "Juan Camilo Duque",
    room: "Estándar Ejecutiva",
    roomNumber: "101",
    checkIn: "2026-10-08",
    checkOut: "2026-10-11",
    nights: 3,
    guests: 1,
    status: "in_house",
    paymentMethod: "card",
    totalCOP: 420000,
    totalUSD: 105,
    currency: "COP",
    phone: "+57 300 456 7890",
    email: "jcduque@empresa.com",
    dateBooked: "2026-10-04"
  },
  {
    code: "GAR-91023",
    guestName: "Familia Gómez Pardo",
    room: "Gran Suite Familiar Garibaldi",
    roomNumber: "301",
    checkIn: "2026-10-07",
    checkOut: "2026-10-13",
    nights: 6,
    guests: 4,
    status: "in_house",
    paymentMethod: "card",
    totalCOP: 1560000,
    totalUSD: 390,
    currency: "COP",
    phone: "+57 315 444 8899",
    email: "familia.gomez@gmail.com",
    dateBooked: "2026-10-01"
  },
  {
    code: "GAR-99411",
    guestName: "Dra. Valentina Morales",
    room: "Deluxe con Balcón al Parque",
    roomNumber: "202",
    checkIn: "2026-10-15",
    checkOut: "2026-10-18",
    nights: 3,
    guests: 2,
    status: "confirmed",
    paymentMethod: "pse",
    totalCOP: 585000,
    totalUSD: 146,
    currency: "COP",
    phone: "+57 312 999 1122",
    email: "valen.morales@salud.org",
    dateBooked: "2026-10-08"
  }
];

// Registro de Auditoría y Turnos
export const INITIAL_AUDIT_LOGS = [
  {
    id: "log-1",
    timestamp: "2026-10-09 14:15",
    user: "Esteban Montoya (Recepción)",
    action: "Check-in Registrado",
    details: "Huésped Carlos Mario Restrepo asignado a habitación 201."
  },
  {
    id: "log-2",
    timestamp: "2026-10-09 11:30",
    user: "Luz Dary Zapata (Gobernanta)",
    action: "Habitación Marcada Limpia",
    details: "Habitación 102 inspeccionada y habilitada para venta."
  },
  {
    id: "log-3",
    timestamp: "2026-10-09 08:00",
    user: "Esteban Montoya (Recepción)",
    action: "Apertura de Turno de Caja",
    details: "Turno mañana iniciado con base de $200.000 COP en efectivo."
  }
];

// Galería Editorial de Fotos de Alta Gama
export const GALLERY_ITEMS = [
  {
    id: "g-01",
    category: "balcon",
    title: "Amanecer Frente al Parque Santander",
    caption: "Balcón privado con vista directa a la Parroquia Nuestra Señora de las Mercedes.",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "g-02",
    category: "habitaciones",
    title: "Gran Suite Familiar",
    caption: "Espacios generosos con lencería blanca de 400 hilos y luz natural.",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "g-03",
    category: "cafe",
    title: "El Ritual del Café de Origen",
    caption: "Tueste medio artesanal de fincas del Suroeste antioqueño servido en terraza.",
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "g-04",
    category: "habitaciones",
    title: "Estándar Ejecutiva",
    caption: "Paz, silencio y mobiliario ergonómico para trabajo corporativo.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "g-05",
    category: "eventos",
    title: "Salón Garibaldi",
    caption: "Montaje ejecutivo para asambleas y talleres corporativos.",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "g-06",
    category: "caldas",
    title: "Naturaleza en el Alto de San Miguel",
    caption: "Bosque de niebla donde brota la vida hídrica del Valle de Aburrá.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85"
  }
];

// Compatibilidad de Catálogo para Motor de Reservas & Modales
export const ROOMS_DATA = INITIAL_ROOMS.map(r => ({
  ...r,
  name: r.type || r.name,
  features: r.amenities || [],
  badge: r.category === 'deluxe' ? 'Balcón al Parque' : (r.category === 'familiar' ? 'Suite Familiar' : 'Habitación 4 Estrellas'),
  tagline: `Nivel ${r.floor} • Vista al Parque Santander`
}));

// Servicios Adicionales para Reserva Web
export const ADDON_SERVICES = [
  {
    id: "desayuno-gourmet",
    name: "Desayuno Típico Paisa Gourmet",
    description: "Arepa de tela con quesito fresco, huevos campesinos al gusto, jugo de naranja y café de origen.",
    priceCOP: 18000,
    priceUSD: 5
  },
  {
    id: "parqueadero-cubierto",
    name: "Parqueadero Privado Cubierto 24h",
    description: "Espacio reservado con vigilancia privada y circuito cerrado de televisión a media cuadra.",
    priceCOP: 15000,
    priceUSD: 4
  },
  {
    id: "late-checkout",
    name: "Late Check-out Extendido (hasta las 16:00)",
    description: "Extiende tu tiempo de descanso y salida hasta las 4:00 PM sin afán.",
    priceCOP: 40000,
    priceUSD: 10
  },
  {
    id: "kit-romantico",
    name: "Cortesía Romántica Garibaldi",
    description: "Botella de vino tinto reserva, bombones de chocolate artesanal y decoración floral en suite.",
    priceCOP: 65000,
    priceUSD: 16
  }
];

// Testimonios Reales de Huéspedes
export const REVIEWS_DATA = [
  {
    name: "Dr. Mauricio Gómez",
    origin: "Bogotá, D.C.",
    room: "201 - Deluxe Balcón al Parque",
    rating: 5,
    comment: "La vista a la iglesia colonial y al parque desde el balcón es inigualable. El café de la mañana es extraordinario y la atención del personal es sumamente cálida y profesional."
  },
  {
    name: "Ing. Juliana Restrepo",
    origin: "Medellín, Antioquia",
    room: "101 - Estándar Ejecutiva",
    rating: 5,
    comment: "Excelente conectividad a internet para trabajar, silencio impecable en la habitación y ubicación estratégica cerca de la zona industrial. Totalmente recomendado."
  },
  {
    name: "David & Sarah Jenkins",
    origin: "Londres, Reino Unido",
    room: "301 - Suite Familiar",
    rating: 5,
    comment: "A delightful boutique hotel with true Colombian charm. Walking distance to the plaza, delicious breakfast buñuelos, and very safe surroundings."
  }
];

// Servicios Generales del Hotel
export const HOTEL_SERVICES = [
  {
    name: "Recepción & Conserjería 24/7",
    desc: "Asistencia permanente para check-in tardío, orientación turística y custodia de equipaje."
  },
  {
    name: "Café de Especialidad Caldense",
    desc: "Tueste medio artesanal cultivado en fincas del Suroeste antioqueño servido fresco a diario."
  },
  {
    name: "Fibra Óptica de Alta Velocidad",
    desc: "Conexión simétrica de 300 Mbps en todas las habitaciones y áreas comunes para teletrabajo."
  },
  {
    name: "Salón para Eventos Garibaldi",
    desc: "Capacidad para hasta 80 personas con proyector HD, sonido profesional y servicio de catering."
  }
];

// Experiencias Turísticas y Destino
export const EXPERIENCES_DATA = [
  {
    title: "Reserva Natural Alto de San Miguel",
    tag: "Naturaleza Virgen",
    duration: "4 - 5 Horas",
    distance: "12 km desde el hotel",
    desc: "Cuna del Río Medellín. Bosque de niebla con más de 200 especies de aves y senderos ecológicos.",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Ruta de la Cerámica Tradicional",
    tag: "Patrimonio & Cultura",
    duration: "2 Horas",
    distance: "Casco Urbano",
    desc: "Visita talleres alfareros de Caldas, epicentro histórico de la porcelana y loza fina en Colombia.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Puerta de Entrada al Suroeste",
    tag: "Ruta Cafetera",
    duration: "Día Completo",
    distance: "Punto de Partida",
    desc: "Conexión directa hacia Cerro Tusa en Venecia, Jericó y los pueblos patrimoniales de Antioquia.",
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"
  }
];

