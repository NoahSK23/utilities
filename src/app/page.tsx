import FeaturedGrid from '@/components/featuredGrid';
import { createSEOMetadata } from '@/lib/createSEOMetadata';

export const metadata = createSEOMetadata({
  title: "Home | Noah's Utilities",
  description: 'Noah S Klinger Utilities - Homepage',
});

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <section className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="animate-fade-in bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
            Useful Utilities
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            A collection of tools and utilities built by Noah S Klinger
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#featured-tools"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              View Available Tools
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section
        id="featured-tools"
        className="mx-auto max-w-7xl px-6 pb-24 lg:px-8"
      >
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <FeaturedGrid
            tool="Storage Converter"
            description="Convert between different units and formats"
            link="/converter"
          />
          <FeaturedGrid
            tool="Measurement Converter"
            description="Perform measurement conversions easily"
            link="/cm-feetinch"
          />
          <FeaturedGrid
            tool="Create secret"
            description="Create a secret key"
            link="/create-secret"
          />
        </div>
      </section>
    </div>
  );
}
