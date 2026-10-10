import React from 'react';
import { 
  TrendingUp, 
  Users, 
  CalendarCheck, 
  CalendarX, 
  DollarSign, 
  Bed, 
  Sparkles, 
  AlertCircle,
  PlusCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';

export function PmsDashboard({ 
  rooms, 
  reservations, 
  currency, 
  onSelectTab,
  onOpenWalkIn 
}) {
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const cleaningRooms = rooms.filter(r => r.status === 'cleaning').length;
  const maintenanceRooms = rooms.filter(r => r.status === 'maintenance').length;

  const occupancyRate = totalRooms > 0 ? Math.round((occupiedRooms / totalRooms) * 100) : 0;

  // ADR (Average Daily Rate / Tarifa Promedio Diaria de habitaciones ocupadas)
  const totalOccupiedRevenueCOP = rooms
    .filter(r => r.status === 'occupied')
    .reduce((sum, r) => sum + r.priceCOP, 0);

  const adrCOP = occupiedRooms > 0 ? Math.round(totalOccupiedRevenueCOP / occupiedRooms) : 165000;
  const adrUSD = Math.round(adrCOP / HOTEL_INFO.exchangeRate);

  // RevPAR (Revenue Per Available Room = ADR * Ocupación)
  const revparCOP = Math.round((adrCOP * occupancyRate) / 100);
  const revparUSD = Math.round(revparCOP / HOTEL_INFO.exchangeRate);

  // Llegadas y Salidas hoy
  const arrivalsToday = reservations.filter(r => r.status === 'confirmed').length || 1;
  const departuresToday = rooms.filter(r => r.status === 'occupied').length || 2;
  const inHouseGuests = occupiedRooms;

  const formatMoney = (amountCOP, amountUSD) => {
    return currency === 'COP'
      ? `$${amountCOP.toLocaleString('es-CO')} COP`
      : `$${amountUSD} USD`;
  };

  return (
    <div className="pms-dashboard-view">
      {/* 1. KPIs Hoteleros Ejecutivos */}
      <div className="pms-kpi-row">
        <div className="kpi-metric-card">
          <div className="kpi-head">
            <span className="kpi-title">Ocupación General</span>
            <TrendingUp size={18} className="text-emerald" />
          </div>
          <div className="kpi-value">{occupancyRate}%</div>
          <div className="kpi-foot">
            {occupiedRooms} ocupadas • {availableRooms} libres para venta
          </div>
        </div>

        <div className="kpi-metric-card">
          <div className="kpi-head">
            <span className="kpi-title">ADR (Tarifa Promedio)</span>
            <DollarSign size={18} className="text-gold" />
          </div>
          <div className="kpi-value">{formatMoney(adrCOP, adrUSD)}</div>
          <div className="kpi-foot">Promedio noche habitaciones vendidas</div>
        </div>

        <div className="kpi-metric-card">
          <div className="kpi-head">
            <span className="kpi-title">RevPAR</span>
            <DollarSign size={18} className="text-gold" />
          </div>
          <div className="kpi-value">{formatMoney(revparCOP, revparUSD)}</div>
          <div className="kpi-foot">Rendimiento por habitación del hotel</div>
        </div>

        <div className="kpi-metric-card">
          <div className="kpi-head">
            <span className="kpi-title">Huéspedes In-House</span>
            <Users size={18} className="text-emerald" />
          </div>
          <div className="kpi-value">{inHouseGuests} Hab.</div>
          <div className="kpi-foot">Estancias activas en el hotel hoy</div>
        </div>
      </div>

      {/* 2. Movimientos Operativos del Día */}
      <div className="pms-operations-grid mt-4">
        {/* Llegadas y Salidas */}
        <div className="pms-card-box">
          <div className="box-header">
            <h3>Operación del Mostrador (Hoy)</h3>
            <span className="badge-pms">Recepción 24h</span>
          </div>

          <div className="movements-summary-grid">
            <div className="movement-cell">
              <CalendarCheck size={24} className="text-emerald" />
              <div>
                <strong>{arrivalsToday} Llegadas Previstas</strong>
                <p>Check-ins esperados para la tarde</p>
              </div>
            </div>

            <div className="movement-cell">
              <CalendarX size={24} className="text-gold" />
              <div>
                <strong>{departuresToday} Salidas Programadas</strong>
                <p>Check-outs antes de las 12:00</p>
              </div>
            </div>

            <div className="movement-cell">
              <Sparkles size={24} className="text-blue" />
              <div>
                <strong>{cleaningRooms} En Aseo / Mucamas</strong>
                <p>Habitaciones en proceso de alistamiento</p>
              </div>
            </div>

            <div className="movement-cell">
              <AlertCircle size={24} className="text-muted" />
              <div>
                <strong>{maintenanceRooms} Mantenimiento</strong>
                <p>Habitación 204 bloqueada por pintura</p>
              </div>
            </div>
          </div>

          {/* Acciones Rápidas de Recepción */}
          <div className="quick-actions-bar mt-4">
            <button onClick={() => onOpenWalkIn()} className="btn-luxury-primary">
              <PlusCircle size={15} /> Nueva Reserva Walk-In
            </button>
            <button onClick={() => onSelectTab('tapechart')} className="btn-luxury-outline">
              Ver Calendario Tape Chart
            </button>
            <button onClick={() => onSelectTab('housekeeping')} className="btn-luxury-outline">
              Reporte Housekeeping
            </button>
          </div>
        </div>

        {/* Estado en Vivo de Habitaciones */}
        <div className="pms-card-box">
          <div className="box-header">
            <h3>Distribución de Inventario</h3>
            <span className="badge-pms">Total: {totalRooms} Cuartos</span>
          </div>

          <div className="rooms-mini-rack">
            {rooms.map(room => (
              <div 
                key={room.number} 
                onClick={() => onSelectTab('rooms')}
                className={`mini-room-pill ${room.status}`}
                title={`Hab ${room.number}: ${room.type} (${room.status})`}
              >
                <span className="pill-num">{room.number}</span>
                <span className="pill-type">{room.type.split(' ')[0]}</span>
              </div>
            ))}
          </div>

          <div className="rack-legend-row mt-3">
            <span className="legend-item"><span className="dot dot-avail"></span> Disponible ({availableRooms})</span>
            <span className="legend-item"><span className="dot dot-occ"></span> Ocupada ({occupiedRooms})</span>
            <span className="legend-item"><span className="dot dot-clean"></span> Limpieza ({cleaningRooms})</span>
            <span className="legend-item"><span className="dot dot-maint"></span> Mantenimiento ({maintenanceRooms})</span>
          </div>
        </div>
      </div>

      <style>{`
        .pms-kpi-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
        }
        .kpi-metric-card {
          background: #ffffff;
          padding: 1.75rem;
          border: 1px solid rgba(14, 32, 26, 0.08);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(14, 32, 26, 0.04);
          display: flex;
          flex-direction: column;
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .kpi-metric-card:hover {
          transform: translateY(-2px);
          border-color: rgba(197, 160, 89, 0.4);
          box-shadow: 0 12px 30px rgba(14, 32, 26, 0.08);
        }
        .kpi-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }
        .kpi-title {
          font-size: 0.76rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #78857f;
          font-weight: 700;
        }
        .kpi-value {
          font-size: 2.2rem;
          font-weight: 800;
          color: #0e1c17;
          line-height: 1.1;
          margin-bottom: 0.5rem;
          font-family: var(--font-sans);
        }
        .kpi-foot {
          font-size: 0.82rem;
          color: #78857f;
        }

        .pms-operations-grid {
          display: grid;
          grid-template-columns: 1.25fr 1fr;
          gap: 2rem;
        }
        .pms-card-box {
          background: #ffffff;
          padding: 2rem;
          border: 1px solid rgba(14, 32, 26, 0.08);
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(14, 32, 26, 0.05);
        }
        .box-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.75rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(14, 32, 26, 0.08);
        }
        .box-header h3 {
          font-size: 1.35rem;
          color: #0e1c17;
          font-weight: 600;
          font-family: var(--font-serif);
        }
        .badge-pms {
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          background: #faf8f5;
          color: #9e7933;
          border: 1px solid rgba(197, 160, 89, 0.3);
          border-radius: 4px;
        }

        .movements-summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .movement-cell {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          padding: 1.15rem;
          background: #faf8f5;
          border: 1px solid rgba(14, 32, 26, 0.06);
          border-radius: 10px;
        }
        .movement-cell strong {
          display: block;
          font-size: 0.95rem;
          color: #0e1c17;
          margin-bottom: 0.2rem;
        }
        .movement-cell p {
          font-size: 0.82rem;
          color: #78857f;
        }

        .quick-actions-bar {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        /* Mini Rack */
        .rooms-mini-rack {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
          gap: 0.6rem;
        }
        .mini-room-pill {
          padding: 0.65rem 0.4rem;
          text-align: center;
          border-radius: 6px;
          cursor: pointer;
          transition: transform var(--transition-smooth);
        }
        .mini-room-pill:hover {
          transform: translateY(-2px);
        }
        .mini-room-pill.available { background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; }
        .mini-room-pill.occupied { background: #eff6ff; border: 1px solid #bfdbfe; color: #1e40af; }
        .mini-room-pill.cleaning { background: #fffbeb; border: 1px solid #fde68a; color: #92400e; }
        .mini-room-pill.maintenance { background: #f3f4f6; border: 1px solid #e5e7eb; color: #4b5563; }

        .pill-num {
          display: block;
          font-weight: 800;
          font-size: 0.95rem;
        }
        .pill-type {
          display: block;
          font-size: 0.65rem;
          text-transform: uppercase;
        }

        .rack-legend-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          font-size: 0.8rem;
          color: #78857f;
          padding-top: 1rem;
          border-top: 1px solid rgba(14, 32, 26, 0.08);
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .dot-avail { background: #059669; }
        .dot-occ { background: #2563eb; }
        .dot-clean { background: #d97706; }
        .dot-maint { background: #6b7280; }

        .text-emerald { color: #059669; }
        .text-blue { color: #2563eb; }
        .mt-4 { margin-top: 1.5rem; }

        @media (max-width: 992px) {
          .pms-operations-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 600px) {
          .pms-kpi-row {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }
          .kpi-metric-card {
            padding: 1.1rem;
          }
          .kpi-value {
            font-size: 1.6rem;
          }
          .movements-summary-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          .pms-card-box {
            padding: 1.25rem 1rem;
          }
          .quick-actions-bar {
            flex-direction: column;
          }
          .quick-actions-bar button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
