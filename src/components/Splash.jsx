import { useState, useEffect, useRef } from 'react';

export default function Splash({ onDone }) {
  const [hide, setHide] = useState(false);
  const progressRef = useRef(null);
  const DURATION = 2200;
  const FADE     = 700;

  useEffect(() => {
    document.body.classList.add('splash-active');

    // Animate progress bar
    requestAnimationFrame(() => {
      if (progressRef.current) {
        progressRef.current.style.transition = `width ${DURATION}ms linear`;
        progressRef.current.style.width = '100%';
      }
    });

    const t1 = setTimeout(() => {
      setHide(true);
      const t2 = setTimeout(() => {
        document.body.classList.remove('splash-active');
        onDone();
      }, FADE);
      return () => clearTimeout(t2);
    }, DURATION);

    return () => clearTimeout(t1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function skip() {
    setHide(true);
    setTimeout(() => {
      document.body.classList.remove('splash-active');
      onDone();
    }, FADE);
  }

  return (
    <div className={`splash${hide ? ' hide' : ''}`} onClick={skip}>
      <div className="splash-icons">
        <div className="splash-icon" style={{ '--d': '0s' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M8 3L4 12l4 9M16 3l4 9-4 9M14 3l-4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="splash-icon" style={{ '--d': '.15s' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="splash-icon" style={{ '--d': '.30s' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <h1 className="splash-title">
        Welcome To My<br/>
        <span className="splash-highlight">Portfolio Website</span>
      </h1>

      <div className="splash-url">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" strokeWidth="2"/>
        </svg>
        indah.portfolio
      </div>

      <div className="splash-bar">
        <div className="splash-progress" ref={progressRef} />
      </div>
    </div>
  );
}
