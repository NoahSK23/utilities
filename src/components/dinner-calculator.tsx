'use client';

import { useState } from 'react';
import Button from './button';
import Section from './section';

interface DinnerItem {
  id: string;
  price: number;
}

export default function DinnerCalculator() {
  const [totalPrice, setTotalPrice] = useState<string>('');
  const [totalPeople, setTotalPeople] = useState<string>('');
  const [myItems, setMyItems] = useState<DinnerItem[]>([]);
  const [brotherItems, setBrotherItems] = useState<DinnerItem[]>([]);
  const [myItemPrice, setMyItemPrice] = useState<string>('');
  const [brotherItemPrice, setBrotherItemPrice] = useState<string>('');
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [groupError, setGroupError] = useState<string>('');
  const [myError, setMyError] = useState<string>('');
  const [brotherError, setBrotherError] = useState<string>('');

  const parsedTotalPrice = parseFloat(totalPrice);
  const parsedTotalPeople = parseInt(totalPeople, 10);

  const isGroupValid =
    !isNaN(parsedTotalPrice) &&
    parsedTotalPrice > 0 &&
    !isNaN(parsedTotalPeople) &&
    parsedTotalPeople > 0;

  const mySubtotal = myItems.reduce((sum, item) => sum + item.price, 0);
  const brotherSubtotal = brotherItems.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const taxRate = 0.06;
  const tipRate = 0.2;

  const myTax = mySubtotal * taxRate;
  const myTip = isGroupValid
    ? (parsedTotalPrice * tipRate) / parsedTotalPeople
    : 0;
  const myTotalWithTip = mySubtotal + myTip;
  const myTotalWithTaxAndTip = mySubtotal + myTip + myTax;

  const brotherTax = brotherSubtotal * taxRate;
  const brotherTip = isGroupValid
    ? (parsedTotalPrice * tipRate) / parsedTotalPeople
    : 0;
  const brotherTotalWithTip = brotherSubtotal + brotherTip;
  const brotherTotalWithTaxAndTip = brotherSubtotal + brotherTip + brotherTax;

  const grandTotalCombined = myTotalWithTaxAndTip + brotherTotalWithTaxAndTip;

  const handleAddItem = (person: 'my' | 'brother') => {
    const inputPrice = person === 'my' ? myItemPrice : brotherItemPrice;
    const price = parseFloat(inputPrice);

    if (isNaN(price) || price <= 0) {
      if (person === 'my') {
        setMyError('Please enter a valid price');
      } else {
        setBrotherError('Please enter a valid price');
      }
      return;
    }

    if (isNaN(parsedTotalPrice) || parsedTotalPrice <= 0) {
      setGroupError('Please enter a valid grand total first');
      return;
    }

    if (isNaN(parsedTotalPeople) || parsedTotalPeople <= 0) {
      setGroupError('Please enter a valid number of people first');
      return;
    }

    setGroupError('');
    if (person === 'my') {
      setMyError('');
      setMyItems((prev) => [
        ...prev,
        { id: `${Date.now()}-${Math.random()}`, price },
      ]);
      setMyItemPrice('');
    } else {
      setBrotherError('');
      setBrotherItems((prev) => [
        ...prev,
        { id: `${Date.now()}-${Math.random()}`, price },
      ]);
      setBrotherItemPrice('');
    }
  };

  const handleRemoveItem = (person: 'my' | 'brother', id: string) => {
    if (person === 'my') {
      setMyItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setBrotherItems((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleCopyBreakdown = async () => {
    const text = `
Dinner Calculator Breakdown:
---------------------------
Group Details:
- Grand Total: $${parsedTotalPrice.toFixed(2)}
- Total People: ${parsedTotalPeople}

My Share:
- Items Subtotal: $${mySubtotal.toFixed(2)}
- Tip Share: $${myTip.toFixed(2)}
- Tax (6%): $${myTax.toFixed(2)}
- Total Owed: $${myTotalWithTaxAndTip.toFixed(2)}

Brother's Share:
- Items Subtotal: $${brotherSubtotal.toFixed(2)}
- Tip Share: $${brotherTip.toFixed(2)}
- Tax (6%): $${brotherTax.toFixed(2)}
- Total Owed: $${brotherTotalWithTaxAndTip.toFixed(2)}

---------------------------
Grand Total Combined: $${grandTotalCombined.toFixed(2)}
`.trim();

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Fallback if clipboard fails
    }
  };

  const inputClass =
    'w-full appearance-none rounded-sm border px-3 py-2 leading-tight shadow-xs focus:outline-hidden transition-all bg-white border-gray-300 text-neutral-700 focus:ring-1 focus:ring-gray-400';

  return (
    <div className="w-full p-4">
      <h1 className="mb-2 text-center text-3xl font-bold">Dinner Calculator</h1>
      <Section>
        {/* Description Row */}
        <p className="mb-6 text-sm text-slate-500">
          Calculate and split group dinner bill details.
        </p>

        {/* Group Inputs */}
        <div className="mb-6">
          <div className="mb-4">
            <label
              htmlFor="totalPrice"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Grand Total for All (for tip Calculation):
            </label>
            <input
              id="totalPrice"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter Price"
              value={totalPrice}
              onChange={(e) => {
                setTotalPrice(e.target.value);
                if (groupError) setGroupError('');
              }}
              className={inputClass}
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="totalPeople"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Number of people who came (for tip Calculation):
            </label>
            <input
              id="totalPeople"
              type="number"
              min="1"
              step="1"
              placeholder="Enter people"
              value={totalPeople}
              onChange={(e) => {
                setTotalPeople(e.target.value);
                if (groupError) setGroupError('');
              }}
              className={inputClass}
            />
          </div>
          {groupError && (
            <p className="mt-2 text-xs font-semibold text-red-500">
              {groupError}
            </p>
          )}
        </div>

        {/* Dinner Items Lists */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-bold">My Dinner Items</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddItem('my');
              }}
              className="mb-3 flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  id="myItemPrice"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Enter price"
                  value={myItemPrice}
                  onChange={(e) => {
                    setMyItemPrice(e.target.value);
                    if (myError) setMyError('');
                  }}
                  className={inputClass}
                />
              </div>
              <Button
                type="submit"
                className="!sm:h-10 !sm:px-3 h-10! rounded-sm px-3! text-xs font-semibold sm:text-sm"
              >
                Add Item
              </Button>
            </form>
            {myError && (
              <p className="mb-2 text-xs font-semibold text-red-500">
                {myError}
              </p>
            )}
            <ul className="mb-4 divide-y divide-gray-200 rounded-sm border border-gray-200">
              {myItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <span>${item.price.toFixed(2)}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('my', item.id)}
                    className="cursor-pointer rounded-sm border border-gray-200 px-2 py-0.5 text-sm font-bold text-gray-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    -
                  </button>
                </li>
              ))}
              {myItems.length === 0 && (
                <li className="px-3 py-3 text-center text-xs text-gray-400 italic">
                  No items
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-lg font-bold">
              Brother&apos;s Dinner Items
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddItem('brother');
              }}
              className="mb-3 flex items-center gap-2"
            >
              <div className="relative flex-1">
                <input
                  id="brotherItemPrice"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="Enter price"
                  value={brotherItemPrice}
                  onChange={(e) => {
                    setBrotherItemPrice(e.target.value);
                    if (brotherError) setBrotherError('');
                  }}
                  className={inputClass}
                />
              </div>
              <Button
                type="submit"
                className="!sm:h-10 !sm:px-3 h-10! rounded-sm px-3! text-xs font-semibold sm:text-sm"
              >
                Add Item
              </Button>
            </form>
            {brotherError && (
              <p className="mb-2 text-xs font-semibold text-red-500">
                {brotherError}
              </p>
            )}
            <ul className="mb-4 divide-y divide-gray-200 rounded-sm border border-gray-200">
              {brotherItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  <span>${item.price.toFixed(2)}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('brother', item.id)}
                    className="cursor-pointer rounded-sm border border-gray-200 px-2 py-0.5 text-sm font-bold text-gray-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    -
                  </button>
                </li>
              ))}
              {brotherItems.length === 0 && (
                <li className="px-3 py-3 text-center text-xs text-gray-400 italic">
                  No items
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Totals Section */}
        {isGroupValid && (
          <div id="totals" className="mt-6 border-t border-gray-200 pt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Totals</h2>
              <button
                type="button"
                onClick={handleCopyBreakdown}
                className={`cursor-pointer rounded-sm border px-2.5 py-1.5 text-xs font-semibold shadow-xs transition-all ${
                  isCopied
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {isCopied ? 'Copied!' : 'Copy Breakdown'}
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* My share */}
              <div className="rounded-sm border border-gray-200 bg-gray-50 p-4">
                <h4 className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
                  My Share
                </h4>
                <div className="space-y-1.5">
                  <p
                    id="myTotal"
                    className="flex justify-between text-sm font-semibold"
                  >
                    <span>My Total:</span> <span>${mySubtotal.toFixed(2)}</span>
                  </p>
                  <p
                    id="myTotalTip"
                    className="flex justify-between text-sm text-gray-500"
                  >
                    <span>Total + Tip (${myTip.toFixed(2)}):</span>{' '}
                    <span>${myTotalWithTip.toFixed(2)}</span>
                  </p>
                  <p
                    id="myTotalTaxTip"
                    className="mt-1.5 flex justify-between border-t border-dashed border-gray-300 pt-1.5 text-sm"
                  >
                    <span>Total + Tip + Tax (${myTax.toFixed(2)}):</span>{' '}
                    <span className="font-bold">
                      ${myTotalWithTaxAndTip.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Brother's share */}
              <div className="rounded-sm border border-gray-200 bg-gray-50 p-4">
                <h4 className="mb-2 text-xs font-bold tracking-wider text-gray-500 uppercase">
                  Brother&apos;s Share
                </h4>
                <div className="space-y-1.5">
                  <p
                    id="brotherTotal"
                    className="flex justify-between text-sm font-semibold"
                  >
                    <span>Brother&apos;s Total:</span>{' '}
                    <span>${brotherSubtotal.toFixed(2)}</span>
                  </p>
                  <p
                    id="brotherTotalTip"
                    className="flex justify-between text-sm text-gray-500"
                  >
                    <span>Total + Tip (${brotherTip.toFixed(2)}):</span>{' '}
                    <span>${brotherTotalWithTip.toFixed(2)}</span>
                  </p>
                  <p
                    id="brotherTotalTaxTip"
                    className="mt-1.5 flex justify-between border-t border-dashed border-gray-300 pt-1.5 text-sm"
                  >
                    <span>Total + Tip + Tax (${brotherTax.toFixed(2)}):</span>{' '}
                    <span className="font-bold">
                      ${brotherTotalWithTaxAndTip.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Grand Total */}
            <div className="mt-4 rounded-sm border border-gray-200 bg-gray-100 p-4 text-center">
              <p id="grandTotal" className="text-lg font-bold">
                Grand Total: ${grandTotalCombined.toFixed(2)}
              </p>
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}
