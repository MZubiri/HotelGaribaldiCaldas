import React from 'react';
import { MapPin, Phone, Mail, Navigation, Car, Train, Plane, Clock } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export function ContactPage() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Hotel Plaza Garibaldi Caldas Antioquia")}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent("Hotel Plaza Garibaldi Caldas")}`;

  return (
    <div className="contact-editorial-page">
      <section className="contact-hero">
        <div className="container-narrow text-center">
          <span className="editorial-eyebrow">Localización & Llegada</span>
          <h1 className="editorial-title">Ubicación & Contacto</h1>
          <div className="gold-divider"></div>
          <p className="editorial-intro">
            Situado exactamente frente al Parque Principal de Caldas (Parque Santander) y la Parroquia Nuestra Señora de las Mercedes. Un enclave privilegiado de fácil acceso desde la Autopista Sur y el Metro de Medellín.
          </p>
        </div>
      </section>

      <section className="contact-content-section">
        <div className="container">
          <div className="contact-split-grid">
            {/* Columna Izquierda: Información de Llegada */}
            <div className="contact-info-col">
              <div className="info-block">
                <span className="info-label">Dirección Postal</span>
                <h3 className="info-title">{HOTEL_INFO.address}</h3>
                <p className="info-sub">Caldas, Antioquia, Colombia • Código Postal 055440</p>
              </div>

              <div className="routes-guide-box">
                <h4>Itinerarios de Llegada Recomendados</h4>

                <div className="route-item">
                  <Train size={18} className="text-gold" />
                  <div>
                    <strong>Desde Metro de Medellín (Estación La Estrella)</strong>
                    <p>10 a 15 minutos en bus alimentador integrado Caldas-Metro o taxi directo.</p>
                  </div>
                </div>

                <div className="route-item">
                  <Plane size={18} className="text-gold" />
                  <div>
                    <strong>Desde Aeropuerto Olaya Herrera (Medellín)</strong>
                    <p>25 minutos vía Autopista Sur / Variante Caldas en sentido norte-sur.</p>
                  </div>
                </div>

                <div className="route-item">
                  <Plane size={18} className="text-gold" />
                  <div>
                    <strong>Desde Aeropuerto José María Córdova (Rionegro)</strong>
                    <p>50 minutos conectando por Túnel de Oriente hacia el sur del Valle de Aburrá.</p>
                  </div>
                </div>
              </div>

              <div className="channels-box">
                <div className="channel-row">
                  <Phone size={16} className="text-gold" />
                  <div>
                    <span>Recepción 24 Horas:</span>
                    <strong>{HOTEL_INFO.phonePrimary} / {HOTEL_INFO.phoneSecondary}</strong>
                  </div>
                </div>
                <div className="channel-row">
                  <Mail size={16} className="text-gold" />
                  <div>
                    <span>Correo Electrónico:</span>
                    <strong>{HOTEL_INFO.email}</strong>
                  </div>
                </div>
              </div>

              <div className="gps-actions-row">
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-luxury-primary">
                  <MapPin size={16} /> Abrir en Google Maps
                </a>
                <a href={wazeUrl} target="_blank" rel="noopener noreferrer" className="btn-luxury-outline">
                  <Navigation size={16} /> Navegar en Waze
                </a>
              </div>
            </div>

            {/* Columna Derecha: Mapa Limpio */}
            <div className="contact-map-col">
              <div className="map-frame">
                <iframe 
                  title="Mapa Satelital Hotel Plaza Garibaldi Caldas"
                  src="https://maps.google.com/maps?q=Hotel%20Plaza%20Garibaldi%20Caldas%20Antioquia&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="map-iframe-elem"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .contact-editorial-page {
          background-color: var(--color-bone);
          padding-bottom: 8rem;
        }
        .contact-hero {
          padding: 6rem 0 4rem;
          background-color: #ffffff;
          border-bottom: 1px solid var(--border-subtle);
        }
        .contact-content-section {
          padding: 6rem 0;
        }
        .contact-split-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 4.5rem;
          align-items: stretch;
        }
        .contact-info-col {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }
        .info-label {
          font-size: 0.78rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-gold-dark);
          font-weight: 700;
          display: block;
          margin-bottom: 0.35rem;
        }
        .info-title {
          font-size: 2rem;
          color: var(--color-text-title);
          margin-bottom: 0.25rem;
        }
        .info-sub {
          font-size: 0.95rem;
          color: var(--color-text-muted);
        }

        .routes-guide-box {
          background: #ffffff;
          padding: 2.25rem;
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          box-shadow: var(--shadow-editorial);
        }
        .routes-guide-box h4 {
          font-size: 1.15rem;
          color: var(--color-text-title);
          margin-bottom: 0.5rem;
        }
        .route-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .route-item strong {
          display: block;
          font-size: 0.92rem;
          color: var(--color-primary);
        }
        .route-item p {
          font-size: 0.85rem;
          color: var(--color-text-body);
        }

        .channels-box {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.5rem;
          background: #ffffff;
          border-left: 3px solid var(--color-gold);
        }
        .channel-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .channel-row span {
          display: block;
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }
        .channel-row strong {
          display: block;
          font-size: 0.95rem;
          color: var(--color-primary);
        }

        .gps-actions-row {
          display: flex;
          gap: 1rem;
        }

        .map-frame {
          height: 100%;
          min-height: 520px;
          border: 1px solid var(--border-line);
          box-shadow: var(--shadow-editorial);
        }
        .map-iframe-elem {
          width: 100%;
          height: 100%;
          min-height: 520px;
          border: 0;
        }

        @media (max-width: 992px) {
          .contact-split-grid {
            grid-template-columns: 1fr;
          }
          .map-frame {
            min-height: 380px;
          }
          .gps-actions-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
