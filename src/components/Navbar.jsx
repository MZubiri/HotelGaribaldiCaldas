import React, { useState } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  MapPin, 
  Phone,
  LayoutDashboard,
  Calendar,
  CheckCircle,
  FileCheck
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export function Navbar({ 
  currentPage, 
  onNavigate, 
  currency, 
  onToggleCurrency, 
  language, 
  onToggleLanguage, 
  onOpenBooking,
  isAdminView,
  onToggleAdminView
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: language === 'es' ? 'Inicio' : 'Home' },
    { id: 'rooms', label: language === 'es' ? 'Habitaciones' : 'Rooms & Suites' },
    { id: 'gastronomy', label: language === 'es' ? 'Café & Terraza' : 'Dining & Terrace' },
    { id: 'events', label: language === 'es' ? 'Eventos' : 'Meetings & Events' },
    { id: 'experiences', label: language === 'es' ? 'Experiencias' : 'Destination' },
    { id: 'gallery', label: language === 'es' ? 'Galería' : 'Gallery' },
    { id: 'contact', label: language === 'es' ? 'Ubicación' : 'Location' },
    { id: 'precheckin', label: language === 'es' ? 'Pre-Check-In' : 'Web Check-In' }
  ];

  const handleLinkClick = (pageId) => {
    setIsMobileMenuOpen(false);
    if (isAdminView) onToggleAdminView(false);
    onNavigate(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="luxury-header">
      {/* Barra de Cortesía Superior Discreta */}
      <div className="luxury-top-strip">
        <div className="container top-strip-inner">
          <div className="top-strip-left">
            <span className="strip-location">
              {HOTEL_INFO.address} • Caldas, Antioquia
            </span>
          </div>

          <div className="top-strip-right">
            <a href={`tel:${HOTEL_INFO.phonePrimary}`} className="strip-contact">
              Tel: {HOTEL_INFO.phonePrimary}
            </a>
            <span className="strip-divider">|</span>

            {/* Selector de Moneda Minimalista */}
            <button onClick={onToggleCurrency} className="strip-toggle-btn" title="Alternar Moneda">
              <span className={currency === 'COP' ? 'active-currency' : ''}>COP</span>
              <span className="currency-slash">/</span>
              <span className={currency === 'USD' ? 'active-currency' : ''}>USD</span>
            </button>
            <span className="strip-divider">|</span>

            {/* Selector de Idioma Minimalista */}
            <button onClick={onToggleLanguage} className="strip-toggle-btn" title="Alternar Idioma">
              <span className={language === 'es' ? 'active-currency' : ''}>ES</span>
              <span className="currency-slash">/</span>
              <span className={language === 'en' ? 'active-currency' : ''}>EN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navegación Principal */}
      <nav className="luxury-nav-main">
        <div className="container nav-main-inner">
          {/* Logotipo Editorial */}
          <div 
            onClick={() => handleLinkClick('home')} 
            className="luxury-brand cursor-pointer"
          >
            <span className="brand-title">Hotel Plaza Garibaldi</span>
            <span className="brand-subtitle">Caldas • Antioquia</span>
          </div>

          {/* Menú de Páginas */}
          <div className="nav-desktop-menu">
            {navigationItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`nav-item-btn ${currentPage === item.id && !isAdminView ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Acciones: Reserva Directa */}
          <div className="nav-desktop-actions">
            <button 
              onClick={() => onOpenBooking()} 
              className="btn-luxury-primary nav-reserve-cta"
            >
              {language === 'es' ? 'Reservar' : 'Reserve'}
            </button>
          </div>

          {/* Hamburguesa Móvil */}
          <div className="nav-mobile-toggle">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="mobile-btn"
              aria-label="Abrir Menú"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menú Móvil Desplegable */}
        {isMobileMenuOpen && (
          <div className="mobile-overlay-menu">
            <div className="mobile-menu-links">
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`mobile-link-btn ${currentPage === item.id && !isAdminView ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="mobile-menu-footer">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); onOpenBooking(); }}
                className="btn-luxury-gold w-full"
              >
                Reservar Estancia
              </button>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        .luxury-header {
          position: sticky;
          top: 0;
          z-index: 900;
          background-color: #ffffff;
          box-shadow: 0 4px 20px rgba(14, 32, 26, 0.05);
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .luxury-top-strip {
          background-color: var(--color-primary);
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.76rem;
          padding: 0.35rem 0;
          border-bottom: 1px solid rgba(197, 160, 89, 0.2);
          letter-spacing: 0.03em;
        }
        .top-strip-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .top-strip-right {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }
        .strip-contact {
          color: rgba(255, 255, 255, 0.85);
          transition: color var(--transition-smooth);
        }
        .strip-contact:hover {
          color: var(--color-gold-light);
        }
        .strip-divider {
          color: rgba(255, 255, 255, 0.25);
        }
        .strip-toggle-btn {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: color var(--transition-smooth);
        }
        .currency-slash {
          margin: 0 2px;
          opacity: 0.4;
        }
        .active-currency {
          color: var(--color-gold);
          font-weight: 700;
        }

        /* Nav Main */
        .luxury-nav-main {
          background-color: #ffffff;
          border-bottom: 1px solid var(--border-subtle);
        }
        .nav-main-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }
        .luxury-brand {
          display: flex;
          flex-direction: column;
        }
        .brand-title {
          font-family: var(--font-serif);
          font-size: 1.55rem;
          color: var(--color-text-title);
          letter-spacing: 0.02em;
          font-weight: 600;
          line-height: 1.1;
        }
        .brand-subtitle {
          font-size: 0.72rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-gold);
          font-weight: 600;
        }

        .nav-desktop-menu {
          display: flex;
          align-items: center;
          gap: 1.6rem;
        }
        .nav-item-btn {
          font-size: 0.84rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-text-body);
          position: relative;
          padding: 0.5rem 0;
          transition: color var(--transition-smooth);
        }
        .nav-item-btn:hover {
          color: var(--color-primary);
        }
        .nav-item-btn.active {
          color: var(--color-primary);
        }
        .nav-item-btn.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--color-gold);
        }

        .nav-desktop-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .btn-pms-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 0.5rem 0.9rem;
          border-radius: 4px;
          background: #f4f1eb;
          color: var(--color-primary);
          transition: all var(--transition-smooth);
        }
        .btn-pms-link:hover, .btn-pms-link.active-pms {
          background: var(--color-primary);
          color: #ffffff;
        }
        .nav-reserve-cta {
          padding: 0.65rem 1.6rem;
          font-size: 0.82rem;
        }

        .nav-mobile-toggle {
          display: none;
        }

        /* Mobile Menu */
        .mobile-overlay-menu {
          background: #ffffff;
          border-top: 1px solid var(--border-subtle);
          padding: 1.5rem 2rem 2rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .mobile-menu-links {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 2rem;
        }
        .mobile-link-btn {
          font-size: 1.15rem;
          font-family: var(--font-serif);
          color: var(--color-text-title);
          text-align: left;
          padding: 0.4rem 0;
          border-bottom: 1px solid #f2eee8;
        }
        .mobile-link-btn.active {
          color: var(--color-gold);
          font-weight: 700;
        }
        .w-full { width: 100%; }
        .mb-3 { margin-bottom: 0.75rem; }

        @media (max-width: 1100px) {
          .nav-desktop-menu { display: none; }
          .nav-desktop-actions { display: none; }
          .nav-mobile-toggle { display: block; }
          .strip-location { display: none; }
        }
      `}</style>
    </header>
  );
}
