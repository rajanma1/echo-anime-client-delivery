"use client";

import { ArrowUpRight, Clock3, Globe2 } from "lucide-react";
import { Resource } from "@/lib/skillsData";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ResourceTable({
  resources,
  onSelect,
  activeResourceId,
}: {
  resources: Resource[];
  onSelect: (resource: Resource) => void;
  activeResourceId?: string;
}) {
  return (
    <Table className="min-w-[980px]">
      <TableHeader>
        <TableRow className="border-white/10 hover:bg-transparent">
          <TableHead>Resource</TableHead>
          <TableHead>Website</TableHead>
          <TableHead>Coverage Depth</TableHead>
          <TableHead>Format</TableHead>
          <TableHead>Time to Proficiency</TableHead>
          <TableHead>Strengths</TableHead>
          <TableHead>Weaknesses</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resources.map((resource) => (
          <TableRow key={resource.id} className={activeResourceId === resource.id ? "bg-primary/10" : ""}>
            <TableCell>
              <button type="button" onClick={() => onSelect(resource)} className="space-y-1 text-left">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  {resource.name}
                  <ArrowUpRight className="size-3.5 text-primary" />
                </div>
                <div className="text-xs text-slate-400">{resource.category}</div>
              </button>
            </TableCell>
            <TableCell>
              <a
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-200 hover:border-primary/30 hover:text-white"
              >
                <Globe2 className="size-3.5 text-primary" />
                {getHostname(resource.url)}
              </a>
            </TableCell>
            <TableCell>
              <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary">
                {resource.depthLabel}
              </Badge>
            </TableCell>
            <TableCell className="max-w-44 text-slate-300">{resource.format}</TableCell>
            <TableCell>
              <div className="inline-flex items-center gap-2 text-slate-300">
                <Clock3 className="size-4 text-primary" />
                {resource.timeToProficiency}
              </div>
            </TableCell>
            <TableCell className="max-w-56 text-slate-300">{resource.strengths.join(", ")}</TableCell>
            <TableCell className="max-w-56 text-slate-400">{resource.weaknesses.join(", ")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
