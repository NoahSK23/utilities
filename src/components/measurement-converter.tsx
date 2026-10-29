'use client';

import { useState } from 'react';
import Result from './result';
import Section from './section';

export default function MeasurementConverter() {
  const [unit, setUnit] = useState('cm');
  const [value, setValue] = useState('');
  const number = Number(value);
  const hasValue = value.trim() !== '';
  const totalInches =
    Math.round((unit === 'cm' ? number / 2.54 : number) * 100) / 100;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round((totalInches - feet * 12) * 100) / 100;
  const error = !hasValue
    ? ''
    : !Number.isFinite(number) || number < 0
      ? 'Enter a measurement of zero or more.'
      : !Number.isFinite(totalInches)
        ? 'Enter a smaller measurement.'
        : '';
  const result =
    hasValue && !error
      ? {
          value: `${feet.toLocaleString('en-US')} ft ${inches} in`,
          detail: `${number.toLocaleString('en-US')} ${unit === 'cm' ? 'cm' : 'in'}`,
        }
      : null;

  return (
    <Section>
      <div className="form-stack">
        <fieldset className="segmented-field">
          <legend>Convert from</legend>
          <div className="segmented-control">
            {[
              { value: 'cm', label: 'Centimeters' },
              { value: 'inches', label: 'Inches' },
            ].map((option) => (
              <label className="segmented-option" key={option.value}>
                <input
                  type="radio"
                  name="conversionType"
                  value={option.value}
                  checked={unit === option.value}
                  onChange={() => setUnit(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="field">
          <label htmlFor="measurement">Measurement</label>
          <div className="input-with-unit">
            <input
              id="measurement"
              name="value"
              className="input"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder="0"
              value={value}
              aria-invalid={!!error}
              aria-describedby={error ? 'measurement-error' : undefined}
              onChange={(event) => setValue(event.target.value)}
            />
            <span className="input-unit">{unit === 'cm' ? 'cm' : 'in'}</span>
          </div>
          {error && (
            <p className="error" id="measurement-error" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
      {result && <Result detail={result.detail}>{result.value}</Result>}
    </Section>
  );
}
