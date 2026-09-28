import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES_META } from '../data/mockData';
import { SkillCategory, ExperienceLevel, TeachingFormat, SwapUrgency, SkillItem } from '../types';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  BookOpen, 
  Compass, 
  CheckCircle2, 
  HelpCircle,
  X,
  Search
} from 'lucide-react';

export const MySkillsView: React.FC = () => {
  const { 
    currentUser, 
    addOfferedSkill, 
    editOfferedSkill, 
    deleteOfferedSkill, 
    addWantedSkill, 
    deleteWantedSkill,
    setSelectedCategory,
    setActiveTab
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'offer' | 'want'>('offer');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<SkillCategory>('Tech & Coding');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Intermediate');
  const [teachingFormat, setTeachingFormat] = useState<TeachingFormat>('In-person');
  const [sessionDurationMin, setSessionDurationMin] = useState(60);
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [urgency, setUrgency] = useState<SwapUrgency>('Dedicated');

  const openAddModal = (type: 'offer' | 'want') => {
    setActiveSubTab(type);
    setEditingSkill(null);
    setTitle('');
    setCategory('Tech & Coding');
    setExperienceLevel('Intermediate');
    setTeachingFormat('In-person');
    setSessionDurationMin(60);
    setDescription('');
    setTagsInput('');
    setUrgency('Dedicated');
    setIsAddModalOpen(true);
  };

  const openEditModal = (skill: SkillItem) => {
    setEditingSkill(skill);
    setTitle(skill.title);
    setCategory(skill.category);
    setExperienceLevel(skill.experienceLevel || 'Intermediate');
    setTeachingFormat(skill.teachingFormat);
    setSessionDurationMin(skill.sessionDurationMin || 60);
    setDescription(skill.description);
    setTagsInput(skill.tags.join(', '));
    setUrgency(skill.urgency || 'Dedicated');
    setIsAddModalOpen(true);
  };

  const handleSaveSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    if (activeSubTab === 'offer') {
      if (editingSkill) {
        editOfferedSkill(editingSkill.id, {
          title,
          category,
          experienceLevel,
          teachingFormat,
          sessionDurationMin,
          description,
          tags
        });
      } else {
        addOfferedSkill({
          title,
          category,
          experienceLevel,
          teachingFormat,
          sessionDurationMin,
          description,
          tags
        });
      }
    } else {
      addWantedSkill({
        title,
        category,
        teachingFormat,
        urgency,
        description,
        tags
      });
    }

    setIsAddModalOpen(false);
  };

  const handleFindPartnersForSkill = (cat: SkillCategory) => {
    setSelectedCategory(cat);
    setActiveTab('search');
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manage My Community Skills
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keep your teaching offerings and learning goals updated so neighbours can find reciprocal matches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openAddModal('offer')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Offer a Skill</span>
          </button>

          <button
            onClick={() => openAddModal('want')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add to Wishlist</span>
          </button>
        </div>
      </div>

      {/* Segmented Switcher for Offer vs Wishlist */}
      <div className="flex items-center p-1 bg-slate-100 rounded-xl w-full sm:w-fit">
        <button
          onClick={() => setActiveSubTab('offer')}
          className={`flex-1 sm:flex-initial px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSubTab === 'offer'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Skills I Offer to Neighbors ({currentUser.skillsOffered.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('want')}
          className={`flex-1 sm:flex-initial px-5 py-2 text-xs font-semibold rounded-lg transition-all ${
            activeSubTab === 'want'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Skills I Want to Learn ({currentUser.skillsWanted.length})</span>
        </button>
      </div>

      {/* Offerings Section */}
      {activeSubTab === 'offer' && (
        <div className="space-y-4">
          {currentUser.skillsOffered.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">You haven't listed any skills yet</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Everyone has valuable crafts or life knowledge to share. List what you're comfortable teaching to start trading.
              </p>
              <button
                onClick={() => openAddModal('offer')}
                className="mt-2 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                List Your First Skill
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentUser.skillsOffered.map(skill => (
                <div 
                  key={skill.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wide">
                          {skill.category}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mt-0.5">
                          {skill.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(skill)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit skill"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteOfferedSkill(skill.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete skill"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Clean unboxed metadata with separators */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span>{skill.experienceLevel}</span>
                      <span aria-hidden="true">·</span>
                      <span>{skill.teachingFormat}</span>
                      {skill.sessionDurationMin && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{skill.sessionDurationMin} mins / session</span>
                        </>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {skill.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                      {skill.tags.map((tag, idx) => (
                        <React.Fragment key={tag}>
                          <span className="text-slate-600">#{tag}</span>
                          {idx < skill.tags.length - 1 && <span aria-hidden="true" className="text-slate-300">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Ready for swap proposals</span>
                    </span>
                    <button
                      onClick={() => handleFindPartnersForSkill(skill.category)}
                      className="text-emerald-700 hover:underline font-semibold flex items-center gap-1"
                    >
                      <Search className="w-3 h-3" />
                      <span>Find reciprocal learners</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Wishlist Section */}
      {activeSubTab === 'want' && (
        <div className="space-y-4">
          {currentUser.skillsWanted.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl border border-dashed border-slate-300 text-center space-y-3">
              <Compass className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">Your wishlist is empty</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                What have you always wanted to learn? List skills here and neighbors with those talents will see you in their search.
              </p>
              <button
                onClick={() => openAddModal('want')}
                className="mt-2 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Add Desired Skill
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentUser.skillsWanted.map(skill => (
                <div 
                  key={skill.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wide">
                          {skill.category}
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mt-0.5">
                          {skill.title}
                        </h3>
                      </div>
                      
                      <button
                        onClick={() => deleteWantedSkill(skill.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span>Format: {skill.teachingFormat}</span>
                      {skill.urgency && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>Interest: {skill.urgency}</span>
                        </>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {skill.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 pt-1">
                      {skill.tags.map((tag, idx) => (
                        <React.Fragment key={tag}>
                          <span className="text-slate-600">#{tag}</span>
                          {idx < skill.tags.length - 1 && <span aria-hidden="true" className="text-slate-300">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">
                      Seeking neighbor teacher
                    </span>
                    <button
                      onClick={() => handleFindPartnersForSkill(skill.category)}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold rounded-lg border border-emerald-200 flex items-center gap-1.5 transition-colors"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Find Teachers Now</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal for Add / Edit Skill */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900">
                {activeSubTab === 'offer' 
                  ? (editingSkill ? 'Edit Offered Skill' : 'List a Skill You Offer')
                  : 'Add Skill to Your Learning Wishlist'
                }
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="space-y-4 text-xs">
              
              {/* Title */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Skill Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder={activeSubTab === 'offer' ? 'e.g. Sourdough Bread Craft & Starter' : 'e.g. Conversational Spanish or Acoustic Guitar'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as SkillCategory)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {CATEGORIES_META.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Format & Experience/Urgency */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Teaching Format
                  </label>
                  <select
                    value={teachingFormat}
                    onChange={(e) => setTeachingFormat(e.target.value as TeachingFormat)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none"
                  >
                    <option value="In-person">In-person</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Online">Online</option>
                  </select>
                </div>

                {activeSubTab === 'offer' ? (
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Experience Level
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Interest Level
                    </label>
                    <select
                      value={urgency}
                      onChange={(e) => setUrgency(e.target.value as SwapUrgency)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none"
                    >
                      <option value="Casual">Casual hobby</option>
                      <option value="Dedicated">Dedicated learner</option>
                      <option value="Urgent">Active goal</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Session Duration (for offered skills) */}
              {activeSubTab === 'offer' && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Suggested Session Duration
                  </label>
                  <select
                    value={sessionDurationMin}
                    onChange={(e) => setSessionDurationMin(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes (Standard)</option>
                    <option value={75}>75 minutes</option>
                    <option value={90}>90 minutes</option>
                    <option value={120}>120 minutes</option>
                  </select>
                </div>
              )}

              {/* Description */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Description & What to Expect *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder={activeSubTab === 'offer' ? 'Explain what you will teach, materials you will provide or bring, and beginner friendliness...' : 'Describe what you want to achieve or specific concepts you need help with...'}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Keywords & Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sourdough, Bread, Fermentation, Yeast"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Form buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold shadow-xs transition-colors"
                >
                  Save Skill
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
