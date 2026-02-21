import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles, ExternalLink } from 'lucide-react';
import { Theme } from '../types';

interface ChatbotPlaceholderProps {
  theme: Theme;
}

// ─── Replace this with your standalone chatbot URL when ready ───
const CHATBOT_URL = '#';

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

      {/* ── RIGHT: Chat placeholder ── */}
      <div className="hidden md:flex w-1/2 flex-col p-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`flex flex-col flex-1 rounded-2xl overflow-hidden border shadow-xl ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
          }`}
        >
          {/* Chat header */}
          <div
            className={`flex items-center gap-3 px-6 py-4 border-b ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-lavender flex items-center justify-center shadow">
              <Bot size={17} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">Muneeb's AI Assistant</p>
              <p
                className={`text-xs flex items-center gap-1.5 ${
                  isDark ? 'text-white/50' : 'text-midnight/50'
                }`}
              >
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                Online · Powered by AI
              </p>
            </div>
          </div>

          {/* Sample messages */}
          <div className="flex-1 flex flex-col gap-4 p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-lavender flex-shrink-0 flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl rounded-tl-none text-sm leading-relaxed ${
                  isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-midnight'
                }`}
              >
                👋 Hi! I'm Muneeb's AI assistant. Ask me anything about his work, skills, or projects!
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.85 }}
              className="flex items-end gap-3 flex-row-reverse"
            >
              <div className="w-8 h-8 rounded-full bg-violet flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                U
              </div>
              <div className="max-w-xs px-4 py-3 rounded-2xl rounded-br-none text-sm leading-relaxed bg-lavender text-white">
                What technologies does Muneeb work with?
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-lavender flex-shrink-0 flex items-center justify-center">
                <Bot size={14} className="text-white" />
              </div>
              <div
                className={`max-w-xs px-4 py-3 rounded-2xl rounded-tl-none text-sm leading-relaxed ${
                  isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-midnight'
                }`}
              >
                Muneeb specializes in Python, ML/AI, React, TypeScript, and cloud technologies. Want to know more?
              </div>
            </motion.div>

            {/* Coming soon card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className={`mt-auto flex flex-col items-center text-center gap-2 p-5 rounded-2xl border ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}
            >
              <Sparkles size={20} className="text-lavender" />
              <p className="text-sm font-semibold">Full experience in the standalone app</p>
              <p className={`text-xs max-w-[200px] leading-relaxed ${isDark ? 'text-white/40' : 'text-midnight/40'}`}>
                The complete AI chatbot is being set up as a separate application and will be linked here.
              </p>
              <a
                href={CHATBOT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1.5 text-xs font-bold text-lavender hover:underline transition-all"
              >
                <ExternalLink size={12} />
                Launch Chatbot App
              </a>
            </motion.div>
          </div>

          {/* Disabled input */}
          <div
            className={`flex items-center gap-3 px-4 py-4 border-t ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}
          >
            <input
              disabled
              placeholder="Available in the standalone chatbot app..."
              className={`flex-1 px-4 py-2.5 rounded-full text-sm border outline-none cursor-not-allowed opacity-40 ${
                isDark
                  ? 'bg-white/5 border-white/10 text-white placeholder-white/30'
                  : 'bg-black/5 border-black/10 text-midnight placeholder-midnight/30'
              }`}
            />
            <button
              disabled
              className="w-10 h-10 rounded-full bg-lavender/40 flex items-center justify-center cursor-not-allowed"
            >
              <Send size={15} className="text-white" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile: show only coming-soon card below profile */}
      <div
        className={`md:hidden fixed bottom-6 left-4 right-4 p-5 rounded-2xl border shadow-xl flex flex-col items-center text-center gap-3 ${
          isDark ? 'bg-midnight/90 border-white/10 text-white' : 'bg-white/90 border-black/10 text-midnight'
        } backdrop-blur-xl`}
      >
        <Sparkles size={18} className="text-lavender" />
        <p className="text-sm font-semibold">Chatbot as a separate app — coming soon</p>
        <a
          href={CHATBOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-lavender hover:underline"
        >
          <ExternalLink size={12} />
          Open Chatbot App
        </a>
      </div>
    </div>
  );
};

export default ChatbotPlaceholder;
