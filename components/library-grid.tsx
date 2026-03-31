"use client";

import { Filter } from "lucide-react";
import { Domain, SkillProfile } from "@/lib/skillsData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const domains: Array<Domain | "All"> = ["All", "Tech", "Business", "Creative", "Soft Skills"];

export function LibraryGrid({ skills, onSelect }: { skills: SkillProfile[]; onSelect: (skill: SkillProfile) => void }) {
  return (
    <Tabs defaultValue="All" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold tracking-[0.18em] text-primary uppercase">Explore Library</div>
          <h2 className="mt-2 font-display text-3xl text-white">Pre-analyzed skill architectures</h2>
        </div>
        <TabsList className="h-auto flex-wrap rounded-[1.25rem] border border-white/8 bg-slate-950/55 p-1.5">
          {domains.map((domain) => (
            <TabsTrigger
              key={domain}
              value={domain}
              className="rounded-xl px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              {domain}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {domains.map((domain) => {
        const filtered = domain === "All" ? skills : skills.filter((skill) => skill.domain === domain);

        return (
          <TabsContent key={domain} value={domain}>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((skill) => (
                <Card key={skill.slug} className="overflow-hidden border-white/10 bg-slate-950/55 shadow-[0_24px_70px_-44px_rgba(0,0,0,0.75)]">
                  <div className="h-1 w-full bg-gradient-to-r from-primary/90 via-cyan-300/60 to-transparent" />
                  <CardHeader className="space-y-3">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-slate-300">
                      <Filter className="size-3.5 text-primary" />
                      {skill.domain}
                    </div>
                    <CardTitle className="font-display text-2xl text-white">{skill.name}</CardTitle>
                    <p className="text-sm leading-6 text-slate-300">{skill.tagline}</p>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="rounded-[1.25rem] border border-white/8 bg-white/[0.03] p-4">
                      <div className="mb-2 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase">Outcome</div>
                      <p className="text-sm leading-6 text-slate-300">{skill.targetOutcome}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-white/10 bg-white/[0.03] text-slate-100 hover:bg-white/[0.07]"
                      onClick={() => onSelect(skill)}
                    >
                      Deep Dive
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
