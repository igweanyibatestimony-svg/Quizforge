/**
 * QuizForge — DOM utility helpers.
 */

/**
 * Get an element by ID.
 */
export function getById(id) {
    if (!id) return null;
    return document.getElementById(id);
}

/**
 * Query for the first matching element.
 */
export function $(selector, parent = document) {
    if (!selector || !parent) return null;
    return parent.querySelector(selector);
}

/**
 * Query for all matching elements.
 */
export function $$(selector, parent = document) {
    if (!selector || !parent) return [];
    return Array.from(parent.querySelectorAll(selector));
}

/**
 * Create a DOM element.
 */
export function createElement(tag, attributes = {}, text = '') {
    const element = document.createElement(tag);

    Object.entries(attributes).forEach(([key, value]) => {
        if (value === null || value === undefined) return;

        if (key === 'className') {
            element.className = value;
        } else if (key === 'textContent') {
            element.textContent = value;
        } else if (key === 'dataset' && typeof value === 'object') {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else {
            element.setAttribute(key, String(value));
        }
    });

    if (text !== '') {
        element.textContent = text;
    }

    return element;
}

/**
 * Show an element.
 */
export function show(element) {
    if (!element) return;
    element.classList.remove('hidden');
}

/**
 * Hide an element.
 */
export function hide(element) {
    if (!element) return;
    element.classList.add('hidden');
}

/**
 * Toggle an element's visibility.
 */
export function toggle(element, force) {
    if (!element) return;

    if (typeof force === 'boolean') {
        element.classList.toggle('hidden', !force);
    } else {
        element.classList.toggle('hidden');
    }
}

/**
 * Safely set text content.
 */
export function setText(element, text = '') {
    if (!element) return;
    element.textContent = text;
}

/**
 * Safely clear an element.
 */
export function clearElement(element) {
    if (!element) return;
    element.replaceChildren();
}

/**
 * Add an event listener only when the element exists.
 */
export function on(element, event, handler, options) {
    if (!element || typeof handler !== 'function') {
        return () => {};
    }

    element.addEventListener(event, handler, options);

    return () => {
        element.removeEventListener(event, handler, options);
    };
}
