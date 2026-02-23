import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Download, Image as ImageIcon, X } from 'lucide-react';
import { cn } from '../../utils';

export const ImageConverter: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [format, setFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [converting, setConverting] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  // @ts-ignore
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    multiple: true
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const convertAndDownload = async (file: File) => {
    setConverting(true);
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      await new Promise((resolve) => (img.onload = resolve));

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);

      const dataUrl = canvas.toDataURL(`image/${format}`);
      const link = document.createElement('a');
      link.download = `${file.name.split('.')[0]}.${format}`;
      link.href = dataUrl;
      link.click();
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div 
        {...getRootProps()} 
        className={cn(
          "border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer",
          isDragActive ? "border-black bg-black/5" : "border-black/10 hover:border-black/20"
        )}
      >
        <input {...getInputProps()} />
        <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <ImageIcon size={24} className="text-black/40" />
        </div>
        <p className="font-medium">Drag & drop images here, or click to select</p>
        <p className="text-xs text-black/40 mt-1">Supports PNG, JPG, WebP, etc.</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">Selected Files ({files.length})</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm text-black/60">Convert to:</span>
              <select 
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="bg-white border border-black/10 rounded-lg px-2 py-1 text-sm outline-none focus:border-black"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPG</option>
                <option value="webp">WebP</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-black/[0.02] rounded-xl border border-black/5">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 bg-white rounded-lg border border-black/5 flex items-center justify-center flex-shrink-0">
                    <ImageIcon size={16} className="text-black/20" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-black/40">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => convertAndDownload(file)}
                    disabled={converting}
                    className="p-2 hover:bg-black/5 rounded-lg text-emerald-600 transition-colors"
                  >
                    <Download size={18} />
                  </button>
                  <button 
                    onClick={() => removeFile(idx)}
                    className="p-2 hover:bg-black/5 rounded-lg text-red-500 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
