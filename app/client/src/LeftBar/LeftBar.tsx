import './LeftBar.css';
import { createNewRoundNode, createNewRectNode, createNewNodeImage } from "../utils/FlowUtils";
import ColorPicker from './ColorPicker';


// CHANGE TYPE ANY TO THE SETNODES TYPE
// Couldn't find anything about it
function LeftBar(props: any) {

  const { setNodes } = props;

  const handleDrag = (event: any, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div id="leftbar">

      <div className="dashboard">
        <h2>Dashboard</h2>
      </div>

      <div className='btn-items'>
        <button className="item-btn rectangle" onDragStart={(event) => handleDrag(event, 'itemNodeRect')} onClick={() => createNewRectNode(setNodes)} draggable>
          <h3>text</h3>
        </button>

        <button className="item-btn round" onDragStart={(event) => handleDrag(event, 'itemNodeRound')} onClick={() => createNewRoundNode(setNodes)} draggable>
          <h3>text</h3>
        </button>

        <button className='imgDrag' onDragStart={(event) => handleDrag(event, 'imageNode')} onClick={() => createNewNodeImage(setNodes)} draggable>
        </button>
      </div>

      <div id='color-container'>
        <ColorPicker />
      </div>



      <button className='export-btn'>
        <h2>Export</h2>
      </button>
    </div>
  )
}

export default LeftBar;