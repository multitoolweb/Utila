import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Palette } from 'lucide-react';

export const GradientGenerator: React.FC = () => {
  const [color1, setColor1] = useState('#6366f1');
  const [color2, setColor2] = useState('#ec4899');
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  const cssCode = `background: ${gradient};`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const randomize = () => {
    const randomHex = () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor1(randomHex());
    setColor2(randomHex());
    setAngle(Math.floor(Math.random() * 360));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">Color 1</label>
            <div className="flex gap-2 items-center p-3 bg-black/[0.02] border border-black/10 rounded-xl">
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-none"
              />
              <input
                type="text"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="flex-1 bg-transparent outline-none font-mono text-xs uppercase"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Color 2</label>
            <div className="flex gap-2 items-center p-3 bg-black/[0.02] border border-black/10 rounded-xl">
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-none"
              />
              <input
                type="text"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="flex-1 bg-transparent outline-none font-mono text-xs uppercase"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-4">
            <label className="text-sm font-bold">Angle</label>
            <span className="text-sm font-mono">{angle}°</span>
          </div>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={(e) => setAngle(parseInt(e.target.value))}
            className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={randomize}
            className="flex-1 py-4 bg-black/5 text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black/10 transition-all"
          >
            <RefreshCw size={20} />
            Randomize
          </button>
          <button
            onClick={handleCopy}
            className="flex-1 py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black/80 transition-all"
          >
            {copied ? <Check size={20} /> : <Copy size={20} />}
            Copy CSS
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-sm uppercase tracking-wider text-black/40">Preview</h3>
        <div 
          className="w-full aspect-square rounded-[40px] shadow-2xl shadow-black/10 flex items-center justify-center relative overflow-hidden"
          style={{ background: gradient }}
        >
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30">
            <Palette size={32} className="text-white" />
          </div>
        </div>
        <div className="p-4 bg-black/[0.02] border border-black/5 rounded-2xl font-mono text-[10px] break-all">
          {cssCode}
        </div>
      </div>
    </div>
  );
};
