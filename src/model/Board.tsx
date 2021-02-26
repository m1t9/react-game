import { CONSTANTS } from '../utils/CONSTANTS';
import React from 'react';

interface winner {
  figure: string,
  start: number[],
  end: number[],
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

  setItem(xCoord: number, yCoord: number, item: string): void {
    if (this.gameBoard[xCoord][yCoord].value !== CONSTANTS.X_FIGURE
      && this.gameBoard[xCoord][yCoord].value !== CONSTANTS.Y_FIGURE) {
      this.gameBoard[xCoord][yCoord].value = item;
    }
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
        };
      }

      if (rowCheck) {
        return {
          figure: this.gameBoard[i][0].value,
          start: [i, 0],
          end: [i, 2],
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
      };
    }

    if (iverseDiagonalCheck) {
      return {
        figure: this.gameBoard[0][2].value,
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