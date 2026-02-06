'use client';

import { useState } from 'react';
import Link from 'next/link';

// Navbar Component
function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <Link href="/" className="text-white text-3xl lg:text-5xl font-bold tracking-tighter uppercase">
            FORA
          </Link>
          <div className="hidden md:flex items-center space-x-10 lg:space-x-12">
            <Link href="#features" className="text-zinc-400 hover:text-white transition-colors text-base lg:text-lg">
              Features
            </Link>
            <Link href="#modes" className="text-zinc-400 hover:text-white transition-colors text-base lg:text-lg">
              Modes
            </Link>
            <Link href="#scoring" className="text-zinc-400 hover:text-white transition-colors text-base lg:text-lg">
              Scoring
            </Link>
            <Link href="#leaderboard" className="text-zinc-400 hover:text-white transition-colors text-base lg:text-lg">
              Leaderboard
            </Link>
            <Link href="#faq" className="text-zinc-400 hover:text-white transition-colors text-base lg:text-lg">
              FAQ
            </Link>
            <Link
              href="#waitlist"
              className="px-6 py-3 lg:px-8 lg:py-3 bg-violet-600 hover:bg-violet-700 text-white text-base lg:text-lg font-medium transition-colors border border-violet-600 hover:border-violet-700"
            >
              Join Waitlist
            </Link>
          </div>
          <div className="md:hidden">
            <Link
              href="#waitlist"
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium transition-colors"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Hero Arena Visual Component
function HeroArena() {
  return (
    <div className="relative w-full h-64 md:h-96 flex items-center justify-center">
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="purpleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Central divider */}
        <line x1="200" y1="50" x2="200" y2="250" stroke="#8B5CF6" strokeWidth="2" opacity="0.4" />
        {/* Left panel */}
        <rect x="20" y="80" width="160" height="140" fill="none" stroke="#3F3F46" strokeWidth="1" />
        <rect x="30" y="90" width="140" height="120" fill="none" stroke="#27272A" strokeWidth="1" />
        {/* Right panel */}
        <rect x="220" y="80" width="160" height="140" fill="none" stroke="#3F3F46" strokeWidth="1" />
        <rect x="230" y="90" width="140" height="120" fill="none" stroke="#27272A" strokeWidth="1" />
        {/* Brackets */}
        <path d="M 20 80 L 10 80 L 10 220 L 20 220" stroke="#8B5CF6" strokeWidth="2" fill="none" opacity="0.6" />
        <path d="M 380 80 L 390 80 L 390 220 L 380 220" stroke="#8B5CF6" strokeWidth="2" fill="none" opacity="0.6" />
        {/* Glow effect */}
        <ellipse cx="200" cy="150" rx="180" ry="100" fill="url(#purpleGlow)" opacity="0.5" />
      </svg>
    </div>
  );
}

// Stat Pill Component
function StatPill({ label }: { label: string }) {
  return (
    <div className="px-4 py-2 border border-zinc-800 bg-zinc-950 rounded-sm">
      <span className="text-zinc-400 text-sm">{label}</span>
    </div>
  );
}

