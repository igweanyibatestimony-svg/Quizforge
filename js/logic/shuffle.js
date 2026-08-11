/**
 * Shuffle an array using Fisher-Yates.
 * Returns a new array without mutating the original.
 */
export function shuffle(array = []) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
}

/**
 * Pick a random subset from an array.
 */
export function shuffleAndSlice(array = [], count = array.length) {
    return shuffle(array).slice(0, Math.max(0, count));
}
