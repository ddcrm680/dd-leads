export default function Header() {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-primary">Lead CRM</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Admin</span>

        <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
          A
        </div>
      </div>
    </header>
  );
}
