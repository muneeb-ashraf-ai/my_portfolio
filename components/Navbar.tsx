
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Github, Linkedin } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Theme } from '../types';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/', id: 'hero' },
    { label: 'Education', path: '/education', id: '' },
    { label: 'Experience', path: '/experience', id: '' },
    { label: 'Skills', path: '/skills', id: '' },
    { label: 'Projects', path: '/projects', id: '' },
    { label: 'Journey', path: '/journey', id: '' }
  ];

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/assets/resume.pdf';
    link.download = 'Muneeb_Ashraf_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.path === '/') {
      if (location.pathname !== '/') {
        navigate('/');
      }
      if (item.id) {
        setTimeout(() => {
          const element = document.getElementById(item.id);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate(item.path);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-40 px-6 py-4 flex justify-between items-center transition-all duration-500 border-b ${
        isScrolled 
          ? theme === 'dark' 
            ? 'bg-midnight/80 backdrop-blur-xl border-white/5 py-3' 
            : 'bg-white/80 backdrop-blur-xl border-black/5 py-3 shadow-sm'
          : 'bg-transparent border-transparent py-5'
      } ${theme === 'dark' ? 'text-white' : 'text-midnight'}`}
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-10 h-10 rounded-xl bg-lavender flex items-center justify-center text-white font-bold text-xl shadow-lg">
          M
        </div>
        <span className="font-bold tracking-tight hidden sm:inline">MUNEEB</span>
      </div>

      <div className={`hidden md:flex items-center gap-8 px-8 py-2 rounded-full transition-all duration-300 ${
        !isScrolled 
          ? theme === 'dark' ? 'glass-morphism' : 'glass-morphism-light'
          : ''
      }`}>
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNavClick(item)}
            className="text-sm font-medium hover:text-lavender transition-colors relative group"
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-lavender transition-all duration-300 group-hover:w-full" />
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3 mr-4">
          <a href="#" className="opacity-70 hover:opacity-100 cursor-pointer transition-all hover:text-lavender hover:drop-shadow-lg">
            <Github size={20} />
          </a>
          <a href="#" className="opacity-70 hover:opacity-100 cursor-pointer transition-all hover:text-lavender hover:drop-shadow-lg">
            <Linkedin size={20} />
          </a>
        </div>
        
        <button
          onClick={toggleTheme}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            theme === 'dark' ? 'bg-white/10 text-yellow-400' : 'bg-midnight/5 text-violet'
          }`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button 
          onClick={handleDownloadResume}
          className="hidden sm:inline bg-lavender text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          Resume
        </button>

        <button
          onClick={() => navigate('/contact')}
          className="bg-lavender text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          Contact
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
