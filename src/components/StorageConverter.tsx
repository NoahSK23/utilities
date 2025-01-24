'use client';
import { useState } from 'react';
import Button from './Button';
import Section from './Section';
export default function StorageConverter() {
  const [result, setResult] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(false);

    const formData = new FormData(e.currentTarget);
    const storage = formData.get('storage') as string;
    const conversionType = formData.get('conversionType') as string;

    console.log(storage, conversionType);

    const value = parseFloat(storage);
    if (isNaN(value)) {
      setError(true);
      setResult('Please enter a valid number');
      return;
    }

    if (conversionType === 'gbToGib') {
      setResult(
        `${value} GB is approximately ${(value * 0.931323).toFixed(2)} GiB`
      );
    } else {
      setResult(
        `${value} GiB is approximately ${(value / 0.931323).toFixed(2)} GB`
      );
    }
  };

  return (
    <div className="p-4">
      <Section>
        <p className="mb-2 text-center text-xl">
          Windows measures storage differently (Base 2) than macOS and Linux
          (Base 10). This can convert between the two.
        </p>
        <form onSubmit={handleSubmit} className="mb-3">
          <input
            type="number"
            min="0"
            step="0.01"
            name="storage"
            id="storage"
            placeholder="Enter storage size"
            required
            className="focus:shadow-outline mb-3 w-full appearance-none rounded-sm border px-3 py-2 leading-tight text-neutral-700 shadow-sm focus:outline-hidden"
          />

          <div className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="conversionType"
                id="conversionTypeGbToGib"
                value="gibToGb"
                defaultChecked
                className="form-radio"
              />
              <span className="ml-2">
                Convert from Base 2 (GiB) to Base 10 (GB)
              </span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="conversionType"
                id="conversionTypeGibToGb"
                value="gbToGib"
                className="form-radio"
              />
              <span className="ml-2">
                Convert from Base 10 (GB) to Base 2 (GiB)
              </span>
            </label>
          </div>
          <div className="mb-3">
            <Button type="submit">Convert</Button>
          </div>
        </form>
        {result && !error ? (
          <div className="result mt-3">
            <strong>Result:</strong>{' '}
            <span className="text-green-600">{result}</span>
          </div>
        ) : error ? (
          <div className="result mt-3">
            <strong className="text-red-500">Error:</strong>{' '}
            <span className="text-red-500">Please enter a valid number</span>
          </div>
        ) : null}
      </Section>
    </div>
  );
}
