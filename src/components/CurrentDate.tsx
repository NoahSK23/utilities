import { unstable_noStore } from 'next/cache';

export default function CurrentDate() {
  unstable_noStore();
  const date = new Date();
  return <div>{date.toLocaleString()}</div>;
}
