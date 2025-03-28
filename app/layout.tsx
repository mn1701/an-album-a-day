import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider, ParticleBackground, Header } from "@/components/index";
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AnAlbumADay',
  description: 'Discover a new album every day.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ParticleBackground />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}