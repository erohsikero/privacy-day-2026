
import React, { useState, useCallback, useRef } from 'react';
import Layout from './components/Layout';
import { AppState, ExifData } from './types';
import { parseExif } from './services/exifService';
import MetadataResult from './components/MetadataResult';
import { Upload, ShieldAlert, Fingerprint, EyeOff, Loader2, ArrowRight } from 'lucide-react';
// @ts-ignore
import heic2any from 'heic2any';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if it's an image or specifically a HEIC file which might not have a proper mime type in all browsers
    const isHeic = file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif') || file.type === 'image/heic' || file.type === 'image/heif';
    
    if (!file.type.startsWith('image/') && !isHeic) {
      setError('Please upload a valid image file (JPEG, PNG, HEIC).');
      setState(AppState.ERROR);
      return;
    }

    setState(AppState.PROCESSING);
    setError('');

    try {
      let previewBlob: Blob | File = file;

      // HEIC conversion for browser preview
      if (isHeic) {
        try {
          const result = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 0.8
          });
          previewBlob = Array.isArray(result) ? result[0] : result;
        } catch (convErr) {
          console.error("HEIC preview conversion failed:", convErr);
          // We'll proceed with the original file; if the browser can't render it, the image preview will just be broken/alt text.
        }
      }

      const url = URL.createObjectURL(previewBlob);
      setImageUrl(url);

      // We parse metadata from the ORIGINAL file to ensure no data is lost during preview conversion
      const data = await parseExif(file);
      setExifData(data);
      setState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError('Failed to process image metadata.');
      setState(AppState.ERROR);
    }
  }, []);

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-durham-green text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <Fingerprint className="w-full h-full transform scale-150 rotate-12" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              Your pictures expose <br/><span className="text-green-400 italic underline decoration-wavy">your location.</span>
            </h1>
            <p className="text-lg md:text-xl text-green-100 mb-8 max-w-xl leading-relaxed">
              Every photo you take contains hidden "EXIF" metadata. It can reveal where you live, what device you use, and exactly when you were there. 
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={triggerUpload}
                disabled={state === AppState.PROCESSING}
                className="bg-white text-durham-green hover:bg-green-50 transition px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {state === AppState.PROCESSING ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Upload />
                )}
                Check Your Photo
              </button>
              <input 
                type="file" 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileUpload}
                accept="image/jpeg,image/png,image/heic,image/heif"
              />
              <a href="#about" className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold border border-white/30 hover:bg-white/10 transition">
                How it works <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Checker Section */}
      <div id="checker" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-20">
        {state === AppState.IDLE && (
          <div className="bg-white p-12 rounded-2xl shadow-xl border border-gray-100 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="w-10 h-10 text-durham-green" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Analysis</h2>
            <p className="text-gray-600 max-w-lg mx-auto">
              Upload a photo from your camera roll. We will parse the EXIF data right in your browser. 
              Nothing is uploaded to our servers.
            </p>
          </div>
        )}

        {state === AppState.PROCESSING && (
          <div className="bg-white p-20 rounded-2xl shadow-xl border border-gray-100 text-center animate-pulse">
            <Loader2 className="w-12 h-12 text-durham-green animate-spin mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900">Decoding Metadata...</h2>
            <p className="text-gray-500">Scanning binary headers for GPS coordinates and camera tags.</p>
          </div>
        )}

        {state === AppState.ERROR && (
          <div className="bg-red-50 p-12 rounded-2xl shadow-xl border border-red-100 text-center">
            <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-red-900 mb-2">Analysis Failed</h2>
            <p className="text-red-700 mb-6">{error}</p>
            <button 
              onClick={triggerUpload}
              className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700 transition"
            >
              Try Another Image
            </button>
          </div>
        )}

        {state === AppState.RESULT && exifData && (
          <MetadataResult data={exifData} imageUrl={imageUrl} />
        )}
      </div>

      {/* Educational Section */}
      <section id="about" className="bg-gray-50 py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-durham-green text-sm font-bold uppercase tracking-widest mb-3">Education</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">Why Privacy Matters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <EyeOff className="text-durham-green" />
              </div>
              <h4 className="text-xl font-bold mb-4">Invisible Footprints</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                EXIF (Exchangeable Image File Format) is data automatically attached to your photos. 
                Even if you can't see it, hackers and trackers can.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Fingerprint className="text-durham-green" />
              </div>
              <h4 className="text-xl font-bold mb-4">Digital Fingerprints</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                Your camera model and software version are unique identifiers. 
                They can be used to link multiple photos to the same physical device.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <ShieldAlert className="text-durham-green" />
              </div>
              <h4 className="text-xl font-bold mb-4">Protect Yourself</h4>
              <p className="text-gray-600 leading-relaxed text-sm">
                Before posting online, use a "Metadata Scrubber" or turn off "Location Tags" in your camera settings to stay safe.
              </p>
            </div>
          </div>
          
          <div className="mt-16 bg-durham-green rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-white">
              <h4 className="text-2xl font-bold mb-2 uppercase tracking-wide">Data Privacy Day</h4>
              <p className="text-green-100 max-w-lg">
                Join the global effort to create a culture of privacy. Awareness starts with knowing what you're sharing.
              </p>
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="bg-white text-durham-green px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition"
            >
              Test Your Media Now
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default App;
