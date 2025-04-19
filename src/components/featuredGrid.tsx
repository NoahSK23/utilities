import Link from 'next/link';

export default function FeaturedGrid({
  tool,
  description,
  link,
}: {
  tool: string;
  description: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      key={tool}
      className="group rounded-xl bg-white p-6 shadow-sm transition-all hover:shadow-md dark:bg-gray-800"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {tool}
      </h3>
      <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
    </Link>
  );
}
