// components/Hero.tsx
'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Github, ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    'Building low-latency systems.',
    'Optimizing for nanoseconds.',
    'Engineering distributed databases.',
  ];

  // Typewriter Effect Logic
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      // Dynamic typing speed
      setTypingSpeed(isDeleting ? 30 : 150);

      // Pause before deleting
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500); 
      } 
      // Move to next phrase after deleting
      else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases, typingSpeed]);

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">
      
      {/* 1. Name Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-extrabold tracking-tight sm:text-8xl text-[#ededed]"
      >
        Hans James
      </motion.h1>

      {/* 2. Typewriter Sub-headline */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 h-8 text-lg font-mono text-emerald-500 sm:text-xl"
      >
        <span>&gt; {text}</span>
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="inline-block h-5 w-2 bg-emerald-500 align-middle ml-1"
        />
      </motion.div>

      {/* 3. Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-10 flex flex-wrap justify-center gap-4"
      >
        {/* Primary Button: View Work */}
        <Link href="/work">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full bg-[#ededed] px-8 py-3 text-sm font-bold text-[#0a0a0a] transition-colors hover:bg-white"
          >
            View Work
            <ArrowRight size={16} />
          </motion.button>
        </Link>

        {/* Secondary Button: GitHub */}
        <Link href="https://github.com/BAT4K" target="_blank">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.05)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 rounded-full border border-zinc-700 px-8 py-3 text-sm font-mono text-zinc-300 transition-colors hover:border-zinc-500"
          >
            <Github size={16} />
            <span>GitHub</span>
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
}