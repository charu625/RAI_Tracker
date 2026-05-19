# AI Development Log — RAI Metric Configuration UI

## Tools used

- **Cursor (Agent mode)** — primary IDE assistant for scaffolding, component generation, debugging, and iterative fixes
- **Claude** (via Cursor) — architecture planning, TypeScript types, Zod validation schemas, and bulk UI component drafts

---

## Phase 1: Project scaffold

**Intent:** Greenfield Next.js App Router app with TypeScript, Tailwind v4, shadcn/ui, and light/dark theme.

**AI generated:** `create-next-app` in a lowercase subfolder (`rai-tracker`) because the parent folder name `RAI_Tracker` violates npm naming rules; files were moved to repo root. shadcn init (base-nova style) and a batch of UI primitives.

**Changes after review:**
- Added `next-themes`, `zod`, and `lucide-react` explicitly
- Chose **light default + system-aware dark toggle** per product preference
- Did not use Redux or other external state libraries (assignment requirement)

---

## Phase 2: Data model and validation

**Intent:** Strict TypeScript interfaces and per-step Zod validation.

**AI generated:** `src/types/metric.ts`, `src/lib/mock-metrics.ts` (6 metrics from brief with full wizard fields), `src/lib/validation.ts` with step1/2/3 schemas.

**Changes after review:**
- Removed a duplicate/broken `validateStep1` helper; kept `validateStep1WithIds` for name uniqueness against existing metrics
- Added `superRefine` on threshold schema so `target` must be on the correct side of `minimum` for `gt` vs `lt` operators
- Centralised display helpers in `src/lib/format.ts` and category colours in `src/lib/constants.ts`

---

## Phase 3: State management

**Intent:** In-memory CRUD with React Context + `useReducer`.

**AI generated:** `metrics-reducer.ts`, `metrics-context.tsx` with `addMetric`, `updateMetric`, `setMetricStatus`.

**Changes after review:**
- Wizard form state kept **local** inside `MetricWizard` until save — avoids polluting the library with half-finished metrics
- Mock data hydrates reducer initial state only; session changes persist until refresh (no backend)

---

## Phase 4: Metrics Library

**Intent:** Filterable grid, search, URL-synced query params.

**AI generated:** `MetricsLibrary`, `MetricCard`, `MetricsFiltersBar` with 300ms debounced search.

**Changes after review:**
- Wrapped library in `Suspense` because `useSearchParams` requires it in App Router
- Replaced `Button asChild` + `Link` with `buttonVariants()` on `Link` — shadcn v4 base-nova `Button` does not support `asChild`
- Added subtle grid background utility (`.rai-grid-bg`) for a more product-like landing page

---

## Phase 5: Configuration wizard

**Intent:** Four-step flow with step indicator, threshold visualiser, email chips, review summary.

**AI generated:** Step components, `ThresholdVisualizer`, `EmailChipsInput`, `MetricWizard` orchestrator.

**Changes after review:**
- Fixed repeated accidental `motion` typos (meant `motion`) during rapid generation — standardised on plain `div` elements
- Threshold bar uses red / amber / green zones with live updates on numeric input
- Review step uses “Edit” links to jump back to earlier steps without inline re-editing on step 4
- `crypto.randomUUID()` fallback for environments without Web Crypto

---

## Phase 6: Metric detail view

**Intent:** Read-only layout with status tabs and edit navigation.

**AI generated:** `MetricDetail` with grouped cards and `Tabs` for Active / Draft / Archived.

**Changes after review:**
- Status changes dispatch `SET_STATUS` and show Sonner toasts
- Detail route uses client `use(params)` for Next.js 15+ async params pattern

---

## Rejected ideas

| Idea | Why rejected |
|------|----------------|
| Redux / Zustand | Assignment requires hooks-only state |
| Inline edit on review step | Scope control; jump-to-step is clearer |
| `Button asChild` pattern | Not supported by current shadcn base-ui Button |
| Backend / localStorage | Brief specifies in-memory mock data only |

---

## Final manual review

- Ran `npm run build` — TypeScript strict check passes
- Verified no `any` types in application source
- Checked responsive layout at tablet (`md`) and desktop (`xl` grid)
- Accessibility: labels on inputs, `aria-current` on wizard steps, `aria-invalid` on validation errors

---

## If I had more time

- Playwright e2e tests for wizard happy path and validation failures
- Owner autocomplete (Command palette) instead of free-text
- Persist metrics to `localStorage` for refresh survival
- Metric duplication and audit history on the detail page
