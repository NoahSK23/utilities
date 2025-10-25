'use client';
import { useEffect, useState } from 'react';
import Accordion from './Accordion';
import Button from './Button';
import { clipboardSvg, copiedSvg } from './Icons';

export default function CreateSecret() {
  const [secret, setSecret] = useState('');

  const [svg, setSvg] = useState(clipboardSvg);
  const [copyTimeout, setCopyTimeout] = useState<NodeJS.Timeout | null>(null);

  const createSecret = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    const secret = Array.from(array)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
    setSecret(secret);
    setSvg(clipboardSvg);
  };

  const copyToClipboard = async () => {
    if (secret) {
      try {
        await navigator.clipboard.writeText(secret);
        setSvg(copiedSvg);
        // Set the timeout and save its ID to state
        const timeoutId = setTimeout(() => {
          setSvg(clipboardSvg);
        }, 2000);
        setCopyTimeout(timeoutId);
      } catch (err) {
        alert(`Failed to copy: ${err}`);
      }
    }
  };

  useEffect(() => {
    // Cleanup function to clear the timeout when the component unmounts
    return () => {
      if (copyTimeout) {
        clearTimeout(copyTimeout);
      }
    };
  }, [copyTimeout]);

  return (
    <>
      <form
        onSubmit={createSecret}
        className="flex flex-col items-center justify-center gap-4"
      >
        <p className="px-3 text-center whitespace-pre-line">
          {
            'Generates a secure secret for the use in applications requiring one (e.g. JWT).\nIt uses built in browser APIs'
          }
        </p>
        <div className="rounded-md bg-slate-900 text-white">
          <Accordion title="View the code 👇">
            <code className="block rounded-lg p-4 text-sm whitespace-pre text-white">
              {`const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  const secret = Array.from(array)
  .map((byte) => byte.toString(16).padStart(2, '0'))
  .join('');`}
            </code>
          </Accordion>
        </div>
        <Button bgColor="bg-black" type="submit" className="w-fit">
          {secret ? 'Generate another secret' : 'Generate secret'}
        </Button>
      </form>
      {secret ? (
        <div className="flex gap-4 rounded-lg bg-slate-900 p-4">
          <p className="text-sm leading-10 break-all text-white">{secret}</p>
          <button
            className="rounded-lg bg-gray-700 p-2 text-white"
            onClick={copyToClipboard}
          >
            {svg}
          </button>
        </div>
      ) : null}
    </>
  );
}
