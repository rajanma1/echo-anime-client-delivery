"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Resource } from "@/lib/skillsData";

export function CoverageChart({ resource }: { resource: Resource }) {
  const data = [
    { dimension: "Coverage", value: resource.coverage },
    { dimension: "Practice", value: resource.practice },
    { dimension: "Structure", value: resource.structure },
    { dimension: "Community", value: resource.community },
    { dimension: "Beginner Fit", value: resource.beginnerFit },
  ];

  return (
    <div className="h-[320px] rounded-[1.75rem] border border-white/10 bg-slate-950/55 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(148,163,184,0.16)" />
          <PolarAngleAxis dataKey="dimension" tick={{ fill: "#8aa2b0", fontSize: 12 }} />
          <PolarRadiusAxis angle={90} tick={false} axisLine={false} domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              borderRadius: 16,
              border: "1px solid rgba(148,163,184,0.14)",
              background: "rgba(7,20,27,0.96)",
              color: "#e8f1f5",
            }}
          />
          <Radar dataKey="value" stroke="#2dd4bf" fill="#2dd4bf" fillOpacity={0.3} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
