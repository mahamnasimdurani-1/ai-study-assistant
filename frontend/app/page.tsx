// // "use client";

// // import { useState } from "react";

// // type Message = {
// //   role: "user" | "assistant";
// //   content: string;
// // };

// // export default function Home() {
// //   const [message, setMessage] = useState("");
// //   const [messages, setMessages] = useState<Message[]>([]);
// //   const [loading, setLoading] = useState(false);

// //   async function sendMessage() {
// //     if (!message.trim() || loading) return;

// //     const userMessage = message.trim();

// //     // Current conversation history before adding the new message
// //     const currentHistory = messages;

// //     // Show user's message immediately
// //     setMessages((prev) => [
// //       ...prev,
// //       {
// //         role: "user",
// //         content: userMessage,
// //       },
// //     ]);

// //     setMessage("");
// //     setLoading(true);

// //     try {
// //       const response = await fetch("http://127.0.0.1:8000/chat", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({
// //           message: userMessage,
// //           history: currentHistory,
// //         }),
// //       });

// //       if (!response.ok) {
// //         throw new Error("Failed to get response from server");
// //       }

// //       const data = await response.json();

// //       // Add AI response
// //       setMessages((prev) => [
// //         ...prev,
// //         {
// //           role: "assistant",
// //           content: data.answer,
// //         },
// //       ]);
// //     } catch (error) {
// //       console.error(error);

// //       setMessages((prev) => [
// //         ...prev,
// //         {
// //           role: "assistant",
// //           content:
// //             "Sorry, something went wrong. Please check that the backend is running.",
// //         },
// //       ]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   function clearChat() {
// //     setMessages([]);
// //     setMessage("");
// //   }

// //   return (
// //     <main className="min-h-screen bg-[#08090d] text-white">
// //       <div className="flex min-h-screen">

// //         {/* Sidebar */}
// //         <aside className="hidden w-64 border-r border-white/10 bg-[#0d0f14] p-4 md:flex md:flex-col">

// //           {/* Logo */}
// //           <div className="mb-8 flex items-center gap-3">
// //             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-xl">
// //               🤖
// //             </div>

// //             <div>
// //               <h1 className="font-bold">StudyAI</h1>

// //               <p className="text-xs text-gray-500">
// //                 AI Study Assistant
// //               </p>
// //             </div>
// //           </div>

// //           {/* New Chat */}
// //           <button
// //             onClick={clearChat}
// //             className="mb-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:bg-white/10"
// //           >
// //             <span>＋</span>
// //             New Chat
// //           </button>

// //           {/* Subjects */}
// //           <div className="space-y-2">
// //             <p className="mb-3 px-2 text-xs uppercase tracking-wider text-gray-500">
// //               Study
// //             </p>

// //             <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
// //               🐍 Python
// //             </button>

// //             <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
// //               ⚡ JavaScript
// //             </button>

// //             <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
// //               🌐 MERN
// //             </button>

// //             <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
// //               🧠 Machine Learning
// //             </button>

// //             <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
// //               📊 Data Science
// //             </button>

// //             <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
// //               ✨ Artificial Intelligence
// //             </button>
// //           </div>

// //           {/* Bottom */}
// //           <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-4">
// //             <p className="text-sm font-medium">
// //               AI Study Assistant
// //             </p>

// //             <p className="mt-1 text-xs text-gray-500">
// //               Learn smarter with AI.
// //             </p>
// //           </div>
// //         </aside>

// //         {/* Main Chat */}
// //         <section className="flex min-h-screen flex-1 flex-col">

// //           {/* Header */}
// //           <header className="flex items-center justify-between border-b border-white/10 bg-[#0b0d12]/80 px-5 py-4 backdrop-blur">

// //             <div>
// //               <h2 className="font-semibold">
// //                 AI Study Assistant
// //               </h2>

// //               <div className="mt-1 flex items-center gap-2">
// //                 <span className="h-2 w-2 rounded-full bg-green-400"></span>

// //                 <span className="text-xs text-gray-500">
// //                   Online
// //                 </span>
// //               </div>
// //             </div>

// //             <button
// //               onClick={clearChat}
// //               className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:bg-white/5 hover:text-white"
// //             >
// //               Clear Chat
// //             </button>
// //           </header>

