import Link from "next/link";
import { getAllBooks, getFeaturedBooks, computeStats } from "@/lib/books";
import { readingYear2025 } from "@/lib/data";
import { BookCard } from "./components/BookCard";
import { StatCard } from "./components/StatCard";

export default function HomePage() {
  const allBooks = getAllBooks();
  const featuredBooks = getFeaturedBooks(allBooks);
  const stats = computeStats(allBooks);
  const { year, goal, readerName } = readingYear2025;

  const completionRate = Math.round((stats.totalBooks / goal) * 100);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center">
        <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
          🎉 {stats.totalBooks} Books in {year}!
        </h2>
        <p className="mt-4 text-lg text-slate-600 md:text-xl">
          Celebrating {readerName}'s incredible reading journey
        </p>
      </section>

      {/* Highlight Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Books Read"
          value={stats.totalBooks}
          description={`${completionRate}% of ${goal} goal`}
        />
        <StatCard
          label="Total Pages"
          value={stats.totalPages.toLocaleString()}
          description="That's a lot of reading!"
        />
        <StatCard
          label="Average Rating"
          value={stats.avgRating ? stats.avgRating.toFixed(1) : "—"}
          description="Out of 5 stars"
        />
      </section>

      {/* Featured Books */}
      {featuredBooks.length > 0 && (
        <section>
          <h3 className="mb-2 text-center text-3xl font-bold text-slate-900">
            Five Star Favorites
          </h3>
          <p className="mb-6 text-center text-3xl">⭐⭐⭐⭐⭐</p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 p-8 text-center text-white shadow-lg">
        <h3 className="text-2xl font-bold">Explore the full collection</h3>
        <p className="mt-2 text-slate-300">
          Browse all {stats.totalBooks} books, see the timeline, dive into
          stats, and read a special note
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/books"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
          >
            View All Books
          </Link>
          <Link
            href="/timeline"
            className="rounded-lg border-2 border-white px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-slate-900"
          >
            See Timeline
          </Link>
        </div>
      </section>
    </div>
  );
}
