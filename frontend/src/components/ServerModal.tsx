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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Cloud Backend Connection</h2>
            <p className="text-xs text-slate-400">
              Connect your GitHub Pages frontend to your Render + Supabase backend
            </p>
          </div>
        </div>

        {/* Status Alert */}
        {status === 'success' && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2.5 text-emerald-400 text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        {status === 'error' && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center gap-2.5 text-rose-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{statusMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
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
              className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
            <p className="text-[11px] text-slate-400 mt-1.5">
              Leave blank to use the offline browser storage fallback, or enter your Render service URL.
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              disabled={testing}
              onClick={() => handleTestConnection()}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition flex items-center gap-2 disabled:opacity-50"
            >
              {testing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Server className="w-3.5 h-3.5 text-indigo-400" />}
              <span>Test Connection</span>
            </button>

            <button
              type="submit"
              disabled={testing}
              className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition flex items-center justify-center gap-2"
            >
              <span>Save & Connect</span>
            </button>
          </div>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <button
            type="button"
            onClick={handleResetToLocal}
            className="hover:text-slate-200 underline underline-offset-2"
          >
            Reset to Offline Storage
          </button>
          <a
            href="https://dashboard.render.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
          >
            <span>Open Render Dashboard</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
