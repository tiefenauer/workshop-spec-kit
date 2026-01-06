import React, { useState, useMemo } from 'react';
import { GetStaticProps } from 'next';
import MetaHead from '@/site/components/MetaHead';
import SearchBar from '@/site/components/SearchBar';
import FiltersPanel from '@/site/components/FiltersPanel';
import EpisodeCard from '@/site/components/EpisodeCard';
import Pagination from '@/site/components/Pagination';
import Player from '@/site/components/Player';
import { Episode } from '@/types/episode';
import { getAllEpisodes, getAllTags } from '@/lib/episodes';

interface EpisodesProps {
  episodes: Episode[];
  allTags: string[];
}

const ITEMS_PER_PAGE = 10;

export default function Episodes({ episodes, allTags }: EpisodesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [playingEpisode, setPlayingEpisode] = useState<Episode | null>(null);

  // Filter episodes based on search and tags
  const filteredEpisodes = useMemo(() => {
    let result = episodes;

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (ep) =>
          ep.title.toLowerCase().includes(query) ||
          ep.description.toLowerCase().includes(query)
      );
    }

    // Tag filter (OR logic: if any selected tag matches)
    if (selectedTags.length > 0) {
      result = result.filter((ep) =>
        selectedTags.some((tag) => ep.tags.includes(tag))
      );
    }

    return result;
  }, [episodes, searchQuery, selectedTags]);

  // Pagination
  const totalPages = Math.ceil(filteredEpisodes.length / ITEMS_PER_PAGE);
  const paginatedEpisodes = filteredEpisodes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1); // Reset to first page
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page
  };

  return (
    <>
      <MetaHead
        title="Episodes - Episodes Showcase"
        description="Browse our full collection of podcast episodes on storytelling, design, and innovation."
      />

      <main className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-4xl font-bold text-dark mb-2">Episodes</h1>
        <p className="text-gray-600 mb-8">
          Explore {episodes.length} episodes. Search, filter, and discover your next favorite episode.
        </p>

        {/* Controls section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 mb-8">
          <div className="md:col-span-3">
            <SearchBar
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search episodes..."
            />
          </div>
          <FiltersPanel
            tags={allTags}
            selectedTags={selectedTags}
            onToggleTag={handleToggleTag}
          />
        </div>

        {/* Results info */}
        <div className="mb-6 text-sm text-gray-600" role="status" aria-live="polite">
          {filteredEpisodes.length > 0 ? (
            <>
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, filteredEpisodes.length)} of{' '}
              {filteredEpisodes.length} episodes
            </>
          ) : (
            <>No episodes match your search and filters</>
          )}
        </div>

        {/* Episodes grid */}
        {paginatedEpisodes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {paginatedEpisodes.map((episode) => (
                <EpisodeCard
                  key={episode.id}
                  title={episode.title}
                  description={episode.description}
                  image={episode.image}
                  publishDate={episode.publishDate}
                  duration={typeof episode.duration === 'string'
                    ? parseInt(episode.duration, 10)
                    : episode.duration}
                  tags={episode.tags}
                  slug={episode.slug}
                  audioUrl={episode.audioUrl}
                  onPlay={() => setPlayingEpisode(episode)}
                />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mb-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No episodes found. Try adjusting your search or filters.
            </p>
          </div>
        )}

        {/* Player modal */}
        {playingEpisode && (
          <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50">
            <div className="w-full bg-white p-6 rounded-t-lg">
              <button
                onClick={() => setPlayingEpisode(null)}
                aria-label="Close player"
                className="absolute top-4 right-4 text-gray-600 hover:text-dark"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Player
                audioUrl={playingEpisode.audioUrl}
                title={playingEpisode.title}
                onClose={() => setPlayingEpisode(null)}
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<EpisodesProps> = async () => {
  const episodes = getAllEpisodes();
  const allTags = getAllTags();

  return {
    props: {
      episodes,
      allTags,
    },
    revalidate: 60, // ISR: revalidate every 60 seconds
  };
};

