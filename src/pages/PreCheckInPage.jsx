import React, { useState } from 'react';
import { CheckCircle, QrCode, Shield, FileCheck, Smartphone, Send, ArrowRight } from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export function PreCheckInPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    docType: 'CC',
    docNumber: '',
    nationality: 'Colombiana',
    city: '',
    email: '',
    phone: '',
    checkInDate: new Date().toISOString().split('T')[0],
    arrivalTime: '15:00',
    vehiclePlate: '',
    hasKids: 'no',
    emergencyContact: '',
    emergencyPhone: ''
  });

  const [completedPass, setCompletedPass] = useState(null);

  const handleSubmitPreCheckIn = (e) => {
    e.preventDefault();
    const passCode = `GAR-PRE-${Math.floor(1000 + Math.random() * 9000)}`;
    setCompletedPass({
      code: passCode,
      ...formData
    });
  };

  return (
    <div className="precheckin-editorial-page">
      <section className="precheckin-hero">
        <div className="container-narrow text-center">
          <span className="editorial-eyebrow">Agilidad & Cumplimiento Normativo</span>
          <h1 className="editorial-title">Pre-Check-In Digital</h1>
          <div className="gold-divider"></div>
          <p className="editorial-intro">
            Ahorra tiempo a tu llegada al Parque Principal de Caldas. Registra previamente los datos obligatorios exigidos por el Registro Nacional de Turismo y la Policía de Turismo de Colombia y recibe tu llave en el counter en menos de un minuto.
          </p>
        </div>
      </section>

      <section className="precheckin-form-section">
        <div className="container-narrow">
          {!completedPass ? (
            <div className="precheckin-card">
              <div className="precheckin-card-header">
                <h3>Tarjeta de Registro Hotelero (TRA Virtual)</h3>
                <p>Por favor completa los campos con los datos del documento de identidad del titular:</p>
              </div>

              <form onSubmit={handleSubmitPreCheckIn} className="precheckin-form">
                <div className="form-row-2">
                  <div className="field-group">
                    <label>Nombre y Apellidos Completos *</label>
                    <input 
                      type="text" 
                      placeholder="Tal como figura en el documento"
                      value={formData.fullName}
                      onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label>Nacionalidad *</label>
                    <input 
                      type="text" 
                      value={formData.nationality}
                      onChange={e => setFormData({ ...formData, nationality: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="field-group">
                    <label>Tipo de Documento *</label>
                    <select 
                      value={formData.docType}
                      onChange={e => setFormData({ ...formData, docType: e.target.value })}
                    >
                      <option value="CC">Cédula de Ciudadanía (CC)</option>
                      <option value="CE">Cédula de Extranjería (CE)</option>
                      <option value="PASAPORTE">Pasaporte Internacional</option>
                    </select>
                  </div>
                  <div className="field-group">
                    <label>Número de Documento *</label>
                    <input 
                      type="text" 
                      placeholder="Ej. 1020304050"
                      value={formData.docNumber}
                      onChange={e => setFormData({ ...formData, docNumber: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="field-group">
                    <label>Ciudad de Residencia / Procedencia *</label>
                    <input 
                      type="text" 
                      placeholder="Ej. Bogotá, Medellín, Miami"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label>Teléfono Celular / WhatsApp *</label>
                    <input 
                      type="tel" 
                      placeholder="+57 300 123 4567"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label>Correo Electrónico (para confirmación de ingreso) *</label>
                  <input 
                    type="email" 
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="field-group">
                    <label>Fecha Estimada de Llegada *</label>
                    <input 
                      type="date" 
                      value={formData.checkInDate}
                      onChange={e => setFormData({ ...formData, checkInDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label>Hora Aproximada de Arribo</label>
                    <input 
                      type="time" 
                      value={formData.arrivalTime}
                      onChange={e => setFormData({ ...formData, arrivalTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="field-group">
                    <label>Placa de Vehículo (Si requiere parqueadero coordinado)</label>
                    <input 
                      type="text" 
                      placeholder="Ej. AAA-123"
                      value={formData.vehiclePlate}
                      onChange={e => setFormData({ ...formData, vehiclePlate: e.target.value })}
                    />
                  </div>
                  <div className="field-group">
                    <label>Contacto de Emergencia (Nombre y Teléfono)</label>
                    <input 
                      type="text" 
                      placeholder="Ej. María Pérez (310 999 8888)"
                      value={formData.emergencyContact}
                      onChange={e => setFormData({ ...formData, emergencyContact: e.target.value })}
                    />
                  </div>
                </div>

                <div className="legal-checkbox-row">
                  <input type="checkbox" id="legal-terms" required defaultChecked />
                  <label htmlFor="legal-terms">
                    Declaro que los datos suministrados son fidedignos para el Registro de Turismo de Colombia y acepto la política de protección de datos (Habeas Data) del Hotel Plaza Garibaldi.
                  </label>
                </div>

                <button type="submit" className="btn-luxury-primary w-full mt-3">
                  Generar Pase de Llegada Rápida (Fast Track)
                </button>
              </form>
            </div>
          ) : (
            <div className="pass-result-card">
              <div className="pass-header">
                <CheckCircle size={36} className="text-gold mb-1" />
                <h2>¡Pre-Check-In Completado con Éxito!</h2>
                <p>Presenta este código al ingresar al lobby en la Carrera 49 # 129 Sur 18:</p>
              </div>

              <div className="pass-code-banner">
                <span className="pass-code-title">CÓDIGO FAST TRACK</span>
                <span className="pass-code-num">{completedPass.code}</span>
              </div>

              <div className="pass-summary-grid">
                <div><strong>Huésped:</strong> {completedPass.fullName}</div>
                <div><strong>Documento:</strong> {completedPass.docType} {completedPass.docNumber}</div>
                <div><strong>Fecha:</strong> {completedPass.checkInDate} (aprox. {completedPass.arrivalTime})</div>
                <div><strong>Procedencia:</strong> {completedPass.city}</div>
              </div>

              <div className="pass-actions-row">
                <a 
                  href={`https://wa.me/${HOTEL_INFO.whatsapp}?text=${encodeURIComponent(`Hola Hotel Plaza Garibaldi, completé mi Pre-Check-in web. Mi código de llegada rápida es: ${completedPass.code} a nombre de ${completedPass.fullName}. Estaré llegando aproximadamente a las ${completedPass.arrivalTime}.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-primary"
                >
                  <Send size={15} /> Notificar a Recepción por WhatsApp
                </a>
                <button onClick={() => window.print()} className="btn-luxury-outline">
                  Imprimir Comprobante
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .precheckin-editorial-page {
          background-color: var(--color-bone);
          padding-bottom: 8rem;
        }
        .precheckin-hero {
          padding: 6rem 0 3.5rem;
          background-color: #ffffff;
          border-bottom: 1px solid var(--border-subtle);
        }
        .precheckin-form-section {
          padding: 5rem 0;
        }
        .precheckin-card {
          background: #ffffff;
          border: 1px solid var(--color-gold-border);
          padding: 3.5rem;
          box-shadow: var(--shadow-editorial);
        }
        .precheckin-card-header {
          margin-bottom: 2.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }
        .precheckin-card-header h3 {
          font-size: 1.85rem;
          color: var(--color-text-title);
          margin-bottom: 0.35rem;
        }
        .precheckin-card-header p {
          font-size: 0.92rem;
          color: var(--color-text-muted);
        }

        .precheckin-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .field-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .field-group label {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--color-text-title);
        }
        .field-group input, .field-group select {
          padding: 0.8rem 1rem;
          border: 1px solid var(--border-line);
          background: #faf8f5;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          outline: none;
        }
        .field-group input:focus, .field-group select:focus {
          border-color: var(--color-gold);
          background: #ffffff;
        }

        .legal-checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.85rem;
          color: var(--color-text-body);
          margin: 0.5rem 0;
        }
        .legal-checkbox-row input {
          margin-top: 0.25rem;
          accent-color: var(--color-primary);
        }

        /* Pass Result */
        .pass-result-card {
          background: #ffffff;
          border: 2px solid var(--color-gold);
          padding: 4rem 3rem;
          text-align: center;
          box-shadow: var(--shadow-editorial);
        }
        .pass-header h2 {
          font-size: 2.2rem;
          color: var(--color-text-title);
          margin-bottom: 0.5rem;
        }
        .pass-header p {
          font-size: 1rem;
          color: var(--color-text-muted);
          margin-bottom: 2rem;
        }
        .pass-code-banner {
          background: var(--color-primary);
          color: #ffffff;
          padding: 1.5rem;
          max-width: 380px;
          margin: 0 auto 2.5rem;
        }
        .pass-code-title {
          display: block;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--color-gold-light);
          margin-bottom: 0.35rem;
        }
        .pass-code-num {
          display: block;
          font-size: 2.2rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          font-family: monospace;
        }
        .pass-summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          text-align: left;
          background: var(--color-canvas);
          padding: 1.5rem;
          margin-bottom: 2.5rem;
          font-size: 0.92rem;
        }
        .pass-actions-row {
          display: flex;
          justify-content: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .precheckin-card { padding: 2rem; }
          .form-row-2 { grid-template-columns: 1fr; }
          .pass-summary-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
