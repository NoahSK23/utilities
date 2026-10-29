import PageShell from '@/components/page-shell';
import StorageConverter from '@/components/storage-converter';
import { createSEOMetadata } from '@/lib/create-seo-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createSEOMetadata({
  title: 'Storage Converter',
  description: 'Convert between base 2 and base 10 storage units (GiB and GB)',
});

export default function Page() {
  return (
    <PageShell title="Storage converter" icon="storage">
      <StorageConverter />
    </PageShell>
  );
}
