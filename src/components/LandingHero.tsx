import React, { useEffect, useRef } from 'react';
import { 
  Play, 
  ArrowRight, 
  Sparkles, 
  Brain, 
  Zap, 
  BarChart3, 
  Award, 
  ShieldCheck,
  CheckCircle2,
  Users,
  Target,
  Clock,
  ChevronRight
} from 'lucide-react';

interface LandingHeroProps {
  onStartAssessment: () => void;
  onHowItWorksClick: () => void;
  onExploreCategories: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onStartAssessment,
  onHowItWorksClick,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Animated synaptic intelligence particle mesh in canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate synaptic nodes
    const nodeCount = 38;
    const nodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
      color: string;
    }> = [];

    const colors = ['#6366F1', '#8B5CF6', '#A855F7', '#38BDF8', '#4F46E5'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.5 + 2,
        pulse: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting neural axons
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw synaptic nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;
        node.pulse += 0.03;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const currentRadius = node.radius + Math.sin(node.pulse) * 0.8;

        ctx.beginPath();
        ctx.arc(node.x, node.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-80 bg-gradient-to-tr from-indigo-200/40 via-purple-200/30 to-sky-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-indigo-100/90 shadow-xs mb-6">
                <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
                <span className="text-xs font-bold tracking-wide uppercase text-indigo-700">
                  Adaptive Intelligence System
                </span>
                <span className="text-slate-300">|</span>
                <span className="text-xs text-slate-500 font-medium">Calibrated for Ages 6 to 61+</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Discover Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800">
                  Cognitive Potential.
                </span>
              </h1>

              {/* Subheading */}
              <p className="mt-5 text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                Take an adaptive intelligence assessment designed around your age and discover your strengths in logic, patterns, numbers and reasoning.
              </p>

              {/* Value Highlights */}
              <div className="mt-6 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Age-Normed Questions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dynamic Difficulty Engine</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verifiable Certificate</span>
                </div>
              </div>

              {/* Hero CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <button
                  id="hero-start-btn"
                  onClick={onStartAssessment}
                  className="px-7 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/35 active:scale-98 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <Play className="w-5 h-5 fill-current transition-transform group-hover:translate-x-0.5" />
                  <span>Start Assessment</span>
                </button>

                <button
                  id="hero-how-it-works-btn"
                  onClick={onHowItWorksClick}
                  className="px-6 py-4 rounded-2xl text-base font-semibold text-slate-700 bg-white/80 hover:bg-white border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>How It Works</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Informational Disclaimer Badge */}
              <div className="mt-6 text-xs text-slate-600 bg-slate-100/80 border border-slate-200/70 px-3.5 py-2 rounded-xl max-w-xl">
                <span className="font-semibold text-slate-600">Note: </span>
                This is an informal cognitive assessment providing estimated scores and not a clinical diagnosis or medical assessment.
              </div>
            </div>

            {/* Right Interactive Cognitive Visualization & Stats Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-4/3 sm:aspect-square max-w-md mx-auto glass-card rounded-3xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl border border-white/80">
                {/* Neural Canvas Background */}
                <canvas 
                  ref={canvasRef} 
                  className="absolute inset-0 w-full h-full pointer-events-none opacity-85" 
                />

                {/* Floating Glassmorphism Metric Badges */}
                <div className="relative z-10 flex justify-between items-start">
                  <div className="glass-pill px-3.5 py-2 rounded-xl shadow-xs flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-800">Adaptive IRT Engine</span>
                  </div>
                  <div className="glass-pill px-3 py-1.5 rounded-xl shadow-xs text-xs font-mono font-semibold text-indigo-700">
                    Mean: 100 • SD: 15
                  </div>
                </div>

                {/* Central Glass Brain Interface Card */}
                <div className="relative z-10 my-auto text-center p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/90 shadow-md">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-3 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 mb-3">
                    <Brain className="w-10 h-10 animate-pulse" />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">7 Core Cognitive Domains</h2>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Pattern Recognition, Numerical, Logical, Spatial, Verbal, Memory & Speed
                  </p>

                  <div className="mt-4 grid grid-cols-3 gap-2 text-left">
                    <div className="p-2 rounded-lg bg-indigo-50/70 border border-indigo-100">
                      <div className="text-[10px] uppercase font-bold text-indigo-700">Logic</div>
                      <div className="text-xs font-extrabold text-slate-800">Adaptive</div>
                    </div>
                    <div className="p-2 rounded-lg bg-purple-50/70 border border-purple-100">
                      <div className="text-[10px] uppercase font-bold text-purple-700">Normed</div>
                      <div className="text-xs font-extrabold text-slate-800">8 Age Tiers</div>
                    </div>
                    <div className="p-2 rounded-lg bg-sky-50/70 border border-sky-100">
                      <div className="text-[10px] uppercase font-bold text-sky-700">Verified</div>
                      <div className="text-xs font-extrabold text-slate-800">Certificates</div>
                    </div>
                  </div>
                </div>

                {/* Bottom Quick Test Specs */}
                <div className="relative z-10 flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" /> ~10-15 min
                  </span>
                  <span className="flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-purple-500" /> 15 Questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-sky-500" /> 180K+ Tested
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature Cards Grid Section */}
      <section className="py-14 bg-white/50 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
              Scientifically Grounded Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              Engineered for Precision & Engagement
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Unlike generic quizzes, IQMANIA dynamically matches your cognitive baseline with responsive item calibrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {/* Feature 1 */}
            <div className="glass-card glass-card-hover p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">🧠 Age-Adaptive Questions</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Questions tailored to 8 distinct age developmental tiers from children (6–8) to mature adults (61+).
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-indigo-600">
                8 Calibrated Tiers →
              </div>
            </div>

            {/* Feature 2 */}
            <div className="glass-card glass-card-hover p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-4">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">⚡ Adaptive Difficulty</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Real-time item response scaling. Difficulty automatically modulates based on accuracy and response speed.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-purple-600">
                Live IRT Calibration →
              </div>
            </div>

            {/* Feature 3 */}
            <div className="glass-card glass-card-hover p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 mb-4">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">📊 Detailed Analysis</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Receive multidimensional breakdown across 7 cognitive faculties, percentile curves, and response latency.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-sky-600">
                Gaussian Percentiles →
              </div>
            </div>

            {/* Feature 4 */}
            <div className="glass-card glass-card-hover p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">🏆 Certificate Generation</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Instantly obtain a high-resolution, print-ready Certificate of Cognitive Assessment with unique ID.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-amber-600">
                Print & PDF Ready →
              </div>
            </div>

            {/* Feature 5 */}
            <div className="glass-card glass-card-hover p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">🔐 Certificate Verification</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Each certificate carries a tamper-evident ID and QR code verifiable on our public verification portal.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-semibold text-emerald-600">
                Public QR Registry →
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works 5-Step Process Section */}
      <section id="how-it-works-section" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase">
              Simple 5-Step Process
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              How IQMANIA Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              From initiation to verified accreditation in under 15 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {/* Step 1 */}
            <div className="glass-card p-5 rounded-2xl flex flex-col items-start relative border-slate-200/80">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-3 shadow-md shadow-indigo-500/20">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Enter Details</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Provide your name and an optional nickname for the leaderboard.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card p-5 rounded-2xl flex flex-col items-start relative border-slate-200/80">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-3 shadow-md shadow-indigo-500/20">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Select Age</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Select your verified age group to calibrate the initial baseline.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card p-5 rounded-2xl flex flex-col items-start relative border-slate-200/80">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-3 shadow-md shadow-indigo-500/20">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Complete Test</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Answer 15 adaptive questions across multiple reasoning faculties.
              </p>
            </div>

            {/* Step 4 */}
            <div className="glass-card p-5 rounded-2xl flex flex-col items-start relative border-slate-200/80">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-3 shadow-md shadow-indigo-500/20">
                4
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Cognitive Profile</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Review your estimated cognitive score, percentile, and sub-scores.
              </p>
            </div>

            {/* Step 5 */}
            <div className="glass-card p-5 rounded-2xl flex flex-col items-start relative border-slate-200/80">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center mb-3 shadow-md shadow-indigo-500/20">
                5
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Get Certificate</h3>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Generate and download your certified digital credential with QR verify.
              </p>
            </div>
          </div>

          {/* Start CTA Banner */}
          <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-300 uppercase tracking-widest mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Free Cognitive Evaluation
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to map your cognitive strengths?
              </h3>
              <p className="text-indigo-200 text-xs sm:text-sm mt-1 max-w-xl">
                Takes only 10–15 minutes. Pure analytical questions with no trick or obscure trivia queries.
              </p>
            </div>

            <button
              onClick={onStartAssessment}
              className="px-7 py-3.5 rounded-xl font-bold text-indigo-950 bg-white hover:bg-slate-100 shadow-md hover:shadow-lg transition-all shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <span>Begin Now</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
