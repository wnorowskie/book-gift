export default function LetterPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-xl bg-white p-8 shadow-lg md:p-12">
        <h1 className="mb-8 text-center text-3xl font-bold text-slate-900">
          A Note for You
        </h1>

        <div className="space-y-6 leading-relaxed text-slate-700">
          <p>Dear Victoria,</p>

          <p>
            This year, you've read 50 incredible books. Each one a journey, a
            lesson, or an escape. Watching you devour story after story has
            been inspiring, and I wanted to create something special to
            celebrate this amazing accomplishment.
          </p>

          <p>
            You read thrillers that kept you up late to memoirs that moved
            you to tears, from fantasy worlds that sparked your imagination to
            non-fiction that expanded your mind. You've explored so many
            different worlds and perspectives this year.
          </p>

          <p>
            This little website is my way of honoring your dedication to
            reading. It's not just about the number of books (though 50 is
            seriously impressive!), but about the joy, curiosity, and growth
            that comes with each page turned.
          </p>

          <p>
            Here's to another year of great books, cozy reading nooks, and
            stories that stay with you long after the final page. You're an
            amazing reader, and I can't wait to see what books find their way
            to you next year.
          </p>

          <p className="pt-4">
            With love and admiration,
            <br />
            <span className="font-semibold">Eric</span>
          </p>

          <p className="mt-8 text-center text-sm text-slate-500">
            2025
          </p>
        </div>
      </div>
    </div>
  );
}
