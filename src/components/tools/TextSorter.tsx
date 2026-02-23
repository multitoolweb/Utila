import React, { useState } from 'react';
import { SortAsc, SortDesc, Trash2, Copy, Check, List } from 'lucide-react';

export const TextSorter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const sortLines = (direction: 'asc' | 'desc') => {
    const lines = text.split('\n').filter(l => l.trim() !== '');
    const sorted = [...lines].sort((a, b) => {
      return direction === 'asc' 
        ? a.localeCompare(b, undefined, { sensitivity: 'base' })
        : b.localeCompare(a, undefined, { sensitivity: 'base' });
    });
    setText(sorted.join('\n'));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter lines of text to sort..."
          className="w-full h-64 p-4 bg-black/[0.02] border border-black/10 rounded-2xl outline-none focus:border-black transition-all resize-none font-mono text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => sortLines('asc')}
          className="px-6 py-3 bg-black text-white rounded-xl font-bold flex items-center gap-2 hover:bg-black/80 transition-all"
        >
          <SortAsc size={18} />
          Sort A-Z
        </button>
        <button
          onClick={() => sortLines('desc')}
          className="px-6 py-3 bg-black text-white rounded-xl font-bold flex items-center gap-2 hover:bg-black/80 transition-all"
        >
          <SortDesc size={18} />
          Sort Z-A
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

      <div className="p-6 bg-black/[0.02] border border-black/5 rounded-2xl flex items-center gap-4">
        <div className="w-10 h-10 bg-white rounded-xl border border-black/5 flex items-center justify-center">
          <List size={20} className="text-black/40" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-black/40">Line Count</p>
          <p className="text-lg font-bold">{text.split('\n').filter(l => l.trim() !== '').length}</p>
        </div>
      </div>
    </div>
  );
};
