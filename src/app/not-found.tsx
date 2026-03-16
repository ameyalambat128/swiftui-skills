import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404: Page Not Found",
  description: "The requested page could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-gray-500">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight gradient-text">
        Page not found
      </h1>
      <p className="mt-4 max-w-xl text-gray-400">
        The page you requested does not exist or may have moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md border border-neutral-800 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-neutral-700 hover:text-white"
      >
        Return home
      </Link>
    </main>
  );
}
