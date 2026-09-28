import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TeachingFormat } from '../types';
import { X, Repeat, Calendar, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export const ProposeSwapModal: React.FC = () => {
  const { 
    currentUser, 
    proposeSwapPartner, 
    setProposeSwapPartner, 
    proposeSwapAppointment, 
    setActiveTab 
  } = useApp();

  if (!proposeSwapPartner) return null;

  // Partner's offered skills
  const partnerOffered = proposeSwapPartner.skillsOffered;
  // Current user's offered skills
  const myOffered = currentUser.skillsOffered;

  const [requestedSkill, setRequestedSkill] = useState(
    partnerOffered[0]?.title || 'Skill Session'
  );
  const [offeredSkill, setOfferedSkill] = useState(
    myOffered[0]?.title || 'Skill Session'
  );
  const [dateTime, setDateTime] = useState('Tomorrow at 5:30 PM');
  const [duration, setDuration] = useState(60);
  const [format, setFormat] = useState<TeachingFormat>('In-person');
  const [location, setLocation] = useState('Local Library or Community Garden');
  const [notes, setNotes] = useState('Excited to trade skills! Looking forward to meeting in person.');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    proposeSwapAppointment({
      receiverId: proposeSwapPartner.id,
      offeredSkillTitle: offeredSkill,
      requestedSkillTitle: requestedSkill,
      dateTime,
      durationMinutes: duration,
      format,
      location,
      notes
    });

    setProposeSwapPartner(null);
    setActiveTab('messages');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Repeat className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Propose a Skill Swap with {proposeSwapPartner.name}
              </h2>
              <p className="text-xs text-slate-500">
                1-to-1 reciprocal exchange with zero financial cost
              </p>
            </div>
          </div>

          <button
            onClick={() => setProposeSwapPartner(null)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Reciprocal Skills Pairing */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                What you want to learn from {proposeSwapPartner.name}:
              </label>
              {partnerOffered.length > 0 ? (
                <select
                  value={requestedSkill}
                  onChange={(e) => setRequestedSkill(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {partnerOffered.map(s => (
                    <option key={s.id} value={s.title}>{s.title} ({s.category})</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={requestedSkill}
                  onChange={(e) => setRequestedSkill(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                />
              )}
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                What skill you will teach in exchange:
              </label>
              {myOffered.length > 0 ? (
                <select
                  value={offeredSkill}
                  onChange={(e) => setOfferedSkill(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {myOffered.map(s => (
                    <option key={s.id} value={s.title}>{s.title} ({s.category})</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={offeredSkill}
                  onChange={(e) => setOfferedSkill(e.target.value)}
                  placeholder="e.g. Sourdough baking basics"
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm"
                />
              )}
            </div>
          </div>

          {/* Date, Time & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Suggested Date & Time</span>
              </label>
              <input
                type="text"
                required
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                placeholder="e.g. Thursday at 6:00 PM"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Duration (Equal Time)</span>
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none"
              >
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes (Standard 1:1)</option>
                <option value={75}>75 minutes</option>
                <option value={90}>90 minutes</option>
              </select>
            </div>
          </div>

          {/* Format & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Exchange Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as TeachingFormat)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none"
              >
                <option value="In-person">In-person (Public location)</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Online">Online video call</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Proposed Location</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Northside Community Garden"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Session Notes */}
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Notes & Mutual Expectations
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What materials will you bring? What goals do you have for this session?"
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setProposeSwapPartner(null)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Send Swap Proposal</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
