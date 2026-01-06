import type { AppProps } from 'next/app';
import Layout from '@/site/components/Layout';
import '@/site/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

