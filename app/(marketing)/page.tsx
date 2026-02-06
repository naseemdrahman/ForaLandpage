'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Navbar Component
function Navbar({ onJoinWaitlistClick }: { onJoinWaitlistClick: () => void }) {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
      <div className="w-full flex items-center justify-between h-20 lg:h-24">
        <Link href="/" className="text-white text-3xl lg:text-5xl font-bold tracking-tighter uppercase pl-4 sm:pl-6 lg:pl-8">
          FORA
        </Link>
        <div className="pr-4 sm:pr-6 lg:pr-8">
          <button
            onClick={onJoinWaitlistClick}
            className="px-6 py-3 lg:px-8 lg:py-3 bg-violet-600 hover:bg-violet-700 text-white text-base lg:text-lg font-medium transition-colors border border-violet-600 hover:border-violet-700"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </nav>
  );
}

// Microphone Icon Component
function MicrophoneIcon({ x, y, scale = 1, flip = false }: { x: number; y: number; scale?: number; flip?: boolean }) {
  const transform = flip ? `translate(${x}, ${y}) scale(-1, 1) translate(-${x}, -${y})` : '';
  return (
    <g transform={transform}>
      {/* Microphone body */}
      <rect x={x - 15 * scale} y={y - 40 * scale} width={30 * scale} height={50 * scale} rx={15 * scale} fill="none" stroke="#8B5CF6" strokeWidth="2.5" opacity="0.9" />
      {/* Microphone stand/base */}
      <rect x={x - 8 * scale} y={y + 15 * scale} width={16 * scale} height={25 * scale} rx={2 * scale} fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.7" />
      {/* Microphone grille lines */}
      <line x1={x - 10 * scale} y1={y - 30 * scale} x2={x + 10 * scale} y2={y - 30 * scale} stroke="#8B5CF6" strokeWidth="1.5" opacity="0.6" />
      <line x1={x - 10 * scale} y1={y - 20 * scale} x2={x + 10 * scale} y2={y - 20 * scale} stroke="#8B5CF6" strokeWidth="1.5" opacity="0.6" />
      <line x1={x - 10 * scale} y1={y - 10 * scale} x2={x + 10 * scale} y2={y - 10 * scale} stroke="#8B5CF6" strokeWidth="1.5" opacity="0.6" />
      {/* Sound waves coming from mic */}
      <path
        d={`M ${x + 20 * scale} ${y - 20 * scale} Q ${x + 35 * scale} ${y - 20 * scale} ${x + 35 * scale} ${y - 5 * scale} Q ${x + 35 * scale} ${y + 10 * scale} ${x + 20 * scale} ${y + 10 * scale}`}
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="1.5"
        opacity="0.4"
        strokeLinecap="round"
      />
      <path
        d={`M ${x + 25 * scale} ${y - 25 * scale} Q ${x + 45 * scale} ${y - 25 * scale} ${x + 45 * scale} ${y - 5 * scale} Q ${x + 45 * scale} ${y + 15 * scale} ${x + 25 * scale} ${y + 15 * scale}`}
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="1.5"
        opacity="0.3"
        strokeLinecap="round"
      />
    </g>
  );
}

