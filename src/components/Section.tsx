interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export default function Section({ children, ...props }: Props) {
  return (
    <section className="mx-auto max-w-md overflow-hidden rounded-xl bg-white p-4 text-black shadow-2xl md:max-w-2xl">
      {children}
    </section>
  );
}
