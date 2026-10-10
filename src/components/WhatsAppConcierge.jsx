import React, { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, Clock, MapPin, Building, ChevronRight } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export function WhatsAppConcierge() {
  const [isOpen, setIsOpen] = useState(false);

  const quickQuestions = [
    {
      label: "Consultar disponibilidad hoy",
      message: "Hola Hotel Plaza Garibaldi, quisiera consultar disponibilidad de habitaciones para el día de hoy."
    },
    {
      label: "Cotizar Salón de Eventos",
      message: "Buenas tardes, me gustaría recibir la tarifa y opciones de menú para un evento en el Salón Garibaldi."
    },
    {
      label: "Cómo llegar desde Medellín",
      message: "Hola, ¿cuál es la mejor ruta para llegar al hotel desde Medellín o la estación del Metro La Estrella?"
    },
    {
      label: "Preguntar por habitaciones con balcón",
      message: "Hola, me interesa la habitación Deluxe con balcón frente al parque. ¿Tienen fechas disponibles?"
    }
  ];

  const handleSend = (customMsg) => {
    const text = customMsg || "Hola Hotel Plaza Garibaldi, me gustaría recibir más información.";
    const url = `https://wa.me/${HOTEL_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="concierge-widget-wrap">
      {/* Ventana Desplegable del Asistente */}
      {isOpen && (
        <div className="concierge-window glass-card">
          <div className="concierge-header">
            <div className="concierge-avatar-row">
              <div className="concierge-avatar">
                <Building size={20} className="text-gold" />
                <span className="online-indicator"></span>
              </div>
              <div className="concierge-status-info">
                <h4>Recepción Garibaldi 24/7</h4>
                <p>En línea • Respuesta en &lt; 2 minutos</p>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="concierge-close-btn"
              aria-label="Cerrar chat"
            >
              <X size={18} />
            </button>
          </div>

          <div className="concierge-body">
            <div className="concierge-welcome-bubble">
              <p>
                ¡Hola! Bienvenido al <strong>Hotel Plaza Garibaldi</strong> en Caldas. ¿En qué podemos asesorarte hoy?
              </p>
              <span className="bubble-time">Recepción del Hotel</span>
            </div>

            <span className="quick-prompt-label">Preguntas Frecuentes:</span>
            <div className="quick-options-list">
              {quickQuestions.map((q, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleSend(q.message)}
                  className="quick-option-btn"
                >
                  <span>{q.label}</span>
                  <ChevronRight size={14} className="text-gold" />
                </button>
              ))}
            </div>
          </div>

          <div className="concierge-footer">
            <button 
              onClick={() => handleSend()}
              className="btn-gold concierge-chat-btn"
            >
              <MessageCircle size={16} />
              <span>Chatear Directamente en WhatsApp</span>
            </button>
          </div>
        </div>
      )}

      {/* Botón Flotante Principal */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="concierge-toggle-btn"
        aria-label="Asistente WhatsApp"
      >
        <span className="toggle-pulse"></span>
        <MessageCircle size={28} />
        <span className="toggle-tooltip hidden-mobile">¿Dudas? Chatea con Recepción</span>
      </button>

      <style>{`
        .concierge-widget-wrap {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 990;
        }
        .concierge-toggle-btn {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #25D366, #128C7E);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(37, 211, 102, 0.4);
          position: relative;
          transition: transform var(--transition-base);
        }
        .concierge-toggle-btn:hover {
          transform: scale(1.08);
        }
        .toggle-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid #25D366;
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(1.3);
            opacity: 0;
          }
        }
        .toggle-tooltip {
          position: absolute;
          right: 76px;
          white-space: nowrap;
          background: var(--emerald-950);
          color: #ffffff;
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          box-shadow: var(--shadow-md);
          border: 1px solid rgba(212, 175, 55, 0.3);
          pointer-events: none;
        }

        .concierge-window {
          position: absolute;
          bottom: 76px;
          right: 0;
          width: 340px;
          background: #ffffff;
          border: 1px solid var(--border-gold);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-xl);
          overflow: hidden;
          animation: slideUp 0.25s ease;
        }
        .concierge-header {
          background: var(--emerald-950);
          color: #ffffff;
          padding: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .concierge-avatar-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .concierge-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid var(--border-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .online-indicator {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #25D366;
          border: 2px solid var(--emerald-950);
        }
        .concierge-status-info h4 {
          font-size: 0.95rem;
          color: #ffffff;
        }
        .concierge-status-info p {
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.7);
        }
        .concierge-close-btn {
          color: rgba(255, 255, 255, 0.7);
        }
        .concierge-close-btn:hover {
          color: #ffffff;
        }

        .concierge-body {
          padding: 1.2rem;
          background: #faf8f5;
        }
        .concierge-welcome-bubble {
          background: #ffffff;
          border: 1px solid var(--border-light);
          padding: 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          color: var(--text-secondary);
          margin-bottom: 1.2rem;
        }
        .bubble-time {
          display: block;
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 0.4rem;
          text-align: right;
        }
        .quick-prompt-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--emerald-900);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .quick-options-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .quick-option-btn {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.85rem;
          background: #ffffff;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-sm);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--emerald-950);
          text-align: left;
          transition: all var(--transition-fast);
        }
        .quick-option-btn:hover {
          border-color: var(--gold-500);
          background: #fdfbf7;
        }

        .concierge-footer {
          padding: 0.9rem 1.2rem;
          background: #ffffff;
          border-top: 1px solid var(--border-light);
        }
        .concierge-chat-btn {
          width: 100%;
          font-size: 0.88rem;
          padding: 0.75rem;
        }

        @media (max-width: 480px) {
          .concierge-widget-wrap {
            bottom: 1.25rem;
            right: 1.25rem;
          }
          .concierge-window {
            width: calc(100vw - 2.5rem);
            right: 0;
          }
        }
      `}</style>
    </div>
  );
}
