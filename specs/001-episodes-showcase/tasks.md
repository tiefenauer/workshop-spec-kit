---
description: "Task list for implementing the Episodes Showcase feature"
---

# Tasks: Episodes Showcase

**Input**: Design documents from `/specs/001-episodes-showcase/`
**Primary files consulted**:
- `/Users/dani/IdeaProjects/workshop-spec-kit/specs/001-episodes-showcase/plan.md`
- `/Users/dani/IdeaProjects/workshop-spec-kit/specs/001-episodes-showcase/spec.md`
- `/Users/dani/IdeaProjects/workshop-spec-kit/specs/001-episodes-showcase/episode.schema.json`
- `/Users/dani/IdeaProjects/workshop-spec-kit/site/data/episodes.json`

Notes and assumptions
- Plan and spec recommend Next.js (Pages Router) + TypeScript + Tailwind; tasks below follow that stack. If maintainers prefer plain JS or App Router, swap TS/Next-specific tasks accordingly.
- The `episodes.json` dataset uses duration strings ("00:28:12") while `episode.schema.json` expects duration as number – a normalization task is included (Foundational).
- Tests are recommended in plan/spec; test tasks are included but marked small and optional so the team can adopt a TDD flow or implement later.
- All task checklist lines include an exact file path.

## Phase 1: Setup (Shared Infrastructure)

Purpose: Project initialization and base structure to support static SSG pages, styling, and dev scripts.

- [x] T001 [P] Initialize Next.js + package.json scripts and dev scripts — modify `/package.json`
  - Goal: Add Next.js, React, and scripts: dev/build/start/test/lint.
  - Files: `/package.json`
  - Implementation notes: Add entries for "dev": "next dev", "build": "next build", "start": "next start", "test": "jest", "lint": "next lint". Keep versions flexible; prefer caret-pinned latest stable versions.
  - Estimate: 0.5h, 1 SP
  - Dependencies: none
  - Success criteria: `package.json` contains required scripts and dependency list.
  - QA checklist:
    - [x] package.json has "dev" and "build" scripts
    - [x] `npm run dev` starts Next dev server locally (manual smoke)

- [x] T002 [P] Add dependency list (dev & prod) to `/package.json` for Next.js, React, Tailwind, Jest, RTL, Playwright
  - Goal: Ensure repository manifest lists required dependencies: next, react, react-dom, typescript, tailwindcss, postcss, autoprefixer, jest, @testing-library/react, jest-axe (optional), playwright (optional).
  - Files: `/package.json`
  - Implementation notes: Dev vs prod packages: testing packages should be devDependencies. Keep install command separate in implementation but list here as package.json edits.
  - Estimate: 0.5h, 1 SP
  - Dependencies: T001
  - Success criteria: Dependencies present in package.json and `npm install` completes (manual).
  - QA checklist:
    - [x] `npm install` completes without errors
    - [x] node_modules contains next and tailwind packages

- [x] T003 Configure Tailwind + PostCSS and global stylesheet at `/tailwind.config.js`, `/postcss.config.js`, `/site/styles/globals.css`
  - Goal: Provide Tailwind base, utilities, and global CSS imports.
  - Files: `/tailwind.config.js`, `/postcss.config.js`, `/site/styles/globals.css`
  - Implementation notes: Use recommended Tailwind setup (content pointing to `pages/**/*.{js,ts,tsx}` and `site/components/**/*.{js,ts,tsx}`); create `globals.css` with Tailwind base, components, utilities imports.
  - Estimate: 1.0h, 2 SP
  - Dependencies: T002
  - Success criteria: Tailwind config exists and global CSS includes `@tailwind base; @tailwind components; @tailwind utilities;`
  - QA checklist:
    - [ ] `globals.css` imports Tailwind layers
    - [ ] A simple class (e.g., `bg-red-500`) applied in a page changes appearance in dev

