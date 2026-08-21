import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase';

export interface UserProfile {
  userId: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<User | null>;
  signOutUser: () => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Sync user profile to Firestore
  const syncUserProfile = async (user: User) => {
    const userDocRef = doc(db, 'users', user.uid);
    const path = `users/${user.uid}`;
    
    try {
      const snap = await getDoc(userDocRef);
      const now = new Date().toISOString();
      
      if (!snap.exists()) {
        const newProfile: UserProfile = {
          userId: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'IQ Candidate',
          photoURL: user.photoURL || '',
          createdAt: now,
          updatedAt: now,
        };
        await setDoc(userDocRef, newProfile);
        setUserProfile(newProfile);
      } else {
        const existingData = snap.data() as UserProfile;
        const updatedProfile: UserProfile = {
          ...existingData,
          displayName: user.displayName || existingData.displayName || 'IQ Candidate',
          photoURL: user.photoURL || existingData.photoURL || '',
          updatedAt: now,
        };
        await setDoc(userDocRef, updatedProfile, { merge: true });
        setUserProfile(updatedProfile);
      }
    } catch (err) {
      console.error('Failed to sync user profile:', err);
      // Non-blocking for local state
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await syncUserProfile(user);
      } else {
        setUserProfile(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<User | null> => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      setCurrentUser(user);
      await syncUserProfile(user);
      return user;
    } catch (error: any) {
      console.error('Google Sign In Error:', error);
      let errorMsg = 'Failed to sign in with Google. Please try again.';
      if (error.code === 'auth/popup-closed-by-user') {
        errorMsg = 'Sign in cancelled.';
      } else if (error.code === 'auth/popup-blocked') {
        errorMsg = 'Sign-in popup was blocked by your browser. Please allow popups for this site.';
      } else if (error.message) {
        errorMsg = error.message;
      }
      setAuthError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const signOutUser = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserProfile(null);
    } catch (error: any) {
      console.error('Sign Out Error:', error);
      setAuthError(error.message || 'Failed to sign out.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearAuthError = () => setAuthError(null);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        isLoading,
        signInWithGoogle,
        signOutUser,
        authError,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
