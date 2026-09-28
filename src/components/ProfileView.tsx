import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Star, 
  MapPin, 
  Clock, 
  Repeat, 
  ShieldCheck, 
  Calendar, 
  Award, 
  Sparkles, 
  MessageSquare, 
  Edit3, 
  ArrowLeft,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { EditProfileModal } from './EditProfileModal';

export const ProfileView: React.FC = () => {
  const { 
    currentUser, 
    users, 
    inspectingUserId, 
    setInspectingUserId, 
    setProposeSwapPartner, 
    getOrCreateConversation, 
    setActiveTab, 
    reviews,
    setReviewingAppointment
  } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Target profile: either the inspected user or current user
  const profileUser = inspectingUserId 
    ? (users.find(u => u.id === inspectingUserId) || currentUser)
    : currentUser;

  const isOwnProfile = profileUser.id === currentUser.id;

  // Filter reviews for this user
  const userReviews = reviews.filter(r => r.targetUserId === profileUser.id);

  // Calculate average sub-ratings
  const avgPunctuality = userReviews.length > 0
    ? (userReviews.reduce((acc, r) => acc + r.punctualityRating, 0) / userReviews.length).toFixed(1)
    : '5.0';

  const avgKnowledge = userReviews.length > 0
    ? (userReviews.reduce((acc, r) => acc + r.knowledgeRating, 0) / userReviews.length).toFixed(1)
    : '5.0';

  const avgFriendliness = userReviews.length > 0
    ? (userReviews.reduce((acc, r) => acc + r.friendlinessRating, 0) / userReviews.length).toFixed(1)
    : '5.0';

  const handleStartChat = () => {
    getOrCreateConversation(profileUser.id);
    setActiveTab('messages');
  };

  const handleProposeSwap = () => {
    setProposeSwapPartner(profileUser);
  };

  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      
      {/* Back button if inspecting another user */}
      {!isOwnProfile && (
        <button
          onClick={() => setInspectingUserId(null)}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Profile</span>
        </button>
      )}

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img 
                src={profileUser.avatar} 
                alt={profileUser.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-slate-100 shadow-xs" 
              />
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs shadow">
                ✓
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {profileUser.name}
                </h1>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified Local
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profileUser.neighborhood}, {profileUser.city}</span>
                </div>
                <span aria-hidden="true">·</span>
                <div>Resident since {profileUser.joinedDate}</div>
              </div>

              <div className="flex items-center gap-3 pt-1 text-xs">
                <div className="flex items-center gap-1 font-mono font-bold text-slate-900">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>{profileUser.trustScore}</span>
                  <span className="font-normal text-slate-400">({profileUser.reviewCount} reviews)</span>
                </div>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <div className="text-emerald-700 font-medium">
                  {profileUser.responseRatePercent}% response rate
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {isOwnProfile ? (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex-1 sm:flex-initial px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-slate-200/80 transition-colors"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <>
                <button
                  onClick={handleProposeSwap}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <Repeat className="w-4 h-4" />
                  <span>Propose Skill Swap</span>
                </button>
                <button
                  onClick={handleStartChat}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-200/80 transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Message</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Bio */}
        <div className="pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {profileUser.bio}
        </div>

        {/* Schedule & Exchange Preferences */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Availability & Preferred Hours
            </span>
            <span className="text-xs font-medium text-slate-800 block">
              {profileUser.availability}
            </span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Contact Preference
            </span>
            <span className="text-xs font-medium text-slate-800 block">
              {profileUser.contactPreference} (Response time: {profileUser.averageResponseTime})
            </span>
          </div>
        </div>

        {/* Ledger Statistics */}
        <div className="grid grid-cols-3 gap-3 pt-2 text-center">
          <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-900">
              {profileUser.hoursGiven} hrs
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
              Taught (Given)
            </div>
          </div>

          <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-900">
              {profileUser.hoursReceived} hrs
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
              Learned (Received)
            </div>
          </div>

          <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-900">
              {profileUser.completedSwapsCount}
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
              Verified Swaps
            </div>
          </div>
        </div>

      </div>

      {/* Earned Badges Showcase */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-600" />
          <span>Earned Community Trust Badges</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {profileUser.badges.filter(b => b.isUnlocked).map(badge => (
            <div key={badge.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-slate-900">{badge.name}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Offered & Wanted Split Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Skills Offered */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Skills Offered ({profileUser.skillsOffered.length})
            </h2>
            <span className="text-xs text-slate-400">Available to swap</span>
          </div>

          <div className="space-y-3">
            {profileUser.skillsOffered.map(skill => (
              <div key={skill.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{skill.title}</h3>
                  <span className="text-[11px] font-semibold text-emerald-800">{skill.category}</span>
                </div>
                <div className="text-xs text-slate-500">
                  {skill.experienceLevel} · {skill.teachingFormat} · {skill.sessionDurationMin} mins
                </div>
                <p className="text-xs text-slate-600">{skill.description}</p>
                <div className="flex flex-wrap gap-1 text-[11px] text-slate-400">
                  {skill.tags.map(t => `#${t}`).join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Skills Wanted ({profileUser.skillsWanted.length})
            </h2>
            <span className="text-xs text-slate-400">Learning wishlist</span>
          </div>

          <div className="space-y-3">
            {profileUser.skillsWanted.map(skill => (
              <div key={skill.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/60 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{skill.title}</h3>
                  <span className="text-[11px] font-semibold text-slate-500">{skill.category}</span>
                </div>
                <div className="text-xs text-slate-500">
                  Format: {skill.teachingFormat} · Interest: {skill.urgency || 'Dedicated'}
                </div>
                <p className="text-xs text-slate-600">{skill.description}</p>
                <div className="flex flex-wrap gap-1 text-[11px] text-slate-400">
                  {skill.tags.map(t => `#${t}`).join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Verified Community Reviews & Trust Score Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Reliable Community Trust & Rating System</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified evaluations left by local neighbours after completing reciprocal swap sessions.
            </p>
          </div>

          {!isOwnProfile && (
            <button
              onClick={() => {
                setReviewingAppointment({
                  id: `mock-apt-${Date.now()}`,
                  proposerId: currentUser.id,
                  receiverId: profileUser.id,
                  proposerName: currentUser.name,
                  proposerAvatar: currentUser.avatar,
                  receiverName: profileUser.name,
                  receiverAvatar: profileUser.avatar,
                  offeredSkillTitle: currentUser.skillsOffered[0]?.title || 'Shared Skill',
                  requestedSkillTitle: profileUser.skillsOffered[0]?.title || 'Learned Skill',
                  dateTime: 'Recent Exchange',
                  durationMinutes: 60,
                  format: 'In-person',
                  location: 'Neighborhood Meetup',
                  notes: 'Completed session',
                  status: 'Completed'
                });
              }}
              className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 transition-colors"
            >
              Rate Completed Swap
            </button>
          )}
        </div>

        {/* Rating Breakdown Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200/60 text-xs">
          <div>
            <div className="text-slate-500 font-medium">Overall Trust</div>
            <div className="text-2xl font-bold font-mono text-slate-900 mt-1 flex items-center gap-1">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
              <span>{profileUser.trustScore}</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              {profileUser.reviewCount} total verified reviews
            </div>
          </div>

          <div>
            <div className="text-slate-500 font-medium">Punctuality & Reliability</div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-1">
              ★ {avgPunctuality} / 5.0
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Arrives on time & prepared
            </div>
          </div>

          <div>
            <div className="text-slate-500 font-medium">Knowledge & Clarity</div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-1">
              ★ {avgKnowledge} / 5.0
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Clear teaching & patience
            </div>
          </div>

          <div>
            <div className="text-slate-500 font-medium">Friendliness & Respect</div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-1">
              ★ {avgFriendliness} / 5.0
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Warm mutual aid community spirit
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4 pt-2">
          {userReviews.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No reviews recorded yet for this neighbour.
            </div>
          ) : (
            userReviews.map(review => (
              <div 
                key={review.id}
                className="p-4 rounded-xl border border-slate-200/80 space-y-2 hover:border-slate-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={review.authorAvatar} 
                      alt={review.authorName}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {review.authorName}
                      </div>
                      <div className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified Swap: {review.skillExchanged}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center text-xs font-mono font-bold text-slate-900">
                      ★ {review.overallRating}.0
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">
                      {review.createdAt}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pt-1">
                  "{review.comment}"
                </p>

                <div className="flex items-center gap-4 pt-1 text-[11px] text-slate-400 font-mono">
                  <span>Punctuality: ★{review.punctualityRating}</span>
                  <span>Clarity: ★{review.knowledgeRating}</span>
                  <span>Friendliness: ★{review.friendlinessRating}</span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal 
          user={currentUser} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      )}

    </div>
  );
};
