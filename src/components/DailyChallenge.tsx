import React, { useState, useEffect } from 'react';
import { DAILY_CHALLENGES } from '../data/questionBank';
import { CertificateService } from '../services/certificateService';
import { DailyChallengeItem } from '../types';
import { 
  Flame, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Calendar, 
  Clock, 
  Zap,
  ArrowRight,
  Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DailyChallengeProps {
  onStreakUpdate?: (newStreak: number) => void;
  onTakeFullAssessment: () => void;
}

export const DailyChallenge: React.FC<DailyChallengeProps> = ({
  onStreakUpdate,
  onTakeFullAssessment
}) => {
  const [streakData, setStreakData] = useState(() => CertificateService.getDailyStreak());
  const [currentChallenge, setCurrentChallenge] = useState<DailyChallengeItem>(DAILY_CHALLENGES[0]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  useEffect(() => {
    // Pick today's challenge based on day index
    const dayIndex = new Date().getDate() % DAILY_CHALLENGES.length;
    setCurrentChallenge(DAILY_CHALLENGES[dayIndex]);
  }, []);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    const correct = idx === currentChallenge.correctIndex;
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (e) {
        console.log(e);
      }
      const updated = CertificateService.recordDailyCompleted();
      setStreakData(updated as any);
      if (onStreakUpdate) {
        onStreakUpdate(updated.currentStreak);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-14">
      {/* Top Header & Streak Stats */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Daily Mental Workout</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Daily Brain Challenge
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            A new calibrated reasoning puzzle every 24 hours to hone cognitive agility.
          </p>
        </div>

        {/* Streak Counter Card */}
        <div className="glass-pill px-5 py-3 rounded-2xl flex items-center gap-3.5 shadow-sm border border-amber-200/80 bg-amber-50/60">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30">
            <Flame className="w-6 h-6 fill-current animate-bounce" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-900">
              Active Daily Streak
            </div>
            <div className="text-xl font-black text-amber-950 font-display">
              {streakData.currentStreak} Days
            </div>
          </div>
        </div>
      </div>

      {/* Main Challenge Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 bg-white/95 border border-white shadow-xl relative overflow-hidden">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs">
              {currentChallenge.category}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-600 font-medium">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Difficulty: Level {currentChallenge.difficulty}/5</span>
          </div>
        </div>

        {/* Challenge Question */}
        <div className="my-6">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
            {currentChallenge.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-700 mt-3 leading-relaxed">
            {currentChallenge.question}
          </p>
        </div>

        {/* 4 Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {currentChallenge.options.map((opt, idx) => {
            const isChosen = selectedOption === idx;
            const isThisCorrect = idx === currentChallenge.correctIndex;
            let btnStyle = 'bg-white text-slate-800 border-slate-200 hover:border-indigo-300 hover:bg-slate-50';

            if (isAnswered) {
              if (isThisCorrect) {
                btnStyle = 'bg-emerald-50 text-emerald-900 border-emerald-500 font-bold shadow-xs';
              } else if (isChosen && !isThisCorrect) {
                btnStyle = 'bg-rose-50 text-rose-900 border-rose-400 font-semibold';
              } else {
                btnStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
              >
                <span className="text-sm font-medium">{opt}</span>
                {isAnswered && isThisCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {isAnswered && isChosen && !isThisCorrect && (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation & Feedback Reveal */}
        {isAnswered && (
          <div className={`mt-6 p-5 rounded-2xl border text-xs sm:text-sm animate-in fade-in ${
            isCorrect 
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950' 
              : 'bg-indigo-50/80 border-indigo-200 text-indigo-950'
          }`}>
            <div className="font-bold flex items-center gap-2 mb-1.5">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Correct! +1 Streak Day Added</span>
                </>
              ) : (
                <>
                  <HelpCircle className="w-4 h-4 text-indigo-600" />
                  <span>Solution Breakdown</span>
                </>
              )}
            </div>
            <p className="leading-relaxed">{currentChallenge.explanation}</p>
          </div>
        )}

        {/* Next Step / Full Test CTA */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Want to test all 7 cognitive domains?
          </div>

          <button
            onClick={onTakeFullAssessment}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <span>Take Full Age-Adaptive Test</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
