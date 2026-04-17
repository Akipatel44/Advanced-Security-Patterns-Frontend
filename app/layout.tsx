import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import dynamic from "next/dynamic";
import Link from "next/link";
import IconShield from "../components/icons/IconShield";
const NavigationLoader = dynamic(() => import("../components/ui/NavigationLoader"), { ssr: false });
const Toaster = dynamic(() => import("../components/ui/Toaster"), { ssr: false });

export const metadata: Metadata = {
  title: "Advanced Security Patterns",
  description: "Learning JWT, RBAC/ACL, and Secure APIs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <nav className="bg-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconShield className="w-7 h-7 text-primary-500" />
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-primary-500">Advanced Security Patterns</h1>
                <p className="text-gray-600 text-sm hidden md:block">Learn JWT Authentication, RBAC/ACL, and Secure APIs</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-primary-500">Home</Link>
              <Link href="/topic1" className="text-sm font-medium text-gray-700 hover:text-primary-500">JWT Auth</Link>
              <Link href="/topic2" className="text-sm font-medium text-gray-700 hover:text-primary-500">RBAC</Link>
              <Link href="/topic3" className="text-sm font-medium text-gray-700 hover:text-primary-500">Secure APIs</Link>
            </div>
          </div>
        </nav>
        <NavigationLoader />
        <Toaster />
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
