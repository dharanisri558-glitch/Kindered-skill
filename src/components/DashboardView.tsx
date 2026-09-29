import React from 'react';
import { useApp } from '../context/AppContext';
import { HERO_IMAGE } from '../data/mockData';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  MessageSquare, 
  Repeat, 
  Star,
  Users,
  Search,
  Plus
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    currentUser, 
    appointments, 
    updateAppointmentStatus, 
    setReviewingAppointment, 
    setActiveTab, 
    getOrCreateConversation,
    setInspectingUserId,
    setIsAiChatOpen
  } = useApp();

  const userAppointments = appointments.filter(
    a => a.proposerId === currentUser.id || a.receiverId === currentUser.id
  );

  const upcomingAppointments = userAppointments.filter(
    a => a.status === 'Confirmed' || a.status === 'Pending'
  );

  const completedAppointments = userAppointments.filter(
    a => a.status === 'Completed'
  );

  const handleMarkComplete = (apt: any) => {
    updateAppointmentStatus(apt.id, 'Completed');
    setReviewingAppointment(apt);
  };

  const handleOpenChat = (partnerId: string) => {
    getOrCreateConversation(partnerId);
    setActiveTab('messages');
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. Hero Campaign Banner (Split layout with 16:9 imagery) */}
      <section className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
              <span>Local Mutual Aid</span>
              <span aria-hidden="true">·</span>
              <span>Zero Financial Cost</span>
              <span aria-hidden="true">·</span>
              <span>Direct Peer-to-Peer</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Trade your craft, learn something new, empower your neighborhood.
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl">
              KindredSkill connects neighbours for 1-to-1 skill bartering. Share sourdough baking for guitar lessons, or web development for permaculture gardening. No money changes hands—only authentic human knowledge.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('search')}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Explore Local Skills</span>
              </button>

              <button
                onClick={() => setActiveTab('my-skills')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-semibold rounded-xl border border-slate-200/80 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>List a Skill I Offer</span>
              </button>

              <button
                onClick={() => setIsAiChatOpen(true)}
                className="px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-xl border border-emerald-200 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Ask AI Guide</span>
              </button>
            </div>

            <div className="pt-2 flex items-center gap-6 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Resident Reviews</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Repeat className="w-4 h-4 text-emerald-600" />
                <span>1:1 Fair Hour Ledger</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 h-64 sm:h-80 lg:h-full min-h-[300px] relative overflow-hidden bg-slate-100">
            <img 
              src={HERO_IMAGE} 
              alt="Neighbors exchanging pottery and craft skills at a sunlit community workshop"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden" />
          </div>
        </div>
      </section>

      {/* 2. Key Activity Metrics Row */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Hours Shared</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900">
            {currentUser.hoursGiven} hrs
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Taught to neighbors
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Hours Received</span>
            <Repeat className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900">
            {currentUser.hoursReceived} hrs
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Learned from community
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Completed Swaps</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900">
            {currentUser.completedSwapsCount}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Verified exchanges
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
          <div className="text-xs text-slate-500 font-medium flex items-center justify-between">
            <span>Trust Score</span>
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900 flex items-center gap-1">
            <span>{currentUser.trustScore}</span>
            <span className="text-sm font-normal text-slate-400">/ 5.0</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Based on {currentUser.reviewCount} neighbor reviews
          </div>
        </div>
      </section>

      {/* 3. Fair Hour Exchange Ledger & Reciprocity Bar */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Community Reciprocity Balance
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Every hour you gift to someone gives you credit to learn from anyone in our neighborhood.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Healthy 1:1 Balance Ratio</span>
          </div>
        </div>

        <div className="pt-5 space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-emerald-700">Hours Given: {currentUser.hoursGiven} hrs</span>
              <span className="text-slate-600">Hours Received: {currentUser.hoursReceived} hrs</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
              <div 
                className="bg-emerald-600 h-full transition-all duration-500"
                style={{ width: `${Math.min(100, (currentUser.hoursGiven / (currentUser.hoursGiven + currentUser.hoursReceived || 1)) * 100)}%` }}
              />
              <div 
                className="bg-emerald-400 h-full transition-all duration-500"
                style={{ width: `${Math.min(100, (currentUser.hoursReceived / (currentUser.hoursGiven + currentUser.hoursReceived || 1)) * 100)}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="font-semibold text-slate-900 block">Response Reliability</span>
              <span className="text-slate-500 mt-0.5 block">{currentUser.responseRatePercent}% response rate ({currentUser.averageResponseTime})</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="font-semibold text-slate-900 block">Neighborhood Base</span>
              <span className="text-slate-500 mt-0.5 block">{currentUser.neighborhood}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
              <span className="font-semibold text-slate-900 block">Active Offerings</span>
              <span className="text-slate-500 mt-0.5 block">{currentUser.skillsOffered.length} skills ready to share</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Upcoming Exchange Appointments */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Upcoming Exchange Appointments
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Confirmed and pending sessions scheduled with neighborhood partners.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('search')}
            className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <span>Schedule New Swap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {upcomingAppointments.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
            <Calendar className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-semibold text-slate-800">No appointments scheduled</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Find a skill you want to learn or message an interested neighbour to schedule your next zero-cost exchange.
            </p>
            <button
              onClick={() => setActiveTab('search')}
              className="mt-2 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Browse Local Skills
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingAppointments.map((apt) => {
              const isProposer = apt.proposerId === currentUser.id;
              const partnerId = isProposer ? apt.receiverId : apt.proposerId;
              const partnerName = isProposer ? apt.receiverName : apt.proposerName;
              const partnerAvatar = isProposer ? apt.receiverAvatar : apt.proposerAvatar;

              return (
                <div 
                  key={apt.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => {
                          setInspectingUserId(partnerId);
                          setActiveTab('profile');
                        }}
                        className="relative group focus:outline-none"
                      >
                        <img 
                          src={partnerAvatar} 
                          alt={partnerName}
                          referrerPolicy="no-referrer"
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-emerald-500 transition-all"
                        />
                      </button>
                      <div>
                        <button 
                          onClick={() => {
                            setInspectingUserId(partnerId);
                            setActiveTab('profile');
                          }}
                          className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors block text-left"
                        >
                          {partnerName}
                        </button>
                        <div className="text-xs text-slate-500 flex items-center gap-2">
                          <span>{apt.format}</span>
                          <span aria-hidden="true">·</span>
                          <span>{apt.durationMinutes} mins</span>
                        </div>
                      </div>
                    </div>

                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                      apt.status === 'Confirmed' 
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}>
                      {apt.status}
                    </span>
                  </div>

                  {/* Skills traded box */}
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-500">You Teach:</span>
                      <span className="font-semibold text-slate-900 truncate max-w-[200px]">
                        {isProposer ? apt.offeredSkillTitle : apt.requestedSkillTitle}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700">
                      <span className="text-slate-500">You Learn:</span>
                      <span className="font-semibold text-emerald-700 truncate max-w-[200px]">
                        {isProposer ? apt.requestedSkillTitle : apt.offeredSkillTitle}
                      </span>
                    </div>
                  </div>

                  {/* Appointment details */}
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-800">{apt.dateTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{apt.location}</span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
                    <button
                      onClick={() => handleOpenChat(partnerId)}
                      className="flex-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Message Partner</span>
                    </button>

                    <button
                      onClick={() => handleMarkComplete(apt)}
                      className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Done & Review</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. Earned Badges & Trust Milestones */}
      <section className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>Earned Community Badges & Trust Milestones</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Community badges are earned automatically through verified swaps and punctuality.
            </p>
          </div>
          <div className="text-xs font-mono font-semibold text-slate-600">
            {currentUser.badges.filter(b => b.isUnlocked).length} / {currentUser.badges.length} Unlocked
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentUser.badges.map(badge => (
            <div 
              key={badge.id}
              className={`p-4 rounded-xl border transition-all ${
                badge.isUnlocked
                  ? 'bg-emerald-50/50 border-emerald-200'
                  : 'bg-slate-50/70 border-slate-200 opacity-80'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  badge.isUnlocked
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-200 text-slate-400'
                }`}>
                  {badge.iconName === 'Sparkles' && <Sparkles className="w-5 h-5" />}
                  {badge.iconName === 'ShieldCheck' && <ShieldCheck className="w-5 h-5" />}
                  {badge.iconName === 'Clock' && <Clock className="w-5 h-5" />}
                  {badge.iconName === 'Layers' && <Repeat className="w-5 h-5" />}
                  {badge.iconName === 'Award' && <Award className="w-5 h-5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {badge.name}
                    </h3>
                    {badge.isUnlocked && (
                      <span className="text-[10px] font-bold uppercase text-emerald-700">
                        Earned
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                    {badge.description}
                  </p>

                  {!badge.isUnlocked && badge.totalNeeded && (
                    <div className="mt-2.5 space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                        <span>Progress</span>
                        <span>{badge.currentCount} / {badge.totalNeeded}</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-600 h-full"
                          style={{ width: `${badge.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {badge.isUnlocked && badge.unlockedAt && (
                    <div className="mt-2 text-[11px] text-slate-400">
                      Unlocked on {badge.unlockedAt}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Neighborhood Swap Principles */}
      <section className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
        <div className="max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Neighborhood Ethos
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
            How KindredSkill protects local trust
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
            We are not a gig marketplace. We operate on direct human exchange, respect, and zero financial transactions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-1.5">
            <div className="text-emerald-400 text-sm font-bold">1. Zero Financial Cost</div>
            <p className="text-xs text-slate-300 leading-normal">
              No tips, fees, or bartering money. 1 hour of teaching is exchanged for 1 hour of learning.
            </p>
          </div>

          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-1.5">
            <div className="text-emerald-400 text-sm font-bold">2. Verified Reciprocal Reviews</div>
            <p className="text-xs text-slate-300 leading-normal">
              Ratings can only be posted after a real exchange appointment has taken place.
            </p>
          </div>

          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-1.5">
            <div className="text-emerald-400 text-sm font-bold">3. Local Safety First</div>
            <p className="text-xs text-slate-300 leading-normal">
              Meet in public neighborhood spots: local libraries, community gardens, or community makerspaces.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
