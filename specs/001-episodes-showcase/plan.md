# Episodes Showcase — Implementation Plan

Path: /Users/dani/IdeaProjects/workshop-spec-kit/specs/001-episodes-showcase/plan.md

Summary
-------
This document describes a practical, implementable plan to build a static Next.js site that showcases 20 mocked episodes stored at `/site/data/episodes.json`. The site is static-first (SSG) with client-side hydration for search, filters, and playback. The Pages Router is recommended for clarity and stable SSG APIs (getStaticProps/getStaticPaths). Design is mobile-first and accessible.

Technical context
-----------------
- Framework: Next.js (latest stable release as of implementation time). Prefer Pages Router for predictable SSG behavior and wide team familiarity.
- Styling: Tailwind CSS (recommended) or CSS Modules as a fallback. Tailwind is recommended for speed and responsive utilities with minimal custom CSS.
- Data: Canonical mock dataset at absolute path `/Users/dani/IdeaProjects/workshop-spec-kit/site/data/episodes.json`. No external APIs or databases.
- Hosting: Vercel (recommended) for direct Next.js SSG support. Netlify also supported. GitHub Pages possible with `next export` but has limitations around dynamic routes — see notes below.

Constitution check
------------------
This plan follows the repository Constitution (/.specify/memory/constitution.md):
- Minimal deliverables: Static pages, build command, and assets documented in README (planned). ✅
- Page basics: meta tags, semantic HTML, alt text, responsive layout, and performance considerations included. ✅
- Build & deploy: single build command, artifacts suitable for Vercel/Netlify. ✅
- Quality checks: recommend lint/build/test steps in CI. ✅

Gates: Any deviation from static-first must be justified. This plan keeps pages SSG and client-side for interaction.

Architecture overview
---------------------
- App shell (static): Header (logo + nav), Footer, Site metadata.
- Pages (SSG):
  - `/` (Landing) — getStaticProps selects one featured episode from data (tie-breaker newest publishDate) and includes site-level meta.
  - `/episodes` (Episodes index) — getStaticProps reads episodes.json, builds paginated pages (10 items/page) via optional pagination query or static pages (see Routing & SSG recipe). Client-side hydration adds search/filter/sort controls.
  - `/episodes/[slug]` (Episode detail) — getStaticPaths + getStaticProps generate pages for all episodes with JSON-LD in the head.
  - `/about`, `/faq` — simple static pages with copy from spec.
- Components: small, testable components (EpisodeCard, FeaturedCard, Player, SearchBar, Filters, Pagination, Layout, MetaHead).

