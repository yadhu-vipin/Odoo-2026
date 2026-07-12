
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function PendingRolePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const checkAgain = async () => {
    setChecking(true);
    router.refresh();
    setTimeout(() => setChecking(false), 1200);
  };
  return (
<main className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
  <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-xl">
    <div className="relative mx-auto mb-6 flex h-16 w-16 items-center justify-center">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500/20" />
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-amber-500/40 bg-amber-50">
        <svg
          className="h-7 w-7 text-amber-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M6 2h12M6 22h12M7 2v4a5 5 0 0 0 10 0V2M7 22v-4a5 5 0 0 1 10 0v4" />
        </svg>
      </span>
    </div>

    <p className="mb-2 font-mono text-xs uppercase tracking-widest text-amber-500">
      Awaiting approval
    </p>

    <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
      Your account is almost ready
    </h1>

    <p className="mt-3 text-sm leading-relaxed text-zinc-600">
      You&apos;ve signed in successfully, but an administrator hasn&apos;t
      assigned you a role yet. You&apos;ll get access as soon as your role
      is approved — this usually doesn&apos;t take long.
    </p>

    <div className="mt-8 flex flex-col gap-3">
      <button
        onClick={checkAgain}
        disabled={checking}
        className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {checking ? "Checking…" : "Check again"}
      </button>

      <button
        onClick={() => router.push("/login")}
        className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
      >
        Sign out
      </button>
    </div>

    <p className="mt-6 text-xs text-zinc-500">
      Need it sooner? Contact your workspace administrator.
    </p>
  </div>
</main>
  );
}