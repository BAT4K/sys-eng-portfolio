// components/Projects.tsx
'use client';

import { motion } from 'framer-motion';
import { Server, Database, Network, Gamepad2, ArrowUpRight, Cpu, Activity } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

// --- Data Definitions ---
const projects = [
  {
    id: 'magma',
    sysId: 'SYS_01',
    title: 'Magma',
    tagline: 'Low-latency trading engine optimized for nanosecond precision.',
    stats: '130ns Latency', // Key metric
    tags: ['Java Core', 'LMAX Disruptor', 'Lock-free'],
    link: 'https://github.com/BAT4K/Magma-Trading-Engine', 
    className: 'md:col-span-2', 
    visual: <RingBufferVisual />,
  },
  {
    id: 'niokv',
    sysId: 'DB_02',
    title: 'NioKvStore',
    tagline: 'High-throughput distributed key-value store.',
    stats: '10k+ OPS',
    tags: ['Java NIO', 'Reactor', 'AOF'],
    link: 'https://github.com/BAT4K/NioKvStore',
    className: 'md:col-span-1',
    visual: <NetworkVisual />,
  },
  {
    id: 'whackamole',
    sysId: 'GM_03',
    title: 'Whack-A-Mole',
    tagline: 'Multithreaded desktop game with decoupled rendering.',
    stats: '60 FPS Lock',
    tags: ['JavaFX', 'Concurrency'],
    link: 'https://github.com/BAT4K/whackamole',
    className: 'md:col-span-1',
    visual: <ControllerVisual />,
  },
  {
    id: 'portfolio',
    sysId: 'WEB_04',
    title: 'Portfolio_v1',
    tagline: 'Component-driven personal identity system.',
    stats: '100% Lighthouse', 
    tags: ['Next.js', 'React Server Components', 'Tailwind'],
    link: 'https://github.com/BAT4K/sys-eng-portfolio', 
    className: 'md:col-span-1',
    visual: <WebVisual />,
  },
];

export default function Projects() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 md:py-24">
       <div className="mb-10 flex items-end gap-4">
        <h2 className="text-3xl font-bold tracking-tighter text-[#ededed]">
          Featured_Projects
          <span className="text-emerald-500 animate-pulse">.</span>
        </h2>
        <div className="h-px flex-grow bg-zinc-800 mb-2" /> {/* Decorative line */}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-2 h-auto">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={clsx(
        'group relative flex flex-col justify-between overflow-hidden rounded-md bg-[#0f0f0f] p-6 md:p-8', // Darker, sharper corners
        'border border-zinc-800 transition-all duration-300 hover:border-emerald-500/50 hover:bg-[#121212]', // Glow effect on border
        project.className
      )}
    >
      {/* 1. Header & ID */}
      <div className="relative z-10 flex justify-between items-start mb-4">
        <div className="flex flex-col">
            <span className="font-mono text-[10px] text-zinc-600 mb-1 tracking-widest uppercase">
                {project.sysId} // ACTIVE
            </span>
            <h3 className="font-mono text-xl font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors">
                {project.title}
            </h3>
        </div>
        
        <Link 
            href={project.link} 
            className="text-zinc-500 transition-transform duration-300 group-hover:text-emerald-400 group-hover:-translate-y-1 group-hover:translate-x-1"
        >
            <ArrowUpRight size={20} />
        </Link>
      </div>

      {/* 2. Content */}
      <div className="relative z-10 flex flex-col gap-6 h-full justify-between">
        <div>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-[90%]">
                {project.tagline}
            </p>
            {/* Key Metric Badge */}
            <div className="mt-3 inline-flex items-center gap-2 rounded bg-zinc-900/80 border border-zinc-800 px-2 py-1">
                <Activity size={12} className="text-emerald-500" />
                <span className="text-xs font-mono text-zinc-300">{project.stats}</span>
            </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-zinc-500 border-b border-zinc-800 pb-0.5 group-hover:text-zinc-300 group-hover:border-emerald-500/50 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Technical Watermark (Low Priority) */}
      <div className="absolute bottom-0 right-0 z-0 hidden md:block opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 grayscale pointer-events-none translate-x-4 translate-y-4">
        {project.visual}
      </div>

      {/* Subtle Scanline Texture Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0px,rgba(0,0,0,0)_1px,rgba(0,0,0,0.1)_2px)] opacity-20 z-0" />
    </motion.div>
  );
}


// --- OPTIMIZED VISUALS (Technical Schematics) ---

function RingBufferVisual() {
  return (
    <div className="relative h-40 w-40 flex items-center justify-center border border-zinc-700/30 rounded-full border-dashed">
      <div className="absolute inset-0 rounded-full border border-zinc-500/20" />
      {/* Spinning Indicator */}
      <div className="absolute w-[100%] h-[2px] bg-zinc-500/40 top-1/2 left-0 animate-[spin_4s_linear_infinite]" />
      <Cpu size={48} className="text-zinc-500" />
    </div>
  );
}

function NetworkVisual() {
  return (
    <div className="relative h-32 w-48 flex items-center justify-center">
        {/* Schematic Lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 100">
            <line x1="20" y1="80" x2="100" y2="20" stroke="currentColor" strokeWidth="1" className="text-zinc-700" />
            <line x1="100" y1="20" x2="180" y2="80" stroke="currentColor" strokeWidth="1" className="text-zinc-700" />
            <line x1="20" y1="80" x2="180" y2="80" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-zinc-800" />
            
            {/* Nodes */}
            <circle cx="20" cy="80" r="4" className="fill-zinc-800" />
            <circle cx="100" cy="20" r="4" className="fill-zinc-600" />
            <circle cx="180" cy="80" r="4" className="fill-zinc-800" />
        </svg>
    </div>
  );
}

function ControllerVisual() {
  return (
    <div className="flex h-32 w-32 items-center justify-center">
        <Gamepad2 strokeWidth={1} size={80} className="text-zinc-700 opacity-80" />
    </div>
  );
}

// 4. Portfolio: A simple browser window schematic
function WebVisual() {
  return (
    <div className="relative h-32 w-48 flex items-center justify-center">
      {/* Window Frame */}
      <div className="absolute inset-0 border border-zinc-700/60 bg-zinc-900/20" />
      
      {/* Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-6 border-b border-zinc-700/60 flex items-center px-2 gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
      </div>

      {/* Wireframe Content */}
      <div className="absolute top-10 left-4 w-16 h-2 bg-zinc-700/50" /> {/* Heading */}
      <div className="absolute top-16 left-4 w-24 h-1.5 bg-zinc-800" /> {/* Text line 1 */}
      <div className="absolute top-20 left-4 w-20 h-1.5 bg-zinc-800" /> {/* Text line 2 */}

      {/* Cursor (Animated) */}
      <div className="absolute top-24 left-4 w-2 h-4 bg-emerald-500/50 animate-pulse" />
    </div>
  );
}
