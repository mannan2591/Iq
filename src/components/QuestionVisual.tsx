import React, { useState, useEffect } from 'react';
import { VisualPayload } from '../types';
import { HelpCircle, Eye, Clock } from 'lucide-react';

interface QuestionVisualProps {
  payload?: VisualPayload;
  questionId: string;
}

export const QuestionVisual: React.FC<QuestionVisualProps> = ({ payload, questionId }) => {
  const [memoryRevealed, setMemoryRevealed] = useState(true);
  const [memoryCountdown, setMemoryCountdown] = useState(payload?.memoryDisplaySec || 5);

  useEffect(() => {
    if (payload?.type === 'memory-card') {
      const displayTime = payload.memoryDisplaySec || 4;
      setMemoryRevealed(true);
      setMemoryCountdown(displayTime);

      const interval = setInterval(() => {
        setMemoryCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setMemoryRevealed(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [questionId, payload]);

  if (!payload) return null;

  return (
    <div className="w-full my-4 flex flex-col items-center justify-center p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-xs">
      {/* 3x3 Matrix Grid */}
      {payload.type === 'matrix-3x3' && payload.matrixGrid && (
        <div className="flex flex-col items-center">
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            3×3 Matrix Pattern
          </div>
          <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-slate-100/90 border border-slate-200 shadow-inner max-w-xs sm:max-w-sm">
            {payload.matrixGrid.flat().map((cell, idx) => {
              const isMissing = cell === '?' || cell === '❓';
              return (
                <div
                  key={idx}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center font-mono font-bold text-lg sm:text-xl transition-all ${
                    isMissing
                      ? 'bg-indigo-50/90 text-indigo-600 border-2 border-dashed border-indigo-400 animate-pulse'
                      : 'bg-white text-slate-800 border border-slate-200/90 shadow-xs'
                  }`}
                >
                  {isMissing ? (
                    <HelpCircle className="w-7 h-7 text-indigo-500 animate-bounce" />
                  ) : (
                    <span>{cell}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2x2 Matrix Grid */}
      {payload.type === 'matrix-2x2' && payload.matrixGrid && (
        <div className="flex flex-col items-center">
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            2×2 Logical Grid
          </div>
          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-100/90 border border-slate-200 shadow-inner">
            {payload.matrixGrid.flat().map((cell, idx) => {
              const isMissing = cell === '?' || cell === '❓';
              return (
                <div
                  key={idx}
                  className={`w-20 h-20 rounded-xl flex items-center justify-center font-mono font-bold text-2xl transition-all ${
                    isMissing
                      ? 'bg-indigo-50 text-indigo-600 border-2 border-dashed border-indigo-400'
                      : 'bg-white text-slate-800 border border-slate-200/90 shadow-xs'
                  }`}
                >
                  {isMissing ? (
                    <HelpCircle className="w-8 h-8 text-indigo-500" />
                  ) : (
                    <span>{cell}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Shapes / Token Sequence */}
      {payload.type === 'shapes-sequence' && payload.items && (
        <div className="w-full flex flex-col items-center">
          <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
            Sequence Progression
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-full">
            {payload.items.map((item, idx) => {
              const isMissing = item === '?' || item === '❓';
              return (
                <div key={idx} className="flex items-center">
                  <div
                    className={`min-w-[48px] sm:min-w-[56px] h-12 sm:h-14 px-3 rounded-xl flex items-center justify-center font-bold text-base sm:text-lg transition-transform ${
                      isMissing
                        ? 'bg-indigo-50 text-indigo-600 border-2 border-dashed border-indigo-400 animate-pulse'
                        : 'bg-white text-slate-800 border border-slate-200 shadow-xs hover:scale-105'
                    }`}
                  >
                    {isMissing ? (
                      <span className="font-mono text-indigo-600 text-xl font-extrabold">?</span>
                    ) : (
                      <span>{item}</span>
                    )}
                  </div>
                  {idx < (payload.items?.length || 0) - 1 && (
                    <span className="text-slate-300 font-bold mx-1 text-sm hidden sm:inline">→</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Memory Flash Challenge Card */}
      {payload.type === 'memory-card' && (
        <div className="w-full max-w-md flex flex-col items-center p-4">
          <div className="flex items-center justify-between w-full mb-3 px-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-purple-600" />
              Memory Retention Challenge
            </span>
            {memoryRevealed && (
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Hiding in {memoryCountdown}s
              </span>
            )}
          </div>

          <div
            className={`w-full min-h-[100px] rounded-2xl flex items-center justify-center p-5 transition-all duration-500 ${
              memoryRevealed
                ? 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-200 shadow-sm'
                : 'bg-slate-100 border border-slate-300 text-slate-600'
            }`}
          >
            {memoryRevealed ? (
              <div className="flex flex-wrap gap-3 items-center justify-center font-bold text-xl text-indigo-950 font-mono">
                {payload.items?.map((it, idx) => (
                  <span key={idx} className="bg-white/90 px-3 py-1.5 rounded-lg border border-indigo-100 shadow-xs">
                    {it}
                  </span>
                ))}
              </div>
            ) : (
              <div className="text-center py-2">
                <div className="text-sm font-semibold text-slate-700">Sequence Hidden</div>
                <p className="text-xs text-slate-600 mt-1">Answer the recall question using your memory!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
