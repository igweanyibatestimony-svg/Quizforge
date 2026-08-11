import { CONFIG } from '../config/config.js';

export function calculateQuestionScore({ correct = false, timeRemaining = 0, streak = 0 } = {}) {
    if (!correct) return 0;
    const base = Number(CONFIG.scoring.basePoints) || 100;
    const streakBonus = Number(CONFIG.scoring.streakBonus) || 0;
    const timeBonus = Math.max(0, Number(timeRemaining) || 0);
    return base + ((Math.max(1, Number(streak) || 1) - 1) * streakBonus) + timeBonus;
}

export function calculateTotalScore(answers = []) {
    return Array.isArray(answers)
        ? answers.reduce((sum, answer) => sum + (Number(answer?.points) || 0), 0)
        : 0;
}

export function getAccuracy(correctAnswers = 0, totalQuestions = 0) {
    const total = Number(totalQuestions) || 0;
    return total ? Math.round((Number(correctAnswers) / total) * 100) : 0;
}

export function getGrade(accuracy = 0) {
    const value = Number(accuracy) || 0;
    if (value >= 90) return 'A';
    if (value >= 80) return 'B';
    if (value >= 70) return 'C';
    if (value >= 60) return 'D';
    return 'F';
}

export function buildScoreEntry({ score = 0, correctAnswers = 0, totalQuestions = 0, category = 'Any', difficulty = 'Mixed' } = {}) {
    const accuracy = getAccuracy(correctAnswers, totalQuestions);
    return {
        score: Number(score) || 0,
        correctAnswers: Number(correctAnswers) || 0,
        totalQuestions: Number(totalQuestions) || 0,
        accuracy,
        grade: getGrade(accuracy),
        category,
        difficulty,
        date: new Date().toISOString(),
    };
}

export function getPerformanceMessage(accuracy = 0) {
    const value = Number(accuracy) || 0;
    if (value >= 90) return 'Excellent performance. You forged a monster score!';
    if (value >= 75) return 'Great job — that was a strong run.';
    if (value >= 60) return 'Good effort. One more run can push it higher.';
    if (value >= 40) return 'You’re getting there. Keep forging.';
    return 'Keep learning, keep playing, and come back stronger.';
}
