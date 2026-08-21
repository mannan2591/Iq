import { AgeGroup, Question, DailyChallengeItem } from '../types';

export const AGE_GROUP_RANGES: { id: AgeGroup; label: string; minAge: number; maxAge: number; description: string }[] = [
  { id: '6-8', label: '6 – 8 Years', minAge: 6, maxAge: 8, description: 'Visual patterns, shape logic, counting & simple deduction' },
  { id: '9-11', label: '9 – 11 Years', minAge: 9, maxAge: 11, description: 'Number logic, spatial grids, relationships & sequence memory' },
  { id: '12-14', label: '12 – 14 Years', minAge: 12, maxAge: 14, description: 'Abstract matrices, multi-step deductions & geometric sequences' },
  { id: '15-17', label: '15 – 17 Years', minAge: 15, maxAge: 17, description: 'Quantitative patterns, spatial folding & abstract analogies' },
  { id: '18-25', label: '18 – 25 Years', minAge: 18, maxAge: 25, description: 'Complex matrices, fluid reasoning & inductive logic' },
  { id: '26-40', label: '26 – 40 Years', minAge: 26, maxAge: 40, description: 'Multi-dimensional patterns, deductive logic & analytical speed' },
  { id: '41-60', label: '41 – 60 Years', minAge: 41, maxAge: 60, description: 'Abstract reasoning, spatial orientation & quantitative synthesis' },
  { id: '61+', label: '61+ Years', minAge: 61, maxAge: 120, description: 'Fluid pattern recognition, memory indexing & cognitive agility' }
];

export function getAgeGroupFromAge(age: number): AgeGroup {
  if (age <= 8) return '6-8';
  if (age <= 11) return '9-11';
  if (age <= 14) return '12-14';
  if (age <= 17) return '15-17';
  if (age <= 25) return '18-25';
  if (age <= 40) return '26-40';
  if (age <= 60) return '41-60';
  return '61+';
}

/**
 * Master Question Bank containing 100 psychometrically balanced cognitive questions
 * spanning Pattern Recognition, Numerical Reasoning, Logical Reasoning, Spatial Reasoning,
 * Verbal Reasoning, Memory, and Processing Speed.
 */
