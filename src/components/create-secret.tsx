'use client';

import { useState } from 'react';
import Accordion from './accordion';
import Button from './button';
import CopyButton from './copy-button';
import Section from './section';

export default function CreateSecret() {
  const [secret, setSecret] = useState('');

  function generate() {
    const bytes = new Uint8Array(32);
    crypto.getRandomValues(bytes);
    setSecret(
      Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
    );
  }

  return (
    <Section>
      <div className="form-stack">
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
            32 random bytes. 64 hexadecimal characters.
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
const secret = Array.from(bytes, byte =>
  byte.toString(16).padStart(2, '0')
).join('');`}</code>
        </pre>
      </Accordion>
    </Section>
  );
}
