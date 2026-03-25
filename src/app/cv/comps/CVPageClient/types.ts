export type SkillGroup = {
  category: string;
  items: string[];
};

export type ExperienceEntry = {
  role: string;
  date: string;
  company: string;
  points: string[];
};

export type ProjectEntry = {
  name: string;
  meta: string;
  description: string;
  featured?: boolean;
};

export type CV = {
  header: {
    name: string;
    title: string;
  };
  contact: {
    location: string;
    email: string;
    phone?: string;
    websiteLabel: string;
    websiteUrl: string;
    linkedinLabel: string;
    linkedinUrl: string;
    githubLabel: string;
    githubUrl: string;
  };
  skills: SkillGroup[];
  languages: Array<{ name: string; level: string }>;
  education: Array<{ title: string; meta: string }>;
  summary: string;
  experience: ExperienceEntry[];
  projectsNote?: string;
  projects: ProjectEntry[];
};

export type VariantId = 'freelance' | 'fulltime' | 'contract' | 'general';

export type CVVariant = {
  id: VariantId;
  label: string;
};
