import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Business, 
  CATEGORIES, 
  getStoredBusinesses, 
  saveStoredBusinesses 
} from './data/businesses';
import { Navbar } from './components/Navbar';
import { ConferenceBanner } from './components/ConferenceBanner';
import { BusinessCard } from './components/BusinessCard';
import { BusinessDetail } from './components/BusinessDetail';
import { AddBusinessModal } from './components/AddBusinessModal';
import { Footer } from './components/Footer';
import { 
  Building2, 
  Filter, 
  Sparkles, 
  Search, 
  Plus, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [businesses, setBusinesses] = useState<Business[]>(() => getStoredBusinesses());
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const directoryRef = useRef<HTMLDivElement>(null);

  // Sync route with URL path, query params & hash for robust direct links
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const searchParams = new URLSearchParams(window.location.search);

      let businessIdMatch: string | null = null;

      // 1. Direct path /business/:id (e.g. /business/mcc-engineering)
      if (path.includes('/business/')) {
        const parts = path.split('/business/');
        if (parts[1]) {
          businessIdMatch = parts[1].split('/')[0].split('?')[0].trim();
        }
      }
      // 2. Hash route #/business/:id
      else if (hash.includes('/business/')) {
        const parts = hash.split('/business/');
        if (parts[1]) {
          businessIdMatch = parts[1].split('/')[0].split('?')[0].trim();
        }
      }
      // 3. Query parameter ?business=:id
      else if (searchParams.get('business')) {
        businessIdMatch = searchParams.get('business')!.trim();
      }

      if (businessIdMatch) {
        setSelectedBusinessId(businessIdMatch);
      } else {
        setSelectedBusinessId(null);
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Synchronize document title with current view / business name
  useEffect(() => {
    if (selectedBusinessId) {
      const match = businesses.find(b => b.id === selectedBusinessId);
      if (match) {
        document.title = `${match.name} | SHERO Business Directory – WOW 2026`;
        return;
      }
    }
    document.title = 'SHERO Business Directory – WOW 2026';
  }, [selectedBusinessId, businesses]);

  // Update URL using pushState for clean /business/:id direct URLs
  const navigateToBusiness = (id: string) => {
    setSelectedBusinessId(id);
    const targetUrl = `/business/${id}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState({ businessId: id }, '', targetUrl);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDirectory = () => {
    setSelectedBusinessId(null);
    if (window.location.pathname !== '/' || window.location.hash) {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to directory grid
  const scrollToDirectory = () => {
    if (selectedBusinessId) {
      navigateToDirectory();
    }
    setTimeout(() => {
      directoryRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Handle business update (e.g. image upload/replacement)
  const handleUpdateBusiness = (updated: Business) => {
    const nextList = businesses.map(b => b.id === updated.id ? updated : b);
    setBusinesses(nextList);
    saveStoredBusinesses(nextList);
  };

  // Handle adding new business
  const handleAddBusiness = (newBusiness: Business) => {
    const nextList = [newBusiness, ...businesses];
    setBusinesses(nextList);
    saveStoredBusinesses(nextList);
    navigateToBusiness(newBusiness.id);
  };

  // Reset to default sample businesses if desired
  const handleResetDefaults = () => {
    localStorage.removeItem('shero_directory_businesses_v2');
    const defaults = getStoredBusinesses();
    setBusinesses(defaults);
    setSelectedBusinessId(null);
    navigateToDirectory();
  };

  // Dynamic categories list (including any custom categories added)
  const availableCategories = useMemo(() => {
    const categoriesSet = new Set<string>(CATEGORIES);
    businesses.forEach(b => {
      if (b.category) categoriesSet.add(b.category);
    });
    return Array.from(categoriesSet);
  }, [businesses]);

  // Filtered businesses
  const filteredBusinesses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return businesses.filter(b => {
      // Category match
      const categoryMatches = selectedCategory === 'All' || b.category.toLowerCase() === selectedCategory.toLowerCase();
      if (!categoryMatches) return false;

      // Search query match
      if (!query) return true;

      const nameMatch = b.name.toLowerCase().includes(query);
      const descMatch = b.description.toLowerCase().includes(query);
      const categoryTextMatch = b.category.toLowerCase().includes(query);
      const locationMatch = b.location ? b.location.toLowerCase().includes(query) : false;

      return nameMatch || descMatch || categoryTextMatch || locationMatch;
    });
  }, [businesses, selectedCategory, searchQuery]);

  // Current selected business object
  const currentBusiness = useMemo(() => {
    if (!selectedBusinessId) return null;
    return businesses.find(b => 
      b.id === selectedBusinessId || 
      (selectedBusinessId === 'edgar-highveld' && b.id === 'edgars-highveld')
    ) || null;
  }, [businesses, selectedBusinessId]);

  return (
    <div className="min-h-screen bg-[#12071D] text-slate-100 flex flex-col selection:bg-[#2A7F86] selection:text-white">
      
      {/* Top Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={query => {
          setSearchQuery(query);
          if (selectedBusinessId) {
            navigateToDirectory();
          }
        }}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onLogoClick={navigateToDirectory}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentBusiness ? (
          /* Business Detail Page */
          <BusinessDetail
            business={currentBusiness}
            allBusinesses={businesses}
            onBack={navigateToDirectory}
            onSelectBusiness={navigateToBusiness}
            onUpdateBusiness={handleUpdateBusiness}
          />
        ) : selectedBusinessId ? (
          /* Graceful Direct Link Fallback (No 404) */
          <div className="max-w-xl mx-auto px-4 py-20 text-center animate-fade-in">
            <div className="p-8 rounded-2xl bg-[#1B0D2B] border border-white/10 shadow-2xl">
              <div className="w-14 h-14 rounded-2xl bg-[#DFB15B]/15 text-[#DFB15B] flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold font-display text-white">
                Listing Not Found
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                The business listing you requested (<span className="text-white font-medium">"{selectedBusinessId}"</span>) was not found in the directory or may have been updated.
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={navigateToDirectory}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2A7F86] to-[#1E6066] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Browse All Businesses
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Landing Page */
          <>
            {/* Hero Conference Promotion Banner */}
            <ConferenceBanner
              onExploreClick={scrollToDirectory}
              onAddBusinessClick={() => setIsAddModalOpen(true)}
            />

            {/* Business Directory Section */}
            <section 
              ref={directoryRef}
              id="directory"
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 scroll-mt-24"
            >
              {/* Directory Section Header & Category Filter Chips */}
              <div className="space-y-6 mb-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#2A7F86]" />
                      <span className="text-xs font-bold font-display uppercase tracking-widest text-[#3EA6B0]">
                        Member Directory
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
                      Explore Member Enterprises
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      Support women-owned law firms, beauty studios, specialized academies, fashion lines, and engineering pioneers.
                    </p>
                  </div>

                  {/* Active Count & Quick Reset */}
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="tabular-nums">
                      Showing <strong className="text-white">{filteredBusinesses.length}</strong> of {businesses.length} businesses
                    </span>
                    <button
                      onClick={handleResetDefaults}
                      title="Reset to initial 5 directory listings"
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors"
                      aria-label="Reset default listings"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Category Filter Chips per Constitutional Functional Filter Controls */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {availableCategories.map(cat => {
                    const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer shrink-0 border ${
                          isActive
                            ? 'bg-gradient-to-r from-[#2A7F86] to-[#1E6066] border-[#3EA6B0] text-white shadow-md shadow-[#2A7F86]/30'
                            : 'bg-[#1B0D2B] border-white/10 text-slate-300 hover:text-white hover:bg-[#25123A]'
                        }`}
                        aria-pressed={isActive}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Responsive Grid of Business Cards */}
              {filteredBusinesses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredBusinesses.map(business => (
                    <BusinessCard
                      key={business.id}
                      business={business}
                      onSelect={navigateToBusiness}
                    />
                  ))}
                </div>
              ) : (
                /* Empty Search / Filter State */
                <div className="rounded-2xl bg-[#1B0D2B] border border-white/10 p-12 text-center max-w-md mx-auto my-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-slate-400 mb-4">
                    <Search className="w-6 h-6 text-[#DFB15B]" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-white">
                    No businesses found
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    No directory listings matched "<span className="text-white font-medium">{searchQuery || selectedCategory}</span>". Try adjusting your search query or switching category filters.
                  </p>
                  <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer"
                    >
                      Reset Filters
                    </button>
                    <button
                      onClick={() => setIsAddModalOpen(true)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2A7F86] to-[#1E6066] text-xs font-bold text-white transition-all shadow-md cursor-pointer"
                    >
                      Add This Business
                    </button>
                  </div>
                </div>
              )}
            </section>
          </>
        )}
      </main>

      {/* Footer with QR Code & SHERO info */}
      <Footer />

      {/* Add Business Modal */}
      <AddBusinessModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddBusiness}
      />

    </div>
  );
}
