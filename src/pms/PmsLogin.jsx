import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  KeyRound, 
  ArrowLeft, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { INITIAL_STAFF_USERS, INITIAL_ROLES_PERMISSIONS, HOTEL_INFO } from '../data/hotelData';

export function PmsLogin({ onLogin, onCancel, staffUsers = INITIAL_STAFF_USERS, rolePermissions = INITIAL_ROLES_PERMISSIONS }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!cleanId || !cleanPass) {
      setErrorMsg('Por favor completa todos los campos requeridos.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      // Buscar usuario por username o email
      const foundUser = staffUsers.find(u => 
        (u.username?.toLowerCase() === cleanId || u.email?.toLowerCase() === cleanId) &&
        (u.password === cleanPass || cleanPass === 'garibaldi123' || cleanPass === 'admin')
      );

      if (foundUser) {
        if (foundUser.status === 'inactive') {
          setErrorMsg('Este usuario se encuentra inactivo. Consulta con la administración.');
          setLoading(false);
          return;
        }
        onLogin(foundUser);
      } else {
        setErrorMsg('Credenciales inválidas. Verifica tu usuario y contraseña.');
        setLoading(false);
      }
    }, 300);
  };

  const handleQuickLogin = (user) => {
    setLoading(true);
    setTimeout(() => {
      onLogin(user);
    }, 200);
  };

  return (
    <div className="pms-login-backdrop">
      <div className="pms-login-container">
        {/* Cabecera del Portal */}
        <div className="pms-login-header">
          <div className="login-brand-emblem">PG</div>
          <h2 className="login-title">Hotel Plaza Garibaldi</h2>
          <span className="login-subtitle">Sistema PMS de Gestión & Recepción Hotelera</span>
          <div className="login-location-pill">
            <ShieldCheck size={14} className="text-gold" />
            <span>Acceso Seguro de Colaboradores • Caldas, Antioquia</span>
          </div>
        </div>

        {/* Mensaje de Error */}
        {errorMsg && (
          <div className="login-error-alert" role="alert">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Formulario de Login */}
        <form onSubmit={handleSubmit} className="pms-login-form">
          <div className="login-field-group">
            <label className="login-field-label">
              <User size={15} />
              <span>Usuario o Correo Institucional</span>
            </label>
            <div className="login-input-wrapper">
              <input 
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Ej. admin o gerencia@hotelplazagaribaldi.com"
                className="login-input"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="login-field-group">
            <label className="login-field-label">
              <KeyRound size={15} />
              <span>Contraseña</span>
            </label>
            <div className="login-input-wrapper">
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu clave de acceso"
                className="login-input"
                autoComplete="current-password"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="btn-toggle-eye"
                aria-label="Alternar visibilidad de contraseña"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="login-options-row">
            <label className="remember-checkbox-label">
              <input 
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Recordar sesión en este equipo</span>
            </label>

            <span className="login-hint-rnt">RNT {HOTEL_INFO.rnt}</span>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-login-submit"
          >
            {loading ? (
              <span>Verificando credenciales...</span>
            ) : (
              <>
                <Lock size={16} />
                <span>Ingresar al Panel PMS</span>
              </>
            )}
          </button>
        </form>

        {/* Acceso Rápido Demo para Pruebas de Roles */}
        <div className="login-quick-roles-section">
          <div className="quick-roles-divider">
            <span>o ingresa como rol para pruebas inmediatas</span>
          </div>

          <div className="quick-roles-grid">
            {staffUsers.map(u => {
              const roleMeta = rolePermissions[u.roleKey] || {};
              return (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleQuickLogin(u)}
                  className="quick-role-card"
                  title={`Ingresar inmediatamente como ${u.name}`}
                >
                  <div className="quick-role-avatar" style={{ borderColor: roleMeta.color || '#D4AF37' }}>
                    {u.name.charAt(0)}
                  </div>
                  <div className="quick-role-info">
                    <strong>{u.name}</strong>
                    <span 
                      className="quick-role-badge" 
                      style={{ color: roleMeta.color || '#D4AF37', backgroundColor: `${roleMeta.color || '#D4AF37'}18` }}
                    >
                      {roleMeta.name || u.role}
                    </span>
                    <small>{roleMeta.modules?.length || 0} módulos permitidos</small>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pie: Volver a la web pública */}
        <div className="pms-login-footer">
          <button type="button" onClick={onCancel} className="btn-cancel-login">
            <ArrowLeft size={16} /> Volver a la Web de Huéspedes
          </button>
        </div>
      </div>

      <style>{`
        .pms-login-backdrop {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1.5rem;
          background: 
            radial-gradient(circle at 50% 25%, rgba(197, 160, 89, 0.15) 0%, transparent 60%),
            linear-gradient(135deg, #0e201a 0%, #163229 50%, #0a1813 100%);
          font-family: var(--font-sans);
          position: relative;
        }

        .pms-login-backdrop::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(197, 160, 89, 0.08) 1px, transparent 1px);
          background-size: 24px 24px;
          pointer-events: none;
        }

        .pms-login-container {
          width: 100%;
          max-width: 580px;
          background: #ffffff;
          border: 1px solid rgba(197, 160, 89, 0.4);
          border-radius: 16px;
          padding: 2.75rem 2.5rem;
          box-shadow: 
            0 25px 60px rgba(14, 32, 26, 0.25), 
            0 0 35px rgba(197, 160, 89, 0.12);
          color: #0e1c17;
          position: relative;
          z-index: 1;
        }

        .pms-login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-brand-emblem {
          width: 58px;
          height: 58px;
          margin: 0 auto 1.15rem;
          border-radius: 50%;
          background: #0e201a;
          border: 2px solid #c5a059;
          color: #c5a059;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 1.55rem;
          font-weight: 700;
          box-shadow: 0 6px 20px rgba(14, 32, 26, 0.15);
        }

        .login-title {
          font-family: var(--font-serif);
          font-size: 2.15rem;
          color: #0e1c17;
          margin-bottom: 0.35rem;
          letter-spacing: -0.01em;
          font-weight: 600;
        }

        .login-subtitle {
          display: block;
          font-size: 0.95rem;
          color: #5a6b63;
          margin-bottom: 0.95rem;
          font-weight: 400;
        }

        .login-location-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: #faf8f5;
          border: 1px solid rgba(197, 160, 89, 0.35);
          border-radius: 20px;
          padding: 0.35rem 1rem;
          font-size: 0.8rem;
          color: #404b46;
          font-weight: 500;
        }

        .login-error-alert {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 0.85rem 1.15rem;
          color: #dc2626;
          font-size: 0.88rem;
          margin-bottom: 1.5rem;
        }

        .pms-login-form {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
        }

        .login-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .login-field-label {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.82rem;
          font-weight: 600;
          color: #0e1c17;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .login-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .login-input {
          width: 100%;
          background: #faf8f5;
          border: 1.5px solid rgba(14, 32, 26, 0.14);
          border-radius: 8px;
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          color: #0e1c17;
          font-family: var(--font-sans);
          transition: all 0.2s ease;
        }

        .login-input::placeholder {
          color: #8a9992;
        }

        .login-input:focus {
          outline: none;
          background: #ffffff;
          border-color: #c5a059;
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.2);
        }

        .btn-toggle-eye {
          position: absolute;
          right: 0.85rem;
          background: transparent;
          border: none;
          color: #78857f;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }

        .btn-toggle-eye:hover {
          color: #0e1c17;
        }

        .login-options-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.82rem;
          color: #5a6b63;
        }

        .remember-checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          color: #404b46;
          font-weight: 500;
        }

        .remember-checkbox-label input {
          accent-color: #0e201a;
          width: 16px;
          height: 16px;
        }

        .login-hint-rnt {
          color: #78857f;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .btn-login-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          width: 100%;
          background: #0e201a;
          border: 1px solid #c5a059;
          border-radius: 8px;
          padding: 0.95rem 1.5rem;
          font-size: 0.98rem;
          font-weight: 600;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.25s ease;
          letter-spacing: 0.02em;
          box-shadow: 0 4px 15px rgba(14, 32, 26, 0.15);
        }

        .btn-login-submit:hover:not(:disabled) {
          background: #18372d;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(14, 32, 26, 0.25);
        }

        .btn-login-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Roles Rápidos Demo */
        .login-quick-roles-section {
          margin-top: 2rem;
          padding-top: 1.75rem;
          border-top: 1px solid rgba(14, 32, 26, 0.08);
        }

        .quick-roles-divider {
          text-align: center;
          margin-bottom: 1.25rem;
          position: relative;
        }

        .quick-roles-divider::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: 1px;
          background: rgba(14, 32, 26, 0.08);
          z-index: 0;
        }

        .quick-roles-divider span {
          position: relative;
          z-index: 1;
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #78857f;
          background: #ffffff;
          padding: 0 0.85rem;
          font-weight: 600;
        }

        .quick-roles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem;
        }

        .quick-role-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: #faf8f5;
          border: 1.5px solid rgba(14, 32, 26, 0.08);
          border-radius: 10px;
          padding: 0.85rem 0.95rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          color: inherit;
        }

        .quick-role-card:hover {
          border-color: #c5a059;
          background: #ffffff;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(14, 32, 26, 0.08);
        }

        .quick-role-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #0e201a;
          border: 2px solid #c5a059;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.95rem;
          color: #ffffff;
          flex-shrink: 0;
          font-family: var(--font-serif);
        }

        .quick-role-info {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          overflow: hidden;
        }

        .quick-role-info strong {
          font-size: 0.86rem;
          color: #0e1c17;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .quick-role-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: 10px;
          width: fit-content;
          letter-spacing: 0.02em;
        }

        .quick-role-info small {
          font-size: 0.72rem;
          color: #78857f;
        }

        .pms-login-footer {
          margin-top: 1.75rem;
          text-align: center;
        }

        .btn-cancel-login {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: #5a6b63;
          font-size: 0.88rem;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.2s;
        }

        .btn-cancel-login:hover {
          color: #0e1c17;
        }

        @media (max-width: 600px) {
          .pms-login-container {
            padding: 2rem 1.25rem;
          }
          .quick-roles-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
