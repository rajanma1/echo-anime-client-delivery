import { CheckCircle2, Rocket, TestTube2, WalletCards } from "lucide-react";
import { Idea } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type IdeaCardProps = {
  idea: Idea;
};

const icons = {
  Commercial: Rocket,
  Academic: TestTube2,
  "Open-source": WalletCards,
};

export function IdeaCard({ idea }: IdeaCardProps) {
  const Icon = icons[idea.type];

  return (
    <Card className="h-full border-white/10 bg-white/5">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <Badge variant="secondary">{idea.type}</Badge>
          <Icon className="size-4 text-cyan-300" />
        </div>
        <CardTitle className="font-display text-lg">{idea.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{idea.description}</p>
        <div>
          <h4 className="mb-2 text-sm font-semibold text-foreground">Why it matters</h4>
          <p className="text-sm text-muted-foreground">{idea.whyItMatters}</p>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-semibold text-foreground">Validation checklist</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {idea.validationChecklist.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
