import { useState, useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else if (entry.boundingClientRect.top > window.innerHeight) {
          // Reset hanya saat elemen berada di bawah viewport (scrolled back up)
          // sehingga transisi masuk bisa dinikmati kembali saat scroll ke bawah
          setVisible(false);
        }
      },
      { threshold: 0.10, rootMargin: '0px 0px -50px 0px', ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, visible };
}
