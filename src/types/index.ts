export type SkillCategory = 
  | 'Tech & Coding'
  | 'Languages'
  | 'Culinary & Baking'
  | 'Music & Audio'
  | 'Arts & Crafts'
  | 'Home & DIY'
  | 'Health & Movement'
  | 'Gardening & Eco';

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type TeachingFormat = 'In-person' | 'Online' | 'Hybrid';
export type SwapUrgency = 'Casual' | 'Dedicated' | 'Urgent';

export interface SkillItem {
  id: string;
  userId: string;
  title: string;
  category: SkillCategory;
  type: 'offer' | 'want';
  experienceLevel?: ExperienceLevel;
  teachingFormat: TeachingFormat;
  description: string;
  tags: string[];
  sessionDurationMin?: number;
  urgency?: SwapUrgency;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  progress?: number; // 0 to 100
  totalNeeded?: number;
  currentCount?: number;
  isUnlocked: boolean;
}

export interface Review {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  targetUserId: string;
  swapAppointmentId?: string;
  skillExchanged: string;
  overallRating: number; // 1 to 5
  punctualityRating: number; // 1 to 5
  knowledgeRating: number; // 1 to 5
  friendlinessRating: number; // 1 to 5
  comment: string;
  createdAt: string;
  isVerifiedSwap: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
  bio: string;
  neighborhood: string;
  city: string;
  joinedDate: string;
  contactPreference: 'In-app Chat' | 'Email' | 'Phone / Text';
  availability: string; // e.g. "Tuesday & Thursday evenings, Saturday mornings"
  trustScore: number; // e.g. 4.9
  reviewCount: number;
  hoursGiven: number;
  hoursReceived: number;
  completedSwapsCount: number;
  badges: Badge[];
  skillsOffered: SkillItem[];
  skillsWanted: SkillItem[];
  responseRatePercent: number;
  averageResponseTime: string;
}

export type AppointmentStatus = 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';

export interface SwapAppointment {
  id: string;
  proposerId: string;
  receiverId: string;
  proposerName: string;
  proposerAvatar: string;
  receiverName: string;
  receiverAvatar: string;
  offeredSkillTitle: string;
  requestedSkillTitle: string;
  dateTime: string; // ISO string or human-readable format
  durationMinutes: number;
  format: TeachingFormat;
  location: string;
  notes: string;
  status: AppointmentStatus;
  hasUserReviewed?: boolean;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isProposal?: boolean;
  proposalDetails?: {
    appointmentId?: string;
    offeredSkill: string;
    requestedSkill: string;
    proposedDate: string;
    location: string;
    status: AppointmentStatus;
  };
}

export interface Conversation {
  id: string;
  participantIds: string[];
  partnerUser: UserProfile;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}
