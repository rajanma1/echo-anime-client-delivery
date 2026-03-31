"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import jsPDF from "jspdf";
import {
  BookOpen,
  ChartNoAxesCombined,
  Compass,
  ExternalLink,
  FileDown,
  Gauge,
  Globe2,
  Library,
  Link2,
  MoonStar,
  SearchCheck,
  SunMedium,
  Target,
} from "lucide-react";
import { ResponsiveContainer, ReferenceLine, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";
import {
  getResourcesForSkill,
  getSkillByName,
  getSkillBySlug,
  Resource,
  resources,
  skills,
  slugifySkillName,
  SkillProfile,
} from "@/lib/skillsData";
import { SkillInput } from "@/components/skill-input";
import { ResourceTable } from "@/components/resource-table";
import { ResearchPanel } from "@/components/research-panel";
import { PathCard } from "@/components/path-card";
import { CoverageChart } from "@/components/coverage-chart";
import { LibraryGrid } from "@/components/library-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

function exportSummary(skill: SkillProfile, relevantResources: Resource[]) {
  const doc = new jsPDF();
  let cursor = 18;

  const addLine = (text: string, size = 11, color: [number, number, number] = [26, 40, 48]) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, 175);
    doc.text(lines, 18, cursor);
    cursor += lines.length * (size * 0.48 + 1.5) + 4;
    if (cursor > 270) {
      doc.addPage();
      cursor = 18;
    }
  };

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("SkillForge.ai Summary", 18, cursor);
  cursor += 12;

  addLine(skill.name, 16, [8, 116, 110]);
  addLine(skill.overview);
  addLine(`Target outcome: ${skill.targetOutcome}`);
  addLine(`Top resource stack: ${relevantResources.slice(0, 5).map((resource) => resource.name).join(", ")}`);
  addLine("Research insights:", 13, [8, 116, 110]);
  skill.researchInsights.forEach((insight) => addLine(`${insight.principle}: ${insight.appliedToSkill}`));
  addLine("Recommended learning architectures:", 13, [8, 116, 110]);
  skill.paths.forEach((path) => {
    addLine(path.title, 12, [15, 23, 42]);
    addLine(`Bundle: ${path.bundle.map((id) => relevantResources.find((resource) => resource.id === id)?.name).filter(Boolean).join(", ")}`);
    addLine(`Expected outcome: ${path.expectedOutcome}`);
    addLine(`Metrics: ${path.metrics.join(" | ")}`);
  });

  doc.save(`${skill.slug}-skillforge-summary.pdf`);
}

