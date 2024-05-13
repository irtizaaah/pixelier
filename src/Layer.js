import React, { useRef, useEffect, useState} from 'react';
import './Layer.css';

const Layer = ({ numOfPixels, brushColor, isGrid, mode, backgroundColor, drawing}) => {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);

  const setEventHandlers = (square, index, isDrawing) => {
    const DRAW = 1;
    const ERASE = 2;

    square.onmousedown = (e) => {
      isDrawing.current = true;
      if(mode===DRAW || mode===ERASE) draw(e.target);  // Start drawing on mousedown
    };
  
    square.onmouseenter = (e) => {
      if((mode===DRAW || mode===ERASE) && (isDrawing.current)) draw(e.target); // Continue drawing if mouse is down
    };
  
    square.onmouseup = () => {
      isDrawing.current = false;
    };

    // Touch events
    square.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if(mode===DRAW || mode===ERASE) isDrawing.current = true;
      draw(e.target);
    }, { passive: false });

    square.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const target = document.elementFromPoint(touch.clientX, touch.clientY);
      if((mode===DRAW || mode===ERASE) &&target && isDrawing.current) draw(target);
    }, { passive: false });
    
    square.addEventListener('touchend', () => {
      isDrawing.current = false;
    });
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.innerHTML = '';  // Clear previous isGrid
    isDrawing.current = false;

    const pixelSize = `calc(min(100vh, 100vw) / ${numOfPixels})`;
    canvas.style.gridTemplateColumns = `repeat(${numOfPixels}, ${pixelSize})`;
    canvas.style.gridTemplateRows = `repeat(${numOfPixels}, ${pixelSize})`; // Corrected property name
    canvas.style.backgroundColor = backgroundColor;

    for (let i = 0; i < numOfPixels; i++) {
      for (let j = 0; j < numOfPixels; j++) {
        let index = i * numOfPixels + j;

        const square = document.createElement('div');
        if(isGrid) square.style.border = `0.3px solid #EEEEEE`;
        square.id = `${index}`
        square.style.backgroundColor = drawing.current[index];

        // Attach mouse event handlers to each square
        setEventHandlers(square, index, isDrawing);

        canvas.appendChild(square);
      }
    }
  }, [numOfPixels, brushColor, isGrid]);  // Add brushColor to the dependencies array if needed

  const draw = (pixel) => {
    pixel.style.backgroundColor = brushColor;  // Apply the brush color to the backgroundColor
    drawing.current[pixel.id] = brushColor;
  };

  return (
    <div ref={canvasRef} className="Layer"></div>
  );
};

export default Layer;