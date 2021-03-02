import React, { useState } from 'react';
import './App.css';
import { BoardComp } from './components/BoardComp';

const App: React.FunctionComponent = () => {
  return (
    <div className="game_board">
      <BoardComp />
    </div>
  );
}

export default App;