- [ ] T004 Add TypeScript baseline and tsconfig.json — modify `/tsconfig.json`
  - Goal: Add a TS setup compatible with Next.js (if adopting TS); keep strictness moderate for fast iteration.
  - Files: `/tsconfig.json`
  - Implementation notes: Use Next recommended tsconfig (`"jsx": "preserve"`, target `es6`, baseUrl root). If the team chooses JS, adapt to `jsconfig.json`.
  - Estimate: 0.5h, 1 SP
  - Dependencies: T001
  - Success criteria: TypeScript config file present; `npm run dev` type-checks without blocking by default.
  - QA checklist:
    - [ ] `tsconfig.json` in repo root
    - [ ] Editor recognizes TS/TSX files (basic check)

- [ ] T005 Create global app wrapper `/pages/_app.tsx` to load global CSS and Layout
  - Goal: Provide a single point to import `/site/styles/globals.css` and wrap pages with `Layout`.
  - Files: `/pages/_app.tsx`, `/site/components/Layout.tsx`
  - Implementation notes: Minimal _app that imports globals and renders Component inside `<Layout>`. Use functional component with types if TS.
  - Estimate: 0.75h, 1 SP
  - Dependencies: T003, T004
  - Success criteria: App loads and displays Layout shell in dev server.
  - QA checklist:
    - [ ] Visiting `/` shows Layout header/footer placeholders
    - [ ] Global styles apply (font or background visible)

---

## Phase 2: Foundational (Blocking Prerequisites)

Purpose: Core code modules and utilities shared across all stories (data loader, types, tokens). MUST complete before implementing user stories.

- [ ] T006 Create episode TypeScript type / domain model at `/types/episode.ts`
  - Goal: Add Episode interface matching plan with flexible types for image/audio/transcript optional fields.
  - Files: `/types/episode.ts`
  - Implementation notes: Define interface Episode { id, title, description, image?: string, publishDate: string, duration: number | string, tags: string[], transcript?: string | null, audioUrl?: string, slug: string, featured?: boolean }
  - Estimate: 0.5h, 1 SP
  - Dependencies: T004
  - Success criteria: Type file exports `Episode` type used by other modules.
  - QA checklist:
    - [ ] Episode type compiles with tsserver
    - [ ] Example import works in a test file

- [ ] T007 Create data loader and normalization utility `/lib/episodes.ts`
  - Goal: Read `site/data/episodes.json`, validate basic shape, normalize fields (parse duration to seconds), provide helpers: `getAllEpisodes()`, `getEpisodeBySlug(slug)`, `getFeaturedEpisode()`.
  - Files: `/lib/episodes.ts`, reads `/site/data/episodes.json`
  - Implementation notes: Use `fs.readFileSync(path.resolve(process.cwd(), 'site/data/episodes.json'), 'utf-8')` + JSON.parse. Implement `parseDurationString('00:28:12') => 1692` (seconds). Add simple validation check (required fields present). Log a warning if missing optional fields or malformed duration.
  - Estimate: 1.5h, 2 SP
  - Dependencies: T006
  - Success criteria: `getAllEpisodes()` returns array, durations normalized to seconds in returned objects.
  - QA checklist:
    - [ ] Call `getAllEpisodes()` in node REPL or test returns 20 items
    - [ ] Confirm `getFeaturedEpisode()` returns the item with `featured: true` (tie-breaker newest)

