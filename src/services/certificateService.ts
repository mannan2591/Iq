import { AssessmentResult, CertificateData, LeaderboardEntry } from '../types';

const STORAGE_KEYS = {
  CERTIFICATES: 'iqmania_certificates_v1',
  ASSESSMENT_HISTORY: 'iqmania_history_v1',
  DAILY_STREAK: 'iqmania_daily_streak_v1',
  LEADERBOARD: 'iqmania_leaderboard_v1',
  USER_PROFILE: 'iqmania_profile_v1'
};

// Seed verified certificates for public demo verification (including example IQM-2026-A82F91)
const SEEDED_CERTIFICATES: CertificateData[] = [
  {
    certificateId: 'IQM-2026-A82F91',
    assessmentId: 'ASMT-2026-SEED01',
    userName: 'Elena Rostova',
    nickname: 'NeuralElena',
    ageGroup: '26-40',
    estimatedScore: 134,
    percentile: 98.8,
    performanceLevel: 'Very Strong',
    issueDate: '2026-07-14',
    verified: true,
    qrPayload: 'https://iqmania.app/verify/IQM-2026-A82F91'
  },
  {
    certificateId: 'IQM-2026-N74K20',
    assessmentId: 'ASMT-2026-SEED02',
    userName: 'David Chen',
    nickname: 'QuantumDave',
    ageGroup: '18-25',
    estimatedScore: 128,
    percentile: 96.9,
    performanceLevel: 'Strong',
    issueDate: '2026-08-01',
    verified: true,
    qrPayload: 'https://iqmania.app/verify/IQM-2026-N74K20'
  },
  {
    certificateId: 'IQM-2026-X99M12',
    assessmentId: 'ASMT-2026-SEED03',
    userName: 'Sarah Jenkins',
    nickname: 'LogicNexus',
    ageGroup: '15-17',
    estimatedScore: 142,
    percentile: 99.7,
    performanceLevel: 'Exceptional',
    issueDate: '2026-08-10',
    verified: true,
    qrPayload: 'https://iqmania.app/verify/IQM-2026-X99M12'
  }
];

const SEEDED_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, id: 'lb-1', nickname: 'SynapseKing', score: 144, percentile: 99.8, ageGroup: '26-40', completedDate: '2026-08-15', badge: 'Grandmaster' },
  { rank: 2, id: 'lb-2', nickname: 'NeuralElena', score: 134, percentile: 98.8, ageGroup: '26-40', completedDate: '2026-08-14', badge: 'High Logic' },
  { rank: 3, id: 'lb-3', nickname: 'VectorMind', score: 132, percentile: 98.3, ageGroup: '18-25', completedDate: '2026-08-16', badge: 'Pattern Sage' },
  { rank: 4, id: 'lb-4', nickname: 'AeroThinker', score: 129, percentile: 97.3, ageGroup: '15-17', completedDate: '2026-08-17', badge: 'Speed Ace' },
  { rank: 5, id: 'lb-5', nickname: 'QuantumDave', score: 128, percentile: 96.9, ageGroup: '18-25', completedDate: '2026-08-18', badge: 'Spatial Pro' },
  { rank: 6, id: 'lb-6', nickname: 'PrismLogic', score: 125, percentile: 95.2, ageGroup: '41-60', completedDate: '2026-08-17', badge: 'Deductive' },
  { rank: 7, id: 'lb-7', nickname: 'EchoCognition', score: 122, percentile: 92.9, ageGroup: '12-14', completedDate: '2026-08-18', badge: 'Junior Ace' },
  { rank: 8, id: 'lb-8', nickname: 'NovaMatrix', score: 119, percentile: 89.7, ageGroup: '26-40', completedDate: '2026-08-18' }
];

