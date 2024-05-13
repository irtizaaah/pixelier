import React, { useRef, useEffect, useState} from 'react';
import Frame from './Frame';
import ToolBar from './ToolBar';
import './App.css';

function App() {
  const VIEW = 0;
  const DRAW = 1;
  const ERASE = 2;

  const defaultBrushColor = "#000";
  const defaultNumOfPixels = 64;
  const defaultIsGrid = false;
  const defaultMode = DRAW;
  const defaultBackgroundColor = "#fff";

  const [isGrid, setIsGrid] = useState(defaultIsGrid);
  const [backgroundColor, setBackgroundColor] = useState(defaultBackgroundColor);
  const [numOfPixels, setNumOfPixels] = useState(defaultNumOfPixels);
  const drawing = useRef(getEmptyDrawing());
  const inactiveLayers = useRef(getEmptyDrawing());
  const [brushColor, setBrushColor] = useState(defaultBrushColor);
  const [mode, setMode] = useState(defaultMode);

  return (
    <div className='App'>
      <ToolBar 
        numOfPixels={numOfPixels}
        drawing={drawing}
        brushColor={brushColor} 
        setBrushColor={setBrushColor} 
        setMode={setMode}
        mode={mode}
        isGrid={isGrid}
        setIsGrid={setIsGrid}
        backgroundColor={backgroundColor}
      />
      <Frame 
        numOfPixels={numOfPixels} 
        brushColor={brushColor} 
        isGrid={isGrid} 
        drawing={drawing} 
        inactiveLayers={inactiveLayers}
        mode = {mode}
        backgroundColor = {backgroundColor}
      />
    </div>
  );
}

function getEmptyDrawing(numOfPixels){
  let emptyDrawing = [];
  for(let i = 0; i < (numOfPixels*numOfPixels); i++){
    emptyDrawing.push("none");
  }
  return emptyDrawing;
}

export default App;
