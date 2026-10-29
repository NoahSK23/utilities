'use client';

import { copyText } from '@/lib/copy-text';
import { useEffect, useRef, useState } from 'react';
import Button from './button';
import ToolIcon from './tool-icon';

export default function CopyButton({
  text,
  label = 'Copy',
}: {
  text: string;
  label?: string;
}) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  async function copy() {
    if (timer.current) clearTimeout(timer.current);
    try {
      await copyText(text);
      setStatus('copied');
      timer.current = setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('error');
    }
  }

  return (
    <span className="copy-control">
      <Button variant="secondary" onClick={copy} disabled={!text}>
        <ToolIcon name={status === 'copied' ? 'check' : 'copy'} />
        <span aria-live="polite">{status === 'copied' ? 'Copied' : label}</span>
      </Button>
      {status === 'error' && (
        <span role="alert" className="error">
          Could not copy. Select and copy the text.
        </span>
      )}
    </span>
  );
}
