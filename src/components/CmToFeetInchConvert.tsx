'use client';

import { useState } from 'react';
import Button from './Button';
import Section from './Section';

export default function CmToFeetInchConvert() {
  const [answer, setAnswer] = useState<string>();

  function convertCmToFeetAndInches(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cm = formData.get('cm') as string;
    console.log(cm);
    const value = parseFloat(cm);
    if (isNaN(value) || value <= 0 || cm === '') {
      setAnswer('Please enter a valid number');
      return;
    }
    const feet = Math.floor(value / 30.48);
    const inches = (value / 30.48 - feet) * 12;
    const roundedInches = Math.round(inches);
    const roundedToTwoDecimalPlaces = Math.round(inches * 100) / 100;
    setAnswer(
      `${feet} feet and ${roundedInches} inches (${roundedToTwoDecimalPlaces} inches)`
    );
  }

  return (
    <div className="p-4">
      <Section>
        <div className="p-4">
          <h1 className="text-3xl font-bold">Cm to Feet and Inches</h1>
          <p className="text-lg">
            Convert from centimeters (CM) to feet and inches.
          </p>
          <form
            onSubmit={convertCmToFeetAndInches}
            className="flex flex-col gap-2"
          >
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="cm"
            >
              Centimeters:
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              id="cm"
              name="cm"
              required
              className="mt-1 block w-full rounded-md border border-indigo-500 p-3 shadow-sm focus:ring-indigo-500 sm:text-sm"
              placeholder="Centimeters"
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
