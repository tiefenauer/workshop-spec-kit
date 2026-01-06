import React from 'react';

interface EpisodeCardProps {
  title: string;
  description: string;
  image?: string;
  publishDate: string;
  duration: number;
  tags: string[];
  slug: string;
  audioUrl?: string;
  onPlay?: () => void;
}

export default function EpisodeCard({
  title,
  description,
  image,
  publishDate,
  duration,
  tags,
  slug,
  audioUrl,
  onPlay,
}: EpisodeCardProps) {
  const imageSrc = image || 'https://via.placeholder.com/400x300';
  const altText = image ? `Episode: ${title}` : `Episode image: ${title}`;

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const parts = [];
    if (hours > 0) {
      parts.push(String(hours).padStart(2, '0'));
    }
    parts.push(String(minutes).padStart(2, '0'));
    parts.push(String(secs).padStart(2, '0'));
    return parts.join(':');
  };

  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 transition-all hover:shadow-lg">
      {/* Image */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
        <img src={imageSrc} alt={altText} className="h-full w-full object-cover" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-light px-3 py-1 text-xs font-semibold text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="mb-2 text-xl font-bold text-dark line-clamp-2 hover:text-accent transition-colors">
          <a href={`/episodes/${slug}`}>{title}</a>
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">{description}</p>

        {/* Meta info */}
        <div className="mb-4 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            📅 {new Date(publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1">
            ⏱️ {formatDuration(duration)}
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          {audioUrl && onPlay && (
            <button
              onClick={onPlay}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 font-semibold text-white transition-all hover:bg-opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95 text-sm"
              aria-label={`Play episode: ${title}`}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Play
            </button>
          )}
          <a
            href={`/episodes/${slug}`}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-primary px-4 py-2 font-semibold text-primary transition-all hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary text-sm"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
            View
          </a>
        </div>
      </div>
    </article>
  );
}

