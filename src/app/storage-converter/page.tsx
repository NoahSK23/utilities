import StorageConverter from '@/components/storage-converter';
import { createSEOMetadata } from '@/lib/create-seo-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createSEOMetadata({
  title: 'Storage Converter',
  description: 'Convert between base 2 and base 10 storage units (GiB and GB)',
});
export default function StorageConverterPage() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center">
      <h1 className="text-center text-4xl font-bold">Storage Converter</h1>
      <StorageConverter />
    </main>
  );
}
