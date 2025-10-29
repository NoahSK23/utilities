import Button from '@/components/button';
import LocalTest from '@/components/local-test';
import { createSEOMetadata } from '@/lib/create-seo-metadata';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = createSEOMetadata({
  title: 'Hello',
  description:
    'This is the hello page, but more a test/about page. Check the console for localStorage call from a client component.',
});

export default function Hello() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center gap-4 font-sans">
      <h1 className="text-3xl font-bold">Hello, Next.js!</h1>
      <LocalTest />
      <Link href="/">
        <Button bgColor="bg-neutral-600">Go home</Button>
      </Link>
    </main>
  );
}
