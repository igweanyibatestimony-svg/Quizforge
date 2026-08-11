import { getState, updateState, resetState } from './state/quizState.js';
import { loadQuestions } from './logic/quizEngine.js';
import { getLastResult, getHighScores, clearHighScores, getPreferences, savePreferences, saveActiveQuizState, getActiveQuizState } from './storage/localStorage.js';
import { renderResults } from './ui/resultRenderer.js';
import { renderReview } from './ui/reviewRenderer.js';
import { renderScores } from './ui/scoreRenderer.js';
import { getById } from './utils/dom.js';
import { setupQuizEventListeners, renderCurrentQuestion, initTimerDisplay, startQuestionTimer } from './events/eventHandlers.js';

const path = window.location.pathname.toLowerCase();

async function init() {
    if (path.endsWith('/') || path.endsWith('/index.html') || path.endsWith('quizforge')) return initHomePage();
    if (path.endsWith('/quiz.html')) return initQuizPage();
    if (path.endsWith('/results.html')) return initResultsPage();
    if (path.endsWith('/review.html')) return initReviewPage();
    if (path.endsWith('/scores.html')) return initScoresPage();
}

function initHomePage() {
    const form = getById('quizSetupForm');
    if (!form) return;

    const preferences = getPreferences() || {};
    if (preferences.difficulty) getById('difficulty').value = preferences.difficulty;
    if (preferences.category) getById('category').value = String(preferences.category);
    if (preferences.questionCount) getById('questionCount').value = String(preferences.questionCount);

    form.addEventListener('submit', async event => {
        event.preventDefault();

        const difficulty = getById('difficulty')?.value || 'medium';
        const category = getById('category')?.value || 'any';
        const questionCount = Number(getById('questionCount')?.value) || 10;

        savePreferences({ difficulty, category, questionCount });
        resetState();
        updateState({ difficulty, category, questionCount });

        const loading = getById('homeLoading');
        const error = getById('homeError');
        loading?.classList.remove('hidden');
        error?.classList.add('hidden');

        try {
            const questions = await loadQuestions(difficulty, category, questionCount);
            if (!questions.length) throw new Error('No questions matched this selection.');
            saveActiveQuizState(getState());
            window.location.href = 'pages/quiz.html';
        } catch (err) {
            console.error(err);
            loading?.classList.add('hidden');
            if (error) {
                error.textContent = 'Could not prepare a quiz. Please try again.';
                error.classList.remove('hidden');
            }
        }
    });
}

async function initQuizPage() {
    let state = getState();

    // A full page navigation creates a new JS runtime. Restore the quiz
    // that was prepared on the home page before trying the network again.
    if (!state.questions.length) {
        const saved = getActiveQuizState();

        if (saved?.questions?.length) {
            updateState(saved);
            state = getState();
        }
    }

    // Direct visits to /pages/quiz.html still work: build a fresh quiz.
    if (!state.questions.length) {
        const preferences = getPreferences() || {};
        const difficulty = preferences.difficulty || state.difficulty || 'medium';
        const category = preferences.category || state.category || 'any';
        const questionCount = Number(
            preferences.questionCount || state.questionCount || 10
        );

        try {
            await loadQuestions(difficulty, category, questionCount);
            saveActiveQuizState(getState());
            state = getState();
        } catch (error) {
            console.error('[QuizForge] Unable to initialize quiz:', error);
            const loading = getById('quizLoading');
            const errorEl = getById('quizError');
            loading?.classList.add('hidden');
            if (errorEl) {
                errorEl.textContent =
                    error?.message || 'Could not prepare this quiz. Return home and try again.';
                errorEl.classList.remove('hidden');
            }
            return;
        }
    }

    getById('quizLoading')?.classList.add('hidden');
    getById('quizContent')?.classList.remove('hidden');

    if (state.error) {
        const errorEl = getById('quizError');
        if (errorEl) {
            errorEl.textContent = state.error;
            errorEl.classList.remove('hidden');
        }
    }

    initTimerDisplay();
    setupQuizEventListeners();
    renderCurrentQuestion();
    startQuestionTimer();
}

function initResultsPage() {
    renderResults(getLastResult() || {});
}

function initReviewPage() {
    renderReview(getLastResult() || {});
}

function initScoresPage() {
    const container = getById('scoresContainer');
    const clearBtn = getById('clearScoresBtn');
    const scores = getHighScores();

    renderScores(scores);

    if (clearBtn && scores.length) {
        clearBtn.classList.remove('hidden');
        clearBtn.addEventListener('click', () => {
            clearHighScores();
            renderScores([]);
            clearBtn.classList.add('hidden');
        });
    }
}

init().catch(error => console.error('[QuizForge] Initialization error:', error));
