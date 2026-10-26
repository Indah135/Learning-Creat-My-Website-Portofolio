import { useScrollReveal } from '../hooks/useScrollReveal';
import { useState } from 'react';

const CONTACT_INFO = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      </svg>
    ),
    label: 'Email us',
    val: 'indahamiati85@gmail.com',
    href: 'mailto:indahamiati85@gmail.com',
    color: 'var(--accent2)',
    glow: 'rgba(42,125,225,0.18)',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.24h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6.29 6.29l.98-.98a2 2 0 0 1 2.1-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z"/>
      </svg>
    ),
    label: 'Call us',
    val: '+62 812-3456-7890',
    href: 'tel:+6281234567890',
    color: 'var(--accent3)',
    glow: 'rgba(249,168,212,0.18)',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'Our location',
    val: 'Bandung, Jawa Barat, ID',
    href: 'https://maps.google.com/?q=Bandung',
    color: 'var(--teal)',
    glow: 'rgba(56,249,215,0.14)',
  },
];

export default function Contact() {
  const { ref, visible } = useScrollReveal();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState('');

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
      {/* Decorative glow orbs */}
      <div className="contact-orb contact-orb--left" aria-hidden="true" />
      <div className="contact-orb contact-orb--right" aria-hidden="true" />

      <div className="contact-layout">

        {/* ── LEFT ── */}
        <div className="contact-left stagger">

          {/* Eyebrow badge — same pattern as About's about-eyebrow */}
          <div className="contact-eyebrow">
            <span className="contact-dot" />
            <span className="contact-eyebrow-text">Get In Touch</span>
          </div>

          <h2 className="contact-heading">
            Let's <span className="contact-heading-accent">Work</span> Together
          </h2>

          <p className="contact-desc">
            Punya proyek menarik atau ingin berdiskusi? Jangan ragu untuk menghubungi saya.
            Saya selalu terbuka untuk kolaborasi dan peluang baru.
          </p>

          {/* Info cards */}
          <div className="contact-info-list">
            {CONTACT_INFO.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className="contact-info-card"
                style={{ '--cic-color': item.color, '--cic-glow': item.glow, '--cic-i': i }}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
              >
                <div className="cic-left">
                  <span className="cic-icon">{item.icon}</span>
                  <div className="cic-text">
                    <div className="cic-label">{item.label}</div>
                    <div className="cic-val">{item.val}</div>
                  </div>
                </div>
                <span className="cic-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M7 7h10v10"/>
                  </svg>
                </span>
              </a>
            ))}
          </div>

          {/* Social links */}
          <div className="contact-socials">
            <a href="https://github.com/Indah135" target="_blank" rel="noreferrer" className="contact-social" title="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/indah-amiati/" target="_blank" rel="noreferrer" className="contact-social" title="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="mailto:indahamiati85@gmail.com" className="contact-social" title="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ── RIGHT — Form ── */}
        <div className="contact-right stagger">
          <div className="contact-form-wrap">
            {/* Form header */}
            <div className="cf-header">
              <h3 className="cf-title">Send a Message</h3>
              <p className="cf-subtitle">Saya akan membalas dalam 24 jam</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className={`cf-field${focused === 'name' ? ' cf-field--focus' : ''}`}>
                <label htmlFor="cf-name" className="cf-label">Name</label>
                <input
                  type="text"
                  name="name"
                  id="cf-name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused('')}
                  required
                  autoComplete="name"
                  className="cf-input"
                />
              </div>

              <div className={`cf-field${focused === 'email' ? ' cf-field--focus' : ''}`}>
                <label htmlFor="cf-email" className="cf-label">Email</label>
                <input
                  type="email"
                  name="email"
                  id="cf-email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                  required
                  autoComplete="email"
                  className="cf-input"
                />
              </div>

              <div className={`cf-field cf-field--textarea${focused === 'message' ? ' cf-field--focus' : ''}`}>
                <label htmlFor="cf-message" className="cf-label">Message</label>
                <textarea
                  name="message"
                  id="cf-message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  required
                  rows={6}
                  className="cf-input cf-textarea"
                />
              </div>

              <button type="submit" className={`cf-submit btn${submitted ? ' cf-submit--ok' : ' btn-primary'}`}>
                {submitted ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5"/>
                    </svg>
                    Pesan Terkirim!
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>
                    </svg>
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
