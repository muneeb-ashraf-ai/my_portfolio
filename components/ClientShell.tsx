"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './Navbar';
import Chatbot from './Chatbot';
import InteractiveParticleBackground from './InteractiveParticleBackground';
import { ThemeProvider } from './ThemeContext';
import type { Theme } from '@/types';

interface ClientShellProps {
  children: React.ReactNode;
}

const ClientShell: React.FC<ClientShellProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
    setMounted(true);
  }, []);

  // Update DOM and localStorage when theme changes
  useEffect(() => {
    if (!mounted) return;
    
    document.documentElement.className = theme;
    const bgColor = theme === 'dark' ? 'bg-midnight' : 'bg-paleLavender';
    const textColor = theme === 'dark' ? 'text-white' : 'text-midnight';
    document.body.className = `${bgColor} ${textColor} theme-transition`;
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider theme={theme} toggleTheme={toggleTheme}>
      <div className="min-h-screen selection:bg-lavender selection:text-white overflow-hidden">
        <InteractiveParticleBackground />
        <Navbar />
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-lavender z-50 origin-left"
          style={{ scaleX }}
        />
        {children}
        <Chatbot />
      </div>
    </ThemeProvider>
  );
};

export default ClientShell;
