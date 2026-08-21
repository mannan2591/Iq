import React, { useState, useRef, useEffect } from 'react';
import { BrainLogo } from './BrainLogo';
import { useAuth } from '../context/AuthContext';
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
  Settings,
  LogIn,
  LogOut,
  User,
  ChevronDown
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  streakCount: number;
  onStartTest: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  streakCount,
  onStartTest,
  onOpenAuthModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { currentUser, userProfile, signOutUser } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    setUserDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

        {/* Right Desktop Actions & Auth User Menu */}
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

          {/* Authentication Button or User Menu */}
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                id="user-profile-menu-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all cursor-pointer"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'User'}
                    className="w-6 h-6 rounded-full object-cover border border-indigo-300"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-xs font-bold text-slate-800 max-w-[100px] truncate">
                  {currentUser.displayName || 'Account'}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-2xl border border-slate-200 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {currentUser.displayName || 'IQ Candidate'}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono truncate">
                      {currentUser.email}
                    </p>
                  </div>

                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <History className="w-3.5 h-3.5 text-indigo-600" />
                    <span>My Assessments & Certificates</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      signOutUser();
                    }}
                    className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              id="nav-sign-in-btn"
              onClick={onOpenAuthModal}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-indigo-600" />
              <span>Sign In</span>
            </button>
          )}

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
          {!currentUser ? (
            <button
              onClick={onOpenAuthModal}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 flex items-center gap-1"
            >
              <LogIn className="w-3 h-3" />
              <span>Login</span>
            </button>
          ) : (
            <button
              onClick={() => handleNavClick('dashboard')}
              className="p-1.5 rounded-full border border-indigo-200"
            >
              {currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="User"
                  className="w-6 h-6 rounded-full"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                  {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                </div>
              )}
            </button>
          )}

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
          {/* User profile card in mobile drawer if signed in */}
          {currentUser && (
            <div className="p-3 mb-2 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                    {(currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-slate-900">{currentUser.displayName || 'Candidate'}</p>
                  <p className="text-[10px] text-slate-500 font-mono">{currentUser.email}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  signOutUser();
                }}
                className="p-2 text-rose-600 hover:bg-rose-100 rounded-xl"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

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
            {!currentUser && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
                className="w-full py-3 rounded-xl text-center font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign in with Google</span>
              </button>
            )}

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
