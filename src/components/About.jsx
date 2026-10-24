import { useScrollReveal } from '../hooks/useScrollReveal';
import WordReveal from './WordReveal';

export default function About() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref}
      className={`reveal${visible ? ' visible' : ''}`}
    >
      <div className="about-grid">

        {/* ── Text column ── */}
        <div className="about-text stagger">
          <h2 className="about-heading">
            <WordReveal>Front-End<br />Developer.</WordReveal>
          </h2>

          <p>
            <WordReveal>
              Saya membangun antarmuka web yang cepat, responsif, dan enak dilihat —
              menggabungkan <strong>logika kode</strong> dengan <strong>estetika desain</strong>.
              Bagi saya, coding adalah seni menyusun logika yang hidup.
            </WordReveal>
          </p>
          <p>
            <WordReveal>
              Berpengalaman membangun proyek dengan React, JavaScript, dan CSS modern.
              Perhatian pada detail visual serta performa adalah kekuatan utama saya
              di setiap proyek.
            </WordReveal>
          </p>

          <a href="#" className="btn btn-about-cv">
            <span>Download CV</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 4v12M6 14l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* ── Visual: foto + refleksi kaca ── */}
        <div className="about-photo-wrap">
          <div className="about-visual">
            <img
              className="about-illustration"
              src="/photo/properti.png"
              alt="Foto Properti"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
