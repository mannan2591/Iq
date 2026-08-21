import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Lock, 
  Loader2, 
  History, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { BrainLogo } from './BrainLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { signInWithGoogle, isLoading, authError, clearAuthError } = useAuth();

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      if (onSuccess) onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        {/* Close Button */}
        <button
          onClick={() => {
            clearAuthError();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close sign in modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-col items-center text-center">
          <div className="mb-3">
            <BrainLogo size="md" />
          </div>

          <h2 className="text-2xl font-black text-slate-900 font-display">
            Sign In to IQMANIA
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            Save your certified scores, sync across devices, and authenticate certificates with Firebase.
          </p>
        </div>

        {/* Benefits list */}
        <div className="my-6 space-y-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-100">
          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
            <Award className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Permanent Cloud Storage for Official Certificates</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
            <History className="w-4 h-4 text-indigo-600 shrink-0" />
            <span>Track Cognitive Score Growth Over Time</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Public Authentication & Verification Link</span>
          </div>
        </div>

        {/* Error message */}
        {authError && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span>{authError}</span>
            </div>
          </div>
        )}

        {/* Google Sign-in button */}
        <button
          id="google-sign-in-btn"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-indigo-400 text-slate-800 font-bold text-sm shadow-xs flex items-center justify-center gap-3 transition-all cursor-pointer disabled:opacity-60 active:scale-98"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
              <span>Connecting with Google...</span>
            </>
          ) : (
            <>
              {/* Google G Logo SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        {/* Security badge */}
        <div className="mt-5 text-center flex items-center justify-center gap-1.5 text-[11px] text-slate-600">
          <Lock className="w-3.5 h-3.5 text-slate-600" />
          <span>Secured with Firebase Authentication</span>
        </div>
      </div>
    </div>
  );
};
