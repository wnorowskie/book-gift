import { getAllBooks, groupBooksByMonth } from "@/lib/books";
import { MonthGroup } from "../components/MonthGroup";

export default function TimelinePage() {
  const books = getAllBooks();
  const booksByMonth = groupBooksByMonth(books);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Reading Timeline 2025
        </h1>
        <p className="mt-2 text-slate-600">
          A month-by-month journey through the year
        </p>
      </div>

      <div className="space-y-8">
        {Array.from({ length: 12 }, (_, i) => i).map((monthIndex) => (
          <MonthGroup
            key={monthIndex}
            monthIndex={monthIndex}
            books={booksByMonth[monthIndex]}
          />
        ))}
      </div>
    </div>
  );
}
