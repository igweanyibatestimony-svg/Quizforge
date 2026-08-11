import { CONFIG } from '../config/config.js';

let timerInterval = null;
let remainingSeconds = 0;
let onTickCallback = null;
let onExpireCallback = null;

export function startTimer(onTick, onExpire) {
    clearTimer();
    remainingSeconds = Number(CONFIG.timePerQuestion) || 30;
    onTickCallback = typeof onTick === 'function' ? onTick : null;
    onExpireCallback = typeof onExpire === 'function' ? onExpire : null;

    onTickCallback?.(remainingSeconds);

    timerInterval = setInterval(() => {
        remainingSeconds = Math.max(remainingSeconds - 1, 0);
        onTickCallback?.(remainingSeconds);

        if (remainingSeconds === 0) {
            const expire = onExpireCallback;
            clearTimer();
            expire?.();
        }
    }, 1000);
}

export function clearTimer() {
    if (timerInterval !== null) clearInterval(timerInterval);
    timerInterval = null;
    onTickCallback = null;
    onExpireCallback = null;
}

export function stopTimer() {
    clearTimer();
}

export function getRemainingSeconds() {
    return remainingSeconds;
}

export function isTimerRunning() {
    return timerInterval !== null;
}
