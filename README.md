# Memory Match Mastery

A browser-based memory card matching game. Flip cards to find matching pairs. No build tools or dependencies - just open and play.

## Features

- 3 difficulty levels: Easy (4x4), Medium (6x4), Hard (6x6)
- Score tracking with combo bonus for consecutive matches
- Move counter and timer
- Sound effects (flip, match, mismatch, win) using the Web Audio API
- Win screen showing final score, moves, and time
- Responsive card grid with 3D flip animation

## Tech Stack

- HTML5
- CSS3 (3D transforms, animations)
- Vanilla JavaScript
- Web Audio API

## Project Structure

```
Memory-Game/
├── index.html       # Main page and game layout
├── css/
│   └── styles.css   # Styling and animations
└── js/
    ├── game.js      # Game logic (cards, matching, scoring, timer)
    ├── ui.js        # DOM rendering and UI updates
    └── sounds.js    # Sound effects via Web Audio API
```

## Getting Started

1. Clone or download this repository.
2. Open `index.html` in any modern browser.
3. No installation or server required.

## How to Play

1. Choose a difficulty level from the dropdown.
2. Click a card to flip it.
3. Flip a second card to check for a match.
4. Matched pairs stay face up; mismatched pairs flip back.
5. Match all pairs to win.

## Scoring

- Each match: 100 points x current combo
- Consecutive matches increase the combo multiplier
- A mismatch resets the combo and applies a small penalty
- Time bonus added on winning

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Code With Shariq Official** - [GitHub](https://github.com/codewithshariqofficial)