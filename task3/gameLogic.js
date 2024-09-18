import chalk from "chalk";

class GameLogic {

    constructor(moves) {
      this.moves = moves;
      this.moveCount = moves.length;
    }
  
    generateHelpTable() {
      const colWidths = this.moves.map(move => Math.max(move.length, 5)); 
      const maxColWidth = Math.min(Math.max(...colWidths), 10);

      let table = '+-------------+';
      let header = `| ${chalk.blue('v PC\\User >')} |`;
      this.moves.forEach((move, i) => {
          const paddedMove = chalk.yellow(move.padEnd(maxColWidth, ' '));
          table += '-'.repeat(maxColWidth + 2) + '+';
          header += ` ${paddedMove} |`;
      });
      table += '\n' + header + '\n+-------------+';
      this.moves.forEach(() => {
          table += '-'.repeat(maxColWidth + 2) + '+';
      });
      table += '\n';

      for (let i = 0; i < this.moveCount; i++) {
          let row = `| ${chalk.yellow(this.moves[i].padEnd(11))} |`;
          for (let j = 0; j < this.moveCount; j++) {
              let result = '';
              if (i === j) {
                  result = 'Draw';
              } else if (this.isWinningMove(i, j)) {
                  result = 'Win';
              } else {
                  result = 'Lose';
              }
              row += ` ${result.padEnd(maxColWidth, ' ')} |`;
          }
          table += row + '\n' + chalk.green('+-------------+');
          this.moves.forEach(() => {
              table += chalk.green('-'.repeat(maxColWidth + 2)) + '+';
          });
          table += '\n';
      }
      return table;
    }
  
    isWinningMove(i, j) {
      const half = Math.floor(this.moveCount / 2);
      return (j > i && j <= i + half) || (j < i && i - j > half);
    }
  
    determineWinner(playerMoveIndex, computerMoveIndex) {
      if (playerMoveIndex === computerMoveIndex) return 'Draw';
      return this.isWinningMove(computerMoveIndex, playerMoveIndex) ? 'Computer' : 'Player';
    }
}
  
export default GameLogic;
  