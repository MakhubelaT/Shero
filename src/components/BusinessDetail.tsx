import React, { useState, useRef } from 'react';
import { Business } from '../data/businesses';
import { 
  ArrowLeft, 
  Mail, 
  Globe, 
  Phone,
  Megaphone,
  Instagram, 
  Facebook, 
  Linkedin, 
  MapPin, 
  Building2, 
  Upload, 
  Trash2, 
  Check, 
  ExternalLink,
  Share2,
  Calendar,
  Sparkles,
  Scale,
  GraduationCap,
  Gem,
  Wrench
} from 'lucide-react';

interface BusinessDetailProps {
  business: Business;
  allBusinesses: Business[];
  onBack: () => void;
  onSelectBusiness: (id: string) => void;
  onUpdateBusiness: (updated: Business) => void;
}

export const BusinessDetail: React.FC<BusinessDetailProps> = ({
  business,
  allBusinesses,
  onBack,
  onSelectBusiness,
  onUpdateBusiness,
}) => {
  const [copied, setCopied] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter other businesses for "More businesses" section
  const moreBusinesses = allBusinesses
    .filter(b => b.id !== business.id)
    .slice(0, 4);

  // Category Icon & styling
  const getCategoryMeta = (category: string) => {
    switch (category) {
      case 'Legal':
        return { icon: Scale, color: 'text-[#DFB15B]', badgeBorder: 'border-[#DFB15B]/30' };
      case 'Cosmetics':
        return { icon: Sparkles, color: 'text-[#FF458F]', badgeBorder: 'border-[#FF458F]/30' };
      case 'Education':
        return { icon: GraduationCap, color: 'text-[#3EA6B0]', badgeBorder: 'border-[#3EA6B0]/30' };
      case 'Fashion & Jewelry':
        return { icon: Gem, color: 'text-[#DFB15B]', badgeBorder: 'border-[#DFB15B]/30' };
      case 'Engineering':
        return { icon: Wrench, color: 'text-[#3EA6B0]', badgeBorder: 'border-[#3EA6B0]/30' };
      case 'Marketing & Branding':
        return { icon: Megaphone, color: 'text-[#DFB15B]', badgeBorder: 'border-[#DFB15B]/30' };
      default:
        return { icon: Building2, color: 'text-slate-300', badgeBorder: 'border-white/20' };
    }
  };

  const meta = getCategoryMeta(business.category);
  const CategoryIcon = meta.icon;

  // Handle image upload from user's machine
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        onUpdateBusiness({
          ...business,
          image: base64
        });
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onUpdateBusiness({
      ...business,
      image: ''
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${business.name} | SHERO Women's Forum`,
        text: `Check out ${business.name} in the SHERO Women's Forum Business Directory!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Format website URL nicely
  const getWebsiteUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
  };

  // Primary contact target
  const contactHref = business.email 
    ? `mailto:${business.email}?subject=Inquiry via SHERO Women's Forum Directory` 
    : business.website && business.website.toLowerCase() !== 'none'
    ? getWebsiteUrl(business.website)
    : business.phone
    ? `tel:${business.phone}`
    : undefined;

  // Social URLs
  const getInstagramUrl = (handle?: string) => {
    if (!handle) return '';
    return handle.startsWith('http') ? handle : `https://instagram.com/${handle.replace('@', '')}`;
  };

  const getFacebookUrl = (link?: string) => {
    if (!link) return '';
    return link.startsWith('http') ? link : `https://facebook.com/search/top?q=${encodeURIComponent(link)}`;
  };

  const getLinkedInUrl = (link?: string) => {
    if (!link) return '';
    return link.startsWith('http') ? link : `https://linkedin.com/search/results/all/?keywords=${encodeURIComponent(link)}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-colors border border-white/10 text-sm font-medium cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4" />
              <span>Share Listing</span>
            </>
          )}
        </button>
      </div>

      {/* Main Business Profile Card */}
      <div className="rounded-2xl bg-[#1B0D2B] border border-white/10 overflow-hidden shadow-2xl shadow-black/60">
        
        {/* Banner / Media Section */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[24/9] min-h-[220px] bg-gradient-to-r from-[#170A24] via-[#2A103D] to-[#12071D] overflow-hidden border-b border-white/10 flex items-center justify-center">
          
          {business.image ? (
            <img
              src={business.image}
              alt={`${business.name} banner`}
              className="w-full h-full object-cover"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-tr from-[#150722] via-[#2A7F86]/20 to-[#E0287D]/15">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2A7F86] to-[#E0287D] p-[2px] shadow-xl">
                <div className="w-full h-full rounded-[14px] bg-[#12071D] flex items-center justify-center">
                  <span className="font-display font-black text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4CF74] to-[#3EA6B0]">
                    {business.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-medium">
                {business.category} Enterprise · SHERO Member
              </p>
            </div>
          )}

          {/* Quick upload control right on banner */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-medium inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Replace or upload photo/logo for this business"
            >
              <Upload className="w-3.5 h-3.5 text-[#3EA6B0]" />
              <span>{business.image ? 'Change Photo' : 'Upload Logo / Photo'}</span>
            </button>

            {business.image && (
              <button
                onClick={handleRemoveImage}
                className="p-1.5 rounded-lg bg-black/60 hover:bg-red-500/80 backdrop-blur-md border border-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Remove current image"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {uploadSuccess && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-emerald-500/90 text-white text-xs font-semibold flex items-center gap-1 shadow-lg">
              <Check className="w-3.5 h-3.5" /> Photo updated successfully!
            </div>
          )}
        </div>

        {/* Profile Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Header Block: Title, Category & Primary Action */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold tracking-wider uppercase ${meta.color} flex items-center gap-1.5`}>
                  <CategoryIcon className="w-4 h-4" />
                  {business.category}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400">SHERO Verified Directory Member</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
                {business.name}
              </h1>

              {business.location && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#2A7F86]" />
                  <span>{business.location}</span>
                </div>
              )}
            </div>

            {/* Contact this business CTA */}
            {contactHref && (
              <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-2">
                <a
                  href={contactHref}
                  target={business.email ? undefined : '_blank'}
                  rel={business.email ? undefined : 'noreferrer noopener'}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#2A7F86] to-[#1E6066] hover:from-[#3397A0] hover:to-[#2A7F86] text-white font-semibold text-sm transition-all shadow-lg shadow-[#2A7F86]/25 hover:shadow-[#2A7F86]/40 cursor-pointer flex items-center justify-center gap-2 text-center"
                >
                  <Mail className="w-4 h-4" />
                  <span>Contact this business</span>
                </a>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  {business.email ? 'Direct email link' : 'Official website'}
                </span>
              </div>
            )}
          </div>

          {/* Information Grid: Company Name, E-mail, Website, Description (hide if empty) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Description & Details */}
            <div className="md:col-span-2 space-y-6">
              
              <div>
                <h3 className="text-xs font-bold font-display uppercase tracking-widest text-[#DFB15B] mb-2">
                  Company Description
                </h3>
                <div className="text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-black/20 p-5 rounded-xl border border-white/5">
                  {business.description}
                </div>
              </div>

              {/* Verified SHERO Endorsement Box */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#2A7F86]/10 to-[#E0287D]/10 border border-[#2A7F86]/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#DFB15B] shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300">
                  <strong className="text-white">SHERO Women's Forum Community Listing:</strong> By engaging this business, you actively support female leadership, economic independence, and local enterprise growth.
                </div>
              </div>

            </div>

            {/* Right 1 Col: Key Information Section */}
            <div className="space-y-4 bg-black/30 p-5 rounded-xl border border-white/10 h-fit">
              <h3 className="text-xs font-bold font-display uppercase tracking-widest text-slate-300 pb-2 border-b border-white/10">
                Business Information
              </h3>

              <div className="space-y-3.5 text-xs">
                {/* Company Name */}
                <div>
                  <p className="text-slate-400 text-[11px] uppercase tracking-wider font-medium">Company Name</p>
                  <p className="text-sm font-bold text-white mt-0.5">{business.name}</p>
                </div>

                {/* Category */}
                <div>
                  <p className="text-slate-400 text-[11px] uppercase tracking-wider font-medium">Industry Category</p>
                  <p className="font-semibold text-[#3EA6B0] mt-0.5">{business.category}</p>
                </div>

                {/* E-mail address (Only show if present) */}
                {business.email && (
                  <div>
                    <p className="text-slate-400 text-[11px] uppercase tracking-wider font-medium">E-mail Address</p>
                    <a
                      href={`mailto:${business.email}?subject=Inquiry from SHERO Women's Forum Directory`}
                      className="text-white hover:text-[#3EA6B0] transition-colors break-all flex items-center gap-1.5 mt-0.5 font-medium underline underline-offset-2"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#2A7F86] shrink-0" />
                      <span>{business.email}</span>
                    </a>
                  </div>
                )}

                {/* Website / URL (Only show if present and not 'none') */}
                {business.website && business.website.toLowerCase() !== 'none' && (
                  <div>
                    <p className="text-slate-400 text-[11px] uppercase tracking-wider font-medium">Website</p>
                    <a
                      href={getWebsiteUrl(business.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#DFB15B] hover:text-[#F4CF74] transition-colors break-all flex items-center gap-1.5 mt-0.5 font-medium underline underline-offset-2"
                    >
                      <Globe className="w-3.5 h-3.5 text-[#DFB15B] shrink-0" />
                      <span>{business.website}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>
                  </div>
                )}

                {/* Phone / WhatsApp (Only show if present) */}
                {business.phone && (
                  <div>
                    <p className="text-slate-400 text-[11px] uppercase tracking-wider font-medium">Phone / WhatsApp</p>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <a
                        href={`tel:${business.phone}`}
                        className="text-white hover:text-[#3EA6B0] transition-colors break-all flex items-center gap-1.5 font-medium underline underline-offset-2"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#3EA6B0] shrink-0" />
                        <span>{business.phone}</span>
                      </a>
                      <a
                        href={`https://wa.me/27${business.phone.replace(/^0/, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-emerald-400 hover:text-emerald-300 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                )}

                {/* Social Profiles if present */}
                {(business.instagram || business.facebook || business.linkedin) && (
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-slate-400 text-[11px] uppercase tracking-wider font-medium mb-2">Connect On Social</p>
                    
                    <div className="space-y-2">
                      {business.instagram && (
                        <a
                          href={getInstagramUrl(business.instagram)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-slate-200 hover:text-[#FF458F] transition-colors"
                        >
                          <Instagram className="w-3.5 h-3.5 text-[#FF458F]" />
                          <span>Instagram: @{business.instagram.replace('@', '')}</span>
                        </a>
                      )}

                      {business.facebook && (
                        <a
                          href={getFacebookUrl(business.facebook)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-slate-200 hover:text-[#3EA6B0] transition-colors"
                        >
                          <Facebook className="w-3.5 h-3.5 text-[#3EA6B0]" />
                          <span>Facebook: {business.facebook}</span>
                        </a>
                      )}

                      {business.linkedin && (
                        <a
                          href={getLinkedInUrl(business.linkedin)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-slate-200 hover:text-[#3EA6B0] transition-colors"
                        >
                          <Linkedin className="w-3.5 h-3.5 text-[#3EA6B0]" />
                          <span>LinkedIn: {business.linkedin}</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>

        </div>

      </div>

      {/* "More businesses" row at the bottom */}
      <div className="mt-14 pt-8 border-t border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold font-display text-white">
              More Businesses in Directory
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Explore other female-led enterprises within the SHERO network
            </p>
          </div>
          <button
            onClick={onBack}
            className="text-xs font-semibold text-[#3EA6B0] hover:text-[#DFB15B] transition-colors"
          >
            View all listings →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {moreBusinesses.map(other => (
            <div
              key={other.id}
              onClick={() => onSelectBusiness(other.id)}
              className="p-4 rounded-xl bg-[#1B0D2B] hover:bg-[#26123D] border border-white/10 hover:border-[#3EA6B0]/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-semibold text-[#3EA6B0] uppercase tracking-wider block mb-1">
                  {other.category}
                </span>
                <h4 className="font-display font-bold text-sm text-white group-hover:text-[#3EA6B0] transition-colors line-clamp-1">
                  {other.name}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2 mt-1.5">
                  {other.description}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span>SHERO Member</span>
                <span className="text-[#DFB15B] font-medium group-hover:translate-x-0.5 transition-transform">
                  View →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
