import DinnerCalculator from '@/components/dinner-calculator';
import PageShell from '@/components/page-shell';
import { createSEOMetadata } from '@/lib/create-seo-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createSEOMetadata({
  title: 'Dinner Calculator',
  description:
    'Calculate dinner shares with 6% tax and an equally split 20% tip.',
});

export default function Page() {
  return (
    <PageShell title="Dinner calculator" icon="dinner">
      <DinnerCalculator />
    </PageShell>
  );
}
