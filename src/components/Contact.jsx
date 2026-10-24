import { useScrollReveal } from '../hooks/useScrollReveal';
import WordReveal from './WordReveal';

const CONTACTS = [
  { icon: '📧', label: 'Email',    val: 'indahamiati85@gmail.com', href: 'mailto:indahamiati85@gmail.com' },
  { icon: '💼', label: 'LinkedIn', val: 'indah-amiati',         href: 'https://www.linkedin.com/in/indah-amiati/' },
  { icon: '🐙', label: 'GitHub',   val: 'Indah135',            href: 'https://github.com/Indah135' },
  { icon: '🐦', label: 'Twitter',  val: '@alexpratama',        href: 'https://twitter.com/alexpratama' },
];

export default function Contact() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="contact"
      ref={ref}
      className={`reveal${visible ? ' visible' : ''}`}
    >
      <div className="contact-inner stagger">
        <h2 className="section-title centered"><WordReveal>Hubungi Saya</WordReveal></h2>
        <p className="contact-sub">
          <WordReveal>
            Punya proyek menarik atau ingin berdiskusi? Jangan ragu untuk menghubungi saya.
          </WordReveal>
        </p>
        <div className="contact-links stagger">
          {CONTACTS.map(c => (
            <a key={c.label} href={c.href} className="contact-link" target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              <span className="contact-icon">{c.icon}</span>
              <div>
                <div className="contact-label">{c.label}</div>
                <div className="contact-val">{c.val}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
