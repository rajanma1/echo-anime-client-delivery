export type MethodResultRow = {
  method: string;
  description: string;
  result: string;
};

export type CitationPoint = {
  month: string;
  citations: number;
};

export type Idea = {
  type: "Commercial" | "Academic" | "Open-source";
  title: string;
  description: string;
  whyItMatters: string;
  validationChecklist: string[];
};

export type PaperAnalysis = {
  id: string;
  title: string;
  summary: string;
  authors: string[];
  year: number;
  url: string;
  category: string;
  tags: string[];
  insights: string[];
  limitations: string[];
  questions: string[];
  summaryBullets: string[];
  methodsVsResults: MethodResultRow[];
  citationTrend: CitationPoint[];
  generatedIdeas: Idea[];
};

export type TrendTopic = {
  keyword: string;
  category: string;
  description: string;
  velocity: number;
  score: number;
  year: number;
  signals: string[];
};
