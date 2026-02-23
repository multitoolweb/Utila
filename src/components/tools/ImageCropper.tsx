import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { Download, Crop as CropIcon, RefreshCw } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { cn } from '../../utils';

export const ImageCropper: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState<number | undefined>(4 / 3);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [cropping, setCropping] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.addEventListener('load', () => setImage(reader.result as string));
      reader.readAsDataURL(file);
    }
  };

  // @ts-ignore
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp'] },
    multiple: false
  });

  const onCropComplete = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', (error) => reject(error));
      image.setAttribute('crossOrigin', 'anonymous');
      image.src = url;
    });

  const getCroppedImg = async (imageSrc: string, pixelCrop: any) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return canvas.toDataURL('image/jpeg');
  };

  const handleDownload = async () => {
    if (!image || !croppedAreaPixels) return;
    setCropping(true);
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      if (croppedImage) {
        const link = document.createElement('a');
        link.download = `cropped_${fileName}`;
        link.href = croppedImage;
        link.click();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCropping(false);
    }
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
            <CropIcon size={32} className="text-black/40" />
          </div>
          <p className="text-lg font-bold">Drop your image here to crop</p>
          <p className="text-sm text-black/40">PNG, JPG, or WebP</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative h-[400px] bg-black/5 rounded-3xl overflow-hidden border border-black/5">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 bg-black/[0.02] rounded-3xl border border-black/5 space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-4">Aspect Ratio</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Original', value: undefined },
                      { label: '1:1', value: 1 },
                      { label: '4:3', value: 4 / 3 },
                      { label: '16:9', value: 16 / 9 },
                      { label: '3:2', value: 3 / 2 },
                      { label: '2:3', value: 2 / 3 },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() => setAspect(opt.value)}
                        className={cn(
                          "py-2 text-xs font-bold rounded-lg border transition-all",
                          aspect === opt.value ? "bg-black text-white border-black" : "bg-white border-black/10 text-black/60 hover:border-black/20"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Zoom</label>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleDownload}
                    disabled={cropping}
                    className="flex-1 py-4 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black/80 disabled:opacity-50 transition-all"
                  >
                    {cropping ? <RefreshCw className="animate-spin" size={20} /> : <Download size={20} />}
                    Download Cropped
                  </button>
                  <button
                    onClick={() => setImage(null)}
                    className="px-6 py-4 bg-black/5 text-black rounded-2xl font-bold hover:bg-black/10 transition-all"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-8 bg-black/[0.02] rounded-3xl border border-black/5 flex flex-col items-center justify-center text-center">
              <CropIcon size={48} className="text-black/10 mb-4" />
              <h3 className="font-bold">Crop Instructions</h3>
              <p className="text-sm text-black/40 mt-2">
                Drag the image to position it within the frame. Use the slider to zoom in or out. Select an aspect ratio for precise cropping.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
