import React, { useState, useEffect } from 'react';
import './ColorPicker.css'

function ColorPicker() {
  const [red, setRed] = useState(255);
  const [green, setGreen] = useState(255);
  const [blue, setBlue] = useState(255);
  const [alpha, setAlpha] = useState(1);

  // Function to convert RGB values to a hexadecimal string
  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  };

  // Function to format the displayed color with alpha
  const getRGBA = () => `rgba(${red}, ${green}, ${blue}, ${alpha})`;

  return (
    <div>
      <div className="color-viewer" style={{ backgroundColor: getRGBA() }}></div>
      <p>{rgbToHex(red, green, blue)}</p>
      <div>
        <label>Red: {red}</label>
        <input type="range" min="0" max="255" value={red} onChange={e => setRed(e.target.value)} />
      </div>
      <div>
        <label>Green: {green}</label>
        <input type="range" min="0" max="255" value={green} onChange={e => setGreen(e.target.value)} />
      </div>
      <div>
        <label>Blue: {blue}</label>
        <input type="range" min="0" max="255" value={blue} onChange={e => setBlue(e.target.value)} />
      </div>
      <div>
        <label>Alpha: {alpha}</label>
        <input type="range" min="0" max="1" step="0.01" value={alpha} onChange={e => setAlpha(e.target.value)} />
      </div>
    </div>
  );
}

export default ColorPicker;
