import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, ExternalLink } from 'lucide-react';
import { Theme } from '../types';

interface ChatbotPlaceholderProps {
  theme: Theme;
}

const CHATBOT_URL = 'https://muneeb-chatbot.vercel.app/';

const ChatbotPlaceholder: React.FC<ChatbotPlaceholderProps> = ({ theme }) => {
  const [isHoveringDivider, setIsHoveringDivider] = useState(false);
  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex items-stretch pt-20 relative overflow-hidden ${
        isDark ? 'bg-midnight text-white' : 'bg-white text-midnight'
      }`}
    >
      {/* ── LEFT: Profile panel ── */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-10 md:p-14 relative">
        {/* Ambient blobs */}
        <div className="absolute w-80 h-80 rounded-full blur-3xl opacity-10 bg-lavender -top-24 -left-24 animate-pulse pointer-events-none" />
        <div
          className="absolute w-64 h-64 rounded-full blur-3xl opacity-10 bg-violet -bottom-24 -right-10 animate-pulse pointer-events-none"
          style={{ animationDelay: '1.2s' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 text-center relative z-10"
        >
          {/* Avatar with gradient halo */}
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-lavender opacity-25 blur-2xl scale-125 pointer-events-none" />
            <div className="w-32 h-32 rounded-full border-2 border-lavender/40 bg-lavender/10 flex items-center justify-center text-5xl font-extrabold text-lavender relative z-10 shadow-xl">
              M
            </div>
            {/* Online indicator */}
            <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-green-400 border-2 border-midnight shadow z-20" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">Muneeb Ashraf</h1>
            <p className={`mt-1 text-sm font-medium ${isDark ? 'text-white/55' : 'text-midnight/55'}`}>
              AI / ML Engineer · Developer
            </p>
          </div>

          <p className={`max-w-[260px] text-sm leading-relaxed ${isDark ? 'text-white/45' : 'text-midnight/45'}`}>
            Chat with my AI assistant to explore my projects, skills, and experience — all in one place.
          </p>

          <motion.a
            href={CHATBOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(124,58,237,0.4)' }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 bg-lavender text-white px-7 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all"
          >
            <ExternalLink size={15} />
            Open Chatbot App
          </motion.a>
        </motion.div>
      </div>

      {/* ── DIVIDER: Interactive blur ── */}
      <div
        onMouseEnter={() => setIsHoveringDivider(true)}
        onMouseLeave={() => setIsHoveringDivider(false)}
        className="hidden md:flex relative items-center justify-center cursor-col-resize"
        style={{ minWidth: '2px' }}
      >
        {/* Glow line */}
        <motion.div
          animate={{
            width: isHoveringDivider ? '28px' : '2px',
            opacity: isHoveringDivider ? 1 : 0.45,
          }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="h-full absolute rounded-full"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, #7C3AED 30%, #22D3EE 60%, #7C3AED 80%, transparent 100%)',
            backdropFilter: isHoveringDivider ? 'blur(10px)' : 'none',
          }}
        />
        {/* Center dot */}
        <motion.div
          animate={{ scale: isHoveringDivider ? 1 : 0, opacity: isHoveringDivider ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 rounded-full bg-lavender/30 border border-lavender/60 flex items-center justify-center z-10"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-lavender" />
        </motion.div>
      </div>

      {/* ── RIGHT: Embedded Chatbot ── */}
      <div className="hidden md:flex w-1/2 flex-col p-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`flex flex-col flex-1 rounded-2xl overflow-hidden border shadow-xl ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          <iframe
            src={CHATBOT_URL}
            title="Muneeb's AI Chatbot"
            className="w-full flex-1 border-0"
            allow="microphone"
          />
        </motion.div>
      </div>

      {/* Mobile: open chatbot button */}
      <div
        className={`md:hidden fixed bottom-6 left-4 right-4 p-5 rounded-2xl border shadow-xl flex flex-col items-center text-center gap-3 ${
          isDark ? 'bg-midnight/90 border-white/10 text-white' : 'bg-white/90 border-black/10 text-midnight'
        } backdrop-blur-xl`}
      >
        <div className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center shadow">
          <Bot size={18} className="text-white" />
        </div>
        <p className="text-sm font-semibold">Chat with Muneeb's AI Assistant</p>
        <a
          href={CHATBOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-lavender text-white text-sm font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <ExternalLink size={14} />
          Open Chatbot
        </a>
      </div>
    </div>
  );
};

export default ChatbotPlaceholder;
