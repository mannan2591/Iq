import React, { useEffect, useState } from 'react';
import { AssessmentResult, PerformanceLevel, QuestionCategory, CertificateData } from '../types';
import confetti from 'canvas-confetti';
import { OfficialCertificate } from './OfficialCertificate';
import { 
  Award, 
  Brain, 
  Share2, 
  RotateCcw, 
  ShieldCheck, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Sparkles,
  Zap,
  Info,
  Copy,
  Check,
  Printer,
  ChevronDown
} from 'lucide-react';

interface ResultsViewProps {
  result: AssessmentResult;
  onOpenCertificate: () => void;
  onRetake: () => void;
  onViewLeaderboard: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  result,
  onOpenCertificate,
  onRetake,
  onViewLeaderboard
}) => {
  const [animatedScore, setAnimatedScore] = useState(70);
  const [copiedShare, setCopiedShare] = useState(false);

  // Construct certificate object from result
  const certificateData: CertificateData = {
    certificateId: result.certificateId,
    assessmentId: result.id,
    userName: result.userName,
    nickname: result.nickname,
    ageGroup: result.ageGroup,
    estimatedScore: result.estimatedScore,
    percentile: result.percentile,
    performanceLevel: result.performanceLevel,
    issueDate: result.completedAt,
    verified: true,
    qrPayload: `https://iqmania.app/#verify/${result.certificateId}`
  };

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect', e);
    }

    // Number counting animation up to estimated score
    const target = result.estimatedScore;
    const duration = 1200;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const current = Math.round(70 + (target - 70) * (1 - Math.pow(1 - progress, 3)));
      setAnimatedScore(current);

      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [result.estimatedScore]);

  const handleShareResult = async () => {
    const shareText = `I completed the IQMANIA Cognitive Assessment 🧠\nEstimated Cognitive Score: ${result.estimatedScore} (${result.percentile}th Percentile)\nPerformance: ${result.performanceLevel}\nVerify Certificate: ${result.certificateId}\nDiscover your profile at IQMANIA!`;
    
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const scrollToCertificate = () => {
    const element = document.getElementById('official-certificate-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getPerformanceBadgeColor = (level: PerformanceLevel) => {
    switch (level) {
      case 'Exceptional':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Very Strong':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Strong':
        return 'bg-indigo-100 text-indigo-900 border-indigo-300';
      case 'Above Average':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'Average':
        return 'bg-slate-100 text-slate-900 border-slate-300';
      default:
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
    }
  };

  const getCategoryIcon = (cat: QuestionCategory) => {
    switch (cat) {
      case 'Logical Reasoning': return '🧠';
      case 'Numerical Reasoning': return '🔢';
      case 'Pattern Recognition': return '🔷';
      case 'Spatial Reasoning': return '👁';
      case 'Verbal Reasoning': return '🔤';
      case 'Processing Speed': return '⚡';
      case 'Memory': return '💭';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* Top Banner Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 bg-white/95 border border-white shadow-2xl relative overflow-hidden">
        {/* Glow Header */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Assessment Complete • {result.ageGroup} Age Cohort</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Cognitive Assessment Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Prepared for <strong className="text-slate-800">{result.userName}</strong> on {new Date(result.completedAt).toLocaleDateString()}
          </p>

          {/* Core Score Display Circle / Card */}
          <div className="my-8 py-6 px-8 rounded-3xl bg-gradient-to-b from-indigo-50/80 via-white to-purple-50/80 border border-indigo-100 shadow-md max-w-md mx-auto relative">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">
              Your Estimated Cognitive Score
            </div>
            
            <div className="text-6xl sm:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 font-display">
              {animatedScore}
            </div>

            <div className="text-xs font-mono text-slate-600 mt-1">
              Estimated Interval: {result.scoreRangeMin} – {result.scoreRangeMax} (±4 standard error)
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${getPerformanceBadgeColor(result.performanceLevel)}`}>
                {result.performanceLevel}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
                {result.percentile}th Percentile
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Correct Answers</div>
              <div className="text-lg font-extrabold text-slate-800 mt-0.5">
                {result.correctAnswers} <span className="text-xs text-slate-500 font-normal">/ {result.totalQuestions}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Accuracy Rate</div>
              <div className="text-lg font-extrabold text-slate-800 mt-0.5">
                {Math.round((result.correctAnswers / result.totalQuestions) * 100)}%
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Avg Response Time</div>
              <div className="text-lg font-extrabold text-slate-800 mt-0.5">
                {result.avgResponseTimeSec}s
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Certificate ID</div>
              <div className="text-xs font-mono font-bold text-indigo-700 mt-1 truncate">
                {result.certificateId}
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              id="scroll-to-certificate-btn"
              onClick={scrollToCertificate}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
            >
              <Award className="w-4 h-4" />
              <span>View Certificate Below</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              onClick={handleShareResult}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl font-semibold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {copiedShare ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{copiedShare ? 'Copied Summary!' : 'Share Result'}</span>
            </button>

            <button
              onClick={onRetake}
              className="w-full sm:w-auto px-4 py-3.5 rounded-2xl font-semibold text-sm text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span>Retake Test</span>
            </button>
          </div>

        </div>
      </div>

      {/* Cognitive Faculty Breakdown & Population Normal Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Domain Scores & Bars */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 bg-white/95 border border-white shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Cognitive Domain Breakdown
              </h2>
              <p className="text-xs text-slate-500">
                Performance indices scaled across tested cognitive categories
              </p>
            </div>
            <div className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              Adaptive Index
            </div>
          </div>

          <div className="space-y-4">
            {result.categoryResults.map((cat, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/70">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{getCategoryIcon(cat.category)}</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">{cat.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-indigo-700">{cat.score}/100</span>
                    <span className="text-[10px] font-semibold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      {cat.ratingLabel}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-200/80 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                    style={{ width: `${cat.score}%` }}
                  />
                </div>

                <div className="flex items-center justify-between mt-1 text-[10px] text-slate-600">
                  <span>Accuracy: {cat.accuracy}%</span>
                  <span>Avg Latency: {cat.avgTimeSec}s</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Population Normal Distribution & Disclaimer */}
        <div className="lg:col-span-5 space-y-6">
          {/* Bell Curve Normal Distribution Card */}
          <div className="glass-panel rounded-3xl p-6 bg-white/95 border border-white shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
              Population Distribution (Mean 100, SD 15)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Your estimated score places you in the top <strong>{(100 - result.percentile).toFixed(1)}%</strong> of the global population.
            </p>

            {/* Bell Curve SVG */}
            <div className="w-full p-2 bg-slate-50 rounded-2xl border border-slate-200">
              <svg viewBox="0 0 300 120" className="w-full h-auto">
                <defs>
                  <linearGradient id="bellGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#818CF8" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#6366F1" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#A855F7" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                {/* Standard normal distribution curve */}
                <path
                  d="M 10,110 C 60,110 100,105 120,60 C 135,25 150,15 150,15 C 150,15 165,25 180,60 C 200,105 240,110 290,110 Z"
                  fill="url(#bellGrad)"
                  stroke="#6366F1"
                  strokeWidth="2"
                />
                {/* Mean line at 150 (score 100) */}
                <line x1="150" y1="15" x2="150" y2="110" stroke="#CBD5E1" strokeDasharray="3,3" strokeWidth="1.5" />
                <text x="150" y="118" fontSize="8" fill="#64748B" textAnchor="middle">100</text>

                {/* Score Marker */}
                {(() => {
                  // Map score 70->30px, 100->150px, 145->270px
                  const scoreX = Math.max(25, Math.min(275, 150 + ((result.estimatedScore - 100) / 45) * 120));
                  return (
                    <g>
                      <line x1={scoreX} y1="20" x2={scoreX} y2="110" stroke="#4338CA" strokeWidth="2.5" />
                      <circle cx={scoreX} cy="20" r="4.5" fill="#4338CA" />
                      <rect x={scoreX - 22} y="0" width="44" height="14" rx="4" fill="#4338CA" />
                      <text x={scoreX} y="10" fontSize="8" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">
                        You: {result.estimatedScore}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div className="flex justify-between text-[10px] text-slate-600 mt-2 px-1">
              <span>70 (Developing)</span>
              <span>100 (Average)</span>
              <span>130+ (Exceptional)</span>
            </div>
          </div>

          {/* Mandatory Formal Disclosure Notice */}
          <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200/90 text-amber-900 text-xs">
            <div className="flex items-center gap-2 font-bold mb-1">
              <Info className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Assessment Purpose & Limitations</span>
            </div>
            <p className="leading-relaxed text-amber-800 text-[11px]">
              This result is an informal estimate based on this assessment and should not be considered a clinically validated IQ measurement or medical evaluation. It is designed for cognitive self-discovery, practice, and educational feedback.
            </p>
          </div>
        </div>

      </div>

      {/* ================= OFFICIAL CERTIFICATE GENERATED BELOW IT ================= */}
      <div id="official-certificate-section" className="pt-6">
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Your Official Accreditation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Certificate of Achievement
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Generated and authenticated for <strong className="text-slate-800">{result.userName}</strong>. Ready for print or high-resolution PDF export.
          </p>
        </div>

        {/* The Official Certificate Component */}
        <div className="glass-panel rounded-3xl p-4 sm:p-8 bg-white/95 border border-white shadow-2xl overflow-x-auto">
          <div className="min-w-[660px]">
            <OfficialCertificate certificate={certificateData} showActions={true} />
          </div>
        </div>
      </div>

    </div>
  );
};
