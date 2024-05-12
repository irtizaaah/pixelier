import React, { useState } from 'react';
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

function ToolBar({ isGrid, setIsGrid, brushColor, setBrushColor, setMode, mode }) {
  const VIEW = 0;
  const DRAW = 1;
  const ERASE = 2;

  const [palette, setPalette] = useState(["#240A34", "#891652", "#EABE6C", "#F3E99F", "#83C0C1", "#96E9C6", "", ""]);
  const [paletteVisible, setPaletteVisible] = useState(false);
  const [mostRecentColor, setMostRecentColor] = useState("#000");

  const handleErase = () => {
    setMostRecentColor(brushColor);
    setMode(ERASE);
    setBrushColor("#ffffff00");
  };

  const handleDraw = () => {
    setMode(DRAW);
    setBrushColor(mostRecentColor);
  };

  const handleDownload = () => {
    const fileData = ""; // You might need actual data here
    const blob = new Blob([fileData], { type: 'text/plain' });
    saveAs(blob, 'drawing.pxr');
  };

  const togglePalette = () => {
    setPaletteVisible(!paletteVisible);
  };

  return (
    <div className='ToolBar'>
      <div className="Icon" onClick={handleDownload}>
        <img src={downloadIcon} alt="Download" />
      </div>
      <div className="Icon" onClick={() => setIsGrid(!isGrid)}>
        <img src={isGrid ? gridIconSelected : gridIcon} alt="Grid" />
      </div>
      <div className="Icon" onClick={() => setMode(VIEW)}>
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
      {paletteVisible && (
        <div className="overlay" onClick={togglePalette}>
          <div className="modal">
            {palette.map((color, index) => (
              <div
                key={index}
                className="color"
                style={{ backgroundColor: color }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the overlay click from closing the modal
                  setBrushColor(color);
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ToolBar;
