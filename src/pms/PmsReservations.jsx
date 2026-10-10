import React, { useState } from 'react';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  PlusCircle, 
  CheckCircle2, 
  LogOut, 
  XCircle, 
  Phone, 
  Mail, 
  Calendar,
  User,
  CreditCard
} from 'lucide-react';
import { HOTEL_INFO, INITIAL_ROOMS } from '../data/hotelData';

export function PmsReservations({ 
  reservations, 
  rooms, 
  onCheckIn, 
  onCheckOut, 
  onCreateWalkIn, 
  currency 
}) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);

  // Formulario Walk-in
  const [walkInData, setWalkInData] = useState({
    guestName: '',
    guestDoc: '',
    phone: '',
    email: '',
    roomNumber: '102',
    nights: 1,
    paymentMethod: 'cash',
    totalCOP: 140000
  });

  const filteredReservations = reservations.filter(res => {
    if (filterStatus !== 'all' && res.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchCode = res.code.toLowerCase().includes(q);
      const matchName = res.guestName.toLowerCase().includes(q);
      const matchPhone = res.phone && res.phone.includes(q);
      if (!matchCode && !matchName && !matchPhone) return false;
    }
    return true;
  });

  const availableRoomsList = rooms.filter(r => r.status === 'available');

  const handleRoomSelectInWalkIn = (roomNum) => {
    const selectedRoom = rooms.find(r => r.number === roomNum);
    const roomPrice = selectedRoom ? selectedRoom.priceCOP : 140000;
    setWalkInData(prev => ({
      ...prev,
      roomNumber: roomNum,
      totalCOP: roomPrice * prev.nights
    }));
  };

  const handleNightsChange = (nights) => {
    const selectedRoom = rooms.find(r => r.number === walkInData.roomNumber);
    const roomPrice = selectedRoom ? selectedRoom.priceCOP : 140000;
    setWalkInData(prev => ({
      ...prev,
      nights: Number(nights),
      totalCOP: roomPrice * Number(nights)
    }));
  };

  const handleWalkInSubmit = (e) => {
    e.preventDefault();
    const targetRoom = rooms.find(r => r.number === walkInData.roomNumber);
    onCreateWalkIn({
      code: `WALK-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: walkInData.guestName,
      room: targetRoom ? targetRoom.type : 'Estándar',
      roomNumber: walkInData.roomNumber,
      checkIn: new Date().toISOString().split('T')[0],
      checkOut: (() => {
        const d = new Date();
        d.setDate(d.getDate() + Number(walkInData.nights));
        return d.toISOString().split('T')[0];
      })(),
      nights: Number(walkInData.nights),
      status: 'in_house',
      paymentMethod: walkInData.paymentMethod,
      totalCOP: walkInData.totalCOP,
      totalUSD: Math.round(walkInData.totalCOP / HOTEL_INFO.exchangeRate),
      currency: 'COP',
      phone: walkInData.phone,
      email: walkInData.email
    });
    setIsWalkInModalOpen(false);
  };

  const formatMoney = (amountCOP) => {
    return currency === 'COP'
      ? `$${Number(amountCOP).toLocaleString('es-CO')} COP`
      : `$${Math.round(Number(amountCOP) / HOTEL_INFO.exchangeRate)} USD`;
  };

  return (
    <div className="pms-reservations-view">
      {/* Barra de Filtros y Búsqueda */}
      <div className="res-toolbar-bar">
        <div className="search-box-wrap">
          <Search size={16} className="text-muted" />
          <input 
            type="text" 
            placeholder="Buscar por código (ej. GAR-94102), nombre o celular..." 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="res-filter-tabs">
          <button 
            onClick={() => setFilterStatus('all')} 
            className={`tab-btn ${filterStatus === 'all' ? 'active' : ''}`}
          >
            Todas ({reservations.length})
          </button>
          <button 
            onClick={() => setFilterStatus('in_house')} 
            className={`tab-btn ${filterStatus === 'in_house' ? 'active' : ''}`}
          >
            En Casa ({reservations.filter(r => r.status === 'in_house').length})
          </button>
          <button 
            onClick={() => setFilterStatus('confirmed')} 
            className={`tab-btn ${filterStatus === 'confirmed' ? 'active' : ''}`}
          >
            Confirmadas ({reservations.filter(r => r.status === 'confirmed').length})
          </button>
          <button 
            onClick={() => setFilterStatus('completed')} 
            className={`tab-btn ${filterStatus === 'completed' ? 'active' : ''}`}
          >
            Finalizadas
          </button>
        </div>

        <button onClick={() => setIsWalkInModalOpen(true)} className="btn-luxury-primary">
          <PlusCircle size={15} /> Nueva Reserva Walk-In
        </button>
      </div>

      {/* Tabla de Reservas */}
      <div className="res-table-card">
        <table className="pms-data-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Huésped Titular</th>
              <th>Habitación</th>
              <th>Llegada / Salida</th>
              <th>Noches</th>
              <th>Estado</th>
              <th>Liquidación</th>
              <th>Gestión Front Desk</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map(res => (
              <tr key={res.code}>
                <td><strong className="code-badge">{res.code}</strong></td>
                <td>
                  <div className="guest-info-cell">
                    <strong>{res.guestName}</strong>
                    <span>{res.phone || res.email || 'Sin contacto'}</span>
                  </div>
                </td>
                <td>
                  <span className="room-res-tag">
                    Hab {res.roomNumber} ({res.room.split(' ')[0]})
                  </span>
                </td>
                <td>
                  <div className="dates-res-cell">
                    <span>{res.checkIn}</span>
                    <small>al {res.checkOut}</small>
                  </div>
                </td>
                <td>{res.nights} N.</td>
                <td>
                  <span className={`status-pill ${res.status}`}>
                    {res.status === 'confirmed' && 'Confirmada (Esperada)'}
                    {res.status === 'in_house' && 'En Casa (Check-in)'}
                    {res.status === 'completed' && 'Finalizada (Check-out)'}
                    {res.status === 'cancelled' && 'Cancelada'}
                  </span>
                </td>
                <td>
                  <strong>{formatMoney(res.totalCOP || res.total)}</strong>
                </td>
                <td>
                  <div className="front-desk-actions">
                    {res.status === 'confirmed' && (
                      <button 
                        onClick={() => onCheckIn(res)} 
                        className="btn-front-checkin"
                        title="Procesar Check-in del huésped"
                      >
                        <CheckCircle2 size={14} /> Check-in
                      </button>
                    )}
                    {res.status === 'in_house' && (
                      <button 
                        onClick={() => onCheckOut(res)} 
                        className="btn-front-checkout"
                        title="Procesar Salida y Check-out"
                      >
                        <LogOut size={14} /> Check-out
                      </button>
                    )}
                    {res.status === 'completed' && (
                      <span className="text-muted text-xs">Estancia Cerrada</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Walk-In Express */}
      {isWalkInModalOpen && (
        <div className="modal-overlay" onClick={() => setIsWalkInModalOpen(false)}>
          <div className="modal-content walkin-modal-box" onClick={e => e.stopPropagation()}>
            <div className="walkin-header">
              <h3>Registro Walk-In Express (Llegada sin Reserva)</h3>
              <p>Asigna llave y registra al huésped de inmediato en recepción.</p>
            </div>

            <form onSubmit={handleWalkInSubmit} className="walkin-form">
              <div className="form-group">
                <label>Nombre y Apellidos del Huésped *</label>
                <input 
                  type="text" 
                  placeholder="Ej. Rodrigo Álvarez"
                  value={walkInData.guestName}
                  onChange={e => setWalkInData({ ...walkInData, guestName: e.target.value })}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Documento de Identidad (CC/Pasaporte) *</label>
                  <input 
                    type="text" 
                    placeholder="Ej. CC 71.890.123"
                    value={walkInData.guestDoc}
                    onChange={e => setWalkInData({ ...walkInData, guestDoc: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Celular / WhatsApp *</label>
                  <input 
                    type="tel" 
                    placeholder="+57 300 000 0000"
                    value={walkInData.phone}
                    onChange={e => setWalkInData({ ...walkInData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Habitación Disponible *</label>
                  <select 
                    value={walkInData.roomNumber}
                    onChange={e => handleRoomSelectInWalkIn(e.target.value)}
                  >
                    {availableRoomsList.length > 0 ? (
                      availableRoomsList.map(r => (
                        <option key={r.number} value={r.number}>
                          Hab {r.number} - {r.type} ({formatMoney(r.priceCOP)})
                        </option>
                      ))
                    ) : (
                      <option value="">No hay habitaciones libres ahora</option>
                    )}
                  </select>
                </div>
                <div className="form-group">
                  <label>Número de Noches</label>
                  <input 
                    type="number" 
                    min="1" 
                    max="30"
                    value={walkInData.nights}
                    onChange={e => handleNightsChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Método de Pago</label>
                  <select 
                    value={walkInData.paymentMethod}
                    onChange={e => setWalkInData({ ...walkInData, paymentMethod: e.target.value })}
                  >
                    <option value="efectivo">Efectivo en Mostrador</option>
                    <option value="tarjeta">Datafono / Tarjeta</option>
                    <option value="transferencia">Transferencia Bancolombia / Nequi</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Total a Cobrar</label>
                  <input 
                    type="text" 
                    readOnly 
                    value={formatMoney(walkInData.totalCOP)}
                    className="readonly-input font-bold"
                  />
                </div>
              </div>

              <div className="modal-actions-row">
                <button type="button" onClick={() => setIsWalkInModalOpen(false)} className="btn-luxury-outline">
                  Cancelar
                </button>
                <button type="submit" className="btn-luxury-primary" disabled={availableRoomsList.length === 0}>
                  Completar Registro & Check-in
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .pms-reservations-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .res-toolbar-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          padding: 1.25rem 1.75rem;
          border: 1px solid rgba(197, 160, 89, 0.22);
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(14, 28, 23, 0.04);
          gap: 1rem;
          flex-wrap: wrap;
        }
        .search-box-wrap {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          background: #faf8f5;
          border: 1.5px solid #d9d2c5;
          padding: 0.65rem 1rem;
          border-radius: 8px;
          min-width: 320px;
          transition: all 0.2s;
        }
        .search-box-wrap:focus-within {
          background: #ffffff;
          border-color: #c5a059;
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.2);
        }
        .search-box-wrap input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 0.92rem;
          color: #0e201a;
          font-family: var(--font-sans);
        }
        .search-box-wrap input::placeholder {
          color: #78857f;
        }

        .res-filter-tabs {
          display: flex;
          gap: 0.5rem;
        }
        .tab-btn {
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.5rem 0.95rem;
          border-radius: 8px;
          border: 1.5px solid #d9d2c5;
          background: #faf8f5;
          color: #5a6b63;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .tab-btn:hover {
          color: #0e201a;
          border-color: #c5a059;
          background: #ffffff;
        }
        .tab-btn.active {
          background: #0e201a;
          color: #ffffff;
          font-weight: 700;
          border-color: #0e201a;
        }

        .res-table-card {
          background: #ffffff;
          border: 1px solid rgba(197, 160, 89, 0.22);
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(14, 28, 23, 0.04);
          overflow-x: auto;
        }
        .code-badge {
          background: #faf8f5;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          border: 1px solid #e0d8c8;
          color: #8a6d2b;
          font-weight: 700;
          font-size: 0.82rem;
        }
        .guest-info-cell strong {
          display: block;
          color: #0e201a;
          font-weight: 600;
        }
        .guest-info-cell span {
          display: block;
          font-size: 0.78rem;
          color: #5a6b63;
        }
        .room-res-tag {
          font-weight: 700;
          color: #8a6d2b;
        }
        .dates-res-cell span {
          display: block;
          font-weight: 600;
          color: #0e201a;
        }
        .dates-res-cell small {
          color: #5a6b63;
        }

        .front-desk-actions {
          display: flex;
          gap: 0.5rem;
        }
        .btn-front-checkin {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #065f46;
          color: #ffffff;
          padding: 0.45rem 0.85rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-front-checkin:hover {
          background: #047857;
        }
        .btn-front-checkout {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: #b45309;
          color: #ffffff;
          padding: 0.45rem 0.85rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-front-checkout:hover {
          background: #d97706;
        }

        /* Walk-in Modal */
        .walkin-modal-box {
          max-width: 600px;
          width: 90%;
          padding: 2.25rem 2.5rem;
          background: #ffffff;
          border: 1px solid rgba(197, 160, 89, 0.35);
          border-radius: 14px;
          color: #0e201a;
          box-shadow: 0 25px 60px rgba(14, 28, 23, 0.25);
        }
        .walkin-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f0ebe1;
        }
        .walkin-header h3 {
          font-size: 1.45rem;
          color: #0e201a;
          font-family: var(--font-serif);
          font-weight: 700;
          margin: 0 0 0.25rem 0;
        }
        .walkin-header p {
          font-size: 0.86rem;
          color: #5a6b63;
          margin: 0;
        }
        .walkin-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }
        .readonly-input {
          background: #f2eee6 !important;
          color: #0e201a !important;
          border: 1.5px solid #ded6c8 !important;
          font-weight: 800 !important;
        }

        @media (max-width: 768px) {
          .res-toolbar-bar {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
            padding: 1rem;
          }
          .res-filter-tabs {
            flex-wrap: wrap;
          }
          .tab-btn {
            padding: 0.4rem 0.75rem;
            font-size: 0.78rem;
          }
        }

        @media (max-width: 600px) {
          .walkin-modal-box {
            padding: 1.5rem 1.25rem;
          }
          .front-desk-actions {
            flex-direction: column;
          }
          .btn-front-checkin, .btn-front-checkout {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
