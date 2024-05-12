import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Layers from './Layers';

function Frame(props) {
return (
    <div>
        <TransformWrapper wheel={{ smoothStep: 0.05 }} disabled={props.mode}>
            <TransformComponent>
            <Layers 
                numOfPixels={props.numOfPixels} 
                brushColor={props.brushColor} 
                isGrid={props.isGrid} 
                mode={props.mode}
                drawing={props.drawing} 
                inactiveLayers={props.inactiveLayers}
                backgroundColor={props.backgroundColor}
            />
            </TransformComponent>
        </TransformWrapper>
    </div>
    );
    
}

export default Frame;
