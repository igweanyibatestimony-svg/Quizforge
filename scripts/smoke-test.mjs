import assert from 'node:assert/strict';
import { getFallbackQuestions, getFallbackAvailability } from '../js/data/fallbackQuestions.js';
import { getAccuracy, getGrade, calculateQuestionScore } from '../js/logic/scoreManager.js';
import { isValidQuestion } from '../js/utils/validators.js';

const difficulties = ['easy', 'medium', 'hard'];
const categories = ['9', '17', '18', '21', '22', '23', '24', '27', '31'];

for (const difficulty of difficulties) {
  const questions = getFallbackQuestions(20, difficulty, 'any');
  assert.ok(questions.length > 0);
  assert.ok(questions.every(q => q.difficulty === difficulty));
  assert.ok(questions.every(q => q.options.includes(q.correctAnswer)));
  assert.ok(questions.every(q => new Set(q.options).size === q.options.length));
}

for (const category of categories) {
  const questions = getFallbackQuestions(20, 'any', category);
  assert.ok(questions.length > 0, `No fallback questions for category ${category}`);
  assert.ok(questions.every(q => q.category), `Invalid category ${category}`);
}

const animeHard = getFallbackQuestions(20, 'hard', '31');
assert.ok(animeHard.every(q => q.category === 'Anime & Manga'));
assert.ok(animeHard.every(q => q.difficulty === 'hard'));

const exact = getFallbackAvailability('hard', '31');
assert.equal(exact, animeHard.length);

assert.equal(getAccuracy(7, 10), 70);
assert.equal(getGrade(90), 'A');
assert.equal(calculateQuestionScore({ correct: true, timeRemaining: 30, streak: 1 }), 130);

assert.equal(
  isValidQuestion({
    question: 'Valid?',
    options: ['Yes', 'No', 'Maybe'],
    correctAnswer: 'Yes',
  }),
  true,
);
assert.equal(
  isValidQuestion({
    question: 'Broken?',
    options: ['A', 'B', 'B'],
    correctAnswer: 'A',
  }),
  false,
);
assert.equal(
  isValidQuestion({
    question: 'Missing correct answer?',
    options: ['A', 'B'],
    correctAnswer: 'C',
  }),
  false,
);

console.log('PASS fallback filtering, answer uniqueness, scoring, and grade smoke tests.');