Chosen Next.js approach (Pages Router)
-------------------------------------
Decision: Use Next.js Pages Router (pages/*.tsx) with getStaticProps and getStaticPaths.
Rationale:
- Pages Router provides explicit, familiar SSG lifecycle (getStaticProps/getStaticPaths).
- Simpler for teams and stable for static-only sites and SSG hosting.
- App Router offers server components and streaming but adds complexity; not necessary for this static showcase.

Data strategy
-------------
- Canonical source: `/site/data/episodes.json` (relative to repo root). The build will import or read this file in getStaticProps/getStaticPaths.
- Consumption options in getStaticProps:
  - Node fs read (fs.readFileSync + JSON.parse) using absolute path (path.resolve(process.cwd(), 'site/data/episodes.json')). This is robust for SSG and won't be bundled to client.
  - Alternatively, import the JSON (import episodes from '...') — acceptable, but reading via fs guarantees clarity about server-only code.
- Images: referenced URLs in data; stored remotely or as placeholder. Local images may be put under `/public/images/episodes/` and referenced by path in episodes.json if desired.
- Audio: `audioUrl` field used by mock player; not required to be hosted in repo.

Routing & SSG recipe
--------------------
Files (absolute paths):
- /pages/index.tsx — Landing
- /pages/episodes/index.tsx — Episodes index (handles query params for page number), built with getStaticProps that returns full episodes list; pagination implemented client-side or pre-rendered for page 1 with client-side pagination controls. (see options below)
- /pages/episodes/page/[page].tsx (optional) — Pre-render pages for pagination (1..2) if you prefer static paged routes.
- /pages/episodes/[slug].tsx — Episode detail with getStaticPaths (reads episodes.json to map slugs) and getStaticProps for episode data.

SSG patterns and recommendations:
- For simplicity, statically generate all episode detail pages via getStaticPaths at build time (there are only 20 items).
- For the episodes list, two acceptable options:
  - Option A (recommended): Pre-render the first page `/episodes` with the full episodes array in props; client-side components perform pagination, search, filter, and sort. This keeps routing simple and supports search/filter without additional SSG pages. Ensure SEO-friendly canonical links if using query params.
  - Option B: Pre-render paginated index pages as `/episodes/page/1`, `/episodes/page/2`. Use getStaticPaths to create these pages (2 pages for 20 items). Client-side hydration for search/filter will still work but you must merge client-side results with routing for page numbers.
- Use getStaticProps only; no server-side rendering. Use fallback: false for getStaticPaths (all slugs known at build-time).
- Add <link rel="canonical"> tags and per-page meta in a shared `MetaHead` component.

Component hierarchy
-------------------
Proposed components (path suggestions):
- /site/components/Layout.tsx — props: { children, meta }
- /site/components/MetaHead.tsx — props: { title, description, image, url, jsonLd? }
- /site/components/Header.tsx — props: { currentPath }
- /site/components/Footer.tsx — props: none
- /site/components/Hero.tsx — props: { heading, subheading, featuredEpisode }
- /site/components/FeaturedCard.tsx — props: { episode, onPlay }
- /site/components/EpisodeCard.tsx — props: { episode, onPlay }
- /site/components/EpisodeList.tsx — props: { episodes, onPlay }
- /site/components/Player.tsx — props: { audioUrl, title, onClose }
- /site/components/SearchBar.tsx — props: { value, onChange, placeholder }
- /site/components/FiltersPanel.tsx — props: { tags, selectedTags, onToggleTag, sortBy }
- /site/components/Pagination.tsx — props: { currentPage, totalPages, onPageChange }

Design system and styles
------------------------
- Recommendation: Tailwind CSS for a minimal dependency set and fast responsive work. It provides utilities for mobile-first breakpoints and reduces CSS file bloat when purging in production.
- Tokens file: /site/styles/tokens.ts (or tailwind.config.js theme) containing colors, spacing scale, and typography.
- Accessibility: Use semantic HTML (header, main, nav, footer, buttons). Ensure focus outlines, keyboard-accessible controls, and aria attributes on interactive controls.
- Mobile-first breakpoints: base (mobile) -> md (tablet: 768px) -> lg (desktop: 1024px) -> xl (1440px).
- Motion: Use Tailwind transitions; respect prefers-reduced-motion (use CSS media query to disable animations).
- Glassmorphism: apply backdrop-filter and translucent backgrounds on the featured card but provide solid fallback (no blur) for browsers that don't support backdrop-filter.

Accessibility and QA checks
---------------------------
- Alt text: All images must include alt text. If missing in data, use fallback: `Episode image: {title}`.
- Keyboard navigation: Ensure all buttons and links are in tab order and can be activated by Enter/Space.
- ARIA: Player controls need aria-labels and role="region" with accessible name.
- Contrast: Verify color contrast meets WCAG AA (use tokens that comply).
- prefers-reduced-motion: no non-essential animations when user preference is set.
- Tests:
  - Unit tests for components (Jest + React Testing Library): EpisodeCard, Player, Filters.
  - Accessibility tests: axe-core in unit tests.
  - E2E smoke: Playwright test that visits /, /episodes, and a detail page to confirm page loads and Play button works.

Testing strategy
----------------
- Unit tests: Jest + React Testing Library. Keep tests minimal but cover key interactions: Play toggle, search/filter client-side behavior, pagination controls.
- Accessibility (a11y): axe + jest-axe for component-level checks; add one integration axe run in E2E.
- E2E: Playwright (recommended) or Cypress for a small smoke suite: Landing hero presence, Episodes list 20 items and pagination, Episode detail JSON-LD presence.
- Performance: optional Lighthouse CI for key pages in CI (consider using lhci or GitHub Action).

CI / Build / Deploy notes
-------------------------
- Build scripts (package.json):
  - "dev": "next dev"
  - "build": "next build"
  - "start": "next start"
  - "lint": "next lint" (if lint config added)
  - "test": "jest"
- Recommended CI: GitHub Actions job that checks out code, installs dependencies, runs lint, tests, and build. Optional step: run a small Lighthouse check.
- Hosting: Vercel recommended for easiest setup — SSG pages will be deployed as static assets. Netlify also supported. For GitHub Pages, advise using `next export` and confirm all routes are exported (dynamic paths must be listed). Document limitations.

SEO & Social
------------
- Each page must include meta title and meta description (unique on detail pages). Use `MetaHead` component to centralize tags (OG, Twitter, canonical, structured data script tag with JSON-LD for episodes).
- Featured episode on landing: include OG tags and open graph image.

Edge cases & mitigation
----------------------
- Multiple featured items: Landing picks newest by publishDate.
- Missing image: fallback to https://via.placeholder.com/1200x675 and alt text fallback.
- Missing audioUrl or unreachable audio: Player shows an error state and Download link if audioUrl present; otherwise hide Play and show "Audio not available".
- Long text: truncate card descriptions to 2 lines (CSS line-clamp) and show full description on detail page.
- Pagination vs infinite scroll: pagination is required (FR-005). Infinite scroll may be a later enhancement.

Component list and data shapes
------------------------------
Episode shape (canonical):
- id: string
- title: string
- description: string
- image?: string
- publishDate: string (ISO 8601)
- duration: number (seconds)
- tags: string[]
- transcript?: string
- audioUrl?: string
- slug: string
- featured?: boolean

Component props (summary):
- FeaturedCardProps: { episode: Episode, onPlay: (episodeId: string) => void }
- EpisodeCardProps: { episode: Episode, onPlay: (episodeId: string) => void }
- EpisodeListProps: { episodes: Episode[], onPlay: (episodeId: string) => void }
- PlayerProps: { audioUrl?: string, title: string, onClose?: () => void }
- SearchBarProps: { value: string, onChange: (v: string) => void }
- FiltersPanelProps: { tags: string[], selected: string[], onToggle: (tag: string) => void }
- PaginationProps: { currentPage: number, totalPages: number, onChange: (page: number) => void }

JSON Schema for episodes
------------------------
File: specs/001-episodes-showcase/episode.schema.json (developer artifact)

{ "type": "object", "properties": { "id": {"type":"string"}, "title": {"type":"string"}, "description": {"type":"string"}, "image": {"type":"string","format":"uri"}, "publishDate": {"type":"string","format":"date-time"}, "duration": {"type":"number"}, "tags": {"type":"array","items":{"type":"string"}}, "transcript": {"type":"string"}, "audioUrl": {"type":"string","format":"uri"}, "slug": {"type":"string"}, "featured": {"type":"boolean"} }, "required":["id","title","description","publishDate","duration","tags","slug"] }

Acceptance criteria mapping
---------------------------
- FR-001 / SC-001: Landing displays exactly one featured episode — implement logic in pages/index.tsx and test.
- FR-002 / SC-002: Episodes page reads `site/data/episodes.json` and shows 20 items — tests load file and count items.
- FR-003/FR-004: Client-side search and tag filters functional and respond within 500ms locally — unit tests and optional performance measurement.
- FR-005: Pagination implemented with 10 items per page and numeric controls.
- FR-006: Play controls exist on cards and open mock player (keyboard accessible).
- FR-007 / SC-004: About and FAQ pages reachable from nav.
- FR-008 / SC-006: All images have alt text and pages have meta tags; MetaHead component used.
- FR-009: Episode detail pages include JSON-LD structured data.

Developer setup & run (minimal)
-------------------------------
Recommended steps (absolute paths):
1. Install dependencies

```bash
cd /Users/dani/IdeaProjects/workshop-spec-kit
npm install
```

2. Local dev

```bash
npm run dev
# opens http://localhost:3000
```

3. Build

```bash
npm run build
npm run start
```

PR checklist (short)
--------------------
- [ ] The PR description references `specs/001-episodes-showcase/spec.md` and this plan.
- [ ] Run `npm run build` and confirm no errors.
- [ ] Unit tests added/updated for new components and run `npm test`.
- [ ] Accessibility: run axe on affected pages/components and document results.
- [ ] Linting: run `npm run lint` (if configured).
- [ ] Storybook (optional): include snapshots or components if present.

Files to add/modify (implementation guidance)
---------------------------------------------
- site/data/episodes.json (existing canonical dataset) — read-only source.
- pages/_app.tsx — global styles and Tailwind provider.
- pages/index.tsx — landing page.
- pages/episodes/index.tsx — episodes index.
- pages/episodes/[slug].tsx — episode detail.
- components/* under /site/components or /components (developer choice).
- styles/tokens.ts or tailwind.config.js — design tokens.
- jest.config.js, playwright.config.ts — optional test tooling.
- .github/workflows/ci.yml — CI build/test workflow.

Next steps (Phase 0 → Phase 1 handoff)
-------------------------------------
- Confirm the choice of Pages Router (if team prefers App Router, note differences)
- Decide pagination approach: client-side with one pre-rendered page (Option A) or pre-rendered paged routes (Option B). This plan recommends Option A for simplicity.
- Create initial components and pages scaffolding and wire to `site/data/episodes.json`.


"Done" criteria for this plan
----------------------------
- `specs/001-episodes-showcase/plan.md` and `specs/001-episodes-showcase/tasks.md` exist and map to files for implementation. (This file + tasks file)
- All NEEDS CLARIFICATION items in the Technical Context resolved (Pages Router & Tailwind choices documented).


<!-- End of plan.md -->

