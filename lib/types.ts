export interface Book {
  id: string; // slug, e.g. "the-goldfinch"
  title: string;
  author: string;
  coverImageUrl: string; // local /public path or external URL
  dateFinished: string; // ISO string, e.g. "2024-05-12"
  rating?: number; // 1–5
  pages?: number;
  genre?: string;
  goodreadsUrl?: string;
  personalNote: string; // a short message written by me
  featured?: boolean; // optional: mark true for favorites/featured on the home page
}

export interface ReadingYear {
  year: number;
  readerName: string;
  goal: number; // e.g. 50
  books: Book[];
}
