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
          background: #ffffff;
          padding: 1.5rem 2rem;
          border: 1px solid rgba(197, 160, 89, 0.22);
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(14, 28, 23, 0.04);
        }
        .crud-header-bar h3 {
          font-size: 1.45rem;
          color: #0e201a;
          font-family: var(--font-serif);
          font-weight: 700;
          margin-bottom: 0.25rem;
        }
        .crud-header-bar p {
          font-size: 0.86rem;
          color: #5a6b63;
        }

        .crud-table-card {
          background: #ffffff;
          border: 1px solid rgba(197, 160, 89, 0.22);
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(14, 28, 23, 0.04);
          overflow-x: auto;
        }
        .pms-data-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.88rem;
        }
        .pms-data-table th {
          background: #faf8f5;
          padding: 1rem 1.25rem;
          font-size: 0.74rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #5a6b63;
          font-weight: 700;
          border-bottom: 1.5px solid #ece6db;
        }
        .pms-data-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #f4f0e8;
          color: #0e201a;
        }
        .pms-data-table tr:hover td {
          background-color: #fdfbf7;
        }

        .room-badge-num {
          background: #faf8f5;
          padding: 0.3rem 0.65rem;
          border-radius: 6px;
          color: #8a6d2b;
          border: 1px solid #e0d8c8;
          font-weight: 800;
          font-size: 0.95rem;
        }
        .room-type-cell strong {
          display: block;
          color: #0e201a;
          font-weight: 600;
        }
        .room-type-cell span {
          display: block;
          font-size: 0.78rem;
          color: #5a6b63;
        }

        .status-pill {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
        }
        .status-pill.available { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }
        .status-pill.occupied { background: #eff6ff; color: #1e40af; border: 1px solid #bfdbfe; }
        .status-pill.cleaning { background: #fffbeb; color: #92400e; border: 1px solid #fde68a; }
        .status-pill.maintenance { background: #f3f4f6; color: #4b5563; border: 1px solid #e5e7eb; }

        .cleaning-pill {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }
        .cleaning-pill.inspected { background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; }
        .cleaning-pill.clean { background: #f0fdf4; color: #15803d; border: 1px solid #bbf7d0; }
        .cleaning-pill.in_progress { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
        .cleaning-pill.dirty { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }

        .guest-assigned-cell strong {
          display: block;
          font-size: 0.88rem;
          color: #0e201a;
          font-weight: 600;
        }
        .guest-assigned-cell span {
          display: block;
          font-size: 0.74rem;
          color: #5a6b63;
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
          border: 1px solid #d9d2c5;
          background: #faf8f5;
          color: #5a6b63;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .btn-action-icon.edit:hover {
          background: #0e201a;
          color: #ffffff;
          border-color: #0e201a;
        }
        .btn-action-icon.delete:hover {
          background: #dc2626;
          color: #ffffff;
          border-color: #dc2626;
        }

        /* Modal CRUD */
        .crud-modal-box {
          max-width: 600px;
          width: 90%;
          padding: 2.25rem 2.5rem;
          background: #ffffff;
          border: 1px solid rgba(197, 160, 89, 0.35);
          border-radius: 14px;
          color: #0e201a;
          box-shadow: 0 25px 60px rgba(14, 28, 23, 0.25);
        }
        .crud-modal-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #f0ebe1;
        }
        .crud-modal-header h3 {
          font-size: 1.5rem;
          color: #0e201a;
          font-family: var(--font-serif);
          font-weight: 700;
          margin: 0 0 0.25rem 0;
        }
        .crud-modal-header p {
          font-size: 0.86rem;
          color: #5a6b63;
          margin: 0;
        }
        .crud-modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
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
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #0e201a;
        }
        .form-group input, .form-group select, .form-group textarea {
          padding: 0.7rem 1rem;
          border: 1.5px solid #d9d2c5;
          background: #faf8f5;
          color: #0e201a;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          outline: none;
          border-radius: 8px;
          transition: all 0.2s;
        }
        .form-group select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%230e201a' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 15px;
          padding-right: 2.5rem;
          cursor: pointer;
        }
        .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
          border-color: #c5a059;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.2);
        }
        .modal-actions-row {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid #f0ebe1;
        }

        @media (max-width: 600px) {
          .crud-modal-box {
            padding: 1.5rem 1.25rem;
          }
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
