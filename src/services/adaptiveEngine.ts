import { 
  AgeGroup, 
  AssessmentResult, 
  CategoryResultSummary, 
  PerformanceLevel, 
  Question, 
  QuestionCategory, 
  UserAnswerRecord, 
  UserAssessmentProfile 
} from '../types';
import { INITIAL_QUESTION_BANK } from '../data/questionBank';

export class AdaptiveEngine {
  private ageGroup: AgeGroup;
  private age: number;
  private questionPool: Question[];
  private askedQuestionIds: Set<string> = new Set();
  private answers: UserAnswerRecord[] = [];
  private currentDifficulty: 1 | 2 | 3 | 4 | 5 = 3;
  private tabSwitchCount: number = 0;
  private readonly totalQuestionsTarget: number = 15;

  private static readonly CATEGORIES_ORDER: QuestionCategory[] = [
    'Pattern Recognition',
    'Numerical Reasoning',
    'Logical Reasoning',
    'Spatial Reasoning',
    'Verbal Reasoning',
    'Memory',
    'Processing Speed',
    'Pattern Recognition',
    'Numerical Reasoning',
    'Logical Reasoning',
    'Spatial Reasoning',
    'Verbal Reasoning',
    'Pattern Recognition',
    'Logical Reasoning',
    'Processing Speed'
  ];

  constructor(profile: UserAssessmentProfile, customBank?: Question[]) {
    this.ageGroup = profile.ageGroup;
    this.age = profile.age;
    const bank = customBank || INITIAL_QUESTION_BANK;

    // Filter questions that are appropriate for this age group, or general
    let pool = bank.filter(q => 
      q.ageGroups.includes(this.ageGroup) || 
      q.ageGroups.length === 0
    );

    // If pool is under 15 for a narrow cohort, expand with broader age cohort questions
    if (pool.length < this.totalQuestionsTarget) {
      if (this.ageGroup === '6-8') {
        pool = bank.filter(q => q.ageGroups.includes('6-8') || q.ageGroups.includes('9-11'));
      } else if (this.ageGroup === '9-11') {
        pool = bank.filter(q => q.ageGroups.includes('6-8') || q.ageGroups.includes('9-11') || q.ageGroups.includes('12-14'));
      } else if (this.ageGroup === '12-14' || this.ageGroup === '15-17') {
        pool = bank.filter(q => q.ageGroups.includes('12-14') || q.ageGroups.includes('15-17') || q.ageGroups.includes('18-25'));
      } else {
        // Adult & mature pools (18-25, 26-40, 41-60, 61+) share the comprehensive 70+ adult/master questions
        pool = bank.filter(q => 
          q.ageGroups.includes('18-25') || 
          q.ageGroups.includes('26-40') || 
          q.ageGroups.includes('41-60') || 
          q.ageGroups.includes('61+')
        );
      }
    }

    if (pool.length < this.totalQuestionsTarget) {
      pool = [...bank];
    }

    // Shuffle pool with Fisher-Yates shuffle for randomized selection
    this.questionPool = this.shuffleArray([...pool]);

    // Set moderate starting difficulty based on age group
    if (this.ageGroup === '6-8') {
      this.currentDifficulty = 1;
    } else if (this.ageGroup === '9-11' || this.ageGroup === '12-14') {
      this.currentDifficulty = 2;
    } else {
      this.currentDifficulty = 2; // Moderate starting baseline (difficulty 2)
    }
  }

