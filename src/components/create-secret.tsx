'use client';

import { useState } from 'react';
import Accordion from './accordion';
import Button from './button';
import CopyButton from './copy-button';
import Section from './section';

export default function CreateSecret() {
  const [format, setFormat] = useState<'base64' | 'hex'>('base64');
  const [secretBytes, setSecretBytes] = useState<Uint8Array | null>(null);
  const secret = secretBytes
    ? format === 'base64'
      ? btoa(String.fromCharCode(...secretBytes))
      : Array.from(secretBytes, (byte) =>
          byte.toString(16).padStart(2, '0')
        ).join('')
    : '';

  function generate() {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    setSecretBytes(bytes);
  }

  return (
    <Section>
      <div className="form-stack">
        <fieldset className="segmented-field">
          <legend>Secret format</legend>
          <div className="segmented-control">
            {(
              [
                { value: 'base64', label: 'Base64' },
                { value: 'hex', label: 'Hexadecimal' },
              ] as const
            ).map((option) => (
              <label className="segmented-option" key={option.value}>
                <input
                  type="radio"
                  name="secretFormat"
                  value={option.value}
                  checked={format === option.value}
                  onChange={() => setFormat(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="field">
          <label htmlFor="secret">Secret</label>
          <textarea
            id="secret"
            className="secret-output"
            value={secret}
            readOnly
            placeholder="Generate a secret to get started"
            rows={3}
            spellCheck={false}
            aria-describedby="secret-format"
          />
          <p id="secret-format" className="helper-text">
            32 random bytes.{' '}
            {format === 'base64'
              ? '44 Base64 characters.'
              : '64 hexadecimal characters.'}
          </p>
          <span className="sr-only" role="status">
            {secret ? 'Secret generated.' : ''}
          </span>
        </div>
        <div className="actions">
          <Button onClick={generate}>
            {secret ? 'Generate another' : 'Generate secret'}
          </Button>
          <CopyButton text={secret} key={secret} />
        </div>
      </div>
      <Accordion title="How it works">
        <pre className="code-block">
          <code>{`const bytes = new Uint8Array(32);
crypto.getRandomValues(bytes);
const secret = ${
            format === 'base64'
              ? 'btoa(String.fromCharCode(...bytes))'
              : `Array.from(bytes, byte =>
  byte.toString(16).padStart(2, '0')
).join('')`
          };`}</code>
        </pre>
      </Accordion>
    </Section>
  );
}
