export default function MeetingDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-semibold">Meeting {params.id}</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="glass-card p-5">
          <h2 className="text-xl font-medium">Transcript</h2>
          <div className="mt-3 h-64 overflow-auto text-sm text-slate-300">...</div>
        </div>
        <div className="glass-card p-5">
          <h2 className="text-xl font-medium">Summary & Actions</h2>
          <div className="mt-3 space-y-2 text-sm text-slate-300">...</div>
        </div>
      </div>
    </div>
  );
}