import React, { useEffect, useState } from 'react';
import { BrainLogo } from './BrainLogo';
import { Brain, Sparkles, CheckCircle2 } from 'lucide-react';

interface AnalysisLoaderProps {
  onComplete: () => void;
}

export const AnalysisLoader: React.FC<AnalysisLoaderProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    'Parsing adaptive item responses and difficulty weights...',
    'Normalizing against standard age-cohort distributions...',
    'Computing Gaussian percentile and standard error curve...',
    'Synthesizing 7-domain cognitive profile...',
    'Generating verified cryptographic certificate signature...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(onComplete, 600);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="glass-panel rounded-3xl p-8 sm:p-12 max-w-lg w-full bg-white/95 border border-white shadow-2xl relative overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Pulsing Brain Icon Visual */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-3xl animate-ping opacity-25" />
          <div className="relative w-full h-full bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-indigo-500/30">
            <Brain className="w-10 h-10 animate-pulse" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Analyzing Your Results...
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm mx-auto">
          Please wait while the IQMANIA cognitive engine evaluates your assessment matrix.
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-100 rounded-full my-6 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${Math.min(100, ((currentStepIndex + 1) / steps.length) * 100)}%` }}
          />
        </div>

        {/* Current Analytical Step Status */}
        <div className="space-y-2 text-left bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
          {steps.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div 
                key={idx}
                className={`text-xs flex items-center gap-2.5 transition-all ${
                  isDone 
                    ? 'text-emerald-700 font-semibold' 
                    : isCurrent 
                    ? 'text-indigo-600 font-bold animate-pulse' 
                    : 'text-slate-400'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                )}
                <span>{step}</span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
