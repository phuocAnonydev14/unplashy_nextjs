import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { Footer, Header } from '@/common/layouts/MainLayouts/components';
import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/toaster';

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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
