
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Login failed"
        );
      }

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      router.push("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b1020] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            StudyAI
          </h1>

          <p className="text-gray-400 mt-2">
            AI Study Assistant
          </p>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8 shadow-xl">

          <h2 className="text-2xl font-semibold text-white mb-2">
            Welcome back
          </h2>

          <p className="text-gray-400 mb-6">
            Login to continue learning with StudyAI.
          </p>

          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                required
                className="w-full rounded-lg bg-[#0b1020] border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                required
                className="w-full rounded-lg bg-[#0b1020] border border-gray-700 px-4 py-3 text-white outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-3 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-blue-400 hover:text-blue-300"
            >
              Create account
            </a>
          </p>

        </div>
      </div>
    </main>
  );
}
