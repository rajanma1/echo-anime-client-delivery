"use client";

import { ResponsiveContainer, Tooltip, XAxis, Bar, BarChart, CartesianGrid, YAxis } from "recharts";
import { RoadmapPhase } from "@/lib/skillsData";

export function RoadmapTimeline({ phases }: { phases: RoadmapPhase[] }) {
  const chartData = phases.map((phase) => ({
    label: phase.label,
    duration: 30,
  }));

  return (
    <div className="space-y-5">
      <div className="h-56 rounded-[1.5rem] border border-white/8 bg-slate-950/60 p-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 8, right: 12, left: 12, bottom: 8 }}>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" horizontal={false} />
            <XAxis type="number" hide domain={[0, 30]} />
            <YAxis type="category" dataKey="label" width={64} stroke="#8aa2b0" tickLine={false} axisLine={false} />
            <Tooltip
              cursor={{ fill: "rgba(45,212,191,0.08)" }}
              contentStyle={{
                borderRadius: 16,
                border: "1px solid rgba(148,163,184,0.14)",
                background: "rgba(7,20,27,0.96)",
                color: "#e8f1f5",
              }}
            />
            <Bar dataKey="duration" radius={[12, 12, 12, 12]} fill="#2dd4bf" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-3">
        {phases.map((phase) => (
          <div key={phase.label} className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-semibold text-white">{phase.label}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-primary">{phase.days}</div>
            </div>
            <p className="mt-2 text-sm text-slate-300">{phase.focus}</p>
            <div className="mt-4 grid gap-3 text-sm text-slate-400 sm:grid-cols-3">
              <div>
                <div className="mb-1 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Project</div>
                {phase.project}
              </div>
              <div>
                <div className="mb-1 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Routine</div>
                {phase.routine}
              </div>
              <div>
                <div className="mb-1 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Checkpoint</div>
                {phase.checkpoint}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
