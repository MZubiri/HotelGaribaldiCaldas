import React from 'react';
import { Building2, Phone, Mail, MapPin, ShieldCheck, ArrowUp, Calendar, Coffee, Sparkles } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export function Footer({ onNavigate, onOpenBooking, onToggleAdminView }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageClick = (pageId) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
    scrollToTop();
  };

  return (
    <footer className="hotel-luxury-footer">
      <div className="container footer-content-grid">
        {/* Columna 1: Marca & Filosofía */}
        <div className="footer-col brand-col">
          <div className="footer-brand" onClick={() => handlePageClick('home')}>
            <span className="brand-logo-text">Hotel Plaza Garibaldi</span>
            <span className="brand-tagline-sub">Caldas • Antioquia • Colombia</span>
          </div>

          <p className="footer-desc-text">
            {HOTEL_INFO.tagline}. Una residencia hotelera de cuatro estrellas con vista panorámica a la Parroquia Nuestra Señora de las Mercedes y el Parque Principal de Caldas.
          </p>

          <div className="footer-rnt-badge">
            <ShieldCheck size={14} className="text-gold" />
            <span>{HOTEL_INFO.rnt} • NIT {HOTEL_INFO.nit}</span>
          </div>
        </div>

        {/* Columna 2: Navegación de Páginas */}
        <div className="footer-col">
          <h4 className="footer-col-title">Plataforma</h4>
          <ul className="footer-nav-list">
            <li><button onClick={() => handlePageClick('home')} className="footer-link-btn">Inicio & Atmósfera</button></li>
            <li><button onClick={() => handlePageClick('rooms')} className="footer-link-btn">Habitaciones & Suites</button></li>
            <li><button onClick={() => handlePageClick('gastronomy')} className="footer-link-btn">Café de Origen & Terraza</button></li>
            <li><button onClick={() => handlePageClick('events')} className="footer-link-btn">Salón de Eventos & RFPs</button></li>
            <li><button onClick={() => handlePageClick('experiences')} className="footer-link-btn">Guía Alto de San Miguel</button></li>
            <li><button onClick={() => handlePageClick('gallery')} className="footer-link-btn">Galería Fotográfica</button></li>
            <li><button onClick={() => handlePageClick('contact')} className="footer-link-btn">Ubicación & Contacto</button></li>
            <li><button onClick={() => handlePageClick('precheckin')} className="footer-link-btn highlight-gold">Pre-Check-In Web</button></li>
          </ul>
        </div>

        {/* Columna 3: Acomodaciones & Reservas */}
        <div className="footer-col">
          <h4 className="footer-col-title">Estancias</h4>
          <ul className="footer-nav-list">
            <li><button onClick={() => onOpenBooking()} className="footer-link-btn">Deluxe Balcón al Parque</button></li>
            <li><button onClick={() => onOpenBooking()} className="footer-link-btn">Estándar Ejecutiva</button></li>
            <li><button onClick={() => onOpenBooking()} className="footer-link-btn">Doble Superior</button></li>
            <li><button onClick={() => onOpenBooking()} className="footer-link-btn">Gran Suite Familiar</button></li>
          </ul>
        </div>

        {/* Columna 4: Contacto & Asistencia */}
        <div className="footer-col">
          <h4 className="footer-col-title">Recepción 24 Horas</h4>
          <div className="footer-contact-details">
            <div className="contact-line">
              <MapPin size={15} className="contact-icon" />
              <span>{HOTEL_INFO.address}, Caldas</span>
            </div>
            <div className="contact-line">
              <Phone size={15} className="contact-icon" />
              <a href={`tel:${HOTEL_INFO.phonePrimary}`}>{HOTEL_INFO.phonePrimary}</a>
            </div>
            <div className="contact-line">
              <Phone size={15} className="contact-icon" />
              <a href={`tel:${HOTEL_INFO.phoneSecondary}`}>{HOTEL_INFO.phoneSecondary}</a>
            </div>
            <div className="contact-line">
              <Mail size={15} className="contact-icon" />
              <a href={`mailto:${HOTEL_INFO.email}`}>{HOTEL_INFO.email}</a>
            </div>
            <div className="mt-3">
              <button onClick={() => onOpenBooking()} className="btn-luxury-gold w-full text-center">
                Reservar Directamente
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Franja Legal Colombiana */}
      <div className="footer-legal-stripe">
        <div className="container legal-inner">
          <p className="legal-statement">
            En cumplimiento de la <strong>Ley 679 de 2001 y Ley 1336 de 2009</strong>, Hotel Plaza Garibaldi rechaza, previene y denuncia la explotación y abuso sexual de menores de edad. Establecimiento libre de humo de tabaco (Ley 1335 de 2009). Sujeto a las regulaciones del Viceministerio de Turismo de Colombia.
          </p>

          <div className="legal-bottom-bar">
            <span>
              © {new Date().getFullYear()} Hotel Plaza Garibaldi S.A.S. • Todos los derechos reservados.
              {' '}
              <button 
                onClick={() => onToggleAdminView(true)} 
                className="btn-discreet-staff" 
                title="Acceso para colaboradores"
              >
                • Intranet PMS
              </button>
            </span>
            <button onClick={scrollToTop} className="scroll-top-btn">
              <ArrowUp size={14} /> Volver al Inicio
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .hotel-luxury-footer {
          background-color: var(--color-primary);
          color: rgba(255, 255, 255, 0.85);
          border-top: 2px solid var(--color-gold);
          padding-top: 5rem;
        }
        .footer-content-grid {
          display: grid;
          grid-template-columns: 1.3fr 1fr 1fr 1.2fr;
          gap: 3.5rem;
          padding-bottom: 4rem;
        }
        .footer-brand {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          margin-bottom: 1.25rem;
        }
        .brand-logo-text {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: #ffffff;
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .brand-tagline-sub {
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-gold);
          font-weight: 600;
        }
        .footer-desc-text {
          font-size: 0.86rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .footer-rnt-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.06);
          padding: 0.4rem 0.85rem;
          border-radius: 4px;
          font-size: 0.74rem;
          color: var(--color-gold-light);
          border: 1px solid rgba(197, 160, 89, 0.2);
        }
        .footer-col-title {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          color: #ffffff;
          font-weight: 600;
          margin-bottom: 1.25rem;
          position: relative;
          padding-bottom: 0.5rem;
        }
        .footer-col-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 24px;
          height: 1.5px;
          background-color: var(--color-gold);
        }
        .footer-nav-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer-link-btn {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.85rem;
          text-align: left;
          padding: 0;
          cursor: pointer;
          transition: color var(--transition-smooth);
        }
        .footer-link-btn:hover {
          color: var(--color-gold-light);
        }
        .footer-link-btn.highlight-gold {
          color: var(--color-gold);
          font-weight: 600;
        }
        .footer-pms-portal-btn {
          background: rgba(197, 160, 89, 0.15);
          border: 1px solid rgba(197, 160, 89, 0.3);
          color: var(--color-gold-light);
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.5rem 0.85rem;
          border-radius: 4px;
          cursor: pointer;
          transition: all var(--transition-smooth);
        }
        .footer-pms-portal-btn:hover {
          background: var(--color-gold);
          color: var(--color-primary);
        }
        .footer-contact-details {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          font-size: 0.85rem;
        }
        .contact-line {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: rgba(255, 255, 255, 0.75);
        }
        .contact-icon {
          color: var(--color-gold);
          flex-shrink: 0;
        }
        .contact-line a {
          color: rgba(255, 255, 255, 0.75);
          transition: color var(--transition-smooth);
        }
        .contact-line a:hover {
          color: var(--color-gold-light);
        }
        .w-full {
          width: 100%;
        }
        .mt-3 {
          margin-top: 0.75rem;
        }
        .footer-legal-stripe {
          background-color: #060e0c;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 2rem 0;
          font-size: 0.76rem;
          color: rgba(255, 255, 255, 0.5);
        }
        .legal-statement {
          line-height: 1.5;
          margin-bottom: 1.25rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .legal-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .scroll-top-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--color-gold);
          font-size: 0.78rem;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
        }
        .scroll-top-btn:hover {
          color: #ffffff;
        }
        @media (max-width: 992px) {
          .footer-content-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2.5rem;
          }
        }
        @media (max-width: 600px) {
          .footer-content-grid {
            grid-template-columns: 1fr;
          }
          .legal-bottom-bar {
            flex-direction: column;
            gap: 0.75rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
