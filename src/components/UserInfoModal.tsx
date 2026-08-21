import React, { useState } from 'react';
import { UserAssessmentProfile, AgeGroup } from '../types';
import { AGE_GROUP_RANGES, getAgeGroupFromAge } from '../data/questionBank';
import { 
  User, 
  Sparkles, 
  Brain, 
  ArrowRight, 
  X, 
  Shield, 
  Check, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTest: (profile: UserAssessmentProfile) => void;
}

export const UserInfoModal: React.FC<UserInfoModalProps> = ({
  isOpen,
  onClose,
  onStartTest
}) => {
  const [step, setStep] = useState<'details' | 'instructions'>('details');
  const [fullName, setFullName] = useState('');
  const [nickname, setNickname] = useState('');
  const [ageInput, setAgeInput] = useState<number | ''>(24);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>('18-25');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAgeChange = (val: string) => {
    const num = parseInt(val, 10);
    if (isNaN(num)) {
      setAgeInput('');
      return;
    }
    setAgeInput(num);
    if (num >= 6 && num <= 120) {
      setSelectedAgeGroup(getAgeGroupFromAge(num));
      setErrorMessage(null);
    }
  };

  const handleSelectGroupDirectly = (group: AgeGroup) => {
    setSelectedAgeGroup(group);
    const range = AGE_GROUP_RANGES.find(r => r.id === group);
    if (range) {
      setAgeInput(range.minAge);
    }
  };

  const handleProceedToInstructions = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name for certificate generation.');
      return;
    }
    if (typeof ageInput !== 'number' || ageInput < 6 || ageInput > 120) {
      setErrorMessage('Please enter a valid age between 6 and 120 years.');
      return;
    }

    setErrorMessage(null);
    setStep('instructions');
  };

  const handleLaunchAssessment = () => {
    const profile: UserAssessmentProfile = {
      name: fullName.trim(),
      nickname: nickname.trim() || undefined,
      age: typeof ageInput === 'number' ? ageInput : 24,
      ageGroup: selectedAgeGroup
    };
    onStartTest(profile);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 bg-white/95 border border-white shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close setup modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step 1: User Profile & Age Selection */}
        {step === 'details' && (
          <form onSubmit={handleProceedToInstructions}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Assessment Profile
                </h2>
                <p className="text-xs text-slate-500">
                  Calibrate your assessment questions based on your verified age group.
                </p>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name (Appears on Certificate) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-hidden"
                  />
                </div>
              </div>

              {/* Nickname & Age inputs row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Age Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Exact Age (Years) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="6"
                    max="120"
                    required
                    value={ageInput}
                    onChange={(e) => handleAgeChange(e.target.value)}
                    placeholder="e.g. 24"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-hidden"
                  />
                </div>

                {/* Nickname */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center justify-between">
                    <span>Nickname (Leaderboard)</span>
                    <span className="text-[10px] text-slate-400 font-normal">Optional</span>
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="e.g. QuantumMind"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-hidden"
                  />
                </div>
              </div>

              {/* Age Group Tiers Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Calibrated Age Group Tier
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AGE_GROUP_RANGES.map((group) => {
                    const isSelected = selectedAgeGroup === group.id;
                    return (
                      <button
                        type="button"
                        key={group.id}
                        onClick={() => handleSelectGroupDirectly(group.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-indigo-50/90 border-indigo-500 text-indigo-900 font-bold shadow-xs'
                            : 'bg-white/80 border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-xs font-extrabold flex items-center justify-between">
                          <span>{group.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  {AGE_GROUP_RANGES.find(g => g.id === selectedAgeGroup)?.description}
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-7 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-slate-600">
                <Shield className="w-3.5 h-3.5 text-emerald-600" />
                <span>Private & Encrypted</span>
              </div>

              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Continue to Instructions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Test Protocol & Instructions */}
        {step === 'instructions' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Assessment Protocol
                </h2>
                <p className="text-xs text-slate-500">
                  Please review these guidelines before beginning the assessment.
                </p>
              </div>
            </div>

            <div className="space-y-3.5 bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  1
                </div>
                <div>
                  <strong className="text-slate-900">15 Dynamic Questions:</strong> Randomly drawn from a 100-question calibrated bank. The test adapts to your responses—correct answers scale difficulty while maintaining balanced cognitive domain coverage.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  2
                </div>
                <div>
                  <strong className="text-slate-900">Timed Responses:</strong> Each question has a generous countdown timer. Work at a steady, accurate pace.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  3
                </div>
                <div>
                  <strong className="text-slate-900">Anti-Cheat Enforcement:</strong> Remain focused on this assessment window. Exiting the window or switching tabs <span className="text-rose-600 font-semibold">3 times will instantly cancel the test and mark your attempt as disqualified/cheated</span>.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  4
                </div>
                <div>
                  <strong className="text-slate-900">Informal Assessment:</strong> This delivers an estimated cognitive score for self-insight and is not a clinical medical diagnosis.
                </div>
              </div>
            </div>

            <div className="mt-6 p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between text-xs text-indigo-900">
              <div>
                Candidate: <span className="font-bold">{fullName}</span> ({selectedAgeGroup} Group)
              </div>
              <button
                onClick={() => setStep('details')}
                className="text-indigo-600 font-semibold underline hover:text-indigo-800 text-xs"
              >
                Edit Details
              </button>
            </div>

            {/* Launch Assessment Button */}
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleLaunchAssessment}
                className="px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 flex items-center gap-2 cursor-pointer transition-all active:scale-98"
              >
                <span>Begin Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
