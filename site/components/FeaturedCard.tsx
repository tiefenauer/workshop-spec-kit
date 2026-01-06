import React from 'react';
import { Episode } from '@/types/episode';
import { formatDuration } from '@/lib/duration';

interface FeaturedCardProps {
  episode: Episode;
  onPlay?: () => void;
}

export default function FeaturedCard({ episode, onPlay }: FeaturedCardProps) {
  const handlePlayClick = () => {
    onPlay?.();
  };

  const handlePlayKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePlayClick();
    }
  };

  const imageSrc = episode.image || 'https://via.placeholder.com/1200x675';
  const altText = episode.image
    ? `Featured episode: ${episode.title}`
    : `Episode image: ${episode.title}`;

  const durationSeconds = typeof episode.duration === 'string'
    ? parseInt(episode.duration, 10)
    : episode.duration;

  return (
    <article className="featured-card group relative overflow-hidden rounded-lg bg-gradient-to-br from-primary to-secondary shadow-xl">
      {/* Image background with overlay */}
      <div className="relative aspect-video w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={altText}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        {/* Tags */}
        {episode.tags && episode.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {episode.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-accent bg-opacity-80 px-3 py-1 text-xs font-semibold text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
          {episode.title}
        </h2>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-gray-100 md:text-base">
          {episode.description}
        </p>

        {/* Meta info */}
        <div className="mb-6 flex items-center gap-4 text-sm text-gray-200">
          <span className="flex items-center gap-1">
            📅 {new Date(episode.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1">
            ⏱️ {formatDuration(durationSeconds)}
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={handlePlayClick}
            onKeyDown={handlePlayKeyDown}
            aria-label={`Play episode: ${episode.title}`}
            className="flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-2 font-semibold text-white transition-all duration-200 hover:bg-opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light active:scale-95"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            Play
          </button>
          <a
            href={`/episodes/${episode.slug}`}
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-white px-6 py-2 font-semibold text-white transition-all duration-200 hover:bg-white hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            Details
          </a>
        </div>
      </div>
    </article>
  );
}

