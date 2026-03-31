import { defaultPaperAnalysis, generateIdeasFromPaper } from "@/lib/mock-data";
import { CitationPoint, MethodResultRow, PaperAnalysis } from "@/lib/types";

type PaperRecord = {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  published: string;
  url: string;
};

function decodeXml(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function extract(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? decodeXml(match[1].replace(/<[^>]+>/g, "").trim()) : "";
}

function extractAll(xml: string, tag: string) {
  return [...xml.matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "gi"))].map((match) =>
    decodeXml(match[1].replace(/<[^>]+>/g, "").trim()),
  );
}

function buildCitationTrend(seed: string): CitationPoint[] {
  const base = seed.length % 11;
  return ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, index) => ({
    month,
    citations: 10 + base + index * (base + 3),
  }));
}

function buildMethodRows(summary: string): MethodResultRow[] {
  const short = summary.split(".").filter(Boolean);
  return [
    {
      method: "Core approach",
      description: short[0] ?? "The paper proposes a new AI system design.",
      result: short[1] ?? "Reported gains against strong baselines.",
    },
    {
      method: "Evaluation setup",
      description: short[1] ?? "Benchmarks and ablations establish reliability.",
      result: short[2] ?? "Improves efficiency and downstream accuracy.",
    },
    {
      method: "Transfer potential",
      description: short[2] ?? "Signals adaptation across related problem settings.",
      result: "Promising for productization or follow-up experiments.",
    },
  ];
}

function sentenceChunks(text: string) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function extractQueryFromInput(value: string) {
  const urlMatch = value.match(/arxiv\.org\/(?:abs|pdf)\/([^/?#]+)/i);
  return urlMatch ? urlMatch[1].replace(/\.pdf$/i, "") : value;
}

export function parseArxivFeed(xml: string): PaperRecord | null {
  const entryMatch = xml.match(/<entry>([\s\S]*?)<\/entry>/i);
  if (!entryMatch) return null;

  const entry = entryMatch[1];
  const id = extract(entry, "id");
  const title = extract(entry, "title");
  const summary = extract(entry, "summary");
  const authors = extractAll(entry, "name");
  const published = extract(entry, "published");
  const url = id || "https://arxiv.org";

  if (!title || !summary) return null;

  return {
    id: id.split("/").pop() ?? title,
    title,
    summary,
    authors: authors.length ? authors : ["Unknown authors"],
    published,
    url,
  };
}

export function fallbackPaperRecord(query: string): PaperRecord {
  return {
    id: query,
    title: `Fast read on ${query}`,
    summary:
      "This fallback record is generated when the live arXiv API is unavailable. It still produces a realistic analysis experience using local heuristics and sample trend data.",
    authors: ["AI Research Spark"],
    published: "2026-01-01",
    url: "https://arxiv.org",
  };
}

export function analyzePaperRecord(record: PaperRecord): PaperAnalysis {
  const sentences = sentenceChunks(record.summary);
  const year = new Date(record.published || "2026-01-01").getFullYear();
  const tags = [
    record.title.split(" ").slice(0, 2).join(" "),
    "Benchmarking",
    "Open-source leverage",
  ];

  const insights = [
    `The paper centers on ${sentences[0]?.toLowerCase() ?? "a novel AI system design"}.`,
    `The strongest product signal is the ability to turn ${record.title} into a repeatable workflow.`,
    "The setup appears suitable for a fast replication study or internal benchmark.",
  ];

  const limitations = [
    "The paper summary does not fully expose cost, latency, or operational tradeoffs.",
    "Benchmark wins may not transfer cleanly to long-tail production settings.",
    "The abstract alone rarely captures dataset leakage or annotation bias risks.",
  ];

  const questions = [
    "Which evaluation axes matter most for a founder or lab reproducing this result?",
    "Can the same method be made cheaper with retrieval, distillation, or caching?",
    "What adjacent domain would stress-test generalization earliest?",
  ];

  const summaryBullets = [
    `Published on ${record.published || "unknown date"} and attributed to ${record.authors.join(", ")}.`,
    `Immediate takeaway: ${sentences[1] ?? sentences[0] ?? record.summary}`,
    "Good candidate for a startup wedge if the workflow reduces expert time-to-insight.",
  ];

  const category =
    /robot/i.test(record.title) ? "Robotics" : /vision|image|video|multimodal/i.test(record.title) ? "Multimodal" : "LLM";

  const paper: PaperAnalysis = {
    ...defaultPaperAnalysis,
    id: record.id,
    title: record.title,
    summary: record.summary,
    authors: record.authors,
    year,
    url: record.url,
    category,
    tags,
    insights,
    limitations,
    questions,
    summaryBullets,
    methodsVsResults: buildMethodRows(record.summary),
    citationTrend: buildCitationTrend(record.id),
  };

  return {
    ...paper,
    generatedIdeas: generateIdeasFromPaper(paper),
  };
}
