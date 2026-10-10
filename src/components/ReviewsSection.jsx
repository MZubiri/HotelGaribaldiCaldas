import React from 'react';
import { Star, Quote, Award, ThumbsUp, ShieldCheck } from 'lucide-react';
import { REVIEWS_DATA, HOTEL_INFO } from '../data/hotelData';

export function ReviewsSection() {
  return (
    <section className="reviews-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <Award size={14} /> La Experiencia de Nuestros Huéspedes
          </span>
          <h2 className="section-title">
            Voces y Testimonios
          </h2>
          <p className="section-subtitle">
            Huéspedes de negocios, parejas y familias confirman por qué el Hotel Plaza Garibaldi es la mejor opción de alojamiento en Caldas.
          </p>
        </div>

        {/* Calificación Resumen Banner */}
        <div className="ratings-overview-card glass-card">
          <div className="rating-score-block">
            <span className="score-number">4.8</span>
            <div className="score-stars">
              <Star size={18} fill="#d4af37" color="#d4af37" />
              <Star size={18} fill="#d4af37" color="#d4af37" />
              <Star size={18} fill="#d4af37" color="#d4af37" />
              <Star size={18} fill="#d4af37" color="#d4af37" />
              <Star size={18} fill="#d4af37" color="#d4af37" />
            </div>
            <span className="score-label">Excelente • {HOTEL_INFO.reviewsCount} Reseñas</span>
          </div>

          <div className="ratings-stats-grid">
            <div className="stat-box">
              <span className="stat-metric">9.6 / 10</span>
              <span className="stat-desc">Ubicación Frente al Parque</span>
            </div>
            <div className="stat-box">
              <span className="stat-metric">9.4 / 10</span>
              <span className="stat-desc">Limpieza & Pulcritud</span>
            </div>
            <div className="stat-box">
              <span className="stat-metric">9.7 / 10</span>
              <span className="stat-desc">Atención en Recepción 24h</span>
            </div>
            <div className="stat-box">
              <span className="stat-metric">9.2 / 10</span>
              <span className="stat-desc">WiFi para Teletrabajo</span>
            </div>
          </div>
        </div>

        {/* Tarjetas de Testimonios */}
        <div className="reviews-grid">
          {REVIEWS_DATA.map((rev, idx) => (
            <div key={idx} className="review-card hotel-card">
              <div className="review-header">
                <Quote size={28} className="quote-icon" />
                <div className="stars-row">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#d4af37" color="#d4af37" />
                  ))}
                </div>
              </div>

              <p className="review-comment">"{rev.comment}"</p>

              <div className="review-footer">
                <div className="author-avatar">
                  {rev.name.charAt(0)}
                </div>
                <div className="author-info">
                  <span className="author-name">{rev.name}</span>
                  <span className="author-origin">{rev.origin} • Habitación {rev.room}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .reviews-section {
          padding: 6rem 0;
          background: #faf8f5;
        }
        .ratings-overview-card {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 2.5rem;
          padding: 2.5rem;
          background: #ffffff;
          border: 1px solid var(--border-gold);
          margin-bottom: 3.5rem;
          align-items: center;
        }
        .rating-score-block {
          text-align: center;
          border-right: 1px solid var(--border-light);
          padding-right: 2rem;
        }
        .score-number {
          font-size: 3.8rem;
          font-weight: 800;
          color: var(--emerald-950);
          line-height: 1;
        }
        .score-stars {
          display: flex;
          justify-content: center;
          gap: 3px;
          margin: 0.5rem 0;
        }
        .score-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .ratings-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
        }
        .stat-box {
          display: flex;
          flex-direction: column;
        }
        .stat-metric {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--emerald-900);
        }
        .stat-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 2rem;
        }
        .review-card {
          padding: 2rem;
          background: #ffffff;
          display: flex;
          flex-direction: column;
        }
        .review-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
        }
        .quote-icon {
          color: var(--gold-400);
          opacity: 0.5;
        }
        .stars-row {
          display: flex;
          gap: 2px;
        }
        .review-comment {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.65;
          font-style: italic;
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }
        .review-footer {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
        }
        .author-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--emerald-100);
          color: var(--emerald-900);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
        }
        .author-name {
          display: block;
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--emerald-950);
        }
        .author-origin {
          display: block;
          font-size: 0.78rem;
          color: var(--text-muted);
        }

        @media (max-width: 800px) {
          .ratings-overview-card {
            grid-template-columns: 1fr;
          }
          .rating-score-block {
            border-right: none;
            border-bottom: 1px solid var(--border-light);
            padding-right: 0;
            padding-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
