/**
 * Chatbot Configuration & Examples
 * Reference file for testing and configuration of the advanced chatbot system
 */

/**
 * CONFIGURATION
 * ============
 */

// Maximum depth for graph reasoning
export const GRAPH_MAX_DEPTH = 3;

// Confidence thresholds
export const CONFIDENCE_THRESHOLDS = {
  HIGH: 0.85,      // Very confident, use as-is
  MEDIUM: 0.65,    // Confident enough, may add disclaimer
  LOW: 0.4,        // Low confidence, add context
  FALLBACK: 0.0,   // Unable to answer, fallback
};

// FAQ matching thresholds
export const FAQ_THRESHOLDS = {
  EXACT_MATCH: 0.9,      // 90%+ similarity = exact match
  GOOD_MATCH: 0.75,      // 75%+ similarity = good match
  PARTIAL_MATCH: 0.6,    // 60%+ similarity = partial match
};

// Intent confidence levels
export const INTENT_CONFIDENCE = {
  VERY_HIGH: 0.95,
  HIGH: 0.85,
  MEDIUM: 0.7,
  LOW: 0.5,
};

/**
 * TEST CASES & EXAMPLES
 * ====================
 */

export const TEST_QUESTIONS = {
  // FAQ-based (should match exactly)
  faq_email: {
    question: "What is your email address?",
    expectedSource: "faq",
    expectedConfidence: 1.0,
    category: "Contact Info",
  },
  faq_phone: {
    question: "What is your phone number?",
    expectedSource: "faq",
    expectedConfidence: 1.0,
    category: "Contact Info",
  },

  // Graph reasoning - Education
  graph_calculus_ml: {
    question: "Can you help me learn calculus for machine learning?",
    expectedSource: "graph",
    expectedConfidence: 0.85,
    expectedIntent: "learning_guidance",
    category: "Education + Graph",
    reasoningPath:
      "Muneeb → MSc Math → Calculus → ML projects → teaches",
  },
  graph_math_background: {
    question: "Tell me about your mathematical background",
    expectedSource: "graph",
    expectedConfidence: 0.9,
    expectedIntent: "education_background",
    category: "Education",
  },

  // Graph reasoning - Projects
  graph_project_skills: {
    question: "What skills did you use in the Brain Tumor Detection project?",
    expectedSource: "graph",
    expectedConfidence: 0.88,
    expectedIntent: "project_experience",
    category: "Projects + Skills",
    reasoningPath:
      "Brain Tumor Detection → usedIn TensorFlow, CNN, Python",
  },
  graph_project_ml: {
    question: "What projects have you built with deep learning?",
    expectedSource: "graph",
    expectedConfidence: 0.85,
    expectedIntent: "project_experience",
    category: "Projects",
  },

  // Graph reasoning - Teaching
  graph_teaching: {
    question: "Can you mentor beginners in AI?",
    expectedSource: "graph",
    expectedConfidence: 0.9,
    expectedIntent: "teaching_mentoring",
    category: "Teaching",
    reasoningPath:
      "Muneeb → teaches Math (6+ years) → learned AI → communication",
  },
  graph_teach_python: {
    question: "Can you teach Python?",
    expectedSource: "graph",
    expectedConfidence: 0.92,
    expectedIntent: "teaching_mentoring",
    category: "Teaching",
  },

  // Graph reasoning - Technical Skills
  graph_fastapi: {
    question: "What's your experience with FastAPI and PostgreSQL?",
    expectedSource: "graph",
    expectedConfidence: 0.92,
    expectedIntent: "technical_capability",
    category: "Technical Skills",
    reasoningPath:
      "SMS Project → used FastAPI & PostgreSQL → Meissasoft work",
  },
  graph_databases: {
    question: "Are you familiar with PostgreSQL and MongoDB?",
    expectedSource: "graph",
    expectedConfidence: 0.88,
    expectedIntent: "skill_evaluation",
    category: "Technical Skills",
  },

  // Graph reasoning - Goals & Motivation
  graph_goals: {
    question: "What are your career goals?",
    expectedSource: "graph",
    expectedConfidence: 0.9,
    expectedIntent: "future_goals",
    category: "Goals",
  },
  graph_why_ds: {
    question: "Why did you pursue data science?",
    expectedSource: "graph",
    expectedConfidence: 0.85,
    expectedIntent: "future_goals",
    category: "Goals/Motivation",
  },

  // Graph reasoning - Experience
  graph_experience: {
    question: "How many years of teaching experience do you have?",
    expectedSource: "graph",
    expectedConfidence: 0.9,
    expectedIntent: "education_background",
    category: "Experience",
  },
  graph_industry: {
    question: "What's your industry experience like?",
    expectedSource: "graph",
    expectedConfidence: 0.85,
    expectedIntent: "project_experience",
    category: "Experience",
  },

  // Fallback (no match)
  fallback_pizza: {
    question: "What's your favorite pizza topping?",
    expectedSource: "fallback",
    expectedConfidence: 0.4,
    category: "Irrelevant",
  },
  fallback_sports: {
    question: "Do you play football?",
    expectedSource: "fallback",
    expectedConfidence: 0.4,
    category: "Irrelevant",
  },

  // Recruiter questions (high intent for hiring)
  recruiter_availability: {
    question: "Are you available for a full-time position in AI/ML?",
    expectedSource: "graph",
    expectedConfidence: 0.85,
    expectedIntent: "hiring_recruiter",
    category: "Recruiter",
  },
  recruiter_current_role: {
    question: "What's your current role and are you open to opportunities?",
    expectedSource: "graph",
    expectedConfidence: 0.9,
    expectedIntent: "hiring_recruiter",
    category: "Recruiter",
  },
};

