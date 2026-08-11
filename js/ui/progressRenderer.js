import { getById } from '../utils/dom.js';

export function renderProgress(current = 0, total = 0) {
    const container = getById('progressContainer');
    if (!container) return;

    const safeTotal = Math.max(0, Number(total) || 0);
    const safeCurrent = Math.min(Math.max(0, Number(current) || 0), Math.max(0, safeTotal - 1));
    const percent = safeTotal ? ((safeCurrent + 1) / safeTotal) * 100 : 0;

    container.innerHTML = `
        <div class="progress-meta">
            <span>Question ${safeCurrent + 1} of ${safeTotal}</span>
            <strong>${Math.round(percent)}%</strong>
        </div>
        <div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="${safeTotal}" aria-valuenow="${safeCurrent + 1}">
            <div class="progress-fill" style="width:${percent}%"></div>
        </div>
    `;
}