export const INITIAL_QUESTION_BANK: Question[] = [
  // ================= 1 TO 10: 6-8 COHORT =================
  {
    id: 'q-001',
    ageGroups: ['6-8'],
    category: 'Pattern Recognition',
    difficulty: 1,
    question: 'Which shape comes next in the sequence?',
    subtext: 'Circle, Square, Triangle, Circle, Square, ...',
    visualPayload: {
      type: 'shapes-sequence',
      items: ['🔵', '🟧', '🔺', '🔵', '🟧', '❓']
    },
    options: ['🔺 Triangle', '🔵 Circle', '🟧 Square', '⭐ Star'],
    correctIndex: 0,
    explanation: 'The pattern repeats (Circle → Square → Triangle). After Square comes Triangle.',
    timeLimitSec: 45
  },
  {
    id: 'q-002',
    ageGroups: ['6-8'],
    category: 'Pattern Recognition',
    difficulty: 2,
    question: 'Which color completes the caterpillar pattern?',
    subtext: 'Red, Blue, Red, Blue, Blue, Red, Blue, Blue, ...',
    visualPayload: {
      type: 'shapes-sequence',
      items: ['🔴', '🔵', '🔴', '🔵', '🔵', '🔴', '🔵', '🔵', '❓']
    },
    options: ['🔵 Blue', '🔴 Red', '🟢 Green', '🟡 Yellow'],
    correctIndex: 0,
    explanation: 'The pattern adds one more blue each time: 1 Blue, then 2 Blues, then 3 Blues.',
    timeLimitSec: 45
  },
  {
    id: 'q-003',
    ageGroups: ['6-8'],
    category: 'Numerical Reasoning',
    difficulty: 1,
    question: 'What number replaces the question mark?',
    subtext: '2, 4, 6, 8, ?',
    visualPayload: {
      type: 'shapes-sequence',
      items: ['2', '4', '6', '8', '❓']
    },
    options: ['9', '10', '11', '12'],
    correctIndex: 1,
    explanation: 'Each number increases by adding 2 (even numbers). 8 + 2 = 10.',
    timeLimitSec: 40
  },
  {
    id: 'q-004',
    ageGroups: ['6-8'],
    category: 'Numerical Reasoning',
    difficulty: 2,
    question: 'Count by 5s. What number is missing?',
    subtext: '5, 10, 15, ___, 25',
    visualPayload: {
      type: 'shapes-sequence',
      items: ['5', '10', '15', '❓', '25']
    },
    options: ['18', '20', '22', '30'],
    correctIndex: 1,
    explanation: 'Counting by 5s: 5, 10, 15, 20, 25. The missing number is 20.',
    timeLimitSec: 40
  },
  {
    id: 'q-005',
    ageGroups: ['6-8'],
    category: 'Logical Reasoning',
    difficulty: 1,
    question: 'Max is older than Leo. Leo is older than Sam. Who is the oldest?',
    options: ['Max', 'Leo', 'Sam', 'They are the same age'],
    correctIndex: 0,
    explanation: 'Since Max is older than Leo, and Leo is older than Sam, Max must be the oldest.',
    timeLimitSec: 45
  },
  {
    id: 'q-006',
    ageGroups: ['6-8'],
    category: 'Logical Reasoning',
    difficulty: 2,
    question: 'All cats have whiskers. Whiskers is a cat. Which statement must be true?',
    options: ['Whiskers has stripes', 'Whiskers has whiskers', 'Whiskers likes mice', 'Whiskers is orange'],
    correctIndex: 1,
    explanation: 'Because every cat has whiskers and Whiskers is a cat, Whiskers definitely has whiskers.',
    timeLimitSec: 45
  },
  {
    id: 'q-007',
    ageGroups: ['6-8'],
    category: 'Spatial Reasoning',
    difficulty: 1,
    question: 'Which object is the odd one out because it cannot roll?',
    options: ['⚽ Football', '🏀 Basketball', '📦 Cardboard Box', '🎾 Tennis Ball'],
    correctIndex: 2,
    explanation: 'The ball shapes are spheres and roll easily, whereas the cardboard box has flat sides.',
    timeLimitSec: 35
  },
  {
    id: 'q-008',
    ageGroups: ['6-8'],
    category: 'Verbal Reasoning',
    difficulty: 1,
    question: 'Bird is to Fly as Fish is to:',
    options: ['Swim', 'Walk', 'Climb', 'Run'],
    correctIndex: 0,
    explanation: 'A bird moves by flying; a fish moves by swimming.',
    timeLimitSec: 35
  },
  {
    id: 'q-009',
    ageGroups: ['6-8'],
    category: 'Memory',
    difficulty: 2,
    question: 'Remember this fruit sequence: 🍎 Apple, 🍌 Banana, 🍇 Grapes. Which fruit was in the middle?',
    visualPayload: {
      type: 'memory-card',
      items: ['🍎 Apple', '🍌 Banana', '🍇 Grapes'],
      memoryDisplaySec: 4
    },
    options: ['Apple', 'Banana', 'Grapes', 'Orange'],
    correctIndex: 1,
    explanation: 'Banana was the second item in the sequence.',
    timeLimitSec: 30
  },
  {
    id: 'q-010',
    ageGroups: ['6-8'],
    category: 'Processing Speed',
    difficulty: 1,
    question: 'How many red stars ⭐ are in this group: ⭐ 🌟 ⭐ ⭐ 🌟 ⭐ ?',
    options: ['3', '4', '5', '6'],
    correctIndex: 1,
    explanation: 'There are exactly 4 gold stars ⭐ at positions 1, 3, 4, 6.',
    timeLimitSec: 25
  },

  // ================= 11 TO 22: 9-11 COHORT =================
  {
    id: 'q-011',
    ageGroups: ['9-11'],
    category: 'Pattern Recognition',
    difficulty: 2,
    question: 'Find the missing number in the 2x2 grid pattern.',
    subtext: 'Row 1: [3, 6] | Row 2: [5, ?]',
    visualPayload: {
      type: 'matrix-2x2',
      matrixGrid: [
        ['3', '6'],
        ['5', '?']
      ]
    },
    options: ['8', '9', '10', '12'],
    correctIndex: 2,
    explanation: 'In each row, the second number is twice the first number (3 × 2 = 6, 5 × 2 = 10).',
    timeLimitSec: 45
  },
  {
    id: 'q-012',
    ageGroups: ['9-11'],
    category: 'Pattern Recognition',
    difficulty: 3,
    question: 'Which geometric polygon comes next?',
    subtext: 'Triangle (3 sides), Square (4 sides), Pentagon (5 sides), Hexagon (6 sides), ...',
    visualPayload: {
      type: 'shapes-sequence',
      items: ['🔺 (3)', '🟧 (4)', '⬟ (5)', '⬡ (6)', '❓']
    },
    options: ['Octagon (8 sides)', 'Heptagon (7 sides)', 'Decagon (10 sides)', 'Circle'],
    correctIndex: 1,
    explanation: 'The number of sides increases by 1 each time. A 7-sided polygon is a Heptagon.',
    timeLimitSec: 45
  },
  {
    id: 'q-013',
    ageGroups: ['9-11'],
    category: 'Numerical Reasoning',
    difficulty: 2,
    question: 'What is the next number in this sequence: 3, 6, 12, 24, ?',
    visualPayload: {
      type: 'shapes-sequence',
      items: ['3', '6', '12', '24', '❓']
    },
    options: ['36', '42', '48', '52'],
    correctIndex: 2,
    explanation: 'Each term is doubled (multiplied by 2): 24 × 2 = 48.',
    timeLimitSec: 45
  },
  {
    id: 'q-014',
    ageGroups: ['9-11', '12-14'],
    category: 'Numerical Reasoning',
    difficulty: 3,
    question: 'Find the missing number: 1, 4, 9, 16, 25, ?',
    options: ['30', '35', '36', '49'],
    correctIndex: 2,
    explanation: 'These are perfect square numbers: 1², 2², 3², 4², 5², 6² = 36.',
    timeLimitSec: 45
  },
  {
    id: 'q-015',
    ageGroups: ['9-11'],
    category: 'Logical Reasoning',
    difficulty: 2,
    question: 'If Thursday was 3 days ago, what day will tomorrow be?',
    options: ['Saturday', 'Sunday', 'Monday', 'Tuesday'],
    correctIndex: 2,
    explanation: 'If Thursday was 3 days ago, today is Sunday. Tomorrow will be Monday.',
    timeLimitSec: 45
  },
  {
    id: 'q-016',
    ageGroups: ['9-11', '12-14'],
    category: 'Logical Reasoning',
    difficulty: 3,
    question: 'Some roses are flowers. All flowers need water. Therefore:',
    options: [
      'All roses need water',
      'Some flowers are not roses',
      'Roses do not need water',
      'No flowers are roses'
    ],
    correctIndex: 0,
    explanation: 'Since all roses are flowers and all flowers need water, all roses need water.',
    timeLimitSec: 45
  },
  {
    id: 'q-017',
    ageGroups: ['9-11'],
    category: 'Spatial Reasoning',
    difficulty: 2,
    question: 'If you fold a square sheet of paper in half twice and punch a hole in the center, how many holes appear when unfolded?',
    options: ['2 holes', '3 holes', '4 holes', '8 holes'],
    correctIndex: 2,
    explanation: 'Folding twice creates 4 layers. One hole punched through 4 layers produces 4 holes when opened.',
    timeLimitSec: 45
  },
  {
    id: 'q-018',
    ageGroups: ['9-11'],
    category: 'Spatial Reasoning',
    difficulty: 3,
    question: 'How many total triangles are in a large triangle divided into 4 smaller equal triangles?',
    options: ['4', '5', '6', '8'],
    correctIndex: 1,
    explanation: 'There are 4 small triangles plus 1 large overall triangle = 5 total triangles.',
    timeLimitSec: 40
  },
  {
    id: 'q-019',
    ageGroups: ['9-11'],
    category: 'Verbal Reasoning',
    difficulty: 2,
    question: 'Glove is to Hand as Sock is to:',
    options: ['Arm', 'Foot', 'Head', 'Leg'],
    correctIndex: 1,
    explanation: 'A glove covers a hand; a sock covers a foot.',
    timeLimitSec: 35
  },
  {
    id: 'q-020',
    ageGroups: ['9-11'],
    category: 'Memory',
    difficulty: 2,
    question: 'Recall this 4-digit security code: [ 7 - 3 - 9 - 4 ]. What was the 3rd digit?',
    visualPayload: {
      type: 'memory-card',
      items: ['7', '3', '9', '4'],
      memoryDisplaySec: 3
    },
    options: ['7', '3', '9', '4'],
    correctIndex: 2,
    explanation: 'The third digit displayed was 9.',
    timeLimitSec: 30
  },
  {
    id: 'q-021',
    ageGroups: ['9-11'],
    category: 'Processing Speed',
    difficulty: 2,
    question: 'Which of the following pairs is identical?',
    options: ['83921 vs 83921', '74829 vs 74819', '59302 vs 59303', '10928 vs 10938'],
    correctIndex: 0,
    explanation: '83921 and 83921 have identical digits in all positions.',
    timeLimitSec: 25
  },
  {
    id: 'q-022',
    ageGroups: ['9-11'],
    category: 'Numerical Reasoning',
    difficulty: 3,
    question: 'If a pizza is cut into 8 equal slices, and Emily eats 3/8 while Jack eats 1/4, how many slices are left?',
    options: ['1 slice', '2 slices', '3 slices', '4 slices'],
    correctIndex: 2,
    explanation: 'Emily eats 3 slices. Jack eats 1/4 of 8 = 2 slices. Total eaten = 5 slices. Left = 8 - 5 = 3 slices.',
    timeLimitSec: 45
  },

  // ================= 23 TO 40: 12-14 & 15-17 COHORTS =================
  {
    id: 'q-023',
    ageGroups: ['12-14', '15-17'],
    category: 'Pattern Recognition',
    difficulty: 3,
    question: 'What number replaces the question mark in the 3x3 matrix?',
    subtext: 'Look at the row-wise addition relationship.',
    visualPayload: {
      type: 'matrix-3x3',
      matrixGrid: [
        ['2', '3', '5'],
        ['4', '1', '5'],
        ['3', '6', '?']
      ]
    },
    options: ['7', '8', '9', '10'],
    correctIndex: 2,
    explanation: 'In each row: Col 1 + Col 2 = Col 3. (3 + 6 = 9).',
    timeLimitSec: 45
  },
  {
    id: 'q-024',
    ageGroups: ['12-14', '15-17'],
    category: 'Pattern Recognition',
    difficulty: 4,
    question: 'Which element completes the alternating sequence: 2, A, 4, C, 8, E, 16, G, ?',
    options: ['32', 'H', 'I', '24'],
    correctIndex: 0,
    explanation: 'Two interleaved sequences: Numbers double (2, 4, 8, 16, 32); Letters skip one (A, C, E, G). Next is 32.',
    timeLimitSec: 45
  },
  {
    id: 'q-025',
    ageGroups: ['12-14', '15-17'],
    category: 'Numerical Reasoning',
    difficulty: 3,
    question: 'Find the next term in the Fibonacci sequence: 1, 1, 2, 3, 5, 8, 13, ?',
    options: ['18', '20', '21', '24'],
    correctIndex: 2,
    explanation: 'Each term is the sum of the two preceding terms: 8 + 13 = 21.',
    timeLimitSec: 40
  },
  {
    id: 'q-026',
    ageGroups: ['12-14', '15-17'],
    category: 'Numerical Reasoning',
    difficulty: 4,
    question: 'If 3x + 7 = 22, what is the value of 2x - 1?',
    options: ['7', '8', '9', '11'],
    correctIndex: 2,
    explanation: '3x = 15 => x = 5. Then 2(5) - 1 = 10 - 1 = 9.',
    timeLimitSec: 45
  },
  {
    id: 'q-027',
    ageGroups: ['12-14', '15-17'],
    category: 'Numerical Reasoning',
    difficulty: 4,
    question: 'What is the missing number in the sequence: 2, 6, 12, 20, 30, 42, ?',
    options: ['48', '52', '56', '60'],
    correctIndex: 2,
    explanation: 'The differences are +4, +6, +8, +10, +12, +14. 42 + 14 = 56 (or n(n+1): 7 × 8 = 56).',
    timeLimitSec: 45
  },
  {
    id: 'q-028',
    ageGroups: ['12-14', '15-17'],
    category: 'Logical Reasoning',
    difficulty: 3,
    question: 'If all Zips are Zaps, and some Zaps are Zops, which of the following is necessarily true?',
    options: [
      'All Zips are Zops',
      'Some Zips might be Zops',
      'No Zips are Zops',
      'All Zops are Zips'
    ],
    correctIndex: 1,
    explanation: 'Since Zips belong to Zaps, and part of Zaps overlap with Zops, some Zips might overlap with Zops, but it is not guaranteed for all.',
    timeLimitSec: 45
  },
  {
    id: 'q-029',
    ageGroups: ['12-14', '15-17'],
    category: 'Logical Reasoning',
    difficulty: 4,
    question: 'Five runners A, B, C, D, E finish a race. A finishes before B but after C. D finishes before C. E finishes after B. Who won the race?',
    options: ['A', 'B', 'C', 'D'],
    correctIndex: 3,
    explanation: 'Ordering: D > C > A > B > E. Therefore D finished first (won).',
    timeLimitSec: 50
  },
  {
    id: 'q-030',
    ageGroups: ['12-14', '15-17'],
    category: 'Logical Reasoning',
    difficulty: 4,
    question: 'A clock shows 3:15. What is the angle between the hour hand and the minute hand?',
    options: ['0°', '7.5°', '15°', '22.5°'],
    correctIndex: 1,
    explanation: 'At 3:15, the minute hand is at 90°. The hour hand has moved 15/60 × 30° = 7.5° past 90°. Angle = 7.5°.',
    timeLimitSec: 50
  },
  {
    id: 'q-031',
    ageGroups: ['12-14', '15-17'],
    category: 'Spatial Reasoning',
    difficulty: 3,
    question: 'A standard six-sided die has opposite sides that sum to 7. If top is 2 and front is 4, what is on the bottom?',
    options: ['3', '5', '6', '1'],
    correctIndex: 1,
    explanation: 'Opposite of 2 is 7 - 2 = 5.',
    timeLimitSec: 35
  },
  {
    id: 'q-032',
    ageGroups: ['12-14', '15-17'],
    category: 'Spatial Reasoning',
    difficulty: 4,
    question: 'How many small 1x1x1 cubes are needed to form a hollow 3x3x3 cube (walls only, center empty)?',
    options: ['24', '26', '27', '18'],
    correctIndex: 1,
    explanation: 'Total solid 3x3x3 = 27 cubes. Subtracting the 1 center cube leaves 26 cubes.',
    timeLimitSec: 45
  },
  {
    id: 'q-033',
    ageGroups: ['12-14', '15-17'],
    category: 'Spatial Reasoning',
    difficulty: 4,
    question: 'If you rotate an "L" shape 90 degrees clockwise and then reflect it horizontally, what does it look like?',
    options: ['Upside down L', 'A horizontal base facing left with vertical arm upwards', 'Mirrored L', 'Standard L'],
    correctIndex: 1,
    explanation: '90° CW turns the vertical into horizontal pointing right; horizontal reflection flips it to point left.',
    timeLimitSec: 40
  },
  {
    id: 'q-034',
    ageGroups: ['12-14', '15-17'],
    category: 'Verbal Reasoning',
    difficulty: 3,
    question: 'TELESCOPE is to ASTRONOMER as MICROSCOPE is to:',
    options: ['BIOLOGIST', 'GEOLOGIST', 'CHEMIST', 'PHYSICIST'],
    correctIndex: 0,
    explanation: 'A telescope is the primary visual magnification tool of an astronomer; a microscope is for a biologist.',
    timeLimitSec: 35
  },
  {
    id: 'q-035',
    ageGroups: ['12-14', '15-17'],
    category: 'Verbal Reasoning',
    difficulty: 4,
    question: 'Which word does NOT belong with the others?',
    options: ['EPHEMERAL', 'TRANSIENT', 'FLEETING', 'PERPETUAL'],
    correctIndex: 3,
    explanation: 'Ephemeral, transient, and fleeting mean temporary/short-lived; Perpetual means everlasting.',
    timeLimitSec: 35
  },
  {
    id: 'q-036',
    ageGroups: ['12-14', '15-17'],
    category: 'Memory',
    difficulty: 3,
    question: 'Memorize this 5-item spatial sequence: [ ▲, ■, ●, ★, ◆ ]. What symbol was in the 4th spot?',
    visualPayload: {
      type: 'memory-card',
      items: ['▲ Triangle', '■ Square', '● Circle', '★ Star', '◆ Diamond'],
      memoryDisplaySec: 4
    },
    options: ['Square', 'Circle', 'Star', 'Diamond'],
    correctIndex: 2,
    explanation: 'The 4th symbol in the sequence is ★ Star.',
    timeLimitSec: 30
  },
  {
    id: 'q-037',
    ageGroups: ['12-14', '15-17'],
    category: 'Processing Speed',
    difficulty: 3,
    question: 'Evaluate quickly: (18 ÷ 3) + (4 × 5) - (12 ÷ 2) = ?',
    options: ['18', '20', '22', '24'],
    correctIndex: 1,
    explanation: '6 + 20 - 6 = 20.',
    timeLimitSec: 25
  },
  {
    id: 'q-038',
    ageGroups: ['12-14', '15-17'],
    category: 'Pattern Recognition',
    difficulty: 3,
    question: 'Find the missing number in the triangle apex puzzle: Base corners are 4 and 6, apex is 24. Base corners 5 and 7, apex is 35. Base corners 8 and 9, apex is ?',
    options: ['64', '72', '81', '90'],
    correctIndex: 1,
    explanation: 'Apex = Base 1 × Base 2. 8 × 9 = 72.',
    timeLimitSec: 40
  },
  {
    id: 'q-039',
    ageGroups: ['12-14', '15-17'],
    category: 'Numerical Reasoning',
    difficulty: 4,
    question: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?',
    options: ['$0.10', '$0.05', '$0.15', '$0.01'],
    correctIndex: 1,
    explanation: 'Let ball = x. Bat = x + 1.00. x + (x + 1.00) = 1.10 => 2x = 0.10 => x = $0.05.',
    timeLimitSec: 45
  },
  {
    id: 'q-040',
    ageGroups: ['12-14', '15-17'],
    category: 'Logical Reasoning',
    difficulty: 3,
    question: 'If you have a 3-liter jug and a 5-liter jug, what is the minimum steps to measure exactly 4 liters of water?',
    options: ['4 steps', '6 steps', '8 steps', 'Impossible'],
    correctIndex: 1,
    explanation: 'Fill 5L, pour to 3L (leaves 2L in 5L jug). Empty 3L, pour 2L into 3L. Fill 5L, pour 1L into 3L to fill it => exactly 4L left in 5L jug.',
    timeLimitSec: 50
  },

  // ================= 41 TO 75: 18-25 & 26-40 ADULT COHORTS =================
  {
    id: 'q-041',
    ageGroups: ['18-25', '26-40'],
    category: 'Pattern Recognition',
    difficulty: 2,
    question: 'Find the missing number in the matrix sequence.',
    subtext: 'Row 1: [2, 4, 8] | Row 2: [3, 6, 12] | Row 3: [4, 8, ?]',
    visualPayload: {
      type: 'matrix-3x3',
      matrixGrid: [
        ['2', '4', '8'],
        ['3', '6', '12'],
        ['4', '8', '?']
      ]
    },
    options: ['12', '14', '16', '20'],
    correctIndex: 2,
    explanation: 'Each row doubles the preceding number (×2): 4 × 2 = 8, 8 × 2 = 16.',
    timeLimitSec: 45
  },
  {
    id: 'q-042',
    ageGroups: ['18-25', '26-40'],
    category: 'Pattern Recognition',
    difficulty: 3,
    question: 'Determine the missing value in the progressive matrix:',
    subtext: 'Row 1: [5, 10, 15] | Row 2: [4, 8, 12] | Row 3: [6, 12, ?]',
    visualPayload: {
      type: 'matrix-3x3',
      matrixGrid: [
        ['5', '10', '15'],
        ['4', '8', '12'],
        ['6', '12', '?']
      ]
    },
    options: ['14', '16', '18', '24'],
    correctIndex: 2,
    explanation: 'In each row, Col 1 + Col 2 = Col 3 (or counting by row base number: 6, 12, 18).',
    timeLimitSec: 45
  },
  {
    id: 'q-043',
    ageGroups: ['18-25', '26-40'],
    category: 'Pattern Recognition',
    difficulty: 3,
    question: 'Which value completes the matrix?',
    subtext: 'Row 1: [8, 3, 11] | Row 2: [6, 7, 13] | Row 3: [14, 10, ?]',
    visualPayload: {
      type: 'matrix-3x3',
      matrixGrid: [
        ['8', '3', '11'],
        ['6', '7', '13'],
        ['14', '10', '?']
      ]
    },
    options: ['20', '24', '26', '28'],
    correctIndex: 1,
    explanation: 'Each row satisfies Col 1 + Col 2 = Col 3. In Row 3: 14 + 10 = 24.',
    timeLimitSec: 45
  },
  {
    id: 'q-044',
    ageGroups: ['18-25', '26-40'],
    category: 'Numerical Reasoning',
    difficulty: 2,
    question: 'Find the next number in this sequence: 4, 8, 16, 32, ?',
    options: ['48', '56', '64', '72'],
    correctIndex: 2,
    explanation: 'Each number is doubled (multiplied by 2): 32 × 2 = 64.',
    timeLimitSec: 45
  },
  {
    id: 'q-045',
    ageGroups: ['18-25', '26-40'],
    category: 'Numerical Reasoning',
    difficulty: 3,
    question: 'If 5 machines take 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?',
    options: ['100 minutes', '50 minutes', '20 minutes', '5 minutes'],
    correctIndex: 3,
    explanation: '1 machine produces 1 widget in 5 minutes. Therefore, 100 machines produce 100 widgets in 5 minutes.',
    timeLimitSec: 40
  },
  {
    id: 'q-046',
    ageGroups: ['18-25', '26-40'],
    category: 'Numerical Reasoning',
    difficulty: 3,
    question: 'What is the next number in this sequence: 10, 19, 28, 37, 46, ?',
    options: ['52', '55', '56', '57'],
    correctIndex: 1,
    explanation: 'Each term increases by adding 9: 46 + 9 = 55.',
    timeLimitSec: 45
  },
  {
    id: 'q-047',
    ageGroups: ['18-25', '26-40'],
    category: 'Numerical Reasoning',
    difficulty: 3,
    question: 'A lily pad patch in a lake doubles in size every day. If it takes 48 days to cover the entire lake, how many days does it take to cover half of the lake?',
    options: ['24 days', '47 days', '36 days', '46 days'],
    correctIndex: 1,
    explanation: 'Since the patch doubles daily, on day 47 it is at half size, doubling to full size on day 48.',
    timeLimitSec: 35
  },
  {
    id: 'q-048',
    ageGroups: ['18-25', '26-40'],
    category: 'Logical Reasoning',
    difficulty: 2,
    question: 'If "All fruits have seeds" and "An apple is a fruit", which statement must be true?',
    options: [
      'An apple has seeds',
      'All seeds are apples',
      'Some apples do not have seeds',
      'Vegetables have seeds'
    ],
    correctIndex: 0,
    explanation: 'Since an apple is a fruit, and all fruits have seeds, an apple must have seeds.',
    timeLimitSec: 45
  },
  {
    id: 'q-049',
    ageGroups: ['18-25', '26-40'],
    category: 'Logical Reasoning',
    difficulty: 3,
    question: 'Statement: "If it rains, the ground gets wet." The ground is wet. What can we logically conclude?',
    options: [
      'It definitely rained',
      'It did not rain',
      'The ground might be wet from rain or another cause',
      'The premise is false'
    ],
    correctIndex: 2,
    explanation: 'Other causes (sprinklers, washing) could also make the ground wet, so rain is possible but not certain.',
    timeLimitSec: 45
  },
  {
    id: 'q-050',
    ageGroups: ['18-25', '26-40'],
    category: 'Logical Reasoning',
    difficulty: 3,
    question: 'Liam is taller than Noah. Noah is taller than Oliver. Who is the shortest among the three?',
    options: ['Liam', 'Noah', 'Oliver', 'They are equal height'],
    correctIndex: 2,
    explanation: 'Order from tallest to shortest: Liam > Noah > Oliver. Oliver is the shortest.',
    timeLimitSec: 45
  },
  {
    id: 'q-051',
    ageGroups: ['18-25', '26-40'],
    category: 'Spatial Reasoning',
    difficulty: 3,
    question: 'Two gears are in direct contact. If Gear A rotates Clockwise, in which direction does Gear B rotate?',
    options: ['Clockwise', 'Counter-Clockwise', 'It does not rotate', 'It alternates directions'],
    correctIndex: 1,
    explanation: 'Interlocking gears rotate in opposite directions. Gear B rotates Counter-Clockwise.',
    timeLimitSec: 40
  },
  {
    id: 'q-052',
    ageGroups: ['18-25', '26-40'],
    category: 'Spatial Reasoning',
    difficulty: 3,
    question: 'A 3x3x3 wooden cube is made of 27 smaller 1x1x1 unit cubes. How many unit cubes make up the outer surface layer?',
    options: ['18', '24', '26', '27'],
    correctIndex: 2,
    explanation: 'Only the single center cube is internal (27 - 1 = 26 outer cubes).',
    timeLimitSec: 45
  },
  {
    id: 'q-053',
    ageGroups: ['18-25', '26-40'],
    category: 'Spatial Reasoning',
    difficulty: 3,
    question: 'If a square paper is folded in half once from left to right, how many layers of paper are there?',
    options: ['1 layer', '2 layers', '3 layers', '4 layers'],
    correctIndex: 1,
    explanation: 'Folding a single sheet in half creates 2 layers.',
    timeLimitSec: 35
  },
  {
    id: 'q-054',
    ageGroups: ['18-25', '26-40'],
    category: 'Verbal Reasoning',
    difficulty: 2,
    question: 'AUTHOR is to BOOK as ARCHITECT is to:',
    options: ['BUILDING', 'PAINTING', 'SCULPTURE', 'SONG'],
    correctIndex: 0,
    explanation: 'An author designs and writes a book; an architect designs a building.',
    timeLimitSec: 35
  },
  {
    id: 'q-055',
    ageGroups: ['18-25', '26-40'],
    category: 'Verbal Reasoning',
    difficulty: 3,
    question: 'Which word is the opposite (antonym) of EXPAND?',
    options: ['CONTRACT', 'ENLARGE', 'EXTEND', 'SPREAD'],
    correctIndex: 0,
    explanation: 'Expand means to become larger; Contract means to become smaller or shrink.',
    timeLimitSec: 35
  },
  {
    id: 'q-056',
    ageGroups: ['18-25', '26-40'],
    category: 'Verbal Reasoning',
    difficulty: 3,
    question: 'Which word does NOT belong with the others?',
    options: ['TRIANGLE', 'SQUARE', 'HEXAGON', 'CYLINDER'],
    correctIndex: 3,
    explanation: 'Triangle, square, and hexagon are 2D polygons; Cylinder is a 3D solid.',
    timeLimitSec: 35
  },
  {
    id: 'q-057',
    ageGroups: ['18-25', '26-40'],
    category: 'Memory',
    difficulty: 2,
    question: 'Working memory recall: Memorize the sequence [ 8, 3, 7, 2, 5 ]. What was the 3rd number?',
    visualPayload: {
      type: 'memory-card',
      items: ['8', '3', '7', '2', '5'],
      memoryDisplaySec: 4
    },
    options: ['8', '3', '7', '2'],
    correctIndex: 2,
    explanation: 'The 3rd number in the sequence was 7.',
    timeLimitSec: 30
  },
  {
    id: 'q-058',
    ageGroups: ['18-25', '26-40'],
    category: 'Processing Speed',
    difficulty: 2,
    question: 'How many times does the letter "e" appear in the word: "EXCELLENCE"?',
    options: ['2', '3', '4', '5'],
    correctIndex: 2,
    explanation: 'E-x-c-E-l-l-E-n-c-E contains 4 "e" letters.',
    timeLimitSec: 25
  },
  {
    id: 'q-059',
    ageGroups: ['18-25', '26-40'],
    category: 'Processing Speed',
    difficulty: 2,
    question: 'Which equation is mathematically correct?',
    options: [
      '7 × 8 + 6 = 62',
      '9 × 7 - 5 = 56',
      '12 × 4 + 7 = 56',
      '15 × 3 - 8 = 36'
    ],
    correctIndex: 0,
    explanation: '7 × 8 + 6 = 56 + 6 = 62.',
    timeLimitSec: 25
  },
  {
    id: 'q-060',
    ageGroups: ['18-25', '26-40'],
    category: 'Pattern Recognition',
    difficulty: 3,
    question: 'What is the next number in this sequence: 10, 20, 35, 55, 80, ?',
    options: ['105', '110', '115', '120'],
    correctIndex: 1,
    explanation: 'The differences increase by 5 (+10, +15, +20, +25, +30): 80 + 30 = 110.',
    timeLimitSec: 40
  },
  {
    id: 'q-061',
    ageGroups: ['18-25', '26-40'],
    category: 'Numerical Reasoning',
    difficulty: 2,
    question: 'A trader buys an item for $60, sells it for $70, buys it back for $80, and sells it again for $90. What is his total net profit?',
    options: ['$10', '$20', '$30', '$0'],
    correctIndex: 1,
    explanation: 'First trade profit = $70 - $60 = $10. Second trade profit = $90 - $80 = $10. Total profit = $10 + $10 = $20.',
    timeLimitSec: 40
  },
  {
    id: 'q-062',
    ageGroups: ['18-25', '26-40'],
    category: 'Numerical Reasoning',
    difficulty: 3,
    question: 'If 3 shirts cost $45 in total, how much do 5 of the same shirts cost?',
    options: ['$60', '$70', '$75', '$80'],
    correctIndex: 2,
    explanation: '1 shirt costs $45 / 3 = $15. 5 shirts cost 5 × $15 = $75.',
    timeLimitSec: 40
  },
  {
    id: 'q-063',
    ageGroups: ['18-25', '26-40'],
    category: 'Logical Reasoning',
    difficulty: 3,
    question: 'If Monday is day 1, what day of the week is day 22?',
    options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'],
    correctIndex: 1,
    explanation: '22 mod 7 = 1, so day 22 falls on the same day as day 1 (Monday).',
    timeLimitSec: 40
  },
  {
    id: 'q-064',
    ageGroups: ['18-25', '26-40'],
    category: 'Spatial Reasoning',
    difficulty: 2,
    question: 'If you stand facing North and make a 180-degree turn, which direction are you now facing?',
    options: ['East', 'West', 'South', 'North-East'],
    correctIndex: 2,
    explanation: 'A 180-degree turn is a half turn, reversing direction to South.',
    timeLimitSec: 35
  },
  {
    id: 'q-065',
    ageGroups: ['18-25', '26-40'],
    category: 'Logical Reasoning',
    difficulty: 3,
    question: 'A fruit basket contains apples and oranges. If all 10 fruits except 4 are apples, how many oranges are there?',
    options: ['4', '6', '10', '14'],
    correctIndex: 0,
    explanation: '"All except 4 are apples" means exactly 4 fruits are not apples (meaning 4 are oranges).',
    timeLimitSec: 40
  },
  {
    id: 'q-066',
    ageGroups: ['18-25', '26-40'],
    category: 'Pattern Recognition',
    difficulty: 2,
    question: 'What is the next number: 100, 90, 80, 70, ?',
    options: ['50', '60', '65', '75'],
    correctIndex: 1,
    explanation: 'The sequence decreases by 10 each step: 70 - 10 = 60.',
    timeLimitSec: 35
  },
  {
    id: 'q-067',
    ageGroups: ['18-25', '26-40'],
    category: 'Numerical Reasoning',
    difficulty: 3,
    question: 'If 2x + 6 = 20, what is the value of x?',
    options: ['5', '6', '7', '8'],
    correctIndex: 2,
    explanation: '2x = 20 - 6 = 14 => x = 7.',
    timeLimitSec: 40
  },
  {
    id: 'q-068',
    ageGroups: ['18-25', '26-40'],
    category: 'Logical Reasoning',
    difficulty: 2,
    question: 'No reptiles have fur. All snakes are reptiles. Which conclusion is valid?',
    options: ['No snakes have fur', 'All snakes have fur', 'Some snakes have fur', 'All furred animals are snakes'],
    correctIndex: 0,
    explanation: 'Since all snakes belong to the class of reptiles, and no reptiles possess fur, no snakes have fur.',
    timeLimitSec: 40
  },
  {
    id: 'q-069',
    ageGroups: ['18-25', '26-40'],
    category: 'Spatial Reasoning',
    difficulty: 2,
    question: 'How many sides does a regular hexagon have?',
    options: ['5', '6', '7', '8'],
    correctIndex: 1,
    explanation: 'A hexagon has 6 sides and 6 angles.',
    timeLimitSec: 30
  },
  {
    id: 'q-070',
    ageGroups: ['18-25', '26-40'],
    category: 'Verbal Reasoning',
    difficulty: 2,
    question: 'OBLIVIOUS is to AWARE as TURBULENT is to:',
    options: ['CHAOTIC', 'CALM', 'VIOLENT', 'STORM'],
    correctIndex: 1,
    explanation: 'Oblivious and aware are antonyms; turbulent and calm are antonyms.',
    timeLimitSec: 35
  },
  {
    id: 'q-071',
    ageGroups: ['18-25', '26-40'],
    category: 'Memory',
    difficulty: 3,
    question: 'Recall this 5-word list: [ Planet, Comet, Nebula, Star, Moon ]. Which word was 3rd in order?',
    visualPayload: {
      type: 'memory-card',
      items: ['Planet', 'Comet', 'Nebula', 'Star', 'Moon'],
      memoryDisplaySec: 4
    },
    options: ['Planet', 'Comet', 'Nebula', 'Star'],
    correctIndex: 2,
    explanation: 'The 3rd word displayed was Nebula.',
    timeLimitSec: 30
  },
  {
    id: 'q-072',
    ageGroups: ['18-25', '26-40'],
    category: 'Processing Speed',
    difficulty: 2,
    question: 'Select the set that is in strictly ascending numerical order:',
    options: [
      '12, 24, 36, 48',
      '24, 12, 36, 48',
      '12, 36, 24, 48',
      '48, 36, 24, 12'
    ],
    correctIndex: 0,
    explanation: '12 < 24 < 36 < 48 is in strictly increasing order.',
    timeLimitSec: 25
  },
  {
    id: 'q-073',
    ageGroups: ['18-25', '26-40'],
    category: 'Pattern Recognition',
    difficulty: 3,
    question: 'What is the next number: 2, 4, 8, 16, 32, ?',
    options: ['48', '56', '64', '72'],
    correctIndex: 2,
    explanation: 'Each number is doubled (multiplied by 2): 32 × 2 = 64.',
    timeLimitSec: 40
  },
  {
    id: 'q-074',
    ageGroups: ['18-25', '26-40'],
    category: 'Numerical Reasoning',
    difficulty: 3,
    question: 'A fair coin is flipped twice. What is the probability of getting two heads (H, H)?',
    options: ['1/2 (50%)', '1/4 (25%)', '1/3 (33%)', '1/8 (12.5%)'],
    correctIndex: 1,
    explanation: 'The 4 equal outcomes are (H,H), (H,T), (T,H), (T,T). Probability of (H,H) = 1/4 = 25%.',
    timeLimitSec: 35
  },
  {
    id: 'q-075',
    ageGroups: ['18-25', '26-40'],
    category: 'Logical Reasoning',
    difficulty: 3,
    question: 'If all cats have tails, and Milo is a cat, what must be true?',
    options: ['Milo has a tail', 'Milo has no tail', 'All animals with tails are cats', 'Milo is black'],
    correctIndex: 0,
    explanation: 'Since Milo is a cat and all cats have tails, Milo definitely has a tail.',
    timeLimitSec: 40
  },

  // ================= 76 TO 100: 41-60 & 61+ COHORTS & MASTER COGNITIVE REASONING =================
  {
    id: 'q-076',
    ageGroups: ['41-60', '61+'],
    category: 'Pattern Recognition',
    difficulty: 2,
    question: 'Which letter completes the pattern in the alphabet matrix?',
    subtext: 'Row 1: [A, B, C] | Row 2: [D, E, F] | Row 3: [G, H, ?]',
    visualPayload: {
      type: 'matrix-3x3',
      matrixGrid: [
        ['A', 'B', 'C'],
        ['D', 'E', 'F'],
        ['G', 'H', '?']
      ]
    },
    options: ['I', 'J', 'K', 'L'],
    correctIndex: 0,
    explanation: 'The grid follows consecutive English alphabetical order: G, H, I.',
    timeLimitSec: 40
  },
  {
    id: 'q-077',
    ageGroups: ['41-60', '61+'],
    category: 'Pattern Recognition',
    difficulty: 3,
    question: 'Determine the missing number in the sequence: 5, 10, 20, 40, ?',
    options: ['60', '70', '80', '100'],
    correctIndex: 2,
    explanation: 'Each number is doubled: 40 × 2 = 80.',
    timeLimitSec: 40
  },
  {
    id: 'q-078',
    ageGroups: ['41-60', '61+'],
    category: 'Numerical Reasoning',
    difficulty: 2,
    question: 'If 4 workers build 4 tables in 4 hours, how many hours do 8 workers take to build 8 tables?',
    options: ['2 hours', '4 hours', '6 hours', '8 hours'],
    correctIndex: 1,
    explanation: '1 worker builds 1 table in 4 hours. Therefore, 8 workers working simultaneously build 8 tables in 4 hours.',
    timeLimitSec: 45
  },
  {
    id: 'q-079',
    ageGroups: ['41-60', '61+'],
    category: 'Numerical Reasoning',
    difficulty: 3,
    question: 'What is 50% of 80 plus 25% of 40?',
    options: ['45', '50', '55', '60'],
    correctIndex: 1,
    explanation: '50% of 80 = 40. 25% of 40 = 10. 40 + 10 = 50.',
    timeLimitSec: 40
  },
  {
    id: 'q-080',
    ageGroups: ['41-60', '61+'],
    category: 'Numerical Reasoning',
    difficulty: 3,
    question: 'The average of 3 numbers is 10. Two of the numbers are 8 and 12. What is the third number?',
    options: ['8', '10', '12', '14'],
    correctIndex: 1,
    explanation: 'Sum = 3 × 10 = 30. Third number = 30 - (8 + 12) = 30 - 20 = 10.',
    timeLimitSec: 40
  },
  {
    id: 'q-081',
    ageGroups: ['41-60', '61+'],
    category: 'Logical Reasoning',
    difficulty: 2,
    question: 'All squares are rectangles. Shape X is a square. What can we conclude?',
    options: [
      'Shape X is a rectangle',
      'Shape X is a triangle',
      'Shape X is not a rectangle',
      'All rectangles are squares'
    ],
    correctIndex: 0,
    explanation: 'Because all squares are rectangles, Shape X must be a rectangle.',
    timeLimitSec: 40
  },
  {
    id: 'q-082',
    ageGroups: ['41-60', '61+'],
    category: 'Logical Reasoning',
    difficulty: 2,
    question: 'A doctor gives you 3 pills and tells you to take one every 30 minutes. How many minutes will the pills last?',
    options: ['30 minutes', '60 minutes', '90 minutes', '120 minutes'],
    correctIndex: 1,
    explanation: 'Pill 1 at 0 min, Pill 2 at 30 min, Pill 3 at 60 min. Total duration = 60 minutes.',
    timeLimitSec: 35
  },
  {
    id: 'q-083',
    ageGroups: ['41-60', '61+'],
    category: 'Logical Reasoning',
    difficulty: 3,
    question: 'If today is Wednesday, what day of the week will it be in 10 days?',
    options: ['Friday', 'Saturday', 'Sunday', 'Monday'],
    correctIndex: 1,
    explanation: 'In 7 days it will be Wednesday again. Adding 3 more days gives Saturday.',
    timeLimitSec: 40
  },
  {
    id: 'q-084',
    ageGroups: ['41-60', '61+'],
    category: 'Spatial Reasoning',
    difficulty: 2,
    question: 'If you look at the word "MOM" in a vertical mirror placed to the right, how does it appear?',
    options: ['MOM', 'WOW', 'MOO', 'W-O-W'],
    correctIndex: 0,
    explanation: 'The letters M and O possess vertical line symmetry and "MOM" is palindromic, so its reflection remains "MOM".',
    timeLimitSec: 35
  },
  {
    id: 'q-085',
    ageGroups: ['41-60', '61+'],
    category: 'Spatial Reasoning',
    difficulty: 3,
    question: 'How many small cubes are needed to build a solid 2x2x2 cube?',
    options: ['4', '6', '8', '12'],
    correctIndex: 2,
    explanation: 'A 2x2x2 cube consists of 2 × 2 × 2 = 8 unit cubes.',
    timeLimitSec: 35
  },
  {
    id: 'q-086',
    ageGroups: ['41-60', '61+'],
    category: 'Verbal Reasoning',
    difficulty: 2,
    question: 'HUNGRY is to EAT as THIRSTY is to:',
    options: ['DRINK', 'SLEEP', 'RUN', 'COOK'],
    correctIndex: 0,
    explanation: 'Hunger is satisfied by eating; thirst is satisfied by drinking.',
    timeLimitSec: 30
  },
  {
    id: 'q-087',
    ageGroups: ['41-60', '61+'],
    category: 'Verbal Reasoning',
    difficulty: 3,
    question: 'Which word is the opposite of COURAGEOUS?',
    options: ['BRAVE', 'TIMID', 'STRONG', 'HONEST'],
    correctIndex: 1,
    explanation: 'Courageous means brave; Timid means showing fear or hesitation (cowardly/fearful).',
    timeLimitSec: 30
  },
  {
    id: 'q-088',
    ageGroups: ['41-60', '61+'],
    category: 'Verbal Reasoning',
    difficulty: 3,
    question: 'CHILLY is to COLD as WARM is to:',
    options: ['HOT', 'FREEZING', 'COOL', 'WET'],
    correctIndex: 0,
    explanation: 'Chilly is mild cold; Warm is mild hot.',
    timeLimitSec: 30
  },
  {
    id: 'q-089',
    ageGroups: ['41-60', '61+'],
    category: 'Memory',
    difficulty: 2,
    question: 'Serial Position recall: Recall the sequence [Blue, Gold, Silver, Bronze, Amber]. Which color was placed 4th?',
    visualPayload: {
      type: 'memory-card',
      items: ['Blue', 'Gold', 'Silver', 'Bronze', 'Amber'],
      memoryDisplaySec: 4
    },
    options: ['Gold', 'Silver', 'Bronze', 'Amber'],
    correctIndex: 2,
    explanation: 'The 4th item in the sequence is Bronze.',
    timeLimitSec: 30
  },
  {
    id: 'q-090',
    ageGroups: ['41-60', '61+'],
    category: 'Memory',
    difficulty: 3,
    question: 'Memorize the word pairs: [ Sun - Ocean, Tree - Mountain, Star - River ]. What was paired with Tree?',
    visualPayload: {
      type: 'memory-card',
      items: ['Sun - Ocean', 'Tree - Mountain', 'Star - River'],
      memoryDisplaySec: 4
    },
    options: ['Ocean', 'Mountain', 'River', 'Forest'],
    correctIndex: 1,
    explanation: 'Tree was paired with Mountain.',
    timeLimitSec: 30
  },
  {
    id: 'q-091',
    ageGroups: ['41-60', '61+'],
    category: 'Processing Speed',
    difficulty: 2,
    question: 'Identify the exact match for the code: #7B49-XZ8',
    options: ['#7B49-XZ8', '#7B49-XZ3', '#7B48-XZ8', '#7849-XZ8'],
    correctIndex: 0,
    explanation: '#7B49-XZ8 matches all characters identically.',
    timeLimitSec: 20
  },
  {
    id: 'q-092',
    ageGroups: ['41-60', '61+'],
    category: 'Processing Speed',
    difficulty: 2,
    question: 'Quick comparison: Which value is the greatest?',
    options: ['0.75 (3/4)', '0.50 (1/2)', '0.90 (9/10)', '0.65 (13/20)'],
    correctIndex: 2,
    explanation: '0.90 is the largest value.',
    timeLimitSec: 25
  },
  {
    id: 'q-093',
    ageGroups: ['41-60', '61+'],
    category: 'Pattern Recognition',
    difficulty: 3,
    question: 'What is the next number: 1, 3, 5, 7, 9, ?',
    options: ['10', '11', '12', '13'],
    correctIndex: 1,
    explanation: 'Consecutive odd numbers increasing by 2: 9 + 2 = 11.',
    timeLimitSec: 35
  },
  {
    id: 'q-094',
    ageGroups: ['41-60', '61+'],
    category: 'Numerical Reasoning',
    difficulty: 3,
    question: 'If a car travels at 60 mph for 1 hour and 30 minutes, how far does it travel?',
    options: ['75 miles', '80 miles', '90 miles', '100 miles'],
    correctIndex: 2,
    explanation: 'Distance = Speed × Time = 60 mph × 1.5 hours = 90 miles.',
    timeLimitSec: 40
  },
  {
    id: 'q-095',
    ageGroups: ['41-60', '61+'],
    category: 'Logical Reasoning',
    difficulty: 2,
    question: 'All birds lay eggs. A robin is a bird. Does a robin lay eggs?',
    options: ['Yes, definitely', 'No, never', 'Only in winter', 'Cannot be determined'],
    correctIndex: 0,
    explanation: 'Since all birds lay eggs and a robin is a bird, a robin definitely lays eggs.',
    timeLimitSec: 35
  },
  {
    id: 'q-096',
    ageGroups: ['41-60', '61+'],
    category: 'Spatial Reasoning',
    difficulty: 3,
    question: 'If a rectangular garden is 10 meters long and 5 meters wide, what is its perimeter (distance around the outside)?',
    options: ['25 meters', '30 meters', '50 meters', '60 meters'],
    correctIndex: 1,
    explanation: 'Perimeter = 2 × (Length + Width) = 2 × (10 + 5) = 30 meters.',
    timeLimitSec: 40
  },
  {
    id: 'q-097',
    ageGroups: ['41-60', '61+'],
    category: 'Verbal Reasoning',
    difficulty: 2,
    question: 'GENEROUS is to GIVING as STINGY is to:',
    options: ['SELFISH', 'KIND', 'HAPPY', 'TIRED'],
    correctIndex: 0,
    explanation: 'Generous means giving; Stingy means ungenerous or selfish.',
    timeLimitSec: 30
  },
  {
    id: 'q-098',
    ageGroups: ['41-60', '61+'],
    category: 'Memory',
    difficulty: 2,
    question: 'Working memory recall: Look at the list [ 4, 8, 2, 7, 5 ]. Which number was last?',
    visualPayload: {
      type: 'memory-card',
      items: ['4', '8', '2', '7', '5'],
      memoryDisplaySec: 4
    },
    options: ['4', '8', '2', '5'],
    correctIndex: 3,
    explanation: 'The last number in the list was 5.',
    timeLimitSec: 25
  },
  {
    id: 'q-099',
    ageGroups: ['41-60', '61+'],
    category: 'Processing Speed',
    difficulty: 2,
    question: 'Find the even number among the choices:',
    options: ['17', '29', '34', '51'],
    correctIndex: 2,
    explanation: '34 is divisible by 2 and is the only even number.',
    timeLimitSec: 20
  },
  {
    id: 'q-100',
    ageGroups: ['41-60', '61+'],
    category: 'Pattern Recognition',
    difficulty: 3,
    question: 'What number completes the sequence: 5, 10, 15, 20, 25, ?',
    options: ['28', '30', '32', '35'],
    correctIndex: 1,
    explanation: 'Counting by 5s: 25 + 5 = 30.',
    timeLimitSec: 35
  }
];

