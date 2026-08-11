export function isNonEmptyString(value) {
    return typeof value === 'string' &&
        value.trim().length > 0;
}

export function isPositiveNumber(value) {
    const number = Number(value);

    return Number.isFinite(number) && number > 0;
}

export function isNonNegativeNumber(value) {
    const number = Number(value);

    return Number.isFinite(number) && number >= 0;
}

export function isValidArray(value) {
    return Array.isArray(value) && value.length > 0;
}

export function isValidQuestion(question) {
    if (!question || typeof question !== 'object') {
        return false;
    }

    const text = question.question ?? question.text;
    const answers = question.answers ?? question.options;
    const correctAnswer = question.correctAnswer ?? question.correct_answer ?? question.answer;

    if (!isNonEmptyString(String(text ?? ''))) return false;
    if (!Array.isArray(answers) || answers.length < 2) return false;
    if (!isValidAnswerValue(correctAnswer)) return false;

    const normalizedAnswers = answers.map(value => String(value).trim());
    const normalizedCorrect = String(correctAnswer).trim();

    // Every playable question must contain its correct answer exactly once.
    return normalizedAnswers.includes(normalizedCorrect) &&
        new Set(normalizedAnswers).size === normalizedAnswers.length;
}

function isValidAnswerValue(value) {
    return value !== undefined &&
        value !== null &&
        String(value).trim().length > 0;
}

export function validateQuestions(questions) {
    if (!Array.isArray(questions)) {
        return [];
    }

    return questions.filter(isValidQuestion);
}

export function isValidQuizSettings(settings = {}) {
    if (!settings || typeof settings !== 'object') {
        return false;
    }

    if (
        settings.questionCount !== undefined &&
        !isPositiveNumber(settings.questionCount)
    ) {
        return false;
    }

    if (
        settings.timePerQuestion !== undefined &&
        !isPositiveNumber(settings.timePerQuestion)
    ) {
        return false;
    }

    return true;
}
