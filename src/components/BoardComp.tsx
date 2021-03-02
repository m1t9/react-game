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
  // onClick: React.MouseEventHandler<HTMLButtonElement>;
}

interface IState {
  value: string | number | null,
  x: number,
  y: number,
  aviable: boolean,
}

class Cell extends React.Component<ICell, IState> {
  constructor(props: ICell) {
    super(props);
    this.state = {
      value: null,
      x: props.x,
      y: props.y,
      aviable: true,
    }
    this.clickHandler = this.clickHandler.bind(this);
  }

  // clickHandler() {
    
  // }
  clickHandler() {
    if (this.state.aviable && board.checkWinner().figure === 'n') {
      const figure: string = currnetPlayer ? 'X' : 'O';
      this.setState({value: figure});
      board.setItem(this.state.x, this.state.y, figure);
      // console.log(board.checkWinner());
      currnetPlayer = !currnetPlayer;
      this.setState({aviable: !this.state.aviable});
      // console.log(this);
      
      // if (board.checkWinner().figure !== 'n') alert(`Winner: ${board.checkWinner().figure}`);
    } else {
      return;
    }
  }

  render() {
    const completed: string = board.checkWinner().figure === 'n' ? 'cell' : 'cell completed ex4'; 
    return (
      <div
        className={`${this.state.aviable ? completed : 'cell insert'}`}
        // className="cell"
        // key={this.state.x * CONSTANTS.FIELD_SIZE + this.state.y}
        onClick={this.clickHandler}
      >
        {this.state.value}
      </div>
    );
  }
}

export class BoardComp extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      status: `Current player: X`,
      isNext: true,
    }
    this.changeFigureState = this.changeFigureState.bind(this);
  }

  repBoard: any[] = [];

  renderCell(value: number, x: number, y: number) {
    // return <Cell value={value} x={x} y={y} onClick={() => {console.log('wow')}}/>
    return <Cell value={value} x={x} y={y}/>
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

  changeFigureState() {
    this.setState({isNext: !this.state.isNext});
  }

  render() {
    // currnetPlayer ? this.setState({status: 'X'}) : this.setState({status: 'O'});
    // this.setState({status: 'O'});
    let status: string;
    const winner = board.checkWinner().figure;
    if (winner !== 'n') {
      status = `Winner: ${winner}`
    } else {
      status = this.state.isNext ? 'Current player: X' : 'Current player: O';
    }
    
    const res = this.createBoard();

    return (
      <div>
        <div className="status">{status}</div>
        <div
          onClick={this.changeFigureState}
          key="board"
          className="board">
          {res}
        </div>
      </div>
    )
  }
}