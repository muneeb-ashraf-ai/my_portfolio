import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { COLORS } from '../constants';
import InteractiveParticleBackground from './InteractiveParticleBackground';
import { preloadProfileImage } from '../utils/profileImagePreload';

interface EntryExperienceProps {
  onComplete: () => void;
}

const HERO_NAME = 'Muneeb Ashraf';
const HERO_ROLE = 'AI & Data Science Developer';
const HERO_TAGLINE = 'Building intelligent solutions with mathematics and technology';

const LOADING_DURATION_MS = 2250;
const FINALIZE_OFFSET_MS = 220;
const EXIT_OFFSET_MS = 1320;
const COMPLETE_OFFSET_MS = 1840;
const SPLASH_TRIGGER_DELAY_MS = 150;
const SPLASH_PULSE_DURATION_MS = 620;

const EntryExperience: React.FC<EntryExperienceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [showDynamicBackground, setShowDynamicBackground] = useState(false);
  const [showSplashPulse, setShowSplashPulse] = useState(false);

  const statusLabel = useMemo(() => {
    if (progress < 32) {
      return 'Initializing workspace';
    }
    if (progress < 68) {
      return 'Loading modules';
    }
    if (progress < 95) {
      return 'Preparing interface';
    }
    return 'Ready';
  }, [progress]);

  const progressValue = Math.min(100, Math.round(progress));
  const ringRadius = 64;
  const circumference = 2 * Math.PI * ringRadius;
  const ringOffset = circumference - (progressValue / 100) * circumference;

  useEffect(() => {
    // Warm the hero profile image while loader animation is running.
    void preloadProfileImage();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setProgress(100);
      setShowDynamicBackground(true);
      setRevealed(true);

      const fadeTimer = window.setTimeout(() => setExiting(true), 900);
      const completeTimer = window.setTimeout(() => onComplete(), 1380);

      return () => {
        window.clearTimeout(fadeTimer);
        window.clearTimeout(completeTimer);
      };
    }

    const startTime = performance.now();
    let frameId = 0;
    let isMounted = true;
    let splashTriggerTimer: number | null = null;
    let splashPulseTimer: number | null = null;

    const animateProgress = () => {
      const elapsed = performance.now() - startTime;
      const normalized = Math.min(elapsed / LOADING_DURATION_MS, 1);
      const eased = 1 - Math.pow(1 - normalized, 2.35);

      // Keep the initial loading stage below 100 so completion feels intentional.
      const stagedProgress = Math.min(96, Math.round(14 + eased * 82));
      if (isMounted) {
        setProgress((prev) => Math.max(prev, stagedProgress));
      }

      if (normalized < 1) {
        frameId = requestAnimationFrame(animateProgress);
      }
    };

    frameId = requestAnimationFrame(animateProgress);

    const finalizeTimer = window.setTimeout(() => {
      if (!isMounted) {
        return;
      }
      setProgress(100);
      setRevealed(true);
      setShowSplashPulse(true);

      splashTriggerTimer = window.setTimeout(() => {
        if (isMounted) {
          setShowDynamicBackground(true);
        }
      }, SPLASH_TRIGGER_DELAY_MS);

      splashPulseTimer = window.setTimeout(() => {
        if (isMounted) {
          setShowSplashPulse(false);
        }
      }, SPLASH_PULSE_DURATION_MS);
    }, LOADING_DURATION_MS + FINALIZE_OFFSET_MS);

    const fadeTimer = window.setTimeout(() => {
      if (isMounted) {
        setExiting(true);
      }
    }, LOADING_DURATION_MS + EXIT_OFFSET_MS);

    const completeTimer = window.setTimeout(() => {
      if (isMounted) {
        onComplete();
      }
    }, LOADING_DURATION_MS + COMPLETE_OFFSET_MS);

    return () => {
      isMounted = false;
      cancelAnimationFrame(frameId);
      window.clearTimeout(finalizeTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(completeTimer);
      if (splashTriggerTimer !== null) {
        window.clearTimeout(splashTriggerTimer);
      }
      if (splashPulseTimer !== null) {
        window.clearTimeout(splashPulseTimer);
      }
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="entry-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden px-4"
        >
          <div
            className="absolute inset-0 z-0"
            style={{
              background:
                'radial-gradient(circle at 50% 22%, rgba(198,166,229,0.2) 0%, rgba(40,27,58,0.72) 44%, rgba(9,7,15,1) 100%)',
            }}
          />

          <div
            className="absolute inset-0 z-0 opacity-30"
            style={{
              backgroundImage:
                'linear-gradient(rgba(191,166,226,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(191,166,226,0.08) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <AnimatePresence>
            {showDynamicBackground ? (
              <motion.div
                key="post-loader-splash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute inset-0 z-0"
              >
                <InteractiveParticleBackground theme="dark" spawnFromCenter />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <AnimatePresence>
            {showSplashPulse ? (
              <motion.div
                key="splash-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.28, opacity: 0.9 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                  className="absolute h-28 w-28 rounded-full border border-[#d9bff2]/80"
                />
                <motion.div
                  initial={{ scale: 0.42, opacity: 0.7 }}
                  animate={{ scale: 1.4, opacity: 0 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: 0.06 }}
                  className="absolute h-20 w-20 rounded-full bg-[#c79de6]/20"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.2, 0.85, 0.25, 1] }}
            className="relative z-10 w-[min(93vw,34rem)] rounded-3xl border border-lavender/30 bg-midnight/58 backdrop-blur-xl shadow-[0_30px_70px_rgba(20,9,31,0.62)]"
          >
            <div className="px-6 pb-7 pt-8 sm:px-9">
              <div className="mb-6 flex items-center justify-between text-[10px] sm:text-xs uppercase tracking-[0.24em] text-lavender/85">
                <span>Portfolio Initialization</span>
                <span>{progressValue}%</span>
              </div>

              <div className="relative mx-auto mb-6 h-44 w-44 sm:h-48 sm:w-48">
                <motion.div
                  className="absolute inset-0 rounded-full border border-lavender/25"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className="absolute inset-[13%] rounded-full border border-lavender/40"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
                />

                <svg
                  className="absolute inset-0 -rotate-90"
                  viewBox="0 0 160 160"
                  role="img"
                  aria-label="Loading progress"
                >
                  <circle
                    cx="80"
                    cy="80"
                    r={ringRadius}
                    fill="none"
                    stroke="rgba(227,207,247,0.14)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="80"
                    cy="80"
                    r={ringRadius}
                    fill="none"
                    stroke="url(#entryProgressGradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    animate={{ strokeDashoffset: ringOffset }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="entryProgressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c290eb" />
                      <stop offset="55%" stopColor="#e6cef9" />
                      <stop offset="100%" stopColor="#f6e7ff" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div>
                    <div
                      className="text-3xl font-semibold tracking-[0.08em] sm:text-4xl"
                      style={{
                        backgroundImage: `linear-gradient(180deg, ${COLORS.white} 0%, #dbc4ef 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {progressValue}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-lavender/75 sm:text-xs">Loading</div>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={statusLabel}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  className="text-center text-[11px] uppercase tracking-[0.28em] text-[#e6d6f7] sm:text-xs"
                >
                  {statusLabel}
                </motion.p>
              </AnimatePresence>

              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#9b6ec6] via-[#c59ee4] to-[#efd9ff]"
                  animate={{ width: `${progressValue}%` }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                />
              </div>

              <AnimatePresence>
                {revealed ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="mt-7 border-t border-lavender/25 pt-6 text-center"
                  >
                    <h1
                      className="m-0 text-2xl font-extrabold uppercase tracking-[0.13em] sm:text-3xl"
                      style={{
                        backgroundImage: `linear-gradient(180deg, ${COLORS.white} 0%, #dcc6ef 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {HERO_NAME}
                    </h1>
                    <h2 className="mt-3 text-[10px] uppercase tracking-[0.28em] text-lavender/90 sm:text-xs">{HERO_ROLE}</h2>
                    <p className="mx-auto mt-3 max-w-xl text-xs leading-relaxed text-[#d2bbeb] sm:text-sm">
                      {HERO_TAGLINE}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default EntryExperience;
