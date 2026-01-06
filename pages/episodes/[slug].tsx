import React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import MetaHead from '@/site/components/MetaHead';
import Player from '@/site/components/Player';
import { Episode } from '@/types/episode';
import { getAllEpisodes, getEpisodeBySlug } from '@/lib/episodes';
import { formatDuration } from '@/lib/duration';

interface EpisodeDetailProps {
  episode: Episode | null;
  jsonLd: Record<string, unknown>;
}

export default function EpisodeDetail({ episode, jsonLd }: EpisodeDetailProps) {
  if (!episode) {
    return (
      <>
        <MetaHead title="Episode not found" />
        <main className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-dark">Episode not found</h1>
          <p className="text-gray-600 mt-4">Sorry, we couldn't find this episode.</p>
          <a
            href="/episodes"
            className="inline-block mt-8 rounded-lg bg-primary px-8 py-3 font-semibold text-white hover:bg-opacity-90"
          >
            Back to Episodes
          </a>
        </main>
      </>
    );
  }

  const durationSeconds = typeof episode.duration === 'string'
    ? parseInt(episode.duration, 10)
    : episode.duration;

  const imageSrc = episode.image || 'https://via.placeholder.com/1200x675';
  const altText = episode.image
    ? `Episode: ${episode.title}`
    : `Episode image: ${episode.title}`;

  return (
    <>
      <MetaHead
        title={`${episode.title} - Episodes Showcase`}
        description={episode.description}
        image={imageSrc}
        jsonLd={jsonLd}
      />

      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        {/* Back link */}
        <a
          href="/episodes"
          className="inline-flex items-center gap-2 text-accent hover:underline mb-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Episodes
        </a>

        {/* Episode image */}
        <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
          <img src={imageSrc} alt={altText} className="h-full w-full object-cover" />
        </div>

        {/* Episode header */}
        <div className="mb-8">
          {/* Tags */}
          {episode.tags && episode.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {episode.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-full bg-light px-4 py-2 text-sm font-semibold text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-bold text-dark mb-4">{episode.title}</h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-600">
            <span className="flex items-center gap-2">
              📅{' '}
              {new Date(episode.publishDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-2">
              ⏱️ {formatDuration(durationSeconds)}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {episode.description}
          </p>
        </div>

        {/* Player */}
        {episode.audioUrl && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dark mb-4">Listen Now</h2>
            <Player audioUrl={episode.audioUrl} title={episode.title} />
          </div>
        )}

        {/* Transcript */}
        {episode.transcript && (
          <div className="mb-8 rounded-lg bg-light p-6">
            <h2 className="text-2xl font-bold text-dark mb-4">Transcript</h2>
            <div className="prose prose-sm max-w-none text-gray-700 max-h-96 overflow-y-auto">
              <p className="whitespace-pre-wrap">{episode.transcript}</p>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="rounded-lg bg-light p-8 text-center">
          <h2 className="text-2xl font-bold text-dark mb-4">Enjoyed this episode?</h2>
          <p className="text-gray-600 mb-6">
            Explore more episodes or subscribe to get notified of new releases.
          </p>
          <a
            href="/episodes"
            className="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-white hover:bg-opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Browse All Episodes
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const episodes = getAllEpisodes();

  const paths = episodes.map((episode) => ({
    params: {
      slug: episode.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<EpisodeDetailProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const episode = getEpisodeBySlug(slug);

  if (!episode) {
    return {
      notFound: true,
    };
  }

  // Build JSON-LD structured data
  const durationSeconds = typeof episode.duration === 'string'
    ? parseInt(episode.duration, 10)
    : episode.duration;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: episode.title,
    description: episode.description,
    datePublished: episode.publishDate,
    duration: `PT${Math.floor(durationSeconds / 3600)}H${Math.floor((durationSeconds % 3600) / 60)}M${durationSeconds % 60}S`,
    image: episode.image,
    url: `https://episodes.example.com/episodes/${episode.slug}`,
    audio: episode.audioUrl
      ? {
          '@type': 'AudioObject',
          url: episode.audioUrl,
          duration: `PT${durationSeconds}S`,
        }
      : undefined,
    keywords: episode.tags?.join(','),
  };

  return {
    props: {
      episode,
      jsonLd,
    },
    revalidate: 60, // ISR: revalidate every 60 seconds
  };
};

