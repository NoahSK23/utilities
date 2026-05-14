export default function Footer() {
  return (
    <footer className="flex items-center justify-center border-t border-neutral-700 py-4 font-sans text-sm">
      {`© ${new Date().getFullYear()} NoahSK`}
    </footer>
  );
}
