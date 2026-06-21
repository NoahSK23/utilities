import DinnerCalculator from '@/components/dinner-calculator';
import { createSEOMetadata } from '@/lib/create-seo-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createSEOMetadata({
  title: 'Dinner Calculator',
  description: 'Calculate and split group dinner bill details between you and your brother.',
});

export default function DinnerCalculatorPage() {
  return (
    <main className="flex min-h-[80vh] w-full flex-col items-center justify-center">
      <DinnerCalculator />
    </main>
  );
}
