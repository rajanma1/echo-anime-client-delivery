"use client";

import { BarChart3, CheckCircle2, ClipboardList, ExternalLink } from "lucide-react";
import { LearningPath, Resource } from "@/lib/skillsData";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { RoadmapTimeline } from "@/components/roadmap-timeline";

export function PathCard({ path, resources }: { path: LearningPath; resources: Resource[] }) {
  const bundleResources = path.bundle
    .map((id) => resources.find((resource) => resource.id === id))
    .filter((resource): resource is Resource => Boolean(resource));

  return (
    <Collapsible defaultOpen={false}>
      <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/58 shadow-[0_24px_70px_-42px_rgba(0,0,0,0.76)]">
        <div className="h-px w-full bg-gradient-to-r from-primary/80 via-cyan-300/50 to-transparent" />
        <div className="p-5">
        <CollapsibleTrigger className="bg-transparent px-0 py-0 hover:bg-transparent">
          <div className="w-full">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Path Forge</div>
                <h3 className="font-display text-2xl text-white">{path.title}</h3>
                <p className="max-w-3xl text-sm leading-6 text-slate-300">{path.bundleSummary}</p>
              </div>
              <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/10 px-3 py-1 text-primary">
                {bundleResources.length} resource bundle
              </Badge>
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-5">
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                  <ClipboardList className="size-4 text-primary" />
                  Synergistic resource bundle
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {bundleResources.map((resource) => (
                    <a
                      key={resource.id}
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-[1rem] border border-white/8 bg-slate-950/50 p-3 transition hover:border-primary/25 hover:bg-slate-950/70"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-sm font-semibold text-slate-100">{resource.name}</div>
                        <ExternalLink className="size-3.5 text-primary transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                      <div className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-500">{resource.category}</div>
                    </a>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-400">{path.evidenceBasis}</p>
              </div>
              <RoadmapTimeline phases={path.roadmap} />
            </div>
            <div className="space-y-5">
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                  <CheckCircle2 className="size-4 text-primary" />
                  Expected outcomes
                </div>
                <p className="text-sm leading-6 text-slate-300">{path.expectedOutcome}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                  <BarChart3 className="size-4 text-primary" />
                  Progress metrics
                </div>
                <ul className="space-y-3 text-sm text-slate-300">
                  {path.metrics.map((metric) => (
                    <li key={metric} className="rounded-xl border border-white/8 bg-slate-950/45 px-3 py-2">
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </div>
      </div>
    </Collapsible>
  );
}
