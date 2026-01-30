import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';

interface AcademicDegree {
  title: string;
  institution: string;
  duration: string;
  major: string;
  details?: { label: string; value: string }[];
}

interface Course {
  provider: string;
  courses: string[];
}

const Education: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'degrees' | 'courses'>('degrees');

  const degrees: AcademicDegree[] = [
    {
      title: 'Master of Science (MS)',
      institution: 'University of Engineering and Technology (UET), Lahore, Pakistan',
      duration: '2025-2027',
      major: 'Data Science'
    },
    {
      title: 'Master of Science (MSc)',
      institution: 'Government College University (GCU), Lahore, Pakistan',
      duration: '2020-2023',
      major: 'Mathematics',
      details: [
        { label: 'CGPA', value: '3.37/4.00' }
      ]
    },
    {
      title: 'Bachelor of Science (BSc)',
      institution: 'Government Zamindar Postgraduate College, Gujrat, Pakistan',
      duration: '2018-2020',
      major: 'Mathematics and Physics',
      details: [
        { label: 'Final Marks', value: '597/800' },
        { label: 'Percentage', value: '74.63%' },
        { label: 'Affiliation', value: 'University of Gujrat (UOG)' }
      ]
    },
    {
      title: 'FSc - Pre Engineering',
      institution: 'Government Zamindar Postgraduate College, Gujrat, Pakistan',
      duration: '2016-2018',
      major: 'Mathematics, Physics, Chemistry',
      details: [
        { label: 'Final Marks', value: '891/1100' },
        { label: 'Percentage', value: '81%' },
        { label: 'Board', value: 'BISE Gujranwala' }
      ]
    },
    {
      title: 'Matriculation',
      institution: 'Government Municipal Model High School for Boys, Gujrat, Pakistan',
      duration: '2014-2016',
      major: 'Science',
      details: [
        { label: 'Final Marks', value: '918/1100' },
        { label: 'Percentage', value: '83.4%' },
        { label: 'Board', value: 'BISE Gujranwala' }
      ]
    }
  ];

  const courses: Course[] = [
    {
      provider: 'IELTS',
      courses: ['Overall Band: 7.0 (CEFR Level C1) - Listening 8.0, Writing 6.5, Speaking 6.0, Reading 7.5']
    },
    {
      provider: 'National Vocational & Technical Training Commission, Pakistan (NAVTTC)',
      courses: ['Artificial Intelligence (Machine Learning & Deep Learning) - Minhaj University, Lahore (Jun 2023 - Dec 2023)']
    },
    {
      provider: 'Coursera',
      courses: [
        'Data Science Math Skills - Duke University',
        'Introduction to Discrete Mathematics for Computer Science - UC San Diego',
        'Understanding Research Methods - University of London',
        'Introduction to Mathematical Thinking - Stanford University',
        'Algebra: Elementary to Advanced - Johns Hopkins University',
        'Expressway to Data Science: Essential Math - University of Colorado Boulder'
      ]
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
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-lavender to-violet bg-clip-text text-transparent">
            Education & Training
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my academic journey and professional development through various courses and certifications.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-12 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('degrees')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'degrees'
                ? 'bg-gradient-to-r from-lavender to-violet text-white shadow-lg shadow-lavender/50'
                : 'dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:border-white/20 bg-gray-200 text-midnight hover:bg-gray-300 border-gray-300'
            }`}
          >
            <GraduationCap className="inline mr-2" size={20} />
            Academic Degrees
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('courses')}
            className={`px-6 py-3 rounded-full font-semibold transition-all ${
              activeTab === 'courses'
                ? 'bg-gradient-to-r from-lavender to-violet text-white shadow-lg shadow-lavender/50'
                : 'dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:border-white/20 bg-gray-200 text-midnight hover:bg-gray-300 border-gray-300'
            }`}
          >
            <Award className="inline mr-2" size={20} />
            Courses & Specializations
          </motion.button>
        </div>

        {/* Content */}
        {activeTab === 'degrees' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {degrees.map((degree, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-lavender to-violet opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />
                
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-lavender/50 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold group-hover:text-lavender transition-colors mb-2 dark:text-white text-violet-700">
                        {degree.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-2">{degree.institution}</p>
                      <p className="text-lavender font-semibold mb-3">{degree.major}</p>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      <Calendar size={18} />
                      <span className="text-sm font-medium">{degree.duration}</span>
                    </div>
                  </div>

                  {degree.details && degree.details.length > 0 && (
                    <div className="pt-4 border-t border-white/10">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {degree.details.map((detail, i) => (
                          <div key={i} className="space-y-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">{detail.label}</p>
                            <p className="text-lavender font-semibold">{detail.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'courses' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {courses.map((courseGroup, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-lavender to-violet opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />
                
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-lavender/50 transition-all duration-300">
                  <h3 className="text-2xl font-bold group-hover:text-lavender transition-colors mb-6 dark:text-white text-violet-700">
                    {courseGroup.provider}
                  </h3>
                  
                  <div className="space-y-3">
                    {courseGroup.courses.map((course, i) => {
                      const [title, institute] = course.split(' - ');
                      return (
                        <div key={i} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-lavender mt-2 flex-shrink-0" />
                          <p className="text-gray-700 dark:text-gray-300">
                            {title}
                            {institute && (
                              <span className="text-lavender font-semibold"> {' — '}{institute}</span>
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Education;
