'use client';

import { useState } from 'react';
import Button from './Button';
import Section from './Section';

export default function CmToFeetInchConvert() {
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
      <Section>
        <div className="p-4">
          <h1 className="text-3xl font-bold">
            {conversionType === 'cm'
              ? 'CM to Feet and Inches'
              : 'Inches to Feet and Inches'}
          </h1>
          <p className="text-lg">Convert measurements to feet and inches.</p>
          <form
            onSubmit={convertToFeetAndInches}
            className="flex flex-col gap-2"
          >
            {/* Radio selection */}
            <div className="mb-2 flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="conversionType"
                  value="cm"
                  checked={conversionType === 'cm'}
                  onChange={(e) => {
                    setConversionType(e.target.value as 'cm' | 'inches');
                    setAnswer(''); // Clear result on conversion type change
                  }}
                  className="h-4 w-4"
                />
                Centimeters
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="conversionType"
                  value="inches"
                  checked={conversionType === 'inches'}
                  onChange={(e) => {
                    setConversionType(e.target.value as 'cm' | 'inches');
                    setAnswer(''); // Clear result on conversion type change
                  }}
                  className="h-4 w-4"
                />
                Inches
              </label>
            </div>
            {/* Input field */}
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
              className="mt-1 block w-full rounded-md border border-indigo-500 p-3 shadow-xs focus:ring-indigo-500 sm:text-sm"
              placeholder={conversionType === 'cm' ? 'Centimeters' : 'Inches'}
            />
            <Button
              bgColor="bg-indigo-500"
              type="submit"
              className="mt-2 w-fit"
            >
              Convert
            </Button>
          </form>
          {answer && (
            <p className="mt-4 text-sm font-semibold text-red-500">{answer}</p>
          )}
        </div>
      </Section>
    </div>
  );
}
