import type { Metadata } from "next";
import "../styles/globals.css";
import "../styles/app.css";
import NavBar from "@/components/navBar";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "MealPlanner",
  description: "Plan your meals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <NavBar />
      </body>
    </html>
  );
}