// //           {/* Chat Area */}
// //           <div className="flex-1 overflow-y-auto">

// //             {/* Welcome Screen */}
// //             {messages.length === 0 ? (
// //               <div className="flex min-h-[70vh] items-center justify-center px-5">

// //                 <div className="max-w-2xl text-center">

// //                   <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-4xl ring-1 ring-white/10">
// //                     🤖
// //                   </div>

// //                   <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
// //                     Learn anything.

// //                     <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
// //                       Ask your AI tutor.
// //                     </span>
// //                   </h1>

// //                   <p className="mx-auto mt-5 max-w-xl text-gray-500">
// //                     Your personal AI Study Assistant for Python,
// //                     JavaScript, MERN, Machine Learning, Data Science
// //                     and Artificial Intelligence.
// //                   </p>

// //                   {/* Suggestions */}
// //                   <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

// //                     <button
// //                       onClick={() =>
// //                         setMessage(
// //                           "Explain Python variables simply"
// //                         )
// //                       }
// //                       className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-purple-500/30 hover:bg-white/[0.06]"
// //                     >
// //                       <p className="text-sm font-medium">
// //                         🐍 Learn Python
// //                       </p>

// //                       <p className="mt-1 text-xs text-gray-500">
// //                         Explain Python variables simply
// //                       </p>
// //                     </button>

// //                     <button
// //                       onClick={() =>
// //                         setMessage(
// //                           "What is Machine Learning?"
// //                         )
// //                       }
// //                       className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-blue-500/30 hover:bg-white/[0.06]"
// //                     >
// //                       <p className="text-sm font-medium">
// //                         🧠 Learn ML
// //                       </p>

// //                       <p className="mt-1 text-xs text-gray-500">
// //                         What is Machine Learning?
// //                       </p>
// //                     </button>

// //                     <button
// //                       onClick={() =>
// //                         setMessage("Explain MERN stack")
// //                       }
// //                       className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-purple-500/30 hover:bg-white/[0.06]"
// //                     >
// //                       <p className="text-sm font-medium">
// //                         🌐 Learn MERN
// //                       </p>

// //                       <p className="mt-1 text-xs text-gray-500">
// //                         Explain MERN stack
// //                       </p>
// //                     </button>

// //                     <button
// //                       onClick={() =>
// //                         setMessage(
// //                           "What is Artificial Intelligence?"
// //                         )
// //                       }
// //                       className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-blue-500/30 hover:bg-white/[0.06]"
// //                     >
// //                       <p className="text-sm font-medium">
// //                         ✨ Learn AI
// //                       </p>

// //                       <p className="mt-1 text-xs text-gray-500">
// //                         What is Artificial Intelligence?
// //                       </p>
// //                     </button>

// //                   </div>
// //                 </div>
// //               </div>
// //             ) : (

// //               /* Messages */
// //               <div className="mx-auto max-w-4xl space-y-6 px-5 py-8">

// //                 {messages.map((msg, index) => (
// //                   <div
// //                     key={index}
// //                     className={`flex gap-3 ${
// //                       msg.role === "user"
// //                         ? "justify-end"
// //                         : "justify-start"
// //                     }`}
// //                   >

// //                     {/* AI Avatar */}
// //                     {msg.role === "assistant" && (
// //                       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
// //                         🤖
// //                       </div>
// //                     )}

// //                     {/* Message */}
// //                     <div
// //                       className={`max-w-[80%] rounded-2xl px-4 py-3 ${
// //                         msg.role === "user"
// //                           ? "bg-gradient-to-r from-purple-600 to-blue-600"
// //                           : "border border-white/10 bg-[#111318]"
// //                       }`}
// //                     >

// //                       <p className="mb-1 text-xs font-medium opacity-60">
// //                         {msg.role === "user"
// //                           ? "You"
// //                           : "StudyAI"}
// //                       </p>

// //                       <p className="whitespace-pre-wrap text-sm leading-7">
// //                         {msg.content}
// //                       </p>

// //                     </div>

// //                     {/* User Avatar */}
// //                     {msg.role === "user" && (
// //                       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
// //                         👤
// //                       </div>
// //                     )}

