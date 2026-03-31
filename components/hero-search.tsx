"use client";

import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type HeroSearchProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  loading: boolean;
};

export function HeroSearch({
  value,
  onChange,
  onSubmit,
  loading,
}: HeroSearchProps) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/8 p-2 shadow-[0_30px_90px_-30px_rgba(76,29,149,0.7)] backdrop-blur-2xl">
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Search by arXiv ID, title, keyword, or paste an abstract"
            className="h-14 rounded-[1.4rem] border-white/10 bg-black/20 pl-11 text-base"
            onKeyDown={(event) => {
              if (event.key === "Enter") onSubmit();
            }}
          />
        </div>
        <Button
          onClick={onSubmit}
          disabled={loading}
          className="h-14 rounded-[1.4rem] px-6 text-base shadow-[0_20px_50px_-24px_rgba(139,92,246,1)]"
        >
          <Sparkles className="mr-2 size-4" />
          {loading ? "Analyzing..." : "Analyze Paper"}
        </Button>
      </div>
    </div>
  );
}
