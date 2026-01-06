# Episodes Showcase

A modern, static Next.js site showcasing a curated collection of podcast episodes. Built with TypeScript, Tailwind CSS, and optimized for SEO and accessibility.

## Features

- **Static Site Generation (SSG)** - Fast, secure, and SEO-friendly pages
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Full-Text Search** - Client-side search and filtering capabilities
- **Pagination** - Navigate through episodes with intuitive pagination
- **Accessibility** - WCAG AA compliant with keyboard navigation and screen reader support
- **JSON-LD Structured Data** - Rich snippets for search engines
- **Audio Player** - Built-in player with time tracking
- **TypeScript** - Type-safe code for better reliability

## Tech Stack

- **Framework**: Next.js 14+ (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest + React Testing Library
- **Hosting**: Vercel or any static hosting (Netlify, GitHub Pages, etc.)

## Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd workshop-spec-kit

# Install dependencies
npm install

# Validate the episodes data
npm run validate:data

# Start the development server
npm run dev
```

Visit http://localhost:3000 in your browser.

## Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Production
npm run build            # Build for production
npm start                # Start production server

# Quality & Validation
npm run lint             # Run ESLint
npm run test             # Run Jest tests
npm run validate:data    # Validate episodes.json against schema

# Performance
./scripts/lighthouse-smoke.sh [URL]  # Run Lighthouse tests (e.g., http://localhost:3000)
```

## Project Structure

```
.
├── pages/                    # Next.js pages
│   ├── _app.tsx             # App wrapper
│   ├── index.tsx            # Home page
│   ├── about.tsx            # About page
│   ├── faq.tsx              # FAQ page
│   └── episodes/
│       ├── index.tsx        # Episodes list
│       └── [slug].tsx       # Episode detail
├── site/
│   ├── components/          # React components
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MetaHead.tsx
│   │   ├── FeaturedCard.tsx
│   │   ├── EpisodeCard.tsx
│   │   ├── Player.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FiltersPanel.tsx
│   │   └── Pagination.tsx
│   ├── data/
│   │   └── episodes.json    # Episode data
│   └── styles/
│       ├── globals.css      # Global styles
│       └── tokens.ts        # Design tokens
├── lib/                     # Utilities and helpers
│   ├── episodes.ts          # Data loading & normalization
│   └── duration.ts          # Duration formatting
├── types/
│   └── episode.ts           # TypeScript types
└── tests/                   # Test files
```

## Data Format

Episodes are stored in `site/data/episodes.json`. Each episode should follow this structure:

```json
{
  "id": "ep-001",
  "title": "Episode Title",
  "description": "A brief description of the episode.",
  "image": "https://example.com/image.jpg",
  "publishDate": "2024-01-15",
  "duration": "00:45:30",
  "tags": ["tag1", "tag2"],
  "slug": "episode-slug",
  "featured": true,
  "audioUrl": "https://example.com/audio.mp3",
  "transcript": "Optional episode transcript"
}
```

The `duration` field is automatically normalized to seconds during the build.

## Deployment

### Vercel (Recommended)

```bash
# Connect your repository and auto-deploy
# https://vercel.com/docs/concepts/deployments/git
```

### Netlify

```bash
# Build command: npm run build
# Publish directory: .next/out (requires next export)
```

### GitHub Pages

```bash
# Build and export as static site
npm run build
```

## Accessibility

All pages are designed with accessibility in mind:

- ✅ Semantic HTML
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus indicators
- ✅ Alt text for images
- ✅ ARIA labels and roles
- ✅ Sufficient color contrast

## Performance

- **Static Generation**: Pages are pre-rendered at build time
- **Image Optimization**: Automatic image optimization with next/image
- **Code Splitting**: Automatic code splitting for faster load times
- **ISR**: Incremental Static Regeneration for dynamic content updates

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting: `npm run test && npm run lint`
4. Open a pull request

## SEO

All pages include:

- Meta titles and descriptions
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- JSON-LD structured data (PodcastEpisode)
- Sitemap (via Next.js)
- RSS feeds (can be added)

## License

See LICENSE file for details.

