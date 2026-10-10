import React, { useState } from 'react';
import { 
  Building, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Wrench, 
  Users, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Search, 
  Filter, 
  ArrowLeft,
  Calendar,
  Sparkles,
  Bed
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export function AdminDashboard({ 
  rooms, 
  onUpdateRoomStatus, 
  reservations, 
  currency,
  onBackToPortal 
}) {
  const [floorFilter, setFloorFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRoomModal, setSelectedRoomModal] = useState(null);

  // Filtros de Habitaciones
  const filteredRooms = rooms.filter(r => {
    if (floorFilter !== 'all' && r.floor !== Number(floorFilter)) return false;
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchNum = r.number.toLowerCase().includes(term);
      const matchGuest = r.guest && r.guest.toLowerCase().includes(term);
      const matchType = r.type.toLowerCase().includes(term);
      if (!matchNum && !matchGuest && !matchType) return false;
    }
    return true;
  });

  // Estadísticas del Rack
  const totalRooms = rooms.length;
  const occupiedCount = rooms.filter(r => r.status === 'occupied').length;
  const availableCount = rooms.filter(r => r.status === 'available').length;
  const cleaningCount = rooms.filter(r => r.status === 'cleaning').length;
  const maintenanceCount = rooms.filter(r => r.status === 'maintenance').length;
  const occupancyRate = Math.round((occupiedCount / totalRooms) * 100);

  // Estimado de Ahorro en Comisiones OTAs (promedio 18% por reserva directa)
  const totalDirectRevenueCOP = reservations.reduce((acc, r) => acc + (r.currency === 'COP' ? r.total : r.total * HOTEL_INFO.exchangeRate), 0);
  const otaCommissionSavedCOP = Math.round(totalDirectRevenueCOP * 0.18);
  const otaCommissionSavedUSD = Math.round(otaCommissionSavedCOP / HOTEL_INFO.exchangeRate);

  const formatMoney = (amountCOP) => {
    return currency === 'COP'
      ? `$${amountCOP.toLocaleString('es-CO')} COP`
      : `$${Math.round(amountCOP / HOTEL_INFO.exchangeRate)} USD`;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <span className="status-badge available"><CheckCircle size={12} /> Disponible</span>;
      case 'occupied':
        return <span className="status-badge occupied"><Users size={12} /> Ocupada</span>;
      case 'cleaning':
        return <span className="status-badge cleaning"><Sparkles size={12} /> Limpieza</span>;
      case 'maintenance':
        return <span className="status-badge maintenance"><Wrench size={12} /> Mantenimiento</span>;
      default:
        return null;
    }
  };

  return (
    <div className="admin-pms-container">
      {/* Barra Superior del PMS */}
      <div className="pms-topbar">
        <div className="container pms-topbar-content">
          <div className="pms-branding">
            <button onClick={onBackToPortal} className="btn-back-portal">
              <ArrowLeft size={16} /> Ver Web de Huéspedes
            </button>
            <div className="pms-title-block">
              <h2>Recepción & PMS Operativo</h2>
              <span>Hotel Plaza Garibaldi • Parque Principal Caldas</span>
            </div>
          </div>

          <div className="pms-user-badge">
            <div className="user-dot"></div>
            <span>Recepción Activa (Turno 24 Horas)</span>
          </div>
        </div>
      </div>

      <div className="container pms-main-content">
        {/* KPI Cards */}
        <div className="pms-kpi-grid">
          <div className="kpi-card glass-card">
            <div className="kpi-icon-wrap emerald">
              <TrendingUp size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-label">Ocupación Actual</span>
              <span className="kpi-val">{occupancyRate}%</span>
              <span className="kpi-sub">{occupiedCount} de {totalRooms} habitaciones</span>
            </div>
          </div>

          <div className="kpi-card glass-card">
            <div className="kpi-icon-wrap gold">
              <CheckCircle size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-label">Disponibles Ahora</span>
              <span className="kpi-val">{availableCount} Hab.</span>
              <span className="kpi-sub">{cleaningCount} en proceso de aseo</span>
            </div>
          </div>

          <div className="kpi-card glass-card">
            <div className="kpi-icon-wrap blue">
              <DollarSign size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-label">Ingresos Reservas Web</span>
              <span className="kpi-val">{formatMoney(totalDirectRevenueCOP)}</span>
              <span className="kpi-sub">{reservations.length} reservas registradas</span>
            </div>
          </div>

          <div className="kpi-card glass-card">
            <div className="kpi-icon-wrap purple">
              <ShieldCheck size={22} />
            </div>
            <div className="kpi-info">
              <span className="kpi-label">Ahorro Comisiones OTAs</span>
              <span className="kpi-val text-gold">+{formatMoney(otaCommissionSavedCOP)}</span>
              <span className="kpi-sub">18% evitado vs Booking/Expedia</span>
            </div>
          </div>
        </div>

        {/* Barra de Filtros del Rack */}
        <div className="rack-filters-bar glass-card">
          <div className="search-input-wrap">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por número (ej: 201), huésped o tipo..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pms-search-input"
            />
          </div>

          <div className="rack-select-group">
            <div className="select-wrap">
              <label>Piso:</label>
              <select value={floorFilter} onChange={(e) => setFloorFilter(e.target.value)}>
                <option value="all">Todos los pisos</option>
                <option value="1">Piso 1</option>
                <option value="2">Piso 2 (Balcones)</option>
                <option value="3">Piso 3 (Suites)</option>
              </select>
            </div>

            <div className="select-wrap">
              <label>Estado:</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">Todos los estados</option>
                <option value="available">Disponibles ({availableCount})</option>
                <option value="occupied">Ocupadas ({occupiedCount})</option>
                <option value="cleaning">En Limpieza ({cleaningCount})</option>
                <option value="maintenance">Mantenimiento ({maintenanceCount})</option>
              </select>
            </div>
          </div>
        </div>

        {/* RACK DE HABITACIONES VISUAL */}
        <div className="rack-section">
          <div className="rack-section-header">
            <h3>Rack de Habitaciones en Vivo</h3>
            <span className="rack-help-hint">Haz clic en cualquier habitación para cambiar su estado o hacer Check-in/Check-out</span>
          </div>

          <div className="rack-rooms-grid">
            {filteredRooms.map((room) => (
              <div 
                key={room.number}
                onClick={() => setSelectedRoomModal(room)}
                className={`rack-room-card ${room.status}`}
              >
                <div className="room-card-top">
                  <span className="room-number-badge">Hab {room.number}</span>
                  <span className="room-floor-tag">Piso {room.floor}</span>
                </div>

                <div className="room-card-center">
                  <span className="room-type-title">{room.type}</span>
                  {room.status === 'occupied' && (
                    <div className="guest-occupied-badge">
                      <Users size={13} />
                      <span>{room.guest}</span>
                    </div>
                  )}
                  {room.status === 'cleaning' && (
                    <div className="cleaning-badge">
                      <Sparkles size={13} />
                      <span>Camarera asignada</span>
                    </div>
                  )}
                  {room.status === 'available' && (
                    <div className="available-price-badge">
                      <span>Lista para venta</span>
                    </div>
                  )}
                </div>

                <div className="room-card-bottom">
                  {getStatusBadge(room.status)}
                  <span className="room-price-sub">{formatMoney(room.price)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* TABLA DE RESERVAS RECIENTES DE LA WEB */}
        <div className="recent-reservations-section mt-5">
          <div className="reservations-header">
            <h3>Reservas Directas Entrantes (Vía Plataforma Web)</h3>
            <span className="badge-emerald">Confirmación Inmediata</span>
          </div>

          <div className="reservations-table-card hotel-card">
            {reservations.length === 0 ? (
              <div className="empty-reservations">
                <Calendar size={36} className="text-muted" />
                <p>No hay reservas recientes registradas aún. Haz una prueba desde el portal público.</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="pms-table">
                  <thead>
                    <tr>
                      <th>Código</th>
                      <th>Huésped</th>
                      <th>Habitación</th>
                      <th>Fechas</th>
                      <th>Noches</th>
                      <th>Pasarela</th>
                      <th>Total</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res, index) => (
                      <tr key={index}>
                        <td><strong className="code-tag">{res.code}</strong></td>
                        <td>
                          <div className="table-guest-cell">
                            <strong>{res.guestName}</strong>
                            <span>{res.phone || res.email}</span>
                          </div>
                        </td>
                        <td>{res.room}</td>
                        <td>{res.checkIn} al {res.checkOut}</td>
                        <td>{res.nights}</td>
                        <td><span className="badge-gold">{res.paymentMethod.toUpperCase()}</span></td>
                        <td><strong>{formatMoney(res.total)}</strong></td>
                        <td>
                          <button 
                            onClick={() => alert(`Check-in procesado con éxito para la reserva ${res.code}`)}
                            className="btn-action-checkin"
                          >
                            Check-in
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para Cambiar Estado de Habitación */}
      {selectedRoomModal && (
        <div className="modal-overlay" onClick={() => setSelectedRoomModal(null)}>
          <div className="modal-content room-status-modal" onClick={(e) => e.stopPropagation()}>
            <div className="status-modal-header">
              <h3>Administrar Habitación {selectedRoomModal.number}</h3>
              <p>{selectedRoomModal.type} • Piso {selectedRoomModal.floor}</p>
            </div>

            <div className="status-modal-body">
              <label className="input-label">Cambiar Estado Operativo:</label>
              <div className="status-options-grid">
                <button 
                  onClick={() => {
                    onUpdateRoomStatus(selectedRoomModal.number, 'available', null);
                    setSelectedRoomModal(null);
                  }}
                  className={`status-btn-opt available ${selectedRoomModal.status === 'available' ? 'active' : ''}`}
                >
                  <CheckCircle size={18} />
                  <span>Disponible para Venta</span>
                </button>

                <button 
                  onClick={() => {
                    const guestName = prompt("Nombre del huésped:", selectedRoomModal.guest || "Nuevo Huésped");
                    if (guestName) {
                      onUpdateRoomStatus(selectedRoomModal.number, 'occupied', guestName);
                    }
                    setSelectedRoomModal(null);
                  }}
                  className={`status-btn-opt occupied ${selectedRoomModal.status === 'occupied' ? 'active' : ''}`}
                >
                  <Users size={18} />
                  <span>Ocupada (Asignar Huésped)</span>
                </button>

                <button 
                  onClick={() => {
                    onUpdateRoomStatus(selectedRoomModal.number, 'cleaning', null);
                    setSelectedRoomModal(null);
                  }}
                  className={`status-btn-opt cleaning ${selectedRoomModal.status === 'cleaning' ? 'active' : ''}`}
                >
                  <Sparkles size={18} />
                  <span>En Limpieza / Camarera</span>
                </button>

                <button 
                  onClick={() => {
                    onUpdateRoomStatus(selectedRoomModal.number, 'maintenance', null);
                    setSelectedRoomModal(null);
                  }}
                  className={`status-btn-opt maintenance ${selectedRoomModal.status === 'maintenance' ? 'active' : ''}`}
                >
                  <Wrench size={18} />
                  <span>Mantenimiento / Bloqueada</span>
                </button>
              </div>
            </div>

            <div className="status-modal-footer">
              <button onClick={() => setSelectedRoomModal(null)} className="btn-secondary w-full">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-pms-container {
          min-height: 100vh;
          background: #f0ede8;
          padding-bottom: 5rem;
        }
        .pms-topbar {
          background: var(--emerald-950);
          color: #ffffff;
          padding: 1.25rem 0;
          border-bottom: 2px solid var(--gold-500);
        }
        .pms-topbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pms-branding {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .btn-back-portal {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          transition: background var(--transition-fast);
        }
        .btn-back-portal:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .pms-title-block h2 {
          font-size: 1.4rem;
          color: #ffffff;
        }
        .pms-title-block span {
          font-size: 0.8rem;
          color: var(--gold-400);
        }
        .pms-user-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(0, 0, 0, 0.3);
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
        }
        .user-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #25D366;
          box-shadow: 0 0 8px #25D366;
        }

        .pms-main-content {
          padding-top: 2rem;
        }
        .pms-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .kpi-card {
          padding: 1.5rem;
          background: #ffffff;
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .kpi-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .kpi-icon-wrap.emerald { background: var(--emerald-100); color: var(--emerald-900); }
        .kpi-icon-wrap.gold { background: var(--gold-100); color: var(--gold-700); }
        .kpi-icon-wrap.blue { background: #e0f2fe; color: #0369a1; }
        .kpi-icon-wrap.purple { background: #f3e8ff; color: #7e22ce; }

        .kpi-info {
          display: flex;
          flex-direction: column;
        }
        .kpi-label {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .kpi-val {
          font-size: 1.85rem;
          font-weight: 800;
          color: var(--emerald-950);
          line-height: 1.1;
        }
        .kpi-sub {
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        /* Rack Filters */
        .rack-filters-bar {
          padding: 1rem 1.5rem;
          background: #ffffff;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .search-input-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #f8faf9;
          border: 1px solid var(--border-light);
          padding: 0.5rem 0.85rem;
          border-radius: var(--radius-sm);
          flex: 1;
          max-width: 450px;
        }
        .search-icon {
          color: var(--text-muted);
        }
        .pms-search-input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 0.9rem;
        }
        .rack-select-group {
          display: flex;
          gap: 1rem;
        }
        .select-wrap {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .select-wrap select {
          padding: 0.45rem 0.75rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-light);
          background: #f8faf9;
          font-size: 0.85rem;
          outline: none;
        }

        /* Rack Cards Grid */
        .rack-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .rack-section-header h3 {
          font-size: 1.4rem;
          color: var(--emerald-950);
        }
        .rack-help-hint {
          font-size: 0.82rem;
          color: var(--text-muted);
        }

        .rack-rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
          gap: 1rem;
        }
        .rack-room-card {
          background: #ffffff;
          border-radius: var(--radius-md);
          padding: 1rem;
          box-shadow: var(--shadow-sm);
          border-left: 5px solid #ccc;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          transition: all var(--transition-fast);
        }
        .rack-room-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }
        .rack-room-card.available {
          border-left-color: #10b981;
        }
        .rack-room-card.occupied {
          border-left-color: #3b82f6;
          background: #f8fafc;
        }
        .rack-room-card.cleaning {
          border-left-color: #f59e0b;
          background: #fffbeb;
        }
        .rack-room-card.maintenance {
          border-left-color: #6b7280;
          background: #f3f4f6;
        }

        .room-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .room-number-badge {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--emerald-950);
        }
        .room-floor-tag {
          font-size: 0.75rem;
          color: var(--text-muted);
          background: rgba(0,0,0,0.05);
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
        }
        .room-type-title {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .guest-occupied-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: #1d4ed8;
          margin-top: 0.35rem;
        }
        .cleaning-badge {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: #b45309;
          margin-top: 0.35rem;
        }
        .available-price-badge {
          font-size: 0.78rem;
          color: #047857;
          font-weight: 600;
          margin-top: 0.35rem;
        }

        .room-card-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(0,0,0,0.05);
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-full);
        }
        .status-badge.available { background: #d1fae5; color: #065f46; }
        .status-badge.occupied { background: #dbeafe; color: #1e40af; }
        .status-badge.cleaning { background: #fef3c7; color: #92400e; }
        .status-badge.maintenance { background: #e5e7eb; color: #374151; }
        .room-price-sub {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
        }

        /* Reservations Table */
        .reservations-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }
        .reservations-table-card {
          background: #ffffff;
          overflow: hidden;
        }
        .empty-reservations {
          padding: 3rem;
          text-align: center;
          color: var(--text-muted);
        }
        .table-responsive {
          overflow-x: auto;
        }
        .pms-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.88rem;
        }
        .pms-table th {
          background: #f8faf9;
          padding: 0.9rem 1.2rem;
          font-size: 0.78rem;
          text-transform: uppercase;
          color: var(--emerald-900);
          border-bottom: 1px solid var(--border-light);
        }
        .pms-table td {
          padding: 1rem 1.2rem;
          border-bottom: 1px solid var(--border-light);
          color: var(--text-secondary);
        }
        .code-tag {
          color: var(--emerald-950);
          background: var(--emerald-50);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }
        .table-guest-cell strong {
          display: block;
          color: var(--emerald-950);
        }
        .table-guest-cell span {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .btn-action-checkin {
          background: var(--emerald-900);
          color: #ffffff;
          padding: 0.35rem 0.8rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 600;
        }

        /* Modal Status */
        .room-status-modal {
          max-width: 460px;
          padding: 1.75rem;
        }
        .status-modal-header {
          margin-bottom: 1.25rem;
        }
        .status-modal-header h3 {
          font-size: 1.4rem;
          color: var(--emerald-950);
        }
        .status-options-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin: 1rem 0 1.5rem;
        }
        .status-btn-opt {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem;
          border-radius: var(--radius-md);
          font-size: 0.92rem;
          font-weight: 700;
          text-align: left;
          border: 1px solid var(--border-light);
          background: #ffffff;
          transition: all var(--transition-fast);
        }
        .status-btn-opt.available { color: #065f46; }
        .status-btn-opt.occupied { color: #1e40af; }
        .status-btn-opt.cleaning { color: #92400e; }
        .status-btn-opt.maintenance { color: #374151; }
        .status-btn-opt:hover, .status-btn-opt.active {
          background: #f8faf9;
          border-color: var(--gold-500);
        }
      `}</style>
    </div>
  );
}
