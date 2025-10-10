"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Mon", meetings: 2 },
  { date: "Tue", meetings: 4 },
  { date: "Wed", meetings: 3 },
  { date: "Thu", meetings: 6 },
  { date: "Fri", meetings: 5 },
];

export default function AnalyticsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-semibold">Analytics</h1>
      <p className="mt-2 text-slate-300">Track usage and team productivity.</p>
      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b" }} />
              <Line type="monotone" dataKey="meetings" stroke="#60a5fa" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
