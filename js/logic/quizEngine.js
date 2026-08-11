import {
    getState,
    updateState,
    setQuestions,
    advanceQuestion,
} from '../state/quizState.js';
import { fetchQuestions } from '../api/quizApi.js';
import { validateQuestions } from '../utils/validators.js';
import { shuffle } from './shuffle.js';
import { isCorrectAnswer } from './answerValidator.js';
import { calculateQuestionScore } from './scoreManager.js';
import { getFallbackQuestions } from '../data/fallbackQuestions.js';

export async function loadQuestions(difficulty = 'medium', category = 'any', questionCount = 10) {
    const safeCount = Math.max(1, Math.min(20, Number(questionCount) || 10));
    updateState({ loading: true, error: null, difficulty, category, questionCount: safeCount });

    try {
        const questions = validateQuestions(
            await fetchQuestions(safeCount, difficulty, category)
        );

        if (!questions.length) throw new Error('Question validation failed.');

        setQuestions(questions.slice(0, safeCount));
        updateState({ loading: false, error: null, difficulty, category, questionCount: safeCount });
        return getState().questions;
    } catch (error) {
        console.warn('[QuizForge] API unavailable; using offline question bank.', error);

        const fallback = getFallbackQuestions(safeCount, difficulty, category);

        if (!fallback.length) {
            updateState({
                loading: false,
                error: 'No offline questions are available for this category and difficulty. Reconnect to the question API or choose another selection.',
            });
            throw new Error('No offline questions match the selected filters.');
        }

        const actualCount = fallback.length;
        const shortage = actualCount < safeCount
            ? ` Offline mode has ${actualCount} matching question${actualCount === 1 ? '' : 's'} for this selection, so the quiz was shortened from ${safeCount}.`
            : '';

        setQuestions(shuffle(fallback));
        updateState({
            loading: false,
            error: `Offline mode: using QuizForge’s built-in question bank.${shortage}`,
            difficulty,
            category,
            questionCount: actualCount,
        });
        return getState().questions;
    }
}

export function selectAnswer(selectedAnswer) {
    const state = getState();

    if (state.answeredCurrentQuestion) {
        return { alreadyAnswered: true };
    }

    const question = state.questions[state.currentQuestion];
    if (!question) return { alreadyAnswered: false, correct: false, correctAnswer: null };

    const correctAnswer = question.correctAnswer ?? question.answer ?? '';
    const correct = isCorrectAnswer(question, selectedAnswer);
    const userAnswers = [...state.userAnswers];
    userAnswers[state.currentQuestion] = selectedAnswer;

    if (correct) {
        const newStreak = (Number(state.currentStreak) || 0) + 1;
        const points = calculateQuestionScore({
            correct: true,
            timeRemaining: state.timeRemaining,
            streak: newStreak,
        });

        updateState({
            userAnswers,
            answeredCurrentQuestion: true,
            score: (Number(state.score) || 0) + points,
            correctAnswers: (Number(state.correctAnswers) || 0) + 1,
            currentStreak: newStreak,
            maxStreak: Math.max(Number(state.maxStreak) || 0, newStreak),
        });
    } else {
        updateState({
            userAnswers,
            answeredCurrentQuestion: true,
            incorrectAnswers: (Number(state.incorrectAnswers) || 0) + 1,
            currentStreak: 0,
        });
    }

    return { alreadyAnswered: false, correct, correctAnswer, selectedAnswer };
}

export function nextQuestion() {
    const state = getState();
    if (!state.answeredCurrentQuestion) return false;
    return advanceQuestion();
}

export function handleTimeout() {
    const state = getState();

    if (state.answeredCurrentQuestion) return { alreadyAnswered: true };

    const question = state.questions[state.currentQuestion];
    if (!question) return { alreadyAnswered: false, correctAnswer: null };

    const userAnswers = [...state.userAnswers];
    userAnswers[state.currentQuestion] = null;

    updateState({
        userAnswers,
        answeredCurrentQuestion: true,
        incorrectAnswers: (Number(state.incorrectAnswers) || 0) + 1,
        currentStreak: 0,
        timeRemaining: 0,
    });

    return {
        alreadyAnswered: false,
        correctAnswer: question.correctAnswer ?? question.answer ?? null,
    };
}

export function getResults() {
    const state = getState();

    return {
        questions: state.questions,
        userAnswers: state.userAnswers,
        score: Number(state.score) || 0,
        correctAnswers: Number(state.correctAnswers) || 0,
        incorrectAnswers: Number(state.incorrectAnswers) || 0,
        totalQuestions: state.questions.length,
        maxStreak: Number(state.maxStreak) || 0,
        difficulty: state.difficulty,
        category: state.category,
    };
}
