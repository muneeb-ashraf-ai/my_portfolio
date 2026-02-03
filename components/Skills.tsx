import React from 'react';
import { motion } from 'framer-motion';

interface Skill {
  category: string;
  skills: string[];
  icon?: string;
}

const Skills: React.FC = () => {
  const skillCategories: Skill[] = [
    {
      category: 'Programming & Libraries',
      skills: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'SQL', 'FastAPI', 'SQLAlchemy', 'TensorFlow/Keras', 'PipeCat', 'UV']
    },
    {
      category: 'ML & Concepts',
      skills: ['Machine Learning', 'Deep Learning', 'OOP', 'Data Structures', 'Algorithms']
    },
    {
      category: 'Tools & Platforms',
      skills: ['Jupyter Notebook', 'Microsoft Office', 'LaTeX', 'Canva', 'Git & GitHub']
    },
    {
      category: 'Soft Skills - Interpersonal',
      skills: ['Communication', 'Emotional Intelligence']
    },
    {
      category: 'Soft Skills - Professional',
      skills: ['Time Management', 'Adaptability', 'Resilience', 'Creativity', 'Leadership']
    },
    {
      category: 'Languages',
      skills: ['Urdu (Fluent)', 'English (Proficient)']
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

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
            My Skills
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My journey from a mathematician to an AI enthusiast has equipped me with a diverse set of skills. While my technical abilities allow me to build and analyze, my soft skills—honed through years of teaching and leadership—are what truly help me collaborate and innovate. This is my professional toolkit, refined by both academic rigor and real-world application.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-8"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-lavender to-violet opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />
              
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-lavender/50 transition-all duration-300">
                {/* Category Title */}
                <h3 className="text-2xl font-bold mb-6 group-hover:text-lavender transition-colors dark:text-white text-violet-700">
                  {category.category}
                </h3>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: skillIndex * 0.05 }}
                      className="px-4 py-2 bg-gradient-to-r from-lavender/20 to-violet/20 text-midnight dark:text-white border border-lavender/40 rounded-full font-medium text-sm hover:shadow-lg hover:shadow-lavender/20 transition-all duration-300 hover:scale-105 cursor-default"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
