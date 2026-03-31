import { Idea, PaperAnalysis, TrendTopic } from "@/lib/types";

export const trendingPapers = [
  {
    id: "2501.12345",
    title: "Composable Agentic Evaluation for Frontier LLM Systems",
    summary: "A practical evaluation stack for agentic LLM workflows with reliability and budget controls.",
    category: "LLM",
    velocity: "+38%",
    year: 2026,
  },
  {
    id: "2412.11001",
    title: "Embodied World Models for Sparse-Reward Robotics",
    summary: "World-model planning delivers stronger robotic adaptation in long-horizon tasks.",
    category: "Robotics",
    velocity: "+31%",
    year: 2025,
  },
  {
    id: "2409.44012",
    title: "Grounded Multimodal Search with Web-Scale Visual Evidence",
    summary: "Multimodal retrieval uses visual grounding to sharpen factuality in search.",
    category: "Multimodal",
    velocity: "+27%",
    year: 2025,
  },
];

export const defaultPaperAnalysis: PaperAnalysis = {
  id: "2501.12345",
  title: "Composable Agentic Evaluation for Frontier LLM Systems",
  summary:
    "This paper introduces a modular evaluation framework for agentic LLM applications that combines scenario generation, graded execution traces, budget-aware scoring, and post-hoc failure clustering. Across internal and public benchmarks, the framework surfaces reliability regressions earlier than static eval suites while reducing human review overhead.",
  authors: ["Anika Rao", "Tomas Velasquez", "Mina Solberg"],
  year: 2026,
  url: "https://arxiv.org/abs/2501.12345",
  category: "LLM",
  tags: ["Agentic evaluation", "Reliability", "Cost-aware eval"],
  insights: [
    "Agentic systems need dynamic evaluation loops, not static benchmark snapshots.",
    "Failure clustering makes it easier to prioritize which eval regressions actually matter to users.",
    "Budget-aware scoring can convert research evaluation into an operational dashboard for product teams.",
  ],
  limitations: [
    "Results rely on curated scenarios that may under-represent adversarial user behavior.",
    "The framework still assumes access to high-quality judges and internal trace data.",
    "Operational latency and annotation cost are discussed lightly relative to deployment needs.",
  ],
  questions: [
    "Can the scoring layer be generalized to multimodal agent workflows with tool feedback?",
    "What is the minimum dataset size needed for reliable failure clustering?",
    "How quickly do eval gains decay as the underlying model changes every few weeks?",
  ],
  summaryBullets: [
    "Practical for teams shipping agents into enterprise workflows with audit needs.",
    "Suggests an obvious product wedge around evaluation-as-infrastructure.",
    "Strong basis for a grant proposal on trustworthy autonomous systems.",
  ],
  methodsVsResults: [
    {
      method: "Scenario synthesis",
      description: "Generates realistic multi-step tasks from deployment traces and seeded templates.",
      result: "Finds regressions 21% earlier than static benchmark suites.",
    },
    {
      method: "Trace grading",
      description: "Scores intermediate tool use, recovery behavior, and final answer quality.",
      result: "Cuts manual review load by 42% in the reported stack.",
    },
    {
      method: "Failure clustering",
      description: "Groups similar breakdowns to highlight repeatable system bugs.",
      result: "Improves prioritization for model and prompt iteration cycles.",
    },
  ],
  citationTrend: [
    { month: "Jan", citations: 8 },
    { month: "Feb", citations: 14 },
    { month: "Mar", citations: 21 },
    { month: "Apr", citations: 34 },
    { month: "May", citations: 48 },
    { month: "Jun", citations: 63 },
  ],
  generatedIdeas: [],
};

export const trendCategories = ["All", "LLM", "Robotics", "Multimodal", "Infrastructure", "Evaluation"];

export const trendTopics: TrendTopic[] = [
  {
    keyword: "Agentic evaluation",
    category: "Evaluation",
    description: "Fast-rising tooling around evaluating long-running AI systems with trace-level scoring.",
    velocity: 38,
    score: 91,
    year: 2026,
    signals: ["failure clustering", "runtime scoring", "trustworthy agents"],
  },
  {
    keyword: "Video-language grounding",
    category: "Multimodal",
    description: "Grounding language models in long-context video streams for search, tutoring, and analytics.",
    velocity: 33,
    score: 86,
    year: 2026,
    signals: ["long context", "retrieval", "temporal reasoning"],
  },
  {
    keyword: "World-model robotics",
    category: "Robotics",
    description: "Model-based planning for physical agents with sparse rewards and safer exploration.",
    velocity: 29,
    score: 82,
    year: 2025,
    signals: ["sim2real", "safety", "planning"],
  },
  {
    keyword: "Inference routing",
    category: "Infrastructure",
    description: "Adaptive orchestration layers that choose models, tools, and retrieval paths under cost constraints.",
    velocity: 26,
    score: 79,
    year: 2025,
    signals: ["mixture-of-models", "latency", "unit economics"],
  },
  {
    keyword: "Small-model scientific copilots",
    category: "LLM",
    description: "Compact specialized models tuned for lab protocols, literature mapping, and grant drafting.",
    velocity: 24,
    score: 76,
    year: 2024,
    signals: ["distillation", "domain adaptation", "scientific workflows"],
  },
  {
    keyword: "Synthetic eval data",
    category: "Evaluation",
    description: "Using generated but structured scenarios to stress-test AI applications when organic data is scarce.",
    velocity: 22,
    score: 72,
    year: 2025,
    signals: ["bootstrapping", "coverage", "eval automation"],
  },
];

