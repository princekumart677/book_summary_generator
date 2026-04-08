import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Book Summary Generator",
  description: "Browse books and ask AI questions about them",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="header">
          <div className="container">
            <Link href="/" className="logo">
              Book Summary Generator
            </Link>
          </div>
        </header>
        <main className="main">{children}</main>
      </body>
    </html>
  );
}
