import React from 'react';
import { BrainLogo } from './BrainLogo';
import { Shield, Sparkles, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavClick: (tab: string) => void;
  onStartAssessment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onStartAssessment }) => {
  return (
    <footer className="no-print border-t border-slate-200/80 bg-white/70 backdrop-blur-md mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <BrainLogo size="md" />
            <p className="text-xs sm:text-sm text-slate-500 font-medium italic mt-2">
              "Discover How Your Mind Works."
            </p>
            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              An age-calibrated, computerized adaptive cognitive assessment platform measuring fluid logic, working memory, spatial orientation, and numerical reasoning.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-2.5">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Platform
              </span>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button onClick={onStartAssessment} className="hover:text-indigo-600 transition-colors cursor-pointer">
                    Start Assessment
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick('daily')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                    Daily Challenge
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick('leaderboard')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                    Leaderboard
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick('dashboard')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                    My Certificates
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                Verification & Science
              </span>
              <ul className="space-y-2 text-slate-600">
                <li>
                  <button onClick={() => onNavClick('verify')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                    Verify Certificate
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick('how-it-works')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                    How It Works
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavClick('admin')} className="hover:text-indigo-600 transition-colors cursor-pointer">
                    Admin Question Bank
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal / Scientific Statement */}
          <div className="md:col-span-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Shield className="w-3.5 h-3.5 text-indigo-600" />
              <span>Assessment Scope & Notice</span>
            </div>
            <p className="leading-relaxed">
              IQMANIA is an informal cognitive evaluation platform designed for self-discovery and brain training. It does not provide clinical or diagnostic medical assessments.
            </p>
          </div>

        </div>

        <div className="mt-10 pt-6 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} IQMANIA Platform. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Normed Adaptive IRT System</span>
            <span>•</span>
            <span>Gaussian Standardization (Mean 100, SD 15)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
