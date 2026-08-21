import React, { useState, useEffect } from 'react';
import { CertificateService } from '../services/certificateService';
import { getLeaderboardFromCloud } from '../services/firestoreService';
import { LeaderboardEntry, AgeGroup } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  Trophy, 
  Medal, 
  Crown, 
  Filter, 
  Sparkles, 
  Play, 
  RefreshCw, 
  Cloud, 
  User as UserIcon,
  Flame
} from 'lucide-react';

interface LeaderboardProps {
  onStartAssessment: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ onStartAssessment }) => {
  const { currentUser } = useAuth();
  const [selectedCohort, setSelectedCohort] = useState<string>('all');
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => CertificateService.getLeaderboard());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCloudLive, setIsCloudLive] = useState<boolean>(false);

  // Load from Firestore with local fallback
  const fetchRankings = async (cohort: string) => {
    setIsLoading(true);
    try {
      const cloudEntries = await getLeaderboardFromCloud(cohort === 'all' ? undefined : cohort);
      const localEntries = CertificateService.getLeaderboard();

      // Merge cloud and local seeded entries without duplicates
      const mergedMap = new Map<string, LeaderboardEntry>();
      
      // Add local/seeded entries first
      localEntries.forEach(item => {
        if (cohort === 'all' || item.ageGroup === cohort) {
          mergedMap.set(item.nickname.toLowerCase(), item);
        }
      });

      // Overlay with cloud entries (giving preference to cloud data)
      if (cloudEntries && cloudEntries.length > 0) {
        setIsCloudLive(true);
        cloudEntries.forEach(item => {
          mergedMap.set(item.nickname.toLowerCase(), item);
        });
      }

      // Convert to array and sort descending by score
      const combined = Array.from(mergedMap.values());
      combined.sort((a, b) => b.score - a.score || b.percentile - a.percentile);

      // Re-assign ranks 1..N
      const ranked = combined.map((entry, index) => ({
        ...entry,
        rank: index + 1
      }));

      setEntries(ranked);
    } catch (err) {
      console.warn('Leaderboard cloud fetch fallback:', err);
      // Fall back to local
      const local = CertificateService.getLeaderboard();
      const filtered = cohort === 'all' ? local : local.filter(e => e.ageGroup === cohort);
      setEntries(filtered.map((e, idx) => ({ ...e, rank: idx + 1 })));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings(selectedCohort);
  }, [selectedCohort]);

  const getRankMedal = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-amber-500 fill-amber-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-400 fill-slate-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-700 fill-amber-600" />;
    return <span className="font-mono font-bold text-slate-500 text-sm">#{rank}</span>;
  };

  const cohorts: { id: string; label: string }[] = [
    { id: 'all', label: 'All Cohorts' },
    { id: '6-8', label: '6–8' },
    { id: '9-11', label: '9–11' },
    { id: '12-14', label: '12–14' },
    { id: '15-17', label: '15–17' },
    { id: '18-25', label: '18–25' },
    { id: '26-40', label: '26–40' },
    { id: '41-60', label: '41–60' },
    { id: '61+', label: '61+' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-14">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span>Global Cognitive Hall of Fame</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Cognitive Leaderboard
        </h1>
        <p className="text-sm text-slate-500 mt-2">
          Verified estimated cognitive ratings from real-time candidates stored across all age cohorts.
        </p>
      </div>

      {/* Filter and Actions Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* Age Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/80 border border-slate-200 shadow-xs overflow-x-auto max-w-full">
          {cohorts.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCohort(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCohort === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          <button
            onClick={() => fetchRankings(selectedCohort)}
            disabled={isLoading}
            className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh Leaderboard"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>

          <button
            onClick={onStartAssessment}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Take Test to Rank</span>
          </button>
        </div>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="glass-panel rounded-3xl p-4 sm:p-6 bg-white/95 border border-white shadow-xl overflow-hidden">
        {/* Status bar */}
        <div className="flex items-center justify-between px-2 pb-3 mb-2 border-b border-slate-100 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Cloud className="w-3.5 h-3.5 text-indigo-500" />
            <span>{isCloudLive ? 'Firestore Live Rankings' : 'Global Standings'}</span>
          </div>
          <span>Showing Top {entries.length} Candidates</span>
        </div>

        {isLoading ? (
          <div className="py-16 text-center text-slate-400 text-sm flex flex-col items-center justify-center gap-2">
            <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
            <span>Fetching live rankings...</span>
          </div>
        ) : entries.length === 0 ? (
          <div className="py-12 text-center text-slate-500 text-sm">
            No entries found in this cohort yet. Be the first to take the assessment!
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {entries.map((item) => {
              const isTop3 = item.rank <= 3;
              const isCurrentUser = currentUser && (
                item.userId === currentUser.uid ||
                (currentUser.displayName && item.nickname.toLowerCase() === currentUser.displayName.toLowerCase())
              );

              return (
                <div
                  key={item.id || item.nickname}
                  className={`py-3.5 px-3 sm:px-4 rounded-2xl flex items-center justify-between gap-3 transition-colors ${
                    isCurrentUser
                      ? 'bg-indigo-50/80 border border-indigo-200'
                      : isTop3 
                        ? 'bg-amber-50/40 hover:bg-amber-50/70' 
                        : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Rank & Nickname */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-8 flex items-center justify-center shrink-0">
                      {getRankMedal(item.rank)}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                          {item.nickname}
                        </span>
                        {isCurrentUser && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-indigo-600 text-white shadow-xs shrink-0">
                            YOU
                          </span>
                        )}
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        Cohort: {item.ageGroup} Yrs • Completed {item.completedDate}
                      </div>
                    </div>
                  </div>

                  {/* Score & Percentile */}
                  <div className="text-right shrink-0">
                    <div className="text-lg sm:text-xl font-black text-indigo-900 font-display">
                      {item.score}
                    </div>
                    <div className="text-[10px] font-semibold text-slate-500">
                      {item.percentile}th %ile
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
