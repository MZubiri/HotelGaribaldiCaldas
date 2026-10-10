import React, { useState } from 'react';
import { Bed, Users, Maximize2, Check, ArrowRight, Eye, ShieldCheck, Sparkles } from 'lucide-react';
import { INITIAL_ROOMS } from '../data/hotelData';

export function RoomsPage({ onOpenBooking, onOpenRoomModal, currency }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredRooms = INITIAL_ROOMS.filter(room => {
    if (activeCategory === 'all') return true;
    return room.category === activeCategory;
  });

  const formatMoney = (amountCOP, amountUSD) => {
    return currency === 'COP'
      ? `$${amountCOP.toLocaleString('es-CO')} COP`
      : `$${amountUSD} USD`;
  };

  return (
    <div className="rooms-editorial-page">
      {/* Header Editorial */}
      <section className="page-header-editorial">
        <div className="container-narrow text-center">
          <span className="editorial-eyebrow">Alojamiento de Distinción</span>
          <h1 className="editorial-title">Habitaciones & Suites</h1>
          <div className="gold-divider"></div>
          <p className="editorial-intro">
            Cada estancia ha sido concebida como un santuario privado. Espacios diáfanos con techos altos, aislamiento termo-acústico y lencería blanca de algodón egipcio para un descanso absoluto frente al Parque Principal de Caldas.
          </p>

          {/* Filtros Discretos */}
          <div className="rooms-category-nav">
            <button 
              onClick={() => setActiveCategory('all')} 
              className={`cat-nav-btn ${activeCategory === 'all' ? 'active' : ''}`}
            >
              Todas las Estancias
            </button>
            <button 
              onClick={() => setActiveCategory('deluxe')} 
              className={`cat-nav-btn ${activeCategory === 'deluxe' ? 'active' : ''}`}
            >
              Deluxe con Balcón
            </button>
            <button 
              onClick={() => setActiveCategory('ejecutiva')} 
              className={`cat-nav-btn ${activeCategory === 'ejecutiva' ? 'active' : ''}`}
            >
              Estándar Ejecutivas
            </button>
            <button 
              onClick={() => setActiveCategory('familiar')} 
              className={`cat-nav-btn ${activeCategory === 'familiar' ? 'active' : ''}`}
            >
              Suites Familiares
            </button>
          </div>
        </div>
      </section>

      {/* Catálogo de Habitaciones con Diseño Espacioso */}
      <section className="rooms-list-section">
        <div className="container">
          <div className="rooms-editorial-stack">
            {filteredRooms.map((room, index) => (
              <div 
                key={room.id} 
                className={`room-feature-row ${index % 2 === 1 ? 'row-reverse' : ''}`}
              >
                {/* Fotografía de Gran Formato */}
                <div className="room-feature-media">
                  <img src={room.image} alt={room.name} className="feature-room-img" />
                  <button 
                    onClick={() => onOpenRoomModal(room)}
                    className="view-gallery-float-btn"
                  >
                    <Eye size={15} /> Ver Galería Completa
                  </button>
                </div>

                {/* Especificaciones y Narrativa */}
                <div className="room-feature-content">
                  <div className="room-meta-header">
                    <span className="room-floor-indicator">Piso {room.floor} • {room.size}</span>
                    <span className="room-price-display">
                      {formatMoney(room.priceCOP, room.priceUSD)} <small>/ noche</small>
                    </span>
                  </div>

                  <h2 className="room-feature-title">{room.name}</h2>
                  <p className="room-feature-desc">{room.description}</p>

                  <div className="room-specs-list">
                    <div className="spec-entry">
                      <Bed size={16} className="text-gold" />
                      <span>{room.beds}</span>
                    </div>
                    <div className="spec-entry">
                      <Users size={16} className="text-gold" />
                      <span>Capacidad hasta {room.capacity} personas</span>
                    </div>
                    <div className="spec-entry">
                      <Maximize2 size={16} className="text-gold" />
                      <span>Superficie de {room.size}</span>
                    </div>
                  </div>

                  <div className="room-amenities-tags">
                    {room.amenities.map((am, i) => (
                      <span key={i} className="amenity-tag">✓ {am}</span>
                    ))}
                  </div>

                  <div className="room-feature-cta-row">
                    <button 
                      onClick={() => onOpenBooking(room)} 
                      className="btn-luxury-primary"
                    >
                      Reservar Esta Habitación
                    </button>
                    <button 
                      onClick={() => onOpenRoomModal(room)} 
                      className="btn-luxury-outline"
                    >
                      Detalles & Políticas
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios Incluidos en Toda Reserva */}
      <section className="included-standards-section">
        <div className="container-narrow">
          <div className="standards-card">
            <h3>Estándares Garantizados en Cada Estancia</h3>
            <div className="standards-grid">
              <div>
                <strong>• Desayuno de Cortesía</strong>
                <p>Café de origen fresco y buñuelo tradicional de bienvenida todas las mañanas.</p>
              </div>
              <div>
                <strong>• Conectividad Óptima</strong>
                <p>Fibra óptica de alta velocidad (300 Mbps) simétrica para teletrabajo ininterrumpido.</p>
              </div>
              <div>
                <strong>• Recepción 24 Horas</strong>
                <p>Personal siempre presente en el lobby para check-in tardío o asistencia inmediata.</p>
              </div>
              <div>
                <strong>• Limpieza & Pulcritud</strong>
                <p>Lencería blanca desinfectada y amenidades biodegradables de origen colombiano.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .rooms-editorial-page {
          background-color: var(--color-bone);
          padding-bottom: 8rem;
        }
        .page-header-editorial {
          padding: 6rem 0 3.5rem;
          background-color: #ffffff;
          border-bottom: 1px solid var(--border-subtle);
        }
        .rooms-category-nav {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 3rem;
          flex-wrap: wrap;
        }
        .cat-nav-btn {
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          padding: 0.4rem 0.2rem;
          border-bottom: 2px solid transparent;
          transition: all var(--transition-smooth);
        }
        .cat-nav-btn:hover {
          color: var(--color-primary);
        }
        .cat-nav-btn.active {
          color: var(--color-primary);
          border-bottom-color: var(--color-gold);
        }

        .rooms-list-section {
          padding: 6rem 0;
        }
        .rooms-editorial-stack {
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }
        .room-feature-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4.5rem;
          align-items: center;
          background-color: #ffffff;
          padding: 3rem;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-editorial);
        }
        .room-feature-row.row-reverse {
          grid-template-columns: 1fr 1.2fr;
        }
        .room-feature-row.row-reverse .room-feature-media {
          order: 2;
        }
        .room-feature-row.row-reverse .room-feature-content {
          order: 1;
        }

        .room-feature-media {
          position: relative;
          height: 420px;
          overflow: hidden;
        }
        .feature-room-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .room-feature-media:hover .feature-room-img {
          transform: scale(1.04);
        }
        .view-gallery-float-btn {
          position: absolute;
          bottom: 1.25rem;
          left: 1.25rem;
          background: rgba(14, 32, 26, 0.85);
          color: #ffffff;
          backdrop-filter: blur(6px);
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 0.5rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: background var(--transition-smooth);
        }
        .view-gallery-float-btn:hover {
          background: var(--color-gold-dark);
        }

        .room-feature-content {
          display: flex;
          flex-direction: column;
        }
        .room-meta-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.8rem;
        }
        .room-floor-indicator {
          font-size: 0.78rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-gold-dark);
          font-weight: 700;
        }
        .room-price-display {
          font-size: 1.35rem;
          font-weight: 700;
          color: var(--color-primary);
        }
        .room-price-display small {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          font-weight: 400;
        }
        .room-feature-title {
          font-size: 2.3rem;
          color: var(--color-text-title);
          margin-bottom: 1rem;
        }
        .room-feature-desc {
          font-size: 0.98rem;
          color: var(--color-text-body);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }
        .room-specs-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .spec-entry {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.9rem;
          color: var(--color-text-title);
          font-weight: 600;
        }
        .text-gold {
          color: var(--color-gold);
        }
        .room-amenities-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 1rem;
          margin-bottom: 2rem;
          font-size: 0.82rem;
          color: var(--color-text-muted);
        }
        .room-feature-cta-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        /* Standards Card */
        .included-standards-section {
          padding-top: 2rem;
        }
        .standards-card {
          background-color: #ffffff;
          border: 1px solid var(--color-gold-border);
          padding: 3rem;
          box-shadow: var(--shadow-editorial);
        }
        .standards-card h3 {
          font-size: 1.85rem;
          color: var(--color-text-title);
          text-align: center;
          margin-bottom: 2rem;
        }
        .standards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .standards-grid strong {
          display: block;
          font-size: 0.95rem;
          color: var(--color-primary);
          margin-bottom: 0.35rem;
        }
        .standards-grid p {
          font-size: 0.88rem;
          color: var(--color-text-body);
          line-height: 1.6;
        }

        @media (max-width: 992px) {
          .room-feature-row {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem;
          }
          .room-feature-row.row-reverse {
            grid-template-columns: 1fr;
          }
          .room-feature-row.row-reverse .room-feature-media {
            order: 1;
          }
          .room-feature-row.row-reverse .room-feature-content {
            order: 2;
          }
          .room-feature-media {
            height: 300px;
          }
          .standards-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .room-feature-row {
            padding: 1.25rem;
          }
          .room-feature-title {
            font-size: 1.65rem;
          }
          .room-feature-media {
            height: 220px;
          }
          .rooms-editorial-stack {
            gap: 2.5rem;
          }
          .standards-card {
            padding: 1.5rem;
          }
          .room-feature-cta-row {
            flex-direction: column;
            width: 100%;
          }
          .room-feature-cta-row button {
            width: 100%;
            text-align: center;
          }
          .rooms-category-nav {
            gap: 0.6rem;
            margin-top: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
