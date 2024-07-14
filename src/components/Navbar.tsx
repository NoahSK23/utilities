'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (isSidebarOpen && !event.target.closest('aside')) {
        closeSidebar();
      }
    };
    const handleEscapeKey = (event: any) => {
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
    { name: 'Converter', href: '/converter' },
    { name: 'Cm to Feet and Inches', href: '/cm-feetinch' },
    { name: 'Hello', href: '/hello' },
    { name: 'Create Secret', href: '/create-secret' },
    { name: 'Dinner Calculator', href: '/dinner-calculator' },
  ];

  return (
    <>
      <nav className="border-b border-[#0a0a0a] bg-slate-800 p-2 drop-shadow-lg dark:bg-gray-800">
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
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-gray-600 focus:bg-gray-700 focus:text-white focus:outline-none dark:text-white ${
                    pathname === link.href ? 'bg-gray-700 text-white' : ''
                  }`}
                >
                  {link.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity ${isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={closeSidebar}
      >
        <aside
          className={`fixed right-0 top-0 z-50 h-full w-64 transform bg-gray-800 text-white transition-transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
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
        </aside>
      </div>
    </>
  );
}
