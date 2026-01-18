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
  skills: string[];
  languages: Array<{ name: string; level: string }>;
  education: Array<{ title: string; meta: string }>;
  summary: string;
  experience: Array<{
    role: string;
    date: string;
    company: string;
    points: string[];
  }>;
  projects: Array<{
    name: string;
    meta: string;
    description: string;
    featured?: boolean;
  }>;
};

