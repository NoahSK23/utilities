import type { ButtonHTMLAttributes } from 'react';
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  children?: React.ReactNode;
  bgColor?: string;
  textColor?: string;
}

export default function Button({
  onClick,
  children,
  bgColor = 'bg-black',
  textColor = 'text-white',
  ...props
}: Props) {
  return (
    <button
      {...props}
      onClick={onClick}
      className={`${props.className} rounded-full ${bgColor} ${textColor} hover:bg-opacity-85 flex h-10 items-center justify-center border border-solid border-black/[.08] px-4 text-sm transition-all hover:border-transparent sm:h-12 sm:min-w-36 sm:px-5 sm:text-base dark:border-black/[.145]`}
    >
      {children}
    </button>
  );
}
