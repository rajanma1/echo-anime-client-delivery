import { ArrowUpRight, Sparkles } from "lucide-react";
import { TrendTopic } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type TrendDashboardProps = {
  topics: TrendTopic[];
  onGenerateIdeas: (topic: TrendTopic) => void;
};

export function TrendDashboard({ topics, onGenerateIdeas }: TrendDashboardProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {topics.map((topic) => (
        <Card key={topic.keyword} className="border-white/10 bg-white/5">
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge>{topic.category}</Badge>
              <span className="text-xs text-emerald-300">+{topic.velocity}% velocity</span>
            </div>
            <CardTitle className="font-display text-xl">{topic.keyword}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">{topic.description}</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Momentum</span>
                <span>{topic.score}/100</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500"
                  style={{ width: `${topic.score}%` }}
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {topic.signals.map((signal) => (
                <Badge key={signal} variant="outline">
                  {signal}
                </Badge>
              ))}
            </div>
            <Button variant="outline" className="w-full" onClick={() => onGenerateIdeas(topic)}>
              <Sparkles className="mr-2 size-4" />
              Generate startup ideas
              <ArrowUpRight className="ml-2 size-4" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
