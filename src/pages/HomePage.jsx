import React from 'react';
import { ArrowRight, Star, Shield, MapPin, Coffee, Sparkles } from 'lucide-react';
import { HOTEL_INFO, INITIAL_ROOMS } from '../data/hotelData';

export function HomePage({ onNavigate, onOpenBooking, currency }) {
  const signatureRooms = INITIAL_ROOMS.filter(r => r.category === 'deluxe' || r.category === 'familiar').slice(0, 2);

  const formatMoney = (amountCOP, amountUSD) => {
    return currency === 'COP'
      ? `$${amountCOP.toLocaleString('es-CO')} COP`
      : `$${amountUSD} USD`;
  };

  return (
    <div className="home-editorial-page">
      {/* 1. CINEMATIC HERO */}
      <section className="hero-editorial">
        <div className="hero-image-backdrop">
          <img 
            src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=2000&q=85" 
            alt="Vistas al Parque Principal Hotel Plaza Garibaldi" 
            className="hero-img-element"
          />
          <div className="hero-dark-scrim"></div>
        </div>

        <div className="container hero-editorial-content">
          <span className="hero-sub-eyebrow">
            Caldas, Antioquia • Frente al Parque Santander
          </span>
          <h1 className="hero-headline">
            El arte de pausar frente a la plaza.
          </h1>
          <p className="hero-caption">
            Hospitalidad boutique de cuatro estrellas en el corazón tradicional del sur del Valle de Aburrá. Vistas a la catedral colonial, balcón al parque y café de origen recién tostado.
          </p>

          <div className="hero-actions-group">
            <button onClick={() => onOpenBooking()} className="btn-luxury-gold">
              Consultar Disponibilidad
            </button>
            <button onClick={() => onNavigate('rooms')} className="btn-luxury-outline hero-btn-outline">
              Explorar Habitaciones
            </button>
          </div>
        </div>
      </section>

      {/* 2. HISTORIA & ATMÓSFERA */}
      <section className="story-editorial-section">
        <div className="container-narrow text-center">
          <span className="editorial-eyebrow">Atmósfera Garibaldi</span>
          <h2 className="editorial-title">Un refugio donde confluyen la memoria y el confort contemporáneo</h2>
          <div className="gold-divider"></div>
          <p className="editorial-intro">
            Frente al templo de Nuestra Señora de las Mercedes, el Hotel Plaza Garibaldi fue concebido para quienes buscan una experiencia auténtica y sosegada en Antioquia. Lejos del bullicio metropolitano pero a tan solo quince minutos del Metro de Medellín, somos la antesala serena a los pueblos cafeteros del Suroeste y el hogar de descanso preferido por empresarios e ingenieros de la región.
          </p>
        </div>
      </section>

      {/* 3. HABITACIONES INSIGNIA */}
      <section className="signature-rooms-section">
        <div className="container">
          <div className="editorial-header">
            <span className="editorial-eyebrow">Acomodaciones</span>
            <h2 className="editorial-title">Estancias de Autor</h2>
            <p className="editorial-intro">Espacios bañados por luz natural, maderas nobles y silencio garantizado.</p>
          </div>

          <div className="signature-rooms-grid">
            {signatureRooms.map(room => (
              <div key={room.id} className="signature-room-card">
                <div className="room-card-photo-wrap">
                  <img src={room.image} alt={room.name} className="room-card-photo" />
                  <span className="room-dimension-tag">{room.size} • {room.beds}</span>
                </div>

                <div className="room-card-details">
                  <div className="room-title-row">
                    <h3 className="room-card-name">{room.name}</h3>
                    <span className="room-rate-tag">
                      {formatMoney(room.priceCOP, room.priceUSD)} <small>/ noche</small>
                    </span>
                  </div>

                  <p className="room-card-desc">{room.description}</p>

                  <div className="room-amenities-pills">
                    {room.amenities.slice(0, 3).map((am, i) => (
                      <span key={i} className="amenity-mini-tag">• {am}</span>
                    ))}
                  </div>

                  <div className="room-card-actions">
                    <button 
                      onClick={() => onOpenBooking(room)} 
                      className="btn-luxury-primary"
                    >
                      Reservar Habitación
                    </button>
                    <button 
                      onClick={() => onNavigate('rooms')} 
                      className="btn-luxury-text"
                    >
                      Detalles & Galería <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <button onClick={() => onNavigate('rooms')} className="btn-luxury-outline">
              Ver Catálogo Completo de Habitaciones
            </button>
          </div>
        </div>
      </section>

      {/* 4. RITUAL DEL CAFÉ & TERRAZA */}
      <section className="coffee-ritual-section">
        <div className="container">
          <div className="ritual-split-grid">
            <div className="ritual-text-content">
              <span className="editorial-eyebrow">Cortesía de la Casa</span>
              <h2 className="ritual-heading">El ritual matutino frente a la catedral</h2>
              <div className="gold-divider" style={{ margin: '1.25rem 0' }}></div>
              <p>
                Cada amanecer en Garibaldi comienza con el vapor aromático del café de origen suave lavado, cultivado en las laderas montañosas de Fredonia y Caldas, acompañado de buñuelos tradicionales dorados y crujientes.
              </p>
              <p>
                Nuestra terraza sobre el Parque Santander se convierte en el mirador privilegiado para contemplar el despertar de la vida pueblerina, leer o sostener un diálogo apacible.
              </p>
              <button onClick={() => onNavigate('gastronomy')} className="btn-luxury-outline mt-3">
                Conocer Café & Gastronomía
              </button>
            </div>

            <div className="ritual-media-wrap">
              <img 
                src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1000&q=80" 
                alt="Café de origen en terraza Caldas" 
                className="ritual-main-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. CITA & TESTIMONIO EDITORIAL */}
      <section className="editorial-quote-section">
        <div className="container-narrow text-center">
          <span className="quote-mark">“</span>
          <blockquote className="quote-text">
            Tomar el café de la mañana en el balcón mientras las campanas de la iglesia de Caldas suenan suavemente en la plaza es una de las experiencias más auténticas y reconfortantes de Antioquia.
          </blockquote>
          <cite className="quote-author">
            Carlos Mario Restrepo • Huésped en Habitación Deluxe
          </cite>
        </div>
      </section>

      <style>{`
        .hero-editorial {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          color: #ffffff;
          padding: 6rem 0;
        }
        .hero-image-backdrop {
          position: absolute;
          inset: 0;
          z-index: 1;
        }
        .hero-img-element {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        .hero-dark-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(14, 32, 26, 0.65) 0%,
            rgba(14, 32, 26, 0.85) 60%,
            rgba(14, 32, 26, 0.95) 100%
          );
        }
        .hero-editorial-content {
          position: relative;
          z-index: 2;
          max-width: 820px;
        }
        .hero-sub-eyebrow {
          display: block;
          font-size: 0.82rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--color-gold);
          margin-bottom: 1.25rem;
          font-weight: 600;
        }
        .hero-headline {
          font-size: 4.2rem;
          color: #ffffff;
          font-weight: 500;
          line-height: 1.08;
          margin-bottom: 1.5rem;
        }
        .hero-caption {
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.7;
          margin-bottom: 2.5rem;
          max-width: 680px;
        }
        .hero-actions-group {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
        }
        .hero-btn-outline {
          color: #ffffff !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
        }
        .hero-btn-outline:hover {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: #ffffff !important;
        }

        /* Story Section */
        .story-editorial-section {
          padding: 8rem 0;
          background-color: var(--color-bone);
        }
        .text-center { text-align: center; }

        /* Signature Rooms */
        .signature-rooms-section {
          padding: 6rem 0 8rem;
          background-color: #ffffff;
        }
        .signature-rooms-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
        }
        .signature-room-card {
          display: flex;
          flex-direction: column;
          background: var(--color-bone);
          border: 1px solid var(--border-subtle);
          transition: all var(--transition-smooth);
        }
        .signature-room-card:hover {
          box-shadow: var(--shadow-hover);
          transform: translateY(-4px);
        }
        .room-card-photo-wrap {
          position: relative;
          height: 340px;
          overflow: hidden;
        }
        .room-card-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .signature-room-card:hover .room-card-photo {
          transform: scale(1.05);
        }
        .room-dimension-tag {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          background: rgba(14, 32, 26, 0.85);
          color: #ffffff;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.35rem 0.8rem;
          backdrop-filter: blur(4px);
        }
        .room-card-details {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .room-title-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.85rem;
        }
        .room-card-name {
          font-size: 1.65rem;
          color: var(--color-text-title);
        }
        .room-rate-tag {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--color-gold-dark);
        }
        .room-rate-tag small {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          font-weight: 400;
        }
        .room-card-desc {
          font-size: 0.94rem;
          color: var(--color-text-body);
          line-height: 1.65;
          margin-bottom: 1.25rem;
        }
        .room-amenities-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2rem;
          font-size: 0.82rem;
          color: var(--color-text-muted);
        }
        .room-card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-subtle);
        }

        /* Coffee Ritual */
        .coffee-ritual-section {
          padding: 8rem 0;
          background-color: var(--color-canvas);
        }
        .ritual-split-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .ritual-heading {
          font-size: 2.75rem;
          color: var(--color-text-title);
          line-height: 1.15;
        }
        .ritual-text-content p {
          font-size: 1rem;
          color: var(--color-text-body);
          line-height: 1.75;
          margin-bottom: 1.25rem;
        }
        .ritual-media-wrap {
          height: 480px;
          overflow: hidden;
          box-shadow: var(--shadow-editorial);
        }
        .ritual-main-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Quote */
        .editorial-quote-section {
          padding: 8rem 0;
          background-color: var(--color-primary);
          color: #ffffff;
        }
        .quote-mark {
          font-family: var(--font-serif);
          font-size: 5rem;
          color: var(--color-gold);
          display: block;
          line-height: 0.6;
          margin-bottom: 1rem;
        }
        .quote-text {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-style: italic;
          color: #ffffff;
          line-height: 1.35;
          margin-bottom: 2rem;
        }
        .quote-author {
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-gold);
          display: block;
        }
        .mt-3 { margin-top: 1rem; }
        .mt-5 { margin-top: 3.5rem; }

        @media (max-width: 992px) {
          .hero-headline { font-size: 2.85rem; }
          .signature-rooms-grid { grid-template-columns: 1fr; }
          .ritual-split-grid { grid-template-columns: 1fr; gap: 3rem; }
          .ritual-media-wrap { height: 350px; }
          .quote-text { font-size: 1.6rem; }
        }

        @media (max-width: 600px) {
          .hero-editorial {
            min-height: 80vh;
            padding: 5rem 0 3rem;
          }
          .hero-headline {
            font-size: 2.1rem;
            line-height: 1.15;
          }
          .hero-caption {
            font-size: 0.95rem;
            margin-bottom: 2rem;
          }
          .hero-actions-group {
            flex-direction: column;
            width: 100%;
            gap: 0.75rem;
          }
          .hero-actions-group button {
            width: 100%;
            text-align: center;
          }
          .coffee-ritual-section, .editorial-quote-section {
            padding: 4rem 0;
          }
          .quote-text {
            font-size: 1.35rem;
          }
          .room-card-actions {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
          }
          .room-card-actions button {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
