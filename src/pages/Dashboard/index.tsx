import React from "react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Welcome back! Here's an overview of your lead management system.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Total Leads</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Qualified Leads</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Converted</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">Lost Leads</p>
          <h2 className="mt-2 text-3xl font-bold">0</h2>
        </div>
      </div>

      {/* Recent Leads */}
      <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">Recent Leads</h2>

        <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border">
          <p className="text-muted-foreground">No recent leads found.</p>
        </div>
      </div>
    </div>
  );
}
