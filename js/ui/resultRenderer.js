import { getById, createElement } from '../utils/dom.js';
import { getGrade, getPerformanceMessage, getAccuracy } from '../logic/scoreManager.js';

export function renderResults(result = {}) {
    const container = getById('resultsContainer') || getById('results-container') || getById('results');
    if (!container) return;

    const total = Number(result.totalQuestions) || 0;
    const correct = Number(result.correctAnswers) || 0;
    const incorrect = Number(result.incorrectAnswers) || Math.max(0, total - correct);
    const accuracy = Number.isFinite(Number(result.accuracy))
        ? Number(result.accuracy)
        : getAccuracy(correct, total);
    const grade = result.grade || getGrade(accuracy);
    const score = Number(result.score) || 0;

    container.replaceChildren();

    const card = createElement('section', { className: 'results-card' });
    card.innerHTML = `
        <div class="result-badge">⚡ QUIZ COMPLETE</div>
        <h1 class="results-title">You forged a score.</h1>
        <p class="results-message"></p>

        <div class="score-ring">
            <div>
                <strong class="score-ring-value">${score.toLocaleString()}</strong>
                <span>POINTS</span>
            </div>
        </div>

        <div class="result-stats">
            <div><strong>${correct}</strong><span>Correct</span></div>
            <div><strong>${incorrect}</strong><span>Incorrect</span></div>
            <div><strong>${accuracy}%</strong><span>Accuracy</span></div>
            <div><strong>${result.maxStreak || 0}</strong><span>Best Streak</span></div>
            <div><strong>${grade}</strong><span>Grade</span></div>
            <div><strong>${total}</strong><span>Questions</span></div>
        </div>

        <div class="results-actions">
            <a class="btn btn-primary" href="review.html">Review Answers →</a>
            <a class="btn btn-secondary" href="../index.html">Play Again</a>
        </div>
    `;

    card.querySelector('.results-message').textContent = result.message || getPerformanceMessage(accuracy);
    container.appendChild(card);
    return container;
}
