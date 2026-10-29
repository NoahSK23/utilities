import Footer from '@/components/footer';
import NavBar from '@/components/navbar';
import { createSEOMetadata } from '@/lib/create-seo-metadata';
import { themeScript } from '@/lib/theme';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const publicSans = localFont({
  src: './fonts/PublicSans-Variable.ttf',
  variable: '--font-public-sans',
  display: 'swap',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
});

export const metadata: Metadata = createSEOMetadata({
  title: {
    template: "%s | Noah's Utilities",
    default: "Noah's Utilities",
  },
  description:
    'Storage and measurement converters, a secret generator, and a dinner calculator.',
  url: new URL(process.env.BASE_URL || 'https://noahsk23.github.io/utilities/'),
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${geistMono.variable}`}
      // The theme script sets data-theme before hydration, so this attribute
      // can differ from the server HTML.
      suppressHydrationWarning
    >
      <head>
        <script>{themeScript}</script>
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <NavBar />
        <div className="workspace">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
