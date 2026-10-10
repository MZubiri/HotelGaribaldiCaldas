import React, { useState } from 'react';
import { 
  Users, 
  Maximize2, 
  Bed, 
  Eye, 
  Calendar, 
  Sparkles, 
  Check, 
  Coffee,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { ROOMS_DATA } from '../data/hotelData';

export function RoomCatalog({ 
  currency, 
  onSelectRoomDetails, 
  onBookRoom,
  language 
}) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredRooms = ROOMS_DATA.filter(room => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'balcon') return room.id.includes('balcon');
    if (selectedFilter === 'ejecutiva') return room.id.includes('ejecutiva') || room.id.includes('superior');
    if (selectedFilter === 'familiar') return room.id.includes('familiar');
    return true;
  });

  return (
    <section id="habitaciones" className="rooms-section">
      <div className="container">
        {/* Encabezado */}
        <div className="section-header">
          <span className="section-tag">
            <Sparkles size={14} /> Espacios Diseñados para tu Confort
          </span>
          <h2 className="section-title">
            Habitaciones & Suites
          </h2>
          <p className="section-subtitle">
            Cada habitación ha sido equipada pensando en el descanso profundo, el silencio y la mejor panorámica del Parque Principal de Caldas.
          </p>

          {/* Filtros de Categoría */}
          <div className="room-filters">
            <button 
              className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              Todas ({ROOMS_DATA.length})
            </button>
            <button 
              className={`filter-btn ${selectedFilter === 'balcon' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('balcon')}
            >
              Con Balcón al Parque
            </button>
            <button 
              className={`filter-btn ${selectedFilter === 'ejecutiva' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('ejecutiva')}
            >
              Ejecutivas & Parejas
            </button>
            <button 
              className={`filter-btn ${selectedFilter === 'familiar' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('familiar')}
            >
              Gran Suite Familiar
            </button>
          </div>
        </div>

        {/* Grilla de Habitaciones */}
        <div className="rooms-grid">
          {filteredRooms.map((room) => {
            const formattedPrice = currency === 'COP'
              ? `$${room.priceCOP.toLocaleString('es-CO')} COP`
              : `$${room.priceUSD} USD`;

            return (
              <div key={room.id} className="hotel-card room-card">
                {/* Imagen y Badges */}
                <div className="room-img-wrap">
                  <img src={room.image} alt={room.name} className="room-card-img" />
                  <span className="room-card-badge badge-gold">
                    {room.badge}
                  </span>
                  <div className="room-img-overlay">
                    <button 
                      onClick={() => onSelectRoomDetails(room)} 
                      className="btn-quick-view"
                      title="Ver fotos y comodidades"
                    >
                      <Eye size={16} />
                      <span>Ver Galería</span>
                    </button>
                  </div>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="room-card-body">
                  <div className="room-card-header">
                    <span className="room-type-tag">{room.beds}</span>
                    <h3 className="room-card-title">{room.name}</h3>
                    <p className="room-card-tagline">{room.tagline}</p>
                  </div>

                  {/* Especificaciones Rápidas */}
                  <div className="room-card-specs">
                    <span className="spec-item">
                      <Users size={14} /> {room.capacity}
                    </span>
                    <span className="spec-item">
                      <Maximize2 size={14} /> {room.size}
                    </span>
                    <span className="spec-item">
                      <Coffee size={14} /> Café incluido
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul className="room-highlights">
                    {room.features.slice(0, 3).map((f, idx) => (
                      <li key={idx} className="highlight-item">
                        <Check size={14} className="text-gold" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Footer con Tarifa y Botón */}
                  <div className="room-card-footer">
                    <div className="price-container">
                      <span className="price-sub">Por noche</span>
                      <span className="price-main">{formattedPrice}</span>
                      <span className="price-saving">Ahorra 18% directo</span>
                    </div>

                    <button 
                      onClick={() => onBookRoom(room)} 
                      className="btn-primary room-book-btn"
                    >
                      <span>Reservar</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner de Garantía Directa */}
        <div className="direct-booking-banner glass-card">
          <div className="banner-icon-box">
            <ShieldCheck size={32} className="text-gold" />
          </div>
          <div className="banner-text-box">
            <h4>¿Por qué reservar directo en Hotel Plaza Garibaldi?</h4>
            <p>
              Evitas tarifas infladas de intermediarios. Recibes atención personalizada directa con la recepción del hotel, café fresco de cortesía a tu llegada y flexibilidad garantizada para cambios.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .rooms-section {
          padding: 6rem 0;
          background: #faf8f5;
        }
        .room-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 1.75rem;
        }
        .filter-btn {
          padding: 0.6rem 1.4rem;
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          font-weight: 600;
          background: #ffffff;
          color: var(--text-secondary);
          border: 1px solid var(--border-light);
          transition: all var(--transition-fast);
        }
        .filter-btn:hover {
          color: var(--emerald-950);
          border-color: var(--emerald-600);
        }
        .filter-btn.active {
          background: var(--emerald-900);
          color: #ffffff;
          border-color: var(--emerald-900);
          box-shadow: var(--shadow-sm);
        }

        .rooms-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 2rem;
          margin-bottom: 3.5rem;
        }
        .room-card {
          display: flex;
          flex-direction: column;
        }
        .room-img-wrap {
          position: relative;
          height: 250px;
          overflow: hidden;
        }
        .room-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-smooth);
        }
        .room-card:hover .room-card-img {
          transform: scale(1.06);
        }
        .room-card-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 2;
        }
        .room-img-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 23, 20, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity var(--transition-base);
        }
        .room-card:hover .room-img-overlay {
          opacity: 1;
        }
        .btn-quick-view {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #ffffff;
          color: var(--emerald-950);
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-full);
          font-weight: 700;
          font-size: 0.85rem;
          box-shadow: var(--shadow-md);
          transform: translateY(10px);
          transition: all var(--transition-fast);
        }
        .room-card:hover .btn-quick-view {
          transform: translateY(0);
        }

        .room-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .room-type-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--gold-600);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .room-card-title {
          font-size: 1.45rem;
          color: var(--emerald-950);
          margin: 0.2rem 0;
        }
        .room-card-tagline {
          font-size: 0.88rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }
        .room-card-specs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding: 0.75rem 0;
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 1rem;
        }
        .spec-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        .room-highlights {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }
        .highlight-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .room-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-light);
        }
        .price-container {
          display: flex;
          flex-direction: column;
        }
        .price-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .price-main {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--emerald-950);
          line-height: 1.1;
        }
        .price-saving {
          font-size: 0.72rem;
          color: var(--emerald-600);
          font-weight: 700;
        }
        .room-book-btn {
          padding: 0.65rem 1.25rem;
          font-size: 0.88rem;
        }

        /* Banner Directo */
        .direct-booking-banner {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.75rem 2rem;
          background: #ffffff;
          border: 1px solid rgba(212, 175, 55, 0.3);
        }
        .banner-icon-box {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--gold-100);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .banner-text-box h4 {
          font-size: 1.25rem;
          color: var(--emerald-950);
          margin-bottom: 0.25rem;
        }
        .banner-text-box p {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .direct-booking-banner {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
