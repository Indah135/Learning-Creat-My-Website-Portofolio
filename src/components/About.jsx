import { useScrollReveal } from '../hooks/useScrollReveal';

const SKILL_TAGS = ['HTML', 'CSS', 'JavaScript', 'MySQL', 'MariaDB', 'VS Code', 'Git & GitHub', 'Word', 'Excel', 'PowerPoint', 'Canva'];
const INTERESTS = ['Singing', 'Exploring Calm Places', 'Good Food', 'Avocado Juice'];

function CapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 4 2 9l10 5 10-5-10-5Z" />
      <path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" />
      <path d="M22 9v5" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m16 18 6-6-6-6" />
      <path d="m8 6-6 6 6 6" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export default function About() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="about"
      ref={ref}
      className={`reveal${visible ? ' visible' : ''}`}
    >
      <div className="about-top">
        <div className="about-intro">
          <div className="about-eyebrow">
            <span className="about-label">About Me</span>
          </div>

          <h2 className="about-name">
            <span className="about-hi">Hi, I&rsquo;m</span>
            <span className="about-full">
              Indah Amiati
              <svg className="about-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </span>
          </h2>

          <div className="about-role-row">
            <p className="about-role">Informatics Student | Frontend Developer</p>
            <a
              href="/cv.pdf"
              download="CV_Indah_Amiati.pdf"
              className="about-cv-btn"
              title="Unduh CV"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Unduh CV</span>
            </a>
          </div>

          <div className="about-bio">
            <p>
              Saya adalah mahasiswa Informatika UTDI yang berfokus pada Frontend Development. 
              Saya tertarik membangun antarmuka web yang responsif, fungsional, dan mudah digunakan
              dengan desain yang sederhana serta berpusat pada pengguna. Saya senang mempelajari 
              teknologi baru, mengembangkan keterampilan, dan berkolaborasi dalam tim untuk menciptakan 
              pengalaman web yang menarik dan bermanfaat.
            </p>
          </div>
        </div>

        <div className="about-visual">
          <img src="/photo/properti.png" alt="" />
        </div>
      </div>

      <div className="about-cards">
        <div className="about-card">
          <div className="about-card-head">
            <CapIcon />
            <span className="about-card-divider" />
            <h3>Education</h3>
          </div>
          <div className="edu-list">
            <div className="edu-item">
              <p className="edu-school">Universitas Teknologi Digital Indonesia (UTDI)</p>
              <p className="edu-meta">Informatics | 2024 – Present</p>
            </div>
            <div className="edu-item">
              <p className="edu-school">SMA Negeri 3 Buru</p>
              <p className="edu-meta">Natural Science | 2021 – 2024</p>
            </div>
          </div>
        </div>

        <div className="about-card">
          <div className="about-card-head">
            <CodeIcon />
            <span className="about-card-divider" />
            <h3>Skills</h3>
          </div>
          <div className="about-pills">
            {SKILL_TAGS.map(tag => (
              <span key={tag} className="about-pill">{tag}</span>
            ))}
          </div>
        </div>

        <div className="about-card">
          <div className="about-card-head">
            <HeartIcon />
            <span className="about-card-divider" />
            <h3>Interests</h3>
          </div>
          <div className="interest-list">
            {INTERESTS.map(item => (
              <span key={item} className="interest-item">
                <span className="interest-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
