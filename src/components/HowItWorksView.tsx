import React from 'react';
import { 
  Brain, 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  Award, 
  Play, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { AGE_GROUP_RANGES } from '../data/questionBank';

interface HowItWorksViewProps {
  onStartAssessment: () => void;
}

export const HowItWorksView: React.FC<HowItWorksViewProps> = ({ onStartAssessment }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
          <Brain className="w-4 h-4" />
          <span>Scientific Assessment Framework</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          How IQMANIA Works
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-3">
          Discover how our age-adaptive engine, item response calibration, and multi-domain analysis work together.
        </p>
      </div>

      {/* 1. Age-Adaptive Cognitive Calibration */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 bg-white/95 border border-white shadow-xl mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            1
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Age-Adaptive Question Selection</h2>
            <p className="text-xs text-slate-500">Why cognitive tests must be normed for developmental stages</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
          Human reasoning faculties evolve dynamically across age spans. Rather than testing a 7-year-old child and a 35-year-old adult on identical questions with fixed math problems, IQMANIA samples from tailored item banks designed to measure developmental reasoning capacity rather than school syllabus trivia.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {AGE_GROUP_RANGES.map((group) => (
            <div key={group.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-xs font-bold text-indigo-700">{group.label}</div>
              <p className="text-[11px] text-slate-500 mt-1">{group.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Adaptive IRT Engine */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 bg-white/95 border border-white shadow-xl mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            2
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Dynamic Difficulty Modulation (IRT)</h2>
            <p className="text-xs text-slate-500">Real-time item response calibration</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Inspired by computerized adaptive testing (CAT) and Item Response Theory (IRT):
        </p>
        <ul className="mt-3 space-y-2 text-xs sm:text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Success Stepping:</strong> When you correctly answer an item quickly, the next question escalates in complexity to accurately identify your cognitive ceiling.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Regressive Smoothing:</strong> An incorrect response gracefully stabilizes or reduces difficulty without imposing disproportionate penalties.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>7-Domain Sampling:</strong> Every assessment systematically rotates through Pattern Recognition, Numerical Reasoning, Logical Deductions, Spatial Orientation, Verbal Analogies, Memory, and Processing Speed.</span>
          </li>
        </ul>
      </div>

      {/* 3. Transparent Scoring Model */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 bg-white/95 border border-white shadow-xl mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
            3
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Estimated Cognitive Score Model</h2>
            <p className="text-xs text-slate-500">Gaussian standardization (Mean 100, Standard Deviation 15)</p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Scores are standardized on a bell curve where 100 represents median human cognitive performance with a standard deviation of 15 points.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400">135+</span>
            <div className="text-xs font-bold text-slate-800">Exceptional (Top 1%)</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400">120 – 134</span>
            <div className="text-xs font-bold text-slate-800">Very Strong (Top 9%)</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400">110 – 119</span>
            <div className="text-xs font-bold text-slate-800">Above Average (Top 25%)</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400">90 – 109</span>
            <div className="text-xs font-bold text-slate-800">Average / Standard</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400">&lt; 90</span>
            <div className="text-xs font-bold text-slate-800">Developing Range</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold uppercase text-slate-400">Standard Error</span>
            <div className="text-xs font-bold text-slate-800">±4 Point Margin</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs">
          <strong>Important Clinical Disclaimer:</strong> This test produces an estimated cognitive score for self-insight, practice, and personal discovery. It is not a clinical medical or psychiatric diagnosis (such as a supervised WAIS-IV or Stanford-Binet battery).
        </div>
      </div>

      {/* Start CTA Footer */}
      <div className="text-center py-6">
        <button
          onClick={onStartAssessment}
          className="px-8 py-4 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl shadow-indigo-500/25 inline-flex items-center gap-2 cursor-pointer transition-all active:scale-98"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>Launch Your Cognitive Evaluation</span>
        </button>
      </div>
    </div>
  );
};
