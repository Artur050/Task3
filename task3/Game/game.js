import KeyGenerator from './keyGenerator.js';
import HmacGenerator from './hmacGenerator.js';
import GameLogic from './gameLogic.js';
import crypto from 'crypto';

export default class Game {
  constructor(moves) {
    if (moves.length % 2 === 0 || moves.length < 3) {
      throw new Error('Error: Please provide an odd number of moves (>= 3). Example: rock paper scissors');
    }

    if (new Set(moves).size !== moves.length) {
      throw new Error('Error: Moves must be unique. Example: rock paper scissors');
    }

    this.moves = moves;
    this.logic = new GameLogic(moves);
    this.key = KeyGenerator.generateKey();
    this.computerMove = this.getRandomMove();
    this.hmac = HmacGenerator.generateHmac(this.key, this.moves[this.computerMove]);
  }

  getRandomMove() {
    return crypto.randomInt(0, this.moves.length);
  }

  showMenu() {
    console.log(`HMAC: ${this.hmac}`);
    console.log('Available moves:');
    this.moves.forEach((move, index) => {
      console.log(`${index + 1} - ${move}`);
    });
    console.log('0 - exit');
    console.log('? - help');
  }

  play() {
    this.showMenu();

    process.stdin.on('data', (input) => {
      const choice = input.toString().trim();

      if (choice === '0') {
        console.log('Exiting...');
        process.exit(0);
      } else if (choice === '?') {
        this.showHelp();
      } else if (this.isValidMove(choice)) {
        const playerMoveIndex = parseInt(choice) - 1;
        const result = this.logic.determineWinner(playerMoveIndex, this.computerMove);

        console.log(`Your move: ${this.moves[playerMoveIndex]}`);
        console.log(`Computer move: ${this.moves[this.computerMove]}`);
        console.log(result === 'Draw' ? 'It\'s a draw!' : `${result} wins!`);
        console.log(`HMAC key: ${this.key}`);
        process.exit(0);
      } else {
        console.log('Invalid input. Please try again.');
        this.showMenu();
      }
    });
  }

  showHelp() {
    const table = this.logic.generateHelpTable();
    console.log('\nHelp table:');
    console.log(table);
    this.showMenu();
  }

  isValidMove(choice) {
    const moveIndex = parseInt(choice);
    return moveIndex >= 1 && moveIndex <= this.moves.length;
  }
}

