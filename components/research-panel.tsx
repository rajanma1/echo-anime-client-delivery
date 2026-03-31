import { BrainCircuit, Repeat2, Spline } from "lucide-react";
import { ResearchInsight } from "@/lib/skillsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const icons = [BrainCircuit, Repeat2, Spline];

export function ResearchPanel({
  insights,
  targetOutcome,
}: {
  insights: ResearchInsight[];
  targetOutcome: string;
}) {
  return (
    <Card className="border-white/10 bg-slate-950/55">
      <CardHeader className="space-y-3">
        <div className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Research Insights</div>
        <CardTitle className="font-display text-2xl text-white">Learning science adapted to the target skill</CardTitle>
        <p className="max-w-2xl text-sm leading-6 text-slate-300">
          These recommendations are grounded in durable skill-acquisition principles and adjusted toward the outcome:
          {" "}
          <span className="text-white">{targetOutcome}</span>.
        </p>
      </CardHeader>
      <CardContent className="grid gap-4 lg:grid-cols-3">
        {insights.map((insight, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div key={insight.principle} className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
              <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-2 text-primary">
                <Icon className="size-4" />
              </div>
              <h3 className="text-lg font-semibold text-white">{insight.principle}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{insight.summary}</p>
              <p className="mt-4 border-t border-white/8 pt-4 text-sm leading-6 text-slate-400">{insight.appliedToSkill}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
