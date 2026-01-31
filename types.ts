
export type Theme = 'light' | 'dark';

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

export interface FAQ {
  question: string;
  answer: string;
  keywords?: string[];
  links?: Array<{ text: string; url: string }>;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  links?: Array<{ text: string; url: string }>;
}
