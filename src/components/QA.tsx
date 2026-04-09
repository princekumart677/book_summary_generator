"use client";

import { useState } from "react";

interface Chapter {
  number: number;
  title: string;
  summary: string;
}

interface QAProps {
  bookTitle: string;
  bookAuthor: string;
  chapters: Chapter[];
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function QA({ bookTitle, bookAuthor, chapters }: QAProps) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    const userQuestion = question;
    setQuestion("");
    setLoading(true);

    setMessages((prev) => [...prev, { role: "user", content: userQuestion }]);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookTitle,
          bookAuthor,
          chapters,
          question: userQuestion,
        }),
      });

      const data = await response.json();

      console.log("API Response:", data);
      console.log("Response status:", response.status);

      if (data.answer) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.answer },
        ]);
      } else if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${data.error}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Sorry, I couldn't get an answer." },
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "An error occurred. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="qa-section">
      <h2>Ask Questions About This Book</h2>

      <div className="chat-container">
        {messages.length === 0 && (
          <p className="chat-placeholder">
            Ask any question about {bookTitle} and get AI-powered answers!
          </p>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="question-form">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question about this book..."
          disabled={loading}
        />
        <button type="submit" disabled={loading || !question.trim()}>
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>
    </div>
  );
}
