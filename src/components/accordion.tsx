'use client';

import { useId, useState } from 'react';
import ToolIcon from './tool-icon';

export default function Accordion({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  return (
    <div className="accordion">
      <h2 className="accordion-heading">
        <button
          type="button"
          id={`${id}-trigger`}
          className="accordion-trigger"
          aria-expanded={open}
          aria-controls={`${id}-content`}
          onClick={() => setOpen(!open)}
        >
          {title}
          <ToolIcon name="chevron" />
        </button>
      </h2>
      <div
        id={`${id}-content`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        hidden={!open}
      >
        {children}
      </div>
    </div>
  );
}
