import React, { useEffect, useState } from 'react';
import './ToolBar.css';
import handIcon from "./assets/hand.svg";
import drawIcon from "./assets/draw.svg";
import eraserIcon from "./assets/eraser.svg";
import gridIcon from "./assets/grid.svg";
import gridIconSelected from "./assets/grid-selected.svg";
import eraserIconSelected from "./assets/eraser-selected.svg";
import handIconSelected from "./assets/hand-selected.svg";
import drawIconSelected from "./assets/draw-selected.svg";
import downloadIcon from './assets/download.svg';
import { saveAs } from 'file-saver';
import ColorPicker from './ColorPicker';
import toggleIcon from './assets/toggle-icon.svg';
import { downloadImage } from './utility'; // Update this path

function PaletteModal({togglePalette, isReplaceMode, setIsReplaceMode, palette, setPalette, brushColor, setBrushColor}){
  return(
  <div className="overlay" onClick={togglePalette}>
    <ColorPicker isReplaceMode = {isReplaceMode} setIsReplaceMode={setIsReplaceMode} palette={palette} setPalette={setPalette} brushColor={brushColor} setBrushColor={setBrushColor} />
    <div className="modal">
      {palette.map((color, index) => (
        <div
          key={index}
          className="color"
          style={{ backgroundColor: color }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent the overlay click from closing the modal
            if(isReplaceMode){
              const newPalette = [...palette];
              newPalette[index] = brushColor;
              setPalette(newPalette);
              setIsReplaceMode(false);
            }
            else{
              setBrushColor(color);
            }
          }}
        ></div>
      ))}
    </div>
  </div>
);
        }

function ToolBar({ backgroundColor, numOfPixels, drawing, isGrid, setIsGrid, brushColor, setBrushColor, setMode, mode }) {
  const VIEW = 0;
  const DRAW = 1;
  const ERASE = 2;

  const [isReplaceMode, setIsReplaceMode] = useState(false);
  const [palette, setPalette] = useState(["#240A34", "#891652", "#EABE6C", "#F3E99F", "#83C0C1", "#96E9C6", "", ""]);
  const [paletteVisible, setPaletteVisible] = useState(false);
  const [mostRecentColor, setMostRecentColor] = useState("#000");
  const [toolBarVisible, setToolBarVisible] = useState(true); // State to toggle visibility of tool bar items

  const handleErase = () => {
    setMostRecentColor(brushColor);
    setMode(ERASE);
    setBrushColor("#ffffff00");
  };

  const handleDraw = () => {
    setMode(DRAW);
    setBrushColor(mostRecentColor);
  };

  const handleView = () => {
    setMode(VIEW)
  };

  const togglePalette = () => {
    setPaletteVisible(!paletteVisible);
  };

  const ToolBarItems = (numOfPixels, drawing, backgroundColor) => (
    <div className="ToolBarItems">
      <div className="Icon" onClick={()=>downloadImage(numOfPixels, drawing.current, backgroundColor)}>
        <img src={downloadIcon} alt="Download" />
      </div>
      <div className="Icon" onClick={() => setIsGrid(!isGrid)}>
        <img src={isGrid ? gridIconSelected : gridIcon} alt="Grid" />
      </div>
      <div className="Icon" onClick={handleView}>
        <img src={mode === VIEW ? handIconSelected : handIcon} alt="View Mode" />
      </div>
      <div className="Icon" onClick={handleErase}>
        <img src={mode === ERASE ? eraserIconSelected : eraserIcon} alt="Erase Mode" />
      </div>
      <div className="Icon" onClick={handleDraw}>
        <img src={mode === DRAW ? drawIconSelected : drawIcon} alt="Draw Mode" />
      </div>
      <div className="palette" onClick={togglePalette}>
        <div className="color" style={{ backgroundColor: `${brushColor}` }}></div>
      </div>
      {paletteVisible && <PaletteModal 
        togglePalette={togglePalette}
        isReplaceMode={isReplaceMode}
        setIsReplaceMode = {setIsReplaceMode}
        palette ={palette}
        setPalette={setPalette}
        brushColor={brushColor}
        setBrushColor={setBrushColor}
      />}
    </div>
  );

  return (
    <div className='ToolBar'>
      {toolBarVisible && ToolBarItems(numOfPixels, drawing, backgroundColor)}
      <div className="Icon" onClick={() => setToolBarVisible(!toolBarVisible)}>
        <img src={toggleIcon} alt="Toggle Toolbar" />
      </div>
    </div>
  );
}

export default ToolBar;