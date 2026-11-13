import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { X, Play, Pause, RotateCcw, Volume2, CheckCircle2, Flame, Sparkles } from 'lucide-react';
import { Task } from '../types';

interface PomodoroTimerProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  initialTask?: Task | null;
  onSessionComplete: (taskId: string, durationMinutes: number) => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  isOpen,
  onClose,
  tasks,
  initialTask,
  onSessionComplete
}) => {
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [selectedTaskId, setSelectedTaskId] = useState<string>(initialTask?.id || '');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (initialTask) {
      setSelectedTaskId(initialTask.id);
    } else if (tasks.length > 0 && !selectedTaskId) {
      setSelectedTaskId(tasks[0].id);
    }
  }, [initialTask, tasks]);

  useEffect(() => {
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
    setIsActive(false);
  }, [mode]);

  // Web Audio chime
  const playChime = () => {
    try {
      const ctx = audioContextRef.current || new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio not permitted without interaction
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      playChime();

      if (mode === 'work' && selectedTaskId) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
        onSessionComplete(selectedTaskId, 25);
        setMode('break');
      } else {
        setMode('work');
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, selectedTaskId]);

  if (!isOpen) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const totalSeconds = mode === 'work' ? 25 * 60 : 5 * 60;
  const progressPercent = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  const activeTask = tasks.find(t => t.id === selectedTaskId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div
          className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl transition-colors duration-700 ${
            mode === 'work' ? 'bg-indigo-600/20' : 'bg-emerald-600/20'
          }`}
        />

        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Flame className="w-5 h-5 text-indigo-400" />
            </span>
            <div>
              <h2 className="text-base font-bold text-white">Focus Mode</h2>
              <p className="text-[11px] text-slate-400">Deep work study & coding sprint</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector (25m Focus / 5m Break) */}
        <div className="flex p-1 rounded-2xl bg-slate-950 border border-slate-800 mb-6">
          <button
            onClick={() => setMode('work')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              mode === 'work'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            25m Focus Session
          </button>
          <button
            onClick={() => setMode('break')}
            className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
              mode === 'break'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            5m Recharging Break
          </button>
        </div>

        {/* Circular Progress Display */}
        <div className="flex flex-col items-center justify-center my-6">
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-slate-800"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="currentColor"
                strokeWidth="6"
                strokeDasharray={264}
                strokeDashoffset={264 - (264 * progressPercent) / 100}
                strokeLinecap="round"
                fill="transparent"
                className={`transition-all duration-500 ${
                  mode === 'work' ? 'text-indigo-500' : 'text-emerald-500'
                }`}
              />
            </svg>

            {/* Timer Digits */}
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-extrabold font-mono tracking-wider text-white">
                {formattedTime}
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mt-1">
                {mode === 'work' ? 'Focusing' : 'Break'}
              </span>
            </div>
          </div>
        </div>

        {/* Linked Goal Selector */}
        {mode === 'work' && (
          <div className="mb-6">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Goal Being Worked On:
            </label>
            <select
              value={selectedTaskId}
              onChange={e => setSelectedTaskId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              {tasks.map(t => (
                <option key={t.id} value={t.id}>
                  {t.title} ({t.actualHours}h logged)
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Timer Control Buttons */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => {
              setIsActive(false);
              setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
            }}
            title="Reset Timer"
            className="p-3 rounded-2xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-8 py-3.5 rounded-2xl text-white font-bold text-sm shadow-xl flex items-center gap-2 transition transform hover:-translate-y-0.5 ${
              isActive
                ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5" /> Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5" /> Start Focus
              </>
            )}
          </button>
        </div>

        {/* Tip / Footer */}
        <p className="text-center text-[11px] text-slate-500 mt-6">
          Completing a 25m session automatically logs 0.42h to your selected career goal.
        </p>
      </div>
    </div>
  );
};

