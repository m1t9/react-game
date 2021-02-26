import React, { useState } from 'react';
import { CONSTANTS } from '../utils/CONSTANTS';
import { Board } from '../model/Board';

// renderBoard: React.FunctionComponent = () => 

const board: Board = new Board();

let currnetPlayer: boolean = true;

interface ICell {
  value: string | number,
  x: number,
  y: number,
}

interface IState {
  value: string | number | null,
  x: number,
  y: number,
}

class Cell extends React.Component<ICell, IState> {
  constructor(props: ICell) {
    super(props);
    this.state = {
      value: null,
      x: props.x,
      y: props.y,
    }
  }

  render() {
    return (
      <div
        className="cell"
        key={this.state.x * CONSTANTS.FIELD_SIZE + this.state.y}
        onClick={() => {
          const figure: string = currnetPlayer ? 'X' : 'O';
          this.setState({value: figure});
          board.setItem(this.state.x, this.state.y, figure);
          console.log(board.checkWinner());
          currnetPlayer = !currnetPlayer;
        }}
      >
        {this.state.value}
      </div>
    );
  }
}

export class BoardComp extends React.Component {
  repBoard: any[] = [];

  renderCell(value: number, x: number, y: number) {
    return <Cell value={value} x={x} y={y} />
  }

  createBoard(): any[] {

    const res: any[] = [];

    board.gameBoard.forEach((row) => {
      row.forEach((item: any) => {
        {res.push(
          this.renderCell(item.value, item.x, item.y)
        )}
      })
    });
    
    return res;
  }

  render() {
    
    const res = this.createBoard();

    return (
      <div
        key="board"
        className="board">
        {res}
      </div>
    )
  }
}