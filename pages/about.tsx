import React from 'react';
import { GetStaticProps } from 'next';
import MetaHead from '@/site/components/MetaHead';

interface AboutProps {}

export default function About({}: AboutProps) {
  return (
    <>
      <MetaHead
        title="About - Episodes Showcase"
        description="Learn about our podcast series on storytelling, design, and innovation."
      />

      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-4xl font-bold text-dark mb-6">About Episodes Showcase</h1>

        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
          <p>
            Welcome to Episodes Showcase, a carefully curated collection of podcast episodes dedicated
            to exploring the intersection of storytelling, design, and innovation. Our series brings
            together thought leaders, creators, and visionaries who are shaping the future of media,
            technology, and human connection.
          </p>

          <p>
            Each episode delves deep into the narratives that matter—how we tell stories, how we design
            for meaning, and how we innovate responsibly. Whether you're a creator, designer, technologist,
            or simply curious about the world around you, you'll find insights, inspiration, and engaging
            conversations in our catalog.
          </p>

          <p>
            Our mission is to make thoughtful, quality content accessible to everyone. We believe that
            great stories have the power to inform, inspire, and transform perspectives. Through long-form
            conversations and expert perspectives, we explore topics that resonate with today's creators
            and changemakers.
          </p>

          <h2 className="text-2xl font-bold text-dark mt-8 mb-4">Why Listen?</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Discover actionable insights from industry leaders</li>
            <li>Explore storytelling techniques and design principles</li>
            <li>Stay informed about innovation trends and practices</li>
            <li>Connect with a community of creative professionals</li>
          </ul>
        </div>

        <div className="mt-12 rounded-lg bg-light p-8 text-center">
          <h2 className="text-2xl font-bold text-dark mb-4">Ready to Explore?</h2>
          <a
            href="/episodes"
            className="inline-block rounded-lg bg-primary px-8 py-3 font-semibold text-white transition-all hover:bg-opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Browse All Episodes →
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
  return {
    props: {},
    revalidate: 3600, // 1 hour
  };
};

