import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mesha Care",
  description: "Monte seu próximo procedimento!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900 antialiased">{children}</body>
    </html>
  );
}
