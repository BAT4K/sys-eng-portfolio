'use client';

import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent, ReactNode } from 'react';
import { useTerminal } from '@/context/TerminalContext';
import NeofetchResult from './NeofetchResult'; 

interface Line {
  text?: string;
  component?: ReactNode; 
  type: 'output' | 'input' | 'system';
  color?: string;
}

// Manually padded content for perfect alignment
const SKILLS_CONTENT = [
  "",
  "## [LANGUAGES]",
  "> Java (Core, NIO, Concurrency) :: High proficiency",
  "> C                             :: System level",
  "> MIPS Assembly                 :: Low level arch",
  "> Python, SQL                   :: Scripting & Data",
  "",
  "## [SYSTEMS_ENGINEERING]",
  "> Distributed Systems           :: Raft, Paxos, Consistency models",
  "> High-Frequency Trading        :: LMAX Disruptor, Lock-free algos",
  "> Database Internals            :: WAL, LSM Trees, AOF",
  "> Networking                    :: TCP/UDP optimization, Netty",
  "",
  "## [TOOLING_&_DEVOPS]",
  "> Environment                   :: Linux (Fedora/Ubuntu)",
  "> Containerization              :: Docker, Kubernetes",
  "> Version Control               :: Git, GitHub Actions",
  "",
  "## [CREATIVE_&_OTHER]",
  "> Bass Guitar                   :: Rhythm & Groove",
  "> Video Editing                 :: Premiere Pro / After Effects",
  ""
];

export default function Terminal() {
  const { closeTerminal } = useTerminal();
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<Line[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [currentDir, setCurrentDir] = useState('~');

  // 1. Boot Sequence
  useEffect(() => {
    const bootLines: { text: string; delay: number }[] = [
      { text: 'Initializing kernel...', delay: 100 },
      { text: 'Loading system assets...', delay: 300 },
      { text: 'Mounting file system (RO)...', delay: 600 },
      { text: 'Connected to session.', delay: 1000 },
    ];

    let timeouts: NodeJS.Timeout[] = [];

    bootLines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, { text: line.text, type: 'system', color: 'text-zinc-500' }]);
        if (index === bootLines.length - 1) setIsBooting(false);
      }, line.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // 2. Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, isBooting]);

  // --- MISSING FUNCTION RESTORED HERE ---
  const handleFocus = () => {
    inputRef.current?.focus();
  };

  // 3. Command Processor
  const processCommand = (cmd: string) => {
    const args = cmd.trim().split(' ');
    const command = args[0].toLowerCase();
    const arg = args[1];

    let outputLines: Line[] = [];

    switch (command) {
      case 'help':
        outputLines = [
          { text: 'Available commands:', type: 'output' },
          { text: '  ls            List directory contents', type: 'output' },
          { text: '  cat [file]    Display file contents', type: 'output' },
          { text: '  whoami        Display user info', type: 'output' },
          { text: '  neofetch      Display system info', type: 'output' },
          { text: '  clear         Clear terminal screen', type: 'output' },
          { text: '  exit          Close terminal session', type: 'output' },
          { text: '  sudo          Execute a command as superuser', type: 'output' },
        ];
        break;
      
      case 'neofetch':
        outputLines = [
            { 
                type: 'output', 
                component: <NeofetchResult /> 
            }
        ];
        break;

      case 'ls':
        if (currentDir === '~/projects') {
          outputLines = [
            // List your projects here!
            { text: 'magma-engine  niokv  whack-a-mole-java  sys-eng-portfolio', type: 'output', color: 'text-emerald-400' }
          ];
        } else {
          // Default home directory listing
          outputLines = [
            { text: 'resume.pdf  projects/  contact.txt  skills.md', type: 'output', color: 'text-emerald-400' },
          ];
        }
        break;

      case 'cd':
        if (!arg || arg === '~') {
          setCurrentDir('~');
        } 
        else if (arg === 'projects' || arg === 'projects/') {
          setCurrentDir('~/projects');
        } 
        else if (arg === '..') {
          // Simple logic: if we are in projects, go back to ~
          setCurrentDir('~');
        } 
        else {
          outputLines = [{ text: `cd: ${arg}: No such file or directory`, type: 'output', color: 'text-red-500' }];
        }
        break;

      case 'whoami':
        outputLines = [{ text: 'CS Undergrad @ SNU | Backend Engineer', type: 'output', color: 'text-blue-400' }];
        break;

      case 'cat':
        if (!arg) {
          outputLines = [{ text: 'Usage: cat [filename]', type: 'output', color: 'text-yellow-500' }];
        } 
        else if (arg === 'skills.md') {
          outputLines = SKILLS_CONTENT.map(line => ({ text: line, type: 'output' }));
        }
        else if (arg === 'resume.pdf') {
          outputLines = [{ text: 'Opening resume...', type: 'output', color: 'text-zinc-400' }];
          window.open('/Hans_James_Resume.pdf', '_blank');
        } else if (arg === 'contact.txt') {
          outputLines = [
            { text: 'Email: hj271@snu.edu.in', type: 'output' },
            { text: 'GitHub: github.com/BAT4K', type: 'output' },
          ];
        } else {
          outputLines = [{ text: `cat: ${arg}: No such file or directory`, type: 'output', color: 'text-red-500' }];
        }
        break;

      case 'clear':
        setLines([]);
        return; 

      case 'exit':
        closeTerminal();
        return;

      case 'sudo':
        outputLines = [{ text: 'Permission denied: You are not root.', type: 'output', color: 'text-red-500 font-bold' }];
        break;

      case '':
        break;

      default:
        outputLines = [{ text: `Command not found: ${command}. Type 'help' for available commands.`, type: 'output', color: 'text-red-400' }];
    }

    setLines((prev) => [
      ...prev,
      { text: `guest@hans-system:${currentDir}$ ${cmd}`, type: 'input', color: 'text-zinc-300' },
      ...outputLines,
    ]);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setHistory((prev) => [...prev, input]);
      setHistoryIndex(-1); 
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(history.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setInput('');
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const formatLine = (line: Line) => {
    // Return component if present
    if (line.component) return line.component;

    if (!line.text) return null;
    
    if (line.type !== 'output') return <span className={line.color || 'text-zinc-400'}>{line.text}</span>;

    // Headers (Purple)
    if (line.text.startsWith('##')) {
      return <span className="text-purple-400 font-bold">{line.text}</span>;
    }
    
    // List Items with Green Arrows
    if (line.text.startsWith('>')) {
      return (
        <span>
          <span className="text-emerald-500 font-bold mr-2">{'>'}</span>
          <span className="text-zinc-300">{line.text.substring(1)}</span>
        </span>
      );
    }

    return <span className={line.color || 'text-zinc-400'}>{line.text}</span>;
  };

  return (
    <div 
      className="h-full w-full overflow-y-auto bg-[#0a0a0a] p-4 font-mono text-sm text-zinc-300 selection:bg-zinc-700 selection:text-white"
      onClick={handleFocus}
    >
      <div className="space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-words leading-tight min-h-[1.2em]">
             {line.component ? line.component : formatLine(line)}
          </div>
        ))}
      </div>

      {!isBooting && (
        <div className="mt-1 flex items-center">
          <span className="mr-2 text-emerald-500">guest@hans-system:{currentDir}$</span>
          <div className="relative flex-grow">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="absolute inset-0 h-full w-full bg-transparent opacity-0 cursor-text"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
            <span className="whitespace-pre-wrap text-zinc-100">
              {input}
              <span className="animate-blink inline-block h-4 w-2.5 bg-zinc-500 align-middle ml-[1px]" />
            </span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}