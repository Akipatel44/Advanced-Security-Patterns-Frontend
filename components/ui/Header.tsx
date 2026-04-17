"use client";

import React, { useEffect, useState } from "react";
import ClientLink from "./ClientLink";
import IconShield from "../icons/IconShield";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClose = () => setOpen(false);
    if (typeof window !== "undefined") {
      window.addEventListener("app:loading:start", handleClose);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("app:loading:start", handleClose);
      }
    };
  }, []);

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <IconShield className="w-7 h-7 text-primary-500" />
            <div>
              <div className="text-lg font-bold text-primary-500">Advanced Security Patterns</div>
              <div className="text-gray-600 text-sm hidden md:block">Learn JWT Authentication, RBAC/ACL, and Secure APIs</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <ClientLink href="/" className="text-sm font-medium text-gray-700 hover:text-primary-500">Home</ClientLink>
            <ClientLink href="/topic1" className="text-sm font-medium text-gray-700 hover:text-primary-500">JWT Auth</ClientLink>
            <ClientLink href="/topic2" className="text-sm font-medium text-gray-700 hover:text-primary-500">RBAC</ClientLink>
            <ClientLink href="/topic3" className="text-sm font-medium text-gray-700 hover:text-primary-500">Secure APIs</ClientLink>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {!open ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="space-y-1 px-2">
              <ClientLink href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Home</ClientLink>
              <ClientLink href="/topic1" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">JWT Auth</ClientLink>
              <ClientLink href="/topic2" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">RBAC</ClientLink>
              <ClientLink href="/topic3" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50">Secure APIs</ClientLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
