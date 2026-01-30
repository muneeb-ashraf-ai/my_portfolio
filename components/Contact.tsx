import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'muneebashraf.edu@gmail.com',
      link: 'mailto:muneebashraf.edu@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '(+92) 3006275648',
      link: 'tel:+923006275648'
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'linkedin.com/in/muneeb-ashraf-ai',
      link: 'https://linkedin.com/in/muneeb-ashraf-ai'
    },
    {
      icon: Github,
      title: 'GitHub',
      value: 'github.com/alphaaa-m',
      link: 'https://github.com/alphaaa-m'
    }
  ];

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
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My passion lies at the intersection of mathematics, teaching, and technology. Whether you have a challenging problem to solve, an idea for a project, or a curiosity about my work, I'm always open to a conversation. Connect with me through any of the channels below and let's explore how we can create something impactful together.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {contactInfo.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={index}
                href={contact.link}
                target={contact.link.startsWith('mailto:') || contact.link.startsWith('tel:') ? undefined : '_blank'}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-lavender to-violet opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 blur-xl" />
                
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-lavender/50 transition-all duration-300 h-full flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="mb-4 p-4 bg-lavender/10 rounded-full"
                  >
                    <Icon size={32} className="text-lavender" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-lavender transition-colors">
                    {contact.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors break-all">
                    {contact.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Feel free to reach out using any of the methods above. I'll get back to you as soon as possible!
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="mailto:muneebashraf.edu@gmail.com"
              className="inline-block bg-gradient-to-r from-lavender to-violet text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-lavender/50 transition-all"
            >
              Send me an Email
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
