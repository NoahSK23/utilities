'use client';

import { useState, useEffect } from 'react';

type AccordionpProps = {
  children: React.ReactNode;
  title: string;
  id?: string;
  active?: boolean;
};

export default function Accordion({
  children,
  title,
  id,
  active = false,
}: AccordionpProps) {
  const [accordionOpen, setAccordionOpen] = useState<boolean>(false);

  useEffect(() => {
    setAccordionOpen(active);
  }, [active]);

  return (
    <div className="w-full rounded-md border border-neutral-800 p-2 px-3 transition-colors hover:border-neutral-700 hover:shadow-sm dark:border-neutral-600 dark:hover:border-neutral-500 dark:hover:bg-neutral-900">
      <h2 className="text-2xl font-semibold">
        <button
          className="flex w-full items-center justify-between py-2 text-left font-semibold"
          onClick={(e) => {
            e.preventDefault();
            setAccordionOpen(!accordionOpen);
          }}
          aria-expanded={accordionOpen}
          aria-controls={`accordion-text-${id}`}
        >
          <span>{title}</span>
          <svg
            className="ml-8 shrink-0 fill-white"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`origin-center transform transition duration-200 ease-out ${accordionOpen && 'rotate-180!'}`}
            />
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`origin-center rotate-90 transform transition duration-200 ease-out ${accordionOpen && 'rotate-180!'}`}
            />
          </svg>
        </button>
      </h2>
      <div
        id={`accordion-text-${id}`}
        role="region"
        aria-labelledby={`accordion-title-${id}`}
        className={`grid overflow-hidden text-sm text-slate-600 transition-all duration-300 ease-in-out dark:text-neutral-200 ${accordionOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="overflow-hidden text-lg">{children}</div>
      </div>
    </div>
  );
}
