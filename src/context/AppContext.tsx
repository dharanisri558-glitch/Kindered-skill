import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  SkillItem, 
  SwapAppointment, 
  ChatMessage, 
  Conversation, 
  Review, 
  AppointmentStatus, 
  SkillCategory 
} from '../types';
import { 
  INITIAL_USERS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_MESSAGES, 
  INITIAL_REVIEWS 
} from '../data/mockData';

interface AppContextType {
  currentUser: UserProfile;
  users: UserProfile[];
  currentUserId: string;
  setCurrentUserId: (id: string) => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  addOfferedSkill: (skill: Omit<SkillItem, 'id' | 'userId' | 'type'>) => void;
  editOfferedSkill: (id: string, skill: Partial<SkillItem>) => void;
  deleteOfferedSkill: (id: string) => void;
  addWantedSkill: (skill: Omit<SkillItem, 'id' | 'userId' | 'type'>) => void;
  deleteWantedSkill: (id: string) => void;
  
  appointments: SwapAppointment[];
  proposeSwapAppointment: (proposal: {
    receiverId: string;
    offeredSkillTitle: string;
    requestedSkillTitle: string;
    dateTime: string;
    durationMinutes: number;
    format: 'In-person' | 'Online' | 'Hybrid';
    location: string;
    notes: string;
  }) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  
  conversations: Conversation[];
  messages: Record<string, ChatMessage[]>;
  sendMessage: (conversationId: string, content: string) => void;
  getOrCreateConversation: (partnerUserId: string) => string;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  
  reviews: Review[];
  addReview: (reviewData: {
    targetUserId: string;
    swapAppointmentId?: string;
    skillExchanged: string;
    overallRating: number;
    punctualityRating: number;
    knowledgeRating: number;
    friendlinessRating: number;
    comment: string;
  }) => void;

  activeTab: 'dashboard' | 'search' | 'my-skills' | 'messages' | 'profile';
  setActiveTab: (tab: 'dashboard' | 'search' | 'my-skills' | 'messages' | 'profile') => void;
  selectedCategory: SkillCategory | 'All';
  setSelectedCategory: (cat: SkillCategory | 'All') => void;

  inspectingUserId: string | null;
  setInspectingUserId: (id: string | null) => void;

  proposeSwapPartner: UserProfile | null;
  setProposeSwapPartner: (user: UserProfile | null) => void;

  reviewingAppointment: SwapAppointment | null;
  setReviewingAppointment: (apt: SwapAppointment | null) => void;

