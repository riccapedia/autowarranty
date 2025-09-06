import "./styles/globals.css";
import React from "react";
import { ClerkProvider, SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";

export const metadata = {
  title: "AutoWarrantyHub",
  description: "Dealer-facing extended warranty aggregator MVP",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <header className="border-b">
            <div className="container py-4 flex items-center justify-between">
              <div className="text-xl font-bold">AutoWarrantyHub</div>
              <nav className="text-sm text-gray-600 flex items-center gap-4">
                <a className="hover:underline" href="/">Dashboard</a>
                <a className="hover:underline" href="/quotes">Quotes</a>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="btn btn-primary">Sign In</button>
                  </SignInButton>
                </SignedOut>
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
    </ClerkProvider>
  );
}
