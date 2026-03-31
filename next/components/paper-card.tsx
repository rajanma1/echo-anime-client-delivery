import { ExternalLink, FileText, Link2 } from "lucide-react";
import { PaperAnalysis } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type PaperCardProps = {
  paper: PaperAnalysis;
  onGenerateIdeas: () => void;
  onCopyLink: () => void;
};

export function PaperCard({ paper, onGenerateIdeas, onCopyLink }: PaperCardProps) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardHeader className="gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{paper.category}</Badge>
          <Badge variant="secondary">{paper.year}</Badge>
          <Badge variant="outline">{paper.authors.join(", ")}</Badge>
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <CardTitle className="font-display text-2xl leading-tight">{paper.title}</CardTitle>
            <p className="mt-3 max-w-3xl text-sm text-muted-foreground">{paper.summary}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={onCopyLink}>
              <Link2 className="mr-2 size-4" />
              Copy link
            </Button>
            <Button size="sm" onClick={onGenerateIdeas}>
              <FileText className="mr-2 size-4" />
              Generate 8 Ideas
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href={paper.url} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 size-4" />
                Open paper
              </a>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 md:grid-cols-3">
          {paper.tags.map((tag) => (
            <div
              key={tag}
              className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-muted-foreground"
            >
              {tag}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