  isUserSwitcherOpen: boolean;
  setIsUserSwitcherOpen: (open: boolean) => void;
  registerNewUser: (name: string, email: string, neighborhood: string, bio: string) => void;
  isAiChatOpen: boolean;
  setIsAiChatOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'kindred_users_v1',
  CURRENT_USER_ID: 'kindred_current_user_id_v1',
  APPOINTMENTS: 'kindred_appointments_v1',
  CONVERSATIONS: 'kindred_conversations_v1',
  MESSAGES: 'kindred_messages_v1',
  REVIEWS: 'kindred_reviews_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUserId, setCurrentUserIdState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
      return saved || 'user-elena';
    } catch {
      return 'user-elena';
    }
  });

  const [appointments, setAppointments] = useState<SwapAppointment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
      return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONVERSATIONS);
      return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
    } catch {
      return INITIAL_CONVERSATIONS;
    }
  });

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'search' | 'my-skills' | 'messages' | 'profile'>('dashboard');
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | 'All'>('All');
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv-carlos');
  const [inspectingUserId, setInspectingUserId] = useState<string | null>(null);
  const [proposeSwapPartner, setProposeSwapPartner] = useState<UserProfile | null>(null);
  const [reviewingAppointment, setReviewingAppointment] = useState<SwapAppointment | null>(null);
  const [isUserSwitcherOpen, setIsUserSwitcherOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  const setCurrentUserId = (id: string) => {
    setCurrentUserIdState(id);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUsers(prev => prev.map(u => u.id === currentUserId ? { ...u, ...updated } : u));
  };

  const addOfferedSkill = (skill: Omit<SkillItem, 'id' | 'userId' | 'type'>) => {
    const newSkill: SkillItem = {
      ...skill,
      id: `sk-off-${Date.now()}`,
      userId: currentUserId,
      type: 'offer'
    };
    setUsers(prev => prev.map(u => {
      if (u.id === currentUserId) {
        return {
          ...u,
          skillsOffered: [newSkill, ...u.skillsOffered]
        };
      }
      return u;
    }));
  };

  const editOfferedSkill = (id: string, updated: Partial<SkillItem>) => {
    setUsers(prev => prev.map(u => {
      if (u.id === currentUserId) {
        return {
          ...u,
          skillsOffered: u.skillsOffered.map(s => s.id === id ? { ...s, ...updated } : s)
        };
      }
      return u;
    }));
  };

  const deleteOfferedSkill = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === currentUserId) {
        return {
          ...u,
          skillsOffered: u.skillsOffered.filter(s => s.id !== id)
        };
      }
      return u;
    }));
  };

  const addWantedSkill = (skill: Omit<SkillItem, 'id' | 'userId' | 'type'>) => {
    const newSkill: SkillItem = {
      ...skill,
      id: `sk-wnt-${Date.now()}`,
      userId: currentUserId,
      type: 'want'
    };
    setUsers(prev => prev.map(u => {
      if (u.id === currentUserId) {
        return {
          ...u,
          skillsWanted: [newSkill, ...u.skillsWanted]
        };
      }
      return u;
    }));
  };

  const deleteWantedSkill = (id: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === currentUserId) {
        return {
          ...u,
          skillsWanted: u.skillsWanted.filter(s => s.id !== id)
        };
      }
      return u;
    }));
  };

  const getOrCreateConversation = (partnerUserId: string): string => {
    const existing = conversations.find(c => 
      c.participantIds.includes(currentUserId) && c.participantIds.includes(partnerUserId)
    );

    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }

    const partner = users.find(u => u.id === partnerUserId);
    if (!partner) return '';

    const newConvId = `conv-${Date.now()}`;
    const newConv: Conversation = {
      id: newConvId,
      participantIds: [currentUserId, partnerUserId],
      partnerUser: partner,
      lastMessage: 'Conversation started',
      lastMessageTime: 'Just now',
      unreadCount: 0
    };

    setConversations(prev => [newConv, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newConvId]: [
        {
          id: `msg-${Date.now()}`,
          conversationId: newConvId,
          senderId: currentUserId,
          senderName: currentUser.name,
          senderAvatar: currentUser.avatar,
          content: `Hi ${partner.name}! I noticed your skills on KindredSkill and would love to connect about a local skill exchange.`,
          timestamp: 'Just now'
        }
      ]
    }));

    setActiveConversationId(newConvId);
    return newConvId;
  };

  const proposeSwapAppointment = (proposal: {
    receiverId: string;
    offeredSkillTitle: string;
    requestedSkillTitle: string;
    dateTime: string;
    durationMinutes: number;
    format: 'In-person' | 'Online' | 'Hybrid';
    location: string;
    notes: string;
  }) => {
    const receiver = users.find(u => u.id === proposal.receiverId);
    if (!receiver) return;

    const newAptId = `apt-${Date.now()}`;
    const newApt: SwapAppointment = {
      id: newAptId,
      proposerId: currentUserId,
      receiverId: proposal.receiverId,
      proposerName: currentUser.name,
      proposerAvatar: currentUser.avatar,
      receiverName: receiver.name,
      receiverAvatar: receiver.avatar,
      offeredSkillTitle: proposal.offeredSkillTitle,
      requestedSkillTitle: proposal.requestedSkillTitle,
      dateTime: proposal.dateTime,
      durationMinutes: proposal.durationMinutes,
      format: proposal.format,
      location: proposal.location,
      notes: proposal.notes,
      status: 'Pending',
      hasUserReviewed: false
    };

    setAppointments(prev => [newApt, ...prev]);

    // Send proposal card in chat
    const convId = getOrCreateConversation(proposal.receiverId);
    if (convId) {
      const proposalMsg: ChatMessage = {
        id: `msg-prop-${Date.now()}`,
        conversationId: convId,
        senderId: currentUserId,
        senderName: currentUser.name,
        senderAvatar: currentUser.avatar,
        content: `Proposed a skill swap: "${proposal.offeredSkillTitle}" for "${proposal.requestedSkillTitle}" on ${proposal.dateTime}`,
        timestamp: 'Just now',
        isProposal: true,
        proposalDetails: {
          appointmentId: newAptId,
          offeredSkill: proposal.offeredSkillTitle,
          requestedSkill: proposal.requestedSkillTitle,
          proposedDate: proposal.dateTime,
          location: proposal.location,
          status: 'Pending'
        }
      };

      setMessages(prev => ({
        ...prev,
        [convId]: [...(prev[convId] || []), proposalMsg]
      }));

      setConversations(prev => prev.map(c => 
        c.id === convId ? { 
          ...c, 
          lastMessage: `Proposed a swap: ${proposal.offeredSkillTitle}`, 
          lastMessageTime: 'Just now' 
        } : c
      ));

      // Friendly automated confirmation from partner after 1.5 seconds
      setTimeout(() => {
        const partnerReply: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          conversationId: convId,
          senderId: receiver.id,
          senderName: receiver.name,
          senderAvatar: receiver.avatar,
          content: `Hi ${currentUser.name}! Thanks for the swap proposal. That time works wonderfully for me—I'm looking forward to trading our skills!`,
          timestamp: 'Just now'
        };

        setMessages(prev => ({
          ...prev,
          [convId]: [...(prev[convId] || []), partnerReply]
        }));

        setAppointments(prev => prev.map(a => a.id === newAptId ? { ...a, status: 'Confirmed' } : a));

        setConversations(prev => prev.map(c => 
          c.id === convId ? { 
            ...c, 
            lastMessage: partnerReply.content, 
            lastMessageTime: 'Just now',
            unreadCount: c.unreadCount + 1
          } : c
        ));
      }, 1500);
    }
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAppointments(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, status };
      }
      return a;
    }));

    if (status === 'Completed') {
      // Increment swap counts and hours on participants
      const apt = appointments.find(a => a.id === id);
      if (apt) {
        const durationHours = apt.durationMinutes / 60;
        setUsers(prev => prev.map(u => {
          if (u.id === apt.proposerId) {
            return {
              ...u,
              completedSwapsCount: u.completedSwapsCount + 1,
              hoursGiven: u.hoursGiven + durationHours,
              hoursReceived: u.hoursReceived + durationHours
            };
          }
          if (u.id === apt.receiverId) {
            return {
              ...u,
              completedSwapsCount: u.completedSwapsCount + 1,
              hoursGiven: u.hoursGiven + durationHours,
              hoursReceived: u.hoursReceived + durationHours
            };
          }
          return u;
        }));
      }
    }
  };

  const sendMessage = (conversationId: string, content: string) => {
    if (!content.trim()) return;

    const conv = conversations.find(c => c.id === conversationId);
    if (!conv) return;

    const partnerId = conv.participantIds.find(id => id !== currentUserId);
    const partner = users.find(u => u.id === partnerId);

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: currentUserId,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      content: content.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), userMsg]
    }));

    setConversations(prev => prev.map(c => 
      c.id === conversationId ? { 
        ...c, 
        lastMessage: content.trim(), 
        lastMessageTime: 'Just now' 
      } : c
    ));

    // Realistic neighbor reply simulation
    if (partner) {
      setTimeout(() => {
        const partnerReplies = [
          `That sounds great! I'll bring the materials we discussed to the neighborhood meetup.`,
          `Sounds like a plan! Let me know if you need me to bring anything specific.`,
          `Looking forward to it! Local skill swapping has been such a rewarding way to meet neighbours.`,
          `Got it! See you then. Feel free to text or message here if anything changes.`
        ];
        const randomReply = partnerReplies[Math.floor(Math.random() * partnerReplies.length)];

        const replyMsg: ChatMessage = {
          id: `msg-reply-${Date.now()}`,
          conversationId,
          senderId: partner.id,
          senderName: partner.name,
          senderAvatar: partner.avatar,
          content: randomReply,
          timestamp: 'Just now'
        };

        setMessages(prev => ({
          ...prev,
          [conversationId]: [...(prev[conversationId] || []), replyMsg]
        }));

        setConversations(prev => prev.map(c => 
          c.id === conversationId ? { 
            ...c, 
            lastMessage: randomReply, 
            lastMessageTime: 'Just now' 
          } : c
        ));
      }, 1200);
    }
  };

  const addReview = (reviewData: {
    targetUserId: string;
    swapAppointmentId?: string;
    skillExchanged: string;
    overallRating: number;
    punctualityRating: number;
    knowledgeRating: number;
    friendlinessRating: number;
    comment: string;
  }) => {
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      authorId: currentUserId,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      targetUserId: reviewData.targetUserId,
      swapAppointmentId: reviewData.swapAppointmentId,
      skillExchanged: reviewData.skillExchanged,
      overallRating: reviewData.overallRating,
      punctualityRating: reviewData.punctualityRating,
      knowledgeRating: reviewData.knowledgeRating,
      friendlinessRating: reviewData.friendlinessRating,
      comment: reviewData.comment,
      createdAt: 'Just now',
      isVerifiedSwap: true
    };

    setReviews(prev => [newReview, ...prev]);

    // Recalculate target user trustScore
    setUsers(prev => prev.map(u => {
      if (u.id === reviewData.targetUserId) {
        const targetReviews = reviews.filter(r => r.targetUserId === reviewData.targetUserId);
        const newTotal = targetReviews.reduce((acc, r) => acc + r.overallRating, 0) + reviewData.overallRating;
        const newCount = targetReviews.length + 1;
        const newAvg = Number((newTotal / newCount).toFixed(1));

        return {
          ...u,
          trustScore: newAvg,
          reviewCount: newCount
        };
      }
      return u;
    }));

    // If appointment ID was given, mark it as reviewed
    if (reviewData.swapAppointmentId) {
      setAppointments(prev => prev.map(a => 
        a.id === reviewData.swapAppointmentId ? { ...a, hasUserReviewed: true } : a
      ));
    }
  };

  const registerNewUser = (name: string, email: string, neighborhood: string, bio: string) => {
    const newId = `user-${Date.now()}`;
    const newUser: UserProfile = {
      id: newId,
      name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
      email,
      bio: bio || 'Excited to learn from and share skills with neighbors!',
      neighborhood: neighborhood || 'Oakland Central',
      city: 'Oakland / Bay Area',
      joinedDate: 'September 2026',
      contactPreference: 'In-app Chat',
      availability: 'Flexible weekday evenings and weekends',
      trustScore: 5.0,
      reviewCount: 0,
      hoursGiven: 0,
      hoursReceived: 0,
      completedSwapsCount: 0,
      responseRatePercent: 100,
      averageResponseTime: 'under 1 hour',
      badges: [
        {
          id: 'b-welcome',
          name: 'Welcome Neighbor',
          description: 'Joined the local skill swapping cooperative.',
          iconName: 'Sparkles',
          unlockedAt: '2026-09-28',
          isUnlocked: true,
          progress: 100
        }
      ],
      skillsOffered: [],
      skillsWanted: []
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUserIdState(newId);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        currentUserId,
        setCurrentUserId,
        updateProfile,
        addOfferedSkill,
        editOfferedSkill,
        deleteOfferedSkill,
        addWantedSkill,
        deleteWantedSkill,
        appointments,
        proposeSwapAppointment,
        updateAppointmentStatus,
        conversations,
        messages,
        sendMessage,
        getOrCreateConversation,
        activeConversationId,
        setActiveConversationId,
        reviews,
        addReview,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        inspectingUserId,
        setInspectingUserId,
        proposeSwapPartner,
        setProposeSwapPartner,
        reviewingAppointment,
        setReviewingAppointment,
        isUserSwitcherOpen,
        setIsUserSwitcherOpen,
        registerNewUser,
        isAiChatOpen,
        setIsAiChatOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
