import React, { useState} from 'react';
import './ToolBar.css';
import handIcon from "./assets/hand.svg";
import drawIcon from "./assets/draw.svg"
import { saveAs } from 'file-saver';

function ToolBar({setBrushColor, setIsDrawMode, isDrawMode}) {
    const [palette, setPalette] = useState(["#240A34","#891652","#EABE6C","#F3E99F","#83C0C1","#96E9C6","transparent"]);
  
    return (
      <div className='ToolBar'>
        <div className="Download" onClick={handleDownload}></div>
        <div 
            className="Mode"
            onClick={()=>setIsDrawMode(false)}
        >
            <img src={handIcon} alt="mode" />
        </div>
        <div 
            className="Mode"
            onClick={()=>setIsDrawMode(true)}
        >
            <img src={drawIcon} alt="mode" />
        </div>
        <div className="palette">
            {palette.map((color, index) => (
            <div 
                key={index} 
                className="color" 
                style={{ backgroundColor: `${color}`}}
                onClick={()=>setBrushColor(color)}
            >
            </div>
            ))}
        </div>
      </div>
    );
  }


const handleDownload = () => {
    const fileData = "";
    const blob = new Blob([fileData], { type: 'text/plain' });
    saveAs(blob, 'drawing.pxr'); 
  };
  
  export default ToolBar;