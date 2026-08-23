import * as React from "react";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass-card ${className ?? ""}`}>{children}</div>;
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="border-b border-white/10 p-5">{children}</div>;
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="p-5">{children}</div>;
}
