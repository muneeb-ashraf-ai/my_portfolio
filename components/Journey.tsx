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
      image: "/assets/P1.png",
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
      image: "/assets/P2.png",
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
      image: "/assets/P3.png",
      content: `I was admitted to the MS Data Science program at UET Lahore, marking a new phase in my academic journey. Alongside my coursework, I kept deepening my knowledge of Data Science, Machine Learning, Artificial Intelligence, and modern software development.

During this time, I also stepped into industry as a Python Developer at Meissasoft. There, I worked on backend development using FastAPI, PostgreSQL, and MongoDB, building systems that had to be reliable, scalable, and maintainable, not just functionally correct. The role pushed me to sharpen my understanding of Object-Oriented Programming, adopt disciplined software engineering practices, and grow comfortable with Git-based collaborative workflows alongside a real engineering team.

This chapter marked a meaningful shift for me: moving from academic learning to real-world software development, where ideas had to survive contact with production code, deadlines, and other people's work. It was here that I truly understood what it means to build technology that others depend on.`
    },
    {
      title: "Teaching & Sharing Knowledge",
      icon: GraduationCap,
      color: "from-blue-500 to-cyan-500",
      content: `While pursuing my MS in Data Science and gaining industry experience, I got the chance to conduct a Python and AI training program at VIPER Academy, a natural return to where my journey first began. The training program introduced students from diverse academic backgrounds to Python programming, data fundamentals, and the foundations of Artificial Intelligence.

Through hands-on exercises and real-world examples, I watched students grow from hesitant beginners into confident problem-solvers. It let me combine my long-standing love of teaching with my growing expertise in AI, and reminded me why education has always felt like a powerful tool for transformation.

The experience sharpened my communication, mentoring, and leadership skills, and deepened my appreciation for teaching as a craft I never truly left behind.`
    },
    {
      title: "Conclusion",
      icon: Award,
      color: "from-violet to-lavender",
      content: `My journey has been a gradual transformation rather than a single decision. Mathematics built my analytical thinking and taught me to approach problems with patience and precision. Teaching developed my communication and leadership skills, shaping the way I connect with people and share ideas. Data Science and Artificial Intelligence connected my two lifelong passions, mathematics and technology, into a single path forward.

My time at Meissasoft gave me real-world software engineering experience, teaching me what it means to build systems that others rely on. My work in Voice AI research and development expanded my understanding of intelligent systems, pushing me beyond theory into the study of how AI truly listens, reasons, and responds. Teaching Python and AI at VIPER Academy reinforced my passion for sharing knowledge, reminding me that growth is most meaningful when it is passed on to others.

Financial limitations, academic interruptions, and repeated setbacks did not stop my progress. They refined my direction. Today, I am pursuing my MS in Data Science while building expertise in Artificial Intelligence, software engineering, and research, bridging academic depth with practical, real-world impact.

My long-term goal is to earn a PhD, contribute meaningful research in AI and Data Science, continue teaching, and build intelligent systems that make a genuine difference in people's lives.

The path is still unfolding, and I am moving forward with clarity, purpose, and an unwavering belief in what lies ahead.`
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'text-white' : 'text-midnight'} pt-32 pb-20 px-6 relative`}>
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
            
            // Determine if the image should be on the left or right to create an alternating layout
            // We use index % 2 to alternate. But only sections with an image actually render it.
            const isImageLeft = index % 2 !== 0;

            return (
              <div key={index} className={`flex flex-col ${section.image ? (isImageLeft ? 'lg:flex-row-reverse' : 'lg:flex-row') : ''} gap-10 items-center`}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex-1 group rounded-3xl overflow-hidden p-12 backdrop-blur-sm ${
                    theme === 'dark'
                      ? 'bg-white/5 border border-white/10 hover:border-lavender/50 shadow-lg hover:shadow-lavender/20'
                      : 'bg-black/5 border border-black/10 hover:border-lavender/50 shadow-lg hover:shadow-lavender/10'
                  } transition-all duration-300 w-full`}
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

                {/* Optional Image Outside the Card */}
                {section.image && (
                  <motion.div 
                    initial={{ opacity: 0, x: isImageLeft ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                    className="w-full lg:w-2/5 flex-shrink-0"
                  >
                    <img 
                      src={section.image} 
                      alt={section.title} 
                      className={`w-full h-auto rounded-3xl border-4 ${theme === 'dark' ? 'border-lavender/30 shadow-lavender/20' : 'border-lavender/50 shadow-lavender/40'} shadow-2xl object-cover hover:scale-105 transition-transform duration-500`}
                    />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>

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