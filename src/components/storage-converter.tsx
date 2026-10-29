'use client';

import { useState } from 'react';
import Result from './result';
import Section from './section';

export default function StorageConverter() {
  const [direction, setDirection] = useState('gibToGb');
  const [value, setValue] = useState('');
  const from = direction === 'gibToGb' ? 'GiB' : 'GB';
  const to = direction === 'gibToGb' ? 'GB' : 'GiB';
  const number = Number(value);
  const hasValue = value.trim() !== '';
  const converted =
    direction === 'gibToGb'
      ? number * (2 ** 30 / 10 ** 9)
      : number * (10 ** 9 / 2 ** 30);
  const error = !hasValue
    ? ''
    : !Number.isFinite(number) || number < 0
      ? 'Enter a storage size of zero or more.'
      : !Number.isFinite(converted)
        ? 'Enter a smaller storage size.'
        : '';
  const result =
    hasValue && !error
      ? {
          value: `${converted.toLocaleString('en-US', { maximumFractionDigits: 2 })} ${to}`,
          detail: `${number.toLocaleString('en-US')} ${from}`,
        }
      : null;

  return (
    <Section>
      <div className="form-stack">
        <fieldset className="segmented-field">
          <legend>Conversion</legend>
          <div className="segmented-control">
            {[
              { value: 'gibToGb', label: 'GiB to GB' },
              { value: 'gbToGib', label: 'GB to GiB' },
            ].map((option) => (
              <label className="segmented-option" key={option.value}>
                <input
                  type="radio"
                  name="conversionType"
                  value={option.value}
                  checked={direction === option.value}
                  onChange={() => setDirection(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="field">
          <label htmlFor="storage">Storage size</label>
          <div className="input-with-unit">
            <input
              className="input"
              id="storage"
              name="storage"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder="0"
              value={value}
              aria-invalid={!!error}
              aria-describedby={error ? 'storage-error' : undefined}
              onChange={(event) => setValue(event.target.value)}
            />
            <span className="input-unit">{from}</span>
          </div>
          {error && (
            <p className="error" id="storage-error" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
      {result && <Result detail={result.detail}>{result.value}</Result>}
    </Section>
  );
}
