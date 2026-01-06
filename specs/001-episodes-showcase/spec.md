# Episodes Showcase — Feature Specification

**Feature Branch**: `001-episodes-showcase`  
**Created**: 2026-01-06  
**Status**: Draft  
**Input**: Create a modern, sleek website to showcase a series of episodes (mock data only).

## User Scenarios & Testing (mandatory)

### P1 — Discover & Play (Primary)
As a new visitor, I land on the homepage, see a prominent hero and a featured episode, and can play the episode inline or navigate to its detail page.

Independent test: Open `/`, confirm a featured episode card with image/title/blurb and Play CTA that starts the mock audio player.

Acceptance scenarios:
1. Given the landing page, when the page loads, then the featured episode (featured: true) is shown with image, title, publish date, duration and Play CTA.
2. Given user activates Play (keyboard or mouse), when play is triggered, then audio starts and play state is visible.

---

### P2 — Browse Catalogue
As an interested visitor, I open the Episodes page, can see 20 mocked episodes, search, filter by tag, sort and page through the list.

Independent test: Load `/episodes`, confirm 20 items from `site/data/episodes.json` are listed across pages (10/page), search, filter and sort update the visible results.

Acceptance scenarios:
1. Given the episodes page, when I search by title, then results are filtered client-side.
2. Given tag filters, when I select a tag, then episodes matching any selected tag are shown.
3. Given sort by newest, when selected, then episodes are ordered by publishDate descending.

---

### P3 — Learn & Support
As a visitor, I can open About and FAQ pages from the top nav to learn the purpose and find common answers.

Independent test: Open nav, click About and FAQ, confirm provided copy matches spec samples.

## Edge Cases

- Multiple items marked `featured: true`: landing page selects the most recent by publishDate.
- Missing image: fall back to `https://via.placeholder.com/1200x675` and include alt text "Episode image: {title}".
- audioUrl unreachable: player shows graceful error and a Download link to the audio URL.

## Requirements (mandatory)

### Functional Requirements (testable)
- FR-001: Landing page MUST display exactly one featured episode selected from data where `featured: true` (tie-breaker: newest publishDate).
- FR-002: Episodes page MUST load episodes from `site/data/episodes.json` and present 20 mocked items.
- FR-003: Users MUST be able to search (title, description) with client-side filtering.
- FR-004: Users MUST be able to filter by tags (multi-select) and sort by publishDate and duration.
- FR-005: System MUST provide pagination (10 per page) and controls to navigate pages.
- FR-006: Each episode card MUST provide Play and View Details actions; Play uses `audioUrl` mock.
- FR-007: About and FAQ pages MUST be reachable from primary navigation.
- FR-008: All images MUST have alt text; pages MUST include meta title and meta description.
- FR-009: Episode detail pages (if implemented) MUST include JSON-LD structured data for episode schema.

### Key Entities
- Episode: { id, title, description, image, publishDate, duration, tags[], transcript?, audioUrl, slug, featured }

## Success Criteria (mandatory)

- SC-001: Landing page shows featured episode with image, title, blurb and a visible Play CTA (verifiable by visual check and DOM presence).
- SC-002: Episodes page lists 20 mocked episodes from `site/data/episodes.json` and supports pagination with 10 items per page.
- SC-003: Search returns relevant results within 500ms on a local machine for the provided dataset.
- SC-004: About and FAQ pages are accessible from navigation and contain the specified content samples.
- SC-005: Keyboard-only navigation can reach and activate Play/View Details and pagination controls.
- SC-006: All pages include descriptive meta title and meta description; detail pages include JSON-LD.
- SC-007: Basic Lighthouse checks (Accessibility >= 90, SEO >= 90) on a local run with mocked assets.

## UX & Content Requirements

- Header: logo left, primary nav (Home / Episodes / About / FAQ), search icon/field.
- Hero (landing): large image or gradient background; prominent title; featured episode card (glass or card overlay) with image, title, 1–2 line blurb, publish date, duration, Play and View buttons.
- Episode list: card view with image, title, 2-line description, tags, publishDate, duration, Play icon. Desktop: grid (2–3 cols). Mobile: single-column list.
- Filters & Sort: visible on desktop as side rail or top bar; on mobile as collapsible panel.
- Accessibility: semantic HTML landmarks, ARIA labels where needed, alt text for images, color contrast meeting WCAG AA, focus outlines, respects prefers-reduced-motion.
- SEO: unique titles/meta descriptions per page; canonical links on detail pages; shareable OG/Twitter tags.
- Structured Data: JSON-LD using PodcastEpisode or CreativeWork schema on detail pages (include name, description, datePublished, duration, url, image, transcript if present).

## Visual / Style Guidance

