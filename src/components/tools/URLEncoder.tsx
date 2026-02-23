import React, { useState } from 'react';
import { Link, Unlock, Lock, Copy, Check, Trash2 } from 'lucide-react';

export const URLEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input));
    } catch (e) {
      setOutput('Error encoding URL');
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
    } catch (e) {
      setOutput('Error decoding URL. Make sure it is a valid encoded string.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-bold uppercase tracking-wider text-black/40">Input</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste URL or text here..."
          className="w-full h-32 p-4 bg-black/[0.02] border border-black/10 rounded-2xl outline-none focus:border-black transition-all resize-none font-mono text-sm"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleEncode}
          className="flex-1 py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black/80 transition-all"
        >
          <Lock size={20} />
          Encode
        </button>
        <button
          onClick={handleDecode}
          className="flex-1 py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black/80 transition-all"
        >
          <Unlock size={20} />
          Decode
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-bold uppercase tracking-wider text-black/40">Output</label>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-black/5 rounded-lg text-black/60 transition-colors"
            >
              {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
            </button>
            <button
              onClick={() => { setInput(''); setOutput(''); }}
              className="p-2 hover:bg-black/5 rounded-lg text-red-500 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
        <div className="w-full min-h-[100px] p-4 bg-black/[0.02] border border-black/10 rounded-2xl font-mono text-sm break-all">
          {output || <span className="text-black/20 italic">Result will appear here...</span>}
        </div>
      </div>

      <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4">
        <div className="w-10 h-10 bg-white rounded-xl border border-emerald-100 flex items-center justify-center">
          <Link size={20} className="text-emerald-500" />
        </div>
        <p className="text-xs text-emerald-700 leading-relaxed">
          URL encoding converts characters into a format that can be transmitted over the Internet. It replaces unsafe ASCII characters with a "%" followed by two hexadecimal digits.
        </p>
      </div>
    </div>
  );
};
