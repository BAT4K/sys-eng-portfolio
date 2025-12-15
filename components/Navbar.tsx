// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { Terminal, Search } from 'lucide-react'; 
import { useState } from 'react';
import CommandPalette from './CommandPalette';
import { useTerminal } from '@/context/TerminalContext';

// 1. Updated Data Array
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Work', href: '/work' },
  { name: 'Resume', href: '/Hans_James_Resume.pdf', isExternal: true }, // Added Resume
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const [openCmd, setOpenCmd] = useState(false);
  const { toggleTerminal } = useTerminal(); 
  const [logoText, setLogoText] = useState('sys_eng'); 

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          
          {/* INTERACTIVE LOGO BUTTON */}
          <button 
            onClick={toggleTerminal}
            onMouseEnter={() => setLogoText('open_term')}
            onMouseLeave={() => setLogoText('sys_eng')}
            className="group flex items-center gap-2 font-mono text-lg font-bold tracking-tighter transition-colors hover:text-emerald-400"
          >
            <Terminal size={20} className="text-emerald-500 transition-transform group-hover:scale-110" />
            <span>
              {logoText}
              <span className="animate-pulse ml-1 opacity-0 group-hover:opacity-100 transition-opacity">_</span>
            </span>
          </button>

          {/* Search Trigger */}
          <button 
            onClick={() => setOpenCmd(true)}
            className="hidden md:flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-sm text-zinc-500 hover:border-zinc-700 hover:text-zinc-300 transition-colors"
          >
            <Search size={14} />
            <span className="font-mono">Search...</span>
            <kbd className="pointer-events-none ml-2 inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-400 opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>

          {/* Navigation Links */}
          <div className="flex gap-6 md:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                // 2. Conditional props for external links
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-zinc-400 transition-colors hover:text-[#ededed] font-mono"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      
      <CommandPalette open={openCmd} setOpen={setOpenCmd} />
    </>
  );
}