function updateUrl(router: ReturnType<typeof useRouter>, pathname: string, slug: string) {
  const params = new URLSearchParams();
  params.set("skill", slug);
  router.replace(`${pathname}?${params.toString()}`, { scroll: false });
}

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function SkillForgeApp() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const initialSkill = React.useMemo(() => getSkillBySlug(searchParams.get("skill")) ?? skills[2], [searchParams]);
  const [selectedSkill, setSelectedSkill] = React.useState<SkillProfile>(initialSkill);
  const [inputValue, setInputValue] = React.useState(initialSkill.defaultPrompt);
  const [loading, setLoading] = React.useState(false);
  const [activeResource, setActiveResource] = React.useState<Resource | null>(null);
  const [resourceModal, setResourceModal] = React.useState<Resource | null>(null);
  const [shareCopied, setShareCopied] = React.useState(false);

  React.useEffect(() => {
    const nextSkill = getSkillBySlug(searchParams.get("skill"));
    if (!nextSkill) return;
    setSelectedSkill(nextSkill);
    setInputValue((current) => (current.trim() ? current : nextSkill.defaultPrompt));
  }, [searchParams]);

  const relevantResources = React.useMemo(() => getResourcesForSkill(selectedSkill), [selectedSkill]);

  React.useEffect(() => {
    setActiveResource(relevantResources[0] ?? null);
  }, [selectedSkill, relevantResources]);

  const analyzeSkill = React.useCallback(
    (skill: SkillProfile, promptOverride?: string) => {
      setLoading(true);
      setInputValue(promptOverride ?? skill.defaultPrompt);
      window.setTimeout(() => {
        setSelectedSkill(skill);
        updateUrl(router, pathname, skill.slug);
        setLoading(false);
      }, 900);
    },
    [pathname, router],
  );

  const handleSubmit = React.useCallback(() => {
    const match =
      getSkillByName(inputValue) ??
      skills.find((skill) => inputValue.toLowerCase().includes(skill.name.toLowerCase())) ??
      getSkillBySlug(slugifySkillName(inputValue)) ??
      selectedSkill;

    analyzeSkill(match, inputValue);
  }, [analyzeSkill, inputValue, selectedSkill]);

  const handleQuickSelect = React.useCallback(
    (value: string) => {
      const match = getSkillByName(value);
      if (match) analyzeSkill(match, match.defaultPrompt);
    },
    [analyzeSkill],
  );

  const handleLibrarySelect = React.useCallback(
    (skill: SkillProfile) => {
      analyzeSkill(skill, skill.defaultPrompt);
      document.getElementById("analysis")?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [analyzeSkill],
  );

  const handleShare = React.useCallback(async () => {
    const url = `${window.location.origin}${pathname}?skill=${selectedSkill.slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      window.setTimeout(() => setShareCopied(false), 1600);
    } catch {
      setShareCopied(false);
    }
  }, [pathname, selectedSkill.slug]);

  const handleSelectResource = React.useCallback((resource: Resource) => {
    setActiveResource(resource);
    setResourceModal(resource);
  }, []);

  return (
    <main className="min-h-screen pb-20 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav className="sticky top-4 z-40 mb-10 flex items-center justify-between rounded-full border border-white/10 bg-slate-950/72 px-4 py-3 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-primary/20 bg-primary/12 p-2.5 text-primary">
              <Gauge className="size-4" />
            </div>
            <div>
              <div className="font-display text-lg text-white">SkillForge.ai</div>
              <div className="text-xs tracking-[0.16em] text-slate-400 uppercase">Evidence-based learning architecture</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
            </Button>
            <Button variant="outline" className="border-white/10 bg-white/[0.03] text-slate-100 hover:bg-white/[0.06]" onClick={handleShare}>
              <Link2 className="size-4" />
              {shareCopied ? "Copied" : "Share"}
            </Button>
          </div>
        </nav>

        <section className="grid gap-8 pb-14 lg:grid-cols-[1.18fr_0.82fr]">
          <div className="space-y-6">
            <SkillInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={handleSubmit}
              selectedSkill={selectedSkill.name}
              onQuickSelect={handleQuickSelect}
              isLoading={loading}
            />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5">
                <div className="mb-3 inline-flex rounded-2xl bg-primary/10 p-2 text-primary">
                  <ChartNoAxesCombined className="size-4" />
                </div>
                <div className="text-sm font-semibold text-white">Data-first comparison</div>
                <p className="mt-2 text-sm leading-6 text-slate-400">Coverage, depth, practice intensity, and proficiency timelines in one view.</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5">
                <div className="mb-3 inline-flex rounded-2xl bg-primary/10 p-2 text-primary">
                  <Compass className="size-4" />
                </div>
                <div className="text-sm font-semibold text-white">Structured roadmaps</div>
                <p className="mt-2 text-sm leading-6 text-slate-400">Clear 30, 60, and 90-day learning architecture with practice routines and checkpoints.</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5">
                <div className="mb-3 inline-flex rounded-2xl bg-primary/10 p-2 text-primary">
                  <Globe2 className="size-4" />
                </div>
                <div className="text-sm font-semibold text-white">Direct website access</div>
                <p className="mt-2 text-sm leading-6 text-slate-400">Every recommended platform now includes a visible live website link.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="overflow-hidden border-white/10 bg-slate-950/60 shadow-[0_28px_80px_-42px_rgba(0,0,0,0.8)]">
              <div className="h-1 w-full bg-gradient-to-r from-primary via-cyan-300/60 to-transparent" />
              <CardHeader className="space-y-4">
                <div className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Current analysis</div>
                <CardTitle className="font-display text-3xl text-white">{selectedSkill.name}</CardTitle>
                <p className="text-sm leading-6 text-slate-300">{selectedSkill.overview}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                      <Target className="size-4 text-primary" />
                      Outcome target
                    </div>
                    <p className="text-sm leading-6 text-slate-300">{selectedSkill.targetOutcome}</p>
                  </div>
                  <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                      <SearchCheck className="size-4 text-primary" />
                      Best-fit question
                    </div>
                    <p className="text-sm leading-6 text-slate-300">{selectedSkill.keyQuestions[0]}</p>
                  </div>
                </div>
                <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
                  <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                    <BookOpen className="size-4 text-primary" />
                    Resource surface
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {relevantResources.slice(0, 6).map((resource) => (
                      <Badge key={resource.id} variant="outline" className="rounded-full border-white/10 bg-slate-950/45 text-slate-200">
                        {resource.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-slate-950/60">
              <CardHeader className="space-y-2">
                <div className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Free Websites</div>
                <CardTitle className="font-display text-2xl text-white">Direct links to recommended learning sites</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {relevantResources.slice(0, 8).map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4 transition hover:border-primary/25 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-semibold text-white">{resource.name}</div>
                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <span className="text-xs uppercase tracking-[0.16em] text-slate-500">{getHostname(resource.url)}</span>
                          <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-semibold tracking-[0.14em] text-primary uppercase">
                            Verified
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="size-4 shrink-0 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{resource.bestFor.slice(0, 2).join(" • ")}</p>
                  </a>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="analysis" className="space-y-8 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Resource Analysis Engine</div>
              <h2 className="mt-2 font-display text-3xl text-white">Curated free learning resource analysis</h2>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => exportSummary(selectedSkill, relevantResources)}>
              <FileDown className="size-4" />
              Export PDF-style summary
            </Button>
          </div>

          {loading ? (
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <Skeleton className="h-[420px]" />
              <Skeleton className="h-[420px]" />
              <Skeleton className="h-[320px] lg:col-span-2" />
            </div>
          ) : (
            <>
              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <Card className="border-white/10 bg-slate-950/60">
                  <CardHeader className="space-y-3">
                    <CardTitle className="font-display text-2xl text-white">Comparison table</CardTitle>
                    <p className="text-sm text-slate-300">
                      Compare depth, format, time-to-proficiency estimates, and practical tradeoffs across the best free-fit resources.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ResourceTable resources={relevantResources} activeResourceId={activeResource?.id} onSelect={handleSelectResource} />
                  </CardContent>
                </Card>
                <Card className="border-white/10 bg-slate-950/60">
                  <CardHeader className="space-y-3">
                    <CardTitle className="font-display text-2xl text-white">Resource detail</CardTitle>
                    <p className="text-sm text-slate-300">
                      Click any row in the table to inspect fit, strengths, weaknesses, and the live website.
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {activeResource ? (
                      <>
                        <CoverageChart resource={activeResource} />
                        <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-xl font-semibold text-white">{activeResource.name}</h3>
                              <p className="mt-1 text-sm text-slate-400">{activeResource.pricing}</p>
                              <p className="mt-2 text-xs uppercase tracking-[0.16em] text-slate-500">{getHostname(activeResource.url)}</p>
                            </div>
                            <a href={activeResource.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary hover:bg-primary/15">
                              <ExternalLink className="size-3.5" />
                              Visit source
                            </a>
                          </div>
                          <p className="mt-4 text-sm leading-6 text-slate-300">{activeResource.notes}</p>
                          <div className="mt-4 rounded-[1.25rem] border border-white/8 bg-slate-950/45 px-4 py-3 text-sm text-slate-300">
                            Website:{" "}
                            <a href={activeResource.url} target="_blank" rel="noreferrer" className="text-primary hover:text-primary/80">
                              {activeResource.url}
                            </a>
                          </div>
                          <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <div>
                              <div className="mb-2 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Strengths</div>
                              <ul className="space-y-2 text-sm text-slate-300">
                                {activeResource.strengths.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <div className="mb-2 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Weaknesses</div>
                              <ul className="space-y-2 text-sm text-slate-400">
                                {activeResource.weaknesses.map((item) => (
                                  <li key={item}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </CardContent>
                </Card>
              </div>
              <ResearchPanel insights={selectedSkill.researchInsights} targetOutcome={selectedSkill.targetOutcome} />
            </>
          )}
        </section>

        <section className="space-y-8 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Path Forge</div>
              <h2 className="mt-2 font-display text-3xl text-white">Structured learning architectures</h2>
            </div>
            <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300">
              {selectedSkill.paths.length} architectures generated
            </div>
          </div>

          {loading ? (
            <div className="grid gap-4">
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
              <Skeleton className="h-48" />
            </div>
          ) : (
            <div className="grid gap-4">
              {selectedSkill.paths.map((path) => (
                <PathCard key={path.id} path={path} resources={resources} />
              ))}
            </div>
          )}

          <Card className="border-white/10 bg-slate-950/55">
            <CardHeader className="space-y-3">
              <CardTitle className="font-display text-2xl text-white">Prioritization matrix</CardTitle>
              <p className="text-sm text-slate-300">Use the effort-to-impact map to choose the next practice block with the highest mastery return.</p>
            </CardHeader>
            <CardContent className="grid gap-6 lg:grid-cols-[1fr_0.72fr]">
              <div className="h-[340px] rounded-[1.5rem] border border-white/8 bg-slate-950/60 p-3">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                    <XAxis type="number" dataKey="effort" name="Effort" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: "#8aa2b0", fontSize: 12 }} />
                    <YAxis type="number" dataKey="impact" name="Impact" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: "#8aa2b0", fontSize: 12 }} />
                    <ReferenceLine x={50} stroke="rgba(148,163,184,0.18)" />
                    <ReferenceLine y={50} stroke="rgba(148,163,184,0.18)" />
                    <Tooltip
                      cursor={{ strokeDasharray: "3 3" }}
                      contentStyle={{
                        borderRadius: 16,
                        border: "1px solid rgba(148,163,184,0.14)",
                        background: "rgba(7,20,27,0.96)",
                        color: "#e8f1f5",
                      }}
                    />
                    <Scatter data={selectedSkill.prioritization} fill="#2dd4bf" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {selectedSkill.prioritization.map((item) => (
                  <div key={item.label} className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-semibold text-white">{item.label}</div>
                      <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/10 text-primary">
                        {item.impact >= 85 ? "High priority" : "Selective focus"}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{item.note}</p>
                    <div className="mt-4 flex gap-3 text-xs uppercase tracking-[0.16em] text-slate-500">
                      <span>Effort {item.effort}</span>
                      <span>Impact {item.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-8 py-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Explore Library</div>
              <h2 className="mt-2 font-display text-3xl text-white">Twelve high-demand skill tracks</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300">
              <Library className="size-4 text-primary" />
              12 skills, 18 free resources
            </div>
          </div>
          <LibraryGrid skills={skills} onSelect={handleLibrarySelect} />
        </section>
      </div>

      <Dialog open={Boolean(resourceModal)} onOpenChange={(open) => !open && setResourceModal(null)}>
        <DialogContent className="max-w-2xl border-white/10 bg-slate-950/95 text-slate-100">
          {resourceModal ? (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-white">{resourceModal.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-5">
                <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                  Website:{" "}
                  <a href={resourceModal.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary hover:text-primary/80">
                    {getHostname(resourceModal.url)}
                    <ExternalLink className="size-3.5" />
                  </a>
                </div>
                <p className="text-sm leading-6 text-slate-300">{resourceModal.notes}</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
                    <div className="mb-2 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Best for</div>
                    <div className="flex flex-wrap gap-2">
                      {resourceModal.bestFor.map((item) => (
                        <Badge key={item} variant="outline" className="rounded-full border-white/10 bg-slate-950/40 text-slate-200">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
                    <div className="mb-2 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Format</div>
                    <div className="text-sm text-slate-300">{resourceModal.format}</div>
                    <div className="mt-3 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Time estimate</div>
                    <div className="mt-1 text-sm text-slate-300">{resourceModal.timeToProficiency}</div>
                  </div>
                </div>
                <CoverageChart resource={resourceModal} />
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </main>
  );
}
