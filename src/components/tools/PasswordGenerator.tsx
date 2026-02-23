import React, { useState, useEffect } from 'react';
import { RefreshCw, Copy, Check, ShieldCheck, Trash2 } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const charSets = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    };

    let allowedChars = '';
    if (options.uppercase) allowedChars += charSets.uppercase;
    if (options.lowercase) allowedChars += charSets.lowercase;
    if (options.numbers) allowedChars += charSets.numbers;
    if (options.symbols) allowedChars += charSets.symbols;

    if (!allowedChars) return;

    let result = '';
    for (let i = 0; i < length; i++) {
      result += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }
    setPassword(result);
  };

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStrength = () => {
    if (!password) return { label: 'Empty', color: 'bg-black/10', score: 0 };
    
    let score = 0;
    if (password.length > 8) score += 1;
    if (password.length > 12) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { label: 'Weak', color: 'bg-red-500', score };
    if (score <= 4) return { label: 'Medium', color: 'bg-orange-500', score };
    return { label: 'Strong', color: 'bg-emerald-500', score };
  };

  useEffect(generate, []);

  const strength = getStrength();

  return (
    <div className="space-y-8">
      <div className="relative group">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Generated password..."
          className="w-full p-6 bg-black/[0.02] border border-black/10 rounded-3xl text-2xl font-mono text-center outline-none focus:border-black transition-all"
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-4 flex gap-1">
          <button 
            onClick={handleCopy} 
            className="p-3 hover:bg-black/5 rounded-2xl transition-colors text-black/40 hover:text-black"
            title="Copy to clipboard"
          >
            {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
          </button>
          <button 
            onClick={() => setPassword('')} 
            className="p-3 hover:bg-black/5 rounded-2xl transition-colors text-red-500/40 hover:text-red-500"
            title="Clear"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={generate}
          className="px-8 py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black/80 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-black/10 flex-1 sm:flex-none"
        >
          <RefreshCw size={20} />
          Generate New Password
        </button>
        <button
          onClick={handleCopy}
          disabled={!password}
          className="px-8 py-4 bg-white border border-black/10 text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black/5 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
        >
          {copied ? (
            <>
              <Check size={20} className="text-emerald-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy size={20} />
              Copy Password
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-4">
              <label className="text-sm font-bold">Password Length</label>
              <span className="text-sm font-mono">{length}</span>
            </div>
            <input 
              type="range" 
              min="4" 
              max="64" 
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Object.entries(options).map(([key, val]) => (
              <label key={key} className="flex items-center gap-3 p-4 bg-black/[0.02] border border-black/5 rounded-2xl cursor-pointer hover:bg-black/[0.04] transition-all">
                <input 
                  type="checkbox" 
                  checked={val}
                  onChange={() => setOptions(prev => ({ ...prev, [key]: !val }))}
                  className="w-5 h-5 accent-black rounded-lg"
                />
                <span className="text-sm font-bold capitalize">{key}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-8 bg-black/[0.02] rounded-3xl border border-black/5 flex flex-col items-center justify-center text-center">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${strength.color} text-white transition-colors duration-500`}>
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-xl font-bold mb-1">Security Check</h3>
          <p className="text-sm text-black/40 mb-4">Your password is <span className="text-black font-bold">{strength.label}</span></p>
          <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-500 ${strength.color}`} style={{ width: `${(strength.score / 5) * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};
