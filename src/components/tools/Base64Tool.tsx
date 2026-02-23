import React, { useState } from 'react';
import { RefreshCw, Copy, Check, Trash2 } from 'lucide-react';

export const Base64Tool: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [copied, setCopied] = useState(false);

  const process = () => {
    try {
      if (mode === 'encode') {
        return btoa(input);
      } else {
        return atob(input);
      }
    } catch (e) {
      return 'Invalid input for decoding';
    }
  };

  const result = process();

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex bg-black/5 p-1 rounded-xl w-fit">
        <button 
          onClick={() => setMode('encode')}
          className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'encode' ? 'bg-white shadow-sm' : 'text-black/40'}`}
        >
          Encode
        </button>
        <button 
          onClick={() => setMode('decode')}
          className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${mode === 'decode' ? 'bg-white shadow-sm' : 'text-black/40'}`}
        >
          Decode
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter base64 to decode...'}
            className="w-full h-64 p-4 bg-black/[0.02] border border-black/10 rounded-2xl outline-none focus:border-black transition-all resize-none font-mono text-sm"
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">Output</label>
            <div className="flex gap-2">
              <button onClick={handleCopy} className="p-1 hover:bg-black/5 rounded-lg transition-colors">
                {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} className="text-black/40" />}
              </button>
              <button onClick={() => setInput('')} className="p-1 hover:bg-black/5 rounded-lg transition-colors text-red-500/40 hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <div className="w-full h-64 p-4 bg-black/[0.04] border border-black/5 rounded-2xl font-mono text-sm break-all overflow-y-auto">
            {result || <span className="text-black/20 italic">Output will appear here...</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
