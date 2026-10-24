import { useMemo } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import WordReveal from './WordReveal';
import MorphSlider from './MorphSlider';

const SKILLS = [
  { icon: '⚛️',  name: 'React',      w: 92 },
  { icon: '🟦',  name: 'TypeScript', w: 88 },
  { icon: '🟩',  name: 'Node.js',    w: 85 },
  { icon: '🐍',  name: 'Python',     w: 78 },
  { icon: '🗄️', name: 'PostgreSQL', w: 80 },
  { icon: '🐳',  name: 'Docker',     w: 72 },
  { icon: '☁️',  name: 'AWS',        w: 70 },
  { icon: '🎨',  name: 'Figma',      w: 82 },
  { icon: '🔀',  name: 'Git',        w: 90 },
  { icon: '⚡',  name: 'Next.js',    w: 87 },
];

const CARD_W = 1600;
const CARD_H = 1000;
const FONT_UI = '-apple-system, "Segoe UI", system-ui, sans-serif';
const FONT_EMOJI = '"Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif';

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawSkillCard(skill, i, total) {
  const canvas = document.createElement('canvas');
  canvas.width = CARD_W;
  canvas.height = CARD_H;
  const ctx = canvas.getContext('2d');
  const w = CARD_W;
  const h = CARD_H;

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#12417f');
  bg.addColorStop(0.55, '#0a1f4d');
  bg.addColorStop(1, '#071536');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const glowTop = ctx.createRadialGradient(w * 0.82, h * 0.05, 0, w * 0.82, h * 0.05, w * 0.55);
  glowTop.addColorStop(0, 'rgba(158, 200, 255, 0.22)');
  glowTop.addColorStop(1, 'rgba(158, 200, 255, 0)');
  ctx.fillStyle = glowTop;
  ctx.fillRect(0, 0, w, h);

  const glowBottom = ctx.createRadialGradient(w * 0.12, h * 0.95, 0, w * 0.12, h * 0.95, w * 0.45);
  glowBottom.addColorStop(0, 'rgba(56, 249, 215, 0.14)');
  glowBottom.addColorStop(1, 'rgba(56, 249, 215, 0)');
  ctx.fillStyle = glowBottom;
  ctx.fillRect(0, 0, w, h);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'alphabetic';
  ctx.font = `600 34px ${FONT_UI}`;
  ctx.fillStyle = 'rgba(234, 242, 255, 0.55)';
  const idx = String(i + 1).padStart(2, '0');
  const totalStr = String(total).padStart(2, '0');
  ctx.fillText(`SKILL ${idx} / ${totalStr}`, 72, 96);

  const tile = 300;
  const tx = (w - tile) / 2;
  const ty = 210;
  roundRect(ctx, tx, ty, tile, tile, 56);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.10)';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.26)';
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `176px ${FONT_EMOJI}`;
  ctx.fillText(skill.icon, w / 2, ty + tile / 2 + 8);

  ctx.textBaseline = 'alphabetic';
  ctx.font = `700 88px ${FONT_UI}`;
  ctx.fillStyle = '#eaf2ff';
  ctx.fillText(skill.name, w / 2, ty + tile + 130);

  const pctText = `${skill.w}%`;
  ctx.font = `800 148px ${FONT_UI}`;
  const pctW = ctx.measureText(pctText).width;
  const pctGrad = ctx.createLinearGradient(w / 2 - pctW / 2, 0, w / 2 + pctW / 2, 0);
  pctGrad.addColorStop(0, '#9ec8ff');
  pctGrad.addColorStop(1, '#38f9d7');
  ctx.fillStyle = pctGrad;
  ctx.fillText(pctText, w / 2, ty + tile + 310);

  const barW = 760;
  const barH = 18;
  const barX = (w - barW) / 2;
  const barY = ty + tile + 380;
  roundRect(ctx, barX, barY, barW, barH, 9);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
  ctx.fill();

  const fillW = (barW * skill.w) / 100;
  if (fillW > 18) {
    roundRect(ctx, barX, barY, fillW, barH, 9);
    const fillGrad = ctx.createLinearGradient(barX, 0, barX + fillW, 0);
    fillGrad.addColorStop(0, '#5ba4f5');
    fillGrad.addColorStop(1, '#38f9d7');
    ctx.fillStyle = fillGrad;
    ctx.fill();
  }

  return canvas;
}

export default function Skills() {
  const { ref, visible } = useScrollReveal({ threshold: 0.2 });

  const items = useMemo(
    () =>
      SKILLS.map((skill, i) => ({
        source: drawSkillCard(skill, i, SKILLS.length),
        caption: `${skill.name} · ${skill.w}%`
      })),
    []
  );

  return (
    <section
      id="skills"
      ref={ref}
      className={`reveal${visible ? ' visible' : ''}`}
    >
      <h2 className="section-title centered"><WordReveal>Skills</WordReveal></h2>

      <div className="skills-stage">
        <MorphSlider
          items={items}
          aria-label="Slider skill"
          autoplay={visible}
          autoplayDelay={3.5}
          loop
          radius={14}
          transition="melt"
        />

        <a href="#projects" className="skills-open" aria-label="Lihat proyek">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}
