// components/CommandPalette.tsx
'use client';

import { Command } from 'cmdk';
import { useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Briefcase, 
  User, 
  Github, 
  Linkedin, 
  FileText, 
  Mail, 
  Search 
} from 'lucide-react';

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CommandPalette({ open, setOpen }: Props) {
  const router = useRouter();

  // Handle Keyboard Shortcuts
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Toggle with Cmd+K or Ctrl+K
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
      // Close with Escape
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setOpen]);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={() => setOpen(false)} 
          />
          
          {/* Dialog */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-zinc-800 bg-[#0a0a0a] shadow-2xl"
          >
            <Command label="Command Menu" className="w-full">
              
              {/* Input Field */}
              <div className="flex items-center border-b border-zinc-800 px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50 text-zinc-400" />
                <Command.Input 
                  autoFocus
                  placeholder="Type a command or search..."
                  className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-zinc-600 font-mono text-[#ededed]"
                />
                <div className="ml-2 flex items-center gap-1 rounded bg-zinc-900 px-1.5 py-0.5 border border-zinc-800">
                    <span className="text-[10px] font-mono text-zinc-500">ESC</span>
                </div>
              </div>

              {/* List */}
              <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                <Command.Empty className="py-6 text-center text-sm text-zinc-500 font-mono">
                  No results found.
                </Command.Empty>

                {/* Group: Navigation */}
                <Command.Group heading="Navigation" className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-bold">
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push('/'))}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-zinc-400 aria-selected:bg-zinc-900 aria-selected:text-emerald-400 transition-colors"
                  >
                    <Home size={16} />
                    <span>Home</span>
                  </Command.Item>
                  
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push('/work'))}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-zinc-400 aria-selected:bg-zinc-900 aria-selected:text-emerald-400 transition-colors"
                  >
                    <Briefcase size={16} />
                    <span>Work</span>
                  </Command.Item>
                  
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push('/about'))}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-zinc-400 aria-selected:bg-zinc-900 aria-selected:text-emerald-400 transition-colors"
                  >
                    <User size={16} />
                    <span>About</span>
                  </Command.Item>
                </Command.Group>

                {/* Group: Links */}
                <Command.Group heading="Links" className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-bold">
                  <Command.Item 
                    onSelect={() => runCommand(() => window.open('https://github.com/BAT4K', '_blank'))}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-zinc-400 aria-selected:bg-zinc-900 aria-selected:text-emerald-400 transition-colors"
                  >
                    <Github size={16} />
                    <span>GitHub</span>
                  </Command.Item>
                  
                  <Command.Item 
                    onSelect={() => runCommand(() => window.open('https://linkedin.com/in/bat4k', '_blank'))}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-zinc-400 aria-selected:bg-zinc-900 aria-selected:text-emerald-400 transition-colors"
                  >
                    <Linkedin size={16} />
                    <span>LinkedIn</span>
                  </Command.Item>

                  <Command.Item 
                    onSelect={() => runCommand(() => window.open('/Hans_James_Resume.pdf', '_blank'))}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-zinc-400 aria-selected:bg-zinc-900 aria-selected:text-emerald-400 transition-colors"
                  >
                    <FileText size={16} />
                    <span>Resume</span>
                  </Command.Item>
                </Command.Group>

                {/* Group: Contact */}
                <Command.Group heading="Contact" className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider text-zinc-600 font-bold">
                  <Command.Item 
                    onSelect={() => runCommand(() => window.location.href = 'mailto:hj271@snu.edu.in')}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-sm text-zinc-400 aria-selected:bg-zinc-900 aria-selected:text-emerald-400 transition-colors"
                  >
                    <Mail size={16} />
                    <span>Email Me</span>
                  </Command.Item>
                </Command.Group>

              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
