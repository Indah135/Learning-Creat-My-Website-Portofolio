import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import WordReveal from './WordReveal';
import { PROJECTS } from '../data/projects';

const CARD_W = 720;
const CARD_H = 1280;
const BITMAP_W = 720;
const BITMAP_H = 1280;
const FONT_UI = '-apple-system, "Segoe UI", system-ui, sans-serif';
const FONT_EMOJI = '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';
const AUTOPLAY_DELAY = 4000;
const SWIPE_THRESHOLD = 40;

function roundRect(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function fitText(ctx, text, maxWidth, startSize, weight) {
  let size = startSize;
  ctx.font = `${weight} ${size}px ${FONT_UI}`;
  while (size > 22 && ctx.measureText(text).width > maxWidth) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${FONT_UI}`;
  }
}

function fillRound(ctx, x, y, w, h, r, style) {
  roundRect(ctx, x, y, w, h, r);
  ctx.fillStyle = style;
  ctx.fill();
}

function strokeRound(ctx, x, y, w, h, r, style, lw = 2) {
  roundRect(ctx, x, y, w, h, r);
  ctx.strokeStyle = style;
  ctx.lineWidth = lw;
  ctx.stroke();
}

function drawPhoneMockup(canvas, project, screen) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = CARD_W;
  const h = CARD_H;
  const pad = 48;
  const inner = w - pad * 2;
  const scale = canvas.width / CARD_W;

  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.save();
  roundRect(ctx, 0, 0, w, h, 56);
  ctx.clip();

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#12417f');
  bg.addColorStop(0.55, '#0a1f4d');
  bg.addColorStop(1, '#071536');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const glowTop = ctx.createRadialGradient(w * 0.85, h * 0.05, 0, w * 0.85, h * 0.05, w * 0.65);
  glowTop.addColorStop(0, 'rgba(158, 200, 255, 0.2)');
  glowTop.addColorStop(1, 'rgba(158, 200, 255, 0)');
  ctx.fillStyle = glowTop;
  ctx.fillRect(0, 0, w, h);

  const glowBottom = ctx.createRadialGradient(w * 0.1, h * 0.96, 0, w * 0.1, h * 0.96, w * 0.55);
  glowBottom.addColorStop(0, 'rgba(56, 249, 215, 0.12)');
  glowBottom.addColorStop(1, 'rgba(56, 249, 215, 0)');
  ctx.fillStyle = glowBottom;
  ctx.fillRect(0, 0, w, h);

  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';

  ctx.font = `700 26px ${FONT_UI}`;
  ctx.fillStyle = 'rgba(234, 242, 255, 0.85)';
  ctx.fillText('9:41', pad, 56);

  [10, 14, 18, 22].forEach((bh, k) => {
    fillRound(ctx, w - pad - 96 + k * 10, 66 - bh, 6, bh, 3, 'rgba(234, 242, 255, 0.75)');
  });
  strokeRound(ctx, w - pad - 44, 46, 40, 22, 7, 'rgba(234, 242, 255, 0.7)');
  fillRound(ctx, w - pad - 40, 50, 24, 14, 4, 'rgba(234, 242, 255, 0.75)');

  ctx.beginPath();
  ctx.arc(pad + 16, 122, 16, 0, Math.PI * 2);
  ctx.fillStyle = '#5ba4f5';
  ctx.fill();
  fillRound(ctx, pad + 44, 113, 150, 18, 9, 'rgba(255, 255, 255, 0.2)');
  [0, 1, 2].forEach(k => {
    fillRound(ctx, w - pad - 44, 108 + k * 12, 44, 6, 3, 'rgba(234, 242, 255, 0.6)');
  });

  const heroX = pad;
  const heroY = 180;
  const heroH = 440;
  roundRect(ctx, heroX, heroY, inner, heroH, 40);
  const hero = ctx.createLinearGradient(heroX, heroY, heroX + inner, heroY + heroH);
  hero.addColorStop(0, '#1d5fb0');
  hero.addColorStop(1, '#0a2455');
  ctx.fillStyle = hero;
  ctx.fill();

  ctx.save();
  roundRect(ctx, heroX, heroY, inner, heroH, 40);
  ctx.clip();
  const accent = ctx.createRadialGradient(heroX + 70, heroY + 60, 0, heroX + 70, heroY + 60, inner * 0.8);
  accent.addColorStop(0, `${project.c1}66`);
  accent.addColorStop(1, `${project.c1}00`);
  ctx.fillStyle = accent;
  ctx.fillRect(heroX, heroY, inner, heroH);
  ctx.restore();

  const tag = project.tags[0] || '';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = `700 26px ${FONT_UI}`;
  const tagW = ctx.measureText(tag).width + 36;
  fillRound(ctx, heroX + 28, heroY + 28, tagW, 46, 23, 'rgba(7, 21, 54, 0.5)');
  strokeRound(ctx, heroX + 28, heroY + 28, tagW, 46, 23, 'rgba(255, 255, 255, 0.3)');
  ctx.fillStyle = '#eaf2ff';
  ctx.fillText(tag, heroX + 46, heroY + 52);

  ctx.textAlign = 'center';
  ctx.font = `150px ${FONT_EMOJI}`;
  ctx.fillText(project.emoji, w / 2, heroY + heroH / 2 + 50);

  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#eaf2ff';
  fitText(ctx, project.title, inner, 58, '800');
  ctx.fillText(project.title, w / 2, heroY + heroH + 92);

  fillRound(ctx, w / 2 - inner * 0.25, 744, inner * 0.5, 16, 8, 'rgba(255, 255, 255, 0.16)');

  const variant = screen % 3;
  const cardY = 796;
  const cardH = 230;
  const cardGap = 20;
  const cardW = (inner - cardGap) / 2;

  if (variant === 0) {
    for (let c = 0; c < 2; c++) {
      const cx = pad + c * (cardW + cardGap);
      fillRound(ctx, cx, cardY, cardW, cardH, 24, 'rgba(255, 255, 255, 0.07)');
      strokeRound(ctx, cx, cardY, cardW, cardH, 24, 'rgba(255, 255, 255, 0.12)');
      fillRound(ctx, cx + 24, cardY + 28, 56, 56, 16, c === 0 ? 'rgba(91, 164, 245, 0.55)' : 'rgba(56, 249, 215, 0.35)');
      fillRound(ctx, cx + 24, cardY + 114, cardW - 48, 16, 8, 'rgba(255, 255, 255, 0.22)');
      fillRound(ctx, cx + 24, cardY + 146, (cardW - 48) * 0.6, 16, 8, 'rgba(255, 255, 255, 0.13)');
    }
  } else if (variant === 1) {
    fillRound(ctx, pad, cardY, inner, 56, 16, 'rgba(255, 255, 255, 0.06)');
    strokeRound(ctx, pad, cardY, inner, 56, 16, 'rgba(255, 255, 255, 0.14)');
    fillRound(ctx, pad + 20, cardY + 20, 170, 16, 8, 'rgba(255, 255, 255, 0.25)');
    fillRound(ctx, pad, cardY + 72, inner, 56, 16, 'rgba(255, 255, 255, 0.06)');
    strokeRound(ctx, pad, cardY + 72, inner, 56, 16, 'rgba(255, 255, 255, 0.14)');
    fillRound(ctx, pad + 20, cardY + 92, 220, 16, 8, 'rgba(255, 255, 255, 0.25)');
    const btnGrad = ctx.createLinearGradient(pad, 0, pad + inner, 0);
    btnGrad.addColorStop(0, '#2a7de1');
    btnGrad.addColorStop(1, '#5ba4f5');
    fillRound(ctx, pad, cardY + 152, inner, 64, 32, btnGrad);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `700 28px ${FONT_UI}`;
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Sign In', w / 2, cardY + 185);
    ctx.textBaseline = 'alphabetic';
  } else {
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        const cx = pad + c * (cardW + cardGap);
        const cy = cardY + r * 120;
        fillRound(ctx, cx, cy, cardW, 102, 18, 'rgba(255, 255, 255, 0.07)');
        strokeRound(ctx, cx, cy, cardW, 102, 18, 'rgba(255, 255, 255, 0.12)');
        fillRound(ctx, cx + 18, cy + 22, 44, 44, 12, r + c === 0 ? 'rgba(91, 164, 245, 0.55)' : 'rgba(56, 249, 215, 0.3)');
        fillRound(ctx, cx + 76, cy + 30, cardW - 100, 14, 7, 'rgba(255, 255, 255, 0.2)');
        fillRound(ctx, cx + 76, cy + 54, (cardW - 100) * 0.55, 14, 7, 'rgba(255, 255, 255, 0.12)');
      }
    }
  }

  const lineY = 1058;
  [1, 0.85, 0.55].forEach((ratio, li) => {
    fillRound(ctx, pad, lineY + li * 28, inner * ratio, 16, 8, 'rgba(255, 255, 255, 0.13)');
  });

  const navY = h - pad - 80;
  fillRound(ctx, pad, navY, inner, 80, 40, 'rgba(255, 255, 255, 0.09)');
  strokeRound(ctx, pad, navY, inner, 80, 40, 'rgba(255, 255, 255, 0.12)');
  for (let d = 0; d < 4; d++) {
    ctx.beginPath();
    ctx.arc(pad + inner * ((d + 0.5) / 4), navY + 40, 10, 0, Math.PI * 2);
    ctx.fillStyle = d === 0 ? '#5ba4f5' : 'rgba(255, 255, 255, 0.35)';
    ctx.fill();
  }

  ctx.restore();
}

function ArrowLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ProjectCard({ project, index }) {
  return (
    <div
      className="project-card"
      style={{ '--i': index }}
    >
      <div className="project-thumb" style={{ '--c1': project.c1, '--c2': project.c2 }}>
        {project.images && project.images[0] ? (
          <img src={project.images[0]} alt={project.title} className="project-thumb-img" />
        ) : (
          project.emoji
        )}
      </div>
      <div className="project-body">
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="project-tags">
          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <a href="#" className="project-link">View Details →</a>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, visible } = useScrollReveal();

  const stageRef = useRef(null);
  const dragX = useRef(null);
  const lastSwipe = useRef(0);

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const items = PROJECTS.map((project, pi) => ({ project, pi }));
  const total = items.length;

  const [reducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const go = dir => setActive(a => (a + dir + total) % total);

  useEffect(() => {
    const root = stageRef.current;
    if (!root) return;
    root.querySelectorAll('canvas[data-project]').forEach(cv => {
      const pi = Number(cv.dataset.project);
      const s = Number(cv.dataset.screen);
      if (PROJECTS[pi]) drawPhoneMockup(cv, PROJECTS[pi], s);
    });
  }, []);

  useEffect(() => {
    if (!visible || paused || reducedMotion || total < 2) return;
    const timer = setInterval(() => setActive(a => (a + 1) % total), AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [visible, paused, reducedMotion, total]);

  const onPointerDown = e => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragX.current = e.clientX;
  };
  const onPointerUp = e => {
    if (dragX.current === null) return;
    const dx = e.clientX - dragX.current;
    dragX.current = null;
    if (Math.abs(dx) >= SWIPE_THRESHOLD) {
      lastSwipe.current = Date.now();
      go(dx < 0 ? 1 : -1);
    }
  };
  const onPointerCancel = () => {
    dragX.current = null;
  };

  const onKeyDown = e => {
    if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
  };

  const relOf = i => {
    let d = i - active;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  const cardStyle = d => {
    const abs = Math.abs(d);
    const scale = abs === 0 ? 1 : abs === 1 ? 0.9 : abs === 2 ? 0.8 : 0.72;
    const opacity = abs === 0 ? 1 : abs === 1 ? 0.9 : abs === 2 ? 0.6 : abs === 3 ? 0.12 : 0;
    return {
      transform: `translate(-50%, -50%) translateX(${d * 62}%) scale(${scale})`,
      zIndex: 20 - abs,
      opacity,
      filter: abs === 0 ? 'none' : `brightness(${0.7 ** abs})`,
      pointerEvents: opacity === 0 ? 'none' : 'auto',
    };
  };

  return (
    <section
      id="projects"
      ref={ref}
      className={`reveal${visible ? ' visible' : ''}`}
    >
      <h2 className="section-title centered"><WordReveal>Featured Projects</WordReveal></h2>

      <div
        className="gallery-stage"
        ref={stageRef}
        role="group"
        aria-label="Projects Gallery"
        tabIndex={0}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onKeyDown={onKeyDown}
      >
        {items.map(({ project, pi }, i) => {
          const d = relOf(i);
          const abs = Math.abs(d);
          return (
            <div
              key={project.title}
              className={`gallery-card${abs === 0 ? ' is-active' : ''}`}
              style={cardStyle(d)}
              onClick={() => {
                if (abs !== 0 && Date.now() - lastSwipe.current > 400) setActive(i);
              }}
            >
              {project.images && project.images[0] ? (
                <img src={project.images[0]} alt={project.title} />
              ) : (
                <canvas
                  width={BITMAP_W}
                  height={BITMAP_H}
                  data-project={pi}
                  data-screen={pi % 3}
                  role="img"
                  aria-label={`Mockup ${project.title}`}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="gallery-controls">
        <button
          type="button"
          className="gallery-arrow"
          aria-label="Project sebelumnya"
          disabled={total < 2}
          onClick={() => go(-1)}
        >
          <ArrowLeft />
        </button>

        <button
          type="button"
          className="gallery-view-all-btn"
          onClick={() => {
            document.getElementById('all-projects-grid')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span>View All</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </button>

        <button
          type="button"
          className="gallery-arrow"
          aria-label="Project berikutnya"
          disabled={total < 2}
          onClick={() => go(1)}
        >
          <ArrowRight />
        </button>
      </div>

      <div id="all-projects-grid" className="projects-grid stagger">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
