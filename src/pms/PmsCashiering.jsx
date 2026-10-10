import React, { useState } from 'react';
import { 
  CreditCard, DollarSign, Plus, Printer, CheckCircle, Receipt, 
  ShoppingCart, User, ShieldCheck, AlertCircle, ArrowRight, FileText, X
} from 'lucide-react';
import { HOTEL_INFO, MINIBAR_CATALOG, INITIAL_ROOM_CHARGES } from '../data/hotelData';

export function PmsCashiering({ rooms, currency }) {
  const [folios, setFolios] = useState(INITIAL_ROOM_CHARGES);
  const [selectedRoomNumber, setSelectedRoomNumber] = useState('201');
  const [selectedProduct, setSelectedProduct] = useState(MINIBAR_CATALOG[0].id);
  const [productQuantity, setProductQuantity] = useState(1);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showArqueoModal, setShowArqueoModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Estado del Turno de Caja
  const [cashierShift, setCashierShift] = useState({
    operator: "Esteban Montoya",
    shiftName: "Turno Mañana (06:00 - 14:00)",
    openingCashCOP: 200000,
    cashCollectedCOP: 585000,
    cardCollectedCOP: 420000,
    transfersCollectedCOP: 165000,
    status: "open",
    shiftClosedAt: null
  });

  // Estado de Arqueo
  const [physicalCashCounted, setPhysicalCashCounted] = useState(785000);
  const [shiftNotes, setShiftNotes] = useState('');
  const [shiftSuccessBanner, setShiftSuccessBanner] = useState('');

  // Estado de Pago / Abono al Folio
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [paymentAmountCOP, setPaymentAmountCOP] = useState(50000);
  const [paymentRef, setPaymentRef] = useState('');

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

    setShiftSuccessBanner(`Cargo por $${(product.priceCOP * productQuantity).toLocaleString('es-CO')} COP agregado exitosamente a la Habitación ${selectedRoomNumber}.`);
    setTimeout(() => setShiftSuccessBanner(''), 4500);
  };

  // Registrar abono o pago al folio
  const handleRegisterPayment = (e) => {
    e.preventDefault();
    if (!paymentAmountCOP || paymentAmountCOP <= 0) return;

    const methodLabels = {
      cash: 'Efectivo en Recepción',
      card: 'Datáfono / Tarjeta',
      transfer: 'Transferencia Bancaria'
    };

    const newPayment = {
      id: `pay-${Date.now()}`,
      concept: `Abono ${methodLabels[paymentMethod]}${paymentRef ? ` (Ref: ${paymentRef})` : ''}`,
      amountCOP: Number(paymentAmountCOP),
      date: new Date().toISOString().split('T')[0],
      method: paymentMethod
    };

    // Actualizar folio
    setFolios(prev => prev.map(f => {
      if (f.roomNumber === selectedRoomNumber) {
        return {
          ...f,
          payments: [...(f.payments || []), newPayment]
        };
      }
      return f;
    }));

    // Actualizar balances del turno según medio
    setCashierShift(prev => ({
      ...prev,
      cashCollectedCOP: paymentMethod === 'cash' ? prev.cashCollectedCOP + Number(paymentAmountCOP) : prev.cashCollectedCOP,
      cardCollectedCOP: paymentMethod === 'card' ? prev.cardCollectedCOP + Number(paymentAmountCOP) : prev.cardCollectedCOP,
      transfersCollectedCOP: paymentMethod === 'transfer' ? prev.transfersCollectedCOP + Number(paymentAmountCOP) : prev.transfersCollectedCOP,
    }));

    setShowPaymentModal(false);
    setPaymentRef('');
    setShiftSuccessBanner(`Pago de $${Number(paymentAmountCOP).toLocaleString('es-CO')} COP registrado en Habitación ${selectedRoomNumber}. Balance actualizado.`);
    setTimeout(() => setShiftSuccessBanner(''), 4500);
  };

  // Confirmar Cierre / Arqueo
  const handleConfirmCloseShift = () => {
    setCashierShift(prev => ({
      ...prev,
      status: "closed",
      shiftClosedAt: new Date().toLocaleTimeString('es-CO')
    }));
    setShowArqueoModal(false);
    setShiftSuccessBanner(`Turno de caja cerrado formalmente con Acta de Arqueo. Notificación enviada a Gerencia.`);
    setTimeout(() => setShiftSuccessBanner(''), 6000);
  };

  // Cálculo de Balances
  const totalChargesCOP = activeFolio.items.reduce((sum, item) => sum + item.amountCOP, 0);
  const totalPaidCOP = (activeFolio.payments || []).reduce((sum, p) => sum + p.amountCOP, 0);
  const balanceCOP = totalChargesCOP - totalPaidCOP;

  const expectedTotalCashCOP = cashierShift.openingCashCOP + cashierShift.cashCollectedCOP;
  const cashDifferenceCOP = physicalCashCounted - expectedTotalCashCOP;

  const formatMoney = (amountCOP) => {
    return currency === 'COP'
      ? `$${amountCOP.toLocaleString('es-CO')} COP`
      : `$${Math.round(amountCOP / HOTEL_INFO.exchangeRate)} USD`;
  };

  return (
    <div className="pms-cashiering-view">
      {/* Alerta de feedback de acciones */}
      {shiftSuccessBanner && (
        <div className="pms-success-alert-banner">
          <CheckCircle size={18} className="text-emerald shrink-0" />
          <span>{shiftSuccessBanner}</span>
        </div>
      )}

      {/* 1. ESTADO DE CAJA DEL TURNO */}
      <div className="cashier-summary-card">
        <div className="shift-header-line">
          <div>
            <div className="shift-badge-row">
              <span className={`shift-status-pill ${cashierShift.status === 'open' ? 'open' : 'closed'}`}>
                {cashierShift.status === 'open' ? '● Turno Abierto' : '● Turno Cerrado'}
              </span>
              <span className="shift-id-tag">Caja Principal 01</span>
            </div>
            <h3 className="shift-title">Caja de Recepción • {cashierShift.shiftName}</h3>
            <p className="shift-meta">
              Operador en turno: <strong>{cashierShift.operator}</strong> • Caldas, Antioquia
              {cashierShift.shiftClosedAt && ` • Cerrado a las ${cashierShift.shiftClosedAt}`}
            </p>
          </div>

          <div className="shift-header-actions">
            <button 
              type="button"
              onClick={() => setShowArqueoModal(true)}
              className="btn-luxury-primary btn-arqueo"
            >
              <ShieldCheck size={16} /> Realizar Arqueo / Cierre de Turno
            </button>
          </div>
        </div>

        <div className="shift-metrics-grid">
          <div className="shift-metric-cell">
            <span className="metric-label">Fondo Inicial de Caja</span>
            <span className="metric-val">{formatMoney(cashierShift.openingCashCOP)}</span>
            <span className="metric-sub">Base fija de apertura</span>
          </div>

          <div className="shift-metric-cell">
            <span className="metric-label">Efectivo Recibido</span>
            <span className="metric-val text-emerald">{formatMoney(cashierShift.cashCollectedCOP)}</span>
            <span className="metric-sub">Cobros en moneda física</span>
          </div>

          <div className="shift-metric-cell">
            <span className="metric-label">Datáfono / Tarjetas</span>
            <span className="metric-val">{formatMoney(cashierShift.cardCollectedCOP)}</span>
            <span className="metric-sub">Vouchers Redeban / Bold</span>
          </div>

          <div className="shift-metric-cell active-cash-cell">
            <span className="metric-label">Total en Caja Física</span>
            <span className="metric-val text-gold">
              {formatMoney(expectedTotalCashCOP)}
            </span>
            <span className="metric-sub font-semibold">Base inicial + Efectivo</span>
          </div>
        </div>
      </div>

      {/* 2. GESTIÓN DE FOLIOS & CARGOS A HABITACIÓN */}
      <div className="folio-management-grid">
        {/* Selector y Cargar Consumos */}
        <div className="folio-charges-card">
          <div className="card-header-bar">
            <div>
              <h4 className="card-title">Cargar Consumo a Habitación</h4>
              <p className="card-subtitle">Minibar, cafetería y servicios complementarios</p>
            </div>
            <span className="badge-pms-gold">Catálogo Activo</span>
          </div>

          <form onSubmit={handleAddCharge} className="add-charge-form">
            <div className="form-group">
              <label htmlFor="select-room-charge">Habitación Ocupada</label>
              <select 
                id="select-room-charge"
                value={selectedRoomNumber} 
                onChange={e => setSelectedRoomNumber(e.target.value)}
                className="pms-select-input"
              >
                {rooms.filter(r => r.status === 'occupied').map(r => (
                  <option key={r.number} value={r.number}>
                    Habitación {r.number} — {r.guest || 'Huésped In-House'}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="select-product-charge">Artículo o Servicio del Catálogo</label>
              <select 
                id="select-product-charge"
                value={selectedProduct} 
                onChange={e => setSelectedProduct(e.target.value)}
                className="pms-select-input"
              >
                {MINIBAR_CATALOG.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name} — {formatMoney(item.priceCOP)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="input-quantity-charge">Cantidad</label>
                <input 
                  id="input-quantity-charge"
                  type="number" 
                  min="1" 
                  max="20" 
                  value={productQuantity}
                  onChange={e => setProductQuantity(Math.max(1, Number(e.target.value)))}
                  className="pms-number-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-total-charge">Total Cargo</label>
                <input 
                  id="input-total-charge"
                  type="text" 
                  readOnly 
                  value={formatMoney(
                    (MINIBAR_CATALOG.find(p => p.id === selectedProduct)?.priceCOP || 0) * productQuantity
                  )}
                  className="pms-readonly-input"
                />
              </div>
            </div>

            <button type="submit" className="btn-luxury-primary w-full btn-add-charge">
              <Plus size={16} /> Cargar a la Cuenta de la Habitación
            </button>
          </form>
        </div>

        {/* Estado de Cuenta de la Habitación Seleccionada */}
        <div className="folio-statement-card">
          <div className="card-header-bar">
            <div>
              <h4 className="card-title">Folio de Cuenta: Habitación {selectedRoomNumber}</h4>
              <p className="card-subtitle">Huésped Titular: <strong>{activeFolio.guestName}</strong></p>
            </div>

            <div className="folio-actions-right">
              <button 
                type="button"
                onClick={() => setShowPaymentModal(true)}
                className="btn-luxury-primary btn-sm-action"
              >
                <DollarSign size={14} /> Registrar Abono / Pago
              </button>
              <button 
                type="button"
                onClick={() => setShowPrintModal(true)} 
                className="btn-luxury-outline btn-sm-action"
              >
                <Printer size={14} /> Imprimir Folio
              </button>
            </div>
          </div>

          <div className="folio-items-table-wrap">
            <table className="folio-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Concepto / Detalle</th>
                  <th className="text-right">Monto</th>
                </tr>
              </thead>
              <tbody>
                {activeFolio.items.map(item => (
                  <tr key={item.id}>
                    <td className="cell-date">{item.date}</td>
                    <td className="cell-item">{item.item}</td>
                    <td className="text-right cell-amount font-semibold">{formatMoney(item.amountCOP)}</td>
                  </tr>
                ))}
                {(activeFolio.payments || []).map(p => (
                  <tr key={p.id} className="payment-row">
                    <td className="cell-date">{p.date}</td>
                    <td className="cell-item text-emerald font-semibold">
                      ✓ {p.concept || 'Abono Registrado'}
                    </td>
                    <td className="text-right cell-amount text-emerald font-bold">
                      -{formatMoney(p.amountCOP)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="folio-balances-strip">
            <div className="balance-item">
              <span className="balance-tag">Total Cargos</span>
              <strong className="balance-number">{formatMoney(totalChargesCOP)}</strong>
            </div>

            <div className="balance-item">
              <span className="balance-tag">Total Abonado</span>
              <strong className="balance-number text-emerald">
                {formatMoney(totalPaidCOP)}
              </strong>
            </div>

            <div className="balance-item balance-final">
              <span className="balance-tag">Saldo Pendiente</span>
              <strong className={`balance-number ${balanceCOP > 0 ? 'text-gold' : 'text-emerald'}`}>
                {formatMoney(balanceCOP)}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: REGISTRAR ABONO / PAGO AL FOLIO */}
      {showPaymentModal && (
        <div className="modal-overlay" onClick={() => setShowPaymentModal(false)}>
          <div className="modal-content payment-dialog-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-dialog-header">
              <div>
                <h3 className="dialog-title">Registrar Abono o Pago</h3>
                <p className="dialog-subtitle">Habitación {selectedRoomNumber} — {activeFolio.guestName}</p>
              </div>
              <button 
                type="button" 
                onClick={() => setShowPaymentModal(false)}
                className="btn-dialog-close"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRegisterPayment} className="payment-form">
              <div className="payment-balance-preview">
                <div>
                  <span className="prev-label">Saldo Pendiente Actual:</span>
                  <strong className="prev-val">{formatMoney(balanceCOP)}</strong>
                </div>
                <button 
                  type="button"
                  onClick={() => setPaymentAmountCOP(Math.max(0, balanceCOP))}
                  className="btn-pay-all"
                >
                  Liquidar Todo
                </button>
              </div>

              <div className="form-group">
                <label>Medio de Pago</label>
                <div className="payment-methods-grid">
                  <label className={`method-pill ${paymentMethod === 'cash' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="payMethod" 
                      value="cash" 
                      checked={paymentMethod === 'cash'} 
                      onChange={() => setPaymentMethod('cash')} 
                    />
                    <DollarSign size={16} /> Efectivo
                  </label>
                  <label className={`method-pill ${paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="payMethod" 
                      value="card" 
                      checked={paymentMethod === 'card'} 
                      onChange={() => setPaymentMethod('card')} 
                    />
                    <CreditCard size={16} /> Datáfono
                  </label>
                  <label className={`method-pill ${paymentMethod === 'transfer' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="payMethod" 
                      value="transfer" 
                      checked={paymentMethod === 'transfer'} 
                      onChange={() => setPaymentMethod('transfer')} 
                    />
                    <Receipt size={16} /> Transferencia
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="input-amount-cop">Monto a Abonar (COP)</label>
                <input 
                  id="input-amount-cop"
                  type="number" 
                  step="1000"
                  min="1000"
                  max={Math.max(5000000, balanceCOP)}
                  value={paymentAmountCOP}
                  onChange={e => setPaymentAmountCOP(Number(e.target.value))}
                  className="pms-number-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="input-pay-ref">Número de Aprobación / Voucher / Referencia (Opcional)</label>
                <input 
                  id="input-pay-ref"
                  type="text" 
                  placeholder="Ej: Aprobación #89421 - Bold / Bancolombia"
                  value={paymentRef}
                  onChange={e => setPaymentRef(e.target.value)}
                  className="pms-text-input"
                />
              </div>

              <div className="dialog-actions-row">
                <button 
                  type="button" 
                  onClick={() => setShowPaymentModal(false)}
                  className="btn-luxury-outline"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-luxury-primary">
                  <CheckCircle size={16} /> Confirmar Abono de {formatMoney(Number(paymentAmountCOP))}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ARQUEO Y CIERRE DE TURNO */}
      {showArqueoModal && (
        <div className="modal-overlay" onClick={() => setShowArqueoModal(false)}>
          <div className="modal-content arqueo-dialog-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-dialog-header">
              <div>
                <h3 className="dialog-title">Arqueo y Cierre Oficial de Turno</h3>
                <p className="dialog-subtitle">{cashierShift.shiftName} • Operador: {cashierShift.operator}</p>
              </div>
              <button 
                type="button" 
                onClick={() => setShowArqueoModal(false)}
                className="btn-dialog-close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="arqueo-breakdown-box">
              <div className="arqueo-row">
                <span>Base Inicial de Caja (Apertura):</span>
                <strong>{formatMoney(cashierShift.openingCashCOP)}</strong>
              </div>
              <div className="arqueo-row">
                <span>Efectivo Cobrado durante el Turno:</span>
                <strong className="text-emerald">+{formatMoney(cashierShift.cashCollectedCOP)}</strong>
              </div>
              <div className="arqueo-row total-expected-row">
                <span>Total Efectivo Teórico Esperado:</span>
                <strong className="text-primary-dark">{formatMoney(expectedTotalCashCOP)}</strong>
              </div>
              <div className="arqueo-row sub-row">
                <span>Transacciones por Datáfono (Vouchers):</span>
                <span>{formatMoney(cashierShift.cardCollectedCOP)}</span>
              </div>
              <div className="arqueo-row sub-row">
                <span>Transferencias Bancarias Verificadas:</span>
                <span>{formatMoney(cashierShift.transfersCollectedCOP)}</span>
              </div>
            </div>

            <div className="form-group mt-4">
              <label htmlFor="input-physical-cash">Efectivo Físico Contado en Caja (Conteo Real)</label>
              <input 
                id="input-physical-cash"
                type="number"
                step="1000"
                value={physicalCashCounted}
                onChange={e => setPhysicalCashCounted(Number(e.target.value))}
                className="pms-number-input"
              />
            </div>

            <div className={`difference-pill ${cashDifferenceCOP === 0 ? 'balanced' : cashDifferenceCOP > 0 ? 'surplus' : 'deficit'}`}>
              {cashDifferenceCOP === 0 ? (
                <>
                  <CheckCircle size={18} />
                  <span><strong>Caja Cuadrada:</strong> Sin sobrantes ni faltantes (Diferencia: $0 COP)</span>
                </>
              ) : cashDifferenceCOP > 0 ? (
                <>
                  <AlertCircle size={18} />
                  <span><strong>Sobrante de Caja:</strong> +{formatMoney(cashDifferenceCOP)}</span>
                </>
              ) : (
                <>
                  <AlertCircle size={18} />
                  <span><strong>Faltante de Caja:</strong> {formatMoney(cashDifferenceCOP)}</span>
                </>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="input-shift-notes">Observaciones del Cierre de Turno</label>
              <textarea 
                id="input-shift-notes"
                rows="2"
                placeholder="Novedades de huéspedes, vouchers pendientes o entregas al turno entrante..."
                value={shiftNotes}
                onChange={e => setShiftNotes(e.target.value)}
                className="pms-textarea-input"
              />
            </div>

            <div className="dialog-actions-row">
              <button 
                type="button" 
                onClick={() => setShowArqueoModal(false)}
                className="btn-luxury-outline"
              >
                Volver sin Cerrar
              </button>
              <button 
                type="button"
                onClick={handleConfirmCloseShift}
                className="btn-luxury-primary"
              >
                <ShieldCheck size={16} /> Generar Acta y Cerrar Turno
              </button>
            </div>
          </div>
        </div>
      )}

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
                  <th>Descripción del Cargo o Abono</th>
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
                {(activeFolio.payments || []).map(p => (
                  <tr key={p.id}>
                    <td>{p.date}</td>
                    <td>Abono / Pago ({p.concept})</td>
                    <td className="text-right text-emerald">-{formatMoney(p.amountCOP)}</td>
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

      {/* ESTILOS REFINADOS: ESTÉTICA DEL HOTEL BOUTIQUE (WARM LINEN, EMERALD & GOLD) */}
      <style>{`
        .pms-cashiering-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .pms-success-alert-banner {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
          padding: 0.85rem 1.25rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(6, 95, 70, 0.08);
          animation: fadeInDown 0.3s ease;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* 1. TARJETA DE CAJA DEL TURNO */
        .cashier-summary-card {
          background: #ffffff;
          padding: 1.75rem 2rem;
          border: 1px solid rgba(197, 160, 89, 0.22);
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(14, 28, 23, 0.04);
        }

        .shift-header-line {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #f0ebe1;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .shift-badge-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.4rem;
        }

        .shift-status-pill {
          font-size: 0.74rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
        }

        .shift-status-pill.open {
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .shift-status-pill.closed {
          background: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }

        .shift-id-tag {
          font-size: 0.74rem;
          color: #78857f;
          font-weight: 600;
        }

        .shift-title {
          font-size: 1.45rem;
          color: #0e201a;
          font-family: var(--font-serif);
          font-weight: 700;
          margin: 0 0 0.25rem 0;
        }

        .shift-meta {
          font-size: 0.88rem;
          color: #5a6b63;
          margin: 0;
        }

        .btn-arqueo {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          font-weight: 600;
          padding: 0.7rem 1.25rem;
        }

        /* MÉTRICAS DE CAJA */
        .shift-metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
          gap: 1.25rem;
        }

        .shift-metric-cell {
          background: #faf8f5;
          padding: 1.15rem 1.35rem;
          border: 1.5px solid #ece6db;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          transition: all 0.2s ease;
        }

        .shift-metric-cell:hover {
          border-color: #c5a059;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(14, 28, 23, 0.05);
        }

        .shift-metric-cell.active-cash-cell {
          background: linear-gradient(145deg, #faf8f5 0%, #f4ede1 100%);
          border-color: #c5a059;
        }

        .metric-label {
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #5a6b63;
          font-weight: 700;
          margin-bottom: 0.35rem;
        }

        .metric-val {
          font-size: 1.55rem;
          font-weight: 800;
          color: #0e201a;
          line-height: 1.1;
        }

        .metric-sub {
          font-size: 0.74rem;
          color: #78857f;
          margin-top: 0.45rem;
        }

        /* 2. GESTIÓN DE FOLIOS & CARGOS */
        .folio-management-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 1.5rem;
        }

        .folio-charges-card, .folio-statement-card {
          background: #ffffff;
          padding: 1.75rem;
          border: 1px solid rgba(197, 160, 89, 0.22);
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(14, 28, 23, 0.04);
          display: flex;
          flex-direction: column;
        }

        .card-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          padding-bottom: 0.85rem;
          border-bottom: 1px solid #f0ebe1;
          gap: 1rem;
        }

        .card-title {
          font-size: 1.25rem;
          color: #0e201a;
          font-family: var(--font-serif);
          font-weight: 700;
          margin: 0 0 0.2rem 0;
        }

        .card-subtitle {
          font-size: 0.84rem;
          color: #5a6b63;
          margin: 0;
        }

        .badge-pms-gold {
          background: #fdfbf7;
          border: 1px solid #c5a059;
          color: #8a6d2b;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
        }

        /* FORMULARIOS, INPUTS Y SELECTS ESTILIZADOS */
        .add-charge-form {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-size: 0.76rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #0e201a;
          margin-bottom: 0.45rem;
          display: block;
        }

        .pms-select-input {
          width: 100%;
          height: 46px;
          padding: 0.7rem 2.5rem 0.7rem 1rem;
          background-color: #faf8f5;
          border: 1.5px solid #d9d2c5;
          border-radius: 8px;
          font-size: 0.92rem;
          font-family: var(--font-sans);
          color: #0e201a;
          font-weight: 500;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%230e201a' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 15px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .pms-select-input:focus {
          outline: none;
          background-color: #ffffff;
          border-color: #c5a059;
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.2);
        }

        .pms-number-input, .pms-text-input {
          width: 100%;
          height: 46px;
          padding: 0.7rem 1rem;
          background-color: #faf8f5;
          border: 1.5px solid #d9d2c5;
          border-radius: 8px;
          font-size: 0.95rem;
          font-family: var(--font-sans);
          color: #0e201a;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .pms-number-input:focus, .pms-text-input:focus {
          outline: none;
          background-color: #ffffff;
          border-color: #c5a059;
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.2);
        }

        .pms-readonly-input {
          width: 100%;
          height: 46px;
          padding: 0.7rem 1rem;
          background-color: #f2eee6;
          border: 1.5px solid #ded6c8;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 800;
          color: #0e201a;
          cursor: default;
        }

        .pms-textarea-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: #faf8f5;
          border: 1.5px solid #d9d2c5;
          border-radius: 8px;
          font-size: 0.9rem;
          font-family: var(--font-sans);
          color: #0e201a;
          resize: vertical;
          transition: all 0.2s ease;
        }

        .pms-textarea-input:focus {
          outline: none;
          background-color: #ffffff;
          border-color: #c5a059;
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.2);
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 1rem;
        }

        .btn-add-charge {
          margin-top: 0.5rem;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-weight: 700;
        }

        /* TABLA DE FOLIO DE CUENTA */
        .folio-actions-right {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .btn-sm-action {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.55rem 0.9rem;
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: 6px;
        }

        .folio-items-table-wrap {
          flex: 1;
          min-height: 220px;
          max-height: 310px;
          overflow-y: auto;
          margin-bottom: 1.5rem;
          border: 1px solid #f0ebe1;
          border-radius: 8px;
        }

        .folio-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.88rem;
        }

        .folio-table th {
          background: #faf8f5;
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #5a6b63;
          font-weight: 700;
          padding: 0.85rem 1rem;
          border-bottom: 1.5px solid #ece6db;
          text-align: left;
          position: sticky;
          top: 0;
          z-index: 1;
        }

        .folio-table td {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid #f4f0e8;
          color: #0e201a;
        }

        .folio-table tr:hover td {
          background-color: #fdfbf7;
        }

        .payment-row td {
          background-color: #f0fdf4 !important;
        }

        .cell-date {
          font-size: 0.82rem;
          color: #78857f;
          width: 100px;
        }

        .cell-item {
          font-weight: 500;
        }

        .cell-amount {
          width: 140px;
        }

        /* FRANJA DE BALANCES */
        .folio-balances-strip {
          background: #faf8f5;
          padding: 1.15rem 1.4rem;
          border: 1.5px solid #ece6db;
          border-radius: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .balance-item {
          display: flex;
          flex-direction: column;
        }

        .balance-tag {
          font-size: 0.72rem;
          color: #5a6b63;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .balance-number {
          font-size: 1.2rem;
          color: #0e201a;
          font-weight: 800;
        }

        .balance-final .balance-number {
          font-size: 1.35rem;
        }

        /* MODALES */
        .payment-dialog-sheet, .arqueo-dialog-sheet {
          max-width: 540px;
          width: 90%;
          background: #ffffff;
          border-radius: 14px;
          padding: 2rem 2.25rem;
          box-shadow: 0 25px 60px rgba(14, 28, 23, 0.25);
          border: 1px solid rgba(197, 160, 89, 0.35);
        }

        .modal-dialog-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #f0ebe1;
          margin-bottom: 1.35rem;
        }

        .dialog-title {
          font-size: 1.35rem;
          color: #0e201a;
          font-family: var(--font-serif);
          font-weight: 700;
          margin: 0 0 0.25rem 0;
        }

        .dialog-subtitle {
          font-size: 0.85rem;
          color: #5a6b63;
          margin: 0;
        }

        .btn-dialog-close {
          background: none;
          border: none;
          color: #78857f;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .btn-dialog-close:hover {
          color: #0e201a;
          background: #f0ebe1;
        }

        .payment-balance-preview {
          background: #faf8f5;
          padding: 1rem 1.25rem;
          border-radius: 8px;
          border: 1px solid #e8e3d9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .prev-label {
          display: block;
          font-size: 0.74rem;
          text-transform: uppercase;
          color: #5a6b63;
          font-weight: 700;
        }

        .prev-val {
          font-size: 1.3rem;
          color: #c5a059;
          font-weight: 800;
        }

        .btn-pay-all {
          background: #0e201a;
          color: #ffffff;
          border: none;
          padding: 0.45rem 0.85rem;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-pay-all:hover {
          background: #c5a059;
        }

        .payment-methods-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .method-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.75rem 0.5rem;
          background: #faf8f5;
          border: 1.5px solid #d9d2c5;
          border-radius: 8px;
          font-size: 0.84rem;
          font-weight: 600;
          color: #0e201a;
          cursor: pointer;
          transition: all 0.2s;
        }

        .method-pill input {
          display: none;
        }

        .method-pill.selected {
          background: #0e201a;
          border-color: #0e201a;
          color: #ffffff;
        }

        .dialog-actions-row {
          display: flex;
          justify-content: flex-end;
          gap: 0.85rem;
          margin-top: 1.5rem;
          padding-top: 1.25rem;
          border-top: 1px solid #f0ebe1;
        }

        /* ARQUEO BREAKDOWN */
        .arqueo-breakdown-box {
          background: #faf8f5;
          padding: 1.25rem 1.4rem;
          border-radius: 10px;
          border: 1px solid #ece6db;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          font-size: 0.88rem;
        }

        .arqueo-row {
          display: flex;
          justify-content: space-between;
          color: #5a6b63;
        }

        .arqueo-row strong {
          color: #0e201a;
        }

        .total-expected-row {
          border-top: 1.5px dashed #d9d2c5;
          border-bottom: 1.5px dashed #d9d2c5;
          padding: 0.65rem 0;
          font-size: 1rem;
          font-weight: 800;
          color: #0e201a;
        }

        .sub-row {
          font-size: 0.8rem;
          color: #78857f;
        }

        .difference-pill {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.85rem 1.15rem;
          border-radius: 8px;
          font-size: 0.88rem;
          margin-top: 1rem;
        }

        .difference-pill.balanced {
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
        }

        .difference-pill.surplus {
          background: #fefce8;
          border: 1px solid #fef08a;
          color: #854d0e;
        }

        .difference-pill.deficit {
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #991b1b;
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
          .payment-methods-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
