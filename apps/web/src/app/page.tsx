export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-indigo-500/40 to-cyan-400/40 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-fuchsia-500/40 to-amber-400/40 blur-3xl" />
      </div>

      <section className="container flex flex-col items-center gap-8 py-28 text-center">
        <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-slate-200 shadow-sm">AI Meeting Summarizer & Action Tracker</span>
        <h1 className="max-w-4xl text-5xl font-semibold leading-tight md:text-6xl gradient-text">
          Turn hours of meetings into minutes of insight
        </h1>
        <p className="max-w-2xl text-balance text-slate-300">
          InsightFlow uses Whisper and GPT-4 to generate rich summaries, decisions, and action items automatically.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="/dashboard" className="glass-card soft-shadow px-6 py-3 text-slate-100 transition hover:scale-[1.02]">
            Open Dashboard
          </a>
          <a href="/pricing" className="rounded-xl border border-white/10 bg-white/10 px-6 py-3 text-slate-100/90 backdrop-blur hover:bg-white/20">
            View Pricing
          </a>
        </div>
      </section>
    </main>
  );
}
