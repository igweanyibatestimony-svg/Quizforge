import { CONFIG } from '../config/config.js';

function readStorage(key, fallback = null) {
    try {
        const value = localStorage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return JSON.parse(value);
    } catch (error) {
        console.error(`[QuizForge] Failed to read storage key "${key}":`, error);
        return fallback;
    }
}

function writeStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.error(`[QuizForge] Failed to write storage key "${key}":`, error);
        return false;
    }
}

function removeStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error(`[QuizForge] Failed to remove storage key "${key}":`, error);
        return false;
    }
}


/**
 * Save the active quiz so page navigation/reloads do not destroy it.
 */
export function saveActiveQuizState(state = {}) {
    return writeStorage(CONFIG.storageKeys.state, {
        ...state,
        questions: Array.isArray(state.questions) ? state.questions : [],
        userAnswers: Array.isArray(state.userAnswers) ? state.userAnswers : [],
    });
}

/**
 * Restore an active quiz from local storage.
 */
export function getActiveQuizState() {
    const saved = readStorage(CONFIG.storageKeys.state, null);
    return saved && Array.isArray(saved.questions) && saved.questions.length
        ? saved
        : null;
}

/**
 * Remove the active quiz after it is completed or abandoned.
 */
export function clearActiveQuizState() {
    return removeStorage(CONFIG.storageKeys.state);
}

/**
 * Save the most recent quiz result.
 */
export function saveLastResult(result) {
    return writeStorage(CONFIG.storageKeys.lastResult, result);
}

/**
 * Get the most recent quiz result.
 */
export function getLastResult() {
    return readStorage(CONFIG.storageKeys.lastResult, null);
}

/**
 * Clear the most recent quiz result.
 */
export function clearLastResult() {
    return removeStorage(CONFIG.storageKeys.lastResult);
}

/**
 * Get saved high scores.
 */
export function getHighScores() {
    const scores = readStorage(CONFIG.storageKeys.highScores, []);

    return Array.isArray(scores) ? scores : [];
}

/**
 * Add a new high score.
 */
export function addHighScore(scoreEntry) {
    const scores = getHighScores();

    scores.push({
        ...scoreEntry,
        score: Number(scoreEntry?.score) || 0,
        date: scoreEntry?.date || new Date().toISOString(),
    });

    scores.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }

        return new Date(a.date) - new Date(b.date);
    });

    const maxEntries = Number(CONFIG.highScores.maxEntries) || 10;
    const limitedScores = scores.slice(0, maxEntries);

    writeStorage(CONFIG.storageKeys.highScores, limitedScores);

    return limitedScores;
}

/**
 * Remove all saved high scores.
 */
export function clearHighScores() {
    return removeStorage(CONFIG.storageKeys.highScores);
}

/**
 * Save quiz preferences.
 */
export function savePreferences(preferences = {}) {
    const current = getPreferences();

    return writeStorage(CONFIG.storageKeys.preferences, {
        ...current,
        ...preferences,
    });
}

/**
 * Get saved quiz preferences.
 */
export function getPreferences() {
    return readStorage(CONFIG.storageKeys.preferences, null);
}

/**
 * Clear saved preferences.
 */
export function clearPreferences() {
    return removeStorage(CONFIG.storageKeys.preferences);
}

/**
 * Clear all QuizForge local data.
 */
export function clearAllStorage() {
    return [
        clearLastResult(),
        clearHighScores(),
        clearPreferences(),
    ].every(Boolean);
}
