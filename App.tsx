
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Theme } from './types';
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
  );
};

export default App;

