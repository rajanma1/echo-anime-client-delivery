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

## Project Structure

```text
app/
components/
lib/
```

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Notes

- All sample analysis data lives in `lib/skillsData.ts`.
- The current entry point is `app/page.tsx`, which renders `components/skillforge-app.tsx`.
- This repository is intentionally trimmed to the SkillForge app only.
