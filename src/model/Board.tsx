import { CONSTANTS } from '../utils/CONSTANTS';

interface winner {
  figure: string,
  start: number[],
  end: number[],
  winCells: any
}

export class Board {
  gameBoard: any[];

  constructor() {
    this.gameBoard = [];
    for (let i = 0; i < 3; i += 1) {
      let row = [];
      for (let j = 0; j < 3; j += 1) {
        row.push(
          {
            value: i * CONSTANTS.FIELD_SIZE + j,
            x: i,
            y: j,
          }
        )
      }
      this.gameBoard.push(row);
    }
  }

  setItem(item: string, xCoord: number, yCoord: number): void {
    if (this.gameBoard[xCoord][yCoord].value !== CONSTANTS.X_FIGURE
      && this.gameBoard[xCoord][yCoord].value !== CONSTANTS.Y_FIGURE) {
      this.gameBoard[xCoord][yCoord].value = item;
    }
    localStorage.setItem('board', JSON.stringify(this.gameBoard));
  }

  isEmpty():boolean {
    let empty = false;

    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        const val = this.gameBoard[i][j].value;
        if (val !== CONSTANTS.X_FIGURE && val !== CONSTANTS.O_FIGURE) {
          empty = true;
        }
      }
    }

    return empty;
  }

  computerStep(figure: string) {
    let empty = this.isEmpty();

    if (!empty) {
      return;
    }

    let randX = Math.floor(Math.random() * 3);
    let randY = Math.floor(Math.random() * 3);

    while (this.gameBoard[randX][randY].value === CONSTANTS.X_FIGURE
      || this.gameBoard[randX][randY].value === CONSTANTS.O_FIGURE) {
      randX = Math.floor(Math.random() * 3);
      randY = Math.floor(Math.random() * 3);
    }

    this.gameBoard[randX][randY].value = figure;
    localStorage.setItem('board', JSON.stringify(this.gameBoard));
  }

  checkWinner(): winner {
    for (let i = 0; i < CONSTANTS.FIELD_SIZE; i += 1) {
      let colCheck: boolean = this.gameBoard[0][i].value === this.gameBoard[1][i].value
        && this.gameBoard[1][i].value === this.gameBoard[2][i].value;
      let rowCheck = this.gameBoard[i][0].value === this.gameBoard[i][1].value
        && this.gameBoard[i][1].value === this.gameBoard[i][2].value;

      if (colCheck) {
        return {
          figure: this.gameBoard[0][i].value,
          start: [0, i],
          end: [2, i],
          winCells: [[0,i], [1, i], [2, i]],
        };
      }

      if (rowCheck) {
        return {
          figure: this.gameBoard[i][0].value,
          start: [i, 0],
          end: [i, 2],
          winCells: [[i, 0],[i, 1], [i, 2]],
        };
      }
    }

    let diagonalCheck = this.gameBoard[0][0].value === this.gameBoard[1][1].value
      && this.gameBoard[1][1].value === this.gameBoard[2][2].value;
    let iverseDiagonalCheck = this.gameBoard[0][2].value === this.gameBoard[1][1].value
      && this.gameBoard[1][1].value === this.gameBoard[2][0].value;

    if (diagonalCheck) {
      return {
        figure: this.gameBoard[0][0].value,
        start: [0, 0],
        end: [2, 2],
        winCells: [[0, 0], [1, 1], [2, 2]],
      };
    }

    if (iverseDiagonalCheck) {
      return {
        figure: this.gameBoard[0][2].value,
        start: [0, 2],
        end: [2, 0],
        winCells: [[0, 2], [1, 1], [2, 0]],
      };
    }

    if (!this.isEmpty()) {
      return {
        figure: CONSTANTS.TIE,
        start: [],
        end: [],
        winCells: [],
      };
    } else {
      return {
        figure: CONSTANTS.NONE,
        start: [],
        end: [],
        winCells: [],
      };
    }
  }
}