// //                   </div>
// //                 ))}

// //                 {/* Loading */}
// //                 {loading && (
// //                   <div className="flex gap-3">

// //                     <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
// //                       🤖
// //                     </div>

// //                     <div className="rounded-2xl border border-white/10 bg-[#111318] px-5 py-3">

// //                       <div className="flex gap-1">
// //                         <span className="animate-bounce">
// //                           ●
// //                         </span>

// //                         <span className="animate-bounce [animation-delay:150ms]">
// //                           ●
// //                         </span>

// //                         <span className="animate-bounce [animation-delay:300ms]">
// //                           ●
// //                         </span>
// //                       </div>

// //                     </div>

// //                   </div>
// //                 )}

// //               </div>
// //             )}

// //           </div>

// //           {/* Input */}
// //           <div className="border-t border-white/10 bg-[#08090d] p-4">

// //             <div className="mx-auto max-w-4xl">

// //               <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#111318] p-2 shadow-2xl">

// //                 <input
// //                   type="text"
// //                   value={message}
// //                   onChange={(e) =>
// //                     setMessage(e.target.value)
// //                   }
// //                   onKeyDown={(e) => {
// //                     if (e.key === "Enter") {
// //                       sendMessage();
// //                     }
// //                   }}
// //                   placeholder="Ask your AI tutor..."
// //                   disabled={loading}
// //                   className="flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600"
// //                 />

// //                 <button
// //                   onClick={sendMessage}
// //                   disabled={
// //                     loading || !message.trim()
// //                   }
// //                   className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
// //                 >
// //                   ↑
// //                 </button>

// //               </div>

// //               <p className="mt-2 text-center text-[11px] text-gray-600">
// //                 AI Study Assistant can make mistakes.
// //                 Always verify important information.
// //               </p>

// //             </div>

// //           </div>

// //         </section>
// //       </div>
// //     </main>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";

// type Message = {
//   id?: number;
//   role: "user" | "assistant";
//   content: string;
// };

// type Conversation = {
//   id: number;
//   title: string;
// };

// export default function Home() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [loading, setLoading] = useState(false);

//   const [conversations, setConversations] = useState<Conversation[]>([]);
//   const [conversationId, setConversationId] = useState<number | null>(null);
//   const [loadingHistory, setLoadingHistory] = useState(false);

//   const API_URL = "http://127.0.0.1:8000";

//   // Get JWT token
//   function getToken() {
//     return localStorage.getItem("access_token");
//   }

//   // Logout
//   function logout() {
//     localStorage.removeItem("access_token");
//     window.location.href = "/login";
//   }

//   // Load conversation history
//   async function loadConversations() {
//     const token = getToken();

//     if (!token) {
//       console.log("No access token found");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `${API_URL}/conversations/`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to load conversations");
//       }

//       const data = await response.json();

//       setConversations(data);
//     } catch (error) {
//       console.error("Conversation history error:", error);
//     }
//   }

//   // Load messages of selected conversation
//   async function loadConversation(id: number) {
//     const token = getToken();

//     if (!token) {
//       console.log("No access token found");
//       return;
//     }

//     setLoadingHistory(true);

//     try {
//       const response = await fetch(
//         `${API_URL}/conversations/${id}/messages`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to load conversation");
//       }

//       const data = await response.json();

//       setMessages(data);
//       setConversationId(id);
//       setMessage("");
//     } catch (error) {
//       console.error("Load conversation error:", error);
//     } finally {
//       setLoadingHistory(false);
//     }
//   }

//   // Load conversations when page opens
//   useEffect(() => {
//     loadConversations();
//   }, []);

//   // Send message
//   async function sendMessage() {
//     if (!message.trim() || loading) return;

//     const userMessage = message.trim();
//     const token = getToken();

//     if (!token) {
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content:
//             "Please login first. Your authentication token was not found.",
//         },
//       ]);

//       return;
//     }

//     // Current conversation history before adding new message
//     const currentHistory = messages;

//     // Show user message immediately
//     setMessages((prev) => [
//       ...prev,
//       {
//         role: "user",
//         content: userMessage,
//       },
//     ]);

