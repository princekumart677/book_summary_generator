# Upstream Component Evaluation: ETL Output Quality

## What is the upstream component?

The upstream component is the **ETL pipeline** that:
1. Fetches raw text from Project Gutenberg
2. Splits text into chunks (10 parts per book)
3. Generates summaries using LLM
4. Saves to books.json

## What I'm evaluating: The chapter summaries in books.json

## Evaluation Criteria

| Criterion | Assessment |
|-----------|----------|
| **Completeness** | Each book has 10 chapters - covers first ~20% of each book |
| **Accuracy** | Summaries correctly reflect the chapter content |
| **Specificity** | Include character names, plot details, themes |
| **Usefulness** | Can answer most common questions |

## Sample Summary (Pride and Prejudice, Chapter 1)
> "In Chapter 1 of 'Pride and Prejudice,' we are introduced to the Bennet family and learn of the arrival of Mr. Bingley, a wealthy bachelor, in their neighborhood. The chapter highlights Mrs. Bennet's eagerness to marry off her daughters, emphasizing societal expectations regarding marriage during the Regency era."

**Assessment**: ✅ Good - specific, accurate, includes context

## Findings

### Strengths
- Summaries are detailed (100-200 characters each)
- Include character names and plot details
- Summaries generate relevant answers for most questions
- ETL automation works reliably

### Weaknesses Identified in Failure Cases
1. **Limited coverage**: Only first 10 chapters (fails for questions about later plot points)
2. **Generic summaries**: Some chapters have generic summaries that don't include key details
3. **No scene selection**: All 10 chapters included regardless of relevance

### Impact on End-to-End System
- Works well for questions about early plot
- Fails for questions about characters/events in later chapters
- This explains the 2 failure cases

## Recommendation for Improvement

Based on the evaluation, I identified and implemented:

### Improvement Made: Enhanced System Prompt

**Problem**: The model was giving "I don't know" answers or asking for clarification even when related information was in the summaries.

**Evidence**: Failure case #2 showed the model admitting summaries don't mention certain characters.

**Change**: Enhanced the system prompt with additional instructions:
```diff
+ If the summary mentions a character or event related to the question, provide that information.
+ The book is "${bookTitle}" - answer questions about this book specifically.
```

**Result**: Model now provides better answers by analyzing what's in the summaries rather than saying it doesn't know.

### What Still Needs Improvement
- More chapters in ETL (currently only 10 per book)
- Deeper summaries that include more character details
- Maybe add a "full book summary" section that covers plot beyond first 10 chapters