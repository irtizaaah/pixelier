import React, { useEffect, useState } from 'react';
import './ColorPicker.css';

function ColorPicker({setIsReplaceMode, palette, brushColor, setBrushColor, setPalette, isReplaceMode}) {
  const [hue, setHue] = useState(360); // 0-360 degrees
  const [saturation, setSaturation] = useState(100); // Percentage
  const [lightness, setLightness] = useState(50); // Percentage
  const [hex, setHex] = useState("");

  function hexToHSLA(hex) {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, '');

    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    if (hex.length === 3 || hex.length === 4) {
        hex = hex.split('').map(char => char + char).join('');
    }

    // Parse the hex string to get the RGB(A) components
    let r = parseInt(hex.slice(0, 2), 16);
    let g = parseInt(hex.slice(2, 4), 16);
    let b = parseInt(hex.slice(4, 6), 16);

    // Convert RGB to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100)};
}

  useEffect(()=>{
    setHex(hslToHex(hue, saturation, lightness));
  },[hue, saturation, lightness]) 

  useEffect(()=>{
    updateHSLA(brushColor);
  },[brushColor]) 

  const updateHSLA = (hex) =>{
    let hsla = hexToHSLA(hex)
    setHue(hsla.h);
    setSaturation(hsla.s);
    setLightness(hsla.l);
    setBrushColor(hex);
    console.log(hex)
  }

  const handleHexChange = (e) =>{
    setHex(e.target.value);
  }

  // Function to format the displayed color with HSLA
  const getHSLA = () => `hsla(${hue}, ${saturation}%, ${lightness}%)`;


  return (
    <div className="ColorPicker" onClick={(e) => {e.stopPropagation(); setBrushColor(hex)}}>
      <div className="color-viewer" style={{ backgroundColor: getHSLA() }}></div>
      <div className="input_wrapper">
        <input value={hex} onChange={e => handleHexChange(e)} on/>
        <div className="input_button" onClick={()=>updateHSLA(hex)}>Select</div>
        <div className="input_button" onClick={()=>setIsReplaceMode(!isReplaceMode)} style={isReplaceMode ? {backgroundColor:'#3277b3'}: {backgroundColor:'#5AB2FF'}}>Replace</div>
      </div>
      <div>
        <input className = "color-slider color-slider--hue" type="range" min="0" max="360" value={hue} onChange={e => setHue(e.target.value)} />
      </div>
      <div>
        <input className = "color-slider color-slider--saturation" type="range" min="0" max="100" value={saturation} onChange={e => setSaturation(e.target.value)} />
      </div>
      <div>
        <input className = "color-slider color-slider--lightness" type="range" min="0" max="100" value={lightness} onChange={e => setLightness(e.target.value)} />
      </div>
    </div>
  );
}

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}


export default ColorPicker;
