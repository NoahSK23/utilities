import Button from '@/components/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center gap-4 font-sans">
      <h2 className="text-4xl font-bold">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">
        <Button bgColor="bg-neutral-700">Go Home</Button>
      </Link>
    </main>
  );
}

export const metadata = {
  title: 'Not Found',
  description: 'Page not found',
};
