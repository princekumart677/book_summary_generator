import { NextRequest, NextResponse } from "next/server";

interface Message {
  role: "system" | "user" | "assistant";
  content: string;
}

interface RequestBody {
  bookTitle: string;
  bookAuthor: string;
  chapters: { title: string; summary: string }[];
  question: string;
}

export async function POST(request: NextRequest) {
  try {
    const { bookTitle, bookAuthor, chapters, question }: RequestBody =
      await request.json();

    const context = chapters
      .map((ch) => `${ch.title}: ${ch.summary}`)
      .join("\n");

    const systemPrompt = `You are a helpful assistant answering questions about "${bookTitle}" by ${bookAuthor}. Use the following chapter summaries to answer questions:\n\n${context}`;

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
          model: "Phi-4-mini-instruct",
          max_tokens: 1024,
          temperature: 0.7,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("GitHub Models API error:", error);
      return NextResponse.json(
        { error: "Failed to get response from AI" },
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
