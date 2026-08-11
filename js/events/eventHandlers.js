import { getState, getCurrentQuestion, updateState } from '../state/quizState.js';
import { selectAnswer, nextQuestion, handleTimeout, getResults } from '../logic/quizEngine.js';
import { startTimer, clearTimer } from '../timers/quizTimer.js';
import { saveLastResult, addHighScore, saveActiveQuizState, clearActiveQuizState } from '../storage/localStorage.js';
import { renderProgress } from '../ui/progressRenderer.js';
import { getById } from '../utils/dom.js';
import { CONFIG } from '../config/config.js';
import { getAccuracy } from '../logic/scoreManager.js';

function updateTimerUI(remaining) {
    updateState({ timeRemaining: remaining });

    const container = getById('timerContainer');
    const value = container?.querySelector('.timer-value');
    const bar = container?.querySelector('.timer-bar-fill');

    if (value) value.textContent = String(remaining);
    if (bar) bar.style.width = `${Math.max(0, Math.min(100, (remaining / CONFIG.timePerQuestion) * 100))}%`;

    container?.classList.toggle('warning', remaining <= 10 && remaining > 5);
    container?.classList.toggle('danger', remaining <= 5);
}

export function setupQuizEventListeners() {
    getById('optionsContainer')?.addEventListener('click', handleOptionClick);
    getById('nextQuestionBtn')?.addEventListener('click', handleNextClick);
    getById('quitQuizBtn')?.addEventListener('click', handleQuit);
}

function handleQuit(event) {
    event.preventDefault();
    clearTimer();
    clearActiveQuizState();
    window.location.href = '../index.html';
}

function handleOptionClick(event) {
    const button = event.target.closest('.option-btn');
    if (!button || getState().answeredCurrentQuestion || button.disabled) return;

    const selectedAnswer = button.dataset.answer;
    if (!selectedAnswer) return;

    const result = selectAnswer(selectedAnswer);
    if (result.alreadyAnswered) return;

    clearTimer();
    highlightOptions(result.correctAnswer, selectedAnswer);
    showFeedback(result.correct);
    saveActiveQuizState(getState());
    getById('nextQuestionBtn')?.classList.remove('hidden');
}

function highlightOptions(correctAnswer, selectedAnswer) {
    document.querySelectorAll('.option-btn').forEach(button => {
        button.disabled = true;
        button.classList.add('option-btn--disabled');

        if (button.dataset.answer === correctAnswer) {
            button.classList.add('option-btn--correct');
        } else if (button.dataset.answer === selectedAnswer) {
            button.classList.add('option-btn--incorrect');
        }
    });
}

function showFeedback(correct) {
    const feedback = getById('quizFeedback');
    if (!feedback) return;

    feedback.className = `feedback ${correct ? 'correct' : 'incorrect'}`;
    feedback.textContent = correct
        ? '✓ Correct! Nice one.'
        : '✗ Not quite. The correct answer is highlighted.';
}

function resetQuestionUI() {
    const feedback = getById('quizFeedback');
    const next = getById('nextQuestionBtn');

    if (feedback) {
        feedback.className = 'feedback hidden';
        feedback.textContent = '';
    }
    next?.classList.add('hidden');
}

export function renderCurrentQuestion() {
    const question = getCurrentQuestion();
    const questionContainer = getById('questionContainer');
    const optionsContainer = getById('optionsContainer');

    if (!question || !questionContainer || !optionsContainer) return;

    questionContainer.innerHTML = `
        <div class="question-label">QUESTION ${getState().currentQuestion + 1}</div>
        <h1 class="question-text"></h1>
        <p class="question-category"></p>
    `;

    questionContainer.querySelector('.question-text').textContent = question.question || question.text || '';
    questionContainer.querySelector('.question-category').textContent =
        question.category ? `${question.category} • ${question.difficulty}` : '';

    optionsContainer.replaceChildren();

    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const options = question.options || question.answers || [];

    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'option-btn';
        button.dataset.answer = String(option);
        button.innerHTML = `<span class="option-letter">${letters[index] || index + 1}</span><span class="option-text"></span>`;
        button.querySelector('.option-text').textContent = String(option);
        optionsContainer.appendChild(button);
    });

    renderProgress(getState().currentQuestion, getState().questions.length);
}

export function startQuestionTimer() {
    startTimer(updateTimerUI, () => {
        const result = handleTimeout();
        saveActiveQuizState(getState());
        revealCorrectAnswer(result.correctAnswer);
        showTimeoutFeedback();
        getById('nextQuestionBtn')?.classList.remove('hidden');
    });
}

function revealCorrectAnswer(correctAnswer) {
    document.querySelectorAll('.option-btn').forEach(button => {
        button.disabled = true;
        button.classList.add('option-btn--disabled');
        if (button.dataset.answer === correctAnswer) {
            button.classList.add('option-btn--reveal-correct');
        }
    });
}

function showTimeoutFeedback() {
    const feedback = getById('quizFeedback');
    if (!feedback) return;
    feedback.className = 'feedback timeout';
    feedback.textContent = "⏰ Time's up! The correct answer is highlighted.";
}

function handleNextClick() {
    const moved = nextQuestion();
    const state = getState();

    if (!moved || state.completed) {
        finishQuiz();
        return;
    }

    resetQuestionUI();
    saveActiveQuizState(getState());
    renderCurrentQuestion();
    startQuestionTimer();
}

function finishQuiz() {
    clearTimer();
    const results = getResults();
    const accuracy = getAccuracy(results.correctAnswers, results.totalQuestions);

    const payload = {
        ...results,
        accuracy,
        grade: accuracy >= 90 ? 'A' : accuracy >= 80 ? 'B' : accuracy >= 70 ? 'C' : accuracy >= 60 ? 'D' : 'F',
        date: new Date().toISOString(),
    };

    saveLastResult(payload);
    addHighScore(payload);
    clearActiveQuizState();
    window.location.href = 'results.html';
}

export function initTimerDisplay() {
    const container = getById('timerContainer');
    if (!container) return;

    const seconds = Number(CONFIG.timePerQuestion) || 30;
    container.innerHTML = `
        <span class="timer-icon" aria-hidden="true">⏱</span>
        <span class="timer-value" aria-live="polite">${seconds}</span>
        <div class="timer-bar" aria-hidden="true"><div class="timer-bar-fill"></div></div>
    `;
}

export function cleanupQuiz() {
    clearTimer();
}
