import { CONFIG } from '../config/config.js';

const initialState = {
    questions: [],
    currentQuestion: 0,
    score: 0,
    currentStreak: 0,
    maxStreak: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    userAnswers: [],
    answeredCurrentQuestion: false,
    completed: false,
    loading: false,
    error: null,
    difficulty: 'medium',
    category: 'any',
    questionCount: 10,
    timeRemaining: CONFIG.timePerQuestion,
};

let state = createInitialState();

function createInitialState() {
    return { ...initialState, questions: [], userAnswers: [] };
}

export function getState() {
    return state;
}

export function updateState(updates = {}) {
    state = { ...state, ...updates };
    return state;
}

export function resetState() {
    state = createInitialState();
    return state;
}

export function getCurrentQuestion() {
    return state.questions[state.currentQuestion] || null;
}

export function setQuestions(questions = []) {
    state = {
        ...state,
        questions: Array.isArray(questions) ? questions : [],
        currentQuestion: 0,
        userAnswers: [],
        score: 0,
        currentStreak: 0,
        maxStreak: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        answeredCurrentQuestion: false,
        completed: false,
        error: null,
        timeRemaining: CONFIG.timePerQuestion,
    };
    return state.questions;
}

export function advanceQuestion() {
    if (state.currentQuestion < state.questions.length - 1) {
        state.currentQuestion += 1;
        state.answeredCurrentQuestion = false;
        state.timeRemaining = CONFIG.timePerQuestion;
        return true;
    }

    state.completed = true;
    return false;
}
