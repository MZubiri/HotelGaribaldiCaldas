import React from 'react';
import { 
  Star, 
  MapPin, 
  ShieldCheck, 
  Coffee, 
  Wifi, 
  Calendar, 
  Users, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export function Hero({ 
  searchParams, 
  setSearchParams, 
  onSearchRooms, 
  language,
  currency 
}) {
  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="hero-section">
      {/* Fondo con Overlay de Lujo */}
      <div className="hero-backdrop">
        <img 
          src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1920&q=85" 
          alt="Habitación Deluxe con Balcón Hotel Plaza Garibaldi Caldas" 
          className="hero-bg-img"
        />
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-content-wrap">
        {/* Badges de Prestigio */}
        <div className="hero-badge-row">
          <div className="hero-pill-badge">
            <span className="star-row">
              <Star size={13} fill="#d4af37" color="#d4af37" />
              <Star size={13} fill="#d4af37" color="#d4af37" />
              <Star size={13} fill="#d4af37" color="#d4af37" />
              <Star size={13} fill="#d4af37" color="#d4af37" />
            </span>
            <span className="pill-text">Hotel 4 Estrellas • Caldas, Antioquia</span>
          </div>

          <div className="hero-location-badge">
            <MapPin size={14} className="text-gold" />
            <span>Frente al Parque Principal (Parque Santander)</span>
          </div>
        </div>

        {/* Título Principal H1 */}
        <h1 className="hero-title">
          Hospitalidad de Vanguardia en el Corazón de Caldas
        </h1>

        <p className="hero-description">
          El refugio perfecto para ejecutivos del sur del Valle de Aburrá y exploradores del Suroeste Antioqueño. Habitaciones con balcón a la plaza, café de origen de cortesía y la calidez inconfundible de nuestra tierra.
        </p>

        {/* Beneficios de Reserva Directa */}
        <div className="hero-guarantees">
          <div className="guarantee-item">
            <ShieldCheck size={18} className="text-gold" />
            <span>Mejor tarifa garantizada vs OTAs</span>
          </div>
          <div className="guarantee-item">
            <Coffee size={18} className="text-gold" />
            <span>Café fresco y buñuelo de bienvenida</span>
          </div>
          <div className="guarantee-item">
            <Wifi size={18} className="text-gold" />
            <span>WiFi Fibra Óptica 300 Mbps</span>
          </div>
        </div>

        {/* BARRA DE RESERVA INTEGRADA (BOOKING BAR) */}
        <div className="booking-bar-card glass-card">
          <div className="booking-bar-inner">
            {/* Campo: Check-in */}
            <div className="booking-field">
              <label className="field-label">
                <Calendar size={15} className="field-icon" />
                <span>Llegada (Check-in)</span>
              </label>
              <input 
                type="date" 
                value={searchParams.checkIn}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => handleInputChange('checkIn', e.target.value)}
                className="booking-input"
              />
            </div>

            {/* Divisor */}
            <div className="field-divider"></div>

            {/* Campo: Check-out */}
            <div className="booking-field">
              <label className="field-label">
                <Calendar size={15} className="field-icon" />
                <span>Salida (Check-out)</span>
              </label>
              <input 
                type="date" 
                value={searchParams.checkOut}
                min={searchParams.checkIn || new Date().toISOString().split('T')[0]}
                onChange={(e) => handleInputChange('checkOut', e.target.value)}
                className="booking-input"
              />
            </div>

            {/* Divisor */}
            <div className="field-divider"></div>

            {/* Campo: Huéspedes */}
            <div className="booking-field">
              <label className="field-label">
                <Users size={15} className="field-icon" />
                <span>Huéspedes</span>
              </label>
              <select 
                value={searchParams.guests}
                onChange={(e) => handleInputChange('guests', Number(e.target.value))}
                className="booking-select"
              >
                <option value={1}>1 Adulto (Ejecutivo)</option>
                <option value={2}>2 Adultos (Pareja / Doble)</option>
                <option value={3}>3 Personas (Familiar)</option>
                <option value={4}>4 Personas (Familiar)</option>
                <option value={5}>5 Personas (Suite)</option>
              </select>
            </div>

            {/* Divisor */}
            <div className="field-divider"></div>

            {/* Campo: Tipo de Acomodación */}
            <div className="booking-field">
              <label className="field-label">
                <Sparkles size={15} className="field-icon" />
                <span>Preferencia</span>
              </label>
              <select 
                value={searchParams.roomType}
                onChange={(e) => handleInputChange('roomType', e.target.value)}
                className="booking-select"
              >
                <option value="all">Todas las habitaciones</option>
                <option value="deluxe">Deluxe Balcón Parque</option>
                <option value="ejecutiva">Estándar Ejecutiva</option>
                <option value="familiar">Gran Suite Familiar</option>
              </select>
            </div>

            {/* Botón de Búsqueda */}
            <div className="booking-btn-wrap">
              <button 
                onClick={onSearchRooms} 
                className="btn-gold search-submit-btn"
              >
                <span>Consultar Tarifas</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="booking-bar-footer">
            <span className="direct-badge">
              ✓ Reserva 100% segura • Sin cobros ocultos • Confirmación inmediata
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 88vh;
          display: flex;
          align-items: center;
          padding: 5rem 0 4rem;
          color: #ffffff;
          overflow: hidden;
        }
        .hero-backdrop {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transform: scale(1.04);
          animation: slowZoom 20s infinite alternate ease-in-out;
        }
        @keyframes slowZoom {
          from { transform: scale(1.0); }
          to { transform: scale(1.08); }
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg, 
            rgba(10, 23, 20, 0.72) 0%, 
            rgba(10, 23, 20, 0.85) 60%, 
            rgba(10, 23, 20, 0.95) 100%
          );
        }
        .hero-content-wrap {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .hero-badge-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        .hero-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212, 175, 55, 0.4);
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
        }
        .star-row {
          display: inline-flex;
          gap: 2px;
        }
        .hero-location-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 0.4rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.9);
        }
        .hero-title {
          font-size: 3.6rem;
          font-weight: 700;
          line-height: 1.1;
          color: #ffffff;
          max-width: 950px;
          margin-bottom: 1.25rem;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }
        .hero-description {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.88);
          max-width: 780px;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .hero-guarantees {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.75rem;
          margin-bottom: 2.75rem;
        }
        .guarantee-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.92rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.95);
        }

        /* Booking Bar */
        .booking-bar-card {
          width: 100%;
          max-width: 1050px;
          padding: 1.25rem 1.5rem;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(212, 175, 55, 0.4);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
        }
        .booking-bar-inner {
          display: grid;
          grid-template-columns: 1.2fr auto 1.2fr auto 1fr auto 1.2fr auto;
          align-items: center;
          gap: 1rem;
        }
        .field-divider {
          width: 1px;
          height: 40px;
          background-color: rgba(19, 46, 39, 0.12);
        }
        .booking-field {
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .field-label {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--emerald-900);
          letter-spacing: 0.04em;
        }
        .field-icon {
          color: var(--gold-600);
        }
        .booking-input, .booking-select {
          width: 100%;
          border: 1px solid rgba(19, 46, 39, 0.12);
          background: #f8faf9;
          border-radius: var(--radius-sm);
          padding: 0.55rem 0.65rem;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--text-primary);
          outline: none;
          transition: border-color var(--transition-fast);
        }
        .booking-input:focus, .booking-select:focus {
          border-color: var(--gold-500);
          background: #ffffff;
        }
        .search-submit-btn {
          height: 52px;
          padding: 0 1.6rem;
          white-space: nowrap;
        }
        .booking-bar-footer {
          margin-top: 0.75rem;
          padding-top: 0.65rem;
          border-top: 1px solid rgba(19, 46, 39, 0.08);
          font-size: 0.8rem;
          color: var(--emerald-800);
          font-weight: 600;
        }
        .direct-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
        }

        @media (max-width: 992px) {
          .booking-bar-inner {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
          .field-divider {
            display: none;
          }
          .booking-btn-wrap {
            grid-column: span 2;
          }
          .search-submit-btn {
            width: 100%;
          }
          .hero-title {
            font-size: 2.75rem;
          }
        }
        @media (max-width: 600px) {
          .hero-section {
            padding: 3.5rem 0 3rem;
          }
          .hero-title {
            font-size: 2.1rem;
          }
          .hero-description {
            font-size: 1rem;
          }
          .booking-bar-inner {
            grid-template-columns: 1fr;
          }
          .booking-btn-wrap {
            grid-column: span 1;
          }
        }
      `}</style>
    </section>
  );
}
