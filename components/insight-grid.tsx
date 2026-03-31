import { AlertCircle, Lightbulb, Microscope, TriangleAlert } from "lucide-react";
import { PaperAnalysis } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type InsightGridProps = {
  paper: PaperAnalysis;
};

const sections = [
  { key: "insights", title: "Key Insights", icon: Lightbulb },
  { key: "limitations", title: "Limitations", icon: TriangleAlert },
  { key: "questions", title: "Open Questions", icon: AlertCircle },
  { key: "summaryBullets", title: "Research Notes", icon: Microscope },
] as const;

export function InsightGrid({ paper }: InsightGridProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {sections.map((section) => {
        const Icon = section.icon;
        const items = paper[section.key];

        return (
          <Card key={section.key} className="border-white/10 bg-white/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Icon className="size-4 text-cyan-300" />
                {section.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {items.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
