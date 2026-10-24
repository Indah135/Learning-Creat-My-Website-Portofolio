export default function Hero() {
  const marqueeNames = Array(6).fill('INDAH AMIATI');

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

      {/* Center photo */}
      <div className="hero-photo-wrap">
        <img
          className="hero-photo"
          src="/photo/indah2.png"
          alt="Foto Profil"
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
