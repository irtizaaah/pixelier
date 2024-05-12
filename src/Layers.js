import Layer from "./Layer"

function Layers({numOfPixels, brushColor, isGrid, drawing, inactiveLayers, isDrawMode}){

return(
    <div className = "Layers">
    <div className="layer-wrapper">
        <Layer 
            className="Canvas"
            numOfPixels={numOfPixels} 
            brushColor={brushColor} 
            isGrid={isGrid} 
            drawing={drawing} 
            isDrawMode={isDrawMode}
            />
        </div>
    </div>);
}

export default Layers;

