"use client";

import { classNames } from "@/utils/classname";

type IButtonProp = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: React.FC<IButtonProp> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={classNames(
        "w-full bg-slate-800 hover:bg-slate-700 text-white font-semibold",
        "rounded-lg py-2 disabled:bg-slate-600",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