/**
 * DEBUGGING COMMANDS
 * =================
 */

export const DEBUG_COMMANDS = {
  // Test all FAQs
  testAllFAQs: `
    import { chatbotEngine } from '@/services/chatbotEngine';
    const faqs = chatbotEngine.getAvailableFAQs();
    faqs.forEach(faq => {
      const response = chatbotEngine.answerQuestion(faq.question);
      console.log('Q:', faq.question);
      console.log('Response:', response.answer);
      console.log('Source:', response.source);
      console.log('---');
    });
  `,

  // Test graph reasoning
  testGraphReasoning: `
    import { chatbotEngine } from '@/services/chatbotEngine';
    const response = chatbotEngine.answerQuestion(
      "Can you help with calculus for machine learning?"
    );
    console.log('Answer:', response.answer);
    console.log('Source:', response.source);
    console.log('Confidence:', response.confidence);
    console.log('Reasoning:', response.reasoning);
  `,

  // Test intent detection
  testIntentDetection: `
    import { intentDetector } from '@/services/intentDetector';
    const result = intentDetector.detectIntent(
      "Your question here"
    );
    console.log('Intent:', result.intent);
    console.log('Confidence:', result.confidence);
    console.log('Keywords:', result.keywords);
  `,

  // Get entities for a question
  findEntities: `
    import { graphReasoning } from '@/services/graphReasoning';
    const entities = graphReasoning.getCandidateEntities(
      "Your question here"
    );
    console.log('Found entities:', entities);
  `,

  // Full debugging
  fullDebug: `
    import { chatbotEngine } from '@/services/chatbotEngine';
    const result = chatbotEngine.answerWithDebugging(
      "Your question here"
    );
    console.log('Full result:', result);
    console.log('Debug info:', result.debug);
    console.log('Reasoning paths:', result.reasoning?.paths);
  `,
};

/**
 * ENTITY HIERARCHY REFERENCE
 * ==========================
 */

export const ENTITY_STRUCTURE = {
  person: {
    id: "muneeb_ashraf",
    name: "Muneeb Ashraf",
    connections: [
      "5 degrees",
      "8+ subjects",
      "10+ skills",
      "15+ tools",
      "13+ projects",
      "4 experiences",
      "5 goals",
    ],
  },

  degrees: [
    "ms_data_science_uet",
    "msc_mathematics_gcu",
    "bsc_math_physics",
    "fsc_pre_engineering",
    "matric",
  ],

  subjects: [
    "mathematics",
    "calculus",
    "linear_algebra",
    "probability_statistics",
    "discrete_math",
    "machine_learning",
    "deep_learning",
    "computer_vision",
    "nlp",
    "data_science",
  ],

  skills: [
    "python",
    "teaching",
    "communication",
    "problem_solving",
    "adaptability",
    "resilience",
    "leadership",
  ],

  tools: [
    "numpy",
    "pandas",
    "matplotlib",
    "seaborn",
    "scikit_learn",
    "tensorflow_keras",
    "fastapi",
    "pipecat",
    "postgresql",
    "mongodb",
    "sqlalchemy",
    "git",
    "github",
    "jupyter",
  ],

  projects: [
    "brain_tumor_detection",
    "student_management_system",
    "house_price_prediction",
    "heart_disease_prediction",
    "credit_card_fraud_detection",
    "diabetes_classification",
    "mnist_digit_recognition",
    "cifar_image_classification",
    "chess_game_engine",
    "ride_sharing_simulation",
    "career_chatbot",
    "breast_cancer_diagnostic",
    "student_performance_analysis",
  ],

  experiences: [
    "meissasoft_intern",
    "hajveri_teacher",
    "ali_science_academy_teacher",
    "insightsol_internship",
  ],

  goals: [
    "phd_goal",
    "research_goal",
    "teaching_goal",
    "industry_goal",
    "freelance_goal",
  ],
};

