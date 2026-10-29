'use client';

import { tools } from '@/lib/tools';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { GithubSolid } from './icons';
import ThemeSlider from './theme-slider';
import ToolIcon, { type IconName } from './tool-icon';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const links: { name: string; href: string; icon: IconName }[] = [
    { name: 'All tools', href: '/', icon: 'grid' },
    ...tools,
  ];

  useEffect(() => {
    if (!open) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    }
    function closeOnOutside(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOnOutside);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOnOutside);
    };
  }, [open]);

  function navLink(link: { name: string; href: string; icon: IconName }) {
    return (
      <Link
        key={link.href}
        href={link.href}
        className="nav-link"
        aria-current={pathname === link.href ? 'page' : undefined}
        onClick={() => setOpen(false)}
      >
        <ToolIcon name={link.icon} />
        <span>{link.name}</span>
      </Link>
    );
  }

  return (
    <aside className="sidebar" ref={navRef}>
      <div className="brand-row">
        <Link
          href="/"
          className="brand"
          onClick={() => setOpen(false)}
          aria-label="Noah's Utilities home"
        >
          <span className="brand-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>Noah&apos;s Utilities</span>
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle button button-ghost"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
        >
          <ToolIcon name={open ? 'close' : 'menu'} />
        </button>
      </div>
      <nav
        id="site-navigation"
        aria-label="Main navigation"
        className={`navigation ${open ? 'navigation-open' : ''}`}
      >
        <div className="nav-tools">{links.map(navLink)}</div>
        <div className="nav-secondary">
          <ThemeSlider />
          <a
            className="nav-link"
            href="https://github.com/noahsk23/utilities"
            target="_blank"
            rel="noreferrer"
          >
            {GithubSolid}
            <span>Source code</span>
            <ToolIcon name="external" className="external-icon" />
          </a>
        </div>
      </nav>
    </aside>
  );
}
