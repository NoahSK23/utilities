import Accordion from '@/components/Accordion';
import { createSEOMetadata } from '@/lib/createSEOMetadata';

export const metadata = createSEOMetadata({
  title: "Home | Noah's Utilities",
  description: 'Noah S Klinger Utilities - Homepage',
});

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-sans sm:min-h-[80vh] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <h1 className="flex flex-col items-center gap-4 text-center text-4xl font-extrabold sm:flex-row dark:text-neutral-300">
          Welcome to my site! Use the nav links above to get started.
        </h1>
        <Accordion title="About - What is this site for?" id="accordion-0">
          <p className="whitespace-pre-line">
            {
              "This site is a personal website for me, Noah S Klinger.\n I will be updating this when I need utilities that I can't find online. \nThis site is built with Next.js and Tailwind CSS."
            }
          </p>
        </Accordion>
      </main>
    </div>
  );
}
