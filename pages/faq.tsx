import React from 'react';
import { GetStaticProps } from 'next';
import MetaHead from '@/site/components/MetaHead';

interface FAQProps {}

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: 'How often do you release new episodes?',
    answer:
      'We release new episodes weekly, typically on Tuesdays. Each episode features in-depth conversations with industry experts and creative professionals.',
  },
  {
    question: 'Can I download episodes for offline listening?',
    answer:
      'Yes! You can download episodes directly from our player or subscribe through your favorite podcast app like Apple Podcasts, Spotify, or Google Podcasts.',
  },
  {
    question: 'Is there a transcript available for episodes?',
    answer:
      'Many of our episodes include transcripts. You\'ll find links to transcripts on episode detail pages where available.',
  },
  {
    question: 'How can I get in touch with guest speakers?',
    answer:
      'Guest information and social media links are available on their episode detail pages. We encourage connecting with our guests directly through their published channels.',
  },
  {
    question: 'Can I submit a topic or guest suggestion?',
    answer:
      'Absolutely! We love hearing from our listeners. Visit our contact page or reach out via email to share your ideas and suggestions.',
  },
  {
    question: 'Is the content suitable for all audiences?',
    answer:
      'Our content is primarily aimed at creative professionals and those interested in storytelling, design, and innovation. Some episodes may contain mature themes suitable for adult audiences.',
  },
];

export default function FAQ({}: FAQProps) {
  return (
    <>
      <MetaHead
        title="FAQ - Episodes Showcase"
        description="Frequently asked questions about our podcast series and content."
      />

      <main className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-4xl font-bold text-dark mb-2">Frequently Asked Questions</h1>
        <p className="text-gray-600 mb-8">Find answers to common questions about Episodes Showcase.</p>

        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <div key={index} className="rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-dark mb-3">{item.question}</h3>
              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-light p-8 text-center">
          <h2 className="text-2xl font-bold text-dark mb-4">Didn't find what you're looking for?</h2>
          <p className="text-gray-600 mb-6">
            We're here to help! Reach out to us with your questions and feedback.
          </p>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps<FAQProps> = async () => {
  return {
    props: {},
    revalidate: 3600, // 1 hour
  };
};

