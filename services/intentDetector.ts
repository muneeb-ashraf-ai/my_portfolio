/**
 * Intent Detector - Lightweight, keyword-based intent classification
 * No external APIs or ML models used
 * Purely heuristic-based for Edge-compatible deployment
 */

export type Intent =
  | "learning_guidance"
  | "hiring_recruiter"
  | "project_experience"
  | "education_background"
  | "skill_evaluation"
  | "future_goals"
  | "technical_capability"
  | "teaching_mentoring"
  | "general_info"
  | "unknown";

export interface IntentResult {
  intent: Intent;
  confidence: number;
  keywords: string[];
}

export class IntentDetector {
  private intentPatterns: Record<Intent, { keywords: string[]; phrases: string[] }> = {
    learning_guidance: {
      keywords: ["learn", "teach", "tutor", "guide", "mentor", "help", "explain", "understand", "practice"],
      phrases: ["can you teach", "help me learn", "how do i", "explain", "guide me"],
    },
    hiring_recruiter: {
      keywords: ["hire", "job", "role", "position", "team", "company", "work", "opportunity", "available"],
      phrases: ["are you available", "looking for", "hiring", "join", "open to"],
    },
    project_experience: {
      keywords: ["project", "built", "built", "developed", "created", "experience", "worked", "done"],
      phrases: ["tell me about", "your projects", "have you built", "what projects"],
    },
    education_background: {
      keywords: ["degree", "education", "university", "studied", "background", "degree", "gpa", "school"],
      phrases: ["educational background", "your education", "where did you", "degree", "university"],
    },
    skill_evaluation: {
      keywords: ["skill", "python", "ml", "database", "api", "know", "experience with", "proficient"],
      phrases: ["do you know", "experience with", "skilled in", "proficient", "familiar with"],
    },
    future_goals: {
      keywords: ["goal", "future", "plan", "want", "aspire", "dream", "pursue", "career"],
      phrases: ["what's your goal", "career goal", "future plan", "where do you see"],
    },
    technical_capability: {
      keywords: ["can", "build", "create", "develop", "help with", "implement", "code", "system"],
      phrases: ["can you", "can you help", "can you build", "can you create"],
    },
    teaching_mentoring: {
      keywords: ["teach", "mentor", "guide", "coaching", "training", "tutorial", "explain"],
      phrases: ["can you teach", "can you mentor", "teach me", "coaching"],
    },
    general_info: {
      keywords: ["who", "about", "contact", "email", "phone", "linkedin", "github", "location"],
      phrases: ["who are you", "tell me about", "contact", "how to reach"],
    },
    unknown: {
      keywords: [],
      phrases: [],
    },
  };

  /**
   * Detect intent from user query
   */
  public detectIntent(query: string): IntentResult {
    const queryLower = query.toLowerCase();
    const scores: Record<Intent, number> = {
      learning_guidance: 0,
      hiring_recruiter: 0,
      project_experience: 0,
      education_background: 0,
      skill_evaluation: 0,
      future_goals: 0,
      technical_capability: 0,
      teaching_mentoring: 0,
      general_info: 0,
      unknown: 0,
    };

    let totalScore = 0;

    // Score each intent
    (Object.keys(this.intentPatterns) as Intent[]).forEach((intent) => {
      if (intent === "unknown") return;

      const pattern = this.intentPatterns[intent];

      // Check phrases (higher weight)
      pattern.phrases.forEach((phrase) => {
        if (queryLower.includes(phrase)) {
          scores[intent] += 3;
          totalScore += 3;
        }
      });

      // Check keywords (lower weight)
      pattern.keywords.forEach((keyword) => {
        if (queryLower.includes(keyword)) {
          scores[intent] += 1;
          totalScore += 1;
        }
      });
    });

    // Find best intent
    let bestIntent: Intent = "unknown";
    let bestScore = 0;

    (Object.keys(scores) as Intent[]).forEach((intent) => {
      if (intent !== "unknown" && scores[intent] > bestScore) {
        bestScore = scores[intent];
        bestIntent = intent;
      }
    });

    // Calculate confidence
    const confidence = totalScore > 0 ? Math.min(1, bestScore / (totalScore / 2)) : 0;

    // Extract detected keywords
    const detectedKeywords = this.extractKeywords(query, bestIntent);

    return {
      intent: bestIntent,
      confidence,
      keywords: detectedKeywords,
    };
  }

  /**
   * Extract keywords relevant to detected intent
   */
  private extractKeywords(query: string, intent: Intent): string[] {
    const keywords = new Set<string>();
    const queryLower = query.toLowerCase();

    if (intent !== "unknown" && intent !== "general_info") {
      const pattern = this.intentPatterns[intent];
      pattern.keywords.forEach((keyword) => {
        if (queryLower.includes(keyword)) {
          keywords.add(keyword);
        }
      });
    }

    // Also extract specific technologies/terms
    const techTerms = [
      "python",
      "ml",
      "machine learning",
      "deep learning",
      "fastapi",
      "pipecat",
      "database",
      "sql",
      "tensorflow",
      "keras",
      "numpy",
      "pandas",
      "math",
      "calculus",
      "linear algebra",
      "teaching",
      "mentoring",
    ];

    techTerms.forEach((term) => {
      if (queryLower.includes(term)) {
        keywords.add(term);
      }
    });

    return Array.from(keywords);
  }

  /**
   * Get suggested response tone based on intent
   */
  public getSuggestedTone(intent: Intent): "brief" | "detailed" | "professional" {
    switch (intent) {
      case "hiring_recruiter":
        return "professional";
      case "learning_guidance":
        return "detailed";
      case "project_experience":
        return "detailed";
      case "technical_capability":
        return "professional";
      case "teaching_mentoring":
        return "detailed";
      default:
        return "professional";
    }
  }

  /**
   * Determine answer length suggestion based on intent
   */
  public getSuggestedLength(intent: Intent): "short" | "medium" | "long" {
    switch (intent) {
      case "hiring_recruiter":
        return "medium";
      case "learning_guidance":
        return "long";
      case "project_experience":
        return "long";
      case "education_background":
        return "medium";
      case "skill_evaluation":
        return "medium";
      case "future_goals":
        return "medium";
      case "technical_capability":
        return "medium";
      case "teaching_mentoring":
        return "long";
      case "general_info":
        return "short";
      default:
        return "medium";
    }
  }

  /**
   * Determine priority areas based on intent
   */
  public getPriorityAreas(intent: Intent): string[] {
    const priorityMap: Record<Intent, string[]> = {
      learning_guidance: ["teaching", "skills", "experience"],
      hiring_recruiter: ["experience", "skills", "projects", "goals"],
      project_experience: ["projects", "skills", "experience"],
      education_background: ["degrees", "subjects", "cgpa"],
      skill_evaluation: ["skills", "tools", "projects"],
      future_goals: ["goals", "education", "experience"],
      technical_capability: ["skills", "projects", "tools"],
      teaching_mentoring: ["teaching", "skills", "experience"],
      general_info: ["contact", "location", "basic info"],
      unknown: [],
    };

    return priorityMap[intent] || [];
  }
}

export const intentDetector = new IntentDetector();
