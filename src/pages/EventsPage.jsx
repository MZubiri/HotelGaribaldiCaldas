import React, { useState } from 'react';
import { Monitor, Users, Coffee, Utensils, Check, Send, Download, FileText } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export function EventsPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    date: '',
    attendees: 30,
    layout: 'auditorio',
    services: ['coffee_break'],
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const roomCapacities = [
    { layout: "Auditorio", capacity: "Hasta 80 Personas", desc: "Silletería ejecutiva alineada con pasillo central. Ideal para asambleas y conferencias." },
    { layout: "Banquete Formal", capacity: "Hasta 60 Personas", desc: "Mesas redondas vestidas con mantelería de gala para celebraciones y cenas servidas." },
    { layout: "Tipo Escuela / Aula", capacity: "Hasta 45 Personas", desc: "Mesas corridas con conexión eléctrica y material de papelería para capacitaciones." },
    { layout: "Mesa Imperial / Herradura (U)", capacity: "Hasta 30 Personas", desc: "Disposición directiva para juntas corporativas, asambleas de copropietarios y debates." }
  ];

  const handleSubmitRFP = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const text = `Solicitud de Propuesta para Evento - Hotel Plaza Garibaldi
*Contacto:* ${formData.name} (${formData.company || 'Particular'})
*Teléfono:* ${formData.phone}
*Email:* ${formData.email}
*Fecha Tentativa:* ${formData.date || 'Por definir'}
*Asistentes:* ${formData.attendees} personas
*Montaje Deseado:* ${formData.layout.toUpperCase()}
*Notas:* ${formData.notes || 'Ninguna'}

Agradezco me envíen la disponibilidad del Salón Garibaldi y propuesta formal.`;

    window.open(`https://wa.me/${HOTEL_INFO.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="events-editorial-page">
      {/* Portada */}
      <section className="events-hero">
        <div className="container-narrow text-center">
          <span className="editorial-eyebrow">Encuentros de Nivel</span>
          <h1 className="editorial-title">Salón de Eventos Garibaldi</h1>
          <div className="gold-divider"></div>
          <p className="editorial-intro">
            Un espacio diáfano y versátil diseñado para asambleas corporativas, juntas directivas y recepciones íntimas en el sur del Valle de Aburrá. Tecnología audiovisual de vanguardia y gastronomía a la medida.
          </p>
        </div>
      </section>

      {/* Imagen Principal del Salón */}
      <section className="hall-image-showcase">
        <div className="container">
          <div className="hall-main-frame">
            <img 
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1600&q=85" 
              alt="Salón de eventos Hotel Plaza Garibaldi" 
              className="hall-frame-img"
            />
          </div>
        </div>
      </section>

      {/* Tabla de Aforos y Distribuciones */}
      <section className="capacities-table-section">
        <div className="container">
          <div className="editorial-header">
            <span className="editorial-eyebrow">Capacidades & Formatos</span>
            <h2 className="editorial-title">Distribuciones del Salón</h2>
            <p className="editorial-intro">Adaptamos el mobiliario según el objetivo pedagógico o protocolario de tu reunión.</p>
          </div>

          <div className="capacities-grid">
            {roomCapacities.map((cap, i) => (
              <div key={i} className="capacity-card">
                <span className="capacity-number">{cap.capacity}</span>
                <h3 className="capacity-layout-name">{cap.layout}</h3>
                <p className="capacity-desc">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipamiento Técnico Incluido */}
      <section className="tech-specs-section">
        <div className="container">
          <div className="tech-split-card">
            <div className="tech-text-col">
              <span className="editorial-eyebrow">Dotación Tecnológica</span>
              <h2 className="tech-title">Equipamiento Profesional para tus Reuniones</h2>
              <div className="gold-divider" style={{ margin: '1.25rem 0' }}></div>

              <div className="tech-points-list">
                <div className="tech-point">
                  <Monitor size={18} className="text-gold" />
                  <div>
                    <strong>Proyección 4K & Pantalla Eléctrica</strong>
                    <p>Conectividad HDMI inalámbrica y por cable compatible con cualquier portátil.</p>
                  </div>
                </div>
                <div className="tech-point">
                  <Coffee size={18} className="text-gold" />
                  <div>
                    <strong>Estación de Café de Origen Permanente</strong>
                    <p>Servicio continuo de café filtrado, aromáticas naturales y galletas de mantequilla.</p>
                  </div>
                </div>
                <div className="tech-point">
                  <Utensils size={18} className="text-gold" />
                  <div>
                    <strong>Catering & Almuerzos Ejecutivos</strong>
                    <p>Menús concertados de cocina tradicional antioqueña o cortes especiales servidos en mesa.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de Cotización RFP */}
            <div className="rfp-form-col">
              <div className="rfp-box">
                <h3>Solicitar Propuesta para tu Evento</h3>
                <p className="rfp-subtitle">Completa los datos y te enviaremos dossier y presupuesto en menos de 2 horas:</p>

                <form onSubmit={handleSubmitRFP} className="rfp-form-stack">
                  <div className="rfp-field">
                    <label>Nombre del Organizador *</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Gloria Henao" 
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required 
                    />
                  </div>

                  <div className="rfp-field">
                    <label>Empresa o Razón Social</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Manufacturas del Sur S.A.S." 
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                    />
                  </div>

                  <div className="rfp-row-2">
                    <div className="rfp-field">
                      <label>Teléfono / WhatsApp *</label>
                      <input 
                        type="tel" 
                        placeholder="+57 300 123 4567" 
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        required 
                      />
                    </div>
                    <div className="rfp-field">
                      <label>Correo Electrónico *</label>
                      <input 
                        type="email" 
                        placeholder="evento@empresa.com" 
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        required 
                      />
                    </div>
                  </div>

                  <div className="rfp-row-2">
                    <div className="rfp-field">
                      <label>Número Estimado de Asistentes</label>
                      <input 
                        type="number" 
                        min="10" 
                        max="80" 
                        value={formData.attendees}
                        onChange={e => setFormData({ ...formData, attendees: e.target.value })}
                      />
                    </div>
                    <div className="rfp-field">
                      <label>Montaje Preferido</label>
                      <select 
                        value={formData.layout}
                        onChange={e => setFormData({ ...formData, layout: e.target.value })}
                      >
                        <option value="auditorio">Auditorio (Hasta 80)</option>
                        <option value="banquete">Banquete (Hasta 60)</option>
                        <option value="aula">Aula / Escuela (Hasta 45)</option>
                        <option value="imperial">Mesa Imperial / U (Hasta 30)</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn-luxury-primary w-full mt-2">
                    Enviar Solicitud a Gerencia
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .events-editorial-page {
          background-color: var(--color-bone);
          padding-bottom: 8rem;
        }
        .events-hero {
          padding: 6rem 0 3.5rem;
          background-color: #ffffff;
        }
        .hall-image-showcase {
          padding: 2rem 0 5rem;
        }
        .hall-main-frame {
          height: 480px;
          overflow: hidden;
          box-shadow: var(--shadow-editorial);
        }
        .hall-frame-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Capacities */
        .capacities-table-section {
          padding: 5rem 0;
          background-color: var(--color-canvas);
        }
        .capacities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 2rem;
        }
        .capacity-card {
          background: #ffffff;
          padding: 2.5rem 2rem;
          border: 1px solid var(--border-subtle);
          border-top: 3px solid var(--color-gold);
          transition: transform var(--transition-smooth);
        }
        .capacity-card:hover {
          transform: translateY(-4px);
        }
        .capacity-number {
          display: block;
          font-size: 0.82rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-gold-dark);
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        .capacity-layout-name {
          font-size: 1.45rem;
          color: var(--color-text-title);
          margin-bottom: 0.75rem;
        }
        .capacity-desc {
          font-size: 0.9rem;
          color: var(--color-text-body);
          line-height: 1.6;
        }

        /* Tech Specs & RFP */
        .tech-specs-section {
          padding: 6rem 0;
        }
        .tech-split-card {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 5rem;
          align-items: start;
        }
        .tech-title {
          font-size: 2.3rem;
          color: var(--color-text-title);
          line-height: 1.2;
        }
        .tech-points-list {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          margin-top: 2rem;
        }
        .tech-point {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        .tech-point strong {
          display: block;
          font-size: 1.05rem;
          color: var(--color-text-title);
          margin-bottom: 0.25rem;
        }
        .tech-point p {
          font-size: 0.9rem;
          color: var(--color-text-body);
        }

        /* RFP Box */
        .rfp-box {
          background: #ffffff;
          border: 1px solid var(--color-gold-border);
          padding: 3rem;
          box-shadow: var(--shadow-editorial);
        }
        .rfp-box h3 {
          font-size: 1.75rem;
          color: var(--color-text-title);
          margin-bottom: 0.4rem;
        }
        .rfp-subtitle {
          font-size: 0.88rem;
          color: var(--color-text-muted);
          margin-bottom: 1.75rem;
        }
        .rfp-form-stack {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .rfp-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .rfp-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .rfp-field label {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-text-title);
        }
        .rfp-field input, .rfp-field select {
          padding: 0.75rem 0.9rem;
          border: 1px solid var(--border-line);
          background: #faf8f5;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          outline: none;
        }
        .rfp-field input:focus, .rfp-field select:focus {
          border-color: var(--color-gold);
          background: #ffffff;
        }
        .w-full { width: 100%; }
        .mt-2 { margin-top: 0.5rem; }

        @media (max-width: 992px) {
          .tech-split-card { grid-template-columns: 1fr; gap: 3rem; }
          .hall-main-frame { height: 320px; }
          .rfp-row-2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
