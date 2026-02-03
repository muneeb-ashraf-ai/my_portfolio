import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  description: string;
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      title: 'Python Developer Intern',
      company: 'Meissasoft',
      duration: 'July 2025 - Present',
      description: 'Gaining real-world insights into the market, project structuring, database management, API development, and application testing.'
    },
    {
      title: 'Trainee',
      company: 'Meissasoft',
      duration: 'May 2025 - July 2025',
      description: 'Learned Object-Oriented Programming (OOP), Data Structures and Algorithms (DSA), SQL, and FastAPI.'
    },
    {
      title: 'Teacher of Mathematics',
      company: 'Hajveri Lyceum School',
      duration: 'Aug 2023 - May 2025',
      description: 'Refined communication and problem-solving skills by making complex ideas accessible to young learners.'
    },
    {
      title: 'Remote Intern',
      company: 'InsightSol Technologies',
      duration: 'Apr 2024 - May 2024',
      description: 'Gained first experience in applying Machine Learning models in a structured setting.'
    },
    {
      title: 'Teacher of Mathematics',
      company: 'Ali Science Academy',
      duration: 'Jun 2018 - Mar 2020',
      description: 'Taught Mathematics during intermediate studies, which planted the seed for a lifelong passion for education.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen pt-32 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-lavender to-violet bg-clip-text text-transparent">
            Work Experience
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey across diverse roles in software development, education, and machine learning.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-lavender/30" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative pl-12"
              >
                <div className="absolute left-1 top-8 h-6 w-6 rounded-full bg-lavender shadow-lg shadow-lavender/30 border-4 border-midnight/80 dark:border-midnight" />
                <div className="absolute inset-0 bg-gradient-to-r from-lavender to-violet opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />
                
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-lavender/50 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold group-hover:text-lavender transition-colors mb-2 dark:text-white text-violet-700">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 text-lavender font-semibold mb-2">
                        <Briefcase size={18} />
                        {exp.company}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      <Calendar size={18} />
                      <span className="text-sm font-medium">{exp.duration}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Interested in learning more about my professional background?
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/assets/CV_Muneeb_Ashraf.pdf"
            download
            className="inline-block bg-gradient-to-r from-lavender to-violet text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-lavender/50 transition-all"
          >
            Download Resume
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
