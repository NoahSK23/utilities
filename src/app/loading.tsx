export default function Loading() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <div className="absolute h-12 w-12 rounded-full border-8 border-solid border-neutral-600"></div>
      <div className="absolute h-12 w-12 animate-spin rounded-full border-8 border-solid border-white border-t-transparent shadow-md"></div>
    </div>
  );
}
