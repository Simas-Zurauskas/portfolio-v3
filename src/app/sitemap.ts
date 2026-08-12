import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.simaszurauskas.com';

const LANGUAGES = {
  en: `${BASE_URL}/`,
  lt: `${BASE_URL}/lt`,
  'x-default': `${BASE_URL}/`,
};

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages: LANGUAGES },
    },
    {
      url: `${BASE_URL}/lt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages: LANGUAGES },
    },
  ];
};

export default sitemap;
