import { readingYear2025 } from "./data";
import type { Book } from "./types";

export function getAllBooks(): Book[] {
  return [...readingYear2025.books].sort((a, b) =>
    a.dateFinished.localeCompare(b.dateFinished)
  );
}

export function getBookById(id: string): Book | undefined {
  return readingYear2025.books.find((b) => b.id === id);
}

export function groupBooksByMonth(books: Book[]) {
  const grouped: Record<number, Book[]> = {};
  for (let i = 0; i < 12; i++) grouped[i] = [];

  books.forEach((book) => {
    // Parse as local date to avoid timezone issues
    const [year, month, day] = book.dateFinished.split('-').map(Number);
    const monthIndex = month - 1; // Convert to 0-indexed (0 = January)
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

  // Genre counts
  const genreCounts: Record<string, number> = {};
  books.forEach((book) => {
    if (book.genre) {
      genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
    }
  });

  // Books per month
  const booksPerMonth = new Array(12).fill(0);
  books.forEach((book) => {
    // Parse as local date to avoid timezone issues
    const [year, month, day] = book.dateFinished.split('-').map(Number);
    const monthIndex = month - 1; // Convert to 0-indexed (0 = January)
    booksPerMonth[monthIndex]++;
  });

  return {
    totalBooks,
    totalPages,
    avgRating,
    genreCounts,
    booksPerMonth,
  };
}

export function getFeaturedBooks(books: Book[]): Book[] {
  // First, check if any books are manually marked as featured
  const manuallyFeatured = books.filter((b) => b.featured === true);
  if (manuallyFeatured.length > 0) {
    return manuallyFeatured;
  }

  // Otherwise, get the highest-rated books
  const withRatings = books.filter((b) => typeof b.rating === "number");
  const sorted = [...withRatings].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
  return sorted.slice(0, 2);
}
