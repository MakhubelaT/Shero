import React from 'react';
import { SheroLogo } from './SheroLogo';
import { Search, Plus, X } from 'lucide-react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenAddModal: () => void;
  onLogoClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenAddModal,
  onLogoClick
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#12071D]/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 h-20 sm:h-24">
          
          {/* Brand & Directory Title Zone */}
          <div 
            onClick={onLogoClick}
            className="flex items-center gap-3 sm:gap-4 cursor-pointer shrink-0 group py-1"
          >
            <SheroLogo size="md" variant="teal" />
            
            {/* Elegant vertical divider */}
            <div className="hidden md:block h-8 w-[1px] bg-white/15" />

            <div className="hidden md:flex flex-col">
              <span className="font-display font-bold text-sm tracking-wide text-white group-hover:text-[#3EA6B0] transition-colors whitespace-nowrap">
                Business Directory
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                Member Enterprises
              </span>
            </div>
          </div>

          {/* Search Bar Zone */}
          <div className="flex-1 max-w-md mx-2 sm:mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search business or specialty..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/10 focus:border-[#3EA6B0] focus:ring-1 focus:ring-[#3EA6B0] text-xs sm:text-sm text-white placeholder:text-slate-400 outline-none transition-all"
                aria-label="Search businesses"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Action Zone: Add Your Business */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#2A7F86] to-[#1E6066] hover:from-[#3397A0] hover:to-[#2A7F86] text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md shadow-[#2A7F86]/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden xs:inline sm:inline">Add Your Business</span>
              <span className="inline xs:hidden sm:hidden">Add</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
