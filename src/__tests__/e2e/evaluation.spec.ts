import { test, expect } from "@playwright/test";

interface TestCase {
  id: string;
  bookTitle: string;
  question: string;
  expectedQuality: "good" | "okay" | "poor";
  notes: string;
}

const testCases: TestCase[] = [
  {
    id: "case_1",
    bookTitle: "Pride and Prejudice",
    question: "Who is the main character?",
    expectedQuality: "good",
    notes: "Should identify Elizabeth Bennet"
  },
  {
    id: "case_2",
    bookTitle: "Frankenstein",
    question: "What is this book about?",
    expectedQuality: "good",
    notes: "Should summarize the plot"
  },
  {
    id: "case_3",
    bookTitle: "Moby Dick",
    question: "Who is Captain Ahab?",
    expectedQuality: "good",
    notes: "Should describe Ahab's obsession with the white whale"
  },
  {
    id: "case_4",
    bookTitle: "Great Expectations",
    question: "What genre is this book?",
    expectedQuality: "good",
    notes: "Should identify as Victorian novel/dickens"
  },
  {
    id: "case_5",
    bookTitle: "The Strange Case of Dr Jekyll and Mr Hyde",
    question: "What is the theme of the book?",
    expectedQuality: "good",
    notes: "Should discuss duality of human nature"
  }
];

test.describe("Assignment 6 Evaluation Cases", () => {
  for (const tc of testCases) {
    test(tc.id + ": " + tc.question, async ({ page }) => {
      await page.goto("/book/" + (tc.bookTitle === "Pride and Prejudice" ? "1342" : tc.bookTitle === "Frankenstein" ? "84" : tc.bookTitle === "Moby Dick" ? "2701" : tc.bookTitle === "Great Expectations" ? "64317" : "43"));
      
      const input = page.locator(".question-form input");
      await input.fill(tc.question);
      await page.locator(".question-form button").click();
      
      await page.waitForTimeout(5000);
      
      const response = page.locator(".message.assistant .message-content").last();
      await expect(response).toBeVisible();
      
      const text = await response.textContent();
      console.log("Q: " + tc.question);
      console.log("A: " + text);
      console.log("Expected: " + tc.expectedQuality);
      console.log("Notes: " + tc.notes);
    });
  }
});

export { testCases };