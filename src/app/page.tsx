import BookList from "@/components/BookList";
import booksData from "@/data/books.json";
import { Book } from "@/components/BookList";

export default function Home() {
  const books: Book[] = booksData;

  return (
    <div className="container">
      <div className="hero">
        <h1>Welcome to Book Summary Generator</h1>
        <p>Browse classic public domain books and ask AI questions about them.</p>
      </div>
      <BookList books={books} />
    </div>
  );
}
