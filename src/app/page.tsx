import FeaturedGrid from '@/components/featured-grid';
import PageShell from '@/components/page-shell';
import { createSEOMetadata } from '@/lib/create-seo-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createSEOMetadata({
  title: 'All tools',
  description:
    'Storage and measurement converters, a secret generator, and a dinner calculator.',
});

export default function Home() {
  return (
    <PageShell title="All tools" icon="grid">
      <FeaturedGrid />
    </PageShell>
  );
}
