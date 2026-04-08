import { render, screen } from "@testing-library/react";
import BookList, { Book } from "@/components/BookList";

const mockBooks: Book[] = [
  {
    id: "1",
    title: "Test Book",
    author: "Test Author",
    gutenbergId: "1",
    description: "A test book description",
    chapters: [],
  },
];

describe("BookList Component", () => {
  it("should render book titles", () => {
    render(<BookList books={mockBooks} />);
    expect(screen.getByText("Test Book")).toBeInTheDocument();
  });

  it("should render book authors", () => {
    render(<BookList books={mockBooks} />);
    expect(screen.getByText("by Test Author")).toBeInTheDocument();
  });

  it("should render book descriptions", () => {
    render(<BookList books={mockBooks} />);
    expect(screen.getByText("A test book description")).toBeInTheDocument();
  });

  it("should render multiple books", () => {
    const books: Book[] = [
      {
        id: "1",
        title: "Book One",
        author: "Author One",
        gutenbergId: "1",
        description: "Description One",
        chapters: [],
      },
      {
        id: "2",
        title: "Book Two",
        author: "Author Two",
        gutenbergId: "2",
        description: "Description Two",
        chapters: [],
      },
    ];
    render(<BookList books={books} />);
    expect(screen.getByText("Book One")).toBeInTheDocument();
    expect(screen.getByText("Book Two")).toBeInTheDocument();
  });

  it("should render empty state when no books", () => {
    render(<BookList books={[]} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