//     setMessage("");
//     setLoading(true);

//     try {
//       const response = await fetch(
//         `${API_URL}/chat`,
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },

//           body: JSON.stringify({
//             message: userMessage,
//             history: currentHistory,
//             conversation_id: conversationId,
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to get response from server");
//       }

//       const data = await response.json();

//       // Save conversation ID
//       setConversationId(data.conversation_id);

//       // Add AI response
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: data.answer,
//         },
//       ]);

//       // Refresh sidebar
//       await loadConversations();
//     } catch (error) {
//       console.error(error);

//       setMessages((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content:
//             "Sorry, something went wrong. Please check that the backend is running and you are logged in.",
//         },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Start new chat
//   function clearChat() {
//     setMessages([]);
//     setMessage("");
//     setConversationId(null);
//   }

//   return (
//     <main className="min-h-screen bg-[#08090d] text-white">
//       <div className="flex min-h-screen">

//         {/* Sidebar */}
//         <aside className="hidden w-64 border-r border-white/10 bg-[#0d0f14] p-4 md:flex md:flex-col">

//           {/* Logo */}
//           <div className="mb-8 flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-xl">
//               🤖
//             </div>

//             <div>
//               <h1 className="font-bold">
//                 StudyAI
//               </h1>

//               <p className="text-xs text-gray-500">
//                 AI Study Assistant
//               </p>
//             </div>
//           </div>

//           {/* New Chat */}
//           <button
//             onClick={clearChat}
//             className="mb-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:bg-white/10"
//           >
//             <span>＋</span>
//             New Chat
//           </button>

//           {/* Conversation History */}
//           <div className="mb-6 flex-1 overflow-y-auto">
//             <p className="mb-3 px-2 text-xs uppercase tracking-wider text-gray-500">
//               Chat History
//             </p>

//             {conversations.length === 0 ? (
//               <p className="px-2 text-xs text-gray-600">
//                 No conversations yet
//               </p>
//             ) : (
//               <div className="space-y-1">
//                 {conversations.map((conversation) => (
//                   <button
//                     key={conversation.id}
//                     onClick={() =>
//                       loadConversation(conversation.id)
//                     }
//                     className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
//                       conversationId === conversation.id
//                         ? "bg-white/10 text-white"
//                         : "text-gray-400 hover:bg-white/5 hover:text-white"
//                     }`}
//                   >
//                     <div className="truncate">
//                       {conversation.title}
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Subjects */}
//           <div className="space-y-1 border-t border-white/10 pt-4">
//             <p className="mb-3 px-2 text-xs uppercase tracking-wider text-gray-500">
//               Study
//             </p>

//             <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
//               🐍 Python
//             </button>

//             <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
//               ⚡ JavaScript
//             </button>

//             <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
//               🌐 MERN
//             </button>

//             <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
//               🧠 Machine Learning
//             </button>

//             <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
//               📊 Data Science
//             </button>

//             <button className="w-full rounded-xl px-3 py-2 text-left text-sm text-gray-300 transition hover:bg-white/5">
//               ✨ Artificial Intelligence
//             </button>
//           </div>

//           {/* Bottom */}
//           <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
//             <p className="text-sm font-medium">
//               AI Study Assistant
//             </p>

//             <p className="mt-1 text-xs text-gray-500">
//               Learn smarter with AI.
//             </p>
//           </div>
//         </aside>

//         {/* Main Chat */}
//         <section className="flex min-h-screen flex-1 flex-col">

//           {/* Header */}
//           <header className="flex items-center justify-between border-b border-white/10 bg-[#0b0d12]/80 px-5 py-4 backdrop-blur">

//             <div>
//               <h2 className="font-semibold">
//                 AI Study Assistant
//               </h2>

//               <div className="mt-1 flex items-center gap-2">
//                 <span className="h-2 w-2 rounded-full bg-green-400"></span>

//                 <span className="text-xs text-gray-500">
//                   Online
//                 </span>
//               </div>
//             </div>

//             {/* Header Buttons */}
//             <div className="flex items-center gap-2">

//               <button
//                 onClick={clearChat}
//                 className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:bg-white/5 hover:text-white"
//               >
//                 Clear Chat
//               </button>

