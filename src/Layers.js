import Layer from "./Layer"

function Layers({numOfPixels, brushColor, isGrid, drawing, backgroundColor, mode}){
return(
    <div className = "Layers">
    <div className="layer-wrapper">
        <Layer 
            className="Canvas"
            numOfPixels={numOfPixels} 
            brushColor={brushColor} 
            isGrid={isGrid} 
            drawing={drawing} 
            mode={mode}
            backgroundColor = {backgroundColor}
            />
        </div>
    </div>);
}

export default Layers;

