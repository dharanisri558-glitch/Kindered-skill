import heroImg from '../assets/images/hero_skill_swap_1790582001247.jpg';
import avatarMarina from '../assets/images/avatar_marina_tech_1790582024341.jpg';
import avatarCarlos from '../assets/images/avatar_carlos_language_1790582038949.jpg';
import avatarElena from '../assets/images/avatar_elena_gardening_1790582053843.jpg';

import { 
  UserProfile, 
  SkillCategory, 
  Badge, 
  Review, 
  SwapAppointment, 
  ChatMessage, 
  Conversation 
} from '../types';

export const HERO_IMAGE = heroImg;

export const CATEGORIES_META: { 
  name: SkillCategory; 
  description: string; 
  examples: string[];
}[] = [
  {
    name: 'Tech & Coding',
    description: 'Web development, Python, mobile apps, software tools & robotics.',
    examples: ['React.js', 'Python', 'Git & GitHub', 'Arduino basics']
  },
  {
    name: 'Languages',
    description: 'Conversational fluency, grammar, pronunciation & sign language.',
    examples: ['Spanish', 'Japanese', 'American Sign Language', 'French']
  },
  {
    name: 'Culinary & Baking',
    description: 'Sourdough fermentation, artisanal pasta, knife skills & fermentation.',
    examples: ['Sourdough bread', 'Handmade pasta', 'Fermentation', 'Knife sharpening']
  },
  {
    name: 'Music & Audio',
    description: 'Acoustic guitar, piano chords, music theory, mixing & vocal coaching.',
    examples: ['Acoustic guitar', 'Piano fundamentals', 'Vocal technique', 'Logic Pro']
  },
  {
    name: 'Arts & Crafts',
    description: 'Ceramics, woodworking, watercolor painting, knitting & mending.',
    examples: ['Pottery wheel', 'Wood joinery', 'Watercolor', 'Garment mending']
  },
  {
    name: 'Home & DIY',
    description: 'Bicycle maintenance, plumbing basics, carpentry & soldering.',
    examples: ['Bicycle tune-up', 'Home electrical', 'Drywall repair', 'Soldering']
  },
  {
    name: 'Health & Movement',
    description: 'Vinyasa yoga, calisthenics, natural movement, breathwork & running.',
    examples: ['Yoga alignment', 'Kettlebell form', 'Breathwork', 'Calisthenics']
  },
  {
    name: 'Gardening & Eco',
    description: 'Urban permaculture, compost systems, seed saving & herbalism.',
    examples: ['Composting', 'Raised bed gardening', 'Seed saving', 'Microgreens']
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'b-pioneer',
    name: 'Pioneer Swapper',
    description: 'Completed first 3 local skill exchanges.',
    iconName: 'Sparkles',
    unlockedAt: '2026-03-12',
    isUnlocked: true,
    currentCount: 3,
    totalNeeded: 3,
    progress: 100
  },
  {
    id: 'b-trust',
    name: 'Five-Star Neighbor',
    description: 'Maintained 4.8+ trust score across 5+ verified reviews.',
    iconName: 'ShieldCheck',
    unlockedAt: '2026-05-18',
    isUnlocked: true,
    currentCount: 8,
    totalNeeded: 5,
    progress: 100
  },
  {
    id: 'b-responder',
    name: 'Prompt Responder',
    description: 'Average reply time under 2 hours with 95%+ response rate.',
    iconName: 'Clock',
    unlockedAt: '2026-06-04',
    isUnlocked: true,
    currentCount: 96,
    totalNeeded: 90,
    progress: 100
  },
  {
    id: 'b-multi',
    name: 'Skill Polymath',
    description: 'Offered and taught skills in at least 3 distinct categories.',
    iconName: 'Layers',
    isUnlocked: false,
    currentCount: 2,
    totalNeeded: 3,
    progress: 66
  },
  {
    id: 'b-pillar',
    name: 'Community Pillar',
    description: 'Contributed 25+ verified teaching hours to the neighborhood.',
    iconName: 'Award',
    isUnlocked: false,
    currentCount: 18,
    totalNeeded: 25,
    progress: 72
  }
];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'user-elena',
    name: 'Elena Gomez',
    avatar: avatarElena,
    email: 'elena.gomez@neighborhood.org',
    bio: 'Urban micro-farmer and sourdough baker living in Northside. Passionate about closed-loop food systems, seed keeping, and sharing heritage baking secrets without cost.',
    neighborhood: 'Northside Meadows',
    city: 'Oakland / Bay Area',
    joinedDate: 'February 2026',
    contactPreference: 'In-app Chat',
    availability: 'Tuesday & Thursday 5:00 - 8:00 PM, Saturday mornings 9:00 AM - 1:00 PM',
    trustScore: 4.9,
    reviewCount: 9,
    hoursGiven: 18,
    hoursReceived: 16,
    completedSwapsCount: 8,
    responseRatePercent: 98,
    averageResponseTime: 'under 1 hour',
    badges: INITIAL_BADGES,
    skillsOffered: [
      {
        id: 'sk-elena-1',
        userId: 'user-elena',
        title: 'Artisan Sourdough & Fermentation',
        category: 'Culinary & Baking',
        type: 'offer',
        experienceLevel: 'Expert',
        teachingFormat: 'In-person',
        description: 'Hands-on bread craft: building wild yeast starters, hydration calculations, coil folds, scoring patterns, and baking with a Dutch oven.',
        tags: ['Sourdough', 'Fermentation', 'Artisan Bread', 'Baking Science'],
        sessionDurationMin: 90
      },
      {
        id: 'sk-elena-2',
        userId: 'user-elena',
        title: 'Permaculture & Raised Bed Gardening',
        category: 'Gardening & Eco',
        type: 'offer',
        experienceLevel: 'Advanced',
        teachingFormat: 'In-person',
        description: 'Design productive edible backyard gardens: companion planting, composting techniques, pest management without chemicals, and drip irrigation.',
        tags: ['Permaculture', 'Organic Soil', 'Composting', 'Heirloom Seeds'],
        sessionDurationMin: 60
      }
    ],
    skillsWanted: [
      {
        id: 'sk-elena-w1',
        userId: 'user-elena',
        title: 'Acoustic Guitar Fingerpicking',
        category: 'Music & Audio',
        type: 'want',
        teachingFormat: 'In-person',
        description: 'Looking to learn clean acoustic chord transitions and folk fingerpicking patterns for campfires and home relaxation.',
        tags: ['Guitar', 'Acoustic', 'Folk', 'Chords'],
        urgency: 'Dedicated'
      },
      {
        id: 'sk-elena-w2',
        userId: 'user-elena',
        title: 'Bicycle Tune-Up & Derailleur Adjustment',
        category: 'Home & DIY',
        type: 'want',
        teachingFormat: 'In-person',
        description: 'Want to learn how to change brake pads, index gears, and true bicycle wheels on my vintage touring bike.',
        tags: ['Bicycle', 'Bike Repair', 'Maintenance', 'DIY'],
        urgency: 'Casual'
      }
    ]
  },
  {
    id: 'user-carlos',
    name: 'Carlos Mendez',
    avatar: avatarCarlos,
    email: 'carlos.m@localmusic.co',
    bio: 'Bilingual educator and acoustic musician based near the Grand Lake district. I believe community swaps break social isolation and empower local neighborhoods.',
    neighborhood: 'Grand Lake District',
    city: 'Oakland / Bay Area',
    joinedDate: 'January 2026',
    contactPreference: 'In-app Chat',
    availability: 'Monday & Wednesday 6:00 - 8:30 PM, Sunday afternoons',
    trustScore: 5.0,
    reviewCount: 12,
    hoursGiven: 22,
    hoursReceived: 20,
    completedSwapsCount: 11,
    responseRatePercent: 100,
    averageResponseTime: 'under 30 mins',
    badges: [
      { ...INITIAL_BADGES[0], isUnlocked: true },
      { ...INITIAL_BADGES[1], isUnlocked: true },
      { ...INITIAL_BADGES[2], isUnlocked: true },
      { ...INITIAL_BADGES[4], isUnlocked: false, currentCount: 22, totalNeeded: 25, progress: 88 }
    ],
    skillsOffered: [
      {
        id: 'sk-carlos-1',
        userId: 'user-carlos',
        title: 'Acoustic Guitar & Rhythm Basics',
        category: 'Music & Audio',
        type: 'offer',
        experienceLevel: 'Expert',
        teachingFormat: 'Hybrid',
        description: 'Patient, step-by-step guitar instruction for beginners and intermediates: strumming patterns, fretboard geometry, fingerpicking, and ear training.',
        tags: ['Acoustic Guitar', 'Chords', 'Fretboard', 'Music Theory'],
        sessionDurationMin: 60
      },
      {
        id: 'sk-carlos-2',
        userId: 'user-carlos',
        title: 'Conversational Spanish & Idioms',
        category: 'Languages',
        type: 'offer',
        experienceLevel: 'Expert',
        teachingFormat: 'Hybrid',
        description: 'Native speaker with 8 years tutoring experience. Realistic conversational practice, cultural idioms, past tense mastery, and accent coaching.',
        tags: ['Spanish', 'Language Exchange', 'Conversational', 'Grammar'],
        sessionDurationMin: 60
      }
    ],
    skillsWanted: [
      {
        id: 'sk-carlos-w1',
        userId: 'user-carlos',
        title: 'Web Development & Portfolio Setup',
        category: 'Tech & Coding',
        type: 'want',
        teachingFormat: 'Hybrid',
        description: 'Seeking mentorship to build a clean portfolio site with modern HTML/CSS/React for my local acoustic music projects.',
        tags: ['React', 'Web Dev', 'Portfolio', 'CSS'],
        urgency: 'Dedicated'
      },
      {
        id: 'sk-carlos-w2',
        userId: 'user-carlos',
        title: 'Artisan Sourdough Starter & Baking',
        category: 'Culinary & Baking',
        type: 'want',
        teachingFormat: 'In-person',
        description: 'Always wanted to learn how to keep a healthy sourdough starter and bake rustic crusty loaves from scratch.',
        tags: ['Sourdough', 'Baking', 'Bread'],
        urgency: 'Casual'
      }
    ]
  },
  {
    id: 'user-marina',
    name: 'Marina Chen',
    avatar: avatarMarina,
    email: 'marina.chen.ux@gmail.com',
    bio: 'Product designer & frontend engineer. Passionate about open-source tools, accessible design systems, and building strong neighborhood mutual aid circles.',
    neighborhood: 'Temescal Telegraph',
    city: 'Oakland / Bay Area',
    joinedDate: 'March 2026',
    contactPreference: 'In-app Chat',
    availability: 'Weekdays after 6:30 PM, Saturdays 10:00 AM - 3:00 PM',
    trustScore: 4.8,
    reviewCount: 7,
    hoursGiven: 14,
    hoursReceived: 12,
    completedSwapsCount: 6,
    responseRatePercent: 95,
    averageResponseTime: 'under 2 hours',
    badges: [
      { ...INITIAL_BADGES[0], isUnlocked: true },
      { ...INITIAL_BADGES[1], isUnlocked: true }
    ],
    skillsOffered: [
      {
        id: 'sk-marina-1',
        userId: 'user-marina',
        title: 'Frontend Web Development & React',
        category: 'Tech & Coding',
        type: 'offer',
        experienceLevel: 'Expert',
        teachingFormat: 'Hybrid',
        description: 'Learn modern web crafting: HTML semantics, responsive Tailwind styling, React component logic, state management, and deploying free web apps.',
        tags: ['React', 'TypeScript', 'Web Dev', 'Tailwind CSS'],
        sessionDurationMin: 60
      },
      {
        id: 'sk-marina-2',
        userId: 'user-marina',
        title: 'User Experience (UX) & Figma Prototyping',
        category: 'Arts & Crafts',
        type: 'offer',
        experienceLevel: 'Advanced',
        teachingFormat: 'Online',
        description: 'Turn ideas into clean, user-friendly digital designs. Learn wireframing, typography scales, Figma interactive components, and usability heuristics.',
        tags: ['Figma', 'UX Design', 'Wireframing', 'Prototyping'],
        sessionDurationMin: 60
      }
    ],
    skillsWanted: [
      {
        id: 'sk-marina-w1',
        userId: 'user-marina',
        title: 'Conversational Spanish Practice',
        category: 'Languages',
        type: 'want',
        teachingFormat: 'In-person',
        description: 'Looking for a regular conversation partner to practice listening comprehension and conversational fluency.',
        tags: ['Spanish', 'Language', 'Conversation'],
        urgency: 'Dedicated'
      },
      {
        id: 'sk-marina-w2',
        userId: 'user-marina',
        title: 'Balcony Vegetable Gardening',
        category: 'Gardening & Eco',
        type: 'want',
        teachingFormat: 'In-person',
        description: 'Want to maximize yield on a 6x10 sunny balcony with container herbs, cherry tomatoes, and microgreens.',
        tags: ['Gardening', 'Container Gardening', 'Herbs'],
        urgency: 'Casual'
      }
    ]
  },
  {
    id: 'user-marcus',
    name: 'Marcus Ward',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    email: 'marcus.ward.craft@outlook.com',
    bio: 'Bicycle mechanic & furniture restorer. Advocate for right-to-repair and sustainable craftsmanship. Always happy to trade mechanical knowledge for culinary art or languages.',
    neighborhood: 'Uptown / Downtown',
    city: 'Oakland / Bay Area',
    joinedDate: 'December 2025',
    contactPreference: 'In-app Chat',
    availability: 'Fridays 4:00 - 8:00 PM, Sundays all day',
    trustScore: 4.9,
    reviewCount: 15,
    hoursGiven: 26,
    hoursReceived: 24,
    completedSwapsCount: 13,
    responseRatePercent: 97,
    averageResponseTime: 'under 1 hour',
    badges: INITIAL_BADGES,
    skillsOffered: [
      {
        id: 'sk-marcus-1',
        userId: 'user-marcus',
        title: 'Complete Bicycle Overhaul & Maintenance',
        category: 'Home & DIY',
        type: 'offer',
        experienceLevel: 'Expert',
        teachingFormat: 'In-person',
        description: 'Master practical bike repair: drivetrain deep cleaning, cable tensioning, hydraulic brake bleeds, bottom bracket adjustments, and flat fixes.',
        tags: ['Bicycle Repair', 'Bike Maintenance', 'DIY', 'Mechanics'],
        sessionDurationMin: 75
      },
      {
        id: 'sk-marcus-2',
        userId: 'user-marcus',
        title: 'Wood Joinery & Hand Plane Tuning',
        category: 'Arts & Crafts',
        type: 'offer',
        experienceLevel: 'Advanced',
        teachingFormat: 'In-person',
        description: 'Learn Japanese hand saws, mortise & tenon joints, chisel sharpening to mirror polish, and surface preparation with hand planes.',
        tags: ['Woodworking', 'Joinery', 'Hand Tools', 'Craftsmanship'],
        sessionDurationMin: 90
      }
    ],
    skillsWanted: [
      {
        id: 'sk-marcus-w1',
        userId: 'user-marcus',
        title: 'Artisan Sourdough & Crust Mastery',
        category: 'Culinary & Baking',
        type: 'want',
        teachingFormat: 'In-person',
        description: 'Keen to learn the art of wild sourdough fermentation and open crumb structure.',
        tags: ['Sourdough', 'Baking', 'Fermentation'],
        urgency: 'Casual'
      }
    ]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    authorId: 'user-carlos',
    authorName: 'Carlos Mendez',
    authorAvatar: avatarCarlos,
    targetUserId: 'user-elena',
    skillExchanged: 'Sourdough Workshop for Guitar Basics',
    overallRating: 5,
    punctualityRating: 5,
    knowledgeRating: 5,
    friendlinessRating: 5,
    comment: 'Elena is a fantastic teacher! In just 90 minutes she demystified starter hydration and dough tension. I baked my very first high-hydration sourdough loaf yesterday and it had an incredible blistered crust. An absolute community gem.',
    createdAt: '2 weeks ago',
    isVerifiedSwap: true
  },
  {
    id: 'rev-2',
    authorId: 'user-marina',
    authorName: 'Marina Chen',
    authorAvatar: avatarMarina,
    targetUserId: 'user-elena',
    skillExchanged: 'Permaculture Planning for React Mentoring',
    overallRating: 5,
    punctualityRating: 5,
    knowledgeRating: 5,
    friendlinessRating: 5,
    comment: 'Elena mapped out our community plot with companion plants and nitrogen fixers. Her knowledge of local microclimates and soil biology saved my garden bed. Such a thoughtful and generous neighbor.',
    createdAt: '1 month ago',
    isVerifiedSwap: true
  },
  {
    id: 'rev-3',
    authorId: 'user-elena',
    authorName: 'Elena Gomez',
    authorAvatar: avatarElena,
    targetUserId: 'user-carlos',
    skillExchanged: 'Acoustic Guitar for Sourdough Starter',
    overallRating: 5,
    punctualityRating: 5,
    knowledgeRating: 5,
    friendlinessRating: 5,
    comment: 'Carlos is incredibly patient. He broke down the rhythm patterns and finger placements so clearly that I was playing chord progressions comfortably by the end of our first session. Highly recommended!',
    createdAt: '2 weeks ago',
    isVerifiedSwap: true
  },
  {
    id: 'rev-4',
    authorId: 'user-marcus',
    authorName: 'Marcus Ward',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    targetUserId: 'user-marina',
    skillExchanged: 'Web Portfolio Setup for Bike Overhaul',
    overallRating: 5,
    punctualityRating: 5,
    knowledgeRating: 5,
    friendlinessRating: 5,
    comment: 'Marina helped me organize and launch a clean portfolio site for my hand-crafted furniture. She explained Git and responsive design so clearly without any confusing jargon. Wonderful experience.',
    createdAt: '3 weeks ago',
    isVerifiedSwap: true
  }
];

