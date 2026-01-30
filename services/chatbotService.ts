
import { FAQS } from '../constants';

export const getBotResponse = (query: string): string => {
  const normalizedQuery = query.toLowerCase().trim();

  // Score matches using question text and keywords
  let bestMatch: { answer: string; score: number } | null = null;

  for (const faq of FAQS) {
    let score = 0;
    const q = faq.question.toLowerCase();

    if (normalizedQuery.includes(q) || q.includes(normalizedQuery)) {
      score += 3;
    }

    if (faq.keywords && faq.keywords.length > 0) {
      for (const keyword of faq.keywords) {
        if (normalizedQuery.includes(keyword.toLowerCase())) {
          score += 2;
        }
      }
    }

    if (score > 0 && (!bestMatch || score > bestMatch.score)) {
      bestMatch = { answer: faq.answer, score };
    }
  }

  if (bestMatch) {
    return bestMatch.answer;
  }

  // Generic responses if no match is found
  const fallbackResponses = [
    "I'm not sure yet. Try asking about projects, education, experience, skills, or contact details.",
    "You can ask about featured projects, IELTS score, NAVTTC, or how to reach Muneeb.",
    "Ask me about education, work experience, or tools/skills. I can also share contact info."
  ];

  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};
