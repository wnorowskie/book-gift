import { getAllBooks } from "@/lib/books";
import { BookCard } from "../components/BookCard";

export default function BooksPage() {
  const books = getAllBooks();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">All Books</h1>
        <p className="mt-2 text-slate-600">
          {books.length} books read in 2025, sorted by date finished
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
