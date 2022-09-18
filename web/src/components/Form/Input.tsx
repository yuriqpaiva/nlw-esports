import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  dateFrom?: boolean;
}

export function Input({ type, dateFrom, ...rest }: InputProps) {
  return (
      <div className="w-full bg-zinc-900">
        <input
          className="bg-transparent py-3 px-4 rounded text-sm placeholder:text-zinc-500 h-[3.125rem] w-full"
          type={type}
          {...rest}
        />
      </div>
  );
}
