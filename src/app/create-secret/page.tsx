import CreateSecret from '@/components/create-secret';
import PageShell from '@/components/page-shell';
import { createSEOMetadata } from '@/lib/create-seo-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createSEOMetadata({
  title: 'Create Secret',
  description:
    'Creates a long string of characters to be used with anything that needs a secret (e.g. JWT). It uses built in browser APIs',
});

export default function Page() {
  return (
    <PageShell title="Create secret" icon="key">
      <CreateSecret />
    </PageShell>
  );
}
