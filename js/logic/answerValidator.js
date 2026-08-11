export function isValidAnswer(answer) {
    return answer !== undefined && answer !== null && String(answer).trim() !== '';
}

export function validateAnswer(question, selectedAnswer) {
    if (!question || !isValidAnswer(selectedAnswer)) {
        return { valid: false, correct: false, correctAnswer: null };
    }

    const correctAnswer = question.correctAnswer ?? question.correct_answer ?? '';
    const correct = String(selectedAnswer).trim() === String(correctAnswer).trim();

    return { valid: true, correct, selectedAnswer, correctAnswer };
}

export function isCorrectAnswer(question, selectedAnswer) {
    return validateAnswer(question, selectedAnswer).correct;
}
