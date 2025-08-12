import './globals.css';

import "./globals.css";

export const metadata = { title: "OverseeNOI", description: "Asset Management Ops" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">{children}</body>
    </html>
  );
}