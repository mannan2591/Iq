export type AgeGroup = 
  | '6-8' 
  | '9-11' 
  | '12-14' 
  | '15-17' 
  | '18-25' 
  | '26-40' 
  | '41-60' 
  | '61+';

export type QuestionCategory = 
  | 'Pattern Recognition'
  | 'Numerical Reasoning'
  | 'Logical Reasoning'
  | 'Spatial Reasoning'
  | 'Verbal Reasoning'
  | 'Memory'
  | 'Processing Speed';

export type VisualType = 
  | 'shapes-sequence'
  | 'matrix-3x3'
  | 'matrix-2x2'
  | 'dice-cube'
  | 'grid-dots'
  | 'balance-scale'
  | 'memory-card'
  | 'shape-analogy'
  | 'number-pyramid';

export interface VisualPayload {
  type: VisualType;
  items?: string[] | number[];
  matrixGrid?: string[][];
  missingPos?: [number, number] | number;
  highlightColor?: string;
  labels?: string[];
  memoryDisplaySec?: number;
  optionsVisuals?: string[];
}

export interface Question {
  id: string;
  ageGroups: AgeGroup[];
  category: QuestionCategory;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1: Easy, 2: Moderate, 3: Medium-Hard, 4: Hard, 5: Master
  question: string;
  subtext?: string;
  visualPayload?: VisualPayload;
  options: string[];
  correctIndex: number;
  explanation: string;
  timeLimitSec?: number;
}

export interface UserAssessmentProfile {
  name: string;
  nickname?: string;
  age: number;
  ageGroup: AgeGroup;
}

export interface UserAnswerRecord {
  questionId: string;
  category: QuestionCategory;
  difficulty: number;
  selectedIndex: number;
  correctIndex: number;
  isCorrect: boolean;
  timeTakenSec: number;
}

export interface CategoryResultSummary {
  category: QuestionCategory;
  score: number; // 0-100 index
  correct: number;
  total: number;
  accuracy: number;
  avgTimeSec: number;
  ratingLabel: string;
}

export interface AssessmentResult {
  id: string;
  certificateId: string;
  userName: string;
  nickname?: string;
  age: number;
  ageGroup: AgeGroup;
  completedAt: string; // ISO date string
  estimatedScore: number; // e.g. 118
  scoreRangeMin: number; // e.g. 112
  scoreRangeMax: number; // e.g. 124
  percentile: number; // e.g. 88th
  performanceLevel: PerformanceLevel;
  totalQuestions: number;
  correctAnswers: number;
  totalTimeSec: number;
  avgResponseTimeSec: number;
  categoryResults: CategoryResultSummary[];
  integrityFlags: {
    tabSwitches: number;
    warningsGiven: number;
    disqualified?: boolean;
    disqualificationReason?: string;
  };
  shareToken: string;
}

export type PerformanceLevel = 
  | 'Developing' 
  | 'Average' 
  | 'Above Average' 
  | 'Strong' 
  | 'Very Strong' 
  | 'Exceptional';

export interface CertificateData {
  certificateId: string;
  assessmentId: string;
  userName: string;
  nickname?: string;
  ageGroup: AgeGroup;
  estimatedScore: number;
  percentile: number;
  performanceLevel: PerformanceLevel;
  issueDate: string;
  verified: boolean;
  qrPayload: string;
}

export interface DailyChallengeItem {
  id: string;
  dateKey: string; // YYYY-MM-DD
  category: QuestionCategory;
  difficulty: 1 | 2 | 3 | 4 | 5;
  title: string;
  question: string;
  visualPayload?: VisualPayload;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LeaderboardEntry {
  rank: number;
  id: string;
  userId?: string;
  nickname: string;
  score: number;
  percentile: number;
  ageGroup: AgeGroup;
  completedDate: string;
  badge?: string;
  assessmentId?: string;
}
