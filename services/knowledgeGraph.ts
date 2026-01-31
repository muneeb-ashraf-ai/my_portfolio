/**
 * Knowledge Graph for Muneeb Ashraf's Portfolio
 * Extracted from CV, resume, journey, and professional experience
 * Enables multi-hop reasoning for intelligent chatbot responses
 */

export type EntityType =
  | "person"
  | "degree"
  | "skill"
  | "subject"
  | "project"
  | "experience"
  | "goal"
  | "tool"
  | "organization"
  | "course"
  | "achievement"
  | "timeline";

export type RelationType =
  | "hasDegree"
  | "studied"
  | "teaches"
  | "usedIn"
  | "usedWith"
  | "built"
  | "workedAs"
  | "learnedThrough"
  | "goalIs"
  | "foundedAt"
  | "skillOf"
  | "applicationOf"
  | "requiredFor"
  | "connectedTo"
  | "appliedIn"
  | "basedOn";

export interface Entity {
  id: string;
  name: string;
  type: EntityType;
  description: string;
  metadata?: Record<string, any>;
}

export interface Relationship {
  from: string;
  to: string;
  type: RelationType;
  strength?: number; // 0-1, confidence in relationship
  context?: string;
}

export class KnowledgeGraph {
  private entities: Map<string, Entity> = new Map();
  private relationships: Relationship[] = [];

  constructor() {
    this.initializeGraph();
  }

