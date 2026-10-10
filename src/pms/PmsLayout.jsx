import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Bed, 
  ClipboardList, 
  Users, 
  Sparkles, 
  CreditCard, 
  ShieldAlert, 
  History, 
  ArrowLeft,
  Clock,
  UserCheck,
  Menu,
  X,
  LogOut,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw
} from 'lucide-react';
import { HOTEL_INFO, INITIAL_ROLES_PERMISSIONS, INITIAL_STAFF_USERS } from '../data/hotelData';

export function PmsLayout({ 
  currentTab, 
  onSelectTab, 
  onBackToPortal, 
  currentUser,
  onLogout,
  onSwitchUser,
  staffUsers = INITIAL_STAFF_USERS,
  rolePermissions = INITIAL_ROLES_PERMISSIONS,
  children 
}) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSwitchUserOpen, setIsSwitchUserOpen] = useState(false);

  const allMenuItems = [
    { id: 'dashboard', label: 'Dashboard Ejecutivo', icon: LayoutDashboard },
    { id: 'tapechart', label: 'Calendario de Ocupación', icon: Calendar },
    { id: 'rooms', label: 'CRUD Habitaciones', icon: Bed },
    { id: 'reservations', label: 'Reservas & Walk-In', icon: ClipboardList },
    { id: 'guests', label: 'Clientes / CRM Huéspedes', icon: Users },
    { id: 'housekeeping', label: 'Housekeeping / Pasar Lista', icon: Sparkles },
    { id: 'cashiering', label: 'Caja, Turnos & Folios', icon: CreditCard },
    { id: 'users', label: 'Personal & Permisos', icon: UserCheck },
    { id: 'audit', label: 'Auditoría de Actividades', icon: History }
  ];

  const currentRoleMeta = rolePermissions[currentUser?.roleKey] || rolePermissions.admin || {};
  const allowedModules = currentRoleMeta.modules || allMenuItems.map(m => m.id);

  // Filtrar ítems de menú permitidos para el rol activo
  const visibleMenuItems = allMenuItems.filter(item => allowedModules.includes(item.id));

  // Verificar si la pestaña actual está autorizada
  const isTabAllowed = allowedModules.includes(currentTab);

  const handleSelectMenuItem = (tabId) => {
    onSelectTab(tabId);
    setIsMobileDrawerOpen(false);
  };

  const handleSelectQuickUser = (user) => {
    setIsSwitchUserOpen(false);
    if (onSwitchUser) {
      onSwitchUser(user);
    }
  };

  return (
    <div className={`pms-app-layout ${isSidebarCollapsed ? 'sidebar-collapsed-mode' : ''}`}>
      {/* Backdrop oscuro para Drawer en Móvil */}
      {isMobileDrawerOpen && (
        <div 
          className="pms-mobile-backdrop" 
          onClick={() => setIsMobileDrawerOpen(false)}
          aria-label="Cerrar menú móvil"
        />
      )}

      {/* Sidebar Lateral (Colapsable en Escritorio y Deslizable en Móvil) */}
      <aside className={`pms-sidebar ${isMobileDrawerOpen ? 'mobile-open' : ''} ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Cabecera del Sidebar con Marca y Botones de Colapso */}
        <div className="pms-sidebar-brand">
          <div className="brand-emblem-wrap">
            <div className="brand-emblem">PG</div>
            {!isSidebarCollapsed && (
              <div className="brand-texts">
                <h3>Hotel Garibaldi</h3>
                <span>PMS Operativo v2.5</span>
              </div>
            )}
          </div>

          {/* Botón de Colapso en Escritorio */}
          <button 
            type="button"
            className="btn-desktop-collapse"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            title={isSidebarCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}
          >
            {isSidebarCollapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
          </button>

          {/* Botón Cerrar Drawer en Móvil */}
          <button 
            type="button"
            className="btn-close-drawer" 
            onClick={() => setIsMobileDrawerOpen(false)}
            aria-label="Cerrar menú"
            title="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tarjeta de Sesión del Colaborador Activo */}
        {!isSidebarCollapsed ? (
          <div className="pms-user-session-card">
            <div className="session-card-main">
              <div 
                className="session-avatar"
                style={{ borderColor: currentRoleMeta.color || '#D4AF37' }}
              >
                {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
              </div>
              <div className="session-info">
                <strong className="session-user-name">{currentUser?.name || 'Operador'}</strong>
                <div className="session-role-line">
                  <span 
                    className="session-role-pill"
                    style={{ 
                      color: currentRoleMeta.color || '#D4AF37', 
                      backgroundColor: `${currentRoleMeta.color || '#D4AF37'}1a` 
                    }}
                  >
                    {currentRoleMeta.badgeLabel || currentRoleMeta.name || currentUser?.role}
                  </span>
                </div>
              </div>
            </div>

            <div className="session-shift-line">
              <Clock size={12} className="text-gold" />
              <span>{currentUser?.shift || 'Turno Activo'}</span>
            </div>

            {/* Acciones de Sesión (Cambiar Rol rápido y Salir) */}
            <div className="session-actions-bar">
              <button 
                type="button"
                onClick={() => setIsSwitchUserOpen(!isSwitchUserOpen)}
                className="btn-session-action"
                title="Cambiar a otro colaborador para probar roles"
              >
                <RefreshCw size={13} />
                <span>Rol</span>
              </button>

              <button 
                type="button"
                onClick={onLogout}
                className="btn-session-action logout"
                title="Cerrar sesión en el PMS"
              >
                <LogOut size={13} />
                <span>Salir</span>
              </button>
            </div>

            {/* Menú desplegable para cambio rápido de usuario / rol */}
            {isSwitchUserOpen && (
              <div className="quick-user-dropdown">
                <span className="dropdown-title">Cambiar usuario en prueba:</span>
                <div className="dropdown-users-list">
                  {staffUsers.map(u => {
                    const rMeta = rolePermissions[u.roleKey] || {};
                    const isCurrent = u.id === currentUser?.id;
                    return (
                      <button
                        key={u.id}
                        onClick={() => handleSelectQuickUser(u)}
                        className={`dropdown-user-btn ${isCurrent ? 'current' : ''}`}
                      >
                        <span className="dropdown-dot" style={{ backgroundColor: rMeta.color || '#D4AF37' }}></span>
                        <div className="dropdown-user-texts">
                          <strong>{u.name}</strong>
                          <small>{rMeta.name || u.role}</small>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Avatar compacto cuando está colapsado en escritorio */
          <div className="pms-collapsed-avatar-box" title={`${currentUser?.name} (${currentRoleMeta.name})`}>
            <div 
              className="session-avatar-mini"
              style={{ borderColor: currentRoleMeta.color || '#D4AF37' }}
            >
              {currentUser?.name ? currentUser.name.charAt(0) : 'U'}
            </div>
          </div>
        )}

        {/* Menú de Módulos (Filtrado por Permisos de Rol) */}
        <nav className="pms-sidebar-nav">
          {!isSidebarCollapsed && (
            <div className="sidebar-section-label">
              <span>Módulos Autorizados ({visibleMenuItems.length})</span>
            </div>
          )}

          {visibleMenuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectMenuItem(item.id)}
                className={`pms-nav-btn ${isActive ? 'active' : ''}`}
                title={isSidebarCollapsed ? item.label : ''}
              >
                <Icon size={19} className="pms-nav-icon" />
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}

          {/* Botón explícito para colapsar en Móvil */}
          <div className="sidebar-mobile-collapse-row">
            <button 
              type="button" 
              onClick={() => setIsMobileDrawerOpen(false)}
              className="btn-collapse-sidebar-mobile"
            >
              <ChevronLeft size={16} />
              <span>Colapsar Menú</span>
            </button>
          </div>
        </nav>

        {/* Pie del Sidebar: Volver al Portal */}
        <div className="pms-sidebar-footer">
          <button onClick={onBackToPortal} className="btn-exit-pms" title="Volver al Portal Web">
            <ArrowLeft size={16} /> 
            {!isSidebarCollapsed && <span>Volver a Web de Huéspedes</span>}
          </button>
        </div>
      </aside>

      {/* Vista Principal */}
      <div className="pms-main-view">
        {/* Cabecera Superior del PMS */}
        <header className="pms-header">
          <div className="pms-header-left">
            <button 
              className="btn-pms-hamburger" 
              onClick={() => setIsMobileDrawerOpen(true)}
              aria-label="Abrir Menú de Módulos"
              title="Abrir Menú de Módulos"
            >
              <Menu size={20} />
              <span className="hamburger-text">Módulos</span>
            </button>

            <div className="pms-header-title">
              <h2>{allMenuItems.find(m => m.id === currentTab)?.label || 'Panel de Gestión'}</h2>
              <span className="pms-header-date">
                Caldas, Antioquia • {new Date().toLocaleDateString('es-CO', { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>

          <div className="pms-header-right">
            <div className="pms-user-chip-desktop">
              <span 
                className="chip-role-badge" 
                style={{ color: currentRoleMeta.color || '#D4AF37', backgroundColor: `${currentRoleMeta.color || '#D4AF37'}1a` }}
              >
                {currentRoleMeta.badgeLabel || currentRoleMeta.name}
              </span>
              <span className="chip-name">{currentUser?.name}</span>
            </div>

            <button onClick={onLogout} className="btn-header-logout" title="Cerrar sesión">
              <LogOut size={16} />
              <span className="logout-text">Cerrar Sesión</span>
            </button>
          </div>
        </header>

        {/* Cuerpo del Módulo Activo o Pantalla de Acceso Restringido */}
        <main className="pms-body">
          {isTabAllowed ? (
            children
          ) : (
            <div className="pms-restricted-screen">
              <div className="restricted-card">
                <div className="restricted-icon-box">
                  <ShieldAlert size={44} className="text-gold" />
                </div>
                <h3>Módulo Restringido</h3>
                <p>
                  El rol <strong>"{currentRoleMeta.name}"</strong> no tiene permisos de acceso al módulo{' '}
                  <strong>"{allMenuItems.find(m => m.id === currentTab)?.label || currentTab}"</strong>.
                </p>
                <div className="restricted-hint">
                  <span>Consulta con la Gerencia o solicita la activación de este módulo en la Matriz de Permisos.</span>
                </div>
                {visibleMenuItems.length > 0 && (
                  <button 
                    onClick={() => onSelectTab(visibleMenuItems[0].id)} 
                    className="btn-luxury-primary"
                  >
                    Ir a {visibleMenuItems[0].label}
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      <style>{`
        .pms-sidebar-brand {
          padding: 1.25rem 1.15rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }

        .brand-emblem-wrap {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          overflow: hidden;
        }

        .brand-emblem {
          width: 38px;
          height: 38px;
          background: #D4AF37;
          color: #0b0f15;
          font-weight: 800;
          font-family: var(--font-serif);
          font-size: 1.15rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          flex-shrink: 0;
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.25);
        }

        .brand-texts h3 {
          font-size: 1.05rem;
          color: #ffffff;
          line-height: 1.1;
          margin: 0;
        }

        .brand-texts span {
          font-size: 0.7rem;
          color: #D4AF37;
          letter-spacing: 0.05em;
        }

        .btn-desktop-collapse {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #8b96a5;
          border-radius: 6px;
          padding: 0.35rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .btn-desktop-collapse:hover {
          color: #D4AF37;
          border-color: #D4AF37;
          background: rgba(212, 175, 55, 0.08);
        }

        .btn-close-drawer {
          display: none;
          background: transparent;
          border: none;
          color: #8b96a5;
          cursor: pointer;
          padding: 0.5rem;
        }

        .btn-close-drawer:hover {
          color: #ffffff;
        }

        /* Avatar en Modo Colapsado */
        .pms-collapsed-avatar-box {
          display: flex;
          justify-content: center;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .session-avatar-mini {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #0d1117;
          border: 2px solid #D4AF37;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-weight: 700;
          color: #f0f6fc;
          font-size: 1rem;
        }

        /* Tarjeta de Sesión */
        .pms-user-session-card {
          margin: 1rem 1rem 0.5rem;
          background: #141c28;
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 8px;
          padding: 0.85rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          position: relative;
        }

        .session-card-main {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .session-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #0d1117;
          border: 2px solid #D4AF37;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-weight: 700;
          font-size: 1rem;
          color: #f0f6fc;
          flex-shrink: 0;
        }

        .session-info {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          overflow: hidden;
        }

        .session-user-name {
          font-size: 0.84rem;
          color: #f0f6fc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .session-role-pill {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 600;
          padding: 0.1rem 0.45rem;
          border-radius: 10px;
          width: fit-content;
        }

        .session-shift-line {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.74rem;
          color: #8b949e;
        }

        .session-actions-bar {
          display: flex;
          gap: 0.45rem;
          padding-top: 0.45rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .btn-session-action {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          padding: 0.35rem 0.5rem;
          font-size: 0.72rem;
          color: #c9d1d9;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-session-action:hover {
          background: rgba(212, 175, 55, 0.15);
          border-color: #D4AF37;
          color: #f0f6fc;
        }

        .btn-session-action.logout:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: #ef4444;
          color: #f87171;
        }

        /* Dropdown cambio rápido de usuario */
        .quick-user-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          margin-top: 0.4rem;
          background: #161b22;
          border: 1px solid #30363d;
          border-radius: 8px;
          padding: 0.75rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
          z-index: 100;
        }

        .dropdown-title {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          color: #8b949e;
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
        }

        .dropdown-users-list {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .dropdown-user-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 6px;
          padding: 0.45rem 0.65rem;
          color: #c9d1d9;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s;
        }

        .dropdown-user-btn:hover {
          border-color: #D4AF37;
          color: #f0f6fc;
        }

        .dropdown-user-btn.current {
          border-color: #D4AF37;
          background: rgba(212, 175, 55, 0.08);
        }

        .dropdown-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dropdown-user-texts strong {
          display: block;
          font-size: 0.78rem;
          color: #f0f6fc;
        }

        .dropdown-user-texts small {
          font-size: 0.68rem;
          color: #8b949e;
        }

        .pms-sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          padding: 0.75rem 0.65rem;
          flex: 1;
          overflow-y: auto;
        }

        .sidebar-section-label {
          padding: 0.5rem 0.85rem 0.35rem;
        }

        .sidebar-section-label span {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #8b949e;
        }

        .pms-nav-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 6px;
          padding: 0.75rem 0.95rem;
          color: #c9d1d9;
          font-size: 0.86rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          width: 100%;
        }

        .pms-nav-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
        }

        .pms-nav-btn.active {
          background: rgba(212, 175, 55, 0.12);
          border-color: rgba(212, 175, 55, 0.35);
          color: #D4AF37;
          font-weight: 600;
        }

        .sidebar-mobile-collapse-row {
          display: none;
          margin-top: 1.5rem;
          padding: 0 0.5rem;
        }

        .btn-collapse-sidebar-mobile {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #17202d;
          border: 1px solid #233042;
          border-radius: 6px;
          padding: 0.75rem;
          color: #D4AF37;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
        }

        .pms-sidebar-footer {
          padding: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .btn-exit-pms {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 6px;
          padding: 0.65rem 0.85rem;
          color: #8b949e;
          font-size: 0.82rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-exit-pms:hover {
          color: #ffffff;
          border-color: rgba(255, 255, 255, 0.3);
          background: rgba(255, 255, 255, 0.04);
        }

        .pms-header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-pms-hamburger {
          display: none;
          align-items: center;
          gap: 0.45rem;
          background: #182230;
          border: 1px solid rgba(212, 175, 55, 0.4);
          border-radius: 6px;
          padding: 0.5rem 0.85rem;
          color: #D4AF37;
          cursor: pointer;
          font-size: 0.82rem;
          font-weight: 600;
        }

        .pms-header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .pms-user-chip-desktop {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          background: #141c28;
          border: 1px solid #1f2a3a;
          border-radius: 20px;
          padding: 0.3rem 0.85rem;
        }

        .chip-role-badge {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.15rem 0.5rem;
          border-radius: 12px;
        }

        .chip-name {
          font-size: 0.84rem;
          color: #f0f6fc;
          font-weight: 500;
        }

        .btn-header-logout {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: transparent;
          border: 1px solid #1f2a3a;
          border-radius: 6px;
          padding: 0.45rem 0.85rem;
          font-size: 0.82rem;
          color: #8b949e;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-header-logout:hover {
          color: #f87171;
          border-color: rgba(248, 113, 113, 0.4);
          background: rgba(239, 68, 68, 0.08);
        }

        /* Pantalla de Acceso Restringido */
        .pms-restricted-screen {
          min-height: 60vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .restricted-card {
          background: #141c28;
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 12px;
          padding: 3rem 2.5rem;
          max-width: 520px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          box-shadow: 0 15px 40px rgba(0,0,0,0.5);
        }

        .restricted-icon-box {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .restricted-card h3 {
          font-family: var(--font-serif);
          font-size: 1.6rem;
          color: #f0f6fc;
        }

        .restricted-card p {
          color: #8b949e;
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .restricted-hint {
          background: #0d1117;
          border: 1px solid #1f2a3a;
          border-radius: 6px;
          padding: 0.75rem 1rem;
          font-size: 0.8rem;
          color: #c9d1d9;
        }

        /* RESPONSIVE & MOBILE DRAWER */
        @media (max-width: 900px) {
          .btn-desktop-collapse {
            display: none !important;
          }

          .btn-close-drawer {
            display: flex !important;
          }

          .btn-pms-hamburger {
            display: inline-flex !important;
          }

          .pms-sidebar {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            bottom: 0 !important;
            width: 290px !important;
            z-index: 1000 !important;
            transform: translateX(-100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.85);
          }

          .pms-sidebar.mobile-open {
            transform: translateX(0) !important;
          }

          .sidebar-mobile-collapse-row {
            display: block !important;
          }

          .pms-mobile-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(5px);
            -webkit-backdrop-filter: blur(5px);
            z-index: 999;
          }

          .pms-header-title h2 {
            font-size: 1.1rem;
          }

          .pms-body {
            padding: 1.25rem 1rem;
          }
        }

        @media (max-width: 768px) {
          .pms-user-chip-desktop,
          .logout-text {
            display: none;
          }
          .btn-header-logout {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
