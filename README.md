# Memory Match Mastery

A simple browser-based memory card matching game. Flip cards to find matching pairs. No build tools or dependencies — just open and play.

## Features

- 3 difficulty levels: Easy (4x4), Medium (6x4), Hard (6x6)
- Score tracking with combo bonus for consecutive matches
- Move counter and timer
- Sound effects (flip, match, mismatch, win) using Web Audio API
- Win screen showing final score, moves, and time
- Responsive card grid with 3D flip animation

## Files

- `index.html` — main page and game layout
- `css/styles.css` — styling and animations
- `js/game.js` — game logic (cards, matching, scoring, timer)
- `js/ui.js` — DOM rendering and UI updates
- `js/sounds.js` — sound effects via Web Audio API

## How to Run

1. Download or clone the project.
2. Open `index.html` in any modern web browser.
3. No installation or server required.

## How to Play

1. Choose a difficulty level from the dropdown.
2. Click a card to flip it.
3. Flip a second card to check for a match.
4. Matched pairs stay face up; mismatched pairs flip back.
5. Match all pairs to win.

## Scoring

- Each match: 100 points × current combo
- Consecutive matches increase the combo multiplier
- A mismatch resets the combo and applies a small penalty
- Time bonus added on winning

## Tech Stack

- HTML, CSS, JavaScript (vanilla)
- Web Audio API for sounds

## License

Free to use for learning and personal projects.