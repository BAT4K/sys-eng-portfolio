// app/about/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Music, Clapperboard } from 'lucide-react';
import AboutCode from '@/components/AboutCode'; 

export default function About() {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-5xl flex-col justify-center px-6 py-12 md:flex-row md:items-center md:gap-16">
      
      {/* LEFT COLUMN: Text Content */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6 md:w-1/2"
      >
        <h1 className="text-3xl font-bold font-mono tracking-tight text-[#ededed]">
          /about_me
        </h1>
        
        <p className="text-lg leading-relaxed text-zinc-400">
          CS Undergrad at{' '}
          <a 
            href="https://snu.edu.in/home/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-emerald-400 transition-colors hover:text-emerald-300 hover:underline decoration-emerald-500/30 underline-offset-4"
          >
            Shiv Nadar University
          </a>. 
          I focus on backend infrastructure, distributed systems, and high-frequency trading engines.
        </p>

        {/* Highlights List */}
        <div className="mt-4 flex flex-col gap-4">
          
          {/* 1. Snuphoria Link */}
          <a 
            href="https://www.instagram.com/snuphoria/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-[#171717] p-4 transition-all hover:border-emerald-500/50 hover:bg-[#1c1c1c] group cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded bg-zinc-800 text-emerald-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
              <Music size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono text-zinc-200 group-hover:text-emerald-400 transition-colors">
                Bassist
              </h3>
              <p className="text-xs font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
                Snuphoria
              </p>
            </div>
          </a>

          {/* 2. Breeze Link */}
          <a 
            href="https://www.instagram.com/breeze.snu/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-[#171717] p-4 transition-all hover:border-emerald-500/50 hover:bg-[#1c1c1c] group cursor-pointer"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded bg-zinc-800 text-emerald-500 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
              <Clapperboard size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold font-mono text-zinc-200 group-hover:text-emerald-400 transition-colors">
                Video Editor
              </h3>
              <p className="text-xs font-mono text-zinc-500 group-hover:text-zinc-400 transition-colors">
                Breeze '24
              </p>
            </div>
          </a>

        </div>
      </motion.div>

      {/* RIGHT COLUMN: Code Visual */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-12 w-full md:mt-0 md:w-1/2"
      >
        <AboutCode />
      </motion.div>

    </section>
  );
}
