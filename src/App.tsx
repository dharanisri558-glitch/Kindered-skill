/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { SkillSearchView } from './components/SkillSearchView';
import { MySkillsView } from './components/MySkillsView';
import { MessagesView } from './components/MessagesView';
import { ProfileView } from './components/ProfileView';
import { ProposeSwapModal } from './components/ProposeSwapModal';
import { LeaveReviewModal } from './components/LeaveReviewModal';
import { UserSwitcherModal } from './components/UserSwitcherModal';
import { N8nChatWidget } from './components/N8nChatWidget';
import { Heart, Sparkles, ShieldCheck } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-800">
      {/* Top Navigation */}
      <Navbar />

      {/* Main App Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'dashboard' && <DashboardView />}
        {activeTab === 'search' && <SkillSearchView />}
        {activeTab === 'my-skills' && <MySkillsView />}
        {activeTab === 'messages' && <MessagesView />}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Modals & AI Chat Assistant */}
      <ProposeSwapModal />
      <LeaveReviewModal />
      <UserSwitcherModal />
      <N8nChatWidget />

      {/* Subtle, Clean Footer */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 tracking-tight">KindredSkill</span>
            <span aria-hidden="true">·</span>
            <span>Local 1:1 Skill Swapping & Knowledge Commons</span>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className="hover:text-slate-900 transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('search')} 
              className="hover:text-slate-900 transition-colors"
            >
              Browse Skills
            </button>
            <button 
              onClick={() => setActiveTab('my-skills')} 
              className="hover:text-slate-900 transition-colors"
            >
              Offer a Skill
            </button>
            <button 
              onClick={() => setActiveTab('messages')} 
              className="hover:text-slate-900 transition-colors"
            >
              Messages
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Powered by neighborhood reciprocity & zero financial cost</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
