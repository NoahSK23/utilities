import StorageConverter from '@/components/StorageConverter';
import { createSEOMetadata } from '@/lib/createSEOMetadata';
import { Metadata } from 'next';

export const metadata: Metadata = createSEOMetadata({
  title: 'Storage Converter',
  description: 'Convert between base 2 and base 10 storage units (GiB and GB)',
});
export default function StorageConverterPage() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center">
      <StorageConverter />
    </main>
  );
}
