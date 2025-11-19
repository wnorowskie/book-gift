// scripts/fillPagesFromGoogle.ts
import fs from "fs";
import path from "path";
import type { Book } from "../lib/types";
import { readingYear2025 } from "../lib/data";

const GOOGLE_API_KEY = process.env.GOOGLE_BOOKS_API_KEY; // optional but recommended

async function fetchPageCountForBook(book: Book): Promise<number | null> {
  // Build a search query using title + author
  const query = encodeURIComponent(`intitle:${book.title} inauthor:${book.author}`);
  let url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`;

  if (GOOGLE_API_KEY) {
    url += `&key=${GOOGLE_API_KEY}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`Failed to fetch for "${book.title}": ${res.status}`);
    return null;
  }

  const data = await res.json();

  if (!data.items || data.items.length === 0) {
    console.warn(`No items found for "${book.title}" by ${book.author}`);
    return null;
  }

  // Naive approach: use the first item
  const volume = data.items[0].volumeInfo;
  const pageCount = volume.pageCount;

  if (typeof pageCount === "number") {
    return pageCount;
  }

  console.warn(`No pageCount for "${book.title}"`);
  return null;
}

async function main() {
  const updatedBooks: Book[] = [];

  for (const book of readingYear2025.books) {
    // If pages already set, keep it
    if (typeof book.pages === "number" && book.pages > 0) {
      updatedBooks.push(book);
      continue;
    }

    console.log(`Fetching pages for: "${book.title}" by ${book.author}...`);
    const pages = await fetchPageCountForBook(book);

    // Be a little polite to the API
    await new Promise((r) => setTimeout(r, 500));

    updatedBooks.push({
      ...book,
      pages: pages ?? undefined,
    });
  }

  // Compute total pages just to show you
  const totalPages = updatedBooks.reduce(
    (sum, b) => sum + (b.pages ?? 0),
    0
  );

  console.log(`\nEstimated total pages for ${readingYear2025.year}: ${totalPages}\n`);

  // Write out a new TS snippet you can paste into data.ts
  const out = `// Auto-generated with scripts/fillPagesFromGoogle.ts

import type { ReadingYear } from "./types";

export const readingYear2025: ReadingYear = {
  year: ${readingYear2025.year},
  readerName: ${JSON.stringify(readingYear2025.readerName)},
  goal: ${readingYear2025.goal},
  books: ${JSON.stringify(updatedBooks, null, 2)} as const,
};
`;

  const outPath = path.join(__dirname, "..", "lib", "data.withPages.ts");
  fs.writeFileSync(outPath, out, "utf-8");
  console.log(`Wrote updated data with pages to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
