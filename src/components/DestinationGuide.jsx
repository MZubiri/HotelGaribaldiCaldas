import React from 'react';
import { Compass, Clock, MapPin, ArrowUpRight, Sparkles } from 'lucide-react';
import { EXPERIENCES_DATA } from '../data/hotelData';

export function DestinationGuide() {
  return (
    <section id="experiencias" className="guide-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Compass size={14} /> Descubre Caldas & Antioquia
          </span>
          <h2 className="section-title">
            Experiencias & Turismo Local
          </h2>
          <p className="section-subtitle">
            Caldas es naturaleza exuberante, cuna de aguas puras y la puerta de entrada a los paisajes cafeteros más hermosos del departamento.
          </p>
        </div>

        <div className="experiences-grid">
          {EXPERIENCES_DATA.map((exp, idx) => (
            <div key={idx} className="experience-card hotel-card">
              <div className="exp-img-wrap">
                <img src={exp.image} alt={exp.title} className="exp-img" />
                <span className="exp-tag-badge badge-emerald">
                  {exp.tag}
                </span>
              </div>

              <div className="exp-card-body">
                <div className="exp-meta-row">
                  <span className="exp-meta-item">
                    <Clock size={13} /> {exp.duration}
                  </span>
                  <span className="exp-meta-item">
                    <MapPin size={13} /> {exp.distance}
                  </span>
                </div>

                <h3 className="exp-title">{exp.title}</h3>
                <span className="exp-subtitle">{exp.subtitle}</span>
                <p className="exp-desc">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Informativo Ecoturismo San Miguel */}
        <div className="san-miguel-callout glass-card">
          <div className="callout-inner">
            <span className="badge-gold">
              <Sparkles size={12} /> Joya Natural de Colombia
            </span>
            <h3>¿Sabías que en Caldas nace el Río Medellín?</h3>
            <p>
              A pocos minutos del hotel, la Reserva Natural Alto de San Miguel protege el nacimiento de la cuenca hídrica del Valle de Aburrá. En recepción te conectamos con guías locales certificados para caminatas ecológicas seguras de avistamiento de aves y baños en cascadas naturales.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .guide-section {
          padding: 6rem 0;
          background: #f4f0eb;
        }
        .experiences-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3.5rem;
        }
        .experience-card {
          display: flex;
          flex-direction: column;
        }
        .exp-img-wrap {
          position: relative;
          height: 220px;
          overflow: hidden;
        }
        .exp-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--transition-smooth);
        }
        .experience-card:hover .exp-img {
          transform: scale(1.08);
        }
        .exp-tag-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
        }
        .exp-card-body {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .exp-meta-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 0.75rem;
        }
        .exp-meta-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: var(--text-muted);
          font-weight: 600;
        }
        .exp-title {
          font-size: 1.35rem;
          color: var(--emerald-950);
          margin-bottom: 0.2rem;
        }
        .exp-subtitle {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--gold-600);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
          letter-spacing: 0.04em;
        }
        .exp-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        .san-miguel-callout {
          background: #ffffff;
          border: 1px solid var(--border-gold);
          padding: 2.5rem;
          border-radius: var(--radius-lg);
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }
        .callout-inner h3 {
          font-size: 1.85rem;
          color: var(--emerald-950);
          margin: 0.5rem 0 0.8rem;
        }
        .callout-inner p {
          font-size: 0.98rem;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 760px;
          margin: 0 auto;
        }
      `}</style>
    </section>
  );
}