// Floating Background Elements
function FloatingBackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Microphones - More distributed across the page */}
      <div className="absolute top-20 left-[5%] animate-bounce-horizontal-1 opacity-20">
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="30" height="40" rx="15" stroke="#8B5CF6" strokeWidth="1.5" />
          <rect x="12" y="45" width="16" height="15" rx="2" stroke="#8B5CF6" strokeWidth="1" />
          <line x1="10" y1="20" x2="30" y2="20" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
          <line x1="10" y1="28" x2="30" y2="28" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>
      
      <div className="absolute top-40 right-[10%] animate-bounce-horizontal-2 opacity-15">
        <svg width="35" height="55" viewBox="0 0 35 55" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="25" height="35" rx="12" stroke="#7C3AED" strokeWidth="1.5" />
          <rect x="12" y="40" width="11" height="12" rx="2" stroke="#7C3AED" strokeWidth="1" />
          <line x1="10" y1="18" x2="25" y2="18" stroke="#7C3AED" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute bottom-32 left-[15%] animate-bounce-diagonal-1 opacity-18">
        <svg width="30" height="50" viewBox="0 0 30 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="20" height="30" rx="10" stroke="#6D28D9" strokeWidth="1.5" />
          <rect x="10" y="35" width="10" height="12" rx="2" stroke="#6D28D9" strokeWidth="1" />
          <line x1="8" y1="15" x2="22" y2="15" stroke="#6D28D9" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute top-60 right-[20%] animate-bounce-horizontal-3 opacity-12">
        <svg width="25" height="45" viewBox="0 0 25 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="15" height="25" rx="7" stroke="#8B5CF6" strokeWidth="1.5" />
          <rect x="9" y="30" width="7" height="10" rx="2" stroke="#8B5CF6" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute top-[30%] left-[25%] animate-bounce-diagonal-2 opacity-16">
        <svg width="32" height="52" viewBox="0 0 32 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="20" height="32" rx="10" stroke="#7C3AED" strokeWidth="1.5" />
          <rect x="11" y="38" width="10" height="12" rx="2" stroke="#7C3AED" strokeWidth="1" />
          <line x1="9" y1="18" x2="23" y2="18" stroke="#7C3AED" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute bottom-[25%] right-[15%] animate-bounce-horizontal-1 opacity-14">
        <svg width="28" height="48" viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="20" height="30" rx="10" stroke="#6D28D9" strokeWidth="1.5" />
          <rect x="9" y="34" width="10" height="12" rx="2" stroke="#6D28D9" strokeWidth="1" />
          <line x1="7" y1="16" x2="21" y2="16" stroke="#6D28D9" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute top-[50%] left-[8%] animate-bounce-horizontal-2 opacity-13">
        <svg width="22" height="42" viewBox="0 0 22 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="14" height="24" rx="7" stroke="#8B5CF6" strokeWidth="1.5" />
          <rect x="8" y="28" width="6" height="10" rx="2" stroke="#8B5CF6" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute bottom-[40%] right-[8%] animate-bounce-diagonal-1 opacity-17">
        <svg width="38" height="58" viewBox="0 0 38 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="26" height="38" rx="13" stroke="#7C3AED" strokeWidth="1.5" />
          <rect x="13" y="44" width="12" height="12" rx="2" stroke="#7C3AED" strokeWidth="1" />
          <line x1="11" y1="22" x2="27" y2="22" stroke="#7C3AED" strokeWidth="1" opacity="0.6" />
          <line x1="11" y1="28" x2="27" y2="28" stroke="#7C3AED" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      {/* Floating Speech Bubbles - Cloud-like, distributed across page */}
      <div className="absolute top-32 right-[12%] animate-bounce-horizontal-2 opacity-15">
        <svg width="70" height="50" viewBox="0 0 70 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cloud shape */}
          <path
            d="M 20 15 Q 15 15 12 18 Q 8 18 8 22 Q 5 22 5 26 Q 5 30 9 30 Q 12 33 16 33 Q 20 36 25 36 Q 30 36 33 33 Q 37 33 40 30 Q 44 30 44 26 Q 44 22 40 22 Q 40 18 36 18 Q 33 15 28 15 Q 25 12 20 15 Z"
            stroke="#8B5CF6"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Speech bubble tail */}
          <path d="M 25 36 Q 22 40 20 38 Q 18 36 20 34" stroke="#8B5CF6" strokeWidth="1.5" fill="none" />
          {/* Text lines */}
          <line x1="18" y1="22" x2="32" y2="22" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
          <line x1="18" y1="27" x2="30" y2="27" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute bottom-40 right-[18%] animate-bounce-diagonal-1 opacity-18">
        <svg width="60" height="45" viewBox="0 0 60 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cloud shape */}
          <path
            d="M 45 12 Q 50 12 52 15 Q 55 15 55 18 Q 58 18 58 22 Q 58 26 55 26 Q 52 29 48 29 Q 44 32 40 32 Q 35 32 32 29 Q 28 29 25 26 Q 21 26 21 22 Q 21 18 24 18 Q 24 15 27 15 Q 30 12 35 12 Q 40 9 45 12 Z"
            stroke="#7C3AED"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Speech bubble tail */}
          <path d="M 40 32 Q 43 36 45 34 Q 47 32 45 30" stroke="#7C3AED" strokeWidth="1.5" fill="none" />
          {/* Text lines */}
          <line x1="28" y1="19" x2="42" y2="19" stroke="#7C3AED" strokeWidth="1" opacity="0.4" />
          <line x1="28" y1="24" x2="40" y2="24" stroke="#7C3AED" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute top-80 left-[22%] animate-bounce-horizontal-3 opacity-12">
        <svg width="55" height="40" viewBox="0 0 55 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cloud shape */}
          <path
            d="M 15 10 Q 10 10 8 13 Q 5 13 5 17 Q 2 17 2 21 Q 2 25 5 25 Q 8 28 12 28 Q 16 31 21 31 Q 26 31 29 28 Q 33 28 36 25 Q 40 25 40 21 Q 40 17 37 17 Q 37 13 34 13 Q 31 10 26 10 Q 21 7 15 10 Z"
            stroke="#6D28D9"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Speech bubble tail */}
          <path d="M 21 31 Q 18 35 16 33 Q 14 31 16 29" stroke="#6D28D9" strokeWidth="1.5" fill="none" />
          {/* Text lines */}
          <line x1="12" y1="17" x2="28" y2="17" stroke="#6D28D9" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute bottom-60 left-[12%] animate-bounce-horizontal-1 opacity-15">
        <svg width="65" height="48" viewBox="0 0 65 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cloud shape */}
          <path
            d="M 20 14 Q 15 14 12 17 Q 8 17 8 21 Q 5 21 5 25 Q 5 29 9 29 Q 12 32 16 32 Q 20 35 25 35 Q 30 35 33 32 Q 37 32 40 29 Q 44 29 44 25 Q 44 21 40 21 Q 40 17 36 17 Q 33 14 28 14 Q 25 11 20 14 Z"
            stroke="#8B5CF6"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Speech bubble tail */}
          <path d="M 25 35 Q 22 39 20 37 Q 18 35 20 33" stroke="#8B5CF6" strokeWidth="1.5" fill="none" />
          {/* Text lines */}
          <line x1="18" y1="21" x2="32" y2="21" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
          <line x1="18" y1="26" x2="30" y2="26" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
          <line x1="18" y1="31" x2="28" y2="31" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute top-[35%] right-[25%] animate-bounce-diagonal-2 opacity-14">
        <svg width="58" height="42" viewBox="0 0 58 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cloud shape */}
          <path
            d="M 18 12 Q 13 12 10 15 Q 6 15 6 19 Q 3 19 3 23 Q 3 27 7 27 Q 10 30 14 30 Q 18 33 23 33 Q 28 33 31 30 Q 35 30 38 27 Q 42 27 42 23 Q 42 19 38 19 Q 38 15 34 15 Q 31 12 26 12 Q 23 9 18 12 Z"
            stroke="#7C3AED"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Speech bubble tail */}
          <path d="M 23 33 Q 20 37 18 35 Q 16 33 18 31" stroke="#7C3AED" strokeWidth="1.5" fill="none" />
          {/* Text lines */}
          <line x1="16" y1="19" x2="30" y2="19" stroke="#7C3AED" strokeWidth="1" opacity="0.4" />
          <line x1="16" y1="24" x2="28" y2="24" stroke="#7C3AED" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute bottom-[30%] left-[30%] animate-bounce-horizontal-2 opacity-16">
        <svg width="52" height="38" viewBox="0 0 52 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cloud shape */}
          <path
            d="M 16 10 Q 11 10 8 13 Q 4 13 4 17 Q 1 17 1 21 Q 1 25 5 25 Q 8 28 12 28 Q 16 31 21 31 Q 26 31 29 28 Q 33 28 36 25 Q 40 25 40 21 Q 40 17 37 17 Q 37 13 34 13 Q 31 10 26 10 Q 23 7 16 10 Z"
            stroke="#6D28D9"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Speech bubble tail */}
          <path d="M 21 31 Q 18 35 16 33 Q 14 31 16 29" stroke="#6D28D9" strokeWidth="1.5" fill="none" />
          {/* Text lines */}
          <line x1="12" y1="17" x2="28" y2="17" stroke="#6D28D9" strokeWidth="1" opacity="0.4" />
          <line x1="12" y1="22" x2="26" y2="22" stroke="#6D28D9" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute top-[55%] right-[5%] animate-bounce-horizontal-1 opacity-13">
        <svg width="48" height="35" viewBox="0 0 48 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cloud shape */}
          <path
            d="M 14 8 Q 9 8 6 11 Q 2 11 2 15 Q -1 15 -1 19 Q -1 23 3 23 Q 6 26 10 26 Q 14 29 19 29 Q 24 29 27 26 Q 31 26 34 23 Q 38 23 38 19 Q 38 15 35 15 Q 35 11 32 11 Q 29 8 24 8 Q 21 5 14 8 Z"
            stroke="#8B5CF6"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Speech bubble tail */}
          <path d="M 19 29 Q 16 33 14 31 Q 12 29 14 27" stroke="#8B5CF6" strokeWidth="1.5" fill="none" />
          {/* Text lines */}
          <line x1="10" y1="15" x2="24" y2="15" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute bottom-[50%] left-[5%] animate-bounce-diagonal-1 opacity-17">
        <svg width="62" height="44" viewBox="0 0 62 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cloud shape */}
          <path
            d="M 19 11 Q 14 11 11 14 Q 7 14 7 18 Q 4 18 4 22 Q 4 26 8 26 Q 11 29 15 29 Q 19 32 24 32 Q 29 32 32 29 Q 36 29 39 26 Q 43 26 43 22 Q 43 18 40 18 Q 40 14 37 14 Q 34 11 29 11 Q 26 8 19 11 Z"
            stroke="#7C3AED"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Speech bubble tail */}
          <path d="M 24 32 Q 21 36 19 34 Q 17 32 19 30" stroke="#7C3AED" strokeWidth="1.5" fill="none" />
          {/* Text lines */}
          <line x1="17" y1="18" x2="31" y2="18" stroke="#7C3AED" strokeWidth="1" opacity="0.4" />
          <line x1="17" y1="23" x2="29" y2="23" stroke="#7C3AED" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

