"use client";
import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "danger";
};

export default function Button({ loading = false, children, className = "", variant = "primary", ...props }: Props) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-md font-semibold';
  const variants: Record<string,string> = {
    primary: 'bg-primary-500 text-white px-4 py-2 hover:bg-primary-600',
    secondary: 'bg-gray-50 text-gray-900 px-3 py-1.5 border border-gray-200',
    ghost: 'bg-transparent text-primary-500 px-2 py-1',
    danger: 'bg-red-600 text-white px-4 py-2 hover:bg-red-700'
  };
  const cls = `${base} ${variants[variant] || variants.primary} ${className}`;

  return (
    <button className={cls} disabled={loading || props.disabled} {...props}>
      <span>{children}</span>
    </button>
  );
}
