import React from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, Search, LayoutDashboard, Sparkles, User, Users, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentUser, 
    setIsUserSwitcherOpen,
    conversations,
    setIsAiChatOpen
  } = useApp();

  const totalUnread = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-emerald-700 transition-colors">
              KS
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                KindredSkill
              </span>
            </div>
          </button>

          {/* Zone 2: 4-5 clean text navigation links with hover states */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'search'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Find Skills</span>
            </button>

            <button
              onClick={() => setActiveTab('my-skills')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'my-skills'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>My Skills</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`relative flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'messages'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Messages</span>
              {totalUnread > 0 && (
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {totalUnread}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeTab === 'profile'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsAiChatOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
              title="Chat with KindredSkill n8n AI Assistant"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">AI Guide</span>
            </button>

            <button
              onClick={() => setIsUserSwitcherOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200/80"
              title="Switch user or register new member"
            >
              <Users className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Switch Neighbor / Register</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className="flex items-center gap-2 pl-2 pr-3 py-1 text-xs font-semibold text-slate-900 bg-emerald-50 hover:bg-emerald-100 rounded-full border border-emerald-200 transition-colors"
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name} 
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500/20" 
              />
              <span className="max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
              <div className="flex items-center text-emerald-800 text-[11px] font-mono">
                ★ {currentUser.trustScore}
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile nav drawer */}
      <div className="md:hidden flex border-t border-slate-200 bg-white px-2 py-1.5 justify-around text-xs">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center py-1 px-2 rounded ${activeTab === 'dashboard' ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Home</span>
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`flex flex-col items-center py-1 px-2 rounded ${activeTab === 'search' ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}
        >
          <Search className="w-4 h-4" />
          <span>Find</span>
        </button>
        <button
          onClick={() => setIsAiChatOpen(true)}
          className="flex flex-col items-center py-1 px-2 rounded text-emerald-700 font-medium"
        >
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>AI Guide</span>
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          className={`flex flex-col items-center py-1 px-2 rounded relative ${activeTab === 'messages' ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Chat</span>
          {totalUnread > 0 && (
            <span className="absolute top-0 right-1 w-2 h-2 rounded-full bg-emerald-600"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center py-1 px-2 rounded ${activeTab === 'profile' ? 'text-emerald-700 font-bold' : 'text-slate-500'}`}
        >
          <User className="w-4 h-4" />
          <span>Profile</span>
        </button>
      </div>
    </header>
  );
};
