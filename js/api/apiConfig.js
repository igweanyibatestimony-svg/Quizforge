export const API_CONFIG = {
    baseUrl: 'https://opentdb.com/api.php',
    defaultAmount: 10,
    defaultDifficulty: 'medium',
    defaultCategory: 'any',
    timeout: 8000,
    retries: 1,
    responseCodes: { SUCCESS: 0, NO_RESULTS: 1, INVALID_PARAMETER: 2, TOKEN_NOT_FOUND: 3, TOKEN_EMPTY: 4, RATE_LIMIT: 5 },
};
