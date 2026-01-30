import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  liveLink?: string;
  image?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'Project 1',
      description: 'A modern web application built with React and TypeScript. Features dynamic animations and smooth user experience.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      github: 'https://github.com',
      liveLink: 'https://example.com'
    },
    {
      title: 'Project 2',
      description: 'Full-stack application with real-time updates. Includes authentication, database integration, and REST API.',
      technologies: ['React', 'Node.js', 'MongoDB'],
      github: 'https://github.com',
      liveLink: 'https://example.com'
    },
    {
      title: 'Project 3',
      description: 'Interactive dashboard with data visualization. Built with modern web technologies and best practices.',
      technologies: ['React', 'D3.js', 'Express'],
      github: 'https://github.com',
      liveLink: 'https://example.com'
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-lavender to-violet bg-clip-text text-transparent">
            My Projects
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A collection of my recent work showcasing my skills in web development, design, and problem-solving.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-lavender to-violet opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />
              
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full flex flex-col hover:border-lavender/50 transition-all duration-300">
                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-lavender transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-lavender/10 text-lavender text-xs rounded-full font-medium border border-lavender/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-lavender transition-colors group/link"
                  >
                    <Github size={18} />
                    <span className="text-sm font-medium group-hover/link:underline">Code</span>
                  </a>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-400 hover:text-lavender transition-colors group/link"
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm font-medium group-hover/link:underline">Live</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
