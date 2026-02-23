import React, { useState } from 'react';
import { Download, Maximize, RefreshCw } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { cn } from '../../utils';

export const ImageResizer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [originalRatio, setOriginalRatio] = useState(1);
  const [resizing, setResizing] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      const url = URL.createObjectURL(file);
      setPreview(url);
      
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setOriginalRatio(img.width / img.height);
      };
      img.src = url;
    }
  };

  // @ts-ignore
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    multiple: false
  });

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (maintainAspectRatio) {
      setHeight(Math.round(val / originalRatio));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (maintainAspectRatio) {
      setWidth(Math.round(val * originalRatio));
    }
  };

  const resizeAndDownload = async () => {
    if (!file || !preview) return;
    setResizing(true);
    
    const img = new Image();
    img.src = preview;
    await new Promise(resolve => img.onload = resolve);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0, width, height);

    const link = document.createElement('a');
    link.download = `resized_${file.name}`;
    link.href = canvas.toDataURL(file.type);
    link.click();
    setResizing(false);
  };

  return (
    <div className="space-y-8">
      {!file ? (
        <div 
          {...getRootProps()} 
          className={cn(
            "border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer",
            isDragActive ? "border-black bg-black/5" : "border-black/10 hover:border-black/20"
          )}
        >
          <input {...getInputProps()} />
          <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Maximize size={32} className="text-black/40" />
          </div>
          <p className="text-lg font-bold">Drop your image here to resize</p>
          <p className="text-sm text-black/40">PNG, JPG, or WebP</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="p-6 bg-black/[0.02] rounded-3xl border border-black/5 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Width (px)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                    className="w-full p-3 bg-white border border-black/10 rounded-xl outline-none focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Height (px)</label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                    className="w-full p-3 bg-white border border-black/10 rounded-xl outline-none focus:border-black"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="w-5 h-5 accent-black rounded-lg"
                />
                <span className="text-sm font-bold">Maintain Aspect Ratio</span>
              </label>

              <div className="pt-4 flex gap-2">
                <button
                  onClick={resizeAndDownload}
                  disabled={resizing}
                  className="flex-1 py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black/80 disabled:opacity-50 transition-all"
                >
                  {resizing ? <RefreshCw className="animate-spin" size={20} /> : <Download size={20} />}
                  Download Resized
                </button>
                <button
                  onClick={() => { setFile(null); setPreview(null); }}
                  className="px-6 py-4 bg-black/5 text-black rounded-2xl font-bold hover:bg-black/10 transition-all"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-black/40">Preview</h3>
            <div className="aspect-square bg-black/[0.02] rounded-3xl border border-black/5 flex items-center justify-center overflow-hidden">
              <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
