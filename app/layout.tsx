import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import dynamic from "next/dynamic";
const NavigationLoader = dynamic(() => import("../components/ui/NavigationLoader"), { ssr: false });
const Toaster = dynamic(() => import("../components/ui/Toaster"), { ssr: false });
const Header = dynamic(() => import("../components/ui/Header"), { ssr: false });

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
        <Header />
        <NavigationLoader />
        <Toaster />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
