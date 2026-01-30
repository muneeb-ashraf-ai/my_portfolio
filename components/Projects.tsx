import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  github: string;
  image: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'Student Management System',
      description: 'A RESTful API with FastAPI for managing students, courses, and enrollments with JWT authentication.',
      github: 'https://github.com/alphaaa-m/Student_Management_System',
      image: '/assets/SMS_POSTER.png'
    },
    {
      title: 'Chess Game Engine',
      description: 'A command-line chess game in Python using OOP principles.',
      github: 'https://github.com/alphaaa-m/Chess_Game_Engine',
      image: '/assets/Chess_Game-Cover.png'
    },
    {
      title: 'House Price Prediction',
      description: 'Comparing various regression models to predict house prices.',
      github: 'https://github.com/alphaaa-m/House_Price_Prediction-Basic',
      image: '/assets/House_Price_Prediction_Cover.png'
    },
    {
      title: 'Heart Disease Prediction',
      description: 'Using ML to predict heart disease from clinical data.',
      github: 'https://github.com/alphaaa-m/Heart_Disease_Prediction',
      image: '/assets/Hear_Disease_Cover.png'
    },
    {
      title: 'Brain Tumor Detection',
      description: 'A CNN model to detect brain tumors from MRI images.',
      github: 'https://github.com/alphaaa-m/Brain_Tumor_Detection',
      image: '/assets/CNN.jpg'
    },
    {
      title: 'Credit Card Fraud Detection',
      description: 'A Random Forest model to detect fraudulent credit card transactions.',
      github: 'https://github.com/alphaaa-m/Credit_Card_Fraud_Detection',
      image: '/assets/CCFD.jpg'
    },
    {
      title: 'Student Performance Analysis',
      description: 'Using Multiple Linear Regression to predict student performance.',
      github: 'https://github.com/alphaaa-m/Student_Performance',
      image: '/assets/student_performance_analysis.png'
    }
  ];

  const otherProjects = [
    'Breast Cancer Diagnostic: An SVM-based diagnostic classifier for early breast cancer detection.',
    'Diabetes Classification: A Decision Tree model for classifying diabetes based on patient data.',
    'MNIST Digit Recognition: An Artificial Neural Network (ANN) that accurately recognizes handwritten digits from the MNIST dataset.',
    'CIFAR Image Classification: A project exploring various CNN architectures for image classification on the CIFAR-10 and CIFAR-100 datasets.',
    'Career ChatBot: An API-integrated chatbot that provides career recommendations.',
    'Ride Sharing Simulation: A basic ride-sharing simulation built with Object-Oriented Programming (OOP) to model drivers, riders, and rides.'
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
            Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my applied work across data science, machine learning, and API development.
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
              
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-full flex flex-col hover:border-lavender/50 transition-all duration-300">
                <div className="h-44 w-full overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 flex flex-col h-full">
                {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-lavender transition-colors dark:text-white text-violet-700">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">
                    {project.description}
                  </p>

                  {/* Links */}
                  <div className="flex gap-4 pt-4 border-t border-white/10">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-lavender transition-colors group/link"
                    >
                      <Github size={18} />
                      <span className="text-sm font-medium group-hover/link:underline">View on GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-6 dark:text-white text-violet-700">Other Projects</h2>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {otherProjects.map((item, i) => {
                const [name, detail] = item.split(':');
                return (
                  <li key={i} className="flex gap-3">
                    <span className="text-lavender">•</span>
                    <span>
                      <span className="font-semibold text-midnight dark:text-white">{name.trim()}</span>
                      {detail && <span className="text-gray-700 dark:text-gray-300">: {detail.trim()}</span>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
