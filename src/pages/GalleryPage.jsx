import React, { useState } from 'react';
import { X, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/hotelData';

export function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [lightboxItem, setLightboxItem] = useState(null);

  const filteredItems = GALLERY_ITEMS.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <div className="gallery-editorial-page">
      <section className="gallery-hero">
        <div className="container-narrow text-center">
          <span className="editorial-eyebrow">Mirada Visual</span>
          <h1 className="editorial-title">Galería Fotográfica</h1>
          <div className="gold-divider"></div>
          <p className="editorial-intro">
            Una colección de instantes que retratan la luz, la arquitectura colonial y la serenidad de nuestras estancias frente a la plaza.
          </p>

          {/* Filtros */}
          <div className="gallery-filters-row">
            <button onClick={() => setFilter('all')} className={`filter-link ${filter === 'all' ? 'active' : ''}`}>
              Todas
            </button>
            <button onClick={() => setFilter('balcon')} className={`filter-link ${filter === 'balcon' ? 'active' : ''}`}>
              Balcones al Parque
            </button>
            <button onClick={() => setFilter('habitaciones')} className={`filter-link ${filter === 'habitaciones' ? 'active' : ''}`}>
              Habitaciones & Suites
            </button>
            <button onClick={() => setFilter('cafe')} className={`filter-link ${filter === 'cafe' ? 'active' : ''}`}>
              Café & Terraza
            </button>
            <button onClick={() => setFilter('eventos')} className={`filter-link ${filter === 'eventos' ? 'active' : ''}`}>
              Salón de Eventos
            </button>
            <button onClick={() => setFilter('caldas')} className={`filter-link ${filter === 'caldas' ? 'active' : ''}`}>
              Entorno & San Miguel
            </button>
          </div>
        </div>
      </section>

      {/* Grid Fotográfico Editorial */}
      <section className="gallery-grid-section">
        <div className="container">
          <div className="editorial-photo-grid">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                onClick={() => setLightboxItem(item)}
                className="photo-grid-cell"
              >
                <img src={item.image} alt={item.title} className="grid-photo-img" />
                <div className="photo-caption-scrim">
                  <span className="photo-title-text">{item.title}</span>
                  <span className="photo-sub-text">{item.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div className="modal-overlay" onClick={() => setLightboxItem(null)}>
          <div className="lightbox-frame" onClick={e => e.stopPropagation()}>
            <button onClick={() => setLightboxItem(null)} className="lightbox-close">
              <X size={24} />
            </button>
            <img src={lightboxItem.image} alt={lightboxItem.title} className="lightbox-img" />
            <div className="lightbox-info">
              <h3>{lightboxItem.title}</h3>
              <p>{lightboxItem.caption}</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-editorial-page {
          background-color: var(--color-bone);
          padding-bottom: 8rem;
        }
        .gallery-hero {
          padding: 6rem 0 3.5rem;
          background-color: #ffffff;
          border-bottom: 1px solid var(--border-subtle);
        }
        .gallery-filters-row {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-top: 2.5rem;
          flex-wrap: wrap;
        }
        .filter-link {
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-text-muted);
          padding: 0.35rem 0.2rem;
          border-bottom: 2px solid transparent;
          transition: all var(--transition-smooth);
        }
        .filter-link:hover {
          color: var(--color-primary);
        }
        .filter-link.active {
          color: var(--color-primary);
          border-bottom-color: var(--color-gold);
        }

        .gallery-grid-section {
          padding: 5rem 0;
        }
        .editorial-photo-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 2rem;
        }
        .photo-grid-cell {
          position: relative;
          height: 380px;
          overflow: hidden;
          background-color: #000;
          cursor: pointer;
        }
        .grid-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .photo-grid-cell:hover .grid-photo-img {
          transform: scale(1.06);
          opacity: 0.85;
        }
        .photo-caption-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(14,32,26,0.85) 0%, transparent 60%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem;
          opacity: 0;
          transition: opacity var(--transition-smooth);
        }
        .photo-grid-cell:hover .photo-caption-scrim {
          opacity: 1;
        }
        .photo-title-text {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }
        .photo-sub-text {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.8);
          line-height: 1.4;
        }

        /* Lightbox */
        .lightbox-frame {
          position: relative;
          max-width: 900px;
          max-height: 90vh;
          background: #ffffff;
          box-shadow: 0 30px 80px rgba(0,0,0,0.5);
        }
        .lightbox-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0,0,0,0.7);
          color: #ffffff;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
        .lightbox-img {
          width: 100%;
          max-height: 65vh;
          object-fit: cover;
        }
        .lightbox-info {
          padding: 1.75rem 2rem;
        }
        .lightbox-info h3 {
          font-size: 1.65rem;
          color: var(--color-text-title);
          margin-bottom: 0.35rem;
        }
        .lightbox-info p {
          font-size: 0.95rem;
          color: var(--color-text-body);
        }

        @media (max-width: 768px) {
          .editorial-photo-grid {
            grid-template-columns: 1fr;
          }
          .photo-grid-cell {
            height: 300px;
          }
          .photo-caption-scrim {
            opacity: 1;
            background: linear-gradient(0deg, rgba(14,32,26,0.9) 0%, transparent 70%);
          }
        }
      `}</style>
    </div>
  );
}
