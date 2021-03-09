import React from 'react';
import './App.css';
import { DrawRenderer } from './features/DrawRenderer';
import { ToolBar } from './features/ToolBar';

function App() {
  return (
    <div className="App">
      <DrawRenderer/>
      <ToolBar></ToolBar>
    </div>
  );
}

export default App;
