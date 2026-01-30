
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { ChatMessage, Theme } from '../types';
import { getBotResponse } from '../services/chatbotService';
import { FAQS } from '../constants';

interface ChatbotProps {
  theme: Theme;
}

const Chatbot: React.FC<ChatbotProps> = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: "Hi there! I'm here to help. Ask me anything about Muneeb's work!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot thinking
    setTimeout(() => {
      const response = getBotResponse(text);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 600);
  };

  return (
    <div className="fixed z-50 bottom-24 right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`fixed bottom-24 right-6 w-[350px] h-[500px] max-h-[70vh] max-w-[calc(100vw-3rem)] flex flex-col rounded-2xl shadow-2xl shadow-lavender/30 overflow-hidden backdrop-blur-md ${
              theme === 'dark' ? 'bg-[#1E1428]/95 border border-lavender/30' : 'bg-white/95 border border-lavender/20'
            }`}
          >
            {/* Header with drag handle - NOT draggable when chat is open */}
            <div 
              className="p-4 bg-gradient-to-r from-lavender to-violet text-white flex justify-between items-center"
            >
              <div className="flex items-center gap-2 flex-1">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Assistant</h3>
                  <p className="text-[10px] opacity-80">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-all">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                    msg.sender === 'user' 
                      ? 'bg-lavender text-white rounded-tr-none' 
                      : theme === 'dark' 
                        ? 'bg-white/10 text-gray-200 rounded-tl-none' 
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/5">
              {FAQS.slice(0, 3).map((faq, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(faq.question)}
                  className="whitespace-nowrap px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] transition-colors"
                >
                  {faq.question}
                </button>
              ))}
            </div>

            {/* Input */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-4 flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className={`flex-1 px-4 py-2 rounded-full text-xs focus:outline-none focus:ring-1 focus:ring-lavender ${
                  theme === 'dark' ? 'bg-white/5 text-white' : 'bg-gray-100 text-gray-800'
                }`}
              />
              <button 
                type="submit"
                className="w-10 h-10 rounded-full bg-lavender text-white flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-lavender to-violet shadow-xl shadow-lavender/50 flex items-center justify-center text-white relative hover:shadow-2xl hover:shadow-lavender/70 transition-all cursor-pointer"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" 
          />
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
