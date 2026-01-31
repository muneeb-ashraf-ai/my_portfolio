import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Code, Palette, Zap, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Theme } from '../types';
import { PROJECTS } from '../constants';

interface HomeProps {
  theme: Theme;
}

const Home: React.FC<HomeProps> = ({ theme }) => {
  const navigate = useNavigate();
  const [profileLoaded, setProfileLoaded] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Intro */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lavender/10 border border-lavender/20 text-lavender text-xs font-bold mb-6"
            >
              <Zap size={14} /> AVAILABLE FOR PROJECTS
            </motion.div>
            <h1 className={`text-5xl md:text-7xl font-extrabold leading-tight mb-6 ${theme === 'dark' ? '' : 'text-violet-700'}`}>
              Hi, I'm <span className="text-lavender">Muneeb</span>... <br />
              <span className={theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-lavender via-violet to-charcoal' : 'text-lavender'}>
                AI & Data Science Developer.
              </span>
            </h1>
            <p className="text-lg md:text-xl opacity-80 max-w-lg mb-8 leading-relaxed">
              I blend Mathematics with modern technology to build intelligent solutions in Machine Learning, Deep Learning, and Data Science.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-lavender text-white rounded-2xl font-bold shadow-xl shadow-lavender/30 flex items-center gap-2 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-lavender/50 transition-all">
                View My Work <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => navigate('/journey')}
                className={`px-8 py-4 rounded-2xl font-bold border ${
                  theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-midnight/10 hover:bg-midnight/5'
                } transition-all`}
              >
                My Journey
              </button>
            </div>
          </motion.div>

          {/* Right: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="order-1 md:order-2 relative"
          >
            <div className="aspect-square relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-lavender/10 group w-64 md:w-80 lg:w-96 mx-auto">
              <img 
                src="/assets/profile.webp" 
                alt="Muneeb - AI & Data Science Developer" 
                loading="lazy"
                decoding="async"
                onLoad={() => setProfileLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 scale-100 group-hover:opacity-100 ${
                  profileLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-lavender/30 via-violet/20 to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-700 mix-blend-overlay" />
              <div className="absolute inset-0 backdrop-blur-xl group-hover:backdrop-blur-0 transition-all duration-700 opacity-40 group-hover:opacity-0" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-lavender/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-violet/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Years in Tech', val: '03+' },
            { label: 'Projects Done', val: '15+' },
            { label: 'Technologies', val: '20+' },
            { label: 'Certifications', val: '08+' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <h2 className={`text-4xl md:text-5xl font-extrabold mb-2 ${theme === 'dark' ? 'text-lavender' : 'text-violet-700'}`}>{stat.val}</h2>
              <p className="text-sm opacity-60 font-medium uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? '' : 'text-violet-700'}`}>Selected <span className="text-lavender">Work</span></h2>
              <p className="opacity-60 max-w-md">A collection of projects where I've applied AI and Data Science solutions.</p>
            </div>
            <button onClick={() => navigate('/projects')} className="text-lavender font-bold flex items-center gap-2 group hover:gap-3 transition-all">
              View All Projects <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`group rounded-3xl overflow-hidden ${
                  theme === 'dark' ? 'glass-morphism hover:shadow-xl hover:shadow-lavender/30' : 'glass-morphism-light hover:shadow-xl hover:shadow-lavender/20'
                } transition-all duration-300`}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lavender/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-2 py-1 rounded-full bg-lavender/10 text-lavender uppercase tracking-wider group-hover:bg-lavender group-hover:text-white transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-lavender transition-colors">{project.title}</h3>
                  <p className="text-sm opacity-70 mb-6 leading-relaxed group-hover:opacity-90 transition-opacity">{project.description}</p>
                  <button className="p-3 rounded-full bg-lavender/10 text-lavender group-hover:bg-lavender group-hover:text-white group-hover:shadow-lg group-hover:shadow-lavender/40 transition-all">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${theme === 'dark' ? '' : 'text-violet-700'}`}>Elevating AI & <br /> <span className={theme === 'dark' ? 'text-transparent bg-clip-text bg-gradient-to-r from-lavender to-violet drop-shadow-lg' : 'text-lavender'}>
              Data Solutions
            </span></h2>
            <div className="space-y-8">
              {[
                { 
                  icon: <Code className="text-lavender group-hover:drop-shadow-lg transition-all" />, 
                  title: 'Machine Learning & Deep Learning', 
                  desc: 'Building intelligent models for classification, detection, and prediction tasks.' 
                },
                { 
                  icon: <Zap className="text-lavender group-hover:drop-shadow-lg transition-all" />, 
                  title: 'Full-Stack Development', 
                  desc: 'Creating end-to-end applications combining AI backends with interactive frontends.' 
                },
                { 
                  icon: <Palette className="text-lavender group-hover:drop-shadow-lg transition-all" />, 
                  title: 'Data Analysis & Visualization', 
                  desc: 'Transforming raw data into actionable insights with compelling visualizations.' 
                }
              ].map((service, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6 group hover:cursor-pointer"
                >
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-lavender/10 flex items-center justify-center group-hover:bg-lavender group-hover:text-white group-hover:shadow-lg group-hover:shadow-lavender/40 transition-all">
                    {service.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-lavender transition-colors">{service.title}</h4>
                    <p className="opacity-60 text-sm leading-relaxed group-hover:opacity-80 transition-opacity">{service.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className={`p-10 rounded-[3rem] ${theme === 'dark' ? 'glass-morphism' : 'glass-morphism-light'}`}>
             <h3 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? '' : 'text-violet-700'}`}>What I Bring</h3>
             <ul className="space-y-6">
                {[
                  'Strong foundation in Mathematics and Algorithms',
                  'Expertise in Python, ML/DL frameworks',
                  'Problem-solving with analytical thinking',
                  'Clean code and best practices',
                  'Passion for continuous learning'
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <CheckCircle2 size={24} className="text-lavender" />
                    <span className="font-medium opacity-80">{item}</span>
                  </motion.li>
                ))}
             </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6">
        <div className={`max-w-7xl mx-auto rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden ${
          theme === 'dark' ? 'bg-[#1E1428]' : 'bg-lavender/5'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-lavender/10 to-transparent pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl md:text-6xl font-extrabold mb-8 leading-tight ${theme === 'dark' ? '' : 'text-violet-700'}`}>
              Ready to collaborate on <br /> <span className="text-lavender">your next project?</span>
            </h2>
            <p className="text-xl opacity-60 mb-12 max-w-2xl mx-auto">
              Whether you need AI solutions, data analysis, or custom applications, let's create something amazing together!
            </p>
            <button className="px-12 py-5 bg-lavender text-white rounded-3xl font-bold text-lg shadow-2xl shadow-lavender/40 hover:scale-105 hover:shadow-3xl hover:shadow-lavender/60 active:scale-95 transition-all">
              Get In Touch
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 opacity-60 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm">© 2024 Muneeb Ashraf Portfolio. All rights reserved.</p>
          <div className="flex gap-8 text-sm font-bold">
            <a href="https://github.com/alphaaa-m" target="_blank" rel="noopener noreferrer" className="hover:text-lavender transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/muneeb-ashraf" target="_blank" rel="noopener noreferrer" className="hover:text-lavender transition-colors">LinkedIn</a>
            <a href="https://wa.me/923006275648" target="_blank" rel="noopener noreferrer" className="hover:text-lavender transition-colors">WhatsApp</a>
            <a href="mailto:muneebashraf.edu@gmail.com?subject=Hello%20Muneeb" className="hover:text-lavender transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
