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
        <div className="grid-container">
          <div className="grid-item-1">
            <Header />
            <NavBar />
          </div>
          <div className="main">{children}</div>
        </div>
      </body>
    </html>
  );
}
