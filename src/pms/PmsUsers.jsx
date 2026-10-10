import React, { useState } from 'react';
import { 
  UserCheck, 
  Plus, 
  Shield, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle2, 
  Settings2, 
  Lock, 
  Unlock, 
  RotateCcw, 
  Save, 
  AlertTriangle,
  LayoutDashboard,
  Calendar,
  Bed,
  ClipboardList,
  Users,
  Sparkles,
  CreditCard,
  History,
  KeyRound
} from 'lucide-react';
import { INITIAL_STAFF_USERS, INITIAL_ROLES_PERMISSIONS } from '../data/hotelData';

export function PmsUsers({ 
  staffUsers = INITIAL_STAFF_USERS,
  onUpdateStaffUsers,
  rolePermissions = INITIAL_ROLES_PERMISSIONS,
  onUpdateRolePermissions,
  currentUser,
  onLogAction
}) {
  const [activeSubTab, setActiveSubTab] = useState('users'); // 'users' | 'permissions'
  const [users, setUsers] = useState(staffUsers);
  const [rolesConfig, setRolesConfig] = useState(rolePermissions);
  const [selectedRoleKey, setSelectedRoleKey] = useState('receptionist');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // Formulario nuevo usuario
  const [newUser, setNewUser] = useState({
    name: '',
    roleKey: 'receptionist',
    role: 'Recepcionista Principal',
    username: '',
    password: '',
    email: '',
    phone: '',
    shift: 'Turno Mañana (06:00 - 14:00)'
  });

  const canEditPermissions = currentUser?.roleKey === 'admin' || rolePermissions[currentUser?.roleKey]?.capabilities?.canEditPermissions;

  const moduleDefinitions = [
    { id: 'dashboard', label: 'Dashboard Ejecutivo', desc: 'KPIs en vivo, RevPAR, ADR, Ocupación y Rack resumen', icon: LayoutDashboard },
    { id: 'tapechart', label: 'Calendario Tape Chart', desc: 'Gantt visual de 10 días y ocupación de pisos', icon: Calendar },
    { id: 'rooms', label: 'CRUD Habitaciones', desc: 'Inventario físico, tarifas en COP/USD y comodidades', icon: Bed },
    { id: 'reservations', label: 'Reservas & Walk-In', desc: 'Check-in, check-out y recepción de huéspedes directos', icon: ClipboardList },
    { id: 'guests', label: 'Clientes / CRM Huéspedes', desc: 'Historial de estancias, documentos y notas VIP', icon: Users },
    { id: 'housekeeping', label: 'Housekeeping & Pasar Lista', desc: 'Asistencia de camareras, estado de aseo y novedades', icon: Sparkles },
    { id: 'cashiering', label: 'Caja, Turnos & Folios', desc: 'Arqueo de turnos, cargos de minibar y factura fiscal', icon: CreditCard },
    { id: 'users', label: 'Personal & Roles', desc: 'Directorio de colaboradores y matriz de permisos', icon: UserCheck },
    { id: 'audit', label: 'Auditoría de Actividades', desc: 'Registro inmutable de transacciones y exportación', icon: History }
  ];

  const capabilityDefinitions = [
    { key: 'canEditRooms', label: 'Crear y Modificar Habitaciones', desc: 'Modificar tarifas base, capacidad y descripción de suites' },
    { key: 'canDeleteRooms', label: 'Eliminar Habitaciones del Inventario', desc: 'Acción destructiva para dar de baja inventario físico' },
    { key: 'canManageUsers', label: 'Administrar Usuarios del Personal', desc: 'Crear colaboradores, asignar turnos y cambiar contraseñas' },
    { key: 'canEditPermissions', label: 'Configurar Matriz de Permisos', desc: 'Modificar qué módulos y acciones puede ejecutar cada rol' },
    { key: 'canManageCash', label: 'Apertura y Cierre de Turnos de Caja', desc: 'Gestionar arqueos, cobros en efectivo y terminales POS' },
    { key: 'canProcessCheckInOut', label: 'Procesar Check-In y Check-Out', desc: 'Dar ingreso y salida a huéspedes y ocupar inventario' },
    { key: 'canUpdateHousekeeping', label: 'Pasar Lista y Actualizar Aseo', desc: 'Inspeccionar habitaciones e indicar estatus limpia/sucia' },
    { key: 'canExportAudit', label: 'Exportar Informes y Auditorías', desc: 'Descargar datos del hotel en formato CSV o PDF' }
  ];

  // Alternar módulo permitido para el rol seleccionado
  const handleToggleModule = (moduleId) => {
    if (!canEditPermissions) return;

    setRolesConfig(prev => {
      const currentModules = prev[selectedRoleKey]?.modules || [];
      const hasModule = currentModules.includes(moduleId);
      const nextModules = hasModule 
        ? currentModules.filter(m => m !== moduleId)
        : [...currentModules, moduleId];

      return {
        ...prev,
        [selectedRoleKey]: {
          ...prev[selectedRoleKey],
          modules: nextModules
        }
      };
    });
  };

  // Alternar capacidad/acción para el rol seleccionado
  const handleToggleCapability = (capKey) => {
    if (!canEditPermissions) return;

    setRolesConfig(prev => {
      const currentCaps = prev[selectedRoleKey]?.capabilities || {};
      return {
        ...prev,
        [selectedRoleKey]: {
          ...prev[selectedRoleKey],
          capabilities: {
            ...currentCaps,
            [capKey]: !currentCaps[capKey]
          }
        }
      };
    });
  };

  // Guardar cambios de permisos
  const handleSavePermissions = () => {
    if (onUpdateRolePermissions) {
      onUpdateRolePermissions(rolesConfig);
    }
    if (onLogAction) {
      onLogAction(
        currentUser?.name || 'Administración',
        'Permisos de Roles Actualizados',
        `Se reconfiguraron las políticas de acceso para el rol: ${rolesConfig[selectedRoleKey]?.name || selectedRoleKey}.`
      );
    }

    setSaveSuccessMsg(`Políticas para "${rolesConfig[selectedRoleKey]?.name}" guardadas exitosamente.`);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // Restablecer valores de fábrica
  const handleResetToDefault = () => {
    if (!window.confirm('¿Restablecer los permisos de todos los roles a sus valores predeterminados de fábrica?')) return;
    setRolesConfig(INITIAL_ROLES_PERMISSIONS);
    if (onUpdateRolePermissions) {
      onUpdateRolePermissions(INITIAL_ROLES_PERMISSIONS);
    }
    setSaveSuccessMsg('Permisos restaurados a valores de fábrica.');
    setTimeout(() => setSaveSuccessMsg(''), 4000);
  };

  // Crear usuario
  const handleCreateUser = (e) => {
    e.preventDefault();
    const created = {
      id: `usr-${Date.now()}`,
      name: newUser.name,
      role: rolesConfig[newUser.roleKey]?.name || 'Recepcionista',
      roleKey: newUser.roleKey,
      username: newUser.username || newUser.email.split('@')[0],
      password: newUser.password || 'garibaldi123',
      email: newUser.email,
      phone: newUser.phone,
      shift: newUser.shift,
      status: 'active'
    };

    const updated = [...users, created];
    setUsers(updated);
    if (onUpdateStaffUsers) onUpdateStaffUsers(updated);

    if (onLogAction) {
      onLogAction(
        currentUser?.name || 'Administración',
        'Nuevo Usuario Creado',
        `Se dio de alta al colaborador ${created.name} con rol ${created.role}.`
      );
    }

    setIsModalOpen(false);
    setNewUser({
      name: '',
      roleKey: 'receptionist',
      role: 'Recepcionista Principal',
      username: '',
      password: '',
      email: '',
      phone: '',
      shift: 'Turno Mañana (06:00 - 14:00)'
    });
  };

  // Alternar estado activo/inactivo de usuario
  const handleToggleUserStatus = (userId) => {
    const target = users.find(u => u.id === userId);
    if (!target) return;
    if (target.id === currentUser?.id) {
      alert('No puedes desactivar tu propia cuenta activa.');
      return;
    }

    const nextStatus = target.status === 'active' ? 'inactive' : 'active';
    const updated = users.map(u => u.id === userId ? { ...u, status: nextStatus } : u);
    setUsers(updated);
    if (onUpdateStaffUsers) onUpdateStaffUsers(updated);

    if (onLogAction) {
      onLogAction(
        currentUser?.name || 'Administración',
        'Estado de Usuario Modificado',
        `El usuario ${target.name} fue marcado como ${nextStatus === 'active' ? 'Activo' : 'Inactivo / Suspendido'}.`
      );
    }
  };

  const currentRoleData = rolesConfig[selectedRoleKey] || rolesConfig.receptionist;

  return (
    <div className="pms-users-view">
      {/* Selector de Pestañas Superiores */}
      <div className="users-nav-tabs-bar">
        <div className="users-tabs-left">
          <button 
            onClick={() => setActiveSubTab('users')}
            className={`users-tab-pill ${activeSubTab === 'users' ? 'active' : ''}`}
          >
            <UserCheck size={16} />
            <span>Directorio de Personal ({users.length})</span>
          </button>

          <button 
            onClick={() => setActiveSubTab('permissions')}
            className={`users-tab-pill ${activeSubTab === 'permissions' ? 'active' : ''}`}
          >
            <Shield size={16} />
            <span>Gestión de Permisos por Rol</span>
          </button>
        </div>

        {activeSubTab === 'users' ? (
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="btn-luxury-primary"
            disabled={!canEditPermissions}
            title={!canEditPermissions ? 'Requiere permisos de administrador' : ''}
          >
            <Plus size={16} /> Nuevo Colaborador
          </button>
        ) : (
          <div className="permissions-actions-top">
            <button onClick={handleResetToDefault} className="btn-luxury-outline btn-sm">
              <RotateCcw size={14} /> Valores de Fábrica
            </button>
            <button onClick={handleSavePermissions} className="btn-luxury-primary btn-sm" disabled={!canEditPermissions}>
              <Save size={14} /> Guardar Cambios
            </button>
          </div>
        )}
      </div>

      {saveSuccessMsg && (
        <div className="pms-alert-banner success">
          <CheckCircle2 size={16} />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* VISTA 1: DIRECTORIO DE PERSONAL                              */}
      {/* ============================================================ */}
      {activeSubTab === 'users' && (
        <div className="tab-pane-content">
          <div className="users-header-bar">
            <div>
              <h3>Equipo y Operadores del Hotel Plaza Garibaldi</h3>
              <p>Control de turnos, correos de contacto institucional y estado de cuentas de acceso al PMS.</p>
            </div>
          </div>

          <div className="users-cards-grid">
            {users.map(u => {
              const roleMeta = rolesConfig[u.roleKey] || {};
              const isCurrentUser = currentUser?.id === u.id;
              const isActive = u.status === 'active';

              return (
                <div key={u.id} className={`user-profile-card ${!isActive ? 'user-inactive' : ''}`}>
                  <div className="user-card-head">
                    <div 
                      className="user-avatar-box" 
                      style={{ borderColor: roleMeta.color || '#D4AF37', color: roleMeta.color || '#D4AF37' }}
                    >
                      {u.name.charAt(0)}
                    </div>
                    <div className="user-card-head-info">
                      <h4>
                        {u.name}
                        {isCurrentUser && <span className="you-badge">(Tú)</span>}
                      </h4>
                      <span 
                        className="user-role-badge" 
                        style={{ color: roleMeta.color || '#D4AF37', backgroundColor: `${roleMeta.color || '#D4AF37'}18` }}
                      >
                        {roleMeta.name || u.role}
                      </span>
                    </div>

                    <button 
                      onClick={() => handleToggleUserStatus(u.id)}
                      className={`btn-user-status-dot ${isActive ? 'active' : 'inactive'}`}
                      title={isActive ? 'Cuenta Activa (Clic para suspender)' : 'Cuenta Suspendida (Clic para reactivar)'}
                      disabled={!canEditPermissions}
                    >
                      ● {isActive ? 'Activo' : 'Inactivo'}
                    </button>
                  </div>

                  <div className="user-details-list">
                    <div className="u-detail">
                      <Clock size={14} className="text-gold" />
                      <span>{u.shift}</span>
                    </div>
                    <div className="u-detail">
                      <Mail size={14} className="text-gold" />
                      <span>{u.email}</span>
                    </div>
                    <div className="u-detail">
                      <Phone size={14} className="text-gold" />
                      <span>{u.phone}</span>
                    </div>
                    <div className="u-detail">
                      <KeyRound size={14} className="text-gold" />
                      <span>Usuario: <strong>{u.username || u.email.split('@')[0]}</strong></span>
                    </div>
                  </div>

                  <div className="user-card-footer">
                    <span className="perm-label">Módulos Asignados:</span>
                    <div className="perm-pills">
                      {(roleMeta.modules || []).slice(0, 4).map(modId => (
                        <span key={modId} className="p-pill">{modId}</span>
                      ))}
                      {(roleMeta.modules?.length || 0) > 4 && (
                        <span className="p-pill plus">+{(roleMeta.modules?.length || 0) - 4} más</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* VISTA 2: GESTIÓN DE PERMISOS POR ROL                         */}
      {/* ============================================================ */}
      {activeSubTab === 'permissions' && (
        <div className="tab-pane-content">
          {/* Selector de Rol a Configurar */}
          <div className="role-selector-strip">
            <span className="selector-title">Selecciona el Rol a configurar:</span>
            <div className="role-pills-row">
              {Object.keys(rolesConfig).map(rKey => {
                const r = rolesConfig[rKey];
                const isSelected = selectedRoleKey === rKey;
                return (
                  <button
                    key={rKey}
                    onClick={() => setSelectedRoleKey(rKey)}
                    className={`role-select-btn ${isSelected ? 'selected' : ''}`}
                    style={isSelected ? { borderColor: r.color, backgroundColor: `${r.color}15` } : {}}
                  >
                    <span className="role-color-dot" style={{ backgroundColor: r.color }}></span>
                    <span className="role-btn-name">{r.name}</span>
                    <span className="role-mod-count">({r.modules?.length || 0} módulos)</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Banner de Info del Rol Seleccionado */}
          <div className="role-hero-banner" style={{ borderLeftColor: currentRoleData.color }}>
            <div className="role-hero-left">
              <div className="role-title-row">
                <h4 style={{ color: currentRoleData.color }}>{currentRoleData.name}</h4>
                <span className="role-key-tag">Identificador: {currentRoleData.roleKey}</span>
              </div>
              <p className="role-desc">{currentRoleData.description}</p>
            </div>

            {!canEditPermissions && (
              <div className="role-readonly-notice">
                <AlertTriangle size={15} />
                <span>Solo Administradores pueden editar permisos</span>
              </div>
            )}
          </div>

          <div className="permissions-matrix-grid">
            {/* Columna Izquierda: Acceso a Módulos */}
            <div className="perm-column-box">
              <div className="perm-column-header">
                <div>
                  <h4>1. Acceso a Módulos del Sistema</h4>
                  <p>Define qué pantallas y pestañas del menú lateral puede ver este rol.</p>
                </div>
                <span className="count-badge">
                  {currentRoleData.modules?.length} / {moduleDefinitions.length}
                </span>
              </div>

              <div className="modules-toggle-list">
                {moduleDefinitions.map(mod => {
                  const hasAccess = currentRoleData.modules?.includes(mod.id);
                  const Icon = mod.icon;

                  return (
                    <div 
                      key={mod.id} 
                      className={`module-toggle-item ${hasAccess ? 'has-access' : ''} ${!canEditPermissions ? 'readonly' : ''}`}
                      onClick={() => handleToggleModule(mod.id)}
                    >
                      <div className="mod-info-left">
                        <div className={`mod-icon-wrapper ${hasAccess ? 'active' : ''}`}>
                          <Icon size={17} />
                        </div>
                        <div>
                          <strong>{mod.label}</strong>
                          <p>{mod.desc}</p>
                        </div>
                      </div>

                      <div className="toggle-switch-wrapper">
                        <div className={`custom-switch ${hasAccess ? 'checked' : ''}`}>
                          <div className="switch-handle"></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Columna Derecha: Capacidades y Acciones Críticas */}
            <div className="perm-column-box">
              <div className="perm-column-header">
                <div>
                  <h4>2. Capacidades & Acciones Especiales</h4>
                  <p>Restricciones de alto impacto como eliminar inventario o gestionar caja.</p>
                </div>
                <span className="count-badge">
                  {Object.values(currentRoleData.capabilities || {}).filter(Boolean).length} / {capabilityDefinitions.length}
                </span>
              </div>

              <div className="capabilities-toggle-list">
                {capabilityDefinitions.map(cap => {
                  const isEnabled = !!currentRoleData.capabilities?.[cap.key];

                  return (
                    <div 
                      key={cap.key} 
                      className={`capability-toggle-item ${isEnabled ? 'enabled' : ''} ${!canEditPermissions ? 'readonly' : ''}`}
                      onClick={() => handleToggleCapability(cap.key)}
                    >
                      <div className="cap-info-left">
                        <div className={`cap-status-icon ${isEnabled ? 'allowed' : 'denied'}`}>
                          {isEnabled ? <Unlock size={14} /> : <Lock size={14} />}
                        </div>
                        <div>
                          <strong>{cap.label}</strong>
                          <p>{cap.desc}</p>
                        </div>
                      </div>

                      <div className="toggle-switch-wrapper">
                        <div className={`custom-switch ${isEnabled ? 'checked' : ''}`}>
                          <div className="switch-handle"></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Nuevo Colaborador */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content users-modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-header-line">
              <h3>Crear Nuevo Usuario del Hotel</h3>
              <p>Asigna credenciales institucionales, rol y turno de trabajo.</p>
            </div>

            <form onSubmit={handleCreateUser} className="users-form">
              <div className="form-group">
                <label>Nombre Completo del Colaborador *</label>
                <input 
                  type="text" 
                  value={newUser.name}
                  onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Ej. Camila Morales Salazar"
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Rol Asignado</label>
                  <select 
                    value={newUser.roleKey}
                    onChange={e => {
                      const rKey = e.target.value;
                      setNewUser({ ...newUser, roleKey: rKey, role: rolesConfig[rKey]?.name || rKey });
                    }}
                  >
                    {Object.keys(rolesConfig).map(rk => (
                      <option key={rk} value={rk}>{rolesConfig[rk]?.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Turno Asignado</label>
                  <input 
                    type="text" 
                    value={newUser.shift}
                    onChange={e => setNewUser({ ...newUser, shift: e.target.value })}
                    placeholder="Ej. Turno Mañana (06:00 - 14:00)"
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Nombre de Usuario (Para Login) *</label>
                  <input 
                    type="text" 
                    value={newUser.username}
                    onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                    placeholder="Ej. camila.morales"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Contraseña Temporal *</label>
                  <input 
                    type="password" 
                    value={newUser.password}
                    onChange={e => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="Contraseña inicial"
                    required
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Correo Electrónico *</label>
                  <input 
                    type="email" 
                    value={newUser.email}
                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="correo@hotelplazagaribaldi.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Teléfono Celular *</label>
                  <input 
                    type="tel" 
                    value={newUser.phone}
                    onChange={e => setNewUser({ ...newUser, phone: e.target.value })}
                    placeholder="+57 300 000 0000"
                    required
                  />
                </div>
              </div>

              <div className="modal-actions-row">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-luxury-outline">
                  Cancelar
                </button>
                <button type="submit" className="btn-luxury-primary">
                  Registrar Colaborador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .pms-users-view {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .users-nav-tabs-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          background: #161b22;
          border: 1px solid #30363d;
          border-radius: 8px;
          padding: 0.75rem 1rem;
        }

        .users-tabs-left {
          display: flex;
          gap: 0.5rem;
        }

        .users-tab-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 6px;
          padding: 0.55rem 1rem;
          font-size: 0.88rem;
          font-weight: 500;
          color: #8b949e;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .users-tab-pill:hover {
          color: #f0f6fc;
          background: rgba(255,255,255,0.04);
        }

        .users-tab-pill.active {
          color: #0d1117;
          background: #D4AF37;
          font-weight: 600;
        }

        .permissions-actions-top {
          display: flex;
          gap: 0.5rem;
        }

        .btn-sm {
          padding: 0.45rem 0.85rem !important;
          font-size: 0.82rem !important;
        }

        .pms-alert-banner {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          border-radius: 6px;
          padding: 0.75rem 1rem;
          font-size: 0.86rem;
        }

        .pms-alert-banner.success {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #34d399;
        }

        .users-header-bar {
          margin-bottom: 1rem;
        }

        .users-header-bar h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          color: #f0f6fc;
          margin-bottom: 0.25rem;
        }

        .users-header-bar p {
          color: #8b949e;
          font-size: 0.88rem;
        }

        .users-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.25rem;
        }

        .user-profile-card {
          background: #161b22;
          border: 1px solid #30363d;
          border-radius: 8px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: border-color 0.2s, transform 0.2s;
        }

        .user-profile-card:hover {
          border-color: #D4AF37;
          transform: translateY(-2px);
        }

        .user-profile-card.user-inactive {
          opacity: 0.55;
          filter: grayscale(0.4);
        }

        .user-card-head {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .user-avatar-box {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #0d1117;
          border: 2px solid #D4AF37;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .user-card-head-info {
          flex: 1;
        }

        .user-card-head-info h4 {
          font-size: 0.98rem;
          color: #f0f6fc;
          margin-bottom: 0.2rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .you-badge {
          font-size: 0.7rem;
          color: #D4AF37;
          font-weight: 600;
        }

        .user-role-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.15rem 0.5rem;
          border-radius: 12px;
        }

        .btn-user-status-dot {
          background: transparent;
          border: 1px solid #30363d;
          border-radius: 12px;
          padding: 0.2rem 0.55rem;
          font-size: 0.72rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-user-status-dot.active {
          color: #34d399;
          border-color: rgba(52, 211, 153, 0.4);
        }

        .btn-user-status-dot.inactive {
          color: #f87171;
          border-color: rgba(248, 113, 113, 0.4);
        }

        .user-details-list {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding: 0.75rem 0;
          border-top: 1px solid #21262d;
          border-bottom: 1px solid #21262d;
        }

        .u-detail {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.82rem;
          color: #c9d1d9;
        }

        .user-card-footer {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .perm-label {
          font-size: 0.72rem;
          text-transform: uppercase;
          color: #8b949e;
          letter-spacing: 0.5px;
        }

        .perm-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        .p-pill {
          background: #0d1117;
          border: 1px solid #30363d;
          border-radius: 4px;
          padding: 0.15rem 0.45rem;
          font-size: 0.7rem;
          color: #c9d1d9;
          text-transform: capitalize;
        }

        .p-pill.plus {
          color: #D4AF37;
          border-color: rgba(212, 175, 55, 0.3);
        }

        /* VISTA DE PERMISOS */
        .role-selector-strip {
          background: #161b22;
          border: 1px solid #30363d;
          border-radius: 8px;
          padding: 1rem;
          margin-bottom: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .selector-title {
          font-size: 0.82rem;
          color: #8b949e;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .role-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
        }

        .role-select-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #0d1117;
          border: 1px solid #30363d;
          border-radius: 6px;
          padding: 0.5rem 0.85rem;
          color: #c9d1d9;
          cursor: pointer;
          transition: all 0.2s;
        }

        .role-select-btn:hover {
          border-color: #D4AF37;
          color: #f0f6fc;
        }

        .role-select-btn.selected {
          border-width: 1.5px;
          color: #f0f6fc;
          font-weight: 600;
        }

        .role-color-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .role-mod-count {
          font-size: 0.74rem;
          color: #8b949e;
        }

        .role-hero-banner {
          background: #161b22;
          border: 1px solid #30363d;
          border-left: 4px solid #D4AF37;
          border-radius: 8px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .role-title-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.35rem;
        }

        .role-title-row h4 {
          font-size: 1.2rem;
          font-family: 'Playfair Display', serif;
        }

        .role-key-tag {
          font-size: 0.72rem;
          background: #0d1117;
          border: 1px solid #30363d;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          color: #8b949e;
        }

        .role-desc {
          color: #8b949e;
          font-size: 0.86rem;
          max-width: 720px;
        }

        .role-readonly-notice {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          border-radius: 6px;
          padding: 0.4rem 0.75rem;
          color: #fbbf24;
          font-size: 0.78rem;
        }

        .permissions-matrix-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .perm-column-box {
          background: #161b22;
          border: 1px solid #30363d;
          border-radius: 8px;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .perm-column-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid #21262d;
          padding-bottom: 0.85rem;
        }

        .perm-column-header h4 {
          font-size: 1rem;
          color: #f0f6fc;
          margin-bottom: 0.2rem;
        }

        .perm-column-header p {
          color: #8b949e;
          font-size: 0.78rem;
        }

        .count-badge {
          background: #0d1117;
          border: 1px solid #30363d;
          border-radius: 12px;
          padding: 0.2rem 0.6rem;
          font-size: 0.74rem;
          color: #D4AF37;
          font-weight: 600;
        }

        .modules-toggle-list,
        .capabilities-toggle-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .module-toggle-item,
        .capability-toggle-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #0d1117;
          border: 1px solid #21262d;
          border-radius: 6px;
          padding: 0.75rem 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .module-toggle-item:hover,
        .capability-toggle-item:hover {
          border-color: #30363d;
          background: #131820;
        }

        .module-toggle-item.has-access,
        .capability-toggle-item.enabled {
          border-color: rgba(212, 175, 55, 0.35);
          background: rgba(212, 175, 55, 0.04);
        }

        .module-toggle-item.readonly,
        .capability-toggle-item.readonly {
          cursor: not-allowed;
          opacity: 0.8;
        }

        .mod-info-left,
        .cap-info-left {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          max-width: 80%;
        }

        .mod-icon-wrapper,
        .cap-status-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #161b22;
          color: #8b949e;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .mod-icon-wrapper.active {
          color: #D4AF37;
          background: rgba(212, 175, 55, 0.15);
        }

        .cap-status-icon.allowed {
          color: #34d399;
          background: rgba(52, 211, 153, 0.12);
        }

        .cap-status-icon.denied {
          color: #f87171;
          background: rgba(248, 113, 113, 0.12);
        }

        .mod-info-left strong,
        .cap-info-left strong {
          display: block;
          font-size: 0.86rem;
          color: #f0f6fc;
          margin-bottom: 0.15rem;
        }

        .mod-info-left p,
        .cap-info-left p {
          font-size: 0.74rem;
          color: #8b949e;
          line-height: 1.25;
        }

        /* Switch UI */
        .custom-switch {
          width: 36px;
          height: 20px;
          border-radius: 10px;
          background: #30363d;
          position: relative;
          transition: background 0.2s;
        }

        .custom-switch.checked {
          background: #D4AF37;
        }

        .switch-handle {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform 0.2s;
        }

        .custom-switch.checked .switch-handle {
          transform: translateX(16px);
        }

        /* Modal */
        .users-modal-box {
          max-width: 540px;
          background: #161b22;
          border: 1px solid #30363d;
          border-radius: 10px;
          padding: 2rem;
        }

        .modal-header-line {
          margin-bottom: 1.5rem;
        }

        .modal-header-line h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          color: #f0f6fc;
          margin-bottom: 0.35rem;
        }

        .modal-header-line p {
          color: #8b949e;
          font-size: 0.86rem;
        }

        .users-form {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-group label {
          font-size: 0.82rem;
          color: #c9d1d9;
          font-weight: 500;
        }

        .form-group input,
        .form-group select {
          background: #0d1117;
          border: 1px solid #30363d;
          border-radius: 6px;
          padding: 0.65rem 0.85rem;
          font-size: 0.88rem;
          color: #f0f6fc;
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #D4AF37;
        }

        .modal-actions-row {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        @media (max-width: 860px) {
          .permissions-matrix-grid {
            grid-template-columns: 1fr;
          }
          .form-grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
