import React, { useState } from 'react';
import { Pipette, Copy, Check } from 'lucide-react';

export const ColorPicker: React.FC = () => {
  const [color, setColor] = useState('#6366f1');
  const [copied, setCopied] = useState<string | null>(null);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const hexToHsl = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  const formats = [
    { label: 'HEX', value: color.toUpperCase() },
    { label: 'RGB', value: hexToRgb(color) },
    { label: 'HSL', value: hexToHsl(color) },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="flex flex-col items-center gap-8">
        <div 
          className="w-full aspect-square rounded-[40px] shadow-2xl shadow-black/10 flex items-center justify-center relative overflow-hidden group"
          style={{ backgroundColor: color }}
        >
          <input 
            type="color" 
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <Pipette size={32} className="text-white" />
          </div>
        </div>
        <p className="text-sm font-medium text-black/40">Click the square to pick a color</p>
      </div>

      <div className="space-y-6 flex flex-col justify-center">
        {formats.map((f) => (
          <div key={f.label} className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-black/40">{f.label}</label>
            <div className="flex items-center justify-between p-4 bg-black/[0.02] border border-black/5 rounded-2xl group hover:border-black/20 transition-all">
              <span className="font-mono font-bold">{f.value}</span>
              <button 
                onClick={() => handleCopy(f.value)}
                className="p-2 hover:bg-black/5 rounded-xl transition-colors"
              >
                {copied === f.value ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} className="text-black/20 group-hover:text-black/60" />}
              </button>
            </div>
          </div>
        ))}

        <div className="pt-6 grid grid-cols-5 gap-2">
          {['#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6', '#d946ef', '#ec4899'].map(c => (
            <button 
              key={c}
              onClick={() => setColor(c)}
              className="aspect-square rounded-lg border border-black/5 transition-transform hover:scale-110"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
