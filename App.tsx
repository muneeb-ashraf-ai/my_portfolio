
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Theme } from './types';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import InteractiveParticleBackground from './components/InteractiveParticleBackground';
import Journey from './components/Journey';
import Home from './components/Home';

interface LayoutProps {
  children: React.ReactNode;
  theme: Theme;
  toggleTheme: () => void;
}

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
      <Chatbot theme={theme} />
    </div>
  );
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    document.documentElement.className = theme;
    document.body.className = theme === 'dark' ? 'bg-midnight text-white' : 'bg-white text-midnight';
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
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
      </Routes>
    </Router>
  );
};

export default App;

