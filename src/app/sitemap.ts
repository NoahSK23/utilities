import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://noahsk23.github.io/utilities',
      priority: 1,
    },
    {
      url: 'https://noahsk23.github.io/utilities/create-secret',
      priority: 0.8,
    },
    {
      url: 'https://noahsk23.github.io/utilities/converter',
      priority: 0.8,
    },
    {
      url: 'https://noahsk23.github.io/utilities/cm-feetinch',
      priority: 0.8,
    },
    {
      url: 'https://noahsk23.github.io/utilities/dinner-calculator',
      priority: 0.5,
    },
    {
      url: 'https://noahsk23.github.io/utilities/hello',
      priority: 0.4,
    },
  ];
}