  private initializeGraph() {
    // ==================== PERSON ====================
    this.addEntity("muneeb_ashraf", "person", "Muneeb Ashraf", {
      dateOfBirth: "March 10, 2000",
      birthplace: "Gujrat, Pakistan",
      baseLocation: "Gujrat/Lahore, Pakistan",
      email: "muneebashraf.edu@gmail.com",
      phone: "(+92) 3006275648",
      linkedin: "linkedin.com/in/muneeb-ashraf-ai",
      github: "github.com/alphaaa-m",
    });

    // ==================== DEGREES ====================
    this.addEntity("ms_data_science_uet", "degree", "MS Data Science at UET Lahore", {
      university: "University of Engineering and Technology (UET)",
      location: "Lahore, Pakistan",
      period: "2025–2027",
      status: "Current",
    });

    this.addEntity("msc_mathematics_gcu", "degree", "MSc Mathematics at GCU Lahore", {
      university: "Government College University (GCU)",
      location: "Lahore, Pakistan",
      period: "2020–2023",
      cgpa: "3.37/4.00",
      status: "Completed",
    });

    this.addEntity("bsc_math_physics", "degree", "BSc Mathematics & Physics", {
      period: "2018–2020",
      status: "Completed",
    });

    this.addEntity("fsc_pre_engineering", "degree", "FSc Pre-Engineering", {
      institution: "Government Zamindar Postgraduate College, Gujrat",
      period: "2016–2018",
      marks: "819/1100",
      status: "Completed",
    });

    this.addEntity("matric", "degree", "Matriculation", {
      institution: "Government Municipal Model High School for Boys",
      period: "2014–2016",
      marks: "918/1100",
      subjects: ["Mathematics", "Physics", "Chemistry", "Biology"],
      status: "Completed",
    });

    // ==================== SUBJECTS/MATHEMATICS ====================
    this.addEntity("calculus", "subject", "Calculus", {
      description: "Limits, differentiation, integration, multivariable calculus",
    });

    this.addEntity("linear_algebra", "subject", "Linear Algebra", {
      description: "Vectors, matrices, eigenvalues, applications in ML",
    });

    this.addEntity("probability_statistics", "subject", "Probability & Statistics", {
      description: "Probability distributions, hypothesis testing, statistical analysis",
    });

    this.addEntity("discrete_math", "subject", "Discrete Mathematics", {
      description: "Logic, sets, graphs, algorithms, problem-solving",
    });

    this.addEntity("mathematics", "subject", "Mathematics", {
      description: "Theoretical and applied mathematics foundation",
    });

    // ==================== AI/ML SUBJECTS ====================
    this.addEntity("machine_learning", "subject", "Machine Learning", {
      description: "Classification, regression, anomaly detection, evaluation",
    });

    this.addEntity("deep_learning", "subject", "Deep Learning", {
      description: "Neural networks, CNNs, ANNs, TensorFlow, Keras",
    });

    this.addEntity("computer_vision", "subject", "Computer Vision", {
      description: "Image processing, CNN applications, object detection",
    });

    this.addEntity("nlp", "subject", "Natural Language Processing", {
      description: "Text processing, language models, NLTK",
    });

    this.addEntity("data_science", "subject", "Data Science", {
      description: "Data analysis, visualization, modeling, insights",
    });

    // ==================== SKILLS - PROGRAMMING ====================
    this.addEntity("python", "skill", "Python", {
      proficiency: "Expert",
      usedFor: ["ML", "Backend APIs", "Data Analysis", "Simulations"],
    });

    this.addEntity("numpy", "tool", "NumPy", {
      description: "Numerical computing library",
    });

    this.addEntity("pandas", "tool", "Pandas", {
      description: "Data manipulation and analysis",
    });

    this.addEntity("matplotlib", "tool", "Matplotlib", {
      description: "Data visualization",
    });

    this.addEntity("seaborn", "tool", "Seaborn", {
      description: "Statistical data visualization",
    });

    this.addEntity("scikit_learn", "tool", "Scikit-learn", {
      description: "Machine learning algorithms",
    });

    this.addEntity("tensorflow_keras", "tool", "TensorFlow/Keras", {
      description: "Deep learning framework",
    });

    this.addEntity("sql", "skill", "SQL", {
      proficiency: "Intermediate-Advanced",
    });

    this.addEntity("postgresql", "tool", "PostgreSQL", {
      description: "Relational database",
    });

    this.addEntity("mongodb", "tool", "MongoDB", {
      description: "NoSQL document database",
    });

    this.addEntity("sqlalchemy", "tool", "SQLAlchemy", {
      description: "Python ORM for databases",
    });

    this.addEntity("fastapi", "tool", "FastAPI", {
      description: "Modern Python web framework for APIs",
    });

    this.addEntity("git", "tool", "Git", {
      description: "Version control system",
    });

    this.addEntity("github", "tool", "GitHub", {
      description: "Code repository hosting",
    });

    this.addEntity("jupyter", "tool", "Jupyter Notebook", {
      description: "Interactive computing environment",
    });

    this.addEntity("latex", "tool", "LaTeX", {
      description: "Document preparation system",
    });

    this.addEntity("canva", "tool", "Canva", {
      description: "Design tool",
    });

    this.addEntity("pipecat", "tool", "pipecat", {
      description: "Python framework for building real-time voice bot workflows and conversational AI systems",
      experience: "hands-on",
      useCases: ["Voice bots", "Real-time conversation", "AI systems"],
    });

    this.addEntity("uv", "tool", "uv", {
      description: "Python package manager",
    });

    this.addEntity("nltk", "tool", "NLTK", {
      description: "Natural language processing library",
    });

    // ==================== SOFT SKILLS ====================
    this.addEntity("communication", "skill", "Communication", {
      proficiency: "Advanced",
    });

    this.addEntity("leadership", "skill", "Leadership", {
      proficiency: "Intermediate",
    });

    this.addEntity("teaching", "skill", "Teaching", {
      proficiency: "Advanced",
      experience: "6+ years",
    });

    this.addEntity("problem_solving", "skill", "Problem Solving", {
      proficiency: "Advanced",
    });

    this.addEntity("adaptability", "skill", "Adaptability", {
      proficiency: "Advanced",
    });

    this.addEntity("resilience", "skill", "Resilience", {
      proficiency: "Advanced",
    });

    // ==================== PROJECTS ====================
    this.addEntity("brain_tumor_detection", "project", "Brain Tumor Detection", {
      description: "CNN model to detect brain tumors from MRI images",
      period: "Recent",
      status: "Completed",
    });

    this.addEntity("student_management_system", "project", "Student Management System", {
      description: "RESTful API for managing students, courses, and enrollments",
      period: "Recent",
      status: "Completed",
    });

    this.addEntity("house_price_prediction", "project", "House Price Prediction", {
      description: "Comparison of 8+ regression models for price prediction",
      period: "Recent",
      status: "Completed",
    });

    this.addEntity("heart_disease_prediction", "project", "Heart Disease Prediction", {
      description: "ML model for predicting heart disease",
      period: "Past",
      status: "Completed",
    });

    this.addEntity("credit_card_fraud_detection", "project", "Credit Card Fraud Detection", {
      description: "ML model for detecting fraudulent transactions",
      period: "Past",
      status: "Completed",
    });

    this.addEntity("diabetes_classification", "project", "Diabetes Classification", {
      description: "ML model for diabetes prediction",
      period: "Past",
      status: "Completed",
    });

    this.addEntity("mnist_digit_recognition", "project", "MNIST Digit Recognition", {
      description: "Deep learning model for handwritten digit recognition",
      period: "Past",
      status: "Completed",
    });

    this.addEntity("cifar_image_classification", "project", "CIFAR Image Classification", {
      description: "CNN for image classification",
      period: "Past",
      status: "Completed",
    });

    this.addEntity("chess_game_engine", "project", "Chess Game Engine", {
      description: "OOP-based chess game simulation",
      period: "Past",
      status: "Completed",
    });

    this.addEntity("ride_sharing_simulation", "project", "Ride Sharing Simulation", {
      description: "OOP-based simulation of ride-sharing system",
      period: "Past",
      status: "Completed",
    });

    this.addEntity("career_chatbot", "project", "Career Chatbot", {
      description: "AI-powered chatbot for career guidance",
      period: "Past",
      status: "Completed",
    });

    this.addEntity("breast_cancer_diagnostic", "project", "Breast Cancer Diagnostic", {
      description: "ML model for cancer diagnosis",
      period: "Past",
      status: "Completed",
    });

    this.addEntity("student_performance_analysis", "project", "Student Performance Analysis", {
      description: "Data analysis of student performance",
      period: "Past",
      status: "Completed",
    });

    // ==================== EXPERIENCE ====================
    this.addEntity("meissasoft_intern", "experience", "Python Developer Intern at Meissasoft", {
      company: "Meissasoft",
      location: "Lahore, Pakistan",
      period: "July 2025 – Present",
      role: "Python Developer Intern",
      responsibilities: ["OOP-based systems", "DSA practice", "SQL databases", "FastAPI CRUD applications"],
    });

    this.addEntity("hajveri_teacher", "experience", "Mathematics Teacher at Hajveri Lyceum School", {
      school: "Hajveri Lyceum School",
      location: "Lahore, Pakistan",
      period: "August 2023 – May 2025",
      grades: "5–9",
      subject: "Mathematics",
    });

    this.addEntity("ali_science_academy_teacher", "experience", "Mathematics Teacher at Ali Science Academy", {
      school: "Ali Science Academy",
      location: "Pakistan",
      period: "June 2018 – March 2020",
      subject: "Mathematics",
    });

    this.addEntity("insightsol_internship", "experience", "ML Internship at InsightSol Technologies", {
      company: "InsightSol Technologies",
      type: "Remote",
      duration: "1 month",
      period: "Past",
      description: "Trained two machine learning algorithms",
    });

    // ==================== ORGANIZATIONS ====================
    this.addEntity("uet_lahore", "organization", "University of Engineering and Technology (UET)", {
      type: "University",
      location: "Lahore, Pakistan",
    });

    this.addEntity("gcu_lahore", "organization", "Government College University (GCU)", {
      type: "University",
      location: "Lahore, Pakistan",
    });

    this.addEntity("minhaj_university", "organization", "Minhaj University", {
      type: "University",
      location: "Pakistan",
    });

    this.addEntity("coursera", "organization", "Coursera", {
      type: "Online learning platform",
    });

    this.addEntity("meissasoft", "organization", "Meissasoft", {
      type: "Company",
      location: "Lahore, Pakistan",
    });

    // ==================== COURSES & CERTIFICATIONS ====================
    this.addEntity("ielts_certification", "course", "IELTS Certification", {
      score: "7.0 (CEFR C1)",
      breakdown: "Listening 8.0, Reading 7.5, Writing 6.5, Speaking 6.0",
    });

    this.addEntity("navttc_ai", "course", "NAVTTC AI (ML & DL)", {
      institution: "Minhaj University",
      description: "National Vocational & Technical Training Commission AI course",
    });

    this.addEntity("coursera_math_courses", "course", "Coursera Math Courses", {
      courses: [
        "Data Science Math Skills",
        "Discrete Mathematics",
        "Research Methods",
        "Mathematical Thinking",
        "Algebra",
        "Essential Math for Data Science",
      ],
    });

    // ==================== GOALS ====================
    this.addEntity("phd_goal", "goal", "Pursue PhD", {
      description: "PhD in Data Science, ML, or AI research",
      timeframe: "Medium-term",
    });

    this.addEntity("research_goal", "goal", "Contribute to AI Research", {
      description: "Publish research, contribute to open source",
      timeframe: "Medium-term",
    });

    this.addEntity("teaching_goal", "goal", "Continue Teaching", {
      description: "Mentor and teach mathematics, ML, and AI",
      timeframe: "Long-term",
    });

    this.addEntity("industry_goal", "goal", "Lead in Industry", {
      description: "Senior role in ML/AI/Data Science industry",
      timeframe: "Medium-term",
    });

    this.addEntity("freelance_goal", "goal", "Freelance Opportunities", {
      description: "Build AI systems and consult",
      timeframe: "Ongoing",
    });

    // ==================== ACHIEVEMENTS ====================
    this.addEntity("msc_cgpa", "achievement", "MSc CGPA 3.37/4.0", {
      detail: "From GCU Lahore in Mathematics",
    });

    this.addEntity("matric_marks", "achievement", "Matric: 918/1100", {
      subjects: ["Mathematics", "Physics", "Chemistry", "Biology"],
    });

    this.addEntity("fsc_marks", "achievement", "FSc: 819/1100", {
      focus: "Mathematics and Pre-Engineering",
    });

    this.addEntity("teaching_experience", "achievement", "6+ Years Teaching Experience", {
      subjects: ["Mathematics"],
      grades: ["5-9"],
    });

    // ==================== RELATIONSHIPS ====================
    // Person relationships
    this.addRelationship("muneeb_ashraf", "ms_data_science_uet", "hasDegree");
    this.addRelationship("muneeb_ashraf", "msc_mathematics_gcu", "hasDegree");
    this.addRelationship("muneeb_ashraf", "bsc_math_physics", "hasDegree");
    this.addRelationship("muneeb_ashraf", "fsc_pre_engineering", "hasDegree");
    this.addRelationship("muneeb_ashraf", "matric", "hasDegree");

    // Education relationships
    this.addRelationship("msc_mathematics_gcu", "mathematics", "studied");
    this.addRelationship("msc_mathematics_gcu", "calculus", "studied");
    this.addRelationship("msc_mathematics_gcu", "linear_algebra", "studied");
    this.addRelationship("msc_mathematics_gcu", "probability_statistics", "studied");
    this.addRelationship("bsc_math_physics", "mathematics", "studied");

    // Skills relationships
    this.addRelationship("muneeb_ashraf", "python", "skillOf");
    this.addRelationship("muneeb_ashraf", "teaching", "skillOf");
    this.addRelationship("muneeb_ashraf", "communication", "skillOf");
    this.addRelationship("muneeb_ashraf", "problem_solving", "skillOf");
    this.addRelationship("muneeb_ashraf", "adaptability", "skillOf");
    this.addRelationship("muneeb_ashraf", "resilience", "skillOf");
    this.addRelationship("muneeb_ashraf", "leadership", "skillOf");

    // Tool relationships
    this.addRelationship("python", "numpy", "usedWith");
    this.addRelationship("python", "pandas", "usedWith");
    this.addRelationship("python", "matplotlib", "usedWith");
    this.addRelationship("python", "scikit_learn", "usedWith");
    this.addRelationship("python", "tensorflow_keras", "usedWith");
    this.addRelationship("python", "fastapi", "usedWith");
    this.addRelationship("python", "pipecat", "usedWith");
    this.addRelationship("python", "sqlalchemy", "usedWith");
    this.addRelationship("python", "nltk", "usedWith");

    // Project relationships
    this.addRelationship("muneeb_ashraf", "brain_tumor_detection", "built");
    this.addRelationship("muneeb_ashraf", "student_management_system", "built");
    this.addRelationship("muneeb_ashraf", "house_price_prediction", "built");
    this.addRelationship("muneeb_ashraf", "heart_disease_prediction", "built");
    this.addRelationship("muneeb_ashraf", "credit_card_fraud_detection", "built");
    this.addRelationship("muneeb_ashraf", "diabetes_classification", "built");
    this.addRelationship("muneeb_ashraf", "mnist_digit_recognition", "built");
    this.addRelationship("muneeb_ashraf", "cifar_image_classification", "built");
    this.addRelationship("muneeb_ashraf", "chess_game_engine", "built");
    this.addRelationship("muneeb_ashraf", "ride_sharing_simulation", "built");
    this.addRelationship("muneeb_ashraf", "career_chatbot", "built");
    this.addRelationship("muneeb_ashraf", "breast_cancer_diagnostic", "built");
    this.addRelationship("muneeb_ashraf", "student_performance_analysis", "built");

    // Project-Skill relationships
    this.addRelationship("brain_tumor_detection", "deep_learning", "appliedIn");
    this.addRelationship("brain_tumor_detection", "computer_vision", "appliedIn");
    this.addRelationship("brain_tumor_detection", "tensorflow_keras", "usedIn");
    this.addRelationship("brain_tumor_detection", "python", "usedIn");

    this.addRelationship("student_management_system", "fastapi", "usedIn");
    this.addRelationship("student_management_system", "sqlalchemy", "usedIn");
    this.addRelationship("student_management_system", "sql", "usedIn");
    this.addRelationship("student_management_system", "python", "usedIn");

    this.addRelationship("house_price_prediction", "machine_learning", "appliedIn");
    this.addRelationship("house_price_prediction", "scikit_learn", "usedIn");
    this.addRelationship("house_price_prediction", "pandas", "usedIn");
    this.addRelationship("house_price_prediction", "python", "usedIn");

    this.addRelationship("cifar_image_classification", "deep_learning", "appliedIn");
    this.addRelationship("cifar_image_classification", "computer_vision", "appliedIn");
    this.addRelationship("cifar_image_classification", "tensorflow_keras", "usedIn");

    this.addRelationship("chess_game_engine", "python", "usedIn");
    this.addRelationship("ride_sharing_simulation", "python", "usedIn");

    // Subject relationships
    this.addRelationship("calculus", "mathematics", "basedOn");
    this.addRelationship("linear_algebra", "mathematics", "basedOn");
    this.addRelationship("probability_statistics", "mathematics", "basedOn");
    this.addRelationship("machine_learning", "calculus", "requiredFor");
    this.addRelationship("machine_learning", "linear_algebra", "requiredFor");
    this.addRelationship("machine_learning", "probability_statistics", "requiredFor");
    this.addRelationship("deep_learning", "machine_learning", "appliedIn");

    // Experience relationships
    this.addRelationship("muneeb_ashraf", "meissasoft_intern", "workedAs");
    this.addRelationship("muneeb_ashraf", "hajveri_teacher", "workedAs");
    this.addRelationship("muneeb_ashraf", "ali_science_academy_teacher", "workedAs");
    this.addRelationship("muneeb_ashraf", "insightsol_internship", "workedAs");

    this.addRelationship("hajveri_teacher", "teaching", "usedIn");
    this.addRelationship("hajveri_teacher", "communication", "usedIn");

    // Learning relationships
    this.addRelationship("muneeb_ashraf", "navttc_ai", "learnedThrough");
    this.addRelationship("muneeb_ashraf", "coursera_math_courses", "learnedThrough");
    this.addRelationship("muneeb_ashraf", "ielts_certification", "learnedThrough");

    // Goal relationships
    this.addRelationship("muneeb_ashraf", "phd_goal", "goalIs");
    this.addRelationship("muneeb_ashraf", "research_goal", "goalIs");
    this.addRelationship("muneeb_ashraf", "teaching_goal", "goalIs");
    this.addRelationship("muneeb_ashraf", "industry_goal", "goalIs");
    this.addRelationship("muneeb_ashraf", "freelance_goal", "goalIs");

    // Organization relationships
    this.addRelationship("meissasoft_intern", "meissasoft", "foundedAt");
    this.addRelationship("ms_data_science_uet", "uet_lahore", "foundedAt");
    this.addRelationship("msc_mathematics_gcu", "gcu_lahore", "foundedAt");
    this.addRelationship("navttc_ai", "minhaj_university", "foundedAt");
  }

