import { usePortfolio, resolveAsset } from '../context/PortfolioContext';

export default function Hero() {
  const { profile } = usePortfolio();
  const marqueeText = profile.marqueeName || profile.name || 'INDAH AMIATI';
  const marqueeNames = Array(6).fill(marqueeText.toUpperCase());

  return (
    <section id="hero">
      {/* Marquee background */}
      <div className="hero-marquee" aria-hidden="true">
        <div className="hero-marquee-track">
          {marqueeNames.map((name, i) => (
            <span key={i}>{name}</span>
          ))}
        </div>
      </div>

      {/* Center photo with protective shield */}
      <div
        className="hero-photo-wrap protected-photo-wrap"
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
      <div className="hero-scroll-label">
        <span>SCROLL</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}

