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
          <div className="grid-item grid-item-1">
            <Header />
            <NavBar />
          </div>
          <div className="grid-item grid-item-2">Grid Item 2</div>
          <div className="grid-item grid-item-3">Grid Item 3</div>
        </div>
      </body>
    </html>
  );
}