// Hero Section
function HeroSection() {
  const [showDemo, setShowDemo] = useState(false);

  return (
    <>
      <section className="relative bg-black text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Debate like a sport.
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10">
              Ranked AI debates, player challenges, and skill-based scoring. Compete, improve, and climb the leaderboards.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="#waitlist"
                className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors border border-violet-600 hover:border-violet-700"
              >
                Join Waitlist
              </Link>
              <button
                onClick={() => setShowDemo(true)}
                className="px-8 py-3 border border-zinc-800 hover:border-zinc-700 text-white font-medium transition-colors bg-zinc-950 hover:bg-zinc-900"
              >
                Watch Demo
              </button>
            </div>
            <HeroArena />
            <div className="flex flex-wrap items-center justify-center gap-4 mt-12">
              <StatPill label="AI Opponents" />
              <StatPill label="Turn-Based PvP" />
              <StatPill label="Ranked Scoring" />
            </div>
          </div>
        </div>
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
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="aspect-video bg-zinc-950 border border-zinc-800 flex items-center justify-center">
              <p className="text-zinc-500">Demo video placeholder</p>
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
    <section className="py-16 bg-zinc-950 border-y border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-zinc-500 text-sm mb-8">Built for thinkers, students, and competitors</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className="border border-zinc-800 bg-black p-6 flex items-center justify-center"
            >
              <span className="text-zinc-600 text-sm uppercase tracking-wide">{logo}</span>
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
      title: 'Upload prompt / choose topic',
      description: 'Select from curated debate topics or submit your own prompt to start a debate.',
    },
    {
      title: 'Debate AI or challenge another player',
      description: 'Engage in turn-based debates with AI opponents or challenge real players asynchronously.',
    },
    {
      title: 'Receive score + ranking',
      description: 'Get evaluated on clarity, logic, evidence, and civility. Climb the leaderboards.',
    },
  ];

  return (
    <section id="features" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="border border-zinc-800 bg-zinc-950 p-8">
              <StepIcon step={idx + 1} />
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-zinc-400">{step.description}</p>
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
      title: 'Debate AI',
      description: 'Uses Groq (llama-3.3-70b-versatile) with adjustable difficulty levels. Practice against increasingly challenging opponents.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
    {
      title: 'Challenge Players',
      description: 'Async, turn-based debates with real opponents. Take your time crafting responses and compete on skill.',
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
    <section id="modes" className="py-24 bg-zinc-950 border-y border-zinc-800">
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
              <p className="text-zinc-400">{mode.description}</p>
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
        <span className="text-sm text-zinc-400">{value}%</span>
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
    <section id="scoring" className="py-24 bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Scoring System</h2>
        <p className="text-center text-zinc-400 mb-12 max-w-2xl mx-auto">
          Every debate is evaluated across four dimensions. Fair, transparent, and skill-based.
        </p>
        <div className="border border-zinc-800 bg-zinc-950 p-8 md:p-12">
          {dimensions.map((dim, idx) => (
            <ScoringBar key={idx} label={dim.label} value={dim.value} color={dim.color} />
          ))}
          <div className="mt-8 pt-8 border-t border-zinc-800">
            <p className="text-sm text-zinc-500">
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
    <section id="leaderboard" className="py-24 bg-zinc-950 border-y border-zinc-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Leaderboard</h2>
        <div className="border border-zinc-800 bg-black overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800 bg-zinc-950">
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                    Win Rate
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
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
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-300">{row.rating}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-300">{row.winRate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-zinc-400">{row.debates}</td>
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
          className={`w-5 h-5 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 border-t border-zinc-800 text-zinc-400">{answer}</div>
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
      question: 'Can I debate topics I choose?',
      answer:
        'Yes. You can select from curated debate topics or submit your own prompt. Custom topics are subject to moderation to ensure quality and appropriateness.',
    },
    {
      question: 'How do player challenges work?',
      answer:
        'Challenges are asynchronous and turn-based. You can challenge any player, and they have a set time window to respond. Each participant takes turns crafting their arguments.',
    },
    {
      question: 'What AI models are used?',
      answer:
        'We use Groq with llama-3.3-70b-versatile for AI debates. Difficulty levels can be adjusted to match your skill level.',
    },
    {
      question: 'How are leaderboards calculated?',
      answer:
        'Leaderboards are based on your rating, which is calculated using an Elo-like system. Ratings adjust based on your performance against both AI and human opponents.',
    },
    {
      question: 'Is there a cost to use FORA?',
      answer:
        'FORA is currently in beta. Early access is free for waitlist members. Future pricing will be announced before launch.',
    },
  ];

  return (
    <section id="faq" className="py-24 bg-black">
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

// Waitlist Section
function WaitlistSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <section id="waitlist" className="py-32 bg-zinc-950 border-y border-zinc-800">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6">Join the Arena</h2>
        <p className="text-xl text-zinc-400 mb-12">
          Be among the first to compete. Join the waitlist for early access.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-6 py-3 bg-black border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-violet-600 transition-colors"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-violet-600 hover:bg-violet-700 text-white font-medium transition-colors border border-violet-600 hover:border-violet-700 whitespace-nowrap"
          >
            Join Waitlist
          </button>
        </form>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-xl font-bold tracking-tighter uppercase mb-2">FORA</h3>
            <p className="text-sm text-zinc-500">Competitive debate. Skill-based ranking.</p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-zinc-500 hover:text-white transition-colors text-sm"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-zinc-500 hover:text-white transition-colors text-sm"
            >
              Discord
            </a>
            <a
              href="#"
              className="text-zinc-500 hover:text-white transition-colors text-sm"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Page Component
export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
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
