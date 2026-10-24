import { useEffect, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import WordReveal from './WordReveal';

const SKILLS = [
  { icon: '⚛️',  name: 'React',      w: 92 },
  { icon: '🟦',  name: 'TypeScript',  w: 88 },
  { icon: '🟩',  name: 'Node.js',     w: 85 },
  { icon: '🐍',  name: 'Python',      w: 78 },
  { icon: '🗄️', name: 'PostgreSQL',  w: 80 },
  { icon: '🐳',  name: 'Docker',      w: 72 },
  { icon: '☁️',  name: 'AWS',         w: 70 },
  { icon: '🎨',  name: 'Figma',       w: 82 },
  { icon: '🔀',  name: 'Git',         w: 90 },
  { icon: '⚡',  name: 'Next.js',     w: 87 },
];

function SkillCard({ skill, index, animate }) {
  return (
    <div className="skill-card" style={{ '--i': index }}>
      <span className="skill-icon">{skill.icon}</span>
      <span>{skill.name}</span>
      <div className="skill-bar">
        <div
          className="skill-fill"
          style={{ width: animate ? `${skill.w}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const { ref, visible } = useScrollReveal({ threshold: 0.2 });
  const [animate, setAnimate] = useState(false);

  // Trigger bar animation when section becomes visible
  useEffect(() => {
    if (visible) setAnimate(true);
  }, [visible]);

  return (
    <section
      id="skills"
      ref={ref}
      className={`reveal${visible ? ' visible' : ''}`}
    >
      <h2 className="section-title centered"><WordReveal>Skills</WordReveal></h2>
      <div className="skills-grid stagger">
        {SKILLS.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} animate={animate} />
        ))}
      </div>
    </section>
  );
}