  private addEntity(id: string, type: EntityType, name: string, metadata?: Record<string, any>): void {
    this.entities.set(id, {
      id,
      name,
      type,
      description: `${name} - ${type}`,
      metadata,
    });
  }

  private addRelationship(from: string, to: string, type: RelationType, context?: string): void {
    this.relationships.push({ from, to, type, strength: 1, context });
  }

  public getEntity(id: string): Entity | undefined {
    return this.entities.get(id);
  }

  public getAllEntities(): Entity[] {
    return Array.from(this.entities.values());
  }

  public getRelationships(): Relationship[] {
    return this.relationships;
  }

  public getEntityById(id: string): Entity | undefined {
    return this.entities.get(id);
  }

  public getEntitiesByType(type: EntityType): Entity[] {
    return Array.from(this.entities.values()).filter((e) => e.type === type);
  }

  public getOutgoingRelationships(entityId: string): Relationship[] {
    return this.relationships.filter((r) => r.from === entityId);
  }

  public getIncomingRelationships(entityId: string): Relationship[] {
    return this.relationships.filter((r) => r.to === entityId);
  }

  public getRelationshipsByType(type: RelationType): Relationship[] {
    return this.relationships.filter((r) => r.type === type);
  }

  public findPath(startId: string, endId: string, maxDepth: number = 3): string[][] {
    const paths: string[][] = [];
    const visited = new Set<string>();

    const dfs = (currentId: string, targetId: string, path: string[], depth: number) => {
      if (depth === 0) return;
      if (currentId === targetId) {
        paths.push([...path]);
        return;
      }

      visited.add(currentId);

      const outgoing = this.getOutgoingRelationships(currentId);
      for (const rel of outgoing) {
        if (!visited.has(rel.to)) {
          dfs(rel.to, targetId, [...path, rel.type, rel.to], depth - 1);
        }
      }

      visited.delete(currentId);
    };

    dfs(startId, endId, [startId], maxDepth);
    return paths;
  }

  public getConnectedEntities(entityId: string, depth: number = 1): Entity[] {
    const connected = new Set<string>();
    const visited = new Set<string>();

    const traverse = (id: string, currentDepth: number) => {
      if (currentDepth === 0 || visited.has(id)) return;
      visited.add(id);

      const outgoing = this.getOutgoingRelationships(id);
      const incoming = this.getIncomingRelationships(id);

      [...outgoing, ...incoming].forEach((rel) => {
        const targetId = rel.from === id ? rel.to : rel.from;
        connected.add(targetId);
        if (currentDepth > 1) traverse(targetId, currentDepth - 1);
      });
    };

    traverse(entityId, depth);
    return Array.from(connected)
      .map((id) => this.getEntity(id))
      .filter((e): e is Entity => e !== undefined);
  }
}

export const knowledgeGraph = new KnowledgeGraph();
