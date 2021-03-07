import React from 'react';
import './App.css';
import { DrawBoard } from './features/DrawBoard';
import { ToolBar } from './features/ToolBar';

function App() {
  return (
    <div className="App">
      <DrawBoard></DrawBoard>
      <ToolBar></ToolBar>
    </div>
  );
}

export default App;
