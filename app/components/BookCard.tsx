import Link from "next/link";
import type { Book } from "@/lib/types";
import { BookCover } from "./BookCover";
import { renderStars } from "@/lib/utils";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/books/${book.id}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-md transition group-hover:shadow-lg">
        <div className="aspect-[2/3] relative overflow-hidden">
          <BookCover src={book.coverImageUrl} title={book.title} />
        </div>
        <div className="flex flex-1 flex-col p-3">
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
            {book.title}
          </h3>
          <p className="mt-1 text-xs text-slate-600">{book.author}</p>
          {book.rating && (
            <p className="mt-auto pt-1 text-xs text-amber-600">
              {renderStars(book.rating)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
