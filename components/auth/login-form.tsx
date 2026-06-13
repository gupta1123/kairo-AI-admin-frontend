"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LogIn } from "lucide-react";

export function LoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json().catch(() => null);

    setSubmitting(false);

    if (!response.ok) {
      setError(data?.error || "Invalid admin credentials.");
      return;
    }

    router.replace(nextPath);
    router.refresh();
  }

  return (
    <form
      className="w-full max-w-sm rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-700 text-sm font-black text-white">
          KA
        </span>
        <div>
          <h1 className="text-lg font-black text-stone-950">Kairo AI Admin</h1>
          <p className="text-sm font-medium text-stone-500">Sign in to continue.</p>
        </div>
      </div>

      <label className="mt-6 block text-sm font-extrabold text-stone-700">
        Email
        <input
          autoComplete="email"
          className="mt-2 h-11 w-full rounded-md border border-stone-200 bg-stone-50 px-3 text-sm font-semibold text-stone-950 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          required
          type="email"
          value={email}
        />
      </label>

      <label className="mt-4 block text-sm font-extrabold text-stone-700">
        Password
        <input
          autoComplete="current-password"
          className="mt-2 h-11 w-full rounded-md border border-stone-200 bg-stone-50 px-3 text-sm font-semibold text-stone-950 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-2 focus:ring-teal-100"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          required
          type="password"
          value={password}
        />
      </label>

      {error ? (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
          {error}
        </div>
      ) : null}

      <button
        className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-md bg-teal-700 px-4 text-sm font-black text-white transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-stone-300"
        disabled={submitting}
        type="submit"
      >
        <LogIn className="h-4 w-4" />
        {submitting ? "Signing in" : "Sign in"}
      </button>
    </form>
  );
}
