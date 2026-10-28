import { useState } from 'react';
import { usePortfolio, getAdminAuth, saveAdminAuth } from '../context/PortfolioContext';

export default function AdminDashboard({ onLogout, onBackToWebsite }) {
  const {
    profile,
    updateProfile,
    education,
    updateEducation,
    skills,
    updateSkills,
    interests,
    updateInterests,
    projects,
    addProject,
    updateProject,
    deleteProject,
    contact,
    updateContact,
    resetToDefaults,
    importData,
    data,
  } = usePortfolio();

  // Active Tab
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' | 'projects' | 'skills' | 'contact' | 'account'

  // Toast notification state
  const [toast, setToast] = useState('');
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  // Local Form States
  const [profileForm, setProfileForm] = useState({ ...profile });
  const [contactForm, setContactForm] = useState({ ...contact });

  // Skills & Interests local inputs for adding
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');

  // Education temporary state
  const [newEdu, setNewEdu] = useState({ school: '', meta: '' });

  // Project Modal State (Add/Edit)
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    desc: '',
    emoji: '🚀',
    c1: '#f472b6',
    c2: '#ec4899',
    tags: '',
    images: '',
    link: 'https://github.com/Indah135',
  });

  // Admin Account Credentials form
  const [accountForm, setAccountForm] = useState(() => getAdminAuth());
  const [accountMsg, setAccountMsg] = useState('');

  // Profile Save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile(profileForm);
    showToast('Profil dan informasi utama berhasil diperbarui! ✨');
  };

  // Contact Save
  const handleSaveContact = (e) => {
    e.preventDefault();
    updateContact(contactForm);
    showToast('Informasi kontak berhasil diperbarui! ✨');
  };

  // Education Handlers
  const handleAddEducation = (e) => {
    e.preventDefault();
    if (!newEdu.school.trim()) return;
    const item = {
      id: `edu-${Date.now()}`,
      school: newEdu.school.trim(),
      meta: newEdu.meta.trim() || '2024 - Sekarang',
    };
    updateEducation([...education, item]);
    setNewEdu({ school: '', meta: '' });
    showToast('Riwayat pendidikan berhasil ditambahkan!');
  };

  const handleDeleteEducation = (id) => {
    updateEducation(education.filter((ed) => ed.id !== id));
    showToast('Pendidikan dihapus!');
  };

  // Skills Handlers
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (skills.includes(newSkill.trim())) {
      showToast('Skill tersebut sudah ada dalam daftar.');
      return;
    }
    updateSkills([...skills, newSkill.trim()]);
    setNewSkill('');
    showToast(`Skill "${newSkill.trim()}" ditambahkan!`);
  };

  const handleDeleteSkill = (skillToDelete) => {
    updateSkills(skills.filter((s) => s !== skillToDelete));
  };

  // Interests Handlers
  const handleAddInterest = (e) => {
    e.preventDefault();
    if (!newInterest.trim()) return;
    if (interests.includes(newInterest.trim())) {
      showToast('Minat tersebut sudah ada.');
      return;
    }
    updateInterests([...interests, newInterest.trim()]);
    setNewInterest('');
    showToast(`Minat "${newInterest.trim()}" ditambahkan!`);
  };

  const handleDeleteInterest = (itemToDelete) => {
    updateInterests(interests.filter((item) => item !== itemToDelete));
  };

  // Open Project Modal for Add
  const handleOpenAddProject = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      desc: '',
      emoji: '💡',
      c1: '#38bdf8',
      c2: '#818cf8',
      tags: 'React, Tailwind CSS',
      images: '',
      link: 'https://github.com/Indah135',
    });
    setIsProjectModalOpen(true);
  };

  // Open Project Modal for Edit
  const handleOpenEditProject = (proj) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title || '',
      desc: proj.desc || '',
      emoji: proj.emoji || '🚀',
      c1: proj.c1 || '#f472b6',
      c2: proj.c2 || '#ec4899',
      tags: Array.isArray(proj.tags) ? proj.tags.join(', ') : proj.tags || '',
      images: Array.isArray(proj.images) ? proj.images[0] || '' : proj.images || '',
      link: proj.link || '',
    });
    setIsProjectModalOpen(true);
  };

  // Save Project (Add or Edit)
  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim()) return;

    const formattedTags = projectForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const formattedImages = projectForm.images.trim() ? [projectForm.images.trim()] : [];

    if (editingProject) {
      updateProject(editingProject.id, {
        title: projectForm.title.trim(),
        desc: projectForm.desc.trim(),
        emoji: projectForm.emoji.trim() || '🚀',
        c1: projectForm.c1,
        c2: projectForm.c2,
        tags: formattedTags,
        images: formattedImages,
        link: projectForm.link.trim(),
      });
      showToast(`Proyek "${projectForm.title}" berhasil diperbarui! ✨`);
    } else {
      addProject({
        title: projectForm.title.trim(),
        desc: projectForm.desc.trim(),
        emoji: projectForm.emoji.trim() || '🚀',
        c1: projectForm.c1,
        c2: projectForm.c2,
        tags: formattedTags,
        images: formattedImages,
        link: projectForm.link.trim(),
      });
      showToast(`Proyek baru "${projectForm.title}" berhasil ditambahkan! 🚀`);
    }

    setIsProjectModalOpen(false);
  };

  // Delete Project with confirmation
  const handleDeleteProject = (proj) => {
    if (window.confirm(`Yakin ingin menghapus project "${proj.title}"?`)) {
      deleteProject(proj.id);
      showToast(`Project "${proj.title}" berhasil dihapus.`);
    }
  };

  // Account settings save
  const handleSaveAccount = (e) => {
    e.preventDefault();
    if (!accountForm.username.trim() || !accountForm.password.trim()) {
      setAccountMsg('Username dan password tidak boleh kosong.');
      return;
    }
    saveAdminAuth(accountForm);
    setAccountMsg('Kredensial login admin berhasil diperbarui!');
    showToast('Username & password admin diperbarui!');
    setTimeout(() => setAccountMsg(''), 4000);
  };

  // Export Data JSON
  const handleExportData = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data portofolio berhasil diekspor sebagai file JSON!');
  };

  // Import Data JSON
  const handleImportData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const ok = importData(parsed);
        if (ok) {
          setProfileForm(parsed.profile || profile);
          setContactForm(parsed.contact || contact);
          showToast('Data portofolio berhasil diimpor & diperbarui!');
        } else {
          alert('Format file JSON tidak sesuai.');
        }
      } catch {
        alert('Gagal membaca file JSON. Pastikan file valid.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="admin-root">
      {/* Toast Notification */}
      {toast && (
        <div className="admin-toast">
          <svg className="admin-toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toast}</span>
        </div>
      )}

      {/* Top Navigation */}
      <header className="admin-nav">
        <div className="admin-nav-left">
          <div className="admin-nav-brand">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--adm-primary)' }}>
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
            <span>Indah Amiati</span>
            <span className="admin-pill-badge">ADMIN CONTROL</span>
          </div>
        </div>

        <div className="admin-nav-actions">
          <button
            type="button"
            className="admin-btn secondary sm"
            onClick={onBackToWebsite}
            title="Buka Website Utama"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            <span>Lihat Website</span>
          </button>

          <button
            type="button"
            className="admin-btn danger sm"
            onClick={onLogout}
            title="Keluar dari Admin"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="admin-body">
        {/* Sidebar Tabs */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-menu">
            <button
              type="button"
              className={`admin-menu-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 0 0-16 0" />
              </svg>
              <span>Profil & Bio</span>
            </button>

            <button
              type="button"
              className={`admin-menu-item ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              <span>Kelola Projects</span>
              <span className="admin-menu-badge">{projects.length}</span>
            </button>

            <button
              type="button"
              className={`admin-menu-item ${activeTab === 'skills' ? 'active' : ''}`}
              onClick={() => setActiveTab('skills')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m16 18 6-6-6-6" />
                <path d="m8 6-6 6 6 6" />
              </svg>
              <span>Pendidikan & Skills</span>
              <span className="admin-menu-badge">{skills.length}</span>
            </button>

            <button
              type="button"
              className={`admin-menu-item ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>Kontak & Lokasi</span>
            </button>

            <button
              type="button"
              className={`admin-menu-item ${activeTab === 'account' ? 'active' : ''}`}
              onClick={() => setActiveTab('account')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Pengaturan & Akun</span>
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="admin-content">
          {/* TAB 1: PROFIL & BIO */}
          {activeTab === 'profile' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h2 className="admin-card-title">Profil & Informasi Utama</h2>
                  <p className="admin-card-desc">
                    Ubah nama Anda, role, foto, dan bio yang tampil di bagian atas dan halaman depan website.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveProfile}>
                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>Nama Lengkap (Ditampilkan di Hero, About & Footer)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Teks Marquee Berjalan (Hero Background)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={profileForm.marqueeName}
                      onChange={(e) => setProfileForm({ ...profileForm, marqueeName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Role / Subtitle (About Section)</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={profileForm.role}
                    onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Deskripsi Bio (Tentang Saya)</label>
                  <textarea
                    className="admin-textarea"
                    rows={5}
                    value={profileForm.bio}
                    onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>Path Foto Profil Hero (misal: /photo/indah2.png)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={profileForm.photo}
                      onChange={(e) => setProfileForm({ ...profileForm, photo: e.target.value })}
                    />
                    {profileForm.photo && (
                      <div className="admin-preview-box">
                        <img
                          src={profileForm.photo}
                          alt="Preview Foto"
                          className="admin-preview-img"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Preview Foto Profil</span>
                      </div>
                    )}
                  </div>

                  <div className="admin-form-group">
                    <label>URL / Path Unduh CV (misal: /cv.pdf)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={profileForm.cvUrl}
                      onChange={(e) => setProfileForm({ ...profileForm, cvUrl: e.target.value })}
                    />
                    <div style={{ marginTop: '8px' }}>
                      <label style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Nama File Download:</label>
                      <input
                        type="text"
                        className="admin-input"
                        value={profileForm.cvName}
                        onChange={(e) => setProfileForm({ ...profileForm, cvName: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="admin-btn primary" style={{ width: 'auto', minWidth: '180px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    <span>Simpan Perubahan</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: KELOLA PROJECTS */}
          {activeTab === 'projects' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h2 className="admin-card-title">Daftar Project Portofolio</h2>
                  <p className="admin-card-desc">
                    Tambah, perbarui, atau hapus proyek karya yang ditampilkan pada carousel dan grid proyek.
                  </p>
                </div>
                <button
                  type="button"
                  className="admin-btn primary"
                  onClick={handleOpenAddProject}
                  style={{ width: 'auto' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  <span>Tambah Project Baru</span>
                </button>
              </div>

              {projects.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '48px 20px', color: '#9ca3af' }}>
                  <p>Belum ada project yang terdaftar. Klik tombol Tambah Project Baru di atas.</p>
                </div>
              ) : (
                <div className="admin-projects-grid">
                  {projects.map((proj) => (
                    <div key={proj.id || proj.title} className="admin-proj-card">
                      <div className="admin-proj-card-top">
                        <div
                          className="admin-proj-emoji-badge"
                          style={{
                            background: `linear-gradient(135deg, ${proj.c1 || '#38bdf8'}22, ${proj.c2 || '#ec4899'}22)`,
                            borderColor: proj.c1 || '#38bdf8',
                          }}
                        >
                          {proj.emoji || '🚀'}
                        </div>
                        <div className="admin-proj-actions">
                          <button
                            type="button"
                            className="admin-icon-btn"
                            title="Edit Project"
                            onClick={() => handleOpenEditProject(proj)}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="admin-icon-btn delete"
                            title="Hapus Project"
                            onClick={() => handleDeleteProject(proj)}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6" />
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <h3 className="admin-proj-title">{proj.title}</h3>
                      <p className="admin-proj-desc">{proj.desc}</p>

                      <div className="admin-proj-tags">
                        {Array.isArray(proj.tags) &&
                          proj.tags.map((tag) => (
                            <span key={tag} className="admin-tag-chip">
                              {tag}
                            </span>
                          ))}
                      </div>

                      {proj.link && (
                        <div style={{ marginTop: '12px', fontSize: '0.78rem', color: '#9ca3af' }}>
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: '#38bdf8', textDecoration: 'none' }}
                          >
                            Link GitHub/Demo &rarr;
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PENDIDIKAN & SKILLS */}
          {activeTab === 'skills' && (
            <div>
              {/* Education Section */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h2 className="admin-card-title">Riwayat Pendidikan</h2>
                    <p className="admin-card-desc">Institusi pendidikan yang tampil di kartu Education (About section)</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {education.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 16px',
                        background: 'rgba(15, 23, 42, 0.6)',
                        border: '1px solid var(--adm-border)',
                        borderRadius: '8px',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.92rem' }}>{item.school}</div>
                        <div style={{ color: '#9ca3af', fontSize: '0.82rem' }}>{item.meta}</div>
                      </div>
                      <button
                        type="button"
                        className="admin-icon-btn delete"
                        onClick={() => handleDeleteEducation(item.id)}
                        title="Hapus riwayat ini"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddEducation} className="admin-grid-2" style={{ alignItems: 'flex-end' }}>
                  <div className="admin-form-group" style={{ marginBottom: 0 }}>
                    <label>Nama Kampus / Sekolah</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Contoh: Universitas Teknologi Digital Indonesia"
                      value={newEdu.school}
                      onChange={(e) => setNewEdu({ ...newEdu, school: e.target.value })}
                      required
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="admin-form-group" style={{ flex: 1, marginBottom: 0 }}>
                      <label>Jurusan & Tahun</label>
                      <input
                        type="text"
                        className="admin-input"
                        placeholder="Informatics | 2024 – Sekarang"
                        value={newEdu.meta}
                        onChange={(e) => setNewEdu({ ...newEdu, meta: e.target.value })}
                        required
                      />
                    </div>
                    <button type="submit" className="admin-btn secondary" style={{ height: '46px', whiteSpace: 'nowrap' }}>
                      + Tambah
                    </button>
                  </div>
                </form>
              </div>

              {/* Skills Tags Section */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h2 className="admin-card-title">Daftar Keahlian / Skills</h2>
                    <p className="admin-card-desc">Skill pills yang tampil pada kartu Skills di halaman About</p>
                  </div>
                </div>

                <div className="admin-chips-wrap" style={{ marginBottom: '16px' }}>
                  {skills.map((skill) => (
                    <span key={skill} className="admin-removable-chip">
                      <span>{skill}</span>
                      <button
                        type="button"
                        className="admin-chip-del"
                        onClick={() => handleDeleteSkill(skill)}
                        title={`Hapus ${skill}`}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '10px', maxWidth: '420px' }}>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Ketik skill baru (misal: Next.js)..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                  <button type="submit" className="admin-btn primary" style={{ width: 'auto', whiteSpace: 'nowrap' }}>
                    + Tambah Skill
                  </button>
                </form>
              </div>

              {/* Interests Section */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h2 className="admin-card-title">Minat & Hobi (Interests)</h2>
                    <p className="admin-card-desc">Minat yang tampil di kartu Interests</p>
                  </div>
                </div>

                <div className="admin-chips-wrap" style={{ marginBottom: '16px' }}>
                  {interests.map((item) => (
                    <span key={item} className="admin-removable-chip" style={{ color: '#38bdf8', borderColor: 'rgba(56,189,248,0.3)', background: 'rgba(56,189,248,0.12)' }}>
                      <span>{item}</span>
                      <button
                        type="button"
                        className="admin-chip-del"
                        style={{ color: '#38bdf8' }}
                        onClick={() => handleDeleteInterest(item)}
                        title={`Hapus ${item}`}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>

                <form onSubmit={handleAddInterest} style={{ display: 'flex', gap: '10px', maxWidth: '420px' }}>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="Ketik minat baru..."
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                  />
                  <button type="submit" className="admin-btn secondary" style={{ whiteSpace: 'nowrap' }}>
                    + Tambah Minat
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: KONTAK & LOKASI */}
          {activeTab === 'contact' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <div>
                  <h2 className="admin-card-title">Informasi Kontak & Lokasi</h2>
                  <p className="admin-card-desc">
                    Data kontak yang ditampilkan pada bagian Contact di website utama.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSaveContact}>
                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>Email Kontak</label>
                    <input
                      type="email"
                      className="admin-input"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Nomor Telepon / WhatsApp</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>Lokasi Domisili (Teks Display)</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={contactForm.location}
                      onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Link Google Maps Lokasi</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={contactForm.locationMapUrl}
                      onChange={(e) => setContactForm({ ...contactForm, locationMapUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="admin-btn primary" style={{ width: 'auto' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                      <polyline points="17 21 17 13 7 13 7 21" />
                      <polyline points="7 3 7 8 15 8" />
                    </svg>
                    <span>Simpan Kontak</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 5: PENGATURAN & AKUN */}
          {activeTab === 'account' && (
            <div>
              {/* Account Credentials Card */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h2 className="admin-card-title">Kredensial Login Admin</h2>
                    <p className="admin-card-desc">Ganti username dan kata sandi untuk masuk ke Admin Portal ini.</p>
                  </div>
                </div>

                {accountMsg && (
                  <div className="admin-alert info" style={{ marginBottom: '16px' }}>
                    <span>{accountMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSaveAccount} className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>Username Admin</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={accountForm.username}
                      onChange={(e) => setAccountForm({ ...accountForm, username: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Password Baru</label>
                    <input
                      type="text"
                      className="admin-input"
                      value={accountForm.password}
                      onChange={(e) => setAccountForm({ ...accountForm, password: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" className="admin-btn primary" style={{ width: 'auto' }}>
                      Perbarui Akun Admin
                    </button>
                  </div>
                </form>
              </div>

              {/* Backup & Restore Card */}
              <div className="admin-card">
                <div className="admin-card-header">
                  <div>
                    <h2 className="admin-card-title">Backup & Restore Data</h2>
                    <p className="admin-card-desc">
                      Unduh salinan data seluruh website ke komputer Anda, atau pulihkan dari file cadangan JSON.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <button type="button" className="admin-btn secondary" onClick={handleExportData}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    <span>Download Backup (JSON)</span>
                  </button>

                  <label className="admin-btn secondary" style={{ cursor: 'pointer', margin: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span>Import dari File Backup</span>
                    <input type="file" accept=".json" onChange={handleImportData} style={{ display: 'none' }} />
                  </label>

                  <button
                    type="button"
                    className="admin-btn danger"
                    style={{ marginLeft: 'auto' }}
                    onClick={() => {
                      if (window.confirm('Apakah Anda yakin ingin mereset seluruh data website ke setelan bawaan awal? Semua modifikasi akan diganti data asli.')) {
                        resetToDefaults();
                        showToast('Data berhasil dikembalikan ke bawaan awal!');
                      }
                    }}
                  >
                    Reset ke Data Bawaan Awal
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: Tambah / Edit Project */}
      {isProjectModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsProjectModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-head">
              <h3>{editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}</h3>
              <button
                type="button"
                className="admin-icon-btn"
                onClick={() => setIsProjectModalOpen(false)}
                title="Tutup"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSaveProject}>
              <div className="admin-modal-body">
                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>Judul Project</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="Contoh: Real-Time Analytics Dashboard"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Emoji Ikon</label>
                    <input
                      type="text"
                      className="admin-input"
                      placeholder="📊 atau 🚀"
                      value={projectForm.emoji}
                      onChange={(e) => setProjectForm({ ...projectForm, emoji: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Deskripsi Singkat Project</label>
                  <textarea
                    className="admin-textarea"
                    rows={3}
                    placeholder="Jelaskan fitur utama dan tujuan project ini..."
                    value={projectForm.desc}
                    onChange={(e) => setProjectForm({ ...projectForm, desc: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-form-group">
                  <label>Tags Teknologi (pisahkan dengan koma)</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="React, TypeScript, Tailwind, D3.js"
                    value={projectForm.tags}
                    onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                  />
                </div>

                <div className="admin-grid-2">
                  <div className="admin-form-group">
                    <label>Warna Gradien 1 (Hex)</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={projectForm.c1}
                        onChange={(e) => setProjectForm({ ...projectForm, c1: e.target.value })}
                        style={{ width: '42px', height: '42px', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        className="admin-input"
                        value={projectForm.c1}
                        onChange={(e) => setProjectForm({ ...projectForm, c1: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label>Warna Gradien 2 (Hex)</label>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={projectForm.c2}
                        onChange={(e) => setProjectForm({ ...projectForm, c2: e.target.value })}
                        style={{ width: '42px', height: '42px', padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        className="admin-input"
                        value={projectForm.c2}
                        onChange={(e) => setProjectForm({ ...projectForm, c2: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Path Foto Mockup (misal: /photo/project-analytics.jpg atau kosongkan untuk mockup canvas otomatis)</label>
                  <input
                    type="text"
                    className="admin-input"
                    placeholder="/photo/nama-file.jpg atau link URL"
                    value={projectForm.images}
                    onChange={(e) => setProjectForm({ ...projectForm, images: e.target.value })}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Link GitHub / Demo Live</label>
                  <input
                    type="url"
                    className="admin-input"
                    placeholder="https://github.com/Indah135"
                    value={projectForm.link}
                    onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-modal-foot">
                <button
                  type="button"
                  className="admin-btn secondary"
                  onClick={() => setIsProjectModalOpen(false)}
                >
                  Batal
                </button>
                <button type="submit" className="admin-btn primary" style={{ width: 'auto' }}>
                  {editingProject ? 'Simpan Perubahan' : 'Tambahkan Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
