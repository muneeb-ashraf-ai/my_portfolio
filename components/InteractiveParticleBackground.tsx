"use client";

import React, { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

interface Star {
  x: number;
  y: number;
  size: number;
  baseOpacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
  currentOpacity: number;
  glow: number;
  vx: number;
  vy: number;
  floatPhase: number;
  floatSpeed: number;
}

const InteractiveParticleBackground: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | undefined>(undefined);
  const timeRef = useRef<number>(0);

  const isDark = theme === 'dark';
  const starCount = 120;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize stars function
    const initializeStars = () => {
      starsRef.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        baseOpacity: Math.random() * 0.6 + 0.3,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
        currentOpacity: 0.5,
        glow: 0,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: Math.random() * 0.01 + 0.003,
      }));
    };

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeStars();
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = isDark ? '#0B080E' : '#F8F7FF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle background gradient overlay
      const gradientBg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (isDark) {
        gradientBg.addColorStop(0, 'rgba(20, 10, 30, 0.3)');
        gradientBg.addColorStop(1, 'rgba(10, 5, 20, 0.2)');
      } else {
        gradientBg.addColorStop(0, 'rgba(230, 220, 255, 0.4)');
        gradientBg.addColorStop(1, 'rgba(245, 240, 255, 0.3)');
      }
      ctx.fillStyle = gradientBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      timeRef.current += 1;

      // Update and draw stars
      starsRef.current.forEach((star) => {
        // Update floating position
        star.floatPhase += star.floatSpeed;
        const floatX = Math.cos(star.floatPhase) * 0.5;
        const floatY = Math.sin(star.floatPhase * 0.7) * 0.5;

        // Update position with velocity
        star.x += star.vx + floatX;
        star.y += star.vy + floatY;

        // Calculate distance from cursor
        const dx = star.x - mousePos.current.x;
        const dy = star.y - mousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Cursor interaction - attraction effect
        const interactionRadius = 300;
        if (distance < interactionRadius) {
          const force = (1 - distance / interactionRadius) * 0.15;
          const angle = Math.atan2(dy, dx);
          // Attract towards cursor
          star.vx -= Math.cos(angle) * force;
          star.vy -= Math.sin(angle) * force;
        }

        // Damping to prevent runaway speed
        star.vx *= 0.95;
        star.vy *= 0.95;

        // Wrap around screen edges
        if (star.x < -10) star.x = canvas.width + 10;
        if (star.x > canvas.width + 10) star.x = -10;
        if (star.y < -10) star.y = canvas.height + 10;
        if (star.y > canvas.height + 10) star.y = -10;

        // Calculate twinkling effect
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.4 + 0.6;
        star.currentOpacity = star.baseOpacity * twinkle;

        // Cursor glow effect - enhanced
        const glowRadius = 250;
        if (distance < glowRadius) {
          const glowIntensity = (1 - distance / glowRadius) * 0.6;
          star.glow = glowIntensity;
          star.currentOpacity = Math.min(star.currentOpacity + glowIntensity, 1);
        } else {
          star.glow = 0;
        }

        // Draw star
        const opacity = star.currentOpacity;
        
        if (star.size > 1.2) {
          // Larger stars with glow
          const gradient = ctx.createRadialGradient(
            star.x, star.y, 0,
            star.x, star.y, star.size * 3
          );
          const starColor = isDark 
            ? `rgba(200, 190, 255, ` 
            : `rgba(130, 100, 200, `;
          gradient.addColorStop(0, starColor + (opacity * 0.5) + ')');
          gradient.addColorStop(0.4, starColor + (opacity * 0.2) + ')');
          gradient.addColorStop(1, starColor + '0)');
          
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw star core
        const coreColor = isDark
          ? `rgba(230, 220, 255, ${opacity})`
          : `rgba(110, 80, 180, ${opacity})`;
        ctx.fillStyle = coreColor;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark, starCount]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        backgroundColor: isDark ? '#0B080E' : '#FFFFFF',
      }}
    />
  );
};

export default InteractiveParticleBackground;
