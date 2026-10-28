'use client';

import { useState, useSyncExternalStore } from 'react';
import Button from './button';
import Section from './section';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('utilities-storage', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('utilities-storage', callback);
  };
}
function getSnapshot() {
  try {
    return localStorage.getItem('test') !== null ? 'saved' : 'empty';
  } catch {
    return 'unavailable';
  }
}

export default function LocalTest() {
  const status = useSyncExternalStore(subscribe, getSnapshot, () => 'loading');
  const [error, setError] = useState('');
  const saved = status === 'saved';

  function toggle() {
    try {
      if (saved) localStorage.removeItem('test');
      else localStorage.setItem('test', 'test');
      window.dispatchEvent(new Event('utilities-storage'));
      setError('');
    } catch {
      setError(
        'Storage is blocked. Allow site storage in your browser settings.'
      );
    }
  }

  return (
    <Section>
      <h2 className="section-title">Local storage</h2>
      <p className="storage-status" role="status">
        <span
          className={`status-dot ${saved ? 'status-dot-active' : ''}`}
          aria-hidden="true"
        />
        {status === 'loading'
          ? 'Checking storage…'
          : saved
            ? 'Test value saved in this browser.'
            : status === 'unavailable'
              ? 'Browser storage is unavailable.'
              : 'No test value saved.'}
      </p>
      <Button
        onClick={toggle}
        variant={saved ? 'secondary' : 'primary'}
        disabled={status === 'loading' || status === 'unavailable'}
      >
        {saved ? 'Clear test value' : 'Save test value'}
      </Button>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
    </Section>
  );
}
