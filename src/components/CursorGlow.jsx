import { useEffect, useRef } from 'react';

/* Gerakan orb cahaya malam (dark mode) — posisi & ukuran diatur di CSS.
   amp   = jarak drift mandiri (px)
   speed = kecepatan drift
   phase = offset agar tiap orb tidak bergerak sinkron
   depth = kekuatan parallax mengikuti mouse (px, negatif = berlawanan arah) */
const NIGHT_ORBS = [
  { amp: 55, speed: 0.16, phase: 0.0, depth: 80 },
  { amp: 75, speed: 0.11, phase: 2.1, depth: -55 },
  { amp: 45, speed: 0.21, phase: 4.2, depth: 130 },
];

export default function CursorGlow({ isLight }) {
  const glowRef  = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);
  const nmRefs   = useRef([]);

  /* Light mode: blob parallax mengikuti mouse (perilaku lama) */
  useEffect(() => {
    if (!isLight) return;

    function onMove(e) {
      const cx = (e.clientX / window.innerWidth  - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;

      if (blob1Ref.current) {
        blob1Ref.current.style.animation = 'none';
        blob1Ref.current.style.transform = `translate(${cx * 28}px, ${cy * 22}px) scale(1)`;
      }
      if (blob2Ref.current) {
        blob2Ref.current.style.animation = 'none';
        blob2Ref.current.style.transform = `translate(${cx * -20}px, ${cy * 16}px) scale(1)`;
      }
      if (blob3Ref.current) {
        blob3Ref.current.style.animation = 'none';
        blob3Ref.current.style.transform = `translate(${cx * 14}px, ${cy * -18}px) scale(1)`;
      }
    }

    function onLeave() {
      [blob1Ref, blob2Ref, blob3Ref].forEach(r => {
        if (r.current) r.current.style.animation = '';
      });
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [isLight]);

  /* Glow yang mengejar mouse secara halus (lerp) + orb malam interaktif */
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const target = { x: window.innerWidth / 2, y: window.innerHeight * 0.35 };
    const pos    = { x: target.x, y: target.y };
    const norm   = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }; // posisi mouse ternormalisasi (0..1)

    function onMove(e) {
      target.x = e.clientX;
      target.y = e.clientY;
      norm.tx  = e.clientX / window.innerWidth;
      norm.ty  = e.clientY / window.innerHeight;
    }

    // Tanpa animasi: glow tetap mengikuti mouse, orb diam di posisi CSS
    if (reduceMotion) {
      const setGlow = e => {
        if (glowRef.current) {
          glowRef.current.style.left = e.clientX + 'px';
          glowRef.current.style.top  = e.clientY + 'px';
        }
      };
      if (glowRef.current) {
        glowRef.current.style.left = target.x + 'px';
        glowRef.current.style.top  = target.y + 'px';
      }
      document.addEventListener('mousemove', setGlow);
      return () => document.removeEventListener('mousemove', setGlow);
    }

    let raf;
    const t0 = performance.now();

    function frame(now) {
      const t = (now - t0) / 1000;

      // Glow mengejar mouse dengan easing
      pos.x  += (target.x - pos.x) * 0.09;
      pos.y  += (target.y - pos.y) * 0.09;
      norm.x += (norm.tx - norm.x) * 0.035;
      norm.y += (norm.ty - norm.y) * 0.035;

      if (glowRef.current) {
        glowRef.current.style.left = pos.x + 'px';
        glowRef.current.style.top  = pos.y + 'px';
      }

      // Orb malam: drift mandiri + parallax mouse (dark mode saja)
      if (!isLight) {
        for (let i = 0; i < NIGHT_ORBS.length; i++) {
          const o  = NIGHT_ORBS[i];
          const el = nmRefs.current[i];
          if (!el) continue;
          const px = (norm.x - 0.5) * 2 * o.depth;
          const py = (norm.y - 0.5) * 2 * o.depth;
          const dx = Math.sin(t * o.speed + o.phase) * o.amp + px;
          const dy = Math.cos(t * o.speed * 0.9 + o.phase) * o.amp + py;
          el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
        }
      }

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
    document.addEventListener('mousemove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
    };
  }, [isLight]);

  return (
    <>
      <div className="cursor-glow" ref={glowRef} />

      {/* Night lights — cahaya abu-abu interaktif, hanya dark mode */}
      <div className="nm-lights" aria-hidden="true">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={`nm-orb nm-orb-${i + 1}`}
            ref={el => { nmRefs.current[i] = el; }}
          />
        ))}
      </div>

      {/* Light mode blobs */}
      <div className="lm-blobs" aria-hidden="true">
        <div className="lm-blob lm-blob-1" ref={blob1Ref} />
        <div className="lm-blob lm-blob-2" ref={blob2Ref} />
        <div className="lm-blob lm-blob-3" ref={blob3Ref} />
      </div>
    </>
  );
}
