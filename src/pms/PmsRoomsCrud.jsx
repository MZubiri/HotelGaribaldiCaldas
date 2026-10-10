import React, { useState } from 'react';
import { Bed, Plus, Edit, Trash2, CheckCircle, Sparkles, Wrench, Users, Eye } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export function PmsRoomsCrud({ rooms, onSaveRoom, onDeleteRoom, onUpdateStatus, currency, roleCapabilities }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

  const canEditRooms = roleCapabilities ? !!roleCapabilities.canEditRooms : true;
  const canDeleteRooms = roleCapabilities ? !!roleCapabilities.canDeleteRooms : true;

  const [formData, setFormData] = useState({
    number: '',
    floor: 1,
    type: 'Estándar Ejecutiva',
    category: 'ejecutiva',
    priceCOP: 140000,
    priceUSD: 35,
    capacity: 2,
    beds: '1 Cama Doble Queen',
    size: '22 m²',
    status: 'available',
    cleaningStatus: 'clean',
    description: '',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
  });

  const handleOpenCreate = () => {
    setEditingRoom(null);
    setFormData({
      number: `${rooms.length + 101}`,
      floor: 1,
      type: 'Estándar Ejecutiva',
      category: 'ejecutiva',
      priceCOP: 140000,
      priceUSD: 35,
      capacity: 2,
      beds: '1 Cama Doble Queen',
      size: '22 m²',
      status: 'available',
      cleaningStatus: 'clean',
      description: 'Habitación confortable y luminosa con escritorio de trabajo y baño privado.',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      number: room.number,
      floor: room.floor,
      type: room.type,
      category: room.category || 'ejecutiva',
      priceCOP: room.priceCOP,
      priceUSD: room.priceUSD,
      capacity: room.capacity || 2,
      beds: room.beds,
      size: room.size,
      status: room.status,
      cleaningStatus: room.cleaningStatus || 'clean',
      description: room.description || '',
      image: room.image
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveRoom({
      id: editingRoom ? editingRoom.id : `custom-${formData.number}`,
      ...formData,
      priceUSD: Math.round(Number(formData.priceCOP) / HOTEL_INFO.exchangeRate)
    });
    setIsModalOpen(false);
  };

  const formatMoney = (amountCOP) => {
    return currency === 'COP'
      ? `$${Number(amountCOP).toLocaleString('es-CO')} COP`
      : `$${Math.round(Number(amountCOP) / HOTEL_INFO.exchangeRate)} USD`;
  };

  return (
    <div className="pms-rooms-crud-view">
      <div className="crud-header-bar">
        <div>
          <h3>Inventario & Catálogo de Habitaciones</h3>
          <p>Administra los tipos de cuarto, tarifas base, aforos y estados operativos del hotel.</p>
        </div>

        <button 
          onClick={handleOpenCreate} 
          className="btn-luxury-primary"
          disabled={!canEditRooms}
          title={!canEditRooms ? 'Requiere rol con permisos de edición de inventario' : ''}
        >
          <Plus size={16} /> Crear Nueva Habitación
        </button>
      </div>

      {/* Tabla CRUD */}
      <div className="crud-table-card">
        <table className="pms-data-table">
          <thead>
            <tr>
              <th>Hab.</th>
              <th>Piso</th>
              <th>Tipo & Acomodación</th>
              <th>Tarifa Base</th>
              <th>Estado Operativo</th>
              <th>Aseo / Mucama</th>
              <th>Huésped Asignado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.number}>
                <td><strong className="room-badge-num">Hab {room.number}</strong></td>
                <td>Piso {room.floor}</td>
                <td>
                  <div className="room-type-cell">
                    <strong>{room.type}</strong>
                    <span>{room.beds} • {room.size}</span>
                  </div>
                </td>
                <td><strong>{formatMoney(room.priceCOP)}</strong></td>
                <td>
                  <span className={`status-pill ${room.status}`}>
                    {room.status === 'available' && 'Disponible'}
                    {room.status === 'occupied' && 'Ocupada'}
                    {room.status === 'cleaning' && 'En Limpieza'}
                    {room.status === 'maintenance' && 'Mantenimiento'}
                  </span>
                </td>
                <td>
                  <span className={`cleaning-pill ${room.cleaningStatus}`}>
                    {room.cleaningStatus === 'inspected' && '✓ Inspeccionada'}
                    {room.cleaningStatus === 'clean' && 'Limpia'}
                    {room.cleaningStatus === 'in_progress' && 'En Proceso'}
                    {room.cleaningStatus === 'dirty' && 'Sucia / Salida'}
                  </span>
                </td>
                <td>
                  {room.guest ? (
                    <div className="guest-assigned-cell">
                      <strong>{room.guest}</strong>
                      <span>Salida: {room.checkOut || 'N/A'}</span>
                    </div>
                  ) : (
                    <span className="text-muted">— Sin huésped —</span>
                  )}
                </td>
                <td>
                  <div className="crud-actions-group">
                    <button 
                      onClick={() => handleOpenEdit(room)} 
                      className={`btn-action-icon edit ${!canEditRooms ? 'disabled-action' : ''}`}
                      title={canEditRooms ? 'Editar datos de habitación' : 'Edición no permitida'}
                      disabled={!canEditRooms}
                    >
                      <Edit size={15} />
                    </button>
                    <button 
                      onClick={() => {
                        if (!canDeleteRooms) {
                          alert('Tu rol no tiene permisos para eliminar habitaciones del inventario.');
                          return;
                        }
                        if (confirm(`¿Eliminar la habitación ${room.number} del inventario?`)) {
                          onDeleteRoom(room.number);
                        }
                      }} 
                      className={`btn-action-icon delete ${!canDeleteRooms ? 'disabled-action' : ''}`}
                      title={canDeleteRooms ? 'Eliminar habitación' : 'Eliminación restringida (Solo Administrador)'}
                      disabled={!canDeleteRooms}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Crear / Editar Habitación */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content crud-modal-box" onClick={e => e.stopPropagation()}>
            <div className="crud-modal-header">
              <h3>{editingRoom ? `Editar Habitación ${editingRoom.number}` : 'Nueva Habitación en Inventario'}</h3>
              <p>Actualiza especificaciones, tarifas base y comodidades.</p>
            </div>

            <form onSubmit={handleSubmit} className="crud-modal-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Número de Habitación *</label>
                  <input 
                    type="text" 
                    value={formData.number}
                    onChange={e => setFormData({ ...formData, number: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Piso *</label>
                  <select 
                    value={formData.floor}
                    onChange={e => setFormData({ ...formData, floor: Number(e.target.value) })}
                  >
                    <option value={1}>Piso 1</option>
                    <option value={2}>Piso 2 (Balcón al Parque)</option>
                    <option value={3}>Piso 3 (Suites)</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Nombre del Tipo *</label>
                  <input 
                    type="text" 
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Tarifa Base Noche (COP) *</label>
                  <input 
                    type="number" 
                    step="5000"
                    value={formData.priceCOP}
                    onChange={e => setFormData({ ...formData, priceCOP: Number(e.target.value) })}
                    required
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Camas y Acomodación</label>
                  <input 
                    type="text" 
                    value={formData.beds}
                    onChange={e => setFormData({ ...formData, beds: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Dimensión (m²)</label>
                  <input 
                    type="text" 
                    value={formData.size}
                    onChange={e => setFormData({ ...formData, size: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Estado Operativo</label>
                  <select 
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="available">Disponible para Venta</option>
                    <option value="occupied">Ocupada</option>
                    <option value="cleaning">En Limpieza</option>
                    <option value="maintenance">Mantenimiento</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Estado de Limpieza</label>
                  <select 
                    value={formData.cleaningStatus}
                    onChange={e => setFormData({ ...formData, cleaningStatus: e.target.value })}
                  >
                    <option value="inspected">Inspeccionada</option>
                    <option value="clean">Limpia</option>
                    <option value="in_progress">En Proceso</option>
                    <option value="dirty">Sucia</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Descripción y Detalles</label>
                <textarea 
                  rows={2}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="modal-actions-row">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-luxury-outline">
                  Cancelar
                </button>
                <button type="submit" className="btn-luxury-primary">
                  {editingRoom ? 'Guardar Cambios' : 'Crear Habitación'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .pms-rooms-crud-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .crud-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #121822;
          padding: 1.5rem 2rem;
          border: 1px solid #1f2a3a;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }
        .crud-header-bar h3 {
          font-size: 1.4rem;
          color: #f0f6fc;
          margin-bottom: 0.2rem;
        }
        .crud-header-bar p {
          font-size: 0.85rem;
          color: #8b96a5;
        }

        .crud-table-card {
          background: #121822;
          border: 1px solid #1f2a3a;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          overflow-x: auto;
        }
        .pms-data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.88rem;
        }
        .pms-data-table th {
          background: #16202d;
          padding: 1rem 1.25rem;
          font-size: 0.76rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #8b96a5;
          border-bottom: 1px solid #223042;
        }
        .pms-data-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #1a2432;
          color: #c9d1d9;
        }

        .room-badge-num {
          background: #16202d;
          padding: 0.3rem 0.6rem;
          border-radius: 4px;
          color: #D4AF37;
          border: 1px solid #233042;
          font-weight: 700;
          font-size: 0.95rem;
        }
        .room-type-cell strong {
          display: block;
          color: #f0f6fc;
        }
        .room-type-cell span {
          display: block;
          font-size: 0.75rem;
          color: #8b96a5;
        }

        .status-pill {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
        }
        .status-pill.available { background: rgba(16, 185, 129, 0.15); color: #34d399; border: 1px solid rgba(16, 185, 129, 0.35); }
        .status-pill.occupied { background: rgba(59, 130, 246, 0.15); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.35); }
        .status-pill.cleaning { background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.35); }
        .status-pill.maintenance { background: rgba(107, 114, 128, 0.18); color: #9ca3af; border: 1px solid rgba(107, 114, 128, 0.35); }

        .cleaning-pill {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }
        .cleaning-pill.inspected { background: rgba(16, 185, 129, 0.15); color: #34d399; }
        .cleaning-pill.clean { background: rgba(34, 197, 94, 0.15); color: #4ade80; }
        .cleaning-pill.in_progress { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
        .cleaning-pill.dirty { background: rgba(239, 68, 68, 0.15); color: #f87171; }

        .guest-assigned-cell strong {
          display: block;
          font-size: 0.88rem;
          color: #f0f6fc;
        }
        .guest-assigned-cell span {
          display: block;
          font-size: 0.72rem;
          color: #8b96a5;
        }

        .crud-actions-group {
          display: flex;
          gap: 0.5rem;
        }
        .btn-action-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #233042;
          background: #16202d;
          color: #c9d1d9;
          transition: all var(--transition-smooth);
        }
        .btn-action-icon.edit:hover {
          background: #D4AF37;
          color: #0b0f15;
          border-color: #D4AF37;
        }
        .btn-action-icon.delete:hover {
          background: #dc2626;
          color: #ffffff;
          border-color: #dc2626;
        }

        /* Modal CRUD */
        .crud-modal-box {
          max-width: 600px;
          padding: 2.5rem;
          background: #161b22;
          border: 1px solid #30363d;
          border-radius: 10px;
          color: #f0f6fc;
        }
        .crud-modal-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #223042;
        }
        .crud-modal-header h3 {
          font-size: 1.6rem;
          color: #f0f6fc;
          font-family: 'Playfair Display', serif;
        }
        .crud-modal-header p {
          font-size: 0.85rem;
          color: #8b96a5;
        }
        .crud-modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .form-group label {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #c9d1d9;
        }
        .form-group input, .form-group select, .form-group textarea {
          padding: 0.65rem 0.85rem;
          border: 1px solid #233042;
          background: #0d121a;
          color: #f0f6fc;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          outline: none;
          border-radius: 6px;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: #D4AF37;
          background: #0d121a;
        }
        .modal-actions-row {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
        }

        @media (max-width: 600px) {
          .crud-modal-box {
            padding: 1.5rem 1rem;
          }
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
