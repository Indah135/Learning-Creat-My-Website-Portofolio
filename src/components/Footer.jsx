import { usePortfolio } from '../context/PortfolioContext';

export default function Footer() {
  const { profile } = usePortfolio();

  return (
    <footer>
      <p>
        &copy; {new Date().getFullYear()}{' '}
        <span className="footer-name">{profile?.name || 'Indah Amiati'}</span>
      </p>
    </footer>
  );
}


