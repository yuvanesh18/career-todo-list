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
  Save
} from 'lucide-react';
import { Task } from '../types';
import { getStudyGuideForTask, AWSStudyTopic } from '../data/awsStudyGuide';

interface StudyNotepadDrawerProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleTask: (taskId: string) => void;
}

export const StudyNotepadDrawer: React.FC<StudyNotepadDrawerProps> = ({
  task,
  isOpen,
  onClose,
  onToggleTask
}) => {
  const [copiedDiagram, setCopiedDiagram] = useState(false);
  const [personalNote, setPersonalNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<'all' | 'explanation' | 'diagram' | 'handwritten' | 'bullets' | 'my-notes'>('all');

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
  const isAws = task.goalId === 'goal-aws';

  const handleSaveNote = () => {
    localStorage.setItem(`career_pulse_user_note_${task.id}`, personalNote);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleCopyDiagram = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDiagram(true);
    setTimeout(() => setCopiedDiagram(false), 2000);
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
          <header className="p-6 border-b border-slate-100 bg-gradient-to-b from-slate-50/80 to-white sticky top-0 z-10">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                {studyGuide && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                    <BrainCircuit className="w-3.5 h-3.5 text-indigo-600" />
                    Skill {studyGuide.skillNumber}
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
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight mt-1 leading-snug">
                {task.title}
              </h2>
            </div>

            {/* Quick Action Toolbar */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
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
                  <span>{isAws ? 'Official AWS Docs' : 'LeetCode Problem'}</span>
                </a>
              )}
            </div>

            {/* Quick Navigation Filter Pills */}
            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
              <button
                onClick={() => setActiveSection('all')}
                className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
                  activeSection === 'all'
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All Sections
              </button>
              <button
                onClick={() => setActiveSection('explanation')}
                className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
                  activeSection === 'explanation'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
                }`}
              >
                💡 Simplified Explanation
              </button>
              <button
                onClick={() => setActiveSection('diagram')}
                className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
                  activeSection === 'diagram'
                    ? 'bg-emerald-600 text-white font-semibold'
                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                }`}
              >
                📊 Architecture Flow
              </button>
              <button
                onClick={() => setActiveSection('handwritten')}
                className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
                  activeSection === 'handwritten'
                    ? 'bg-amber-600 text-white font-semibold'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                📝 Exam Notes & Gotchas
              </button>
              <button
                onClick={() => setActiveSection('my-notes')}
                className={`px-2.5 py-1 rounded-md font-medium shrink-0 transition-colors ${
                  activeSection === 'my-notes'
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                }`}
              >
                ✏️ My Notepad
              </button>
            </div>
          </header>

          {/* 2. Scrollable Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* SECTION 1: Simplified Plain-English Explanation */}
            {(activeSection === 'all' || activeSection === 'explanation') && (
              <section className="bg-white rounded-2xl border border-indigo-100 p-5 shadow-xs bg-gradient-to-br from-indigo-50/40 via-white to-white">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                      Simplified Plain-English Explanation
                    </h3>
                    <p className="text-xs text-slate-500">Core concept broken down without dry corporate jargon</p>
                  </div>
                </div>

                <div className="text-slate-700 text-sm leading-relaxed space-y-2">
                  <p>
                    {studyGuide ? studyGuide.plainEnglish : task.description || 'Core study topic for career improvement and examination success.'}
                  </p>
                </div>
              </section>
            )}

            {/* SECTION 2: Architecture & Workflow Diagram */}
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
                    onClick={() => handleCopyDiagram(studyGuide ? studyGuide.diagram : '')}
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

            {/* SECTION 3: Handwritten / Hacker Sticky Note */}
            {(activeSection === 'all' || activeSection === 'handwritten') && (
              <section className="relative bg-amber-50/95 border-2 border-amber-300/80 rounded-2xl p-6 shadow-sm text-amber-950 font-sans overflow-hidden">
                {/* Decorative Scotch Tape effect at top center */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-200/60 backdrop-blur-xs border border-amber-300/50 rounded-xs rotate-1 shadow-xs" />

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-amber-200/80 text-amber-800 flex items-center justify-center font-bold text-xs">
                    <StickyNote className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-amber-950 tracking-tight flex items-center gap-1.5">
                      <span>Exam Hacker Notes & Gotchas</span>
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                    </h3>
                    <p className="text-xs text-amber-800">Critical traps and memory hooks for 1000/1000 score</p>
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
                        <p className="text-xs sm:text-xs text-rose-900 leading-relaxed">
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

            {/* SECTION 4: Core Bullet Points & Scenario Tip */}
            {(activeSection === 'all' || activeSection === 'bullets') && (
              <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
                    <ListChecks className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                      Core Technical Bullet Points
                    </h3>
                    <p className="text-xs text-slate-500">Service limits, SDK parameters & architectural decisions</p>
                  </div>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {studyGuide?.bulletPoints ? (
                    studyGuide.bulletPoints.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                        <span className="leading-relaxed">{pt}</span>
                      </li>
                    ))
                  ) : (
                    <li className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-2 shrink-0" />
                      <span>Review core constraints and practice optimal algorithmic complexity.</span>
                    </li>
                  )}
                </ul>

                {/* Scenario tip box */}
                {studyGuide?.scenarioTip && (
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <span className="font-extrabold text-indigo-700 block mb-0.5">
                      💡 Exam Question Scenario Pattern:
                    </span>
                    <p className="leading-relaxed italic">
                      "{studyGuide.scenarioTip}"
                    </p>
                  </div>
                )}
              </section>
            )}

            {/* SECTION 5: Interactive Personal Study Notes (Custom Notepad) */}
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
          <footer className="p-4 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between text-xs text-slate-500">
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