// Hero Debate Visual Component - Two microphones facing each other (mic vs mic)
function HeroDebateVisual() {
  return (
    <div className="relative w-full h-64 md:h-96 flex items-center justify-center">
      <svg
        viewBox="0 0 500 300"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.05" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Background glow */}
        <ellipse cx="250" cy="150" rx="240" ry="120" fill="url(#purpleGlow)" opacity="0.6" />
        
        {/* Left microphone - Player 1 */}
        <MicrophoneIcon x={150} y={150} scale={1.2} flip={false} />
        
        {/* Central divider line */}
        <line x1="250" y1="60" x2="250" y2="240" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.3" strokeDasharray="4,4" />
        
        {/* VS indicator in center */}
        <circle cx="250" cy="150" r="28" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.4" filter="url(#glow)" />
        <text x="250" y="158" textAnchor="middle" fill="#8B5CF6" fontSize="18" fontWeight="bold" opacity="0.9">VS</text>
        
        {/* Right microphone - Player 2 */}
        <MicrophoneIcon x={350} y={150} scale={1.2} flip={true} />
      </svg>
    </div>
  );
}

// Stat Pill Component
function StatPill({ label }: { label: string }) {
  return (
    <div className="px-4 py-2 border border-zinc-800 bg-zinc-950 rounded-sm">
              <span className="text-zinc-100 text-sm">{label}</span>
    </div>
  );
}

// Scroll Indicator Component
function ScrollIndicator() {
  return (
    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 z-10">
      <p className="text-white text-base font-medium">Scroll down to learn more:</p>
      <div className="animate-bounce">
        <svg
          className="w-12 h-12 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={3}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>
  );
}

// Hero Section
function HeroSection({ onJoinWaitlistClick }: { onJoinWaitlistClick: () => void }) {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <section className="relative bg-black/80 backdrop-blur-sm text-white pt-12 md:pt-16 pb-32 overflow-hidden">
        <FloatingBackgroundElements />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Debate like a sport.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-100 max-w-2xl mx-auto mb-10">
              Competitive player vs player debates with skill-based scoring. Challenge opponents, prove your arguments, and climb the leaderboards.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={onJoinWaitlistClick}
                className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors border border-violet-600 hover:border-violet-700"
              >
                Join Waitlist
              </button>
              <button
                onClick={() => setShowDemo(true)}
                className="px-8 py-3 border border-zinc-800 hover:border-zinc-700 text-white font-medium transition-colors bg-zinc-950 hover:bg-zinc-900"
              >
                Watch Demo
              </button>
            </div>
            <HeroDebateVisual />
          </div>
        </div>
        <ScrollIndicator />
      </section>

      {/* Demo Modal */}
      {showDemo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setShowDemo(false)}
        >
          <div
            className="bg-zinc-900 border border-zinc-800 p-8 max-w-4xl w-full mx-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowDemo(false)}
              className="absolute top-4 right-4 text-zinc-200 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video bg-zinc-950 border border-zinc-800 flex items-center justify-center">
              <p className="text-zinc-300">Demo video placeholder</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Social Proof Section
function SocialProof() {
  const logos = ['Thinkers', 'Students', 'Competitors', 'Debaters', 'Analysts', 'Scholars'];

  return (
    <section className="py-16 bg-zinc-950/80 backdrop-blur-sm border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-zinc-100 text-sm mb-8">Built for thinkers, students, and competitors</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="border border-zinc-800 bg-black p-6 flex items-center justify-center"
            >
              <span className="text-zinc-200 text-sm uppercase tracking-wide">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Step Icon Component
function StepIcon({ step }: { step: number }) {
  const icons = [
    <svg key="1" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>,
    <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>,
    <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>,
  ];

  return (
    <div className="w-16 h-16 border border-violet-600/30 bg-violet-600/10 flex items-center justify-center text-violet-500 mb-4">
      {icons[step - 1]}
    </div>
  );
}

// How It Works Section
function HowItWorks() {
  const steps = [
    {
      title: 'Choose a topic',
      description: 'Select from curated debate topics across politics, philosophy, science, and more.',
    },
    {
      title: 'Challenge another player',
      description: 'Challenge any player to a turn-based debate. Take your time crafting arguments and respond asynchronously.',
    },
    {
      title: 'Receive score + ranking',
      description: 'Get evaluated on clarity, logic, evidence, and civility. Climb the leaderboards.',
    },
  ];

  return (
    <section id="features" className="py-24 bg-black/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="border border-zinc-800 bg-zinc-950 p-8">
              <StepIcon step={idx + 1} />
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-zinc-100">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Modes Section
function ModesSection() {
  const modes = [
    {
      title: 'Challenge Players',
      description: 'Challenge any player to a turn-based debate. Take your time crafting responses and compete on skill.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Practice Mode',
      description: 'Practice against AI opponents to sharpen your skills before challenging real players.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Leaderboards',
      description: 'Global and topic-based rankings. Track your progress, see where you stand, and compete for the top spots.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="modes" className="py-24 bg-zinc-950/80 backdrop-blur-sm border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Modes</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {modes.map((mode, idx) => (
            <div
              key={idx}
              className="border border-zinc-800 bg-black p-8 hover:border-zinc-700 transition-colors"
            >
              <div className="text-violet-500 mb-4">{mode.icon}</div>
              <h3 className="text-2xl font-semibold mb-3">{mode.title}</h3>
              <p className="text-zinc-100">{mode.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Scoring Bar Component
function ScoringBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-zinc-200">{value}%</span>
      </div>
      <div className="h-2 bg-zinc-900 border border-zinc-800 relative overflow-hidden">
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${value}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

// Scoring System Section
function ScoringSystem() {
  const dimensions = [
    { label: 'Clarity', value: 95, color: '#8B5CF6' },
    { label: 'Logic', value: 88, color: '#7C3AED' },
    { label: 'Evidence', value: 92, color: '#6D28D9' },
    { label: 'Civility', value: 90, color: '#8B5CF6' },
  ];

  return (
    <section id="scoring" className="py-24 bg-black/80 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Scoring System</h2>
        <p className="text-center text-zinc-100 mb-12 max-w-2xl mx-auto">
          Every debate is evaluated across four dimensions. Fair, transparent, and skill-based.
        </p>
        <div className="border border-zinc-800 bg-zinc-950 p-8 md:p-12">
          {dimensions.map((dim, idx) => (
            <ScoringBar key={idx} label={dim.label} value={dim.value} color={dim.color} />
          ))}
          <div className="mt-8 pt-8 border-t border-zinc-800">
            <p className="text-sm text-zinc-200">
              Scores are calculated using a combination of AI analysis and peer review. No black-box algorithms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Leaderboard Preview Section
function LeaderboardPreview() {
  const sampleData = [
    { rank: 1, username: 'Socrates', rating: 2450, winRate: '87%', debates: 142 },
    { rank: 2, username: 'Aristotle', rating: 2380, winRate: '84%', debates: 156 },
    { rank: 3, username: 'Plato', rating: 2320, winRate: '81%', debates: 128 },
    { rank: 4, username: 'Kant', rating: 2280, winRate: '79%', debates: 134 },
    { rank: 5, username: 'Nietzsche', rating: 2240, winRate: '76%', debates: 119 },
  ];

  return (
    <section id="leaderboard" className="py-24 bg-zinc-950/80 backdrop-blur-sm border-y border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Leaderboard</h2>
        <div className="border border-zinc-800 bg-black overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950">
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-200 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-200 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-200 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-200 uppercase tracking-wider">
                    Win Rate
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-200 uppercase tracking-wider">
                    Debates
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {sampleData.map((row) => (
                  <tr key={row.rank} className="hover:bg-zinc-900 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-violet-500 font-semibold">#{row.rank}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{row.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-100">{row.rating}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-100">{row.winRate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-200">{row.debates}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-800 bg-zinc-950">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-zinc-900 transition-colors"
      >
        <span className="font-medium">{question}</span>
        <svg
          className={`w-5 h-5 text-zinc-200 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t border-zinc-800 text-zinc-100">{answer}</div>
      )}
    </div>
  );
}

// FAQ Section
function FAQ() {
  const faqs = [
    {
      question: 'How does the scoring system work?',
      answer:
        'Each debate is evaluated across four dimensions: Clarity, Logic, Evidence, and Civility. Scores are calculated using AI analysis combined with peer review mechanisms to ensure fairness and transparency.',
    },
    {
      question: 'How do I choose debate topics?',
      answer:
        'You can select from our curated library of debate topics across politics, philosophy, science, technology, and more. Topics are regularly updated to keep debates fresh and relevant.',
    },
    {
      question: 'How do player vs player debates work?',
      answer:
        'Debates are asynchronous and turn-based. Challenge any player to a debate on a topic of your choice. Both players have a set time window to respond. Each participant takes turns crafting their arguments until the debate concludes.',
    },
    {
      question: 'Is there a practice mode?',
      answer:
        'Yes. You can practice against AI opponents to sharpen your skills before challenging real players. Practice mode uses advanced AI, and difficulty levels can be adjusted.',
    },
    {
      question: 'How are leaderboards calculated?',
      answer:
        'Leaderboards are based on your rating, which is calculated using an Elo-like system. Ratings adjust based on your performance in player vs player debates. Win against higher-rated opponents to climb faster.',
    },
    {
      question: 'Is there a cost to use FORA?',
      answer:
        'FORA is currently in beta. Early access is free for waitlist members. Future pricing will be announced before launch.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-black/80 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Waitlist Modal Component
function WaitlistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Successfully joined the waitlist! We\'ll be in touch soon.');
        setEmail('');
        // Auto-close after 2 seconds on success
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setMessage('');
        }, 2000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to connect. Please try again later.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-zinc-800 p-8 max-w-md w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-200 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-2">Join the Arena</h2>
        <p className="text-zinc-300 mb-6">
          Be among the first to compete. Join the waitlist for early access.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-black border border-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:border-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            autoFocus
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors border border-violet-600 hover:border-violet-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
          </button>
          {message && (
            <div
              className={`px-4 py-3 rounded-sm border ${
                status === 'success'
                  ? 'bg-violet-600/20 border-violet-600 text-violet-300'
                  : 'bg-red-600/20 border-red-600 text-red-300'
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// Waitlist Section
function WaitlistSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Successfully joined the waitlist! We\'ll be in touch soon.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to connect. Please try again later.');
    }
  };

  return (
    <section id="waitlist" className="py-32 bg-zinc-950/80 backdrop-blur-sm border-y border-zinc-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">Join the Arena</h2>
        <p className="text-xl text-zinc-100 mb-12">
          Be among the first to compete. Join the waitlist for early access.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={status === 'loading'}
              className="flex-1 px-6 py-3 bg-black border border-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:border-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors border border-violet-600 hover:border-violet-700 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
            </button>
          </div>
          {message && (
            <div
              className={`px-4 py-3 rounded-sm border ${
                status === 'success'
                  ? 'bg-violet-600/20 border-violet-600 text-violet-300'
                  : 'bg-red-600/20 border-red-600 text-red-300'
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-black/80 backdrop-blur-sm border-t border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold tracking-tighter uppercase mb-2">FORA</h3>
            <p className="text-sm text-zinc-300">Competitive debate. Skill-based ranking.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-zinc-300 hover:text-white transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-zinc-300 hover:text-white transition-colors text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Page() {
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);

  // Prevent auto-scroll to hash on page load
  useEffect(() => {
    // Remove hash from URL without scrolling
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    // Scroll to top on initial load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen animated-gradient text-white">
      <Navbar onJoinWaitlistClick={() => setShowWaitlistModal(true)} />
      <HeroSection onJoinWaitlistClick={() => setShowWaitlistModal(true)} />
      <WaitlistModal isOpen={showWaitlistModal} onClose={() => setShowWaitlistModal(false)} />
      <SocialProof />
      <HowItWorks />
      <ModesSection />
      <ScoringSystem />
      <LeaderboardPreview />
      <FAQ />
      <WaitlistSection />
      <Footer />
    </div>
  );
}
