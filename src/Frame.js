import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Layers from './Layers';

function Frame(props) {
return (
    <div>
        <TransformWrapper wheel={{ smoothStep: 0.05 }} disabled={props.isDrawMode}>
            <TransformComponent>
            <Layers 
                numOfPixels={props.numOfPixels} 
                brushColor={props.brushColor} 
                isGrid={props.isGrid} 
                isDrawMode={props.isDrawMode}
                drawing={props.drawing} 
                inactiveLayers={props.inactiveLayers}
            />
            </TransformComponent>
        </TransformWrapper>
    </div>
    );
    
}

export default Frame;
