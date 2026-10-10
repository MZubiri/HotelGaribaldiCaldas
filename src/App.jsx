import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppConcierge } from './components/WhatsAppConcierge';
import { RoomModal } from './components/RoomModal';
import { BookingModal } from './components/BookingModal';

// Páginas Públicas del Huésped
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { GastronomyPage } from './pages/GastronomyPage';
import { EventsPage } from './pages/EventsPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { PreCheckInPage } from './pages/PreCheckInPage';

// Módulos del Sistema de Gestión Hotelera (PMS)
import { PmsLayout } from './pms/PmsLayout';
import { PmsLogin } from './pms/PmsLogin';
import { PmsDashboard } from './pms/PmsDashboard';
import { PmsTapeChart } from './pms/PmsTapeChart';
import { PmsRoomsCrud } from './pms/PmsRoomsCrud';
import { PmsReservations } from './pms/PmsReservations';
import { PmsGuestsCrm } from './pms/PmsGuestsCrm';
import { PmsHousekeeping } from './pms/PmsHousekeeping';
import { PmsCashiering } from './pms/PmsCashiering';
import { PmsUsers } from './pms/PmsUsers';
import { PmsAuditLog } from './pms/PmsAuditLog';

// Base de Datos Central
import { 
  INITIAL_ROOMS, 
  INITIAL_RESERVATIONS, 
  INITIAL_AUDIT_LOGS, 
  HOTEL_INFO,
  INITIAL_STAFF_USERS,
  INITIAL_ROLES_PERMISSIONS
} from './data/hotelData';

