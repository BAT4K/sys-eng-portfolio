// components/Footer.tsx
'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-[#0a0a0a] py-10 mt-auto">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        
        {/* Copyright / Status - Increased Text Size */}
        <div className="text-center md:text-left space-y-2">
          <p className="font-mono text-sm text-zinc-400">
            © {new Date().getFullYear()} Hans James.
          </p>
          <p className="font-mono text-xs text-zinc-500">
            System Status: <span className="text-emerald-500 animate-pulse">● Online</span>
          </p>
        </div>

        {/* Social Links - Increased Icon Size & Spacing */}
        <div className="flex gap-8">
          <SocialLink href="https://github.com/BAT4K" icon={<Github size={22} />} label="GitHub" />
          <SocialLink href="https://linkedin.com/in/bat4k" icon={<Linkedin size={22} />} label="LinkedIn" />
          <SocialLink href="mailto:hj271@snu.edu.in" icon={<Mail size={22} />} label="Email" />
        </div>
      </div>
    </footer>
  );
}

// Helper component
function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      target="_blank" 
      className="text-zinc-400 transition-transform hover:text-white hover:-translate-y-1 duration-200"
      aria-label={label}
    >
      {icon}
    </Link>
  );
}