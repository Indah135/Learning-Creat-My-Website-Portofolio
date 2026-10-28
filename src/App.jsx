import { useState, useEffect, lazy, Suspense } from 'react';
import './index.css';

import { PortfolioProvider } from './context/PortfolioContext';
import { useTheme } from './hooks/useTheme';
import Splash from './components/Splash';
import CursorGlow from './components/CursorGlow';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

const AdminPortal = lazy(() =>
  import('./admin/AdminPortal').catch(() => ({
    default: ({ onBackToWebsite }) => (
      <div style={{ minHeight: '100vh', background: '#0b0f19', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24, textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: 12 }}>🔒 Admin Area</h2>
        <p style={{ color: '#9ca3af', maxWidth: 450, marginBottom: 24 }}>
          Area admin bersifat privat dan tidak disertakan pada repositori publik ini.
        </p>
        <button
          onClick={onBackToWebsite}
          style={{ background: '#ec4899', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
        >
          &larr; Kembali ke Website Utama
        </button>
      </div>
    ),
  }))
);


function PortfolioMain({ isLight, onToggleTheme }) {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && <Splash onDone={() => setSplashDone(true)} />}

      <CursorGlow isLight={isLight} />

      <Navbar isLight={isLight} onToggleTheme={onToggleTheme} />

      <main>
        <Hero />
        <About isLight={isLight} />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}


export default function App() {
  const { isLight, toggle } = useTheme();

  const checkIsAdmin = () => {
    if (typeof window === 'undefined') return false;
    return (
      window.location.pathname.startsWith('/admin') ||
      window.location.hash === '#admin' ||
      window.location.hash.startsWith('#/admin')
    );
  };

  const [isAdminView, setIsAdminView] = useState(checkIsAdmin);

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdminView(checkIsAdmin());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToAdmin = () => {
    window.location.hash = '#admin';
    setIsAdminView(true);
  };

  const navigateToWebsite = () => {
    if (window.location.hash === '#admin' || window.location.hash.startsWith('#/admin')) {
      window.history.pushState(null, '', window.location.pathname);
    }
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState(null, '', '/');
    }
    setIsAdminView(false);
  };

  return (
    <PortfolioProvider>
      {isAdminView ? (
        <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0b0f19' }} />}>
          <AdminPortal onBackToWebsite={navigateToWebsite} />
        </Suspense>
      ) : (
        <PortfolioMain
          isLight={isLight}
          onToggleTheme={toggle}
        />
      )}


    </PortfolioProvider>
  );
}
