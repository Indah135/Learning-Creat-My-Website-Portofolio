import { usePortfolio } from '../context/PortfolioContext';

export default function Footer({ onOpenAdmin }) {
  const { profile } = usePortfolio();

  return (
    <footer>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <p style={{ margin: 0 }}>
          &copy; {new Date().getFullYear()}{' '}
          <span className="footer-name">{profile?.name || 'Indah Amiati'}</span>
        </p>
        <span style={{ opacity: 0.3 }}>&bull;</span>
        <a
          href="#admin"
          onClick={(e) => {
            if (onOpenAdmin) {
              e.preventDefault();
              onOpenAdmin();
            }
          }}
          style={{
            color: 'var(--text-muted, #9ca3af)',
            textDecoration: 'none',
            fontSize: '0.8rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            opacity: 0.7,
            transition: 'opacity 0.2s, color 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.color = 'var(--accent, #f472b6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.7';
            e.currentTarget.style.color = 'var(--text-muted, #9ca3af)';
          }}
          title="Login Admin Khusus"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span>Admin Portal</span>
        </a>
      </div>
    </footer>
  );
}

