import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GridMind AI - Intelligent Smart Grid Optimization",
  description: "Next-generation software platform predicting electricity demand, disaggregating appliance loads with NILM, and managing transactive peer energy trades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}