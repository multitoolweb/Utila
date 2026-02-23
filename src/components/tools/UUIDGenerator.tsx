import React, { useState } from 'react';
import { Fingerprint, Copy, Check, RefreshCw, List } from 'lucide-react';

export const UUIDGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState(false);

  const generateUUID = () => {
    const newUuids = Array.from({ length: count }, () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    });
    setUuids(newUuids);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  React.useEffect(generateUUID, []);

  return (
    <div className="space-y-8">
      <div className="p-8 bg-black/[0.02] border border-black/10 rounded-[40px] space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-white rounded-3xl shadow-sm border border-black/5 flex items-center justify-center">
            <Fingerprint size={32} className="text-black/40" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Generate UUID v4</h3>
            <p className="text-sm text-black/40">Universally Unique Identifiers</p>
          </div>
        </div>

        <div className="flex items-center gap-4 max-w-xs mx-auto">
          <label className="text-sm font-bold whitespace-nowrap">Quantity</label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            className="w-full p-3 bg-white border border-black/10 rounded-xl outline-none focus:border-black text-center font-bold"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={generateUUID}
            className="flex-1 py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black/80 transition-all"
          >
            <RefreshCw size={20} />
            Generate
          </button>
          <button
            onClick={handleCopy}
            disabled={uuids.length === 0}
            className="flex-1 py-4 bg-white border border-black/10 text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black/5 transition-all disabled:opacity-50"
          >
            {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
            Copy All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-black/40 flex items-center gap-2">
            <List size={14} />
            Generated Results
          </h4>
        </div>
        <div className="space-y-2">
          {uuids.map((uuid, idx) => (
            <div key={idx} className="p-4 bg-white border border-black/5 rounded-2xl font-mono text-sm flex items-center justify-between group">
              <span className="text-black/80">{uuid}</span>
              <button 
                onClick={() => navigator.clipboard.writeText(uuid)}
                className="p-2 opacity-0 group-hover:opacity-100 hover:bg-black/5 rounded-lg transition-all"
              >
                <Copy size={14} className="text-black/40" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
