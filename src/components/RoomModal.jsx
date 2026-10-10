import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Users, 
  Maximize2, 
  Bed, 
  Sparkles, 
  ShieldCheck, 
  Calendar,
  Clock,
  Coffee,
  ArrowRight
} from 'lucide-react';

export function RoomModal({ 
  room, 
  onClose, 
  onBookRoom, 
  currency, 
  language 
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!room) return null;

  const roomName = room.name || room.type || "Habitación";
  const roomTagline = room.tagline || (room.floor ? `Nivel ${room.floor} • Vista al Parque Principal` : "Estancia de Confort");
  const roomBadge = room.badge || (room.category === 'deluxe' ? 'Exclusiva con Balcón' : 'Alojamiento 4 Estrellas');
  const galleryList = (room.gallery && room.gallery.length > 0) ? room.gallery : [room.image || "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"];
  const featuresList = room.features || room.amenities || [
    "WiFi Fibra Óptica 300 Mbps",
    "Smart TV 43'' con streaming",
    "Baño privado con ducha de agua caliente",
    "Café de especialidad de cortesía"
  ];

  const formattedPrice = currency === 'COP'
    ? `$${(room.priceCOP || 140000).toLocaleString('es-CO')} COP`
    : `$${room.priceUSD || 35} USD`;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content room-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Botón Cerrar */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Cerrar modal">
          <X size={22} />
        </button>

        {/* Galería de Fotos */}
        <div className="modal-gallery">
          <div className="modal-main-img-wrap">
            <img 
              src={galleryList[activeImageIndex] || galleryList[0]} 
              alt={roomName} 
              className="modal-main-img"
            />
            <div className="modal-badge-float badge-gold">
              <Sparkles size={13} /> {roomBadge}
            </div>
          </div>

          {galleryList.length > 1 && (
            <div className="modal-thumbnails">
              {galleryList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`modal-thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                >
                  <img src={img} alt={`Miniatura ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información y Detalles de la Habitación */}
        <div className="modal-body-content">
          <div className="modal-header-row">
            <div>
              <span className="room-modal-tagline">{roomTagline}</span>
              <h2 className="room-modal-title">{roomName}</h2>
            </div>
            <div className="room-modal-price-box">
              <span className="price-label">Tarifa Directa / noche</span>
              <span className="price-amount">{formattedPrice}</span>
              <span className="price-tax-note">Impuestos incluidos</span>
            </div>
          </div>

          {/* Quick Specs */}
          <div className="room-specs-grid">
            <div className="spec-pill">
              <Users size={16} className="text-emerald" />
              <span>{typeof room.capacity === 'number' ? `Hasta ${room.capacity} Personas` : (room.capacity || '2 Personas')}</span>
            </div>
            <div className="spec-pill">
              <Bed size={16} className="text-emerald" />
              <span>{room.beds || '1 Cama Queen'}</span>
            </div>
            <div className="spec-pill">
              <Maximize2 size={16} className="text-emerald" />
              <span>{room.size || '25 m²'}</span>
            </div>
            <div className="spec-pill">
              <Coffee size={16} className="text-gold" />
              <span>Café de cortesía</span>
            </div>
          </div>

          <p className="room-modal-desc">
            {room.description || "Disfruta de una estancia de descanso profundo en el corazón histórico de Caldas, Antioquia."}
          </p>

          {/* Lista Completa de Comodidades */}
          <div className="room-modal-features">
            <h3 className="features-title">Comodidades y Servicios Incluidos</h3>
            <div className="features-list">
              {featuresList.map((feat, i) => (
                <div key={i} className="feature-item">
                  <div className="feature-icon-circle">
                    <Check size={13} />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Políticas Clave */}
          <div className="room-policies-box">
            <div className="policy-row">
              <Clock size={16} className="text-emerald" />
              <span><strong>Check-in:</strong> 14:00 | <strong>Check-out:</strong> 12:00</span>
            </div>
            <div className="policy-row">
              <ShieldCheck size={16} className="text-emerald" />
              <span><strong>Cancelación:</strong> Flexible sin costo hasta 24 horas antes de la llegada.</span>
            </div>
          </div>

          {/* CTA de Reserva */}
          <div className="modal-cta-row">
            <button 
              onClick={() => { onClose(); onBookRoom(room); }} 
              className="btn-gold modal-book-btn"
            >
              <span>Reservar con Tarifa Exclusiva ({formattedPrice})</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .room-modal-box {
          max-width: 800px;
          overflow: hidden;
        }
        .modal-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(10, 23, 20, 0.7);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          transition: background var(--transition-fast);
        }
        .modal-close-btn:hover {
          background: var(--emerald-950);
        }
        .modal-gallery {
          position: relative;
        }
        .modal-main-img-wrap {
          position: relative;
          height: 340px;
          background: #111;
        }
        .modal-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .modal-badge-float {
          position: absolute;
          bottom: 1rem;
          left: 1.5rem;
          box-shadow: var(--shadow-md);
        }
        .modal-thumbnails {
          display: flex;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: #f4f0eb;
        }
        .modal-thumb-btn {
          width: 64px;
          height: 48px;
          border-radius: 6px;
          overflow: hidden;
          opacity: 0.6;
          border: 2px solid transparent;
          transition: all var(--transition-fast);
        }
        .modal-thumb-btn.active {
          opacity: 1;
          border-color: var(--gold-500);
        }
        .modal-thumb-btn img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .modal-body-content {
          padding: 1.75rem;
        }
        .modal-header-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .room-modal-tagline {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--gold-600);
          font-weight: 700;
        }
        .room-modal-title {
          font-size: 2rem;
          color: var(--emerald-950);
          margin-top: 0.2rem;
        }
        .room-modal-price-box {
          text-align: right;
          background: var(--emerald-50);
          border: 1px solid var(--emerald-100);
          padding: 0.6rem 1rem;
          border-radius: var(--radius-md);
          min-width: 170px;
        }
        .price-label {
          display: block;
          font-size: 0.75rem;
          color: var(--emerald-800);
          font-weight: 600;
        }
        .price-amount {
          display: block;
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--emerald-950);
        }
        .price-tax-note {
          display: block;
          font-size: 0.7rem;
          color: var(--text-muted);
        }
        .room-specs-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }
        .spec-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #f7f9f8;
          border: 1px solid rgba(19, 46, 39, 0.08);
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--emerald-900);
        }
        .text-emerald {
          color: var(--emerald-700);
        }
        .room-modal-desc {
          font-size: 0.98rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .room-modal-features {
          margin-bottom: 1.5rem;
        }
        .features-title {
          font-size: 1.1rem;
          color: var(--emerald-950);
          margin-bottom: 0.75rem;
          font-weight: 700;
        }
        .features-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 0.5rem 1rem;
        }
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }
        .feature-icon-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--emerald-100);
          color: var(--emerald-800);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .room-policies-box {
          background: #f9faf9;
          border: 1px solid rgba(19, 46, 39, 0.08);
          border-radius: var(--radius-md);
          padding: 0.9rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          font-size: 0.85rem;
        }
        .policy-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-secondary);
        }
        .modal-cta-row {
          display: flex;
          justify-content: flex-end;
        }
        .modal-book-btn {
          width: 100%;
          padding: 1rem 2rem;
          font-size: 1.05rem;
        }

        @media (max-width: 650px) {
          .modal-header-row {
            flex-direction: column;
            gap: 0.75rem;
          }
          .room-modal-title {
            font-size: 1.55rem;
          }
          .room-modal-price-box {
            text-align: left;
            width: 100%;
          }
          .modal-main-img-wrap {
            height: 220px;
          }
          .modal-body-content {
            padding: 1.25rem 1rem;
          }
          .room-specs-grid {
            gap: 0.5rem;
          }
          .spec-pill {
            font-size: 0.78rem;
            padding: 0.4rem 0.65rem;
          }
          .features-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
