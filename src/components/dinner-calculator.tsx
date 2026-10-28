'use client';

import { useState } from 'react';
import Button from './button';
import CopyButton from './copy-button';
import Section from './section';
import ToolIcon from './tool-icon';

type Person = 'my' | 'brother';
interface DinnerItem {
  id: string;
  price: number;
}
const currency = (value: number) => `$${value.toFixed(2)}`;

export default function DinnerCalculator() {
  const [totalPrice, setTotalPrice] = useState('');
  const [totalPeople, setTotalPeople] = useState('');
  const [items, setItems] = useState<Record<Person, DinnerItem[]>>({
    my: [],
    brother: [],
  });
  const [prices, setPrices] = useState<Record<Person, string>>({
    my: '',
    brother: '',
  });
  const [errors, setErrors] = useState<Record<Person, string>>({
    my: '',
    brother: '',
  });
  const [groupError, setGroupError] = useState('');
  const groupSubtotal = Number(totalPrice);
  const people = Number(totalPeople);
  const validSubtotal =
    totalPrice.trim() !== '' &&
    Number.isFinite(groupSubtotal) &&
    groupSubtotal > 0;
  const validPeople =
    totalPeople.trim() !== '' && Number.isInteger(people) && people > 0;
  const valid = validSubtotal && validPeople;
  const tip = valid ? (groupSubtotal * 0.2) / people : 0;
  const persons: {
    key: Person;
    title: string;
    subtotal: number;
    tax: number;
    total: number;
  }[] = (
    [
      { key: 'my', title: 'My items' },
      { key: 'brother', title: "Brother's items" },
    ] as const
  ).map((person) => {
    const subtotal = items[person.key].reduce(
      (sum, item) => sum + item.price,
      0
    );
    const tax = subtotal * 0.06;
    return { ...person, subtotal, tax, total: subtotal + tax + tip };
  });
  const combined = persons.reduce((sum, person) => sum + person.total, 0);
  const breakdown = `Dinner breakdown\nGroup subtotal: ${currency(groupSubtotal)}\nPeople: ${people}\nTax: 6%\nTip: 20%, split equally\n\n${persons.map((person) => `${person.key === 'my' ? 'My share' : "Brother's share"}\nItems: ${currency(person.subtotal)}\nTax: ${currency(person.tax)}\nTip: ${currency(tip)}\nTotal: ${currency(person.total)}`).join('\n\n')}\n\nCombined total: ${currency(combined)}`;

  function addItem(event: React.FormEvent<HTMLFormElement>, person: Person) {
    event.preventDefault();
    if (!validSubtotal || !validPeople) {
      setGroupError(
        !validSubtotal
          ? 'Enter a group subtotal greater than zero.'
          : 'Enter a whole number of people greater than zero.'
      );
      return;
    }
    const price = Number(prices[person]);
    if (!Number.isFinite(price) || price <= 0) {
      setErrors((previous) => ({
        ...previous,
        [person]: 'Enter a price greater than zero.',
      }));
      return;
    }
    setGroupError('');
    setErrors((previous) => ({ ...previous, [person]: '' }));
    setItems((previous) => ({
      ...previous,
      [person]: [
        ...previous[person],
        { id: `${Date.now()}-${Math.random()}`, price },
      ],
    }));
    setPrices((previous) => ({ ...previous, [person]: '' }));
  }

  return (
    <Section>
      <div className="form-stack">
        <div className="form-grid">
          <div className="field">
            <label htmlFor="totalPrice">Group subtotal</label>
            <div className="input-with-unit">
              <input
                className="input"
                id="totalPrice"
                type="number"
                inputMode="decimal"
                min="0.01"
                step="0.01"
                placeholder="0.00"
                value={totalPrice}
                aria-invalid={!!groupError && !validSubtotal}
                aria-describedby={
                  groupError && !validSubtotal ? 'group-error' : 'dinner-rates'
                }
                onChange={(event) => {
                  setTotalPrice(event.target.value);
                  setGroupError('');
                }}
              />
              <span className="input-unit">USD</span>
            </div>
          </div>
          <div className="field">
            <label htmlFor="totalPeople">People</label>
            <input
              className="input"
              id="totalPeople"
              type="number"
              inputMode="numeric"
              min="1"
              step="1"
              placeholder="2"
              value={totalPeople}
              aria-invalid={!!groupError && !validPeople}
              aria-describedby={
                groupError && !validPeople ? 'group-error' : 'dinner-rates'
              }
              onChange={(event) => {
                setTotalPeople(event.target.value);
                setGroupError('');
              }}
            />
          </div>
        </div>
        <p className="helper-text" id="dinner-rates">
          6% tax on items. 20% group tip, split equally.
        </p>
        {groupError && (
          <p className="error" id="group-error" role="alert">
            {groupError}
          </p>
        )}
        <div className="dinner-items">
          {persons.map((person) => (
            <section key={person.key} aria-labelledby={`${person.key}-heading`}>
              <h2 id={`${person.key}-heading`} className="section-title">
                {person.title}
              </h2>
              <form
                className="item-form"
                onSubmit={(event) => addItem(event, person.key)}
              >
                <div className="field">
                  <label htmlFor={`${person.key}ItemPrice`}>Item price</label>
                  <input
                    className="input"
                    id={`${person.key}ItemPrice`}
                    type="number"
                    inputMode="decimal"
                    min="0.01"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={prices[person.key]}
                    aria-invalid={!!errors[person.key]}
                    aria-describedby={
                      errors[person.key] ? `${person.key}-error` : undefined
                    }
                    onChange={(event) => {
                      setPrices((previous) => ({
                        ...previous,
                        [person.key]: event.target.value,
                      }));
                      setErrors((previous) => ({
                        ...previous,
                        [person.key]: '',
                      }));
                    }}
                  />
                </div>
                <Button
                  type="submit"
                  variant="secondary"
                  aria-label={`Add ${person.key === 'my' ? 'my' : "brother's"} item`}
                >
                  Add item
                </Button>
              </form>
              {errors[person.key] && (
                <p className="error" id={`${person.key}-error`} role="alert">
                  {errors[person.key]}
                </p>
              )}
              <ul className="item-list" aria-label={person.title}>
                {items[person.key].map((item) => (
                  <li key={item.id}>
                    <span>{currency(item.price)}</span>
                    <Button
                      variant="ghost"
                      className="button-icon button-danger"
                      aria-label={`Remove ${currency(item.price)} ${person.key === 'my' ? 'from my items' : "from brother's items"}`}
                      onClick={() =>
                        setItems((previous) => ({
                          ...previous,
                          [person.key]: previous[person.key].filter(
                            (current) => current.id !== item.id
                          ),
                        }))
                      }
                    >
                      <ToolIcon name="close" />
                    </Button>
                  </li>
                ))}
                {items[person.key].length === 0 && (
                  <li className="empty-list">Add an item above.</li>
                )}
              </ul>
            </section>
          ))}
        </div>
      </div>
      {valid && (
        <section className="totals" aria-labelledby="totals-heading">
          <div className="section-heading">
            <h2 id="totals-heading" className="section-title">
              Totals
            </h2>
            <CopyButton
              text={breakdown}
              label="Copy breakdown"
              key={breakdown}
            />
          </div>
          <div className="share-grid">
            {persons.map((person) => (
              <div key={person.key}>
                <h3 className="section-title">
                  {person.key === 'my' ? 'My share' : "Brother's share"}
                </h3>
                <dl>
                  <div>
                    <dt>Items</dt>
                    <dd>{currency(person.subtotal)}</dd>
                  </div>
                  <div>
                    <dt>Tax</dt>
                    <dd>{currency(person.tax)}</dd>
                  </div>
                  <div>
                    <dt>Tip</dt>
                    <dd>{currency(tip)}</dd>
                  </div>
                  <div className="share-total">
                    <dt>Total</dt>
                    <dd>{currency(person.total)}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
          <div className="result combined-total" role="status">
            <span className="result-label">Combined total</span>
            <span className="result-value">{currency(combined)}</span>
          </div>
        </section>
      )}
    </Section>
  );
}