export const INITIAL_APPOINTMENTS: SwapAppointment[] = [
  {
    id: 'apt-1',
    proposerId: 'user-carlos',
    receiverId: 'user-elena',
    proposerName: 'Carlos Mendez',
    proposerAvatar: avatarCarlos,
    receiverName: 'Elena Gomez',
    receiverAvatar: avatarElena,
    offeredSkillTitle: 'Acoustic Guitar - Lesson 2 Fingerpicking',
    requestedSkillTitle: 'Sourdough Scoring & Oven Spring',
    dateTime: 'Tomorrow at 5:30 PM',
    durationMinutes: 75,
    format: 'In-person',
    location: 'Northside Community Garden Pavilion (Benches area)',
    notes: 'Bring acoustic guitar with capo. Elena will bring active starter jar and proofing basket to share.',
    status: 'Confirmed',
    hasUserReviewed: false
  },
  {
    id: 'apt-2',
    proposerId: 'user-marina',
    receiverId: 'user-elena',
    proposerName: 'Marina Chen',
    proposerAvatar: avatarMarina,
    receiverName: 'Elena Gomez',
    receiverAvatar: avatarElena,
    offeredSkillTitle: 'Figma Design System Architecture',
    requestedSkillTitle: 'Organic Composting & Worm Farming',
    dateTime: 'Saturday, Oct 3 at 10:30 AM',
    durationMinutes: 60,
    format: 'Hybrid',
    location: 'Temescal Tool Lending Library Courtyard',
    notes: 'Marina will review community swap directory wireframes; Elena will show hot compost pile layers.',
    status: 'Confirmed',
    hasUserReviewed: false
  },
  {
    id: 'apt-3',
    proposerId: 'user-marcus',
    receiverId: 'user-elena',
    proposerName: 'Marcus Ward',
    proposerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    receiverName: 'Elena Gomez',
    receiverAvatar: avatarElena,
    offeredSkillTitle: 'Bicycle Drivetrain & Cable Tuning',
    requestedSkillTitle: 'Sourdough Fermentation Fundamentals',
    dateTime: 'Sunday, Oct 4 at 2:00 PM',
    durationMinutes: 90,
    format: 'In-person',
    location: 'Marcus Workshop Garage (Uptown)',
    notes: 'Swap proposal awaiting confirmation.',
    status: 'Pending',
    hasUserReviewed: false
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-carlos',
    participantIds: ['user-elena', 'user-carlos'],
    partnerUser: INITIAL_USERS[1],
    lastMessage: 'Looking forward to our session tomorrow at the pavilion! Capo is packed.',
    lastMessageTime: '10:45 AM',
    unreadCount: 1
  },
  {
    id: 'conv-marina',
    participantIds: ['user-elena', 'user-marina'],
    partnerUser: INITIAL_USERS[2],
    lastMessage: 'The wireframes for our community garden flyer look so clean. See you Saturday!',
    lastMessageTime: 'Yesterday',
    unreadCount: 0
  },
  {
    id: 'conv-marcus',
    participantIds: ['user-elena', 'user-marcus'],
    partnerUser: INITIAL_USERS[3],
    lastMessage: 'Proposed an appointment for Sunday afternoon to tune your vintage touring bike.',
    lastMessageTime: 'Sep 26',
    unreadCount: 0
  }
];

