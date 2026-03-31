"use client";

import { MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full border-white/10 bg-white/5 backdrop-blur-xl"
      onClick={() => setTheme(nextTheme)}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <SunMedium className="size-4" /> : <MoonStar className="size-4" />}
    </Button>
  );
}
