import { test, expect } from "@playwright/test";

test.describe("Book Summary Generator E2E", () => {
  test("homepage loads correctly", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Book Summary Generator/);
    await expect(page.locator("h1")).toContainText("Welcome to Book Summary Generator");
  });

  test("book list displays 5 books", async ({ page }) => {
    await page.goto("/");
    const bookCards = page.locator(".book-card");
    await expect(bookCards).toHaveCount(5);
  });

  test("can navigate to book detail page", async ({ page }) => {
    await page.goto("/");
    await page.locator(".book-card").first().click();
    await expect(page).toHaveURL(/\/book\/\d+/);
    await expect(page.locator(".book-detail h1")).toBeVisible();
  });

  test("book detail shows chapter summaries", async ({ page }) => {
    await page.goto("/book/1342");
    await expect(page.locator(".chapters h2")).toContainText("Chapter Summaries");
    await expect(page.locator(".chapter")).toHaveCount(10);
  });

  test("QA section is present on book page", async ({ page }) => {
    await page.goto("/book/1342");
    await expect(page.locator(".qa-section h2")).toContainText("Ask Questions");
    await expect(page.locator(".question-form input")).toBeVisible();
  });

  test("can type question in QA form", async ({ page }) => {
    await page.goto("/book/1342");
    const input = page.locator(".question-form input");
    await input.fill("What is this book about?");
    await expect(input).toHaveValue("What is this book about?");
  });
});
