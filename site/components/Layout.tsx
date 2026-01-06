import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  currentPath?: string;
}

export default function Layout({ children, currentPath }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header currentPath={currentPath} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

