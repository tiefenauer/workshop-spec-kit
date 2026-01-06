import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import FeaturedCard from '@/site/components/FeaturedCard';
import Player from '@/site/components/Player';
import MetaHead from '@/site/components/MetaHead';
import { Episode } from '@/types/episode';
import { getFeaturedEpisode } from '@/lib/episodes';

interface HomeProps {
  featuredEpisode: Episode | null;
}

export default function Home({ featuredEpisode }: HomeProps) {
  const [showPlayer, setShowPlayer] = useState(false);

  if (!featuredEpisode) {
    return (
      <div className="min-h-screen py-12 px-4">
        <MetaHead />
        <div className="text-center">
          <h1 className="text-4xl font-bold text-dark">No episodes available</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <MetaHead
        title={`${featuredEpisode.title} - Episodes Showcase`}
        description={featuredEpisode.description}
        image={featuredEpisode.image}
      />

      <main>
        {/* Hero Section */}
        <section className="relative py-12 px-4 md:py-16 lg:py-20">
          <div className="max-w-6xl mx-auto">
            {/* Featured Episode */}
            <div className="mb-12">
              <h2 className="mb-6 text-3xl font-bold text-dark md:text-4xl">
                Featured Episode
              </h2>
              <FeaturedCard
                episode={featuredEpisode}
                onPlay={() => setShowPlayer(true)}
              />
            </div>

            {/* Player */}
            {showPlayer && (
              <div className="mt-8">
                <Player
                  audioUrl={featuredEpisode.audioUrl}
                  title={featuredEpisode.title}
                  onClose={() => setShowPlayer(false)}
                />
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-16 rounded-lg bg-light p-8 text-center md:p-12">
              <h2 className="mb-4 text-2xl font-bold text-dark md:text-3xl">
                Explore More Episodes
              </h2>
              <p className="mb-6 text-gray-600">
                Discover our full collection of podcast episodes on storytelling, design,
                and innovation.
              </p>
              <a
                href="/episodes"
                className="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-all hover:bg-opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Browse All Episodes →
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const featuredEpisode = getFeaturedEpisode();

  return {
    props: {
      featuredEpisode: featuredEpisode || null,
    },
    revalidate: 60, // ISR: revalidate every 60 seconds
  };
};

