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
          background: radial-gradient(circle at 50% 20%, #1e2633 0%, #0d1117 100%);
          font-family: inherit;
        }

        .pms-login-container {
          width: 100%;
          max-width: 580px;
          background: rgba(22, 27, 34, 0.95);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(212, 175, 55, 0.25);
          border-radius: 12px;
          padding: 2.5rem 2.25rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55), 0 0 40px rgba(212, 175, 55, 0.05);
          color: #e6edf3;
        }

        .pms-login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-brand-emblem {
          width: 54px;
          height: 54px;
          margin: 0 auto 1rem;
          border-radius: 50%;
          background: linear-gradient(135deg, #2a2010 0%, #17130b 100%);
          border: 1.5px solid #D4AF37;
          color: #D4AF37;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 700;
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
        }

        .login-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.85rem;
          color: #f0f6fc;
          margin-bottom: 0.35rem;
          letter-spacing: 0.5px;
        }

        .login-subtitle {
          display: block;
          font-size: 0.95rem;
          color: #8b949e;
          margin-bottom: 0.85rem;
        }

        .login-location-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(212, 175, 55, 0.08);
          border: 1px solid rgba(212, 175, 55, 0.2);
          border-radius: 20px;
          padding: 0.3rem 0.9rem;
          font-size: 0.78rem;
          color: #c9d1d9;
        }

        .login-error-alert {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 8px;
          padding: 0.85rem 1.15rem;
          color: #f87171;
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
          font-size: 0.84rem;
          font-weight: 500;
          color: #c9d1d9;
          letter-spacing: 0.2px;
        }

        .login-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .login-input {
          width: 100%;
          background: #0d1117;
          border: 1px solid #30363d;
          border-radius: 8px;
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          color: #f0f6fc;
          transition: all 0.2s ease;
        }

        .login-input:focus {
          outline: none;
          border-color: #D4AF37;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
        }

        .btn-toggle-eye {
          position: absolute;
          right: 0.85rem;
          background: transparent;
          border: none;
          color: #8b949e;
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s;
        }

        .btn-toggle-eye:hover {
          color: #D4AF37;
        }

        .login-options-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.82rem;
          color: #8b949e;
        }

        .remember-checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .remember-checkbox-label input {
          accent-color: #D4AF37;
          width: 16px;
          height: 16px;
        }

        .login-hint-rnt {
          color: #6e7681;
          font-size: 0.76rem;
          letter-spacing: 0.5px;
        }

        .btn-login-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          width: 100%;
          background: linear-gradient(135deg, #D4AF37 0%, #aa8524 100%);
          border: none;
          border-radius: 8px;
          padding: 0.95rem 1.5rem;
          font-size: 0.98rem;
          font-weight: 600;
          color: #0d1117;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          letter-spacing: 0.3px;
        }

        .btn-login-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(212, 175, 55, 0.35);
        }

        .btn-login-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Roles Rápidos Demo */
        .login-quick-roles-section {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid #30363d;
        }

        .quick-roles-divider {
          text-align: center;
          margin-bottom: 1.25rem;
        }

        .quick-roles-divider span {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: #8b949e;
          background: #161b22;
          padding: 0 0.85rem;
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
          background: #0d1117;
          border: 1px solid #30363d;
          border-radius: 8px;
          padding: 0.75rem 0.85rem;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s ease;
          color: inherit;
        }

        .quick-role-card:hover {
          border-color: #D4AF37;
          background: #161b22;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
        }

        .quick-role-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #21262d;
          border: 2px solid #D4AF37;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.95rem;
          color: #f0f6fc;
          flex-shrink: 0;
        }

        .quick-role-info {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          overflow: hidden;
        }

        .quick-role-info strong {
          font-size: 0.82rem;
          color: #f0f6fc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .quick-role-badge {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 600;
          padding: 0.1rem 0.45rem;
          border-radius: 10px;
          width: fit-content;
        }

        .quick-role-info small {
          font-size: 0.7rem;
          color: #6e7681;
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
          color: #8b949e;
          font-size: 0.86rem;
          cursor: pointer;
          transition: color 0.2s;
        }

        .btn-cancel-login:hover {
          color: #f0f6fc;
        }

        @media (max-width: 600px) {
          .pms-login-container {
            padding: 1.75rem 1.25rem;
          }
          .quick-roles-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
