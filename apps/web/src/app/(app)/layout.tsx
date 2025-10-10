import Link from "next/link";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-900/60 backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="font-semibold">InsightFlow</Link>
          <nav className="flex items-center gap-4 text-sm text-slate-300">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/upload">Upload</Link>
            <Link href="/analytics">Analytics</Link>
            <Link href="/settings">Settings</Link>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}
