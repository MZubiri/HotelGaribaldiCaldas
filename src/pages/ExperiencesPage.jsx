import React from 'react';
import { Compass, Clock, MapPin, Sparkles, Trees, Mountain, Feather } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export function ExperiencesPage() {
  const experiencesList = [
    {
      title: "Reserva Natural Alto de San Miguel",
      subtitle: "Cuna y Nacimiento del Río Medellín",
      duration: "4 - 5 Horas",
      distance: "12 km desde el hotel",
      badge: "Santuario Ecológico",
      desc: "Un ecosistema virgen de bosque de niebla andino que alberga más del 16% de las especies de aves registradas en Colombia, orquídeas endémicas y cascadas de aguas cristalinas. En el hotel coordinamos guías locales certificados y refrigerio de marcha para caminatas contemplativas seguras.",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Ruta de la Tradición Cerámica",
      subtitle: "Pioneros alfareros de Antioquia",
      duration: "2 - 3 Horas",
      distance: "En el casco urbano de Caldas",
      badge: "Patrimonio & Artesanía",
      desc: "Caldas es la cuna histórica de la loza fina y la cerámica en Colombia (cuna de la emblemática Locería Colombiana / Corona). Recorre talleres de maestros alfareros tradicionales, conoce el modelado en torno y adquiere piezas de vajilla y escultura únicas.",
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80"
    },
    {
      title: "Puerta de Oro al Suroeste Antioqueño",
      subtitle: "Fredonia, Amagá, Venecia y Jericó",
      duration: "Jornada Completa",
      distance: "Punto de partida estratégico",
      badge: "Ruta del Café",
      desc: "Por su ubicación en la salida sur de Medellín, Hotel Plaza Garibaldi es el campamento base perfecto para emprender expediciones a Cerro Tusa (la pirámide natural más alta del mundo en Venecia), las fincas cafeteras de Fredonia o el pueblo patrimonial de Jericó.",
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80"
    }
  ];

  return (
    <div className="experiences-editorial-page">
      {/* Portada */}
      <section className="experiences-hero">
        <div className="container-narrow text-center">
          <span className="editorial-eyebrow">Descubre Antioquia</span>
          <h1 className="editorial-title">Naturaleza & Cultura en Caldas</h1>
          <div className="gold-divider"></div>
          <p className="editorial-intro">
            Más allá del descanso en nuestras suites, Caldas ofrece un territorio fértil en biodiversidad, historia industrial y paisajes de cordillera. Te invitamos a explorar las experiencias más auténticas de la región.
          </p>
        </div>
      </section>

      {/* Lista Editorial de Experiencias */}
      <section className="exp-stack-section">
        <div className="container">
          <div className="exp-items-stack">
            {experiencesList.map((exp, idx) => (
              <div key={idx} className={`exp-editorial-row ${idx % 2 === 1 ? 'row-flipped' : ''}`}>
                <div className="exp-media-box">
                  <img src={exp.image} alt={exp.title} className="exp-photo" />
                  <span className="exp-badge-pill">{exp.badge}</span>
                </div>

                <div className="exp-content-box">
                  <div className="exp-meta-header">
                    <span><Clock size={14} className="text-gold" /> {exp.duration}</span>
                    <span><MapPin size={14} className="text-gold" /> {exp.distance}</span>
                  </div>

                  <h2 className="exp-row-title">{exp.title}</h2>
                  <h4 className="exp-row-subtitle">{exp.subtitle}</h4>
                  <p className="exp-row-desc">{exp.desc}</p>

                  <div className="exp-row-footer">
                    <a 
                      href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=${encodeURIComponent(`Hola Hotel Plaza Garibaldi, me interesa coordinar la experiencia: ${exp.title}. ¿Podrían brindarme información y tarifas de guianza?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-luxury-outline"
                    >
                      Coordinar con Conserjería
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Callout Ecoturismo Consciente */}
      <section className="eco-banner-section">
        <div className="container-narrow text-center">
          <Feather size={28} className="text-gold mb-2" />
          <h3 className="eco-title">Compromiso con el Turismo Sostenible</h3>
          <p className="eco-text">
            En Hotel Plaza Garibaldi apoyamos activamente a los guías locales nativos de Caldas y promovemos la conservación de la microcuenca del río Medellín. Fomentamos el turismo de bajo impacto, libre de plásticos de un solo uso y respetuoso con la avifauna andina.
          </p>
        </div>
      </section>

      <style>{`
        .experiences-editorial-page {
          background-color: var(--color-bone);
          padding-bottom: 8rem;
        }
        .experiences-hero {
          padding: 6rem 0 4rem;
          background-color: #ffffff;
          border-bottom: 1px solid var(--border-subtle);
        }
        .exp-stack-section {
          padding: 6rem 0;
        }
        .exp-items-stack {
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }
        .exp-editorial-row {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 4.5rem;
          align-items: center;
          background: #ffffff;
          padding: 3rem;
          border: 1px solid var(--border-subtle);
          box-shadow: var(--shadow-editorial);
        }
        .exp-editorial-row.row-flipped {
          grid-template-columns: 1fr 1.15fr;
        }
        .exp-editorial-row.row-flipped .exp-media-box {
          order: 2;
        }
        .exp-editorial-row.row-flipped .exp-content-box {
          order: 1;
        }

        .exp-media-box {
          position: relative;
          height: 380px;
          overflow: hidden;
        }
        .exp-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .exp-media-box:hover .exp-photo {
          transform: scale(1.05);
        }
        .exp-badge-pill {
          position: absolute;
          top: 1.25rem;
          left: 1.25rem;
          background: rgba(14, 32, 26, 0.85);
          color: #ffffff;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 0.35rem 0.8rem;
          backdrop-filter: blur(4px);
        }

        .exp-content-box {
          display: flex;
          flex-direction: column;
        }
        .exp-meta-header {
          display: flex;
          gap: 1.5rem;
          font-size: 0.82rem;
          color: var(--color-text-muted);
          margin-bottom: 0.75rem;
        }
        .exp-meta-header span {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .exp-row-title {
          font-size: 2.2rem;
          color: var(--color-text-title);
          margin-bottom: 0.3rem;
        }
        .exp-row-subtitle {
          font-size: 0.88rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-gold-dark);
          font-weight: 700;
          margin-bottom: 1.25rem;
        }
        .exp-row-desc {
          font-size: 0.95rem;
          color: var(--color-text-body);
          line-height: 1.7;
          margin-bottom: 2rem;
        }
        .exp-row-footer {
          margin-top: auto;
        }

        /* Eco Banner */
        .eco-banner-section {
          padding: 5rem 0;
          background-color: var(--color-canvas);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }
        .eco-title {
          font-size: 1.85rem;
          color: var(--color-text-title);
          margin-bottom: 1rem;
        }
        .eco-text {
          font-size: 0.95rem;
          color: var(--color-text-body);
          line-height: 1.75;
          max-width: 720px;
          margin: 0 auto;
        }

        @media (max-width: 992px) {
          .exp-editorial-row {
            grid-template-columns: 1fr;
            padding: 2rem;
            gap: 2rem;
          }
          .exp-editorial-row.row-flipped {
            grid-template-columns: 1fr;
          }
          .exp-editorial-row.row-flipped .exp-media-box {
            order: 1;
          }
          .exp-editorial-row.row-flipped .exp-content-box {
            order: 2;
          }
          .exp-media-box {
            height: 280px;
          }
        }
      `}</style>
    </div>
  );
}