export const DAILY_CHALLENGES: DailyChallengeItem[] = [
  {
    id: 'daily-1',
    dateKey: '2026-08-18',
    category: 'Pattern Recognition',
    difficulty: 4,
    title: 'The Triangular Matrix Enigma',
    question: 'In a triangle of numbers, the numbers in each corner are 3, 4, and 5. The number in the center is 60. In a second triangle with corners 2, 7, and 9, what number should be in the center?',
    options: ['112', '126', '144', '156'],
    correctIndex: 1,
    explanation: 'The center number is the product of the three corner numbers: 3 × 4 × 5 = 60. For the second triangle: 2 × 7 × 9 = 126.'
  },
  {
    id: 'daily-2',
    dateKey: '2026-08-19',
    category: 'Logical Reasoning',
    difficulty: 4,
    title: 'The Truth Teller & The Liar',
    question: 'Knight always tells the truth; Knave always lies. Person A says: "At least one of us is a Knave." What is Person A?',
    options: [
      'Person A is a Knight',
      'Person A is a Knave',
      'Person A could be either',
      'The statement is a paradox'
    ],
    correctIndex: 0,
    explanation: 'If A were a Knave, the statement "At least one is a Knave" would be true, which is a contradiction. Therefore A is a Knight telling the truth.'
  },
  {
    id: 'daily-3',
    dateKey: '2026-08-20',
    category: 'Spatial Reasoning',
    difficulty: 3,
    title: 'Gear Transmission Rotation',
    question: 'A gear system has 5 intermeshing gears arranged in a straight line (Gear 1 meshes with Gear 2, Gear 2 with Gear 3, and so on). If Gear 1 rotates Clockwise, in which direction does Gear 5 rotate?',
    options: ['Clockwise', 'Counter-Clockwise', 'Stationary', 'Oscillating'],
    correctIndex: 0,
    explanation: 'Each gear reverses rotation direction: 1=CW, 2=CCW, 3=CW, 4=CCW, 5=CW.'
  }
];
