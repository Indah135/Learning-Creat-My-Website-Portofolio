import { useScrollReveal } from '../hooks/useScrollReveal';
import WordReveal from './WordReveal';

const EXPERIENCES = [
  {
    role: 'Senior Frontend Developer',
    company: 'PT. Teknologi Nusantara',
    period: '📅 Jan 2023 – Sekarang',
    desc: 'Memimpin tim frontend 4 orang, mengembangkan design system, dan meningkatkan performa aplikasi hingga 40%.',
    current: true,
  },
  {
    role: 'Full-Stack Developer',
    company: 'Startup Inovasi Digital',
    period: '📅 Mar 2021 – Des 2022',
    desc: 'Membangun fitur-fitur inti produk SaaS dari nol menggunakan React dan Node.js, melayani 10.000+ pengguna aktif.',
    current: false,
  },
  {
    role: 'Junior Web Developer',
    company: 'CV. Kreatif Media',
    period: '📅 Jun 2020 – Feb 2021',
    desc: 'Mengembangkan website perusahaan klien, mengintegrasikan CMS, dan melakukan optimasi SEO on-page.',
    current: false,
  },
];

export default function Experience() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="experience"
      ref={ref}
      className={`reveal${visible ? ' visible' : ''}`}
    >
      <h2 className="section-title centered"><WordReveal>Pengalaman</WordReveal></h2>
      <div className="timeline">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className={`timeline-item${visible ? ' reveal-item visible' : ' reveal-item'}`}>
            <div className="tl-dot" />
            <div className="tl-card">
              <div className="tl-header">
                <h3>{exp.role}</h3>
                {exp.current && <span className="tl-badge current">Sekarang</span>}
              </div>
              <div className="company">{exp.company}</div>
              <div className="period">{exp.period}</div>
              <p>{exp.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
