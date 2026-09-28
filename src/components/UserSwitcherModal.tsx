import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Users, UserPlus, Check, Sparkles } from 'lucide-react';

export const UserSwitcherModal: React.FC = () => {
  const { 
    isUserSwitcherOpen, 
    setIsUserSwitcherOpen, 
    users, 
    currentUserId, 
    setCurrentUserId, 
    registerNewUser 
  } = useApp();

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [neighborhood, setNeighborhood] = useState('Rockridge');
  const [bio, setBio] = useState('');

  if (!isUserSwitcherOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    registerNewUser(name.trim(), email.trim(), neighborhood, bio.trim());
    setIsUserSwitcherOpen(false);
    setIsRegisterMode(false);
  };

  const handleSelectUser = (id: string) => {
    setCurrentUserId(id);
    setIsUserSwitcherOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                {isRegisterMode ? 'Register New Community Member' : 'Switch Active Neighbor Profile'}
              </h2>
              <p className="text-xs text-slate-500">
                {isRegisterMode ? 'Join our local skill exchange cooperative' : 'Switch personas to test reciprocal messaging & swaps'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsUserSwitcherOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center p-1 bg-slate-100 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setIsRegisterMode(false)}
            className={`flex-1 py-1.5 rounded-md transition-all ${
              !isRegisterMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Existing Neighbors ({users.length})
          </button>
          <button
            onClick={() => setIsRegisterMode(true)}
            className={`flex-1 py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              isRegisterMode ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register New Neighbor</span>
          </button>
        </div>

        {!isRegisterMode ? (
          /* User list */
          <div className="space-y-2.5">
            {users.map(u => {
              const isCurrent = u.id === currentUserId;

              return (
                <button
                  key={u.id}
                  onClick={() => handleSelectUser(u.id)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all ${
                    isCurrent 
                      ? 'bg-emerald-50/80 border-emerald-500 ring-1 ring-emerald-500' 
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={u.avatar} 
                      alt={u.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200" 
                    />
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{u.name}</span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-500">
                        {u.neighborhood} · {u.skillsOffered.length} skills offered · ★ {u.trustScore}
                      </div>
                    </div>
                  </div>

                  {isCurrent && (
                    <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        ) : (
          /* Register Form */
          <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Maya Lin"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Neighborhood Email
              </label>
              <input
                type="email"
                placeholder="maya.lin@neighborhood.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Local Neighborhood
              </label>
              <input
                type="text"
                placeholder="e.g. Rockridge or Piedmont Avenue"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">
                Bio & Motivation
              </label>
              <textarea
                rows={2}
                placeholder="Tell neighbors a bit about yourself and what you're interested in swapping..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsRegisterMode(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Join Neighborhood Cooperatives</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