export const CertificateService = {
  saveAssessmentResult(result: AssessmentResult): CertificateData {
    const certData: CertificateData = {
      certificateId: result.certificateId,
      assessmentId: result.id,
      userName: result.userName,
      nickname: result.nickname,
      ageGroup: result.ageGroup,
      estimatedScore: result.estimatedScore,
      percentile: result.percentile,
      performanceLevel: result.performanceLevel,
      issueDate: result.completedAt.split('T')[0],
      verified: true,
      qrPayload: `${window.location.origin}/#verify/${result.certificateId}`
    };

    // Save certificate
    const allCerts = this.getAllCertificates();
    const updatedCerts = [certData, ...allCerts.filter(c => c.certificateId !== certData.certificateId)];
    try {
      localStorage.setItem(STORAGE_KEYS.CERTIFICATES, JSON.stringify(updatedCerts));
    } catch (e) {
      console.warn('Storage quota reached or storage disabled', e);
    }

    // Save history record
    const allHistory = this.getAssessmentHistory();
    const updatedHistory = [result, ...allHistory.filter(h => h.id !== result.id)];
    try {
      localStorage.setItem(STORAGE_KEYS.ASSESSMENT_HISTORY, JSON.stringify(updatedHistory));
    } catch (e) {
      console.warn('History storage error', e);
    }

    // Auto-update leaderboard if nickname exists or add default
    if (result.nickname || result.userName) {
      const displayName = result.nickname || result.userName.split(' ')[0] + '_' + Math.floor(Math.random() * 100);
      this.addLeaderboardEntry({
        id: result.id,
        nickname: displayName,
        score: result.estimatedScore,
        percentile: result.percentile,
        ageGroup: result.ageGroup,
        completedDate: certData.issueDate,
        rank: 0
      });
    }

    return certData;
  },

  getAllCertificates(): CertificateData[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CERTIFICATES);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with seeded ones if not duplicate
        const seededUnique = SEEDED_CERTIFICATES.filter(
          sc => !parsed.some((p: CertificateData) => p.certificateId === sc.certificateId)
        );
        return [...parsed, ...seededUnique];
      }
    } catch (e) {
      console.error(e);
    }
    return SEEDED_CERTIFICATES;
  },

  verifyCertificate(certificateId: string): CertificateData | null {
    const cleanId = certificateId.trim().toUpperCase();
    const all = this.getAllCertificates();
    const found = all.find(c => c.certificateId.toUpperCase() === cleanId);
    return found || null;
  },

  getAssessmentHistory(): AssessmentResult[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ASSESSMENT_HISTORY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  },

  getLeaderboard(): LeaderboardEntry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    return SEEDED_LEADERBOARD;
  },

  addLeaderboardEntry(entry: Omit<LeaderboardEntry, 'rank'>): LeaderboardEntry[] {
    const list = this.getLeaderboard();
    const existing = list.filter(item => item.nickname.toLowerCase() !== entry.nickname.toLowerCase());
    const combined = [...existing, { ...entry, rank: 0 }];
    
    // Sort descending by score, then percentile
    combined.sort((a, b) => b.score - a.score || b.percentile - a.percentile);

    // Re-assign ranks
    const ranked = combined.map((item, idx) => ({ ...item, rank: idx + 1 }));
    try {
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(ranked));
    } catch (e) {
      console.warn(e);
    }
    return ranked;
  },

  getDailyStreak(): { currentStreak: number; lastPlayedDate: string | null; completedToday: boolean } {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DAILY_STREAK);
      if (stored) {
        const parsed = JSON.parse(stored);
        const today = new Date().toISOString().split('T')[0];
        const completedToday = parsed.lastPlayedDate === today;
        return {
          currentStreak: parsed.currentStreak || 0,
          lastPlayedDate: parsed.lastPlayedDate || null,
          completedToday
        };
      }
    } catch (e) {
      console.error(e);
    }
    return { currentStreak: 3, lastPlayedDate: null, completedToday: false };
  },

  recordDailyCompleted(): { currentStreak: number; completedToday: boolean } {
    const current = this.getDailyStreak();
    const today = new Date().toISOString().split('T')[0];
    if (current.lastPlayedDate === today) {
      return { currentStreak: current.currentStreak, completedToday: true };
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let newStreak = 1;
    if (current.lastPlayedDate === yesterday) {
      newStreak = current.currentStreak + 1;
    } else if (current.lastPlayedDate) {
      newStreak = 1;
    } else {
      newStreak = Math.max(1, current.currentStreak + 1);
    }

    const data = { currentStreak: newStreak, lastPlayedDate: today, completedToday: true };
    try {
      localStorage.setItem(STORAGE_KEYS.DAILY_STREAK, JSON.stringify(data));
    } catch (e) {
      console.warn(e);
    }
    return data;
  }
};
