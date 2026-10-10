import React, { useState } from 'react';
import { Users, Search, Plus, Star, Phone, Mail, MapPin, FileText, CheckCircle } from 'lucide-react';
import { INITIAL_GUESTS_CRM } from '../data/hotelData';

export function PmsGuestsCrm({ currency }) {
  const [guests, setGuests] = useState(INITIAL_GUESTS_CRM);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const [newGuestForm, setNewGuestForm] = useState({
    fullName: '',
    docType: 'CC',
    docNumber: '',
    nationality: 'Colombiana',
    city: '',
    email: '',
    phone: '',
    preferences: ''
  });

  const filteredGuests = guests.filter(g => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return g.fullName.toLowerCase().includes(term) ||
           g.docNumber.includes(term) ||
           g.phone.includes(term) ||
           g.email.toLowerCase().includes(term);
  });

  const handleCreateGuest = (e) => {
    e.preventDefault();
    const created = {
      id: `gst-${Date.now()}`,
      ...newGuestForm,
      totalStays: 1,
      totalSpentCOP: 0,
      vipStatus: false,
      lastStay: new Date().toISOString().split('T')[0]
    };
    setGuests([created, ...guests]);
    setIsNewModalOpen(false);
  };

  const formatMoney = (amountCOP) => {
    return currency === 'COP'
      ? `$${amountCOP.toLocaleString('es-CO')} COP`
      : `$${Math.round(amountCOP / 4000)} USD`;
  };

  return (
    <div className="pms-guests-crm-view">
      <div className="crm-toolbar-bar">
        <div className="crm-search-wrap">
          <Search size={16} className="text-muted" />
          <input 
            type="text" 
            placeholder="Buscar por nombre, documento (CC/Pasaporte), teléfono o correo..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <button onClick={() => setIsNewModalOpen(true)} className="btn-luxury-primary">
          <Plus size={16} /> Crear Ficha de Huésped
        </button>
      </div>

      {/* Grid de Huéspedes */}
      <div className="crm-cards-grid">
        {filteredGuests.map(g => (
          <div key={g.id} className="crm-guest-card">
            <div className="guest-card-top">
              <div className="guest-avatar-circle">
                {g.fullName.charAt(0)}
              </div>
              <div className="guest-name-block">
                <h4>{g.fullName}</h4>
                <span className="guest-doc-pill">
                  {g.docType}: {g.docNumber}
                </span>
              </div>
              {g.vipStatus && (
                <span className="vip-crown-badge" title="Huésped Frecuente VIP">
                  <Star size={13} fill="#c5a059" color="#c5a059" /> VIP
                </span>
              )}
            </div>

            <div className="guest-card-metrics">
              <div className="metric-box">
                <span className="metric-num">{g.totalStays}</span>
                <span className="metric-sub">Estadías</span>
              </div>
              <div className="metric-box">
                <span className="metric-num">{formatMoney(g.totalSpentCOP)}</span>
                <span className="metric-sub">Consumo Histórico</span>
              </div>
            </div>

            <div className="guest-contact-rows">
              <div className="contact-line">
                <Phone size={14} className="text-gold" />
                <span>{g.phone}</span>
              </div>
              <div className="contact-line">
                <Mail size={14} className="text-gold" />
                <span>{g.email}</span>
              </div>
              <div className="contact-line">
                <MapPin size={14} className="text-gold" />
                <span>{g.city} ({g.nationality})</span>
              </div>
            </div>

            {g.preferences && (
              <div className="guest-preferences-box">
                <strong>Preferencias & Notas:</strong>
                <p>"{g.preferences}"</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal Nuevo Huésped */}
      {isNewModalOpen && (
        <div className="modal-overlay" onClick={() => setIsNewModalOpen(false)}>
          <div className="modal-content crm-modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header-line">
              <h3>Ficha de Nuevo Huésped (Registro CRM)</h3>
              <p>Almacena la identidad y preferencias para futuras estadías.</p>
            </div>

            <form onSubmit={handleCreateGuest} className="crm-modal-form">
              <div className="form-group">
                <label>Nombre y Apellidos *</label>
                <input 
                  type="text" 
                  value={newGuestForm.fullName}
                  onChange={e => setNewGuestForm({ ...newGuestForm, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Tipo Documento</label>
                  <select 
                    value={newGuestForm.docType}
                    onChange={e => setNewGuestForm({ ...newGuestForm, docType: e.target.value })}
                  >
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                    <option value="PASAPORTE">Pasaporte Internacional</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Número de Identificación *</label>
                  <input 
                    type="text" 
                    value={newGuestForm.docNumber}
                    onChange={e => setNewGuestForm({ ...newGuestForm, docNumber: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Ciudad de Residencia</label>
                  <input 
                    type="text" 
                    value={newGuestForm.city}
                    onChange={e => setNewGuestForm({ ...newGuestForm, city: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono Celular *</label>
                  <input 
                    type="tel" 
                    value={newGuestForm.phone}
                    onChange={e => setNewGuestForm({ ...newGuestForm, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Correo Electrónico</label>
                <input 
                  type="email" 
                  value={newGuestForm.email}
                  onChange={e => setNewGuestForm({ ...newGuestForm, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Preferencias de Habitación & Notas del Recepcionista</label>
                <textarea 
                  rows={2}
                  placeholder="Ej. Alérgico a mariscos, prefiere habitaciones en el piso 2 con vista a la iglesia..."
                  value={newGuestForm.preferences}
                  onChange={e => setNewGuestForm({ ...newGuestForm, preferences: e.target.value })}
                />
              </div>

              <div className="modal-actions-row">
                <button type="button" onClick={() => setIsNewModalOpen(false)} className="btn-luxury-outline">
                  Cancelar
                </button>
                <button type="submit" className="btn-luxury-primary">
                  Guardar Huésped
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .pms-guests-crm-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .crm-toolbar-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #121822;
          padding: 1.25rem 1.75rem;
          border: 1px solid #1f2a3a;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          gap: 1rem;
        }
        .crm-search-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #0d121a;
          border: 1px solid #233042;
          padding: 0.55rem 0.95rem;
          border-radius: 6px;
          min-width: 360px;
        }
        .crm-search-wrap input {
          border: none;
          background: transparent;
          outline: none;
          width: 100%;
          font-size: 0.88rem;
          color: #f0f6fc;
        }

        .crm-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.75rem;
        }
        .crm-guest-card {
          background: #121822;
          border: 1px solid #1f2a3a;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, border-color 0.2s;
        }
        .crm-guest-card:hover {
          transform: translateY(-2px);
          border-color: rgba(212, 175, 55, 0.3);
        }
        .guest-card-top {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
          position: relative;
        }
        .guest-avatar-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #16202d;
          color: #D4AF37;
          font-weight: 800;
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #233042;
        }
        .guest-name-block h4 {
          font-size: 1.15rem;
          color: #f0f6fc;
          line-height: 1.2;
        }
        .guest-doc-pill {
          font-size: 0.75rem;
          color: #8b96a5;
        }
        .vip-crown-badge {
          margin-left: auto;
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          background: rgba(212, 175, 55, 0.15);
          color: #D4AF37;
          border: 1px solid rgba(212, 175, 55, 0.35);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          font-size: 0.72rem;
          font-weight: 800;
        }

        .guest-card-metrics {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 1rem;
          background: #16202d;
          padding: 0.75rem 1rem;
          margin-bottom: 1.25rem;
          border: 1px solid #233042;
          border-radius: 6px;
        }
        .metric-box {
          display: flex;
          flex-direction: column;
        }
        .metric-num {
          font-size: 1.15rem;
          font-weight: 800;
          color: #D4AF37;
        }
        .metric-sub {
          font-size: 0.72rem;
          color: #8b96a5;
        }

        .guest-contact-rows {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: #c9d1d9;
          margin-bottom: 1.25rem;
        }
        .contact-line {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .guest-preferences-box {
          background: #16202d;
          border-left: 3px solid #D4AF37;
          border-radius: 0 6px 6px 0;
          padding: 0.75rem 1rem;
          font-size: 0.82rem;
          margin-top: auto;
        }
        .guest-preferences-box strong {
          display: block;
          color: #D4AF37;
          margin-bottom: 0.2rem;
        }
        .guest-preferences-box p {
          color: #8b96a5;
          font-style: italic;
        }

        .crm-modal-box {
          max-width: 600px;
          padding: 2.5rem;
          background: #161b22;
          border: 1px solid #30363d;
          border-radius: 10px;
          color: #f0f6fc;
        }
        .modal-header-line {
          margin-bottom: 1.75rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #223042;
        }
        .modal-header-line h3 {
          font-size: 1.4rem;
          color: #f0f6fc;
          font-family: 'Playfair Display', serif;
        }
        .modal-header-line p {
          font-size: 0.85rem;
          color: #8b96a5;
        }
        .crm-modal-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
      `}</style>
    </div>
  );
}
