class SoundManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }

    playFlip() {
        this.beep(440, 0.05, 'sine');
    }

    playMatch() {
        this.beep(523.25, 0.1, 'sine'); // C5
        setTimeout(() => this.beep(659.25, 0.1, 'sine'), 100); // E5
        setTimeout(() => this.beep(783.99, 0.2, 'sine'), 200); // G5
    }

    playMismatch() {
        this.beep(220, 0.2, 'sawtooth');
    }

    playWin() {
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, i) => {
            setTimeout(() => this.beep(freq, 0.2, 'sine'), i * 150);
        });
    }

    beep(freq, duration, type) {
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
    }
}

const sounds = new SoundManager();
