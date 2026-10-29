import type { SVGProps } from 'react';

export type IconName =
  | 'grid'
  | 'storage'
  | 'ruler'
  | 'key'
  | 'dinner'
  | 'browser'
  | 'chevron'
  | 'menu'
  | 'close'
  | 'copy'
  | 'check'
  | 'sun'
  | 'monitor'
  | 'moon'
  | 'external';

export default function ToolIcon({
  name,
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
    storage: (
      <>
        <rect x="3" y="4" width="18" height="7" rx="2" />
        <rect x="3" y="13" width="18" height="7" rx="2" />
        <path d="M7 7.5h.01M7 16.5h.01M16 7.5h2M16 16.5h2" />
      </>
    ),
    ruler: (
      <>
        <path d="m4 15 11-11a2 2 0 0 1 3 0l2 2a2 2 0 0 1 0 3L9 20a2 2 0 0 1-3 0l-2-2a2 2 0 0 1 0-3Z" />
        <path d="m13 6 3 3m-6 0 2 2m-5 1 3 3m-6 0 2 2" />
      </>
    ),
    key: (
      <>
        <circle cx="8" cy="8" r="5" />
        <path d="m11.5 11.5 8 8H22V17h-3v-3h-3M7 7h.01" />
      </>
    ),
    dinner: (
      <>
        <path d="M4 3v5a3 3 0 0 0 6 0V3M7 3v18M20 21V3c-4 3-5 6-5 10h5" />
      </>
    ),
    browser: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M7 6.5h.01M10 6.5h.01m-2 7 2 2-2 2m5 0h3" />
      </>
    ),
    chevron: <path d="m9 6 6 6-6 6" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </>
    ),
    monitor: (
      <>
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M12 17v4m-4 0h8" />
      </>
    ),
    moon: <path d="M20.9 13.3A9 9 0 0 1 10.7 3.1a9 9 0 1 0 10.2 10.2Z" />,
    external: (
      <path d="M14 3h7v7m0-7L10 14m-1-9H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" />
    ),
  };
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
