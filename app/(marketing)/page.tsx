'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Navbar Component
function Navbar({ onContactClick }: { onContactClick: () => void }) {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
      <div className="w-full flex items-center justify-between h-20 lg:h-24">
        <Link href="/" className="text-white text-3xl lg:text-5xl font-bold tracking-tighter uppercase pl-4 sm:pl-6 lg:pl-8">
          FORA
        </Link>
        <div className="pr-4 sm:pr-6 lg:pr-8">
          <button
            onClick={onContactClick}
            className="px-6 py-3 lg:px-8 lg:py-3 border border-zinc-800 hover:border-zinc-700 text-white text-base lg:text-lg font-medium transition-colors bg-zinc-950 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-black"
          >
            Contact us
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
    </g>
  );
}

// Floating Background Elements
function FloatingBackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating Microphones - Spread out, avoiding center (35-65% horizontal, 40-60% vertical) */}
      <div className="absolute top-[5%] left-[2%] animate-bounce-horizontal-1 opacity-20">
        <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="30" height="40" rx="15" stroke="#8B5CF6" strokeWidth="1.5" />
          <rect x="12" y="45" width="16" height="15" rx="2" stroke="#8B5CF6" strokeWidth="1" />
          <line x1="10" y1="20" x2="30" y2="20" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
          <line x1="10" y1="28" x2="30" y2="28" stroke="#8B5CF6" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>
      
      <div className="absolute top-[8%] right-[2%] animate-bounce-horizontal-2 opacity-15">
        <svg width="35" height="55" viewBox="0 0 35 55" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="25" height="35" rx="12" stroke="#7C3AED" strokeWidth="1.5" />
          <rect x="12" y="40" width="11" height="12" rx="2" stroke="#7C3AED" strokeWidth="1" />
          <line x1="10" y1="18" x2="25" y2="18" stroke="#7C3AED" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute bottom-[5%] left-[2%] animate-bounce-diagonal-1 opacity-18">
        <svg width="30" height="50" viewBox="0 0 30 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="20" height="30" rx="10" stroke="#6D28D9" strokeWidth="1.5" />
          <rect x="10" y="35" width="10" height="12" rx="2" stroke="#6D28D9" strokeWidth="1" />
          <line x1="8" y1="15" x2="22" y2="15" stroke="#6D28D9" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute top-[12%] right-[30%] animate-bounce-horizontal-3 opacity-12">
        <svg width="25" height="45" viewBox="0 0 25 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="15" height="25" rx="7" stroke="#8B5CF6" strokeWidth="1.5" />
          <rect x="9" y="30" width="7" height="10" rx="2" stroke="#8B5CF6" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute top-[22%] left-[2%] animate-bounce-diagonal-2 opacity-16">
        <svg width="32" height="52" viewBox="0 0 32 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="20" height="32" rx="10" stroke="#7C3AED" strokeWidth="1.5" />
          <rect x="11" y="38" width="10" height="12" rx="2" stroke="#7C3AED" strokeWidth="1" />
          <line x1="9" y1="18" x2="23" y2="18" stroke="#7C3AED" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute bottom-[8%] right-[2%] animate-bounce-horizontal-1 opacity-14">
        <svg width="28" height="48" viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="20" height="30" rx="10" stroke="#6D28D9" strokeWidth="1.5" />
          <rect x="9" y="34" width="10" height="12" rx="2" stroke="#6D28D9" strokeWidth="1" />
          <line x1="7" y1="16" x2="21" y2="16" stroke="#6D28D9" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute top-[28%] right-[2%] animate-bounce-horizontal-2 opacity-13">
        <svg width="22" height="42" viewBox="0 0 22 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="14" height="24" rx="7" stroke="#8B5CF6" strokeWidth="1.5" />
          <rect x="8" y="28" width="6" height="10" rx="2" stroke="#8B5CF6" strokeWidth="1" />
        </svg>
      </div>

      <div className="absolute bottom-[15%] right-[30%] animate-bounce-diagonal-1 opacity-17">
        <svg width="38" height="58" viewBox="0 0 38 58" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="6" width="26" height="38" rx="13" stroke="#7C3AED" strokeWidth="1.5" />
          <rect x="13" y="44" width="12" height="12" rx="2" stroke="#7C3AED" strokeWidth="1" />
          <line x1="11" y1="22" x2="27" y2="22" stroke="#7C3AED" strokeWidth="1" opacity="0.6" />
          <line x1="11" y1="28" x2="27" y2="28" stroke="#7C3AED" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      {/* Floating Speech Bubbles - Rounded rectangle style, spread out avoiding center */}
      <div className="absolute top-[6%] right-[2%] animate-bounce-horizontal-2 opacity-15">
        <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rounded rectangle bubble */}
          <rect x="5" y="5" width="50" height="30" rx="8" stroke="#8B5CF6" strokeWidth="1.5" fill="none" />
          {/* Speech bubble tail */}
          <path d="M 20 35 L 15 42 L 25 35 Z" fill="#8B5CF6" opacity="0.6" />
          {/* Text lines */}
          <line x1="15" y1="15" x2="45" y2="15" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
          <line x1="15" y1="22" x2="40" y2="22" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute bottom-[6%] right-[2%] animate-bounce-diagonal-1 opacity-18">
        <svg width="55" height="38" viewBox="0 0 55 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rounded rectangle bubble */}
          <rect x="5" y="5" width="45" height="28" rx="7" stroke="#7C3AED" strokeWidth="1.5" fill="none" />
          {/* Speech bubble tail */}
          <path d="M 40 33 L 45 40 L 35 33 Z" fill="#7C3AED" opacity="0.6" />
          {/* Text lines */}
          <line x1="12" y1="15" x2="38" y2="15" stroke="#7C3AED" strokeWidth="1" opacity="0.4" />
          <line x1="12" y1="22" x2="35" y2="22" stroke="#7C3AED" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute top-[18%] left-[2%] animate-bounce-horizontal-3 opacity-12">
        <svg width="50" height="35" viewBox="0 0 50 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rounded rectangle bubble */}
          <rect x="5" y="5" width="40" height="25" rx="6" stroke="#6D28D9" strokeWidth="1.5" fill="none" />
          {/* Speech bubble tail */}
          <path d="M 15 30 L 10 37 L 20 30 Z" fill="#6D28D9" opacity="0.6" />
          {/* Text lines */}
          <line x1="12" y1="15" x2="33" y2="15" stroke="#6D28D9" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute bottom-[12%] left-[2%] animate-bounce-horizontal-1 opacity-15">
        <svg width="58" height="42" viewBox="0 0 58 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rounded rectangle bubble */}
          <rect x="5" y="5" width="48" height="32" rx="8" stroke="#8B5CF6" strokeWidth="1.5" fill="none" />
          {/* Speech bubble tail */}
          <path d="M 22 37 L 17 44 L 27 37 Z" fill="#8B5CF6" opacity="0.6" />
          {/* Text lines */}
          <line x1="15" y1="16" x2="43" y2="16" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
          <line x1="15" y1="23" x2="40" y2="23" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
          <line x1="15" y1="30" x2="38" y2="30" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute top-[25%] right-[30%] animate-bounce-diagonal-2 opacity-14">
        <svg width="52" height="36" viewBox="0 0 52 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rounded rectangle bubble */}
          <rect x="5" y="5" width="42" height="26" rx="7" stroke="#7C3AED" strokeWidth="1.5" fill="none" />
          {/* Speech bubble tail */}
          <path d="M 40 31 L 45 38 L 35 31 Z" fill="#7C3AED" opacity="0.6" />
          {/* Text lines */}
          <line x1="12" y1="15" x2="35" y2="15" stroke="#7C3AED" strokeWidth="1" opacity="0.4" />
          <line x1="12" y1="22" x2="33" y2="22" stroke="#7C3AED" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute bottom-[18%] left-[30%] animate-bounce-horizontal-2 opacity-16">
        <svg width="48" height="34" viewBox="0 0 48 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rounded rectangle bubble */}
          <rect x="5" y="5" width="38" height="24" rx="6" stroke="#6D28D9" strokeWidth="1.5" fill="none" />
          {/* Speech bubble tail */}
          <path d="M 15 29 L 10 36 L 20 29 Z" fill="#6D28D9" opacity="0.6" />
          {/* Text lines */}
          <line x1="12" y1="14" x2="31" y2="14" stroke="#6D28D9" strokeWidth="1" opacity="0.4" />
          <line x1="12" y1="20" x2="29" y2="20" stroke="#6D28D9" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute top-[35%] right-[2%] animate-bounce-horizontal-1 opacity-13">
        <svg width="45" height="32" viewBox="0 0 45 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rounded rectangle bubble */}
          <rect x="5" y="5" width="35" height="22" rx="6" stroke="#8B5CF6" strokeWidth="1.5" fill="none" />
          {/* Speech bubble tail */}
          <path d="M 40 27 L 45 34 L 35 27 Z" fill="#8B5CF6" opacity="0.6" />
          {/* Text lines */}
          <line x1="12" y1="14" x2="28" y2="14" stroke="#8B5CF6" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute bottom-[25%] left-[2%] animate-bounce-diagonal-1 opacity-17">
        <svg width="55" height="38" viewBox="0 0 55 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rounded rectangle bubble */}
          <rect x="5" y="5" width="45" height="28" rx="7" stroke="#7C3AED" strokeWidth="1.5" fill="none" />
          {/* Speech bubble tail */}
          <path d="M 15 33 L 10 40 L 20 33 Z" fill="#7C3AED" opacity="0.6" />
          {/* Text lines */}
          <line x1="12" y1="15" x2="38" y2="15" stroke="#7C3AED" strokeWidth="1" opacity="0.4" />
          <line x1="12" y1="22" x2="35" y2="22" stroke="#7C3AED" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>

      {/* Additional floating elements to fill empty space - positioned to avoid center content */}
      {/* Top-left corner area */}
      <div className="absolute top-[3%] left-[8%] animate-bounce-horizontal-1 opacity-10">
        <svg width="20" height="35" viewBox="0 0 20 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="12" height="20" rx="6" stroke="#8B5CF6" strokeWidth="1" />
          <rect x="7" y="24" width="6" height="8" rx="1" stroke="#8B5CF6" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="absolute top-[10%] left-[15%] animate-bounce-diagonal-2 opacity-11">
        <svg width="42" height="28" viewBox="0 0 42 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="34" height="20" rx="5" stroke="#7C3AED" strokeWidth="1.2" fill="none" />
          <path d="M 12 24 L 8 28 L 16 24 Z" fill="#7C3AED" opacity="0.5" />
          <line x1="10" y1="12" x2="28" y2="12" stroke="#7C3AED" strokeWidth="0.8" opacity="0.3" />
        </svg>
      </div>

      {/* Top-right corner area */}
      <div className="absolute top-[4%] right-[8%] animate-bounce-horizontal-3 opacity-9">
        <svg width="18" height="32" viewBox="0 0 18 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="12" height="18" rx="6" stroke="#6D28D9" strokeWidth="1" />
          <rect x="6" y="21" width="6" height="8" rx="1" stroke="#6D28D9" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="absolute top-[14%] right-[15%] animate-bounce-diagonal-1 opacity-12">
        <svg width="38" height="26" viewBox="0 0 38 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="30" height="18" rx="4" stroke="#8B5CF6" strokeWidth="1.2" fill="none" />
          <path d="M 28 22 L 32 26 L 24 22 Z" fill="#8B5CF6" opacity="0.5" />
          <line x1="10" y1="11" x2="26" y2="11" stroke="#8B5CF6" strokeWidth="0.8" opacity="0.3" />
        </svg>
      </div>

      {/* Left middle area - avoiding center */}
      <div className="absolute top-[40%] left-[5%] animate-bounce-horizontal-2 opacity-13">
        <svg width="26" height="44" viewBox="0 0 26 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="18" height="28" rx="9" stroke="#7C3AED" strokeWidth="1.2" />
          <rect x="8" y="32" width="10" height="10" rx="1.5" stroke="#7C3AED" strokeWidth="0.8" />
          <line x1="6" y1="14" x2="20" y2="14" stroke="#7C3AED" strokeWidth="0.8" opacity="0.5" />
        </svg>
      </div>

      <div className="absolute top-[50%] left-[12%] animate-bounce-diagonal-1 opacity-14">
        <svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="40" height="24" rx="5" stroke="#6D28D9" strokeWidth="1.2" fill="none" />
          <path d="M 14 28 L 10 32 L 18 28 Z" fill="#6D28D9" opacity="0.5" />
          <line x1="10" y1="13" x2="34" y2="13" stroke="#6D28D9" strokeWidth="0.8" opacity="0.3" />
          <line x1="10" y1="19" x2="32" y2="19" stroke="#6D28D9" strokeWidth="0.8" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute top-[65%] left-[6%] animate-bounce-horizontal-3 opacity-11">
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="26" rx="9" stroke="#8B5CF6" strokeWidth="1.2" />
          <rect x="7" y="29" width="10" height="9" rx="1.5" stroke="#8B5CF6" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Right middle area - avoiding center */}
      <div className="absolute top-[45%] right-[5%] animate-bounce-horizontal-1 opacity-12">
        <svg width="30" height="46" viewBox="0 0 30 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="22" height="30" rx="11" stroke="#6D28D9" strokeWidth="1.2" />
          <rect x="9" y="34" width="12" height="10" rx="1.5" stroke="#6D28D9" strokeWidth="0.8" />
          <line x1="7" y1="15" x2="23" y2="15" stroke="#6D28D9" strokeWidth="0.8" opacity="0.5" />
        </svg>
      </div>

      <div className="absolute top-[55%] right-[12%] animate-bounce-diagonal-2 opacity-15">
        <svg width="44" height="30" viewBox="0 0 44 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="36" height="22" rx="5" stroke="#7C3AED" strokeWidth="1.2" fill="none" />
          <path d="M 32 26 L 36 30 L 28 26 Z" fill="#7C3AED" opacity="0.5" />
          <line x1="10" y1="13" x2="30" y2="13" stroke="#7C3AED" strokeWidth="0.8" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute top-[70%] right-[6%] animate-bounce-horizontal-2 opacity-10">
        <svg width="22" height="38" viewBox="0 0 22 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="16" height="24" rx="8" stroke="#8B5CF6" strokeWidth="1.2" />
          <rect x="7" y="27" width="8" height="9" rx="1.5" stroke="#8B5CF6" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Bottom-left corner area */}
      <div className="absolute bottom-[3%] left-[8%] animate-bounce-diagonal-1 opacity-11">
        <svg width="40" height="26" viewBox="0 0 40 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="32" height="18" rx="4" stroke="#7C3AED" strokeWidth="1.2" fill="none" />
          <path d="M 12 22 L 8 26 L 16 22 Z" fill="#7C3AED" opacity="0.5" />
          <line x1="10" y1="11" x2="28" y2="11" stroke="#7C3AED" strokeWidth="0.8" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute bottom-[10%] left-[15%] animate-bounce-horizontal-3 opacity-9">
        <svg width="20" height="33" viewBox="0 0 20 33" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="14" height="19" rx="7" stroke="#6D28D9" strokeWidth="1" />
          <rect x="6" y="22" width="8" height="9" rx="1" stroke="#6D28D9" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Bottom-right corner area */}
      <div className="absolute bottom-[4%] right-[8%] animate-bounce-horizontal-1 opacity-10">
        <svg width="36" height="24" viewBox="0 0 36 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="28" height="16" rx="4" stroke="#8B5CF6" strokeWidth="1.2" fill="none" />
          <path d="M 26 20 L 30 24 L 22 20 Z" fill="#8B5CF6" opacity="0.5" />
          <line x1="10" y1="11" x2="26" y2="11" stroke="#8B5CF6" strokeWidth="0.8" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute bottom-[12%] right-[15%] animate-bounce-diagonal-2 opacity-12">
        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="26" rx="9" stroke="#7C3AED" strokeWidth="1.2" />
          <rect x="7" y="29" width="10" height="9" rx="1.5" stroke="#7C3AED" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Top middle area - careful not to touch headline */}
      <div className="absolute top-[2%] left-[25%] animate-bounce-horizontal-2 opacity-8">
        <svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="10" height="16" rx="5" stroke="#6D28D9" strokeWidth="1" />
          <rect x="5" y="19" width="6" height="7" rx="1" stroke="#6D28D9" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="absolute top-[2%] right-[25%] animate-bounce-horizontal-3 opacity-9">
        <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="26" height="16" rx="4" stroke="#8B5CF6" strokeWidth="1.2" fill="none" />
          <path d="M 22 19 L 26 23 L 18 19 Z" fill="#8B5CF6" opacity="0.5" />
        </svg>
      </div>

      {/* Additional scattered elements for density */}
      <div className="absolute top-[32%] left-[20%] animate-bounce-diagonal-1 opacity-10">
        <svg width="28" height="42" viewBox="0 0 28 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="22" height="28" rx="11" stroke="#7C3AED" strokeWidth="1.2" />
          <rect x="8" y="31" width="12" height="9" rx="1.5" stroke="#7C3AED" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="absolute top-[38%] right-[20%] animate-bounce-horizontal-2 opacity-11">
        <svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="28" height="18" rx="4" stroke="#6D28D9" strokeWidth="1.2" fill="none" />
          <path d="M 24 21 L 28 25 L 20 21 Z" fill="#6D28D9" opacity="0.5" />
          <line x1="8" y1="11" x2="24" y2="11" stroke="#6D28D9" strokeWidth="0.8" opacity="0.3" />
        </svg>
      </div>

      <div className="absolute bottom-[30%] left-[20%] animate-bounce-horizontal-1 opacity-12">
        <svg width="30" height="44" viewBox="0 0 30 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="22" height="30" rx="11" stroke="#8B5CF6" strokeWidth="1.2" />
          <rect x="9" y="34" width="12" height="8" rx="1.5" stroke="#8B5CF6" strokeWidth="0.8" />
          <line x1="7" y1="16" x2="23" y2="16" stroke="#8B5CF6" strokeWidth="0.8" opacity="0.5" />
        </svg>
      </div>

      <div className="absolute bottom-[35%] right-[20%] animate-bounce-diagonal-2 opacity-13">
        <svg width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="4" width="32" height="20" rx="5" stroke="#7C3AED" strokeWidth="1.2" fill="none" />
          <path d="M 28 24 L 32 28 L 24 24 Z" fill="#7C3AED" opacity="0.5" />
          <line x1="10" y1="13" x2="28" y2="13" stroke="#7C3AED" strokeWidth="0.8" opacity="0.3" />
          <line x1="10" y1="18" x2="26" y2="18" stroke="#7C3AED" strokeWidth="0.8" opacity="0.3" />
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
function HeroSection({ onWaitlistClick }: { onWaitlistClick: () => void }) {
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
            <p className="text-xl md:text-2xl text-zinc-100 max-w-2xl mx-auto mb-3">
              Ranked debates with skill-based scoring. Challenge opponents, get evaluated on clarity and logic, and climb the leaderboard.
            </p>
            <p className="text-sm md:text-base text-zinc-300 max-w-2xl mx-auto mb-10">
              Unlike forums or comment sections, FORA is structured, ranked, and skill-based.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <button
                onClick={onWaitlistClick}
                className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors border border-violet-600 hover:border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-black"
              >
                Join Waitlist
              </button>
              <button
                onClick={() => setShowDemo(true)}
                className="px-8 py-3 border border-zinc-800 hover:border-zinc-700 text-white font-medium transition-colors bg-zinc-950 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-black"
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
              className="absolute top-4 right-4 text-zinc-200 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 rounded"
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
  const chips = ['Debate teams', 'Student orgs', 'Interview prep', 'Builders'];

  return (
    <section className="py-16 bg-zinc-950/80 backdrop-blur-sm border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Built for competitive thinkers.</h2>
        <p className="text-zinc-100 mb-8 max-w-2xl mx-auto">
          Students, debaters, founders, and anyone who likes winning with reasoning.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {chips.map((chip, idx) => (
            <div
              key={idx}
              className="px-4 py-2 border border-zinc-800 bg-black/50 rounded-sm"
            >
              <span className="text-zinc-200 text-sm">{chip}</span>
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
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>,
    <svg key="2" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>,
    <svg key="3" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
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
      title: 'Debate',
      description: 'Challenge a player or practice against AI. Choose your topic and make your case.',
    },
    {
      title: 'Get scored',
      description: 'Receive rubric-based evaluation across clarity, logic, evidence, and civility.',
    },
    {
      title: 'Climb ranks',
      description: 'Your rating adjusts with each debate. Compete for top spots on global and topic-based leaderboards.',
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
      description: 'Async turn-based debates. Challenge any player and compete on skill.',
      note: 'Async turn-based. No timers. No pressure.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: 'Practice Mode',
      description: 'AI opponents with adjustable difficulty. Sharpen your skills before competing.',
      note: 'Practice privately before playing ranked.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Leaderboards',
      description: 'Global and topic-based rankings. Track progress and compete for top spots.',
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
              <p className="text-zinc-100 mb-3">{mode.description}</p>
              {mode.note && (
                <div className="flex items-start gap-2 pt-3 border-t border-zinc-800">
                  <svg className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xs text-zinc-400">{mode.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Score Card Component
function ScoreCard({ label, value, color }: { label: string; value: number; color: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="group border border-zinc-800 bg-zinc-950 p-6 hover:border-violet-600/30 transition-all duration-300">
      {/* Dimension name */}
      <h3 className="text-sm font-medium text-zinc-300 mb-4 uppercase tracking-wide">
        {label}
      </h3>
      
      {/* Large percentage number */}
      <div className="mb-4">
        <span 
          className="text-5xl md:text-6xl font-bold transition-all duration-500"
          style={{
            color: color,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          {value}%
        </span>
      </div>
      
      {/* Progress indicator */}
      <div className="h-1.5 bg-zinc-900 border border-zinc-800 relative overflow-hidden">
        <div
          className="h-full transition-all duration-700 ease-out"
          style={{
            width: isVisible ? `${value}%` : '0%',
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}60`,
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Scoring System</h2>
        <p className="text-center text-zinc-100 mb-3 max-w-2xl mx-auto">
          Every debate is evaluated across four dimensions. Fair, transparent, and skill-based.
        </p>
        <div className="flex items-center justify-center gap-2 mb-12">
          <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-zinc-300">Fixed rubric. Same criteria for everyone.</p>
        </div>
        <div className="border border-zinc-800 bg-zinc-950 p-8 md:p-12">
          {/* Score Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
            {dimensions.map((dim, idx) => (
              <ScoreCard key={idx} label={dim.label} value={dim.value} color={dim.color} />
            ))}
          </div>

          {/* Civility message */}
          <div className="mt-6 pt-6 border-t border-zinc-800">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-violet-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-zinc-300">Civility is rewarded. Abuse is not tolerated.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Leaderboard Preview Section
function LeaderboardPreview() {
  const sampleData = [
    { rank: 1, username: 'Socrates', rating: 2450, winRate: '87%', debates: 142, topic: 'Ethics', streak: 'W5' },
    { rank: 2, username: 'AvaR', rating: 2380, winRate: '84%', debates: 156, topic: 'Politics', streak: 'W3' },
    { rank: 3, username: 'NYUDebate', rating: 2320, winRate: '81%', debates: 128, topic: 'Science', streak: 'W2' },
    { rank: 4, username: 'FounderDan', rating: 2280, winRate: '79%', debates: 134, topic: 'Technology', streak: 'W4' },
    { rank: 5, username: 'Plato', rating: 2240, winRate: '76%', debates: 119, topic: 'Philosophy', streak: 'W1' },
  ];

  return (
    <section id="leaderboard" className="py-24 bg-zinc-950/80 backdrop-blur-sm border-y border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Leaderboard</h2>
        <div className="flex items-center justify-center gap-2 mb-16">
          <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-zinc-300">Ranks update from scored debates only.</p>
        </div>
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
                    Topic
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-200 uppercase tracking-wider">
                    Win Rate
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-200 uppercase tracking-wider">
                    Streak
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
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-200">{row.topic}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-100">{row.winRate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-violet-400 font-medium">{row.streak}</td>
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
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-inset"
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

// Contact Modal Component
// Contact Modal Component (with message field)
function ContactModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Thank you! We\'ll be in touch soon.');
        setName('');
        setEmail('');
        setMessage('');
        // Auto-close after 2 seconds on success
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setStatusMessage('');
        }, 2000);
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('Failed to connect. Please try again later.');
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
          className="absolute top-4 right-4 text-zinc-200 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 rounded"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-2">Contact us</h2>
        <p className="text-zinc-300 mb-6">
          Get in touch with any questions or feedback.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-black border border-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            autoFocus
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-black border border-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message (optional)"
            rows={4}
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-black border border-zinc-800 text-white placeholder-zinc-400 focus:outline-none focus:border-zinc-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed resize-none"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-8 py-3 border border-zinc-800 hover:border-zinc-700 text-white font-medium transition-colors bg-zinc-950 hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            {status === 'loading' ? 'Sending...' : 'Send'}
          </button>
          {statusMessage && (
            <div
              className={`px-4 py-3 rounded-sm border ${
                status === 'success'
                  ? 'bg-zinc-800/50 border-zinc-700 text-zinc-200'
                  : 'bg-red-600/20 border-red-600 text-red-300'
              }`}
            >
              {statusMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// Waitlist Modal Component (name + email only, purple styling)
function WaitlistModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setStatusMessage('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setStatusMessage('Successfully joined the waitlist! We\'ll be in touch soon.');
        setName('');
        setEmail('');
        // Auto-close after 2 seconds on success
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setStatusMessage('');
        }, 2000);
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setStatusMessage('Failed to connect. Please try again later.');
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-zinc-900 border border-violet-600/30 p-8 max-w-md w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-200 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 rounded"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-3xl font-bold mb-2">Join Waitlist</h2>
        <p className="text-zinc-300 mb-6">
          Enter your name and email to join the waitlist.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-black border border-violet-600/30 text-white placeholder-zinc-400 focus:outline-none focus:border-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            autoFocus
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            disabled={status === 'loading'}
            className="w-full px-6 py-3 bg-black border border-violet-600/30 text-white placeholder-zinc-400 focus:outline-none focus:border-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors border border-violet-600 hover:border-violet-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
          >
            {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
          </button>
          {statusMessage && (
            <div
              className={`px-4 py-3 rounded-sm border ${
                status === 'success'
                  ? 'bg-violet-600/20 border-violet-600 text-violet-300'
                  : 'bg-red-600/20 border-red-600 text-red-300'
              }`}
            >
              {statusMessage}
            </div>
          )}
        </form>
      </div>
    </div>
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
                className="text-zinc-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-black rounded"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-zinc-300 hover:text-white transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-black rounded"
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

// Waitlist Section
function WaitlistSection({ onWaitlistClick }: { onWaitlistClick: () => void }) {
  return (
    <section id="waitlist" className="py-32 bg-zinc-950/80 backdrop-blur-sm border-y border-zinc-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">Get early access.</h2>
        <p className="text-xl text-zinc-100 mb-12">
          Join the waitlist. We'll onboard in waves.
        </p>
        <button
          onClick={onWaitlistClick}
          className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors border border-violet-600 hover:border-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-950"
        >
          Join Waitlist
        </button>
      </div>
    </section>
  );
}

// Main Page Component
export default function Page() {
  const [showContactModal, setShowContactModal] = useState(false);
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
    <div className="min-h-screen animated-gradient text-white" style={{ scrollBehavior: 'smooth' }}>
      <Navbar onContactClick={() => setShowContactModal(true)} />
      <HeroSection onWaitlistClick={() => setShowWaitlistModal(true)} />
      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
      <WaitlistModal isOpen={showWaitlistModal} onClose={() => setShowWaitlistModal(false)} />
      <SocialProof />
      <HowItWorks />
      <ModesSection />
      <ScoringSystem />
      <LeaderboardPreview />
      <FAQ />
      <WaitlistSection onWaitlistClick={() => setShowWaitlistModal(true)} />
      <Footer />
    </div>
  );
}
