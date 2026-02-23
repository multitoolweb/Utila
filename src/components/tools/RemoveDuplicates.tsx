import React, { useState } from 'react';
import { Trash2, Copy, Check, ListChecks } from 'lucide-react';

export const RemoveDuplicates: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleRemoveDuplicates = () => {
    const lines = text.split('\n');
    const uniqueLines = Array.from(new Set(lines.map(line => line.trim()))).filter(line => line !== '');
    setText(uniqueLines.join('\n'));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = {
    original: text.split('\n').length,
    unique: new Set(text.split('\n').map(l => l.trim()).filter(l => l !== '')).size
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your list here (one item per line)..."
          className="w-full h-64 p-4 bg-black/[0.02] border border-black/10 rounded-2xl outline-none focus:border-black transition-all resize-none font-mono text-sm"
        />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <div className="px-3 py-1 bg-white/80 backdrop-blur border border-black/5 rounded-full text-[10px] font-bold uppercase tracking-wider text-black/40">
            {stats.original} Lines
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleRemoveDuplicates}
          className="px-6 py-3 bg-black text-white rounded-xl font-bold flex items-center gap-2 hover:bg-black/80 transition-all"
        >
          <ListChecks size={18} />
          Remove Duplicates
        </button>
        
        <div className="flex-1" />
        
        <button
          onClick={handleCopy}
          className="p-3 hover:bg-black/5 rounded-xl text-black/60 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
        </button>
        <button
          onClick={() => setText('')}
          className="p-3 hover:bg-black/5 rounded-xl text-red-500 transition-colors"
          title="Clear all"
        >
          <Trash2 size={20} />
        </button>
      </div>

      {stats.original > 0 && stats.original !== stats.unique && (
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-700 text-sm font-medium">
          Found and removed {stats.original - stats.unique} duplicate entries.
        </div>
      )}
    </div>
  );
};