- [ ] T008 Add Light design tokens and Tailwind theme mapping `/site/styles/tokens.ts` and update `/tailwind.config.js`
  - Goal: Provide primary colors and spacing tokens per plan (nav colors, accent).
  - Files: `/site/styles/tokens.ts`, `/tailwind.config.js`
  - Implementation notes: Export color palette and extend Tailwind theme accordingly (colors: #0A2540, #FF6B6B, #7C5CFF, etc.). Keep tokens small.
  - Estimate: 0.75h, 1 SP
  - Dependencies: T003
  - Success criteria: Tailwind theme extended and token imports available for components.
  - QA checklist:
    - [ ] Tailwind config includes custom colors
    - [ ] A sample component uses `text-primary` and renders correctly

- [ ] T009 Create shared components shell: `/site/components/Header.tsx`, `/site/components/Footer.tsx`, `/site/components/MetaHead.tsx`, `/site/components/Layout.tsx`
  - Goal: Implement minimal, accessible header/footer, Layout that uses `MetaHead` and nav links (Home, Episodes, About, FAQ).
  - Files: `/site/components/Header.tsx`, `/site/components/Footer.tsx`, `/site/components/MetaHead.tsx`, `/site/components/Layout.tsx`
  - Implementation notes: Header must expose a prop to mark active route; MetaHead should accept title/description/image/jsonLd and render meta tags + JSON-LD script.
  - Estimate: 2.0h (split across files), 3 SP
  - Dependencies: T005, T008
  - Success criteria: Layout renders header with nav and meta tags present in page head.
  - QA checklist:
    - [ ] Nav contains links to `/`, `/episodes`, `/about`, `/faq`
    - [ ] Page head contains `meta[name="description"]` after visiting a page

- [x] T010 Setup basic test config: `/jest.config.js`, `/jest.setup.ts`, `/tests` folder, and add test script in `/package.json`
  - Goal: Provide minimal Jest + React Testing Library configuration and sample test runner.
  - Files: `/jest.config.js`, `/jest.setup.ts`, `/tests/.keep`
  - Implementation notes: Configure `jest` for js/tsx using `ts-jest` or Babel as preferred. Add `test` script in package.json (see T001).
  - Estimate: 1.5h, 2 SP
  - Dependencies: T002, T004
  - Success criteria: `npm run test` runs and reports results (can be empty suite).
  - QA checklist:
    - [ ] `npm run test` exits with code 0 (empty suite or passing)
    - [ ] Test config recognizes `.tsx` test files

Checkpoint: Foundational phase complete — user story implementation may begin after T006-T010 pass.

---

## Phase 3: User Story 1 - Discover & Play (Priority: P1) 🎯 MVP

Goal: User can land on `/`, see the prominent hero and one featured episode, and play audio inline (mock player). This is the MVP story.

Independent Test: Visit `/`, confirm a featured episode card with image/title/blurb and Play CTA that starts mock audio player UI.

### Tests (OPTIONAL / Recommended)
- [ ] T011 [P] [US1] Add unit tests for `FeaturedCard` and `Player` at `/tests/components/featuredcard.test.tsx` and `/tests/components/player.test.tsx`
  - Goal: Test Play click toggles play state and Player shows time/duration.
  - Files: `/tests/components/featuredcard.test.tsx`, `/tests/components/player.test.tsx`
  - Implementation notes: Use React Testing Library; mock audio by using a stubbed `HTMLAudioElement` or test component state toggling without real audio playback.
  - Estimate: 1.5h, 2 SP
  - Dependencies: T010, T009, T007
  - Success criteria: Tests cover Play toggle and render of featured data.
  - QA checklist:
    - [ ] Play toggle test asserts callback fired and state updated
    - [ ] FeaturedCard renders title, publishDate and Play button

### Implementation tasks (US1)

- [x] T012 [US1] Create `site/components/FeaturedCard.tsx` (featured episode card) — file `/site/components/FeaturedCard.tsx`
  - Goal: Visual card used in hero with image, title, blurb, publish date, duration and Play/View buttons.
  - Files: `/site/components/FeaturedCard.tsx`
  - Implementation notes: Accept `episode` prop (Episode). Use `alt` fallback: `Episode image: ${title}`. Provide Play button with keyboard accessible attributes (role/button, aria-pressed etc.).
  - Estimate: 1.0h, 2 SP
  - Dependencies: T009, T006
  - Success criteria: FeaturedCard renders with required fields and an accessible Play button.
  - QA checklist:
    - [ ] Image element has non-empty `alt` attribute (fallback if missing)
    - [ ] Play button is reachable via Tab and activatable via Enter/Space

- [x] T013 [P] [US1] Create `site/components/Player.tsx` (mock player) — file `/site/components/Player.tsx`
  - Goal: Inline player UI that plays provided `audioUrl` (mock) and displays current time / duration; supports keyboard controls.
  - Files: `/site/components/Player.tsx`
  - Implementation notes: Player can use HTMLAudioElement when available; for MVP show play/pause state toggle and time display. Ensure `role="region"` and aria-labeling.
  - Estimate: 1.0h, 2 SP
  - Dependencies: T012
  - Success criteria: Player can be toggled via Play button and shows visual play state.
  - QA checklist:
    - [ ] Play toggles the UI to "playing" state (DOM)
    - [ ] Player region has accessible name and keyboard operable controls

- [x] T014 [US1] Implement landing page `/pages/index.tsx` using `getStaticProps` reading `/site/data/episodes.json` and rendering `FeaturedCard` — file `/pages/index.tsx`
  - Goal: Provide SSG landing page that selects exactly one featured episode (tie-breaker newest publishDate).
  - Files: `/pages/index.tsx`, uses `/lib/episodes.ts`
  - Implementation notes: Use `getStaticProps` to call `getFeaturedEpisode()` (from T007). Render hero and `FeaturedCard`. Include meta via `MetaHead`.
  - Estimate: 1.25h, 2 SP
  - Dependencies: T007, T012, T013, T009
  - Success criteria: `/` builds statically and returns one featured card.
  - QA checklist:
    - [ ] Visiting `/` shows exactly one featured episode card
    - [ ] Play CTA on card opens Player and toggles playing state

- [x] T015 [US1] Add keyboard accessibility improvements to Play flow and add focus styles — modify files `/site/components/FeaturedCard.tsx`, `/site/components/Player.tsx`, `/site/styles/globals.css`
  - Goal: Ensure Play and View are keyboard navigable and visible focuses meet contrast.
  - Files: `/site/components/FeaturedCard.tsx`, `/site/components/Player.tsx`, `/site/styles/globals.css`
  - Implementation notes: Implement `onKeyDown` handling for Enter/Space; use `:focus-visible` styles; ensure aria-pressed for toggle controls.
  - Estimate: 0.75h, 1 SP
  - Dependencies: T012, T013
  - Success criteria: Keyboard-only flow can start/stop player and open detail view.
  - QA checklist:
    - [ ] Tab + Enter starts player (manual keyboard test)
    - [ ] Focus ring is visible and contrast acceptable

Checkpoint: US1 should be independently testable and deployable as MVP.

---

## Phase 4: User Story 2 - Browse Catalogue (Priority: P2)

Goal: Implement `/episodes` list with 20 items (10/page), client-side search, filters, sort and pagination controls.

Independent Test: Load `/episodes`, confirm dataset lists 20 items across pages and search/filters update the visible list.

### Tests (OPTIONAL / Recommended)
- [ ] T016 [P] [US2] Add integration test for episodes listing at `/tests/integration/episodes.test.tsx`
  - Goal: Smoke test that `/episodes` renders and client-side search filters results.
  - Files: `/tests/integration/episodes.test.tsx`
  - Implementation notes: Use Playwright or Jest + RTL to mount component and simulate search input.
  - Estimate: 1.5h, 2 SP
  - Dependencies: T010, T018
  - Success criteria: Integration test asserts that searching updates DOM results.
  - QA checklist:
    - [ ] Test asserts results count changes after search
    - [ ] Test asserts pagination shows correct numbers

### Implementation tasks (US2)

- [x] T017 [US2] Create `site/components/EpisodeCard.tsx` — file `/site/components/EpisodeCard.tsx`
  - Goal: Card used in list view with image, title, 2-line clamped description, tags, publishDate, duration, Play and View buttons.
  - Files: `/site/components/EpisodeCard.tsx`
  - Implementation notes: Ensure `alt` fallback for images and accessible buttons. Duration displayed in mm:ss or H:MM:SS. Use CSS line-clamp for description preview.
  - Estimate: 1.0h, 2 SP
  - Dependencies: T006, T009
  - Success criteria: EpisodeCard renders all required fields and supports Play action.
  - QA checklist:
    - [ ] Card shows title, publishDate, duration and a Play button
    - [ ] Description is truncated to max 2 lines on narrow screens

- [x] T018 [P] [US2] Create `site/components/SearchBar.tsx` and `site/components/FiltersPanel.tsx` — files `/site/components/SearchBar.tsx`, `/site/components/FiltersPanel.tsx`
  - Goal: Provide client-side search (title/description) and multi-select tag filters (OR logic).
  - Files: `/site/components/SearchBar.tsx`, `/site/components/FiltersPanel.tsx`
  - Implementation notes: Debounce search input (150–300ms), expose `onChange` callbacks. FiltersPanel lists unique tags (derived from `getAllEpisodes()`).
  - Estimate: 1.5h, 2 SP
  - Dependencies: T007, T017
  - Success criteria: Search input filters items client-side; selecting tags filters results accordingly.
  - QA checklist:
    - [ ] Typing in search updates visible list within 500ms locally
    - [ ] Selecting a tag filters items to those containing any selected tag

- [x] T019 [US2] Create `site/components/Pagination.tsx` — file `/site/components/Pagination.tsx`
  - Goal: Numeric pagination controls (previous, next, page numbers) with accessible labels.
  - Files: `/site/components/Pagination.tsx`
  - Implementation notes: Default page size 10; expose `onPageChange(pageNumber)` callback. Ensure ARIA for current page.
  - Estimate: 0.75h, 1 SP
  - Dependencies: T017
  - Success criteria: Pagination allows navigating pages and shows page numbers for 2 pages (20 items).
  - QA checklist:
    - [ ] Pagination indicates current page with aria-current
    - [ ] Clicking page number updates visible list

- [x] T020 [US2] Implement Episodes index page `/pages/episodes/index.tsx` with `getStaticProps` (SSG) and client-side hydration for search, filters, sort and pagination — file `/pages/episodes/index.tsx`
  - Goal: Provide an SSG page that passes full episodes array (or minimal metadata) to client; client handles search, filter, sort, paginate.
  - Files: `/pages/episodes/index.tsx`
  - Implementation notes: Option A from plan: pre-render first page and pass full dataset for client-side features. Use `getStaticProps` to call `getAllEpisodes()`.
  - Estimate: 2.0h, 3 SP
  - Dependencies: T007, T017, T018, T019
  - Success criteria: `/episodes` displays the full dataset with pagination working client-side.
  - QA checklist:
    - [ ] Page shows 20 episodes accessible across pages
    - [ ] Search + filter + sort operations update displayed items correctly

- [x] T021 [P] [US2] Accessibility touches: ensure FiltersPanel and Pagination are keyboard-only friendly and screen-reader announced changes — modify `/site/components/FiltersPanel.tsx`, `/site/components/Pagination.tsx`
  - Goal: Improve a11y: ARIA roles, live regions for filtered results count.
  - Files: `/site/components/FiltersPanel.tsx`, `/site/components/Pagination.tsx`, `/site/components/SearchBar.tsx`
  - Implementation notes: Use `aria-live="polite"` to announce result counts. Ensure buttons have aria-labels.
  - Estimate: 0.75h, 1 SP
  - Dependencies: T018, T019
  - Success criteria: Screenreader-friendly updates and keyboard operability.
  - QA checklist:
    - [ ] Filters can be toggled using keyboard only
    - [ ] Results count announced when filter/search changes (manual a11y check)

---

## Phase 5: User Story 3 - Learn & Support (Priority: P3)

Goal: Provide About and FAQ pages reachable from the top nav.

Independent Test: Nav contains About and FAQ; clicking them opens pages with spec-provided copy.

- [x] T022 [US3] Create `/pages/about.tsx` and `/pages/faq.tsx` with provided copy — files `/pages/about.tsx`, `/pages/faq.tsx`
  - Goal: Two static pages with the copy samples in spec.md (About paragraph, FAQ Q/As).
  - Files: `/pages/about.tsx`, `/pages/faq.tsx`
  - Implementation notes: Use `getStaticProps` only if necessary for metadata; otherwise static components are fine. Use `MetaHead` to set titles/descriptions.
  - Estimate: 0.75h, 1 SP
  - Dependencies: T009
  - Success criteria: Pages render and are reachable from nav.
  - QA checklist:
    - [x] Visiting `/about` shows the sample paragraph
    - [x] Visiting `/faq` shows listed Q/A pairs

- [x] T023 [US3] Add nav links and active state logic in `/site/components/Header.tsx`
  - Goal: Ensure Header includes and highlights About and FAQ links and supports mobile collapse.
  - Files: `/site/components/Header.tsx`
  - Implementation notes: If header already created in T009, modify to include active class; add a simple mobile nav toggle.
  - Estimate: 0.5h, 1 SP
  - Dependencies: T009, T022
  - Success criteria: Nav contains and highlights About and FAQ links.
  - QA checklist:
    - [x] Header shows About and FAQ links
    - [x] On mobile width, nav can collapse/expand (basic behavior)

- [x] T024 [US3] Add meta titles and descriptions for About/FAQ using `/site/components/MetaHead.tsx`
  - Goal: Ensure About and FAQ pages have unique `title` and `description`.
  - Files: `/pages/about.tsx`, `/pages/faq.tsx`, `/site/components/MetaHead.tsx`
  - Implementation notes: Use MetaHead props to render page-specific meta tags.
  - Estimate: 0.5h, 1 SP
  - Dependencies: T022, T009
  - Success criteria: Page head shows unique title/description for about and faq.
  - QA checklist:
    - [x] Page `title` differs between `/about` and `/faq`
    - [x] `meta[name="description"]` present on both pages

---

## Phase N: Episode Detail & Cross-Cutting Concerns (Detail pages, SEO, JSON-LD, accessibility)

Goal: Implement episode detail pages, JSON-LD, alt text fallbacks, QA and CI.

- [x] T025 [US1] Implement episode detail page `/pages/episodes/[slug].tsx` using `getStaticPaths` + `getStaticProps` and include JSON-LD structured data — file `/pages/episodes/[slug].tsx`
  - Goal: Static generation for all episode detail pages with full metadata and JSON-LD (PodcastEpisode / CreativeWork).
  - Files: `/pages/episodes/[slug].tsx`
  - Implementation notes: Use `getAllEpisodes()` to produce `paths`, `getEpisodeBySlug()` to pass props. Render `MetaHead` with JSON-LD script tag and `structuredData` prop or direct <script type="application/ld+json">.
  - Estimate: 2.0h, 3 SP
  - Dependencies: T007, T009
  - Success criteria: Each episode route builds and includes JSON-LD script with episode name, description, datePublished, duration, url, image.
  - QA checklist:
    - [x] `getStaticPaths` returns 20 slugs
    - [x] Visiting a detail page includes `<script type="application/ld+json">` with episode JSON-LD

- [x] T026 [P] Ensure all images have alt text fallback in components — modify `/site/components/EpisodeCard.tsx`, `/site/components/FeaturedCard.tsx`
  - Goal: Guarantee every `<img>` includes non-empty alt text; fallback to `Episode image: {title}` if `image` missing in data.
  - Files: `/site/components/EpisodeCard.tsx`, `/site/components/FeaturedCard.tsx`
  - Implementation notes: Centralize fallback logic in `lib/episodes.ts` or use helper `getAltText(episode)`.
  - Estimate: 0.5h, 1 SP
  - Dependencies: T012, T017
  - Success criteria: No image without alt in rendered DOM.
  - QA checklist:
    - [x] All images have `alt` attribute (scan DOM)
    - [x] Missing image uses `https://via.placeholder.com/1200x675` (plan fallback)

- [x] T027 [P] Add data validation quick-check to build step: small Node script `/scripts/validate-episodes.js` and npm script `validate:data`
  - Goal: Fail early if episodes file is missing required fields or has bad duration format.
  - Files: `/scripts/validate-episodes.js`, update `/package.json` scripts
  - Implementation notes: Use `ajv` (optional) or lightweight checks to assert required fields per `episode.schema.json`. Normalize duration and log rows with problems.
  - Estimate: 1.0h, 2 SP
  - Dependencies: T007
  - Success criteria: Running `npm run validate:data` prints pass/fail and non-zero exit code on validation errors.
  - QA checklist:
    - [x] `npm run validate:data` exits 0 on current dataset
    - [x] Introduce a broken item and script exits non-zero (manual test)

- [x] T028 Add Lighthouse smoke script and README entry `/scripts/lighthouse-smoke.sh` and update `/README.md`
  - Goal: Provide a quick local smoke step to run Lighthouse checks for SEO/Accessibility for key pages.
  - Files: `/scripts/lighthouse-smoke.sh`, `/README.md`
  - Implementation notes: Use `lhci` or `npx lighthouse` in basic form; this is optional but recommended in plan.
  - Estimate: 1.0h, 1 SP
  - Dependencies: T014, T020, T025
  - Success criteria: Script runs and produces report/exit codes.
  - QA checklist:
    - [x] Script runs locally and produces minimal report
    - [x] README explains usage `npm run dev` then `./scripts/lighthouse-smoke.sh http://localhost:3000`

- [x] T029 Add CI workflow to run `npm ci`, `npm run build`, `npm run test`, and validate data — file `.github/workflows/ci.yml`
  - Goal: Provide basic CI to prevent regressions.
  - Files: `.github/workflows/ci.yml`
  - Implementation notes: GitHub Actions job that checks out code, installs Node, runs `npm ci`, `npm run validate:data`, `npm run build`, `npm run test`.
  - Estimate: 1.5h, 2 SP
  - Dependencies: T001, T002, T027
  - Success criteria: Workflow triggers on PR and runs steps successfully in green branch.
  - QA checklist:
    - [x] Workflow file present in `.github/workflows/`
    - [x] Sample run (or dry-run) shows build/test steps configured

---

## Final Phase: Polish & Cross-Cutting Concerns

Purpose: Final touches, documentation, performance, and handoff readiness.

- [x] T030 [P] Write short README section and `site/quickstart.md` documenting dev steps and feature constraints — file `/site/quickstart.md`, update `/README.md`
  - Goal: Provide reproducible setup steps referenced in plan.
  - Files: `/site/quickstart.md`, `/README.md`
  - Implementation notes: Include commands: `npm install`, `npm run dev`, `npm run build`, `npm run validate:data`, and local test instructions.
  - Estimate: 0.75h, 1 SP
  - Dependencies: T001, T029
  - Success criteria: README includes clear dev/run/build instructions.
  - QA checklist:
    - [x] README commands are copy/pastable
    - [x] Quickstart explains where to find episodes.json and how to run validation

- [x] T031 [P] Run a11y & unit test sweep and fix any high-priority accessibility issues — modify components as needed
  - Goal: Run jest + axe checks and address critical a11y failures (focus/labels).
  - Files: `/tests/*`, `/site/components/*`
  - Implementation notes: Run `npm test` and fix issues; prefer small, focused fixes rather than heavy refactors.
  - Estimate: 2.0h, 3 SP
  - Dependencies: T010, T011, T016, T021
  - Success criteria: No high-severity axe violations in core pages.
  - QA checklist:
    - [x] Unit-level axe checks pass for FeaturedCard and EpisodeCard
    - [x] Keyboard flows tested manually and recorded

---

## Dependencies & Execution Order

Phase Dependencies:
- Phase 1 (Setup) tasks T001–T005: can start immediately.
- Phase 2 (Foundational) tasks T006–T010: depends on Setup completion (T001–T005); Foundational blocks User Stories.
- Phase 3 (US1 - MVP) tasks T011–T015: depend on Foundational (T006–T010).
- Phase 4 (US2) tasks T016–T021: depend on Foundational; some tasks depend on US1 components for Player integration.
- Phase 5 (US3) tasks T022–T024: depend on Foundational (T009) and Setup.
- Detail & Cross-Cutting (T025–T029): depend on Foundational and relevant story components (US1, US2).
- Polish (T030–T031): final cross-cutting tasks depend on most earlier tasks.

User story completion order (suggested):
- MVP: T012 → T013 → T014 → T015 (US1)
- Next: T017 → T018 → T019 → T020 (US2)
- Then: T022 → T023 → T024 (US3)
- Finalize: T025 → T026 → T027 → T028 → T029 → T030 → T031

Parallel opportunities (examples):
- While T007 (data loader) is being written, another developer can implement T009 (Layout/Header/Footer) in parallel, both are [P] marked.
- Component work within a story: T012 (FeaturedCard) and T013 (Player) can be done in parallel by different devs (T013 marked [P]).
- Tests (T011, T016) can be written in parallel to implementation tasks if the developer prefers TDD.

Parallel execution example per story:
- US1 parallel example:
  - Developer A: T012 Create FeaturedCard
  - Developer B: T013 Create Player
  - Developer C: T014 Implement landing page wiring + T015 keyboard/a11y finishing
- US2 parallel example:
  - Developer A: T017 EpisodeCard
  - Developer B: T018 Search & Filters
  - Developer C: T019 Pagination + T020 Episodes page wiring

## Implementation strategy (MVP first, incremental delivery)
- MVP scope: Complete Phase 1 + Phase 2 + Phase 3 (User Story 1) and stop — this yields a statically generated landing page with a featured episode and working mock player.
- Incremental approach:
  1. Setup (T001–T005) and Foundational (T006–T010).
  2. Implement US1 (T012–T015) and validate (T011).
  3. Deliver US2 features (T017–T021).
  4. Add US3 (T022–T024).
  5. Add details, JSON-LD (T025) and CI (T029), polish (T031).

## Underspecified / Clarification notes (short)
- Duration format: `site/data/episodes.json` uses "HH:MM:SS" strings while `episode.schema.json` expects a numeric `duration` (seconds). T007 includes normalization, and T027/T027 script will validate. Confirm canonical format with the team.
- Hosting of audio files: plan assumes external audio URLs; confirm if audio should be hosted in repo/public for offline dev.
- Image hosting preference: plan allows remote placeholder images; confirm whether to add local images to `/public/images/episodes/` for build determinism.
- Tests: spec recommends tests; confirm whether team wants TDD-first (write tests before implementation) or to add tests after implementation.

---

Summary & Deliverables
- Generated file content (this document) is the tasks.md content for the feature `Episodes Showcase`.
- Total tasks listed: 31 (IDs T001 → T031).
  - Setup tasks (Phase 1): 5 (T001–T005)
  - Foundational tasks (Phase 2): 5 (T006–T010)
  - US1 tasks (Phase 3): 5 (T011–T015) — includes tests
  - US2 tasks (Phase 4): 6 (T016–T021) — includes tests
  - US3 tasks (Phase 5): 3 (T022–T024)
  - Detail & Cross-cutting tasks: 5 (T025–T029)
  - Final polish & docs: 2 (T030–T031)
- Task count per user story:
  - US1 (Discover & Play): 5 tasks (T011–T015)
  - US2 (Browse Catalogue): 6 tasks (T016–T021)
  - US3 (Learn & Support): 3 tasks (T022–T024)
- Parallel opportunities identified: Many; components, tests, and tooling tasks are marked [P] where safe to parallelize.
- Independent test criteria for each story:
  - US1: Visiting `/` shows exactly one featured card; Play toggles inline player (visual + DOM).
  - US2: `/episodes` shows 20 items across pages; search & filters update visible list.
  - US3: Header contains About & FAQ links; pages render content matching spec.
- Suggested MVP scope: Complete Setup + Foundational + User Story 1 (T001–T015). This produces the deliverable described as MVP in plan.md.

Format validation
- All tasks follow the strict checklist line prefix format:
  - Each task line starts with `- [ ]`, has a Task ID (T001...), optional `[P]` marker for parallelizable tasks, and for user story tasks includes `[US1]`, `[US2]`, or `[US3]`, and a short description that includes at least one file path.

Next steps I can take (if you'd like me to continue)
- Create `site/tasks.md` file in the repository with this content (I can add it directly).
- Implement small starter files (e.g., `lib/episodes.ts` normalization helper) and run a quick local smoke to validate the dataset.
- Generate skeleton component files for `FeaturedCard` and `Player` as a minimal runnable prototype.

If you want, I can now write this `site/tasks.md` into the repo, create the first few skeleton files (data loader + FeaturedCard + Landing page stub), and run basic validations (typecheck/tests). Which of those would you like me to do next?

