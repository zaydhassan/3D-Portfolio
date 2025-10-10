"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [taskId, setTaskId] = useState<string>("");

  async function handleUpload() {
    if (!file) return;
    setStatus("Requesting upload URL...");

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
    const res = await fetch(`${baseUrl}/upload?content_type=${encodeURIComponent(file.type)}`);
    const data = await res.json();

    const formData = new FormData();
    Object.entries(data.presigned.fields).forEach(([k, v]) => formData.append(k, String(v)));
    formData.append("Content-Type", file.type);
    formData.append("file", file);

    setStatus("Uploading to S3...");
    await fetch(data.presigned.url, { method: "POST", body: formData });

    setStatus("Starting transcription...");
    const tRes = await fetch(`${baseUrl}/transcribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file_url: data.url }),
    });
    const tData = await tRes.json();
    setTaskId(tData.task_id);
    setStatus(`Transcription task started: ${tData.task_id}`);

    const wsBase = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000").replace(/^http/, "ws");
    const ws = new WebSocket(`${wsBase}/ws/status?task_id=${tData.task_id}`);
    ws.onmessage = (evt) => {
      try {
        const payload = JSON.parse(evt.data);
        setStatus(`${payload.state}${payload.result?.text ? `: ${payload.result.text.slice(0, 80)}...` : ""}`);
      } catch {
        // ignore parsing errors
      }
    };
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-semibold">Upload</h1>
      <p className="mt-2 text-slate-300">Upload MP3/MP4 to summarize.</p>
      <div className="mt-6 flex items-center gap-3">
        <input
          type="file"
          accept="audio/mpeg,video/mp4,audio/mp4,audio/wav,audio/x-m4a"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="rounded-lg border border-white/10 bg-white/5 p-2"
        />
        <button onClick={handleUpload} className="glass-card px-4 py-2">
          Start
        </button>
      </div>
      {status && <p className="mt-4 text-sm text-slate-400">{status}</p>}
    </div>
  );
}
