import React, { useState } from 'react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState('');

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    chars: text.length,
    charsNoSpaces: text.replace(/\s/g, '').length,
    lines: text.trim() ? text.split('\n').length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200)
  };

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full h-64 p-4 bg-black/[0.02] border border-black/10 rounded-2xl outline-none focus:border-black transition-all resize-none text-sm leading-relaxed"
      />

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {[
          { label: 'Words', value: stats.words },
          { label: 'Characters', value: stats.chars },
          { label: 'Lines', value: stats.lines },
          { label: 'Reading Time', value: `${stats.readingTime}m` },
          { label: 'No Spaces', value: stats.charsNoSpaces },
        ].map((stat, idx) => (
          <div key={idx} className="p-4 bg-white border border-black/5 rounded-2xl text-center shadow-sm">
            <div className="text-xl font-black tracking-tighter">{stat.value}</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-black/40">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