//               <button
//                 onClick={logout}
//                 className="rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
//               >
//                 Logout
//               </button>

//             </div>
//           </header>

//           {/* Chat Area */}
//           <div className="flex-1 overflow-y-auto">

//             {/* Loading History */}
//             {loadingHistory ? (
//               <div className="flex min-h-[70vh] items-center justify-center">
//                 <p className="text-sm text-gray-500">
//                   Loading conversation...
//                 </p>
//               </div>
//             ) : messages.length === 0 ? (

//               /* Welcome Screen */
//               <div className="flex min-h-[70vh] items-center justify-center px-5">

//                 <div className="max-w-2xl text-center">

//                   <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-4xl ring-1 ring-white/10">
//                     🤖
//                   </div>

//                   <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
//                     Learn anything.

//                     <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
//                       Ask your AI tutor.
//                     </span>
//                   </h1>

//                   <p className="mx-auto mt-5 max-w-xl text-gray-500">
//                     Your personal AI Study Assistant for Python,
//                     JavaScript, MERN, Machine Learning, Data Science
//                     and Artificial Intelligence.
//                   </p>

//                   {/* Suggestions */}
//                   <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

//                     <button
//                       onClick={() =>
//                         setMessage(
//                           "Explain Python variables simply"
//                         )
//                       }
//                       className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-purple-500/30 hover:bg-white/[0.06]"
//                     >
//                       <p className="text-sm font-medium">
//                         🐍 Learn Python
//                       </p>

//                       <p className="mt-1 text-xs text-gray-500">
//                         Explain Python variables simply
//                       </p>
//                     </button>

//                     <button
//                       onClick={() =>
//                         setMessage(
//                           "What is Machine Learning?"
//                         )
//                       }
//                       className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-blue-500/30 hover:bg-white/[0.06]"
//                     >
//                       <p className="text-sm font-medium">
//                         🧠 Learn ML
//                       </p>

//                       <p className="mt-1 text-xs text-gray-500">
//                         What is Machine Learning?
//                       </p>
//                     </button>

//                     <button
//                       onClick={() =>
//                         setMessage("Explain MERN stack")
//                       }
//                       className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-purple-500/30 hover:bg-white/[0.06]"
//                     >
//                       <p className="text-sm font-medium">
//                         🌐 Learn MERN
//                       </p>

//                       <p className="mt-1 text-xs text-gray-500">
//                         Explain MERN stack
//                       </p>
//                     </button>

//                     <button
//                       onClick={() =>
//                         setMessage(
//                           "What is Artificial Intelligence?"
//                         )
//                       }
//                       className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-blue-500/30 hover:bg-white/[0.06]"
//                     >
//                       <p className="text-sm font-medium">
//                         ✨ Learn AI
//                       </p>

//                       <p className="mt-1 text-xs text-gray-500">
//                         What is Artificial Intelligence?
//                       </p>
//                     </button>

//                   </div>
//                 </div>
//               </div>

//             ) : (

//               /* Messages */
//               <div className="mx-auto max-w-4xl space-y-6 px-5 py-8">

//                 {messages.map((msg, index) => (
//                   <div
//                     key={msg.id ?? index}
//                     className={`flex gap-3 ${
//                       msg.role === "user"
//                         ? "justify-end"
//                         : "justify-start"
//                     }`}
//                   >

//                     {/* AI Avatar */}
//                     {msg.role === "assistant" && (
//                       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
//                         🤖
//                       </div>
//                     )}

//                     {/* Message */}
//                     <div
//                       className={`max-w-[80%] rounded-2xl px-4 py-3 ${
//                         msg.role === "user"
//                           ? "bg-gradient-to-r from-purple-600 to-blue-600"
//                           : "border border-white/10 bg-[#111318]"
//                       }`}
//                     >

//                       <p className="mb-1 text-xs font-medium opacity-60">
//                         {msg.role === "user"
//                           ? "You"
//                           : "StudyAI"}
//                       </p>

//                       <p className="whitespace-pre-wrap text-sm leading-7">
//                         {msg.content}
//                       </p>

//                     </div>

//                     {/* User Avatar */}
//                     {msg.role === "user" && (
//                       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
//                         👤
//                       </div>
//                     )}

