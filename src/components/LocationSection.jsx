import React from 'react';
import { MapPin, Navigation, Car, Train, Plane, Phone, Mail, Clock } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export function LocationSection() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Hotel Plaza Garibaldi Caldas Antioquia")}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent("Hotel Plaza Garibaldi Caldas")}`;

  return (
    <section id="ubicacion" className="location-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Navigation size={14} /> Localización Estratégica
          </span>
          <h2 className="section-title">
            En Pleno Parque Principal de Caldas
          </h2>
          <p className="section-subtitle">
            Situado en el punto neurálgico del municipio, con acceso directo al comercio, entidades bancarias y las principales rutas viales del sur de Antioquia.
          </p>
        </div>

        <div className="location-grid">
          {/* Tarjeta de Información & Rutas */}
          <div className="location-info-card hotel-card">
            <div className="location-header-box">
              <span className="badge-gold">Dirección Oficial</span>
              <h3 className="location-address-title">{HOTEL_INFO.address}</h3>
              <p className="location-landmark">
                Frente a la Parroquia Nuestra Señora de las Mercedes y el Parque Santander.
              </p>
            </div>

            {/* Accesos y Distancias Clave */}
            <div className="travel-times-list">
              <h4 className="times-heading">Tiempos de Llegada Aproximados</h4>

              <div className="travel-item">
                <div className="travel-icon">
                  <Train size={18} className="text-emerald" />
                </div>
                <div className="travel-info">
                  <strong>Metro de Medellín (Estación La Estrella)</strong>
                  <span>10 - 15 minutos en bus alimentador integrado o taxi.</span>
                </div>
              </div>

              <div className="travel-item">
                <div className="travel-icon">
                  <Plane size={18} className="text-emerald" />
                </div>
                <div className="travel-info">
                  <strong>Aeropuerto Olaya Herrera (Medellín)</strong>
                  <span>25 minutos vía Autopista Sur.</span>
                </div>
              </div>

              <div className="travel-item">
                <div className="travel-icon">
                  <Car size={18} className="text-emerald" />
                </div>
                <div className="travel-info">
                  <strong>Terminal de Transportes del Sur</strong>
                  <span>20 minutos de trayecto directo.</span>
                </div>
              </div>

              <div className="travel-item">
                <div className="travel-icon">
                  <Plane size={18} className="text-emerald" />
                </div>
                <div className="travel-info">
                  <strong>Aeropuerto José María Córdova (Rionegro)</strong>
                  <span>50 minutos conectando por Túnel de Oriente o Palmas.</span>
                </div>
              </div>
            </div>

            {/* Botones de Navegación GPS */}
            <div className="gps-buttons-row">
              <a 
                href={googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary gps-btn"
              >
                <MapPin size={16} />
                <span>Abrir en Google Maps</span>
              </a>

              <a 
                href={wazeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary gps-btn"
              >
                <Navigation size={16} />
                <span>Navegar con Waze</span>
              </a>
            </div>
          </div>

          {/* Mapa Visual Interactivo */}
          <div className="map-embed-wrapper hotel-card">
            <iframe 
              title="Mapa de Ubicación Hotel Plaza Garibaldi Caldas"
              src="https://maps.google.com/maps?q=Hotel%20Plaza%20Garibaldi%20Caldas%20Antioquia&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="map-iframe"
              loading="lazy"
            ></iframe>

            <div className="map-overlay-badge">
              <div className="badge-dot"></div>
              <span>Hotel Plaza Garibaldi • Parque Santander</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .location-section {
          padding: 6rem 0;
          background: #f4f0eb;
        }
        .location-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 2.5rem;
          align-items: stretch;
        }
        .location-info-card {
          padding: 2.5rem;
          background: #ffffff;
          display: flex;
          flex-direction: column;
        }
        .location-header-box {
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-light);
        }
        .location-address-title {
          font-size: 1.85rem;
          color: var(--emerald-950);
          margin: 0.5rem 0 0.3rem;
        }
        .location-landmark {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .times-heading {
          font-size: 1.05rem;
          color: var(--emerald-950);
          margin-bottom: 1.25rem;
        }
        .travel-times-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
          flex-grow: 1;
        }
        .travel-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }
        .travel-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: var(--emerald-50);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .travel-info strong {
          display: block;
          font-size: 0.92rem;
          color: var(--emerald-950);
        }
        .travel-info span {
          display: block;
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        .gps-buttons-row {
          display: flex;
          gap: 1rem;
        }
        .gps-btn {
          flex: 1;
          font-size: 0.88rem;
        }

        .map-embed-wrapper {
          position: relative;
          min-height: 480px;
          background: #eae6df;
          overflow: hidden;
        }
        .map-iframe {
          width: 100%;
          height: 100%;
          min-height: 480px;
          border: 0;
        }
        .map-overlay-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(10, 23, 20, 0.9);
          backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          font-weight: 600;
          box-shadow: var(--shadow-md);
          border: 1px solid rgba(212, 175, 55, 0.3);
        }
        .badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gold-400);
          box-shadow: 0 0 8px var(--gold-400);
        }

        @media (max-width: 900px) {
          .location-grid {
            grid-template-columns: 1fr;
          }
          .gps-buttons-row {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
