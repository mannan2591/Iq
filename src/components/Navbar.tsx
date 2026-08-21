import React, { useState } from 'react';
import { BrainLogo } from './BrainLogo';
import { 
  Play, 
  Flame, 
  ShieldCheck, 
  Trophy, 
  BookOpen, 
  History, 
  Menu, 
  X, 
  Sparkles,
  Settings
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  streakCount: number;
  onStartTest: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  streakCount,
  onStartTest
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sparkles },
    { id: 'daily', label: 'Daily Challenge', icon: Flame, badge: streakCount > 0 ? `${streakCount}d` : undefined },
    { id: 'verify', label: 'Verify Certificate', icon: ShieldCheck },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'how-it-works', label: 'How It Works', icon: BookOpen },
    { id: 'dashboard', label: 'My Results', icon: History }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          id="nav-brand-btn"
          onClick={() => handleNavClick('home')}
          className="focus:outline-hidden group cursor-pointer"
        >
          <BrainLogo size="md" />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50/80 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Admin link */}
          <button
            id="nav-admin-btn"
            onClick={() => handleNavClick('admin')}
            title="Question Bank Manager"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Primary Assessment CTA */}
          <button
            id="nav-start-assessment-btn"
            onClick={onStartTest}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md shadow-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Assessment</span>
          </button>
        </div>

        {/* Mobile menu action buttons */}
        <div className="flex md:hidden items-center gap-2">
          <button
            id="mobile-start-btn"
            onClick={onStartTest}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs flex items-center gap-1"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Test</span>
          </button>
          
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full px-4 py-3 rounded-xl text-base font-medium flex items-center justify-between ${
                  isActive
                    ? 'text-indigo-600 bg-indigo-50 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onStartTest();
              }}
              className="w-full py-3 rounded-xl text-center font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Cognitive Assessment</span>
            </button>

            <button
              onClick={() => handleNavClick('admin')}
              className="w-full py-2 text-xs text-slate-600 text-center flex items-center justify-center gap-1"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Admin Question Bank</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
