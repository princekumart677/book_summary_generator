import Link from "next/link";
import booksData from "@/data/books.json";
import { Book } from "@/components/BookList";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return booksData.map((book) => ({
    id: book.id,
  }));
}

export default async function BookPage({ params }: PageProps) {
  const { id } = await params;
  const book = booksData.find((b: Book) => b.id === id);

  if (!book) {
    notFound();
  }

  return (
    <div className="container">
      <Link href="/" className="back-link">
        ← Back to Books
      </Link>
      <div className="book-detail">
        <h1>{book.title}</h1>
        <p className="author">by {book.author}</p>
        <p className="description">{book.description}</p>
        
        <div className="chapters">
          <h2>Chapter Summaries</h2>
          {book.chapters.map((chapter) => (
            <div key={chapter.number} className="chapter">
              <h3>{chapter.title}</h3>
              <p>{chapter.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
