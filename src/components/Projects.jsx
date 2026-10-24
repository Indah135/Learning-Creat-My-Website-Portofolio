import { useScrollReveal } from '../hooks/useScrollReveal';
import WordReveal from './WordReveal';

const PROJECTS = [
  {
    emoji: '📊', c1: '#f9a8d4', c2: '#f472b6',
    title: 'Dashboard Analytics',
    desc: 'Platform visualisasi data real-time untuk tim marketing dengan grafik interaktif dan laporan otomatis.',
    tags: ['React', 'TypeScript', 'D3.js'],
  },
  {
    emoji: '🛒', c1: '#ff9ecd', c2: '#f5576c',
    title: 'E-Commerce Toko Lokal',
    desc: 'Toko online UMKM dengan fitur manajemen produk, keranjang belanja, dan integrasi pembayaran lokal.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL'],
  },
  {
    emoji: '💬', c1: '#4facfe', c2: '#00f2fe',
    title: 'Aplikasi Chat Internal',
    desc: 'Solusi komunikasi tim real-time dengan fitur channel, direct message, dan berbagi file.',
    tags: ['Socket.io', 'React', 'Redis'],
  },
  {
    emoji: '📱', c1: '#43e97b', c2: '#38f9d7',
    title: 'Task Manager Mobile',
    desc: 'Aplikasi manajemen tugas harian dengan sinkronisasi cloud, reminder, dan statistik produktivitas.',
    tags: ['React Native', 'Firebase', 'Expo'],
  },
];

function ProjectCard({ project, index }) {
  function onMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    e.currentTarget.style.transform = `translateY(-8px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  }
  function onMouseLeave(e) {
    e.currentTarget.style.transform = '';
    e.currentTarget.style.transition = 'transform 0.5s ease';
    setTimeout(() => { e.currentTarget.style.transition = ''; }, 500);
  }

  return (
    <div
      className="project-card"
      style={{ '--i': index }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="project-thumb" style={{ '--c1': project.c1, '--c2': project.c2 }}>
        {project.emoji}
      </div>
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="project-tags">
          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <a href="#" className="project-link">Lihat Detail →</a>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, visible } = useScrollReveal();
  return (
    <section
      id="projects"
      ref={ref}
      className={`reveal${visible ? ' visible' : ''}`}
    >
      <h2 className="section-title centered"><WordReveal>Proyek</WordReveal></h2>
      <div className="projects-grid stagger">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
