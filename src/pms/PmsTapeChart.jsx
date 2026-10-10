import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, User, Filter, Plus, Info } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export function PmsTapeChart({ rooms, reservations, onSelectReservation }) {
  // Rango de fechas a visualizar (10 días contiguos)
  const [startDayOffset, setStartDayOffset] = useState(0);
  const [selectedFloor, setSelectedFloor] = useState('all');

  // Generar fechas a partir del 8 de Octubre de 2026
  const baseDate = new Date(2026, 9, 8); // 8 de Octubre 2026
  const daysCount = 10;
  
  const displayDates = [];
  for (let i = 0; i < daysCount; i++) {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + startDayOffset + i);
    displayDates.push(d);
  }

  const filteredRooms = rooms.filter(r => {
    if (selectedFloor !== 'all' && r.floor !== Number(selectedFloor)) return false;
    return true;
  });

  // Función para determinar si una habitación tiene reserva en una fecha
  const getReservationForRoomAndDate = (roomNumber, dateObj) => {
    const dateStr = dateObj.toISOString().split('T')[0];
    
    return reservations.find(res => {
      if (res.roomNumber !== roomNumber) return false;
      const start = res.checkIn;
      const end = res.checkOut;
      return dateStr >= start && dateStr < end;
    });
  };

  return (
    <div className="pms-tape-chart-view">
      {/* Controles de Navegación del Calendario */}
      <div className="tape-controls-bar">
        <div className="tape-nav-group">
          <button 
            onClick={() => setStartDayOffset(prev => prev - 5)}
            className="tape-nav-btn"
            title="Días Anteriores"
          >
            <ChevronLeft size={16} /> Anterior
          </button>
          <span className="tape-current-period">
            {displayDates[0].toLocaleDateString('es-CO', { day: 'numeric', month: 'short' })} — {displayDates[displayDates.length - 1].toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
          <button 
            onClick={() => setStartDayOffset(prev => prev + 5)}
            className="tape-nav-btn"
            title="Días Siguientes"
          >
            Siguiente <ChevronRight size={16} />
          </button>
          <button 
            onClick={() => setStartDayOffset(0)}
            className="tape-today-btn"
          >
            Hoy
          </button>
        </div>

        {/* Filtro por Piso */}
        <div className="tape-filter-group">
          <Filter size={15} className="text-muted" />
          <label>Piso:</label>
          <select value={selectedFloor} onChange={e => setSelectedFloor(e.target.value)}>
            <option value="all">Todos los Pisos</option>
            <option value="1">Piso 1</option>
            <option value="2">Piso 2 (Balcones)</option>
            <option value="3">Piso 3 (Suites)</option>
          </select>
        </div>
      </div>

      {/* Matriz Gantt / Tape Chart */}
      <div className="tape-chart-wrapper">
        <table className="tape-chart-table">
          <thead>
            <tr>
              <th className="tape-room-cell header-cell">Habitación</th>
              {displayDates.map((date, idx) => {
                const isToday = date.toISOString().split('T')[0] === '2026-10-09';
                return (
                  <th key={idx} className={`tape-date-th ${isToday ? 'today-highlight' : ''}`}>
                    <span className="day-name">{date.toLocaleDateString('es-CO', { weekday: 'narrow' })}</span>
                    <span className="day-number">{date.getDate()}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map(room => (
              <tr key={room.number}>
                {/* Columna Fija de Habitación */}
                <td className="tape-room-cell">
                  <div className="room-cell-content">
                    <span className="room-num-text">Hab {room.number}</span>
                    <span className="room-sub-type">{room.type}</span>
                  </div>
                </td>

                {/* Celdas por Día */}
                {displayDates.map((date, dIdx) => {
                  const res = getReservationForRoomAndDate(room.number, date);
                  const isStart = res && date.toISOString().split('T')[0] === res.checkIn;
                  const isToday = date.toISOString().split('T')[0] === '2026-10-09';

                  return (
                    <td 
                      key={dIdx} 
                      className={`tape-day-cell ${isToday ? 'today-col' : ''}`}
                    >
                      {res && (
                        <div 
                          onClick={() => onSelectReservation && onSelectReservation(res)}
                          className={`tape-booking-bar ${res.vipStatus ? 'vip' : ''}`}
                          title={`Reserva ${res.code}: ${res.guestName} (${res.checkIn} al ${res.checkOut})`}
                        >
                          {isStart ? (
                            <span className="booking-bar-guest">
                              {res.guestName.split(' ')[0]} ({res.code})
                            </span>
                          ) : (
                            <span className="booking-bar-cont"></span>
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leyenda del Calendario */}
      <div className="tape-legend-bar mt-3">
        <div className="legend-pills-row">
          <span className="legend-pill">
            <span className="box-sample booked"></span> Reserva Activa / Ocupada
          </span>
          <span className="legend-pill">
            <span className="box-sample today-col"></span> Día de Hoy
          </span>
          <span className="legend-pill">
            <span className="box-sample white"></span> Disponible para Reserva
          </span>
        </div>

        <div className="legend-hint">
          <Info size={14} className="text-gold" />
          <span>Haz clic sobre cualquier bloque para ver la ficha completa de la reserva.</span>
        </div>
      </div>

      <style>{`
        .pms-tape-chart-view {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .tape-controls-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
          padding: 1.25rem 1.75rem;
          border: 1px solid rgba(197, 160, 89, 0.22);
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(14, 28, 23, 0.04);
          gap: 1rem;
          flex-wrap: wrap;
        }
        .tape-nav-group {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .tape-nav-btn {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem 0.95rem;
          border: 1.5px solid #d9d2c5;
          background: #faf8f5;
          font-size: 0.82rem;
          font-weight: 600;
          color: #0e201a;
          border-radius: 8px;
          transition: all 0.2s;
          cursor: pointer;
        }
        .tape-nav-btn:hover {
          background: #ffffff;
          border-color: #c5a059;
          color: #8a6d2b;
        }
        .tape-current-period {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          color: #0e201a;
          font-weight: 700;
        }
        .tape-today-btn {
          padding: 0.5rem 1rem;
          background: #0e201a;
          color: #ffffff;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          border: 1px solid #c5a059;
          cursor: pointer;
          transition: all 0.2s;
        }
        .tape-today-btn:hover {
          background: #18372d;
        }

        .tape-filter-group {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.84rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #0e201a;
        }
        .tape-filter-group select {
          padding: 0.6rem 2.25rem 0.6rem 0.95rem;
          border: 1.5px solid #d9d2c5;
          border-radius: 8px;
          outline: none;
          background-color: #faf8f5;
          color: #0e201a;
          font-family: var(--font-sans);
          font-size: 0.88rem;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%230e201a' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 14px;
          cursor: pointer;
        }
        .tape-filter-group select:focus {
          border-color: #c5a059;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.2);
        }

        /* Table */
        .tape-chart-wrapper {
          border-radius: 12px;
          border: 1px solid rgba(197, 160, 89, 0.22);
          background: #ffffff;
          box-shadow: 0 10px 25px rgba(14, 28, 23, 0.04);
        }
        .header-cell {
          background: #faf8f5 !important;
          color: #5a6b63 !important;
        }
        .room-cell-content {
          display: flex;
          flex-direction: column;
        }
        .room-num-text {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0e201a;
        }
        .room-sub-type {
          font-size: 0.74rem;
          color: #5a6b63;
          font-weight: 500;
        }

        .tape-date-th {
          min-width: 65px;
          padding: 0.65rem 0.25rem !important;
        }
        .tape-date-th.today-highlight {
          background: #fdfbf7 !important;
          color: #8a6d2b !important;
          border-bottom: 2px solid #c5a059 !important;
        }
        .day-name {
          display: block;
          font-size: 0.7rem;
          color: #78857f;
          text-transform: uppercase;
        }
        .day-number {
          display: block;
          font-size: 1.15rem;
          font-weight: 800;
          font-family: var(--font-serif);
          color: #0e201a;
        }

        .today-col {
          background-color: rgba(197, 160, 89, 0.06) !important;
        }

        .booking-bar-guest {
          font-size: 0.75rem;
          font-weight: 700;
        }
        .booking-bar-cont {
          display: block;
          width: 100%;
          height: 100%;
        }

        /* Legend */
        .tape-legend-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
          padding: 1rem 1.75rem;
          border: 1px solid rgba(197, 160, 89, 0.22);
          border-radius: 12px;
          font-size: 0.84rem;
          color: #5a6b63;
          box-shadow: 0 10px 25px rgba(14, 28, 23, 0.04);
        }
        .legend-pills-row {
          display: flex;
          gap: 1.5rem;
        }
        .legend-pill {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: #0e201a;
          font-weight: 500;
        }
        .box-sample {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          display: inline-block;
        }
        .box-sample.booked { background: #1d4ed8; }
        .box-sample.today-col { background: rgba(197, 160, 89, 0.4); border: 1px solid #c5a059; }
        .box-sample.white { background: #ffffff; border: 1px solid #d9d2c5; }
        .legend-hint {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: #5a6b63;
        }

        @media (max-width: 768px) {
          .tape-controls-bar {
            flex-direction: column;
            gap: 0.75rem;
            align-items: stretch;
            padding: 0.75rem 1rem;
          }
          .tape-nav-group {
            justify-content: space-between;
            width: 100%;
          }
          .tape-filter-group {
            width: 100%;
            justify-content: flex-end;
          }
          .tape-legend-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 0.75rem 1rem;
          }
          .legend-pills-row {
            flex-wrap: wrap;
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
