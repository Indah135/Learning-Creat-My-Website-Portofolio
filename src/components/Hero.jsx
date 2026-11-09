import { useEffect, useRef, useState } from 'react';
import { usePortfolio, resolveAsset } from '../context/PortfolioContext';

export default function Hero() {
  const { profile } = usePortfolio();
  const marqueeText = profile.marqueeName || profile.name || 'INDAH AMIATI';
  const marqueeNames = Array(6).fill(marqueeText.toUpperCase());
  const heroRef = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    let rafId;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      const rect = heroEl.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetX = x * 16;
      targetY = y * 10;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setOffset({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    heroEl.addEventListener('mousemove', handleMouseMove);
    heroEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      heroEl.removeEventListener('mousemove', handleMouseMove);
      heroEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" ref={heroRef}>
      {/* Marquee background */}
      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-track">
          {marqueeNames.map((name, i) => (
            <span key={i}>{name}</span>
          ))}
        </div>
      </div>

      {/* Center photo */}
      <div
        className="hero-photo-wrap"
        style={{
          transform: `translateX(calc(-50% + ${offset.x.toFixed(2)}px)) translateY(${offset.y.toFixed(2)}px)`,
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <img
          className="hero-photo protected-photo"
          src={resolveAsset(profile.photo || '/photo/indah2.png')}
          alt={profile.name ? `Foto Profil ${profile.name}` : 'Foto Profil'}
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
        <div
          className="protected-photo-shield"
          onContextMenu={(e) => e.preventDefault()}
          aria-hidden="true"
        />
      </div>

      {/* Scroll label */}
      <div
        className="hero-scroll-label"
        onClick={scrollToAbout}
        role="button"
        tabIndex={0}
        aria-label="Scroll ke bagian About"
      >
        <span>SCROLL</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}

