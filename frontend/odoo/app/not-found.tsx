import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6 text-center">
      <span
        aria-hidden
        className="pointer-events-none absolute select-none text-[38vw] font-black leading-none tracking-tighter text-zinc-100 sm:text-[26rem]"
      >
        404
      </span>

      <div className="relative z-10 flex flex-col items-center">
        <p className="mb-3 rounded-full border border-zinc-200 px-3 py-1 font-mono text-xs uppercase tracking-widest text-zinc-500">
          Error 404
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
          This page doesn&apos;t exist
        </h1>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-600 sm:text-base">
          There&apos;s no page at this address. Double-check the URL for
          typos, or head back to a page that does exist.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            Go to home
          </Link>

          <Link
            href="/dashboard"
            className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            Open dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}