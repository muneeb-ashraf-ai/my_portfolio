import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Target, Briefcase, GraduationCap, Heart, Zap, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Theme } from '../types';

interface JourneyProps {
  theme: Theme;
}

const Journey: React.FC<JourneyProps> = ({ theme }) => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "About Me",
      subtitle: "My Journey",
      icon: BookOpen,
      color: "from-lavender to-violet",
      content: `From an early age, I was fascinated by two things: numbers and technology. Mathematics gave me the thrill of solving problems, while technology sparked my curiosity about how the world could be transformed through innovation. Over time, I discovered that the real magic happens when the two come together. This realization guided every step of my academic and professional journey.`
    },
    {
      title: "A Path of Resilience",
      icon: Heart,
      color: "from-rose-500 to-pink-500",
      content: `I was born on March 10, 2000, in Gujrat, Pakistan. I began my schooling at Raza School Gujrat, where I studied up to class 8. For matriculation, I joined Government Municipal Model High School for Boys, where my major subjects were Mathematics, Physics, Chemistry, and Biology. With 918 out of 1100 marks, I performed well academically. Many people encouraged me to become a doctor, but my passion for Mathematics pulled me in another direction.

I enrolled in FSc Pre-Engineering at Government Zamindar Postgraduate College, Gujrat, scoring 819 out of 1100. While most around me leaned toward Biology, I chose Mathematics. During this period, I also discovered my talent for teaching and began teaching Mathematics at Ali Science Academy. This experience planted the seed of a lifelong passion for education.

Initially, I planned to pursue engineering and was even selected for a university program. But financial constraints forced me to rethink, so I opted for a more affordable option: a BSc in Mathematics and Physics at Zamindar College. My studies were interrupted when the COVID-19 pandemic hit Pakistan, delaying my plans for higher education.`
    },
    {
      title: "The Turning Point: MSc & Data Science",
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
      content: `By the time restrictions lifted, the government had decided to phase out MSc programs and adopt the international 4-year BS system. Only a few universities still offered MSc, and among them was Government College University, Lahore (GCUL). Determined not to abandon my goal, I moved to Lahore and completed my MSc in Mathematics with a CGPA of 3.37/4.0.

The MSc years became a turning point. I not only gained strong academic knowledge but also improved my confidence, problem-solving skills, and social experience. More importantly, I came across the field of Data Science. Fascinated, I began learning Python programming through YouTube tutorials. Soon, I was exploring Machine Learning, discovering how it connected Mathematics with technology—my two lifelong passions. Throughout my degree at GCUL, I stayed socially active. I was a member of the Chawla Mathematics Society, helping organize mathematical seminars and workshops. I also joined the Blood Donor Society, volunteering in blood donation drives and awareness campaigns.`
    },
    {
      title: "Career & The Quest for Knowledge",
      icon: Zap,
      color: "from-lavender to-violet",
      content: `After graduation, I had achieved my dream of becoming a teacher, but I set a new, bigger goal: to pursue a PhD. Teaching remained close to my heart, but I also wanted to explore a career in research and technology. After completing my MSc, I started teaching in a school. While teaching gave me satisfaction, I soon realized that in Pakistan it isn't a financially rewarding profession. I could barely meet my expenses, and it was clear that supporting a family would be very difficult with teaching alone. Around this time, I had already come across the term Data Science during my MSc days, which had sparked my curiosity. That realization, combined with the financial struggles of teaching, motivated me to explore technology more seriously. I began learning Python through YouTube tutorials, taking my first steps toward a career in tech while still holding on to my passion for Mathematics and education.

Around this time, I discovered a training program in Artificial Intelligence (Machine Learning and Deep Learning) at Minhaj University, Lahore, offered by NAVTTC. This was my formal entry into programming, where I built foundations in ML and DL. Alongside, I took multiple online courses from Coursera in areas like Data Science Math Skills (Duke University), Discrete Mathematics (UC San Diego), Mathematical Thinking (Stanford), Algebra (Johns Hopkins), and more. I also worked on projects like brain tumor detection using CNN, credit card fraud detection, diabetes classification, CIFAR image classification, and building a career chatbot. These experiences helped me merge Mathematics with modern AI applications.`
    },
    {
      title: "Professional Experience",
      icon: Briefcase,
      color: "from-violet to-lavender",
      content: `After that, I joined InsightSol Technologies for a one-month remote internship. My role was simple but valuable: I trained two machine learning algorithms using Python. While the exposure wasn't deep, it gave me my first taste of applying ML models in a structured setting and helped me understand the workflow of small projects.

Once the internship ended, I continued teaching at Hajveri Lyceum School, where I taught Mathematics to grades 5–9. Teaching kept me financially stable and, more importantly, allowed me to refine my communication and problem-solving skills by making complex ideas accessible to young learners.`
    },
    {
      title: "The Road Ahead",
      icon: Target,
      color: "from-lavender via-violet to-charcoal",
      content: `Along with teaching in school, I started preparing for my dream of studying abroad. I took the IELTS, securing an overall 7.0 band score (Listening 8.0, Reading 7.5, Writing 6.5, Speaking 6.0). I applied for foreign scholarships, but due to my 2+2 degree structure (BSc + MSc instead of a 4-year BS), I faced repeated rejections. This was a disheartening phase, but it didn't break my resolve. Instead, I decided to take a step-by-step approach: complete an MS in Pakistan first, and then reapply abroad for a PhD.

Currently, I am working in a more demanding and rewarding role at Meissasoft. This is a full-fledged internship where I not only focus on coding and projects but also gain a deeper understanding of how the industry functions. I practice Object-Oriented Programming (OOP) by building a Chess Game Engine and a Ride Sharing Simulation. I solve Data Structures and Algorithms problems on HackerRank, design SQL databases, and create a CRUD-based Student Management System using FastAPI and SQLAlchemy. Unlike my short internship at InsightSol, this experience gives me real insight into the market—how companies structure projects, manage databases, build APIs, and test applications before deployment. Here, I truly feel like a part of the tech ecosystem rather than just a learner.`
    },
    {
      title: "Conclusion",
      icon: Award,
      color: "from-violet to-lavender",
      content: `Also, I've been admitted to the MS Data Science program at UET. This is another milestone in my pursuit of excellence. With strong foundations in Mathematics, hands-on experience in Machine Learning and Deep Learning, and a passion for both teaching and research, I'm determined to grow into a researcher who not only advances AI but also uses it to solve real-world problems. My journey hasn't been smooth. Financial struggles, academic interruptions, and scholarship rejections have all been part of the path. But each challenge only strengthened my resilience and reinforced my purpose. Mathematics taught me logic, teaching taught me clarity, and Artificial Intelligence gave me a vision. My ultimate goal is to pursue a PhD, contribute to research in AI and Data Science, and continue teaching—sharing knowledge while creating impact through technology, along with practical use of AI for applications in software houses or as a freelancer.`
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-midnight text-white' : 'bg-white text-midnight'} pt-32 pb-20 px-6`}>
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-24 left-6 z-30 flex items-center gap-2 text-lavender hover:text-violet transition-colors font-bold"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto">
        {/* Header with Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-lavender to-violet">Journey</span>
          </h1>
          <p className="text-xl opacity-70 max-w-2xl mx-auto">
            A story of resilience, passion, and the pursuit of excellence through Mathematics, Technology, and Innovation.
          </p>
        </motion.div>

        {/* Journey Sections */}
        <div className="space-y-20">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative group rounded-3xl overflow-hidden p-12 backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'bg-white/5 border border-white/10 hover:border-lavender/50 shadow-lg hover:shadow-lavender/20'
                    : 'bg-black/5 border border-black/10 hover:border-lavender/50 shadow-lg hover:shadow-lavender/10'
                } transition-all duration-300`}
              >
                {/* Gradient Background with Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${section.color} opacity-0 group-hover:opacity-8 transition-opacity duration-500 rounded-3xl blur-sm`} />
                <div className={`absolute inset-0 bg-gradient-to-r ${section.color} opacity-0 group-hover:opacity-3 transition-opacity duration-500 rounded-3xl`} />

                {/* Icon and Title Section */}
                <div className="relative z-10 flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-lavender/20 border border-lavender/30 shadow-lg shadow-lavender/20 group-hover:shadow-lavender/40 transition-all">
                    <Icon className="text-lavender group-hover:drop-shadow-lg transition-all" size={28} />
                  </div>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-lavender group-hover:to-violet transition-all">{section.title}</h2>
                    {section.subtitle && <p className="text-sm opacity-60">{section.subtitle}</p>}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10 text-lg leading-relaxed opacity-85 group-hover:opacity-95 space-y-4 transition-opacity">
                  {section.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} className="text-justify">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Decorative line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-lavender to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>

        {/* Timeline Visualization - Vertical line connecting sections */}
        <div className="hidden md:block absolute left-1/2 top-96 bottom-0 w-1 -translate-x-1/2 bg-gradient-to-b from-lavender/30 to-transparent -z-10" />

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`mt-24 p-12 rounded-3xl text-center ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-lavender/10 to-violet/10 border border-lavender/20'
              : 'bg-gradient-to-r from-lavender/5 to-violet/5 border border-lavender/10'
          }`}
        >
          <h3 className="text-3xl font-bold mb-4">Let's Build Something Amazing Together</h3>
          <p className="text-lg opacity-70 mb-8 max-w-xl mx-auto">
            I'm always excited to discuss new opportunities, collaborate on impactful projects, and share knowledge.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="px-10 py-4 bg-gradient-to-r from-lavender to-violet text-white rounded-2xl font-bold shadow-xl shadow-lavender/20 hover:scale-105 transition-transform"
          >
            Get In Touch
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Journey;
