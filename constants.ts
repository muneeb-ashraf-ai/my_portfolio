
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
    question: "How can I contact you?",
    answer: "You can reach Muneeb via email at muneebashraf.edu@gmail.com or by phone at (+92) 3006275648. You can also connect on LinkedIn or GitHub.",
    keywords: ["contact", "email", "phone", "linkedin", "github", "reach", "message"]
  },
  {
    question: "What is your email address?",
    answer: "muneebashraf.edu@gmail.com",
    keywords: ["email", "mail", "gmail", "contact email"]
  },
  {
    question: "What is your phone number?",
    answer: "(+92) 3006275648",
    keywords: ["phone", "number", "call", "mobile", "whatsapp"]
  },
  {
    question: "What is your LinkedIn profile?",
    answer: "linkedin.com/in/muneeb-ashraf-ai",
    keywords: ["linkedin", "profile", "social"]
  },
  {
    question: "What is your GitHub profile?",
    answer: "github.com/alphaaa-m",
    keywords: ["github", "code", "repo", "repositories"]
  },
  {
    question: "Can I download your resume?",
    answer: "Yes. Use the Resume button in the header or download from /assets/resume.pdf.",
    keywords: ["resume", "cv", "download"]
  },
  {
    question: "What are your featured projects?",
    answer: "Featured projects include Brain Tumor Detection, Student Management System, and House Price Prediction.",
    keywords: ["featured", "selected work", "projects", "brain tumor", "student management", "house price"]
  },
  {
    question: "Tell me about Brain Tumor Detection project",
    answer: "A CNN model to detect brain tumors from MRI images.",
    keywords: ["brain tumor", "cnn", "mri", "detection"]
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
    keywords: ["experience", "work", "jobs", "roles", "internship", "teacher"]
  },
  {
    question: "Where did you work as a teacher?",
    answer: "Hajveri Lyceum School (Aug 2023 – May 2025) and Ali Science Academy (Jun 2018 – Mar 2020).",
    keywords: ["teacher", "mathematics teacher", "school", "academy"]
  },
  {
    question: "What is your education background?",
    answer: "MS Data Science at UET Lahore (2025–2027), MSc Mathematics at GCU Lahore (2020–2023, CGPA 3.37/4.00), BSc Mathematics & Physics (2018–2020), FSc Pre-Engineering (2016–2018), and Matriculation (2014–2016).",
    keywords: ["education", "degree", "ms", "msc", "bsc", "fsc", "matric"]
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
    keywords: ["skills", "technical", "python", "fastapi", "sql", "ml", "deep learning", "pipecat", "uv"]
  },
  {
    question: "What tools do you use?",
    answer: "Jupyter Notebook, Microsoft Office, LaTeX, Canva, Git & GitHub.",
    keywords: ["tools", "platforms", "jupyter", "latex", "canva", "git"]
  },
  {
    question: "What are your soft skills?",
    answer: "Communication, Emotional Intelligence, Time Management, Adaptability, Resilience, Creativity, Leadership.",
    keywords: ["soft skills", "communication", "leadership", "adaptability"]
  },
  {
    question: "Which languages do you speak?",
    answer: "Urdu (Fluent) and English (Proficient).",
    keywords: ["languages", "urdu", "english"]
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
  }
];
