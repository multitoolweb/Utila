import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Download, Files, RefreshCw, X, FileText } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { cn } from '../../utils';

export const PDFMerger: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  };

  // @ts-ignore
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] }
  });

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const mergePDFs = async () => {
    if (files.length < 2) return;
    setMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();
      
      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'merged_document.pdf';
      link.click();
    } catch (error) {
      console.error(error);
    } finally {
      setMerging(false);
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
          <Files size={32} className="text-black/40" />
        </div>
        <p className="text-lg font-bold">Drop PDF files here to merge</p>
        <p className="text-sm text-black/40">Select two or more PDF documents</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">Selected Documents ({files.length})</h3>
            <button
              onClick={mergePDFs}
              disabled={merging || files.length < 2}
              className="px-6 py-3 bg-black text-white rounded-xl font-bold flex items-center gap-2 hover:bg-black/80 disabled:opacity-50 transition-all"
            >
              {merging ? <RefreshCw className="animate-spin" size={18} /> : <Download size={18} />}
              Merge & Download
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-black/[0.02] border border-black/5 rounded-2xl group">
                <div className="flex items-center gap-4 overflow-hidden">
                  <div className="w-10 h-10 bg-white rounded-xl border border-black/5 flex items-center justify-center flex-shrink-0">
                    <FileText size={20} className="text-red-500" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold truncate">{file.name}</p>
                    <p className="text-[10px] text-black/40 font-mono uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFile(idx)}
                  className="p-2 hover:bg-red-50 text-black/20 hover:text-red-500 rounded-lg transition-all"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
