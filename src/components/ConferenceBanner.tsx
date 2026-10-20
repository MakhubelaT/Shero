import React, { useState } from 'react';
import { Calendar, MapPin, Sparkles, X, Heart, Users, ChevronRight, Award } from 'lucide-react';

interface ConferenceBannerProps {
  onExploreClick?: () => void;
  onAddBusinessClick?: () => void;
}

export const ConferenceBanner: React.FC<ConferenceBannerProps> = ({
  onExploreClick,
  onAddBusinessClick
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="relative overflow-hidden pt-6 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Background ambient radial glow matching WOW 2026 conference artwork */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E0287D]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#2A7F86]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-[#DFB15B]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Main 2-Column Hero & Poster Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Value Proposition & Tagline */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10 space-y-6">
            
            {/* Conference Badge Kicker */}
            <div 
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#2A7F86]/25 to-[#E0287D]/25 border border-[#2A7F86]/40 text-xs font-semibold text-slate-200 cursor-pointer hover:border-[#DFB15B]/60 transition-colors shadow-sm group"
            >
              <span className="w-2 h-2 rounded-full bg-[#DFB15B] animate-ping" />
              <span className="text-[#DFB15B] font-display font-bold">UPCOMING EVENT</span>
              <span className="text-slate-400">·</span>
              <span className="group-hover:text-white transition-colors">Annual SheRoes Women's Forum 2026 Conference</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
              Discover & support <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#3EA6B0] via-[#FF458F] to-[#DFB15B] bg-clip-text text-transparent">
                women-owned businesses
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Welcome to the official business directory of the <strong className="text-white font-semibold">SHERO Women's Forum</strong>.
              Connect directly with visionary founders, attorneys, educators, designers, and engineers who are leading industries and transforming our communities.
            </p>

            {/* Key Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#2A7F86] to-[#1E6066] hover:from-[#3397A0] hover:to-[#2A7F86] text-white font-medium text-sm transition-all shadow-lg shadow-[#2A7F86]/25 hover:shadow-[#2A7F86]/40 cursor-pointer flex items-center gap-2 group"
              >
                <span>Browse Directory</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onAddBusinessClick}
                className="px-5 py-3 rounded-xl bg-[#1D0D2E] hover:bg-[#26123D] border border-white/10 hover:border-[#DFB15B]/50 text-slate-200 hover:text-white font-medium text-sm transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#DFB15B]" />
                <span>List Your Business</span>
              </button>

              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-3 rounded-xl text-xs font-semibold text-[#DFB15B] hover:text-[#F4CF74] transition-colors underline underline-offset-4 cursor-pointer"
              >
                View Conference Details →
              </button>
            </div>

            {/* Key Community Metric Indicators */}
            <div className="pt-4 border-t border-white/10 w-full grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold font-display text-white tabular-nums">100%</p>
                <p className="text-xs text-slate-400">Women-Led Network</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-display text-[#3EA6B0] tabular-nums">5+ Sectors</p>
                <p className="text-xs text-slate-400">Legal, Tech, Fashion</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-display text-[#DFB15B] tabular-nums">23–25 Oct</p>
                <p className="text-xs text-slate-400">WOW 2026 Conference</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Conference Poster Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl p-[2px] bg-gradient-to-b from-[#DFB15B] via-[#E0287D] to-[#2A7F86] shadow-2xl shadow-[#E0287D]/20 transform transition-all hover:scale-[1.01]">
              
              {/* Poster Body */}
              <div className="relative rounded-[14px] bg-[#170A24] overflow-hidden p-6 text-white">
                
                {/* Background decorative artwork lines */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3C1258] via-[#1A0A2B] to-[#10061A] opacity-90" />
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#E0287D]/30 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-[#2A7F86]/30 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
                  
                  {/* Poster Header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#2A7F86]/30 border border-[#2A7F86] flex items-center justify-center">
                        <Award className="w-4 h-4 text-[#DFB15B]" />
                      </div>
                      <div>
                        <p className="text-[10px] tracking-widest text-[#3EA6B0] uppercase font-bold">SHERO Presents</p>
                        <p className="text-xs font-semibold text-white">Annual Ladies Gathering</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DFB15B]/20 border border-[#DFB15B]/40 text-[#DFB15B]">
                      2026
                    </span>
                  </div>

                  {/* Conference Marquee: WOW */}
                  <div className="text-center py-2 space-y-1">
                    <p className="text-xs font-semibold tracking-[0.25em] text-[#DFB15B] uppercase">
                      Annual SheRoes Women's Forum 2026 Conference
                    </p>
                    <h2 className="text-5xl sm:text-6xl font-black font-display tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#DFB15B] via-[#FF458F] to-[#FFFFFF] drop-shadow-sm">
                      WOW
                    </h2>
                    <p className="text-sm sm:text-base font-extrabold tracking-widest uppercase text-white font-display">
                      Women Owning Worth
                    </p>
                    <p className="text-xs text-slate-300 italic pt-1 max-w-xs mx-auto">
                      "Stepping boldly into our divine identity, entrepreneurial strength, and economic worth."
                    </p>
                  </div>

                  {/* Date & Location Pill Cards */}
                  <div className="space-y-2.5 bg-black/35 rounded-xl p-3.5 border border-white/10 text-xs">
                    <div className="flex items-center gap-3 text-slate-200">
                      <div className="w-7 h-7 rounded-lg bg-[#E0287D]/20 text-[#FF458F] flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-slate-400 font-medium">Conference Dates</p>
                        <p className="font-semibold text-white">23–25 October 2026</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-slate-200">
                      <div className="w-7 h-7 rounded-lg bg-[#2A7F86]/20 text-[#3EA6B0] flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-slate-400 font-medium">Venue</p>
                        <p className="font-semibold text-white">Gateway Church International</p>
                      </div>
                    </div>
                  </div>

                  {/* Poster CTA button */}
                  <button
                    onClick={() => setShowModal(true)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#E0287D] to-[#991552] hover:from-[#FF458F] hover:to-[#E0287D] text-white text-xs font-bold tracking-wide uppercase shadow-lg shadow-[#E0287D]/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>View Conference Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Conference Details Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl bg-[#170A24] border border-[#DFB15B]/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-white overflow-y-auto max-h-[90vh]">
            
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DFB15B]/20 text-[#DFB15B] border border-[#DFB15B]/40">
                  ANNUAL EVENT 2026
                </span>
                <span className="text-xs text-[#3EA6B0] font-semibold">SHERO Women's Forum</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  WOW – Women Owning Worth
                </h3>
                <p className="text-[#FF458F] font-semibold text-sm mt-1">
                  Annual SheRoes Women's Forum 2026 Conference
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#DFB15B] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Dates</h4>
                    <p className="text-sm font-bold text-white">23–25 October 2026</p>
                    <p className="text-xs text-slate-300">Friday evening to Sunday close</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#3EA6B0] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Location</h4>
                    <p className="text-sm font-bold text-white">Gateway Church International</p>
                    <p className="text-xs text-slate-300">Main Auditorium & Conference Hall</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold font-display uppercase tracking-wider text-[#DFB15B]">
                  About The Conference
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  The <strong className="text-white">WOW – Women Owning Worth Conference</strong> is the flagship annual empowerment gathering of the SHERO Women's Forum. It unites female entrepreneurs, corporate professionals, community pioneers, and mentors for three life-shifting days of business acceleration, spiritual renewal, and sisterhood.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold font-display uppercase tracking-wider text-[#3EA6B0]">
                  Conference Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <Heart className="w-4 h-4 text-[#FF458F] mb-1.5" />
                    <p className="text-xs font-bold text-white">Owning Your Worth</p>
                    <p className="text-[11px] text-slate-400 mt-1">Personal growth, leadership mindset & identity.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <Sparkles className="w-4 h-4 text-[#DFB15B] mb-1.5" />
                    <p className="text-xs font-bold text-white">Business Masterclasses</p>
                    <p className="text-[11px] text-slate-400 mt-1">Legal compliance, branding, scaling & engineering.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <Users className="w-4 h-4 text-[#3EA6B0] mb-1.5" />
                    <p className="text-xs font-bold text-white">Marketplace Expo</p>
                    <p className="text-[11px] text-slate-400 mt-1">Live exhibition of SHERO directory businesses.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
                <p className="text-xs text-slate-400 text-center sm:text-left">
                  Interested in exhibiting or attending? Contact the forum secretariat.
                </p>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <a
                    href="mailto:admin@kephakatiattorneys.com?subject=Inquiry:%20WOW%20Annual%20SheRoes%20Ladies%20Conference%202026"
                    className="flex-1 sm:flex-none text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2A7F86] to-[#1E6066] text-white text-xs font-bold transition-all hover:brightness-110 shadow-md"
                  >
                    Contact Organizers
                  </a>
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-xs font-semibold hover:bg-white/15 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};
