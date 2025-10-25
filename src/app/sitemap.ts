import fs from 'fs/promises'; // Use the async fs API
import { MetadataRoute } from 'next';
import path from 'path';

export const dynamic = 'force-static';

const BASE_URL = 'https://noahsk23.github.io/utilities';

// Recursively read directories to find all page.tsx files
async function getStaticPaths(dir: string, basePath = ''): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const paths: Set<string> = new Set();

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subPaths = await getStaticPaths(
        fullPath,
        `${basePath}/${entry.name}`
      );
      subPaths.forEach((subPath) => paths.add(subPath));
    } else if (entry.name === 'page.tsx') {
      paths.add(basePath || '/'); // Ensure basePath is always included
    }
  }

  return Array.from(paths);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appDir = path.join(process.cwd(), 'src/app'); // Use `app` folder directly
  const staticPaths = await getStaticPaths(appDir);

  return staticPaths.map((page) => ({
    url: `${BASE_URL}${page}`,
    lastModified: new Date().toISOString(),
    priority: page !== '/' ? 0.8 : 1.0,
  }));
}
