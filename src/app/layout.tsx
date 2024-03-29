import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.scss';

import { Viewport } from 'next';

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
};

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sliced layer models',
  description: 'Create layered models with special inclusions ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
