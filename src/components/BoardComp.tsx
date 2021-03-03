import React from 'react';
import { CONSTANTS } from '../utils/CONSTANTS';
import { Board } from '../model/Board';

let currnetPlayer: boolean = true;

interface CellProps {
  value: string | number | null,
  x: number,
  y: number,
  aviable: boolean,
  win: string,
  winCells: [],
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

let board: Board = new Board();
const savedBoard: string = localStorage.getItem('board') || JSON.stringify(board.gameBoard);
let gameWins: number = +(localStorage.getItem('gameWins') || 0);
let gameLose: number = +(localStorage.getItem('gameLose') || 0);
let gameTies: number = +(localStorage.getItem('gameLose') || 0);

board.gameBoard = JSON.parse(savedBoard);

function checkIncludes(arr: [], x: number, y: number) {
  let answ: boolean = false;

  arr.forEach((item: number[]) => {
    if (item[0] === x && item[1] === y) {
      answ = true;
    }
  });

  return answ;
}

const Cell: React.FunctionComponent<CellProps> = (props: any) => {
  return (
    <div
      className={`${checkIncludes(props.winCells, props.x, props.y) ? 'cell win'
        : (props.aviable ? (props.win === CONSTANTS.NONE ? 'cell aviable' : 'cell')
          : 'cell insert')}`}
      onClick={props.onClick}
    >
      {props.value}
    </div>
  );
}

export class BoardComp extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      status: `Current player: ${CONSTANTS.X_FIGURE}`,
      isNext: true,
      res: this.getBoard(),
      win: board.checkWinner().figure,
      lose: 0,
      tie: 0,
    }

    this.changeFigureState = this.changeFigureState.bind(this);
    this.newGame = this.newGame.bind(this);
    this.reset = this.reset.bind(this);
  }

  newGame() {
    board = new Board();
    localStorage.setItem('board', JSON.stringify(board.gameBoard));
    currnetPlayer = true;
    this.setState({ res: this.getBoard() });
  }

  reset() {
    gameWins = 0;
    gameLose = 0;
    gameTies = 0;
    localStorage.setItem('gameWins', gameWins.toString());
    localStorage.setItem('gameLose', gameLose.toString());
    localStorage.setItem('gameTies', gameTies.toString());
    this.newGame();
  }

  renderCell(value: number | string, x: number, y: number, aviable: boolean) {
    return <Cell
      value={value !== CONSTANTS.X_FIGURE && value !== CONSTANTS.O_FIGURE ? '' : value}
      x={x}
      y={y}
      aviable={aviable}
      win={board.checkWinner().figure}
      winCells={board.checkWinner().winCells}
      key={`${x}${y}`}
      onClick={() => {
        if (aviable && board.checkWinner().figure === CONSTANTS.NONE) {
          board.setItem(currnetPlayer ? CONSTANTS.X_FIGURE : CONSTANTS.O_FIGURE, x, y);

          let winner: string = board.checkWinner().figure;

          if (winner === CONSTANTS.NONE) {
            setTimeout(() => {
              board.computerStep(CONSTANTS.O_FIGURE);
              winner = board.checkWinner().figure;

              if (winner === 'O') {
                gameLose += 1;
                localStorage.setItem('gameLose', gameLose.toString());
              }
            }, 10);
          } else {
            if (winner === CONSTANTS.X_FIGURE) {
              gameWins += 1;
              localStorage.setItem('gameWins', gameWins.toString());
            } else if (winner === CONSTANTS.TIE) {
              gameTies += 1;
              localStorage.setItem('gameTies', gameTies.toString());
            }
          }
        }
      }}
    />
  }

  getBoard(): any[] {
    const res: any[] = [];

    board.gameBoard.forEach((row) => {
      row.forEach((item: any) => {
        res.push(
          this.renderCell(item.value, item.x, item.y, item.value !== CONSTANTS.X_FIGURE && item.value !== CONSTANTS.O_FIGURE)
        )
      })
    });

    return res;
  }

  changeFigureState() {
    this.setState({ isNext: !this.state.isNext });
    this.setState({ res: this.getBoard(), win: board.checkWinner().figure });

    setTimeout(() => {
      this.setState({ res: this.getBoard() });
      this.setState({ isNext: !this.state.isNext });
    }, 500);

  }

  render() {

    let status: string;
    const winner = board.checkWinner().figure;
    if (winner !== CONSTANTS.NONE) {
      if (winner === CONSTANTS.TIE) {
        status = 'TIE';
      } else {
        status = `Winner: ${winner}`
      }
    } else {
      status = this.state.isNext ? `Current player: ${CONSTANTS.X_FIGURE}` : `Current player: ${CONSTANTS.O_FIGURE}`;
    }

    return (

      <div
        className="gameBoard"
      >
        <div className="status">{status}</div>
        <div className="resultsBlock">
          <div className="res">{`Wins: ${gameWins}`}</div>
          <div className="res">{`Lose: ${gameLose}`}</div>
          <div className="res">{`Tie: ${gameTies}`}</div>
        </div>
        <div
          onClick={this.changeFigureState}
          key="board"
          className="board"
        >
          {this.state.res}
        </div>
        <div className="buttonBox">
          <button
            className="funcButton"
            onClick={this.newGame}
          >
            New game
        </button>
          <button
            className="funcButton"
            onClick={this.reset}
          >
            Reset
        </button>
          <p className="info">
            Press 'F' to fullscreen
        </p>
        </div>
      </div>
    )
  }
}