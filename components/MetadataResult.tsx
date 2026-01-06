
import React from 'react';
import { ExifData } from '../types';
import { MapPin, Camera, Calendar, HardDrive, AlertTriangle, CheckCircle } from 'lucide-react';

interface MetadataResultProps {
  data: ExifData;
  imageUrl: string;
}

const MetadataResult: React.FC<MetadataResultProps> = ({ data, imageUrl }) => {
  const hasLocation = data.latitude !== undefined && data.longitude !== undefined;
  
  return (
    <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side: Image Preview & Map */}
        <div className="p-6 bg-gray-50 flex flex-col gap-6">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-sm bg-black flex items-center justify-center">
            <img src={imageUrl} alt="Uploaded preview" className="max-h-full max-w-full object-contain" />
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-1 rounded-md uppercase tracking-widest font-bold">
              Image Analysis
            </div>
          </div>

          {hasLocation ? (
            <div className="flex-grow min-h-[300px] rounded-xl overflow-hidden relative shadow-inner border border-gray-200 bg-gray-200">
              <iframe
                title="Location Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://maps.google.com/maps?q=${data.latitude},${data.longitude}&z=15&t=k&output=embed`}
              ></iframe>
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg animate-bounce"></div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur shadow-lg p-3 rounded-lg border border-red-100">
                <div className="flex items-center gap-2 text-red-600 font-bold text-sm mb-1">
                  <AlertTriangle size={16} />
                  Location Detected!
                </div>
                <p className="text-gray-600 text-[11px] leading-tight">
                  Anyone who has this image file can see exactly where it was taken: 
                  <span className="font-mono ml-1">{data.latitude?.toFixed(5)}, {data.longitude?.toFixed(5)}</span>
                </p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${data.latitude},${data.longitude}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-2 inline-block text-[10px] text-blue-600 font-bold hover:underline"
                >
                  VIEW ON GOOGLE MAPS →
                </a>
              </div>
            </div>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center p-12 bg-green-50 border border-green-100 rounded-xl text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-green-800 font-bold text-lg">No GPS Data Found</h3>
              <p className="text-green-600 text-sm max-w-xs">
                Good news! This specific image doesn't appear to have geotags embedded.
              </p>
            </div>
          )}
        </div>

        {/* Right Side: Technical Specs */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Embedded Metadata</h2>
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${hasLocation ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {hasLocation ? 'Privacy Warning' : 'Safe to share'}
            </div>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="flex items-center gap-2 text-durham-green font-bold text-xs uppercase tracking-widest mb-4">
                <Camera size={16} /> Camera Info
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="block text-[10px] text-gray-400 uppercase font-semibold">Make</span>
                  <span className="text-sm font-medium text-gray-700">{data.make || 'Unknown'}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="block text-[10px] text-gray-400 uppercase font-semibold">Model</span>
                  <span className="text-sm font-medium text-gray-700">{data.model || 'Unknown'}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="block text-[10px] text-gray-400 uppercase font-semibold">Exposure</span>
                  <span className="text-sm font-medium text-gray-700">{data.exposureTime || 'N/A'}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <span className="block text-[10px] text-gray-400 uppercase font-semibold">ISO</span>
                  <span className="text-sm font-medium text-gray-700">{data.iso || 'N/A'}</span>
                </div>
              </div>
            </section>

            <section>
              <h3 className="flex items-center gap-2 text-durham-green font-bold text-xs uppercase tracking-widest mb-4">
                <Calendar size={16} /> Timestamp
              </h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="block text-[10px] text-gray-400 uppercase font-semibold">Date & Time Captured</span>
                <span className="text-sm font-medium text-gray-700">{data.dateTime || 'Unknown'}</span>
              </div>
            </section>

            <section>
              <h3 className="flex items-center gap-2 text-durham-green font-bold text-xs uppercase tracking-widest mb-4">
                <HardDrive size={16} /> System Info
              </h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="block text-[10px] text-gray-400 uppercase font-semibold">Processing Software</span>
                <span className="text-sm font-medium text-gray-700">{data.software || 'Original Source'}</span>
              </div>
            </section>

            {hasLocation && (
              <div className="mt-8 p-4 bg-red-50 rounded-xl border border-red-100">
                <h4 className="text-red-800 font-bold text-sm mb-2">Why is this dangerous?</h4>
                <p className="text-red-700 text-xs leading-relaxed">
                  Smartphones and digital cameras automatically save the GPS coordinates of where you took a photo. 
                  When you upload these photos to social media or send them via email, 
                  you may be accidentally sharing your home address or location history.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetadataResult;
