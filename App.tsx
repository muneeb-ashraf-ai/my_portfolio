
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Bot } from 'lucide-react';
import { Theme } from './types';
import EntryExperience from './components/EntryExperience';
import Navbar from './components/Navbar';
import InteractiveParticleBackground from './components/InteractiveParticleBackground';
import Journey from './components/Journey';
import Home from './components/Home';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Education from './components/Education';

interface LayoutProps {
  children: React.ReactNode;
  theme: Theme;
  toggleTheme: () => void;
}

const CHATBOT_URL = 'https://muneeb-chatbot.vercel.app/';

const FloatingChatButton: React.FC<{ theme: Theme }> = ({ theme }) => {
  const [tooltip, setTooltip] = useState(false);
  const isDark = theme === 'dark';

  return (
    <div className="fixed bottom-24 right-8 z-50 flex items-center gap-3">
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className={`px-4 py-2 rounded-xl text-sm font-semibold shadow-xl whitespace-nowrap ${
              isDark ? 'bg-white/10 text-white border border-white/10 backdrop-blur-md' : 'bg-midnight/90 text-white'
            }`}
          >
            Chat with my AI Assistant
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        onClick={() => window.open(CHATBOT_URL, '_blank')}
        onMouseEnter={() => setTooltip(true)}
        onMouseLeave={() => setTooltip(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-lavender to-violet shadow-xl shadow-lavender/40 flex items-center justify-center text-white relative"
        aria-label="Open AI Chatbot"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-lavender opacity-40 animate-ping" />
        <Bot size={24} className="relative z-10" />
      </motion.button>
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children, theme, toggleTheme }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className={`min-h-screen selection:bg-lavender selection:text-white`}>
      <InteractiveParticleBackground theme={theme} />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-lavender z-50 origin-left" style={{ scaleX }} />
      {children}
      <FloatingChatButton theme={theme} />
    </div>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
    document.body.className = theme === 'dark' ? 'bg-midnight text-white' : 'bg-white text-midnight';
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <>
      <AnimatePresence>
        {!hasEntered && (
          <EntryExperience onComplete={() => setHasEntered(true)} />
        )}
      </AnimatePresence>
      <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <Home theme={theme} />
            </Layout>
          } 
        />
        <Route 
          path="/journey" 
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <Journey theme={theme} />
            </Layout>
          } 
        />
        <Route 
          path="/projects" 
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <Projects />
            </Layout>
          } 
        />
        <Route 
          path="/skills" 
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <Skills />
            </Layout>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <Contact />
            </Layout>
          } 
        />
        <Route 
          path="/experience" 
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <Experience />
            </Layout>
          } 
        />
        <Route 
          path="/education" 
          element={
            <Layout theme={theme} toggleTheme={toggleTheme}>
              <Education />
            </Layout>
          } 
        />
      </Routes>
    </Router>
    </>
  );
};

export default App;

