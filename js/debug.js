(() => {
    const debug = new URLSearchParams(location.search).get('debug') === '1';
    window.addEventListener('error', event => {
        console.error('[QuizForge ERROR]', event.message, event.error);
        if (!debug) return;
        const box = document.createElement('pre');
        box.style.cssText = 'position:fixed;inset:0 auto auto 0;z-index:99999;max-height:50vh;overflow:auto;width:100%;margin:0;padding:16px;background:#35000a;color:#fff;white-space:pre-wrap;font:13px/1.4 monospace;';
        box.textContent = `QUIZFORGE JS ERROR\n\n${event.message}\n\n${event.error?.stack || ''}`;
        document.body.prepend(box);
    });
    window.addEventListener('unhandledrejection', event => {
        console.error('[QuizForge PROMISE ERROR]', event.reason);
        if (!debug) return;
        const box = document.createElement('pre');
        box.style.cssText = 'position:fixed;inset:0 auto auto 0;z-index:99999;max-height:50vh;overflow:auto;width:100%;margin:0;padding:16px;background:#35000a;color:#fff;white-space:pre-wrap;font:13px/1.4 monospace;';
        box.textContent = `QUIZFORGE PROMISE ERROR\n\n${String(event.reason)}\n\n${event.reason?.stack || ''}`;
        document.body.prepend(box);
    });
})();
