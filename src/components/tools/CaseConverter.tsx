import React, { useState } from 'react';
import { Copy, Check, Trash2 } from 'lucide-react';

export const CaseConverter: React.FC = () => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const convert = (type: 'upper' | 'lower' | 'title' | 'sentence') => {
    let result = text;
    switch (type) {
      case 'upper': result = text.toUpperCase(); break;
      case 'lower': result = text.toLowerCase(); break;
      case 'title':
        result = text.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        break;
      case 'sentence':
        result = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
        break;
    }
    setText(result);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your text here..."
        className="w-full h-48 p-4 bg-black/[0.02] border border-black/10 rounded-2xl outline-none focus:border-black transition-all resize-none font-mono text-sm"
      />

      <div className="flex flex-wrap gap-2">
        <button onClick={() => convert('upper')} className="px-4 py-2 bg-white border border-black/10 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-all">UPPERCASE</button>
        <button onClick={() => convert('lower')} className="px-4 py-2 bg-white border border-black/10 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-all">lowercase</button>
        <button onClick={() => convert('title')} className="px-4 py-2 bg-white border border-black/10 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-all">Title Case</button>
        <button onClick={() => convert('sentence')} className="px-4 py-2 bg-white border border-black/10 rounded-xl text-sm font-medium hover:bg-black hover:text-white transition-all">Sentence case</button>
        
        <div className="flex-1" />
        
        <button 
          onClick={handleCopy}
          className="p-2 hover:bg-black/5 rounded-xl text-black/60 transition-colors"
          title="Copy to clipboard"
        >
          {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
        </button>
        <button 
          onClick={() => setText('')}
          className="p-2 hover:bg-black/5 rounded-xl text-red-500 transition-colors"
          title="Clear text"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};
