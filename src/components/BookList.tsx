import Link from "next/link";

export interface Book {
  id: string;
  title: string;
  author: string;
  gutenbergId: string;
  description: string;
  chapters: {
    number: number;
    title: string;
    summary: string;
  }[];
}

interface BookListProps {
  books: Book[];
}

export default function BookList({ books }: BookListProps) {
  return (
    <div className="book-list">
      {books.map((book) => (
        <Link href={`/book/${book.id}`} key={book.id} className="book-card">
          <h3>{book.title}</h3>
          <p className="author">by {book.author}</p>
          <p className="description">{book.description}</p>
        </Link>
      ))}
    </div>
  );
}
