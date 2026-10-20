import React from 'react';
import { Business } from '../data/businesses';
import { 
  Scale, 
  Sparkles, 
  GraduationCap, 
  Gem, 
  Wrench, 
  ArrowUpRight,
  Mail,
  Globe,
  Phone,
  Megaphone,
  Building2
} from 'lucide-react';

interface BusinessCardProps {
  business: Business;
  onSelect: (id: string) => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, onSelect }) => {
  // Extract initials for placeholder
  const getInitials = (name: string): string => {
    return name
      .replace(/\(.*?\)/g, '')
      .split(' ')
      .filter(w => w.length > 0 && !['inc', 'pty', 'ltd', '&'].includes(w.toLowerCase()))
      .slice(0, 2)
      .map(w => w[0].toUpperCase())
      .join('') || name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(business.name);

  // Category specific accent & icon
  const getCategoryMeta = (category: string) => {
    switch (category) {
      case 'Legal':
        return {
          icon: Scale,
          color: 'text-[#DFB15B]',
          bgGradient: 'from-[#1E0B36] via-[#1E6066]/30 to-[#12071D]',
          borderColor: 'group-hover:border-[#DFB15B]/40'
        };
      case 'Cosmetics':
        return {
          icon: Sparkles,
          color: 'text-[#FF458F]',
          bgGradient: 'from-[#2A0E38] via-[#E0287D]/30 to-[#12071D]',
          borderColor: 'group-hover:border-[#FF458F]/40'
        };
      case 'Education':
        return {
          icon: GraduationCap,
          color: 'text-[#3EA6B0]',
          bgGradient: 'from-[#141C38] via-[#2A7F86]/30 to-[#12071D]',
          borderColor: 'group-hover:border-[#3EA6B0]/40'
        };
      case 'Fashion & Jewelry':
        return {
          icon: Gem,
          color: 'text-[#DFB15B]',
          bgGradient: 'from-[#301036] via-[#DFB15B]/30 to-[#12071D]',
          borderColor: 'group-hover:border-[#DFB15B]/40'
        };
      case 'Engineering':
        return {
          icon: Wrench,
          color: 'text-[#3EA6B0]',
          bgGradient: 'from-[#112433] via-[#2A7F86]/30 to-[#12071D]',
          borderColor: 'group-hover:border-[#3EA6B0]/40'
        };
      case 'Marketing & Branding':
        return {
          icon: Megaphone,
          color: 'text-[#DFB15B]',
          bgGradient: 'from-[#2F1030] via-[#DFB15B]/30 to-[#12071D]',
          borderColor: 'group-hover:border-[#DFB15B]/40'
        };
      default:
        return {
          icon: Building2,
          color: 'text-slate-300',
          bgGradient: 'from-[#1E0B36] via-[#2A7F86]/20 to-[#12071D]',
          borderColor: 'group-hover:border-[#2A7F86]/40'
        };
    }
  };

  const meta = getCategoryMeta(business.category);
  const CategoryIcon = meta.icon;

  return (
    <article 
      onClick={() => onSelect(business.id)}
      className={`group relative flex flex-col justify-between rounded-2xl bg-[#1B0D2B]/90 hover:bg-[#24113A] border border-white/10 ${meta.borderColor} transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#12071D]/80 cursor-pointer overflow-hidden p-5`}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(business.id);
        }
      }}
      aria-label={`View details for ${business.name}`}
    >
      {/* Top Media / Picture Section */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-[#2A7F86]/30 to-[#1A0A2A] border border-white/5 flex items-center justify-center">
        {business.image ? (
          <img
            src={business.image}
            alt={`${business.name} logo`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={(e) => {
              // Graceful fallback to stylish initials placeholder if image fails
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        ) : (
          /* Stylish Placeholder with initials on teal/purple gradient background */
          <div className={`w-full h-full bg-gradient-to-tr ${meta.bgGradient} flex flex-col items-center justify-center relative p-4 select-none`}>
            {/* Subtle background category watermark icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
              <CategoryIcon className="w-28 h-28 text-white" />
            </div>

            {/* Glowing Initials Badge */}
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2A7F86] to-[#E0287D] p-[1.5px] shadow-lg shadow-black/40 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-[14px] bg-[#12071D] flex items-center justify-center">
                <span className="font-display font-extrabold text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-br from-white via-[#F4CF74] to-[#3EA6B0]">
                  {initials}
                </span>
              </div>
            </div>

            <span className="relative z-10 text-[11px] font-medium text-slate-300 mt-2 tracking-wide uppercase">
              {business.category}
            </span>
          </div>
        )}

        {/* Floating Quick Action indicator */}
        <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-white transition-opacity">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed clean category tag per constitutional guidelines */}
          <div className="flex items-center gap-1.5 text-xs mb-1.5">
            <span className={`font-semibold tracking-wide ${meta.color}`}>
              {business.category}
            </span>
            {business.featured && (
              <>
                <span className="text-slate-600" aria-hidden="true">·</span>
                <span className="text-[11px] text-[#DFB15B] font-medium">Featured Member</span>
              </>
            )}
          </div>

          {/* Business Name Heading */}
          <h3 className="font-display font-bold text-lg text-white group-hover:text-[#3EA6B0] transition-colors line-clamp-1 leading-snug">
            {business.name}
          </h3>

          {/* Business Description snippet */}
          <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
            {business.description}
          </p>
        </div>

        {/* Footer Contact Signals */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-3">
            {business.email && (
              <span className="inline-flex items-center gap-1 text-slate-300 hover:text-white">
                <Mail className="w-3.5 h-3.5 text-[#2A7F86]" />
                <span className="text-[11px]">Email</span>
              </span>
            )}
            {business.website && (
              <span className="inline-flex items-center gap-1 text-slate-300 hover:text-white">
                <Globe className="w-3.5 h-3.5 text-[#DFB15B]" />
                <span className="text-[11px]">Web</span>
              </span>
            )}
            {business.phone && (
              <span className="inline-flex items-center gap-1 text-slate-300 hover:text-white">
                <Phone className="w-3.5 h-3.5 text-[#3EA6B0]" />
                <span className="text-[11px]">Call</span>
              </span>
            )}
          </div>

          <span className="text-[11px] font-semibold text-[#3EA6B0] group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
            View Details →
          </span>
        </div>
      </div>
    </article>
  );
};