/**
 * RELATIONSHIP TYPES & EXAMPLES
 * =============================
 */

export const RELATIONSHIPS_GUIDE = {
  hasDegree: {
    from: "muneeb_ashraf",
    to: "msc_mathematics_gcu",
    meaning: "Person has completed this degree",
  },

  studied: {
    from: "msc_mathematics_gcu",
    to: "calculus",
    meaning: "Subject was studied in this degree",
  },

  teaches: {
    from: "muneeb_ashraf",
    to: "mathematics",
    meaning: "Person teaches this subject",
  },

  usedIn: {
    from: "python",
    to: "brain_tumor_detection",
    meaning: "Skill/tool was used in this project",
  },

  built: {
    from: "muneeb_ashraf",
    to: "brain_tumor_detection",
    meaning: "Person built this project",
  },

  workedAs: {
    from: "muneeb_ashraf",
    to: "meissasoft_intern",
    meaning: "Person held this role",
  },

  learnedThrough: {
    from: "muneeb_ashraf",
    to: "navttc_ai",
    meaning: "Person learned through this program/course",
  },

  goalIs: {
    from: "muneeb_ashraf",
    to: "phd_goal",
    meaning: "This is a goal of the person",
  },

  appliedIn: {
    from: "deep_learning",
    to: "brain_tumor_detection",
    meaning: "Subject/skill was applied in this project",
  },

  requiredFor: {
    from: "calculus",
    to: "machine_learning",
    meaning: "This subject is required for another subject",
  },

  basedOn: {
    from: "calculus",
    to: "mathematics",
    meaning: "Subject is based on another subject",
  },
};

/**
 * RESPONSE QUALITY CHECKLIST
 * =========================
 */

export const QUALITY_CHECKLIST = {
  goodResponse: [
    "✅ Directly answers the question",
    "✅ Provides relevant context",
    "✅ Uses specific examples",
    "✅ Sounds professional and confident",
    "✅ Appropriate length (not too short or long)",
    "✅ Matches user intent (tone/detail)",
    "✅ Has confidence score > 0.75",
  ],

  badResponse: [
    "❌ Doesn't answer the question",
    "❌ Too vague or generic",
    "❌ No specific examples",
    "❌ Sounds uncertain or informal",
    "❌ Way too short or too long",
    "❌ Mismatched tone for intent",
    "❌ Confidence score < 0.5",
    "❌ Hallucinated information",
  ],
};

/**
 * COMMON MISTAKES & SOLUTIONS
 * ==========================
 */

export const TROUBLESHOOTING = {
  lowConfidence: {
    problem: "Confidence score is too low (< 0.5)",
    solutions: [
      "Check if entities are connected in graph",
      "Verify relationships exist between entities",
      "Check keyword extraction (console log keywords)",
      "May need to add intermediate entities",
    ],
  },

  wrongIntent: {
    problem: "Intent detected incorrectly",
    solutions: [
      "Intent is secondary, not primary determinant",
      "Check if keywords match intent patterns",
      "Adjust intent patterns if needed",
      "Graph reasoning will override wrong intent",
    ],
  },

  fallbackResponse: {
    problem: "Getting fallback when should get graph answer",
    solutions: [
      "Check if relevant entities exist",
      "Verify relationships are created",
      "Debug with getCandidateEntities()",
      "Check path finding depth (try increasing max depth)",
    ],
  },

  noMatch: {
    problem: "Question doesn't match FAQ or graph",
    solutions: [
      "Check if question is in FAQ keywords list",
      "Check if entities for question exist in graph",
      "Consider adding new entity/relationship",
      "Fallback response will handle gracefully",
    ],
  },
};

/**
 * PERFORMANCE BENCHMARKS
 * ======================
 */

export const PERFORMANCE = {
  typical: {
    faqMatch: "5-10ms",
    intentDetection: "5-10ms",
    graphReasoning: "50-100ms",
    total: "50-200ms",
    bundleSize: "50-80KB",
    runtimeMemory: "<10MB",
  },

  worst_case: {
    total: "250ms",
    reason: "Full graph traversal to depth 3",
  },

  best_case: {
    total: "10ms",
    reason: "Exact FAQ match found immediately",
  },
};

/**
 * EXPORT FOR USE IN TESTS
 * =======================
 */

export default {
  TEST_QUESTIONS,
  DEBUG_COMMANDS,
  ENTITY_STRUCTURE,
  RELATIONSHIPS_GUIDE,
  QUALITY_CHECKLIST,
  TROUBLESHOOTING,
  PERFORMANCE,
};
