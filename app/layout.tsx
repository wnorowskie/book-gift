import type { Metadata } from "next";
import "./globals.css";
import { NavLink } from "./components/NavLink";

export const metadata: Metadata = {
  title: "Your Year in Books",
  description: "A celebration of a wonderful reading year",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-xl font-bold text-slate-900">
                Your Year in Books
              </h1>
              <nav className="flex flex-wrap gap-6">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/books">Books</NavLink>
                <NavLink href="/timeline">Timeline</NavLink>
                <NavLink href="/stats">Stats</NavLink>
                <NavLink href="/letter">Letter</NavLink>
              </nav>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>

        <footer className="mt-16 border-t border-slate-200 bg-white py-6">
          <div className="mx-auto max-w-5xl px-4 text-center text-sm text-slate-500">
            Made with ❤️ for an amazing reader · 2025
          </div>
        </footer>
      </body>
    </html>
  );
}
