"use client";

export default function PricingPage() {
  async function checkout(priceId: string) {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <div className="container py-16">
      <h1 className="text-center text-4xl font-semibold">Pricing</h1>
      <p className="mt-2 text-center text-slate-300">Choose a plan that scales with you.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          { name: "Starter", price: "$0", features: ["3 uploads/mo", "Basic summaries"], priceId: "price_starter" },
          { name: "Pro", price: "$19", features: ["Unlimited uploads", "Action items", "Priority queue"], priceId: "price_pro" },
          { name: "Team", price: "$49", features: ["Seats & roles", "Team analytics", "SLA support"], priceId: "price_team" },
        ].map((t) => (
          <div key={t.name} className="glass-card p-6">
            <h3 className="text-xl font-medium">{t.name}</h3>
            <p className="mt-2 text-3xl font-semibold">{t.price}<span className="text-base font-normal text-slate-400">/mo</span></p>
            <ul className="mt-4 space-y-2 text-slate-200">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => checkout(t.priceId)} className="mt-6 w-full rounded-xl border border-white/10 bg-white/10 px-4 py-2 backdrop-blur hover:bg-white/20">Get started</button>
          </div>
        ))}
      </div>
    </div>
  );
}