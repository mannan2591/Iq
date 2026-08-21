import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Question, UserAssessmentProfile, AssessmentResult } from '../types';
import { AdaptiveEngine } from '../services/adaptiveEngine';
import { QuestionVisual } from './QuestionVisual';
import { 
  Clock, 
  ShieldAlert, 
  Zap, 
  CheckCircle2, 
  ArrowRight, 
  AlertTriangle,
  Brain,
  Sparkles,
  AlertOctagon,
  RotateCcw,
  Home,
  ShieldCheck,
  EyeOff,
  UserX
} from 'lucide-react';

interface TestInterfaceProps {
  profile: UserAssessmentProfile;
  onFinishTest: (result: AssessmentResult) => void;
  onAbortTest: () => void;
}

export const TestInterface: React.FC<TestInterfaceProps> = ({
  profile,
  onFinishTest,
  onAbortTest
}) => {
  const engineRef = useRef<AdaptiveEngine>(new AdaptiveEngine(profile));
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [maxTime, setMaxTime] = useState<number>(45);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [difficultyLevel, setDifficultyLevel] = useState<1 | 2 | 3 | 4 | 5>(3);

  // Anti-cheat exit tracking & disqualification state
  const [exitCount, setExitCount] = useState<number>(0);
  const [isDisqualified, setIsDisqualified] = useState<boolean>(false);
  const isDisqualifiedRef = useRef<boolean>(false);
  const [activeWarningModal, setActiveWarningModal] = useState<number | null>(null);
  const lastExitTimestampRef = useRef<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const TOTAL_QUESTIONS = 15;

  // Load next question helper
  const loadQuestion = useCallback((idx: number) => {
    if (isDisqualifiedRef.current) return;

    const nextQ = engineRef.current.getNextQuestion(idx);
    if (!nextQ) {
      // Completed all questions!
      const results = engineRef.current.calculateResults(profile);
      onFinishTest(results);
      return;
    }

    setCurrentQuestion(nextQ);
    setSelectedOptionIndex(null);
    setDifficultyLevel(nextQ.difficulty);
    const limit = nextQ.timeLimitSec || 45;
    setMaxTime(limit);
    setTimeLeft(limit);
    startTimeRef.current = Date.now();
  }, [profile, onFinishTest]);

  // Initial load
  useEffect(() => {
    loadQuestion(0);
  }, [loadQuestion]);

  // Handle anti-cheat window departures / tab switches
  const triggerWindowExitViolation = useCallback(() => {
    if (isDisqualifiedRef.current) return;

    const now = Date.now();
    // Debounce to prevent dual triggers from simultaneous blur and visibilitychange
    if (now - lastExitTimestampRef.current < 900) return;
    lastExitTimestampRef.current = now;

    const newCount = engineRef.current.recordTabSwitch();
    setExitCount(newCount);

    if (newCount >= 3) {
      // 3rd Exit: IMMEDIATELY CANCEL TEST AND MARK AS CHEATED
      if (timerRef.current) clearInterval(timerRef.current);
      isDisqualifiedRef.current = true;
      setIsDisqualified(true);
      setActiveWarningModal(null);
    } else {
      // 1st or 2nd Exit: Trigger interactive warning modal
      setActiveWarningModal(newCount);
    }
  }, []);

  // Anti-cheat listeners: visibility change & window blur
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        triggerWindowExitViolation();
      }
    };

    const handleWindowBlur = () => {
      triggerWindowExitViolation();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
    };
  }, [triggerWindowExitViolation]);

  // Timer countdown
  useEffect(() => {
    if (isDisqualified) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleAutoSubmitOnTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestion, isDisqualified]);

  // Keyboard shortcut listener (1, 2, 3, 4 or Enter)
  useEffect(() => {
    if (isDisqualified || activeWarningModal !== null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (currentQuestion && idx < currentQuestion.options.length) {
          setSelectedOptionIndex(idx);
        }
      } else if (e.key === 'Enter' && selectedOptionIndex !== null && !isSubmitting) {
        handleSubmitAnswer();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentQuestion, selectedOptionIndex, isSubmitting, isDisqualified, activeWarningModal]);

  const handleAutoSubmitOnTimeout = () => {
    if (!currentQuestion || isSubmitting || isDisqualified) return;
    submitStep(-1, maxTime);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || !currentQuestion || isSubmitting || isDisqualified) return;
    const elapsedSec = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
    submitStep(selectedOptionIndex, elapsedSec);
  };

  const submitStep = (choiceIndex: number, timeSpent: number) => {
    if (!currentQuestion || isDisqualified) return;
    setIsSubmitting(true);

    const { nextDifficulty } = engineRef.current.recordAnswer(
      currentQuestion,
      choiceIndex,
      timeSpent
    );

    setDifficultyLevel(nextDifficulty);

    // Brief smooth transition
    setTimeout(() => {
      const nextIdx = questionIndex + 1;
      setQuestionIndex(nextIdx);
      setIsSubmitting(false);
      loadQuestion(nextIdx);
    }, 280);
  };

  // Restart assessment after disqualification with fresh supervision
  const handleRestartFreshAssessment = () => {
    engineRef.current = new AdaptiveEngine(profile);
    setExitCount(0);
    setIsDisqualified(false);
    isDisqualifiedRef.current = false;
    setActiveWarningModal(null);
    setQuestionIndex(0);
    loadQuestion(0);
  };

  // =========================================================================
  // VIEW: 3-EXITS DISQUALIFIED & CHEATING SCREEN
  // =========================================================================
  if (isDisqualified) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-16 animate-in fade-in zoom-in-95 duration-300">
        <div className="glass-panel rounded-3xl p-6 sm:p-10 bg-white/95 border-2 border-rose-300 shadow-2xl relative overflow-hidden">
          {/* Red top security bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-500 via-red-600 to-rose-700" />

          {/* Header & Icon */}
          <div className="text-center pt-2">
            <div className="w-20 h-20 rounded-3xl bg-rose-100 border-2 border-rose-300 text-rose-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-rose-500/15 animate-bounce">
              <AlertOctagon className="w-10 h-10" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-xs font-black uppercase tracking-wider mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              <span>Assessment Canceled — Cheating Detected</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Disqualified for Test Integrity Violation
            </h1>

            <p className="text-sm text-slate-600 mt-3 max-w-md mx-auto leading-relaxed">
              This assessment was terminated because you exited the examination window <strong className="text-rose-600">3 separate times</strong>. 
              Under standardized testing protocols, window departures are marked as unauthorized external assistance.
            </p>
          </div>

          {/* Incident Audit Details Box */}
          <div className="mt-8 p-5 rounded-2xl bg-rose-50/70 border border-rose-200/80 divide-y divide-rose-100 text-xs sm:text-sm">
            <div className="flex items-center justify-between pb-2.5">
              <span className="text-slate-600">Candidate Name:</span>
              <strong className="text-slate-900">{profile.name}</strong>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="text-slate-600">Cohort Category:</span>
              <strong className="text-slate-900">{profile.ageGroup} Years</strong>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="text-slate-600">Recorded Window Departures:</span>
              <span className="font-mono font-bold text-rose-700 bg-rose-200/80 px-2 py-0.5 rounded-md">
                3 of 3 (Limit Exceeded)
              </span>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="text-slate-600">Integrity Outcome:</span>
              <span className="font-extrabold text-rose-700 uppercase tracking-wide">
                DISQUALIFIED & VOIDED
              </span>
            </div>

            <div className="flex items-center justify-between pt-2.5">
              <span className="text-slate-600">Certificate & Ranking:</span>
              <span className="text-slate-500 font-medium italic">
                No Certificate / Not Ranked
              </span>
            </div>
          </div>

          {/* Security Explanation */}
          <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <UserX className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <p>
              To safeguard test validity and maintain fair comparative percentiles across all candidates, IQMANIA assessments must be completed continuously in a single, focused session.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3.5">
            <button
              onClick={onAbortTest}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return to Home</span>
            </button>

            <button
              onClick={handleRestartFreshAssessment}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake with Supervised Integrity</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-600 font-medium text-sm">Calibrating question matrix...</p>
      </div>
    );
  }

  const progressPercentage = Math.round(((questionIndex + 1) / TOTAL_QUESTIONS) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">
      
      {/* Top Interactive Anti-Cheat Warning Modal (Exit 1 or Exit 2) */}
      {activeWarningModal !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 bg-white/95 border-2 shadow-2xl relative ${
            activeWarningModal === 2 ? 'border-red-400' : 'border-amber-400'
          }`}>
            <div className="text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                activeWarningModal === 2 
                  ? 'bg-red-100 text-red-600 border border-red-200' 
                  : 'bg-amber-100 text-amber-600 border border-amber-200'
              }`}>
                <AlertTriangle className="w-8 h-8" />
              </div>

              <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 ${
                activeWarningModal === 2 
                  ? 'bg-red-100 text-red-800 border border-red-200' 
                  : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
                {activeWarningModal === 2 ? 'Final Warning (Incident 2 of 3)' : 'Integrity Warning (Incident 1 of 3)'}
              </span>

              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                {activeWarningModal === 2 
                  ? 'Critical Warning: Window Exit Detected' 
                  : 'Window Departure Recorded'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
                {activeWarningModal === 2 ? (
                  <>
                    You have navigated away from the assessment window <strong className="text-red-600">2 times</strong>. 
                    If you exit or switch windows <strong className="text-red-600">ONE MORE TIME (3rd exit)</strong>, your test will be instantly canceled and marked as cheated.
                  </>
                ) : (
                  <>
                    Leaving the assessment window was recorded by the proctoring monitor (1st incident). 
                    To ensure score validity, please stay on this active screen. Leaving the window 3 times will result in immediate disqualification.
                  </>
                )}
              </p>

              {/* Progress counter indicators */}
              <div className="flex items-center justify-center gap-2 mt-5 mb-6">
                <div className="w-8 h-2.5 rounded-full bg-amber-500" title="Exit 1 Recorded" />
                <div className={`w-8 h-2.5 rounded-full transition-colors ${
                  activeWarningModal === 2 ? 'bg-red-500' : 'bg-slate-200'
                }`} title="Exit 2" />
                <div className="w-8 h-2.5 rounded-full bg-slate-200" title="Exit 3 (Cancel Test)" />
              </div>

              <button
                onClick={() => setActiveWarningModal(null)}
                className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm text-white shadow-md transition-all cursor-pointer ${
                  activeWarningModal === 2 
                    ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20' 
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'
                }`}
              >
                {activeWarningModal === 2 ? 'I Understand — Resume (Final Chance)' : 'I Understand & Return to Test'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Test Screen Glass Panel */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 relative overflow-hidden bg-white/90 border border-white shadow-xl">
        
        {/* Top Header Row: Progress, Category, Difficulty, Timer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200/80">
          
          {/* Question Index & Category */}
          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-extrabold text-xs tracking-wider uppercase">
              Question {questionIndex + 1} of {TOTAL_QUESTIONS}
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-indigo-500" />
              <span>{currentQuestion.category}</span>
            </div>
          </div>

          {/* Anti-Cheat Indicator, Difficulty & Timer */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Anti-Cheat Live Monitor Badge */}
            <div 
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                exitCount === 0
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
                  : exitCount === 1
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse font-bold'
              }`}
              title="Anti-cheat window departure counter (3 exits cancels test)"
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${exitCount > 0 ? 'text-amber-600' : 'text-emerald-600'}`} />
              <span className="hidden sm:inline">Exits:</span>
              <span>{exitCount}/3</span>
            </div>

            {/* Adaptive Difficulty Gauge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 border border-slate-200 text-xs text-slate-600 font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span className="hidden sm:inline">Difficulty:</span>
              <div className="flex items-center gap-0.5 ml-1">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <span
                    key={lvl}
                    className={`w-2 h-3.5 rounded-xs transition-all ${
                      lvl <= difficultyLevel ? 'bg-indigo-600' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Timer Badge */}
            <div
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all ${
                timeLeft <= 10
                  ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
                  : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>{timeLeft}s</span>
            </div>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full h-1.5 bg-slate-100 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {/* Question Body */}
        <div className="mt-8 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
            {currentQuestion.question}
          </h2>
          {currentQuestion.subtext && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium">
              {currentQuestion.subtext}
            </p>
          )}

          {/* Visual Diagram / Matrix Area */}
          <QuestionVisual payload={currentQuestion.visualPayload} questionId={currentQuestion.id} />
        </div>

        {/* 4 Large Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOptionIndex === idx;
            const letter = String.fromCharCode(65 + idx); // A, B, C, D
            return (
              <button
                key={idx}
                id={`option-btn-${idx}`}
                disabled={isSubmitting}
                onClick={() => setSelectedOptionIndex(idx)}
                className={`p-4 rounded-2xl border text-left transition-all relative flex items-center justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25 scale-[1.01]'
                    : 'bg-white/90 text-slate-800 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-7 h-7 rounded-xl font-bold text-xs flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="font-semibold text-sm sm:text-base leading-snug">
                    {option}
                  </span>
                </div>

                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Actions Row */}
        <div className="mt-8 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="kbd px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 font-mono text-[10px]">
              Keys 1-4
            </span>
            <span>or click option, then hit</span>
            <span className="kbd px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 font-mono text-[10px]">
              Enter
            </span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onAbortTest}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              Quit Test
            </button>

            <button
              id="submit-answer-btn"
              disabled={selectedOptionIndex === null || isSubmitting}
              onClick={handleSubmitAnswer}
              className={`px-7 py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all cursor-pointer ${
                selectedOptionIndex !== null && !isSubmitting
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-500/25 active:scale-98'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>{questionIndex === TOTAL_QUESTIONS - 1 ? 'Finish Assessment' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
