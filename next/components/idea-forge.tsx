"use client";

import { FileOutput, NotebookPen, Wand2 } from "lucide-react";
import { Idea } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type IdeaForgeProps = {
  value: string;
  onChange: (value: string) => void;
  ideas: Idea[];
  onGenerate: () => void;
  onCopy: () => void;
  onPdf: () => void;
  onNotion: () => void;
  loading: boolean;
};

export function IdeaForge({
  value,
  onChange,
  ideas,
  onGenerate,
  onCopy,
  onPdf,
  onNotion,
  loading,
}: IdeaForgeProps) {
  return (
    <Card className="border-white/10 bg-white/5">
      <CardHeader className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <CardTitle className="font-display text-2xl">Idea Forge</CardTitle>
          <p className="mt-2 text-sm text-muted-foreground">
            Turn any research summary into commercial, academic, and open-source angles.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={onCopy}>
            <NotebookPen className="mr-2 size-4" />
            Copy
          </Button>
          <Button variant="outline" size="sm" onClick={onPdf}>
            <FileOutput className="mr-2 size-4" />
            PDF
          </Button>
          <Button variant="outline" size="sm" onClick={onNotion}>
            <NotebookPen className="mr-2 size-4" />
            Notion
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_200px]">
          <Textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Paste a research abstract, thesis angle, or technical trend."
            className="min-h-32 border-white/10 bg-black/20"
          />
          <div className="space-y-3 rounded-3xl border border-white/10 bg-black/20 p-4">
            <Input value={`${ideas.length} ideas`} readOnly className="border-white/10 bg-transparent" />
            <Button onClick={onGenerate} disabled={loading} className="w-full">
              <Wand2 className="mr-2 size-4" />
              {loading ? "Forging..." : "Forge Ideas"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Export a concise idea packet for X, LinkedIn, or internal research memos.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
