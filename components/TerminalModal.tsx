// components/TerminalModal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Square } from 'lucide-react';
import { useTerminal } from '@/context/TerminalContext';
import Terminal from './Terminal'; // Import your new component

export default function TerminalModal() {
  const { isOpen, closeTerminal } = useTerminal();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeTerminal}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Window Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative flex h-[80vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg border border-zinc-800 bg-[#0c0c0c] shadow-2xl"
          >
            {/* Mac/Linux Style Title Bar */}
            <div className="flex h-10 shrink-0 items-center justify-between border-b border-zinc-800 bg-[#121212] px-4">
              <div className="flex gap-2">
                <button onClick={closeTerminal} className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                <span className="hidden md:inline">guest@hans-system:~</span>
                <span className="md:hidden">Terminal</span>
              </div>
              <div className="flex w-12 justify-end opacity-50">
                 {/* Decorative window controls */}
                 <Square size={12} className="text-zinc-500" />
              </div>
            </div>

            {/* The Actual Terminal Component */}
            <Terminal />
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}