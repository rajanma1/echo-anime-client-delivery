"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Code2, LoaderCircle, SearchX, Sparkles, Zap } from "lucide-react";
import { jsPDF } from "jspdf";
import { HeroSearch } from "@/components/hero-search";
import { IdeaCard } from "@/components/idea-card";
import { IdeaForge } from "@/components/idea-forge";
import { InsightGrid } from "@/components/insight-grid";
import { MethodsResultsTable } from "@/components/methods-results-table";
import { MobileMenu } from "@/components/mobile-menu";
import { PaperCard } from "@/components/paper-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { TrendChart } from "@/components/trend-chart";
import { TrendDashboard } from "@/components/trend-dashboard";
import { TrendingCarousel } from "@/components/trending-carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  defaultPaperAnalysis,
  generateIdeasFromPaper,
  generateIdeasFromText,
  ideaForgeSeed,
  trendCategories,
  trendTopics,
} from "@/lib/mock-data";
import { Idea, PaperAnalysis, TrendTopic } from "@/lib/types";

const sections = [
  { href: "#home", label: "Home" },
  { href: "#analyzer", label: "Analyzer" },
  { href: "#trends", label: "Trends" },
  { href: "#forge", label: "Idea Forge" },
];

export function ResearchSparkApp() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? defaultPaperAnalysis.id;
  const initialKeyword = searchParams.get("trend") ?? "Agentic evaluation";

  const [query, setQuery] = React.useState(initialQuery);
  const [paper, setPaper] = React.useState<PaperAnalysis>(defaultPaperAnalysis);
  const [ideas, setIdeas] = React.useState<Idea[]>(generateIdeasFromPaper(defaultPaperAnalysis));
  const [forgeValue, setForgeValue] = React.useState(ideaForgeSeed);
  const [forgeIdeas, setForgeIdeas] = React.useState<Idea[]>(generateIdeasFromText(ideaForgeSeed));
  const [loading, setLoading] = React.useState(false);
  const [forgeLoading, setForgeLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedYear, setSelectedYear] = React.useState("2026");
  const [keyword, setKeyword] = React.useState(initialKeyword);

  const filteredTopics = React.useMemo(() => {
    return trendTopics.filter((topic) => {
      const categoryPass = selectedCategory === "All" || topic.category === selectedCategory;
      const yearPass = selectedYear === "All" || String(topic.year) === selectedYear;
      const keywordPass =
        keyword.trim().length === 0 ||
        topic.keyword.toLowerCase().includes(keyword.toLowerCase()) ||
        topic.signals.some((signal) => signal.toLowerCase().includes(keyword.toLowerCase()));

      return categoryPass && yearPass && keywordPass;
    });
  }, [keyword, selectedCategory, selectedYear]);

  const updateSearch = React.useCallback(
    (params: Record<string, string>) => {
      const next = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value) next.set(key, value);
      });
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const runAnalysis = React.useCallback(
    async (nextQuery?: string) => {
      const q = (nextQuery ?? query).trim();
      if (!q) {
        setError("Paste an arXiv ID, title, or abstract first.");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/arxiv?q=${encodeURIComponent(q)}`);
        const payload = (await response.json()) as { paper?: PaperAnalysis; error?: string };

        if (!response.ok || !payload.paper) {
          throw new Error(payload.error ?? "Unable to analyze this paper right now.");
        }

        setPaper(payload.paper);
        setIdeas(generateIdeasFromPaper(payload.paper));
        updateSearch({ q });
      } catch (cause) {
        const message = cause instanceof Error ? cause.message : "Something went wrong.";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [query, updateSearch],
  );

  React.useEffect(() => {
    if (initialQuery === defaultPaperAnalysis.id) {
      return;
    }

    void runAnalysis(initialQuery);
  }, [initialQuery, runAnalysis]);

  const handleTrendIdeas = React.useCallback(
    (topic: TrendTopic) => {
      const generated = generateIdeasFromText(
        `${topic.keyword}. ${topic.description}. Signals: ${topic.signals.join(", ")}`,
        topic.keyword,
      );
      setForgeValue(`${topic.keyword}\n${topic.description}\nSignals: ${topic.signals.join(", ")}`);
      setForgeIdeas(generated);
      updateSearch({ trend: topic.keyword });
      window.location.hash = "forge";
    },
    [updateSearch],
  );

  const exportIdeaText = React.useCallback((items: Idea[]) => {
    return items
      .map(
        (idea, index) =>
          `${index + 1}. ${idea.title} [${idea.type}]\n${idea.description}\nWhy it matters: ${idea.whyItMatters}\nChecklist: ${idea.validationChecklist.join("; ")}`,
      )
      .join("\n\n");
  }, []);

  const handleCopyIdeas = React.useCallback(async () => {
    await navigator.clipboard.writeText(exportIdeaText(forgeIdeas));
  }, [exportIdeaText, forgeIdeas]);

  const handleNotionExport = React.useCallback(async () => {
    const markdown = forgeIdeas
      .map(
        (idea) =>
          `## ${idea.title}\nType: ${idea.type}\n\n${idea.description}\n\nWhy it matters: ${idea.whyItMatters}\n\n- ${idea.validationChecklist.join("\n- ")}`,
      )
      .join("\n\n");
    await navigator.clipboard.writeText(markdown);
  }, [forgeIdeas]);

  const handlePdfExport = React.useCallback(() => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("AI Research Spark Idea Packet", 14, 18);
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(exportIdeaText(forgeIdeas), 180);
    doc.text(lines, 14, 30);
    doc.save("ai-research-spark-ideas.pdf");
  }, [exportIdeaText, forgeIdeas]);

  const runForge = React.useCallback(() => {
    setForgeLoading(true);
    const generated = generateIdeasFromText(forgeValue, paper.title);
    setTimeout(() => {
      setForgeIdeas(generated);
      setForgeLoading(false);
    }, 400);
  }, [forgeValue, paper.title]);

  const copyAnalysisLink = React.useCallback(async () => {
    await navigator.clipboard.writeText(window.location.href);
  }, []);

  return (
    <main className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-50 mb-8 rounded-full border border-white/10 bg-black/25 px-4 py-3 backdrop-blur-2xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-violet-500">
                <Zap className="size-5 text-slate-950" />
              </div>
              <div>
                <p className="font-display text-base font-semibold">AI Research Spark</p>
                <p className="text-xs text-muted-foreground">Paper analysis for researchers and AI founders</p>
              </div>
            </div>
            <nav className="hidden items-center gap-6 md:flex">
              {sections.map((section) => (
                <a key={section.href} href={section.href} className="text-sm text-muted-foreground hover:text-foreground">
                  {section.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <MobileMenu />
            </div>
          </div>
        </header>

        <section id="home" className="grid gap-10 pb-16 pt-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="space-y-8">
            <Badge className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-cyan-100">
              Trend intelligence for arXiv-native teams
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-3xl font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                Turn AI Papers into Ideas in Seconds
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Analyze fresh arXiv papers, map research momentum, and generate startup angles,
                experiments, grant hooks, and product bets from one elegant workspace.
              </p>
            </div>
            <HeroSearch value={query} onChange={setQuery} onSubmit={() => void runAnalysis()} loading={loading} />
            <div className="flex flex-wrap gap-3">
              {["2501.12345", "multimodal reasoning", "robot policy learning", "RAG benchmarks"].map((preset) => (
                <Button key={preset} variant="outline" size="sm" onClick={() => setQuery(preset)}>
                  {preset}
                </Button>
              ))}
            </div>
          </div>

          <Card className="border-white/10 bg-white/5 p-2 shadow-[0_30px_120px_-40px_rgba(6,182,212,0.85)] backdrop-blur-2xl">
            <CardContent className="grid gap-4 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Today&apos;s research workflow</span>
                <Badge variant="secondary">Fast path</Badge>
              </div>
              <div className="grid gap-4">
                {[
                  "Pull a paper by ID or keyword",
                  "Get insight cards and method/result breakdowns",
                  "Generate practical ideas with validation checklists",
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-black/20 p-4">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-400/30 font-display text-lg">
                      0{index + 1}
                    </div>
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-5 pb-16">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold">Trending AI Papers</h2>
              <p className="text-sm text-muted-foreground">A quick launchpad for your next deep dive.</p>
            </div>
          </div>
          <TrendingCarousel
            onSelect={(value) => {
              setQuery(value);
              void runAnalysis(value);
              window.location.hash = "analyzer";
            }}
          />
        </section>

        <section id="analyzer" className="pb-16">
          <Tabs defaultValue="analysis" className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-display text-3xl font-semibold">Paper Analyzer</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fetch metadata, summarize methods, and turn papers into decisions.
                </p>
              </div>
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="ideas">Ideas</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
            </div>

            {error ? (
              <Card className="border-red-500/20 bg-red-500/10">
                <CardContent className="flex items-center gap-3 p-4 text-sm text-red-100">
                  <SearchX className="size-4" />
                  {error}
                </CardContent>
              </Card>
            ) : null}

            {loading ? (
              <Card className="border-white/10 bg-white/5">
                <CardContent className="flex min-h-64 items-center justify-center gap-3 p-6 text-muted-foreground">
                  <LoaderCircle className="size-5 animate-spin" />
                  Analyzing paper and generating research signals...
                </CardContent>
              </Card>
            ) : (
              <>
                <PaperCard
                  paper={paper}
                  onGenerateIdeas={() => setIdeas(generateIdeasFromPaper(paper))}
                  onCopyLink={() => void copyAnalysisLink()}
                />
                <TabsContent value="analysis" className="space-y-6">
                  <InsightGrid paper={paper} />
                  <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
                    <MethodsResultsTable paper={paper} />
                    <TrendChart paper={paper} />
                  </div>
                </TabsContent>
                <TabsContent value="ideas" className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {ideas.map((idea) => (
                      <IdeaCard key={idea.title} idea={idea} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="notes" className="space-y-6">
                  <Card className="border-white/10 bg-white/5">
                    <CardHeader>
                      <CardTitle className="text-lg">Shareable Brief</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm text-muted-foreground">
                      <p>
                        This result is shareable via URL query state. Copy the current link to send the
                        same analysis context to a collaborator or founder teammate.
                      </p>
                      <p>
                        For production, persist analyses in a database and promote this screen to a
                        dedicated dynamic route.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            )}
          </Tabs>
        </section>

        <section id="trends" className="space-y-6 pb-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-display text-3xl font-semibold">Trend Explorer</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Spot hot pockets of activity across LLMs, robotics, multimodal, and evaluation.
              </p>
            </div>
            <div className="grid w-full gap-3 sm:grid-cols-3 md:max-w-2xl">
              <select
                value={selectedYear}
                onChange={(event) => setSelectedYear(event.target.value)}
                className="h-11 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm outline-none ring-0"
              >
                {["All", "2026", "2025", "2024"].map((value) => (
                  <option key={value} value={value}>
                    Year: {value}
                  </option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(event) => setSelectedCategory(event.target.value)}
                className="h-11 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm outline-none ring-0"
              >
                {trendCategories.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Keyword cloud search"
                className="h-11 rounded-2xl border border-white/10 bg-black/20 px-4 text-sm outline-none"
              />
            </div>
          </div>

          <Card className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="text-lg">Keyword Cloud</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              {filteredTopics.map((topic) => (
                <button
                  key={topic.keyword}
                  type="button"
                  onClick={() => setKeyword(topic.keyword)}
                  className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100 transition hover:scale-[1.03]"
                  style={{ fontSize: `${0.85 + topic.score / 170}rem` }}
                >
                  {topic.keyword}
                </button>
              ))}
            </CardContent>
          </Card>

          <TrendDashboard topics={filteredTopics} onGenerateIdeas={handleTrendIdeas} />
        </section>

        <section id="forge" className="space-y-6 pb-10">
          <IdeaForge
            value={forgeValue}
            onChange={setForgeValue}
            ideas={forgeIdeas}
            onGenerate={runForge}
            onCopy={() => void handleCopyIdeas()}
            onPdf={handlePdfExport}
            onNotion={() => void handleNotionExport()}
            loading={forgeLoading}
          />
          {forgeIdeas.length === 0 ? (
            <Card className="border-dashed border-white/10 bg-white/5">
              <CardContent className="flex min-h-44 flex-col items-center justify-center gap-3 p-6 text-center">
                <Sparkles className="size-6 text-cyan-300" />
                <p className="max-w-md text-sm text-muted-foreground">
                  Paste a research summary to generate commercial, academic, and open-source angles.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {forgeIdeas.map((idea) => (
                <IdeaCard key={idea.title} idea={idea} />
              ))}
            </div>
          )}
        </section>

        <footer className="mt-10 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-black/25 px-6 py-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>Built in vibe mode with Cursor. Share responsibly, cite rigorously.</p>
          <a
            href="https://github.com/yourname/ai-research-spark"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-foreground"
          >
            <Code2 className="size-4" />
            GitHub
          </a>
        </footer>
      </div>
    </main>
  );
}
