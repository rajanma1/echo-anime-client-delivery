import { NextRequest, NextResponse } from "next/server";
import {
  analyzePaperRecord,
  extractQueryFromInput,
  fallbackPaperRecord,
  parseArxivFeed,
} from "@/lib/arxiv";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter `q`." }, { status: 400 });
  }

  const normalizedQuery = extractQueryFromInput(query);
  const isArxivId = /^\d{4}\.\d{4,5}(v\d+)?$/i.test(normalizedQuery);
  const searchParam = isArxivId
    ? `id_list=${encodeURIComponent(normalizedQuery)}`
    : `search_query=${encodeURIComponent(`all:${normalizedQuery}`)}&max_results=1&sortBy=relevance&sortOrder=descending`;

  try {
    const response = await fetch(`https://export.arxiv.org/api/query?${searchParam}`, {
      headers: {
        "User-Agent": "AIResearchSpark/1.0 (Next.js demo)",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`arXiv API returned ${response.status}`);
    }

    const xml = await response.text();
    const paper = parseArxivFeed(xml);

    if (!paper) {
      return NextResponse.json(
        { paper: analyzePaperRecord(fallbackPaperRecord(query)) },
        { status: 200 },
      );
    }

    return NextResponse.json({ paper: analyzePaperRecord(paper) }, { status: 200 });
  } catch {
    return NextResponse.json(
      { paper: analyzePaperRecord(fallbackPaperRecord(query)), fallback: true },
      { status: 200 },
    );
  }
}
