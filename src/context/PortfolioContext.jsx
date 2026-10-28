import { createContext, useContext, useState, useEffect } from 'react';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/projects';

const STORAGE_KEY = 'INDAH_PORTFOLIO_DATA_V1';
const AUTH_KEY = 'INDAH_PORTFOLIO_AUTH_V1';

export const INITIAL_PORTFOLIO_DATA = {
  profile: {
    name: 'Indah Amiati',
    marqueeName: 'INDAH AMIATI',
    role: 'Informatics Student | Frontend Developer',
    bio: 'Saya adalah mahasiswa Informatika UTDI yang berfokus pada Frontend Development. Saya tertarik membangun antarmuka web yang responsif, fungsional, dan mudah digunakan dengan desain yang sederhana serta berpusat pada pengguna. Saya senang mempelajari teknologi baru, mengembangkan keterampilan, dan berkolaborasi dalam tim untuk menciptakan pengalaman web yang menarik dan bermanfaat.',
    photo: '/photo/indah2.png',
    aboutVisual: '/photo/properti.png',
    cvUrl: '/cv.pdf',
    cvName: 'CV_Indah_Amiati.pdf',
  },
  education: [
    {
      id: 'edu-1',
      school: 'Universitas Teknologi Digital Indonesia (UTDI)',
      meta: 'Informatics | 2024 – Present',
    },
    {
      id: 'edu-2',
      school: 'SMA Negeri 3 Buru',
      meta: 'Natural Science | 2021 – 2024',
    },
  ],
  skills: [
    'HTML',
    'CSS',
    'JavaScript',
    'MySQL',
    'MariaDB',
    'VS Code',
    'Git & GitHub',
    'Word',
    'Excel',
    'PowerPoint',
    'Canva',
  ],
  interests: ['Singing', 'Exploring Calm Places', 'Good Food', 'Avocado Juice'],
  projects: DEFAULT_PROJECTS.map((proj, idx) => ({
    ...proj,
    id: proj.id || `proj-${idx + 1}`,
  })),
  contact: {
    email: 'indahamiati85@gmail.com',
    phone: '+62 812-3456-7890',
    location: 'Bandung, Jawa Barat, ID',
    locationMapUrl: 'https://maps.google.com/?q=Bandung',
  },
};

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_PORTFOLIO_DATA,
          ...parsed,
          profile: { ...INITIAL_PORTFOLIO_DATA.profile, ...(parsed.profile || {}) },
          contact: { ...INITIAL_PORTFOLIO_DATA.contact, ...(parsed.contact || {}) },
          projects: parsed.projects?.length ? parsed.projects : INITIAL_PORTFOLIO_DATA.projects,
          skills: parsed.skills?.length ? parsed.skills : INITIAL_PORTFOLIO_DATA.skills,
          interests: parsed.interests?.length ? parsed.interests : INITIAL_PORTFOLIO_DATA.interests,
          education: parsed.education?.length ? parsed.education : INITIAL_PORTFOLIO_DATA.education,
        };
      }
    } catch (err) {
      console.warn('Failed to parse portfolio data from storage:', err);
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to save portfolio data to storage:', err);
    }
  }, [data]);

  const updateProfile = (newProfileFields) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...newProfileFields },
    }));
  };

  const updateEducation = (educationList) => {
    setData((prev) => ({
      ...prev,
      education: educationList,
    }));
  };

  const updateSkills = (skillsList) => {
    setData((prev) => ({
      ...prev,
      skills: skillsList,
    }));
  };

  const updateInterests = (interestsList) => {
    setData((prev) => ({
      ...prev,
      interests: interestsList,
    }));
  };

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: project.id || `proj-${Date.now()}`,
      tags: Array.isArray(project.tags)
        ? project.tags
        : typeof project.tags === 'string'
        ? project.tags.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
      images: Array.isArray(project.images) ? project.images : project.images ? [project.images] : [],
    };
    setData((prev) => ({
      ...prev,
      projects: [newProject, ...prev.projects],
    }));
  };

  const updateProject = (projectId, updatedFields) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => {
        if (p.id === projectId || p.title === projectId) {
          const formattedTags = Array.isArray(updatedFields.tags)
            ? updatedFields.tags
            : typeof updatedFields.tags === 'string'
            ? updatedFields.tags.split(',').map((t) => t.trim()).filter(Boolean)
            : p.tags;

          const formattedImages = Array.isArray(updatedFields.images)
            ? updatedFields.images
            : updatedFields.images
            ? [updatedFields.images]
            : p.images;

          return {
            ...p,
            ...updatedFields,
            tags: formattedTags,
            images: formattedImages,
          };
        }
        return p;
      }),
    }));
  };

  const deleteProject = (projectId) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== projectId && p.title !== projectId),
    }));
  };

  const updateContact = (newContactFields) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...newContactFields },
    }));
  };

  const resetToDefaults = () => {
    setData(INITIAL_PORTFOLIO_DATA);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const importData = (importedData) => {
    if (!importedData || typeof importedData !== 'object') return false;
    setData({
      ...INITIAL_PORTFOLIO_DATA,
      ...importedData,
      profile: { ...INITIAL_PORTFOLIO_DATA.profile, ...(importedData.profile || {}) },
      contact: { ...INITIAL_PORTFOLIO_DATA.contact, ...(importedData.contact || {}) },
    });
    return true;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        profile: data.profile,
        education: data.education,
        skills: data.skills,
        interests: data.interests,
        projects: data.projects,
        contact: data.contact,
        updateProfile,
        updateEducation,
        updateSkills,
        updateInterests,
        addProject,
        updateProject,
        deleteProject,
        updateContact,
        resetToDefaults,
        importData,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}

export const getAdminAuth = () => {
  try {
    const saved = localStorage.getItem(AUTH_KEY);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.warn('Failed to parse auth from storage:', err);
  }
  return {
    username: 'admin',
    password: 'admin123',
  };
};

export const saveAdminAuth = (auth) => {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  } catch (err) {
    console.error('Failed to save auth to storage:', err);
  }
};
