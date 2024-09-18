import Game from './game.js';

const moves = process.argv.slice(2);

try {
    const game = new Game(moves);
    game.play();
} catch (err) {
    console.error(err.message);
    console.log('Usage: node game.js move1 move2 ... moveN (odd number of moves, at least 3)');
}
