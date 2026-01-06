import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-accent mb-2">📻 Episodes</h3>
            <p className="text-gray-300">
              A curated collection of podcast episodes on storytelling, design, and innovation.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/" className="hover:text-accent transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/episodes" className="hover:text-accent transition-colors">
                  Episodes
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-accent transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:text-accent transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4">Info</h4>
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} Episodes Showcase. All rights reserved.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>Crafted with care for listeners everywhere.</p>
        </div>
      </div>
    </footer>
  );
}

