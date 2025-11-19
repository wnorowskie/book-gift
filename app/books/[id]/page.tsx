import { getBookById, getAllBooks } from "@/lib/books";
import { BookCover } from "@/app/components/BookCover";
import { formatDate, renderStars } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BookDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;
  const book = getBookById(id);

  if (!book) {
    notFound();
  }

  // Get previous/next books for navigation
  const allBooks = getAllBooks();
  const currentIndex = allBooks.findIndex((b) => b.id === id);
  const prevBook = currentIndex > 0 ? allBooks[currentIndex - 1] : null;
  const nextBook =
    currentIndex < allBooks.length - 1 ? allBooks[currentIndex + 1] : null;

  return (
    <div>
      {/* Back link */}
      <Link
        href="/books"
        className="mb-6 inline-block text-sm text-slate-600 hover:text-slate-900"
      >
        ← Back to all books
      </Link>

      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        {/* Cover */}
        <div className="mx-auto w-full max-w-[300px]">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <BookCover src={book.coverImageUrl} title={book.title} />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{book.title}</h1>
            <p className="mt-2 text-xl text-slate-600">{book.author}</p>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex gap-2">
              <span className="font-medium text-slate-700">Finished:</span>
              <span className="text-slate-600">
                {formatDate(book.dateFinished)}
              </span>
            </div>

            {book.rating && (
              <div className="flex gap-2">
                <span className="font-medium text-slate-700">Rating:</span>
                <span className="text-amber-600">{renderStars(book.rating)}</span>
                <span className="text-slate-600">({book.rating}/5)</span>
              </div>
            )}

            {book.pages && (
              <div className="flex gap-2">
                <span className="font-medium text-slate-700">Pages:</span>
                <span className="text-slate-600">{book.pages}</span>
              </div>
            )}

            {book.genre && (
              <div className="flex gap-2">
                <span className="font-medium text-slate-700">Genre:</span>
                <span className="text-slate-600">{book.genre}</span>
              </div>
            )}

            {book.goodreadsUrl && (
              <div className="flex gap-2">
                <span className="font-medium text-slate-700">Goodreads:</span>
                <a
                  href={book.goodreadsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View on Goodreads →
                </a>
              </div>
            )}
          </div>

          {/* Personal Note */}
          <div className="rounded-xl bg-amber-50 p-6">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">
              My Note
            </h2>
            <p className="leading-relaxed text-slate-700">
              {book.personalNote}
            </p>
          </div>
        </div>
      </div>

      {/* Previous/Next Navigation */}
      <div className="mt-12 flex justify-between border-t border-slate-200 pt-6">
        <div>
          {prevBook && (
            <Link
              href={`/books/${prevBook.id}`}
              className="group block text-sm"
            >
              <span className="text-slate-500">← Previous</span>
              <span className="mt-1 block font-medium text-slate-900 group-hover:text-slate-600">
                {prevBook.title}
              </span>
            </Link>
          )}
        </div>
        <div className="text-right">
          {nextBook && (
            <Link
              href={`/books/${nextBook.id}`}
              className="group block text-sm"
            >
              <span className="text-slate-500">Next →</span>
              <span className="mt-1 block font-medium text-slate-900 group-hover:text-slate-600">
                {nextBook.title}
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
