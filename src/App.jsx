import { useState } from 'react';
import './index.css';

import { useTheme }     from './hooks/useTheme';
import Splash           from './components/Splash';
import CursorGlow       from './components/CursorGlow';
import Navbar           from './components/Navbar';
import Hero             from './components/Hero';
import About            from './components/About';
import Skills           from './components/Skills';
import Projects         from './components/Projects';
import Experience       from './components/Experience';
import Contact          from './components/Contact';
import Footer           from './components/Footer';

export default function App() {
  const { isLight, toggle } = useTheme();
  const [splashDone, setSplashDone] = useState(false);

  return (
    <>
      {!splashDone && <Splash onDone={() => setSplashDone(true)} />}

      <CursorGlow isLight={isLight} />

      <Navbar isLight={isLight} onToggleTheme={toggle} />

      <main>
        <Hero />
        <About isLight={isLight} />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
