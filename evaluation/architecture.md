# Architecture Analysis for Assignment 6

## Architecture Classification

### My System: Prompt-First / Long-Context

My Book Summary Generator is a **prompt-first / long-context** architecture.

## Why Prompt-First / Long-Context?

1. **All chapter summaries are placed directly in the model context**
   - When a user asks a question, ALL 10 chapter summaries are included in the system prompt
   - No semantic search or retrieval is performed
   - The entire context (about 2000-3000 tokens) fits well within GPT-4o-mini's context window

2. **Data characteristics that justify this choice**
   - Only 5 books in the system (very small dataset)
   - Each book has 10 chapters = 50 total chapters
   - Average summary length = ~200 chars = ~50 tokens per chapter
   - Total context = ~5000 tokens max (well under 128K context window)

3. **Simple and appropriate for POC**
   - No vector database needed
   - No embedding generation
   - No retrieval logic complexity
   - Easy to debug (all prompts are logged)

## Why NOT Retrieval-First / RAG?

RAG would add:
- **Operational overhead**: Vector DB setup, embedding generation, similarity search
- **Cost**: More API calls (embed + generate)
- **Complexity**: Chunking strategies, retrieval tuning
- **Debugging difficulty**: Non-deterministic retrieval

For 5 books with 10 chapters each, the added complexity of RAG is not justified.

## Why NOT Tool-First / Function-Calling?

Tool calling is useful when:
- You need deterministic actions (search, database queries, API calls)
- Multi-step workflows are needed
- The model needs to pick between actions

My system doesn't need tools - it's a simple Q&A where the answer is in the provided context.

## Tradeoffs Discussed

| Factor | My Choice (Prompt-First) | Alternative (RAG) |
|--------|------------------------|-------------------|
| **Data/files** | All in memory | Need vector store |
| **Context limits** | Works for small data | Scales to large data |
| **Retrieval** | None - all included | Semantic search needed |
| **Determinism** | Model-dependent | + Retrieval variance |
| **Cost** | Lower (1 API call) | Higher (embed + generate) |
| **Overhead** | Minimal | Requires DB, embeddings |
| **Performance** | Fast (no retrieval) | Slower (search step) |
| **Debugging** | Easy (prompts logged) | Harder (2 stages) |

## One Important Capability I Did NOT Implement: RAG

### Would RAG Improve My System?

**Under current conditions**: No. With 5 books (50 chapters), the prompt-first approach is simpler and works well.

**When I Would Add RAG**:

1. If books grow beyond 20-30 books
2. If chapter summaries become very long
3. If users need to search across ALL books (not just one at a time)
4. If response time becomes unacceptable

### What Problems RAG Would Solve:
- Scaling beyond context window limits
- Finding relevant chapters across many books
- Semantic search capabilities

### New Complexities RAG Would Introduce:
- Vector database (Pinecone, Weaviate, or Qdrant)
- Embedding model (text-embedding-3-small)
- Chunking strategy decisions
- Retrieval tuning (top-k, similarity threshold)
- Debugging retrieval failures

## Conclusion

Prompt-first architecture is the right choice for this POC because:
- Dataset is tiny (5 books)
- All data fits in context
- Simplicity enables faster iteration
- Easy to explain and debug

The architecture would evolve to RAG only when scale demands it.