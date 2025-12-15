// components/Projects.tsx
'use client';

import { motion } from 'framer-motion';
import { Server, Database, Network, Gamepad2, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

// --- Data Definitions ---
const projects = [
  {
    id: 'magma',
    title: 'Magma',
    tagline: '130ns Latency Trading Engine',
    tags: ['Java Core', 'LMAX Disruptor', 'Lock-free'],
    link: '#', 
    className: 'md:col-span-2', 
    visual: <RingBufferVisual />,
  },
  {
    id: 'niokv',
    title: 'NioKvStore',
    tagline: 'Distributed Key-Value Database',
    tags: ['Java NIO', 'Reactor Pattern', 'AOF'],
    link: '#',
    className: 'md:col-span-1',
    visual: <NetworkVisual />,
  },
  {
    id: 'whackamole',
    title: 'Whack-A-Mole',
    tagline: 'Concurrent Desktop Game',
    tags: ['JavaFX', 'Multithreading'],
    link: '#',
    className: 'md:col-span-1',
    visual: <ControllerVisual />,
  },
];

export default function Projects() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-12 md:py-24">
       <div className="mb-8 flex items-center justify-between md:mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-[#ededed]">Featured Projects.</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-2 h-auto md:h-[500px]">
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
      viewport={{ once: true }} // Only animates once to save performance
      transition={{ duration: 0.4 }}
      className={clsx(
        'group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#171717] p-6 md:p-8',
        'border border-white/5 transition-colors hover:border-white/10',
        project.className
      )}
    >
      <div className="relative z-20 flex flex-col gap-4">
        <div>
            <div className="flex items-center justify-between">
                 <h3 className="text-xl font-bold text-white md:text-2xl">{project.title}</h3>
                 <Link href={project.link} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="text-zinc-400 hover:text-white" size={20} />
                 </Link>
            </div>
          <p className="text-zinc-400 mt-1 text-sm md:text-base">{project.tagline}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-800/60 border border-zinc-700/50 px-2.5 py-1 text-[10px] md:text-xs font-mono text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Visual Container - Adjusted for mobile to not block text */}
      <div className="absolute -bottom-2 -right-2 z-10 opacity-50 scale-75 md:scale-100 md:bottom-6 md:right-6 md:opacity-60 group-hover:opacity-100 transition-all duration-500 pointer-events-none">
        {project.visual}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0" />
    </motion.div>
  );
}


// --- OPTIMIZED VISUALS (CSS ANIMATIONS) ---

// 1. Magma: Uses CSS 'animate-spin' instead of JS framer-motion
function RingBufferVisual() {
  return (
    <div className="relative h-28 w-28 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-4 border-zinc-800 opacity-50" />
      
      {/* CSS Animation: infinite spin linear 3s */}
      <div className="absolute inset-0 rounded-full border-4 border-t-emerald-500 border-r-emerald-500/30 border-b-transparent border-l-transparent animate-[spin_3s_linear_infinite]" />
      
      <div className="font-mono text-xs text-zinc-600 font-bold">LMAX</div>
    </div>
  );
}

// 2. NioKvStore: Static SVG lines (remove draw animation for mobile perf) or keep simple
function NetworkVisual() {
    const width = 160;
    const height = 100;
    const top = { x: 80, y: 20 };    
    const left = { x: 30, y: 80 };   
    const right = { x: 130, y: 80 }; 

  return (
    <div className="relative h-28 w-40 flex items-center justify-center">
        <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${width} ${height}`}>
            <line x1={left.x} y1={left.y} x2={top.x} y2={top.y} stroke="#52525b" strokeWidth="2" />
            <line x1={top.x} y1={top.y} x2={right.x} y2={right.y} stroke="#52525b" strokeWidth="2" />
            <line x1={left.x} y1={left.y} x2={right.x} y2={right.y} stroke="#52525b" strokeWidth="2" strokeDasharray="4 4" />
        </svg>

      <div className="absolute text-emerald-500" style={{ left: top.x, top: top.y, transform: 'translate(-50%, -50%)' }}>
         <Server size={24} />
      </div>
      <div className="absolute text-zinc-500" style={{ left: left.x, top: left.y, transform: 'translate(-50%, -50%)' }}>
         <Database size={20} />
      </div>
      <div className="absolute text-zinc-500" style={{ left: right.x, top: right.y, transform: 'translate(-50%, -50%)' }}>
         <Network size={20} />
      </div>
    </div>
  );
}

// 3. Whack-A-Mole: Uses CSS 'animate-ping'
function ControllerVisual() {
  return (
    <div className="flex h-24 w-24 items-center justify-center">
      <div className="relative group-hover:-rotate-12 transition-transform duration-500">
           <Gamepad2 size={56} className="text-zinc-600 group-hover:text-emerald-400 transition-colors duration-300" />
           <div className="absolute -top-1 -right-1">
                {/* CSS Animation: ping */}
                <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
           </div>
      </div>
    </div>
  );
}