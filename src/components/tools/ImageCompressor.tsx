import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { Download, Upload, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { cn } from '../../utils';

export const ImageCompressor: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [quality, setQuality] = useState(0.8);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setOriginalFile(file);
      compress(file, quality);
    }
  };

  // @ts-ignore
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    multiple: false
  });

  const compress = async (file: File, q: number) => {
    setLoading(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: q
      };
      const compressed = await imageCompression(file, options);
      setCompressedFile(compressed);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (compressedFile) {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(compressedFile);
      link.download = `compressed_${originalFile?.name}`;
      link.click();
    }
  };

  return (
    <div className="space-y-8">
      <div 
        {...getRootProps()} 
        className={cn(
          "border-2 border-dashed rounded-3xl p-12 text-center transition-all cursor-pointer",
          isDragActive ? "border-black bg-black/5" : "border-black/10 hover:border-black/20"
        )}
      >
        <input {...getInputProps()} />
        <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload size={32} className="text-black/40" />
        </div>
        <p className="text-lg font-bold">Drop your image here</p>
        <p className="text-sm text-black/40">Compress JPG, PNG, or WebP</p>
      </div>

      {originalFile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-black/40">Settings</h3>
            <div className="p-6 bg-black/[0.02] rounded-3xl border border-black/5 space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-bold">Quality</label>
                  <span className="text-sm font-mono">{Math.round(quality * 100)}%</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="1.0" 
                  step="0.1" 
                  value={quality}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setQuality(val);
                    compress(originalFile, val);
                  }}
                  className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-black/60">Original Size:</span>
                  <span className="font-mono">{(originalFile.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                {compressedFile && (
                  <div className="flex justify-between text-sm">
                    <span className="text-black/60">Compressed Size:</span>
                    <span className="font-mono text-emerald-600">{(compressedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                )}
                {compressedFile && (
                  <div className="flex justify-between text-sm font-bold">
                    <span>Reduction:</span>
                    <span className="text-emerald-600">
                      {Math.round((1 - compressedFile.size / originalFile.size) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={handleDownload}
                disabled={loading || !compressedFile}
                className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black/80 disabled:opacity-50 transition-all"
              >
                {loading ? <RefreshCw className="animate-spin" size={20} /> : <Download size={20} />}
                Download Compressed
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider text-black/40">Preview</h3>
            <div className="aspect-square bg-black/[0.02] rounded-3xl border border-black/5 flex items-center justify-center overflow-hidden relative">
              {loading ? (
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw className="animate-spin text-black/20" size={32} />
                  <p className="text-xs text-black/40 font-bold uppercase">Compressing...</p>
                </div>
              ) : compressedFile ? (
                <img 
                  src={URL.createObjectURL(compressedFile)} 
                  alt="Preview" 
                  className="w-full h-full object-contain"
                />
              ) : (
                <ImageIcon size={48} className="text-black/10" />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
