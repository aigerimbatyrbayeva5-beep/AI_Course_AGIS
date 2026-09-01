import { useState, useEffect, useCallback, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'

// ── DATA ─────────────────────────────────────────────────────────────────────

interface Lesson {
  num: number
  title: string
  tool: string
}

interface Quarter {
  id: string
  number: number
  emoji: string
  title: string
  subtitle: string
  color: string
  colorLight: string
  tagline: string
  lessons: Lesson[]
}

const quarters: Quarter[] = [
  {
    id: 'q1',
    number: 1,
    emoji: '🧠',
    title: 'Learn Smarter with AI',
    subtitle: '14 Lessons',
    color: '#8B5CF6',
    colorLight: '#C4B5FD',
    tagline: 'Use AI tools to power up every subject you study',
    lessons: [
      { num: 1, title: 'AI Safety & Data Privacy', tool: 'Canva' },
      { num: 2, title: 'Fact-Checking Two AIs', tool: 'ChatGPT + Claude' },
      { num: 3, title: 'Smart Prompting for School', tool: 'Claude' },
      { num: 4, title: 'Personal Knowledge Base', tool: 'NotebookLM' },
      { num: 5, title: 'Searching Like a Pro', tool: 'Perplexity' },
      { num: 6, title: 'AI-Powered Writing Edits', tool: 'Claude' },
      { num: 7, title: 'Textbook → Podcast', tool: 'NotebookLM' },
      { num: 8, title: 'Auto-Generate Flashcards', tool: 'Quizlet' },
      { num: 9, title: 'Build a Full Presentation', tool: 'Gamma ✨' },
      { num: 10, title: 'Start Your Own AI Tutor', tool: 'Gemini Gems ✨' },
      { num: 11, title: "Build Your Tutor's Brain", tool: 'Gemini Gems' },
      { num: 12, title: 'Test & Fix Your Tutor', tool: 'Gemini Gems' },
      { num: 13, title: 'Polish Your Tutor Demo', tool: 'Gemini Gems' },
      { num: 14, title: '🏁 Checkpoint: Defend It!', tool: 'Gemini Gems' },
    ],
  },
  {
    id: 'q2',
    number: 2,
    emoji: '🎨',
    title: 'Make Cool Stuff with AI',
    subtitle: '16 Lessons',
    color: '#EC4899',
    colorLight: '#F9A8D4',
    tagline: 'Design characters, make films, compose music',
    lessons: [
      { num: 1, title: 'Design Your AI Avatar', tool: 'Ideogram ✨' },
      { num: 2, title: 'Photo → Video Magic', tool: 'Kling AI ✨' },
      { num: 3, title: 'Unique Character Look', tool: 'Ideogram' },
      { num: 4, title: 'Backstory & Personality', tool: 'ChatGPT' },
      { num: 5, title: 'Design an Ad Poster', tool: 'Canva' },
      { num: 6, title: '5-Minute AI Presentation', tool: 'Gamma' },
      { num: 7, title: 'Intro to AI Animation', tool: 'CapCut ✨' },
      { num: 8, title: 'Your First Animated Clip', tool: 'CapCut' },
      { num: 9, title: 'Short-Form Video Basics', tool: 'CapCut' },
      { num: 10, title: 'Edit with AI Tools', tool: 'CapCut' },
      { num: 11, title: 'Add an AI Voiceover', tool: 'Canva AI' },
      { num: 12, title: 'Compose Your AI Music', tool: 'Soundraw ✨' },
      { num: 13, title: 'Storyboard Your Film', tool: 'Canva' },
      { num: 14, title: 'Produce Your 2-Min Film', tool: 'CapCut' },
      { num: 15, title: 'Assemble Your Portfolio', tool: 'CapCut + Canva' },
      { num: 16, title: '🎬 Film Premiere!', tool: 'CapCut + Canva' },
    ],
  },
  {
    id: 'q3',
    number: 3,
    emoji: '💻',
    title: 'Vibecoding + GitHub',
    subtitle: '18 Lessons',
    color: '#06B6D4',
    colorLight: '#67E8F9',
    tagline: 'Describe an app, watch AI build it — then ship it',
    lessons: [
      { num: 1, title: 'What Is Vibecoding?', tool: 'Lovable ✨' },
      { num: 2, title: 'Design Your Concept', tool: 'Gamma' },
      { num: 3, title: 'Wireframe Your Idea', tool: 'Figma ✨' },
      { num: 4, title: 'GitHub: Why Creators Use It', tool: 'GitHub' },
      { num: 5, title: 'Your First Repository', tool: 'GitHub' },
      { num: 6, title: 'Build a Website with AI', tool: 'Framer AI ✨' },
      { num: 7, title: 'Publish + Write a README', tool: 'GitHub Pages' },
      { num: 8, title: 'Edit Code with AI Help', tool: 'Replit + Claude' },
      { num: 9, title: 'Add Buttons & Forms', tool: 'Framer AI' },
      { num: 10, title: 'Build a Mini Calculator', tool: 'Replit (JS)' },
      { num: 11, title: 'Build a Mini Game', tool: 'Replit (JS)' },
      { num: 12, title: 'AI-Assisted Debugging', tool: 'Replit + Claude' },
      { num: 13, title: 'Add Animations', tool: 'Replit (JS/CSS)' },
      { num: 14, title: 'Commit & Version Progress', tool: 'GitHub' },
      { num: 15, title: 'Choose Your Final Project', tool: 'Lovable / Replit' },
      { num: 16, title: 'Start Building It', tool: 'Lovable / Replit' },
      { num: 17, title: 'Refine Your Project', tool: 'Lovable / Replit' },
      { num: 18, title: '🏁 Progress Demo', tool: 'GitHub' },
    ],
  },
  {
    id: 'q4',
    number: 4,
    emoji: '🚀',
    title: 'Ship It',
    subtitle: '16 Lessons',
    color: '#10B981',
    colorLight: '#6EE7B7',
    tagline: 'Finish, publish, present, and celebrate your work',
    lessons: [
      { num: 1, title: 'Build an AI Chatbot', tool: 'Voiceflow ✨' },
      { num: 2, title: 'Add Bot Features', tool: 'Voiceflow' },
      { num: 3, title: 'Connect to Notion', tool: 'Notion' },
      { num: 4, title: 'Data Forms & Sheets', tool: 'Google Sheets' },
      { num: 5, title: 'Publish Your Final Project', tool: 'GitHub Pages' },
      { num: 6, title: 'Structure Your Pitch', tool: 'Gamma' },
      { num: 7, title: 'Rehearsal + Peer Feedback', tool: 'In-class' },
      { num: 8, title: '🎤 Final Presentations', tool: 'In-class' },
      { num: 9, title: 'Year in Review', tool: 'Canva' },
      { num: 10, title: 'Personal Portfolio Page', tool: 'GitHub Pages' },
      { num: 11, title: 'Bonus Creator Week', tool: "Student's Choice" },
      { num: 12, title: 'Continue Mini-Project', tool: "Student's Choice" },
      { num: 13, title: 'Showcase: Peer Voting', tool: 'Canva' },
      { num: 14, title: 'Polish for the Big Show', tool: 'Canva / GitHub Pages' },
      { num: 15, title: 'Quiz Prep', tool: 'Kahoot!' },
      { num: 16, title: '🏆 Final Showcase + Certs!', tool: 'Kahoot!' },
    ],
  },
]

interface Tool {
  name: string
  icon: string
  color: string
  desc: string
  category: 'Learn' | 'Create' | 'Code'
}

const tools: Tool[] = [
  { name: 'ChatGPT', icon: '💬', color: '#10B981', desc: 'The classic AI assistant', category: 'Learn' },
  { name: 'Claude', icon: '🧠', color: '#8B5CF6', desc: 'Expert reasoning & writing', category: 'Learn' },
  { name: 'NotebookLM', icon: '📚', color: '#3B82F6', desc: 'AI research companion', category: 'Learn' },
  { name: 'Perplexity', icon: '🔍', color: '#06B6D4', desc: 'AI-powered research search', category: 'Learn' },
  { name: 'Quizlet', icon: '🃏', color: '#F59E0B', desc: 'Auto-generate flashcards', category: 'Learn' },
  { name: 'Gemini Gems', icon: '💎', color: '#3B82F6', desc: 'Build custom AI personas', category: 'Learn' },
  { name: 'Canva', icon: '🎨', color: '#EC4899', desc: 'Design anything easily', category: 'Create' },
  { name: 'Ideogram', icon: '🖼️', color: '#6366F1', desc: 'AI image generation', category: 'Create' },
  { name: 'Kling AI', icon: '✨', color: '#F97316', desc: 'Photo-to-video magic', category: 'Create' },
  { name: 'CapCut', icon: '🎬', color: '#EF4444', desc: 'AI video editing', category: 'Create' },
  { name: 'Gamma', icon: '⚡', color: '#F59E0B', desc: 'AI-powered presentations', category: 'Create' },
  { name: 'Soundraw', icon: '🎵', color: '#10B981', desc: 'Compose original AI music', category: 'Create' },
  { name: 'GitHub', icon: '📦', color: '#9CA3AF', desc: 'Code versioning & hosting', category: 'Code' },
  { name: 'Lovable', icon: '🤖', color: '#F97316', desc: 'Describe → app in seconds', category: 'Code' },
  { name: 'Figma', icon: '✏️', color: '#06B6D4', desc: 'Wireframe like a pro', category: 'Code' },
  { name: 'Replit', icon: '💻', color: '#F59E0B', desc: 'Code & run in browser', category: 'Code' },
  { name: 'Framer AI', icon: '🌐', color: '#8B5CF6', desc: 'Build live websites with AI', category: 'Code' },
  { name: 'Voiceflow', icon: '🗣️', color: '#7C3AED', desc: 'Build AI chatbots visually', category: 'Code' },
]

interface Project {
  emoji: string
  title: string
  role: string
  quarterLabel: string
  quarterColor: string
  desc: string
  what: string
  steps: string[]
  tools: string[]
  image: string
}

const projects: Project[] = [
  {
    emoji: '🧠',
    title: 'Personal AI Tutor',
    role: 'AI Trainer',
    quarterLabel: 'Q1',
    quarterColor: '#8B5CF6',
    desc: 'A custom chatbot trained on your subject',
    what: 'Build a Gemini "Gem" that knows your topic inside out — then let classmates quiz it live at the checkpoint.',
    steps: [
      'Pick your subject: history, biology, maths…',
      'Give your Gem a name and a teaching personality',
      'Feed it notes, facts, and example questions',
      'Test it live — fix weak spots, then present it',
    ],
    tools: ['Gemini Gems'],
    image: 'https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=700&h=420&fit=crop&auto=format',
  },
  {
    emoji: '🖼️',
    title: 'Original AI Character',
    role: 'Character Designer',
    quarterLabel: 'Q2',
    quarterColor: '#EC4899',
    desc: 'A unique character with look, backstory, and animated video',
    what: 'Design a character nobody has ever seen before — then animate them with AI and give them a full personality.',
    steps: [
      'Describe your character in Ideogram — generate 4+ versions',
      'Pick the best look, refine the style',
      'Write their backstory and personality with ChatGPT',
      'Animate them using Kling AI photo-to-video',
    ],
    tools: ['Ideogram', 'Kling AI', 'ChatGPT'],
    image: 'https://images.unsplash.com/photo-1772371272141-0fbd644b65c4?w=700&h=420&fit=crop&auto=format',
  },
  {
    emoji: '🎬',
    title: '2-Minute Short Film',
    role: 'AI Filmmaker',
    quarterLabel: 'Q2',
    quarterColor: '#EC4899',
    desc: 'A fully produced film screened at the Quarter 2 premiere',
    what: 'Write, animate, score, and voice a complete 2-minute film — then screen it in front of the class.',
    steps: [
      'Script a 2-minute story with a clear beginning, middle, end',
      'Storyboard every scene in Canva',
      'Animate and edit in CapCut with AI tools',
      'Add AI voiceover + original Soundraw score, then premiere it',
    ],
    tools: ['CapCut', 'Soundraw', 'Canva AI'],
    image: 'https://images.unsplash.com/photo-1490810194309-344b3661ba39?w=700&h=420&fit=crop&auto=format',
  },
  {
    emoji: '🎵',
    title: 'Original Music Track',
    role: 'Music Producer',
    quarterLabel: 'Q2',
    quarterColor: '#EC4899',
    desc: 'A composed-from-scratch AI background score',
    what: "It's not a preset — it's a real original composition that matches your film's mood exactly.",
    steps: [
      'Choose the emotion: tense, happy, epic, mysterious…',
      'Set tempo, instruments, and duration in Soundraw',
      'Generate multiple variations and compare',
      'Export and drop it straight into your CapCut film',
    ],
    tools: ['Soundraw'],
    image: 'https://images.unsplash.com/photo-1565634915346-05e384b0c3ae?w=700&h=420&fit=crop&auto=format',
  },
  {
    emoji: '💻',
    title: 'Live Published Website',
    role: 'Vibecoder',
    quarterLabel: 'Q3',
    quarterColor: '#06B6D4',
    desc: 'A real site built by AI from your description',
    what: 'You type what you want. AI builds it in under a minute. You push it live — a real URL anyone on Earth can visit.',
    steps: [
      'Describe your site idea in plain English to Lovable',
      'Watch AI generate a full working site in seconds',
      'Customise the design, text, and layout',
      'Push to GitHub Pages — share the real live link',
    ],
    tools: ['Lovable', 'Framer AI', 'GitHub Pages'],
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=700&h=420&fit=crop&auto=format',
  },
  {
    emoji: '🎮',
    title: 'Playable Mini Game',
    role: 'Game Developer',
    quarterLabel: 'Q3',
    quarterColor: '#06B6D4',
    desc: 'A browser game classmates can actually play',
    what: 'You design it, AI helps you build it, and your classmates play it. Dodge, collect, quiz — any game mechanic you can imagine.',
    steps: [
      'Design the concept: goal, controls, win/lose condition',
      'Describe it to Claude in Replit — AI writes the first version',
      'Play it, break it, ask AI to fix the bugs',
      'Share the link — game on!',
    ],
    tools: ['Replit', 'Claude'],
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=700&h=420&fit=crop&auto=format',
  },
  {
    emoji: '🤖',
    title: 'AI Chatbot',
    role: 'Bot Builder',
    quarterLabel: 'Q4',
    quarterColor: '#10B981',
    desc: 'A visual chatbot that greets, answers, and responds',
    what: 'Build a full no-code conversation flow — greeting, FAQ answers, buttons, user input — all without writing a line of code.',
    steps: [
      'Map out your conversation flow on a Voiceflow canvas',
      'Add response blocks, buttons, and user input',
      'Test the flow — ask unexpected questions to find gaps',
      'Embed on your website or share the preview link',
    ],
    tools: ['Voiceflow'],
    image: 'https://images.unsplash.com/photo-1662974770404-468fd9660389?w=700&h=420&fit=crop&auto=format',
  },
  {
    emoji: '🗂️',
    title: 'Personal Portfolio',
    role: 'Creative Director',
    quarterLabel: 'Q4',
    quarterColor: '#10B981',
    desc: 'One page collecting every project from the year',
    what: 'By the end of the year you have 8 real projects. Your portfolio puts them all in one polished place anyone can visit.',
    steps: [
      'Set up a GitHub Pages site for your portfolio',
      'Embed or link your film, website, game, and chatbot',
      'Write a short bio and a description for each project',
      'Share the URL — it follows you forever',
    ],
    tools: ['GitHub Pages', 'Canva'],
    image: 'https://images.unsplash.com/photo-1723006694466-bebac409aa8d?w=700&h=420&fit=crop&auto=format',
  },
]

// ── SHARED ────────────────────────────────────────────────────────────────────

function Orb({
  x,
  y,
  size,
  color,
  delay,
  alt,
}: {
  x: string
  y: string
  size: number
  color: string
  delay: number
  alt?: boolean
}) {
  return (
    <div
      className={alt ? 'animate-float-alt' : 'animate-float'}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        background: color,
        borderRadius: '50%',
        filter: 'blur(80px)',
        opacity: 0.18,
        animationDelay: `${delay}s`,
        pointerEvents: 'none',
      }}
    />
  )
}

