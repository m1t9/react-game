import { CONSTANTS } from '../utils/CONSTANTS';

interface winner {
  figure: string,
  start: number[],
  end: number[],
}

export class Board {
  gameBoard: any[];

  constructor () {
    this.gameBoard = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ];
  }

  setItem(xCoord: number, yCoord: number, item: string): void {
    if (this.gameBoard[xCoord][yCoord] !== CONSTANTS.X_FIGURE
      && this.gameBoard[xCoord][yCoord] !== CONSTANTS.Y_FIGURE) {
      this.gameBoard[xCoord][yCoord] = item;
    }
  }

  checkWinner(): winner {
    for (let i = 0; i < CONSTANTS.FIELD_SIZE; i += 1) {
      let colCheck: boolean = this.gameBoard[0][i] === this.gameBoard[1][i]
        && this.gameBoard[1][i] === this.gameBoard[2][i];
      let rowCheck = this.gameBoard[i][0] === this.gameBoard[i][1]
        && this.gameBoard[i][1] === this.gameBoard[i][2];

      if (colCheck) {
        return {
          figure: this.gameBoard[0][i],
          start: [0, i],
          end: [2, i],
        };
      }

      if (rowCheck) {
        return {
          figure: this.gameBoard[i][0],
          start: [i, 0],
          end: [i, 2],
        };
      }
    }

    let diagonalCheck = this.gameBoard[0][0] === this.gameBoard[1][1]
      && this.gameBoard[1][1] === this.gameBoard[2][2];
    let iverseDiagonalCheck = this.gameBoard[0][2] === this.gameBoard[1][1]
      && this.gameBoard[1][1] === this.gameBoard[2][0];

    if (diagonalCheck) {
      return {
        figure: this.gameBoard[0][0],
        start: [0, 0],
        end: [2, 2],
      };
    }

    if (iverseDiagonalCheck) {
      return {
        figure: this.gameBoard[0][2],
        start: [0, 2],
        end: [2, 0],
      };
    }

    return {
      figure: 'n',
      start: [],
      end: [],
    };
  }
}
