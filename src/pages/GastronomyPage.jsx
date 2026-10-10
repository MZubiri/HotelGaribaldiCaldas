import React from 'react';
import { Coffee, Clock, Sparkles, Utensils, Heart } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export function GastronomyPage({ onOpenBooking }) {
  const morningRitualItems = [
    {
      title: "Café de Especialidad Caldense",
      desc: "Granos seleccionados a mano en micro-lotes de Caldas y Fredonia. Notas a caramelo, chocolate y cítricos suaves, preparado en prensa francesa o filtrado tradicional."
    },
    {
      title: "Buñuelos Tradicionales Calientes",
      desc: "Elaborados diariamente con queso costeño y maíz añejo. Crocantes por fuera y esponjosos por dentro, servidos recién salidos del fogón."
    },
    {
      title: "Desayuno Típico Paisa Completo",
      desc: "Arepa de tela con quesito antioqueño fresco, huevos al gusto, tajadas de aguacate y chocolate caliente con clavos y canela."
    }
  ];

  const terraceCocktails = [
    { name: "Café Garibaldi Espresso Martini", desc: "Licor de café de la casa, espresso doble de origen y vodka artesanal.", price: "$28.000 COP" },
    { name: "Gin & Tonic Bosque de San Miguel", desc: "Ginebra infusionada con botánicos locales, romero fresco y tónica premium.", price: "$32.000 COP" },
    { name: "Cerveza Club Colombia Dorada / Roja", desc: "Selección de cervezas nacionales servidas en copa helada.", price: "$8.000 COP" },
    { name: "Limonada Natural de Hierbabuena", desc: "Limones tahití recién exprimidos con hojas de hierbabuena fresca de huerta.", price: "$10.000 COP" }
  ];

  return (
    <div className="gastro-editorial-page">
      {/* Portada */}
      <section className="gastro-hero">
        <div className="gastro-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1800&q=85" 
            alt="Café de origen Hotel Plaza Garibaldi" 
            className="gastro-hero-img"
          />
          <div className="gastro-dark-overlay"></div>
        </div>

        <div className="container gastro-hero-content text-center">
          <span className="editorial-eyebrow" style={{ color: 'var(--color-gold-light)' }}>
            Hospitalidad Paisa
          </span>
          <h1 className="gastro-headline">Café, Terraza & Sabor Local</h1>
          <div className="gold-divider"></div>
          <p className="gastro-hero-intro">
            Honramos la tradición del Parque Principal de Caldas a través del café recién tostado, la tertulia al aire libre y los sabores más representativos de la cultura antioqueña.
          </p>
        </div>
      </section>

      {/* El Ritual Matutino */}
      <section className="morning-ritual-section">
        <div className="container">
          <div className="ritual-editorial-grid">
            <div className="ritual-col-left">
              <span className="editorial-eyebrow">La Cortesía Matutina</span>
              <h2 className="editorial-title">El despertar del Parque Santander</h2>
              <p className="editorial-intro">
                En Hotel Plaza Garibaldi creemos que un buen día inicia sin prisas. Por eso, obsequiamos a cada uno de nuestros huéspedes nuestro café de origen matutino junto al tradicional buñuelo caliente de Caldas.
              </p>

              <div className="ritual-items-stack">
                {morningRitualItems.map((item, idx) => (
                  <div key={idx} className="ritual-card-item">
                    <div className="ritual-bullet"></div>
                    <div>
                      <h4 className="ritual-item-title">{item.title}</h4>
                      <p className="ritual-item-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ritual-col-right">
              <div className="ritual-image-frame">
                <img 
                  src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80" 
                  alt="Desayuno de café y buñuelo tradicional" 
                  className="ritual-frame-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Terraza & Atardeceres */}
      <section className="terrace-evening-section">
        <div className="container">
          <div className="editorial-header">
            <span className="editorial-eyebrow">Al Caer la Tarde</span>
            <h2 className="editorial-title">Coctelería & Vistas al Parque</h2>
            <p className="editorial-intro">
              Cuando el sol se oculta tras las montañas del Suroeste, la terraza de Garibaldi es el punto predilecto para disfrutar de una copa o una bebida refrescante con vista a la iglesia colonial iluminada.
            </p>
          </div>

          <div className="cocktails-editorial-menu">
            {terraceCocktails.map((c, i) => (
              <div key={i} className="cocktail-menu-item">
                <div className="cocktail-line">
                  <h4 className="cocktail-name">{c.name}</h4>
                  <span className="cocktail-dots"></span>
                  <span className="cocktail-price">{c.price}</span>
                </div>
                <p className="cocktail-desc">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="room-service-callout mt-5 text-center">
            <Clock size={20} className="text-gold mb-2" />
            <h3>Servicio de Habitación 24 Horas</h3>
            <p>
              Disfruta de café de cortesía, bebidas del minibar o snacks calientes directamente en tu balcón privado a cualquier hora del día o de la noche.
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .gastro-editorial-page {
          background-color: var(--color-bone);
          padding-bottom: 8rem;
        }
        .gastro-hero {
          position: relative;
          min-height: 60vh;
          display: flex;
          align-items: center;
          padding: 6rem 0;
          color: #ffffff;
        }
        .gastro-hero-bg {
          position: absolute;
          inset: 0;
        }
        .gastro-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .gastro-dark-overlay {
          position: absolute;
          inset: 0;
          background: rgba(14, 32, 26, 0.82);
        }
        .gastro-hero-content {
          position: relative;
          z-index: 2;
          max-width: 780px;
          margin: 0 auto;
        }
        .gastro-headline {
          font-size: 3.8rem;
          color: #ffffff;
          margin-bottom: 1rem;
        }
        .gastro-hero-intro {
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.7;
        }

        /* Morning Ritual */
        .morning-ritual-section {
          padding: 7rem 0;
          background-color: #ffffff;
        }
        .ritual-editorial-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 5rem;
          align-items: center;
        }
        .ritual-items-stack {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 2.5rem;
        }
        .ritual-card-item {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
        }
        .ritual-bullet {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--color-gold);
          margin-top: 0.5rem;
          flex-shrink: 0;
        }
        .ritual-item-title {
          font-size: 1.25rem;
          color: var(--color-text-title);
          margin-bottom: 0.35rem;
        }
        .ritual-item-desc {
          font-size: 0.92rem;
          color: var(--color-text-body);
          line-height: 1.6;
        }
        .ritual-image-frame {
          height: 480px;
          box-shadow: var(--shadow-editorial);
          overflow: hidden;
        }
        .ritual-frame-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Cocktails Menu */
        .terrace-evening-section {
          padding: 7rem 0;
          background-color: var(--color-canvas);
        }
        .cocktails-editorial-menu {
          max-width: 760px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .cocktail-menu-item {
          display: flex;
          flex-direction: column;
        }
        .cocktail-line {
          display: flex;
          align-items: baseline;
          margin-bottom: 0.3rem;
        }
        .cocktail-name {
          font-size: 1.25rem;
          color: var(--color-text-title);
          font-family: var(--font-serif);
          font-weight: 600;
        }
        .cocktail-dots {
          flex: 1;
          border-bottom: 1px dotted var(--color-gold);
          margin: 0 1rem;
        }
        .cocktail-price {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-gold-dark);
        }
        .cocktail-desc {
          font-size: 0.88rem;
          color: var(--color-text-muted);
        }

        .room-service-callout {
          background-color: #ffffff;
          border: 1px solid var(--color-gold-border);
          padding: 2.5rem;
          max-width: 600px;
          margin: 4rem auto 0;
          box-shadow: var(--shadow-editorial);
        }
        .room-service-callout h3 {
          font-size: 1.45rem;
          color: var(--color-text-title);
          margin-bottom: 0.5rem;
        }
        .room-service-callout p {
          font-size: 0.92rem;
          color: var(--color-text-body);
        }
        .mb-2 { margin-bottom: 0.5rem; }

        @media (max-width: 900px) {
          .gastro-headline { font-size: 2.6rem; }
          .ritual-editorial-grid { grid-template-columns: 1fr; gap: 3rem; }
          .ritual-image-frame { height: 320px; }
        }
      `}</style>
    </div>
  );
}
