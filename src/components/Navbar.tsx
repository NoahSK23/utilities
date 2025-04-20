'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GithubSolid } from './Icons';

export default function NavBar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isSidebarOpen && !(event.target as Element).closest('aside')) {
        closeSidebar();
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeSidebar();
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeSidebar();
      }
    };

    window.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('resize', handleResize);
    };
  }, [isSidebarOpen]);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Storage Converter', href: '/converter' },
    { name: 'Measurement Converter', href: '/cm-feetinch' },
    { name: 'Hello', href: '/hello' },
    { name: 'Create Secret', href: '/create-secret' },
    { name: 'Dinner Calculator', href: '/dinner-calculator' },
  ];

  return (
    <>
      <nav className="border-b border-[#0a0a0a] bg-gray-800 bg-slate-800 p-2 drop-shadow-lg">
        <div className="container mx-auto flex items-center justify-end gap-1 md:justify-start">
          {/* Sidebar toggle button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="flex flex-col place-items-end rounded-lg border border-black p-2 md:hidden"
          >
            <svg viewBox="0 0 100 80" width="40" height="40" fill="white">
              <rect width="100" height="20"></rect>
              <rect y="30" width="100" height="20"></rect>
              <rect y="60" width="100" height="20"></rect>
            </svg>
          </button>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 p-2 md:flex">
            {links.map((link) => (
              <Link href={link.href} key={link.name}>
                <span
                  className={`rounded-md px-3 py-2 text-sm font-medium text-white transition-all hover:bg-gray-600 focus:bg-gray-700 focus:text-white focus:outline-hidden ${
                    pathname === link.href ? 'bg-gray-700 text-white' : ''
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
          <a
            className="ml-auto hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white transition-all hover:bg-gray-600 focus:bg-gray-700 focus:text-white focus:outline-hidden md:flex"
            href="https://github.com/noahsk23/utilities"
            target="_blank"
            rel="noreferrer"
          >
            {GithubSolid} View source on Github
          </a>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`bg-opacity-50 fixed inset-0 z-50 bg-black transition-opacity ${isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={closeSidebar}
      >
        <aside
          className={`fixed top-0 right-0 z-50 h-full w-64 transform bg-gray-800 text-white transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 text-white"
            >
              {/* Close button */}
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  fill="currentColor"
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12Z"
                />
              </svg>
            </button>
          </div>
          {links.map((link) => (
            <Link href={link.href} key={link.name}>
              <span
                onClick={() => setIsSidebarOpen(false)}
                className={`block px-3 py-2 text-end text-sm font-medium transition-all hover:bg-gray-200 hover:text-black ${
                  pathname === link.href
                    ? 'bg-gray-300 text-black hover:bg-gray-300'
                    : ''
                }`}
              >
                {link.name}
              </span>
            </Link>
          ))}
          <a
            className="flex items-center justify-end gap-2 px-3 py-2 text-end text-sm font-medium transition-all hover:bg-gray-200 hover:text-black"
            href="https://github.com/noahsk23/utilities"
            target="_blank"
            rel="noreferrer"
          >
            {GithubSolid} View source on Github
          </a>
        </aside>
      </div>
    </>
  );
}
