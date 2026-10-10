import React from 'react';
import { Coffee, Utensils, Sparkles, Clock, Wine, Heart } from 'lucide-react';
import { HOTEL_SERVICES } from '../data/hotelData';

export function GastroSection() {
  return (
    <section id="servicios" className="gastro-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Coffee size={14} /> Sabor y Tradición Antioqueña
          </span>
          <h2 className="section-title">
            Café Terraza & Servicios Exclusivos
          </h2>
          <p className="section-subtitle">
            Vive la experiencia de comenzar tu mañana con el aroma a café recién tostado de nuestras montañas y buñuelos recién hechos, contemplando el despertar del Parque Santander.
          </p>
        </div>

        {/* Feature Banner: Café de Origen & Terraza */}
        <div className="gastro-feature-card glass-card">
          <div className="gastro-text">
            <span className="badge-gold">
              <Sparkles size={12} /> Tradición de la Casa
            </span>
            <h3>El Ritual del Café Frente a la Plaza</h3>
            <p>
              En Hotel Plaza Garibaldi honramos la hospitalidad paisa. Todos nuestros huéspedes disfrutan de café de origen suave lavado y buñuelos tradicionales crujientes como bienvenida matutina.
            </p>
            <p>
              Nuestra terraza panorámica te ofrece la mejor vista de la vida pueblerina, ideal para una reunión informal de negocios o una tarde de descanso leyendo un buen libro al fresco de la montaña.
            </p>

            <div className="gastro-highlights-row">
              <div className="gastro-mini-item">
                <Coffee size={20} className="text-gold" />
                <div>
                  <strong>Café Especial 100% Caldense</strong>
                  <span>Tostión media artesanal</span>
                </div>
              </div>
              <div className="gastro-mini-item">
                <Clock size={20} className="text-gold" />
                <div>
                  <strong>Room Service 24 Horas</strong>
                  <span>Bebidas y snacks a tu habitación</span>
                </div>
              </div>
            </div>
          </div>

          <div className="gastro-image-gallery">
            <img 
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80" 
              alt="Café de origen en terraza Caldas" 
              className="gastro-img main"
            />
            <div className="gastro-img-subgrid">
              <img 
                src="https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80" 
                alt="Terraza al atardecer" 
                className="gastro-img"
              />
              <img 
                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80" 
                alt="Desayuno tradicional antioqueño" 
                className="gastro-img"
              />
            </div>
          </div>
        </div>

        {/* Grilla de Servicios Generales del Hotel */}
        <div className="services-grid-wrap mt-5">
          <h3 className="services-grid-title">Servicios que Garantizan tu Bienestar</h3>
          <div className="hotel-services-grid">
            {HOTEL_SERVICES.map((srv, idx) => (
              <div key={idx} className="service-card hotel-card">
                <div className="service-icon-wrap">
                  <Coffee size={22} className="text-gold" />
                </div>
                <h4 className="service-name">{srv.name}</h4>
                <p className="service-desc">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .gastro-section {
          padding: 6rem 0;
          background: #faf8f5;
        }
        .gastro-feature-card {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 3rem;
          padding: 3rem;
          background: #ffffff;
          border: 1px solid var(--border-gold);
          align-items: center;
        }
        .gastro-text h3 {
          font-size: 2.2rem;
          color: var(--emerald-950);
          margin: 0.5rem 0 1rem;
        }
        .gastro-text p {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 1rem;
        }
        .gastro-highlights-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-top: 1.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-light);
        }
        .gastro-mini-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .gastro-mini-item strong {
          display: block;
          font-size: 0.92rem;
          color: var(--emerald-950);
        }
        .gastro-mini-item span {
          display: block;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .gastro-image-gallery {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .gastro-img {
          width: 100%;
          border-radius: var(--radius-md);
          object-fit: cover;
          box-shadow: var(--shadow-sm);
        }
        .gastro-img.main {
          height: 240px;
        }
        .gastro-img-subgrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .gastro-img-subgrid .gastro-img {
          height: 140px;
        }

        .mt-5 {
          margin-top: 5rem;
        }
        .services-grid-title {
          text-align: center;
          font-size: 1.85rem;
          color: var(--emerald-950);
          margin-bottom: 2.5rem;
        }
        .hotel-services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.5rem;
        }
        .service-card {
          padding: 1.75rem;
          background: #ffffff;
        }
        .service-icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: var(--emerald-50);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;
        }
        .service-name {
          font-size: 1.1rem;
          color: var(--emerald-950);
          margin-bottom: 0.4rem;
        }
        .service-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .gastro-feature-card {
            grid-template-columns: 1fr;
            padding: 2rem;
          }
          .gastro-highlights-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
