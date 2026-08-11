# QuizForge 2.1

A browser-based trivia quiz with:
- Open Trivia DB questions when the API is available
- a built-in offline fallback bank
- randomized answer choices
- timed questions
- streak and time bonuses
- results and answer review
- local high scores
- mobile-friendly UI
- strict offline category/difficulty filtering

## Run in Termux

```bash
cd ~/Quizforge
npm test
python -m http.server 8080
```

Open:

```text
http://127.0.0.1:8080/
```

If the browser still shows an older design, stop the old server, replace the old project folder completely, restart the server, and hard-refresh the page.

## Important offline behavior

The fallback bank **never silently mixes categories or difficulties**.

If the offline bank has fewer matching questions than requested, QuizForge runs with the available matching questions and tells you that the quiz was shortened. It will not secretly put unrelated questions into a filtered quiz.

The API is therefore the source for larger, fully populated category/difficulty selections. The offline bank is a safety net, not a fake replacement for the API's much larger database.

## Tests

```bash
npm test
```

This:
1. runs smoke tests for fallback filtering, answer uniqueness, scoring, and grading;
2. runs `node --check` against **every JavaScript file** under `js/`.

## Debug mode

Add `?debug=1` to the page URL to show uncaught JavaScript errors on-screen.
