import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Users, 
  Check, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Lock, 
  Smartphone, 
  Building, 
  MessageCircle, 
  Printer, 
  Download,
  AlertCircle,
  Plus,
  Minus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HOTEL_INFO, ROOMS_DATA, ADDON_SERVICES } from '../data/hotelData';

export function BookingModal({ 
  isOpen, 
  onClose, 
  initialRoom, 
  initialDates, 
  currency, 
  onReservationComplete 
}) {
  // Estados del Proceso
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(initialRoom || ROOMS_DATA[1]);
  
  // Fechas y noches
  const [checkIn, setCheckIn] = useState(initialDates?.checkIn || new Date().toISOString().split('T')[0]);
  const defaultCheckOut = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };
  const [checkOut, setCheckOut] = useState(initialDates?.checkOut || defaultCheckOut());
  const [guestsCount, setGuestsCount] = useState(initialDates?.guests || 2);

  // Servicios Adicionales
  const [selectedAddons, setSelectedAddons] = useState([]);

  // Datos del Huésped
  const [guestData, setGuestData] = useState({
    fullName: '',
    docType: 'CC',
    docNumber: '',
    email: '',
    phone: '',
    specialRequest: ''
  });

  // Datos de la Pasarela de Pago
  const [paymentMethod, setPaymentMethod] = useState('pse'); // 'pse', 'card', 'nequi', 'hotel'
  const [pseBank, setPseBank] = useState('Bancolombia');
  const [cardData, setCardData] = useState({
    number: '•••• •••• •••• 4242',
    name: '',
    expiry: '12/28',
    cvv: '•••'
  });
  const [nequiPhone, setNequiPhone] = useState('');
  
  // Procesamiento
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  // Cálculo de Noches
  const calculateNights = () => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();

  // Cálculo de Totales
  const roomPrice = currency === 'COP' ? selectedRoom.priceCOP : selectedRoom.priceUSD;
  const roomSubtotal = roomPrice * nights;

  const addonsSubtotal = selectedAddons.reduce((acc, addonId) => {
    const addon = ADDON_SERVICES.find(a => a.id === addonId);
    if (!addon) return acc;
    return acc + (currency === 'COP' ? addon.priceCOP : addon.priceUSD);
  }, 0);

  const grandTotal = roomSubtotal + addonsSubtotal;

  const formatMoney = (amount) => {
    return currency === 'COP'
      ? `$${Math.round(amount).toLocaleString('es-CO')} COP`
      : `$${Math.round(amount)} USD`;
  };

  // Toggle de Servicios Adicionales
  const toggleAddon = (addonId) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  // Manejo de Pasarela Digital
  const handleProcessPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const code = `GAR-${Math.floor(10000 + Math.random() * 90000)}`;
      setConfirmationCode(code);
      setStep(5); // Confirmación exitosa

      // Disparar Confetti de Celebración
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }

      // Notificar al Dashboard PMS
      if (onReservationComplete) {
        onReservationComplete({
          code,
          room: selectedRoom.name,
          checkIn,
          checkOut,
          nights,
          guestName: guestData.fullName || 'Huésped Web',
          email: guestData.email,
          phone: guestData.phone,
          paymentMethod,
          total: grandTotal,
          currency,
          dateCreated: new Date().toISOString()
        });
      }
    }, 1800);
  };

  // WhatsApp Voucher Share
  const generateWhatsAppMessage = () => {
    const text = `¡Hola Hotel Plaza Garibaldi! Acabo de realizar mi reserva directa en su plataforma web oficial.
*Código:* ${confirmationCode}
*Huésped:* ${guestData.fullName}
*Habitación:* ${selectedRoom.name}
*Fechas:* ${checkIn} al ${checkOut} (${nights} noches)
*Total Abonado:* ${formatMoney(grandTotal)}
*Método:* Pasarela Digital (${paymentMethod.toUpperCase()})

Agradezco su confirmación y detalles de bienvenida. ¡Muchas gracias!`;

    return `https://wa.me/${HOTEL_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content booking-modal-window" onClick={(e) => e.stopPropagation()}>
        {/* Cabecera del Motor */}
        <div className="booking-modal-header">
          <div className="header-titles">
            <span className="badge-gold">
              <Sparkles size={12} /> Motor Oficial de Reserva Directa
            </span>
            <h2 className="modal-title-text">
              {step === 5 ? '¡Reserva Confirmada con Éxito!' : 'Reserva Tu Estancia en Plaza Garibaldi'}
            </h2>
          </div>

          <button onClick={onClose} className="close-x-btn" aria-label="Cerrar ventana">
            <X size={20} />
          </button>
        </div>

        {/* Barra de Progreso de Pasos */}
        {step < 5 && (
          <div className="booking-steps-bar">
            <div className={`step-dot ${step >= 1 ? 'active' : ''}`}>
              <span>1</span> Fechas & Habitación
            </div>
            <div className="step-connector"></div>
            <div className={`step-dot ${step >= 2 ? 'active' : ''}`}>
              <span>2</span> Adicionales
            </div>
            <div className="step-connector"></div>
            <div className={`step-dot ${step >= 3 ? 'active' : ''}`}>
              <span>3</span> Datos del Huésped
            </div>
            <div className="step-connector"></div>
            <div className={`step-dot ${step >= 4 ? 'active' : ''}`}>
              <span>4</span> Pasarela Digital
            </div>
          </div>
        )}

        {/* CUERPO DEL PROCESO */}
        <div className="booking-modal-body">
          {/* ================= PASO 1: Habitación y Fechas ================= */}
          {step === 1 && (
            <div className="step-pane">
              <h3 className="step-heading">1. Configura tus Fechas y Acomodación</h3>
              
              <div className="dates-config-grid">
                <div className="form-group">
                  <label className="input-label">Fecha de Entrada (Check-in)</label>
                  <input 
                    type="date" 
                    value={checkIn}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="styled-input"
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Fecha de Salida (Check-out)</label>
                  <input 
                    type="date" 
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="styled-input"
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Número de Huéspedes</label>
                  <select 
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="styled-select"
                  >
                    <option value={1}>1 Persona</option>
                    <option value={2}>2 Personas</option>
                    <option value={3}>3 Personas</option>
                    <option value={4}>4 Personas</option>
                    <option value={5}>5 Personas</option>
                  </select>
                </div>
              </div>

              <div className="nights-summary-pill">
                <Clock size={16} className="text-gold" />
                <span>Estancia calculada: <strong>{nights} {nights === 1 ? 'Noche' : 'Noches'}</strong></span>
              </div>

              {/* Selector de Habitación */}
              <h4 className="sub-heading mt-3">Selecciona tu Habitación</h4>
              <div className="room-selector-list">
                {ROOMS_DATA.map((r) => {
                  const isSelected = selectedRoom.id === r.id;
                  const price = currency === 'COP' ? r.priceCOP : r.priceUSD;
                  return (
                    <div 
                      key={r.id}
                      onClick={() => setSelectedRoom(r)}
                      className={`room-select-card ${isSelected ? 'selected' : ''}`}
                    >
                      <img src={r.image} alt={r.name} className="room-thumb-mini" />
                      <div className="room-select-info">
                        <span className="room-select-name">{r.name}</span>
                        <span className="room-select-beds">{r.beds} • {r.size}</span>
                      </div>
                      <div className="room-select-price">
                        <span className="rate-num">{formatMoney(price)}</span>
                        <span className="rate-sub">por noche</span>
                      </div>
                      <div className="radio-circle">
                        {isSelected && <Check size={14} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= PASO 2: Servicios Adicionales ================= */}
          {step === 2 && (
            <div className="step-pane">
              <h3 className="step-heading">2. Personaliza tu Experiencia (Opcional)</h3>
              <p className="step-sub">Añade servicios especiales con tarifa preferencial para tu estadía:</p>

              <div className="addons-grid">
                {ADDON_SERVICES.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  const price = currency === 'COP' ? addon.priceCOP : addon.priceUSD;
                  return (
                    <div 
                      key={addon.id} 
                      onClick={() => toggleAddon(addon.id)}
                      className={`addon-card ${isChecked ? 'selected' : ''}`}
                    >
                      <div className="addon-checkbox">
                        {isChecked && <Check size={14} />}
                      </div>
                      <div className="addon-content">
                        <h4 className="addon-title">{addon.name}</h4>
                        <p className="addon-desc">{addon.description}</p>
                      </div>
                      <div className="addon-price-tag">
                        +{formatMoney(price)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= PASO 3: Datos del Huésped ================= */}
          {step === 3 && (
            <div className="step-pane">
              <h3 className="step-heading">3. Información del Huésped Principal</h3>
              <p className="step-sub">Estos datos se utilizarán para la emisión de tu voucher de reserva y registro hotelero:</p>

              <div className="guest-form-grid">
                <div className="form-group full-width">
                  <label className="input-label">Nombre Completo *</label>
                  <input 
                    type="text" 
                    placeholder="Ej. Juan Carlos Ramírez" 
                    value={guestData.fullName}
                    onChange={(e) => setGuestData({ ...guestData, fullName: e.target.value })}
                    className="styled-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Tipo de Documento</label>
                  <select 
                    value={guestData.docType}
                    onChange={(e) => setGuestData({ ...guestData, docType: e.target.value })}
                    className="styled-select"
                  >
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                    <option value="PASSPORT">Pasaporte Internacional</option>
                    <option value="NIT">NIT Corporativo (Empresas)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="input-label">Número de Identificación *</label>
                  <input 
                    type="text" 
                    placeholder="Ej. 1020304050" 
                    value={guestData.docNumber}
                    onChange={(e) => setGuestData({ ...guestData, docNumber: e.target.value })}
                    className="styled-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Correo Electrónico (para voucher) *</label>
                  <input 
                    type="email" 
                    placeholder="correo@ejemplo.com" 
                    value={guestData.email}
                    onChange={(e) => setGuestData({ ...guestData, email: e.target.value })}
                    className="styled-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Teléfono / WhatsApp *</label>
                  <input 
                    type="tel" 
                    placeholder="+57 300 123 4567" 
                    value={guestData.phone}
                    onChange={(e) => setGuestData({ ...guestData, phone: e.target.value })}
                    className="styled-input"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label className="input-label">Petición Especial (Opcional)</label>
                  <textarea 
                    rows={2}
                    placeholder="Ej. Llegada tarde después de las 20:00, preferencia de piso alto, etc."
                    value={guestData.specialRequest}
                    onChange={(e) => setGuestData({ ...guestData, specialRequest: e.target.value })}
                    className="styled-textarea"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= PASO 4: Pasarela Digital ================= */}
          {step === 4 && (
            <div className="step-pane">
              <div className="gateway-security-badge">
                <Lock size={15} className="text-emerald" />
                <span>Pasarela Digital Segura SSL 256-Bit • Procesamiento encriptado</span>
              </div>

              <h3 className="step-heading">4. Selecciona tu Método de Pago</h3>

              {/* Selector de Métodos de Pago Colombianos */}
              <div className="payment-methods-tabs">
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('pse')}
                  className={`pay-tab ${paymentMethod === 'pse' ? 'active' : ''}`}
                >
                  <Building size={18} />
                  <span>PSE (Bancos Colombia)</span>
                </button>

                <button 
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`pay-tab ${paymentMethod === 'card' ? 'active' : ''}`}
                >
                  <CreditCard size={18} />
                  <span>Tarjeta Débito/Crédito</span>
                </button>

                <button 
                  type="button"
                  onClick={() => setPaymentMethod('nequi')}
                  className={`pay-tab ${paymentMethod === 'nequi' ? 'active' : ''}`}
                >
                  <Smartphone size={18} />
                  <span>Nequi / Daviplata</span>
                </button>

                <button 
                  type="button"
                  onClick={() => setPaymentMethod('hotel')}
                  className={`pay-tab ${paymentMethod === 'hotel' ? 'active' : ''}`}
                >
                  <Clock size={18} />
                  <span>Pago en Recepción</span>
                </button>
              </div>

              {/* Formularios según Método */}
              <div className="gateway-form-container">
                {paymentMethod === 'pse' && (
                  <div className="gateway-subform">
                    <p className="gateway-hint">Transfiere de forma segura desde cualquier banco en Colombia a través de PSE sin recargo.</p>
                    <div className="form-group">
                      <label className="input-label">Selecciona tu Entidad Financiera</label>
                      <select 
                        value={pseBank}
                        onChange={(e) => setPseBank(e.target.value)}
                        className="styled-select"
                      >
                        <option value="Bancolombia">Bancolombia</option>
                        <option value="Davivienda">Davivienda</option>
                        <option value="Banco de Bogotá">Banco de Bogotá</option>
                        <option value="Banco de Occidente">Banco de Occidente</option>
                        <option value="BBVA Colombia">BBVA Colombia</option>
                        <option value="Scotiabank Colpatria">Scotiabank Colpatria</option>
                        <option value="Nu Colombia">Nu Bank</option>
                      </select>
                    </div>
                    <div className="form-group mt-2">
                      <label className="input-label">Email registrado en PSE</label>
                      <input 
                        type="email" 
                        defaultValue={guestData.email || "usuario@ejemplo.com"} 
                        className="styled-input" 
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="gateway-subform">
                    <div className="form-group">
                      <label className="input-label">Número de Tarjeta (Visa, Mastercard, Amex)</label>
                      <input 
                        type="text" 
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className="styled-input" 
                      />
                    </div>
                    <div className="card-sub-grid">
                      <div className="form-group">
                        <label className="input-label">Titular de la Tarjeta</label>
                        <input 
                          type="text" 
                          defaultValue={guestData.fullName || "JUAN C RAMIREZ"} 
                          className="styled-input" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="input-label">Vencimiento (MM/AA)</label>
                        <input type="text" defaultValue="11/28" className="styled-input" />
                      </div>
                      <div className="form-group">
                        <label className="input-label">CVV</label>
                        <input type="password" defaultValue="894" className="styled-input" maxLength={4} />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'nequi' && (
                  <div className="gateway-subform">
                    <p className="gateway-hint">Recibirás una notificación instantánea en tu App Nequi o Daviplata para aprobar el pago.</p>
                    <div className="form-group">
                      <label className="input-label">Número de Celular Nequi</label>
                      <input 
                        type="tel" 
                        placeholder="300 123 4567" 
                        defaultValue={guestData.phone || "3044817071"}
                        className="styled-input" 
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'hotel' && (
                  <div className="gateway-subform hotel-pay-info">
                    <AlertCircle size={24} className="text-gold" />
                    <div>
                      <h5 className="font-bold">Pago en la Recepción al Hacer Check-in</h5>
                      <p className="text-sm">Tu habitación queda garantizada de forma inmediata. Podrás abonar al ingresar en efectivo, transferencia o tarjeta directamente en el counter del hotel frente al parque.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= PASO 5: Confirmación & Voucher ================= */}
          {step === 5 && (
            <div className="step-pane confirmation-pane">
              <div className="voucher-card">
                <div className="voucher-top">
                  <div className="voucher-logo">
                    <Building size={24} className="text-gold" />
                    <div>
                      <h3>Hotel Plaza Garibaldi</h3>
                      <p>Caldas, Antioquia • Carrera 49 # 129 Sur 18</p>
                    </div>
                  </div>
                  <div className="voucher-code-box">
                    <span className="code-label">CÓDIGO DE RESERVA</span>
                    <span className="code-number">{confirmationCode}</span>
                  </div>
                </div>

                <div className="voucher-details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Huésped Titular</span>
                    <span className="detail-val">{guestData.fullName || 'Huésped Registrado'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Documento</span>
                    <span className="detail-val">{guestData.docType} {guestData.docNumber || '1020304050'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Habitación</span>
                    <span className="detail-val">{selectedRoom.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Estancia</span>
                    <span className="detail-val">{nights} Noches ({checkIn} al {checkOut})</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Método de Pago</span>
                    <span className="detail-val">Pasarela Digital ({paymentMethod.toUpperCase()})</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Total Liquidado</span>
                    <span className="detail-val font-bold text-emerald">{formatMoney(grandTotal)}</span>
                  </div>
                </div>

                <div className="voucher-perks">
                  <span>✓ Café de cortesía a la llegada</span>
                  <span>✓ WiFi Fibra Óptica 300 Mbps</span>
                  <span>✓ Check-in garantizado 14:00</span>
                </div>
              </div>

              {/* Botones de Acción Posterior */}
              <div className="voucher-actions-row">
                <a 
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold voucher-action-btn"
                >
                  <MessageCircle size={18} />
                  <span>Enviar Voucher a WhatsApp Recepción</span>
                </a>

                <button 
                  onClick={() => window.print()}
                  className="btn-secondary voucher-action-btn"
                >
                  <Printer size={18} />
                  <span>Imprimir / Guardar PDF</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* PIE DE PÁGINA CON RESUMEN Y NAVEGACIÓN DE PASOS */}
        {step < 5 && (
          <div className="booking-modal-footer">
            <div className="total-summary-display">
              <span className="total-label">Total Estancia ({nights} Noches):</span>
              <span className="total-value">{formatMoney(grandTotal)}</span>
            </div>

            <div className="modal-nav-buttons">
              {step > 1 && (
                <button 
                  type="button" 
                  onClick={() => setStep(step - 1)}
                  className="btn-secondary nav-btn"
                >
                  <ChevronLeft size={16} /> Atrás
                </button>
              )}

              {step < 4 ? (
                <button 
                  type="button" 
                  onClick={() => setStep(step + 1)}
                  className="btn-gold nav-btn"
                >
                  Continuar <ChevronRight size={16} />
                </button>
              ) : (
                <button 
                  type="button"
                  onClick={handleProcessPayment}
                  disabled={isProcessing}
                  className="btn-gold nav-btn pay-submit-btn"
                >
                  {isProcessing ? (
                    <span>Procesando Pasarela...</span>
                  ) : (
                    <>
                      <Lock size={16} />
                      <span>Confirmar & Pagar ({formatMoney(grandTotal)})</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .booking-modal-window {
          max-width: 820px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .booking-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.75rem;
          background: var(--emerald-950);
          color: #ffffff;
        }
        .modal-title-text {
          font-size: 1.45rem;
          color: #ffffff;
          margin-top: 0.35rem;
        }
        .close-x-btn {
          color: rgba(255, 255, 255, 0.7);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
        }
        .close-x-btn:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.15);
        }

        /* Steps Bar */
        .booking-steps-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 1.75rem;
          background: #f4f0eb;
          border-bottom: 1px solid var(--border-light);
          overflow-x: auto;
        }
        .step-dot {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-muted);
          white-space: nowrap;
        }
        .step-dot span {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #d8d3cc;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
        }
        .step-dot.active {
          color: var(--emerald-950);
        }
        .step-dot.active span {
          background: var(--emerald-900);
        }
        .step-connector {
          flex: 1;
          height: 2px;
          background: #d8d3cc;
          margin: 0 0.5rem;
          min-width: 15px;
        }

        /* Body & Panes */
        .booking-modal-body {
          padding: 1.75rem;
          overflow-y: auto;
          max-height: 60vh;
        }
        .step-heading {
          font-size: 1.35rem;
          color: var(--emerald-950);
          margin-bottom: 0.5rem;
        }
        .step-sub {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }

        .dates-config-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .form-group.full-width {
          grid-column: 1 / -1;
        }
        .input-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--emerald-900);
          text-transform: uppercase;
        }
        .styled-input, .styled-select, .styled-textarea {
          width: 100%;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
          border: 1px solid rgba(19, 46, 39, 0.15);
          background: #ffffff;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          color: var(--text-primary);
          outline: none;
        }
        .styled-input:focus, .styled-select:focus, .styled-textarea:focus {
          border-color: var(--gold-500);
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.15);
        }
        .nights-summary-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--emerald-50);
          border: 1px solid var(--emerald-100);
          padding: 0.4rem 0.9rem;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          color: var(--emerald-900);
          margin-bottom: 1.5rem;
        }

        /* Room Selector */
        .room-selector-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .room-select-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          background: #ffffff;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .room-select-card:hover {
          border-color: var(--gold-500);
          background: #fdfcf9;
        }
        .room-select-card.selected {
          border-color: var(--emerald-900);
          background: var(--emerald-50);
          box-shadow: 0 0 0 1px var(--emerald-900);
        }
        .room-thumb-mini {
          width: 65px;
          height: 50px;
          object-fit: cover;
          border-radius: 6px;
        }
        .room-select-info {
          flex: 1;
        }
        .room-select-name {
          display: block;
          font-weight: 700;
          color: var(--emerald-950);
          font-size: 0.95rem;
        }
        .room-select-beds {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .room-select-price {
          text-align: right;
        }
        .rate-num {
          display: block;
          font-weight: 800;
          color: var(--emerald-950);
          font-size: 1.05rem;
        }
        .rate-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .radio-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--emerald-900);
        }
        .room-select-card.selected .radio-circle {
          border-color: var(--emerald-900);
          background: #ffffff;
        }

        /* Addons */
        .addons-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .addon-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .addon-card:hover {
          border-color: var(--gold-500);
        }
        .addon-card.selected {
          border-color: var(--gold-600);
          background: #fcf9f0;
        }
        .addon-checkbox {
          width: 22px;
          height: 22px;
          border-radius: 6px;
          border: 2px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold-600);
        }
        .addon-card.selected .addon-checkbox {
          background: var(--gold-500);
          border-color: var(--gold-500);
          color: #ffffff;
        }
        .addon-content {
          flex: 1;
        }
        .addon-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--emerald-950);
        }
        .addon-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }
        .addon-price-tag {
          font-weight: 700;
          color: var(--emerald-900);
          font-size: 0.95rem;
        }

        /* Guest Form */
        .guest-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        /* Gateway Tabs */
        .gateway-security-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--emerald-50);
          border: 1px solid var(--emerald-100);
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          font-size: 0.8rem;
          color: var(--emerald-800);
          margin-bottom: 1rem;
        }
        .payment-methods-tabs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 0.6rem;
          margin-bottom: 1.25rem;
        }
        .pay-tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.85rem 0.5rem;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          background: #ffffff;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        .pay-tab.active {
          border-color: var(--emerald-900);
          background: var(--emerald-50);
          color: var(--emerald-950);
          box-shadow: var(--shadow-sm);
        }
        .gateway-form-container {
          background: #f9faf9;
          border: 1px solid var(--border-light);
          border-radius: var(--radius-md);
          padding: 1.25rem;
        }
        .gateway-hint {
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 0.75rem;
        }
        .card-sub-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 0.6rem;
          margin-top: 0.6rem;
        }
        .hotel-pay-info {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        /* Voucher */
        .voucher-card {
          background: #ffffff;
          border: 2px dashed var(--gold-500);
          border-radius: var(--radius-md);
          padding: 1.75rem;
          box-shadow: var(--shadow-md);
          margin-bottom: 1.5rem;
        }
        .voucher-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 1.25rem;
        }
        .voucher-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .voucher-logo h3 {
          font-size: 1.35rem;
          color: var(--emerald-950);
        }
        .voucher-logo p {
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .voucher-code-box {
          text-align: right;
          background: var(--emerald-50);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-sm);
        }
        .code-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--emerald-800);
        }
        .code-number {
          display: block;
          font-size: 1.3rem;
          font-weight: 800;
          color: var(--emerald-950);
          letter-spacing: 0.05em;
        }
        .voucher-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.9rem;
          margin-bottom: 1.25rem;
        }
        .detail-item {
          display: flex;
          flex-direction: column;
        }
        .detail-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .detail-val {
          font-size: 0.92rem;
          font-weight: 600;
          color: var(--emerald-950);
        }
        .voucher-perks {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-light);
          font-size: 0.82rem;
          color: var(--emerald-800);
          font-weight: 600;
        }
        .voucher-actions-row {
          display: flex;
          gap: 1rem;
        }
        .voucher-action-btn {
          flex: 1;
        }

        /* Footer */
        .booking-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.75rem;
          background: #ffffff;
          border-top: 1px solid var(--border-light);
        }
        .total-summary-display {
          display: flex;
          flex-direction: column;
        }
        .total-label {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
        .total-value {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--emerald-950);
        }
        .modal-nav-buttons {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .nav-btn {
          padding: 0.75rem 1.4rem;
        }
        .pay-submit-btn {
          padding: 0.85rem 1.75rem;
          font-size: 0.95rem;
        }

        @media (max-width: 650px) {
          .booking-modal-header {
            padding: 1rem 1.25rem;
          }
          .modal-title-text {
            font-size: 1.2rem;
          }
          .booking-modal-body {
            padding: 1.25rem 1rem;
          }
          .dates-config-grid {
            grid-template-columns: 1fr;
          }
          .guest-form-grid {
            grid-template-columns: 1fr;
          }
          .voucher-top {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .voucher-details-grid {
            grid-template-columns: 1fr;
          }
          .voucher-actions-row {
            flex-direction: column;
          }
          .booking-modal-footer {
            flex-direction: column;
            gap: 1rem;
            align-items: stretch;
            padding: 1rem 1.25rem;
          }
          .modal-nav-buttons {
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
}
