# Book Summary Generator

An end-to-end AI-enabled application that allows users to browse classic books, read chapter summaries, and ask AI-powered questions about each book.

## Features

- **Browse Books**: View a collection of 5 classic books from Project Gutenberg
- **Chapter Summaries**: Read AI-generated summaries for each chapter
- **AI Q&A**: Ask questions about any book and get answers powered by LLMs
- **ETL Pipeline**: Automated data fetching and processing via GitHub Actions

## Architecture

```
Project Gutenberg (Raw Data)
        ↓
GitHub Actions ETL (Extract, Transform)
        ↓
data/books.json (Gold Storage)
        ↓
Next.js App (UI Layer)
        ↓
GitHub Models API (LLM Reasoning)
```

## Tech Stack

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: CSS Modules
- **LLM**: GitHub Models (gpt-4o-mini)
- **ETL**: GitHub Actions
- **Data Source**: Project Gutenberg
- **Testing**: Jest (unit), Playwright (E2E)

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Homepage with book list
│   ├── book/[id]/page.tsx # Book detail page
│   └── api/ask/           # Q&A API endpoint
├── components/
│   ├── BookList.tsx      # Book listing component
│   └── QA.tsx            # Q&A chat component
└── __tests__/
    ├── books.test.ts     # Unit tests for book data
    ├── BookList.test.tsx # BookList component tests
    └── e2e/app.spec.ts  # Playwright E2E tests

.github/workflows/
└── etl.yaml              # ETL pipeline for book data

data/
└── books.json            # Curated book data with chapter summaries
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your GitHub token:
   ```
   GITHUB_TOKEN=your_github_token
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

## Running Tests

```bash
# Unit tests
npm test

# E2E tests
npx playwright test
```

## Running ETL Pipeline

The ETL pipeline can be run manually from GitHub Actions or automatically on a weekly schedule. It:
1. Fetches book text from Project Gutenberg
2. Generates chapter summaries using LLM
3. Commits the processed data to `data/books.json`

## Deployment

Deployed on Vercel: [Vercel URL]

## Development Process

This project was built using the following workflow:
1. `grill-me` - Validated project scope and requirements
2. `write-a-prd` - Created PRD as GitHub Issue
3. `prd-to-issues` - Broke down into 5 vertical slices
4. `tdd` - Implemented with tests
5. `improve-codebase-architecture` - Reviewed and improved structure

See GitHub Issues for implementation details.