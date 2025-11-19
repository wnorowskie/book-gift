# Copilot Instructions – “Your Year in Books” Project

## 1. Project Overview

This repo is a **small, sentimental web app** as a Christmas gift.

The app celebrates one person’s reading year (50 books). It is **not** a generic product or multi-user app. Think “digital keepsake”, not SaaS.

Core features:

- Home page with congratulatory message and highlights.
- Grid of ~50 books with cover art.
- Book detail pages with metadata + a personal note.
- Timeline view (books grouped by month).
- Stats view (counts, averages, simple charts using CSS/Tailwind).
- Final “letter” page with a heartfelt note.

The tone is cozy, warm, and bookish.

---

## 2. Tech Stack & Constraints

- **Framework:** Next.js (App Router, `/app` directory).
- **Language:** TypeScript.
- **UI:** React + Tailwind CSS.
- **Data:** Static data (JSON / TS objects imported from `/lib`).
- **Hosting:** Vercel (static/site-like behavior is ideal).

### Hard constraints for Copilot

- Do **not** add a backend, API routes, databases, or authentication.
- Do **not** introduce heavy charting libs (Chart.js, Recharts, etc.).
  - For charts, use simple CSS-based bars with Tailwind.
- Do **not** introduce global state libraries (Redux, Zustand, etc.).
- Keep dependencies minimal — stick to what’s needed for Next.js + Tailwind.
- Avoid using `any` — prefer proper TypeScript types and interfaces.

---

## 3. Architecture & Folder Structure

We use the **Next.js App Router** with an `/app` directory.

Target structure (Copilot should adhere to this when suggesting new files):

```text
app/
  layout.tsx          # Root layout with global shell (header/nav/footer)
  page.tsx            # Home page
  books/
    page.tsx          # Books grid
    [id]/
      page.tsx        # Book detail page
  timeline/
    page.tsx          # Timeline view
  stats/
    page.tsx          # Stats view
  letter/
    page.tsx          # Final heartfelt note

  components/
    Layout.tsx
    NavLink.tsx
    BookCard.tsx
    BookCover.tsx
    StatCard.tsx
    MonthGroup.tsx

lib/
  types.ts
  data.ts
  books.ts
  utils.ts

public/
  covers/
    # book cover images (if using local assets)

styles/
  globals.css

tailwind.config.js
tsconfig.json
package.json
```

---

## 4. Data Model

```typescript
// lib/types.ts
export interface Book {
  id: string; // slug, e.g. "the-goldfinch"
  title: string;
  author: string;
  coverImageUrl: string; // local /public path or external URL
  dateFinished: string; // ISO string, e.g. "2024-05-12"
  rating?: number; // 1–5
  pages?: number;
  genre?: string;
  goodreadsUrl?: string;
  personalNote: string; // a short message written by me
}

export interface ReadingYear {
  year: number;
  readerName: string;
  goal: number; // e.g. 50
  books: Book[];
}
```

```typescript
// lib/data.ts
import type { ReadingYear } from "./types";

export const readingYear2024: ReadingYear = {
  year: 2024,
  readerName: "Her Name",
  goal: 50,
  books: [
    // 50 Book entries go here
  ],
};
```

---

## 5. Data Helpers

```typescript
// lib/book.ts
import { readingYear2024 } from "./data";
import type { Book } from "./types";

export function getAllBooks(): Book[] {
  return [...readingYear2024.books].sort((a, b) =>
    a.dateFinished.localeCompare(b.dateFinished)
  );
}

export function getBookById(id: string): Book | undefined {
  return readingYear2024.books.find((b) => b.id === id);
}

export function groupBooksByMonth(books: Book[]) {
  const grouped: Record<number, Book[]> = {};
  for (let i = 0; i < 12; i++) grouped[i] = [];

  books.forEach((book) => {
    const monthIndex = new Date(book.dateFinished).getMonth(); // 0–11
    grouped[monthIndex].push(book);
  });

  return grouped;
}

export function computeStats(books: Book[]) {
  const totalBooks = books.length;
  const totalPages = books.reduce((sum, b) => sum + (b.pages ?? 0), 0);
  const ratings = books
    .map((b) => b.rating)
    .filter((r): r is number => typeof r === "number");

  const avgRating = ratings.length
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length
    : null;

  // Additional stats (genre counts, books per month, etc.) can be added here.

  return {
    totalBooks,
    totalPages,
    avgRating,
  };
}
```

---

## 6.Layout, Nav and Pages

Root Layout (app/layout.tsx)

Copilot should always wrap pages in a consistent layout with:

Header with title + nav links.

Main content area centered with a max width.

Simple footer.

Guidelines:

Use semantic HTML (<header>, <nav>, <main>, <footer>).

Apply Tailwind classes for spacing, background, etc.

Example style preferences:

Background: bg-slate-50

Text: text-slate-900

Cards: bg-white shadow-md rounded-xl

Global max width: max-w-5xl mx-auto px-4

Navigation

Nav links should cover:

Home (/)

