import CMtFI from '@/components/CmToFeetInchConvert';
import { createSEOMetadata } from '@/lib/createSEOMetadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createSEOMetadata({
  title: 'Convert CM -> Feet & Inches',
  description: 'Convert from centimeters to feet and inches',
});

export default function CmToFeetAndInches() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center">
      <CMtFI />
    </main>
  );
}
