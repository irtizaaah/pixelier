import React, { useRef, useEffect, useState} from 'react';
import Frame from './Frame';
import ToolBar from './ToolBar';
import './App.css';

function App() {
  const defaultBrushColor = "#000";
  const defaultNumOfPixels = 64;
  const defaultIsGrid = false;
  const defaultIsDrawMode = true;

  const [isGrid, setIsGrid] = useState(defaultIsGrid)
  const [numOfPixels, setNumOfPixels] = useState(defaultNumOfPixels);
  const drawing = useRef(getEmptyDrawing());
  const inactiveLayers = useRef(getEmptyDrawing());
  const [brushColor, setBrushColor] = useState(defaultBrushColor);
  const [isDrawMode, setIsDrawMode] = useState(defaultIsDrawMode);

  return (
    <div className='App'>
      <ToolBar setBrushColor={setBrushColor} setIsDrawMode={setIsDrawMode} isDrawMode={isDrawMode}/>
      <Frame 
        numOfPixels={numOfPixels} 
        brushColor={brushColor} 
        isGrid={isGrid} 
        drawing={drawing} 
        inactiveLayers={inactiveLayers}
        isDrawMode = {isDrawMode}
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
