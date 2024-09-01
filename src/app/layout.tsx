import './globals.css';

import type { Metadata } from 'next';
import { Space_Mono } from 'next/font/google';

const spaceMono = Space_Mono({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Daftar Undanggan',
  description: 'Buat Daftar Undangan Dengan Mudah',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceMono.className}>{children}</body>
    </html>
  );
}
