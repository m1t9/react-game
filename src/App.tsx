import React, { useState } from 'react';
import './App.css';
import { Board } from './model/Board';
import { BoardComp } from './components/BoardComp';

const App: React.FunctionComponent = () => {
  return (
    <div className="game_board">
      <BoardComp />
    </div>
  );
}

export default App;
