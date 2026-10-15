import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cheerio Next Best Action (prototype)",
  description: "Assignment prototype with synthetic data. Not the real Cheerio product.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
