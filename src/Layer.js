import React, { useRef, useEffect, useState} from 'react';
import './Layer.css';

const Layer = ({ numOfPixels, brushColor, isGrid, isDrawMode, drawing}) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const setEventHandlers = (square, index, isDrawing) => {
    square.onmousedown = (e) => {
      isDrawing.current = true;
      draw(e.target, index);  // Start drawing on mousedown
    };
  
    square.onmouseenter = (e) => {
      if(isDrawing.current) draw(e.target, index); // Continue drawing if mouse is down
    };
  
    square.onmouseup = () => {
      isDrawing.current = false;
    };
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.innerHTML = '';  // Clear previous isGrid
    isDrawing.current = false;

    const pixelSize = `calc(min(100vh, 100vw) / ${numOfPixels})`;
    canvas.style.gridTemplateColumns = `repeat(${numOfPixels}, ${pixelSize})`;
    canvas.style.gridTemplateRows = `repeat(${numOfPixels}, ${pixelSize})`; // Corrected property name

    for (let i = 0; i < numOfPixels; i++) {
      for (let j = 0; j < numOfPixels; j++) {
        let index = i * numOfPixels + j;

        const square = document.createElement('div');
        if(isGrid) square.style.border = `0.3px solid #EEEEEE`;
        square.style.backgroundColor = drawing.current[index];

        // Attach mouse event handlers to each square
        console.log(isDrawMode);
        if(isDrawMode) setEventHandlers(square, index, isDrawing);

        canvas.appendChild(square);
      }
    }
  }, [numOfPixels, brushColor]);  // Add brushColor to the dependencies array if needed

  const draw = (pixel, index) => {
    pixel.style.backgroundColor = brushColor;  // Apply the brush color to the background
    drawing.current[index] = brushColor;
  };

  return (
    <div ref={canvasRef} className="Layer"></div>
  );
};

export default Layer;
