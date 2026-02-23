import React, { useState } from 'react';
import { Copy, Check, Trash2, Braces } from 'lucide-react';

export const JSONFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const format = (spaces: number = 2) => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, spaces));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const minify = () => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
          className={`w-full h-80 p-4 bg-black/[0.02] border rounded-2xl outline-none transition-all resize-none font-mono text-xs leading-relaxed ${error ? 'border-red-500' : 'border-black/10 focus:border-black'}`}
        />
        {error && (
          <div className="absolute bottom-4 left-4 right-4 p-2 bg-red-50 text-red-600 text-[10px] font-bold rounded-lg border border-red-100">
            Error: {error}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button onClick={() => format(2)} className="px-4 py-2 bg-white border border-black/10 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-all">Format (2 spaces)</button>
        <button onClick={() => format(4)} className="px-4 py-2 bg-white border border-black/10 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-all">Format (4 spaces)</button>
        <button onClick={minify} className="px-4 py-2 bg-white border border-black/10 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-all">Minify</button>
        
        <div className="flex-1" />
        
        <button 
          onClick={handleCopy}
          className="p-2 hover:bg-black/5 rounded-xl text-black/60 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
        </button>
        <button 
          onClick={() => { setInput(''); setError(null); }}
          className="p-2 hover:bg-black/5 rounded-xl text-red-500 transition-colors"
          title="Clear"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};
