"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    // Current conversation history before adding the new message
    const currentHistory = messages;

    // Show user's message immediately
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          history: currentHistory,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from server");
      }

      const data = await response.json();

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please check that the backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearChat() {
    setMessages([]);
    setMessage("");
  }

  return (
    <main className="min-h-screen bg-[#08090d] text-white">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-white/10 bg-[#0d0f14] p-4 md:flex md:flex-col">

          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-xl">
              🤖
            </div>

            <div>
              <h1 className="font-bold">StudyAI</h1>

              <p className="text-xs text-gray-500">
                AI Study Assistant
              </p>
            </div>
          </div>

          {/* New Chat */}
          <button
            onClick={clearChat}
            className="mb-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:bg-white/10"
          >
            <span>＋</span>
            New Chat
          </button>

          {/* Subjects */}
          <div className="space-y-2">
            <p className="mb-3 px-2 text-xs uppercase tracking-wider text-gray-500">
              Study
            </p>

            <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
              🐍 Python
            </button>

            <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
              ⚡ JavaScript
            </button>

            <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
              🌐 MERN
            </button>

            <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
              🧠 Machine Learning
            </button>

            <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
              📊 Data Science
            </button>

            <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
              ✨ Artificial Intelligence
            </button>
          </div>

          {/* Bottom */}
          <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-medium">
              AI Study Assistant
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Learn smarter with AI.
            </p>
          </div>
        </aside>

        {/* Main Chat */}
        <section className="flex min-h-screen flex-1 flex-col">

          {/* Header */}
          <header className="flex items-center justify-between border-b border-white/10 bg-[#0b0d12]/80 px-5 py-4 backdrop-blur">

            <div>
              <h2 className="font-semibold">
                AI Study Assistant
              </h2>

              <div className="mt-1 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-400"></span>

                <span className="text-xs text-gray-500">
                  Online
                </span>
              </div>
            </div>

            <button
              onClick={clearChat}
              className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              Clear Chat
            </button>
          </header>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto">

            {/* Welcome Screen */}
            {messages.length === 0 ? (
              <div className="flex min-h-[70vh] items-center justify-center px-5">

                <div className="max-w-2xl text-center">

                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-4xl ring-1 ring-white/10">
                    🤖
                  </div>

                  <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                    Learn anything.

                    <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      Ask your AI tutor.
                    </span>
                  </h1>

                  <p className="mx-auto mt-5 max-w-xl text-gray-500">
                    Your personal AI Study Assistant for Python,
                    JavaScript, MERN, Machine Learning, Data Science
                    and Artificial Intelligence.
                  </p>

                  {/* Suggestions */}
                  <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

                    <button
                      onClick={() =>
                        setMessage(
                          "Explain Python variables simply"
                        )
                      }
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-purple-500/30 hover:bg-white/[0.06]"
                    >
                      <p className="text-sm font-medium">
                        🐍 Learn Python
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Explain Python variables simply
                      </p>
                    </button>

                    <button
                      onClick={() =>
                        setMessage(
                          "What is Machine Learning?"
                        )
                      }
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-blue-500/30 hover:bg-white/[0.06]"
                    >
                      <p className="text-sm font-medium">
                        🧠 Learn ML
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        What is Machine Learning?
                      </p>
                    </button>

                    <button
                      onClick={() =>
                        setMessage("Explain MERN stack")
                      }
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-purple-500/30 hover:bg-white/[0.06]"
                    >
                      <p className="text-sm font-medium">
                        🌐 Learn MERN
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Explain MERN stack
                      </p>
                    </button>

                    <button
                      onClick={() =>
                        setMessage(
                          "What is Artificial Intelligence?"
                        )
                      }
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-blue-500/30 hover:bg-white/[0.06]"
                    >
                      <p className="text-sm font-medium">
                        ✨ Learn AI
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        What is Artificial Intelligence?
                      </p>
                    </button>

                  </div>
                </div>
              </div>
            ) : (

              /* Messages */
              <div className="mx-auto max-w-4xl space-y-6 px-5 py-8">

                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      msg.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    {/* AI Avatar */}
                    {msg.role === "assistant" && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
                        🤖
                      </div>
                    )}

                    {/* Message */}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        msg.role === "user"
                          ? "bg-gradient-to-r from-purple-600 to-blue-600"
                          : "border border-white/10 bg-[#111318]"
                      }`}
                    >

                      <p className="mb-1 text-xs font-medium opacity-60">
                        {msg.role === "user"
                          ? "You"
                          : "StudyAI"}
                      </p>

                      <p className="whitespace-pre-wrap text-sm leading-7">
                        {msg.content}
                      </p>

                    </div>

                    {/* User Avatar */}
                    {msg.role === "user" && (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                        👤
                      </div>
                    )}

                  </div>
                ))}

                {/* Loading */}
                {loading && (
                  <div className="flex gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
                      🤖
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[#111318] px-5 py-3">

                      <div className="flex gap-1">
                        <span className="animate-bounce">
                          ●
                        </span>

                        <span className="animate-bounce [animation-delay:150ms]">
                          ●
                        </span>

                        <span className="animate-bounce [animation-delay:300ms]">
                          ●
                        </span>
                      </div>

                    </div>

                  </div>
                )}

              </div>
            )}

          </div>

          {/* Input */}
          <div className="border-t border-white/10 bg-[#08090d] p-4">

            <div className="mx-auto max-w-4xl">

              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#111318] p-2 shadow-2xl">

                <input
                  type="text"
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  placeholder="Ask your AI tutor..."
                  disabled={loading}
                  className="flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600"
                />

                <button
                  onClick={sendMessage}
                  disabled={
                    loading || !message.trim()
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ↑
                </button>

              </div>

              <p className="mt-2 text-center text-[11px] text-gray-600">
                AI Study Assistant can make mistakes.
                Always verify important information.
              </p>

            </div>

          </div>

        </section>
      </div>
    </main>
  );
}

