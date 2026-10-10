import React, { useState } from 'react';
import { Sparkles, CheckSquare, UserCheck, AlertTriangle, RefreshCw, Check, Clock, UserX } from 'lucide-react';
import { INITIAL_HOUSEKEEPING_STAFF, INITIAL_ROOMS } from '../data/hotelData';

export function PmsHousekeeping({ rooms, onUpdateCleaningStatus }) {
  const [staffList, setStaffList] = useState(INITIAL_HOUSEKEEPING_STAFF);
  const [roomFilter, setRoomFilter] = useState('all');
  const [maintenanceNotes, setMaintenanceNotes] = useState([
    { room: "204", note: "Pintura y ajuste de sellos de ventana", date: "2026-10-09" },
    { room: "103", note: "Filtro de aire acondicionado revisado", date: "2026-10-08" }
  ]);
  const [newNote, setNewNote] = useState({ room: '101', text: '' });

  // Alternar asistencia ("Pasar Lista")
  const handleToggleAttendance = (staffId, newStatus) => {
    setStaffList(prev => prev.map(s => {
      if (s.id === staffId) {
        return { ...s, attendance: newStatus };
      }
      return s;
    }));
  };

  const handleAddMaintenance = (e) => {
    e.preventDefault();
    if (!newNote.text) return;
    setMaintenanceNotes([
      { room: newNote.room, note: newNote.text, date: new Date().toISOString().split('T')[0] },
      ...maintenanceNotes
    ]);
    setNewNote({ room: '101', text: '' });
  };

  const filteredRooms = rooms.filter(r => {
    if (roomFilter === 'all') return true;
    return r.cleaningStatus === roomFilter;
  });

  return (
    <div className="pms-housekeeping-view">
      {/* 1. MÓDULO "PASAR LISTA" (ASISTENCIA DE CAMARERAS) */}
      <div className="housekeeping-card">
        <div className="card-top-title">
          <div className="title-left">
            <UserCheck size={20} className="text-gold" />
            <div>
              <h3>Control de Asistencia del Personal ("Pasar Lista")</h3>
              <p>Turno Diario • Equipo de Camareras y Gobernanta del Hotel Plaza Garibaldi</p>
            </div>
          </div>
          <span className="badge-pms">Fecha: 09 Oct 2026</span>
        </div>

        <div className="staff-attendance-grid">
          {staffList.map(member => (
            <div key={member.id} className="attendance-member-box">
              <div className="member-info">
                <strong>{member.name}</strong>
                <span>{member.role} • Pisos asignados: {member.assignedFloors.join(', ')}</span>
                <small>Habitaciones listas hoy: {member.roomsCompletedToday}</small>
              </div>

              {/* Botones para pasar lista */}
              <div className="attendance-status-selector">
                <button 
                  onClick={() => handleToggleAttendance(member.id, 'present')}
                  className={`btn-att present ${member.attendance === 'present' ? 'active' : ''}`}
                >
                  <Check size={13} /> Presente
                </button>
                <button 
                  onClick={() => handleToggleAttendance(member.id, 'rest')}
                  className={`btn-att rest ${member.attendance === 'rest' ? 'active' : ''}`}
                >
                  <Clock size={13} /> Descanso
                </button>
                <button 
                  onClick={() => handleToggleAttendance(member.id, 'absent')}
                  className={`btn-att absent ${member.attendance === 'absent' ? 'active' : ''}`}
                >
                  <UserX size={13} /> Permiso / Falta
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. RACK DE LIMPIEZA DE HABITACIONES */}
      <div className="housekeeping-card mt-4">
        <div className="card-top-title">
          <div className="title-left">
            <Sparkles size={20} className="text-emerald" />
            <div>
              <h3>Estado de Aseo e Inspección de Habitaciones</h3>
              <p>Actualiza en tiempo real el progreso de desinfección y cambio de lencería blanca.</p>
            </div>
          </div>

          <div className="cleaning-filter-pills">
            <button onClick={() => setRoomFilter('all')} className={`clean-filter-btn ${roomFilter === 'all' ? 'active' : ''}`}>
              Todas ({rooms.length})
            </button>
            <button onClick={() => setRoomFilter('dirty')} className={`clean-filter-btn ${roomFilter === 'dirty' ? 'active' : ''}`}>
              Sucias / Salida
            </button>
            <button onClick={() => setRoomFilter('in_progress')} className={`clean-filter-btn ${roomFilter === 'in_progress' ? 'active' : ''}`}>
              En Proceso
            </button>
            <button onClick={() => setRoomFilter('inspected')} className={`clean-filter-btn ${roomFilter === 'inspected' ? 'active' : ''}`}>
              Inspeccionadas
            </button>
          </div>
        </div>

        <div className="cleaning-rooms-grid">
          {filteredRooms.map(room => (
            <div key={room.number} className={`cleaning-room-box ${room.cleaningStatus}`}>
              <div className="cleaning-box-head">
                <span className="room-num">Hab {room.number}</span>
                <span className="room-fl">Piso {room.floor}</span>
              </div>

              <div className="cleaning-box-status">
                <strong>
                  {room.cleaningStatus === 'inspected' && '✓ Inspeccionada'}
                  {room.cleaningStatus === 'clean' && 'Limpia'}
                  {room.cleaningStatus === 'in_progress' && 'En Proceso'}
                  {room.cleaningStatus === 'dirty' && 'Sucia / Salida'}
                </strong>
                <span>{room.type}</span>
              </div>

              {/* Botones de Cambio Rápido por Mucama */}
              <div className="cleaning-action-buttons">
                <button 
                  onClick={() => onUpdateCleaningStatus(room.number, 'in_progress')}
                  className="btn-status-act yellow"
                  title="Marcar en aseo"
                >
                  En Proceso
                </button>
                <button 
                  onClick={() => onUpdateCleaningStatus(room.number, 'clean')}
                  className="btn-status-act green"
                  title="Marcar limpia"
                >
                  Limpia
                </button>
                <button 
                  onClick={() => onUpdateCleaningStatus(room.number, 'inspected')}
                  className="btn-status-act gold"
                  title="Aprobar para venta"
                >
                  Inspeccionar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. NOVEDADES Y MANTENIMIENTO */}
      <div className="housekeeping-card mt-4">
        <div className="card-top-title">
          <div className="title-left">
            <AlertTriangle size={20} className="text-gold" />
            <div>
              <h3>Libro de Novedades & Mantenimiento Preventivo</h3>
              <p>Reportes de daños, ajustes de grifería y requerimientos técnicos reportados por camareras.</p>
            </div>
          </div>
        </div>

        <div className="maintenance-split-grid">
          {/* Formulario de reporte */}
          <form onSubmit={handleAddMaintenance} className="maintenance-form">
            <div className="form-group">
              <label>Habitación con Novedad</label>
              <select value={newNote.room} onChange={e => setNewNote({ ...newNote, room: e.target.value })}>
                {rooms.map(r => (
                  <option key={r.number} value={r.number}>Habitación {r.number} - Piso {r.floor}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Descripción de la Novedad</label>
              <input 
                type="text" 
                placeholder="Ej. Bombillo de cabecera titila, control de TV sin baterías..."
                value={newNote.text}
                onChange={e => setNewNote({ ...newNote, text: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn-luxury-primary">
              Registrar Novedad
            </button>
          </form>

          {/* Listado de novedades */}
          <div className="maintenance-notes-list">
            {maintenanceNotes.map((note, idx) => (
              <div key={idx} className="note-card-item">
                <span className="note-room-tag">Hab {note.room}</span>
                <p className="note-text">{note.note}</p>
                <span className="note-date-tag">{note.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .pms-housekeeping-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .pms-housekeeping-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .housekeeping-card {
          background: #ffffff;
          padding: 1.75rem 2rem;
          border: 1px solid rgba(197, 160, 89, 0.22);
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(14, 28, 23, 0.04);
        }
        .card-top-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f0ebe1;
        }
        .title-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .title-left h3 {
          font-size: 1.35rem;
          color: #0e201a;
          font-family: var(--font-serif);
          font-weight: 700;
          margin: 0 0 0.2rem 0;
        }
        .title-left p {
          font-size: 0.84rem;
          color: #5a6b63;
          margin: 0;
        }

        /* Attendance */
        .staff-attendance-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1.25rem;
        }
        .attendance-member-box {
          background: #faf8f5;
          padding: 1.25rem;
          border: 1.5px solid #ece6db;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: all 0.2s ease;
        }
        .attendance-member-box:hover {
          border-color: #c5a059;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(14, 28, 23, 0.05);
        }
        .member-info strong {
          display: block;
          font-size: 1.05rem;
          color: #0e201a;
          font-weight: 700;
        }
        .member-info span {
          display: block;
          font-size: 0.82rem;
          color: #5a6b63;
        }
        .member-info small {
          display: block;
          font-size: 0.76rem;
          color: #8a6d2b;
          font-weight: 600;
          margin-top: 0.2rem;
        }

        .attendance-status-selector {
          display: flex;
          gap: 0.5rem;
        }
        .btn-att {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.3rem;
          padding: 0.45rem 0.2rem;
          border: 1.5px solid #d9d2c5;
          background: #ffffff;
          font-size: 0.74rem;
          font-weight: 700;
          color: #5a6b63;
          border-radius: 6px;
          transition: all 0.2s;
          cursor: pointer;
        }
        .btn-att.present.active { background: #ecfdf5; border-color: #10b981; color: #065f46; font-weight: 800; }
        .btn-att.rest.active { background: #fffbeb; border-color: #f59e0b; color: #92400e; font-weight: 800; }
        .btn-att.absent.active { background: #fef2f2; border-color: #ef4444; color: #991b1b; font-weight: 800; }

        /* Cleaning Rooms Grid */
        .cleaning-filter-pills {
          display: flex;
          gap: 0.5rem;
        }
        .clean-filter-btn {
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.45rem 0.85rem;
          border-radius: 8px;
          border: 1.5px solid #d9d2c5;
          background: #faf8f5;
          color: #5a6b63;
          cursor: pointer;
          transition: all 0.2s;
        }
        .clean-filter-btn:hover {
          color: #0e201a;
          border-color: #c5a059;
          background: #ffffff;
        }
        .clean-filter-btn.active {
          background: #0e201a;
          color: #ffffff;
          font-weight: 700;
          border-color: #0e201a;
        }

        .cleaning-rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.15rem;
        }
        .cleaning-room-box {
          background: #faf8f5;
          border: 1.5px solid #ece6db;
          padding: 1.15rem;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          transition: all 0.2s ease;
        }
        .cleaning-room-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(14, 28, 23, 0.05);
        }
        .cleaning-room-box.inspected { border-top: 4px solid #10b981; }
        .cleaning-room-box.clean { border-top: 4px solid #34d399; }
        .cleaning-room-box.in_progress { border-top: 4px solid #f59e0b; }
        .cleaning-room-box.dirty { border-top: 4px solid #ef4444; }

        .cleaning-box-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .room-num { font-size: 1.25rem; font-weight: 800; color: #0e201a; }
        .room-fl { font-size: 0.74rem; color: #78857f; font-weight: 600; }

        .cleaning-box-status strong {
          display: block;
          font-size: 0.9rem;
          color: #0e201a;
          font-weight: 700;
        }
        .cleaning-box-status span {
          display: block;
          font-size: 0.76rem;
          color: #5a6b63;
        }

        .cleaning-action-buttons {
          display: flex;
          gap: 0.35rem;
          margin-top: auto;
        }
        .btn-status-act {
          flex: 1;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.4rem 0.2rem;
          border-radius: 6px;
          border: 1px solid #d9d2c5;
          background: #ffffff;
          color: #0e201a;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-status-act.yellow:hover { background: #fffbeb; color: #b45309; border-color: #f59e0b; }
        .btn-status-act.green:hover { background: #ecfdf5; color: #065f46; border-color: #10b981; }
        .btn-status-act.gold:hover { background: #fdfbf7; color: #8a6d2b; border-color: #c5a059; }

        /* Maintenance */
        .maintenance-split-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 2rem;
        }
        .maintenance-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }
        .maintenance-notes-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 250px;
          overflow-y: auto;
        }
        .note-card-item {
          background: #faf8f5;
          border: 1px solid #e8e3d9;
          border-radius: 8px;
          padding: 0.85rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .note-room-tag {
          font-weight: 800;
          background: #0e201a;
          color: #ffffff;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.78rem;
        }
        .note-text {
          flex: 1;
          font-size: 0.86rem;
          color: #0e201a;
          font-weight: 500;
        }
        .note-date-tag {
          font-size: 0.74rem;
          color: #78857f;
        }

        @media (max-width: 900px) {
          .maintenance-split-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .staff-attendance-grid {
            grid-template-columns: 1fr;
          }
          .card-top-title {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          .cleaning-rooms-grid {
            grid-template-columns: 1fr;
          }
          .cleaning-filter-pills {
            flex-wrap: wrap;
          }
          .housekeeping-card {
            padding: 1.25rem 1rem;
          }
          .btn-att {
            padding: 0.55rem 0.35rem;
            font-size: 0.72rem;
          }
        }
      `}</style>
    </div>
  );
}
