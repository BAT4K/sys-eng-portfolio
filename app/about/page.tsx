// app/about/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Music, Clapperboard, Terminal } from 'lucide-react';

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
        <h1 className="text-3xl font-bold tracking-tight text-[#ededed]">
          /about_me
        </h1>
        
        <p className="text-lg leading-relaxed text-zinc-400">
          CS Undergrad at <span className="text-emerald-400">Shiv Nadar University</span>. 
          I focus on backend infrastructure, distributed systems, and high-frequency trading engines.
        </p>

        {/* Highlights List */}
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-[#171717] p-4 transition-colors hover:border-zinc-700">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-zinc-800 text-emerald-500">
              <Music size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-200">Bassist</h3>
              <p className="text-xs font-mono text-zinc-500">Snuphoria</p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-[#171717] p-4 transition-colors hover:border-zinc-700">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-zinc-800 text-emerald-500">
              <Clapperboard size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-200">Video Editor</h3>
              <p className="text-xs font-mono text-zinc-500">Breeze '24</p>
            </div>
          </div>
        </div>
      </motion.div>


      {/* RIGHT COLUMN: Image Placeholder */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mt-12 aspect-square w-full overflow-hidden rounded-2xl bg-zinc-800 grayscale md:mt-0 md:w-1/2"
      >
        {/* Placeholder for your real photo */}
        <div className="flex h-full w-full items-center justify-center bg-neutral-900">
           <Terminal size={48} className="text-zinc-700" />
        </div>
      </motion.div>

    </section>
  );
}