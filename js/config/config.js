export const CONFIG = {
    timePerQuestion: 30,
    defaultQuestionCount: 10,

    difficulty: {
        easy: 'easy',
        medium: 'medium',
        hard: 'hard',
    },

    categories: {
        any: 'any',
        general: 9,
        books: 10,
        film: 11,
        music: 12,
        science: 17,
        computers: 18,
        mathematics: 19,
        mythology: 20,
        sports: 21,
        geography: 22,
        history: 23,
        politics: 24,
        art: 25,
        animals: 27,
        vehicles: 28,
        comics: 29,
        gadgets: 30,
        anime: 31,
        cartoons: 32,
    },

    categoryLabels: {
        any: 'Any Category',
        '9': 'General Knowledge',
        '17': 'Science & Nature',
        '18': 'Computers',
        '21': 'Sports',
        '22': 'Geography',
        '23': 'History',
        '24': 'Politics',
        '27': 'Animals',
        '31': 'Anime & Manga',
    },

    scoring: {
        basePoints: 100,
        streakBonus: 25,
        timeoutPenalty: 0,
    },

    highScores: {
        maxEntries: 10,
    },

    storageKeys: {
        state: 'quizforge_state',
        lastResult: 'quizforge_last_result',
        highScores: 'quizforge_high_scores',
        preferences: 'quizforge_preferences',
    },

    api: {
        timeout: 10000,
        retries: 2,
    },
};
