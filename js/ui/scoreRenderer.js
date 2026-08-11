import { getById, createElement } from '../utils/dom.js';
import { CONFIG } from '../config/config.js';

export function renderScores(scores = []) {
    const container = getById('scoresContainer') || getById('scores-container') || getById('scores');
    if (!container) return;

    container.replaceChildren();

    if (!Array.isArray(scores) || scores.length === 0) {
        container.appendChild(createElement('div', { className: 'empty-state' }, 'No high scores yet. Finish a quiz to claim your first spot.'));
        return container;
    }

    scores.forEach((entry, index) => {
        const row = createElement('article', { className: 'score-row' });
        row.innerHTML = `
            <div class="rank">${index + 1}</div>
            <div class="score-info">
                <strong></strong>
                <span></span>
            </div>
            <div class="score-points"></div>
        `;
        row.querySelector('.score-info strong').textContent = `${entry.correctAnswers || 0}/${entry.totalQuestions || 0} correct`;
        const categoryLabel =
            CONFIG.categoryLabels[String(entry.category)] ||
            entry.category ||
            'Any Category';
        const difficultyLabel =
            entry.difficulty
                ? entry.difficulty.charAt(0).toUpperCase() + entry.difficulty.slice(1)
                : 'Mixed';
        row.querySelector('.score-info span').textContent =
            `${difficultyLabel} • ${categoryLabel}`;
        row.querySelector('.score-points').textContent = `${Number(entry.score || 0).toLocaleString()} pts`;
        container.appendChild(row);
    });

    return container;
}
