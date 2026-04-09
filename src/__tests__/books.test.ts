import { Book } from "@/components/BookList";

const mockBooks: Book[] = [
  {
    id: "1342",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    gutenbergId: "1342",
    description: "A classic novel about the Bennet family.",
    chapters: [
      { number: 1, title: "Chapter 1", summary: "Summary 1" },
      { number: 2, title: "Chapter 2", summary: "Summary 2" },
    ],
  },
  {
    id: "84",
    title: "Frankenstein",
    author: "Mary Shelley",
    gutenbergId: "84",
    description: "The story of Victor Frankenstein.",
    chapters: [{ number: 1, title: "Letter 1", summary: "Summary 1" }],
  },
];

describe("Book Data Validation", () => {
  it("should have valid book structure", () => {
    const firstBook = mockBooks[0];
    expect(firstBook.id).toBeDefined();
    expect(firstBook.title).toBeDefined();
    expect(firstBook.author).toBeDefined();
    expect(firstBook.description).toBeDefined();
    expect(firstBook.chapters).toBeDefined();
    expect(Array.isArray(firstBook.chapters)).toBe(true);
  });

  it("should have chapters with number, title, and summary", () => {
    const firstBook = mockBooks[0];
    const chapter = firstBook.chapters[0];
    expect(chapter).toHaveProperty("number");
    expect(chapter).toHaveProperty("title");
    expect(chapter).toHaveProperty("summary");
  });

  it("should contain expected books", () => {
    const titles = mockBooks.map((b) => b.title);
    expect(titles).toContain("Pride and Prejudice");
    expect(titles).toContain("Frankenstein");
  });

  it("should validate book interface", () => {
    const book: Book = {
      id: "1",
      title: "Test",
      author: "Author",
      gutenbergId: "1",
      description: "Desc",
      chapters: [],
    };
    expect(book.id).toBe("1");
    expect(book.title).toBe("Test");
  });
});
