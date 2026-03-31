import { Suspense } from "react";
import { SkillForgeApp } from "@/components/skillforge-app";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SkillForgeApp />
    </Suspense>
  );
}
