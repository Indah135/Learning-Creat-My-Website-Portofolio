import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/projects';

const STORAGE_KEY = 'INDAH_PORTFOLIO_DATA_V1';
const API_URL_KEY = 'INDAH_PORTFOLIO_API_URL_V1';

export const DEFAULT_API_URL = 'http://localhost/api';

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
  const [apiUrl, setApiUrlState] = useState(() => {
    return localStorage.getItem(API_URL_KEY) || DEFAULT_API_URL;
  });

  const [dbConnected, setDbConnected] = useState(false);

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

  // Fetch initial data from PHP MySQL backend if available
  const fetchFromDatabase = useCallback(async (customUrl) => {
    const base = (customUrl || apiUrl).replace(/\/$/, '');
    try {
      const res = await fetch(`${base}/get_data.php`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      if (json.status === 'success' && json.data) {
        setDbConnected(true);
        setData((prev) => ({
          ...prev,
          profile: { ...prev.profile, ...(json.data.profile || {}) },
          education: json.data.education?.length ? json.data.education : prev.education,
          skills: json.data.skills?.length ? json.data.skills : prev.skills,
          interests: json.data.interests?.length ? json.data.interests : prev.interests,
          projects: json.data.projects?.length ? json.data.projects : prev.projects,
          contact: { ...prev.contact, ...(json.data.contact || {}) },
        }));
        return true;
      }
    } catch {
      // Graceful offline fallback
      setDbConnected(false);
      return false;
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchFromDatabase();
  }, [fetchFromDatabase]);

  const setApiUrl = (newUrl) => {
    const clean = newUrl.trim();
    localStorage.setItem(API_URL_KEY, clean);
    setApiUrlState(clean);
    fetchFromDatabase(clean);
  };

  const updateProfile = async (newProfileFields) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...newProfileFields },
    }));

    // Sync to MySQL API
    try {
      await fetch(`${apiUrl.replace(/\/$/, '')}/save_profile.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProfileFields),
      });
    } catch (err) {
      console.warn('API sync failed, saved locally:', err);
    }
  };

  const updateEducation = async (educationList) => {
    setData((prev) => ({
      ...prev,
      education: educationList,
    }));
  };

  const updateSkills = async (skillsList) => {
    setData((prev) => ({
      ...prev,
      skills: skillsList,
    }));
  };

  const updateInterests = async (interestsList) => {
    setData((prev) => ({
      ...prev,
      interests: interestsList,
    }));
  };

  const addProject = async (project) => {
    const tempId = project.id || `proj-${Date.now()}`;
    const newProject = {
      ...project,
      id: tempId,
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

    // Sync to MySQL API
    try {
      const res = await fetch(`${apiUrl.replace(/\/$/, '')}/projects.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject),
      });
      const resData = await res.json();
      if (resData.status === 'success' && resData.id) {
        setData((prev) => ({
          ...prev,
          projects: prev.projects.map((p) =>
            p.id === tempId ? { ...p, id: resData.id, db_id: resData.db_id } : p
          ),
        }));
      }
    } catch (err) {
      console.warn('API sync failed, saved locally:', err);
    }
  };

  const updateProject = async (projectId, updatedFields) => {
    const formattedTags = Array.isArray(updatedFields.tags)
      ? updatedFields.tags
      : typeof updatedFields.tags === 'string'
      ? updatedFields.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : undefined;

    const formattedImages = Array.isArray(updatedFields.images)
      ? updatedFields.images
      : updatedFields.images
      ? [updatedFields.images]
      : undefined;

    const mergedFields = {
      ...updatedFields,
      ...(formattedTags ? { tags: formattedTags } : {}),
      ...(formattedImages ? { images: formattedImages } : {}),
    };

    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => {
        if (p.id === projectId || p.title === projectId) {
          return { ...p, ...mergedFields };
        }
        return p;
      }),
    }));

    // Sync to MySQL API
    try {
      await fetch(`${apiUrl.replace(/\/$/, '')}/projects.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...mergedFields, id: projectId }),
      });
    } catch (err) {
      console.warn('API sync failed, saved locally:', err);
    }
  };

  const deleteProject = async (projectId) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== projectId && p.title !== projectId),
    }));

    // Sync to MySQL API
    try {
      await fetch(`${apiUrl.replace(/\/$/, '')}/projects.php?id=${encodeURIComponent(projectId)}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: projectId }),
      });
    } catch (err) {
      console.warn('API sync failed, deleted locally:', err);
    }
  };

  const updateContact = async (newContactFields) => {
    setData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...newContactFields },
    }));

    // Sync to MySQL API
    try {
      await fetch(`${apiUrl.replace(/\/$/, '')}/save_contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContactFields),
      });
    } catch (err) {
      console.warn('API sync failed, saved locally:', err);
    }
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
        apiUrl,
        setApiUrl,
        dbConnected,
        fetchFromDatabase,
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


