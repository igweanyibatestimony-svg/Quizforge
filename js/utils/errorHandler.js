export function getErrorMessage(error, fallback = 'Something went wrong.') {
    if (typeof error === 'string' && error.trim()) {
        return error.trim();
    }

    if (error?.message && typeof error.message === 'string') {
        return error.message;
    }

    return fallback;
}

export function handleError(error, options = {}) {
    const {
        fallback = 'Something went wrong.',
        log = true,
        show = true,
    } = options;

    const message = getErrorMessage(error, fallback);

    if (log) {
        console.error(error);
    }

    if (show && typeof document !== 'undefined') {
        const element =
            document.getElementById('error-message') ||
            document.querySelector('.error-message');

        if (element) {
            element.textContent = message;
            element.hidden = false;
        }
    }

    return message;
}

export function clearError() {
    if (typeof document === 'undefined') {
        return;
    }

    const element =
        document.getElementById('error-message') ||
        document.querySelector('.error-message');

    if (element) {
        element.textContent = '';
        element.hidden = true;
    }
}

export function createErrorHandler(options = {}) {
    return (error) => handleError(error, options);
}
