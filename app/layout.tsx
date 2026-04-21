import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rimende",
  description: "Household & hygiene chore reminders",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-950 antialiased">
        {children}
      </body>
    </html>
  );
}
