
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC<{ theme: 'dark' | 'light' }> = ({ theme }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient layer */}
      <div className={`absolute inset-0 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-midnight via-[#0B080E] to-[#1a0d2e]' 
          : 'bg-gradient-to-br from-white via-[#f8f6ff] to-[#ede8ff]'
      }`} />

      {/* Primary animated blob */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 150, 0],
          y: [0, 80, 0],
          rotate: [0, 90, 180],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute -top-1/3 -left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-50 ${
          theme === 'dark' ? 'bg-[#6B3B8E]' : 'bg-[#D4A5FF]'
        }`}
      />

      {/* Secondary animated blob */}
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          x: [0, -120, 0],
          y: [0, 150, 0],
          rotate: [180, 90, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute top-1/3 -right-1/3 w-[700px] h-[700px] rounded-full blur-[140px] opacity-40 ${
          theme === 'dark' ? 'bg-[#3E1F5A]' : 'bg-[#C4B5FD]'
        }`}
      />

      {/* Tertiary animated blob */}
      <motion.div
        animate={{
          scale: [1.1, 1, 1.2],
          x: [0, 100, -50],
          y: [0, -120, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute -bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[130px] opacity-35 ${
          theme === 'dark' ? 'bg-[#7D4FB3]' : 'bg-[#E9D5FF]'
        }`}
      />

      {/* Extra accent blob for depth */}
      <motion.div
        animate={{
          scale: [1, 1.2, 0.9],
          x: [0, -80, 50],
          y: [0, 100, -50],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear"
        }}
        className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] opacity-25 ${
          theme === 'dark' ? 'bg-[#9D68C1]' : 'bg-[#F3E8FF]'
        }`}
      />
    </div>
  );
};

export default AnimatedBackground;
