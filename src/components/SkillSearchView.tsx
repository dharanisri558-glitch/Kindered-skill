import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_META } from '../data/mockData';
import { SkillCategory, TeachingFormat, SkillItem, UserProfile } from '../types';
import { 
  Search, 
  MapPin, 
  Star, 
  Sparkles, 
  MessageSquare, 
  Calendar, 
  Filter, 
  Repeat, 
  CheckCircle2,
  Clock
} from 'lucide-react';

export const SkillSearchView: React.FC = () => {
  const { 
    users, 
    currentUser, 
    selectedCategory, 
    setSelectedCategory, 
    setProposeSwapPartner, 
    getOrCreateConversation, 
    setActiveTab,
    setInspectingUserId
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('All');
  const [onlyReciprocalMatches, setOnlyReciprocalMatches] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);

  // Extract all neighborhoods
  const neighborhoods = useMemo(() => {
    const list = Array.from(new Set(users.map(u => u.neighborhood)));
    return ['All', ...list];
  }, [users]);

  // Aggregate all skills offered by neighbors (excluding current user)
  const allOfferings = useMemo(() => {
    const items: { user: UserProfile; skill: SkillItem }[] = [];
    users.forEach(u => {
      if (u.id === currentUser.id) return;
      u.skillsOffered.forEach(skill => {
        items.push({ user: u, skill });
      });
    });
    return items;
  }, [users, currentUser.id]);

  // Check if a skill match is reciprocal with current user's wants or offers
  const checkReciprocity = (partner: UserProfile, skill: SkillItem) => {
    // Does current user want this skill?
    const userWantsThis = currentUser.skillsWanted.some(w => 
      skill.title.toLowerCase().includes(w.title.toLowerCase()) || 
      w.title.toLowerCase().includes(skill.title.toLowerCase()) ||
      w.category === skill.category
    );

    // Does partner want something current user offers?
    const partnerWantsUserOffer = partner.skillsWanted.some(pw => 
      currentUser.skillsOffered.some(co => 
        co.title.toLowerCase().includes(pw.title.toLowerCase()) ||
        pw.title.toLowerCase().includes(co.title.toLowerCase()) ||
        co.category === pw.category
      )
    );

    return {
      isDirectMatch: userWantsThis && partnerWantsUserOffer,
      userWantsThis,
      partnerWantsUserOffer
    };
  };

  // Filter items
  const filteredOfferings = useMemo(() => {
    return allOfferings.filter(({ user, skill }) => {
      // Category filter
      if (selectedCategory !== 'All' && skill.category !== selectedCategory) {
        return false;
      }

      // Format filter
      if (selectedFormat !== 'All' && skill.teachingFormat !== selectedFormat) {
        return false;
      }

      // Neighborhood filter
      if (selectedNeighborhood !== 'All' && user.neighborhood !== selectedNeighborhood) {
        return false;
      }

      // Min rating
      if (minRating > 0 && user.trustScore < minRating) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = skill.title.toLowerCase().includes(q);
        const matchesDesc = skill.description.toLowerCase().includes(q);
        const matchesTags = skill.tags.some(t => t.toLowerCase().includes(q));
        const matchesUser = user.name.toLowerCase().includes(q);
        const matchesCategory = skill.category.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesTags && !matchesUser && !matchesCategory) {
          return false;
        }
      }

      // Reciprocal filter
      if (onlyReciprocalMatches) {
        const { userWantsThis, partnerWantsUserOffer } = checkReciprocity(user, skill);
        if (!userWantsThis && !partnerWantsUserOffer) return false;
      }

      return true;
    });
  }, [allOfferings, selectedCategory, selectedFormat, selectedNeighborhood, minRating, searchQuery, onlyReciprocalMatches, currentUser]);

  const handleStartChat = (user: UserProfile) => {
    getOrCreateConversation(user.id);
    setActiveTab('messages');
  };

  const handleProposeSwap = (user: UserProfile) => {
    setProposeSwapPartner(user);
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header & Search Bar */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Explore Local Community Skills
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse skills taught by neighbors in your area. Every exchange is 1-to-1 reciprocal without any money.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by skill (e.g. Sourdough, Guitar, React, Spanish), keyword, or neighbor name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Segmented Scroll */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold uppercase tracking-wider">Browse by Category</span>
          <span>{CATEGORIES_META.length} Categories</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 pt-1 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
            }`}
          >
            All Categories
          </button>
          {CATEGORIES_META.map(cat => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                selectedCategory === cat.name
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          
          {/* Format selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Format:</span>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none"
            >
              <option value="All">All Formats</option>
              <option value="In-person">In-person</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Online">Online</option>
            </select>
          </div>

          {/* Neighborhood selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Neighborhood:</span>
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none"
            >
              {neighborhoods.map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Rating filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Trust:</span>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-800 focus:outline-none"
            >
              <option value={0}>Any Trust Score</option>
              <option value={4.8}>★ 4.8+ Top Rated</option>
              <option value={5.0}>★ 5.0 Perfect Rating</option>
            </select>
          </div>
        </div>

        {/* Reciprocity toggle button */}
        <button
          onClick={() => setOnlyReciprocalMatches(!onlyReciprocalMatches)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
            onlyReciprocalMatches
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold'
              : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Repeat className="w-3.5 h-3.5 text-emerald-700" />
          <span>Matches My Wishlist</span>
        </button>
      </div>

      {/* Results Count & Active Category Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <span className="font-bold text-slate-800">{filteredOfferings.length}</span> skill offerings
          {selectedCategory !== 'All' && <span> in <strong className="text-emerald-800">{selectedCategory}</strong></span>}
        </div>
        {(selectedCategory !== 'All' || selectedFormat !== 'All' || selectedNeighborhood !== 'All' || minRating > 0 || searchQuery || onlyReciprocalMatches) && (
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedFormat('All');
              setSelectedNeighborhood('All');
              setMinRating(0);
              setSearchQuery('');
              setOnlyReciprocalMatches(false);
            }}
            className="text-emerald-700 hover:underline font-medium"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Skill Cards Grid */}
      {filteredOfferings.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
          <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No skill matches found</h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Try broadening your search term or reset your neighborhood and category filters to discover more community gifts.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedFormat('All');
              setSelectedNeighborhood('All');
              setSearchQuery('');
              setMinRating(0);
              setOnlyReciprocalMatches(false);
            }}
            className="mt-2 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Show All Available Skills
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOfferings.map(({ user, skill }) => {
            const reciprocity = checkReciprocity(user, skill);

            return (
              <div
                key={skill.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-3">
                  
                  {/* Reciprocal match callout (if applicable) */}
                  {reciprocity.isDirectMatch && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-semibold">
                      <Repeat className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>Direct Reciprocal Match! You both have what each wants.</span>
                    </div>
                  )}

                  {/* Neighbor header */}
                  <div className="flex items-start justify-between gap-3">
                    <button
                      onClick={() => {
                        setInspectingUserId(user.id);
                        setActiveTab('profile');
                      }}
                      className="flex items-center gap-3 text-left group focus:outline-none"
                    >
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-emerald-500 transition-all"
                      />
                      <div>
                        <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors flex items-center gap-1.5">
                          <span>{user.name}</span>
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span className="truncate max-w-[150px]">{user.neighborhood}</span>
                        </div>
                      </div>
                    </button>

                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1 text-xs font-mono font-bold text-slate-900">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{user.trustScore}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {user.completedSwapsCount} swaps
                      </div>
                    </div>
                  </div>

                  {/* Skill Title & Category */}
                  <div className="pt-1">
                    <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wide">
                      {skill.category}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5 leading-snug">
                      {skill.title}
                    </h3>
                  </div>

                  {/* Clean unboxed metadata with typographic separators (Anti-slop zero pill rule) */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span>{skill.experienceLevel || 'Experienced'}</span>
                    <span aria-hidden="true">·</span>
                    <span>{skill.teachingFormat}</span>
                    {skill.sessionDurationMin && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>{skill.sessionDurationMin} mins / session</span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {skill.description}
                  </p>

                  {/* Clean unboxed tags */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                    {skill.tags.map((tag, idx) => (
                      <React.Fragment key={tag}>
                        <span className="text-slate-600">#{tag}</span>
                        {idx < skill.tags.length - 1 && <span aria-hidden="true" className="text-slate-300">·</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Partner's wishlist */}
                  {user.skillsWanted.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
                      <div className="text-[11px] font-semibold text-slate-500 mb-1">
                        Looking to learn in exchange:
                      </div>
                      <div className="space-y-1">
                        {user.skillsWanted.slice(0, 2).map(w => (
                          <div key={w.id} className="text-xs text-slate-700 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <span className="truncate">{w.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Card Action footer */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => handleProposeSwap(user)}
                    className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Repeat className="w-3.5 h-3.5" />
                    <span>Propose Swap</span>
                  </button>

                  <button
                    onClick={() => handleStartChat(user)}
                    className="py-2 px-3 bg-white hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 flex items-center justify-center gap-1.5 transition-colors"
                    title="Send instant message"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Message</span>
                  </button>

                  <button
                    onClick={() => {
                      setInspectingUserId(user.id);
                      setActiveTab('profile');
                    }}
                    className="py-2 px-2.5 text-xs text-slate-500 hover:text-slate-800 font-medium"
                    title="View Full Profile"
                  >
                    Profile
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
