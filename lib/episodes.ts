import { Episode } from '@/types/episode';
import { parseDurationString } from './duration';

/**
 * Get the episodes data with normalized fields
 * This function is only called in getStaticProps/getStaticPaths on the server
 * @returns Array of normalized episodes
 */
export function getAllEpisodes(): Episode[] {
  if (typeof window !== 'undefined') {
    throw new Error('getAllEpisodes can only be called on the server');
  }

  const path = require('path');
  const fs = require('fs');

  const filePath = path.resolve(process.cwd(), 'site/data/episodes.json');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const episodes = JSON.parse(fileContent) as Array<any>;

  // Normalize episodes
  const normalized = episodes.map((ep) => ({
    ...ep,
    duration: typeof ep.duration === 'string' ? parseDurationString(ep.duration) : ep.duration,
  }));

  return normalized;
}

/**
 * Get a single episode by slug
 * @param slug Episode slug
 * @returns Episode or null
 */
export function getEpisodeBySlug(slug: string): Episode | null {
  const episodes = getAllEpisodes();
  return episodes.find((ep) => ep.slug === slug) || null;
}

/**
 * Get the featured episode (or newest if multiple marked featured)
 * @returns Featured episode or first episode if none marked
 */
export function getFeaturedEpisode(): Episode | null {
  const episodes = getAllEpisodes();

  // Find featured episodes
  const featured = episodes.filter((ep) => ep.featured);

  if (featured.length > 0) {
    // Return newest featured episode by publish date
    return featured.sort((a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    )[0];
  }

  // Fallback to first episode if none marked featured
  return episodes[0] || null;
}

/**
 * Get all unique tags from episodes
 * @returns Array of unique tags
 */
export function getAllTags(): string[] {
  const episodes = getAllEpisodes();
  const tagsSet = new Set<string>();

  episodes.forEach((ep) => {
    if (ep.tags && Array.isArray(ep.tags)) {
      ep.tags.forEach((tag) => tagsSet.add(tag));
    }
  });

  return Array.from(tagsSet).sort();
}

