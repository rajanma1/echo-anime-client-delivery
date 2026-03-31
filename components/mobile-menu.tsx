"use client";

import * as React from "react";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Analyzer", href: "#analyzer" },
  { label: "Trends", href: "#trends" },
  { label: "Idea Forge", href: "#forge" },
];

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full md:hidden">
          <Menu className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display">
            <Sparkles className="size-4 text-cyan-300" />
            AI Research Spark
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground/90"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
