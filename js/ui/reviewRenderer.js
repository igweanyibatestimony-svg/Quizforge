import { getById, createElement } from '../utils/dom.js';

export function renderReview(result = {}) {
    const container = getById('reviewContainer') || getById('review-container') || getById('review');
    if (!container) return;

    container.replaceChildren();

    const questions = Array.isArray(result.questions) ? result.questions : [];
    const answers = Array.isArray(result.userAnswers) ? result.userAnswers : [];

    if (!questions.length) {
        container.appendChild(createElement('p', { className: 'empty-state' }, 'No completed quiz found. Start a quiz first.'));
        return container;
    }

    questions.forEach((question, index) => {
        const selected = answers[index] ?? null;
        const correctAnswer = question.correctAnswer ?? question.correct_answer ?? '';
        const isCorrect = selected !== null &&
            String(selected).trim() === String(correctAnswer).trim();

        const item = createElement('article', {
            className: `review-item ${isCorrect ? 'correct' : 'incorrect'}`
        });

        item.innerHTML = `
            <div class="review-top">
                <span class="review-number">Q${index + 1}</span>
                <strong class="review-status">${isCorrect ? '✓ Correct' : selected === null ? '⏰ Timed out' : '✗ Incorrect'}</strong>
            </div>
            <h2 class="review-question"></h2>
            <p class="review-answer"></p>
            <p class="review-correct"></p>
        `;

        item.querySelector('.review-question').textContent = question.question || question.text || `Question ${index + 1}`;
        item.querySelector('.review-answer').textContent = `Your answer: ${selected ?? 'No answer'}`;
        item.querySelector('.review-correct').textContent = `Correct answer: ${correctAnswer}`;

        container.appendChild(item);
    });

    return container;
}
