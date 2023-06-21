import { useContext } from "react";
import { FlowContext } from '../../Context/context';
import './LeftBar.css';

import ColorPicker from './ColorPicker';
import { createNewRoundNode, createNewRectNode, createNewNodeImage } from "../../utils/FlowUtils";

const handleDrag = (event: any, nodeType: string) => {
  event.dataTransfer.setData('application/reactflow', nodeType);
  event.dataTransfer.effectAllowed = 'move';
};

function LeftBar() {

  const { setNodes } = useContext(FlowContext);

  return (
    <div id='leftbar'>

      <button className="item-btn rectangle"
        onDragStart={(event) => handleDrag(event, 'itemNodeRect')}
        onClick={() => createNewRectNode(setNodes)} draggable>
        <h3>text</h3>
      </button>

      <button className="item-btn circle"
        onDragStart={(event) => handleDrag(event, 'itemNodeRound')}
        onClick={() => createNewRoundNode(setNodes)} draggable>
        <h3>text</h3>
      </button>

      <button className='imgDrag'
        onDragStart={(event) => handleDrag(event, 'imageNode')}
        onClick={() => createNewNodeImage(setNodes)} draggable>
      </button>

      <div id="colorPicker">
        <ColorPicker />
      </div>

    </div>
  )

}

export default LeftBar;