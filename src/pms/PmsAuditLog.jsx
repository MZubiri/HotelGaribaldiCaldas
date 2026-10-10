import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Download, 
  Plus, 
  ShieldCheck, 
  User, 
  Clock 
} from 'lucide-react';
import { INITIAL_AUDIT_LOGS } from '../data/hotelData';

export function PmsAuditLog({ logs = INITIAL_AUDIT_LOGS, onAddLog }) {
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLog, setNewLog] = useState({
    user: 'Esteban Montoya (Recepción)',
    action: 'Novedad de Turno',
    details: ''
  });

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.action.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === 'all') return matchesSearch;
    if (filterType === 'checkin') return matchesSearch && log.action.toLowerCase().includes('check-in');
    if (filterType === 'housekeeping') return matchesSearch && (log.action.toLowerCase().includes('limpia') || log.action.toLowerCase().includes('housekeeping'));
    if (filterType === 'cashier') return matchesSearch && (log.action.toLowerCase().includes('caja') || log.action.toLowerCase().includes('turno'));
    if (filterType === 'novedades') return matchesSearch && log.action.toLowerCase().includes('novedad');
    return matchesSearch;
  });

  const handleSubmitNewLog = (e) => {
    e.preventDefault();
    if (!newLog.details.trim()) return;

    const created = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      user: newLog.user,
      action: newLog.action,
      details: newLog.details
    };

    if (onAddLog) {
      onAddLog(created);
    }
    setNewLog({
      user: 'Esteban Montoya (Recepción)',
      action: 'Novedad de Turno',
      details: ''
    });
    setIsModalOpen(false);
  };

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      ["ID,Fecha y Hora,Usuario,Acción,Detalles"]
      .concat(filteredLogs.map(l => `"${l.id}","${l.timestamp}","${l.user}","${l.action}","${l.details.replace(/"/g, '""')}"`))
      .join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `auditoria_hotel_garibaldi_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="pms-module-container">
      {/* Barra de Control */}
      <div className="pms-toolbar-card">
        <div className="pms-toolbar-left">
          <div className="pms-search-input-wrap">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por usuario, acción o habitación..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pms-input"
            />
          </div>

          <div className="filter-pills">
            <button 
              onClick={() => setFilterType('all')} 
              className={`filter-pill ${filterType === 'all' ? 'active' : ''}`}
            >
              Todos ({logs.length})
            </button>
            <button 
              onClick={() => setFilterType('checkin')} 
              className={`filter-pill ${filterType === 'checkin' ? 'active' : ''}`}
            >
              Check-in / Out
            </button>
            <button 
              onClick={() => setFilterType('housekeeping')} 
              className={`filter-pill ${filterType === 'housekeeping' ? 'active' : ''}`}
            >
              Limpieza & Pisos
            </button>
            <button 
              onClick={() => setFilterType('cashier')} 
              className={`filter-pill ${filterType === 'cashier' ? 'active' : ''}`}
            >
              Caja & Turnos
            </button>
            <button 
              onClick={() => setFilterType('novedades')} 
              className={`filter-pill ${filterType === 'novedades' ? 'active' : ''}`}
            >
              Novedades
            </button>
          </div>
        </div>

        <div className="pms-toolbar-right">
          <button onClick={handleExportCSV} className="btn-pms-secondary">
            <Download size={15} /> Exportar CSV
          </button>
          <button onClick={() => setIsModalOpen(true)} className="btn-pms-primary">
            <Plus size={15} /> Registrar Novedad
          </button>
        </div>
      </div>

      {/* Tarjeta de Información de Seguridad */}
      <div className="audit-security-banner">
        <ShieldCheck size={20} className="text-emerald-700" />
        <div>
          <h4>Registro Inmutable de Eventos Operativos</h4>
          <p>Cumplimiento normativo para hotelería colombiana (MinCIT / Policía de Turismo). Todas las transacciones de caja, cambios de estado y pernoctaciones quedan registradas con huella de tiempo.</p>
        </div>
      </div>

      {/* Lista Cronológica */}
      <div className="pms-card audit-timeline-card">
        <div className="audit-timeline">
          {filteredLogs.map(log => (
            <div key={log.id} className="audit-item">
              <div className="audit-item-marker">
                <div className="audit-item-dot"></div>
                <div className="audit-item-line"></div>
              </div>

              <div className="audit-item-content">
                <div className="audit-item-header">
                  <div className="audit-user-info">
                    <User size={14} className="text-muted" />
                    <strong>{log.user}</strong>
                    <span className="audit-badge">{log.action}</span>
                  </div>
                  <div className="audit-timestamp">
                    <Clock size={13} />
                    <span>{log.timestamp}</span>
                  </div>
                </div>

                <p className="audit-item-details">{log.details}</p>
              </div>
            </div>
          ))}

          {filteredLogs.length === 0 && (
            <div className="pms-empty-state">
              <History size={36} className="text-muted mb-2" />
              <p>No se encontraron registros que coincidan con los filtros aplicados.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal para Registrar Novedad */}
      {isModalOpen && (
        <div className="pms-modal-backdrop">
          <div className="pms-modal-card">
            <div className="pms-modal-header">
              <h3>Registrar Evento en Auditoría</h3>
              <button onClick={() => setIsModalOpen(false)} className="btn-close-modal">✕</button>
            </div>

            <form onSubmit={handleSubmitNewLog} className="pms-modal-body">
              <div className="form-group mb-3">
                <label className="form-label">Usuario Responsable</label>
                <select 
                  className="pms-input"
                  value={newLog.user}
                  onChange={(e) => setNewLog({ ...newLog, user: e.target.value })}
                >
                  <option value="Esteban Montoya (Recepción)">Esteban Montoya (Recepción Turno Mañana)</option>
                  <option value="Luz Dary Zapata (Gobernanta)">Luz Dary Zapata (Gobernanta General)</option>
                  <option value="Valeria Henao (Auditor Nocturno)">Valeria Henao (Auditor Nocturno)</option>
                  <option value="Administrador General">Administrador General</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Tipo de Acción / Evento</label>
                <select 
                  className="pms-input"
                  value={newLog.action}
                  onChange={(e) => setNewLog({ ...newLog, action: e.target.value })}
                >
                  <option value="Novedad de Turno">Novedad de Turno</option>
                  <option value="Cambio de Tarifa Manual">Cambio de Tarifa Manual</option>
                  <option value="Bloqueo por Mantenimiento">Bloqueo por Mantenimiento</option>
                  <option value="Incidencia con Huésped">Incidencia con Huésped</option>
                  <option value="Arqueo Extraordinario">Arqueo Extraordinario</option>
                </select>
              </div>

              <div className="form-group mb-3">
                <label className="form-label">Descripción Detallada del Suceso</label>
                <textarea 
                  rows={4}
                  className="pms-input"
                  placeholder="Detalla lo sucedido, número de habitación afectada, huésped involucrado o decisión tomada..."
                  value={newLog.details}
                  onChange={(e) => setNewLog({ ...newLog, details: e.target.value })}
                  required
                />
              </div>

              <div className="pms-modal-actions">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-pms-secondary">
                  Cancelar
                </button>
                <button type="submit" className="btn-pms-primary">
                  Guardar en Registro Inmutable
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .audit-security-banner {
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .audit-security-banner h4 {
          font-size: 0.92rem;
          color: #166534;
          font-weight: 700;
          margin-bottom: 0.2rem;
        }
        .audit-security-banner p {
          font-size: 0.8rem;
          color: #14532d;
          line-height: 1.4;
        }
        .audit-timeline-card {
          padding: 1.5rem 2rem;
        }
        .audit-timeline {
          display: flex;
          flex-direction: column;
        }
        .audit-item {
          display: flex;
          gap: 1.25rem;
          position: relative;
        }
        .audit-item-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 20px;
        }
        .audit-item-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #D4AF37;
          border: 2px solid #121822;
          box-shadow: 0 0 0 2px #D4AF37;
          z-index: 2;
          margin-top: 5px;
        }
        .audit-item-line {
          width: 2px;
          flex: 1;
          background: #1f2a3a;
          margin: 4px 0;
        }
        .audit-item:last-child .audit-item-line {
          display: none;
        }
        .audit-item-content {
          flex: 1;
          padding-bottom: 1.75rem;
        }
        .audit-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.35rem;
        }
        .audit-user-info {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: #f0f6fc;
        }
        .audit-badge {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          background: #16202d;
          color: #D4AF37;
          border: 1px solid #233042;
        }
        .audit-timestamp {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.76rem;
          color: #8b96a5;
        }
        .audit-item-details {
          font-size: 0.84rem;
          color: #e6edf3;
          line-height: 1.5;
          background: #16202d;
          padding: 0.85rem 1.1rem;
          border-radius: 6px;
          border-left: 3px solid #D4AF37;
          border: 1px solid #233042;
          border-left: 3px solid #D4AF37;
        }
        .pms-toolbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .filter-pills {
          display: flex;
          gap: 0.4rem;
        }
        .filter-pill {
          padding: 0.4rem 0.85rem;
          font-size: 0.76rem;
          font-weight: 600;
          border-radius: 20px;
          background: #16202d;
          color: #8b96a5;
          border: 1px solid #233042;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .filter-pill.active {
          background: #D4AF37;
          color: #0b0f15;
          font-weight: 700;
          border-color: #D4AF37;
        }
      `}</style>
    </div>
  );
}
