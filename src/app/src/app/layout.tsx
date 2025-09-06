import "./styles/globals.css";
import React from "react";

export const metadata = {
  title: "AutoWarrantyHub",
  description: "Dealer-facing extended warranty aggregator MVP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b">
          <div className="container py-4 flex items-center justify-between">
            <div className="text-xl font-bold">AutoWarrantyHub</div>
            <nav className="text-sm text-gray-600">
              <a className="mr-4 hover:underline" href="/">Dashboard</a>
              <a className="hover:underline" href="/quotes">Quotes</a>
            </nav>
          </div>
        </header>
        <main className="container py-6">{children}</main>
        <footer className="border-t mt-10">
          <div className="container py-6 text-sm text-gray-500">
            © {new Date().getFullYear()} AutoWarrantyHub — MVP
          </div>
        </footer>
      </body>
    </html>
  );
}
