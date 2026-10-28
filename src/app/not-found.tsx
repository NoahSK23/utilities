import PageShell from '@/components/page-shell';
import Section from '@/components/section';
import Link from 'next/link';

export default function NotFound() {
  return (
    <PageShell title="Page not found" icon="grid">
      <Section className="form-stack">
        <p className="helper-text">
          This page doesn&apos;t exist. Choose a tool to continue.
        </p>
        <Link className="button button-primary" href="/">
          All tools
        </Link>
      </Section>
    </PageShell>
  );
}

export const metadata = {
  title: 'Page not found',
  description: 'Page not found',
};
