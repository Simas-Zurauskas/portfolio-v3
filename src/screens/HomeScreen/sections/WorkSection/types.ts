export type CardSize = 'regular' | 'wide' | 'tall' | 'large';

export type Project = {
  id: string;
  title: string;
  description: string;
  industry: string;
  tech: string[];
  highlights: string[];
  images?: string[]; // array of image URLs for slider
  size?: CardSize; // bento grid size
  link?: string; // optional external link
  linkLabel?: string; // custom label (defaults to "View Project")
};
