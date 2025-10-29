'use client';
import { useEffect, useState } from 'react';
import Button from './button';
export default function LocalTest() {
  function handleClick() {
    if (localStorageBool) {
      localStorage.removeItem('test');
      setLocalStorageBool(false);
      setTest('Cleared localStorage');
    } else {
      localStorage.setItem('test', 'test');
      setLocalStorageBool(true);
      setTest('LocalStorage set');
    }
  }

  const [test, setTest] = useState('Checking localStorage...');
  const [localStorageBool, setLocalStorageBool] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('test')) {
      setTest('You have localStorage set!');
      setLocalStorageBool(true);
    } else {
      setTest('You do not have localStorage set.');
      setLocalStorageBool(false);
    }
  }, []);

  const buttonClass = localStorageBool ? 'bg-red-500' : 'bg-green-500';

  return (
    <div>
      <p>LocalTest: {test}</p>
      <div className="mt-2 flex flex-col items-center justify-center gap-2">
        <Button bgColor={buttonClass} onClick={handleClick}>
          {localStorageBool ? 'Clear localStorage' : 'Set localStorage'}
        </Button>
      </div>
    </div>
  );
}
