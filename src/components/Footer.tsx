import React, { useState, useEffect } from 'react';
import { SheroLogo } from './SheroLogo';
import { Download, Sparkles, Heart, Calendar, MapPin, Copy, Check, Smartphone, QrCode } from 'lucide-react';

export const Footer: React.FC = () => {
  // Read from public/qr-code.png as requested for easy swap
  const qrImageUrl = '/qr-code.png';
  const [platformUrl, setPlatformUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    const url = typeof window !== 'undefined' 
      ? (window.location.origin + window.location.pathname)
      : 'https://ais-pre-qq7gacx2hkh34ezllzbg6t-809531542484.europe-west2.run.app';
    setPlatformUrl(url);
  }, []);

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.download = 'qr-code.png';
    link.href = qrImageUrl;
    link.click();
  };

  const handleCopyLink = () => {
    if (!platformUrl) return;
    navigator.clipboard.writeText(platformUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="relative mt-20 bg-[#0E0517] border-t border-white/10 text-slate-400 overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#2A7F86]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 left-10 w-80 h-80 bg-[#E0287D]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Col 1: SHERO Brand & Forum Mission */}
          <div className="md:col-span-5 space-y-4">
            <SheroLogo size="lg" variant="teal" />
            
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm pt-2">
              <strong className="text-white">SHERO Women's Forum</strong> is dedicated to mobilizing, connecting, and celebrating female entrepreneurs, professionals, and change-makers. We believe in the power of sisterhood and economic self-determination.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#DFB15B] font-medium pt-1">
              <Sparkles className="w-4 h-4 text-[#DFB15B]" />
              <span>Building generational wealth and leadership</span>
            </div>

            <p className="text-xs text-slate-400 pt-2 font-display">
              © 2026 SHERO Women's Forum. All rights reserved.
            </p>
          </div>

          {/* Col 2: Annual Conference Spotlight */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold font-display uppercase tracking-widest text-[#DFB15B]">
              Annual SheRoes Women's Forum Conference
            </h4>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
              <p className="font-extrabold text-white text-sm">
                WOW – Women Owning Worth
              </p>
              <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                <Calendar className="w-3.5 h-3.5 text-[#FF458F]" />
                <span>23–25 October 2026</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-[11px]">
                <MapPin className="w-3.5 h-3.5 text-[#3EA6B0]" />
                <span>Gateway Church International</span>
              </div>
              <p className="text-[11px] text-slate-400 pt-1 italic">
                Join hundreds of women owning their worth and breaking barriers.
              </p>
            </div>
          </div>

          {/* Col 3: Live Generated Platform QR Code */}
          <div className="md:col-span-4 flex flex-col items-start sm:items-end">
            <div className="p-4 rounded-2xl bg-gradient-to-b from-white/10 to-white/5 border border-[#2A7F86]/40 shadow-xl flex flex-col items-center text-center max-w-[240px] w-full">
              
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#3EA6B0] uppercase tracking-wider mb-2">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Platform QR Code</span>
              </div>

              {/* Scannable QR Image Box */}
              <div 
                onClick={() => setShowQrModal(true)}
                className="w-40 h-48 bg-white p-2.5 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition-transform relative group flex items-center justify-center overflow-hidden"
                title="Click to enlarge platform QR code"
              >
                <img
                  src={qrImageUrl}
                  alt="Scan to open SHERO Business Directory platform"
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/aistudio/QR_Code_13b5b77f.png';
                  }}
                />
                
                <div className="absolute inset-0 bg-black/50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[11px] font-bold">
                  Tap to Enlarge
                </div>
              </div>

              {/* Caption */}
              <p className="text-xs font-semibold text-white mt-3 leading-snug">
                Scan to open this platform <br />
                <span className="text-[#DFB15B]">on your phone</span>
              </p>

              {/* Quick Actions: Download & Copy */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={handleDownloadQr}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] text-slate-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                  title="Download platform QR code image"
                >
                  <Download className="w-3 h-3 text-[#3EA6B0]" />
                  <span>Download</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] text-slate-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                  title="Copy direct web link"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#DFB15B]" />
                      <span>Link</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left">
            Official Directory of Women-Owned Enterprises · Witbank & South Africa
          </p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Powered by</span>
            <Heart className="w-3 h-3 text-[#FF458F] inline fill-[#FF458F]" />
            <span className="text-white font-medium">SHERO Sisterhood</span>
          </div>
        </div>

      </div>

      {/* Enlarged QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-[#170A24] border border-[#2A7F86]/50 rounded-2xl p-6 sm:p-8 text-center max-w-sm w-full text-white shadow-2xl">
            <h3 className="text-xl font-bold font-display text-white mb-1">
              Scan Platform QR Code
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Open your smartphone camera and point it at this QR code to load the SHERO Business Directory.
            </p>

            <div className="w-64 h-80 mx-auto bg-white p-3 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
              <img
                src={qrImageUrl}
                alt="SHERO Platform QR Code"
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/aistudio/QR_Code_13b5b77f.png';
                }}
              />
            </div>

            <div className="mt-4 p-2 rounded-lg bg-black/40 border border-white/10 text-[11px] text-slate-300 truncate max-w-full">
              {platformUrl}
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={handleDownloadQr}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2A7F86] to-[#1E6066] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Image</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy URL'}</span>
              </button>
              <button
                onClick={() => setShowQrModal(false)}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
