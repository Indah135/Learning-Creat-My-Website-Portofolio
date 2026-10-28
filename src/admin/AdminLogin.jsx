import { useState } from 'react';
import { getAdminAuth } from '../context/PortfolioContext';

export default function AdminLogin({ onLoginSuccess, onBackToWebsite }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      const storedAuth = getAdminAuth();
      if (
        username.trim() === storedAuth.username &&
        password.trim() === storedAuth.password
      ) {
        onLoginSuccess();
      } else {
        setErrorMsg('Username atau password yang dimasukkan salah.');
        setLoading(false);
      }
    }, 350);
  };

  const handleUseDefault = () => {
    const storedAuth = getAdminAuth();
    setUsername(storedAuth.username || 'admin');
    setPassword(storedAuth.password || 'admin123');
    setErrorMsg('');
  };

  return (
    <div className="admin-root">
      <div className="admin-login-wrap">
        <div className="login-glow-bg" />

        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-badge-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h1 className="admin-login-title">Admin Portal</h1>
            <p className="admin-login-subtitle">
              Area khusus pemilik untuk mengelola portofolio & data website
            </p>
          </div>

          {errorMsg && (
            <div className="admin-alert error">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="admin-form-group">
              <label htmlFor="admin-username">Username</label>
              <div className="admin-input-wrap">
                <span className="admin-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="admin-username"
                  type="text"
                  className="admin-input"
                  placeholder="Masukkan username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="admin-form-group">
              <label htmlFor="admin-password">Password</label>
              <div className="admin-input-wrap">
                <span className="admin-input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  className="admin-input"
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="admin-input-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="admin-btn primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
                  </svg>
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <>
                  <span>Masuk ke Dashboard</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="login-quick-badge">
            <div className="login-quick-header">
              <span>💡 Akun Bawaan (Default):</span>
              <button
                type="button"
                className="login-autofill-btn"
                onClick={handleUseDefault}
              >
                Isi Otomatis
              </button>
            </div>
            <div>
              User: <code style={{ color: '#fff' }}>admin</code> &bull; Password: <code style={{ color: '#fff' }}>admin123</code>
            </div>
          </div>

          <a
            href="#hero"
            className="admin-back-link"
            onClick={(e) => {
              e.preventDefault();
              onBackToWebsite();
            }}
          >
            &larr; Kembali ke Website Utama
          </a>
        </div>
      </div>
    </div>
  );
}
