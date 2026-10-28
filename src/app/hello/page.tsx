import LocalTest from '@/components/local-test';
import PageShell from '@/components/page-shell';
import { createSEOMetadata } from '@/lib/create-seo-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createSEOMetadata({
  title: 'Browser check',
  description: 'Check local storage in your browser.',
});

export default function Hello() {
  return (
    <PageShell title="Browser check" icon="browser">
      <LocalTest />
    </PageShell>
  );
}
