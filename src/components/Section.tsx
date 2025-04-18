interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export default function Section({ children, ...props }: Props) {
  return (
    <section
      {...props}
      className="mx-auto max-w-2xl overflow-hidden rounded-xl bg-white p-6 text-black shadow-2xl md:max-w-3xl"
    >
      {children}
    </section>
  );
}