const ideaTypes: Idea["type"][] = ["Commercial", "Academic", "Open-source"];

export function generateIdeasFromPaper(paper: PaperAnalysis): Idea[] {
  return [
    {
      type: "Commercial",
      title: "EvalOps Copilot",
      description: `A SaaS layer that turns ${paper.category} evaluation traces into release gates and reliability dashboards.`,
      whyItMatters: "Labs and startups need a faster path from benchmark data to shipping decisions.",
      validationChecklist: [
        "Interview 10 AI product teams about release pain points.",
        "Prototype trace ingestion for one benchmark and one production workflow.",
        "Measure whether teams act on the dashboard without manual analyst support.",
      ],
    },
    {
      type: "Commercial",
      title: "Grant Angle Generator",
      description: `Package ${paper.title} into grant-ready hypotheses, societal impact claims, and milestone plans.`,
      whyItMatters: "Research groups struggle to translate technical novelty into funding language.",
      validationChecklist: [
        "Test with two academic labs preparing grant submissions.",
        "Compare proposal drafting time before and after the tool.",
        "Evaluate if generated milestones map to reviewer expectations.",
      ],
    },
    {
      type: "Academic",
      title: "Reproducibility Sprint",
      description: `Run a low-budget replication of ${paper.title} with alternative datasets and transparent reporting.`,
      whyItMatters: "Replication studies earn trust and often reveal hidden assumptions in headline results.",
      validationChecklist: [
        "Define one minimal reproduction benchmark.",
        "Document compute cost and implementation shortcuts.",
        "Publish all deviations from the original setup.",
      ],
    },
    {
      type: "Academic",
      title: "Ablation on Cost vs Quality",
      description: "Test which components preserve performance when compute, annotation, or context budgets shrink.",
      whyItMatters: "This is often the fastest route to a publishable systems paper or internal optimization win.",
      validationChecklist: [
        "Select two cost knobs and one quality metric.",
        "Run an ablation grid on a narrowed benchmark slice.",
        "Summarize the frontier in a simple decision chart.",
      ],
    },
    {
      type: "Open-source",
      title: "Benchmark Starter Kit",
      description: `Open-source templates and dashboards to replicate the paper's workflow in under one afternoon.`,
      whyItMatters: "Open tooling creates adoption loops and community trust around new research workflows.",
      validationChecklist: [
        "Publish a one-command demo with sample data.",
        "Include reproducible reports and charts.",
        "Track stars, forks, and setup completion rate.",
      ],
    },
    {
      type: "Commercial",
      title: "Vertical Research Scout",
      description: "A premium intelligence brief for AI founders mapping where this paper opens a market wedge.",
      whyItMatters: "Founders need synthesis, not just summaries, when deciding where to build.",
      validationChecklist: [
        "Pilot with three founder friends or angel-backed teams.",
        "Track if the brief changes roadmap prioritization.",
        "Package recurring sections into a reusable template.",
      ],
    },
    {
      type: "Open-source",
      title: "Failure Taxonomy Dataset",
      description: "Build a community-maintained error taxonomy and evaluation corpus around the paper's failure modes.",
      whyItMatters: "Shared failure datasets accelerate more grounded progress than leaderboard chasing alone.",
      validationChecklist: [
        "Define contribution guidelines and annotation rules.",
        "Seed with 100 examples from real workflows.",
        "Add issue templates for community expansion.",
      ],
    },
    {
      type: "Academic",
      title: "Cross-domain Transfer Study",
      description: "Measure whether the method works outside its original niche, especially in scientific or regulated settings.",
      whyItMatters: "Transferability is a direct route to publishable insight and practical defensibility.",
      validationChecklist: [
        "Choose one adjacent high-stakes domain.",
        "Adapt metrics to that domain's constraints.",
        "Document where failure modes shift under new conditions.",
      ],
    },
  ];
}

export function generateIdeasFromText(text: string, anchor = "research"): Idea[] {
  const lead = text
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 140);

  return Array.from({ length: 6 }, (_, index) => {
    const type = ideaTypes[index % ideaTypes.length];
    return {
      type,
      title: `${type} angle ${index + 1}: ${anchor}`,
      description: `Use "${lead || anchor}" as the core input and turn it into a ${type.toLowerCase()} output with a focused execution path.`,
      whyItMatters: `A compact ${type.toLowerCase()} idea is easier to test, fund, and communicate than a vague research ambition.`,
      validationChecklist: [
        "Define the narrowest user or research persona.",
        "State one measurable success metric within 14 days.",
        "Collect one external signal that the problem is urgent.",
      ],
    };
  });
}

export const ideaForgeSeed =
  "Researchers need a lightweight workflow for turning dense arXiv papers into startup opportunities, replication experiments, and fundable grant ideas without manually reading every section.";
