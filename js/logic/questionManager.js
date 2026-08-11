import { getState, setQuestions, advanceQuestion } from '../state/quizState.js';
import { shuffle } from './shuffle.js';

export function initializeQuestions(questions = []) {
    const valid = Array.isArray(questions) ? questions.filter(Boolean) : [];
    setQuestions(shuffle(valid));
    return getState().questions;
}

export function getQuestion(index = getState().currentQuestion) {
    const questions = getState().questions || [];
    return index >= 0 && index < questions.length ? questions[index] : null;
}

export function getCurrentQuestion() {
    return getQuestion();
}

export function getQuestionCount() {
    return getState().questions.length;
}

export function hasNextQuestion() {
    const state = getState();
    return state.currentQuestion < state.questions.length - 1;
}

export function moveToNextQuestion() {
    return advanceQuestion();
}

export function getQuestionNumber() {
    return getState().currentQuestion + 1;
}

export function resetQuestions() {
    setQuestions([]);
}

export function findQuestionById(id) {
    return (getState().questions || []).find(q => String(q.id) === String(id)) || null;
}
