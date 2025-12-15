// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TerminalModal from '@/components/TerminalModal'; // Import the modal
import { TerminalProvider } from '@/context/TerminalContext'; // Import the provider

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hans James | Systems Engineer',
  description: 'Portfolio of a Systems Engineer.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans min-h-screen bg-[#0a0a0a] selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col">
        
        {/* Wrap everything in the Provider */}
        <TerminalProvider>
          <Navbar />
          
          <main className="flex-grow">
            {children}
          </main>

          <Footer />
          
          {/* The Terminal Modal lives here, outside the main flow */}
          <TerminalModal />
        </TerminalProvider>
        
      </body>
    </html>
  );
}