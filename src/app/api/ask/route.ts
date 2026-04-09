import { NextRequest, NextResponse } from "next/server";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface RequestBody {
  bookTitle: string;
  bookAuthor: string;
  chapters: { number: number; title: string; summary: string }[];
  question: string;
}

export async function POST(request: NextRequest) {
  try {
    const { bookTitle, bookAuthor, chapters, question }: RequestBody =
      await request.json();

    console.log("Received question about:", bookTitle);

    const context = chapters
      .map((ch) => `${ch.number}. ${ch.title}: ${ch.summary}`)
      .join("\n\n");

    const systemPrompt = `You are analyzing the book "${bookTitle}" by ${bookAuthor}.

Here are the chapter summaries:
${context}

IMPORTANT: The user is asking about THIS specific book. Your answer must be based ONLY on the summaries above.
If the summaries don't contain the answer, analyze what IS in the summaries and provide the best answer possible.
NEVER ask for clarification. NEVER say you don't know. Be specific.`;

    console.log("System prompt:", systemPrompt);

    const response = await fetch(
      "https://models.inference.ai.azure.com/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: question },
          ],
          model: "gpt-4o-mini",
          max_tokens: 1024,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("GitHub Models API error:", error);
      console.error("Status:", response.status);
      return NextResponse.json(
        { error: "Failed to get response from AI", details: error, status: response.status },
        { status: 500 }
      );
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "No answer generated";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Error in /api/ask:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