export const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'conv-carlos': [
    {
      id: 'm1',
      conversationId: 'conv-carlos',
      senderId: 'user-carlos',
      senderName: 'Carlos Mendez',
      senderAvatar: avatarCarlos,
      content: 'Hi Elena! Loved your sourdough loaf workshop last week. The crumb was so airy and fragrant!',
      timestamp: 'Yesterday at 3:15 PM'
    },
    {
      id: 'm2',
      conversationId: 'conv-carlos',
      senderId: 'user-elena',
      senderName: 'Elena Gomez',
      senderAvatar: avatarElena,
      content: 'Thank you Carlos! And your breakdown of the Travis picking pattern on guitar was so intuitive. Would you be up for a follow-up session this week?',
      timestamp: 'Yesterday at 4:20 PM'
    },
    {
      id: 'm3',
      conversationId: 'conv-carlos',
      senderId: 'user-carlos',
      senderName: 'Carlos Mendez',
      senderAvatar: avatarCarlos,
      content: 'Definitely! I proposed an appointment for tomorrow at 5:30 PM at the Northside Pavilion.',
      timestamp: 'Today at 10:40 AM',
      isProposal: true,
      proposalDetails: {
        appointmentId: 'apt-1',
        offeredSkill: 'Acoustic Guitar - Fingerpicking',
        requestedSkill: 'Sourdough Scoring & Oven Spring',
        proposedDate: 'Tomorrow at 5:30 PM',
        location: 'Northside Community Garden Pavilion',
        status: 'Confirmed'
      }
    },
    {
      id: 'm4',
      conversationId: 'conv-carlos',
      senderId: 'user-carlos',
      senderName: 'Carlos Mendez',
      senderAvatar: avatarCarlos,
      content: 'Looking forward to our session tomorrow at the pavilion! Capo is packed.',
      timestamp: 'Today at 10:45 AM'
    }
  ],
  'conv-marina': [
    {
      id: 'm20',
      conversationId: 'conv-marina',
      senderId: 'user-marina',
      senderName: 'Marina Chen',
      senderAvatar: avatarMarina,
      content: 'Hey Elena! I prepared the garden layout templates in Figma.',
      timestamp: '2 days ago'
    },
    {
      id: 'm21',
      conversationId: 'conv-marina',
      senderId: 'user-elena',
      senderName: 'Elena Gomez',
      senderAvatar: avatarElena,
      content: 'Awesome Marina, thank you! I have plenty of red wiggler composting worms ready to bring for your planter.',
      timestamp: 'Yesterday at 2:10 PM'
    },
    {
      id: 'm22',
      conversationId: 'conv-marina',
      senderId: 'user-marina',
      senderName: 'Marina Chen',
      senderAvatar: avatarMarina,
      content: 'The wireframes for our community garden flyer look so clean. See you Saturday!',
      timestamp: 'Yesterday at 5:45 PM'
    }
  ],
  'conv-marcus': [
    {
      id: 'm30',
      conversationId: 'conv-marcus',
      senderId: 'user-marcus',
      senderName: 'Marcus Ward',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      content: 'Hey Elena, saw your post looking for derailleur tuning on your touring bike. I have the Park Tool stand ready.',
      timestamp: 'Sep 26 at 11:00 AM'
    },
    {
      id: 'm31',
      conversationId: 'conv-marcus',
      senderId: 'user-marcus',
      senderName: 'Marcus Ward',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      content: 'Proposed an appointment for Sunday afternoon to tune your vintage touring bike.',
      timestamp: 'Sep 26 at 11:05 AM',
      isProposal: true,
      proposalDetails: {
        appointmentId: 'apt-3',
        offeredSkill: 'Bicycle Drivetrain & Cable Tuning',
        requestedSkill: 'Sourdough Fermentation Fundamentals',
        proposedDate: 'Sunday, Oct 4 at 2:00 PM',
        location: 'Marcus Workshop Garage (Uptown)',
        status: 'Pending'
      }
    }
  ]
};
