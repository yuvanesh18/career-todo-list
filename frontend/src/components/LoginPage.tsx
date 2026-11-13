import React, { useState } from 'react';
import { Target, Lock, Mail, User as UserIcon, LogIn, UserPlus, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { api } from '../services/api';
import { UserProfile } from '../types';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onContinueGuest: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onContinueGuest }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegister) {
        if (!name.trim()) throw new Error('Please enter your full name');
        if (!email.trim()) throw new Error('Please enter your email address');
        if (password.length < 6) throw new Error('Password must be at least 6 characters');
        const res = await api.register(name, email, password);
        onLoginSuccess(res.user);
      } else {
        if (!email.trim() || !password) throw new Error('Please enter both email and password');
        const res = await api.login(email, password);
        onLoginSuccess(res.user);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await api.login('yuvanesh@example.com', 'password123');
      onLoginSuccess(res.user);
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 text-slate-800 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Decorative backdrop blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 mb-4 transition-transform hover:scale-105">
          <Target className="w-7 h-7" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          CareerPulse
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Master DSA (Grind 169), track certifications, and build daily consistency
        </p>
      </div>

      {/* Main Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl shadow-slate-200/60 border border-slate-200/80 rounded-3xl">
          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200 mb-6">
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                !isRegister
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                setError(null);
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                isRegister
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Account</span>
              </div>
            </button>
          </div>

          {/* Error Notice */}
          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-rose-700 text-xs animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Yuvanesh"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : isRegister ? (
                <>
                  <UserPlus className="w-4 h-4" /> Create My Account
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Sign In to Dashboard
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Option */}
          <div className="mt-6 pt-5 border-t border-slate-200/80">
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full py-2.5 px-3 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 text-amber-900 text-xs font-semibold rounded-xl transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>One-Click Demo: Sign in as <strong>Yuvanesh</strong></span>
            </button>

            <button
              type="button"
              onClick={onContinueGuest}
              className="w-full mt-2 py-2 px-3 text-slate-500 hover:text-slate-800 text-xs font-medium transition flex items-center justify-center gap-1.5"
            >
              <span>Explore as Guest without login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Feature badges footer */}
        <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs text-slate-500">
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold text-slate-700">169 DSA Grind</span>
            <span className="text-[10px] text-slate-400">17 Core Topics</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col items-center gap-1">
            <Target className="w-4 h-4 text-indigo-600" />
            <span className="font-semibold text-slate-700">Daily Streak</span>
            <span className="text-[10px] text-slate-400">Local Calendar</span>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span className="font-semibold text-slate-700">Multi-User</span>
            <span className="text-[10px] text-slate-400">Isolated Sessions</span>
          </div>
        </div>
      </div>
    </div>
  );
};
