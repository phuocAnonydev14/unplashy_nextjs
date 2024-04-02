import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Web3Provider } from '@/common/providers/Web3Provider';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Unplashy',
  description: 'App with pretty images'
};

export default function RootLayout(props: PropsWithChildren) {
  const { children } = props;
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <NextTopLoader />
        <Toaster />
        <Web3Provider>
          <Header />
          {children}
          <Footer />
        </Web3Provider>
      </body>
    </html>
  );
}
