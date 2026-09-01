import { Open_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
});

export const metadata: Metadata = {
  title: 'Sheraz Edge Constructions',
  description: 'Crafting dreams with precision and excellence.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}