import type { Metadata } from "next";
import { AdminShell } from "@/components/shell/admin-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kairo AI Admin",
  description: "Internal admin panel for Kairo AI operations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-stone-50 text-stone-950 antialiased">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
