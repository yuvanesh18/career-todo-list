import React, { useState } from 'react';
import { Server, CheckCircle2, AlertCircle, X, ExternalLink, RefreshCw } from 'lucide-react';
import { api } from '../services/api';

interface ServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onServerConfigured: () => void;
}

export const ServerModal: React.FC<ServerModalProps> = ({ isOpen, onClose, onServerConfigured }) => {
  const [url, setUrl] = useState(() => api.getStoredBackendUrl());
  const [testing, setTesting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMsg, setStatusMsg] = useState('');

  if (!isOpen) return null;

  const handleTestConnection = async (testUrl?: string) => {
    const target = testUrl !== undefined ? testUrl : url;
    setTesting(true);
    setStatus('idle');
    try {
      api.setStoredBackendUrl(target);
      const ok = await api.checkServer();
      if (ok) {
        setStatus('success');
        setStatusMsg('Connected successfully! Render backend & Supabase DB are active.');
      } else {
        setStatus('error');
        setStatusMsg('Could not reach backend at this URL. Make sure it is running and healthy.');
      }
    } catch (err: any) {
      setStatus('error');
      setStatusMsg(err.message || 'Connection test failed');
    } finally {
      setTesting(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleTestConnection();
    onServerConfigured();
    if (status === 'success') {
      onClose();
    }
  };

  const handleResetToLocal = () => {
    setUrl('');
    api.setStoredBackendUrl('');
    setStatus('idle');
    setStatusMsg('Reverted to offline browser storage fallback.');
    onServerConfigured();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Cloud Backend Connection</h2>
            <p className="text-xs text-slate-500">
              Connect your GitHub Pages frontend to your Render + Supabase backend
            </p>
          </div>
        </div>

        {/* Status Alert */}
        {status === 'success' && (
          <div className="mb-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-emerald-800 text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{statusMsg}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2.5 text-rose-800 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{statusMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Render Backend URL
            </label>
            <input
              type="url"
              placeholder="https://career-todo-backend.onrender.com"
              value={url}
              onChange={e => {
                setUrl(e.target.value);
                setStatus('idle');
              }}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 transition"
            />
            <p className="text-[11px] text-slate-400 mt-1.5">
              Leave blank to use the offline browser storage fallback, or enter your live Render URL.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              disabled={testing}
              onClick={() => handleTestConnection()}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-2 disabled:opacity-50"
            >
              {testing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Server className="w-3.5 h-3.5 text-indigo-600" />}
              <span>Test Connection</span>
            </button>

            <button
              type="submit"
              disabled={testing}
              className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center justify-center gap-2"
            >
              <span>Save & Connect</span>
            </button>
          </div>
        </form>

        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            type="button"
            onClick={handleResetToLocal}
            className="hover:text-slate-900 underline underline-offset-2"
          >
            Reset to Offline Storage
          </button>
          <a
            href="https://dashboard.render.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold"
          >
            <span>Open Render</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