//                   </div>
//                 ))}

//                 {/* Loading */}
//                 {loading && (
//                   <div className="flex gap-3">

//                     <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
//                       🤖
//                     </div>

//                     <div className="rounded-2xl border border-white/10 bg-[#111318] px-5 py-3">

//                       <div className="flex gap-1">
//                         <span className="animate-bounce">
//                           ●
//                         </span>

//                         <span className="animate-bounce [animation-delay:150ms]">
//                           ●
//                         </span>

//                         <span className="animate-bounce [animation-delay:300ms]">
//                           ●
//                         </span>
//                       </div>

//                     </div>

//                   </div>
//                 )}

//               </div>
//             )}

//           </div>

//           {/* Input */}
//           <div className="border-t border-white/10 bg-[#08090d] p-4">

//             <div className="mx-auto max-w-4xl">

//               <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#111318] p-2 shadow-2xl">

//                 <input
//                   type="text"
//                   value={message}
//                   onChange={(e) =>
//                     setMessage(e.target.value)
//                   }
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") {
//                       sendMessage();
//                     }
//                   }}
//                   placeholder="Ask your AI tutor..."
//                   disabled={loading}
//                   className="flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-gray-600"
//                 />

//                 <button
//                   onClick={sendMessage}
//                   disabled={
//                     loading || !message.trim()
//                   }
//                   className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
//                 >
//                   ↑
//                 </button>

//               </div>

//               <p className="mt-2 text-center text-[11px] text-gray-600">
//                 AI Study Assistant can make mistakes.
//                 Always verify important information.
//               </p>

//             </div>

//           </div>

