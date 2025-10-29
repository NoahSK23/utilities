import { createSEOMetadata } from '@/lib/create-seo-metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createSEOMetadata({
  title: 'Dinner Calculator',
  description: 'Calculate the cost of a dinner based on the number of guests.',
});

export default function DinnerCalculator() {
  return (
    // <main className="flex flex-col items-center justify-center gap-4 p-4">
    //   <h1 className="text-4xl font-bold">Dinner Calculator</h1>
    //   <div className="flex items-center gap-1">
    //     <label htmlFor="totalPrice" className="text-xl">
    //       Total Price:
    //     </label>
    //     <input
    //       type="number"
    //       id="totalPrice"
    //       className="rounded-lg border-2 border-black p-2"
    //     />
    //     <label htmlFor="guests" className="text-xl">
    //       Guests:
    //     </label>
    //     <input
    //       type="number"
    //       id="guests"
    //       className="rounded-lg border-2 border-black p-2"
    //     />
    //   </div>
    //   <Button
    //     bgColor="bg-white"
    //     textColor="text-black"
    //     className="font-semibold"
    //   >
    //     Calculate
    //   </Button>
    //   <div className="flex">

    //   </div>
    // </main>
    <iframe
      className="h-screen w-screen"
      src="https://noahsk23.github.io/dinner-calculator/"
    />
  );
}
