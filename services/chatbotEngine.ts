/**
 * Advanced Chatbot Engine
 * Implements the complete decision flow:
 * 1. Static FAQ Match
 * 2. Graph-Based Reasoning
 * 3. Intent-Aware Response
 * 4. Fallback with Contact Info
 */

import { FAQS } from "../constants";
import { graphReasoning, ReasoningPath } from "./graphReasoning";
import { intentDetector, Intent } from "./intentDetector";

export interface ChatbotResponse {
  answer: string;
  source: "faq" | "graph" | "fallback";
  confidence: number;
  links?: Array<{ text: string; url: string }>;
  reasoning?: {
    intent: Intent;
    paths: ReasoningPath[];
  };
}

export class AdvancedChatbotEngine {
  private faqCache: Map<string, number> = new Map();

  constructor() {
    this.initializeFAQCache();
  }

  /**
   * Initialize FAQ cache for faster matching
   */
  private initializeFAQCache(): void {
    FAQS.forEach((faq, index) => {
      const keywords = faq.keywords.join(" ").toLowerCase();
      this.faqCache.set(keywords, index);
    });
  }

  /**
   * Main answer function - implements the complete flow
   */
  public answerQuestion(userQuestion: string): ChatbotResponse {
    const normalizedQuestion = this.normalizeQuestion(userQuestion);

    // Step 1: Try Static FAQ Match
    const faqMatch = this.matchFAQ(normalizedQuestion, userQuestion);
    if (faqMatch) {
      return {
        answer: faqMatch.answer,
        source: "faq",
        confidence: 1.0,
        links: faqMatch.links,
      };
    }

    // Step 2: Detect Intent
    const intentResult = intentDetector.detectIntent(userQuestion);

    // Step 3: Try Graph-Based Reasoning
    const graphResult = graphReasoning.answerQuestion(normalizedQuestion);

    if (graphResult && graphResult.reasoning.length > 0) {
      const reasoningPath = graphResult.reasoning[0];
      const enhancedAnswer = this.enhanceAnswerWithIntent(graphResult.answer, intentResult.intent, reasoningPath);

      return {
        answer: enhancedAnswer,
        source: "graph",
        confidence: Math.min(0.95, reasoningPath.confidence * intentResult.confidence),
        reasoning: {
          intent: intentResult.intent,
          paths: graphResult.reasoning,
        },
      };
    }

    // Step 4: Fallback with Contact Info
    return this.generateFallbackResponse(userQuestion, intentResult.intent);
  }

