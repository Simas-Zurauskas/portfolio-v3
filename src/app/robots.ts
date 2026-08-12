import type { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.simaszurauskas.com/sitemap.xml',
  };
};

export default robots;
