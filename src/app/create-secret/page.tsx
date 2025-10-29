import CreateSecret from '@/components/CreateSecret';
import { createSEOMetadata } from '@/lib/createSEOMetadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createSEOMetadata({
  title: 'Create Secret',
  description:
    'Creates a long string of characters to be used with anything that needs a secret (e.g. JWT). It uses built in browser APIs',
});

export default async function CreateSecretPage() {
  return (
    <main className="flex min-h-[80vh] min-w-min flex-col items-center justify-center">
      <div className="mx-4 rounded-2xl bg-white p-4 text-black shadow-2xl">
        <div className="flex flex-col items-center justify-items-center gap-4">
          <h1 className="pt-3 text-3xl font-bold text-black">Create Secret</h1>
          <CreateSecret />
        </div>
      </div>
    </main>
  );
}
