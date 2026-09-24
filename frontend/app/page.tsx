"use client";

import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000";

type Message = {
  id?: number;
  role: "user" | "assistant";
  content: string;
};

type Conversation = {
  id: number;
  title: string;
};

export default function Home() {
  // ========================================
  // Chat State
  // ========================================

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // ========================================
  // Conversation State
  // ========================================

  const [conversations, setConversations] = useState<
    Conversation[]
  >([]);

  const [currentConversationId, setCurrentConversationId] =
    useState<number | null>(null);

  // ========================================
  // PDF State
  // ========================================

  const [pdfFile, setPdfFile] = useState<File | null>(
    null
  );

  const [pdfUploaded, setPdfUploaded] = useState(false);

  const [pdfUploading, setPdfUploading] = useState(false);

  const [pdfQuestion, setPdfQuestion] = useState("");

  const [pdfAnswer, setPdfAnswer] = useState("");

  const [pdfAsking, setPdfAsking] = useState(false);

  // Unique ID of currently uploaded PDF
  const [documentId, setDocumentId] = useState("");

  // ========================================
  // Get Token
  // ========================================

  function getToken() {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem("access_token");
  }

  // ========================================
  // Load Conversations
  // ========================================

  async function loadConversations() {
    const token = getToken();

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/conversations/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("access_token");
          window.location.href = "/login";
        }

        return;
      }

      const data = await response.json();

      setConversations(data);
    } catch (error) {
      console.error(
        "Failed to load conversations:",
        error
      );
    }
  }

  // ========================================
  // Load Messages
  // ========================================

  async function loadMessages(
    conversationId: number
  ) {
    const token = getToken();

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/conversations/${conversationId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("access_token");
          window.location.href = "/login";
        }

        return;
      }

      const data = await response.json();

      setMessages(data);

      setCurrentConversationId(
        conversationId
      );
    } catch (error) {
      console.error(
        "Failed to load messages:",
        error
      );
    }
  }

  // ========================================
  // Initial Load
  // ========================================

  useEffect(() => {
    const token = getToken();

    if (!token) {
      window.location.href = "/login";
      return;
    }

    loadConversations();
  }, []);

  // ========================================
  // Send Normal Chat Message
  // ========================================

  async function sendMessage() {
    if (!input.trim() || loading) {
      return;
    }

    const token = getToken();

    if (!token) {
      alert("Please login first.");
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: input.trim(),
    };

    const currentInput = input.trim();

    // Show user message immediately
    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/chat`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            message: currentInput,
            history: messages,
            conversation_id:
              currentConversationId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Failed to send message"
        );
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: data.answer,
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);

      // Save conversation ID
      if (data.conversation_id) {
        setCurrentConversationId(
          data.conversation_id
        );
      }

      // Refresh conversation sidebar
      await loadConversations();

    } catch (error) {
      console.error(
        "Chat error:",
        error
      );

      const errorMessage: Message = {
        role: "assistant",
        content:
          "Sorry, something went wrong. Please try again.",
      };

      setMessages((prev) => [
        ...prev,
        errorMessage,
      ]);
    } finally {
      setLoading(false);
    }
  }

  // ========================================
  // Enter Key
  // ========================================

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      sendMessage();
    }
  }

  // ========================================
  // New Chat
  // ========================================

  function clearChat() {
    setMessages([]);

    setInput("");

    setCurrentConversationId(null);

    setPdfQuestion("");

    setPdfAnswer("");

    setPdfFile(null);

    setPdfUploaded(false);

    setPdfUploading(false);

    setPdfAsking(false);

    setDocumentId("");
  }

  // ========================================
  // Logout
  // ========================================

  function logout() {
    localStorage.removeItem("access_token");

    window.location.href = "/login";
  }

  // ========================================
  // PDF File Select
  // ========================================

  function handlePdfChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");

      return;
    }

    setPdfFile(file);

    setPdfUploaded(false);

    setPdfAnswer("");

    setDocumentId("");
  }

  // ========================================
  // Upload PDF
  // ========================================

  async function uploadPDF() {
    if (!pdfFile || pdfUploading) {
      return;
    }

    const token = getToken();

    if (!token) {
      alert("Please login first.");
      return;
    }

    setPdfUploading(true);

    setPdfAnswer("");

    try {
      const formData = new FormData();

      formData.append(
        "file",
        pdfFile
      );

      const response = await fetch(
        `${API_URL}/pdf/upload`,
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "PDF upload failed"
        );
      }

      // Save unique PDF ID
      setDocumentId(
        data.document_id
      );

      setPdfUploaded(true);

      setPdfAnswer(
        `PDF uploaded successfully. ${data.total_chunks} chunks created.`
      );

    } catch (error) {
      console.error(
        "PDF upload error:",
        error
      );

      setPdfUploaded(false);

      setPdfAnswer(
        "PDF upload failed. Please try again."
      );
    } finally {
      setPdfUploading(false);
    }
  }

  // ========================================
  // Ask Question From PDF
  // ========================================

  async function askPDF() {
    if (!pdfQuestion.trim() || pdfAsking) {
      return;
    }

    const token = getToken();

    if (!token) {
      alert("Please login first.");
      return;
    }

    // Make sure PDF is uploaded
    if (!documentId) {
      alert("Please upload a PDF first.");
      return;
    }

    setPdfAsking(true);

    setPdfAnswer("");

    try {
      const response = await fetch(
        `${API_URL}/pdf/ask`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            query: pdfQuestion.trim(),

            // Previous chat context
            history: messages,

            // Selected PDF
            document_id: documentId,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Failed to get PDF answer"
        );
      }

      setPdfAnswer(
        data.answer
      );

    } catch (error) {
      console.error(
        "PDF question error:",
        error
      );

      setPdfAnswer(
        "Sorry, I could not answer your question from the PDF. Please make sure the PDF is uploaded and try again."
      );
    } finally {
      setPdfAsking(false);
    }
  }

  // ========================================
  // JSX
  // ========================================

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* ================================== */}
      {/* Header */}
      {/* ================================== */}

      <header className="border-b border-slate-800 bg-slate-900">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div>
            <h1 className="text-xl font-bold">
              AI Study Assistant
            </h1>

            <p className="text-sm text-slate-400">
              Learn smarter with AI
            </p>
          </div>

          <div className="flex gap-3">

            <button
              onClick={clearChat}
              className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium hover:bg-slate-700"
            >
              New Chat
            </button>

            <button
              onClick={logout}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500"
            >
              Logout
            </button>

          </div>

        </div>

      </header>

      {/* ================================== */}
      {/* Main Layout */}
      {/* ================================== */}

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 lg:grid-cols-[260px_1fr_320px]">

        {/* ================================= */}
        {/* Conversation Sidebar */}
        {/* ================================= */}

        <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-4">

          <h2 className="mb-4 text-sm font-semibold text-slate-300">
            Conversations
          </h2>

          <div className="space-y-2">

            {conversations.length === 0 ? (
              <p className="text-sm text-slate-500">
                No conversations yet.
              </p>
            ) : (
              conversations.map(
                (conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() =>
                      loadMessages(
                        conversation.id
                      )
                    }
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                      currentConversationId ===
                      conversation.id
                        ? "bg-blue-600"
                        : "bg-slate-800 hover:bg-slate-700"
                    }`}
                  >
                    {conversation.title}
                  </button>
                )
              )
            )}

          </div>

        </aside>

        {/* ================================= */}
        {/* Chat Area */}
        {/* ================================= */}

        <section className="flex min-h-[700px] flex-col rounded-2xl border border-slate-800 bg-slate-900">

          {/* Chat Header */}

          <div className="border-b border-slate-800 p-5">

            <h2 className="text-lg font-semibold">
              Chat
            </h2>

            <p className="text-sm text-slate-400">
              Ask questions about Python,
              JavaScript, MERN, ML, Data Science
              or AI.
            </p>

          </div>

          {/* Messages */}

          <div className="flex-1 space-y-4 overflow-y-auto p-5">

            {messages.length === 0 ? (

              <div className="flex h-full items-center justify-center">

                <div className="max-w-md text-center">

                  <h3 className="mb-2 text-2xl font-bold">
                    Welcome 👋
                  </h3>

                  <p className="text-slate-400">
                    Ask me anything about your
                    studies and I will help you
                    understand it step by step.
                  </p>

                </div>

              </div>

            ) : (

              messages.map(
                (message, index) => (

                  <div
                    key={
                      message.id ??
                      index
                    }
                    className={`flex ${
                      message.role ===
                      "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >

                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role ===
                        "user"
                          ? "bg-blue-600"
                          : "bg-slate-800"
                      }`}
                    >

                      <p className="whitespace-pre-wrap text-sm leading-6">
                        {message.content}
                      </p>

                    </div>

                  </div>

                )
              )

            )}

            {loading && (

              <div className="flex justify-start">

                <div className="rounded-2xl bg-slate-800 px-4 py-3">

                  <p className="text-sm text-slate-400">
                    AI is thinking...
                  </p>

                </div>

              </div>

            )}

          </div>

          {/* Chat Input */}

          <div className="border-t border-slate-800 p-4">

            <div className="flex gap-3">

              <textarea
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask something..."
                rows={2}
                className="flex-1 resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500"
              />

              <button
                onClick={sendMessage}
                disabled={
                  loading ||
                  !input.trim()
                }
                className="rounded-xl bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Send
              </button>

            </div>

          </div>

        </section>

        {/* ================================= */}
        {/* PDF Panel */}
        {/* ================================= */}

        <aside className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <h2 className="mb-2 text-lg font-semibold">
            📄 PDF Study
          </h2>

          <p className="mb-5 text-sm text-slate-400">
            Upload a PDF and ask questions
            about its content.
          </p>

          {/* PDF Upload */}

          <div className="space-y-4">

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handlePdfChange}
              className="block w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-blue-500"
            />

            {pdfFile && (

              <p className="break-all text-xs text-slate-400">
                Selected: {pdfFile.name}
              </p>

            )}

            <button
              onClick={uploadPDF}
              disabled={
                !pdfFile ||
                pdfUploading
              }
              className="w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-medium hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pdfUploading
                ? "Uploading..."
                : "Upload PDF"}
            </button>

            {pdfUploaded && (

              <div className="rounded-lg border border-emerald-700 bg-emerald-950 p-3">

                <p className="text-sm text-emerald-400">
                  ✓ PDF uploaded successfully
                </p>

              </div>

            )}

          </div>

          {/* Divider */}

          <div className="my-6 border-t border-slate-800" />

          {/* PDF Question */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-300">
              Ask about your PDF
            </label>

            <textarea
              value={pdfQuestion}
              onChange={(e) =>
                setPdfQuestion(
                  e.target.value
                )
              }
              placeholder="e.g. What is this PDF about?"
              rows={4}
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm outline-none placeholder:text-slate-500 focus:border-blue-500"
            />

            <button
              onClick={askPDF}
              disabled={
                pdfAsking ||
                !pdfQuestion.trim() ||
                !documentId
              }
              className="mt-3 w-full rounded-xl bg-purple-600 px-4 py-3 text-sm font-medium hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pdfAsking
                ? "Thinking..."
                : "Ask PDF"}
            </button>

          </div>

          {/* PDF Answer */}

          {pdfAnswer && (

            <div className="mt-5">

              <h3 className="mb-2 text-sm font-semibold text-slate-300">
                Answer
              </h3>

              <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">

                <p className="whitespace-pre-wrap text-sm leading-6 text-slate-200">
                  {pdfAnswer}
                </p>

              </div>

            </div>

          )}

        </aside>

      </div>

    </main>
  );
}