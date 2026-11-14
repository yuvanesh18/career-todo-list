import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Circle,
  Lightbulb,
  StickyNote,
  ListChecks,
  Copy,
  Check,
  Flame,
  Edit3,
  BrainCircuit,
  Code2,
  Sparkles,
  BookOpen,
  Save,
  Target,
  Layers,
  Settings,
  ShieldCheck,
  Cpu,
  ChevronRight,
  Info
} from 'lucide-react';
import { Task } from '../types';
import { getStudyGuideForTask, AWSStudyTopic } from '../data/awsStudyGuide';

interface StudyNotepadDrawerProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleTask: (taskId: string) => void;
}

type TabSection = 
  | 'all' 
  | 'objectives' 
  | 'what-is-this' 
  | 'how-it-works' 
  | 'diagram' 
  | 'tradeoffs' 
  | 'hacker-notes' 
  | 'code' 
  | 'resources' 
  | 'my-notes';

export const StudyNotepadDrawer: React.FC<StudyNotepadDrawerProps> = ({
  task,
  isOpen,
  onClose,
  onToggleTask
}) => {
  const [copiedDiagram, setCopiedDiagram] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [personalNote, setPersonalNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<TabSection>('all');

  // Load saved personal note from localStorage when task changes
  useEffect(() => {
    if (task) {
      const saved = localStorage.getItem(`career_pulse_user_note_${task.id}`);
      setPersonalNote(saved || '');
      setIsSaved(false);
      setActiveSection('all');
    }
  }, [task?.id]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  const studyGuide: AWSStudyTopic | null = getStudyGuideForTask(task.id);
  const isAwsTask = 
    Boolean(studyGuide) ||
    task.id.startsWith('mla-') || 
    task.id.startsWith('svc-') || 
    Boolean(task.goalId?.toLowerCase().includes('aws')) || 
    Boolean(task.topic?.toLowerCase().includes('aws')) || 
    Boolean(task.topic?.toLowerCase().includes('domain')) || 
    Boolean(task.url?.includes('amazon.com')) || 
    Boolean(task.url?.includes('aws.amazon.com'));

  const docButtonLabel = isAwsTask
    ? 'Official AWS Documentation'
    : (task.url?.includes('leetcode.com') ? 'LeetCode Problem' : 'Official Reference');

  const handleSaveNote = () => {
    localStorage.setItem(`career_pulse_user_note_${task.id}`, personalNote);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleCopyText = (text: string, type: 'diagram' | 'code') => {
    navigator.clipboard.writeText(text);
    if (type === 'diagram') {
      setCopiedDiagram(true);
      setTimeout(() => setCopiedDiagram(false), 2000);
    } else {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <aside className="w-screen max-w-2xl bg-white shadow-2xl border-l border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out animate-in slide-in-from-right duration-300">
          
          {/* 1. Header with Metadata & Controls */}
          <header className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-b from-slate-50/90 to-white sticky top-0 z-10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                {studyGuide && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" />
                    {studyGuide.skillNumber === 'SVC' ? 'AWS In-Scope Service' : `Skill ${studyGuide.skillNumber}`}
                  </span>
                )}
                {task.isImportant && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                    <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    High-Yield
                  </span>
                )}
                {task.difficulty && (
                  <span
                    className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                      task.difficulty === 'Easy'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : task.difficulty === 'Medium'
                        ? 'bg-amber-50 text-amber-700 border border-amber-100'
                        : 'bg-rose-50 text-rose-700 border border-rose-100'
                    }`}
                  >
                    {task.difficulty}
                  </span>
                )}
                <span className="text-xs font-medium text-slate-500">
                  {task.duration || 20} min study
                </span>
              </div>

              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                title="Close Notepad (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Task Title */}
            <div className="mt-3">
              <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                {task.topic} {task.subtopic ? `• ${task.subtopic}` : ''}
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mt-1 leading-snug">
                {task.title}
              </h2>
            </div>

            {/* Quick Action Toolbar */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
              <button
                onClick={() => onToggleTask(task.id)}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                  task.completed
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {task.completed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-4 h-4 text-slate-400" />
                    <span>Mark as Complete</span>
                  </>
                )}
              </button>

              {task.url && (
                <a
                  href={task.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{docButtonLabel}</span>
                </a>
              )}
            </div>

            {/* Navigation Pills Toolbar */}
            <nav className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar" aria-label="Section Navigation">
              <button
                onClick={() => setActiveSection('all')}
                className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
                  activeSection === 'all'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>

              {studyGuide?.whatYouWillLearn && (
                <button
                  onClick={() => setActiveSection('objectives')}
                  className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
                    activeSection === 'objectives'
                      ? 'bg-emerald-700 text-white font-semibold'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  🎯 Objectives
                </button>
              )}

              <button
                onClick={() => setActiveSection('what-is-this')}
                className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
                  activeSection === 'what-is-this'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                📖 What Is This?
              </button>

              {studyGuide?.howItWorks && (
                <button
                  onClick={() => setActiveSection('how-it-works')}
                  className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
                    activeSection === 'how-it-works'
                      ? 'bg-cyan-700 text-white font-semibold'
                      : 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100'
                  }`}
                >
                  ⚙️ How It Works
                </button>
              )}

              <button
                onClick={() => setActiveSection('diagram')}
                className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
                  activeSection === 'diagram'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                📊 Architecture
              </button>

              <button
                onClick={() => setActiveSection('hacker-notes')}
                className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
                  activeSection === 'hacker-notes'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                📝 Traps & Gotchas
              </button>

              {studyGuide?.codeSnippet && (
                <button
                  onClick={() => setActiveSection('code')}
                  className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
                    activeSection === 'code'
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  💻 Code
                </button>
              )}

              {studyGuide?.recommendedResources && (
                <button
                  onClick={() => setActiveSection('resources')}
                  className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
                    activeSection === 'resources'
                      ? 'bg-teal-700 text-white font-semibold'
                      : 'bg-teal-50 text-teal-700 hover:bg-teal-100'
                  }`}
                >
                  📚 Resources
                </button>
              )}

              <button
                onClick={() => setActiveSection('my-notes')}
                className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
                  activeSection === 'my-notes'
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                ✏️ My Notes
              </button>
            </nav>
          </header>

          {/* 2. Scrollable Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

            {/* SECTION 1: What You Will Learn (Learning Objectives) */}
            {(activeSection === 'all' || activeSection === 'objectives') && studyGuide?.whatYouWillLearn && (
              <section className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-emerald-950 tracking-tight">
                      What You Will Learn in this Topic
                    </h3>
                    <p className="text-xs text-emerald-700">Key capabilities tested on the AWS MLA-C02 exam</p>
                  </div>
                </div>

                <ul className="space-y-2 mt-3 text-xs sm:text-sm text-emerald-950">
                  {studyGuide.whatYouWillLearn.map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-white/70 p-2.5 rounded-xl border border-emerald-100 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed font-medium">{goal}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* SECTION 2: What Is This? (Comprehensive Technical & Revision Guide) */}
            {(activeSection === 'all' || activeSection === 'what-is-this') && (
              <section className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-xs bg-gradient-to-br from-indigo-50/40 via-white to-white space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                      What Is This? (Comprehensive Technical & Revision Guide)
                    </h3>
                    <p className="text-xs text-slate-500">Core architecture, foundational concepts, and exam revision context</p>
                  </div>
                </div>

                {/* Plain-English Definition & In-Depth Technical Breakdown */}
                <div className="text-slate-800 text-xs sm:text-sm leading-relaxed space-y-3 font-normal">
                  {(studyGuide?.whatIsThis?.summary || studyGuide?.plainEnglish || task.description || 'Core study topic for career improvement and examination success.')
                    .split('\n\n')
                    .map((paragraph, idx) => (
                      <p key={idx} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                </div>

                {/* Master Revision Key Points / Takeaways */}
                {studyGuide?.whatIsThis?.revisionKeyPoints && studyGuide.whatIsThis.revisionKeyPoints.length > 0 && (
                  <div className="bg-indigo-50/80 border border-indigo-200/90 rounded-xl p-4 text-xs sm:text-sm text-indigo-950 space-y-2 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Exam Revision Takeaways & Core Facts:</span>
                    </div>
                    <ul className="space-y-1.5 pl-1">
                      {studyGuide.whatIsThis.revisionKeyPoints.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-indigo-600 font-bold leading-relaxed">•</span>
                          <span className="leading-relaxed font-medium">{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Real-World Analogy */}
                {studyGuide?.whatIsThis?.analogy && (
                  <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-4 text-xs sm:text-sm text-amber-950 space-y-1 shadow-2xs">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <Lightbulb className="w-4 h-4 text-amber-600 fill-amber-400" />
                      <span>Real-World Analogy (Mental Model):</span>
                    </div>
                    <p className="leading-relaxed italic pl-5">
                      "{studyGuide.whatIsThis.analogy}"
                    </p>
                  </div>
                )}

                {/* Why It Matters */}
                {studyGuide?.whatIsThis?.whyItMatters && (
                  <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block mb-1">
                      💡 Why This Matters for ML Engineers:
                    </span>
                    <p className="leading-relaxed">
                      {studyGuide.whatIsThis.whyItMatters}
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* SECTION 3: How It Works (Step-by-Step Technical Lifecycle & Mechanics) */}
            {(activeSection === 'all' || activeSection === 'how-it-works') && studyGuide?.howItWorks && (
              <section className="bg-white rounded-2xl border border-cyan-200 p-5 shadow-xs space-y-4 bg-gradient-to-br from-cyan-50/30 via-white to-white">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-cyan-700 text-white flex items-center justify-center shadow-xs">
                    <Settings className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                      How It Works (Step-by-Step Technical Lifecycle)
                    </h3>
                    <p className="text-xs text-slate-500">End-to-end data flow, execution sequence, and API calls</p>
                  </div>
                </div>

                {/* Numbered Steps */}
                <div className="space-y-2.5">
                  {studyGuide.howItWorks.steps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800">
                      <div className="w-6 h-6 rounded-full bg-cyan-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        {idx + 1}
                      </div>
                      <p className="leading-relaxed font-medium pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>

                {/* Under-the-hood Mechanics */}
                {studyGuide.howItWorks.mechanics && (
                  <div className="mt-3 p-3.5 rounded-xl bg-indigo-50/80 border border-indigo-100 text-xs text-indigo-950">
                    <span className="font-bold text-indigo-900 block mb-1">
                      🔬 Under-the-Hood Engine Mechanics:
                    </span>
                    <p className="leading-relaxed">
                      {studyGuide.howItWorks.mechanics}
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* SECTION 4: Architecture & Workflow Diagram */}
            {(activeSection === 'all' || activeSection === 'diagram') && (
              <section className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-slate-100 shadow-md">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                      <BrainCircuit className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-white tracking-tight">
                        Architecture & Data Flow Diagram
                      </h3>
                      <p className="text-xs text-slate-400">Visual mapping of services, boundaries & data paths</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyText(studyGuide ? studyGuide.diagram : '', 'diagram')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
                    title="Copy diagram to clipboard"
                  >
                    {copiedDiagram ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedDiagram ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/80 overflow-x-auto shadow-inner">
                  <pre className="font-mono text-xs sm:text-xs text-emerald-300/90 leading-relaxed whitespace-pre font-medium">
                    {studyGuide ? studyGuide.diagram : `  [ Input Request / Trigger ]\n              │\n              ▼\n  ┌─────────────────────────────────────────┐\n  │ Service: ${task.title}                  │\n  └───────────────────┬─────────────────────┘\n                      ▼\n  [ Verified Output & Production Monitoring ]`}
                  </pre>
                </div>
              </section>
            )}

            {/* SECTION 5: Technical Specifications & Tradeoffs */}
            {(activeSection === 'all' || activeSection === 'tradeoffs') && studyGuide?.technicalTradeoffs && (
              <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                    <ListChecks className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                      Technical Specifications & Tradeoff Matrix
                    </h3>
                    <p className="text-xs text-slate-500">Limits, operational considerations, and decision criteria</p>
                  </div>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {studyGuide.technicalTradeoffs.map((tradeoff, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                      <span className="leading-relaxed font-medium">{tradeoff}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* SECTION 6: Handwritten / Hacker Sticky Note */}
            {(activeSection === 'all' || activeSection === 'hacker-notes') && (
              <section className="relative bg-amber-50/95 border-2 border-amber-300/80 rounded-2xl p-6 shadow-sm text-amber-950 font-sans overflow-hidden">
                {/* Decorative Scotch Tape effect at top center */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-200/60 backdrop-blur-xs border border-amber-300/50 rounded-xs rotate-1 shadow-xs" />

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-amber-200/80 text-amber-800 flex items-center justify-center font-bold text-xs">
                    <StickyNote className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-amber-950 tracking-tight flex items-center gap-1.5">
                      <span>Exam Hacker Sticky Notes</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                    </h3>
                    <p className="text-xs text-amber-800">1000/1000 memory hooks, traps, and golden decision rules</p>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  {studyGuide ? (
                    <>
                      {/* Mnemonic Hook */}
                      <div className="bg-white/80 border border-amber-200 rounded-xl p-3 shadow-xs">
                        <span className="font-extrabold text-amber-900 block mb-1">
                          ⚡ Memory Hook / Mnemonic:
                        </span>
                        <p className="font-mono text-xs sm:text-xs text-amber-950 font-semibold leading-relaxed">
                          "{studyGuide.handwrittenNotes.mnemonic}"
                        </p>
                      </div>

                      {/* Exam Trap */}
                      <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-3 shadow-xs text-rose-950">
                        <span className="font-extrabold text-rose-900 block mb-1">
                          ⚠️ The Exam Trap (What AWS tests):
                        </span>
                        <p className="text-xs sm:text-xs text-rose-900 leading-relaxed font-medium">
                          {studyGuide.handwrittenNotes.examTrap}
                        </p>
                      </div>

                      {/* Golden Rule */}
                      <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 shadow-xs text-emerald-950">
                        <span className="font-extrabold text-emerald-900 block mb-1">
                          🎯 1000/1000 Golden Rule:
                        </span>
                        <p className="text-xs sm:text-xs text-emerald-900 font-semibold leading-relaxed">
                          {studyGuide.handwrittenNotes.goldenRule}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="bg-white/80 border border-amber-200 rounded-xl p-3">
                      <p className="text-xs text-amber-900 font-medium">
                        {task.notes || 'Master key algorithm patterns, edge cases, and time-space tradeoffs.'}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* SECTION 7: Practical Code / CLI Snippet */}
            {(activeSection === 'all' || activeSection === 'code') && studyGuide?.codeSnippet && (
              <section className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-slate-100 shadow-md">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-white tracking-tight">
                        Practical Implementation (Python / Boto3)
                      </h3>
                      <p className="text-xs text-slate-400">{studyGuide.codeSnippet.title}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyText(studyGuide.codeSnippet?.code || '', 'code')}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700"
                    title="Copy code to clipboard"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-blue-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>

                <div className="bg-slate-950 rounded-xl p-4 border border-slate-800/80 overflow-x-auto shadow-inner">
                  <pre className="font-mono text-xs sm:text-xs text-blue-300/90 leading-relaxed whitespace-pre font-medium">
                    {studyGuide.codeSnippet.code}
                  </pre>
                </div>
              </section>
            )}

            {/* SECTION 8: Recommended Learning Resources */}
            {(activeSection === 'all' || activeSection === 'resources') && studyGuide?.recommendedResources && (
              <section className="bg-white rounded-2xl border border-teal-200 p-5 shadow-xs space-y-3 bg-gradient-to-br from-teal-50/20 via-white to-white">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center shadow-xs">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                      Recommended Learning Resources & Official Guides
                    </h3>
                    <p className="text-xs text-slate-500">Verified official documentation, SDK guides, and architectural whitepapers</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2.5 mt-2">
                  {studyGuide.recommendedResources.map((res, idx) => {
                    const isDoc = res.type.includes('Documentation') || res.type.includes('Guide');
                    const isSdk = res.type.includes('SDK');
                    const isWhitepaper = res.type.includes('Whitepaper');
                    const isPricing = res.type.includes('Pricing');

                    const badgeStyle = isSdk
                      ? 'bg-blue-100 text-blue-800 border-blue-200'
                      : isWhitepaper
                      ? 'bg-purple-100 text-purple-800 border-purple-200'
                      : isPricing
                      ? 'bg-amber-100 text-amber-800 border-amber-200'
                      : 'bg-emerald-100 text-emerald-800 border-emerald-200';

                    let domain = 'docs.aws.amazon.com';
                    try {
                      domain = new URL(res.url).hostname;
                    } catch {
                      // fallback
                    }

                    return (
                      <a
                        key={idx}
                        href={res.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-teal-50/70 border border-slate-200 hover:border-teal-400 transition-all group shadow-2xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-slate-900 group-hover:text-teal-900 transition-colors">
                              {res.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`inline-block text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md border ${badgeStyle}`}>
                              {res.type}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {domain}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400 group-hover:text-teal-700 transition-colors shrink-0 ml-3">
                          <span className="text-xs font-semibold hidden sm:inline">Open</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </a>
                    );
                  })}
                </div>
              </section>
            )}

            {/* SECTION 9: Interactive Personal Study Notes (Custom Notepad) */}
            {(activeSection === 'all' || activeSection === 'my-notes') && (
              <section className="bg-white rounded-2xl border-2 border-dashed border-purple-200 p-5 shadow-xs bg-gradient-to-br from-purple-50/30 via-white to-white">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-xs">
                      <Edit3 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                        My Personal Study Notepad
                      </h3>
                      <p className="text-xs text-slate-500">Jot down your custom takeaways, formulas, or flashcards</p>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveNote}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                      isSaved
                        ? 'bg-emerald-600 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    {isSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{isSaved ? 'Saved!' : 'Save Notes'}</span>
                  </button>
                </div>

                <textarea
                  value={personalNote}
                  onChange={(e) => {
                    setPersonalNote(e.target.value);
                    localStorage.setItem(`career_pulse_user_note_${task.id}`, e.target.value);
                  }}
                  placeholder="Type your personal insights, flashcard questions, or memory tricks for this topic here... (Auto-saves as you type)"
                  className="w-full h-32 p-3 text-xs sm:text-sm rounded-xl border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-600 bg-white text-slate-800 resize-y leading-relaxed font-sans placeholder:text-slate-400"
                />

                <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>Auto-saved to your browser storage</span>
                  <span>{personalNote.length} characters</span>
                </div>
              </section>
            )}

          </div>

          {/* 3. Footer */}
          <footer className="p-4 border-t border-slate-100 bg-slate-50/90 flex items-center justify-between text-xs text-slate-500">
            <span>CareerPulse Study Companion • 1000/1000 Master Guide</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg font-bold bg-slate-200 hover:bg-slate-300 text-slate-700 transition-colors"
            >
              Close Notepad
            </button>
          </footer>

        </aside>
      </div>
    </div>
  );
};
