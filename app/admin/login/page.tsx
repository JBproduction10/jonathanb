"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-950 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl card-border bg-base-900 p-8 space-y-5"
      >
        <div className="flex items-center gap-2 text-white">
          <Lock size={18} className="text-accent" />
          <h1 className="font-bold text-lg">Admin sign in</h1>
        </div>

        <div>
          <label className="text-sm font-medium text-white">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl card-border bg-base-800 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-white">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl card-border bg-base-800 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-accent"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-accent hover:bg-accent-soft disabled:opacity-60 transition-colors text-white font-medium px-6 py-3 text-sm"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
