import type { Metadata } from 'next';
import { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';
import { Twitter } from 'next/dist/lib/metadata/types/twitter-types';

export function createSEOMetadata({
  title,
  description,
  url,
  type = 'website',
  image,
}: {
  title: string | TemplateString;
  description: string;
  url?: URL;
  type?: string;
  image?: string;
}): Metadata {
  const baseMetadata: Metadata = {
    title,
    description,
    metadataBase: url ? url : undefined,
    alternates: {
      canonical: './',
    },
    openGraph: {
      title,
      description,
      url: url ? url.toString() : undefined,
      type,
      images: image ? [{ url: image }] : [],
    } as OpenGraph,
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [{ url: image }] : [],
    } as Twitter,
  };
  return baseMetadata;
}