- Tone: modern, sleek, slightly bold, generous whitespace.
- Palette: Primary #0A2540 (deep navy), Accent #FF6B6B (coral), Accent-2 #7C5CFF (purple), Surface #FFFFFF / rgba(255,255,255,0.88), Neutral bg #F5F7FA.
- Typography: Headings — geometric sans (Inter/Manrope), Body — Inter/Roboto at 16px base.
- Spacing: 8px scale; hero padding 64–96px desktop.
- Motion: microinteractions (hover lift, fade in lists), short duration (120–200ms). Honor prefers-reduced-motion.
- Distinctive elements: glassmorphism featured card (backdrop blur + translucent surface), bold hero image with gradient overlay, subtle parallax on hero background optionally.

## Interaction & Behaviors

- Featured episode selection: the data flag `featured: true` chooses it; on multiple true values pick latest publishDate.
- Playback: clicking Play toggles the inline mock player; player shows current time / duration and supports keyboard controls.
- Pagination: default pagination with page size 10 and numeric page controls; optional infinite scroll flagged as an enhancement.
- Search & Filters: real-time client-side filtering; tag filters apply OR logic.
- Links: View Details navigates to `/episodes/:slug` (if implemented) with full metadata and JSON-LD.

## Technical Notes

- Data: mock data only, stored at `site/data/episodes.json` (20 items). No external feeds.
- Static-first: pages must be renderable statically; client-side hydration for interactivity.
- Recommended paths: `site/specs/episodes.spec.md`, `site/data/episodes.json`, `site/components/*`, `site/pages/*`.
- Stack guidance: keep stack-agnostic; suggested options: Next.js, Astro, Vite + SSG.

## Non-functional Requirements

- Performance: target FCP < 1.5s on simulated mobile 3G with optimized images; JS bundle ideally <200KB for MVP.
- Accessibility: meet WCAG 2.1 AA color contrast and keyboard navigation.
- SEO: descriptive meta tags, clean canonical URLs, and JSON-LD for content indexing.
- Internationalization: structure strings for translation; use ISO dates in data.

## Assumptions

1. Images are remote placeholders (e.g., `https://via.placeholder.com/1200x675?text=Episode+01`).
2. Audio files are mocked with example URLs `https://example.com/audio/ep-01.mp3` and do not require hosting in the repo.

## Deliverables & File Paths

- Primary spec (this file): `specs/001-episodes-showcase/spec.md` (created by script)
- Public-facing spec copy: `site/specs/episodes.spec.md`
- Mock data: `site/data/episodes.json` (20 mocked items)
- Tasks: `site/tasks.md`
- Suggested extras: `site/plan.md`, `site/components/*`, `site/pages/*`

## Acceptance Checklist (handoff-ready)

- [ ] Landing shows featured episode with image/title/blurb/Play CTA (FR-001 / SC-001)
- [ ] Episodes page lists 20 mocked episodes from `site/data/episodes.json` and pagination works (FR-002 / SC-002)
- [ ] Search, tag filters and sorting behave as specified (FR-003/FR-004)
- [ ] About and FAQ pages linked from nav with provided content (FR-007 / SC-004)
- [ ] All images have alt text; pages include meta title and description (FR-008 / SC-006)
- [ ] Keyboard navigation and focus states are functional (FR-006 / SC-005)
- [ ] JSON-LD included on detail pages (FR-009)
- [ ] Basic Lighthouse checks show Accessibility >= 90 and SEO >= 90 (SC-007)

## Mock content samples

Landing hero:
- Heading: "Stories That Stay With You"
- Subhead: "New weekly episodes — insightful conversations, crisp storytelling."
- Featured episode:
  - Title: "The First Signal"
  - Blurb: "A short, thrilling introduction to the series — why it matters, who it’s for, and what you’ll learn in 28 minutes."
  - CTAs: Play • View Episode

About (one paragraph):
We produce concise, interview-driven episodes that dig into ideas shaping our world. Each episode pairs expert guests with immersive storytelling to deliver practical insight and memorable narratives. Our mission is to make complex ideas approachable and useful for curious listeners.

FAQ examples:
- Q: How often are new episodes released?  
  A: New episodes are released weekly (every Thursday).
- Q: Can I download episodes?  
  A: Yes — each episode includes a download link to the audio file on its detail page.
- Q: Do you provide transcripts?  
  A: Transcripts are included when available and are optional in the mock data.

## Handoff Notes

- Add `site/data/episodes.json` (mocked dataset) and wire components to read from that file.
- Prioritize static render of pages, then add client-side search and player.
- Provide a brief design tokens file (colors, type, spacing) for handoff to engineering.

---

*Spec created 2026-01-06 — ready for `/speckit.plan` or `/speckit.clarify`.*
