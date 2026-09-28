import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Send, 
  Repeat, 
  MapPin, 
  Star, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const MessagesView: React.FC = () => {
  const { 
    conversations, 
    messages, 
    sendMessage, 
    activeConversationId, 
    setActiveConversationId, 
    currentUser, 
    users,
    setProposeSwapPartner,
    setInspectingUserId,
    setActiveTab,
    updateAppointmentStatus
  } = useApp();

  const [inputContent, setInputContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  
  // Resolve partner user profile
  const partnerId = activeConv 
    ? activeConv.participantIds.find(id => id !== currentUser.id)
    : null;
  const partnerUser = users.find(u => u.id === partnerId) || activeConv?.partnerUser;

  const currentMessages = activeConv ? (messages[activeConv.id] || []) : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages.length]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputContent);
    setInputContent('');
  };

  const handleAcceptProposal = (appointmentId?: string) => {
    if (appointmentId) {
      updateAppointmentStatus(appointmentId, 'Confirmed');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col md:flex-row h-[720px]">
      
      {/* Left Column: Conversations List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="text-base font-bold text-slate-900">
            Neighborhood Messages
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Coordinate times, materials, and locations for your zero-cost exchanges.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {conversations.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No conversations yet. Message a neighbour from the skill search!
            </div>
          ) : (
            conversations.map(conv => {
              const pId = conv.participantIds.find(id => id !== currentUser.id);
              const partner = users.find(u => u.id === pId) || conv.partnerUser;
              const isSelected = activeConv?.id === conv.id;

              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`w-full p-4 flex items-start gap-3 text-left transition-colors ${
                    isSelected ? 'bg-emerald-50/80 border-r-2 border-emerald-600' : 'hover:bg-white'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img 
                      src={partner.avatar} 
                      alt={partner.name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {partner.name}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 truncate mt-1">
                      {conv.lastMessage}
                    </p>

                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{partner.neighborhood}</span>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Column: Chat History & Input */}
      {activeConv && partnerUser ? (
        <div className="flex-1 flex flex-col bg-white">
          
          {/* Partner Info Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white z-10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setInspectingUserId(partnerUser.id);
                  setActiveTab('profile');
                }}
                className="group focus:outline-none"
              >
                <img 
                  src={partnerUser.avatar} 
                  alt={partnerUser.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 group-hover:ring-emerald-500 transition-all"
                />
              </button>

              <div>
                <button
                  onClick={() => {
                    setInspectingUserId(partnerUser.id);
                    setActiveTab('profile');
                  }}
                  className="text-sm font-bold text-slate-900 hover:text-emerald-700 transition-colors flex items-center gap-1.5"
                >
                  <span>{partnerUser.name}</span>
                  <span className="text-emerald-700 text-xs font-mono">★ {partnerUser.trustScore}</span>
                </button>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>{partnerUser.neighborhood}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-600 font-medium">{partnerUser.averageResponseTime}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setProposeSwapPartner(partnerUser)}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 flex items-center gap-1.5 transition-colors"
              >
                <Repeat className="w-3.5 h-3.5 text-emerald-700" />
                <span>Propose Swap</span>
              </button>

              <button
                onClick={() => {
                  setInspectingUserId(partnerUser.id);
                  setActiveTab('profile');
                }}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors"
              >
                View Profile
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/30">
            
            {/* Friendly reassurance banner */}
            <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 text-center text-xs text-emerald-800">
              <p className="font-semibold">Local Skill Swapping Safety & Etiquette</p>
              <p className="text-slate-600 mt-0.5">
                Always meet in well-lit public neighborhood places (libraries, parks, cafés) or arrange verified group workshops.
              </p>
            </div>

            {currentMessages.map(msg => {
              const isMe = msg.senderId === currentUser.id;

              return (
                <div 
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[75%]">
                    {!isMe && (
                      <img 
                        src={msg.senderAvatar} 
                        alt={msg.senderName}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 shrink-0 mb-1"
                      />
                    )}

                    <div className="space-y-1">
                      {/* Message Bubble */}
                      <div className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe 
                          ? 'bg-emerald-700 text-white rounded-br-xs shadow-xs' 
                          : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-xs'
                      }`}>
                        <p>{msg.content}</p>
                      </div>

                      {/* Embedded Swap Proposal Card if this message is a proposal */}
                      {msg.isProposal && msg.proposalDetails && (
                        <div className="mt-2 bg-white rounded-xl p-4 border border-emerald-200 shadow-sm space-y-2.5 text-xs text-slate-800 max-w-sm">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                            <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                              <Repeat className="w-3.5 h-3.5" />
                              <span>Exchange Proposal</span>
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              msg.proposalDetails.status === 'Confirmed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {msg.proposalDetails.status}
                            </span>
                          </div>

                          <div className="space-y-1.5">
                            <div>
                              <span className="text-slate-500 block">Offered:</span>
                              <span className="font-semibold text-slate-900">{msg.proposalDetails.offeredSkill}</span>
                            </div>
                            <div>
                              <span className="text-slate-500 block">Requested in Return:</span>
                              <span className="font-semibold text-emerald-700">{msg.proposalDetails.requestedSkill}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-600 pt-1">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <span>{msg.proposalDetails.proposedDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{msg.proposalDetails.location}</span>
                            </div>
                          </div>

                          {msg.proposalDetails.status === 'Pending' && !isMe && (
                            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                              <button
                                onClick={() => handleAcceptProposal(msg.proposalDetails?.appointmentId)}
                                className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-1"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Accept Proposal</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Timestamp */}
                      <div className={`text-[10px] text-slate-400 font-mono px-1 ${isMe ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Message Input Form */}
          <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-center gap-2">
            <button
              type="button"
              onClick={() => setProposeSwapPartner(partnerUser)}
              className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors shrink-0"
              title="Propose a skill swap"
            >
              <Repeat className="w-5 h-5" />
            </button>

            <input
              type="text"
              placeholder={`Message ${partnerUser.name.split(' ')[0]} to arrange your zero-cost swap...`}
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />

            <button
              type="submit"
              disabled={!inputContent.trim()}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400 text-sm">
          Select a conversation from the left to start messaging.
        </div>
      )}

    </div>
  );
};
