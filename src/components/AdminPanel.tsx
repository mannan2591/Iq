import React, { useState } from 'react';
import { Question, QuestionCategory, AgeGroup } from '../types';
import { INITIAL_QUESTION_BANK, AGE_GROUP_RANGES } from '../data/questionBank';
import { CertificateService } from '../services/certificateService';
import { 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Search, 
  CheckCircle2, 
  Database,
  Award,
  Sparkles
} from 'lucide-react';

interface AdminPanelProps {
  onBackToApp: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToApp }) => {
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTION_BANK);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editForm, setEditForm] = useState<Question>({
    id: '',
    ageGroups: ['18-25', '26-40'],
    category: 'Logical Reasoning',
    difficulty: 3,
    question: '',
    options: ['', '', '', ''],
    correctIndex: 0,
    explanation: ''
  });

  const categories: QuestionCategory[] = [
    'Pattern Recognition',
    'Numerical Reasoning',
    'Logical Reasoning',
    'Spatial Reasoning',
    'Verbal Reasoning',
    'Memory',
    'Processing Speed'
  ];

  const allAgeGroups: AgeGroup[] = ['6-8', '9-11', '12-14', '15-17', '18-25', '26-40', '41-60', '61+'];

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          q.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || q.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenCreate = () => {
    setEditForm({
      id: `q-custom-${Date.now().toString().slice(-4)}`,
      ageGroups: ['18-25', '26-40'],
      category: 'Logical Reasoning',
      difficulty: 3,
      question: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      explanation: ''
    });
    setIsEditing(true);
  };

  const handleOpenEdit = (q: Question) => {
    setEditForm({ ...q, options: [...q.options] });
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this question?')) {
      setQuestions(prev => prev.filter(q => q.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm.question.trim() || editForm.options.some(o => !o.trim())) {
      alert('Please fill out the question and all 4 option choices.');
      return;
    }

    setQuestions(prev => {
      const exists = prev.some(q => q.id === editForm.id);
      if (exists) {
        return prev.map(q => q.id === editForm.id ? editForm : q);
      }
      return [editForm, ...prev];
    });

    setIsEditing(false);
  };

  const toggleAgeGroupInForm = (group: AgeGroup) => {
    setEditForm(prev => {
      const current = prev.ageGroups;
      if (current.includes(group)) {
        return { ...prev, ageGroups: current.filter(g => g !== group) };
      } else {
        return { ...prev, ageGroups: [...current, group] };
      }
    });
  };

  const handleOptionChange = (idx: number, val: string) => {
    setEditForm(prev => {
      const opts = [...prev.options];
      opts[idx] = val;
      return { ...prev, options: opts };
    });
  };

  const totalCerts = CertificateService.getAllCertificates().length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Database className="w-3.5 h-3.5" />
            <span>Administrative Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Question Bank & System Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage cognitive item items, difficulty calibration, and age-normed distributions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToApp}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200"
          >
            ← Exit Admin
          </button>
          <button
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {/* Quick Statistics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Active Questions</div>
          <div className="text-2xl font-black text-slate-800 mt-1">{questions.length}</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Cognitive Domains</div>
          <div className="text-2xl font-black text-indigo-700 mt-1">7</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Age Tiers</div>
          <div className="text-2xl font-black text-purple-700 mt-1">8</div>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="text-[11px] font-bold text-slate-400 uppercase">Issued Certificates</div>
          <div className="text-2xl font-black text-emerald-700 mt-1">{totalCerts}</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions by text or ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto max-w-full w-full sm:w-auto pb-1 sm:pb-0">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 outline-hidden"
          >
            <option value="all">All Categories ({questions.length})</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions Table / List */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 bg-white/95 border border-white shadow-xl overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filteredQuestions.map((q) => (
            <div key={q.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 p-3 rounded-2xl transition-colors">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {q.id}
                  </span>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                    {q.category}
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md">
                    Diff {q.difficulty}/5
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    Ages: {q.ageGroups.join(', ')}
                  </span>
                </div>

                <div className="font-semibold text-sm text-slate-900 leading-snug">
                  {q.question}
                </div>

                <div className="text-xs text-slate-500 truncate">
                  Correct Answer: <strong className="text-emerald-700">{q.options[q.correctIndex]}</strong>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => handleOpenEdit(q)}
                  className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  title="Edit question"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(q.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete question"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit / Create Question Modal Dialog */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <h2 className="text-lg font-bold text-slate-900">
                {editForm.id.includes('custom') ? 'Create New Question' : `Edit Question: ${editForm.id}`}
              </h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              {/* Question Text */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Question Prompt
                </label>
                <textarea
                  rows={2}
                  required
                  value={editForm.question}
                  onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-hidden"
                />
              </div>

              {/* Category & Difficulty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Cognitive Domain Category
                  </label>
                  <select
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value as QuestionCategory })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white outline-hidden"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Difficulty Tier (1 = Easy, 5 = Master)
                  </label>
                  <select
                    value={editForm.difficulty}
                    onChange={(e) => setEditForm({ ...editForm, difficulty: parseInt(e.target.value, 10) as any })}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white outline-hidden"
                  >
                    {[1, 2, 3, 4, 5].map(lvl => (
                      <option key={lvl} value={lvl}>Level {lvl}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Age Groups Multiple Selector */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Assigned Age Cohorts
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {allAgeGroups.map(group => {
                    const isSelected = editForm.ageGroups.includes(group);
                    return (
                      <button
                        type="button"
                        key={group}
                        onClick={() => toggleAgeGroupInForm(group)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {group}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4 Options & Correct Answer Selector */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Answer Choices (Select radio for correct answer)
                </label>
                <div className="space-y-2">
                  {editForm.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="correctAnswerIndex"
                        checked={editForm.correctIndex === idx}
                        onChange={() => setEditForm({ ...editForm, correctIndex: idx })}
                        className="w-4 h-4 text-indigo-600 cursor-pointer"
                      />
                      <span className="font-mono font-bold text-slate-500 w-5">
                        {String.fromCharCode(65 + idx)}:
                      </span>
                      <input
                        type="text"
                        required
                        value={opt}
                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                        placeholder={`Option ${idx + 1}`}
                        className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-hidden"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Solution Rationale / Explanation
                </label>
                <textarea
                  rows={2}
                  value={editForm.explanation}
                  onChange={(e) => setEditForm({ ...editForm, explanation: e.target.value })}
                  placeholder="Explain why the designated option is logically correct..."
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-500 outline-hidden"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2.5 rounded-xl font-semibold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Question</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