export function App() {
  // Estado de Navegación Multi-Página
  const [currentPage, setCurrentPage] = useState('home');

  // Alternancia entre Web de Huéspedes y PMS de Recepción
  const [isAdminView, setIsAdminView] = useState(false);
  const [currentPmsTab, setCurrentPmsTab] = useState('dashboard');

  // Autenticación de Colaboradores y Control de Permisos por Rol
  const [currentUser, setCurrentUser] = useState(null); // null = requiere login para acceder
  const [staffUsers, setStaffUsers] = useState(INITIAL_STAFF_USERS);
  const [rolePermissions, setRolePermissions] = useState(INITIAL_ROLES_PERMISSIONS);

  // Configuración Global de Moneda e Idioma
  const [currency, setCurrency] = useState('COP'); // 'COP' o 'USD'
  const [language, setLanguage] = useState('es');   // 'es' o 'en'

  // Estados Centrales de Operaciones
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [reservations, setReservations] = useState(INITIAL_RESERVATIONS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // Modales
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [roomForBooking, setRoomForBooking] = useState(null);
  const [roomForDetails, setRoomForDetails] = useState(null);

  // Escuchar URL Pathname, Hash o Parámetro para acceso de colaboradores (/pms, /dashboard, /admin, /panel, #pms, ?pms)
  React.useEffect(() => {
    const handleUrlRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      
      const adminKeywords = ['pms', 'dashboard', 'admin', 'panel'];
      const matchesPath = adminKeywords.some(k => path === `/${k}` || path.startsWith(`/${k}/`));
      const matchesHash = adminKeywords.some(k => hash.includes(k));
      const matchesSearch = adminKeywords.some(k => search.includes(k));

      if (matchesPath || matchesHash || matchesSearch) {
        setIsAdminView(true);
      }
    };
    handleUrlRoute();
    window.addEventListener('hashchange', handleUrlRoute);
    window.addEventListener('popstate', handleUrlRoute);
    return () => {
      window.removeEventListener('hashchange', handleUrlRoute);
      window.removeEventListener('popstate', handleUrlRoute);
    };
  }, []);

  // Salir del modo administrativo y restaurar URL
  const handleExitAdmin = () => {
    setIsAdminView(false);
    if (window.location.pathname !== '/' || window.location.hash || window.location.search) {
      window.history.pushState({}, '', '/');
    }
  };

  // Navegación con scroll al tope
  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    if (isAdminView) handleExitAdmin();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Alternar Moneda e Idioma
  const toggleCurrency = () => setCurrency(prev => prev === 'COP' ? 'USD' : 'COP');
  const toggleLanguage = () => setLanguage(prev => prev === 'es' ? 'en' : 'es');

  // Abrir Motor de Reservas Directas
  const handleOpenBooking = (room = null) => {
    setRoomForBooking(room || rooms[0]);
    setIsBookingModalOpen(true);
  };

  // Abrir Vista Detallada de Habitación
  const handleOpenRoomModal = (room) => {
    setRoomForDetails(room);
  };

  // Registro de Auditoría Auxiliar
  const logAction = (user, action, details) => {
    const newEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      user: user || 'Esteban Montoya (Recepción)',
      action,
      details
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // Guardar o Editar Habitación (CRUD)
  const handleSaveRoom = (savedRoom) => {
    const exists = rooms.some(r => r.id === savedRoom.id);
    if (exists) {
      setRooms(prev => prev.map(r => r.id === savedRoom.id ? savedRoom : r));
      logAction('Administrador', 'Habitación Actualizada', `Se modificó la configuración de la habitación ${savedRoom.number} (${savedRoom.type}).`);
    } else {
      setRooms(prev => [...prev, savedRoom]);
      logAction('Administrador', 'Habitación Creada', `Nueva habitación dada de alta: ${savedRoom.number} (${savedRoom.type}).`);
    }
  };

  // Eliminar Habitación (CRUD)
  const handleDeleteRoom = (roomId) => {
    const target = rooms.find(r => r.id === roomId);
    setRooms(prev => prev.filter(r => r.id !== roomId));
    logAction('Administrador', 'Habitación Eliminada', `Habitación ${target ? target.number : roomId} removida del inventario.`);
  };

  // Actualizar Estado en Rack / CRUD
  const handleUpdateRoomStatus = (roomNumber, newStatus, guestName, guestDoc) => {
    setRooms(prev => prev.map(r => {
      if (r.number === roomNumber) {
        return {
          ...r,
          status: newStatus,
          guest: newStatus === 'occupied' ? (guestName || r.guest || 'Huésped Registrado') : (newStatus === 'available' ? null : r.guest),
          guestDoc: newStatus === 'occupied' ? (guestDoc || r.guestDoc) : (newStatus === 'available' ? null : r.guestDoc)
        };
      }
      return r;
    }));

    const statusLabels = {
      available: 'Disponible / Lista',
      occupied: 'Ocupada',
      cleaning: 'En Limpieza',
      maintenance: 'En Mantenimiento'
    };
    logAction('Esteban Montoya (Recepción)', 'Cambio de Estado de Habitación', `Habitación ${roomNumber} cambiada a ${statusLabels[newStatus] || newStatus}.`);
  };

  // Actualizar Estado de Limpieza (Housekeeping)
  const handleUpdateCleaningStatus = (roomNumber, newCleaningStatus) => {
    setRooms(prev => prev.map(r => {
      if (r.number === roomNumber) {
        const nextStatus = newCleaningStatus === 'inspected' && r.status === 'cleaning' ? 'available' : r.status;
        return {
          ...r,
          cleaningStatus: newCleaningStatus,
          status: nextStatus
        };
      }
      return r;
    }));

    const cleanLabels = {
      dirty: 'Sucia / Salida',
      in_progress: 'Limpieza en Progreso',
      clean: 'Limpia',
      inspected: 'Inspeccionada & Lista'
    };
    logAction('Luz Dary Zapata (Gobernanta)', 'Housekeeping Actualizado', `Habitación ${roomNumber} registrada como: ${cleanLabels[newCleaningStatus] || newCleaningStatus}.`);
  };

  // Check-In desde Recepción
  const handleCheckIn = (resCode) => {
    const res = reservations.find(r => r.code === resCode);
    if (!res) return;

    setReservations(prev => prev.map(r => r.code === resCode ? { ...r, status: 'in_house' } : r));

    // Ocupar la habitación correspondiente
    if (res.roomNumber) {
      setRooms(prev => prev.map(r => {
        if (r.number === res.roomNumber) {
          return {
            ...r,
            status: 'occupied',
            guest: res.guestName,
            checkIn: res.checkIn,
            checkOut: res.checkOut
          };
        }
        return r;
      }));
    }

    logAction('Esteban Montoya (Recepción)', 'Check-In Procesado', `Ingreso formal del huésped ${res.guestName} a la habitación ${res.roomNumber || 'asignada'} (Reserva ${resCode}).`);
  };

  // Check-Out desde Recepción
  const handleCheckOut = (resCode) => {
    const res = reservations.find(r => r.code === resCode);
    if (!res) return;

    setReservations(prev => prev.map(r => r.code === resCode ? { ...r, status: 'completed' } : r));

    // Liberar y marcar en limpieza la habitación
    if (res.roomNumber) {
      setRooms(prev => prev.map(r => {
        if (r.number === res.roomNumber) {
          return {
            ...r,
            status: 'cleaning',
            cleaningStatus: 'dirty',
            guest: null,
            guestDoc: null
          };
        }
        return r;
      }));
    }

    logAction('Esteban Montoya (Recepción)', 'Check-Out Procesado', `Salida del huésped ${res.guestName}. Habitación ${res.roomNumber || 'desocupada'} enviada a Housekeeping.`);
  };

  // Crear Walk-In (Recepción Express)
  const handleCreateWalkIn = (newRes) => {
    setReservations(prev => [newRes, ...prev]);

    if (newRes.roomNumber) {
      setRooms(prev => prev.map(r => {
        if (r.number === newRes.roomNumber) {
          return {
            ...r,
            status: 'occupied',
            guest: newRes.guestName,
            guestDoc: newRes.guestDoc || 'Registrado en mostrador',
            checkIn: newRes.checkIn,
            checkOut: newRes.checkOut
          };
        }
        return r;
      }));
    }

    logAction('Esteban Montoya (Recepción)', 'Walk-In Registrado', `Huésped directo ${newRes.guestName} asignado a Habitación ${newRes.roomNumber} por ${newRes.nights} noche(s).`);
  };

  // Completar Reserva desde el Motor Web Público
  const handleReservationComplete = (newReservation) => {
    const formatted = {
      code: newReservation.code || `GAR-${Math.floor(10000 + Math.random() * 90000)}`,
      guestName: newReservation.guestName,
      room: newReservation.room || 'Deluxe con Balcón al Parque',
      roomNumber: newReservation.roomNumber || '202',
      checkIn: newReservation.checkIn,
      checkOut: newReservation.checkOut,
      nights: newReservation.nights || 2,
      guests: newReservation.guests || 2,
      status: 'confirmed',
      paymentMethod: newReservation.paymentMethod || 'pse',
      totalCOP: newReservation.total || 585000,
      totalUSD: Math.round((newReservation.total || 585000) / HOTEL_INFO.exchangeRate),
      currency: newReservation.currency || 'COP',
      phone: newReservation.phone || '+57 300 000 0000',
      email: newReservation.email || 'huesped@correo.com',
      dateBooked: new Date().toISOString().split('T')[0]
    };

    setReservations(prev => [formatted, ...prev]);
    logAction('Pasarela Digital Web', 'Reserva Directa Confirmada', `Reserva ${formatted.code} completada por ${formatted.guestName} para ${formatted.checkIn}.`);
  };

  // Agregar Entrada a Auditoría
  const handleAddAuditLog = (logEntry) => {
    setAuditLogs(prev => [logEntry, ...prev]);
  };

  return (
    <div className="hotel-application-wrapper">
      {/* 1. BARRA DE NAVEGACIÓN MULTI-PÁGINA (Solo visible en portal público) */}
      {!isAdminView && (
        <Navbar 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          currency={currency}
          onToggleCurrency={toggleCurrency}
          language={language}
          onToggleLanguage={toggleLanguage}
          onOpenBooking={() => handleOpenBooking()}
          isAdminView={isAdminView}
          onToggleAdminView={setIsAdminView}
        />
      )}

      {/* 2. CONTENIDO PRINCIPAL: PMS O PORTAL HUÉSPED */}
      {isAdminView ? (
        /* VISTA ADMINISTRATIVA / PMS HOTELERO COMPLETO */
        !currentUser ? (
          <PmsLogin 
            onLogin={(user) => {
              setCurrentUser(user);
              logAction(user.name, 'Inicio de Sesión', `Acceso autenticado al PMS con rol: ${user.role}.`);
            }}
            onCancel={handleExitAdmin}
            staffUsers={staffUsers}
            rolePermissions={rolePermissions}
          />
        ) : (
          <PmsLayout 
            currentTab={currentPmsTab}
            onSelectTab={setCurrentPmsTab}
            onBackToPortal={handleExitAdmin}
            currentUser={currentUser}
            onLogout={() => {
              logAction(currentUser?.name || 'Usuario', 'Cierre de Sesión', 'Salida de la sesión del PMS.');
              setCurrentUser(null);
            }}
            onSwitchUser={(newUser) => {
              logAction(newUser.name, 'Cambio de Rol en Vivo', `Sesión transferida a ${newUser.name} (${newUser.role}).`);
              setCurrentUser(newUser);
            }}
            staffUsers={staffUsers}
            rolePermissions={rolePermissions}
          >
            {currentPmsTab === 'dashboard' && (
              <PmsDashboard 
                rooms={rooms}
                reservations={reservations}
                currency={currency}
                onSelectTab={setCurrentPmsTab}
                onOpenWalkIn={() => setCurrentPmsTab('reservations')}
              />
            )}

            {currentPmsTab === 'tapechart' && (
              <PmsTapeChart 
                rooms={rooms}
                reservations={reservations}
                onSelectReservation={() => setCurrentPmsTab('reservations')}
              />
            )}

            {currentPmsTab === 'rooms' && (
              <PmsRoomsCrud 
                rooms={rooms}
                onSaveRoom={handleSaveRoom}
                onDeleteRoom={handleDeleteRoom}
                onUpdateStatus={handleUpdateRoomStatus}
                currency={currency}
                roleCapabilities={rolePermissions[currentUser.roleKey]?.capabilities}
              />
            )}

            {currentPmsTab === 'reservations' && (
              <PmsReservations 
                reservations={reservations}
                rooms={rooms}
                onCheckIn={handleCheckIn}
                onCheckOut={handleCheckOut}
                onCreateWalkIn={handleCreateWalkIn}
                currency={currency}
              />
            )}

            {currentPmsTab === 'guests' && (
              <PmsGuestsCrm currency={currency} />
            )}

            {currentPmsTab === 'housekeeping' && (
              <PmsHousekeeping 
                rooms={rooms}
                onUpdateCleaningStatus={handleUpdateCleaningStatus}
              />
            )}

            {currentPmsTab === 'cashiering' && (
              <PmsCashiering 
                rooms={rooms}
                currency={currency}
              />
            )}

            {currentPmsTab === 'users' && (
              <PmsUsers 
                staffUsers={staffUsers}
                onUpdateStaffUsers={setStaffUsers}
                rolePermissions={rolePermissions}
                onUpdateRolePermissions={setRolePermissions}
                currentUser={currentUser}
                onLogAction={logAction}
              />
            )}

            {currentPmsTab === 'audit' && (
              <PmsAuditLog 
                logs={auditLogs}
                onAddLog={handleAddAuditLog}
              />
            )}
          </PmsLayout>
        )
      ) : (
        /* VISTA PÚBLICA DEL HUÉSPED - ARQUITECTURA MULTI-PÁGINA */
        <main className="guest-portal-content">
          {currentPage === 'home' && (
            <HomePage 
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
              currency={currency}
            />
          )}

          {currentPage === 'rooms' && (
            <RoomsPage 
              onOpenBooking={handleOpenBooking}
              onOpenRoomModal={handleOpenRoomModal}
              currency={currency}
            />
          )}

          {currentPage === 'gastronomy' && (
            <GastronomyPage 
              onOpenBooking={handleOpenBooking}
            />
          )}

          {currentPage === 'events' && (
            <EventsPage />
          )}

          {currentPage === 'experiences' && (
            <ExperiencesPage />
          )}

          {currentPage === 'gallery' && (
            <GalleryPage />
          )}

          {currentPage === 'contact' && (
            <ContactPage />
          )}

          {currentPage === 'precheckin' && (
            <PreCheckInPage />
          )}
        </main>
      )}

      {/* 3. PIE DE PÁGINA EDITORIAL (Solo visible en portal público) */}
      {!isAdminView && (
        <Footer 
          onNavigate={handleNavigate}
          onOpenBooking={() => handleOpenBooking()}
          onToggleAdminView={setIsAdminView}
        />
      )}

      {/* 4. CONSERJE DE WHATSAPP 24/7 (Solo visible en portal público) */}
      {!isAdminView && <WhatsAppConcierge />}

      {/* 5. MODAL DE DETALLE DE HABITACIÓN */}
      {roomForDetails && (
        <RoomModal 
          room={roomForDetails}
          onClose={() => setRoomForDetails(null)}
          onBookRoom={(room) => handleOpenBooking(room)}
          currency={currency}
          language={language}
        />
      )}

      {/* 6. MOTOR DE RESERVA DIRECTA & PASARELA DIGITAL */}
      <BookingModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialRoom={roomForBooking}
        currency={currency}
        onReservationComplete={handleReservationComplete}
      />
    </div>
  );
}

export default App;
