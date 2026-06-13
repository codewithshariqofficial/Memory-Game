class MemoryGame {
    constructor() {
        this.symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦'];
        this.levelConfigs = {
            easy: { pairs: 8, penalty: 1 },
            medium: { pairs: 12, penalty: 2 },
            hard: { pairs: 18, penalty: 3 }
        };

        this.currentLevel = 'easy';
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.score = 0;
        this.moves = 0;
        this.time = 0;
        this.timerInterval = null;
        this.isProcessing = false;
        this.combo = 0;

        this.init();
    }

    init() {
        UI.resetBtn.addEventListener('click', () => this.startNewGame());
        UI.playAgainBtn.addEventListener('click', () => {
            UI.hideWinModal();
            this.startNewGame();
        });
        UI.levelSelect.addEventListener('change', (e) => {
            this.currentLevel = e.target.value;
            this.startNewGame();
        });
        UI.board.addEventListener('click', (e) => this.handleCardClick(e));

        this.startNewGame();
    }

    startNewGame() {
        this.resetState();
        this.generateCards();
        UI.renderBoard(this.cards, this.currentLevel);
        UI.updateStats(this.score, this.moves, this.time);
        this.startTimer();
    }

    resetState() {
        clearInterval(this.timerInterval);
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.score = 0;
        this.moves = 0;
        this.time = 0;
        this.combo = 0;
        this.isProcessing = false;
    }

    generateCards() {
        const numPairs = this.levelConfigs[this.currentLevel].pairs;
        const selectedSymbols = this.symbols.slice(0, numPairs);
        this.cards = [...selectedSymbols, ...selectedSymbols];
        this.shuffle(this.cards);
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    startTimer() {
        this.timerInterval = setInterval(() => {
            this.time++;
            UI.updateStats(this.score, this.moves, this.time);
        }, 1000);
    }

    handleCardClick(e) {
        const card = e.target.closest('.card');
        if (!card || card.classList.contains('flipped') || card.classList.contains('matched') || this.isProcessing) {
            return;
        }

        this.flipCard(card);

        if (this.flippedCards.length === 2) {
            this.moves++;
            this.checkMatch();
        }
    }

    flipCard(card) {
        card.classList.add('flipped');
        this.flippedCards.push(card);
        sounds.playFlip();
    }

    checkMatch() {
        this.isProcessing = true;
        const [card1, card2] = this.flippedCards;
        const match = card1.dataset.symbol === card2.dataset.symbol;

        if (match) {
            this.handleMatch(card1, card2);
        } else {
            this.handleMismatch(card1, card2);
        }

        UI.updateStats(this.score, this.moves, this.time);
    }

    handleMatch(card1, card2) {
        this.matchedPairs++;
        this.combo++;
        
        // Calculate Score: (Base Points * Combo)
        const basePoints = 100;
        this.score += basePoints * this.combo;

        setTimeout(() => {
            card1.classList.add('matched', 'pulse');
            card2.classList.add('matched', 'pulse');
            sounds.playMatch();
            this.flippedCards = [];
            this.isProcessing = false;

            if (this.matchedPairs === this.levelConfigs[this.currentLevel].pairs) {
                this.winGame();
            }
        }, 500);
    }

    handleMismatch(card1, card2) {
        this.combo = 0;
        // Small penalty for mismatch
        this.score = Math.max(0, this.score - (this.levelConfigs[this.currentLevel].penalty * 5));

        setTimeout(() => {
            card1.classList.add('shake');
            card2.classList.add('shake');
            sounds.playMismatch();
            
            setTimeout(() => {
                card1.classList.remove('flipped', 'shake');
                card2.classList.remove('flipped', 'shake');
                this.flippedCards = [];
                this.isProcessing = false;
            }, 500);
        }, 500);
    }

    winGame() {
        clearInterval(this.timerInterval);
        // Bonus for time
        const timeBonus = Math.max(0, 1000 - (this.time * this.levelConfigs[this.currentLevel].penalty));
        this.score += timeBonus;
        
        UI.updateStats(this.score, this.moves, this.time);
        sounds.playWin();
        
        setTimeout(() => {
            UI.showWinModal(this.score, this.moves, this.time);
        }, 1000);
    }
}

// Start the game
document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});
