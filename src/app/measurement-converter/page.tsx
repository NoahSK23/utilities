import MeasurementConverter from '@/components/measurement-converter';
import PageShell from '@/components/page-shell';
import { createSEOMetadata } from '@/lib/create-seo-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createSEOMetadata({
  title: 'Measurement Converter',
  description:
    'Convert from centimeters to feet and inches and inches to feet and inches',
});

export default function Page() {
  return (
    <PageShell title="Measurement converter" icon="ruler">
      <MeasurementConverter />
    </PageShell>
  );
}
