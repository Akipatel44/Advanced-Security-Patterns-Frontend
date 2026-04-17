import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import dynamic from "next/dynamic";
const NavigationLoader = dynamic(() => import("../components/ui/NavigationLoader"), { ssr: false });

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
          <div className="max-w-7xl mx-auto px-4 py-3">
            <h1 className="text-2xl font-bold text-blue-600">
              🔐 Advanced Security Patterns
            </h1>
            <p className="text-gray-600 text-sm">
              Learn JWT Authentication, RBAC/ACL, and Secure APIs
            </p>
          </div>
        </nav>
        <NavigationLoader />
        <main className="max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
