'use client';

import { useState } from 'react';
import Button from './button';
import Section from './section';

export default function MeasurementConverter() {
  const [answer, setAnswer] = useState<string>();
  const [conversionType, setConversionType] = useState<'cm' | 'inches'>('cm');

  function convertToFeetAndInches(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputVal = formData.get('value') as string;
    const value = parseFloat(inputVal);
    if (isNaN(value) || value <= 0 || inputVal === '') {
      setAnswer('Please enter a valid number');
      return;
    }
    if (conversionType === 'cm') {
      // Convert centimeters to feet and inches
      const feet = Math.floor(value / 30.48);
      const inches = (value / 30.48 - feet) * 12;
      const roundedInches = Math.round(inches);
      const roundedToTwoDecimalPlaces = Math.round(inches * 100) / 100;
      setAnswer(
        `${feet} feet and ${roundedInches} inches (${roundedToTwoDecimalPlaces} inches)`
      );
    } else {
      // Convert inches to feet and inches
      const feet = Math.floor(value / 12);
      const remainderInches = Math.round((value - feet * 12) * 100) / 100;
      setAnswer(`${feet} feet and ${remainderInches} inches`);
    }
  }

  return (
    <div className="p-4">
      <h1 className="mb-2 text-center text-3xl font-bold">
        {conversionType === 'cm'
          ? 'CM to Feet and Inches'
          : 'Inches to Feet and Inches'}
      </h1>
      <Section>
        <p className="mb-2 text-center text-xl">
          Convert measurements to feet and inches.
        </p>
        <form onSubmit={convertToFeetAndInches} className="mb-3">
          <div className="mb-2 flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="conversionType"
                value="cm"
                checked={conversionType === 'cm'}
                onChange={(e) => {
                  setConversionType(e.target.value as 'cm' | 'inches');
                  setAnswer('');
                }}
                className="form-radio"
              />
              <span className="ml-2">Centimeters</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="conversionType"
                value="inches"
                checked={conversionType === 'inches'}
                onChange={(e) => {
                  setConversionType(e.target.value as 'cm' | 'inches');
                  setAnswer('');
                }}
                className="form-radio"
              />
              <span className="ml-2">Inches</span>
            </label>
          </div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="value"
          >
            {conversionType === 'cm' ? 'Centimeters:' : 'Inches:'}
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            id="value"
            name="value"
            required
            className="focus:shadow-outline mb-3 w-full appearance-none rounded-sm border px-3 py-2 leading-tight text-neutral-700 shadow-sm focus:outline-hidden"
            placeholder={conversionType === 'cm' ? 'Centimeters' : 'Inches'}
          />
          <div className="mb-3">
            <Button type="submit" className="w-fit">
              Convert
            </Button>
          </div>
        </form>
        {answer && answer !== 'Please enter a valid number' ? (
          <div className="result mt-3">
            <strong>Result:</strong>{' '}
            <span className="text-green-600">{answer}</span>
          </div>
        ) : answer === 'Please enter a valid number' ? (
          <div className="result mt-3">
            <strong className="text-red-500">Error:</strong>{' '}
            <span className="text-red-500">{answer}</span>
          </div>
        ) : null}
      </Section>
    </div>
  );
}
