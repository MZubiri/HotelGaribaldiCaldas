import React, { useState } from 'react';
import { CreditCard, DollarSign, Plus, Printer, CheckCircle, Receipt, ShoppingCart, User } from 'lucide-react';
import { HOTEL_INFO, MINIBAR_CATALOG, INITIAL_ROOM_CHARGES } from '../data/hotelData';

export function PmsCashiering({ rooms, currency }) {
  const [folios, setFolios] = useState(INITIAL_ROOM_CHARGES);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState('201');
  const [selectedProduct, setSelectedProduct] = useState(MINIBAR_CATALOG[0].id);
  const [productQuantity, setProductQuantity] = useState(1);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Estado del Turno de Caja
  const [cashierShift, setCashierShift] = useState({
    operator: "Esteban Montoya",
    shiftName: "Turno Mañana (06:00 - 14:00)",
    openingCashCOP: 200000,
    cashCollectedCOP: 585000,
    cardCollectedCOP: 420000,
    transfersCollectedCOP: 165000,
    status: "open"
  });

  const activeFolio = folios.find(f => f.roomNumber === selectedRoomNumber) || {
    roomNumber: selectedRoomNumber,
    guestName: "Huésped Sin Cuenta",
    items: [],
    payments: []
  };

  // Agregar consumo a la habitación
  const handleAddCharge = (e) => {
    e.preventDefault();
    const product = MINIBAR_CATALOG.find(p => p.id === selectedProduct);
    if (!product) return;

    const newItem = {
      id: `c-${Date.now()}`,
      item: `${product.name} (x${productQuantity})`,
      amountCOP: product.priceCOP * productQuantity,
      date: new Date().toISOString().split('T')[0]
    };

    setFolios(prev => prev.map(f => {
      if (f.roomNumber === selectedRoomNumber) {
        return {
          ...f,
          items: [...f.items, newItem]
        };
      }
      return f;
    }));
  };

  // Cálculo de Balances
  const totalChargesCOP = activeFolio.items.reduce((sum, item) => sum + item.amountCOP, 0);
  const totalPaidCOP = activeFolio.payments.reduce((sum, p) => sum + p.amountCOP, 0);
  const balanceCOP = totalChargesCOP - totalPaidCOP;

  const formatMoney = (amountCOP) => {
    return currency === 'COP'
      ? `$${amountCOP.toLocaleString('es-CO')} COP`
      : `$${Math.round(amountCOP / HOTEL_INFO.exchangeRate)} USD`;
  };

  return (
    <div className="pms-cashiering-view">
      {/* 1. ESTADO DE CAJA DEL TURNO */}
      <div className="cashier-summary-card">
        <div className="shift-header-line">
          <div>
            <h3>Caja de Recepción • {cashierShift.shiftName}</h3>
            <p>Operador en turno: <strong>{cashierShift.operator}</strong> • Turno Abierto</p>
          </div>
          <button 
            onClick={() => alert("Arqueo de caja completado. Comprobante de cierre generado para gerencia.")}
            className="btn-luxury-outline"
          >
            Realizar Arqueo / Cierre de Turno
          </button>
        </div>

        <div className="shift-metrics-grid">
          <div className="shift-metric-cell">
            <span className="metric-label">Fondo Inicial de Caja</span>
            <span className="metric-val">{formatMoney(cashierShift.openingCashCOP)}</span>
          </div>
          <div className="shift-metric-cell">
            <span className="metric-label">Efectivo Recibido</span>
            <span className="metric-val text-emerald">{formatMoney(cashierShift.cashCollectedCOP)}</span>
          </div>
          <div className="shift-metric-cell">
            <span className="metric-label">Datafono / Tarjetas</span>
            <span className="metric-val">{formatMoney(cashierShift.cardCollectedCOP)}</span>
          </div>
          <div className="shift-metric-cell">
            <span className="metric-label">Total en Caja Activa</span>
            <span className="metric-val text-gold font-bold">
              {formatMoney(cashierShift.openingCashCOP + cashierShift.cashCollectedCOP)}
            </span>
          </div>
        </div>
      </div>

      {/* 2. GESTIÓN DE FOLIOS & CARGOS A HABITACIÓN */}
      <div className="folio-management-grid mt-4">
        {/* Selector y Cargar Consumos */}
        <div className="folio-charges-card">
          <div className="card-header-bar">
            <h4>Cargar Consumo a Habitación</h4>
            <span className="badge-pms">Minibar & Servicios</span>
          </div>

          <form onSubmit={handleAddCharge} className="add-charge-form">
            <div className="form-group">
              <label>Habitación Ocupada</label>
              <select 
                value={selectedRoomNumber} 
                onChange={e => setSelectedRoomNumber(e.target.value)}
              >
                {rooms.filter(r => r.status === 'occupied').map(r => (
                  <option key={r.number} value={r.number}>
                    Habitación {r.number} - {r.guest || 'Huésped'}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Artículo o Servicio del Catálogo</label>
              <select 
                value={selectedProduct} 
                onChange={e => setSelectedProduct(e.target.value)}
              >
                {MINIBAR_CATALOG.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} ({formatMoney(item.priceCOP)})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label>Cantidad</label>
                <input 
                  type="number" 
                  min="1" 
                  max="10" 
                  value={productQuantity}
                  onChange={e => setProductQuantity(Number(e.target.value))}
                />
              </div>
              <div className="form-group">
                <label>Total Cargo</label>
                <input 
                  type="text" 
                  readOnly 
                  value={formatMoney(
                    (MINIBAR_CATALOG.find(p => p.id === selectedProduct)?.priceCOP || 0) * productQuantity
                  )}
                  className="readonly-input font-bold"
                />
              </div>
            </div>

            <button type="submit" className="btn-luxury-primary w-full mt-2">
              <Plus size={16} /> Cargar a la Cuenta de la Habitación
            </button>
          </form>
        </div>

        {/* Estado de Cuenta de la Habitación Seleccionada */}
        <div className="folio-statement-card">
          <div className="card-header-bar">
            <div>
              <h4>Folio de Cuenta: Hab {selectedRoomNumber}</h4>
              <p className="text-xs text-muted">Huésped: {activeFolio.guestName}</p>
            </div>

            <button onClick={() => setShowPrintModal(true)} className="btn-luxury-outline btn-print-sm">
              <Printer size={15} /> Imprimir Folio
            </button>
          </div>

          <div className="folio-items-table-wrap">
            <table className="folio-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Concepto</th>
                  <th className="text-right">Monto</th>
                </tr>
              </thead>
              <tbody>
                {activeFolio.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.date}</td>
                    <td>{item.item}</td>
                    <td className="text-right">{formatMoney(item.amountCOP)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="folio-balances-strip">
            <div className="balance-item">
              <span>Total Cargos:</span>
              <strong>{formatMoney(totalChargesCOP)}</strong>
            </div>
            <div className="balance-item">
              <span>Total Abonado:</span>
              <strong className="text-emerald">{formatMoney(totalPaidCOP)}</strong>
            </div>
            <div className="balance-item balance-final">
              <span>Saldo Pendiente:</span>
              <strong className={balanceCOP > 0 ? 'text-gold' : 'text-emerald'}>
                {formatMoney(balanceCOP)}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Impresión de Folio / Factura Oficial */}
      {showPrintModal && (
        <div className="modal-overlay" onClick={() => setShowPrintModal(false)}>
          <div className="modal-content invoice-printable-sheet" onClick={e => e.stopPropagation()}>
            {/* Membrete Oficial */}
            <div className="invoice-header">
              <div className="hotel-letterhead">
                <h2>{HOTEL_INFO.legalName}</h2>
                <p>NIT: {HOTEL_INFO.nit} • {HOTEL_INFO.rnt}</p>
                <p>{HOTEL_INFO.address} • Caldas, Antioquia</p>
                <p>Tel: {HOTEL_INFO.phonePrimary} • {HOTEL_INFO.email}</p>
              </div>

              <div className="invoice-meta-right">
                <span className="invoice-badge">ESTADO DE CUENTA / FOLIO</span>
                <span className="invoice-number">FOLIO #2026-{selectedRoomNumber}</span>
                <span className="invoice-date">Fecha de Emisión: 09/10/2026</span>
              </div>
            </div>

            {/* Datos del Huésped */}
            <div className="guest-invoice-data">
              <div><strong>Huésped:</strong> {activeFolio.guestName}</div>
              <div><strong>Habitación:</strong> Habitación {selectedRoomNumber}</div>
              <div><strong>Atendido por:</strong> Esteban Montoya (Recepción)</div>
            </div>

            {/* Tabla Detallada */}
            <table className="printable-charges-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Descripción del Cargo</th>
                  <th className="text-right">Importe</th>
                </tr>
              </thead>
              <tbody>
                {activeFolio.items.map(it => (
                  <tr key={it.id}>
                    <td>{it.date}</td>
                    <td>{it.item}</td>
                    <td className="text-right">{formatMoney(it.amountCOP)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totales */}
            <div className="invoice-totals-box">
              <div className="tot-line">
                <span>Subtotal Alojamiento & Consumos:</span>
                <span>{formatMoney(totalChargesCOP)}</span>
              </div>
              <div className="tot-line">
                <span>Pagos / Abonos Registrados:</span>
                <span className="text-emerald">-{formatMoney(totalPaidCOP)}</span>
              </div>
              <div className="tot-line grand-tot">
                <span>Saldo Total por Liquidar:</span>
                <span>{formatMoney(balanceCOP)}</span>
              </div>
            </div>

            <div className="invoice-legal-disclaimer">
              <p>Documento equivalente para control interno de hospedaje. En cumplimiento del Decreto 1625 de 2016 y Estatuto Tributario Colombiano.</p>
            </div>

            <div className="invoice-actions-footer no-print">
              <button onClick={() => window.print()} className="btn-luxury-primary">
                <Printer size={16} /> Imprimir Folio
              </button>
              <button onClick={() => setShowPrintModal(false)} className="btn-luxury-outline">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .pms-cashiering-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .cashier-summary-card {
          background: #121822;
          padding: 2rem;
          border: 1px solid #1f2a3a;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }
        .shift-header-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #1f2a3a;
        }
        .shift-header-line h3 {
          font-size: 1.35rem;
          color: #f0f6fc;
          font-family: 'Playfair Display', serif;
        }
        .shift-header-line p {
          font-size: 0.85rem;
          color: #8b96a5;
        }

        .shift-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }
        .shift-metric-cell {
          background: #16202d;
          padding: 1.1rem 1.25rem;
          border: 1px solid #233042;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
        }
        .metric-label {
          font-size: 0.75rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #8b96a5;
          font-weight: 700;
        }
        .metric-val {
          font-size: 1.55rem;
          font-weight: 800;
          color: #f0f6fc;
          margin-top: 0.25rem;
        }

        .folio-management-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 2rem;
        }
        .folio-charges-card, .folio-statement-card {
          background: #121822;
          padding: 2rem;
          border: 1px solid #1f2a3a;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }
        .card-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #1f2a3a;
        }
        .card-header-bar h4 {
          font-size: 1.2rem;
          color: #f0f6fc;
          font-family: 'Playfair Display', serif;
        }
        .add-charge-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* Folio Table */
        .folio-items-table-wrap {
          max-height: 260px;
          overflow-y: auto;
          margin-bottom: 1.5rem;
        }
        .folio-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.88rem;
        }
        .folio-table th, .folio-table td {
          padding: 0.75rem 0.5rem;
          border-bottom: 1px solid #1f2a3a;
        }
        .folio-table th {
          background: #16202d;
          font-size: 0.75rem;
          text-transform: uppercase;
          color: #8b96a5;
        }
        .folio-table td {
          color: #c9d1d9;
        }

        .folio-balances-strip {
          background: #16202d;
          padding: 1.25rem;
          border: 1px solid #233042;
          border-radius: 8px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .balance-item {
          display: flex;
          flex-direction: column;
        }
        .balance-item span {
          font-size: 0.75rem;
          color: #8b96a5;
        }
        .balance-item strong {
          font-size: 1.15rem;
          color: #f0f6fc;
        }

        /* Printable Invoice */
        .invoice-printable-sheet {
          max-width: 680px;
          padding: 3rem;
          background: #ffffff;
        }
        .invoice-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 2rem;
          border-bottom: 2px solid var(--color-primary);
          margin-bottom: 1.5rem;
        }
        .hotel-letterhead h2 {
          font-size: 1.6rem;
          color: var(--color-primary);
        }
        .hotel-letterhead p {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          line-height: 1.35;
        }
        .invoice-meta-right {
          text-align: right;
        }
        .invoice-badge {
          display: block;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--color-gold-dark);
        }
        .invoice-number {
          display: block;
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--color-text-title);
        }
        .invoice-date {
          display: block;
          font-size: 0.78rem;
          color: var(--color-text-muted);
        }

        .guest-invoice-data {
          background: #faf8f5;
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          font-size: 0.88rem;
        }

        .printable-charges-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.88rem;
          margin-bottom: 1.5rem;
        }
        .printable-charges-table th, .printable-charges-table td {
          padding: 0.75rem;
          border-bottom: 1px solid #e5e2da;
        }
        .printable-charges-table th {
          background: #f4f1ea;
          font-size: 0.75rem;
          text-transform: uppercase;
        }

        .invoice-totals-box {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          max-width: 300px;
          margin-left: auto;
          margin-bottom: 2rem;
          font-size: 0.88rem;
        }
        .tot-line {
          display: flex;
          justify-content: space-between;
        }
        .grand-tot {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--color-primary);
          border-top: 2px solid var(--color-primary);
          padding-top: 0.5rem;
          margin-top: 0.35rem;
        }

        .invoice-legal-disclaimer {
          font-size: 0.72rem;
          color: var(--color-text-muted);
          text-align: center;
          padding-top: 1rem;
          border-top: 1px solid #e5e2da;
          margin-bottom: 2rem;
        }
        .invoice-actions-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }

        @media (max-width: 900px) {
          .folio-management-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .invoice-printable-sheet {
            padding: 1.25rem 1rem;
          }
          .invoice-header {
            flex-direction: column;
            gap: 1rem;
          }
          .invoice-meta-right {
            text-align: left;
          }
          .guest-invoice-data {
            grid-template-columns: 1fr;
          }
          .folio-balances-strip {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          .invoice-totals-box {
            max-width: 100%;
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
