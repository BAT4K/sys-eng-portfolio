// context/TerminalContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface TerminalContextType {
  isOpen: boolean;
  toggleTerminal: () => void;
  closeTerminal: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleTerminal = () => setIsOpen((prev) => !prev);
  const closeTerminal = () => setIsOpen(false);

  return (
    <TerminalContext.Provider value={{ isOpen, toggleTerminal, closeTerminal }}>
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error('useTerminal must be used within a TerminalProvider');
  }
  return context;
}