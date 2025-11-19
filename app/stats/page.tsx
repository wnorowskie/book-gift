import { getAllBooks, computeStats } from "@/lib/books";
import { StatCard } from "../components/StatCard";
import { getMonthName } from "@/lib/utils";

export default function StatsPage() {
  const books = getAllBooks();
  const stats = computeStats(books);

  // Find the max books per month for scaling the bars
  const maxBooksPerMonth = Math.max(...stats.booksPerMonth, 1);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Reading Stats 2025</h1>
        <p className="mt-2 text-slate-600">
          A data-driven look at the year in reading
        </p>
      </div>

      {/* Main Stats */}
      <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total Books" value={stats.totalBooks} />
        <StatCard
          label="Total Pages"
          value={stats.totalPages.toLocaleString()}
        />
        <StatCard
          label="Average Rating"
          value={stats.avgRating ? stats.avgRating.toFixed(2) : "—"}
          description="Out of 5 stars"
        />
      </div>

      {/* Books per Month */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Books per Month
        </h2>
        <div className="space-y-3">
          {stats.booksPerMonth.map((count, monthIndex) => {
            const widthPercent = (count / maxBooksPerMonth) * 100;
            return (
              <div key={monthIndex} className="flex items-center gap-4">
                <div className="w-24 text-sm font-medium text-slate-700">
                  {getMonthName(monthIndex)}
                </div>
                <div className="flex-1">
                  <div className="h-8 w-full rounded-md bg-slate-100">
                    <div
                      className="h-full rounded-md bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </div>
                <div className="w-12 text-right text-sm font-semibold text-slate-900">
                  {count}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Books per Genre */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-slate-900">
          Books by Genre
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(stats.genreCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([genre, count]) => (
              <div
                key={genre}
                className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md"
              >
                <span className="font-medium text-slate-900">{genre}</span>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
                  {count}
                </span>
              </div>
            ))}
        </div>
        {Object.keys(stats.genreCounts).length === 0 && (
          <p className="text-sm italic text-slate-500">
            No genre information available
          </p>
        )}
      </section>
    </div>
  );
}
