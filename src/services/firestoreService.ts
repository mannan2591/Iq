import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  deleteDoc,
  query, 
  orderBy,
  limit,
  where
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { AssessmentResult, CertificateData, LeaderboardEntry } from '../types';

/**
 * Saves a completed cognitive assessment to the user's private Firestore subcollection
 */
export async function saveAssessmentToCloud(
  assessment: AssessmentResult, 
  user: User
): Promise<void> {
  const path = `users/${user.uid}/assessments/${assessment.id}`;
  try {
    const docRef = doc(db, 'users', user.uid, 'assessments', assessment.id);
    await setDoc(docRef, {
      ...assessment,
      userId: user.uid,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Loads all assessments for a user from Firestore
 */
export async function getUserAssessmentsFromCloud(
  userId: string
): Promise<AssessmentResult[]> {
  const path = `users/${userId}/assessments`;
  try {
    const q = query(
      collection(db, 'users', userId, 'assessments')
    );
    const snap = await getDocs(q);
    const results = snap.docs.map(d => d.data() as AssessmentResult);
    // Sort descending by completedAt
    return results.sort((a, b) => new Date(b.completedAt || 0).getTime() - new Date(a.completedAt || 0).getTime());
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}

/**
 * Deletes an assessment record from Firestore
 */
export async function deleteAssessmentFromCloud(
  userId: string,
  assessmentId: string
): Promise<void> {
  const path = `users/${userId}/assessments/${assessmentId}`;
  try {
    const docRef = doc(db, 'users', userId, 'assessments', assessmentId);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

/**
 * Publishes a verified certificate record to public_certificates for public authentication lookup
 */
export async function publishCertificateToCloud(
  certificate: CertificateData, 
  user: User
): Promise<void> {
  const path = `public_certificates/${certificate.certificateId}`;
  try {
    const docRef = doc(db, 'public_certificates', certificate.certificateId);
    await setDoc(docRef, {
      ...certificate,
      userId: user.uid,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Verifies and fetches an authentic certificate from Firestore by ID
 */
export async function fetchCertificateFromCloud(
  certificateId: string
): Promise<CertificateData | null> {
  const cleanId = certificateId.trim().toUpperCase();
  const path = `public_certificates/${cleanId}`;
  try {
    const docRef = doc(db, 'public_certificates', cleanId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as CertificateData;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
}

/**
 * Publishes or updates a score entry in the public cognitive leaderboard
 */
export async function saveLeaderboardEntryToCloud(
  entry: {
    id: string;
    nickname: string;
    score: number;
    percentile: number;
    ageGroup: string;
    completedDate: string;
    badge?: string;
    assessmentId?: string;
  },
  user: User
): Promise<void> {
  const path = `leaderboard/${entry.id}`;
  try {
    const docRef = doc(db, 'leaderboard', entry.id);
    await setDoc(docRef, {
      id: entry.id,
      userId: user.uid,
      nickname: entry.nickname,
      score: entry.score,
      percentile: entry.percentile,
      ageGroup: entry.ageGroup,
      completedDate: entry.completedDate,
      badge: entry.badge || '',
      assessmentId: entry.assessmentId || entry.id
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

/**
 * Fetches real-time leaderboard rankings from Firestore, ranked by score descending
 */
export async function getLeaderboardFromCloud(
  cohort?: string
): Promise<LeaderboardEntry[]> {
  const path = 'leaderboard';
  try {
    const colRef = collection(db, 'leaderboard');
    let snap;
    if (cohort && cohort !== 'all') {
      const q = query(colRef, where('ageGroup', '==', cohort), limit(50));
      snap = await getDocs(q);
    } else {
      const q = query(colRef, limit(100));
      snap = await getDocs(q);
    }

    const entries = snap.docs.map(d => d.data() as LeaderboardEntry);
    
    // Sort descending by score, then percentile
    entries.sort((a, b) => b.score - a.score || b.percentile - a.percentile);

    // Assign continuous rank
    return entries.map((item, idx) => ({
      ...item,
      rank: idx + 1
    }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    return [];
  }
}