Books (/books)

Timeline (/timeline)

Stats (/stats)

Letter (/letter)

Copilot should implement an accessible nav, with an optional NavLink component to handle active styling.

---

## 7. Page Responsibilities

Copilot should keep each page focused and avoid duplicating logic across pages.

Home (/)

Congratulatory hero section:

main heading (e.g., “50 Books in 2024 🎉”)

short description

Highlight cards:

Total books

Goal vs. completed

A featured “favorite book” or two (can be passed as props or computed).

Calls to action:

Buttons/links to Books, Timeline, Stats, Letter.

Books Grid (/books)

Use getAllBooks() to get the list.

Display in a responsive grid:

grid-cols-2 md:grid-cols-3 lg:grid-cols-4 (or similar).

Each book uses a BookCard component:

Cover

Title

Author

Rating visual (e.g., stars or “4.5 ★”).

Clicking a book goes to /books/[id].

Book Detail (/books/[id])

Fetch the book using getBookById(id).

If book is not found, show a simple 404-style message (don’t overcomplicate).

Show:

Large cover image.

Title, author.

Date finished (formatted to a human-friendly date).

Rating, pages, genre.

Goodreads link if present.

Section for “My Note” (the personal note).

Provide:

“Back to all books” link.

Simple previous/next book navigation if convenient.

Timeline (/timeline)

Use getAllBooks() + groupBooksByMonth().

Render months in order Jan–Dec, even if a month has 0 books (optional but preferred).

For each month:

Month name heading.

Small cards or covers for books finished in that month.

Count of books for the month.

Optional: Use a minimalist bar to represent count per month (CSS only).

Stats (/stats)

Use getAllBooks() + computeStats() and any additional derived metrics.

Show:

Total books.

Total pages.

Average rating.

Books per genre (list with counts).

Books per month (12-row or 12-column bar chart using Tailwind width classes).

Charts should be implemented as simple divs with width percentages, not external chart libraries.

Letter (/letter)

A centered card layout with the final heartfelt note.

Copilot should format it as static text, not fetched from anywhere.

Use nice typography (e.g., base text + maybe larger line height) and plenty of whitespace.

---

## 8. Styling Guidelines (Tailwind)

General styling conventions Copilot should follow:

Use utility classes, not custom CSS, unless absolutely necessary.

Prefer consistent spacing values:

padding/margin: p-4, p-6, p-8, mb-4, mb-6, etc.

Use rounded corners for cards: rounded-xl or rounded-lg.

Use soft shadows: shadow-md, shadow-lg.

Respect responsive design:

Use max-w-5xl mx-auto for main container.

Use responsive text such as text-2xl md:text-3xl for headings.

Accessibility:

Always include alt text on images (e.g., alt={\Cover of ${book.title}`}`).

Use appropriate heading hierarchy (h1 for main, h2 for sections, etc.).

Ensure text contrast is readable (dark text on light background).

---

## 9. Component & Code Style

General guidelines for Copilot:

Use function components with export default or named exports.

Use TypeScript with proper props typing (no implicit any).

Prefer small, focused components that receive props rather than sharing global state.

Keep logic in /lib utilities and data helpers; pages and components should mostly orchestrate and render.

Example component style:

```typescript
interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/books/${book.id}`} className="group block">
      <div className="overflow-hidden rounded-xl bg-white shadow-md transition group-hover:shadow-lg">
        <BookCover src={book.coverImageUrl} title={book.title} />
        <div className="p-3">
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
            {book.title}
          </h3>
          <p className="mt-1 text-xs text-slate-600">{book.author}</p>
          {/* Optional rating */}
        </div>
      </div>
    </Link>
  );
}
```

---

## 10. Final Notes for Copilot

Copilot can suggest placeholder copy, but:

- The tone should be warm, positive, and personal.
- No generic “Welcome to our app” phrasing.
- Avoid marketing/sales tone. This is a 1:1 gift.
- Wherever Copilot inserts text, it should be easy to overwrite with real personalized copy later.

What Copilot Should NOT Do:

- Do NOT scaffold a full auth system, user accounts, or admin panels.
- Do NOT use data fetching from external APIs (Goodreads, etc.) at runtime.
- All data is static, imported at build time.
- Do NOT add unit tests by default (this project is small and not production-critical).
- Do NOT change TypeScript config or Next.js config without explicit instruction.
- Do NOT generate large amounts of unused code or sample pages (keep it lean and relevant).

---

## 11. Example Tasks

When in VS Code, assume the user may type comments like:

// TODO: Build the books grid page that lists all books using BookCard.

// TODO: Implement the Stats page using computeStats and show books per month and genre.

// TODO: Add a MonthGroup component to render books for a single month on the timeline page.

// TODO: Create a BookCover component that renders the cover image in a consistent aspect ratio.

When it sees prompts like these, Copilot should:

Use the existing types (Book, ReadingYear).

Use the helpers from lib/books.ts.

Place new components under app/components.

Follow the styling and layout conventions described above.
