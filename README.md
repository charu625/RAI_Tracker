# RAI Tracker — Metric Configuration UI

A Responsible AI governance interface for configuring, monitoring, and managing organisation-wide AI metrics. Built as a frontend take-home exercise demonstrating product-quality UI, typed React architecture, and AI-assisted development with human review.

**Live demo:** https://rai-tracker-ebon.vercel.app/

**Repository:** https://github.com/charu625/RAI_Tracker

---

## Features

- **Metrics Library** — searchable, filterable grid of configured metrics with category/status filters and URL-synced query params
- **4-step Configuration Wizard** — Basic Details → Measurement → Alerts & Ownership → Review & Confirm
- **Threshold visualiser** — live red/amber/green range bar for min/target values
- **Metric Detail** — full read-only configuration view with status toggle (Active / Draft / Archived)
- **Edit flow** — re-opens wizard pre-populated from existing metric data
- **Light / dark theme** — toggle in header via `next-themes`

Pre-loaded with 6 mock metrics from the assignment brief (Demographic Parity, Model Explainability Score, etc.).

---

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict, no `any`) |
| Styling | Tailwind CSS v4 + shadcn/ui (base-nova) |
| State | React Context + `useReducer` |
| Validation | Zod (per wizard step) |
| Icons | Lucide React |

---

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

---

## Deploy to Vercel

1. Push this repository to a **public** GitHub repo
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Next.js** (defaults are fine)
4. Deploy and paste the production URL into this README

---

## Architecture

```
src/
├── app/                    # Routes (library, wizard, detail)
├── components/
│   ├── layout/             # AppShell, PageHeader, theme toggle
│   ├── metrics/            # Library, cards, detail, threshold viz
│   ├── wizard/             # Multi-step form and steps
│   └── ui/                 # shadcn primitives
├── context/                # MetricsProvider (global in-memory store)
├── lib/                    # Reducer, mock data, validation, formatters
└── types/                  # Metric and wizard TypeScript models
```

### Key decisions

1. **Context + reducer over Redux** — meets the brief, keeps data flow explicit for a single-domain app
2. **Route-based wizard** (`/metrics/new`, `/metrics/[id]/edit`) — shareable URLs and clear separation from the library
3. **Local wizard state** — only commits to global store on “Save as Draft” or “Activate Metric”
4. **Zod per step** — validation runs on “Next” and again on final save; errors map to field-level messages
5. **shadcn/ui** — accessible primitives with minimal custom CSS; category colours applied via a small token map

### Data flow

```
Mock data → MetricsProvider (useReducer)
                ↓
         Metrics Library (read + filter)
                ↓
    Wizard (local form state) → save → reducer → Library
                ↓
         Detail view (read + SET_STATUS)
```

All data is **in-memory**; refreshing the page resets to initial mock data.

---

## AI-assisted development

See **[AI_LOG.md](./AI_LOG.md)** for a chronological log of which AI tools were used, what was generated, and what was changed during human review. This is a required submission artifact.

---

## With more time

- End-to-end tests (Playwright) for wizard validation and CRUD flows
- Backend API + persistent storage
- Owner picker with org directory search
- Metric versioning / audit log on the detail page
- Export metrics configuration as JSON for compliance reports

---

## License

Assignment submission — not for production use without further hardening.