  private shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  public getNextQuestion(questionIndex: number): Question | null {
    if (questionIndex >= this.totalQuestionsTarget) {
      return null;
    }

    const targetCategory = AdaptiveEngine.CATEGORIES_ORDER[questionIndex % AdaptiveEngine.CATEGORIES_ORDER.length];
    
    // Pick randomly from matching unasked questions
    // Attempt 1: Exact category, exact difficulty, unasked
    let candidates = this.questionPool.filter(
      q => !this.askedQuestionIds.has(q.id) && 
           q.category === targetCategory && 
           q.difficulty === this.currentDifficulty
    );

    // Attempt 2: Exact category, ±1 difficulty, unasked
    if (candidates.length === 0) {
      candidates = this.questionPool.filter(
        q => !this.askedQuestionIds.has(q.id) && 
             q.category === targetCategory && 
             Math.abs(q.difficulty - this.currentDifficulty) <= 1
      );
    }

    // Attempt 3: Any category matching current difficulty, unasked
    if (candidates.length === 0) {
      candidates = this.questionPool.filter(
        q => !this.askedQuestionIds.has(q.id) && 
             q.difficulty === this.currentDifficulty
      );
    }

    // Attempt 4: Any unasked question in pool
    if (candidates.length === 0) {
      candidates = this.questionPool.filter(q => !this.askedQuestionIds.has(q.id));
    }

    // Pick a random candidate from the matched candidates set
    let chosen: Question;
    if (candidates.length > 0) {
      const randomIndex = Math.floor(Math.random() * candidates.length);
      chosen = candidates[randomIndex];
    } else {
      // Fallback: If bank pool somehow exhausted, pick a random item from the full pool
      chosen = this.questionPool[Math.floor(Math.random() * this.questionPool.length)];
    }

    this.askedQuestionIds.add(chosen.id);
    return chosen;
  }

  public recordAnswer(
    question: Question,
    selectedIndex: number,
    timeTakenSec: number
  ): { isCorrect: boolean; nextDifficulty: 1 | 2 | 3 | 4 | 5 } {
    const isCorrect = selectedIndex === question.correctIndex;
    
    this.answers.push({
      questionId: question.id,
      category: question.category,
      difficulty: question.difficulty,
      selectedIndex,
      correctIndex: question.correctIndex,
      isCorrect,
      timeTakenSec
    });

    // Adaptive step adjustment
    if (isCorrect) {
      // If correct and fast, increase difficulty
      if (this.currentDifficulty < 5) {
        this.currentDifficulty = (this.currentDifficulty + 1) as 1 | 2 | 3 | 4 | 5;
      }
    } else {
      // If incorrect, step down or maintain
      if (this.currentDifficulty > 1) {
        this.currentDifficulty = (this.currentDifficulty - 1) as 1 | 2 | 3 | 4 | 5;
      }
    }

    return {
      isCorrect,
      nextDifficulty: this.currentDifficulty
    };
  }

  public recordTabSwitch(): number {
    this.tabSwitchCount += 1;
    return this.tabSwitchCount;
  }

  public getTabSwitchCount(): number {
    return this.tabSwitchCount;
  }

  public isDisqualified(): boolean {
    return this.tabSwitchCount >= 3;
  }

