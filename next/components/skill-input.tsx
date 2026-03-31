"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { quickSelectSkills } from "@/lib/skillsData";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type SkillInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  selectedSkill?: string;
  onQuickSelect: (value: string) => void;
  isLoading: boolean;
};

export function SkillInput({
  value,
  onChange,
  onSubmit,
  selectedSkill,
  onQuickSelect,
  isLoading,
}: SkillInputProps) {
  return (
    <div className="space-y-5">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-medium tracking-[0.18em] text-primary uppercase">
        <Sparkles className="size-3.5" />
        Skill architecture engine
      </div>

      <div className="max-w-3xl space-y-4">
        <h1 className="font-display text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Analyze Free Resources. Forge Evidence-Based Skill Paths.
        </h1>
        <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
          SkillForge.ai compares free learning ecosystems, summarizes applied learning science, and generates practical
          roadmaps with measurable checkpoints.
        </p>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/58 shadow-[0_32px_110px_-52px_rgba(10,160,140,0.62)] backdrop-blur-xl">
        <div className="h-px w-full bg-gradient-to-r from-primary/80 via-cyan-300/50 to-transparent" />
        <div className="grid gap-6 p-4 sm:p-5">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
              <div className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Analysis mode</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">Compare free learning websites, verified references, and practice tools.</p>
            </div>
            <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
              <div className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Outputs</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">Research insights, priority matrix, roadmaps, and portfolio-oriented paths.</p>
            </div>
            <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
              <div className="text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Signal</div>
              <p className="mt-2 text-sm leading-6 text-slate-300">Grounded in reputable open resources instead of hype-heavy recommendations.</p>
            </div>
          </div>
          <Textarea
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Describe the skill, role, or capability you want to build. Example: I want to become a strong AI engineer with Python, retrieval systems, evaluation habits, and portfolio-ready projects."
            className="min-h-36 resize-none border-white/10 bg-slate-900/80 text-base text-slate-50 placeholder:text-slate-400"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {quickSelectSkills.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => onQuickSelect(skill)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition",
                    selectedSkill === skill
                      ? "border-primary/50 bg-primary/15 text-primary"
                      : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-primary/30 hover:text-white",
                  )}
                >
                  {skill}
                </button>
              ))}
            </div>
            <Button
              onClick={onSubmit}
              size="lg"
              className="min-w-48 bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              <ArrowRight className="size-4" />
              {isLoading ? "Analyzing..." : "Analyze Skill"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
