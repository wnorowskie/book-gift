import type { Book } from "@/lib/types";
import { BookCard } from "./BookCard";
import { getMonthName } from "@/lib/utils";

interface MonthGroupProps {
  monthIndex: number;
  books: Book[];
}

export function MonthGroup({ monthIndex, books }: MonthGroupProps) {
  const monthName = getMonthName(monthIndex);

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-baseline gap-3">
        <h2 className="text-2xl font-bold text-slate-900">{monthName}</h2>
        <span className="text-sm text-slate-500">
          {books.length} {books.length === 1 ? "book" : "books"}
        </span>
      </div>

      {books.length === 0 ? (
        <p className="text-sm italic text-slate-400">
          No books finished this month.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}
