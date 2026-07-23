"use client";

import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="max-w-md text-center">
        <h1 className="text-8xl font-extrabold text-primary">404</h1>

        <h2 className="mt-4 text-3xl font-bold text-foreground">
          Page Not Found
        </h2>

        <p className="mt-3 text-muted-foreground">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <button
          onClick={() => setLocation("/")}
          className="mt-8 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
