"use client";

import { ArrowRight, Flame } from "lucide-react";
import { trendingPapers } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type TrendingCarouselProps = {
  onSelect: (value: string) => void;
};

export function TrendingCarousel({ onSelect }: TrendingCarouselProps) {
  return (
    <div className="flex snap-x gap-4 overflow-x-auto pb-2">
      {trendingPapers.map((paper) => (
        <Card
          key={paper.id}
          className="min-w-[280px] snap-start border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <CardContent className="space-y-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <Badge variant="secondary" className="rounded-full">
                <Flame className="mr-1 size-3" />
                Trending
              </Badge>
              <span className="text-xs text-muted-foreground">{paper.year}</span>
            </div>
            <div>
              <h3 className="line-clamp-2 font-display text-lg font-semibold">{paper.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{paper.summary}</p>
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{paper.category}</span>
              <span>{paper.velocity} velocity</span>
            </div>
            <Button variant="ghost" className="px-0" onClick={() => onSelect(paper.id)}>
              Open analysis
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
