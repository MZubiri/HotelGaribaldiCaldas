import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  Monitor, 
  Coffee, 
  Utensils, 
  Sparkles, 
  Send, 
  CheckCircle,
  MessageCircle,
  Calendar
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export function EventsSection({ currency }) {
  const [attendees, setAttendees] = useState(30);
  const [eventType, setEventType] = useState('corporativo'); // 'corporativo', 'social', 'capacitacion'
  const [needsCatering, setNeedsCatering] = useState(true);
  const [needsAudiovisual, setNeedsAudiovisual] = useState(true);
  const [needsCoffeeBreak, setNeedsCoffeeBreak] = useState(true);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [formSent, setFormSent] = useState(false);

  // Precios base
  const baseHallPriceCOP = 350000;
  const pricePerAttendeeCOP = 12000;
  const coffeeBreakPerPersonCOP = 15000;
  const cateringPerPersonCOP = 35000;
  const audiovisualFlatCOP = 180000;

  let totalEstimateCOP = baseHallPriceCOP + (attendees * pricePerAttendeeCOP);
  if (needsCoffeeBreak) totalEstimateCOP += (attendees * coffeeBreakPerPersonCOP);
  if (needsCatering) totalEstimateCOP += (attendees * cateringPerPersonCOP);
  if (needsAudiovisual) totalEstimateCOP += audiovisualFlatCOP;

  const totalEstimateUSD = Math.round(totalEstimateCOP / HOTEL_INFO.exchangeRate);

  const formattedEstimate = currency === 'COP'
    ? `$${totalEstimateCOP.toLocaleString('es-CO')} COP`
    : `$${totalEstimateUSD} USD`;

  const handleWhatsAppQuote = (e) => {
    e.preventDefault();
    setFormSent(true);
    const msg = `¡Hola Hotel Plaza Garibaldi! Me interesa cotizar el Salón de Eventos:
*Tipo de Evento:* ${eventType.toUpperCase()}
*Aforo:* ${attendees} personas
*Estación de Café:* ${needsCoffeeBreak ? 'Sí' : 'No'}
*Almuerzo/Catering:* ${needsCatering ? 'Sí' : 'No'}
*Audiovisuales (Proyector/Sonido):* ${needsAudiovisual ? 'Sí' : 'No'}
*Presupuesto Estimado Web:* ${formattedEstimate}
*Contacto:* ${contactName || 'Interesado'} - ${contactPhone}

¿Podrían enviarme disponibilidad de fechas y menú detallado?`;

    window.open(`https://wa.me/${HOTEL_INFO.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="eventos" className="events-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Briefcase size={14} /> Espacios Corporativos & Sociales
          </span>
          <h2 className="section-title">
            Salón Garibaldi & Cotizador de Eventos
          </h2>
          <p className="section-subtitle">
            El lugar ideal para asambleas empresariales del sur del Valle de Aburrá, talleres de formación, juntas directivas y celebraciones familiares con vistas al Parque Principal.
          </p>
        </div>

        <div className="events-interactive-grid">
          {/* Columna Izquierda: Información del Salón */}
          <div className="hall-showcase-card hotel-card">
            <div className="hall-img-wrap">
              <img 
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1000&q=80" 
                alt="Salón de eventos Hotel Plaza Garibaldi Caldas" 
                className="hall-img"
              />
              <span className="hall-badge badge-gold">
                Capacidad: 10 a 80 Asistentes
              </span>
            </div>

            <div className="hall-content">
              <h3>Salón de Conferencias & Banquetes Garibaldi</h3>
              <p>
                Equipado con iluminación natural, climatización adecuada, silletería ejecutiva o mantelería de gala, y tecnología para presentaciones remotas de alta definición.
              </p>

              <div className="hall-perks-list">
                <div className="perk-item">
                  <Monitor size={18} className="text-emerald" />
                  <span>Proyector 4K y pantalla gigante retractil</span>
                </div>
                <div className="perk-item">
                  <Coffee size={18} className="text-emerald" />
                  <span>Servicio de estación de café continuo y repostería</span>
                </div>
                <div className="perk-item">
                  <Utensils size={18} className="text-emerald" />
                  <span>Almuerzos campestres y cenas servidas</span>
                </div>
                <div className="perk-item">
                  <Users size={18} className="text-emerald" />
                  <span>Montajes en U, auditorio, aula o mesa redonda</span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Cotizador Dinámico */}
          <div className="event-quoter-card glass-card">
            <div className="quoter-header">
              <span className="badge-emerald">Cotizador en Tiempo Real</span>
              <h3>Calcula tu Evento a Medida</h3>
              <p>Selecciona los parámetros y obtén un estimado inmediato:</p>
            </div>

            <form onSubmit={handleWhatsAppQuote} className="quoter-form">
              {/* Tipo de evento */}
              <div className="form-group">
                <label className="quoter-label">Tipo de Encuentro</label>
                <div className="event-type-pills">
                  <button 
                    type="button" 
                    onClick={() => setEventType('corporativo')}
                    className={`type-pill ${eventType === 'corporativo' ? 'active' : ''}`}
                  >
                    Empresarial / Taller
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setEventType('social')}
                    className={`type-pill ${eventType === 'social' ? 'active' : ''}`}
                  >
                    Boda / Quinceañera
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setEventType('capacitacion')}
                    className={`type-pill ${eventType === 'capacitacion' ? 'active' : ''}`}
                  >
                    Asamblea / Junta
                  </button>
                </div>
              </div>

              {/* Slider de Asistentes */}
              <div className="form-group mt-3">
                <div className="slider-label-row">
                  <label className="quoter-label">Número de Asistentes</label>
                  <span className="slider-val-badge">{attendees} Personas</span>
                </div>
                <input 
                  type="range" 
                  min={10} 
                  max={80} 
                  step={5}
                  value={attendees}
                  onChange={(e) => setAttendees(Number(e.target.value))}
                  className="attendee-slider"
                />
                <div className="slider-limits">
                  <span>Mín. 10</span>
                  <span>Máx. 80</span>
                </div>
              </div>

              {/* Servicios Adicionales */}
              <div className="quoter-checkboxes mt-3">
                <label className="check-service-row">
                  <input 
                    type="checkbox" 
                    checked={needsCoffeeBreak} 
                    onChange={(e) => setNeedsCoffeeBreak(e.target.checked)} 
                  />
                  <span>Estación de Café Permanente + Buñuelos Calientes</span>
                </label>

                <label className="check-service-row">
                  <input 
                    type="checkbox" 
                    checked={needsAudiovisual} 
                    onChange={(e) => setNeedsAudiovisual(e.target.checked)} 
                  />
                  <span>Proyector 4K + Sonido con Micrófonos Inalámbricos</span>
                </label>

                <label className="check-service-row">
                  <input 
                    type="checkbox" 
                    checked={needsCatering} 
                    onChange={(e) => setNeedsCatering(e.target.checked)} 
                  />
                  <span>Almuerzo / Menú Banquete por Persona</span>
                </label>
              </div>

              {/* Display de Estimado */}
              <div className="quoter-estimate-box">
                <span className="estimate-sub">Presupuesto Estimado Aproximado</span>
                <span className="estimate-number">{formattedEstimate}</span>
                <span className="estimate-note">*Incluye montaje de salón, mantelería básica y atención de meseros.</span>
              </div>

              {/* Datos de Contacto Rápido */}
              <div className="quoter-contact-inputs">
                <input 
                  type="text" 
                  placeholder="Tu Nombre o Empresa *" 
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="styled-input"
                  required
                />
                <input 
                  type="tel" 
                  placeholder="Celular / WhatsApp *" 
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="styled-input"
                  required
                />
              </div>

              <button type="submit" className="btn-gold quoter-submit-btn">
                <MessageCircle size={18} />
                <span>Solicitar Cotización Formal por WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .events-section {
          padding: 6rem 0;
          background: #f4f0eb;
        }
        .events-interactive-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: stretch;
        }
        .hall-showcase-card {
          display: flex;
          flex-direction: column;
        }
        .hall-img-wrap {
          position: relative;
          height: 280px;
        }
        .hall-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .hall-badge {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
        }
        .hall-content {
          padding: 2rem;
        }
        .hall-content h3 {
          font-size: 1.6rem;
          color: var(--emerald-950);
          margin-bottom: 0.75rem;
        }
        .hall-content p {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .hall-perks-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .perk-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--emerald-950);
          font-weight: 600;
        }

        /* Quoter Card */
        .event-quoter-card {
          padding: 2.25rem;
          background: #ffffff;
          border: 1px solid var(--border-gold);
        }
        .quoter-header h3 {
          font-size: 1.75rem;
          color: var(--emerald-950);
          margin: 0.4rem 0;
        }
        .quoter-header p {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
        .quoter-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--emerald-900);
          text-transform: uppercase;
          margin-bottom: 0.4rem;
          display: block;
        }
        .event-type-pills {
          display: flex;
          gap: 0.5rem;
        }
        .type-pill {
          flex: 1;
          padding: 0.55rem;
          border-radius: var(--radius-sm);
          font-size: 0.8rem;
          font-weight: 600;
          border: 1px solid var(--border-light);
          background: #fdfdfd;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        .type-pill.active {
          background: var(--emerald-900);
          color: #ffffff;
          border-color: var(--emerald-900);
        }

        .slider-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .slider-val-badge {
          background: var(--gold-100);
          color: var(--gold-700);
          font-weight: 800;
          font-size: 0.85rem;
          padding: 0.2rem 0.6rem;
          border-radius: var(--radius-full);
        }
        .attendee-slider {
          width: 100%;
          height: 6px;
          border-radius: 4px;
          accent-color: var(--gold-500);
          cursor: pointer;
        }
        .slider-limits {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        .quoter-checkboxes {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .check-service-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: var(--text-secondary);
          cursor: pointer;
        }
        .check-service-row input {
          accent-color: var(--emerald-800);
          width: 16px;
          height: 16px;
        }

        .quoter-estimate-box {
          background: var(--emerald-50);
          border: 1px solid var(--emerald-100);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          text-align: center;
          margin: 1.5rem 0;
        }
        .estimate-sub {
          display: block;
          font-size: 0.78rem;
          text-transform: uppercase;
          color: var(--emerald-800);
          font-weight: 700;
        }
        .estimate-number {
          display: block;
          font-size: 2rem;
          font-weight: 800;
          color: var(--emerald-950);
          line-height: 1.2;
          margin: 0.2rem 0;
        }
        .estimate-note {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .quoter-contact-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }
        .quoter-submit-btn {
          width: 100%;
          padding: 0.9rem;
          font-size: 0.95rem;
        }

        @media (max-width: 900px) {
          .events-interactive-grid {
            grid-template-columns: 1fr;
          }
          .quoter-contact-inputs {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