//         </section>
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";

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
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // PDF states
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUploading, setPdfUploading] = useState(false);
  const [pdfResult, setPdfResult] = useState("");

  const API_URL = "http://127.0.0.1:8000";

  // Get JWT token
  function getToken() {
    return localStorage.getItem("access_token");
  }

  // Logout
  function logout() {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  }

  // Load conversation history
  async function loadConversations() {
    const token = getToken();

    if (!token) {
      console.log("No access token found");
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
        throw new Error("Failed to load conversations");
      }

      const data = await response.json();

      setConversations(data);
    } catch (error) {
      console.error(
        "Conversation history error:",
        error
      );
    }
  }

  // Load messages of selected conversation
  async function loadConversation(id: number) {
    const token = getToken();

    if (!token) {
      console.log("No access token found");
      return;
    }

    setLoadingHistory(true);

    try {
      const response = await fetch(
        `${API_URL}/conversations/${id}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load conversation"
        );
      }

      const data = await response.json();

      setMessages(data);
      setConversationId(id);
      setMessage("");
      setPdfResult("");
    } catch (error) {
      console.error(
        "Load conversation error:",
        error
      );
    } finally {
      setLoadingHistory(false);
    }
  }

  // Load conversations when page opens
  useEffect(() => {
    loadConversations();
  }, []);

  // Upload PDF
  async function uploadPDF() {
    if (!pdfFile || pdfUploading) return;

    const token = getToken();

    if (!token) {
      alert("Please login first.");
      return;
    }

    setPdfUploading(true);
    setPdfResult("");

    const formData = new FormData();

    formData.append("file", pdfFile);

    try {
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

      setPdfResult(
        data.text_preview ||
          "PDF uploaded successfully."
      );
    } catch (error) {
      console.error(
        "PDF upload error:",
        error
      );

      setPdfResult(
        "PDF upload failed. Please try again."
      );
    } finally {
      setPdfUploading(false);
    }
  }

  // Send message
  async function sendMessage() {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();
    const token = getToken();

    if (!token) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Please login first. Your authentication token was not found.",
        },
      ]);

      return;
    }

    // Current conversation history
    const currentHistory = messages;

    // Show user message immediately
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
      const response = await fetch(
        `${API_URL}/chat`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            message: userMessage,
            history: currentHistory,
            conversation_id: conversationId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to get response from server"
        );
      }

      const data = await response.json();

      // Save conversation ID
      setConversationId(
        data.conversation_id
      );

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
        },
      ]);

      // Refresh sidebar
      await loadConversations();
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please check that the backend is running and you are logged in.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Start new chat
  function clearChat() {
    setMessages([]);
    setMessage("");
    setConversationId(null);
    setPdfResult("");
    setPdfFile(null);
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
              <h1 className="font-bold">
                StudyAI
              </h1>

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

          {/* Conversation History */}
          <div className="mb-6 flex-1 overflow-y-auto">

            <p className="mb-3 px-2 text-xs uppercase tracking-wider text-gray-500">
              Chat History
            </p>

            {conversations.length === 0 ? (

              <p className="px-2 text-xs text-gray-600">
                No conversations yet
              </p>

            ) : (

              <div className="space-y-1">

                {conversations.map(
                  (conversation) => (

                    <button
                      key={conversation.id}
                      onClick={() =>
                        loadConversation(
                          conversation.id
                        )
                      }
                      className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                        conversationId ===
                        conversation.id
                          ? "bg-white/10 text-white"
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >

                      <div className="truncate">
                        {conversation.title}
                      </div>

                    </button>

                  )
                )}

              </div>

            )}

          </div>

          {/* Subjects */}
          <div className="space-y-1 border-t border-white/10 pt-4">

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
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">

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

            {/* Header Buttons */}
            <div className="flex items-center gap-2">

              <button
                onClick={clearChat}
                className="rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                Clear Chat
              </button>

              <button
                onClick={logout}
                className="rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
              >
                Logout
              </button>

            </div>

          </header>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto">

            {/* Loading History */}
            {loadingHistory ? (

              <div className="flex min-h-[70vh] items-center justify-center">

                <p className="text-sm text-gray-500">
                  Loading conversation...
                </p>

              </div>

            ) : messages.length === 0 ? (

              /* Welcome Screen */
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

                    Your personal AI Study Assistant
                    for Python, JavaScript, MERN,
                    Machine Learning, Data Science
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
                        setMessage(
                          "Explain MERN stack"
                        )
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

                {messages.map(
                  (msg, index) => (

                    <div
                      key={
                        msg.id ?? index
                      }
                      className={`flex gap-3 ${
                        msg.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      {/* AI Avatar */}
                      {msg.role ===
                        "assistant" && (
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

                  )
                )}

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

          {/* Input Area */}
          <div className="border-t border-white/10 bg-[#08090d] p-4">

            <div className="mx-auto max-w-4xl">

              {/* PDF Upload */}
              <div className="mb-3 rounded-xl border border-white/10 bg-[#111318] p-3">

                <div className="flex flex-wrap items-center gap-3">

                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={(e) => {
                      const file =
                        e.target.files?.[0] ||
                        null;

                      setPdfFile(file);
                      setPdfResult("");
                    }}
                    className="max-w-full text-xs text-gray-400"
                  />

                  <button
                    onClick={uploadPDF}
                    disabled={
                      !pdfFile ||
                      pdfUploading
                    }
                    className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-xs font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {pdfUploading
                      ? "Uploading..."
                      : "Upload PDF"}
                  </button>

                </div>

                {/* Selected File */}
                {pdfFile && (

                  <p className="mt-2 text-xs text-gray-500">
                    Selected:{" "}
                    {pdfFile.name}
                  </p>

                )}

                {/* PDF Result */}
                {pdfResult && (

                  <div className="mt-3 max-h-40 overflow-y-auto rounded-lg border border-white/10 bg-black/20 p-3">

                    <p className="mb-2 text-xs font-medium text-purple-400">
                      Extracted PDF Text
                    </p>

                    <p className="whitespace-pre-wrap text-xs leading-6 text-gray-400">
                      {pdfResult}
                    </p>

                  </div>

                )}

              </div>

              {/* Chat Input */}
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#111318] p-2 shadow-2xl">

                <input
                  type="text"
                  value={message}
                  onChange={(e) =>
                    setMessage(
                      e.target.value
                    )
                  }
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter"
                    ) {
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
                    loading ||
                    !message.trim()
                  }
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ↑
                </button>

              </div>

              <p className="mt-2 text-center text-[11px] text-gray-600">
                AI Study Assistant can make
                mistakes. Always verify important
                information.
              </p>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
