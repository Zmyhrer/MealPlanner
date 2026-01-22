import type { Metadata } from "next";

import "./globals.css";
import { StorageErrorBoundary } from "./components/StorageErrorBoundary";
export const metadata: Metadata = {
  title: "MealPlanner",
  description:
    "A sophisticated meal planning application that uses AI to curate weekly schedules, generate grocery lists, and adapt to your dietary preferences with seamless unit conversion.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StorageErrorBoundary>{children}</StorageErrorBoundary>
      </body>
    </html>
  );
}
