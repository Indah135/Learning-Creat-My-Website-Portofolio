import { useScrollReveal } from '../hooks/useScrollReveal';
import { useState } from 'react';

const CONTACT_INFO = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    label: 'Email us',
    val: 'indahamiati85@gmail.com',
    href: 'mailto:indahamiati85@gmail.com',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.29 6.29l.98-.98a2 2 0 0 1 2.1-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
      </svg>
    ),
    label: 'Call us',
    val: '+62 812-3456-7890',
    href: 'tel:+6281234567890',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Our location',
    val: 'Bandung, Jawa Barat, ID',
    href: 'https://maps.google.com/?q=Bandung',
  },
];

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M7 7h10v10"/>
  </svg>
);

export default function Contact() {
  const { ref, visible } = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className={`contact-section reveal${visible ? ' visible' : ''}`}
    >
      {/* Large background watermark text */}
      <div className="contact-watermark" aria-hidden="true">CONTACT</div>

      <div className="contact-layout">
        {/* ── LEFT COLUMN ── */}
        <div className="contact-left stagger">
          {/* Badge */}
          <div className="contact-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 8v4M12 16h.01"/>
            </svg>
            Contact
          </div>

          <h2 className="contact-heading">Get in touch</h2>
          <p className="contact-desc">
            Have questions or want to collaborate? Don't hesitate to reach out to me.
          </p>

          {/* Info cards */}
          <div className="contact-info-list">
            {CONTACT_INFO.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="contact-info-card"
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                <div className="cic-left">
                  <span className="cic-icon">{item.icon}</span>
                  <div>
                    <div className="cic-label">{item.label}</div>
                    <div className="cic-val">{item.val}</div>
                  </div>
                </div>
                <span className="cic-arrow"><ArrowIcon /></span>
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN — Form ── */}
        <div className="contact-right stagger">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="cf-field">
              <input
                type="text"
                name="name"
                id="cf-name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="cf-input"
              />
            </div>
            <div className="cf-field">
              <input
                type="email"
                name="email"
                id="cf-email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="cf-input"
              />
            </div>
            <div className="cf-field cf-field--textarea">
              <textarea
                name="message"
                id="cf-message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={7}
                className="cf-input cf-textarea"
              />
            </div>
            <button type="submit" className={`cf-submit${submitted ? ' cf-submit--ok' : ''}`}>
              {submitted ? '✓ Message Sent!' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
