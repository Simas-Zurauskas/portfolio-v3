export type CardSize = 'regular' | 'wide' | 'tall' | 'large';

export type ProjectRole = {
  title: string; // e.g., "Tech Lead", "AI Engineer", "Solo"
  scope: string[]; // e.g., ["Frontend", "Backend", "AI", "DevOps"]
  teamSize: number; // 1 = solo
};

export type Project = {
  id: string;
  title: string;
  description: string;
  industry: string;
  tech: string[];
  highlights: string[];
  role: ProjectRole;
  images?: string[]; // array of image URLs for slider
  size?: CardSize; // bento grid size
  link?: string; // optional external link
  linkLabel?: string; // custom label (defaults to "View Project")
};
