
import { Project, FAQ } from './types';

export const COLORS = {
  white: '#FFFFFF',
  lavender: '#6B3B8E',
  violet: '#3E1F5A',
  charcoal: '#1E1428',
  midnight: '#0B080E',
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Brain Tumor Detection",
    description: "A CNN model to detect brain tumors from MRI images.",
    image: "/assets/CNN.jpg",
    tags: ["CNN", "Deep Learning", "Medical Imaging"]
  },
  {
    id: 2,
    title: "Student Management System",
    description: "A RESTful API with FastAPI for managing students, courses, and enrollments with JWT authentication.",
    image: "/assets/SMS_POSTER.png",
    tags: ["FastAPI", "REST API", "JWT"]
  },
  {
    id: 3,
    title: "House Price Prediction",
    description: "Comparing various regression models to predict house prices.",
    image: "/assets/House_Price_Prediction_Cover.png",
    tags: ["Regression", "ML", "Data Analysis"]
  }
];

export const FAQS: FAQ[] = [
  {
    question: "What is your email address?",
    answer: "muneebashraf.edu@gmail.com",
    keywords: ["email", "mail", "gmail", "contact email"],
    links: [{ text: "Contact me", url: "/contact" }]
  },
  {
    question: "What is your phone number?",
    answer: "(+92) 3006275648",
    keywords: ["phone", "number", "call", "mobile", "whatsapp"],
    links: [{ text: "Contact page", url: "/contact" }]
  },
  {
    question: "What is your LinkedIn profile?",
    answer: "linkedin.com/in/muneeb-ashraf-ai",
    keywords: ["linkedin", "profile", "social"],
    links: [{ text: "Visit LinkedIn", url: "https://linkedin.com/in/muneeb-ashraf-ai" }]
  },
  {
    question: "What is your GitHub profile?",
    answer: "github.com/alphaaa-m",
    keywords: ["github", "code", "repo", "repositories"],
    links: [{ text: "Visit GitHub", url: "https://github.com/alphaaa-m" }]
  },
  {
    question: "Can I download your resume?",
    answer: "Yes. Use the Resume button in the header or download from /assets/resume.pdf.",
    keywords: ["resume", "cv", "download"],
    links: [{ text: "Download Resume", url: "/assets/resume.pdf" }]
  },
  {
    question: "What are your featured projects?",
    answer: "Featured projects include Brain Tumor Detection, Student Management System, and House Price Prediction.",
    keywords: ["featured", "selected work", "projects", "brain tumor", "student management", "house price"],
    links: [{ text: "View all projects", url: "/projects" }]
  },
  {
    question: "Tell me about Brain Tumor Detection project",
    answer: "A CNN model to detect brain tumors from MRI images.",
    keywords: ["brain tumor", "cnn", "mri", "detection"],
    links: [{ text: "View project", url: "/projects" }]
  },
  {
    question: "Tell me about Student Management System",
    answer: "A RESTful API built with FastAPI to manage students, courses, and enrollments with JWT authentication.",
    keywords: ["student management", "fastapi", "jwt", "rest", "api"]
  },
  {
    question: "Tell me about House Price Prediction",
    answer: "A comparison of regression models for predicting house prices.",
    keywords: ["house price", "regression", "prediction"]
  },
  {
    question: "What other projects have you done?",
    answer: "Other projects include Chess Game Engine, Heart Disease Prediction, Credit Card Fraud Detection, Student Performance Analysis, Breast Cancer Diagnostic, Diabetes Classification, MNIST Digit Recognition, CIFAR Image Classification, Career ChatBot, and Ride Sharing Simulation.",
    keywords: ["other projects", "additional", "chess", "heart disease", "fraud", "student performance", "mnist", "cifar", "chatbot", "ride sharing"]
  },
  {
    question: "What is your current role?",
    answer: "Python Developer Intern at Meissasoft (July 2025 – Present).",
    keywords: ["current role", "current job", "present", "intern", "meissasoft"]
  },
  {
    question: "What experience do you have?",
    answer: "Experience includes Python Developer Intern and Trainee at Meissasoft, Mathematics Teacher at Hajveri Lyceum School and Ali Science Academy, and a Remote ML internship at InsightSol Technologies.",
    keywords: ["experience", "work", "jobs", "roles", "internship", "teacher"],
    links: [{ text: "View Experience", url: "/journey" }]
  },
  {
    question: "Where did you work as a teacher?",
    answer: "Hajveri Lyceum School (Aug 2023 – May 2025) and Ali Science Academy (Jun 2018 – Mar 2020).",
    keywords: ["teacher", "mathematics teacher", "school", "academy"]
  },
  {
    question: "What is your education background?",
    answer: "MS Data Science at UET Lahore (2025–2027), MSc Mathematics at GCU Lahore (2020–2023, CGPA 3.37/4.00), BSc Mathematics & Physics (2018–2020), FSc Pre-Engineering (2016–2018), and Matriculation (2014–2016).",
    keywords: ["education", "degree", "ms", "msc", "bsc", "fsc", "matric"],
    links: [{ text: "View Education", url: "/journey" }]
  },
  {
    question: "Where are you studying MS?",
    answer: "University of Engineering and Technology (UET), Lahore, Pakistan — MS Data Science (2025–2027).",
    keywords: ["uet", "ms data science", "masters"]
  },
  {
    question: "What is your MSc CGPA?",
    answer: "3.37/4.00 in MSc Mathematics from GCU Lahore.",
    keywords: ["cgpa", "gcu", "msc", "grade"]
  },
  {
    question: "What courses and certifications do you have?",
    answer: "IELTS (Overall 7.0, CEFR C1), NAVTTC AI (ML & DL) at Minhaj University, and multiple Coursera courses including Data Science Math Skills, Discrete Mathematics, Research Methods, Mathematical Thinking, Algebra, and Essential Math for Data Science.",
    keywords: ["courses", "certifications", "navttc", "coursera", "ielts"]
  },
  {
    question: "What is NAVTTC?",
    answer: "NAVTTC stands for National Vocational & Technical Training Commission, Pakistan.",
    keywords: ["navttc", "full form", "national vocational"]
  },
  {
    question: "What is your IELTS score?",
    answer: "Overall 7.0 (CEFR C1) — Listening 8.0, Reading 7.5, Writing 6.5, Speaking 6.0.",
    keywords: ["ielts", "band", "score"]
  },
  {
    question: "What are your technical skills?",
    answer: "Python, NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, SQL, FastAPI, SQLAlchemy, TensorFlow/Keras, pipecat, uv, Machine Learning, Deep Learning, OOP, Data Structures, Algorithms.",
    keywords: ["skills", "technical", "python", "fastapi", "sql", "ml", "deep learning", "pipecat", "uv"],
    links: [{ text: "View Skills", url: "/skills" }]
  },
  {
    question: "What tools do you use?",
    answer: "Jupyter Notebook, Microsoft Office, LaTeX, Canva, Git & GitHub.",
    keywords: ["tools", "platforms", "jupyter", "latex", "canva", "git"],
    links: [{ text: "View Tools", url: "/skills" }]
  },
  {
    question: "What are your soft skills?",
    answer: "Communication, Emotional Intelligence, Time Management, Adaptability, Resilience, Creativity, Leadership.",
    keywords: ["soft skills", "communication", "leadership", "adaptability"]
  },
  {
    question: "Where are you based?",
    answer: "Based in Pakistan (Gujrat/Lahore) and open to remote collaboration.",
    keywords: ["based", "location", "pakistan", "gujrat", "lahore"]
  },
  {
    question: "Can you do AI projects?",
    answer: "Yes.",
    keywords: ["ai projects", "ai", "ml", "deep learning", "machine learning", "data science", "model"]
  },
  {
    question: "Can you teach me?",
    answer: "Yes.",
    keywords: ["teach", "tutor", "mentorship", "mentor", "training", "coaching", "guidance"]
  },
  {
    question: "Can you build AI systems?",
    answer: "Yes.",
    keywords: ["build", "ai system", "ai application", "ai app"]
  },
  {
    question: "Can you create machine learning models?",
    answer: "Yes.",
    keywords: ["create", "ml model", "machine learning model", "train model"]
  },
  {
    question: "Can you help with data science projects?",
    answer: "Yes.",
    keywords: ["data science", "data analysis", "analytics", "prediction"]
  },
  {
    question: "Can you guide me in AI or data science?",
    answer: "Yes.",
    keywords: ["guide", "ai", "data science", "learning path", "study"]
  },
  {
    question: "Do you offer tutoring?",
    answer: "Yes.",
    keywords: ["tutoring", "teach", "lessons", "classes"]
  },
  {
    question: "Can you help me learn Python?",
    answer: "Yes.",
    keywords: ["learn python", "python tutoring", "python help"]
  },
  {
    question: "Who are you?",
    answer: "I’m Muneeb Ashraf, an aspiring Machine Learning and Data Science professional with a strong academic background in Mathematics and hands-on experience in AI, ML, and backend development.",
    keywords: ["who", "about you", "introduction", "profile"],
    links: [{ text: "View Full Journey", url: "/journey" }]
  },
  {
    question: "How can I contact you?",
    answer: "You can contact me via email at muneebashraf.edu@gmail.com, phone or WhatsApp at (+92) 3006275648, or through LinkedIn and GitHub.",
    keywords: ["contact", "email", "phone", "reach", "message"],
    links: [{ text: "Contact page", url: "/contact" }]
  },
  {
    question: "Are you open to remote work?",
    answer: "Yes, I am open to remote roles, internships, collaborations, and freelance opportunities.",
    keywords: ["remote", "work from home", "online", "freelance"]
  },

  /* ===================== EDUCATION & MATHEMATICS ===================== */
  {
    question: "Do you know calculus?",
    answer: "Yes. I hold an MSc degree in Mathematics and have a strong command of calculus, including limits, differentiation, integration, and multivariable calculus. I can also teach and guide others in it.",
    keywords: ["calculus", "integration", "derivatives", "limits"]
  },
  {
    question: "Do you have a strong mathematics background?",
    answer: "Yes. I have an MSc in Mathematics from GCU Lahore and a BSc in Mathematics and Physics, which gives me a solid theoretical foundation for data science and machine learning.",
    keywords: ["mathematics", "math background", "theory"]
  },
  {
    question: "Can you teach mathematics?",
    answer: "Yes. I have professional teaching experience as a Mathematics Teacher for grades 5–9 and have taught concepts ranging from basic math to advanced topics.",
    keywords: ["teach math", "math tutor", "teacher"]
  },
  {
    question: "Do you know linear algebra?",
    answer: "Yes. Linear algebra is a core part of my mathematics education and data science training, including vectors, matrices, eigenvalues, and applications in ML.",
    keywords: ["linear algebra", "matrices", "vectors"]
  },
  {
    question: "Do you know probability and statistics?",
    answer: "Yes. I studied probability and statistics during my MSc Mathematics and applied them extensively in machine learning models and data analysis projects.",
    keywords: ["probability", "statistics", "stats"]
  },
  {
    question: "Do you understand discrete mathematics?",
    answer: "Yes. I completed a Coursera course on Discrete Mathematics for Computer Science and apply it in algorithms and problem-solving.",
    keywords: ["discrete math", "logic", "sets", "graphs"]
  },

  /* ===================== DATA SCIENCE & AI ===================== */
  {
    question: "Are you a data scientist?",
    answer: "I am an aspiring Data Scientist currently pursuing an MS in Data Science and actively building real-world machine learning and analytics projects.",
    keywords: ["data scientist", "data science"]
  },
  {
    question: "Can you build machine learning models?",
    answer: "Yes. I have built and evaluated multiple machine learning models for classification, regression, and anomaly detection using Python and scikit-learn.",
    keywords: ["machine learning", "ml models", "training"]
  },
  {
    question: "Do you know deep learning?",
    answer: "Yes. I have hands-on experience with deep learning, including CNNs and ANNs, using TensorFlow and Keras.",
    keywords: ["deep learning", "cnn", "ann"]
  },
  {
    question: "Do you have experience with computer vision?",
    answer: "Yes. I worked on computer vision projects like Brain Tumor Detection and CIFAR image classification using CNNs.",
    keywords: ["computer vision", "images", "cnn"]
  },
  {
    question: "Can you explain machine learning concepts?",
    answer: "Yes. With my mathematics background and teaching experience, I can explain ML concepts clearly, from fundamentals to practical applications.",
    keywords: ["explain ml", "ml concepts", "theory"]
  },

  /* ===================== PROGRAMMING & TOOLS ===================== */
  {
    question: "Do you know Python?",
    answer: "Yes. Python is my primary programming language, and I use it for data analysis, machine learning, backend APIs, and simulations.",
    keywords: ["python", "programming"]
  },
  {
    question: "Which Python libraries do you use?",
    answer: "I regularly use NumPy, Pandas, Matplotlib, Seaborn, scikit-learn, TensorFlow/Keras, SQLAlchemy, and NLTK.",
    keywords: ["numpy", "pandas", "sklearn", "tensorflow"]
  },
  {
    question: "Do you use FastAPI?",
    answer: "Yes. I have built RESTful APIs using FastAPI, including authentication, CRUD operations, and database integration.",
    keywords: ["fastapi", "api", "backend"]
  },
  {
    question: "Do you have experience with voice bots or pipecat?",
    answer: "Yes. I have hands-on experience with pipecat for building real-time voice bot workflows and conversational AI systems. I can build complete voice-based conversational applications.",
    keywords: ["voice bot", "voice bots", "pipecat", "speech", "real-time", "conversational"],
    links: [{ text: "View Projects", url: "/projects" }]
  },
  {
    question: "pipecat?",
    answer: "Yes. I have hands-on experience with pipecat for building real-time voice bot workflows and conversational AI systems. I can build complete voice-based conversational applications.",
    keywords: ["pipecat"]
  },
  {
    question: "Do you know SQL and databases?",
    answer: "Yes. I have experience with SQL, PostgreSQL, MongoDB, and database design using SQLAlchemy.",
    keywords: ["sql", "database", "postgres", "mongodb"]
  },
  {
    question: "Do you use Git and GitHub?",
    answer: "Yes. I use Git for version control and GitHub to manage and share my projects.",
    keywords: ["git", "github", "version control"]
  },

  /* ===================== PROJECT-SPECIFIC ===================== */
  {
    question: "Tell me about your Brain Tumor Detection project",
    answer: "It is a CNN-based deep learning project that detects brain tumors from MRI images using TensorFlow and Keras.",
    keywords: ["brain tumor", "medical imaging", "cnn"]
  },
  {
    question: "Tell me about your Student Management System",
    answer: "It is a CRUD-based web application built with FastAPI and SQLAlchemy to manage students, courses, and enrollments.",
    keywords: ["student management", "crud", "fastapi"]
  },
  {
    question: "Tell me about your House Price Prediction project",
    answer: "I compared over 8 regression models using scikit-learn to predict house prices and evaluated their performance.",
    keywords: ["house price", "regression", "prediction"]
  },
  {
    question: "Have you worked on simulations?",
    answer: "Yes. I built a Ride Sharing Simulation and a Chess Game Engine using object-oriented programming in Python.",
    keywords: ["simulation", "oop", "chess", "ride sharing"]
  },

  /* ===================== TEACHING & MENTORSHIP ===================== */
  {
    question: "Can you mentor beginners in AI or data science?",
    answer: "Yes. I can guide beginners with a structured learning path based on mathematics, Python, and practical projects.",
    keywords: ["mentor", "guidance", "beginner"]
  },
  {
    question: "Can you teach Python or machine learning?",
    answer: "Yes. With my teaching background and industry projects, I can teach Python, ML fundamentals, and applied data science.",
    keywords: ["teach python", "ml tutor", "coach"]
  },

  /* ===================== EXPERIENCE ===================== */
  {
    question: "Do you have industry experience?",
    answer: "Yes. I have worked as a Python Developer Intern, ML Intern, Data Analyst, and Mathematics Teacher.",
    keywords: ["experience", "industry", "work"]
  },
  {
    question: "Where are you currently working?",
    answer: "I am currently working as a Python Developer Intern at Meissasoft in Lahore.",
    keywords: ["current job", "meissasoft"]
  },

  /* ===================== LANGUAGE & COMMUNICATION ===================== */
  {
    question: "Which languages do you speak?",
    answer: "I speak Urdu fluently and English at a professional working proficiency level.",
    keywords: ["languages", "english", "urdu"]
  },
  /* ===================== IDENTITY & EARLY LIFE ===================== */
  {
    question: "Where and when were you born?",
    answer: "I was born on March 10, 2000, in Gujrat, Pakistan.",
    keywords: ["born", "birthplace", "date of birth", "gujrat"]
  },
  {
    question: "What interested you from an early age?",
    answer: "From an early age, I was fascinated by numbers and technology—problem-solving through mathematics and the transformative power of technology.",
    keywords: ["early interest", "childhood", "numbers", "technology"]
  },
  {
    question: "How did mathematics and technology shape your journey?",
    answer: "I realized that mathematics provides the logic while technology provides the application, and combining both became the foundation of my academic and professional path.",
    keywords: ["math and tech", "journey", "career path"]
  },

  /* ===================== SCHOOL & MATRIC ===================== */
  {
    question: "Where did you complete your early education and matriculation?",
    answer: "I studied up to class 8 at Raza School Gujrat and completed my matriculation from Government Municipal Model High School for Boys.",
    keywords: ["school", "matric", "early education"]
  },
  {
    question: "What subjects did you study in matric and how did you perform?",
    answer: "My major subjects were Mathematics, Physics, Chemistry, and Biology. I scored 918 out of 1100 marks.",
    keywords: ["matric subjects", "marks", "academics"]
  },
  {
    question: "Why didn’t you pursue medicine despite encouragement?",
    answer: "Although many encouraged me to become a doctor, my natural inclination and passion for mathematics guided me toward a different path.",
    keywords: ["medicine", "doctor", "career choice"]
  },

  /* ===================== FSC & TEACHING ===================== */
  {
    question: "Where did you complete FSc and what was your focus?",
    answer: "I completed FSc Pre-Engineering from Government Zamindar Postgraduate College, Gujrat, with Mathematics as my primary focus, scoring 819 out of 1100.",
    keywords: ["fsc", "pre engineering", "college"]
  },
  {
    question: "When did you start teaching and why?",
    answer: "During my FSc, I began teaching Mathematics at Ali Science Academy after discovering my ability to explain concepts clearly and effectively.",
    keywords: ["teaching start", "ali science academy", "math teacher"]
  },

  /* ===================== BSC & FINANCIAL STRUGGLES ===================== */
  {
    question: "Why didn’t you pursue engineering despite being selected?",
    answer: "Due to financial constraints, I had to choose a more affordable option and enrolled in a BSc in Mathematics and Physics instead.",
    keywords: ["engineering", "financial constraints", "bsc"]
  },
  {
    question: "How did COVID-19 affect your education?",
    answer: "The COVID-19 pandemic disrupted my studies and delayed my plans for higher education.",
    keywords: ["covid", "pandemic", "education delay"]
  },

  /* ===================== MSC TURNING POINT ===================== */
  {
    question: "Why did you pursue an MSc in Mathematics?",
    answer: "With MSc programs being phased out, I chose to pursue one of the remaining opportunities at GCU Lahore to strengthen my academic foundation.",
    keywords: ["msc", "mathematics", "gcu"]
  },
  {
    question: "What was your MSc result and experience?",
    answer: "I completed my MSc in Mathematics from GCU Lahore with a CGPA of 3.37/4.0, gaining confidence, academic depth, and social exposure.",
    keywords: ["msc cgpa", "academic growth"]
  },
  {
    question: "When did you discover Data Science?",
    answer: "During my MSc, I discovered Data Science and realized it perfectly connects mathematics with technology.",
    keywords: ["data science discovery", "turning point"]
  },

  /* ===================== PYTHON & AI LEARNING ===================== */
  {
    question: "How did you start learning programming?",
    answer: "I started learning Python through self-study using YouTube tutorials, driven by curiosity and career goals.",
    keywords: ["learn python", "self study", "youtube"]
  },
  {
    question: "Why did you move toward Machine Learning?",
    answer: "Machine Learning allowed me to apply mathematical concepts to real-world problems using technology.",
    keywords: ["machine learning", "transition", "ai"]
  },

  /* ===================== SOCIETIES & VOLUNTEERING ===================== */
  {
    question: "Were you involved in extracurricular activities?",
    answer: "Yes. I was a member of the Chawla Mathematics Society and the Blood Donor Society at GCU Lahore.",
    keywords: ["societies", "extracurricular", "volunteering"]
  },
  {
    question: "What roles did you play in student societies?",
    answer: "I helped organize mathematical seminars and workshops and volunteered in blood donation drives and awareness campaigns.",
    keywords: ["seminars", "workshops", "blood donation"]
  },

  /* ===================== CAREER REALITY & MOTIVATION ===================== */
  {
    question: "Why did you shift focus from teaching to technology?",
    answer: "While teaching was fulfilling, financial limitations in Pakistan motivated me to seriously pursue technology alongside education.",
    keywords: ["career shift", "teaching income", "motivation"]
  },

  /* ===================== NAVTTC & COURSES ===================== */
  {
    question: "What is NAVTTC and how did it help you?",
    answer: "NAVTTC is a government training program where I formally learned Machine Learning and Deep Learning, marking my structured entry into AI.",
    keywords: ["navttc", "ai training", "ml dl"]
  },
  {
    question: "Which online courses have you completed?",
    answer: "I completed multiple Coursera courses from Duke, Stanford, UC San Diego, Johns Hopkins, and University of Colorado Boulder.",
    keywords: ["coursera", "online courses", "certifications"]
  },

  /* ===================== PROJECT EXPERIENCE ===================== */
  {
    question: "What type of AI projects have you worked on?",
    answer: "I’ve worked on projects including Brain Tumor Detection, Credit Card Fraud Detection, Diabetes Classification, CIFAR Image Classification, and a Career Chatbot.",
    keywords: ["ai projects", "ml projects", "cnn"]
  },

  /* ===================== INSIGHTSOL INTERNSHIP ===================== */
  {
    question: "What was your first industry internship experience?",
    answer: "I completed a one-month remote ML internship at InsightSol Technologies, where I trained two machine learning algorithms using Python.",
    keywords: ["insightsol", "ml internship", "remote"]
  },

  /* ===================== TEACHING EXPERIENCE ===================== */
  {
    question: "What teaching experience do you have?",
    answer: "I taught Mathematics to grades 5–9 at Hajveri Lyceum School, improving my communication and problem-solving skills.",
    keywords: ["teaching experience", "math teacher", "school"]
  },

  /* ===================== IELTS & STUDY ABROAD ===================== */
  {
    question: "What is your IELTS score and why did you take it?",
    answer: "I took IELTS as part of my plan to study abroad and scored an overall 7.0 band.",
    keywords: ["ielts", "study abroad", "english test"]
  },
  {
    question: "Why were your foreign scholarship applications rejected?",
    answer: "Due to my 2+2 degree structure (BSc + MSc instead of a 4-year BS), I faced repeated scholarship rejections.",
    keywords: ["scholarship rejection", "degree structure"]
  },

  /* ===================== MS DATA SCIENCE & CURRENT ROLE ===================== */
  {
    question: "Why are you pursuing MS Data Science at UET?",
    answer: "I chose MS Data Science at UET Lahore as a strategic step toward my long-term goal of pursuing a PhD abroad.",
    keywords: ["ms data science", "uet", "future plan"]
  },
  {
    question: "What are you currently working on?",
    answer: "I am currently an intern at Meissasoft, working on OOP-based systems, DSA practice, SQL databases, and FastAPI-based CRUD applications.",
    keywords: ["meissasoft", "current work", "internship"]
  },

  /* ===================== FUTURE GOALS & PHILOSOPHY ===================== */
  {
    question: "What is your ultimate career goal?",
    answer: "My ultimate goal is to pursue a PhD, contribute to AI and Data Science research, continue teaching, and solve real-world problems using technology.",
    keywords: ["phd", "career goal", "research"]
  },
  {
    question: "How would you describe your journey?",
    answer: "My journey is one of resilience—financial struggles, academic interruptions, and rejections shaped my clarity, purpose, and determination.",
    keywords: ["journey", "resilience", "story"]
  },
  {
    question: "Do you have experience with PostgreSQL?",
    answer: "Yes. I have hands-on experience with PostgreSQL for database design, CRUD operations, and backend API development using SQLAlchemy.",
    keywords: ["postgresql", "postgres", "experience"]
  },
  {
    question: "Do you have experience with MongoDB?",
    answer: "Yes. I have experience with MongoDB as a NoSQL database solution for flexible data storage and document-based architecture.",
    keywords: ["mongodb", "nosql", "database", "experience"]
  },
  {
    question: "I have a question that is not answered here.",
    answer: "Feel free to reach out directly! You can contact me via email at muneebashraf.edu@gmail.com, phone or WhatsApp at (+92) 3006275648, or connect on LinkedIn (linkedin.com/in/muneeb-ashraf-ai) and GitHub (github.com/alphaaa-m). I'd be happy to discuss any topic with you.",
    keywords: ["not answered", "other question", "contact", "reach out", "help", "support", "irrelevant"]
  },
  {
    question: "Do you have experience with something not mentioned here?",
    answer: "Possibly! For questions about specific technologies, services, or topics not covered in this FAQ, please contact me directly at muneebashraf.edu@gmail.com or (+92) 3006275648 (WhatsApp). I'm open to discussing opportunities and can provide more detailed information about my experience.",
    keywords: ["experience", "technology", "tool", "service", "not listed", "other skills"]
  }

];