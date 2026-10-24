import { useState, useEffect } from 'react';

export function useTheme() {
  const [isLight, setIsLight] = useState(() => localStorage.getItem('theme') === 'light');

  useEffect(() => {
    document.body.classList.toggle('light', isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  }, [isLight]);

  // Restore on first mount (in case class was stripped by React)
  useEffect(() => {
    if (localStorage.getItem('theme') === 'light') {
      document.body.classList.add('light');
    }
  }, []);

  const toggle = () => setIsLight(v => !v);

  return { isLight, toggle };
}
