const UI = {
    score: document.getElementById('score'),
    moves: document.getElementById('moves'),
    timer: document.getElementById('timer'),
    board: document.getElementById('game-board'),
    levelSelect: document.getElementById('level-select'),
    resetBtn: document.getElementById('reset-btn'),
    winModal: document.getElementById('win-modal'),
    finalScore: document.getElementById('final-score'),
    finalMoves: document.getElementById('final-moves'),
    finalTime: document.getElementById('final-time'),
    playAgainBtn: document.getElementById('play-again-btn'),

    updateStats(score, moves, time) {
        this.score.textContent = score;
        this.moves.textContent = moves;
        this.timer.textContent = this.formatTime(time);
    },

    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    clearBoard() {
        this.board.innerHTML = '';
    },

    createCard(symbol, index) {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;

        card.innerHTML = `
            <div class="card-face card-front">${symbol}</div>
            <div class="card-face card-back"></div>
        `;

        return card;
    },

    renderBoard(cards, level) {
        this.clearBoard();
        this.board.className = `game-board ${level}`;
        cards.forEach((symbol, index) => {
            const cardElement = this.createCard(symbol, index);
            this.board.appendChild(cardElement);
        });
    },

    showWinModal(score, moves, time) {
        this.finalScore.textContent = score;
        this.finalMoves.textContent = moves;
        this.finalTime.textContent = this.formatTime(time);
        this.winModal.classList.remove('hidden');
    },

    hideWinModal() {
        this.winModal.classList.add('hidden');
    }
};
