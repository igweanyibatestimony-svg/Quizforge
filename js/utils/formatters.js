export function formatTime(seconds = 0) {
    const total = Math.max(0, Number(seconds) || 0);
    const minutes = Math.floor(total / 60);
    const remaining = total % 60;

    return `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
}

export function formatScore(score = 0) {
    return (Number(score) || 0).toLocaleString();
}

export function formatPercentage(value = 0) {
    return `${Math.round(Number(value) || 0)}%`;
}

export function formatQuestionNumber(current = 0, total = 0) {
    return total > 0
        ? `Question ${current} of ${total}`
        : `Question ${current}`;
}

export function formatDate(date) {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
        return 'Unknown date';
    }

    return parsed.toLocaleDateString();
}

export function truncateText(text = '', maxLength = 100) {
    const value = String(text);

    if (value.length <= maxLength) {
        return value;
    }

    return `${value.slice(0, Math.max(0, maxLength - 3))}...`;
}
