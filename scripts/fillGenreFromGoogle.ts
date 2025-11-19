// scripts/fillGenresFromGoogle.ts

import fs from "fs";
import path from "path";
import type { Book } from "../lib/types";
import { readingYear2025 } from "../lib/data";

const GOOGLE_API_KEY = process.env.GOOGLE_BOOKS_API_KEY || "";

// Build a Google Books search URL for a given book
function buildGoogleBooksUrl(book: Book): string {
  const query = encodeURIComponent(`intitle:${book.title} inauthor:${book.author}`);
  let url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`;
  if (GOOGLE_API_KEY) {
    url += `&key=${GOOGLE_API_KEY}`;
  }
  return url;
}

// Map Google Books categories -> a single nice genre string
function mapCategoriesToGenre(categories: string[] | undefined): string | null {
  if (!categories || categories.length === 0) return null;

  const cats = categories.join(" | ").toLowerCase();

  const has = (needle: string) => cats.includes(needle);

  // Some rough heuristics
  const isYA = has("young adult") || has("ya ");

  if (has("romance") && has("fantasy")) return isYA ? "YA Fantasy Romance" : "Fantasy Romance";
  if (has("romance")) return isYA ? "YA Romance" : "Romance";
  if (has("fantasy")) return isYA ? "YA Fantasy" : "Fantasy";
  if (has("science fiction") || has("sci-fi") || has("scifi")) {
    return isYA ? "YA Science Fiction" : "Science Fiction";
  }
  if (has("mystery") || has("thriller") || has("crime") || has("suspense")) {
    return isYA ? "YA Mystery / Thriller" : "Mystery / Thriller";
  }
  if (has("horror")) return isYA ? "YA Horror" : "Horror";
  if (has("biography") || has("memoir")) return "Memoir / Biography";
  if (has("historical") && has("fiction")) return "Historical Fiction";
  if (has("graphic novel") || has("comics")) return "Graphic Novel";
  if (has("poetry")) return "Poetry";

  // Fallbacks
  if (has("fiction")) return isYA ? "YA Fiction" : "Fiction";
  if (has("nonfiction") || has("non-fiction") || has("essays")) return "Non-Fiction";

  return null;
}

async function fetchGenreForBook(book: Book): Promise<string | null> {
  const url = buildGoogleBooksUrl(book);
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

  // Naively use the first item
  const volume = data.items[0].volumeInfo;
  const categories: string[] | undefined = volume.categories;

  const mapped = mapCategoriesToGenre(categories);
  if (!mapped) {
    console.warn(`No usable genre mapped for "${book.title}"`, categories);
  }

  return mapped;
}

async function main() {
  const updatedBooks: Book[] = [];

  for (const book of readingYear2025.books) {
    // If genre already set (non-empty), keep it
    if (book.genre && book.genre.trim().length > 0) {
      updatedBooks.push(book);
      continue;
    }

    console.log(`Fetching genre for: "${book.title}" by ${book.author}...`);
    const genre = await fetchGenreForBook(book);

    // Be kind to the API
    await new Promise((r) => setTimeout(r, 500));

    updatedBooks.push({
      ...book,
      genre: genre ?? "", // leave empty if we couldn't determine
    });
  }

  // Helpful stat: how many still have empty genres?
  const missingCount = updatedBooks.filter((b) => !b.genre).length;
  console.log(`\nBooks with missing genre after script: ${missingCount}\n`);

  // Write out a new TS snippet you can paste into data.ts
  const out = `// Auto-generated with scripts/fillGenresFromGoogleBooks.ts

import type { ReadingYear } from "./types";

export const readingYear2025: ReadingYear = {
  year: ${readingYear2025.year},
  readerName: ${JSON.stringify(readingYear2025.readerName)},
  goal: ${readingYear2025.goal},
  books: ${JSON.stringify(updatedBooks, null, 2)} as const,
};
`;

  const outPath = path.join(__dirname, "..", "lib", "data.withGenres.ts");
  fs.writeFileSync(outPath, out, "utf-8");
  console.log(`Wrote updated data with genres to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