  /**
   * Normalize question for better matching
   */
  private normalizeQuestion(question: string): string {
    return question
      .toLowerCase()
      .replace(/[?!.,:;]/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  /**
   * Try to match FAQ questions
   */
  private matchFAQ(normalizedQuestion: string, originalQuestion: string): { answer: string; links?: Array<{ text: string; url: string }> } | null {
    let bestMatch: { answer: string; links?: Array<{ text: string; url: string }> } | null = null;
    let bestScore = 0.75; // Minimum threshold

    const questionTokens = this.extractTokens(normalizedQuestion);

    FAQS.forEach((faq) => {
      // Try keyword matching
      const keywordScore = this.calculateKeywordSimilarity(normalizedQuestion, faq.keywords);

      // Try question text matching
      const questionScore = this.calculateStringSimilarity(normalizedQuestion, faq.question.toLowerCase());

      const faqTokens = this.extractTokens(faq.question.toLowerCase());
      const overlapCount = this.countTokenOverlap(questionTokens, faqTokens);

      // Allow very close string matches (>0.85) to bypass strict gates
      // This handles simple questions like "Who are you?" or "How are you?"
      const isCloseMatch = questionScore >= 0.85;

      const passesMatchGate =
        isCloseMatch ||
        keywordScore >= 0.34 ||
        (questionScore >= 0.9 && overlapCount >= 2) ||
        (questionScore >= 0.82 && overlapCount >= 3);

      if (!passesMatchGate) return;

      const score = Math.max(keywordScore, questionScore);

      if (score > bestScore) {
        bestScore = score;
        bestMatch = { answer: faq.answer, links: faq.links };
      }
    });

    return bestMatch;
  }

  /**
   * Calculate similarity between question and FAQ keywords
   */
  private calculateKeywordSimilarity(question: string, keywords: string[]): number {
    if (keywords.length === 0) return 0;

    const matchedKeywords = keywords.filter((keyword) => question.includes(keyword.toLowerCase()));

    return matchedKeywords.length / keywords.length;
  }

  /**
   * Extract meaningful tokens from a string
   */
  private extractTokens(text: string): string[] {
    const stopWords = new Set([
      "what",
      "is",
      "can",
      "do",
      "you",
      "are",
      "the",
      "a",
      "an",
      "and",
      "or",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "with",
      "have",
      "has",
      "did",
      "would",
      "could",
      "should",
      "your",
      "my",
      "about",
      "me",
      "any",
      "some",
      "how",
      "why",
      "where",
      "when",
      "which",
    ]);

    return text
      .toLowerCase()
      .replace(/[?!.,:;]/g, "")
      .split(/\s+/)
      .filter((word) => word.length > 2 && !stopWords.has(word));
  }

  /**
   * Count token overlap between two token lists
   */
  private countTokenOverlap(tokensA: string[], tokensB: string[]): number {
    const setB = new Set(tokensB);
    return tokensA.filter((token) => setB.has(token)).length;
  }

  /**
   * Calculate string similarity using Levenshtein-like approach
   */
  private calculateStringSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    const editDistance = this.calculateEditDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  /**
   * Calculate Levenshtein distance
   */
  private calculateEditDistance(s1: string, s2: string): number {
    const costs = [];

    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[s2.length] = lastValue;
    }

    return costs[s2.length];
  }

  /**
   * Enhance answer based on intent
   */
  private enhanceAnswerWithIntent(baseAnswer: string, intent: Intent, path: ReasoningPath): string {
    const tone = intentDetector.getSuggestedTone(intent);
    const length = intentDetector.getSuggestedLength(intent);

    let enhancedAnswer = baseAnswer;

    // Adjust for tone
    if (tone === "professional" && !baseAnswer.includes("professional")) {
      // Keep it professional but ensure clarity
      enhancedAnswer = baseAnswer.replace(/^(yes\.? )/i, "Yes, absolutely. ");
    }

    // Add context for certain intents
    switch (intent) {
      case "hiring_recruiter":
        if (!enhancedAnswer.includes("currently")) {
          enhancedAnswer += " I'm actively contributing to production systems and open to exciting opportunities.";
        }
        break;
      case "learning_guidance":
        if (!enhancedAnswer.includes("help") && !enhancedAnswer.includes("guide")) {
          enhancedAnswer += " I'd be happy to guide you step-by-step.";
        }
        break;
      case "project_experience":
        if (!enhancedAnswer.includes("built") && !enhancedAnswer.includes("developed")) {
          enhancedAnswer = `I've built several projects in this area. ${enhancedAnswer}`;
        }
        break;
    }

    // Optionally expand for "long" responses
    if (length === "long" && path.explanation.length > 0 && enhancedAnswer.length < 200) {
      enhancedAnswer += ` My reasoning: ${path.explanation.slice(0, 2).join(", and ")}.`;
    }

    return enhancedAnswer;
  }

  /**
   * Generate fallback response with contact info
   */
  private generateFallbackResponse(question: string, intent: Intent): ChatbotResponse {
    const contactInfo =
      "For more details, please reach out to me directly at muneebashraf.edu@gmail.com or (+92) 3006275648 (WhatsApp). You can also connect on LinkedIn (linkedin.com/in/muneeb-ashraf-ai) or GitHub (github.com/alphaaa-m).";

    let fallbackAnswer = "";

    switch (intent) {
      case "hiring_recruiter":
        fallbackAnswer = `I appreciate your interest! While I may not have covered all details here, I'm excited to discuss opportunities. ${contactInfo}`;
        break;

      case "learning_guidance":
        fallbackAnswer = `That's a great question! I'd love to help you with this. ${contactInfo} I can provide personalized guidance based on your specific needs.`;
        break;

      case "project_experience":
        fallbackAnswer = `That's an interesting topic! I may have experience with this. ${contactInfo} Let's discuss the specifics.`;
        break;

      case "technical_capability":
        fallbackAnswer = `I might have expertise in this area. Let me connect with you directly to explore what you're looking for. ${contactInfo}`;
        break;

      case "teaching_mentoring":
        fallbackAnswer = `I'd be happy to help you learn and grow! ${contactInfo} We can tailor a learning path based on your goals.`;
        break;

      case "education_background":
      case "skill_evaluation":
      case "future_goals":
        fallbackAnswer = `That's a detailed question! I have more information to share. ${contactInfo}`;
        break;

      default:
        fallbackAnswer = `That's an interesting question! For a more comprehensive answer, ${contactInfo} I'm happy to discuss this further.`;
    }

    return {
      answer: fallbackAnswer,
      source: "fallback",
      confidence: 0.4,
    };
  }

  /**
   * Get all available FAQs (for UI display)
   */
  public getAvailableFAQs() {
    return FAQS;
  }

  /**
   * Check if a question is answerable (confidence threshold)
   */
  public isAnswerable(question: string, threshold: number = 0.5): boolean {
    const response = this.answerQuestion(question);
    return response.confidence >= threshold;
  }

  /**
   * Get answer with detailed reasoning (for debugging)
   */
  public answerWithDebugging(question: string) {
    const response = this.answerQuestion(question);
    const intentResult = intentDetector.detectIntent(question);

    return {
      ...response,
      debug: {
        intent: intentResult.intent,
        intentConfidence: intentResult.confidence,
        normalizedQuestion: this.normalizeQuestion(question),
      },
    };
  }
}

// Export singleton instance
export const chatbotEngine = new AdvancedChatbotEngine();
