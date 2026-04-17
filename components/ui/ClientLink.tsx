"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function ClientLink({ href, children, className = "", ...props }: Props) {
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("app:loading:start"));
    try {
      await router.push(href);
    } finally {
      if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("app:loading:stop"));
    }
  };

  return (
    <a href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
