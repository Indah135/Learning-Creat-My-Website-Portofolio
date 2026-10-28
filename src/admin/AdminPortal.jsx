import { useState } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import './admin.css';

const SESSION_TOKEN_KEY = 'INDAH_PORTFOLIO_LOGGED_IN';

export default function AdminPortal({ onBackToWebsite }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(SESSION_TOKEN_KEY) === 'true';
  });

  const handleLoginSuccess = () => {
    sessionStorage.setItem(SESSION_TOKEN_KEY, 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onBackToWebsite={onBackToWebsite}
      />
    );
  }

  return (
    <AdminDashboard
      onLogout={handleLogout}
      onBackToWebsite={onBackToWebsite}
    />
  );
}