// ── SLIDES ────────────────────────────────────────────────────────────────────

function HeroSlide({ onNext }: { onNext: () => void }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let n = 0
    const id = setInterval(() => {
      n += 2
      setCount(n)
      if (n >= 64) clearInterval(id)
    }, 20)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-[#06060F]">
      <div className="bg-grid absolute inset-0" />
      <Orb x="-5%" y="10%" size={520} color="#7C3AED" delay={0} />
      <Orb x="55%" y="55%" size={600} color="#EC4899" delay={1.5} alt />
      <Orb x="75%" y="-5%" size={380} color="#06B6D4" delay={3} />
      <Orb x="20%" y="65%" size={420} color="#10B981" delay={0.8} alt />

      {/* Main content centred in remaining space */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-8">
        <div
          className="inline-flex items-center gap-2 mb-7 px-5 py-2 rounded-full border border-white/20 backdrop-blur-sm"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: '#10B981' }}
          />
          <span className="font-mono-code text-white/60 text-sm tracking-widest uppercase">
            Grade 7 · Full-Year Course
          </span>
        </div>

        <h1
          className="font-display font-black leading-none tracking-tighter mb-6"
          style={{
            fontSize: 'clamp(5rem, 12vw, 11rem)',
            background: 'linear-gradient(135deg, #C4B5FD 0%, #F9A8D4 45%, #67E8F9 85%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          AI CREATOR
        </h1>

        <p
          className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}
        >
          One year. Four missions. Master the AI tools that are reshaping every creative field.
        </p>

        <button
          onClick={onNext}
          className="font-display font-bold px-10 py-4 rounded-full text-lg transition-all duration-200 hover:scale-105 active:scale-95 inline-flex items-center gap-3"
          style={{ background: 'white', color: '#06060F' }}
        >
          Explore the Course
          <span className="animate-bounce-x">→</span>
        </button>
      </div>

      {/* Stats bar — always anchored at the bottom, never overlaps the button */}
      <div
        className="relative z-10 flex justify-center gap-12 pb-16 pt-5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {[
          { n: `${count}`, label: 'Lessons' },
          { n: '32', label: 'Weeks' },
          { n: '4', label: 'Quarters' },
          { n: '18+', label: 'AI Tools' },
        ].map(({ n, label }) => (
          <div key={label} className="text-center">
            <div
              className="font-display font-black"
              style={{ fontSize: '2.2rem', color: 'white' }}
            >
              {n}
            </div>
            <div
              className="font-mono-code uppercase tracking-widest"
              style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)' }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function OverviewSlide({ onNavigate }: { onNavigate: (n: number) => void }) {
  const colors = [
    'from-purple-600/20 to-purple-900/0',
    'from-pink-600/20 to-pink-900/0',
    'from-cyan-600/20 to-cyan-900/0',
    'from-emerald-600/20 to-emerald-900/0',
  ]

  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden bg-[#06060F] px-14">
      <div className="bg-grid absolute inset-0" />
      <Orb x="40%" y="30%" size={700} color="#1A1040" delay={0} />

      <div className="relative z-10">
        <p
          className="font-mono-code uppercase tracking-widest mb-3"
          style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}
        >
          Course Structure
        </p>
        <h2
          className="font-display font-black mb-10"
          style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'white' }}
        >
          One year.{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #C4B5FD, #F9A8D4)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Four missions.
          </span>
        </h2>

        <div className="grid grid-cols-4 gap-5 mb-10">
          {quarters.map((q, i) => (
            <button
              key={q.id}
              onClick={() => onNavigate(i + 3)}
              className={`group relative p-6 rounded-2xl text-left transition-all duration-300 hover:scale-[1.03] overflow-hidden`}
              style={{
                border: `1px solid ${q.color}33`,
                background: 'rgba(255,255,255,0.04)',
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(ellipse at 0% 0%, ${q.color}22, transparent 70%)` }}
              />
              <div className="text-4xl mb-4">{q.emoji}</div>
              <div
                className="font-mono-code uppercase tracking-widest mb-1"
                style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)' }}
              >
                Quarter {q.number}
              </div>
              <div
                className="font-display font-bold mb-2 leading-tight"
                style={{ fontSize: '1.05rem', color: 'white' }}
              >
                {q.title}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', marginBottom: '1rem' }}>
                {q.tagline}
              </p>
              <div
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono-code font-semibold"
                style={{
                  fontSize: '0.7rem',
                  background: `${q.color}18`,
                  color: q.colorLight,
                  border: `1px solid ${q.color}30`,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: q.color }}
                />
                {q.subtitle}
              </div>
              <div
                className="absolute top-5 right-5 transition-all duration-300 group-hover:translate-x-1"
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                →
              </div>
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors[i]} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-8">
          {[
            { n: '64', label: 'Total Lessons', color: '#C4B5FD' },
            { n: '2×/week', label: 'Schedule', color: '#F9A8D4' },
            { n: '40 min', label: 'Per Lesson', color: '#67E8F9' },
            { n: '18+', label: 'AI Tools', color: '#6EE7B7' },
            { n: '100%', label: 'Free Tools', color: '#FCD34D' },
          ].map(({ n, label, color }) => (
            <div key={label} className="flex items-center gap-3">
              <span
                className="font-display font-black"
                style={{ fontSize: '1.6rem', color }}
              >
                {n}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>{label}</span>
              {label !== 'Free Tools' && (
                <span style={{ color: 'rgba(255,255,255,0.1)', marginLeft: '0.5rem' }}>·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function QuarterSlide({ quarter }: { quarter: Quarter }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const listRef = useRef<HTMLDivElement>(null)

  const highlightColors: Record<string, string> = {
    '#8B5CF6': '#2D1B69',
    '#EC4899': '#6B1248',
    '#06B6D4': '#0A3D4A',
    '#10B981': '#0A3D29',
  }

  const bgHighlight = highlightColors[quarter.color] ?? '#1A1A2E'

  return (
    <div className="relative w-full h-full flex overflow-hidden bg-[#06060F]">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at -10% 50%, ${quarter.color}1A, transparent 55%)`,
        }}
      />
      <div className="bg-grid absolute inset-0" />

      {/* Left panel */}
      <div
        className="relative z-10 flex flex-col justify-center px-14 py-12"
        style={{ width: '38%', borderRight: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="text-6xl mb-5">{quarter.emoji}</div>
        <div
          className="font-mono-code uppercase tracking-widest mb-3"
          style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)' }}
        >
          Quarter {quarter.number} of 4
        </div>
        <h2
          className="font-display font-black leading-tight mb-3"
          style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', color: 'white' }}
        >
          {quarter.title}
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.55)', marginBottom: '1.5rem' }}>
          {quarter.tagline}
        </p>

        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono-code font-semibold w-fit mb-8"
          style={{
            fontSize: '0.75rem',
            background: `${quarter.color}18`,
            color: quarter.colorLight,
            border: `1px solid ${quarter.color}35`,
          }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: quarter.color }} />
          {quarter.subtitle}
        </div>

        <div className="space-y-3">
          <p
            className="font-mono-code uppercase tracking-widest"
            style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)' }}
          >
            By the end of this quarter
          </p>
          {[
            'Build real projects with cutting-edge AI tools',
            'Work with tools used by working professionals',
            'Showcase your work at the quarter checkpoint',
          ].map((text) => (
            <div key={text} className="flex items-start gap-2">
              <span style={{ color: quarter.colorLight, marginTop: '2px', fontSize: '0.9rem' }}>✓</span>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — lessons */}
      <div className="relative z-10 flex flex-col py-10 pr-10 pl-8" style={{ flex: 1 }}>
        <p
          className="font-mono-code uppercase tracking-widest mb-4 px-3"
          style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)' }}
        >
          Lesson by Lesson · {quarter.subtitle}
        </p>

        <div ref={listRef} className="flex-1 overflow-y-auto scrollbar-hide space-y-0.5 pr-1">
          {quarter.lessons.map((lesson) => {
            const isHovered = hovered === lesson.num
            return (
              <div
                key={lesson.num}
                onMouseEnter={() => setHovered(lesson.num)}
                onMouseLeave={() => setHovered(null)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-default transition-all duration-150"
                style={{
                  background: isHovered ? bgHighlight : 'transparent',
                }}
              >
                <span
                  className="w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center font-mono-code font-bold transition-all duration-150"
                  style={{
                    fontSize: '0.7rem',
                    background: isHovered ? quarter.color : `${quarter.color}20`,
                    color: isHovered ? '#fff' : quarter.colorLight,
                  }}
                >
                  {lesson.num}
                </span>
                <span
                  className="flex-1 transition-colors duration-150"
                  style={{
                    fontSize: '0.875rem',
                    color: isHovered ? 'white' : 'rgba(255,255,255,0.72)',
                  }}
                >
                  {lesson.title}
                </span>
                <span
                  className="flex-shrink-0 px-2 py-0.5 rounded font-mono-code transition-all duration-150"
                  style={{
                    fontSize: '0.65rem',
                    background: isHovered ? `${quarter.color}25` : `${quarter.color}10`,
                    color: isHovered ? quarter.colorLight : `${quarter.colorLight}60`,
                  }}
                >
                  {lesson.tool}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const c = project.quarterColor

  return (
    <div
      className="animate-backdrop-in fixed inset-0 z-[200] flex items-center justify-center p-8"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="animate-modal-in relative rounded-3xl overflow-hidden flex"
        style={{
          width: '860px',
          maxHeight: '82vh',
          background: '#0D0D1E',
          border: `1px solid ${c}33`,
          boxShadow: `0 0 80px ${c}22`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left — image + role badge */}
        <div className="relative flex-shrink-0" style={{ width: '340px' }}>
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ background: '#1A1A2E' }}
          />
          {/* gradient overlay */}
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to right, transparent 60%, #0D0D1E)` }}
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${c}55 0%, transparent 50%)` }}
          />
          {/* role badge */}
          <div className="absolute bottom-4 left-4">
            <div
              className="font-mono-code font-semibold px-3 py-1.5 rounded-full"
              style={{
                fontSize: '0.7rem',
                background: c,
                color: 'white',
                letterSpacing: '0.05em',
              }}
            >
              {project.role}
            </div>
          </div>
          {/* quarter badge */}
          <div className="absolute top-4 left-4">
            <div
              className="font-mono-code font-semibold px-2.5 py-1 rounded-full"
              style={{
                fontSize: '0.6rem',
                background: 'rgba(0,0,0,0.6)',
                color: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {project.quarterLabel}
            </div>
          </div>
        </div>

        {/* Right — content */}
        <div className="flex flex-col p-8 overflow-y-auto scrollbar-hide" style={{ flex: 1 }}>
          <div className="flex items-start gap-3 mb-4">
            <span style={{ fontSize: '2rem' }}>{project.emoji}</span>
            <div>
              <h3
                className="font-display font-black leading-tight"
                style={{ fontSize: '1.6rem', color: 'white' }}
              >
                {project.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>
                {project.desc}
              </p>
            </div>
          </div>

          <p
            style={{
              fontSize: '0.92rem',
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.65,
              marginBottom: '1.5rem',
              paddingBottom: '1.5rem',
              borderBottom: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {project.what}
          </p>

          <p
            className="font-mono-code uppercase tracking-widest mb-3"
            style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.35)' }}
          >
            How you build it — step by step
          </p>

          <div className="space-y-2.5 mb-6">
            {project.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono-code font-bold"
                  style={{ fontSize: '0.65rem', background: `${c}25`, color: c, marginTop: '1px' }}
                >
                  {i + 1}
                </div>
                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.5 }}>
                  {step}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-auto">
            <p
              className="font-mono-code uppercase tracking-widest mb-2"
              style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)' }}
            >
              Tools used
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((t) => (
                <span
                  key={t}
                  className="font-mono-code px-3 py-1 rounded-full"
                  style={{
                    fontSize: '0.72rem',
                    background: `${c}20`,
                    color: c,
                    border: `1px solid ${c}35`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)' }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}

function ProjectsSlide({ onOpen }: { onOpen: (p: Project) => void }) {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden bg-[#06060F] px-14">
      <div className="bg-grid absolute inset-0" />
      <Orb x="50%" y="40%" size={700} color="#110D2A" delay={0} />

      <div className="relative z-10">
        <p
          className="font-mono-code uppercase tracking-widest mb-3"
          style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}
        >
          What You Will Build
        </p>
        <h2
          className="font-display font-black mb-7"
          style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3rem)', color: 'white' }}
        >
          Real projects.{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #F9A8D4, #FCD34D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Real pride.
          </span>
        </h2>

        <div className="grid grid-cols-4 gap-4">
          {projects.map((p, i) => {
            const isHov = hovered === i
            return (
              <button
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => onOpen(p)}
                className="relative rounded-2xl overflow-hidden text-left transition-all duration-300 focus:outline-none group"
                style={{
                  border: `1px solid ${p.quarterColor}${isHov ? '55' : '25'}`,
                  background: isHov ? `${p.quarterColor}18` : 'rgba(255,255,255,0.04)',
                  transform: isHov ? 'scale(1.04)' : 'scale(1)',
                  minHeight: '168px',
                  cursor: 'pointer',
                }}
              >
                {/* thumbnail strip */}
                <div
                  className="w-full overflow-hidden transition-all duration-300"
                  style={{ height: isHov ? '72px' : '0px', opacity: isHov ? 1 : 0 }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    style={{ background: '#1A1A2E' }}
                  />
                </div>

                <div className="p-4 flex flex-col h-full">
                  <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>{p.emoji}</div>
                  <div
                    className="font-display font-bold leading-tight mb-1"
                    style={{ fontSize: '0.92rem', color: 'white' }}
                  >
                    {p.title}
                  </div>
                  <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.45)', flex: 1, lineHeight: 1.4 }}>
                    {p.desc}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-mono-code font-semibold"
                      style={{
                        fontSize: '0.58rem',
                        background: `${p.quarterColor}20`,
                        color: p.quarterColor,
                        border: `1px solid ${p.quarterColor}35`,
                      }}
                    >
                      {p.quarterLabel} · {p.role}
                    </div>
                    <span
                      className="font-mono-code transition-all duration-200"
                      style={{
                        fontSize: '0.65rem',
                        color: isHov ? p.quarterColor : 'rgba(255,255,255,0.2)',
                      }}
                    >
                      Tap →
                    </span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <p
          className="mt-4 font-mono-code"
          style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)' }}
        >
          ✦ Click any project to see what students actually build · All projects are completed during class time
        </p>
      </div>
    </div>
  )
}

function ToolsSlide() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [filter, setFilter] = useState<'All' | 'Learn' | 'Create' | 'Code'>('All')

  const filtered = filter === 'All' ? tools : tools.filter((t) => t.category === filter)

  const filterColors = {
    All: { bg: 'white', text: '#06060F' },
    Learn: { bg: '#8B5CF6', text: 'white' },
    Create: { bg: '#EC4899', text: 'white' },
    Code: { bg: '#06B6D4', text: 'white' },
  }

  return (
    <div className="relative w-full h-full flex flex-col justify-center overflow-hidden bg-[#06060F] px-14">
      <div className="bg-grid absolute inset-0" />
      <Orb x="50%" y="-10%" size={600} color="#0D0D30" delay={0} />

      <div className="relative z-10">
        <p
          className="font-mono-code uppercase tracking-widest mb-3"
          style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}
        >
          The Toolkit
        </p>
        <div className="flex items-end justify-between mb-6">
          <h2
            className="font-display font-black"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'white' }}
          >
            <span
              style={{
                background: 'linear-gradient(90deg, #67E8F9, #6EE7B7)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              18+
            </span>{' '}
            cutting-edge AI tools
          </h2>

          <div className="flex gap-2">
            {(['All', 'Learn', 'Create', 'Code'] as const).map((f) => {
              const active = filter === f
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-4 py-1.5 rounded-full font-mono-code font-semibold transition-all duration-200 hover:scale-105"
                  style={{
                    fontSize: '0.72rem',
                    background: active ? filterColors[f].bg : 'rgba(255,255,255,0.07)',
                    color: active ? filterColors[f].text : 'rgba(255,255,255,0.5)',
                    border: active ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  }}
                >
                  {f}
                </button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-9 gap-2.5" style={{ minHeight: 200 }}>
          {filtered.map((tool) => {
            const isHov = hovered === tool.name
            return (
              <button
                key={tool.name}
                onMouseEnter={() => setHovered(tool.name)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 hover:scale-105 text-center"
                style={{
                  border: `1px solid ${isHov ? tool.color + '55' : 'rgba(255,255,255,0.08)'}`,
                  background: isHov ? `${tool.color}18` : 'rgba(255,255,255,0.04)',
                }}
              >
                <div style={{ fontSize: '1.6rem' }}>{tool.icon}</div>
                <div
                  className="font-display font-semibold leading-tight"
                  style={{ fontSize: '0.72rem', color: isHov ? 'white' : 'rgba(255,255,255,0.75)' }}
                >
                  {tool.name}
                </div>
                {isHov && (
                  <div
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg text-white whitespace-nowrap z-20 pointer-events-none"
                    style={{ fontSize: '0.7rem', background: tool.color }}
                  >
                    {tool.desc}
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2"
                      style={{
                        borderLeft: '5px solid transparent',
                        borderRight: '5px solid transparent',
                        borderTop: `5px solid ${tool.color}`,
                      }}
                    />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <p
          className="mt-5 font-mono-code"
          style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}
        >
          ✦ All tools are free or have free tiers · No installation required · Works in any browser
        </p>
      </div>
    </div>
  )
}

function QRSlide() {
  const brochureUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${window.location.pathname}?brochure=true`
      : 'https://example.com?brochure=true'

  return (
    <div className="relative w-full h-full flex overflow-hidden bg-[#06060F]">
      <div className="bg-grid absolute inset-0" />
      <Orb x="-10%" y="40%" size={600} color="#7C3AED" delay={0} />
      <Orb x="45%" y="60%" size={450} color="#EC4899" delay={1.5} alt />
      <Orb x="85%" y="20%" size={380} color="#06B6D4" delay={3} />

      {/* Left side */}
      <div className="relative z-10 flex flex-col justify-center px-16" style={{ width: '50%' }}>
        <p
          className="font-mono-code uppercase tracking-widest mb-4"
          style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' }}
        >
          Take it with you
        </p>
        <h2
          className="font-display font-black leading-tight mb-4"
          style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', color: 'white' }}
        >
          Scan for your
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #C4B5FD, #67E8F9)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            digital brochure
          </span>
        </h2>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.55)', maxWidth: '420px', marginBottom: '2rem' }}>
          Get the full course details, every lesson, tools list, and schedule — right on your phone.
        </p>

        <div className="space-y-4">
          {[
            { emoji: '📋', text: 'Lesson-by-lesson breakdown for all 4 quarters' },
            { emoji: '🛠️', text: 'Complete tools list with what each one does' },
            { emoji: '🗓️', text: 'Course schedule: 2 lessons/week, 40 min each' },
            { emoji: '🎯', text: 'Learning outcomes and final project ideas' },
          ].map(({ emoji, text }) => (
            <div key={text} className="flex items-center gap-3">
              <span style={{ fontSize: '1.2rem' }}>{emoji}</span>
              <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.65)' }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right side — QR */}
      <div
        className="relative z-10 flex flex-col items-center justify-center"
        style={{ width: '50%' }}
      >
        <div className="relative">
          <div
            className="animate-pulse-ring-slow absolute rounded-3xl pointer-events-none"
            style={{ inset: -24, border: '1.5px solid rgba(255,255,255,0.15)' }}
          />
          <div
            className="animate-pulse-ring absolute rounded-3xl pointer-events-none"
            style={{ inset: -48, border: '1px solid rgba(255,255,255,0.07)' }}
          />

          <div
            className="p-6 rounded-2xl shadow-2xl"
            style={{ background: 'white', boxShadow: '0 0 80px rgba(139,92,246,0.3)' }}
          >
            <QRCodeSVG
              value={brochureUrl}
              size={256}
              bgColor="#ffffff"
              fgColor="#06060F"
              level="H"
              includeMargin={false}
            />
          </div>
        </div>

        <div className="mt-6 text-center">
          <p
            className="font-display font-semibold"
            style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '4px' }}
          >
            Point your phone camera at the code
          </p>
          <p className="font-mono-code" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>
            iOS Camera · Android Camera · Any QR scanner app
          </p>
        </div>
      </div>
    </div>
  )
}

// ── BROCHURE VIEW ─────────────────────────────────────────────────────────────

function BrochureView() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(135deg, #3B1FA8 0%, #6D28D9 50%, #1E3A8A 100%)',
          padding: '2.5rem 1.5rem',
          color: 'white',
        }}
      >
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3"
            style={{ background: 'rgba(255,255,255,0.15)', fontSize: '0.7rem' }}
          >
            <span className="font-mono-code uppercase tracking-widest" style={{ color: '#C4B5FD' }}>
              Grade 7 · Full-Year Course
            </span>
          </div>
          <h1
            className="font-display font-black mb-2"
            style={{ fontSize: '2.5rem', letterSpacing: '-0.03em' }}
          >
            AI Creator
          </h1>
          <p style={{ color: '#C4B5FD', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
            Master AI tools, create real projects, and build your future.
          </p>
          <div className="flex gap-8">
            {[
              { n: '64', l: 'Lessons' },
              { n: '32', l: 'Weeks' },
              { n: '2×/wk', l: 'Schedule' },
              { n: '18+', l: 'AI Tools' },
            ].map(({ n, l }) => (
              <div key={l}>
                <div className="font-display font-black" style={{ fontSize: '1.7rem' }}>
                  {n}
                </div>
                <div style={{ color: '#A78BFA', fontSize: '0.7rem' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quarters */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '1.5rem' }}>
        <h2
          className="font-display font-bold mb-4"
          style={{ fontSize: '1rem', color: '#111', letterSpacing: '-0.01em' }}
        >
          Four Quarters, One Year
        </h2>

        <div className="space-y-4">
          {quarters.map((q) => (
            <div
              key={q.id}
              className="rounded-2xl overflow-hidden"
              style={{ border: `1.5px solid ${q.color}33` }}
            >
              <div
                className="flex items-center gap-3 px-4 py-3"
                style={{ background: `${q.color}12` }}
              >
                <span style={{ fontSize: '1.5rem' }}>{q.emoji}</span>
                <div>
                  <div
                    className="font-mono-code uppercase tracking-widest"
                    style={{ fontSize: '0.6rem', color: 'rgba(0,0,0,0.4)' }}
                  >
                    Quarter {q.number} · {q.subtitle}
                  </div>
                  <div className="font-display font-bold" style={{ color: '#111' }}>
                    {q.title}
                  </div>
                </div>
              </div>
              <div className="px-4 py-3">
                <p style={{ fontSize: '0.82rem', color: '#555', marginBottom: '0.75rem' }}>
                  {q.tagline}
                </p>
                <div className="space-y-1">
                  {q.lessons.slice(0, 5).map((l) => (
                    <div key={l.num} className="flex gap-2">
                      <span
                        className="font-mono-code flex-shrink-0"
                        style={{ fontSize: '0.72rem', color: q.color, width: '18px', textAlign: 'right' }}
                      >
                        {l.num}.
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#444' }}>{l.title}</span>
                      <span
                        className="ml-auto flex-shrink-0 font-mono-code"
                        style={{ fontSize: '0.65rem', color: '#999' }}
                      >
                        {l.tool}
                      </span>
                    </div>
                  ))}
                  {q.lessons.length > 5 && (
                    <p
                      className="font-mono-code"
                      style={{ fontSize: '0.7rem', color: '#aaa', paddingLeft: '22px' }}
                    >
                      +{q.lessons.length - 5} more lessons...
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tools */}
        <h2
          className="font-display font-bold mt-6 mb-3"
          style={{ fontSize: '1rem', color: '#111' }}
        >
          Tools You Will Use
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {tools.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-2 p-2.5 rounded-xl"
              style={{ border: '1px solid #eee', background: '#fafafa' }}
            >
              <span style={{ fontSize: '1.2rem' }}>{t.icon}</span>
              <div>
                <div className="font-display font-semibold" style={{ fontSize: '0.78rem', color: '#222' }}>
                  {t.name}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#999' }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-6 p-4 rounded-2xl text-center"
          style={{ background: '#F5F3FF', border: '1px solid #DDD6FE' }}
        >
          <p className="font-display font-bold mb-1" style={{ color: '#6D28D9' }}>
            100% Free Tools · No Installation · Any Browser
          </p>
          <p style={{ fontSize: '0.8rem', color: '#7C3AED' }}>
            Every tool in this course is free or has a solid free tier, and works right in your browser.
          </p>
        </div>

        <p
          className="text-center font-mono-code mt-4"
          style={{ fontSize: '0.65rem', color: '#ccc' }}
        >
          AI Creator · Grade 7 Full-Year Course · 64 Lessons · 32 Weeks
        </p>
      </div>
    </div>
  )
}

// ── SLIDESHOW ─────────────────────────────────────────────────────────────────

const SLIDE_COUNT = 9

const SLIDE_LABELS = [
  'Intro',
  'Overview',
  'Projects',
  'Q1: Learn',
  'Q2: Create',
  'Q3: Code',
  'Q4: Ship',
  'Tools',
  'Brochure',
]

function Slideshow() {
  const [slide, setSlide] = useState(0)
  const [openProject, setOpenProject] = useState<Project | null>(null)

  const goTo = useCallback(
    (n: number) => setSlide(Math.max(0, Math.min(SLIDE_COUNT - 1, n))),
    [],
  )
  const prev = useCallback(() => setSlide((s) => Math.max(0, s - 1)), [])
  const next = useCallback(() => setSlide((s) => Math.min(SLIDE_COUNT - 1, s + 1)), [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (openProject) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        prev()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [prev, next, openProject])

  const slides = [
    <HeroSlide onNext={next} />,
    <OverviewSlide onNavigate={goTo} />,
    <ProjectsSlide onOpen={setOpenProject} />,
    <QuarterSlide quarter={quarters[0]} />,
    <QuarterSlide quarter={quarters[1]} />,
    <QuarterSlide quarter={quarters[2]} />,
    <QuarterSlide quarter={quarters[3]} />,
    <ToolsSlide />,
    <QRSlide />,
  ]

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ background: '#06060F' }}>
      {slides.map((component, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-all"
          style={{
            transitionDuration: '480ms',
            transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
            opacity: i === slide ? 1 : 0,
            transform: i === slide ? 'translateY(0)' : 'translateY(28px)',
            pointerEvents: i === slide ? 'all' : 'none',
          }}
        >
          {component}
        </div>
      ))}

      {/* Nav dots */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50"
        style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', borderRadius: '999px', padding: '6px 12px' }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            title={SLIDE_LABELS[i]}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === slide ? 28 : 8,
              height: 8,
              background: i === slide ? 'white' : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div
        className="absolute top-5 right-6 z-50 font-mono-code"
        style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)' }}
      >
        {slide + 1} / {SLIDE_COUNT}
      </div>

      {/* Slide label */}
      <div
        className="absolute top-5 left-6 z-50 font-mono-code uppercase tracking-widest"
        style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)' }}
      >
        {SLIDE_LABELS[slide]}
      </div>

      {/* Arrow nav */}
      {slide > 0 && (
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
          style={{
            width: 44,
            height: 44,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.4rem',
          }}
        >
          ‹
        </button>
      )}
      {slide < SLIDE_COUNT - 1 && (
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
          style={{
            width: 44,
            height: 44,
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.7)',
            fontSize: '1.4rem',
          }}
        >
          ›
        </button>
      )}

      {/* Project modal — rendered here so it sits above the slide transforms */}
      {openProject && (
        <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </div>
  )
}

// ── APP ───────────────────────────────────────────────────────────────────────

export default function App() {
  const isBrochure =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('brochure') === 'true'

  if (isBrochure) return <BrochureView />
  return <Slideshow />
}
