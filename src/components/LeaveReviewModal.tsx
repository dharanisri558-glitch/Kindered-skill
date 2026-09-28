import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, X, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const LeaveReviewModal: React.FC = () => {
  const { reviewingAppointment, setReviewingAppointment, addReview, currentUser } = useApp();

  if (!reviewingAppointment) return null;

  const isProposer = reviewingAppointment.proposerId === currentUser.id;
  const partnerId = isProposer ? reviewingAppointment.receiverId : reviewingAppointment.proposerId;
  const partnerName = isProposer ? reviewingAppointment.receiverName : reviewingAppointment.proposerName;
  const partnerAvatar = isProposer ? reviewingAppointment.receiverAvatar : reviewingAppointment.proposerAvatar;

  const skillTraded = `${reviewingAppointment.offeredSkillTitle} for ${reviewingAppointment.requestedSkillTitle}`;

  const [overall, setOverall] = useState(5);
  const [punctuality, setPunctuality] = useState(5);
  const [knowledge, setKnowledge] = useState(5);
  const [friendliness, setFriendliness] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    addReview({
      targetUserId: partnerId,
      swapAppointmentId: reviewingAppointment.id,
      skillExchanged: skillTraded,
      overallRating: overall,
      punctualityRating: punctuality,
      knowledgeRating: knowledge,
      friendlinessRating: friendliness,
      comment: comment.trim()
    });

    setReviewingAppointment(null);
  };

  const renderStarInput = (val: number, setVal: (v: number) => void) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setVal(star)}
          className="p-1 focus:outline-none"
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              star <= val
                ? 'fill-amber-400 text-amber-500'
                : 'text-slate-300'
            }`}
          />
        </button>
      ))}
      <span className="ml-2 font-mono text-xs font-bold text-slate-700">
        {val}.0 / 5.0
      </span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <img 
              src={partnerAvatar} 
              alt={partnerName}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
            />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Rate & Review {partnerName}
              </h2>
              <p className="text-xs text-slate-500">
                Verified review for your completed skill exchange
              </p>
            </div>
          </div>

          <button
            onClick={() => setReviewingAppointment(null)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-2 text-emerald-800">
            <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>
              Your evaluation strengthens our neighborhood community trust score and unlocks badges for {partnerName}.
            </span>
          </div>

          {/* Overall Rating */}
          <div className="space-y-1">
            <label className="block text-slate-800 font-bold">
              Overall Exchange Experience
            </label>
            {renderStarInput(overall, setOverall)}
          </div>

          {/* Sub-ratings */}
          <div className="p-3.5 bg-slate-50 rounded-xl space-y-3 border border-slate-200/80">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Punctuality & Reliability
              </label>
              {renderStarInput(punctuality, setPunctuality)}
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Knowledge & Teaching Clarity
              </label>
              {renderStarInput(knowledge, setKnowledge)}
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Friendliness & Respect
              </label>
              {renderStarInput(friendliness, setFriendliness)}
            </div>
          </div>

          {/* Review comment */}
          <div>
            <label className="block text-slate-800 font-bold mb-1">
              Written Community Review *
            </label>
            <textarea
              required
              rows={3}
              placeholder="What did you learn? How was their teaching approach and pace? What should neighbours know before booking a swap?"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setReviewingAppointment(null)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Submit Verified Review</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
