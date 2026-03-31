# SkillForge.ai

SkillForge.ai is a production-ready single-page learning analysis dashboard built with Next.js 15, TypeScript, Tailwind CSS v4, Shadcn-style UI primitives, Lucide icons, `next-themes`, Recharts, and `jsPDF`.

It helps serious learners compare free learning resources, interpret learning-science guidance, and generate evidence-based 30/60/90-day learning architectures for popular 2026 skill paths.

## Features

- Hero input with guided prompt entry and quick-select chips for popular skills
- Hardcoded professional library of 18 free learning resources and 12 skill tracks
- Resource Analysis Engine with comparison table, expandable details, radar chart, and tailored research insights
- Path Forge with 4 structured learning architectures per skill, measurable checkpoints, and 30/60/90-day roadmaps
- Prioritization matrix for effort versus mastery impact
- Explore Library with Tech, Business, Creative, and Soft Skills filters
- Shareable analysis URLs via `?skill=` query params
- Client-side PDF-style export using `jsPDF`
- Dark mode default with a precise slate-and-teal visual system

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS v4
- Shadcn-style UI primitives
- Lucide React
- `next-themes`
- Recharts
- `jsPDF`

## Project structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  coverage-chart.tsx
  library-grid.tsx
  path-card.tsx
  research-panel.tsx
  resource-table.tsx
  roadmap-timeline.tsx
  skill-input.tsx
  skillforge-app.tsx
  theme-provider.tsx
  ui/
lib/
  skillsData.ts
  utils.ts
```

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Expanding the resource library

All sample analysis data lives in `lib/skillsData.ts`.

To add a new free platform:

1. Add a new resource entry to the `resources` array with capability scores and descriptive analysis.
2. Add the resource ID to one or more skill profiles under `relevantResourceIds`.
3. Reference the resource inside a skill path bundle if it should appear in generated architectures.

To add a new skill:

1. Add a new `SkillProfile` entry to the `skills` array.
2. Provide domain, overview, research insights, learning paths, and prioritization points.
3. Add the name to `quickSelectSkills` if it should appear in the hero chip row.

## Notes

- The application intentionally uses hardcoded 2026 sample analysis data.
- URL state is shareable through the `skill` query parameter.
- PDF export is client-side and designed as a concise planning summary.
- The repository may still contain unrelated legacy prototype files; SkillForge.ai is driven by `app/page.tsx`, `components/skillforge-app.tsx`, and `lib/skillsData.ts`.
