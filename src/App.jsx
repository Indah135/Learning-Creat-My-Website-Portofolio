import { useState, useEffect } from 'react';
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
import AdminPortal from './admin/AdminPortal';

function PortfolioMain({ isLight, onToggleTheme, onOpenAdmin }) {
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

      <Footer onOpenAdmin={onOpenAdmin} />
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
        <AdminPortal onBackToWebsite={navigateToWebsite} />
      ) : (
        <PortfolioMain
          isLight={isLight}
          onToggleTheme={toggle}
          onOpenAdmin={navigateToAdmin}
        />
      )}
    </PortfolioProvider>
  );
}
