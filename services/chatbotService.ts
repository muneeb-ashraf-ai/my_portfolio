
import { FAQS } from '../constants';

export const getBotResponse = (query: string): string => {
  const normalizedQuery = query.toLowerCase().trim();
  
  // Try to find an exact match first
  const match = FAQS.find(faq => 
    normalizedQuery.includes(faq.question.toLowerCase()) || 
    faq.question.toLowerCase().includes(normalizedQuery)
  );

  if (match) {
    return match.answer;
  }

  // Generic responses if no match is found
  const fallbackResponses = [
    "I'm not sure about that. Try asking about my services, availability, or tech stack!",
    "Interesting question! You might want to check the 'About' section or ask me 'What services do you offer?'",
    "I can help with questions about my portfolio. Try asking 'What is your stack?'"
  ];

  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};
