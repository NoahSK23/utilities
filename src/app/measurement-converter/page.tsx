import MeasurementConverter from '@/components/measurement-converter';
import { createSEOMetadata } from '@/lib/create-seo-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createSEOMetadata({
  title: 'Measurement Converter',
  description:
    'Convert from centimeters to feet and inches and inches to feet and inches',
});

export default function MeasurementConverterPage() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center">
      <MeasurementConverter />
    </main>
  );
}
