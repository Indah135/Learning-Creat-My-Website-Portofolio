import { useEffect, useRef } from 'react';

export default function CursorGlow({ isLight }) {
  const glowRef  = useRef(null);
  const blob1Ref = useRef(null);
  const blob2Ref = useRef(null);
  const blob3Ref = useRef(null);

  useEffect(() => {
    function onMove(e) {
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top  = e.clientY + 'px';
      }

      if (!isLight) return;
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
      if (isLight) {
        [blob1Ref, blob2Ref, blob3Ref].forEach(r => {
          if (r.current) r.current.style.animation = '';
        });
      }
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [isLight]);

  return (
    <>
      <div className="cursor-glow" ref={glowRef} />

      {/* Light mode blobs */}
      <div className="lm-blobs" aria-hidden="true">
        <div className="lm-blob lm-blob-1" ref={blob1Ref} />
        <div className="lm-blob lm-blob-2" ref={blob2Ref} />
        <div className="lm-blob lm-blob-3" ref={blob3Ref} />
      </div>
    </>
  );
}
