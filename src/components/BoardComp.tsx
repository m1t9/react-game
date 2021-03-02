import React, { useState } from 'react';
import { CONSTANTS } from '../utils/CONSTANTS';
import { Board } from '../model/Board';

// renderBoard: React.FunctionComponent = () => 

const board: Board = new Board();

let currnetPlayer: boolean = true;
// let status: string = `Current player: X`

interface ICell {
  value: string | number,
  x: number,
  y: number,
  // key: string,
  // onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface CellProps {
  value: string | number | null,
  x: number,
  y: number,
  aviable: boolean,
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface IState {
  value: string | number | null,
  x: number,
  y: number,
  aviable: boolean,
}

// __________________________________________________________________________________________________________________________________________________________

// class Cell extends React.Component<ICell, IState> {
//   constructor(props: ICell) {
//     super(props);
//     this.state = {
//       value: null,
//       x: props.x,
//       y: props.y,
//       aviable: true,
//     }
//     this.clickHandler = this.clickHandler.bind(this);
//   }

//   // clickHandler() {

//   // }
//   clickHandler() {
//     if (this.state.aviable && board.checkWinner().figure === 'n') {
//       const figure: string = currnetPlayer ? 'X' : 'O';
//       this.setState({value: figure});
//       board.setItem(this.state.x, this.state.y, figure);
//       // console.log(board.checkWinner());
//       currnetPlayer = !currnetPlayer;
//       this.setState({aviable: !this.state.aviable});
//       // board.computerStep('K');
//       // console.log(this);

//       // if (board.checkWinner().figure !== 'n') alert(`Winner: ${board.checkWinner().figure}`);
//     } else {
//       // console.log('wow');
//       return;
//     }
//   }

//   render() {
//     const completed: string = board.checkWinner().figure === 'n' ? 'cell' : 'cell completed ex4'; 
//     return (
//       <div
//         className={`${this.state.aviable ? completed : 'cell insert'}`}
//         // className="cell"
//         // key={this.state.x * CONSTANTS.FIELD_SIZE + this.state.y}
//         onClick={this.clickHandler}
//         // key={this.state.x + this.state.y}
//       >
//         {this.state.value}
//       </div>
//     );
//   }
// }
// __________________________________________________________________________________________________________________________________________________________

// function Cell(props: {}): React.FunctionComponent<any> {
const Cell: React.FunctionComponent<CellProps> = (props: any) => {
  // console.log(props);
  return (
    <div
      // className="cell"
      className={`${props.aviable ? 'cell' : 'cell insert'}`}
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
      status: `Current player: X`,
      isNext: true,
      res: this.getBoard(),
    }
    this.changeFigureState = this.changeFigureState.bind(this);
  }

  // repBoard: any[] = [];
  // res = this.getBoard();

  renderCell(value: number | string, x: number, y: number, aviable: boolean) {
    // return <Cell value={value} x={x} y={y} onClick={() => {console.log('wow')}}/>
    return <Cell
      value={value !== 'X' && value !== 'O' ? '' : value}
      x={x}
      y={y}
      aviable={aviable}
      onClick={() => {
        if (aviable) {
          board.setItem(currnetPlayer ? 'X' : 'O', x, y);
          setTimeout(() => {
            board.computerStep('O');
          }, 10);
        }
      }}
    />
    // return <Cell />
  }

  getBoard(): any[] {

    const res: any[] = [];

    board.gameBoard.forEach((row) => {
      row.forEach((item: any) => {
        {
          res.push(
            // item.value !== 'X' && item.value !== 'O' ? this.renderCell(item.value, item.x, item.y) : this.renderCell('', item.x, item.y)
            this.renderCell(item.value, item.x, item.y, item.value !== 'X' && item.value !== 'O')
          )
        }
      })
    });

    return res;
  }

  changeFigureState() {
    this.setState({ res: this.getBoard() });

    setTimeout(() => {
      this.setState({ res: this.getBoard() });
      this.setState({ isNext: !this.state.isNext });
      this.setState({ isNext: !this.state.isNext });
  }, 500);
    // console.log(this)
  }

  render() {
    let status: string;
    const winner = board.checkWinner().figure;
    if (winner !== 'n') {
      status = `Winner: ${winner}`
    } else {
      status = this.state.isNext ? 'Current player: X' : 'Current player: O';
    }

    return (
      <div>
        <div className="status">{status}</div>
        <div
          onClick={this.changeFigureState}
          key="board"
          className="board">
            {this.state.res}
        </div>
      </div>
    )
  }
}