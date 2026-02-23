import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, Share2 } from 'lucide-react';

export const QRCodeGenerator: React.FC = () => {
  const [text, setText] = useState('https://omnitool.app');
  const [qrUrl, setQrUrl] = useState('');
  const [color, setColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  useEffect(() => {
    if (text) {
      QRCode.toDataURL(text, {
        width: 400,
        margin: 2,
        color: {
          dark: color,
          light: bgColor
        }
      }).then(setQrUrl);
    }
  }, [text, color, bgColor]);

  const download = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrUrl;
    link.click();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Content (URL or Text)</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 bg-black/[0.02] border border-black/10 rounded-xl outline-none focus:border-black transition-all"
            placeholder="Enter URL or text..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">QR Color</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-none"
              />
              <span className="text-xs font-mono uppercase">{color}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Background</label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-none"
              />
              <span className="text-xs font-mono uppercase">{bgColor}</span>
            </div>
          </div>
        </div>

        <button
          onClick={download}
          className="w-full py-3 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black/80 transition-all"
        >
          <Download size={20} />
          Download PNG
        </button>
      </div>

      <div className="flex flex-col items-center justify-center p-8 bg-black/[0.02] rounded-3xl border border-black/5">
        {qrUrl ? (
          <img src={qrUrl} alt="QR Code" className="w-full max-w-[240px] shadow-xl rounded-xl" />
        ) : (
          <div className="w-48 h-48 bg-black/5 rounded-xl animate-pulse" />
        )}
        <p className="mt-4 text-xs text-black/40 text-center">Scan this code with your camera</p>
      </div>
    </div>
  );
};
