import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { FileText, RefreshCw, Copy, Check, Upload } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { cn } from '../../utils';

export const ImageToText: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
      setText('');
    }
  };

  // @ts-ignore
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    multiple: false
  });

  const extractText = async () => {
    if (!image) return;
    setLoading(true);
    setProgress(0);
    
    try {
      const worker = await createWorker('eng', 1, {
        logger: m => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100));
          }
        }
      });
      const { data: { text } } = await worker.recognize(image);
      setText(text);
      await worker.terminate();
    } catch (error) {
      console.error(error);
      setText('Error extracting text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {!image ? (
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
          <p className="text-lg font-bold">Drop image to extract text</p>
          <p className="text-sm text-black/40">PNG, JPG, or WebP</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-video bg-black/[0.02] rounded-3xl border border-black/5 flex items-center justify-center overflow-hidden relative group">
              <img src={image} alt="Source" className="max-w-full max-h-full object-contain" />
              <button 
                onClick={() => setImage(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Change Image
              </button>
            </div>
            
            {!text && !loading && (
              <button
                onClick={extractText}
                className="w-full py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black/80 transition-all"
              >
                <FileText size={20} />
                Extract Text (OCR)
              </button>
            )}

            {loading && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-black/40">
                  <span>Processing Image...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                  <div className="h-full bg-black transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm uppercase tracking-wider text-black/40">Extracted Text</h3>
              {text && (
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-black/5 rounded-lg text-black/60 transition-colors"
                >
                  {copied ? <Check size={18} className="text-emerald-500" /> : <Copy size={18} />}
                </button>
              )}
            </div>
            <textarea
              value={text}
              readOnly
              placeholder="Extracted text will appear here..."
              className="w-full h-[300px] p-6 bg-black/[0.02] border border-black/10 rounded-3xl outline-none font-mono text-sm resize-none"
            />
          </div>
        </div>
      )}
    </div>
  );
};