  public calculateResults(profile: UserAssessmentProfile): AssessmentResult {
    const totalQuestions = this.answers.length || 1;
    const correctAnswers = this.answers.filter(a => a.isCorrect).length;
    const totalTimeSec = this.answers.reduce((acc, a) => acc + a.timeTakenSec, 0);
    const avgResponseTimeSec = Math.round((totalTimeSec / totalQuestions) * 10) / 10;

    // Difficulty weight table: diff 1 = 0.8, diff 2 = 1.0, diff 3 = 1.25, diff 4 = 1.5, diff 5 = 1.85
    const diffWeights: Record<number, number> = {
      1: 0.8,
      2: 1.0,
      3: 1.25,
      4: 1.55,
      5: 1.9
    };

    let totalWeightPossible = 0;
    let earnedWeight = 0;

    this.answers.forEach(ans => {
      const weight = diffWeights[ans.difficulty] || 1.0;
      totalWeightPossible += weight;
      if (ans.isCorrect) {
        // Speed bonus: moderate bonus if completed accurately in < 25s
        let speedMultiplier = 1.0;
        if (ans.timeTakenSec < 15) speedMultiplier = 1.06;
        else if (ans.timeTakenSec < 25) speedMultiplier = 1.02;
        earnedWeight += weight * speedMultiplier;
      }
    });

    const performanceRatio = earnedWeight / Math.max(totalWeightPossible, 1);

    // Standardized Gaussian distribution mapping (Mean 100, SD 15)
    // Baseline raw ratio 0.50 corresponds to ~100 IQ.
    // 0.85+ reaches 125+, 0.95+ reaches 138-145+.
    let rawScore = 70 + (performanceRatio * 75);

    // Slight adjustment based on average question difficulty tackled
    const avgDifficulty = this.answers.reduce((acc, a) => acc + a.difficulty, 0) / totalQuestions;
    rawScore += (avgDifficulty - 3) * 3;

    // Round score to whole integer between 72 and 148
    const estimatedScore = Math.min(148, Math.max(72, Math.round(rawScore)));
    const scoreRangeMin = Math.max(70, estimatedScore - 4);
    const scoreRangeMax = Math.min(150, estimatedScore + 4);

    // Compute percentile from IQ score using normal CDF approximation
    // z = (estimatedScore - 100) / 15
    const zScore = (estimatedScore - 100) / 15;
    const percentile = Math.min(99.9, Math.max(1, Math.round(normalCDF(zScore) * 1000) / 10));

    // Performance level designation
    let performanceLevel: PerformanceLevel = 'Average';
    if (estimatedScore >= 135) performanceLevel = 'Exceptional';
    else if (estimatedScore >= 125) performanceLevel = 'Very Strong';
    else if (estimatedScore >= 115) performanceLevel = 'Strong';
    else if (estimatedScore >= 105) performanceLevel = 'Above Average';
    else if (estimatedScore >= 90) performanceLevel = 'Average';
    else performanceLevel = 'Developing';

    // Category breakdown
    const categories: QuestionCategory[] = [
      'Pattern Recognition',
      'Numerical Reasoning',
      'Logical Reasoning',
      'Spatial Reasoning',
      'Verbal Reasoning',
      'Memory',
      'Processing Speed'
    ];

    const categoryResults: CategoryResultSummary[] = categories.map(cat => {
      const catAnswers = this.answers.filter(a => a.category === cat);
      if (catAnswers.length === 0) {
        // synthesize baseline based on overall performance if not directly sampled
        const syntheticScore = Math.round(Math.min(98, Math.max(65, (estimatedScore / 140) * 90)));
        return {
          category: cat,
          score: syntheticScore,
          correct: 1,
          total: 1,
          accuracy: Math.round((correctAnswers / totalQuestions) * 100),
          avgTimeSec: avgResponseTimeSec,
          ratingLabel: getRatingLabel(syntheticScore)
        };
      }

      const correct = catAnswers.filter(a => a.isCorrect).length;
      const total = catAnswers.length;
      const accuracy = Math.round((correct / total) * 100);
      const catTime = catAnswers.reduce((acc, a) => acc + a.timeTakenSec, 0);
      const avgTime = Math.round((catTime / total) * 10) / 10;
      
      // Calculate 0-100 scale index
      const catScore = Math.min(99, Math.max(50, Math.round((accuracy * 0.7) + (estimatedScore / 150 * 30))));

      return {
        category: cat,
        score: catScore,
        correct,
        total,
        accuracy,
        avgTimeSec: avgTime,
        ratingLabel: getRatingLabel(catScore)
      };
    });

    const now = new Date();
    const year = now.getFullYear();
    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const certificateId = `IQM-${year}-${randomHex}`;
    const assessmentId = `ASMT-${Date.now()}-${randomHex}`;

    return {
      id: assessmentId,
      certificateId,
      userName: profile.name,
      nickname: profile.nickname,
      age: profile.age,
      ageGroup: profile.ageGroup,
      completedAt: now.toISOString(),
      estimatedScore,
      scoreRangeMin,
      scoreRangeMax,
      percentile,
      performanceLevel,
      totalQuestions,
      correctAnswers,
      totalTimeSec,
      avgResponseTimeSec,
      categoryResults,
      integrityFlags: {
        tabSwitches: this.tabSwitchCount,
        warningsGiven: this.tabSwitchCount > 0 ? 1 : 0
      },
      shareToken: randomHex
    };
  }
}

// Approximation of Standard Normal Cumulative Distribution Function (CDF)
function normalCDF(z: number): number {
  const t = 1.0 / (1.0 + 0.2316419 * Math.abs(z));
  const d = 0.3989422804014327 * Math.exp(-z * z / 2.0);
  const p = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return z > 0 ? 1.0 - p : p;
}

function getRatingLabel(score: number): string {
  if (score >= 90) return 'Exceptional';
  if (score >= 80) return 'Very Strong';
  if (score >= 70) return 'High';
  if (score >= 55) return 'Proficient';
  return 'Standard';
}
